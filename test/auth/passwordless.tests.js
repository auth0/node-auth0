const { expect } = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const { Client } = require('rest-facade');
const proxyquire = require('proxyquire');

const DOMAIN = 'tenant.auth0.com';
const API_URL = `https://${DOMAIN}`;
const CLIENT_ID = 'TEST_CLIENT_ID';

const { ArgumentError } = require('rest-facade');
const Authenticator = require(`../../src/auth/PasswordlessAuthenticator`);
const OAuth = require(`../../src/auth/OAuthAuthenticator`);

const validOptions = {
  baseUrl: API_URL,
  clientId: CLIENT_ID,
};

describe('PasswordlessAuthenticator', () => {
  afterEach(() => {
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
    const methods = ['signIn', 'sendEmail', 'sendSMS'];
    const oauth = new OAuth(validOptions);
    const authenticator = new Authenticator(validOptions, oauth);

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect(authenticator[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#signIn', () => {
    describe('/oauth/ro', () => {
      const path = '/oauth/ro';
      const userData = {
        username: 'username',
        password: 'pwd',
      };
      const options = {
        forwardedFor: '0.0.0.0',
      };

      beforeEach(function () {
        const oauth = new OAuth(validOptions);
        this.authenticator = new Authenticator(validOptions, oauth);
        this.request = nock(API_URL).post(path).reply(200);
      });

      it('should require an object as first argument', function () {
        expect(this.authenticator.signIn).to.throw(ArgumentError, 'Missing user data object');
      });

      it('should require a phone number', function () {
        const auth = this.authenticator;
        const userData = { password: 'password' };
        const signIn = auth.signIn.bind(auth, userData);

        expect(signIn).to.throw(ArgumentError, 'username field (phone number) is required');
      });

      it('should require a verification code', function () {
        const auth = this.authenticator;
        const userData = { username: 'username' };
        const signIn = auth.signIn.bind(auth, userData);

        expect(signIn).to.throw(ArgumentError, 'password field (verification code) is required');
      });

      it('should accept a callback', function (done) {
        this.authenticator.signIn(userData, done.bind(null, null));
      });

      it('should return a promise when no callback is provided', function (done) {
        this.authenticator
          .signIn(userData)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
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

      it('should use SMS connection', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(path, (body) => body.connection === 'sms')
          .reply(200);

        this.authenticator
          .signIn(userData)
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          })
          .catch(done);
      });

      it('should use email connection', function (done) {
        nock.cleanAll();
        const data = { connection: 'email', ...userData };
        const request = nock(API_URL)
          .post(path, (body) => body.connection === 'email')
          .reply(200);

        this.authenticator
          .signIn(data)
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          })
          .catch(done);
      });

      it('should allow the user to specify the connection as sms or email', function (done) {
        nock.cleanAll();

        const data = { connection: 'TEST_CONNECTION', ...userData };
        const request = nock(API_URL)
          .post(path, (body) => body.connection === 'sms' || body.connection === 'email')
          .reply(200);

        this.authenticator
          .signIn(data)
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          })
          .catch(done);
      });

      it('should use password as grant type', function (done) {
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

      it('should use the openid scope', function (done) {
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

      it('should make request with proxy', async () => {
        nock.cleanAll();

        const spy = sinon.spy();

        class MockClient extends Client {
          constructor(...args) {
            spy(...args);
            super(...args);
          }
        }
        const MockAuthenticator = proxyquire(`../../src/auth/PasswordlessAuthenticator`, {
          'rest-facade': {
            Client: MockClient,
          },
        });

        const request = nock(API_URL).post(path).reply(200);

        const authenticator = new MockAuthenticator(
          { ...validOptions, proxy: 'http://proxy' },
          new OAuth(validOptions)
        );

        return authenticator.signIn(userData, options).then(() => {
          sinon.assert.calledWithMatch(spy, API_URL, {
            proxy: 'http://proxy',
          });
          expect(request.isDone()).to.be.true;
        });
      });
    });

    describe('/oauth/token', () => {
      const path = '/oauth/token';
      const userData = {
        username: 'username',
        otp: '000000',
      };
      const options = {
        forwardedFor: '0.0.0.0',
      };

      beforeEach(function () {
        const oauth = new OAuth(validOptions);
        this.authenticator = new Authenticator(validOptions, oauth);
        this.request = nock(API_URL).post(path).reply(200);
      });

      it('should require an object as first argument', function () {
        expect(this.authenticator.signIn).to.throw(ArgumentError, 'Missing user data object');
      });

      it('should require a phone number', function () {
        const auth = this.authenticator;
        const userData = { otp: '000000' };
        const signIn = auth.signIn.bind(auth, userData);

        expect(signIn).to.throw(ArgumentError, 'username field (phone number) is required');
      });

      it('should require a verification code', function () {
        const auth = this.authenticator;
        const userData = { username: 'username' };
        const signIn = auth.signIn.bind(auth, userData);

        expect(signIn).to.throw(ArgumentError, 'password field (verification code) is required');
      });

      it('should accept a callback', function (done) {
        this.authenticator.signIn(userData, done.bind(null, null));
      });

      it('should return a promise when no callback is provided', function (done) {
        this.authenticator
          .signIn(userData)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
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

      it('should use SMS realm', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(path, (body) => body.realm === 'sms')
          .reply(200);

        this.authenticator
          .signIn(userData)
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          })
          .catch(done);
      });

      it('should use email realm', function (done) {
        nock.cleanAll();
        const data = { realm: 'email', ...userData };
        const request = nock(API_URL)
          .post(path, (body) => body.realm === 'email')
          .reply(200);

        this.authenticator
          .signIn(data)
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          })
          .catch(done);
      });

      it('should allow the user to specify the realm as sms or email', function (done) {
        nock.cleanAll();

        const data = { realm: 'TEST_CONNECTION', ...userData };
        const request = nock(API_URL)
          .post(path, (body) => body.realm === 'sms' || body.realm === 'email')
          .reply(200);

        this.authenticator
          .signIn(data)
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          })
          .catch(done);
      });

      it('should use otp as grant type', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(
            path,
            (body) => body.grant_type === 'http://auth0.com/oauth/grant-type/passwordless/otp'
          )
          .reply(200);

        this.authenticator
          .signIn(userData)
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          })
          .catch(done);
      });

      it('should use the openid scope', function (done) {
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

      it('should make it possible to use audience property', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(path, (body) => body.audience === 'TEST_AUDIENCE')
          .reply(200);

        this.authenticator
          .signIn(
            {
              ...userData,
              audience: 'TEST_AUDIENCE',
            },
            options
          )
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          })
          .catch(done);
      });

      it('should make request with proxy', async () => {
        nock.cleanAll();

        const spy = sinon.spy();

        class MockClient extends Client {
          constructor(...args) {
            spy(...args);
            super(...args);
          }
        }
        const MockAuthenticator = proxyquire(`../../src/auth/PasswordlessAuthenticator`, {
          'rest-facade': {
            Client: MockClient,
          },
        });

        const request = nock(API_URL).post(path).reply(200);

        const authenticator = new MockAuthenticator(
          { ...validOptions, proxy: 'http://proxy' },
          new OAuth(validOptions)
        );

        return authenticator.signIn(userData, options).then(() => {
          sinon.assert.calledWithMatch(spy, API_URL, {
            proxy: 'http://proxy',
          });
          expect(request.isDone()).to.be.true;
        });
      });
    });
  });

  describe('#sendEmail', () => {
    const path = '/passwordless/start';
    const userData = {
      email: 'email@domain.com',
      send: 'link',
    };
    const options = {
      forwardedFor: '0.0.0.0',
    };

    beforeEach(function () {
      const oauth = new OAuth(validOptions);
      this.authenticator = new Authenticator(validOptions, oauth);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(() => {
        this.authenticator.sendEmail();
      }).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require an email', function () {
      const auth = this.authenticator;
      const userData = {};
      const sendEmail = auth.sendEmail.bind(auth, userData);

      expect(sendEmail).to.throw(ArgumentError, 'email field is required');
    });

    it('should require the send field', function () {
      const auth = this.authenticator;
      const userData = { email: 'email@domain.com' };
      const sendEmail = auth.sendEmail.bind(auth, userData);

      expect(sendEmail).to.throw(ArgumentError, 'send field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.sendEmail(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function (done) {
      this.authenticator
        .sendEmail(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it(`should perform a POST request to ${path}`, function (done) {
      const { request } = this;

      this.authenticator
        .sendEmail(userData)
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
        .sendEmail(userData)
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
        .sendEmail(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use the email connection', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.connection === 'email')
        .reply(200);

      this.authenticator
        .sendEmail(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use the specified send type', function (done) {
      nock.cleanAll();

      const data = { ...userData };
      const request = nock(API_URL)
        .post(path, (body) => body.send === 'code')
        .reply(200);

      data.send = 'code';

      this.authenticator
        .sendEmail(data)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it("shouldn't allow the user to specify the connection", function (done) {
      nock.cleanAll();

      const data = { connection: 'TEST_CONNECTION', ...userData };
      const request = nock(API_URL)
        .post(path, (body) => body.connection === 'email')
        .reply(200);

      this.authenticator
        .sendEmail(data)
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
        .sendEmail(userData, options)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should make it possible to pass x-request-language header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, function () {
          return this.headers['x-request-language'] === 'fr';
        })
        .reply(200);

      this.authenticator
        .sendEmail(userData, { requestLanguage: 'fr' })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should make request with proxy', async () => {
      nock.cleanAll();

      const spy = sinon.spy();

      class MockClient extends Client {
        constructor(...args) {
          spy(...args);
          super(...args);
        }
      }
      const MockAuthenticator = proxyquire(`../../src/auth/PasswordlessAuthenticator`, {
        'rest-facade': {
          Client: MockClient,
        },
      });

      const request = nock(API_URL).post(path).reply(200);

      const authenticator = new MockAuthenticator(
        { ...validOptions, proxy: 'http://proxy' },
        new OAuth(validOptions)
      );

      return authenticator.sendEmail(userData, options).then(() => {
        sinon.assert.calledWithMatch(spy, API_URL, {
          proxy: 'http://proxy',
        });
        expect(request.isDone()).to.be.true;
      });
    });
  });

  describe('#sendSMS', () => {
    const path = '/passwordless/start';
    const userData = {
      phone_number: '12345678',
    };
    const options = {
      forwardedFor: '0.0.0.0',
    };

    beforeEach(function () {
      const oauth = new OAuth(validOptions);
      this.authenticator = new Authenticator(validOptions, oauth);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(() => {
        this.authenticator.sendSMS();
      }).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require a phone number', function () {
      const auth = this.authenticator;
      const userData = {};

      expect(() => {
        auth.sendSMS(userData);
      }).to.throw(ArgumentError, 'phone_number field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.sendSMS(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function (done) {
      this.authenticator.sendSMS(userData).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it(`should perform a POST request to ${path}`, function (done) {
      const { request } = this;

      this.authenticator
        .sendSMS(userData)
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
        .sendSMS(userData)
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
        .sendSMS(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use the sms connection', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.connection === 'sms')
        .reply(200);

      this.authenticator
        .sendSMS(userData)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it("shouldn't allow the user to specify the connection", function (done) {
      nock.cleanAll();

      const data = { connection: 'TEST_CONNECTION', ...userData };
      const request = nock(API_URL)
        .post(path, (body) => body.connection === 'sms')
        .reply(200);

      this.authenticator
        .sendSMS(data)
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
        .sendSMS(userData, options)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should make it possible to pass x-request-language header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, function () {
          return this.headers['x-request-language'] === 'fr';
        })
        .reply(200);

      this.authenticator
        .sendSMS(userData, { requestLanguage: 'fr' })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should make request with proxy', async () => {
      nock.cleanAll();

      const spy = sinon.spy();

      class MockClient extends Client {
        constructor(...args) {
          spy(...args);
          super(...args);
        }
      }
      const MockAuthenticator = proxyquire(`../../src/auth/PasswordlessAuthenticator`, {
        'rest-facade': {
          Client: MockClient,
        },
      });

      const request = nock(API_URL).post(path).reply(200);

      const authenticator = new MockAuthenticator(
        { ...validOptions, proxy: 'http://proxy' },
        new OAuth(validOptions)
      );

      return authenticator.sendSMS(userData, options).then(() => {
        sinon.assert.calledWithMatch(spy, API_URL, {
          proxy: 'http://proxy',
        });
        expect(request.isDone()).to.be.true;
      });
    });
  });
});
