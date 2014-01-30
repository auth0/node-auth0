var expect = require('chai').expect;

var nock        = require('nock');
var querystring = require('querystring');

var Auth0 = require('../lib');


describe('API', function () {

  describe('getAccessToken', function () {
    it('should work on request success', function (done) {
      var scope;

      var domain        = 'mydomain.auth0.com',
          clientID      = 'SOME_SECRET_ID',
          clientSecret  = 'SOME_SECRET_SHHHH',
          accessToken   = 'OMG_SO_TOKEN_SUCH_CRYPTO';

      var qs = querystring.stringify({
          client_id:      clientID,
          client_secret:  clientSecret,
          grant_type:     'client_credentials'
        });

      scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(200, {
          'access_token': accessToken,
          'token_type':   'bearer'
        });

      var api = new Auth0({
        domain:       domain,
        clientID:     clientID,
        clientSecret: clientSecret
      });

      api.getAccessToken(function (err, token) {
        expect(err).to.not.exist;
        expect(token).to.be.equal(accessToken);
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });

    it('should fail when request fails', function (done) {
      var scope;

      var error = 'Error: Token could not be retrieved';

      var domain        = 'mydomain.auth0.com',
          clientID      = 'SOME_SECRET_ID',
          clientSecret  = 'SOME_SECRET_SHHHH';

      var qs = querystring.stringify({
          client_id:      clientID,
          client_secret:  clientSecret,
          grant_type:     'client_credentials'
        });

      scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(401, error);

      var api = new Auth0({
        domain:       domain,
        clientID:     clientID,
        clientSecret: clientSecret
      });

      api.getAccessToken(function (err, token) {
        expect(err).not.to.be.equal(null);
        expect(err.name).to.be.equal('ApiError');
        expect(err.statusCode).to.be.equal(401);
        expect(token).to.not.exist;
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });
  });
});
