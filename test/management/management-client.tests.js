var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var ManagementClient = require('../../src/management');

var ArgumentError = require('rest-facade').ArgumentError;
var UsersManager = require('../../src/management/UsersManager');
var UserBlocksManager = require('../../src/management/UserBlocksManager');
var BlacklistedTokensManager = require('../../src/management/BlacklistedTokensManager');
var ClientsManager = require('../../src/management/ClientsManager');
var ClientGrantsManager = require('../../src/management/ClientGrantsManager');
var GrantsManager = require('../../src/management/GrantsManager');
var ConnectionsManager = require('../../src/management/ConnectionsManager');
var DeviceCredentialsManager = require('../../src/management/DeviceCredentialsManager');
var EmailProviderManager = require('../../src/management/EmailProviderManager');
var EmailTemplatesManager = require('../../src/management/EmailTemplatesManager');
var JobsManager = require('../../src/management/JobsManager');
var RulesManager = require('../../src/management/RulesManager');
var StatsManager = require('../../src/management/StatsManager');
var RulesConfigsManager = require('../../src/management/RulesConfigsManager');
var TenantManager = require('../../src/management/TenantManager');

describe('ManagementClient', function() {
  var withTokenProviderConfig = {
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    domain: 'auth0-node-sdk.auth0.com',
    tokenProvider: {
      enableCache: false
    }
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
    var config = Object.assign(
      { audience: 'https://auth0-node-sdk.auth0.com/api/v2/' },
      withTokenConfig
    );
    expect(new ManagementClient(config)).to.exist.to.be.an.instanceOf(ManagementClient);
  });

  it('should raise an error when no options object is provided', function() {
    expect(ManagementClient).to.throw(
      ArgumentError,
      'Management API SDK options must be an object'
    );
  });

  it('should raise an error when the domain is not set', function() {
    var config = Object.assign({}, withTokenConfig);
    delete config.domain;
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when the domain is not valid', function() {
    var config = Object.assign({}, withTokenConfig);
    config.domain = '';
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when the token is not valid', function() {
    var config = Object.assign({}, withTokenConfig);
    config.token = '';
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a token');
  });

  it('should raise an error when the token and clientId are not set', function() {
    var config = Object.assign({}, withTokenProviderConfig);
    delete config.clientId;
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a clientId');
  });

  it('should raise an error when the token and clientSecret are not set', function() {
    var config = Object.assign({}, withTokenProviderConfig);
    delete config.clientSecret;
    var client = ManagementClient.bind(null, config);

    expect(client).to.throw(ArgumentError, 'Must provide a clientSecret');
  });

  describe('getAccessToken', function() {
    it('should return token provided in config', function(done) {
      var config = Object.assign({}, withTokenConfig);
      var client = new ManagementClient(config);

      client.getAccessToken().then(function(accessToken) {
        expect(accessToken).to.equal(withTokenConfig.token);
        done();
      });
    });
    it('should return token from provider', function(done) {
      var config = Object.assign({}, withTokenProviderConfig);
      var client = new ManagementClient(config);

      nock('https://' + config.domain)
        .post('/oauth/token', function(body) {
          expect(body.client_id).to.equal(config.clientId);
          expect(body.client_secret).to.equal(config.clientSecret);
          expect(body.grant_type).to.equal('client_credentials');
          return true;
        })
        .reply(function(uri, requestBody, cb) {
          return cb(null, [200, { access_token: 'token', expires_in: 3600 }]);
        });

      client.getAccessToken().then(function(data) {
        expect(data).to.equal('token');
        done();
        nock.cleanAll();
      });
    });
  });

  describe('instance properties', function() {
    var manager;
    var managers = {
      UsersManager: {
        property: 'users',
        cls: UsersManager
      },
      UserBlocksManager: {
        property: 'userBlocks',
        cls: UserBlocksManager
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
      EmailTemplatesManager: {
        property: 'emailTemplates',
        cls: EmailTemplatesManager
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

    describe('user agent', function() {
      for (var name in managers) {
        manager = managers[name];

        it(manager + ' should use the node version by default', function() {
          var client = new ManagementClient(withTokenConfig);

          expect(
            client[manager.property].resource.restClient.restClient.options.headers
          ).to.contain({
            'User-Agent': 'node.js/' + process.version.replace('v', '')
          });
        });

        it(manager + ' should include additional headers when provided', function() {
          var customHeaders = {
            'User-Agent': 'my-user-agent',
            'Another-header': 'test-header'
          };

          var options = Object.assign({ headers: customHeaders }, withTokenConfig);
          var client = new ManagementClient(options);

          expect(
            client[manager.property].resource.restClient.restClient.options.headers
          ).to.contain({
            'User-Agent': 'my-user-agent',
            'Another-header': 'test-header'
          });
        });
      }
    });

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
        expect(
          client.users.invalidateRememberBrowsers.restClient.restClient.options.headers
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
        expect(
          client.guardian.factorsPhoneSelectedProvider.restClient.restClient.options.headers
        ).to.contain(requestHeaders);
        expect(
          client.guardian.factorsPhoneMessageTypes.restClient.restClient.options.headers
        ).to.contain(requestHeaders);

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

        expect(client.emailTemplates.resource.restClient.restClient.options.headers).to.contain(
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
        expect(
          client.users.invalidateRememberBrowsers.restClient.restClient.options.headers
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
        expect(
          client.guardian.factorsPhoneSelectedProvider.restClient.restClient.options.headers
        ).to.contain(requestHeaders);
        expect(
          client.guardian.factorsPhoneMessageTypes.restClient.restClient.options.headers
        ).to.contain(requestHeaders);

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

        expect(client.emailTemplates.resource.restClient.restClient.options.headers).to.contain(
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
        expect(
          client.users.invalidateRememberBrowsers.restClient.restClient.options.headers
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
          client.guardian.factorsPhoneSelectedProvider.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(
          client.guardian.factorsPhoneMessageTypes.restClient.restClient.options.headers
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

        expect(
          client.emailTemplates.resource.restClient.restClient.options.headers
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
        expect(
          client.users.invalidateRememberBrowsers.restClient.restClient.options.headers
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
          client.guardian.factorsPhoneSelectedProvider.restClient.restClient.options.headers
        ).to.not.have.property('Auth0-Client');
        expect(
          client.guardian.factorsPhoneMessageTypes.restClient.restClient.options.headers
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

        expect(
          client.emailTemplates.resource.restClient.restClient.options.headers
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
      var config = Object.assign({}, withTokenConfig);
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
      'deleteUser',
      'createUser',
      'updateUser',
      'getBlacklistedTokens',
      'blacklistToken',
      'createEmailTemplate',
      'getEmailTemplate',
      'updateEmailTemplate',
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
      'deleteRulesConfig',
      'createGuardianEnrollmentTicket',
      'getGuardianFactors',
      'getGuardianFactorSettings',
      'getGuardianFactorProvider',
      'updateGuardianFactorProvider',
      'updateGuardianFactorSettings',
      'getGuardianFactorTemplates',
      'updateGuardianFactorTemplates',
      'updateGuardianFactor',
      'getGuardianPolicies',
      'updateGuardianPolicies',
      'getGuardianPhoneFactorSelectedProvider',
      'updateGuardianPhoneFactorSelectedProvider',
      'getGuardianPhoneFactorMessageTypes',
      'updateGuardianPhoneFactorMessageTypes',
      'getUserBlocks',
      'unblockUser',
      'getUserBlocksByIdentifier',
      'unblockUserByIdentifier',
      'getAccessToken',
      'getPromptsSettings',
      'updatePromptsSettings'
    ];

    before(function() {
      var config = Object.assign({}, withTokenConfig);
      this.client = new ManagementClient(config);
    });

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.client[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });
});
