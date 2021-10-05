const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Abstracts interaction with the stats endpoint.
 */
class StatsManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
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

    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Stats Stats endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/stats/:type`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);
  }

  /**
   * Get the daily stats.
   *
   * @example
   * var params = {
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
   * @param   {object}    params        Stats parameters.
   * @param   {string}    params.from   The first day in YYYYMMDD format.
   * @param   {string}    params.to     The last day in YYYYMMDD format.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getDaily(params, cb) {
    params = params || {};
    params.type = 'daily';

    if (cb && cb instanceof Function) {
      return this.resource.get(params, cb);
    }

    return this.resource.get(params);
  }

  /**
   * Get a the active users count.
   *
   * @example
   * management.stats.getActiveUsersCount(function (err, usersCount) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(usersCount);
   * });
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise|undefined}
   */
  getActiveUsersCount(cb) {
    const options = { type: 'active-users' };

    if (cb && cb instanceof Function) {
      return this.resource.get(options, cb);
    }

    // Return a promise.
    return this.resource.get(options);
  }
}

module.exports = StatsManager;
