var RestClient = require('rest-facade').Client;


/**
 * @class
 * Abstracts interaction with the tenant endpoint.
 * @constructor
 */
var TenantManager = function (options){
  var clientOptions = {
    headers: options.headers,
    query: { convertCase: 'snakeCase', repeatParams: false }
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
