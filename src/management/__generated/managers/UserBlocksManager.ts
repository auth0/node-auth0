/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type { UserBlock } from '../models';

export interface DeleteUserBlocksRequest {
  identifier: string;
}

export interface DeleteUserBlocksByIdRequest {
  id: string;
}

export interface GetUserBlocksRequest {
  identifier: string;
  consider_brute_force_enablement?: boolean;
}

export interface GetUserBlocksByIdRequest {
  id: string;
  consider_brute_force_enablement?: boolean;
}

/**
 *
 */
export class UserBlocksManager extends runtime.BaseAPI {
  /**
   * Unblock a user blocked due to an excessive amount of incorrectly-provided credentials.<br/>
   * Unblock by identifier
   * @throws {RequiredError}
   * @memberof UserBlocksManager
   */
  async deleteAllRaw(
    requestParameters: DeleteUserBlocksRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.identifier === null || requestParameters.identifier === undefined) {
      throw new runtime.RequiredError(
        'identifier',
        'Required parameter requestParameters.identifier was null or undefined when calling deleteAll.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.identifier !== undefined) {
      queryParameters['identifier'] = requestParameters.identifier;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteAllRaw(requestParameters, initOverrides);
  }

  /**
   * Unblock a user that was blocked due to an excessive amount of incorrectly provided credentials.<br/><br/>Note: This endpoint does not unblock users that were <a href=\"https://auth0.com/docs/user-profile#block-and-unblock-a-user\">blocked by admins</a>.<br/>
   * Unblock a user
   * @throws {RequiredError}
   * @memberof UserBlocksManager
   */
  async deleteRaw(
    requestParameters: DeleteUserBlocksByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling delete.'
      );
    }

    const response = await this.request(
      {
        path: `/user-blocks/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve a list of blocked IP addresses for a given identifier (e.g., username, phone number or email).<br/>
   * Get blocks by identifier
   * @throws {RequiredError}
   * @memberof UserBlocksManager
   */
  async getAllRaw(
    requestParameters: GetUserBlocksRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<UserBlock>> {
    if (requestParameters.identifier === null || requestParameters.identifier === undefined) {
      throw new runtime.RequiredError(
        'identifier',
        'Required parameter requestParameters.identifier was null or undefined when calling getAll.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.identifier !== undefined) {
      queryParameters['identifier'] = requestParameters.identifier;
    }

    if (requestParameters.consider_brute_force_enablement !== undefined) {
      queryParameters['consider_brute_force_enablement'] =
        requestParameters.consider_brute_force_enablement;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<UserBlock> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a list of blocked IP addresses for the login identifiers (email, username, phone number, etc) associated with the specified user.<br/><br/>
   * Get a user\'s blocks
   * @throws {RequiredError}
   * @memberof UserBlocksManager
   */
  async getRaw(
    requestParameters: GetUserBlocksByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<UserBlock>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.consider_brute_force_enablement !== undefined) {
      queryParameters['consider_brute_force_enablement'] =
        requestParameters.consider_brute_force_enablement;
    }

    const response = await this.request(
      {
        path: `/user-blocks/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<UserBlock> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
