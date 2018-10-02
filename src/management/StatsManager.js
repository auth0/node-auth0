const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class
 * Abstracts interaction with the stats endpoint.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
class StatsManager {
  constructor(options) {
    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide manager options');
    }

    if (options.baseUrl === null || options.baseUrl === undefined) {
      throw new ArgumentError('Must provide a base URL for the API');
    }

    if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
      throw new ArgumentError('The provided base URL is invalid');
    }

    const { headers, baseUrl, tokenProvider, retry } = options;

    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers,
      query: { repeatParams: false }
    };

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Stats Stats endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${baseUrl}/stats/:type`,
      clientOptions,
      tokenProvider
    );
    this.stats = new RetryRestClient(auth0RestClient, retry);
  }

  /**
   * Get the daily stats.
   *
   * @method    getDaily
   * @memberOf  module:management.StatsManager.prototype
   *
   * @example
   * const params = {
   *   from: '{YYYYMMDD}',  // First day included in the stats.
   *   to: '{YYYYMMDD}'  // Last day included in the stats.
   * };
   *
   * management.stats.getDaily(params, function (err, stats) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(stats);
   * });
   *
   * @param   {Object}    params        Stats parameters.
   * @param   {String}    params.from   The first day in YYYYMMDD format.
   * @param   {String}    params.to     The last day in YYYYMMDD format.
   * @param   {Function}  [cb]          Callback function.
   *
   * @return  {Promise|undefined}
   */
  getDaily(params = {}, cb) {
    params.type = 'daily';

    if (cb && cb instanceof Function) {
      return this.stats.get(params, cb);
    }

    return this.stats.get(params);
  }

  /**
   * Get a the active users count.
   *
   * @method    getActiveUsersCount
   * @memberOf  module:management.StatsManager.prototype
   *
   * @example
   * management.stats.getActiveUsersCount(function (err, usersCount) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(usersCount);
   * });
   *
   * @param   {Function}  [cb]  Callback function.
   *
   * @return  {Promise|undefined}
   */
  getActiveUsersCount(cb) {
    const options = { type: 'active-users' };

    if (cb && cb instanceof Function) {
      return this.stats.get(options, cb);
    }

    // Return a promise.
    return this.stats.get(options);
  }
}

module.exports = StatsManager;
