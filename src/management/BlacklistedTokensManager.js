var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * @class BlacklistedTokensManager
 * The BlacklistedTokensManager class provides methods to retrieve the list of
 * blacklisted tokens and blacklist new ones..
 * @constructor
 * @memberOf  module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
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
  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 Blacklisted Tokens endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(options.baseUrl + '/blacklists/tokens', clientOptions, options.tokenProvider);
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};


/**
 * Blacklist a new token.
 *
 * @method    add
 * @memberOf  module:management.BlacklistedTokensManager.prototype
 *
 * @example
 * var token = {
 *  aud: 'aud',
 *  jti: 'jti'
 * };
 *
 * management.blacklistedTokens.add(token, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Token blacklisted.
 * });
 *
 * @param   {Object}    token      Token data.
 * @param   {String}    token.aud  Audience (your app client ID).
 * @param   {String}    token.jti  The JWT ID claim.
 * @param   {Function}  [cb]       Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(BlacklistedTokensManager, 'add', 'resource.create');


/**
 * Get all blacklisted tokens.
 *
 * @method    getAll
 * @memberOf  module:management.BlacklistedTokensManager.prototype
 *
 * @example
 * management.blacklistedTokens.getAll(function (err, tokens) {
 *   console.log(tokens.length);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(BlacklistedTokensManager, 'getAll', 'resource.getAll');


module.exports = BlacklistedTokensManager;
