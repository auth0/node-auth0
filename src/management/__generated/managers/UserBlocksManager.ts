import * as runtime from '../../runtime';
import type { InitOverride, InitOverrideFunction, ApiResponse } from '../../../../../src/runtime';
import type { UserBlock } from '../models';

const { BaseAPI } = runtime;

export interface DeleteUserBlocksRequest {
  /**
   * Should be any of a username, phone number, or email.
   * @type {string}
   */
  identifier: string;
}

export interface DeleteUserBlocksByIdRequest {
  /**
   * The user_id of the user to update.
   * @type {string}
   */
  id: string;
}

export interface GetUserBlocksRequest {
  /**
   * Should be any of a username, phone number, or email.
   * @type {string}
   */
  identifier: string;
  /**
   * <br/>          If true and Brute Force Protection is enabled and configured to block logins, will return a list of blocked IP addresses.<br/>          If true and Brute Force Protection is disabled, will return an empty list.<br/>
   * @type {boolean}
   */
  consider_brute_force_enablement?: boolean;
}

export interface GetUserBlocksByIdRequest {
  /**
   * user_id of the user blocks to retrieve.
   * @type {string}
   */
  id: string;
  /**
   * <br/>          If true and Brute Force Protection is enabled and configured to block logins, will return a list of blocked IP addresses.<br/>          If true and Brute Force Protection is disabled, will return an empty list.<br/>
   * @type {boolean}
   */
  consider_brute_force_enablement?: boolean;
}

/**
 *
 */
export class UserBlocksManager extends BaseAPI {
  /**
   * Unblock a user blocked due to an excessive amount of incorrectly-provided credentials.
   *
   * Unblock by identifier
   * @throws {RequiredError}
   */
  async deleteAllRaw(
    requestParameters: DeleteUserBlocksRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['identifier']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'identifier',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/user-blocks`,
        method: 'DELETE',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Unblock a user blocked due to an excessive amount of incorrectly-provided credentials.<br/>
   * Unblock by identifier
   */
  async deleteAll(
    requestParameters: DeleteUserBlocksRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteAllRaw(requestParameters, initOverrides);
  }

  /**
   * Unblock a user that was blocked due to an excessive amount of incorrectly provided credentials.
   *
   * Note: This endpoint does not unblock users that were <a href="https://auth0.com/docs/user-profile#block-and-unblock-a-user">blocked by admins</a>.
   *
   * Unblock a user
   * @throws {RequiredError}
   */
  async deleteRaw(
    requestParameters: DeleteUserBlocksByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/user-blocks/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Unblock a user that was blocked due to an excessive amount of incorrectly provided credentials.<br/><br/>Note: This endpoint does not unblock users that were <a href=\"https://auth0.com/docs/user-profile#block-and-unblock-a-user\">blocked by admins</a>.<br/>
   * Unblock a user
   */
  async delete(
    requestParameters: DeleteUserBlocksByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve a list of blocked IP addresses for a given identifier (e.g., username, phone number or email).
   *
   * Get blocks by identifier
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetUserBlocksRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UserBlock>> {
    runtime.validateRequiredRequestParams(requestParameters, ['identifier']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'identifier',
        config: {},
      },
      {
        key: 'consider_brute_force_enablement',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/user-blocks`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve a list of blocked IP addresses for a given identifier (e.g., username, phone number or email).<br/>
   * Get blocks by identifier
   */
  async getAll(
    requestParameters: GetUserBlocksRequest,
    initOverrides?: InitOverride
  ): Promise<UserBlock> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a list of blocked IP addresses for the login identifiers (email, username, phone number, etc) associated with the specified user.
   *
   *
   * Get a user's blocks
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetUserBlocksByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UserBlock>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'consider_brute_force_enablement',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/user-blocks/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve a list of blocked IP addresses for the login identifiers (email, username, phone number, etc) associated with the specified user.<br/><br/>
   * Get a user\'s blocks
   */
  async get(
    requestParameters: GetUserBlocksByIdRequest,
    initOverrides?: InitOverride
  ): Promise<UserBlock> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
