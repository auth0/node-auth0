var expect = require('chai').expect;

var nock        = require('nock');
var querystring = require('querystring');

var Auth0 = require('../lib');


describe('API', function () {
  var domain        = 'mydomain.auth0.com',
      clientID      = 'SOME_SECRET_ID',
      clientSecret  = 'SOME_SECRET_SHHHH';

  var accessToken   = 'OMG_SO_TOKEN_SUCH_CRYPTO';
  var qs;

  var api;

  beforeEach(function () {
    api = new Auth0({
      domain:       domain,
      clientID:     clientID,
      clientSecret: clientSecret
    });
    qs = querystring.stringify({
      client_id:      clientID,
      client_secret:  clientSecret,
      grant_type:     'client_credentials'
    });
  });

  describe('getAccessToken', function () {
    it('should work on request success', function (done) {

      var scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(200, {
          'access_token': accessToken,
          'token_type':   'bearer'
        });

      api.getAccessToken(function (err, token) {
        expect(err).to.not.exist;
        expect(token).to.be.equal(accessToken);
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });

    it('should fail when request fail', function (done) {
      var error = 'Error: Token could not be retrieved';

      var qs = querystring.stringify({
          client_id:      clientID,
          client_secret:  clientSecret,
          grant_type:     'client_credentials'
        });

      var scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(401, error);

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

  describe('createUser', function () {
    it('should work on request success', function (done) {
      var reqUserData = {email: 'john@doe.com'}, resUserData = {some: 'data'};

      var scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(200, {
          'access_token': accessToken,
          'token_type':   'bearer'
        })
        .post('/api/users/', reqUserData)
        .matchHeader('Authorization', 'Bearer ' + accessToken)
        .reply(200, resUserData);
      api.createUser(reqUserData, function (err, userData) {
        expect(err).to.not.exist;
        expect(userData).to.be.deep.equal(resUserData);
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });
    it('should fail when request fail', function (done) {
      var reqUserData = {email: 'john@doe.com'}, resError = 'Error creating user';

      var scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(200, {
          'access_token': accessToken,
          'token_type':   'bearer'
        })
        .post('/api/users/', reqUserData)
        .matchHeader('Authorization', 'Bearer ' + accessToken)
        .reply(401, resError);

      api.createUser(reqUserData, function (err, userData) {
        expect(err).not.to.be.equal(null);
        expect(err.name).to.be.equal('ApiError');
        expect(err.statusCode).to.be.equal(401);
        expect(userData).to.not.exist;
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });
  });

  describe('updateUserEmail', function () {
    it('should work on request success', function (done) {
      var reqUserData = {userId: 'auth0|omguser', email: 'doge@auth0.com', verify: true};
      var resUserData = {some: 'data'};

      var scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(200, {
          'access_token': accessToken,
          'token_type':   'bearer'
        })
        .put('/api/users/' + reqUserData.userId + '/email', {
          email: reqUserData.email,
          verify: reqUserData.verify
        })
        .matchHeader('Authorization', 'Bearer ' + accessToken)
        .reply(200, resUserData);
      api.updateUserEmail(reqUserData.userId, reqUserData.email,
                          reqUserData.verify, function (err, userData) {
        expect(err).to.not.exist;
        expect(userData).to.be.deep.equal(resUserData);
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });
    it('should fail when request fail', function (done) {
      var reqUserData = {userId: 'auth0|omguser', email: 'doge@auth0.com', verify: true};
      var resError = 'Error creating user';

      var scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(200, {
          'access_token': accessToken,
          'token_type':   'bearer'
        })
        .put('/api/users/' + reqUserData.userId + '/email', {
          email: reqUserData.email,
          verify: reqUserData.verify
        })
        .matchHeader('Authorization', 'Bearer ' + accessToken)
        .reply(401, resError);

      api.updateUserEmail(reqUserData.userId, reqUserData.email,
                          reqUserData.verify, function (err, userData) {
        expect(err).not.to.be.equal(null);
        expect(err.name).to.be.equal('ApiError');
        expect(err.statusCode).to.be.equal(401);
        expect(userData).to.not.exist;
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });
  });

  describe('updateUserPassword', function () {
    it('should work on request success', function (done) {
      var reqUserData = {userId: 'auth0|omguser', password: 'sosecretsuchcrypto', verify: true};
      var resUserData = {some: 'data'};

      var scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(200, {
          'access_token': accessToken,
          'token_type':   'bearer'
        })
        .put('/api/users/' + reqUserData.userId + '/password', {
          password: reqUserData.password,
          verify: reqUserData.verify
        })
        .matchHeader('Authorization', 'Bearer ' + accessToken)
        .reply(200, resUserData);
      api.updateUserPassword(reqUserData.userId, reqUserData.password,
                          reqUserData.verify, function (err, userData) {
        expect(err).to.not.exist;
        expect(userData).to.be.deep.equal(resUserData);
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });
    it('should fail when request fail', function (done) {
      var reqUserData = {userId: 'auth0|omguser', password: 'sosecretsuchcrypto', verify: true};
      var resError = 'Error creating user';

      var scope = nock('https://' + domain)
        .post('/oauth/token', qs)
        .reply(200, {
          'access_token': accessToken,
          'token_type':   'bearer'
        })
        .put('/api/users/' + reqUserData.userId + '/password', {
          password: reqUserData.password,
          verify: reqUserData.verify
        })
        .matchHeader('Authorization', 'Bearer ' + accessToken)
        .reply(401, resError);

      api.updateUserPassword(reqUserData.userId, reqUserData.password,
                          reqUserData.verify, function (err, userData) {
        expect(err).not.to.be.equal(null);
        expect(err.name).to.be.equal('ApiError');
        expect(err.statusCode).to.be.equal(401);
        expect(userData).to.not.exist;
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });
  });
});

describe('Client', function () {
  describe('getUserInfo', function () {
    it('should work on request success', function (done) {
      var domain = 'my-domain.auth0.com';
      var userAccessToken = 'an-user-access-token';
      var resUserData = {foo: 'bar'};
      
      var qs = querystring.stringify({
          access_token: userAccessToken
        });

      var options = {domain: domain, userAccessToken: userAccessToken};

      var scope = nock('https://' + domain)
        .get('/userinfo?' + qs)
        .reply(200, resUserData);

      Auth0.getUserInfo(options, function (err, profile) {
        expect(err).to.not.exist;
        expect(profile).to.be.deep.equal(resUserData);
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });
    it('should fail when request fail', function (done) {
      var domain = 'my-domain.auth0.com';
      var userAccessToken = 'an-user-access-token';
      var resError = 'Invalid access token';
      
      var qs = querystring.stringify({
          access_token: userAccessToken
        });

      var options = {domain: domain, userAccessToken: userAccessToken};

      var scope = nock('https://' + domain)
        .get('/userinfo?' + qs)
        .reply(401, resError);

      Auth0.getUserInfo(options, function (err, profile) {
        expect(err.name).to.be.equal('ApiError');
        expect(err.message).to.be.equal(resError);
        expect(profile).to.not.exist;
        expect(scope.isDone()).to.be.equal(true);
        nock.cleanAll();
        done();
      });
    });
    
  });
});
