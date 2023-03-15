const { expect } = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const ManagementClient = require('../../src/management');

const { ArgumentError } = require('rest-facade');
const UsersManager = require('../../src/management/UsersManager');
const UserBlocksManager = require('../../src/management/UserBlocksManager');
const BlacklistedTokensManager = require('../../src/management/BlacklistedTokensManager');
const ClientsManager = require('../../src/management/ClientsManager');
const ClientGrantsManager = require('../../src/management/ClientGrantsManager');
const GrantsManager = require('../../src/management/GrantsManager');
const ConnectionsManager = require('../../src/management/ConnectionsManager');
const DeviceCredentialsManager = require('../../src/management/DeviceCredentialsManager');
const EmailProviderManager = require('../../src/management/EmailProviderManager');
const EmailTemplatesManager = require('../../src/management/EmailTemplatesManager');
const JobsManager = require('../../src/management/JobsManager');
const RulesManager = require('../../src/management/RulesManager');
const StatsManager = require('../../src/management/StatsManager');
const RulesConfigsManager = require('../../src/management/RulesConfigsManager');
const TenantManager = require('../../src/management/TenantManager');

describe('ManagementClient', () => {
  const withTokenProviderConfig = {
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    domain: 'auth0-node-sdk.auth0.com',
    tokenProvider: {
      enableCache: false,
    },
  };

  const withTokenConfig = {
    domain: 'auth0-node-sdk.auth0.com',
    token: 'fake-token',
  };

  const withTokenFunctionConfig = {
    domain: 'auth0-node-sdk.auth0.com',
    token: () => Promise.resolve('fake-function-token'),
  };

  it('should expose an instance of ManagementClient when withTokenConfig is passed', () => {
    expect(new ManagementClient(withTokenConfig)).to.exist.to.be.an.instanceOf(ManagementClient);
  });

  it('should expose an instance of ManagementClient when withTokenFunctionConfig is passed', () => {
    expect(new ManagementClient(withTokenFunctionConfig)).to.exist.to.be.an.instanceOf(
      ManagementClient
    );
  });

  it('should expose an instance of ManagementClient when withTokenProviderConfig is passed', () => {
    expect(new ManagementClient(withTokenProviderConfig)).to.exist.to.be.an.instanceOf(
      ManagementClient
    );
  });

  it('should expose an instance of ManagementClient when withTokenProviderConfig and audience is passed', () => {
    const config = Object.assign(
      { audience: 'https://auth0-node-sdk.auth0.com/api/v2/' },
      withTokenConfig
    );
    expect(new ManagementClient(config)).to.exist.to.be.an.instanceOf(ManagementClient);
  });

  it('should raise an error when no options object is provided', () => {
    expect(() => {
      new ManagementClient();
    }).to.throw(ArgumentError, 'Management API SDK options must be an object');
  });

  it('should raise an error when the domain is not set', () => {
    const options = Object.assign({}, withTokenConfig);
    delete options.domain;

    expect(() => {
      new ManagementClient(options);
    }).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when the domain is not valid', () => {
    const options = Object.assign({}, withTokenConfig);
    options.domain = '';

    expect(() => {
      new ManagementClient(options);
    }).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when the token is not valid', () => {
    const options = Object.assign({}, withTokenConfig);
    options.token = '';

    expect(() => {
      new ManagementClient(options);
    }).to.throw(ArgumentError, 'Must provide a token');
  });

  it('should raise an error when the token and clientId are not set', () => {
    const options = Object.assign({}, withTokenProviderConfig);
    delete options.clientId;

    expect(() => {
      new ManagementClient(options);
    }).to.throw(ArgumentError, 'Must provide a clientId');
  });

  it('should raise an error when the token and clientSecret are not set', () => {
    const options = Object.assign({}, withTokenProviderConfig);
    delete options.clientSecret;

    expect(() => {
      new ManagementClient(options);
    }).to.throw(ArgumentError, 'Must provide a clientSecret');
  });

  describe('getAccessToken', () => {
    it('should return token provided in config', (done) => {
      const config = Object.assign({}, withTokenConfig);
      const client = new ManagementClient(config);

      client.getAccessToken().then((accessToken) => {
        expect(accessToken).to.equal(withTokenConfig.token);
        done();
      });
    });
    it('should return token from provider', (done) => {
      const config = Object.assign({}, withTokenProviderConfig);
      const client = new ManagementClient(config);

      nock(`https://${config.domain}`)
        .post('/oauth/token', (body) => {
          expect(body.client_id).to.equal(config.clientId);
          expect(body.client_secret).to.equal(config.clientSecret);
          expect(body.grant_type).to.equal('client_credentials');
          return true;
        })
        .reply((uri, requestBody, cb) =>
          cb(null, [200, { access_token: 'token', expires_in: 3600 }])
        );

      client.getAccessToken().then((data) => {
        expect(data).to.equal('token');
        done();
        nock.cleanAll();
      });
    });
  });

  describe('instance properties', () => {
    let manager;
    const managers = {
      UsersManager: {
        property: 'users',
        cls: UsersManager,
      },
      UserBlocksManager: {
        property: 'userBlocks',
        cls: UserBlocksManager,
      },
      BlacklistedTokensManager: {
        property: 'blacklistedTokens',
        cls: BlacklistedTokensManager,
      },
      ClientsManager: {
        property: 'clients',
        cls: ClientsManager,
      },
      ClientGrantsManager: {
        property: 'clientGrants',
        cls: ClientGrantsManager,
      },
      GrantsManager: {
        property: 'grants',
        cls: GrantsManager,
      },
      ConnectionsManager: {
        property: 'connections',
        cls: ConnectionsManager,
      },
      DeviceCredentialsManager: {
        property: 'deviceCredentials',
        cls: DeviceCredentialsManager,
      },
      EmailProviderManager: {
        property: 'emailProvider',
        cls: EmailProviderManager,
      },
      EmailTemplatesManager: {
        property: 'emailTemplates',
        cls: EmailTemplatesManager,
      },
      JobsManager: {
        property: 'jobs',
        cls: JobsManager,
      },
      RulesManager: {
        property: 'rules',
        cls: RulesManager,
      },
      StatsManager: {
        property: 'stats',
        cls: StatsManager,
      },
      TenantManager: {
        property: 'tenant',
        cls: TenantManager,
      },
      RulesConfigsManager: {
        property: 'rulesConfigs',
        cls: RulesConfigsManager,
      },
    };

    describe('user agent', () => {
      for (const name in managers) {
        manager = managers[name];

        it(`${manager} should use the node version by default`, () => {
          const client = new ManagementClient(withTokenConfig);

          expect(
            client[manager.property].resource.restClient.restClient.options.headers
          ).to.contain({
            'User-Agent': `node.js/${process.version.replace('v', '')}`,
          });
        });

        it(`${manager} should include additional headers when provided`, () => {
          const customHeaders = {
            'User-Agent': 'my-user-agent',
            'Another-header': 'test-header',
          };

          const options = Object.assign({ headers: customHeaders }, withTokenConfig);
          const client = new ManagementClient(options);

          expect(
            client[manager.property].resource.restClient.restClient.options.headers
          ).to.contain({
            'User-Agent': 'my-user-agent',
            'Another-header': 'test-header',
          });
        });
      }
    });

    describe('client info', () => {
      it('should configure instances with default telemetry header', () => {
        const utilsStub = {
          generateClientInfo: sinon.spy(() => ({ name: 'test-sdk', version: 'ver-123' })),
        };
        const ManagementClientProxy = proxyquire('../../src/management/', {
          '../utils': utilsStub,
        });
        const client = new ManagementClientProxy(withTokenConfig);

        const requestHeaders = {
          'Auth0-Client': 'eyJuYW1lIjoidGVzdC1zZGsiLCJ2ZXJzaW9uIjoidmVyLTEyMyJ9',
          'Content-Type': 'application/json',
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

      it('should configure instances with custom telemetry header', () => {
        const customTelemetry = { name: 'custom', version: 'beta-01', env: { node: 'v10' } };
        const client = new ManagementClient({
          token: 'token',
          domain: 'auth0.com',
          clientInfo: customTelemetry,
        });

        const requestHeaders = {
          'Auth0-Client':
            'eyJuYW1lIjoiY3VzdG9tIiwidmVyc2lvbiI6ImJldGEtMDEiLCJlbnYiOnsibm9kZSI6InYxMCJ9fQ',
          'Content-Type': 'application/json',
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

      it('should configure instances without telemetry when "name" property is empty', () => {
        const customTelemetry = { name: '', version: 'beta-01', env: { node: 'v10' } };
        const client = new ManagementClient({
          token: 'token',
          domain: 'auth0.com',
          clientInfo: customTelemetry,
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

      it('should configure instances without telemetry header when disabled', () => {
        const client = new ManagementClient({
          token: 'token',
          domain: 'auth0.com',
          telemetry: false,
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

    before(function () {
      const config = Object.assign({}, withTokenConfig);
      this.client = new ManagementClient(config);
    });

    // Tests common to all managers.
    for (const name in managers) {
      manager = managers[name];

      it(`should expose an instance of ${name}`, function () {
        expect(this.client[manager.property]).to.exist.to.be.an.instanceOf(manager.cls);
      });
    }
  });

  describe('instance methods', () => {
    const methods = [
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
      'updatePromptsSettings',
    ];

    before(function () {
      const config = Object.assign({}, withTokenConfig);
      this.client = new ManagementClient(config);
    });

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.client[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });

    it('should assign roles to a user', function () {
      sinon.stub(this.client.users, 'assignRoles');
      this.client.assignRolestoUser();
      expect(this.client.users.assignRoles.called).ok;
      this.client.users.assignRoles.reset();
    });

    it('should include response headers in response', async function () {
      const config = Object.assign({}, withTokenConfig, { includeResponseHeaders: true });
      this.client = new ManagementClient(config);

      nock('https://auth0-node-sdk.auth0.com').get(`/api/v2/users`).reply(200, { data: 'value' });

      const { data, headers } = await this.client.users.getAll();
      expect(data).to.deep.equal({ data: 'value' });
      expect(headers).to.deep.equal({ 'content-type': 'application/json' });
      nock.cleanAll();
    });

    it('should include response headers in response for shorthand method', async function () {
      const config = Object.assign({}, withTokenConfig, { includeResponseHeaders: true });
      this.client = new ManagementClient(config);

      nock('https://auth0-node-sdk.auth0.com').get(`/api/v2/users`).reply(200, { data: 'value' });

      const { data, headers } = await this.client.getUsers();
      expect(data).to.deep.equal({ data: 'value' });
      expect(headers).to.deep.equal({ 'content-type': 'application/json' });
      nock.cleanAll();
    });

    it('should include the header Authorization with the token returned by the injected function', async function () {
      const config = Object.assign({}, withTokenFunctionConfig);
      this.client = new ManagementClient(config);

      nock('https://auth0-node-sdk.auth0.com', {
        reqheaders: {
          Authorization: (value) => value === 'Bearer fake-function-token',
        },
      })
        .get(`/api/v2/users`)
        .reply(200, { data: 'value' });

      const { data } = await this.client.getUsers();
      expect(data).to.deep.equal('value');
      nock.cleanAll();
    });
  });
});
