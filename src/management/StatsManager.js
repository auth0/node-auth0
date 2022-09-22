const BaseManager = require('./BaseManager');

/**
 * Abstracts interaction with the stats endpoint.
 */
class StatsManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Stats Stats endpoint}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/stats/:type');
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
