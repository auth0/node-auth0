/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type { GetGrants200Response } from '../models';

export interface DeleteRequest {
  user_id?: string;
}

export interface DeleteGrantsByIdRequest {
  id: string;
}

export interface GetGrantsRequest {
  per_page?: number;
  page?: number;
  include_totals?: boolean;
  user_id?: string;
  client_id?: string;
  audience?: string;
}

/**
 *
 */
export class GrantsManager extends runtime.BaseAPI {
  /**
   * Delete a grant associated with your account.
   * Delete a grant by user_id
   * @throws {RequiredError}
   * @memberof GrantsManager
   */
  async deleteByUserIdRaw(
    requestParameters: DeleteRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: any = {};

    if (requestParameters.user_id !== undefined) {
      queryParameters['user_id'] = requestParameters.user_id;
    }

    const response = await this.request(
      {
        path: `/grants/`,
        method: 'DELETE',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a grant associated with your account.
   * Delete a grant by user_id
   */
  async deleteByUserId(
    requestParameters: DeleteRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteByUserIdRaw(requestParameters, initOverrides);
  }

  /**
   * Delete a grant associated with your account.
   * Delete a grant by id
   * @throws {RequiredError}
   * @memberof GrantsManager
   */
  async deleteRaw(
    requestParameters: DeleteGrantsByIdRequest,
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
        path: `/grants/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a grant associated with your account.
   * Delete a grant by id
   */
  async delete(
    requestParameters: DeleteGrantsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve the <a href=\"https://auth0.com/docs/api-auth/which-oauth-flow-to-use\">grants</a> associated with your account.
   * Get grants
   * @throws {RequiredError}
   * @memberof GrantsManager
   */
  async getAllRaw(
    requestParameters: GetGrantsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetGrants200Response>> {
    const queryParameters: any = {};

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    if (requestParameters.user_id !== undefined) {
      queryParameters['user_id'] = requestParameters.user_id;
    }

    if (requestParameters.client_id !== undefined) {
      queryParameters['client_id'] = requestParameters.client_id;
    }

    if (requestParameters.audience !== undefined) {
      queryParameters['audience'] = requestParameters.audience;
    }

    const response = await this.request(
      {
        path: `/grants`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve the <a href=\"https://auth0.com/docs/api-auth/which-oauth-flow-to-use\">grants</a> associated with your account.
   * Get grants
   */
  async getAll(
    requestParameters: GetGrantsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetGrants200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
