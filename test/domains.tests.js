var expect = require('chai').expect;
var nock = require('nock');
var util = require('util');
var constants = require('./constants');

var token = 'token';
var userId = 'google-oauth%7C1234';
var url = util.format(constants.USERS_ENDPOINT, userId);

// Required authentication headers.
var authHeaders  = { reqheaders: { 'Authorization': 'Bearer ' + token }};

// Updated application metadata.
var appMetadata = {
  roles: ['reader', 'writer'],
  permissions: null
};

// 401 Unauthorized response body.
var unauthorizedBody = {
  'statusCode': 401,
  'error': 'Unauthorized',
  'message': 'Invalid token'
};


describe('Client', function () {
  describe('when provided with a region', function(){
    var localNock, auth0;

    before(function(){
      auth0 = require('..')({
        token: token,
        region: 'eu'
      });

      localNock = nock(constants.EU_BASE_API_URL, authHeaders)
        .patch(url, { app_metadata: appMetadata })
        .reply(401, unauthorizedBody);
    });

    after(nock.cleanAll);

    it ('should perform request against correct domain', function(){
      return auth0.users
        .updateAppMetadata(userId, appMetadata)
        .catch(function(err){
          expect(err).to.not.be.undefined;
          expect(err.statusCode).to.equal(401);
          expect(err.error).to.equal('Unauthorized');
          expect(err.message).to.equal('Invalid token');

          localNock.done();
        });
    });
  });

  describe('when provided with a domain', function(){
    var localNock, auth0;

    before(function(){
      auth0 = require('..')({
        token: token,
        domain: 'login0.myauth0.com'
      });

      localNock = nock('https://login0.myauth0.com/api/v2', authHeaders)
        .patch(url, { app_metadata: appMetadata })
        .reply(401, unauthorizedBody);
    });

    after(nock.cleanAll);

    it ('should perform request against the given domain', function(){
      return auth0.users
        .updateAppMetadata(userId, appMetadata)
        .catch(function(err){
          expect(err).to.not.be.undefined;
          expect(err.statusCode).to.equal(401);
          expect(err.error).to.equal('Unauthorized');
          expect(err.message).to.equal('Invalid token');

          localNock.done();
        });
    });
  });
});
