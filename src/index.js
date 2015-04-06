var Client = require('./client');

module.exports = function(accessToken){
  return new Client(accessToken);
};