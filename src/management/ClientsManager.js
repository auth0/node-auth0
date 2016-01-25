var RestClient = require('rest-facade').Client;
var ArgumentError = require('../exceptions').ArgumentError;
var utils = require('../utils');


/**
 * @class ClientsManager
 * Auth0 Clients Manager.
 *
 * [Clients](https://auth0.com/docs/api/v2#!/Clients) represent applications.
 * You can learn more about this in the
 * [Applications](https://auth0.com/docs/applications) section of the
 * documentation.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
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
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 Clients endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/clients/:client_id', clientOptions);
};


/**
 * Create an Auth0 client.
 *
 * @method    create
 * @memberOf  module:management.ClientsManager.prototype
 *
 * @example
 * // Using auth0 instance.
 * auth0.createClient(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client created.
 * });
 *
 *
 * // Using the clients manager directly.
 * auth0.clients.create(data, function (err) {
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
 * // Using auth0 instance.
 * auth0.getClients(function (err, clients) {
 *   console.log(clients.length);
 * });
 *
 *
 * // Using the clients manager directly.
 * auth0.clients.getAll(function (err, clients) {
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
 * // Using auth0 instance.
 * auth0.getClient({ client_id: CLIENT_ID }, function (err, client) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(client);
 * });
 *
 *
 * // Using the clients manager directly.
 * auth0.clients.get({ client_id: CLIENT_ID }, function (err, client) {
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
 *
 * // Using auth0 instance.
 * auth0.updateClient(params, data, function (err, client) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(client.name);  // 'newClientName'
 * });
 *
 *
 * // Using the clients manager directly.
 * auth0.clients.update(params, data, function (err, client) {
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
 * // Using auth0 instance.
 * auth0.deleteClient({ client_id: CLIENT_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client deleted.
 * });
 *
 *
 * // Using the clients manager directly.
 * auth0.clients.delete({ client_id: CLIENT_ID }, function (err) {
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
