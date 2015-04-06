var request = require('superagent');
var Promise = require('bluebird');
var util = require('util');
var urlJoin  = require('url-join');
var ApiError = require('./apiError');
var utils = require('./utils');

var USER_PATCH_URL = '/users/%s';

function Metadata(user){
  var client = user.client;
  this.user = user;
  this.accessToken = client.accessToken;
}

Metadata.prototype.update = function(updatedMetadata, cb) {
  var partialUrl = util.format(USER_PATCH_URL, this.user.id);
  var fullUrl = urlJoin(this.user.client.baseUrl, partialUrl);

  var body = {};
  body[this.type] = updatedMetadata;

  return new Promise(function(res, rej){
    request
    .patch(fullUrl)
    .set('Authorization', 'Bearer ' + this.accessToken)
    .send(body)
    .end(utils.responseHandler(cb || rej, function(resp){
      if (cb) {
        return cb(null, resp.body);
      } else {
        return res(resp.body);
      }
    }));
  });
};

var AppMetadata = function(user){
  AppMetadata.super_.call(this, user);
  this.type = 'app_metadata';
};

util.inherits(AppMetadata, Metadata);

var UserMetadata = function(user){
  UserMetadata.super_.call(this, user);
  this.type = 'user_metadata';
};

util.inherits(UserMetadata, Metadata);

module.exports.AppMetadata = AppMetadata;

module.exports.UserMetadata = UserMetadata;