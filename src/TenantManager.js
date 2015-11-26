var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;


/**
 * @class
 * Abstracts interaction with the tenant endpoint.
 * @constructor
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
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Stats endpoint]{@link https://auth0.com/docs/api/v2#!/Stats}.
   *
   * @type {external:RestClient}
   */
  this.tenant = new RestClient(options.baseUrl + '/tenants/settings', clientOptions);
};

/**
 * Update the tenant settings.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
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
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
TenantManager.prototype.getSettings = function (cb) {
  if (cb && cb instanceof Function) {
    return this.tenant.get({}, cb);
  }

  // Return a promise.
  return this.tenant.get({})
};


module.exports = TenantManager;
