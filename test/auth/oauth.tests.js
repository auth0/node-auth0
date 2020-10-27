var expect = require('chai').expect;
var extend = require('util')._extend;
var nock = require('nock');
var sinon = require('sinon');

// Constants.
var SRC_DIR = '../../src';
var DOMAIN = 'tenant.auth0.com';
var API_URL = 'https://' + DOMAIN;
var CLIENT_ID = 'TEST_CLIENT_ID';
var CLIENT_SECRET = 'TEST_CLIENT_SECRET';

var ArgumentError = require('rest-facade').ArgumentError;
var Authenticator = require(SRC_DIR + '/auth/OAuthAuthenticator');
var OAUthWithIDTokenValidation = require('../../src/auth/OAUthWithIDTokenValidation');

var validOptions = {
  baseUrl: API_URL,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET
};

describe('OAuthAuthenticator', function() {
  beforeEach(function() {
    sinon.spy(OAUthWithIDTokenValidation.prototype, 'create');
  });
  afterEach(function() {
    OAUthWithIDTokenValidation.prototype.create.restore();
    nock.cleanAll();
  });

  describe('#constructor', function() {
    it('should require an options object', function() {
      expect(Authenticator).to.throw(ArgumentError, 'Missing authenticator options');

      expect(Authenticator.bind(null, 1)).to.throw(
        ArgumentError,
        'The authenticator options must be an object'
      );

      expect(Authenticator.bind(null, validOptions)).to.not.throw(ArgumentError);
    });
  });

  describe('instance', function() {
    var methods = [
      'signIn',
      'socialSignIn',
      'passwordGrant',
      'authorizationCodeGrant',
      'refreshToken'
    ];
    var authenticator = new Authenticator(validOptions);

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(authenticator[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#signIn', function() {
    var path = '/oauth/ro';
    var userData = {
      username: 'username',
      password: 'pwd',
      connection: 'Username-Password-Authentication'
    };
    var options = {
      forwardedFor: '0.0.0.0'
    };

    beforeEach(function() {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });

    it('should require an object as first argument', function() {
      expect(this.authenticator.signIn).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require a connection', function() {
      var auth = this.authenticator;
      var signIn = auth.signIn.bind(auth, {});

      expect(signIn).to.throw(ArgumentError, 'connection field is required');
    });

    it('should accept a callback', function(done) {
      this.authenticator.signIn(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function(done) {
      this.authenticator
        .signIn(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to ' + path, function(done) {
      var request = this.request;

      this.authenticator
        .signIn(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the user data un the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          for (var property in userData) {
            if (userData[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client ID in the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.client_id === CLIENT_ID;
        })
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should allow the user to specify the connection', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.connection === 'Username-Password-Authentication';
        })
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use password as default grant type', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.grant_type === 'password';
        })
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should allow the user to specify the grant type', function(done) {
      nock.cleanAll();

      var data = extend({ grant_type: 'TEST_GRANT' }, userData);
      var request = nock(API_URL)
        .post(path, function(body) {
          return body.grant_type === 'TEST_GRANT';
        })
        .reply(200);

      this.authenticator
        .signIn(data)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use the openid scope by default', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.scope === 'openid';
        })
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should make it possible to pass auth0-forwarded-for header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function() {
          return this.getHeader('auth0-forwarded-for') === options.forwardedFor;
        })
        .reply(200);

      this.authenticator
        .signIn(userData, options)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use OAUthWithIDTokenValidation', function(done) {
      this.authenticator
        .signIn(userData)
        .then(function() {
          expect(OAUthWithIDTokenValidation.prototype.create.calledOnce).to.be.true;
          done();
        })
        .catch(done);
    });
  });

  describe('#passwordGrant', function() {
    var path = '/oauth/token';
    var userData = {
      username: 'username',
      password: 'pwd'
    };
    var options = {
      forwardedFor: '0.0.0.0'
    };

    beforeEach(function() {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });

    it('should require an object as first argument', function() {
      expect(this.authenticator.passwordGrant).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require a username', function() {
      var auth = this.authenticator;
      var signIn = auth.passwordGrant.bind(auth, { password: 'pwd' });

      expect(signIn).to.throw(ArgumentError, 'username field is required');
    });

    it('should require a password', function() {
      var auth = this.authenticator;
      var signIn = auth.passwordGrant.bind(auth, { username: 'samples@auth0.com' });

      expect(signIn).to.throw(ArgumentError, 'password field is required');
    });

    it('should accept a callback', function(done) {
      this.authenticator.passwordGrant(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function(done) {
      this.authenticator
        .passwordGrant(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to ' + path, function(done) {
      var request = this.request;

      this.authenticator
        .passwordGrant(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the user data in the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          for (var property in userData) {
            if (userData[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      this.authenticator
        .passwordGrant(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client ID in the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.client_id === CLIENT_ID;
        })
        .reply(200);

      this.authenticator
        .passwordGrant(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client secret in the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.client_secret === CLIENT_SECRET;
        })
        .reply(200);

      this.authenticator
        .passwordGrant(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should allow the user to specify the realm', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return (
            body.realm === 'Username-Password-Authentication' &&
            body.grant_type === 'http://auth0.com/oauth/grant-type/password-realm'
          );
        })
        .reply(200);

      this.authenticator
        .passwordGrant(Object.assign({ realm: 'Username-Password-Authentication' }, userData))
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use password as default grant type', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.grant_type === 'password';
        })
        .reply(200);

      this.authenticator
        .passwordGrant(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should make it possible to pass auth0-forwarded-for header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function() {
          return this.getHeader('auth0-forwarded-for') === options.forwardedFor;
        })
        .reply(200);

      this.authenticator
        .passwordGrant(userData, options)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use OAUthWithIDTokenValidation', function(done) {
      this.authenticator
        .passwordGrant(userData)
        .then(function() {
          expect(OAUthWithIDTokenValidation.prototype.create.calledOnce).to.be.true;
          done();
        })
        .catch(done);
    });
  });

  describe('#refreshToken', function() {
    var path = '/oauth/token';
    var userData = {
      refresh_token: 'refresh_token'
    };

    beforeEach(function() {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });
    it('should require an object as first argument', function() {
      expect(this.authenticator.refreshToken).to.throw(ArgumentError, 'Missing data object');
    });
    it('should require a refreshToken', function() {
      var auth = this.authenticator;
      var refresh = auth.refreshToken.bind(auth, {});
      expect(refresh).to.throw(ArgumentError, 'refresh_token is required');
    });
    it('should accept a callback', function(done) {
      this.authenticator.refreshToken(userData, done.bind(null, null));
    });
    it('should return a promise when no callback is provided', function(done) {
      this.authenticator
        .refreshToken(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });
    it('should perform a POST request to ' + path, function(done) {
      var request = this.request;
      this.authenticator
        .refreshToken(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
    it('should include the user data in the request', function(done) {
      nock.cleanAll();
      var request = nock(API_URL)
        .post(path, function(body) {
          for (var property in userData) {
            if (userData[property] !== body[property]) {
              return false;
            }
          }
          return true;
        })
        .reply(200);
      this.authenticator
        .refreshToken(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
    it('should include the Auth0 client ID in the request', function(done) {
      nock.cleanAll();
      var request = nock(API_URL)
        .post(path, function(body) {
          return body.client_id === CLIENT_ID;
        })
        .reply(200);
      this.authenticator
        .refreshToken(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
    it('should include the Auth0 client secret in the request', function(done) {
      nock.cleanAll();
      var request = nock(API_URL)
        .post(path, function(body) {
          return body.client_secret === CLIENT_SECRET;
        })
        .reply(200);
      this.authenticator
        .refreshToken(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
    it('should use refresh_token as default grant type', function(done) {
      nock.cleanAll();
      var request = nock(API_URL)
        .post(path, function(body) {
          return body.grant_type === 'refresh_token';
        })
        .reply(200);
      this.authenticator
        .refreshToken(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
  });

  describe('#socialSignIn', function() {
    var path = '/oauth/access_token';
    var userData = {
      access_token: 'TEST_ACCESS_TOKEN',
      connection: 'facebook'
    };

    beforeEach(function() {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });

    it('should require an object as first argument', function() {
      var auth = this.authenticator;
      var socialSignIn = auth.socialSignIn.bind(auth);
      var message = 'Missing user credential objects';

      expect(socialSignIn).to.throw(ArgumentError, message);

      expect(socialSignIn.bind(auth, userData)).to.not.throw(ArgumentError, message);
    });

    it('should require an access token', function() {
      var auth = this.authenticator;
      var socialSignIn = auth.socialSignIn.bind(auth, {});
      var message = 'access_token field is required';

      expect(socialSignIn).to.throw(ArgumentError, message);
    });

    it('should require a connection', function() {
      var auth = this.authenticator;
      var data = {
        access_token: userData.access_token
      };
      var socialSignIn = auth.socialSignIn.bind(auth, data);
      var message = 'connection field is required';

      expect(socialSignIn).to.throw(ArgumentError, message);
    });

    it('should require a connection', function() {
      var auth = this.authenticator;
      var data = {
        access_token: userData.access_token
      };
      var socialSignIn = auth.socialSignIn.bind(auth, data);
      var message = 'connection field is required';

      expect(socialSignIn).to.throw(ArgumentError, message);
    });

    it('should accept a callback', function(done) {
      this.authenticator.socialSignIn(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.authenticator
        .socialSignIn(userData)
        .then(() => done())
        .catch(() => done());
    });

    it('should not return a promise when a callback is given', function() {
      var cb = function() {};
      var returnValue = this.authenticator.socialSignIn(userData, cb);

      expect(returnValue).to.be.undefined;
    });

    it('should perform a POST request to ' + path, function(done) {
      var request = this.request;

      this.authenticator.socialSignIn(userData).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should allow the user to specify a custom client ID', function(done) {
      nock.cleanAll();

      var data = extend({}, userData);
      data.client_id = 'OVERRIDEN_ID';
      var request = nock(API_URL)
        .post(path, data)
        .reply(200);

      this.authenticator.socialSignIn(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should allow the user to specify the scope', function(done) {
      nock.cleanAll();

      var data = extend({}, userData);
      data.scope = 'openid name email';
      var request = nock(API_URL)
        .post(path, data)
        .reply(200);

      this.authenticator.socialSignIn(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should use application/json as Content-Type', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path)
        .matchHeader('Content-Type', 'application/json')
        .reply(200);

      this.authenticator.socialSignIn(userData).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#clientCredentials', function() {
    var path = '/oauth/token';
    var options = {
      audience: 'audience',
      scope: 'scope'
    };

    beforeEach(function() {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });

    it('should require an object as first argument', function() {
      expect(this.authenticator.clientCredentialsGrant).to.throw(
        ArgumentError,
        'Missing options object'
      );
    });

    it('should require the client_id', function() {
      var authenticator = new Authenticator({});
      expect(function() {
        authenticator.clientCredentialsGrant({});
      }).to.throw(ArgumentError, 'client_id field is required');
    });

    it('should require the client_secret', function() {
      var authenticator = new Authenticator({
        clientId: CLIENT_ID
      });
      expect(function() {
        authenticator.clientCredentialsGrant({});
      }).to.throw(ArgumentError, 'client_secret field is required');
    });

    it('should accept a callback', function(done) {
      this.authenticator.clientCredentialsGrant(options, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function() {
      return this.authenticator.clientCredentialsGrant(options);
    });

    it('should perform a POST request to ' + path, function() {
      var request = this.request;

      return this.authenticator.clientCredentialsGrant(options).then(function() {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should include the options in the request', function() {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          for (var property in options) {
            if (options[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      return this.authenticator.clientCredentialsGrant(options).then(function() {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should include the Auth0 client ID and secret in the request', function() {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.client_id === CLIENT_ID && body.client_secret === CLIENT_SECRET;
        })
        .reply(200);

      return this.authenticator.clientCredentialsGrant(options).then(function() {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should allow the user to specify the audience and scope', function() {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.audience === 'audience' && body.scope === 'scope';
        })
        .reply(200);

      return this.authenticator.clientCredentialsGrant(options).then(function() {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should use client_credentials as default grant type', function() {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.grant_type === 'client_credentials';
        })
        .reply(200);

      return this.authenticator.clientCredentialsGrant(options).then(function() {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should allow the user to specify the grant type', function() {
      nock.cleanAll();

      var data = extend({ grant_type: 'TEST_GRANT' }, options);
      var request = nock(API_URL)
        .post(path, function(body) {
          return body.grant_type === 'TEST_GRANT';
        })
        .reply(200);

      return this.authenticator.clientCredentialsGrant(data).then(function() {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should sanitize sensitive request data from errors', function() {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path)
        .reply(401);

      return this.authenticator.clientCredentialsGrant(options).catch(function(err) {
        const originalRequestData = err.originalError.response.request._data;
        expect(originalRequestData.client_secret).to.not.equal(CLIENT_SECRET);
      });
    });
  });

  describe('#authorizationCodeGrant', function() {
    var path = '/oauth/token';
    var data = {
      code: 'auth_code',
      redirect_uri: API_URL
    };

    beforeEach(function() {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });

    it('should require an object as first argument', function() {
      expect(this.authenticator.authorizationCodeGrant).to.throw(
        ArgumentError,
        'Missing options object'
      );
    });

    it('should require a code', function() {
      var auth = this.authenticator;
      var signIn = auth.authorizationCodeGrant.bind(auth, { redirect: API_URL });

      expect(signIn).to.throw(ArgumentError, 'code field is required');
    });

    it('should require a redirect_uri', function() {
      var auth = this.authenticator;
      var signIn = auth.authorizationCodeGrant.bind(auth, { code: 'auth_code' });

      expect(signIn).to.throw(ArgumentError, 'redirect_uri field is required');
    });

    it('should accept a callback', function(done) {
      this.authenticator.authorizationCodeGrant(data, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function(done) {
      this.authenticator
        .authorizationCodeGrant(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to ' + path, function(done) {
      var request = this.request;

      this.authenticator
        .authorizationCodeGrant(data)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the data in the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          for (var property in data) {
            if (data[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      this.authenticator
        .authorizationCodeGrant(data)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client ID in the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.client_id === CLIENT_ID;
        })
        .reply(200);

      this.authenticator
        .authorizationCodeGrant(data)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client secret in the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.client_secret === CLIENT_SECRET;
        })
        .reply(200);

      this.authenticator
        .authorizationCodeGrant(data)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use authorization_code as default grant type', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.grant_type === 'authorization_code';
        })
        .reply(200);

      this.authenticator
        .authorizationCodeGrant(data)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use OAUthWithIDTokenValidation', function(done) {
      this.authenticator
        .authorizationCodeGrant(data)
        .then(function() {
          expect(OAUthWithIDTokenValidation.prototype.create.calledOnce).to.be.true;
          done();
        })
        .catch(done);
    });
  });
});
