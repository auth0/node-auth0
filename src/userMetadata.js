var request = require('superagent');
var util = require('util');
var urlJoin  = require('url-join');

var USER_PATCH_URL = '/users/%s';

function UserMetadata(user){
  var client = user.client;
  this.user = user;
  this.accessToken = client.accessToken;
}

UserMetadata.prototype.update = function(updatedMetadata, cb) {
  var partialUrl = util.format(USER_PATCH_URL, this.user.id);
  var fullUrl = urlJoin(this.user.client.baseUrl, partialUrl);

  request
    .patch(fullUrl)
    .set('Authorization', 'Bearer ' + this.accessToken)
    .send({ user_metadata: updatedMetadata })
    .end(function(err, resp){
      return cb(err, resp && resp.body);
    });
};

module.exports = UserMetadata;