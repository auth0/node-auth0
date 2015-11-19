var RestClient = require('rest-facade').Client;


/**
 * @class
 * Abstracts interaction with the stats endpoint.
 * @constructor
 */
var StatsManager = function (options){
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
  this.stats = new RestClient(options.baseUrl + '/stats/:type', clientOptions);
};

/**
 * Get the daily stats.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
StatsManager.prototype.getDaily = function (params, cb) {
  params = params || {};
  params.type = 'daily';

  if (cb && cb instanceof Function) {
    return this.stats.get(params, cb);
  }

  return this.stats.get(params);
};

/**
 * Get a the active users count.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}         User retrieval promise.
 */
StatsManager.prototype.getActiveUsersCount = function (cb) {
  var options = { type: 'active-users' };

  if (cb && cb instanceof Function) {
    return this.stats.get(options, cb);
  }

  // Return a promise.
  return this.stats.get(options)
};


module.exports = StatsManager;
