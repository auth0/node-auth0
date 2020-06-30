var ArgumentError = require('rest-facade').ArgumentError;
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * @class
 * Abstracts interaction with the migrations endpoint.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var MigrationsManager = function(options) {
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
   * Provides an abstraction layer for consuming the migrations endpoint
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/migrations',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Update the tenant migrations.
 *
 * @method    updateMigrations
 * @memberOf  module:management.MigrationsManager.prototype
 *
 * @example
 * management.migrations.updateMigrations(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    data  The tenant migrations to be updated
 * @param   {Object}    data.flags  The tenant migrations flags to be updated
 * @param   {Function}  [cb]  Callback function.
 *
 * @return  {Promise|undefined}
 */
MigrationsManager.prototype.updateMigrations = function(data, cb) {
  if (cb && cb instanceof Function) {
    return this.resource.patch({}, data, cb);
  }

  // Return a promise.
  return this.resource.patch({}, data);
};

/**
 * Get the tenant migrations.
 *
 * @method    getMigrations
 * @memberOf  module:management.MigrationsManager.prototype
 *
 * @example
 * management.migrations.getMigrations(function (err, migrations) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(migrations.flags);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
MigrationsManager.prototype.getMigrations = function(data, cb) {
  if (data instanceof Function && !cb) {
    cb = data;
    data = {};
  }
  if (cb && cb instanceof Function) {
    return this.resource.get(data, cb);
  }

  // Return a promise.
  return this.resource.get(data);
};

module.exports = MigrationsManager;
