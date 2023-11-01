import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  ClientGrant,
  ClientGrantCreate,
  GetClientGrants200Response,
  GetClientGrantsOrganizations200Response,
  PatchClientGrantsByIdRequest,
  GetClientGrants200ResponseOneOf,
  GetClientGrantsOrganizations200ResponseOneOf,
  GetClientGrantsOrganizations200ResponseOneOfInner,
  DeleteClientGrantsByIdRequest,
  GetClientGrantsRequest,
  GetClientGrantsOrganizationsRequest,
  PatchClientGrantsByIdOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class ClientGrantsManager extends BaseAPI {
  /**
   * Delete a client grant.
   * Delete client grant
   *
   * @throws {RequiredError}
   */
  async delete(
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

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve <a href="https://auth0.com/docs/api-auth/grant/client-credentials">client grants</a>.
   *
   * Get client grants
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetClientGrantsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClientGrants200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetClientGrantsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<ClientGrant>>>;
  async getAll(
    requestParameters: GetClientGrantsRequest = {},
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
      {
        key: 'allow_any_organization',
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get the organizations associated to a client grant
   *
   * @throws {RequiredError}
   */
  async getOrganizations(
    requestParameters: GetClientGrantsOrganizationsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClientGrantsOrganizations200ResponseOneOf>>;
  async getOrganizations(
    requestParameters?: GetClientGrantsOrganizationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetClientGrantsOrganizations200ResponseOneOfInner>>>;
  async getOrganizations(
    requestParameters: GetClientGrantsOrganizationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClientGrantsOrganizations200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

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
        key: 'from',
        config: {},
      },
      {
        key: 'take',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/client-grants/{id}/organizations`.replace(
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
   * Update a client grant.
   * Update client grant
   *
   * @throws {RequiredError}
   */
  async update(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a client grant.
   * Create client grant
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: ClientGrantCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ClientGrant>> {
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

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
