var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class BlacklistedToken
 * Auth0 BlacklistedToken.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.token      The API access token.
 * @param {String} [options.region]   The code for the region in use.
 * @param {String} [options.domain]   The API domain for the region in use.
 */
var BlacklistedToken = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
  }

  /**
   * Options object for the Rest Client instace.
   *
   * @type {Object}
   */
  clientOptions = {
    headers: { 'Authorization': 'Bearer ' + options.accessToken },
    query: { convertCase: 'snakeCase' }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 Blacklisted Tokens endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/blacklists/tokens/', clientOptions);
};

/**
 * Create an Auth0 client.
 *
 * @method    create
 * @memberOf  BlacklistedToken
 * @return    {Promise}
 */
utils.wrapPropertyMethod(BlacklistedToken, 'add', 'resource.create');

/**
 * Get all Auth0 clients.
 *
 * @method  getAll
 * @memberOf  BlacklistedToken
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(BlacklistedToken, 'getAll', 'resource.getAll');


module.exports = BlacklistedToken;
