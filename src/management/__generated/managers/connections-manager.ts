import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  Connection,
  ConnectionCreate,
  ConnectionUpdate,
  GetConnections200Response,
  GetConnections200ResponseOneOf,
  DeleteConnectionsByIdRequest,
  DeleteUsersByEmailRequest,
  GetConnectionsRequest,
  GetConnectionsByIdRequest,
  GetStatusRequest,
  PatchConnectionsByIdRequest,
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
   * Retrieves every connection matching the specified strategy. All connections are retrieved if no strategy is being specified. Accepts a list of fields to include or exclude in the resulting list of connection objects.
   * This endpoint supports two types of pagination:
   * - Offset pagination
   * - Checkpoint pagination
   *
   * Checkpoint pagination should be used if you need to retrieve more than 1000 connections.
   *
   * <h2>Checkpoint Pagination</h2>
   *
   * To search by checkpoint, use the following parameters:
   * - from: Optional id from which to start selection.
   * - take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.
   *
   * The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter.
   * If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls.
   * When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.
   *
   * Note: The <code>include_totals</code> parameter is not supported when using checkpoint pagination.
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
  ): Promise<ApiResponse<Array<Connection>>>;
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
   * Retrieves a connection by its <code>ID</code>.
   *
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
   * <b>Note:</b> if you use the options parameter, the whole options object will be overridden, so ensure that all parameters are present
   *
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
   * Creates a new connection according to the JSON object received in <code>body</code>.
   *  The samples on the right show all available attributes. Mandatory attributes are <code>name</code> and <code>strategy</code>.
   *  Valid Strategy names are: <code>ad</code>, <code>adfs</code>, <code>amazon</code>, <code>apple</code>, <code>dropbox</code>, <code>bitbucket</code>, <code>aol</code>, <code>auth0-oidc</code>, <code>auth0</code>, <code>baidu</code>, <code>bitly</code>, <code>box</code>, <code>custom</code>, <code>daccount</code>, <code>dwolla</code>, <code>email</code>, <code>evernote-sandbox</code>, <code>evernote</code>, <code>exact</code>, <code>facebook</code>, <code>fitbit</code>, <code>flickr</code>, <code>github</code>, <code>google-apps</code>, <code>google-oauth2</code>, <code>instagram</code>, <code>ip</code>, <code>line</code>, <code>linkedin</code>, <code>miicard</code>, <code>oauth1</code>, <code>oauth2</code>, <code>office365</code>, <code>oidc</code>, <code>okta</code>, <code>paypal</code>, <code>paypal-sandbox</code>, <code>pingfederate</code>, <code>planningcenter</code>, <code>renren</code>, <code>salesforce-community</code>, <code>salesforce-sandbox</code>, <code>salesforce</code>, <code>samlp</code>, <code>sharepoint</code>, <code>shopify</code>, <code>sms</code>, <code>soundcloud</code>, <code>thecity-sandbox</code>, <code>thecity</code>, <code>thirtysevensignals</code>, <code>twitter</code>, <code>untappd</code>, <code>vkontakte</code>, <code>waad</code>, <code>weibo</code>, <code>windowslive</code>, <code>wordpress</code>, <code>yahoo</code>, <code>yammer</code>, <code>yandex</code>
   *
   * <div class="alert alert-warning">Connections created via this endpoint may redirect users to log in, receive and store user identities, and update user root profiles</div>
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
}
