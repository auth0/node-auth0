import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type {
  ClientGrant,
  ClientGrantCreate,
  GetClientGrants200Response,
  PatchClientGrantsByIdRequest,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteClientGrantsByIdRequest {
  /**
   * ID of the client grant to delete.
   * @type {string}
   */
  id: string;
}

export interface GetClientGrantsRequest {
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   * @type {number}
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Optional filter on audience.
   * @type {string}
   */
  audience?: string;
  /**
   * Optional filter on client_id.
   * @type {string}
   */
  client_id?: string;
}

export interface PatchClientGrantsByIdOperationRequest {
  /**
   * ID of the client grant to update.
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class ClientGrantsManager extends BaseAPI {
  /**
   * Delete a client grant.
   * Delete client grant
   * @throws {RequiredError}
   */
  async deleteRaw(
    requestParameters: DeleteClientGrantsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/client-grants/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a client grant.
   * Delete client grant
   */
  async delete(
    requestParameters: DeleteClientGrantsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve <a href="https://auth0.com/docs/api-auth/grant/client-credentials">client grants</a>.
   *
   * Get client grants
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetClientGrantsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClientGrants200Response>> {
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
        key: 'audience',
        config: {},
      },
      {
        key: 'client_id',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/client-grants`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/api-auth/grant/client-credentials\">client grants</a>.<br/>
   * Get client grants
   */
  async getAll(
    requestParameters: GetClientGrantsRequest = {},
    initOverrides?: InitOverride
  ): Promise<GetClientGrants200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update a client grant.
   * Update client grant
   * @throws {RequiredError}
   */
  async updateRaw(
    requestParameters: PatchClientGrantsByIdOperationRequest,
    bodyParameters: PatchClientGrantsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ClientGrant>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/client-grants/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update a client grant.
   * Update client grant
   */
  async update(
    requestParameters: PatchClientGrantsByIdOperationRequest,
    bodyParameters: PatchClientGrantsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ClientGrant> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a client grant.
   * Create client grant
   * @throws {RequiredError}
   */
  async createRaw(
    bodyParameters: ClientGrantCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/client-grants`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Create a client grant.
   * Create client grant
   */
  async create(bodyParameters: ClientGrantCreate, initOverrides?: InitOverride): Promise<void> {
    await this.createRaw(bodyParameters, initOverrides);
  }
}
