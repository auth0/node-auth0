import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { GetGrants200Response, GetGrants200ResponseOneOf, UserGrant } from '../models';

const { BaseAPI } = runtime;

export interface DeleteRequest {
  /**
   * user_id of the grant to delete.
   */
  user_id?: string;
}

export interface DeleteGrantsByIdRequest {
  /**
   * ID of the grant to delete.
   */
  id: string;
}

export interface GetGrantsRequest {
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
  /**
   * user_id of the grants to retrieve.
   */
  user_id?: string;
  /**
   * client_id of the grants to retrieve.
   */
  client_id?: string;
  /**
   * audience of the grants to retrieve.
   */
  audience?: string;
}

/**
 *
 */
export class GrantsManager extends BaseAPI {
  /**
   * Delete a grant associated with your account.
   * Delete a grant by user_id
   *
   * @throws {RequiredError}
   */
  async deleteByUserId(
    requestParameters: DeleteRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'user_id',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/grants/`,
        method: 'DELETE',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete a grant associated with your account.
   * Delete a grant by id
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteGrantsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/grants/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve the <a href="https://auth0.com/docs/api-auth/which-oauth-flow-to-use">grants</a> associated with your account.
   * Get grants
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetGrantsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetGrants200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetGrantsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<UserGrant>>>;
  async getAll(
    requestParameters: GetGrantsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetGrants200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'per_page',
        config: {},
      },
      {
        key: 'page',
        config: {},
      },
      {
        key: 'include_totals',
        config: {},
      },
      {
        key: 'user_id',
        config: {},
      },
      {
        key: 'client_id',
        config: {},
      },
      {
        key: 'audience',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/grants`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
