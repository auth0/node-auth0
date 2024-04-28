import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  ClientGrant,
  ClientGrantCreate,
  GetClientGrants200Response,
  PatchClientGrantsByIdRequest,
  GetClientGrants200ResponseOneOf,
  DeleteClientGrantsByIdRequest,
  GetClientGrantsRequest,
  PatchClientGrantsByIdOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class ClientGrantsManager extends BaseAPI {
  /**
   * Delete the <a href="https://www.auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow">Client Credential Flow</a> from your machine-to-machine application.
   *
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
   * Retrieve a list of <a href="https://auth0.com/docs/api-auth/grant/client-credentials">client grants</a>, including the scopes associated with the application/API pair.
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
   * Create a client grant for a machine-to-machine login flow. To learn more, read <a href="https://www.auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow">Client Credential Flow</a>.
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
