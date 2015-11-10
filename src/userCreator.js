var request = require('superagent');
var Promise = require('bluebird');
var urlJoin  = require('url-join');
var utils = require('./utils');
var ArgumentError = require('./errors').ArgumentError;

var USER_CREATE_URL = '/users';

function UserCreator(client){
  this.baseUrl = client.baseUrl;
  this.accessToken = client.accessToken;
  this.connection = client.connection;
}

UserCreator.prototype.create = function(params, cb) {
  if (!this.connection){
    throw new ArgumentError('Missing connection');
  }

  var fullUrl = urlJoin(this.baseUrl, USER_CREATE_URL);
  var self = this;

  params.connection = this.connection;

  return new Promise(function(res, rej){
    var done = utils.successCallback(cb, res);
    request
    .post(fullUrl)
    .set('Authorization', 'Bearer ' + self.accessToken)
    .send(params)
    .end(utils.responseHandler(cb || rej, function(resp){
      done(resp.body);
    }));
  });
};

module.exports = UserCreator;
