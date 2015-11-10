var request = require('superagent');
var Promise = require('bluebird');
var urlJoin  = require('url-join');
var utils = require('./utils');

var USER_SEARCH_URL = '/users';

function UserSearch(client){
  this.baseUrl = client.baseUrl;
  this.accessToken = client.accessToken;
}

UserSearch.prototype.search = function(params, cb) {
  var fullUrl = urlJoin(this.baseUrl, USER_SEARCH_URL);
  var self = this;

  params.search_engine = 'v2';

  return new Promise(function(res, rej){
    var done = utils.successCallback(cb, res);
    request
    .get(fullUrl)
    .query(params)
    .set('Authorization', 'Bearer ' + self.accessToken)
    .send(params)
    .end(utils.responseHandler(cb || rej, function(resp){
      done(resp.body);
    }));
  });
};

module.exports = UserSearch;
