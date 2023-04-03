/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  Connection,
  ConnectionCreate,
  ConnectionUpdate,
  GetConnections200Response,
} from '../models';

export interface DeleteConnectionsByIdRequest {
  id: string;
}

export interface DeleteUsersByEmailRequest {
  id: string;
  email: string;
}

export interface GetConnectionsRequest {
  per_page?: number;
  page?: number;
  include_totals?: boolean;
  strategy?: Array<GetConnectionsStrategyEnum>;
  name?: string;
  fields?: string;
  include_fields?: boolean;
}

export interface GetConnectionsByIdRequest {
  id: string;
  fields?: string;
  include_fields?: boolean;
}

export interface GetStatusRequest {
  id: string;
}

export interface PatchConnectionsByIdRequest {
  id: string;
}

/**
 *
 */
export class ConnectionsManager extends runtime.BaseAPI {
  /**
   * Deletes a connection and all its users.<br/>
   * Delete a connection
   * @throws {RequiredError}
   * @memberof ConnectionsManager
   */
  async deleteRaw(
    requestParameters: DeleteConnectionsByIdRequest,
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
        path: `/connections/{id}`.replace(
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
   * Deletes a connection and all its users.<br/>
   * Delete a connection
   */
  async delete(
    requestParameters: DeleteConnectionsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Deletes a specified connection user by its email (you cannot delete all users from specific connection). Currently, only Database Connections are supported.<br/>
   * Delete a connection user
   * @throws {RequiredError}
   * @memberof ConnectionsManager
   */
  async deleteUserByEmailRaw(
    requestParameters: DeleteUsersByEmailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deleteUserByEmail.'
      );
    }
    if (requestParameters.email === null || requestParameters.email === undefined) {
      throw new runtime.RequiredError(
        'email',
        'Required parameter requestParameters.email was null or undefined when calling deleteUserByEmail.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.email !== undefined) {
      queryParameters['email'] = requestParameters.email;
    }

    const response = await this.request(
      {
        path: `/connections/{id}/users`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteUserByEmailRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieves every connection matching the specified strategy. All connections are retrieved if no strategy is being specified. Accepts a list of fields to include or exclude in the resulting list of connection objects.<br/>
   * Get all connections
   * @throws {RequiredError}
   * @memberof ConnectionsManager
   */
  async getAllRaw(
    requestParameters: GetConnectionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetConnections200Response>> {
    const queryParameters: any = {};

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    if (requestParameters.strategy) {
      queryParameters['strategy'] = requestParameters.strategy;
    }

    if (requestParameters.name !== undefined) {
      queryParameters['name'] = requestParameters.name;
    }

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetConnections200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves a connection by its <code>ID</code>.<br/>
   * Get a connection
   * @throws {RequiredError}
   * @memberof ConnectionsManager
   */
  async getRaw(
    requestParameters: GetConnectionsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Connection>> {
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
        path: `/connections/{id}`.replace(
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
   * Retrieves a connection by its <code>ID</code>.<br/>
   * Get a connection
   */
  async get(
    requestParameters: GetConnectionsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Connection> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves the status of an ad/ldap connection referenced by its <code>ID</code>. <code>200 OK</code> http status code response is returned  when the connection is online, otherwise a <code>404</code> status code is returned along with an error message
   * Check connection status
   * @throws {RequiredError}
   * @memberof ConnectionsManager
   */
  async checkStatusRaw(
    requestParameters: GetStatusRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling checkStatus.'
      );
    }

    const response = await this.request(
      {
        path: `/connections/{id}/status`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.checkStatusRaw(requestParameters, initOverrides);
  }

  /**
   * <b>Note:</b> if you use the options parameter, the whole options object will be overridden, so ensure that all parameters are present<br/>
   * Update a connection
   * @throws {RequiredError}
   * @memberof ConnectionsManager
   */
  async updateRaw(
    requestParameters: PatchConnectionsByIdRequest,
    bodyParameters: ConnectionUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Connection>> {
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
        path: `/connections/{id}`.replace(
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
   * <b>Note:</b> if you use the options parameter, the whole options object will be overridden, so ensure that all parameters are present<br/>
   * Update a connection
   */
  async update(
    requestParameters: PatchConnectionsByIdRequest,
    bodyParameters: ConnectionUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Connection> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Creates a new connection according to the JSON object received in <code>body</code>.<br/> The samples on the right show all available attributes. Mandatory attributes are <code>name</code> and <code>strategy</code>.<br/> Valid Strategy names are: <code>ad</code>, <code>adfs</code>, <code>amazon</code>, <code>apple</code>, <code>dropbox</code>, <code>bitbucket</code>, <code>aol</code>, <code>auth0-oidc</code>, <code>auth0</code>, <code>baidu</code>, <code>bitly</code>, <code>box</code>, <code>custom</code>, <code>daccount</code>, <code>dwolla</code>, <code>email</code>, <code>evernote-sandbox</code>, <code>evernote</code>, <code>exact</code>, <code>facebook</code>, <code>fitbit</code>, <code>flickr</code>, <code>github</code>, <code>google-apps</code>, <code>google-oauth2</code>, <code>instagram</code>, <code>ip</code>, <code>line</code>, <code>linkedin</code>, <code>miicard</code>, <code>oauth1</code>, <code>oauth2</code>, <code>office365</code>, <code>oidc</code>, <code>okta</code>, <code>paypal</code>, <code>paypal-sandbox</code>, <code>pingfederate</code>, <code>planningcenter</code>, <code>renren</code>, <code>salesforce-community</code>, <code>salesforce-sandbox</code>, <code>salesforce</code>, <code>samlp</code>, <code>sharepoint</code>, <code>shopify</code>, <code>sms</code>, <code>soundcloud</code>, <code>thecity-sandbox</code>, <code>thecity</code>, <code>thirtysevensignals</code>, <code>twitter</code>, <code>untappd</code>, <code>vkontakte</code>, <code>waad</code>, <code>weibo</code>, <code>windowslive</code>, <code>wordpress</code>, <code>yahoo</code>, <code>yammer</code>, <code>yandex</code><br/><br/><div class=\"alert alert-warning\">Connections created via this endpoint may redirect users to log in, receive and store user identities, and update user root profiles</div>
   * Create a connection
   * @throws {RequiredError}
   * @memberof ConnectionsManager
   */
  async createRaw(
    bodyParameters: ConnectionCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Connection>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
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
