import nock from 'nock';
import { ApiResponse } from '../../src/lib/models.js';

// this is not technically not required as type checking will automatically check fot this
// but including it for the sake of completeness
export function checkForPromise<T>(operation: any | Promise<ApiResponse<T>>): void {
  it('should return a promise if no callback is given', (done) => {
    expect(operation instanceof Promise).toBeTruthy();
    operation.then(done.bind(null, null)).catch(done.bind(null, null));
  });
}

export function checkErrorHandler<T>(operation: Promise<ApiResponse<T>>): void {
  it('should pass any errors to the promise catch handler', () => {
    nock.cleanAll();

    return operation.catch((err) => {
      expect(err).toBeDefined();
    });
  });
}

// this function checks if a request is made to the specified endpoint in a given method.
// it is used to check if the correct endpoint is being called in the tests
export function checkRequestInterceptor<T>(
  operation: Promise<T>,
  request: nock.Scope,
  endpoint: string
): void {
  it(`should make a request to ${endpoint}`, async () => {
    await operation;
    expect(request.isDone()).toBeTruthy();
  });
}

export function checkOperation<T>(operation: Promise<ApiResponse<T>>, expectedResponse: T): void {
  it('should test the method', async () => {
    const result = await operation;
    expect(result.data).toEqual(expectedResponse);
  });
}
