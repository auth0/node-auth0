import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { UserBlock } from '../models';

const { BaseAPI } = runtime;

export interface DeleteUserBlocksRequest {
  /**
   * Should be any of a username, phone number, or email.
   */
  identifier: string;
}

export interface DeleteUserBlocksByIdRequest {
  /**
   * The user_id of the user to update.
   */
  id: string;
}

export interface GetUserBlocksRequest {
  /**
   * Should be any of a username, phone number, or email.
   */
  identifier: string;
  /**
   * <br/>          If true and Brute Force Protection is enabled and configured to block logins, will return a list of blocked IP addresses.<br/>          If true and Brute Force Protection is disabled, will return an empty list.<br/>
   */
  consider_brute_force_enablement?: boolean;
}

export interface GetUserBlocksByIdRequest {
  /**
   * user_id of the user blocks to retrieve.
   */
  id: string;
  /**
   * <br/>          If true and Brute Force Protection is enabled and configured to block logins, will return a list of blocked IP addresses.<br/>          If true and Brute Force Protection is disabled, will return an empty list.<br/>
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
   *
   * @throws {RequiredError}
   */
  async deleteAll(
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

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Unblock a user that was blocked due to an excessive amount of incorrectly provided credentials.
   *
   * Note: This endpoint does not unblock users that were <a href="https://auth0.com/docs/user-profile#block-and-unblock-a-user">blocked by admins</a>.
   *
   * Unblock a user
   *
   * @throws {RequiredError}
   */
  async delete(
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

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a list of blocked IP addresses for a given identifier (e.g., username, phone number or email).
   *
   * Get blocks by identifier
   *
   * @throws {RequiredError}
   */
  async getAll(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a list of blocked IP addresses for the login identifiers (email, username, phone number, etc) associated with the specified user.
   *
   *
   * Get a user's blocks
   *
   * @throws {RequiredError}
   */
  async get(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
