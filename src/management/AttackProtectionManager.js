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

  var bruteforceProtection = new Auth0RestClient(
    options.baseUrl + '/attack-protection/brute-force-protection',
    clientOptions,
    options.tokenProvider
  );
  this.bruteforceProtection = new RetryRestClient(bruteforceProtection, options.retry);
};

/**
 * Get the brute force configuration.
 *
 * @method    getBruteforceConfig
 * @memberOf  module:management.AttackProtectionManager.prototype
 *
 * @example
 * management.attackProtection.getBruteforceConfig(params, function (err, bruteforceConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *    // Brute force config
 *    console.log(bruteforceConfig);
 * });
 *
 * @param   {Object}    params            Brute force params (leave empty).
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(
  AttackProtectionManager,
  'getBruteforceConfig',
  'bruteforceProtection.get'
);

/**
 * Update the brute force configuration.
 *
 * @method    updateBruteforceConfig
 * @memberOf  module:management.BrandingManager.prototype
 *
 * @example
 * management.attackProtection.updateBruteforceConfig(params, data, function (err, bruteforceConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 * // Brute force config
 *    console.log(bruteforceConfig);
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
  'updateBruteforceConfig',
  'bruteforceProtection.patch'
);

module.exports = AttackProtectionManager;
