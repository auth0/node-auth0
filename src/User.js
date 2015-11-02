var rest = require('rest-orm');
var MetadataUpdater = require('./MetadataUpdater');

/**
 * Abstracts interaction with the users endpoint.
 */
var Users = function (client, id){
  this.id = id;
  this.client = client;
  this.resource = new rest.Client(client.domain + '/users', client.options);
  this.metadataUpdater = new MetadataUpdater(client);
};

/**
 * Create a new user.
 *
 * @method
 * @param   {Object}    data    User data.
 * @param   {Function}  [cb]    Callback function.
 * @return  {Promise}           User creation promise.
 */
Users.prototype.create = function (data, cb) {
  return this.resource.create(data, cb);
};

/**
 * Get all users.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}         Users retrieval promise.
 */
Users.prototype.getAll = function (cb) {
  return this.resource.getAll(cb);
};

/**
 * Get a user by its id.
 *
 * @method
 * @param   {any}       id    The user id.
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}         User retrieval promise.
 */
Users.prototype.get = function (id, cb) {
  return this.resource.get(id, cb);
};

/**
 * Update a user by its id.
 *
 * @method
 * @param   {any}       id    The user id.
 * @param   {Object}    data  New user data.
 * @param   {Function}  [cb]  Callback function
 * @return  {Promise}         User update promise.
 */
Users.prototype.update = function (id, data, cb) {
  return this.resource.update(id, data, cb);
};

Users.prototype.updateAppMetadata = function(id, updatedMetadata, cb){
  return this.metadataUpdater.update(id, {
    updatedMetadata: updatedMetadata,
    type: 'app_metadata'
  }, cb);
};

Users.prototype.updateUserMetadata = function(id, updatedMetadata, cb){
  return this.metadataUpdater.update(id, {
    updatedMetadata: updatedMetadata,
    type: 'user_metadata'
  }, cb);
};

module.exports = Users;
