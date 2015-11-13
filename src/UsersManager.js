var RestClient = require('rest-facade').Client;
var MetadataUpdater = require('./MetadataUpdater');
var ArgumentError = require('./exceptions').ArgumentError;

/**
 * @class
 * Abstracts interaction with the users endpoint.
 * @constructor
 */
var UsersManager = function (options){
  var clientOptions = {
    headers: { 'Authorization': 'Bearer ' + options.accessToken },
    query: { convertCase: 'snakeCase', repeatParams: false }
  };

  this.resource = new RestClient(options.baseUrl + '/users/:userId', clientOptions);
  this.metadataUpdater = new MetadataUpdater(options);
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

UsersManager.prototype.updateAppMetadata = function(id, updatedMetadata, cb){
  return this.metadataUpdater.update(id, {
    updatedMetadata: updatedMetadata,
    type: 'app_metadata'
  }, cb);
};

UsersManager.prototype.updateUserMetadata = function(id, updatedMetadata, cb){
  return this.metadataUpdater.update(id, {
    updatedMetadata: updatedMetadata,
    type: 'user_metadata'
  }, cb);
};

module.exports = UsersManager;
