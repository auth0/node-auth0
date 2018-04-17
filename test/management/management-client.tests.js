var expect = require('chai').expect;
var assign = Object.assign || require('object.assign');

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

describe('ManagementClient', function() {
  var withTokenProviderConfig = {
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    domain: 'auth0-node-sdk.auth0.com'
  };

  var withTokenConfig = {
    domain: 'auth0-node-sdk.auth0.com',
    token: 'fake-token'
  };

  it('should expose an instance of ManagementClient when withTokenConfig is passed', function() {
    expect(new ManagementClient(withTokenConfig)).to.exist.to.be.an.instanceOf(ManagementClient);
  });

  it('should expose an instance of ManagementClient when withTokenProviderConfig is passed', function() {
    expect(new ManagementClient(withTokenProviderConfig)).to.exist.to.be.an.instanceOf(
      ManagementClient
    );
  });

  it('should expose an instance of ManagementClient when withTokenProviderConfig and audience is passed', function() {
    var config = assign({ audience: 'https://auth0-node-sdk.auth0.com/api/v2/' }, withTokenConfig);
    expect(new ManagementClient(config)).to.exist.to.be.an.instanceOf(ManagementClient);
  });

  it('should raise an error when no options object is provided', function() {
    expect(ManagementClient).to.throw(
      ArgumentError,
      'Management API SDK options must be an object'
    );
  });

  it('should raise an error when the domain is not set', function() {
    var config = assign({}, withTokenConfig);
    delete config.domain;
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when the domain is not valid', function() {
    var config = assign({}, withTokenConfig);
    config.domain = '';
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when the token is not valid', function() {
    var config = assign({}, withTokenConfig);
    config.token = '';
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a token');
  });

  it('should raise an error when the token and clientId are not set', function() {
    var config = assign({}, withTokenProviderConfig);
    delete config.clientId;
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a clientId');
  });

  it('should raise an error when the token and clientSecret are not set', function() {
    var config = assign({}, withTokenProviderConfig);
    delete config.clientSecret;
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a clientSecret');
  });

  describe('instance properties', function() {
    var manager;
    var managers = {
      UsersManager: {
        property: 'users',
        cls: UsersManager
      },
      BlacklistedTokensManager: {
        property: 'blacklistedTokens',
        cls: BlacklistedTokensManager
      },
      ClientsManager: {
        property: 'clients',
        cls: ClientsManager
      },
      ClientGrantsManager: {
        property: 'clientGrants',
        cls: ClientGrantsManager
      },
      ConnectionsManager: {
        property: 'connections',
        cls: ConnectionsManager
      },
      DeviceCredentialsManager: {
        property: 'deviceCredentials',
        cls: DeviceCredentialsManager
      },
      EmailProviderManager: {
        property: 'emailProvider',
        cls: EmailProviderManager
      },
      JobsManager: {
        property: 'jobs',
        cls: JobsManager
      },
      RulesManager: {
        property: 'rules',
        cls: RulesManager
      },
      StatsManager: {
        property: 'stats',
        cls: StatsManager
      },
      TenantManager: {
        property: 'tenant',
        cls: TenantManager
      }
    };

    before(function() {
      var config = assign({}, withTokenConfig);
      this.client = new ManagementClient(config);
    });

    // Tests common to all managers.
    for (var name in managers) {
      manager = managers[name];

      it('should expose an instance of ' + name, function() {
        expect(this.client[manager.property]).to.exist.to.be.an.instanceOf(manager.cls);
      });
    }
  });

  describe('instance methods', function() {
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
      'updateTenantSettings',
      'deleteUserMultifactor',
      'deleteUserMultifcator'
    ];

    before(function() {
      var config = assign({}, withTokenConfig);
      this.client = new ManagementClient(config);
    });

    for (var i = 0, l = methods.length; i < l; i++) {
      method = methods[i];

      it('should have a ' + method + ' method', function() {
        expect(this.client[method]).to.exist.to.be.an.instanceOf(Function);
      });
    }
  });
});
