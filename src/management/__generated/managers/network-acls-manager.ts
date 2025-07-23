import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetNetworkAcls200Response,
  GetNetworkAclsById200Response,
  PatchNetworkAclsById200Response,
  PatchNetworkAclsByIdRequest,
  PutNetworkAclsByIdRequest,
  GetNetworkAcls200ResponseOneOf,
  DeleteNetworkAclsByIdRequest,
  GetNetworkAclsRequest,
  GetNetworkAclsByIdRequest,
  PatchNetworkAclsByIdOperationRequest,
  PutNetworkAclsByIdOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class NetworkAclsManager extends BaseAPI {
  /**
   * Delete existing access control list for your client.
   * Delete Access Control List
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteNetworkAclsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/network-acls/{id}`.replace(
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
   * Get all access control list entries for your client.
   * Get all access control list entries for a tenant
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetNetworkAclsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetNetworkAcls200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetNetworkAclsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetNetworkAclsById200Response>>>;
  async getAll(
    requestParameters: GetNetworkAclsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetNetworkAcls200Response>> {
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
    ]);

    const response = await this.request(
      {
        path: `/network-acls`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get a specific access control list entry for your client.
   * Get a specific access control list entry for a tenant
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetNetworkAclsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetNetworkAclsById200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/network-acls/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update existing access control list for your client.
   * Partial Update for an Access Control List
   *
   * @throws {RequiredError}
   */
  async patch(
    requestParameters: PatchNetworkAclsByIdOperationRequest,
    bodyParameters: PatchNetworkAclsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PatchNetworkAclsById200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/network-acls/{id}`.replace(
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
   * Create a new access control list for your client.
   * Create Access Control List
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: PutNetworkAclsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetNetworkAclsById200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/network-acls`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update existing access control list for your client.
   * Update Access Control List
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PutNetworkAclsByIdOperationRequest,
    bodyParameters: PutNetworkAclsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetNetworkAclsById200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/network-acls/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
