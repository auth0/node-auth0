const BaseManager = require('./BaseManager');

/**
 * Simple facade for consuming a REST API endpoint.
 *
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

class AttackProtectionManager extends BaseManager {
  /**
   * @class
   * Abstracts interaction with the attack-protection endpoints.
   * @class
   * @param {object} options                 The client options.
   * @param {string} options.baseUrl         The URL of the API.
   * @param {object} [options.headers]       Headers to be included in all requests.
   * @param {object} [options.retry]         Retry Policy Config
   * @param {object} [options.tokenProvider] Management API Token Provider
   */
  constructor(options) {
    super(options);

    this.bruteForceProtection = this._getRestClient('/attack-protection/brute-force-protection');

    this.suspiciousIpThrottling = this._getRestClient(
      '/attack-protection/suspicious-ip-throttling'
    );

    this.breachedPasswordDetection = this._getRestClient(
      '/attack-protection/breached-password-detection'
    );
  }

  /**
   * Get the Brute Force Protection configuration.
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
   * @param   {object}    params            Brute force parameters (leave empty).
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getBruteForceConfig(...args) {
    return this.bruteForceProtection.get(...args);
  }

  /**
   * Update the Brute Force Protection configuration.
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
   * @param   {object}    params            Brute force parameters (leave empty).
   * @param   {object}    data              Updated brute force configuration.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateBruteForceConfig(...args) {
    return this.bruteForceProtection.patch(...args);
  }

  /**
   * Get the Suspicious IP Throttling configuration.
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
   * @param   {object}    params            Suspicious IP throttling parameters (leave empty).
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getSuspiciousIpThrottlingConfig(...args) {
    return this.suspiciousIpThrottling.get(...args);
  }

  /**
   * Update the Suspicious IP Throttling configuration.
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
   * @param   {object}    params            Suspicious IP throttling parameters (leave empty).
   * @param   {object}    data              Updated suspicious IP throttling configuration.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateSuspiciousIpThrottlingConfig(...args) {
    return this.suspiciousIpThrottling.patch(...args);
  }

  /**
   * Get the Breached Password Detection configuration.
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
   * @param   {object}    params            Breached password detection parameters (leave empty).
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getBreachedPasswordDetectionConfig(...args) {
    return this.breachedPasswordDetection.get(...args);
  }

  /**
   * Update the breached password detection configuration.
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
   * @param   {object}    params            Breached password detection parameters (leave empty).
   * @param   {object}    data              Updated breached password detection configuration.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateBreachedPasswordDetectionConfig(...args) {
    return this.breachedPasswordDetection.patch(...args);
  }
}
module.exports = AttackProtectionManager;
