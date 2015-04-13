var MetadataUpdater = require('./metadataUpdater');

function Users(client, id){
  this.id = id;
  this.client = client;
  this.metadataUpdater = new MetadataUpdater(client);
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

module.exports = Users;