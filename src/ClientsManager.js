var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class ClientsManager
 * Auth0 Clients Manager.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.token      The API access token.
 * @param {String} [options.region]   The code for the region in use.
 * @param {String} [options.domain]   The API domain for the region in use.
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

  if (options.accessToken === null || options.accessToken === undefined) {
    throw new ArgumentError('Must provide an access token');
  }

  if ('string' !== typeof options.accessToken|| options.accessToken.length === 0) {
    throw new ArgumentError('Invalid access token');
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  clientOptions = {
    headers: headers,
    query: { convertCase: 'snakeCase', repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 Clients endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/clients/:clientId', clientOptions);
};

/**
 * Create an Auth0 client.
 *
 * @method    create
 * @memberOf  ClientsManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(ClientsManager, 'create', 'resource.create');

/**
 * Get all Auth0 clients.
 *
 * @method  getAll
 * @memberOf  ClientsManager
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(ClientsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 client.
 *
 * @method  get
 * @memberOf  ClientsManager
 * @return  {Promise}
 */
utils.wrapPropertyMethod(ClientsManager, 'get', 'resource.get');

/**
 * Update an Auth0 client.
 *
 * @method    update
 * @memberOf  ClientsManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(ClientsManager, 'update', 'resource.patch');

/**
 * Delete an Auth0 client.
 *
 * @method    delete
 * @memberOf  ClientsManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(ClientsManager, 'delete', 'resource.delete');


module.exports = ClientsManager;
