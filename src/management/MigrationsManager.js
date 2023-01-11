const BaseManager = require('./BaseManager');

/**
 * Abstracts interaction with the migrations endpoint.
 */
class MigrationsManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    /**
     * Provides an abstraction layer for consuming the migrations endpoint
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/migrations');
  }

  /**
   * Update the tenant migrations.
   *
   * @example
   * management.migrations.updateMigrations(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    data  The tenant migrations to be updated
   * @param   {object}    data.flags  The tenant migrations flags to be updated
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise|undefined}
   */
  updateMigrations(data, cb) {
    if (cb && cb instanceof Function) {
      return this.resource.patch({}, data, cb);
    }

    // Return a promise.
    return this.resource.patch({}, data);
  }

  /**
   * Get the tenant migrations.
   *
   * @example
   * management.migrations.getMigrations(function (err, migrations) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(migrations.flags);
   * });
   * @param data
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  getMigrations(data, cb) {
    if (data instanceof Function && !cb) {
      cb = data;
      data = {};
    }
    if (cb && cb instanceof Function) {
      return this.resource.get(data, cb);
    }

    // Return a promise.
    return this.resource.get(data);
  }
}

module.exports = MigrationsManager;
