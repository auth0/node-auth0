var expect = require('chai').expect;

var auth0 = require('../src');
var Auth0 = require('../src/Auth0');
var ArgumentError = require('../src/exceptions').ArgumentError;
var UsersManager = require('../src/UsersManager');
var BlacklistedTokensManager = require('../src/BlacklistedTokensManager');
var ClientsManager = require('../src/ClientsManager');
var ConnectionsManager = require('../src/ConnectionsManager');
var DeviceCredentialsManager = require('../src/DeviceCredentialsManager');
var EmailProviderManager = require('../src/EmailProviderManager');
var JobsManager = require('../src/JobsManager');
var RulesManager = require('../src/RulesManager');
var StatsManager = require('../src/StatsManager');
var TenantManager = require('../src/TenantManager');

describe('Auth0 module', function () {

    it('should raise an error when no options object is provided', function () {
      expect(auth0)
        .to.throw(ArgumentError, 'Auth0 SDK options must be an object');
    });


    it('should raise an error when the token is not valid', function () {
      var client = auth0.bind(null, { token: '', domain: 'tenant.auth.com' });

      expect(client)
        .to.throw(ArgumentError, 'An access token must be provided');
    });


    it('should raise an error when the domain is not valid', function () {
      var client = auth0.bind(null, { token: 'token', domain: '' });

      expect(client)
        .to.throw(ArgumentError, 'Must provide a domain');
    });


    it('should return an instance of Auth0 when the options are valid', function () {
      var options = { token: 'token', domain: 'tenant.auth0.com' };
      var client = auth0(options);

      expect(client)
        .to.be.an('Object')
        .to.be.an.instanceOf(Auth0);
    });


    describe('instance properties', function () {
      var manager;
      var managers = {
        'UsersManager': {
          property: 'users',
          cls: UsersManager
        },
        'BlacklistedTokensManager': {
          property: 'blacklistedTokens',
          cls: BlacklistedTokensManager
        },
        'ClientsManager': {
          property: 'clients',
          cls: ClientsManager
        },
        'ConnectionsManager': {
          property: 'connections',
          cls: ConnectionsManager
        },
        'DeviceCredentialsManager': {
          property: 'deviceCredentials',
          cls: DeviceCredentialsManager
        },
        'EmailProviderManager': {
          property: 'emailProvider',
          cls: EmailProviderManager
        },
        'JobsManager': {
          property: 'jobs',
          cls: JobsManager
        },
        'RulesManager': {
          property: 'rules',
          cls: RulesManager
        },
        'StatsManager': {
          property: 'stats',
          cls: StatsManager
        },
        'TenantManager': {
          property: 'tenant',
          cls: TenantManager
        }
      };

      before(function () {
        this.client = auth0({ token: 'token', domain: 'auth0.com' });
      });

      // Tests common to all managers.
      for (var name in managers) {
        manager = managers[name];

        it('should expose an instance of ' + name, function () {
          expect(this.client[manager.property])
            .to.exist
            .to.be.an.instanceOf(manager.cls);
        });
      }
    });


    describe('instance methods', function () {
      var method;
      var methods = [
        'getConnections',
        'createConnection',
        'getConnection',
        'deleteConnection',
        'updateConnection',
        'getClients',
        'getClient',
        'createClient',
        'updateClient',
        'deleteClient',
        'createDevicePublicKey',
        'getDeviceCredentials',
        'deleteDeviceCredential',
        'getRules',
        'createRule',
        'getRule',
        'deleteRule',
        'updateRule',
        'getUsers',
        'getUser',
        'deleteAllUsers',
        'deleteUsers',
        'createUser',
        'updateUser',
        'getBlacklistedTokens',
        'blacklistToken',
        'getEmailProvider',
        'configureEmailProvider',
        'deleteEmailProvider',
        'updateEmailProvider',
        'getActiveUsersCount',
        'getDailyStats',
        'getTenantSettings',
        'updateTenantSettings'
      ];

      before(function () {
        this.client = auth0({ token: 'token', domain: 'auth0.com' });
      });

      for (var i = 0, l = methods.length; i < l; i++) {
        method = methods[i];

        it('should have a ' + method + ' method', function () {
          expect(this.client[method])
            .to.exist
            .to.be.an.instanceOf(Function);
        });
      }
    });
});
