import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  Connection,
  ConnectionCreate,
  ConnectionUpdate,
  GetConnectionClients200Response,
  GetConnections200Response,
  GetConnectionsKeysResponseContent,
  GetDefaultMapping200Response,
  GetScimConfiguration200Response,
  GetScimTokens200ResponseInner,
  PatchClientsRequestInner,
  PatchScimConfigurationRequest,
  PostConnectionsKeysRotateResponseContent,
  PostScimConfigurationRequest,
  PostScimToken201Response,
  PostScimTokenRequest,
  GetConnections200ResponseOneOf,
  ConnectionForList,
  DeleteConnectionsByIdRequest,
  DeleteScimConfigurationRequest,
  DeleteTokensByTokenIdRequest,
  DeleteUsersByEmailRequest,
  GetConnectionClientsRequest,
  GetConnectionsRequest,
  GetConnectionsByIdRequest,
  GetDefaultMappingRequest,
  GetKeysRequest,
  GetScimConfigurationRequest,
  GetScimTokensRequest,
  GetStatusRequest,
  PatchClientsRequest,
  PatchConnectionsByIdRequest,
  PatchScimConfigurationOperationRequest,
  PostRotateRequest,
  PostScimConfigurationOperationRequest,
  PostScimTokenOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class ConnectionsManager extends BaseAPI {
  /**
   * Deletes a connection and all its users.
   *
   * Delete a connection
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteConnectionsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connections/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Deletes a scim configuration by its <code>connectionId</code>.
   *
   * Delete a connection's SCIM configuration
   *
   * @throws {RequiredError}
   */
  async deleteScimConfiguration(
    requestParameters: DeleteScimConfigurationRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connections/{id}/scim-configuration`.replace(
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
   * Deletes a scim token by its connection <code>id</code> and <code>tokenId</code>.
   *
   * Delete a connection's SCIM token
   *
   * @throws {RequiredError}
   */
  async deleteScimToken(
    requestParameters: DeleteTokensByTokenIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'tokenId']);

    const response = await this.request(
      {
        path: `/connections/{id}/scim-configuration/tokens/{tokenId}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{tokenId}', encodeURIComponent(String(requestParameters.tokenId))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Deletes a specified connection user by its email (you cannot delete all users from specific connection). Currently, only Database Connections are supported.
   *
   * Delete a connection user
   *
   * @throws {RequiredError}
   */
  async deleteUserByEmail(
    requestParameters: DeleteUsersByEmailRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'email']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'email',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/connections/{id}/users`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve all clients that have the specified <a href="https://auth0.com/docs/authenticate/identity-providers">connection</a> enabled.
   *
   * <b>Note</b>: The first time you call this endpoint, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no further results are remaining.
   *
   * Get enabled clients for a connection
   *
   * @throws {RequiredError}
   */
  async getEnabledClients(
    requestParameters: GetConnectionClientsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetConnectionClients200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'take',
        config: {},
      },
      {
        key: 'from',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/connections/{id}/clients`.replace(
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
   * Retrieves detailed list of all <a href="https://auth0.com/docs/authenticate/identity-providers">connections</a> that match the specified strategy. If no strategy is provided, all connections within your tenant are retrieved. This action can accept a list of fields to include or exclude from the resulting list of connections.
   *
   * This endpoint supports two types of pagination:
   * <ul>
   * <li>Offset pagination</li>
   * <li>Checkpoint pagination</li>
   * </ul>
   *
   * Checkpoint pagination must be used if you need to retrieve more than 1000 connections.
   *
   * <h2>Checkpoint Pagination</h2>
   *
   * To search by checkpoint, use the following parameters:
   * <ul>
   * <li><code>from</code>: Optional id from which to start selection.</li>
   * <li><code>take</code>: The total amount of entries to retrieve when using the from parameter. Defaults to 50.</li>
   * </ul>
   *
   * <b>Note</b>: The first time you call this endpoint using checkpoint pagination, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no pages are remaining.
   *
   * Get all connections
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetConnectionsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetConnections200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetConnectionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<ConnectionForList>>>;
  async getAll(
    requestParameters: GetConnectionsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetConnections200Response>> {
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
        key: 'from',
        config: {},
      },
      {
        key: 'take',
        config: {},
      },
      {
        key: 'strategy',
        config: {
          isArray: true,
          isCollectionFormatMulti: true,
        },
      },
      {
        key: 'domain_alias',
        config: {},
      },
      {
        key: 'name',
        config: {},
      },
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/connections`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details for a specified <a href="https://auth0.com/docs/authenticate/identity-providers">connection</a> along with options that can be used for identity provider configuration.
   * Get a connection
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetConnectionsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Connection>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/connections/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieves a scim configuration's default mapping by its <code>connectionId</code>.
   *
   * Get a connection's default SCIM mapping
   *
   * @throws {RequiredError}
   */
  async getDefaultScimMapping(
    requestParameters: GetDefaultMappingRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetDefaultMapping200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connections/{id}/scim-configuration/default-mapping`.replace(
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
   * Gets the connection keys for the Okta or OIDC connection strategy.
   *
   * Get connection keys
   *
   * @throws {RequiredError}
   */
  async getKeys(
    requestParameters: GetKeysRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetConnectionsKeysResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connections/{id}/keys`.replace(
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
   * Retrieves a scim configuration by its <code>connectionId</code>.
   *
   * Get a connection's SCIM configuration
   *
   * @throws {RequiredError}
   */
  async getScimConfiguration(
    requestParameters: GetScimConfigurationRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetScimConfiguration200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connections/{id}/scim-configuration`.replace(
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
   * Retrieves all scim tokens by its connection <code>id</code>.
   *
   * Get a connection's SCIM tokens
   *
   * @throws {RequiredError}
   */
  async getScimTokens(
    requestParameters: GetScimTokensRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetScimTokens200ResponseInner>>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connections/{id}/scim-configuration/tokens`.replace(
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
   * Retrieves the status of an ad/ldap connection referenced by its <code>ID</code>. <code>200 OK</code> http status code response is returned  when the connection is online, otherwise a <code>404</code> status code is returned along with an error message
   * Check connection status
   *
   * @throws {RequiredError}
   */
  async checkStatus(
    requestParameters: GetStatusRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connections/{id}/status`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Update enabled clients for a connection
   *
   * @throws {RequiredError}
   */
  async updateEnabledClients(
    requestParameters: PatchClientsRequest,
    bodyParameters: Array<PatchClientsRequestInner>,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/connections/{id}/clients`.replace(
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
   * Update details for a specific <a href="https://auth0.com/docs/authenticate/identity-providers">connection</a>, including option properties for identity provider configuration.
   *
   * <b>Note</b>: If you use the <code>options</code> parameter, the entire <code>options</code> object is overriden. To avoid partial data or other issues, ensure all parameters are present when using this option.
   * Update a connection
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchConnectionsByIdRequest,
    bodyParameters: ConnectionUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Connection>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/connections/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update a scim configuration by its <code>connectionId</code>.
   *
   * Patch a connection's SCIM configuration
   *
   * @throws {RequiredError}
   */
  async updateScimConfiguration(
    requestParameters: PatchScimConfigurationOperationRequest,
    bodyParameters: PatchScimConfigurationRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetScimConfiguration200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/connections/{id}/scim-configuration`.replace(
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
   * Creates a new connection according to the JSON object received in <code>body</code>.
   *
   * Create a connection
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: ConnectionCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Connection>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/connections`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Rotates the connection keys for the Okta or OIDC connection strategies.
   *
   * Rotate connection keys
   *
   * @throws {RequiredError}
   */
  async rotateKeys(
    requestParameters: PostRotateRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostConnectionsKeysRotateResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connections/{id}/keys/rotate`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a scim configuration for a connection.
   *
   * Create a SCIM configuration
   *
   * @throws {RequiredError}
   */
  async createScimConfiguration(
    requestParameters: PostScimConfigurationOperationRequest,
    bodyParameters: PostScimConfigurationRequest | null,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetScimConfiguration200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/connections/{id}/scim-configuration`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a scim token for a scim client.
   *
   * Create a SCIM Token
   *
   * @throws {RequiredError}
   */
  async createScimToken(
    requestParameters: PostScimTokenOperationRequest,
    bodyParameters: PostScimTokenRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostScimToken201Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/connections/{id}/scim-configuration/tokens`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
