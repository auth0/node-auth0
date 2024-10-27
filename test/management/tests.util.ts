// tests.util.ts
// this file contains commmon test functions that are used to test sdk endpoints
// since the management api managers are essentially wrappers around the REST endpoints,
// these functions end up being repeated for all the managers, this file aims to reduce repetition
// it performs basic sanity checks, input output checks and error handling checks

import nock, { RequestBodyMatcher } from 'nock';
import { ApiResponse } from '../../src/lib/models.js';

const DOMAIN = `tenant.auth0.com`;
const API_URL = `https://${DOMAIN}/api/v2`;

// this is not technically not required as type checking will automatically check fot this
// but including it for the sake of completeness
/**
 * Checks if the given operation returns a promise when no callback is provided.
 *
 * @template T - The type of the response expected from the promise.
 * @param {any | Promise<ApiResponse<T>>} operation - The operation to check, which can be either a promise or any other type.
 * @returns {void}
 */
export function checkForPromise<T>(operation: any | Promise<ApiResponse<T>>): void {
  it('should return a promise if no callback is given', (done) => {
    expect(operation instanceof Promise).toBeTruthy();
    operation.then(done.bind(null, null)).catch(done.bind(null, null));
  });
}

/**
 * Utility function to test if an operation correctly handles errors.
 *
 * @template T - The type of the response expected from the operation.
 * @param {Promise<ApiResponse<T>>} operation - The promise representing the operation to be tested.
 * @returns {void} - This function does not return anything.
 *
 * @example
 * ```typescript
 * checkErrorHandler(someApiOperation);
 * ```
 */
export function checkErrorHandler<T>(operation: Promise<ApiResponse<T>>): void {
  it('should pass any errors to the promise catch handler', () => {
    nock.cleanAll();

    return operation.catch((err) => {
      expect(err).toBeDefined();
    });
  });
}

/**
 * Verifies that a given operation makes a request to the specified endpoint.
 *
 * @template T - The type of the result of the operation.
 * @param operation - A promise representing the operation to be checked.
 * @param request - The nock scope representing the expected request.
 */
export function checkRequestInterceptor<T>(operation: Promise<T>, request: nock.Scope): void {
  it(`should make a request to the endpoint`, async () => {
    await operation;
    expect(request.isDone()).toBeTruthy();
  });
}

/**
 * Tests an asynchronous operation by comparing its result to an expected response.
 *
 * @template T - The type of the expected response data.
 * @param {Promise<ApiResponse<T>>} operation - The asynchronous operation to be tested.
 * @param {T} expectedResponse - The expected response data to compare against the operation's result.
 */
export function checkOperation<T>(operation: Promise<ApiResponse<T>>, expectedResponse: T): void {
  it('should test the method', async () => {
    const result = await operation;
    expect(result.data).toEqual(expectedResponse);
  });
}

export type CheckMethodParams<T> = {
  operation: Promise<ApiResponse<T>>;
  expectedResponse: any;
  uri: string | RegExp | { (uri: string): boolean };
  method: string;
  requestBody?: RequestBodyMatcher | any;
};

// this function combines the above functions to check an SDK manager method.
/**
 * Checks the given manager method by intercepting the request and validating the response.
 *
 * Following checks are performed:
 * 1. The operation is a promise.
 * 2. The operation is rejected in case of an error.
 * 3. The request is made to the specified endpoint in the given method.
 * 4. The response from the operation is as expected.
 *
 * @template T - The type of the expected response.
 * @param {Object} params - The parameters for the checkMethod function.
 * @param {Promise<ApiResponse<T>>} params.operation - The operation to be tested.
 * @param {any} params.expectedResponse - The expected response from the operation.
 * @param {string | RegExp | ((uri: string) => boolean)} params.uri - The URI to intercept.
 * @param {string} params.method - The HTTP method to intercept (e.g., 'GET', 'POST').
 * @param {RequestBodyMatcher | any} [params.requestBody] - The optional request body to match.
 */
export const checkMethod = <T>({
  operation,
  expectedResponse,
  uri,
  method,
  requestBody,
}: CheckMethodParams<T>): void => {
  // nock the API with success scenario
  let request: nock.Scope = nock(API_URL)
    .intercept(uri, method, requestBody)
    .reply(200, expectedResponse);

  // check for various success checks
  checkForPromise(operation);
  checkRequestInterceptor(operation, request);
  checkOperation(operation, expectedResponse);

  // nock the API with error scenario
  request = nock(API_URL).intercept(uri, method, requestBody).reply(500);
  checkErrorHandler(operation);
};
