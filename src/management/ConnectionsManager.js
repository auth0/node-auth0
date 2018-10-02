const { ArgumentError } = require('rest-facade');
const { wrapPropertyMethod } = require('../utils');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * @class ConnectionsManager
 * Represents the relationship between Auth0 and an Identity provider.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
class ConnectionsManager {
  constructor(options) {
    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide client options');
    }

    if (options.baseUrl === null || options.baseUrl === undefined) {
      throw new ArgumentError('Must provide a base URL for the API');
    }

    if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
      throw new ArgumentError('The provided base URL is invalid');
    }

    const { headers, baseUrl, tokenProvider, retry } = options;

    /**
     * Options object for the Rest Client instance.
     *
     * @type {Object}
     */
    const clientOptions = {
      headers,
      query: { repeatParams: false }
    };

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://auth0.com/docs/api/v2#!/ConnectionsManagers Auth0
     *  Connections}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${baseUrl}/connections/:id`,
      clientOptions,
      tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, retry);
  }
}

/**
 * Create a new connection.
 *
 * @method    create
 * @memberOf  module:management.ConnectionsManager.prototype
 *
 * @example
 * management.connections.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Connection created.
 * });
 *
 * @param   {Object}    data     Connection data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(ConnectionsManager, 'create', 'resource.create');

/**
 * Get all connections.
 *
 * @method    getAll
 * @memberOf  module:management.ConnectionsManager.prototype
 *
 * @example <caption>
 *   This method takes an optional object as first argument that may be used to
 *   specify pagination settings. If pagination options are not present,
 *   the first page of a limited number of results will be returned.
 * </caption>
 *
 * // Pagination settings.
 * const params = {
 *   per_page: 10,
 *   page: 0
 * };
 *
 * management.connections.getAll(params, function (err, connections) {
 *   console.log(connections.length);
 * });
 *
 * @param   {Object}    [params]          Connections params.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(ConnectionsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 connection.
 *
 * @method    get
 * @memberOf  module:management.ConnectionsManager.prototype
 *
 * @example
 * management.connections.get({ id: CONNECTION_ID }, function (err, connection) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(connection);
 * });
 *
 * @param   {Object}    params          Connection parameters.
 * @param   {String}    params.id       Connection ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(ConnectionsManager, 'get', 'resource.get');

/**
 * Update an existing connection.
 *
 * @method    update
 * @memberOf  module:management.ConnectionsManager.prototype
 *
 * @example
 * const data = { name: 'newConnectionName' };
 * const params = { id: CONNECTION_ID };
 *
 * management.connections.update(params, data, function (err, connection) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(connection.name);  // 'newConnectionName'
 * });
 *
 * @param   {Object}    params        Connection parameters.
 * @param   {String}    params.id     Connection ID.
 * @param   {Object}    data          Updated connection data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return    {Promise|undefined}
 */
wrapPropertyMethod(ConnectionsManager, 'update', 'resource.patch');

/**
 * Delete an existing connection.
 *
 * @method    delete
 * @memberOf  module:management.ConnectionsManager.prototype
 *
 * @example
 * management.connections.delete({ id: CONNECTION_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Connection deleted.
 * });
 *
 * @param   {Object}    params          Connection parameters.
 * @param   {String}    params.id       Connection ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(ConnectionsManager, 'delete', 'resource.delete');

module.exports = ConnectionsManager;
