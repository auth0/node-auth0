const { expect } = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const { Client } = require('rest-facade');
const proxyquire = require('proxyquire');

const DOMAIN = 'tenant.auth0.com';
const API_URL = `https://${DOMAIN}`;
const CLIENT_ID = 'TEST_CLIENT_ID';

const { ArgumentError } = require('rest-facade');
const DatabaseAuthenticator = require(`../../src/auth/DatabaseAuthenticator`);
const OAuth = require(`../../src/auth/OAuthAuthenticator`);

const validOptions = {
  baseUrl: API_URL,
  clientId: CLIENT_ID,
};

describe('DatabaseAuthenticator', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('#constructor', () => {
    it('should require an options object', () => {
      expect(() => {
        new DatabaseAuthenticator();
      }).to.throw(ArgumentError, 'Missing authenticator options');

      expect(() => {
        new DatabaseAuthenticator(1);
      }).to.throw(ArgumentError, 'The authenticator options must be an object');

      expect(() => {
        new DatabaseAuthenticator(validOptions);
      }).to.not.throw(ArgumentError);
    });
  });

  describe('instance', () => {
    const methods = ['signIn', 'signUp', 'changePassword', 'requestChangePasswordEmail'];
    const oauth = new OAuth(validOptions);
    const authenticator = new DatabaseAuthenticator(validOptions, oauth);

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
    };

    beforeEach(function () {
      const oauth = new OAuth(validOptions);
      this.authenticator = new DatabaseAuthenticator(validOptions, oauth);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(this.authenticator.signIn).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require a username', function () {
      const auth = this.authenticator;
      const userData = { password: 'password' };
      const signIn = auth.signIn.bind(auth, userData);

      expect(signIn).to.throw(ArgumentError, 'username field is required');
    });

    it('should require a password', function () {
      const auth = this.authenticator;
      const userData = { username: 'username' };
      const signIn = auth.signIn.bind(auth, userData);

      expect(signIn).to.throw(ArgumentError, 'password field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.signIn(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function () {
      expect(this.authenticator.signIn(userData)).instanceOf(Promise);
    });

    it(`should perform a POST request to ${path}`, async function () {
      const { request } = this;

      await this.authenticator.signIn(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should include the user data in the request', async function () {
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

      await this.authenticator.signIn(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should include the Auth0 client ID in the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_id === CLIENT_ID)
        .reply(200);

      await this.authenticator.signIn(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should use Username-Password-Authentication by default', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.connection === 'Username-Password-Authentication')
        .reply(200);

      await this.authenticator.signIn(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should allow the user to specify the connection', async function () {
      nock.cleanAll();

      const data = { connection: 'TEST_CONNECTION', ...userData };
      const request = nock(API_URL)
        .post(path, (body) => body.connection === 'TEST_CONNECTION')
        .reply(200);

      await this.authenticator.signIn(data);
      expect(request.isDone()).to.be.true;
    });

    it('should use password as default grant type', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.grant_type === 'password')
        .reply(200);

      await this.authenticator.signIn(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should allow the user to specify the grant type', async function () {
      nock.cleanAll();

      const data = { grant_type: 'TEST_GRANT', ...userData };
      const request = nock(API_URL)
        .post(path, (body) => body.grant_type === 'TEST_GRANT')
        .reply(200);

      await this.authenticator.signIn(data);
      expect(request.isDone()).to.be.true;
    });

    it('should use the openid scope by default', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.scope === 'openid')
        .reply(200);

      await this.authenticator.signIn(userData);
      expect(request.isDone()).to.be.true;
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
      const MockAuthenticator = proxyquire(`../../src/auth/DatabaseAuthenticator`, {
        'rest-facade': {
          Client: MockClient,
        },
      });

      const request = nock(API_URL).post(path).reply(200);

      const authenticator = new MockAuthenticator(
        {
          ...validOptions,
          proxy: 'http://proxy',
        },
        new OAuth(validOptions)
      );

      return authenticator.signIn(userData).then(() => {
        sinon.assert.calledWithMatch(spy, API_URL, {
          proxy: 'http://proxy',
        });
        expect(request.isDone()).to.be.true;
      });
    });
  });

  describe('#signUp', () => {
    const path = '/dbconnections/signup';
    const userData = {
      email: 'test@domain.com',
      password: 'pwd',
      connection: 'TEST_CONNECTION',
    };

    beforeEach(function () {
      this.authenticator = new DatabaseAuthenticator(validOptions);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(() => {
        this.authenticator.signUp();
      }).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require an email', function () {
      const auth = this.authenticator;
      const userData = { password: 'password' };
      const signUp = auth.signUp.bind(auth, userData);

      expect(() => {
        signUp();
      }).to.throw(ArgumentError, 'email field is required');
    });

    it('should require a password', function () {
      const auth = this.authenticator;
      const userData = { email: 'email@domain.com' };
      const signUp = auth.signUp.bind(auth, userData);

      expect(signUp).to.throw(ArgumentError, 'password field is required');
    });

    it('should require a connection', function () {
      const auth = this.authenticator;
      const userData = { email: 'email@domain.com', password: 'test' };

      expect(() => {
        auth.signUp(userData);
      }).to.throw(ArgumentError, 'connection field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.signUp(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function (done) {
      this.authenticator.signUp(userData).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it(`should perform a POST request to ${path}`, async function () {
      const { request } = this;

      await this.authenticator.signUp(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should include the user data in the request', async function () {
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

      await this.authenticator.signUp(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should include the Auth0 client ID in the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_id === CLIENT_ID)
        .reply(200);

      await this.authenticator.signUp(userData);
      expect(request.isDone()).to.be.true;
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
      const MockAuthenticator = proxyquire(`../../src/auth/DatabaseAuthenticator`, {
        'rest-facade': {
          Client: MockClient,
        },
      });

      const request = nock(API_URL).post(path).reply(200);

      const authenticator = new MockAuthenticator(
        { ...validOptions, proxy: 'http://proxy' },
        new OAuth(validOptions)
      );

      return authenticator.signUp(userData).then(() => {
        sinon.assert.calledWithMatch(spy, API_URL, {
          proxy: 'http://proxy',
        });
        expect(request.isDone()).to.be.true;
      });
    });
  });

  describe('#changePassword', () => {
    const path = '/dbconnections/change_password';
    const userData = {
      email: 'test@domain.com',
      password: 'newPwd',
      connection: 'TEST_CONNECTION',
    };

    beforeEach(function () {
      this.authenticator = new DatabaseAuthenticator(validOptions);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(() => {
        this.authenticator.changePassword();
      }).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require an email', function () {
      const auth = this.authenticator;
      const userData = { password: 'password' };

      expect(() => {
        auth.changePassword(userData);
      }).to.throw(ArgumentError, 'email field is required');
    });

    it('should require a password', function () {
      const auth = this.authenticator;
      const userData = { email: 'email@domain.com' };

      expect(() => {
        auth.changePassword(userData);
      }).to.throw(ArgumentError, 'password field is required');
    });

    it('should require a connection', function () {
      const auth = this.authenticator;
      const userData = { email: 'email@domain.com', password: 'test' };

      expect(() => {
        auth.changePassword(userData);
      }).to.throw(ArgumentError, 'connection field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.changePassword(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function (done) {
      this.authenticator
        .changePassword(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it(`should perform a POST request to ${path}`, async function () {
      const { request } = this;

      await this.authenticator.changePassword(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should include the user data in the request', async function () {
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

      await this.authenticator.changePassword(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should include the Auth0 client ID in the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_id === CLIENT_ID)
        .reply(200);

      await this.authenticator.changePassword(userData);
      expect(request.isDone()).to.be.true;
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
      const MockAuthenticator = proxyquire(`../../src/auth/DatabaseAuthenticator`, {
        'rest-facade': {
          Client: MockClient,
        },
      });

      const request = nock(API_URL).post(path).reply(200);

      const authenticator = new MockAuthenticator(
        { ...validOptions, proxy: 'http://proxy' },
        new OAuth(validOptions)
      );

      return authenticator.changePassword(userData).then(() => {
        sinon.assert.calledWithMatch(spy, API_URL, {
          proxy: 'http://proxy',
        });
        expect(request.isDone()).to.be.true;
      });
    });
  });

  describe('#requestChangePasswordEmail', () => {
    const path = '/dbconnections/change_password';
    const userData = {
      email: 'test@domain.com',
      connection: 'TEST_CONNECTION',
    };

    beforeEach(function () {
      this.authenticator = new DatabaseAuthenticator(validOptions);
      this.request = nock(API_URL).post(path).reply(200);
    });

    it('should require an object as first argument', function () {
      expect(() => {
        this.authenticator.requestChangePasswordEmail();
      }).to.throw(ArgumentError, 'Missing user data object');
    });

    it('should require an email', function () {
      expect(() => {
        this.authenticator.requestChangePasswordEmail({});
      }).to.throw(ArgumentError, 'email field is required');
    });

    it('should require a connection', function () {
      const auth = this.authenticator;
      const userData = { email: 'email@domain.com' };

      expect(() => {
        auth.requestChangePasswordEmail(userData);
      }).to.throw(ArgumentError, 'connection field is required');
    });

    it('should accept a callback', function (done) {
      this.authenticator.requestChangePasswordEmail(userData, done.bind(null, null));
    });

    it('should return a promise when no callback is provided', function (done) {
      this.authenticator
        .requestChangePasswordEmail(userData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it(`should perform a POST request to ${path}`, async function () {
      const { request } = this;

      await this.authenticator.requestChangePasswordEmail(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should include the user data in the request', async function () {
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

      await this.authenticator.requestChangePasswordEmail(userData);
      expect(request.isDone()).to.be.true;
    });

    it('should include the Auth0 client ID in the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(path, (body) => body.client_id === CLIENT_ID)
        .reply(200);

      await this.authenticator.requestChangePasswordEmail(userData);
      expect(request.isDone()).to.be.true;
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
      const MockAuthenticator = proxyquire(`../../src/auth/DatabaseAuthenticator`, {
        'rest-facade': {
          Client: MockClient,
        },
      });

      const request = nock(API_URL).post(path).reply(200);

      const authenticator = new MockAuthenticator(
        { ...validOptions, proxy: 'http://proxy' },
        new OAuth(validOptions)
      );

      return authenticator.requestChangePasswordEmail(userData).then(() => {
        sinon.assert.calledWithMatch(spy, API_URL, {
          proxy: 'http://proxy',
        });
        expect(request.isDone()).to.be.true;
      });
    });
  });
});
