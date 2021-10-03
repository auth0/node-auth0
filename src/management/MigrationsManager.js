const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * @class
 * Abstracts interaction with the migrations endpoint.
 * @class
 * @memberof module:management
 * @param {object} options            The client options.
 * @param {string} options.baseUrl    The URL of the API.
 * @param {object} [options.headers]  Headers to be included in all requests.
 * @param {object} [options.retry]    Retry Policy Config
 */
const MigrationsManager = function (options) {
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
   * Provides an abstraction layer for consuming the migrations endpoint
   *
   * @type {external:RestClient}
   */
  const auth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/migrations`,
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Update the tenant migrations.
 *
 * @function    updateMigrations
 * @memberof  module:management.MigrationsManager.prototype
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
MigrationsManager.prototype.updateMigrations = function (data, cb) {
  if (cb && cb instanceof Function) {
    return this.resource.patch({}, data, cb);
  }

  // Return a promise.
  return this.resource.patch({}, data);
};

/**
 * Get the tenant migrations.
 *
 * @function    getMigrations
 * @memberof  module:management.MigrationsManager.prototype
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
MigrationsManager.prototype.getMigrations = function (data, cb) {
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
