import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetResourceServers200Response,
  ResourceServer,
  ResourceServerCreate,
  ResourceServerUpdate,
  GetResourceServers200ResponseOneOf,
  DeleteResourceServersByIdRequest,
  GetResourceServersRequest,
  GetResourceServersByIdRequest,
  PatchResourceServersByIdRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class ResourceServersManager extends BaseAPI {
  /**
   * Delete an existing API by ID. For more information, read <a href="https://www.auth0.com/docs/get-started/apis/api-settings">API Settings</a>.
   * Delete a resource server
   *
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
   * Retrieve details of all APIs associated with your tenant.
   * Get resource servers
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetResourceServersRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetResourceServers200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetResourceServersRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<ResourceServer>>>;
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
   * Retrieve <a href="https://auth0.com/docs/apis">API</a> details with the given ID.
   * Get a resource server
   *
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
   * Change an existing API setting by resource server ID. For more information, read <a href="https://www.auth0.com/docs/get-started/apis/api-settings">API Settings</a>.
   * Update a resource server
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchResourceServersByIdRequest,
    bodyParameters: ResourceServerUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ResourceServer>> {
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a new API associated with your tenant. Note that all new APIs must be registered with Auth0. For more information, read <a href="https://www.auth0.com/docs/get-started/apis"> APIs</a>.
   * Create a resource server
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: ResourceServerCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ResourceServer>> {
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

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
