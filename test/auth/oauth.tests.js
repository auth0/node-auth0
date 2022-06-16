const { expect } = require('chai');
const nock = require('nock');
const sinon = require('sinon');

const DOMAIN = 'tenant.auth0.com';
const API_URL = `https://${DOMAIN}`;
const CLIENT_ID = 'TEST_CLIENT_ID';
const CLIENT_SECRET = 'TEST_CLIENT_SECRET';

const { ArgumentError } = require('rest-facade');
const Authenticator = require(`../../src/auth/OAuthAuthenticator`);
const OAUthWithIDTokenValidation = require('../../src/auth/OAUthWithIDTokenValidation');

const validOptions = {
  baseUrl: API_URL,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

describe('OAuthAuthenticator', () => {
  beforeEach(() => {
    sinon.spy(OAUthWithIDTokenValidation.prototype, 'create');
  });
  afterEach(() => {
    OAUthWithIDTokenValidation.prototype.create.restore();
    nock.cleanAll();
  });

  describe('#constructor', () => {
    it('should require an options object', () => {
      expect(() => {
        new Authenticator();
      }).to.throw(ArgumentError, 'Missing authenticator options');

      expect(() => {
        new Authenticator(1);
      }).to.throw(ArgumentError, 'The authenticator options must be an object');

      expect(() => {
        new Authenticator(validOptions);
      }).to.not.throw(ArgumentError);
    });
  });

  describe('instance', () => {
    const methods = [
      'signIn',
      'socialSignIn',
      'passwordGrant',
      'authorizationCodeGrant',
      'refreshToken',
    ];
    const authenticator = new Authenticator(validOptions);

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect(authenticator[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#signIn', () => {
    const path = '/oauth/ro';
    const userData = {
      username: 'username',
      password: 'pwd',
      connection: 'Username-Password-Authentication',
    };
    const options = {
      forwardedFor: '0.0.0.0',
    };

    beforeEach(function () {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(this.authenticator.signIn).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require a connection', function () {
      const auth = this.authenticator;
      const signIn = auth.signIn.bind(auth, {});

      expect(signIn).to.throw(ArgumentError, 'connection field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.signIn(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function (done) {
      this.authenticator.signIn(userData).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it(`should perform a POST request to ${path}`, function (done) {
      const { request } = this;

      this.authenticator
        .signIn(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the user data un the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => {
          for (const property in userData) {
            if (userData[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client ID in the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_id === CLIENT_ID)
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should allow the user to specify the connection', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.connection === 'Username-Password-Authentication')
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use password as default grant type', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.grant_type === 'password')
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should allow the user to specify the grant type', function (done) {
      nock.cleanAll();

      const data = { grant_type: 'TEST_GRANT', ...userData };
      const request = nock(API_URL)
        .post(path, (body) => body.grant_type === 'TEST_GRANT')
        .reply(200);

      this.authenticator
        .signIn(data)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use the openid scope by default', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.scope === 'openid')
        .reply(200);

      this.authenticator
        .signIn(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should make it possible to pass auth0-forwarded-for header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, function () {
          return this.headers['auth0-forwarded-for'] === options.forwardedFor;
        })
        .reply(200);

      this.authenticator
        .signIn(userData, options)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use OAUthWithIDTokenValidation', function (done) {
      this.authenticator
        .signIn(userData)
        .then(() => {
          expect(OAUthWithIDTokenValidation.prototype.create.calledOnce).to.be.true;
          done();
        })
        .catch(done);
    });
  });

  describe('#passwordGrant', () => {
    const path = '/oauth/token';
    const userData = {
      username: 'username',
      password: 'pwd',
    };
    const options = {
      forwardedFor: '0.0.0.0',
    };

    beforeEach(function () {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(this.authenticator.passwordGrant).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require a username', function () {
      const auth = this.authenticator;
      const signIn = auth.passwordGrant.bind(auth, { password: 'pwd' });

      expect(signIn).to.throw(ArgumentError, 'username field is required');
    });

    it('should require a password', function () {
      const auth = this.authenticator;
      const signIn = auth.passwordGrant.bind(auth, { username: 'samples@auth0.com' });

      expect(signIn).to.throw(ArgumentError, 'password field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.passwordGrant(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function (done) {
      this.authenticator
        .passwordGrant(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it(`should perform a POST request to ${path}`, function (done) {
      const { request } = this;

      this.authenticator
        .passwordGrant(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the user data in the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => {
          for (const property in userData) {
            if (userData[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      this.authenticator
        .passwordGrant(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client ID in the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_id === CLIENT_ID)
        .reply(200);

      this.authenticator
        .passwordGrant(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client secret in the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_secret === CLIENT_SECRET)
        .reply(200);

      this.authenticator
        .passwordGrant(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should allow the user to specify the realm', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(
          path,
          (body) =>
            body.realm === 'Username-Password-Authentication' &&
            body.grant_type === 'http://auth0.com/oauth/grant-type/password-realm'
        )
        .reply(200);

      this.authenticator
        .passwordGrant(Object.assign({ realm: 'Username-Password-Authentication' }, userData))
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use password as default grant type', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.grant_type === 'password')
        .reply(200);

      this.authenticator
        .passwordGrant(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should make it possible to pass auth0-forwarded-for header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, function () {
          return this.headers['auth0-forwarded-for'] === options.forwardedFor;
        })
        .reply(200);

      this.authenticator
        .passwordGrant(userData, options)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use OAUthWithIDTokenValidation', function (done) {
      this.authenticator
        .passwordGrant(userData)
        .then(() => {
          expect(OAUthWithIDTokenValidation.prototype.create.calledOnce).to.be.true;
          done();
        })
        .catch(done);
    });
  });

  describe('#refreshToken', () => {
    const path = '/oauth/token';
    const userData = {
      refresh_token: 'refresh_token',
    };

    beforeEach(function () {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL).post(path).reply(200);
    });
    it('should require an object as first argument', function () {
      expect(this.authenticator.refreshToken).to.throw(ArgumentError, 'Missing data object');
    });
    it('should require a refreshToken', function () {
      const auth = this.authenticator;
      const refresh = auth.refreshToken.bind(auth, {});
      expect(refresh).to.throw(ArgumentError, 'refresh_token is required');
    });
    it('should accept a callback', function (done) {
      this.authenticator.refreshToken(userData, done.bind(null, null));
    });
    it('should return a promise when no callback is provided', function (done) {
      this.authenticator
        .refreshToken(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });
    it(`should perform a POST request to ${path}`, function (done) {
      const { request } = this;
      this.authenticator
        .refreshToken(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
    it('should include the user data in the request', function (done) {
      nock.cleanAll();
      const request = nock(API_URL)
        .post(path, (body) => {
          for (const property in userData) {
            if (userData[property] !== body[property]) {
              return false;
            }
          }
          return true;
        })
        .reply(200);
      this.authenticator
        .refreshToken(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
    it('should include the Auth0 client ID in the request', function (done) {
      nock.cleanAll();
      const request = nock(API_URL)
        .post(path, (body) => body.client_id === CLIENT_ID)
        .reply(200);
      this.authenticator
        .refreshToken(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
    it('should include the Auth0 client secret in the request', function (done) {
      nock.cleanAll();
      const request = nock(API_URL)
        .post(path, (body) => body.client_secret === CLIENT_SECRET)
        .reply(200);
      this.authenticator
        .refreshToken(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
    it('should use refresh_token as default grant type', function (done) {
      nock.cleanAll();
      const request = nock(API_URL)
        .post(path, (body) => body.grant_type === 'refresh_token')
        .reply(200);
      this.authenticator
        .refreshToken(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });
  });

  describe('#socialSignIn', () => {
    const path = '/oauth/access_token';
    const userData = {
      access_token: 'TEST_ACCESS_TOKEN',
      connection: 'facebook',
    };

    beforeEach(function () {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      const auth = this.authenticator;
      const socialSignIn = auth.socialSignIn.bind(auth);
      const message = 'Missing user credential objects';

      expect(socialSignIn).to.throw(ArgumentError, message);

      expect(socialSignIn.bind(auth, userData)).to.not.throw(ArgumentError, message);
    });

    it('should require an access token', function () {
      const auth = this.authenticator;
      const socialSignIn = auth.socialSignIn.bind(auth, {});
      const message = 'access_token field is required';

      expect(socialSignIn).to.throw(ArgumentError, message);
    });

    it('should require a connection', function () {
      const auth = this.authenticator;
      const data = {
        access_token: userData.access_token,
      };
      const socialSignIn = auth.socialSignIn.bind(auth, data);
      const message = 'connection field is required';

      expect(socialSignIn).to.throw(ArgumentError, message);
    });

    it('should require a connection', function () {
      const auth = this.authenticator;
      const data = {
        access_token: userData.access_token,
      };
      const socialSignIn = auth.socialSignIn.bind(auth, data);
      const message = 'connection field is required';

      expect(socialSignIn).to.throw(ArgumentError, message);
    });

    it('should accept a callback', function (done) {
      this.authenticator.socialSignIn(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.authenticator
        .socialSignIn(userData)
        .then(() => done())
        .catch(() => done());
    });

    it('should not return a promise when a callback is given', function () {
      const cb = function () {};
      const returnValue = this.authenticator.socialSignIn(userData, cb);

      expect(returnValue).to.be.undefined;
    });

    it(`should perform a POST request to ${path}`, function (done) {
      const { request } = this;

      this.authenticator.socialSignIn(userData).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should allow the user to specify a custom client ID', function (done) {
      nock.cleanAll();

      const data = { ...userData };
      data.client_id = 'OVERRIDEN_ID';
      const request = nock(API_URL).post(path, data).reply(200);

      this.authenticator.socialSignIn(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should allow the user to specify the scope', function (done) {
      nock.cleanAll();

      const data = { ...userData };
      data.scope = 'openid name email';
      const request = nock(API_URL).post(path, data).reply(200);

      this.authenticator.socialSignIn(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should use application/json as Content-Type', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path)
        .matchHeader('Content-Type', 'application/json')
        .reply(200);

      this.authenticator.socialSignIn(userData).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#clientCredentials', () => {
    const path = '/oauth/token';
    const options = {
      audience: 'audience',
      scope: 'scope',
    };

    beforeEach(function () {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(this.authenticator.clientCredentialsGrant).to.throw(
        ArgumentError,
        'Missing options object'
      );
    });

    it('should require the client_id', () => {
      const authenticator = new Authenticator({});
      expect(() => {
        authenticator.clientCredentialsGrant({});
      }).to.throw(ArgumentError, 'client_id field is required');
    });

    it('should require the client_secret', () => {
      const authenticator = new Authenticator({
        clientId: CLIENT_ID,
      });
      expect(() => {
        authenticator.clientCredentialsGrant({});
      }).to.throw(ArgumentError, 'client_secret field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.clientCredentialsGrant(options, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function () {
      return this.authenticator.clientCredentialsGrant(options);
    });

    it(`should perform a POST request to ${path}`, function () {
      const { request } = this;

      return this.authenticator.clientCredentialsGrant(options).then(() => {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should include the options in the request', function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => {
          for (const property in options) {
            if (options[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      return this.authenticator.clientCredentialsGrant(options).then(() => {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should include the Auth0 client ID and secret in the request', function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_id === CLIENT_ID && body.client_secret === CLIENT_SECRET)
        .reply(200);

      return this.authenticator.clientCredentialsGrant(options).then(() => {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should allow the user to specify the audience and scope', function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.audience === 'audience' && body.scope === 'scope')
        .reply(200);

      return this.authenticator.clientCredentialsGrant(options).then(() => {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should use client_credentials as default grant type', function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.grant_type === 'client_credentials')
        .reply(200);

      return this.authenticator.clientCredentialsGrant(options).then(() => {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should allow the user to specify the grant type', function () {
      nock.cleanAll();

      const data = { grant_type: 'TEST_GRANT', ...options };
      const request = nock(API_URL)
        .post(path, (body) => body.grant_type === 'TEST_GRANT')
        .reply(200);

      return this.authenticator.clientCredentialsGrant(data).then(() => {
        expect(request.isDone()).to.be.true;
      });
    });

    it('should sanitize sensitive request data from errors', function () {
      nock.cleanAll();

      nock(API_URL).post(path).reply(401);

      return this.authenticator.clientCredentialsGrant(options).catch((err) => {
        const originalRequestData = err.originalError.response.request._data;
        expect(originalRequestData.client_secret).to.not.equal(CLIENT_SECRET);
      });
    });
  });

  describe('#authorizationCodeGrant', () => {
    const path = '/oauth/token';
    const data = {
      code: 'auth_code',
      redirect_uri: API_URL,
    };

    beforeEach(function () {
      this.authenticator = new Authenticator(validOptions);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(this.authenticator.authorizationCodeGrant).to.throw(
        ArgumentError,
        'Missing options object'
      );
    });

    it('should require a code', function () {
      const auth = this.authenticator;
      const signIn = auth.authorizationCodeGrant.bind(auth, { redirect: API_URL });

      expect(signIn).to.throw(ArgumentError, 'code field is required');
    });

    it('should require a redirect_uri', function () {
      const auth = this.authenticator;
      const signIn = auth.authorizationCodeGrant.bind(auth, { code: 'auth_code' });

      expect(signIn).to.throw(ArgumentError, 'redirect_uri field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.authorizationCodeGrant(data, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function (done) {
      this.authenticator
        .authorizationCodeGrant(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it(`should perform a POST request to ${path}`, function (done) {
      const { request } = this;

      this.authenticator
        .authorizationCodeGrant(data)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the data in the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => {
          for (const property in data) {
            if (data[property] !== body[property]) {
              return false;
            }
          }

          return true;
        })
        .reply(200);

      this.authenticator
        .authorizationCodeGrant(data)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client ID in the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_id === CLIENT_ID)
        .reply(200);

      this.authenticator
        .authorizationCodeGrant(data)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the Auth0 client secret in the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_secret === CLIENT_SECRET)
        .reply(200);

      this.authenticator
        .authorizationCodeGrant(data)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use authorization_code as default grant type', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.grant_type === 'authorization_code')
        .reply(200);

      this.authenticator
        .authorizationCodeGrant(data)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use OAUthWithIDTokenValidation', function (done) {
      this.authenticator
        .authorizationCodeGrant(data)
        .then(() => {
          expect(OAUthWithIDTokenValidation.prototype.create.calledOnce).to.be.true;
          done();
        })
        .catch(done);
    });
  });
});
