const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { ArgumentError } = require('rest-facade');

const AuthenticationClient = require('../../src/auth');
const OAuthAuthenticator = require('../../src/auth/OAuthAuthenticator');
const DatabaseAuthenticator = require('../../src/auth/DatabaseAuthenticator');
const PasswordlessAuthenticator = require('../../src/auth/PasswordlessAuthenticator');
const UsersManager = require('../../src/auth/UsersManager');
const TokensManager = require('../../src/auth/TokensManager');

const { ensureProperty } = require('../utils');

describe('AuthenticationClient', () => {
  describe('#constructor', () => {
    it('should raise an error when no options object is provided', () => {
      expect(() => {
        new AuthenticationClient();
      }).to.throw(ArgumentError, 'Authentication Client SDK options must be an object');
    });

    it('should raise an error when the domain is not valid', () => {
      expect(() => {
        new AuthenticationClient({ token: 'token', domain: '' });
      }).to.throw(ArgumentError, 'Must provide a domain');
    });
  });

  describe('instance properties', () => {
    const properties = {
      OAuthAuthenticator: {
        name: 'oauth',
        cls: OAuthAuthenticator,
      },
      DatabaseAuthenticator: {
        name: 'database',
        cls: DatabaseAuthenticator,
      },
      PasswordlessAuthenticator: {
        name: 'passwordless',
        cls: PasswordlessAuthenticator,
      },
      UsersManager: {
        name: 'users',
        cls: UsersManager,
      },
      TokensManager: {
        name: 'tokens',
        cls: TokensManager,
      },
    };
    const options = {
      clientId: 'CLIENT_ID',
      domain: 'tenant.auth0.com',
    };
    const client = new AuthenticationClient(options);

    // Tests common to all properties.
    for (const name in properties) {
      const property = properties[name];

      it(
        `should expose an instance of ${name}`,
        ensureProperty(client, property.name, property.cls)
      );
    }
  });

  describe('client info', () => {
    it('should configure instances with default telemetry header', () => {
      const utilsStub = {
        generateClientInfo: sinon.spy(() => ({ name: 'test-sdk', version: 'ver-123' })),
      };
      const AuthenticationClientProxy = proxyquire('../../src/auth/', {
        '../utils': utilsStub,
      });

      const client = new AuthenticationClientProxy({ token: 'token', domain: 'auth0.com' });

      const requestHeaders = {
        'Auth0-Client': 'eyJuYW1lIjoidGVzdC1zZGsiLCJ2ZXJzaW9uIjoidmVyLTEyMyJ9',
        'Content-Type': 'application/json',
      };
      expect(client.oauth.oauth.options.headers).to.contain(requestHeaders);
      expect(client.database.dbConnections.options.headers).to.contain(requestHeaders);
      expect(client.passwordless.passwordless.options.headers).to.contain(requestHeaders);
      expect(client.users.headers).to.contain(requestHeaders);
      expect(client.tokens.headers).to.contain(requestHeaders);
    });

    it('should configure instances with custom telemetry header', () => {
      const customTelemetry = { name: 'custom', version: 'beta-01', env: { node: 'v10' } };
      const client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
        clientInfo: customTelemetry,
      });

      const requestHeaders = {
        'Auth0-Client':
          'eyJuYW1lIjoiY3VzdG9tIiwidmVyc2lvbiI6ImJldGEtMDEiLCJlbnYiOnsibm9kZSI6InYxMCJ9fQ',
        'Content-Type': 'application/json',
      };
      expect(client.oauth.oauth.options.headers).to.contain(requestHeaders);
      expect(client.database.dbConnections.options.headers).to.contain(requestHeaders);
      expect(client.passwordless.passwordless.options.headers).to.contain(requestHeaders);
      expect(client.users.headers).to.contain(requestHeaders);
      expect(client.tokens.headers).to.contain(requestHeaders);
    });

    it('should configure instances without telemetry when "name" property is empty', () => {
      const customTelemetry = { name: '', version: 'beta-01', env: { node: 'v10' } };
      const client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
        clientInfo: customTelemetry,
      });

      expect(client.oauth.oauth.options.headers).to.not.have.property('Auth0-Client');
      expect(client.database.dbConnections.options.headers).to.not.have.property('Auth0-Client');
      expect(client.passwordless.passwordless.options.headers).to.not.have.property('Auth0-Client');
      expect(client.users.headers).to.not.have.property('Auth0-Client');
      expect(client.tokens.headers).to.not.have.property('Auth0-Client');
    });

    it('should configure instances without telemetry header when disabled', () => {
      const client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
        telemetry: false,
      });

      expect(client.oauth.oauth.options.headers).to.not.have.property('Auth0-Client');
      expect(client.database.dbConnections.options.headers).to.not.have.property('Auth0-Client');
      expect(client.passwordless.passwordless.options.headers).to.not.have.property('Auth0-Client');
      expect(client.users.headers).to.not.have.property('Auth0-Client');
      expect(client.tokens.headers).to.not.have.property('Auth0-Client');
    });
  });

  describe('user agent', () => {
    it('should use the node version when the user agent option is not provided', () => {
      const client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
      });

      const expected = { 'User-Agent': `node.js/${process.version.replace('v', '')}` };

      expect(client.oauth.oauth.options.headers).to.contain(expected);
      expect(client.database.dbConnections.options.headers).to.contain(expected);
      expect(client.passwordless.passwordless.options.headers).to.contain(expected);
      expect(client.users.headers).to.contain(expected);
      expect(client.tokens.headers).to.contain(expected);
    });

    it('should include additional headers when provided', () => {
      const customHeaders = {
        'User-Agent': 'my-user-agent',
        'Another-header': 'test-header',
      };

      const client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
        headers: customHeaders,
      });

      expect(client.oauth.oauth.options.headers).to.contain(customHeaders);
      expect(client.database.dbConnections.options.headers).to.contain(customHeaders);
      expect(client.passwordless.passwordless.options.headers).to.contain(customHeaders);
      expect(client.users.headers).to.contain(customHeaders);
      expect(client.tokens.headers).to.contain(customHeaders);
    });
  });

  describe(`verifySMSCode`, () => {
    before(function () {
      this.client = new AuthenticationClient({ token: 'token', domain: 'auth0.com' });
      this.passwordlessMock = sinon.mock(this.client.passwordless);
      this.callback = function () {};
    });
    it('should call signIn with otp if provided', function () {
      this.passwordlessMock.expects('signIn').once().withExactArgs(
        {
          username: '123',
          otp: 'code',
        },
        this.callback
      );
      this.client.verifySMSCode({ phone_number: '123', otp: 'code' }, this.callback);
    });
    it('should call signIn with password if provided', function () {
      this.passwordlessMock.expects('signIn').once().withExactArgs(
        {
          username: '123',
          password: 'code',
        },
        this.callback
      );
      this.client.verifySMSCode({ phone_number: '123', password: 'code' }, this.callback);
    });
  });

  describe(`verifyEmailCode`, () => {
    before(function () {
      this.client = new AuthenticationClient({ token: 'token', domain: 'auth0.com' });
      this.passwordlessMock = sinon.mock(this.client.passwordless);
      this.callback = function () {};
    });
    it('should call signIn with otp if provided', function () {
      this.passwordlessMock.expects('signIn').once().withExactArgs(
        {
          username: '123',
          realm: 'email',
          otp: 'code',
        },
        this.callback
      );
      this.client.verifyEmailCode({ email: '123', otp: 'code' }, this.callback);
    });
  });
});
