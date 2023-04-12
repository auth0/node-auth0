import * as runtime from '../../runtime';
import type { InitOverride, InitOverrideFunction, ApiResponse } from '../../../../../src/runtime';
import type {
  Connection,
  ConnectionCreate,
  ConnectionUpdate,
  GetConnections200Response,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteConnectionsByIdRequest {
  /**
   * The id of the connection to delete
   * @type {string}
   */
  id: string;
}

export interface DeleteUsersByEmailRequest {
  /**
   * The id of the connection (currently only database connections are supported)
   * @type {string}
   */
  id: string;
  /**
   * The email of the user to delete
   * @type {string}
   */
  email: string;
}

export interface GetConnectionsRequest {
  /**
   * The amount of entries per page. Default: no paging is used, all connections are returned
   * @type {number}
   */
  per_page?: number;
  /**
   * The page number. Zero based
   * @type {number}
   */
  page?: number;
  /**
   * true if a query summary must be included in the result, false otherwise. Default <code>false</code>.
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Provide strategies to only retrieve connections with such strategies
   * @type {Array<GetConnectionsStrategyEnum>}
   */
  strategy?: Array<GetConnectionsStrategyEnum>;
  /**
   * Provide the name of the connection to retrieve
   * @type {string}
   */
  name?: string;
  /**
   * A comma separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve all fields
   * @type {string}
   */
  fields?: string;
  /**
   * <code>true</code> if the fields specified are to be included in the result, <code>false</code> otherwise (defaults to <code>true</code>)
   * @type {boolean}
   */
  include_fields?: boolean;
}

export interface GetConnectionsByIdRequest {
  /**
   * The id of the connection to retrieve
   * @type {string}
   */
  id: string;
  /**
   * A comma separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve all fields
   * @type {string}
   */
  fields?: string;
  /**
   * <code>true</code> if the fields specified are to be included in the result, <code>false</code> otherwise (defaults to <code>true</code>)
   * @type {boolean}
   */
  include_fields?: boolean;
}

export interface GetStatusRequest {
  /**
   * ID of the connection to check
   * @type {string}
   */
  id: string;
}

export interface PatchConnectionsByIdRequest {
  /**
   * The id of the connection to retrieve
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class ConnectionsManager extends BaseAPI {
  /**
   * Deletes a connection and all its users.
   *
   * Delete a connection
   * @throws {RequiredError}
   */
  async deleteRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Deletes a connection and all its users.<br/>
   * Delete a connection
   */
  async delete(
    requestParameters: DeleteConnectionsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Deletes a specified connection user by its email (you cannot delete all users from specific connection). Currently, only Database Connections are supported.
   *
   * Delete a connection user
   * @throws {RequiredError}
   */
  async deleteUserByEmailRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Deletes a specified connection user by its email (you cannot delete all users from specific connection). Currently, only Database Connections are supported.<br/>
   * Delete a connection user
   */
  async deleteUserByEmail(
    requestParameters: DeleteUsersByEmailRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteUserByEmailRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieves every connection matching the specified strategy. All connections are retrieved if no strategy is being specified. Accepts a list of fields to include or exclude in the resulting list of connection objects.
   *
   * Get all connections
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetConnectionsRequest,
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
        key: 'strategy',
        config: {
          isArray: true,
          isCollectionFormatMulti: true,
          collectionFormat: multi,
        },
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieves every connection matching the specified strategy. All connections are retrieved if no strategy is being specified. Accepts a list of fields to include or exclude in the resulting list of connection objects.<br/>
   * Get all connections
   */
  async getAll(
    requestParameters: GetConnectionsRequest = {},
    initOverrides?: InitOverride
  ): Promise<GetConnections200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves a connection by its <code>ID</code>.
   *
   * Get a connection
   * @throws {RequiredError}
   */
  async getRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieves a connection by its <code>ID</code>.<br/>
   * Get a connection
   */
  async get(
    requestParameters: GetConnectionsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<Connection> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves the status of an ad/ldap connection referenced by its <code>ID</code>. <code>200 OK</code> http status code response is returned  when the connection is online, otherwise a <code>404</code> status code is returned along with an error message
   * Check connection status
   * @throws {RequiredError}
   */
  async checkStatusRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Retrieves the status of an ad/ldap connection referenced by its <code>ID</code>. <code>200 OK</code> http status code response is returned  when the connection is online, otherwise a <code>404</code> status code is returned along with an error message
   * Check connection status
   */
  async checkStatus(
    requestParameters: GetStatusRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.checkStatusRaw(requestParameters, initOverrides);
  }

  /**
   * <b>Note:</b> if you use the options parameter, the whole options object will be overridden, so ensure that all parameters are present
   *
   * Update a connection
   * @throws {RequiredError}
   */
  async updateRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * <b>Note:</b> if you use the options parameter, the whole options object will be overridden, so ensure that all parameters are present<br/>
   * Update a connection
   */
  async update(
    requestParameters: PatchConnectionsByIdRequest,
    bodyParameters: ConnectionUpdate,
    initOverrides?: InitOverride
  ): Promise<Connection> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Creates a new connection according to the JSON object received in <code>body</code>.
   *  The samples on the right show all available attributes. Mandatory attributes are <code>name</code> and <code>strategy</code>.
   *  Valid Strategy names are: <code>ad</code>, <code>adfs</code>, <code>amazon</code>, <code>apple</code>, <code>dropbox</code>, <code>bitbucket</code>, <code>aol</code>, <code>auth0-oidc</code>, <code>auth0</code>, <code>baidu</code>, <code>bitly</code>, <code>box</code>, <code>custom</code>, <code>daccount</code>, <code>dwolla</code>, <code>email</code>, <code>evernote-sandbox</code>, <code>evernote</code>, <code>exact</code>, <code>facebook</code>, <code>fitbit</code>, <code>flickr</code>, <code>github</code>, <code>google-apps</code>, <code>google-oauth2</code>, <code>instagram</code>, <code>ip</code>, <code>line</code>, <code>linkedin</code>, <code>miicard</code>, <code>oauth1</code>, <code>oauth2</code>, <code>office365</code>, <code>oidc</code>, <code>okta</code>, <code>paypal</code>, <code>paypal-sandbox</code>, <code>pingfederate</code>, <code>planningcenter</code>, <code>renren</code>, <code>salesforce-community</code>, <code>salesforce-sandbox</code>, <code>salesforce</code>, <code>samlp</code>, <code>sharepoint</code>, <code>shopify</code>, <code>sms</code>, <code>soundcloud</code>, <code>thecity-sandbox</code>, <code>thecity</code>, <code>thirtysevensignals</code>, <code>twitter</code>, <code>untappd</code>, <code>vkontakte</code>, <code>waad</code>, <code>weibo</code>, <code>windowslive</code>, <code>wordpress</code>, <code>yahoo</code>, <code>yammer</code>, <code>yandex</code>
   *
   * <div class="alert alert-warning">Connections created via this endpoint may redirect users to log in, receive and store user identities, and update user root profiles</div>
   * Create a connection
   * @throws {RequiredError}
   */
  async createRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Creates a new connection according to the JSON object received in <code>body</code>.<br/> The samples on the right show all available attributes. Mandatory attributes are <code>name</code> and <code>strategy</code>.<br/> Valid Strategy names are: <code>ad</code>, <code>adfs</code>, <code>amazon</code>, <code>apple</code>, <code>dropbox</code>, <code>bitbucket</code>, <code>aol</code>, <code>auth0-oidc</code>, <code>auth0</code>, <code>baidu</code>, <code>bitly</code>, <code>box</code>, <code>custom</code>, <code>daccount</code>, <code>dwolla</code>, <code>email</code>, <code>evernote-sandbox</code>, <code>evernote</code>, <code>exact</code>, <code>facebook</code>, <code>fitbit</code>, <code>flickr</code>, <code>github</code>, <code>google-apps</code>, <code>google-oauth2</code>, <code>instagram</code>, <code>ip</code>, <code>line</code>, <code>linkedin</code>, <code>miicard</code>, <code>oauth1</code>, <code>oauth2</code>, <code>office365</code>, <code>oidc</code>, <code>okta</code>, <code>paypal</code>, <code>paypal-sandbox</code>, <code>pingfederate</code>, <code>planningcenter</code>, <code>renren</code>, <code>salesforce-community</code>, <code>salesforce-sandbox</code>, <code>salesforce</code>, <code>samlp</code>, <code>sharepoint</code>, <code>shopify</code>, <code>sms</code>, <code>soundcloud</code>, <code>thecity-sandbox</code>, <code>thecity</code>, <code>thirtysevensignals</code>, <code>twitter</code>, <code>untappd</code>, <code>vkontakte</code>, <code>waad</code>, <code>weibo</code>, <code>windowslive</code>, <code>wordpress</code>, <code>yahoo</code>, <code>yammer</code>, <code>yandex</code><br/><br/><div class=\"alert alert-warning\">Connections created via this endpoint may redirect users to log in, receive and store user identities, and update user root profiles</div>
   * Create a connection
   */
  async create(
    bodyParameters: ConnectionCreate,
    initOverrides?: InitOverride
  ): Promise<Connection> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}

/**
 * @export
 */
export const GetConnectionsStrategyEnum = {
  ad: 'ad',
  adfs: 'adfs',
  amazon: 'amazon',
  apple: 'apple',
  dropbox: 'dropbox',
  bitbucket: 'bitbucket',
  aol: 'aol',
  auth0_oidc: 'auth0-oidc',
  auth0: 'auth0',
  baidu: 'baidu',
  bitly: 'bitly',
  box: 'box',
  custom: 'custom',
  daccount: 'daccount',
  dwolla: 'dwolla',
  email: 'email',
  evernote_sandbox: 'evernote-sandbox',
  evernote: 'evernote',
  exact: 'exact',
  facebook: 'facebook',
  fitbit: 'fitbit',
  flickr: 'flickr',
  github: 'github',
  google_apps: 'google-apps',
  google_oauth2: 'google-oauth2',
  instagram: 'instagram',
  ip: 'ip',
  line: 'line',
  linkedin: 'linkedin',
  miicard: 'miicard',
  oauth1: 'oauth1',
  oauth2: 'oauth2',
  office365: 'office365',
  oidc: 'oidc',
  okta: 'okta',
  paypal: 'paypal',
  paypal_sandbox: 'paypal-sandbox',
  pingfederate: 'pingfederate',
  planningcenter: 'planningcenter',
  renren: 'renren',
  salesforce_community: 'salesforce-community',
  salesforce_sandbox: 'salesforce-sandbox',
  salesforce: 'salesforce',
  samlp: 'samlp',
  sharepoint: 'sharepoint',
  shopify: 'shopify',
  sms: 'sms',
  soundcloud: 'soundcloud',
  thecity_sandbox: 'thecity-sandbox',
  thecity: 'thecity',
  thirtysevensignals: 'thirtysevensignals',
  twitter: 'twitter',
  untappd: 'untappd',
  vkontakte: 'vkontakte',
  waad: 'waad',
  weibo: 'weibo',
  windowslive: 'windowslive',
  wordpress: 'wordpress',
  yahoo: 'yahoo',
  yammer: 'yammer',
  yandex: 'yandex',
  auth0_adldap: 'auth0-adldap',
} as const;
export type GetConnectionsStrategyEnum =
  typeof GetConnectionsStrategyEnum[keyof typeof GetConnectionsStrategyEnum];
