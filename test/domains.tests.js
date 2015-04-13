var expect = require('chai').expect;
var nock = require('nock');
var util = require('util');
var constants = require('./constants');

var TOKEN = 'token';


describe('regions', function(){
  var user_id = 'google-oauth%7C1234';
  var url = util.format(constants.USER_SUB_ROUTE, user_id);
  var update = {
    roles: ['reader', 'writer'],
    permissions: null
  };

  var body = {
    app_metadata: update
  };

  var localNock, auth0;

  before(function(){
    auth0 = require('..')({
      token: TOKEN,
      region: 'eu'
    });

    localNock = nock(constants.EU_BASE_API_URL, {
      reqheaders: {
        'Authorization': 'Bearer ' + TOKEN
      }
    })
    .patch(url, body)
    .reply(401, {
      'statusCode': 401,
      'error': 'Unauthorized',
      'message': 'Invalid token'
    });
  });

  after(nock.cleanAll);

  it ('should perform request against correct domain', function(){
    return auth0.users.updateAppMetadata(user_id, update).catch(function(err){
      expect(err).to.not.be.undefined;
      expect(err.statusCode).to.equal(401);
      expect(err.error).to.equal('Unauthorized');
      expect(err.message).to.equal('Invalid token');
      localNock.done();
    });
  });
});

describe('domains', function(){
  var user_id = 'google-oauth%7C1234';
  var url = util.format(constants.USER_SUB_ROUTE, user_id);
  var update = {
    roles: ['reader', 'writer'],
    permissions: null
  };

  var body = {
    app_metadata: update
  };

  var localNock, auth0;

  before(function(){
    auth0 = require('..')({
      token: TOKEN,
      domain: 'login0.myauth0.com'
    });

    localNock = nock('https://login0.myauth0.com/api/v2', {
      reqheaders: {
        'Authorization': 'Bearer ' + TOKEN
      }
    })
    .patch(url, body)
    .reply(401, {
      'statusCode': 401,
      'error': 'Unauthorized',
      'message': 'Invalid token'
    });
  });

  after(nock.cleanAll);

  it ('should perform request against correct domain', function(){
    return auth0.users.updateAppMetadata(user_id, update).catch(function(err){
      expect(err).to.not.be.undefined;
      expect(err.statusCode).to.equal(401);
      expect(err.error).to.equal('Unauthorized');
      expect(err.message).to.equal('Invalid token');
      localNock.done();
    });
  });
});