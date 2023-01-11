const BaseManager = require('./BaseManager');

/**
 * Abstracts interaction with the tenant endpoint.
 */
class TenantManager extends BaseManager {
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
    this.resource = this._getRestClient('/tenants/settings');
  }

  /**
   * Update the tenant settings.
   *
   * @example
   * management.tenant.updateSettings(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    data  The new tenant settings.
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise|undefined}
   */
  updateSettings(data, cb) {
    if (cb && cb instanceof Function) {
      return this.resource.patch({}, data, cb);
    }

    // Return a promise.
    return this.resource.patch({}, data);
  }

  /**
   * Get the tenant settings..
   *
   * @example
   * management.tenant.getSettings({ include_fields: true, fields: 'friendly_name' }, function (err, settings) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(settings);
   * });
   * @param   {object}    [data]  Request parameters
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  getSettings(data, cb) {
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

module.exports = TenantManager;
