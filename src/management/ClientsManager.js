var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * @class ClientsManager
 * Auth0 Clients Manager.
 *
 * {@link https://auth0.com/docs/api/v2#!/Clients Clients} represent
 * applications.
 * You can learn more about this in the
 * {@link https://auth0.com/docs/applications Applications} section of the
 * documentation.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var ClientsManager = function (options) {
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
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Clients Auth0 Clients endpoint}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(options.baseUrl + '/clients/:client_id', clientOptions, options.tokenProvider);
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};


/**
 * Create an Auth0 client.
 *
 * @method    create
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * management.clients.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client created.
 * });
 *
 * @param   {Object}    data     The client data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'create', 'resource.create');


/**
 * Get all Auth0 clients.
 *
 * @method    getAll
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * management.clients.getAll(function (err, clients) {
 *   console.log(clients.length);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'getAll', 'resource.getAll');


/**
 * Get an Auth0 client.
 *
 * @method    get
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * management.clients.get({ client_id: CLIENT_ID }, function (err, client) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(client);
 * });
 *
 * @param   {Object}    params            Client parameters.
 * @param   {String}    params.client_id  Application client ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'get', 'resource.get');


/**
 * Update an Auth0 client.
 *
 * @method    update
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * var data = { name: 'newClientName' };
 * var params = { client_id: CLIENT_ID };
 *
 * management.clients.update(params, data, function (err, client) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(client.name);  // 'newClientName'
 * });
 *
 * @param   {Object}    params            Client parameters.
 * @param   {String}    params.client_id  Application client ID.
 * @param   {Object}    data              Updated client data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'update', 'resource.patch');


/**
 * Delete an Auth0 client.
 *
 * @method    delete
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * management.clients.delete({ client_id: CLIENT_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client deleted.
 * });
 *
 * @param   {Object}    params            Client parameters.
 * @param   {String}    params.client_id  Application client ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientsManager, 'delete', 'resource.delete');


module.exports = ClientsManager;
