var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

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
var ConnectionsManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  var clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for performing CRUD operations on
   * {@link https://auth0.com/docs/api/v2#!/ConnectionsManagers Auth0
   *  Connections}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/connections/:id ',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/management/v2#!/Connections/delete_users_by_email
   * endpoint}.
   *
   * @type {external:RestClient}
   */
  var userAuth0RestClient = new Auth0RestClient(
    options.baseUrl + '/connections/:id/users',
    clientOptions,
    options.tokenProvider
  );
  this.user = new RetryRestClient(userAuth0RestClient, options.retry);
};

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
utils.wrapPropertyMethod(ConnectionsManager, 'create', 'resource.create');

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
 * var params = {
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
utils.wrapPropertyMethod(ConnectionsManager, 'getAll', 'resource.getAll');

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
utils.wrapPropertyMethod(ConnectionsManager, 'get', 'resource.get');

/**
 * Update an existing connection.
 *
 * @method    update
 * @memberOf  module:management.ConnectionsManager.prototype
 *
 * @example
 * var data = { name: 'newConnectionName' };
 * var params = { id: CONNECTION_ID };
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
utils.wrapPropertyMethod(ConnectionsManager, 'update', 'resource.patch');

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
utils.wrapPropertyMethod(ConnectionsManager, 'delete', 'resource.delete');

/**
 * Delete a connection user by email.
 *
 * @method    delete
 * @memberOf  module:management.ConnectionsManager.prototype
 *
 * @example
 * management.connections.deleteUserByEmail({ id: CONNECTION_ID, email:USER_EMAIL }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // User deleted.
 * });
 *
 * @param   {Object}    params          Connection parameters.
 * @param   {String}    params.id       Connection ID.
 * @param   {String}    params.email    User Email.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
ConnectionsManager.prototype.deleteUserByEmail = function(params, cb) {
  if (typeof params !== 'object' || typeof params.email !== 'string' || params.email.length < 1) {
    throw new ArgumentError('You must provide an email for the deleteUserByEmail method');
  }

  if (!params.id) {
    throw new ArgumentError('The connection id cannot be null or undefined');
  }

  if (cb && cb instanceof Function) {
    return this.user.delete(params, {}, cb);
  }

  return this.user.delete(params, {});
};

module.exports = ConnectionsManager;
