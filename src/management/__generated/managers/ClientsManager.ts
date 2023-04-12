import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { Client, ClientCreate, ClientUpdate } from '../models';

const { BaseAPI } = runtime;

export interface DeleteClientsByIdRequest {
  /**
   * ID of the client to delete.
   * @type {string}
   */
  id: string;
}

export interface GetClientsRequest {
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   * @type {string}
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   * @type {boolean}
   */
  include_fields?: boolean;
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page. Default value is 50, maximum value is 100
   * @type {number}
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Optional filter on the global client parameter.
   * @type {boolean}
   */
  is_global?: boolean;
  /**
   * Optional filter on whether or not a client is a first-party client.
   * @type {boolean}
   */
  is_first_party?: boolean;
  /**
   * Optional filter by a comma-separated list of application types.
   * @type {string}
   */
  app_type?: string;
}

export interface GetClientsByIdRequest {
  /**
   * ID of the client to retrieve.
   * @type {string}
   */
  id: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   * @type {string}
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   * @type {boolean}
   */
  include_fields?: boolean;
}

export interface PatchClientsByIdRequest {
  /**
   * ID of the client to update.
   * @type {string}
   */
  id: string;
}

export interface PostRotateSecretRequest {
  /**
   * ID of the client that will rotate secrets.
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class ClientsManager extends BaseAPI {
  /**
   * Delete a client and related configuration (rules, connections, etc).
   * Delete a client
   * @throws {RequiredError}
   */
  async deleteRaw(
    requestParameters: DeleteClientsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/clients/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a client and related configuration (rules, connections, etc).
   * Delete a client
   */
  async delete(
    requestParameters: DeleteClientsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
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
   *     <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>organization_usage</code>, and
   *     <code>organization_require_behavior</code> properties can only be retrieved with the <code>read:clients</code> or
   *     <code>read:client_keys</code> scope.
   *   </li>
   *   <li>
   *     <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,
   *     <code>client_secret</code>, and <code>signing_key</code> properties can only be retrieved with the
   *     <code>read:client_keys</code> scope.
   *   </li>
   * </ul>
   *
   * Get clients
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetClientsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<Client>>> {
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve clients (applications and SSO integrations) matching provided filters. A list of fields to include or exclude<br/>may also be specified. Note:<br/><ul><br/>  <li><br/>    <code>client_id</code>, <code>app_type</code>, <code>name</code>, and <code>description</code> can be retrieved with<br/>    any scope.<br/>  </li><br/>  <li><br/>    <code>callbacks</code>, <code>oidc_backchannel_logout</code>, <code>allowed_origins</code>,<br/>    <code>web_origins</code>, <code>tenant</code>, <code>global</code>, <code>config_route</code>,<br/>    <code>callback_url_template</code>, <code>jwt_configuration</code>,<br/>    <code>jwt_configuration.lifetime_in_seconds</code>, <code>jwt_configuration.secret_encoded</code>,<br/>    <code>jwt_configuration.scopes</code>, <code>jwt_configuration.alg</code>, <code>api_type</code>,<br/>    <code>logo_uri</code>, <code>allowed_clients</code>, <code>owners</code>, <code>custom_login_page</code>,<br/>    <code>custom_login_page_off</code>, <code>sso</code>, <code>addons</code>, <code>form_template</code>,<br/>    <code>custom_login_page_codeview</code>, <code>resource_servers</code>, <code>client_metadata</code>,<br/>    <code>mobile</code>, <code>mobile.android</code>, <code>mobile.ios</code>, <code>allowed_logout_urls</code>,<br/>    <code>token_endpoint_auth_method</code>, <code>is_first_party</code>, <code>oidc_conformant</code>,<br/>    <code>is_token_endpoint_ip_header_trusted</code>, <code>initiate_login_uri</code>, <code>grant_types</code>,<br/>    <code>refresh_token</code>, <code>refresh_token.rotation_type</code>, <code>refresh_token.expiration_type</code>,<br/>    <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>organization_usage</code>, and<br/>    <code>organization_require_behavior</code> properties can only be retrieved with the <code>read:clients</code> or<br/>    <code>read:client_keys</code> scope.<br/>  </li><br/>  <li><br/>    <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,<br/>    <code>client_secret</code>, and <code>signing_key</code> properties can only be retrieved with the<br/>    <code>read:client_keys</code> scope.<br/>  </li><br/></ul><br/>
   * Get clients
   */
  async getAll(
    requestParameters: GetClientsRequest = {},
    initOverrides?: InitOverride
  ): Promise<Array<Client>> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
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
   *     <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>organization_usage</code>, and
   *     <code>organization_require_behavior</code> properties can only be retrieved with the <code>read:clients</code> or
   *     <code>read:client_keys</code> scope.
   *   </li>
   *   <li>
   *     <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,
   *     <code>client_secret</code>, and <code>signing_key</code> properties can only be retrieved with the
   *     <code>read:client_keys</code> scope.
   *   </li>
   * </ul>
   *
   * Get a client
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetClientsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Client>> {
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
        path: `/clients/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve client details. A list of fields to include or exclude may also be specified. Note:<br/><ul><br/>  <li><br/>    <code>client_id</code>, <code>app_type</code>, <code>name</code>, and <code>description</code> can be retrieved with<br/>    the any of the scopes.<br/>  </li><br/>  <li><br/>    <code>callbacks</code>, <code>oidc_backchannel_logout</code>, <code>allowed_origins</code>,<br/>    <code>web_origins</code>, <code>tenant</code>, <code>global</code>, <code>config_route</code>,<br/>    <code>callback_url_template</code>, <code>jwt_configuration</code>,<br/>    <code>jwt_configuration.lifetime_in_seconds</code>, <code>jwt_configuration.secret_encoded</code>,<br/>    <code>jwt_configuration.scopes</code>, <code>jwt_configuration.alg</code>, <code>api_type</code>,<br/>    <code>logo_uri</code>, <code>allowed_clients</code>, <code>owners</code>, <code>custom_login_page</code>,<br/>    <code>custom_login_page_off</code>, <code>sso</code>, <code>addons</code>, <code>form_template</code>,<br/>    <code>custom_login_page_codeview</code>, <code>resource_servers</code>, <code>client_metadata</code>,<br/>    <code>mobile</code>, <code>mobile.android</code>, <code>mobile.ios</code>, <code>allowed_logout_urls</code>,<br/>    <code>token_endpoint_auth_method</code>, <code>is_first_party</code>, <code>oidc_conformant</code>,<br/>    <code>is_token_endpoint_ip_header_trusted</code>, <code>initiate_login_uri</code>, <code>grant_types</code>,<br/>    <code>refresh_token</code>, <code>refresh_token.rotation_type</code>, <code>refresh_token.expiration_type</code>,<br/>    <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>organization_usage</code>, and<br/>    <code>organization_require_behavior</code> properties can only be retrieved with the <code>read:clients</code> or<br/>    <code>read:client_keys</code> scope.<br/>  </li><br/>  <li><br/>    <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,<br/>    <code>client_secret</code>, and <code>signing_key</code> properties can only be retrieved with the<br/>    <code>read:client_keys</code> scope.<br/>  </li><br/></ul><br/>
   * Get a client
   */
  async get(
    requestParameters: GetClientsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<Client> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Note: The `client_secret` and `signing_key` attributes can only be updated with the `update:client_keys` scope.
   * Update a client
   * @throws {RequiredError}
   */
  async updateRaw(
    requestParameters: PatchClientsByIdRequest,
    bodyParameters: ClientUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Client>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/clients/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Note: The `client_secret` and `signing_key` attributes can only be updated with the `update:client_keys` scope.
   * Update a client
   */
  async update(
    requestParameters: PatchClientsByIdRequest,
    bodyParameters: ClientUpdate,
    initOverrides?: InitOverride
  ): Promise<Client> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a new client (application or SSO integration).
   *
   * Note: We recommend leaving the `client_secret` parameter unspecified to allow the generation of a safe secret.
   *
   * <div class="alert alert-warning">SSO Integrations created via this endpoint will accept login requests and share user profile information.</div>
   *
   * Create a client
   * @throws {RequiredError}
   */
  async createRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create a new client (application or SSO integration).<br/><br/>Note: We recommend leaving the `client_secret` parameter unspecified to allow the generation of a safe secret.<br/><br/><div class=\"alert alert-warning\">SSO Integrations created via this endpoint will accept login requests and share user profile information.</div><br/>
   * Create a client
   */
  async create(bodyParameters: ClientCreate, initOverrides?: InitOverride): Promise<Client> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Rotate a client secret.
   *
   * Note: The generated secret is NOT base64 encoded.
   *
   * Rotate a client secret
   * @throws {RequiredError}
   */
  async rotateClientSecretRaw(
    requestParameters: PostRotateSecretRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Client>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/clients/{id}/rotate-secret`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Rotate a client secret.<br/><br/>Note: The generated secret is NOT base64 encoded.<br/>
   * Rotate a client secret
   */
  async rotateClientSecret(
    requestParameters: PostRotateSecretRequest,
    initOverrides?: InitOverride
  ): Promise<Client> {
    const response = await this.rotateClientSecretRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
