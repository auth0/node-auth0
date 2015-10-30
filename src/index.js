var Client = require('./client');

var exports = module.exports = function(accessToken){
  return new Client(accessToken);
};

exports.Client = Client;
exports.User = require('./user');
