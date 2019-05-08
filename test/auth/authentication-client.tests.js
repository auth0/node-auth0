var expect = require('chai').expect;
var sinon = require('sinon');

var ArgumentError = require('rest-facade').ArgumentError;

var AuthenticationClient = require('../../src/auth');
var OAuthAuthenticator = require('../../src/auth/OAuthAuthenticator');
var DatabaseAuthenticator = require('../../src/auth/DatabaseAuthenticator');
var PasswordlessAuthenticator = require('../../src/auth/PasswordlessAuthenticator');
var UsersManager = require('../../src/auth/UsersManager');
var TokensManager = require('../../src/auth/TokensManager');

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
    it('should generate default telemetry value', function() {
      var client = new AuthenticationClient({ token: 'token', domain: 'auth0.com' });
      var pkgVersion = require('../../package.json').version;
      var nodeVersion = process.version.replace('v', '');
      expect(client.getClientInfo()).to.deep.equal({
        name: 'node-auth0',
        version: pkgVersion,
        env: [{ node: nodeVersion }]
      });
    });

    it('should configure instances with default telemetry header', function() {
      sinon.stub(AuthenticationClient.prototype, 'getClientInfo', function() {
        return { name: 'test-sdk', version: 'ver-123' };
      });
      var client = new AuthenticationClient({ token: 'token', domain: 'auth0.com' });

      var requestHeaders = {
        'Auth0-Client': 'eyJuYW1lIjoidGVzdC1zZGsiLCJ2ZXJzaW9uIjoidmVyLTEyMyJ9',
        'Content-Type': 'application/json'
      };
      expect(client.oauth.oauth.options.headers).to.contain(requestHeaders);
      expect(client.database.dbConnections.options.headers).to.contain(requestHeaders);
      expect(client.passwordless.passwordless.options.headers).to.contain(requestHeaders);
      expect(client.users.headers).to.contain(requestHeaders);
      expect(client.tokens.headers).to.contain(requestHeaders);

      AuthenticationClient.prototype.getClientInfo.restore();
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

  describe('instance methods', function() {
    var methods = [];
    var client = new AuthenticationClient({ token: 'token', domain: 'auth0.com' });

    methods.forEach(function(method) {
      ensureMethod(client, method);
    });
  });
});
