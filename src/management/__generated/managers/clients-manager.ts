import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  Client,
  ClientCreate,
  ClientUpdate,
  GetClients200Response,
  GetCredentials200ResponseInner,
  PatchCredentialsByCredentialIdRequest,
  PostCredentialsRequest,
  GetClients200ResponseOneOf,
  DeleteClientsByIdRequest,
  DeleteCredentialsByCredentialIdRequest,
  GetClientsRequest,
  GetClientsByIdRequest,
  GetCredentialsRequest,
  GetCredentialsByCredentialIdRequest,
  PatchClientsByIdRequest,
  PatchCredentialsByCredentialIdOperationRequest,
  PostCredentialsOperationRequest,
  PostRotateSecretRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class ClientsManager extends BaseAPI {
  /**
   * Delete a client and related configuration (rules, connections, etc).
   * Delete a client
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteClientsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['client_id']);

    const response = await this.request(
      {
        path: `/clients/{client_id}`.replace(
          '{client_id}',
          encodeURIComponent(String(requestParameters.client_id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete a client credential
   *
   * @throws {RequiredError}
   */
  async deleteCredential(
    requestParameters: DeleteCredentialsByCredentialIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['client_id', 'credential_id']);

    const response = await this.request(
      {
        path: `/clients/{client_id}/credentials/{credential_id}`
          .replace('{client_id}', encodeURIComponent(String(requestParameters.client_id)))
          .replace('{credential_id}', encodeURIComponent(String(requestParameters.credential_id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve clients (applications and SSO integrations) matching provided filters. A list of fields to include or exclude
   * may also be specified. Note:
   * <ul>
   *   <li>
   *     <code>client_id</code>, <code>app_type</code>, <code>name</code>, and <code>description</code> can be retrieved with
   *     any scope.
   *   </li>
   *   <li>
   *     <code>callbacks</code>, <code>oidc_backchannel_logout</code>, <code>allowed_origins</code>,
   *     <code>web_origins</code>, <code>tenant</code>, <code>global</code>, <code>config_route</code>,
   *     <code>callback_url_template</code>, <code>jwt_configuration</code>,
   *     <code>jwt_configuration.lifetime_in_seconds</code>, <code>jwt_configuration.secret_encoded</code>,
   *     <code>jwt_configuration.scopes</code>, <code>jwt_configuration.alg</code>, <code>api_type</code>,
   *     <code>logo_uri</code>, <code>allowed_clients</code>, <code>owners</code>, <code>custom_login_page</code>,
   *     <code>custom_login_page_off</code>, <code>sso</code>, <code>addons</code>, <code>form_template</code>,
   *     <code>custom_login_page_codeview</code>, <code>resource_servers</code>, <code>client_metadata</code>,
   *     <code>mobile</code>, <code>mobile.android</code>, <code>mobile.ios</code>, <code>allowed_logout_urls</code>,
   *     <code>token_endpoint_auth_method</code>, <code>is_first_party</code>, <code>oidc_conformant</code>,
   *     <code>is_token_endpoint_ip_header_trusted</code>, <code>initiate_login_uri</code>, <code>grant_types</code>,
   *     <code>refresh_token</code>, <code>refresh_token.rotation_type</code>, <code>refresh_token.expiration_type</code>,
   *     <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>organization_usage</code>,
   *     <code>organization_require_behavior</code>
   *     properties can only be retrieved with the <code>read:clients</code> or
   *     <code>read:client_keys</code> scope.
   *   </li>
   *   <li>
   *     <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,
   *     <code>client_secret</code>, <code>client_authentication_methods</code> and <code>signing_key</code> properties can only be retrieved with the
   *     <code>read:client_keys</code> or <code>read:client_credentials</code> scope.
   *   </li>
   * </ul>
   *
   * Get clients
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetClientsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClients200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetClientsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<Client>>>;
  async getAll(
    requestParameters: GetClientsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClients200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
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
        key: 'is_global',
        config: {},
      },
      {
        key: 'is_first_party',
        config: {},
      },
      {
        key: 'app_type',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/clients`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve client details. A list of fields to include or exclude may also be specified. Note:
   * <ul>
   *   <li>
   *     <code>client_id</code>, <code>app_type</code>, <code>name</code>, and <code>description</code> can be retrieved with
   *     the any of the scopes.
   *   </li>
   *   <li>
   *     <code>callbacks</code>, <code>oidc_backchannel_logout</code>, <code>allowed_origins</code>,
   *     <code>web_origins</code>, <code>tenant</code>, <code>global</code>, <code>config_route</code>,
   *     <code>callback_url_template</code>, <code>jwt_configuration</code>,
   *     <code>jwt_configuration.lifetime_in_seconds</code>, <code>jwt_configuration.secret_encoded</code>,
   *     <code>jwt_configuration.scopes</code>, <code>jwt_configuration.alg</code>, <code>api_type</code>,
   *     <code>logo_uri</code>, <code>allowed_clients</code>, <code>owners</code>, <code>custom_login_page</code>,
   *     <code>custom_login_page_off</code>, <code>sso</code>, <code>addons</code>, <code>form_template</code>,
   *     <code>custom_login_page_codeview</code>, <code>resource_servers</code>, <code>client_metadata</code>,
   *     <code>mobile</code>, <code>mobile.android</code>, <code>mobile.ios</code>, <code>allowed_logout_urls</code>,
   *     <code>token_endpoint_auth_method</code>, <code>is_first_party</code>, <code>oidc_conformant</code>,
   *     <code>is_token_endpoint_ip_header_trusted</code>, <code>initiate_login_uri</code>, <code>grant_types</code>,
   *     <code>refresh_token</code>, <code>refresh_token.rotation_type</code>, <code>refresh_token.expiration_type</code>,
   *     <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>organization_usage</code>,
   *     <code>organization_require_behavior</code>
   *     properties can only be retrieved with the <code>read:clients</code> or
   *     <code>read:client_keys</code> scope.
   *   </li>
   *   <li>
   *     <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,
   *     <code>client_secret</code>, <code>client_authentication_methods</code> and <code>signing_key</code> properties can only be retrieved with the
   *     <code>read:client_keys</code> or <code>read:client_credentials</code> scope.
   *   </li>
   * </ul>
   *
   * Get a client
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetClientsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Client>> {
    runtime.validateRequiredRequestParams(requestParameters, ['client_id']);

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
        path: `/clients/{client_id}`.replace(
          '{client_id}',
          encodeURIComponent(String(requestParameters.client_id))
        ),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get the list of client credentials that are associated to the client.
   *
   * Important: To enable credentials to be used
   * Get client credentials
   *
   * @throws {RequiredError}
   */
  async getCredentials(
    requestParameters: GetCredentialsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetCredentials200ResponseInner>>> {
    runtime.validateRequiredRequestParams(requestParameters, ['client_id']);

    const response = await this.request(
      {
        path: `/clients/{client_id}/credentials`.replace(
          '{client_id}',
          encodeURIComponent(String(requestParameters.client_id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get the details of a client credential.
   * Get client credential
   *
   * @throws {RequiredError}
   */
  async getCredential(
    requestParameters: GetCredentialsByCredentialIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetCredentials200ResponseInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['client_id', 'credential_id']);

    const response = await this.request(
      {
        path: `/clients/{client_id}/credentials/{credential_id}`
          .replace('{client_id}', encodeURIComponent(String(requestParameters.client_id)))
          .replace('{credential_id}', encodeURIComponent(String(requestParameters.credential_id))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Notes:
   * - The `client_secret` and `signing_key` attributes can only be updated with the `update:client_keys` scope.
   * - The <code>client_authentication_methods</code> and <code>token_endpoint_auth_method</code> properties are mutually exclusive. Use
   * <code>client_authentication_methods</code> to configure the client with Private Key JWT authentication method. Otherwise, use <code>token_endpoint_auth_method</code>
   * to configure the client with client secret (basic or post) or with no authentication method (none).
   * - When using <code>client_authentication_methods</code> to configure the client with Private Key JWT authentication method, only specify the credential IDs
   * that were generated when creating the credentials on the client.
   * - To configure <code>client_authentication_methods</code>, the <code>update:client_credentials</code> scope is required.
   * - To configure <code>client_authentication_methods</code>, the property <code>jwt_configuration.alg</code> must be set to RS256.
   * Update a client
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchClientsByIdRequest,
    bodyParameters: ClientUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Client>> {
    runtime.validateRequiredRequestParams(requestParameters, ['client_id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/clients/{client_id}`.replace(
          '{client_id}',
          encodeURIComponent(String(requestParameters.client_id))
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
   * Update a client credential
   *
   * @throws {RequiredError}
   */
  async updateCredential(
    requestParameters: PatchCredentialsByCredentialIdOperationRequest,
    bodyParameters: PatchCredentialsByCredentialIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetCredentials200ResponseInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['client_id', 'credential_id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/clients/{client_id}/credentials/{credential_id}`
          .replace('{client_id}', encodeURIComponent(String(requestParameters.client_id)))
          .replace('{credential_id}', encodeURIComponent(String(requestParameters.credential_id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a new client (application or SSO integration).
   *
   * Notes:
   * - We recommend leaving the `client_secret` parameter unspecified to allow the generation of a safe secret.
   * - The <code>client_authentication_methods</code> and <code>token_endpoint_auth_method</code> properties are mutually exclusive. Use
   * <code>client_authentication_methods</code> to configure the client with Private Key JWT authentication method. Otherwise, use <code>token_endpoint_auth_method</code>
   * to configure the client with client secret (basic or post) or with no authentication method (none).
   * - When using <code>client_authentication_methods</code> to configure the client with Private Key JWT authentication method, specify fully defined credentials.
   * These credentials will be automatically enabled for Private Key JWT authentication on the client.
   * - To configure <code>client_authentication_methods</code>, the <code>create:client_credentials</code> scope is required.
   * - To configure <code>client_authentication_methods</code>, the property <code>jwt_configuration.alg</code> must be set to RS256.
   *
   * <div class="alert alert-warning">SSO Integrations created via this endpoint will accept login requests and share user profile information.</div>
   *
   * Create a client
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: ClientCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Client>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/clients`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a client credential associated to the client. The credential will be created but not yet enabled
   * Create a client credential
   *
   * @throws {RequiredError}
   */
  async createCredential(
    requestParameters: PostCredentialsOperationRequest,
    bodyParameters: PostCredentialsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetCredentials200ResponseInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['client_id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/clients/{client_id}/credentials`.replace(
          '{client_id}',
          encodeURIComponent(String(requestParameters.client_id))
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
   * Rotate a client secret.
   *
   * This endpoint cannot be used with clients configured with Private Key JWT authentication method (client_authentication_methods configured with private_key_jwt).
   *
   * Note: The generated secret is NOT base64 encoded.
   *
   * Rotate a client secret
   *
   * @throws {RequiredError}
   */
  async rotateClientSecret(
    requestParameters: PostRotateSecretRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Client>> {
    runtime.validateRequiredRequestParams(requestParameters, ['client_id']);

    const response = await this.request(
      {
        path: `/clients/{client_id}/rotate-secret`.replace(
          '{client_id}',
          encodeURIComponent(String(requestParameters.client_id))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
