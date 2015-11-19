var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;

/**
 * @class
 * Abstracts interaction with the users endpoint.
 * @constructor
 */
var UsersManager = function (options){
  var clientOptions = {
    headers: options.headers,
    query: { convertCase: 'snakeCase', repeatParams: false }
  };

  this.resource = new RestClient(options.baseUrl + '/users/:id', clientOptions);

  /**
   * Provides an abstraction layer for consuming the
   * [Multifactor Provider endpoint]{@link https://auth0.com/docs/api/v2#!/Users/delete_multifactor_by_provider}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/users/:id/multifactor/:provider', clientOptions);

  /**
   * Provides a simple abstraction layer for linking user accounts.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/users/:id/identities/:userId', clientOptions);
};

/**
 * Create a new user.
 *
 * @method
 * @param   {Object}    data    User data.
 * @param   {Function}  [cb]    Callback function.
 * @return  {Promise}           User creation promise.
 */
UsersManager.prototype.create = function (data, cb) {
  return this.resource.create(data, cb);
};

/**
 * Get all users.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}         UsersManager retrieval promise.
 */
UsersManager.prototype.getAll = function () {
  return this.resource.getAll.apply(this.resource, arguments);
};

/**
 * Get a user by its id.
 *
 * @method
 * @param   {any}       id    The user id.
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}         User retrieval promise.
 */
UsersManager.prototype.get = function () {
  return this.resource.get.apply(this.resource, arguments);
};

/**
 * Update a user by its id.
 *
 * @method
 * @param   {any}       params  The user id.
 * @param   {Object}    data    New user data.
 * @param   {Function}  [cb]    Callback function
 * @return  {Promise}           User update promise.
 */
UsersManager.prototype.update = function () {
  return this.resource.patch.apply(this.resource, arguments);
};

/**
 * Delete a user by its id.
 *
 * @method
 * @return  {Promise}           User delete promise.
 */
UsersManager.prototype.delete = function (params) {
  if (typeof params !== 'object') {
    throw new ArgumentError('You must provide an id for the delete method');
  }

  return this.resource.delete.apply(this.resource, arguments);
};

/**
 * Delete all users.
 *
 * @method
 * @return  {Promise}
 */
UsersManager.prototype.deleteAll = function (cb) {
  if (typeof cb !== 'function') {
    throw new ArgumentError('The deleteAll method only accepts a callback as argument');
  }

  return this.resource.delete.apply(this.resource, arguments);
};

module.exports = UsersManager;
