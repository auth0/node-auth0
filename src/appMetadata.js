var request = require('superagent');
var util = require('util');
var urlJoin  = require('url-join');

var USER_PATCH_URL = '/users/%s';

function AppMetadata(user){
  var client = user.client;
  this.user = user;
  this.accessToken = client.accessToken;
}

AppMetadata.prototype.update = function(updatedMetadata, cb) {
  var partialUrl = util.format(USER_PATCH_URL, this.user.id);
  var fullUrl = urlJoin(this.user.client.baseUrl, partialUrl);

  request
    .patch(fullUrl)
    .set('Authorization', 'Bearer ' + this.accessToken)
    .send({ app_metadata: updatedMetadata })
    .end(function(err, resp){
      return cb(err, resp && resp.body);
    });
};

module.exports = AppMetadata;