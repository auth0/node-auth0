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

  var suspiciousIpThrottling = new Auth0RestClient(
    options.baseUrl + '/attack-protection/suspicious-ip-throttling',
    clientOptions,
    options.tokenProvider
  );
  this.suspiciousIpThrottling = new RetryRestClient(suspiciousIpThrottling, options.retry);

  var breachedPasswordDetection = new Auth0RestClient(
    options.baseUrl + '/attack-protection/breached-password-detection',
    clientOptions,
    options.tokenProvider
  );
  this.breachedPasswordDetection = new RetryRestClient(breachedPasswordDetection, options.retry);
};

/**
 * Get the Brute Force Protection configuration.
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
 *   // Brute force config
 *   console.log(bruteForceConfig);
 * });
 *
 * @param   {Object}    params            Brute force parameters (leave empty).
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
 * Update the Brute Force Protection configuration.
 *
 * @method    updateBruteForceConfig
 * @memberOf module:management.AttackProtectionManager.prototype
 *
 * @example
 * management.attackProtection.updateBruteForceConfig(params, data, function (err, bruteForceConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Brute force config
 *   console.log(bruteForceConfig);
 * });
 *
 * @param   {Object}    params            Brute force parameters (leave empty).
 * @param   {Object}    data              Updated brute force configuration.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(
  AttackProtectionManager,
  'updateBruteForceConfig',
  'bruteForceProtection.patch'
);

/**
 * Get the Suspicious IP Throttling configuration.
 *
 * @method    getSuspiciousIpThrottlingConfig
 * @memberOf  module:management.AttackProtectionManager.prototype
 *
 * @example
 * management.attackProtection.getSuspiciousIpThrottlingConfig(params, function (err, suspiciousIpThrottlingConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Access suspicious IP throttling configuration
 *   console.log(suspiciousIpThrottlingConfig);
 * });
 *
 * @param   {Object}    params            Suspicious IP throttling parameters (leave empty).
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(
  AttackProtectionManager,
  'getSuspiciousIpThrottlingConfig',
  'suspiciousIpThrottling.get'
);

/**
 * Update the Suspicious IP Throttling configuration.
 *
 * @method    updateSuspiciousIpThrottlingConfig
 * @memberOf  module:management.AttackProtectionManager.prototype
 *
 * @example
 * management.attackProtection.updateSuspiciousIpThrottlingConfig(params, data, function (err, suspiciousIpThrottlingConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Access suspicious IP throttling configuration
 *   console.log(suspiciousIpThrottlingConfig);
 * });
 *
 * @param   {Object}    params            Suspicious IP throttling parameters (leave empty).
 * @param   {Object}    data              Updated suspicious IP throttling configuration.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(
  AttackProtectionManager,
  'updateSuspiciousIpThrottlingConfig',
  'suspiciousIpThrottling.patch'
);

/**
 * Get the Breached Password Detection configuration.
 *
 * @method    getBreachedPasswordDetectionConfig
 * @memberOf  module:management.AttackProtectionManager.prototype
 *
 * @example
 * management.attackProtection.getBreachedPasswordDetectionConfig(params, function (err, breachedPasswordDetectionConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Access breached password detection configuration
 *   console.log(breachedPasswordDetectionConfig);
 * });
 *
 * @param   {Object}    params            Breached password detection parameters (leave empty).
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(
  AttackProtectionManager,
  'getBreachedPasswordDetectionConfig',
  'breachedPasswordDetection.get'
);

/**
 * Update the breached password detection configuration.
 *
 * @method    updateBreachedPasswordDetectionConfig
 * @memberOf  module:management.AttackProtectionManager.prototype
 *
 * @example
 * management.attackProtection.updateBreachedPasswordDetectionConfig(params, data, function (err, breachedPasswordDetectionConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Access breached password detection configuration
 *   console.log(breachedPasswordDetectionConfig);
 * });
 *
 * @param   {Object}    params            Breached password detection parameters (leave empty).
 * @param   {Object}    data              Updated breached password detection configuration.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(
  AttackProtectionManager,
  'updateBreachedPasswordDetectionConfig',
  'breachedPasswordDetection.patch'
);

module.exports = AttackProtectionManager;
