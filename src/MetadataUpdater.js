var request = require('superagent');
var Promise = require('bluebird');
var util = require('util');
var urlJoin  = require('url-join');
var utils = require('./utils');

var USER_PATCH_URL = '/users/%s';

function MetadataUpdater(client){
  this.baseUrl = client.baseUrl;
  this.accessToken = client.accessToken;
}

MetadataUpdater.prototype.update = function(id, params, cb) {
  var partialUrl = util.format(USER_PATCH_URL, id);
  var fullUrl = urlJoin(this.baseUrl, partialUrl);

  var body = {};
  body[params.type] = params.updatedMetadata;

  var self = this;

  return new Promise(function(res, rej){
    var done = utils.successCallback(cb, res);
    request
    .patch(fullUrl)
    .set('Authorization', 'Bearer ' + self.accessToken)
    .send(body)
    .end(utils.responseHandler(cb || rej, function(resp){
      done(resp.body);
    }));
  });
};

module.exports = MetadataUpdater;