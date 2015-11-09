var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class Client
 * Auth0 Client.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.token      The API access token.
 * @param {String} [options.region]   The code for the region in use.
 * @param {String} [options.domain]   The API domain for the region in use.
 */
var Client = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  clientOptions = {
    headers: { 'Authorization': 'Bearer ' + options.accessToken },
    query: { convertCase: 'snakeCase' }
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
 * @memberOf  Client
 * @return    {Promise}
 */
utils.wrapPropertyMethod(Client, 'create', 'resource.create');

/**
 * Get all Auth0 clients.
 *
 * @method  getAll
 * @memberOf  Client
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(Client, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 client.
 *
 * @method  get
 * @memberOf  Client
 * @return  {Promise}
 */
utils.wrapPropertyMethod(Client, 'get', 'resource.get');

/**
 * Update an Auth0 client.
 *
 * @method    update
 * @memberOf  Client
 * @return    {Promise}
 */
utils.wrapPropertyMethod(Client, 'update', 'resource.patch');

/**
 * Delete an Auth0 client.
 *
 * @method    delete
 * @memberOf  Client
 * @return    {Promise}
 */
utils.wrapPropertyMethod(Client, 'delete', 'resource.delete');


module.exports = Client;
