var ArgumentError = require('rest-facade').ArgumentError;
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');
var utils = require('../utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class
 * Abstracts interaction with the attack-protection endpoints.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options                 The client options.
 * @param {String} options.baseUrl         The URL of the API.
 * @param {Object} [options.headers]       Headers to be included in all requests.
 * @param {Object} [options.retry]         Retry Policy Config
 * @param {Object} [options.tokenProvider] Management API Token Provider
 */
var AttackProtectionManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  var bruteForceProtection = new Auth0RestClient(
    options.baseUrl + '/attack-protection/brute-force-protection',
    clientOptions,
    options.tokenProvider
  );
  this.bruteForceProtection = new RetryRestClient(bruteForceProtection, options.retry);
};

/**
 * Get the brute force configuration.
 *
 * @method    getBruteForceConfig
 * @memberOf  module:management.AttackProtectionManager.prototype
 *
 * @example
 * management.attackProtection.getBruteForceConfig(params, function (err, bruteForceConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *    // Brute force config
 *    console.log(bruteForceConfig);
 * });
 *
 * @param   {Object}    params            Brute force params (leave empty).
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(
  AttackProtectionManager,
  'getBruteForceConfig',
  'bruteForceProtection.get'
);

/**
 * Update the brute force configuration.
 *
 * @method    updateBruteForceConfig
 * @memberOf  module:management.BrandingManager.prototype
 *
 * @example
 * management.attackProtection.updateBruteForceConfig(params, data, function (err, bruteForceConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 * // Brute force config
 *    console.log(bruteForceConfig);
 * });
 *
 * @param   {Object}    params            Brute force params (leave empty).
 * @param   {Object}    data              Updated brute force config.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(
  AttackProtectionManager,
  'updateBruteForceConfig',
  'bruteForceProtection.patch'
);

module.exports = AttackProtectionManager;
