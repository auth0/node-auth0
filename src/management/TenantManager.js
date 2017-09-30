var ArgumentError = require('rest-facade').ArgumentError;
var Auth0RestClient = require('../Auth0RestClient');


/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */


/**
 * @class
 * Abstracts interaction with the tenant endpoint.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 */
var TenantManager = function (options){
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

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Stats Stats endpoint}.
   *
   * @type {external:RestClient}
   */
  this.tenant = new Auth0RestClient(options.baseUrl + '/tenants/settings', clientOptions,  options.tokenProvider);
};

/**
 * Update the tenant settings.
 *
 * @method    updateSettings
 * @memberOf  module:management.TenantManager.prototype
 *
 * @example
 * management.tenant.updateSettings(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    data  The new tenant settings.
 * @param   {Function}  [cb]  Callback function.
 *
 * @return  {Promise|undefined}
 */
TenantManager.prototype.updateSettings = function (data, cb) {
  if (cb && cb instanceof Function) {
    return this.tenant.patch({}, data, cb);
  }

  // Return a promise.
  return this.tenant.patch({}, data);
};

/**
 * Get the tenant settings..
 *
 * @method    getSettings
 * @memberOf  module:management.TenantManager.prototype
 *
 * @example
 * management.tenant.getSettings(function (err, settings) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(settings);
 * });
 *
 * @param   {Function}  [cb]  Callback function.
 *
 * @return  {Promise|undefined}
 */
TenantManager.prototype.getSettings = function (cb) {
  if (cb && cb instanceof Function) {
    return this.tenant.get({}, cb);
  }

  // Return a promise.
  return this.tenant.get({});
};


module.exports = TenantManager;
