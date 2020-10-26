var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var ArgumentError = require('rest-facade').ArgumentError;

var AuthenticationClient = require('../../src/auth');
var OAuthAuthenticator = require('../../src/auth/OAuthAuthenticator');
var DatabaseAuthenticator = require('../../src/auth/DatabaseAuthenticator');
var PasswordlessAuthenticator = require('../../src/auth/PasswordlessAuthenticator');
var UsersManager = require('../../src/auth/UsersManager');
var TokensManager = require('../../src/auth/TokensManager');
var KeepAliveRestClient = require('../../src/KeepAliveRestClient');
var keepAliveAgent = require('../../src/utils').keepAliveAgent;

var ensureProperty = require('../utils').ensureProperty;

describe('AuthenticationClient', function() {
  describe('#constructor', function() {
    it('should raise an error when no options object is provided', function() {
      expect(AuthenticationClient).to.throw(
        ArgumentError,
        'Authentication Client SDK options must be an object'
      );
    });

    it('should raise an error when the domain is not valid', function() {
      var client = AuthenticationClient.bind(null, { token: 'token', domain: '' });

      expect(client).to.throw(ArgumentError, 'Must provide a domain');
    });
  });

  describe('instance properties', function() {
    var properties = {
      OAuthAuthenticator: {
        name: 'oauth',
        cls: OAuthAuthenticator
      },
      DatabaseAuthenticator: {
        name: 'database',
        cls: DatabaseAuthenticator
      },
      PasswordlessAuthenticator: {
        name: 'passwordless',
        cls: PasswordlessAuthenticator
      },
      UsersManager: {
        name: 'users',
        cls: UsersManager
      },
      TokensManager: {
        name: 'tokens',
        cls: TokensManager
      }
    };
    var options = {
      clientId: 'CLIENT_ID',
      domain: 'tenant.auth0.com'
    };
    var client = new AuthenticationClient(options);

    // Tests common to all properties.
    for (var name in properties) {
      var property = properties[name];

      it(
        'should expose an instance of ' + name,
        ensureProperty(client, property.name, property.cls)
      );
    }
  });

  describe('client info', function() {
    it('should configure instances with default telemetry header', function() {
      var utilsStub = {
        generateClientInfo: sinon.spy(function() {
          return { name: 'test-sdk', version: 'ver-123' };
        })
      };
      var AuthenticationClientProxy = proxyquire('../../src/auth/', {
        '../utils': utilsStub
      });

      var client = new AuthenticationClientProxy({ token: 'token', domain: 'auth0.com' });

      var requestHeaders = {
        'Auth0-Client': 'eyJuYW1lIjoidGVzdC1zZGsiLCJ2ZXJzaW9uIjoidmVyLTEyMyJ9',
        'Content-Type': 'application/json'
      };
      expect(client.oauth.oauth.options.headers).to.contain(requestHeaders);
      expect(client.database.dbConnections.options.headers).to.contain(requestHeaders);
      expect(client.passwordless.passwordless.options.headers).to.contain(requestHeaders);
      expect(client.users.headers).to.contain(requestHeaders);
      expect(client.tokens.headers).to.contain(requestHeaders);
    });

    it('should configure instances with custom telemetry header', function() {
      var customTelemetry = { name: 'custom', version: 'beta-01', env: { node: 'v10' } };
      var client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
        clientInfo: customTelemetry
      });

      var requestHeaders = {
        'Auth0-Client':
          'eyJuYW1lIjoiY3VzdG9tIiwidmVyc2lvbiI6ImJldGEtMDEiLCJlbnYiOnsibm9kZSI6InYxMCJ9fQ',
        'Content-Type': 'application/json'
      };
      expect(client.oauth.oauth.options.headers).to.contain(requestHeaders);
      expect(client.database.dbConnections.options.headers).to.contain(requestHeaders);
      expect(client.passwordless.passwordless.options.headers).to.contain(requestHeaders);
      expect(client.users.headers).to.contain(requestHeaders);
      expect(client.tokens.headers).to.contain(requestHeaders);
    });

    it('should configure instances without telemetry when "name" property is empty', function() {
      var customTelemetry = { name: '', version: 'beta-01', env: { node: 'v10' } };
      var client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
        clientInfo: customTelemetry
      });

      expect(client.oauth.oauth.options.headers).to.not.have.property('Auth0-Client');
      expect(client.database.dbConnections.options.headers).to.not.have.property('Auth0-Client');
      expect(client.passwordless.passwordless.options.headers).to.not.have.property('Auth0-Client');
      expect(client.users.headers).to.not.have.property('Auth0-Client');
      expect(client.tokens.headers).to.not.have.property('Auth0-Client');
    });

    it('should configure instances without telemetry header when disabled', function() {
      var client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
        telemetry: false
      });

      expect(client.oauth.oauth.options.headers).to.not.have.property('Auth0-Client');
      expect(client.database.dbConnections.options.headers).to.not.have.property('Auth0-Client');
      expect(client.passwordless.passwordless.options.headers).to.not.have.property('Auth0-Client');
      expect(client.users.headers).to.not.have.property('Auth0-Client');
      expect(client.tokens.headers).to.not.have.property('Auth0-Client');
    });
  });

  describe('when using persistent connections', () => {
    it('should configure the rest client with keep alive flag', function() {
      var client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
        keepAlive: true
      });

      expect(client.oauth.oauth.options.request.customizer).to.eq(
        KeepAliveRestClient.prototype.useKeepAliveAgent
      );
      expect(client.database.dbConnections.options.request.customizer).to.eq(
        KeepAliveRestClient.prototype.useKeepAliveAgent
      );
      expect(client.passwordless.passwordless.options.request.customizer).to.eq(
        KeepAliveRestClient.prototype.useKeepAliveAgent
      );
      expect(client.users.axiosInstance.defaults.httpsAgent).to.eq(keepAliveAgent);
      expect(client.tokens.axiosInstance.defaults.httpsAgent).to.eq(keepAliveAgent);
    });
  });

  describe('user agent', function() {
    it('should use the node version when the user agent option is not provided', function() {
      var client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com'
      });

      var expected = { 'User-agent': 'node.js/' + process.version.replace('v', '') };

      expect(client.oauth.oauth.options.headers).to.contain(expected);
      expect(client.database.dbConnections.options.headers).to.contain(expected);
      expect(client.passwordless.passwordless.options.headers).to.contain(expected);
      expect(client.users.headers).to.contain(expected);
      expect(client.tokens.headers).to.contain(expected);
    });

    it('should include additional headers when provided', function() {
      var customHeaders = {
        'User-agent': 'my-user-agent',
        'Another-header': 'test-header'
      };

      var client = new AuthenticationClient({
        token: 'token',
        domain: 'auth0.com',
        headers: customHeaders
      });

      expect(client.oauth.oauth.options.headers).to.contain(customHeaders);
      expect(client.database.dbConnections.options.headers).to.contain(customHeaders);
      expect(client.passwordless.passwordless.options.headers).to.contain(customHeaders);
      expect(client.users.headers).to.contain(customHeaders);
      expect(client.tokens.headers).to.contain(customHeaders);
    });
  });

  describe('instance methods', function() {
    var methods = [];
    var client = new AuthenticationClient({ token: 'token', domain: 'auth0.com' });

    methods.forEach(function(method) {
      ensureMethod(client, method);
    });
  });
});
