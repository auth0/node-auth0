var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * @class ResourceServersManager
 * Auth0 Resource Servers Manager.
 *
 * {@link https://auth0.com/docs/api/management/v2#!/Resource_Servers Resource Servers} represents
 * your APIs.
 * You can learn more about this in the
 * {@link https://auth0.com/docs/api-auth API Authorization} section of the
 * documentation.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */

var ResourceServersManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide resource server options');
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
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/ResourceServers Auth0 Resource Servers endpoint}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/resource-servers/:id',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Create an API (Resource Server).
 *
 * @method    create
 * @memberOf  module:management.ResourceServersManager.prototype
 *
 * @example
 * management.resourceServers.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Resource Server created.
 * });
 *
 * @param   {Object}    data     Resource Server data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ResourceServersManager, 'create', 'resource.create');

/**
 * Get all resource servers.
 *
 * @method    getAll
 * @memberOf  module:management.ResourceServersManager.prototype
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
 * management.resourceServers.getAll(params, function (err, resourceServers) {
 *   console.log(resourceServers.length);
 * });
 *
 * @param   {Object}    [params]          Resource Servers parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ResourceServersManager, 'getAll', 'resource.getAll');

/**
 * Get a Resource Server.
 *
 * @method    get
 * @memberOf  module:management.ResourceServersManager.prototype
 *
 * @example
 * management.resourceServers.get({ id: RESOURCE_SERVER_ID }, function (err, resourceServer) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(resourceServer);
 * });
 *
 * @param   {Object}    params            Resource Server parameters.
 * @param   {String}    params.id         Resource Server ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ResourceServersManager, 'get', 'resource.get');

/**
 * Update an existing resource server.
 *
 * @method    update
 * @memberOf  module:management.ResourceServersManager.prototype
 *
 * @example
 * var data = { name: 'newResourceServerName' };
 * var params = { id: RESOURCE_SERVER_ID };
 *
 * management.resourceServers.update(params, data, function (err, resourceServer) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(resourceServer.name);  // 'newResourceServernName'
 * });
 *
 * @param   {Object}    params            Resource Server parameters.
 * @param   {String}    params.id         Resource Server ID.
 * @param   {Object}    data              Updated Resource Server data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ResourceServersManager, 'update', 'resource.patch');

/**
 * Delete an existing Resource Server.
 *
 * @method    delete
 * @memberOf  module:management.ResourceServersManager.prototype
 *
 * @example
 * management.resourceServers.delete({ id: RESOURCE_SERVER_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Resource Server deleted.
 * });
 *
 * @param   {Object}    params            Resource Server parameters.
 * @param   {String}    params.id         Resource Server ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ResourceServersManager, 'delete', 'resource.delete');

module.exports = ResourceServersManager;
