var expect = require('chai').expect;
var extend = require('util')._extend;
var nock = require('nock');

// Constants.
var SRC_DIR = '../../src';
var DOMAIN = 'tenant.auth0.com';
var API_URL = 'https://' + DOMAIN;
var CLIENT_ID = 'TEST_CLIENT_ID';

var ArgumentError = require(SRC_DIR + '/exceptions').ArgumentError;
var Authenticator = require(SRC_DIR + '/auth/DatabaseAuthenticator');
var OAuth = require(SRC_DIR + '/auth/OAuthAuthenticator');

var validOptions = {
  domain: DOMAIN,
  clientId: CLIENT_ID
};


describe('DatabaseAuthenticator', function () {

  afterEach(function () {
    nock.cleanAll();
  });


  describe('#constructor', function () {
    it('should require an options object', function () {
      expect(Authenticator)
        .to.throw(ArgumentError, 'Missing authenticator options');

      expect(Authenticator.bind(null, 1))
        .to.throw(ArgumentError, 'The authenticator options must be an object');

      expect(Authenticator.bind(null, validOptions))
        .to.not.throw(ArgumentError);
    });
  });


  describe('instance', function () {
    var methods = ['signIn', 'signUp', 'changePassword'];
    var oauth = new OAuth(validOptions);
    var authenticator = new Authenticator(validOptions, oauth);

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(authenticator[method])
          .to.exist
          .to.be.an.instanceOf(Function);
      });
    });
  });


  describe('#signIn', function () {
    var path = '/oauth/ro';
    var userData = {
      username: 'username',
      password: 'pwd'
    };

    beforeEach(function () {
      var oauth = new OAuth(validOptions);
      this.authenticator = new Authenticator(validOptions, oauth);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });


    it('should require an object as first argument', function () {
      expect(this.authenticator.signIn)
        .to.throw(ArgumentError, 'Missing user data object');
    });


    it('should require a username', function () {
      var auth = this.authenticator;
      var userData = { password: 'password' };
      var signIn = auth.signIn.bind(auth, userData);

      expect(signIn)
        .to.throw(ArgumentError, 'username field is required');
    });


    it('should require a password', function () {
      var auth = this.authenticator;
      var userData = { username: 'username' };
      var signIn = auth.signIn.bind(auth, userData);

      expect(signIn)
        .to.throw(ArgumentError, 'password field is required');
    });


    it('should accept a callback', function (done) {
      this
        .authenticator
        .signIn(userData, done.bind(null, null));
    });


    it('should return a promise when no callback is provided', function (done) {
      this
        .authenticator
        .signIn(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should perform a POST request to ' + path, function (done) {
      var request = this.request;

      this
        .authenticator
        .signIn(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should include the user data in the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function (body) {
          for (var property in userData) {
            if (userData[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      this
        .authenticator
        .signIn(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should include the Auth0 client ID in the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function (body) {
          return body.client_id === CLIENT_ID;
        })
        .reply(200);

      this
        .authenticator
        .signIn(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should use Username-Password-Authentication by default', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function (body) {
          return body.connection === 'Username-Password-Authentication';
        })
        .reply(200);

      this
        .authenticator
        .signIn(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should allow the user to specify the connection', function (done) {
      nock.cleanAll();

      var data = extend({ connection: 'TEST_CONNECTION' }, userData);
      var request = nock(API_URL)
        .post(path, function (body) {
          return body.connection === 'TEST_CONNECTION';
        })
        .reply(200);

      this
        .authenticator
        .signIn(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should use password as default grant type', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function (body) {
          return body.grant_type === 'password';
        })
        .reply(200);

      this
        .authenticator
        .signIn(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should allow the user to specify the grant type', function (done) {
      nock.cleanAll();

      var data = extend({ grant_type: 'TEST_GRANT' }, userData);
      var request = nock(API_URL)
        .post(path, function (body) {
          return body.grant_type === 'TEST_GRANT';
        })
        .reply(200);

      this
        .authenticator
        .signIn(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should use the openid scope by default', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function (body) {
          return body.scope === 'openid';
        })
        .reply(200);

      this
        .authenticator
        .signIn(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });
  });


  describe('#signUp', function () {
    var path = '/dbconnections/signup';
    var userData = {
      email: 'test@domain.com',
      password: 'pwd',
      connection: 'TEST_CONNECTION'
    };

    beforeEach(function () {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });


    it('should require an object as first argument', function () {
      expect(this.authenticator.signUp)
        .to.throw(ArgumentError, 'Missing user data object');
    });


    it('should require an email', function () {
      var auth = this.authenticator;
      var userData = { password: 'password' };
      var signUp = auth.signUp.bind(auth, userData);

      expect(signUp)
        .to.throw(ArgumentError, 'email field is required');
    });


    it('should require a password', function () {
      var auth = this.authenticator;
      var userData = { email: 'email@domain.com' };
      var signUp = auth.signUp.bind(auth, userData);

      expect(signUp)
        .to.throw(ArgumentError, 'password field is required');
    });


    it('should require a connection', function () {
      var auth = this.authenticator;
      var userData = { email: 'email@domain.com', password: 'test' };
      var signUp = auth.signUp.bind(auth, userData);

      expect(signUp)
        .to.throw(ArgumentError, 'connection field is required');
    });


    it('should accept a callback', function (done) {
      this
        .authenticator
        .signUp(userData, done.bind(null, null));
    });


    it('should return a promise when no callback is provided', function (done) {
      this
        .authenticator
        .signUp(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should perform a POST request to ' + path, function (done) {
      var request = this.request;

      this
        .authenticator
        .signUp(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should include the user data in the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function (body) {
          for (var property in userData) {
            if (userData[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      this
        .authenticator
        .signUp(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should include the Auth0 client ID in the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function (body) {
          return body.client_id === CLIENT_ID;
        })
        .reply(200);

      this
        .authenticator
        .signUp(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });
  });


  describe('#changePassword', function () {
    var path = '/dbconnections/change_password';
    var userData = {
      email: 'test@domain.com',
      password: 'newPwd',
      connection: 'TEST_CONNECTION'
    };

    beforeEach(function () {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });


    it('should require an object as first argument', function () {
      expect(this.authenticator.changePassword)
        .to.throw(ArgumentError, 'Missing user data object');
    });


    it('should require an email', function () {
      var auth = this.authenticator;
      var userData = { password: 'password' };
      var changePassword = auth.changePassword.bind(auth, userData);

      expect(changePassword)
        .to.throw(ArgumentError, 'email field is required');
    });


    it('should require a password', function () {
      var auth = this.authenticator;
      var userData = { email: 'email@domain.com' };
      var changePassword = auth.changePassword.bind(auth, userData);

      expect(changePassword)
        .to.throw(ArgumentError, 'password field is required');
    });


    it('should require a connection', function () {
      var auth = this.authenticator;
      var userData = { email: 'email@domain.com', password: 'test' };
      var changePassword = auth.changePassword.bind(auth, userData);

      expect(changePassword)
        .to.throw(ArgumentError, 'connection field is required');
    });


    it('should accept a callback', function (done) {
      this
        .authenticator
        .changePassword(userData, done.bind(null, null));
    });


    it('should return a promise when no callback is provided', function (done) {
      this
        .authenticator
        .changePassword(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should perform a POST request to ' + path, function (done) {
      var request = this.request;

      this
        .authenticator
        .changePassword(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should include the user data in the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function (body) {
          for (var property in userData) {
            if (userData[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      this
        .authenticator
        .changePassword(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should include the Auth0 client ID in the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function (body) {
          return body.client_id === CLIENT_ID;
        })
        .reply(200);

      this
        .authenticator
        .changePassword(userData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });
  });

});
