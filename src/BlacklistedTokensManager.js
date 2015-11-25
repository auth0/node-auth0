var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class BlacklistedTokensManager
 * Blacklisted Tokens Manager.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.token      The API access token.
 * @param {String} [options.region]   The code for the region in use.
 * @param {String} [options.domain]   The API domain for the region in use.
 */
var BlacklistedTokensManager = function (options) {
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
   * Options object for the Rest Client instace.
   *
   * @type {Object}
   */
  clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 Blacklisted Tokens endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/blacklists/tokens', clientOptions);
};

/**
 * Blacklist a new token.
 *
 * @method    create
 * @memberOf  BlacklistedTokensManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(BlacklistedTokensManager, 'add', 'resource.create');

/**
 * Get all blacklisted tokens.
 *
 * @method  getAll
 * @memberOf  BlacklistedTokensManager
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(BlacklistedTokensManager, 'getAll', 'resource.getAll');


module.exports = BlacklistedTokensManager;
