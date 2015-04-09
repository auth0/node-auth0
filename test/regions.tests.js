var expect = require('chai').expect;
var nock = require('nock');
var util = require('util');
var constants = require('./constants');

var TOKEN = 'token';
var auth0 = require('..')({
  token: TOKEN,
  region: 'eu'
});

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

  var localNock;

  before(function(){
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
    return auth0.user(user_id).appMetadata.update(update).catch(function(err){
      expect(err).to.not.be.undefined;
      expect(err.statusCode).to.equal(401);
      expect(err.error).to.equal('Unauthorized');
      expect(err.message).to.equal('Invalid token');
      localNock.done();
    });
  });
});