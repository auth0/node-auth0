var AppMetadata = require('./appMetadata');
var UserMetadata = require('./userMetadata');
var utils = require('./utils');

function User(client, id){
  this.id = id;
  this.client = client;
}

utils.subEntity(User, 'appMetadata', AppMetadata);
utils.subEntity(User, 'userMetadata', UserMetadata);

module.exports = User;