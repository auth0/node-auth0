var metadata = require('./metadata');
var utils = require('./utils');

function User(client, id){
  this.id = id;
  this.client = client;
}

utils.subEntity(User, 'appMetadata', metadata.AppMetadata);
utils.subEntity(User, 'userMetadata', metadata.UserMetadata);

module.exports = User;