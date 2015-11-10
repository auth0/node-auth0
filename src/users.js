var MetadataUpdater = require('./metadataUpdater');
var UserCreator     = require('./userCreator');
var UserSearch      = require('./userSearch');

function Users(client, id){
  this.id = id;
  this.client = client;
  this.metadataUpdater = new MetadataUpdater(client);
  this.userCreator = new UserCreator(client);
  this.userSearch = new UserSearch(client);
}

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

Users.prototype.createUser = function(userData, cb){
  return this.userCreator.create(userData, cb);
};

Users.prototype.searchUser = function(params, cb){
  return this.userSearch.search(params, cb);
};

module.exports = Users;
