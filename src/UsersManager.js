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

  this.users = new RestClient(options.baseUrl + '/users/:id', clientOptions);

  /**
   * Provides an abstraction layer for consuming the
   * [Multifactor Provider endpoint]{@link https://auth0.com/docs/api/v2#!/Users/delete_multifactor_by_provider}.
   *
   * @type {external:RestClient}
   */
  this.multifactor = new RestClient(options.baseUrl + '/users/:id/multifactor/:provider', clientOptions);

  /**
   * Provides a simple abstraction layer for linking user accounts.
   *
   * @type {external:RestClient}
   */
  this.identities = new RestClient(options.baseUrl + '/users/:id/identities/:provider/:userId', clientOptions);
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
  if (cb && cb instanceof Function) {
    return this.users.create(data, cb);
  }

  return this.users.create(data);
};


/**
 * Get all users.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}         UsersManager retrieval promise.
 */
UsersManager.prototype.getAll = function () {
  return this.users.getAll.apply(this.users, arguments);
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
  return this.users.get.apply(this.users, arguments);
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
  return this.users.patch.apply(this.users, arguments);
};


/**
 * Delete a user by its id.
 *
 * @method
 * @return  {Promise}           User delete promise.
 */
UsersManager.prototype.delete = function (params) {
  if (typeof params !== 'object' || Number.isNaN(params.id)) {
    throw new ArgumentError('You must provide an id for the delete method');
  }

  return this.users.delete.apply(this.users, arguments);
};


/**
 * Delete all users.
 *
 * @method
 * @return  {Promise}
 */
UsersManager.prototype.deleteAll = function (cb) {
  if (typeof cb !== 'function') {
    var errorMsg = 'The deleteAll method only accepts a callback as argument';

    throw new ArgumentError(errorMsg);
  }

  return this.users.delete.apply(this.users, arguments);
};


/**
 * Delete a multifactor provider.
 *
 * @method
 * @return  {Promise}
 */
UsersManager.prototype.deleteMultifactorProvider = function (params, cb) {
  params = params || {};

  if (!params.id || typeof params.id !== 'string') {
    throw new ArgumentError('The id parameter must be a valid user id');
  }

  if (!params.provider || typeof params.provider !== 'string') {
    throw new ArgumentError('Must specify a provider');
  }

  if (cb && cb instanceof Function) {
    return this.multifactor.delete(params, cb);
  }

  return this.multifactor.delete(params);
};


/**
 * Link the user with another account.
 *
 * @method
 * @return  {Promise}
 */
UsersManager.prototype.link = function (userId, params, cb) {
  var query = { id: userId };
  params = params || {};

  // Require a user ID.
  if (!userId || typeof userId !== 'string') {
    throw new ArgumentError('The userId cannot be null or undefined');
  }

  if (cb && cb instanceof Function) {
    return this.identities.create(query, params, cb);
  }

  return this.identities.create(query, params);
};


/**
 * Unlink the given accounts.
 *
 * @method
 * @return {Promise}
 */
UsersManager.prototype.unlink = function (params, cb) {
  params = params || {};

  if (!params.id || typeof params.id !== 'string') {
    throw new ArgumentError('The id cannot be null or undefined');
  }

  if (!params.userId || typeof params.userId !== 'string') {
    throw new ArgumentError('A userId is required');
  }

  if (!params.provider || typeof params.provider !== 'string') {
    throw new ArgumentError('You must specify a provider');
  }

  if (cb && cb instanceof Function) {
    return this.identities.delete(params, cb);
  }

  return this.identities.delete(params);
};


module.exports = UsersManager;
