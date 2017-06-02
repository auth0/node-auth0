var expect = require('chai').expect;

var ManagementClient = require('../../src/management');

var ArgumentError = require('rest-facade').ArgumentError;
var UsersManager = require('../../src/management/UsersManager');
var BlacklistedTokensManager = require('../../src/management/BlacklistedTokensManager');
var ClientsManager = require('../../src/management/ClientsManager');
var ClientGrantsManager = require('../../src/management/ClientGrantsManager');
var ConnectionsManager = require('../../src/management/ConnectionsManager');
var DeviceCredentialsManager = require('../../src/management/DeviceCredentialsManager');
var EmailProviderManager = require('../../src/management/EmailProviderManager');
var JobsManager = require('../../src/management/JobsManager');
var RulesManager = require('../../src/management/RulesManager');
var StatsManager = require('../../src/management/StatsManager');
var TenantManager = require('../../src/management/TenantManager');


describe('ManagementClient', function () {

    it('should raise an error when no options object is provided', function () {
      expect(ManagementClient)
        .to.throw(ArgumentError, 'Management API SDK options must be an object');
    });


    it('should raise an error when the token is not valid', function () {
      var options = { token: '', domain: 'tenant.auth.com' };
      var client = ManagementClient.bind(null, options);

      expect(client)
        .to.throw(ArgumentError, 'An access token must be provided');
    });


    it('should raise an error when the domain is not valid', function () {
      var client = ManagementClient.bind(null, { token: 'token', domain: '' });

      expect(client)
        .to.throw(ArgumentError, 'Must provide a domain');
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
        'ClientGrantsManager': {
          property: 'clientGrants',
          cls: ClientGrantsManager
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
        this.client = new ManagementClient({ token: 'token', domain: 'tenant.auth0.com' });
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
        'getClientGrants',
        'createClientGrant',
        'updateClientGrant',
        'deleteClientGrant',
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
        this.client = new ManagementClient({ token: 'token', domain: 'auth0.com' });
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
