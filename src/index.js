var Client = require('./Client');

var exports = module.exports = function(accessToken){
  return new Client(accessToken);
};

exports.Client = Client;
exports.User = require('./User');
