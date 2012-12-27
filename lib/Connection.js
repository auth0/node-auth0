var request = require('request'),
  xtend = require('xtend');

function Connection (client, accessToken, data) {
  xtend(this, data);

  // this.getUsers = function (options, done) {
}


module.exports = Connection;