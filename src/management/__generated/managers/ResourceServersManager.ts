import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type {
  GetResourceServers200Response,
  PostResourceServersRequest,
  ResourceServer,
  ResourceServerUpdate,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteResourceServersByIdRequest {
  /**
   * ID or the audience of the resource server to delete.
   * @type {string}
   */
  id: string;
}

export interface GetResourceServersRequest {
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   * @type {number}
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   * @type {boolean}
   */
  include_fields?: boolean;
}

export interface GetResourceServersByIdRequest {
  /**
   * ID or audience of the resource server to retrieve.
   * @type {string}
   */
  id: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   * @type {boolean}
   */
  include_fields?: boolean;
}

export interface PatchResourceServersByIdRequest {
  /**
   * ID or audience of the resource server to update.
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class ResourceServersManager extends BaseAPI {
  /**
   * Delete an existing API (also known as a resource server).
   * Delete a resource server
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteResourceServersByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/resource-servers/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve <a href="https://auth0.com/docs/apis">APIs</a> (also known as resource servers) that you can consume from your authorized applications.
   * Get resource servers
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetResourceServersRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetResourceServers200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'page',
        config: {},
      },
      {
        key: 'per_page',
        config: {},
      },
      {
        key: 'include_totals',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/resource-servers`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve an <a href="https://auth0.com/docs/apis">API</a> (also known as resource server).
   * Get a resource server
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetResourceServersByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ResourceServer>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'include_fields',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/resource-servers/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update an existing API (also known as a resource server).
   * Update a resource server
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchResourceServersByIdRequest,
    bodyParameters: ResourceServerUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/resource-servers/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Create a new API (also known as a resource server).
   * Create a resource server
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: PostResourceServersRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/resource-servers`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }
}
