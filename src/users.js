var MetadataUpdater = require('./metadataUpdater');
var UserCreator     = require('./userCreator');

function Users(client, id){
  this.id = id;
  this.client = client;
  this.metadataUpdater = new MetadataUpdater(client);
  this.userCreator = new UserCreator(client);
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

module.exports = Users;Users.prototype.createUser = function(userData, cb){
  return this.userCreator.create(userData, cb);
};
module.exports = Users;
