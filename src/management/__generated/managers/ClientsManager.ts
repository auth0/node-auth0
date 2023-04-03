/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type { Client, ClientCreate, ClientUpdate } from '../models';

export interface DeleteClientsByIdRequest {
  id: string;
}

export interface GetClientsRequest {
  fields?: string;
  include_fields?: boolean;
  page?: number;
  per_page?: number;
  include_totals?: boolean;
  is_global?: boolean;
  is_first_party?: boolean;
  app_type?: string;
}

export interface GetClientsByIdRequest {
  id: string;
  fields?: string;
  include_fields?: boolean;
}

export interface PatchClientsByIdRequest {
  id: string;
}

export interface PostRotateSecretRequest {
  id: string;
}

/**
 *
 */
export class ClientsManager extends runtime.BaseAPI {
  /**
   * Delete a client and related configuration (rules, connections, etc).
   * Delete a client
   * @throws {RequiredError}
   * @memberof ClientsManager
   */
  async deleteRaw(
    requestParameters: DeleteClientsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling delete.'
      );
    }

    const response = await this.request(
      {
        path: `/clients/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve clients (applications and SSO integrations) matching provided filters. A list of fields to include or exclude<br/>may also be specified. Note:<br/><ul><br/>  <li><br/>    <code>client_id</code>, <code>app_type</code>, <code>name</code>, and <code>description</code> can be retrieved with<br/>    any scope.<br/>  </li><br/>  <li><br/>    <code>callbacks</code>, <code>oidc_backchannel_logout</code>, <code>allowed_origins</code>,<br/>    <code>web_origins</code>, <code>tenant</code>, <code>global</code>, <code>config_route</code>,<br/>    <code>callback_url_template</code>, <code>jwt_configuration</code>,<br/>    <code>jwt_configuration.lifetime_in_seconds</code>, <code>jwt_configuration.secret_encoded</code>,<br/>    <code>jwt_configuration.scopes</code>, <code>jwt_configuration.alg</code>, <code>api_type</code>,<br/>    <code>logo_uri</code>, <code>allowed_clients</code>, <code>owners</code>, <code>custom_login_page</code>,<br/>    <code>custom_login_page_off</code>, <code>sso</code>, <code>addons</code>, <code>form_template</code>,<br/>    <code>custom_login_page_codeview</code>, <code>resource_servers</code>, <code>client_metadata</code>,<br/>    <code>mobile</code>, <code>mobile.android</code>, <code>mobile.ios</code>, <code>allowed_logout_urls</code>,<br/>    <code>token_endpoint_auth_method</code>, <code>is_first_party</code>, <code>oidc_conformant</code>,<br/>    <code>is_token_endpoint_ip_header_trusted</code>, <code>initiate_login_uri</code>, <code>grant_types</code>,<br/>    <code>refresh_token</code>, <code>refresh_token.rotation_type</code>, <code>refresh_token.expiration_type</code>,<br/>    <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>organization_usage</code>, and<br/>    <code>organization_require_behavior</code> properties can only be retrieved with the <code>read:clients</code> or<br/>    <code>read:client_keys</code> scope.<br/>  </li><br/>  <li><br/>    <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,<br/>    <code>client_secret</code>, and <code>signing_key</code> properties can only be retrieved with the<br/>    <code>read:client_keys</code> scope.<br/>  </li><br/></ul><br/>
   * Get clients
   * @throws {RequiredError}
   * @memberof ClientsManager
   */
  async getAllRaw(
    requestParameters: GetClientsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<Client>>> {
    const queryParameters: any = {};

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    if (requestParameters.is_global !== undefined) {
      queryParameters['is_global'] = requestParameters.is_global;
    }

    if (requestParameters.is_first_party !== undefined) {
      queryParameters['is_first_party'] = requestParameters.is_first_party;
    }

    if (requestParameters.app_type !== undefined) {
      queryParameters['app_type'] = requestParameters.app_type;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<Client>> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve client details. A list of fields to include or exclude may also be specified. Note:<br/><ul><br/>  <li><br/>    <code>client_id</code>, <code>app_type</code>, <code>name</code>, and <code>description</code> can be retrieved with<br/>    the any of the scopes.<br/>  </li><br/>  <li><br/>    <code>callbacks</code>, <code>oidc_backchannel_logout</code>, <code>allowed_origins</code>,<br/>    <code>web_origins</code>, <code>tenant</code>, <code>global</code>, <code>config_route</code>,<br/>    <code>callback_url_template</code>, <code>jwt_configuration</code>,<br/>    <code>jwt_configuration.lifetime_in_seconds</code>, <code>jwt_configuration.secret_encoded</code>,<br/>    <code>jwt_configuration.scopes</code>, <code>jwt_configuration.alg</code>, <code>api_type</code>,<br/>    <code>logo_uri</code>, <code>allowed_clients</code>, <code>owners</code>, <code>custom_login_page</code>,<br/>    <code>custom_login_page_off</code>, <code>sso</code>, <code>addons</code>, <code>form_template</code>,<br/>    <code>custom_login_page_codeview</code>, <code>resource_servers</code>, <code>client_metadata</code>,<br/>    <code>mobile</code>, <code>mobile.android</code>, <code>mobile.ios</code>, <code>allowed_logout_urls</code>,<br/>    <code>token_endpoint_auth_method</code>, <code>is_first_party</code>, <code>oidc_conformant</code>,<br/>    <code>is_token_endpoint_ip_header_trusted</code>, <code>initiate_login_uri</code>, <code>grant_types</code>,<br/>    <code>refresh_token</code>, <code>refresh_token.rotation_type</code>, <code>refresh_token.expiration_type</code>,<br/>    <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>organization_usage</code>, and<br/>    <code>organization_require_behavior</code> properties can only be retrieved with the <code>read:clients</code> or<br/>    <code>read:client_keys</code> scope.<br/>  </li><br/>  <li><br/>    <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,<br/>    <code>client_secret</code>, and <code>signing_key</code> properties can only be retrieved with the<br/>    <code>read:client_keys</code> scope.<br/>  </li><br/></ul><br/>
   * Get a client
   * @throws {RequiredError}
   * @memberof ClientsManager
   */
  async getRaw(
    requestParameters: GetClientsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Client>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    const response = await this.request(
      {
        path: `/clients/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Client> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Note: The `client_secret` and `signing_key` attributes can only be updated with the `update:client_keys` scope.
   * Update a client
   * @throws {RequiredError}
   * @memberof ClientsManager
   */
  async updateRaw(
    requestParameters: PatchClientsByIdRequest,
    bodyParameters: ClientUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Client>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling update.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/clients/{id}`.replace(
          `{${'id'}}`,
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
   * Note: The `client_secret` and `signing_key` attributes can only be updated with the `update:client_keys` scope.
   * Update a client
   */
  async update(
    requestParameters: PatchClientsByIdRequest,
    bodyParameters: ClientUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Client> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a new client (application or SSO integration).<br/><br/>Note: We recommend leaving the `client_secret` parameter unspecified to allow the generation of a safe secret.<br/><br/><div class=\"alert alert-warning\">SSO Integrations created via this endpoint will accept login requests and share user profile information.</div><br/>
   * Create a client
   * @throws {RequiredError}
   * @memberof ClientsManager
   */
  async createRaw(
    bodyParameters: ClientCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Client>> {
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
  async create(
    bodyParameters: ClientCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Client> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Rotate a client secret.<br/><br/>Note: The generated secret is NOT base64 encoded.<br/>
   * Rotate a client secret
   * @throws {RequiredError}
   * @memberof ClientsManager
   */
  async rotateClientSecretRaw(
    requestParameters: PostRotateSecretRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Client>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling rotateClientSecret.'
      );
    }

    const response = await this.request(
      {
        path: `/clients/{id}/rotate-secret`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Client> {
    const response = await this.rotateClientSecretRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
