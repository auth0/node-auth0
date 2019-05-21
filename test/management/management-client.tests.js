var expect = require('chai').expect;
var sinon = require('sinon');
var assign = Object.assign || require('object.assign');
var proxyquire = require('proxyquire');

var ManagementClient = require('../../src/management');

var ArgumentError = require('rest-facade').ArgumentError;
var UsersManager = require('../../src/management/UsersManager');
var BlacklistedTokensManager = require('../../src/management/BlacklistedTokensManager');
var ClientsManager = require('../../src/management/ClientsManager');
var ClientGrantsManager = require('../../src/management/ClientGrantsManager');
var GrantsManager = require('../../src/management/GrantsManager');
var ConnectionsManager = require('../../src/management/ConnectionsManager');
var DeviceCredentialsManager = require('../../src/management/DeviceCredentialsManager');
var EmailProviderManager = require('../../src/management/EmailProviderManager');
var JobsManager = require('../../src/management/JobsManager');
var RulesManager = require('../../src/management/RulesManager');
var StatsManager = require('../../src/management/StatsManager');
var RulesConfigsManager = require('../../src/management/RulesConfigsManager');
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
      GrantsManager: {
        property: 'grants',
        cls: GrantsManager
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
      },
      RulesConfigsManager: {
        property: 'rulesConfigs',
        cls: RulesConfigsManager
      }
    };

    describe('client info', function() {
      it('should configure instances with default telemetry header', function() {
        var utilsStub = {
          generateClientInfo: sinon.spy(function() {
            return { name: 'test-sdk', version: 'ver-123' };
          })
        };
        var ManagementClientProxy = proxyquire('../../src/management/', {
          '../utils': utilsStub
        });
        var client = new ManagementClientProxy(withTokenConfig);

        var requestHeaders = {
          'Auth0-Client': 'eyJuYW1lIjoidGVzdC1zZGsiLCJ2ZXJzaW9uIjoidmVyLTEyMyJ9',
          'Content-Type': 'application/json'
        };

        expect(client.clients.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.clientGrants.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.grants.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.users.users.restClient.restClient.options.headers).to.contain(requestHeaders);
        expect(client.users.multifactor.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.users.identities.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.users.userLogs.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.users.enrollments.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.users.usersByEmail.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(
          client.users.recoveryCodeRegenerations.restClient.restClient.options.headers
        ).to.contain(requestHeaders);
        expect(client.users.roles.restClient.restClient.options.headers).to.contain(requestHeaders);
        expect(client.users.permissions.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.guardian.enrollments.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.guardian.tickets.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.guardian.factors.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.guardian.factorsTemplates.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.guardian.factorsProviders.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.customDomains.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(
          client.customDomains.vefifyResource.restClient.restClient.options.headers
        ).to.contain(requestHeaders);

        expect(client.connections.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.deviceCredentials.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.rules.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.blacklistedTokens.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.emailProvider.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.stats.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.tenant.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.jobs.jobs.restClient.restClient.options.headers).to.contain(requestHeaders);
        expect(client.jobs.usersExports.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.tickets.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.logs.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.resourceServers.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.emailTemplates.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.rulesConfigs.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.roles.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.roles.permissions.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.roles.users.restClient.restClient.options.headers).to.contain(requestHeaders);
      });

      it('should configure instances with custom telemetry header', function() {
        var customTelemetry = { name: 'custom', version: 'beta-01', env: { node: 'v10' } };
        var client = new ManagementClient({
          token: 'token',
          domain: 'auth0.com',
          clientInfo: customTelemetry
        });

        var requestHeaders = {
          'Auth0-Client':
            'eyJuYW1lIjoiY3VzdG9tIiwidmVyc2lvbiI6ImJldGEtMDEiLCJlbnYiOnsibm9kZSI6InYxMCJ9fQ',
          'Content-Type': 'application/json'
        };

        expect(client.clients.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.clientGrants.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.grants.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.users.users.restClient.restClient.options.headers).to.contain(requestHeaders);
        expect(client.users.multifactor.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.users.identities.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.users.userLogs.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.users.enrollments.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.users.usersByEmail.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(
          client.users.recoveryCodeRegenerations.restClient.restClient.options.headers
        ).to.contain(requestHeaders);
        expect(client.users.roles.restClient.restClient.options.headers).to.contain(requestHeaders);
        expect(client.users.permissions.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.guardian.enrollments.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.guardian.tickets.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.guardian.factors.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.guardian.factorsTemplates.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.guardian.factorsProviders.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.customDomains.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(
          client.customDomains.vefifyResource.restClient.restClient.options.headers
        ).to.contain(requestHeaders);

        expect(client.connections.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.deviceCredentials.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.rules.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.blacklistedTokens.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.emailProvider.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.stats.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.tenant.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.jobs.jobs.restClient.restClient.options.headers).to.contain(requestHeaders);
        expect(client.jobs.usersExports.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.tickets.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.logs.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.resourceServers.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.emailTemplates.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.rulesConfigs.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );

        expect(client.roles.resource.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.roles.permissions.restClient.restClient.options.headers).to.contain(
          requestHeaders
        );
        expect(client.roles.users.restClient.restClient.options.headers).to.contain(requestHeaders);
      });

      it('should configure instances without telemetry when "name" property is empty', function() {
        var customTelemetry = { name: '', version: 'beta-01', env: { node: 'v10' } };
        var client = new ManagementClient({
          token: 'token',
          domain: 'auth0.com',
          clientInfo: customTelemetry
        });

        expect(client.clients.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(
          client.clientGrants.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(client.grants.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.users.users.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.multifactor.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.identities.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.userLogs.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.enrollments.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(
          client.users.usersByEmail.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(
          client.users.recoveryCodeRegenerations.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(client.users.roles.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.permissions.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(
          client.guardian.enrollments.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(client.guardian.tickets.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.guardian.factors.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(
          client.guardian.factorsTemplates.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(
          client.guardian.factorsProviders.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.customDomains.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(
          client.customDomains.vefifyResource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.connections.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.deviceCredentials.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(client.rules.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(
          client.blacklistedTokens.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.emailProvider.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(client.stats.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.tenant.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.jobs.jobs.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.jobs.usersExports.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.tickets.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.logs.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(
          client.resourceServers.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.emailTemplates.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.rulesConfigs.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(client.roles.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.roles.permissions.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.roles.users.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
      });

      it('should configure instances without telemetry header when disabled', function() {
        var client = new ManagementClient({
          token: 'token',
          domain: 'auth0.com',
          telemetry: false
        });

        expect(client.clients.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(
          client.clientGrants.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(client.grants.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.users.users.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.multifactor.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.identities.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.userLogs.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.enrollments.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(
          client.users.usersByEmail.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(
          client.users.recoveryCodeRegenerations.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(client.users.roles.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.users.permissions.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(
          client.guardian.enrollments.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(client.guardian.tickets.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.guardian.factors.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(
          client.guardian.factorsTemplates.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(
          client.guardian.factorsProviders.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.customDomains.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(
          client.customDomains.vefifyResource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.connections.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.deviceCredentials.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(client.rules.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(
          client.blacklistedTokens.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.emailProvider.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(client.stats.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.tenant.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.jobs.jobs.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.jobs.usersExports.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.tickets.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(client.logs.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );

        expect(
          client.resourceServers.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.emailTemplates.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(
          client.rulesConfigs.resource.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');

        expect(client.roles.resource.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.roles.permissions.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
        expect(client.roles.users.restClient.restClient.options.headers).to.not.have.property(
          'Auth0-Client'
        );
      });
    });

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
      'getGrants',
      'deleteGrant',
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
      'deleteUserMultifcator',
      'setRulesConfig',
      'getRulesConfigs',
      'deleteRulesConfig'
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
