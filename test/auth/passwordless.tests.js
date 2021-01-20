var expect = require('chai').expect;
var extend = require('util')._extend;
var nock = require('nock');

// Constants.
var SRC_DIR = '../../src';
var DOMAIN = 'tenant.auth0.com';
var API_URL = 'https://' + DOMAIN;
var CLIENT_ID = 'TEST_CLIENT_ID';

var ArgumentError = require('rest-facade').ArgumentError;
var Authenticator = require(SRC_DIR + '/auth/PasswordlessAuthenticator');
var OAuth = require(SRC_DIR + '/auth/OAuthAuthenticator');

var validOptions = {
  baseUrl: API_URL,
  clientId: CLIENT_ID
};

describe('PasswordlessAuthenticator', function() {
  afterEach(function() {
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
    var methods = ['signIn', 'sendEmail', 'sendSMS'];
    var oauth = new OAuth(validOptions);
    var authenticator = new Authenticator(validOptions, oauth);

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(authenticator[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#signIn', function() {
    describe('/oauth/ro', function() {
      var path = '/oauth/ro';
      var userData = {
        username: 'username',
        password: 'pwd'
      };
      var options = {
        forwardedFor: '0.0.0.0'
      };

      beforeEach(function() {
        var oauth = new OAuth(validOptions);
        this.authenticator = new Authenticator(validOptions, oauth);
        this.request = nock(API_URL)
          .post(path)
          .reply(200);
      });

      it('should require an object as first argument', function() {
        expect(this.authenticator.signIn).to.throw(ArgumentError, 'Missing user data object');
      });

      it('should require a phone number', function() {
        var auth = this.authenticator;
        var userData = { password: 'password' };
        var signIn = auth.signIn.bind(auth, userData);

        expect(signIn).to.throw(ArgumentError, 'username field (phone number) is required');
      });

      it('should require a verification code', function() {
        var auth = this.authenticator;
        var userData = { username: 'username' };
        var signIn = auth.signIn.bind(auth, userData);

        expect(signIn).to.throw(ArgumentError, 'password field (verification code) is required');
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

      it('should use SMS connection', function(done) {
        nock.cleanAll();

        var request = nock(API_URL)
          .post(path, function(body) {
            return body.connection === 'sms';
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

      it('should use email connection', function(done) {
        nock.cleanAll();
        var data = extend({ connection: 'email' }, userData);
        var request = nock(API_URL)
          .post(path, function(body) {
            return body.connection === 'email';
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

      it('should allow the user to specify the connection as sms or email', function(done) {
        nock.cleanAll();

        var data = extend({ connection: 'TEST_CONNECTION' }, userData);
        var request = nock(API_URL)
          .post(path, function(body) {
            return body.connection === 'sms' || body.connection === 'email';
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

      it('should use password as grant type', function(done) {
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

      it('should use the openid scope', function(done) {
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
    });

    describe('/oauth/token', function() {
      var path = '/oauth/token';
      var userData = {
        username: 'username',
        otp: '000000'
      };
      var options = {
        forwardedFor: '0.0.0.0'
      };

      beforeEach(function() {
        var oauth = new OAuth(validOptions);
        this.authenticator = new Authenticator(validOptions, oauth);
        this.request = nock(API_URL)
          .post(path)
          .reply(200);
      });

      it('should require an object as first argument', function() {
        expect(this.authenticator.signIn).to.throw(ArgumentError, 'Missing user data object');
      });

      it('should require a phone number', function() {
        var auth = this.authenticator;
        var userData = { otp: '000000' };
        var signIn = auth.signIn.bind(auth, userData);

        expect(signIn).to.throw(ArgumentError, 'username field (phone number) is required');
      });

      it('should require a verification code', function() {
        var auth = this.authenticator;
        var userData = { username: 'username' };
        var signIn = auth.signIn.bind(auth, userData);

        expect(signIn).to.throw(ArgumentError, 'password field (verification code) is required');
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

      it('should use SMS realm', function(done) {
        nock.cleanAll();

        var request = nock(API_URL)
          .post(path, function(body) {
            return body.realm === 'sms';
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

      it('should use email realm', function(done) {
        nock.cleanAll();
        var data = extend({ realm: 'email' }, userData);
        var request = nock(API_URL)
          .post(path, function(body) {
            return body.realm === 'email';
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

      it('should allow the user to specify the realm as sms or email', function(done) {
        nock.cleanAll();

        var data = extend({ realm: 'TEST_CONNECTION' }, userData);
        var request = nock(API_URL)
          .post(path, function(body) {
            return body.realm === 'sms' || body.realm === 'email';
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

      it('should use otp as grant type', function(done) {
        nock.cleanAll();

        var request = nock(API_URL)
          .post(path, function(body) {
            return body.grant_type === 'http://auth0.com/oauth/grant-type/passwordless/otp';
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

      it('should use the openid scope', function(done) {
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
    });
  });

  describe('#sendEmail', function() {
    var path = '/passwordless/start';
    var userData = {
      email: 'email@domain.com',
      send: 'link'
    };
    var options = {
      forwardedFor: '0.0.0.0'
    };

    beforeEach(function() {
      var oauth = new OAuth(validOptions);
      this.authenticator = new Authenticator(validOptions, oauth);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });

    it('should require an object as first argument', function() {
      expect(this.authenticator.sendEmail).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require an email', function() {
      var auth = this.authenticator;
      var userData = {};
      var sendEmail = auth.sendEmail.bind(auth, userData);

      expect(sendEmail).to.throw(ArgumentError, 'email field is required');
    });

    it('should require the send field', function() {
      var auth = this.authenticator;
      var userData = { email: 'email@domain.com' };
      var sendEmail = auth.sendEmail.bind(auth, userData);

      expect(sendEmail).to.throw(ArgumentError, 'send field is required');
    });

    it('should accept a callback', function(done) {
      this.authenticator.sendEmail(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function(done) {
      this.authenticator
        .sendEmail(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to ' + path, function(done) {
      var request = this.request;

      this.authenticator
        .sendEmail(userData)
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
        .sendEmail(userData)
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
        .sendEmail(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use the email connection', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.connection === 'email';
        })
        .reply(200);

      this.authenticator
        .sendEmail(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use the specified send type', function(done) {
      nock.cleanAll();

      var data = extend({}, userData);
      var request = nock(API_URL)
        .post(path, function(body) {
          return body.send === 'code';
        })
        .reply(200);

      data.send = 'code';

      this.authenticator
        .sendEmail(data)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it("shouldn't allow the user to specify the connection", function(done) {
      nock.cleanAll();

      var data = extend({ connection: 'TEST_CONNECTION' }, userData);
      var request = nock(API_URL)
        .post(path, function(body) {
          return body.connection === 'email';
        })
        .reply(200);

      this.authenticator
        .sendEmail(data)
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
        .sendEmail(userData, options)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });

  describe('#sendSMS', function() {
    var path = '/passwordless/start';
    var userData = {
      phone_number: '12345678'
    };
    var options = {
      forwardedFor: '0.0.0.0'
    };

    beforeEach(function() {
      var oauth = new OAuth(validOptions);
      this.authenticator = new Authenticator(validOptions, oauth);
      this.request = nock(API_URL)
        .post(path)
        .reply(200);
    });

    it('should require an object as first argument', function() {
      expect(this.authenticator.sendSMS).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require a phone number', function() {
      var auth = this.authenticator;
      var userData = {};
      var sendSMS = auth.sendSMS.bind(auth, userData);

      expect(sendSMS).to.throw(ArgumentError, 'phone_number field is required');
    });

    it('should accept a callback', function(done) {
      this.authenticator.sendSMS(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function(done) {
      this.authenticator
        .sendSMS(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to ' + path, function(done) {
      var request = this.request;

      this.authenticator
        .sendSMS(userData)
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
        .sendSMS(userData)
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
        .sendSMS(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use the sms connection', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(path, function(body) {
          return body.connection === 'sms';
        })
        .reply(200);

      this.authenticator
        .sendSMS(userData)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it("shouldn't allow the user to specify the connection", function(done) {
      nock.cleanAll();

      var data = extend({ connection: 'TEST_CONNECTION' }, userData);
      var request = nock(API_URL)
        .post(path, function(body) {
          return body.connection === 'sms';
        })
        .reply(200);

      this.authenticator
        .sendSMS(data)
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
        .sendSMS(userData, options)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });
});
