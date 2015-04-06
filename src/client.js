var User = require('./user');
var BASE_URL = 'https://login.auth0.com/api/v2';

function Client(accessToken){
  this.accessToken = accessToken;
  this.baseUrl = BASE_URL;
}

Client.prototype.user = function(id){
  // TODO: caching
  return new User(this, id);
};

module.exports = Client;