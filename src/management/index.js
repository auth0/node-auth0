const util = require('util');
const utils = require('../utils');
const { jsonToBase64, generateClientInfo } = utils;
const { ArgumentError } = require('rest-facade');

// Managers.
const ClientsManager = require('./ClientsManager');
const ClientGrantsManager = require('./ClientGrantsManager');
const GrantsManager = require('./GrantsManager');
const UsersManager = require('./UsersManager');
const UserBlocksManager = require('./UserBlocksManager');
const ConnectionsManager = require('./ConnectionsManager');
const AttackProtectionManager = require('./AttackProtectionManager');
const BlacklistedTokensManager = require('./BlacklistedTokensManager');
const RulesManager = require('./RulesManager');
const DeviceCredentialsManager = require('./DeviceCredentialsManager');
const EmailProviderManager = require('./EmailProviderManager');
const StatsManager = require('./StatsManager');
const TenantManager = require('./TenantManager');
const JobsManager = require('./JobsManager');
const TicketsManager = require('./TicketsManager');
const LogsManager = require('./LogsManager');
const LogStreamsManager = require('./LogStreamsManager');
const ResourceServersManager = require('./ResourceServersManager');
const ManagementTokenProvider = require('./ManagementTokenProvider');
const RulesConfigsManager = require('./RulesConfigsManager');
const EmailTemplatesManager = require('./EmailTemplatesManager');
const GuardianManager = require('./GuardianManager');
const CustomDomainsManager = require('./CustomDomainsManager');
const RolesManager = require('./RolesManager');
const HooksManager = require('./HooksManager');
const BrandingManager = require('./BrandingManager');
const MigrationsManager = require('./MigrationsManager');
const PromptsManager = require('./PromptsManager');
const ActionsManager = require('./ActionsManager');
const OrganizationsManager = require('./OrganizationsManager');

const BASE_URL_FORMAT = 'https://%s/api/v2';
const MANAGEMENT_API_AUD_FORMAT = 'https://%s/api/v2/';

/**
 * Management API SDK.
 *
 * The Auth0 Management API is meant to be used by back-end servers or trusted
 * parties performing administrative tasks. Generally speaking, anything that
 * can be done through the Auth0 dashboard (and more) can also be done through
 * this API.
 *
 * @example <caption>
 *   Initialize your client class with an API v2 token (you can generate one
 *   <a href="https://auth0.com/docs/apiv2">here</a>) and a domain.
 * </caption>
 *
 * var ManagementClient = require('auth0').ManagementClient;
 * var auth0 = new ManagementClient({
 *   domain: '{YOUR_ACCOUNT}.auth0.com',
 *   token: '{YOUR_API_V2_TOKEN}'
 * });
 * @example <caption>
 *   Initialize your client class, by using a Non Interactive Client to fetch an access_token
 *   via the Client Credentials Grant.
 * </caption>
 *
 * var ManagementClient = require('auth0').ManagementClient;
 * var auth0 = new ManagementClient({
 *   domain: '{YOUR_ACCOUNT}.auth0.com',
 *   clientId: '{YOUR_NON_INTERACTIVE_CLIENT_ID}',
 *   clientSecret: '{YOUR_NON_INTERACTIVE_CLIENT_SECRET}',
 *   scope: "read:users write:users",
 *   audience: 'https://{YOUR_TENANT_NAME}.auth0.com/api/v2/',
 *   tokenProvider: {
 *    enableCache: true,
 *    cacheTTLInSeconds: 10
 *  }
 * });
 */
class ManagementClient {
  /**
   * @param   {object}  options                                   Options for the ManagementClient SDK.
   *          If a token is provided only the domain is required, other parameters are ignored.
   *          If no token is provided domain, clientId, clientSecret and scopes are required
   * @param   {string}  options.domain                              ManagementClient server domain.
   * @param   {string}  [options.token]                             API access token.
   * @param   {string}  [options.clientId]                          Management API Non Interactive Client Id.
   * @param   {string}  [options.clientSecret]                      Management API Non Interactive Client Secret.
   * @param   {string}  [options.audience]                          Management API Audience. By default is your domain's, e.g. the domain is `tenant.auth0.com` and the audience is `http://tenant.auth0.com/api/v2/`
   * @param   {string}  [options.scope]                             Management API Scopes.
   * @param   {boolean} [options.tokenProvider.enableCache=true]    Enabled or Disable Cache.
   * @param   {number}  [options.tokenProvider.cacheTTLInSeconds]   By default the `expires_in` value will be used to determine the cached time of the token, this can be overridden.
   * @param   {boolean} [options.retry.enabled=true]                Enabled or Disable Retry Policy functionality.
   * @param   {number}  [options.retry.maxRetries=10]               Retry failed requests X times.
   * @param   {object}  [options.headers]                           Additional headers that will be added to the outgoing requests.
   */
  constructor(options) {
    if (!options || typeof options !== 'object') {
      throw new ArgumentError('Management API SDK options must be an object');
    }

    if (!options.domain || options.domain.length === 0) {
      throw new ArgumentError('Must provide a domain');
    }

    const baseUrl = util.format(BASE_URL_FORMAT, options.domain);

    const defaultHeaders = {
      'User-Agent': `node.js/${process.version.replace('v', '')}`,
      'Content-Type': 'application/json',
    };

    const managerOptions = {
      headers: Object.assign(defaultHeaders, options.headers || {}),
      baseUrl,
    };

    if (options.token === undefined) {
      const config = Object.assign(
        { audience: util.format(MANAGEMENT_API_AUD_FORMAT, options.domain) },
        options
      );

      if (options.tokenProvider) {
        config.enableCache = options.tokenProvider.enableCache;
        config.cacheTTLInSeconds = options.tokenProvider.cacheTTLInSeconds;
        delete config.tokenProvider;
      }

      this.tokenProvider = new ManagementTokenProvider(config);
    } else if (typeof options.token !== 'string' || options.token.length === 0) {
      throw new ArgumentError('Must provide a token');
    } else {
      this.tokenProvider = {
        getAccessToken() {
          return Promise.resolve(options.token);
        },
      };
      managerOptions.headers['Authorization'] = `Bearer ${options.token}`;
    }

    managerOptions.tokenProvider = this.tokenProvider;

    if (options.telemetry !== false) {
      const clientInfo = options.clientInfo || generateClientInfo();
      if ('string' === typeof clientInfo.name && clientInfo.name.length > 0) {
        const telemetry = jsonToBase64(clientInfo);
        managerOptions.headers['Auth0-Client'] = telemetry;
      }
    }

    managerOptions.retry = options.retry;

    /**
     * Simple abstraction for performing CRUD operations on the
     * clients endpoint.
     *
     * @type {ClientsManager}
     */
    this.clients = new ClientsManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the client grants
     * endpoint.
     *
     * @type {ClientGrantsManager}
     */
    this.clientGrants = new ClientGrantsManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the grants
     * endpoint.
     *
     * @type {GrantsManager}
     */
    this.grants = new GrantsManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * users endpoint.
     *
     * @type {UsersManager}
     */
    this.users = new UsersManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * user-blocks endpoint.
     *
     * @type {UserBlocksManager}
     */
    this.userBlocks = new UserBlocksManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * guardian endpoint.
     *
     * @type {GuardianManager}
     */
    this.guardian = new GuardianManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * custom domains endpoint.
     *
     * @type {CustomDomainsManager}
     */
    this.customDomains = new CustomDomainsManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * connections endpoint.
     *
     * @type {ConnectionsManager}
     */
    this.connections = new ConnectionsManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * device credentials endpoint.
     *
     * @type {DeviceCredentialsManager}
     */
    this.deviceCredentials = new DeviceCredentialsManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * rules endpoint.
     *
     * @type {RulesManager}
     */
    this.rules = new RulesManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * blacklisted tokens endpoint.
     *
     * @type {BlacklistedTokensManager}
     */
    this.blacklistedTokens = new BlacklistedTokensManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * email provider endpoint.
     *
     * @type {EmailProviderManager}
     */
    this.emailProvider = new EmailProviderManager(managerOptions);

    /**
     * ManagementClient account statistics manager.
     *
     * @type {StatsManager}
     */
    this.stats = new StatsManager(managerOptions);

    /**
     * ManagementClient tenant settings manager.
     *
     * @type {TenantManager}
     */
    this.tenant = new TenantManager(managerOptions);

    /**
     * Jobs manager.
     *
     * @type {JobsManager}
     */
    this.jobs = new JobsManager(managerOptions);

    /**
     * Tickets manager.
     *
     * @type {TicketsManager}
     */
    this.tickets = new TicketsManager(managerOptions);

    /**
     * Logs manager.
     *
     * @type {LogsManager}
     */
    this.logs = new LogsManager(managerOptions);

    /**
     * Log Streams manager.
     *
     * @type {LogStreamsManager}
     */
    this.logStreams = new LogStreamsManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * resource servers endpoint.
     *
     * @type {ResourceServersManager}
     */
    this.resourceServers = new ResourceServersManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on
     * Auth0's Email Templates
     *
     * @type {EmailTemplatesManager}
     */
    this.emailTemplates = new EmailTemplatesManager(managerOptions);

    /**
     * RulesConfigs manager.
     *
     * @type {RulesConfigsManager}
     */
    this.rulesConfigs = new RulesConfigsManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * roles endpoint.
     *
     * @type {RolesManager}
     */
    this.roles = new RolesManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * hooks endpoint.
     *
     * @type {HooksManager}
     */
    this.hooks = new HooksManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * branding endpoint.
     *
     * @type {BrandingManager}
     */
    this.branding = new BrandingManager(managerOptions);

    /**
     * ManagementClient migrations manager.
     *
     * @type {MigrationsManager}
     */
    this.migrations = new MigrationsManager(managerOptions);

    /**
     * Prompts Manager
     *
     * @type {PromptsManager}
     */
    this.prompts = new PromptsManager(managerOptions);

    /**
     * Simple abstraction for performing CRUD operations on the
     * actions endpoint.
     *
     * @type {ActionsManager}
     */
    this.actions = new ActionsManager(managerOptions);

    /**
     * Organizations Manager
     *
     * @type {OrganizationsManager}
     */
    this.organizations = new OrganizationsManager(managerOptions);

    /**
     * Attack Protection Manager
     *
     * @type {AttackProtectionManager}
     */
    this.attackProtection = new AttackProtectionManager(managerOptions);
  }

  /**
   * Get all connections.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.getConnections(params, function (err, connections) {
   *   console.log(connections.length);
   * });
   * @param   {object}    [params]          Connections params.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getConnections(...args) {
    return this.connections.getAll(...args);
  }

  /**
   * Create a new connection.
   *
   * @example
   * management.createConnection(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Connection created.
   * });
   * @param   {object}    data     Connection data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */

  createConnection(...args) {
    return this.connections.create(...args);
  }

  /**
   * Get an Auth0 connection.
   *
   * @example
   * management.getConnection({ id: CONNECTION_ID }, function (err, connection) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(connection);
   * });
   * @param   {object}    params          Connection parameters.
   * @param   {string}    params.id       Connection ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  getConnection(...args) {
    return this.connections.get(...args);
  }

  /**
   * Delete an existing connection.
   *
   * @example
   * management.deleteConnection({ id: CONNECTION_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Connection deleted.
   * });
   * @param   {object}    params          Connection parameters.
   * @param   {string}    params.id       Connection ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  deleteConnection(...args) {
    return this.connections.delete(...args);
  }

  /**
   * Update an existing connection.
   *
   * @example
   * var data = { name: 'newConnectionName' };
   * var params = { id: CONNECTION_ID };
   *
   * management.updateConnection(params, data, function (err, connection) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(connection.name);  // 'newConnectionName'
   * });
   * @param   {object}    params        Connection parameters.
   * @param   {string}    params.id     Connection ID.
   * @param   {object}    data          Updated connection data.
   * @param   {Function}  [cb]          Callback function.
   * @returns    {Promise|undefined}
   */
  updateConnection(...args) {
    return this.connections.update(...args);
  }

  /**
   * Get all Auth0 clients.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.getClients(params, function (err, clients) {
   *   console.log(clients.length);
   * });
   * @param   {object}    [params]          Clients parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getClients(...args) {
    return this.clients.getAll(...args);
  }

  /**
   * Get an Auth0 client.
   *
   * @example
   * management.getClient({ client_id: CLIENT_ID }, function (err, client) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(client);
   * });
   * @param   {object}    params            Client parameters.
   * @param   {string}    params.client_id  Application client ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getClient(...args) {
    return this.clients.get(...args);
  }

  /**
   * Create an Auth0 client.
   *
   * @example
   * management.createClient(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Client created.
   * });
   * @param   {object}    data     The client data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createClient(...args) {
    return this.clients.create(...args);
  }

  /**
   * Update an Auth0 client.
   *
   * @example
   * var data = { name: 'newClientName' };
   * var params = { client_id: CLIENT_ID };
   *
   * management.updateClient(params, data, function (err, client) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(client.name);  // 'newClientName'
   * });
   * @param   {object}    params            Client parameters.
   * @param   {string}    params.client_id  Application client ID.
   * @param   {object}    data              Updated client data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateClient(...args) {
    return this.clients.update(...args);
  }

  /**
   * Delete an Auth0 client.
   *
   * @example
   * management.deleteClient({ client_id: CLIENT_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Client deleted.
   * });
   * @param   {object}    params            Client parameters.
   * @param   {string}    params.client_id  Application client ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  deleteClient(...args) {
    return this.clients.delete(...args);
  }

  /**
   * Get all Auth0 Client Grants.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.getClientGrants(params, function (err, grants) {
   *   console.log(grants.length);
   * });
   * @param   {object}    [params]          Client Grants parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getClientGrants(...args) {
    return this.clientGrants.getAll(...args);
  }

  /**
   * Create an Auth0 client grant.
   *
   * @example
   * management.clientGrants.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Client grant created.
   * });
   * @param   {object}    data     The client data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createClientGrant(...args) {
    return this.clientGrants.create(...args);
  }

  /**
   * Update an Auth0 client grant.
   *
   * @example
   * var data = {
   *   client_id: CLIENT_ID,
   *   audience: AUDIENCE,
   *   scope: []
   * };
   * var params = { id: CLIENT_GRANT_ID };
   *
   * management.clientGrants.update(params, data, function (err, grant) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(grant.id);
   * });
   * @param   {object}    params     Client parameters.
   * @param   {string}    params.id  Client grant ID.
   * @param   {object}    data       Updated client data.
   * @param   {Function}  [cb]       Callback function.
   * @returns    {Promise|undefined}
   */
  updateClientGrant(...args) {
    return this.clientGrants.update(...args);
  }

  /**
   * Delete an Auth0 client grant.
   *
   * @example
   * management.clientGrants.delete({ id: GRANT_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Grant deleted.
   * });
   * @param   {object}    params     Client parameters.
   * @param   {string}    params.id  Client grant ID.
   * @param   {Function}  [cb]       Callback function.
   * @returns  {Promise|undefined}
   */
  deleteClientGrant(...args) {
    return this.clientGrants.delete(...args);
  }

  /**
   * Get all Auth0 Grants.
   *
   * @example
   * var params = {
   *   per_page: 10,
   *   page: 0,
   *   include_totals: true,
   *   user_id: USER_ID,
   *   client_id: CLIENT_ID,
   *   audience: AUDIENCE
   * };
   *
   * management.getGrants(params, function (err, grants) {
   *   console.log(grants.length);
   * });
   * @param   {object}    params                Grants parameters.
   * @param   {number}    params.per_page       Number of results per page.
   * @param   {number}    params.page           Page number, zero indexed.
   * @param   {boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
   * @param   {string}    params.user_id        The user_id of the grants to retrieve.
   * @param   {string}    params.client_id      The client_id of the grants to retrieve.
   * @param   {string}    params.audience       The audience of the grants to retrieve.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  getGrants(...args) {
    return this.grants.getAll(...args);
  }

  /**
   * Delete an Auth0 grant.
   *
   * @example
   * var params = {
   *    id: GRANT_ID,
   *    user_id: USER_ID
   * };
   *
   * management.deleteGrant(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Grant deleted.
   * });
   * @param   {object}    params         Grant parameters.
   * @param   {string}    params.id      Grant ID.
   * @param   {string}    params.user_id The user_id of the grants to delete.
   * @param   {Function}  [cb]           Callback function.
   * @returns  {Promise|undefined}
   */
  deleteGrant(...args) {
    return this.grants.delete(...args);
  }

  /**
   * Create an Auth0 credential.
   *
   * @example
   * management.createConnection(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Credential created.
   * });
   * @param   {object}    data     The device credential data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createDevicePublicKey(...args) {
    return this.deviceCredentials.createPublicKey(...args);
  }

  /**
   * Get all Auth0 credentials.
   *
   * @example
   * var params = {user_id: "USER_ID"};
   *
   * management.getDeviceCredentials(params, function (err, credentials) {
   *   console.log(credentials.length);
   * });
   * @param   {object}    params  Credential parameters.
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  getDeviceCredentials(...args) {
    return this.deviceCredentials.getAll(...args);
  }

  /**
   * Delete an Auth0 device credential.
   *
   * @example
   * var params = { id: CREDENTIAL_ID };
   *
   * management.deleteDeviceCredential(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Credential deleted.
   * });
   * @param   {object}    params          Credential parameters.
   * @param   {string}    params.id       Device credential ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  deleteDeviceCredential(...args) {
    return this.deviceCredentials.delete(...args);
  }

  /**
   * Get all rules.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.getRules(params, function (err, rules) {
   *   console.log(rules.length);
   * });
   * @param   {object}    [params]          Rules parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getRules(...args) {
    return this.rules.getAll(...args);
  }

  /**
   * Create a new rule.
   *
   * @example
   * management.createRule(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Rule created.
   * });
   * @param   {object}    data     Rule data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createRule(...args) {
    return this.rules.create(...args);
  }

  /**
   * Get an Auth0 rule.
   *
   * @example
   * management.getRule({ id: RULE_ID }, function (err, rule) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(rule);
   * });
   * @param   {object}    params        Rule parameters.
   * @param   {string}    params.id     Rule ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getRule(...args) {
    return this.rules.get(...args);
  }

  /**
   * Delete an existing rule.
   *
   * @example
   * auth0.deleteRule({ id: RULE_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Rule deleted.
   * });
   * @param   {object}    params        Rule parameters.
   * @param   {string}    params.id     Rule ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  deleteRule(...args) {
    return this.rules.delete(...args);
  }

  /**
   * Update an existing rule.
   *
   * @example
   * var params = { id: RULE_ID };
   * var data = { name: 'my-rule'};
   * management.updateRule(params, data, function (err, rule) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(rule.name); // 'my-rule'.
   * });
   * @param   {object}    params        Rule parameters.
   * @param   {string}    params.id     Rule ID.
   * @param   {object}    data          Updated rule data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  updateRule(...args) {
    return this.rules.update(...args);
  }

  /**
   * Get all users.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   search_engine: 'v3',
   *   q: 'name:*jane*',
   *   per_page: 10,
   *   page: 0
   * };
   *
   * auth0.getUsers(params, function (err, users) {
   *   console.log(users.length);
   * });
   * @param   {object}    [params]               Users params.
   * @param   {number}    [params.search_engine] The version of the search engine to use.
   * @param   {string}    [params.q]             User Search string to filter which users are returned. Follows Lucene query string syntax as documented at https://auth0.com/docs/api/management/v2#!/Users/get_users.
   * @param   {number}    [params.per_page]      Number of results per page.
   * @param   {number}    [params.page]          Page number, zero indexed.
   * @param   {Function}  [cb]                   Callback function.
   * @returns  {Promise|undefined}
   */
  getUsers(...args) {
    return this.users.getAll(...args);
  }

  /**
   * Get users for a given email address
   *
   * @example <caption>
   *   This method takes an email address as the first argument,
   *   and returns all users with that email address
   * </caption>
   *
   * auth0.getUsersByEmail(email, function (err, users) {
   *   console.log(users);
   * });
   * @param   {string}    [email]                     Email address of user(s) to find
   * @param   {object}    [options]                   Additional options to pass to the endpoint
   * @param   {string}    [options.fields]            Comma-separated list of fields to include or exclude in the result
   * @param   {boolean}   [options.include_fields]    Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   * @param   {Function}  [cb]                        Callback function.
   * @returns  {Promise|undefined}
   */
  getUsersByEmail(...args) {
    return this.users.getByEmail(...args);
  }

  /**
   * Get a user by its id.
   *
   * @example
   * management.getUser({ id: USER_ID }, function (err, user) {
   *   console.log(user);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  getUser(...args) {
    return this.users.get(...args);
  }

  /**
   * Delete all users.
   *
   * @example
   * management.deleteAllUsers(function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Users deleted
   * });
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   * @deprecated This method will be removed in the next major release.
   */
  deleteAllUsers(...args) {
    return this.users.deleteAll(...args);
  }

  /**
   * Delete a user by its id.
   *
   * @example
   * management.deleteUser({ id: USER_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User deleted.
   * });
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  deleteUser(...args) {
    return this.users.delete(...args);
  }

  /**
   * Create a new user.
   *
   * @example
   * management.createUser(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User created.
   * });
   * @param   {object}    data    User data.
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  createUser(...args) {
    return this.users.create(...args);
  }

  /**
   * Update a user by its id.
   *
   * @example
   * var params = { id: USER_ID };
   *
   * management.updateUser(params, data, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Updated user.
   *   console.log(user);
   * });
   * @param   {object}    params      The user parameters.
   * @param   {string}    params.id   The user id.
   * @param   {object}    data        New user data.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  updateUser(...args) {
    return this.users.update(...args);
  }

  /**
   * Update the user metadata for a user.
   *
   * @example
   * var params = { id: USER_ID };
   * var metadata = {
   *   address: '123th Node.js Street'
   * };
   *
   * management.updateUserMetadata(params, metadata, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Updated user.
   *   console.log(user);
   * });
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {object}    metadata    New user metadata.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  updateUserMetadata(...args) {
    return this.users.updateUserMetadata(...args);
  }

  /**
   * Update the app metadata for a user.
   *
   * @example
   * var params = { id: USER_ID };
   * var metadata = {
   *   foo: 'bar'
   * };
   *
   * management.updateAppMetadata(params, metadata, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Updated user.
   *   console.log(user);
   * });
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {object}    metadata    New app metadata.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  updateAppMetadata(...args) {
    return this.users.updateAppMetadata(...args);
  }

  /**
   * Delete a multifactor provider for a user.
   *
   * @example
   * var params = { id: USER_ID, provider: MULTIFACTOR_PROVIDER };
   *
   * management.deleteUserMultifactor(params, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Users accounts unlinked.
   * });
   * @param   {object}    params            Data object.
   * @param   {string}    params.id         The user id.
   * @param   {string}    params.provider   Multifactor provider.
   * @param   {Function}  [cb]              Callback function
   * @returns  {Promise|undefined}
   */
  deleteUserMultifactor(...args) {
    return this.users.deleteMultifactorProvider(...args);
  }

  /**
   * Delete a multifactor provider for a user.
   *
   * @example
   * var params = { id: USER_ID, provider: MULTIFACTOR_PROVIDER };
   *
   * management.deleteUserMultifcator(params, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Users accounts unlinked.
   * });
   * @param   {object}    params            Data object.
   * @param   {string}    params.id         The user id.
   * @param   {string}    params.provider   Multifactor provider.
   * @param   {Function}  [cb]              Callback function
   * @returns  {Promise|undefined}
   * @deprecated The function name has a typo.
   * We're shipping this so it doesn't break compatibility.
   * Use {@link deleteUserMultifactor} instead.
   */
  deleteUserMultifcator(...args) {
    return this.users.deleteMultifactorProvider(...args);
  }

  /**
   * Unlink the given accounts.
   *
   * @example
   * var params = { id: USER_ID, provider: 'auht0', user_id: OTHER_USER_ID };
   *
   * management.unlinkUsers(params, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Users accounts unlinked.
   * });
   * @param   {object}    params            Linked users data.
   * @param   {string}    params.id         Primary user ID.
   * @param   {string}    params.provider   Identity provider in use.
   * @param   {string}    params.user_id    Secondary user ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns {Promise|undefined}
   */
  unlinkUsers(...args) {
    return this.users.unlink(...args);
  }

  /**
   * Link the user with another account.
   *
   * @example
   * var userId = 'USER_ID';
   * var params = {
   *   user_id: 'OTHER_USER_ID',
   *   connection_id: 'CONNECTION_ID'
   * };
   *
   * management.linkUsers(userId, params, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Users linked.
   * });
   * @param   {string}    userId                ID of the primary user.
   * @param   {object}    params                Secondary user data.
   * @param   {string}    params.user_id        ID of the user to be linked.
   * @param   {string}    params.connection_id  ID of the connection to be used.
   * @param   {string}    params.provider       Identity provider of the secondary user account being linked.
   * @param   {string}    params.link_with      JWT for the secondary account being linked. If sending this parameter, provider, user_id, and connection_id must not be sent.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  linkUsers(...args) {
    return this.users.link(...args);
  }

  /**
   * Get user's log events.
   *
   * @example
   * var params = { id: USER_ID, page: 0, per_page: 50, sort: 'date:-1', include_totals: true };
   *
   * management.getUserLogs(params, function (err, logs) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(logs);
   * });
   * @param   {object}    params                Get logs data.
   * @param   {string}    params.id             User id.
   * @param   {number}    params.per_page       Number of results per page.
   * @param   {number}    params.page           Page number, zero indexed.
   * @param   {string}    params.sort           The field to use for sorting. Use field:order where order is 1 for ascending and -1 for descending. For example date:-1.
   * @param   {boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
   * @param   {Function}  [cb]                  Callback function.
   * @returns {Promise|undefined}
   */
  getUserLogs(...args) {
    return this.users.logs(...args);
  }

  /**
   * Get user's roles
   *
   * @example
   * var params = { id: USER_ID, page: 0, per_page: 50, sort: 'date:-1', include_totals: true };
   *
   * management.getUserRoles(params, function (err, logs) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(logs);
   * });
   * @param   {object}    params                Get roles data.
   * @param   {string}    params.id             User id.
   * @param   {number}    params.per_page       Number of results per page.
   * @param   {number}    params.page           Page number, zero indexed.
   * @param   {string}    params.sort           The field to use for sorting. Use field:order where order is 1 for ascending and -1 for descending. For example date:-1.
   * @param   {boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
   * @param   {Function}  [cb]                  Callback function.
   * @returns {Promise|undefined}
   */
  getUserRoles(...args) {
    return this.users.getRoles(...args);
  }

  /**
   * Assign roles to a user
   *
   * @example
   * var parms =  { id : 'USER_ID'};
   * var data = { "roles" :["role1"]};
   *
   * management.assignRolestoUser(params, data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User assigned roles.
   * });
   * @param   {object}    params       params object
   * @param   {string}    params.id    user_id
   * @param   {object}    data         data object containing list of role IDs
   * @param   {string}    data.roles  Array of role IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  assignRolestoUser(...args) {
    return this.users.assignRoles(...args);
  }

  /**
   * Assign users to a role
   *
   * @example
   * var params =  { id :'ROLE_ID'};
   * var data = { "users" : ["userId1","userId2"]};
   *
   * management.roles.assignUsers(params, data, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // permissions added.
   * });
   * @param   {string}    params.id                                     ID of the Role.
   * @param   {object}    data                                          permissions data
   * @param   {string}    data.permissions                              Array of permissions
   * @param   {string}    data.permissions.permission_name              Name of a permission
   * @param   {string}    data.permissions.resource_server_identifier   Identifier for a resource
   * @param   {Function}  [cb]                                          Callback function.
   * @returns  {Promise|undefined}
   */
  assignUsersToRole(...args) {
    return this.roles.assignUsers(...args);
  }

  /**
   * Remove roles from a user
   *
   * @example
   * var parms =  { id : 'USER_ID'};
   * var data = { "roles" :["role1"]};
   *
   * management.removeRolesFromUser(params, data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User assigned roles.
   * });
   * @param   {object}    params       params object
   * @param   {string}    params.id    user_id
   * @param   {string}    data         data object containing list of role IDs
   * @param   {string}    data.roles  Array of role IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  removeRolesFromUser(...args) {
    return this.users.removeRoles(...args);
  }

  /**
   * Get user's permissions
   *
   * @example
   * var params = { id: USER_ID, page: 0, per_page: 50, sort: 'date:-1', include_totals: true };
   *
   * management.getUserPermissions(params, function (err, logs) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(logs);
   * });
   * @param   {object}    params                Get permissions data.
   * @param   {string}    params.id             User id.
   * @param   {number}    params.per_page       Number of results per page.
   * @param   {number}    params.page           Page number, zero indexed.
   * @param   {string}    params.sort           The field to use for sorting. Use field:order where order is 1 for ascending and -1 for descending. For example date:-1.
   * @param   {boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
   * @param   {Function}  [cb]                  Callback function.
   * @returns {Promise|undefined}
   */
  getUserPermissions(...args) {
    return this.users.getPermissions(...args);
  }

  /**
   * Assign permissions to a user
   *
   * @example
   * var parms =  { id : 'USER_ID'};
   * var data = { "permissions" : [{"permission_name" :"do:something" ,"resource_server_identifier" :"test123" }]};
   *
   * management.assignPermissionsToUser(params, data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User assigned permissions.
   * });
   * @param   {object}    params       params object
   * @param   {string}    params.id    user_id
   * @param   {string}    data         data object containing list of permissions
   * @param   {string}    data.permissions  Array of permission IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  assignPermissionsToUser(...args) {
    return this.users.assignPermissions(...args);
  }

  /**
   * Remove permissions from a user
   *
   * @example
   * var parms =  { id : 'USER_ID'};
   * var data = { "permissions" : [{"permission_name" :"do:something" ,"resource_server_identifier" :"test123" }]};
   *
   * management.removePermissionsFromUser(params, data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User assigned permissions.
   * });
   * @param   {object}    params       params object
   * @param   {string}    params.id    user_id
   * @param   {string}    data         data object containing list of permission IDs
   * @param   {string}    data.permissions  Array of permission IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  removePermissionsFromUser(...args) {
    return this.users.removePermissions(...args);
  }

  /**
   * Get a list of a user's Guardian enrollments.
   *
   * @example
   * management.getGuardianEnrollments({ id: USER_ID }, function (err, enrollments) {
   *   console.log(enrollments);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianEnrollments(...args) {
    return this.users.getGuardianEnrollments(...args);
  }

  /**
   * Generate new Guardian recovery code.
   *
   * @example
   * management.regenerateRecoveryCode({ id: USER_ID }, function (err, newRecoveryCode) {
   *   console.log(newRecoveryCode);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  regenerateRecoveryCode(...args) {
    return this.users.regenerateRecoveryCode(...args);
  }

  /**
   * Invalidate all remembered browsers for MFA.
   *
   * @example
   * management.invalidateRememberBrowser({ id: USER_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Invalidated all remembered browsers.
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  invalidateRememberBrowser(...args) {
    return this.users.invalidateRememberBrowser(...args);
  }

  /**
   * Get user blocks by its id.
   *
   * @example
   * management.getUserBlocks({ id: USER_ID }, function (err, blocks) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(blocks);
   * });
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  getUserBlocks(...args) {
    return this.userBlocks.get(...args);
  }

  /**
   * Unblock an user by its id.
   *
   * @example
   * management.unblockUser({ id: USER_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User unblocked.
   * });
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  unblockUser(...args) {
    return this.userBlocks.delete(...args);
  }

  /**
   * Get user blocks by its identifier.
   *
   * @example
   * management.getUserBlocksByIdentifier({ identifier: USER_ID }, function (err, blocks) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(blocks);
   * });
   * @param   {object}    params              The user data object..
   * @param   {string}    params.identifier   The user identifier, any of: username, phone_number, email.
   * @param   {Function}  [cb]                Callback function
   * @returns  {Promise|undefined}
   */
  getUserBlocksByIdentifier(...args) {
    return this.userBlocks.getByIdentifier(...args);
  }

  /**
   * Unblock an user by its id.
   *
   * @example
   * management.unblockUserByIdentifier({ identifier: USER_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User unblocked.
   * });
   * @param   {object}    params              The user data object..
   * @param   {string}    params.identifier   The user identifier, any of: username, phone_number, email.
   * @param   {Function}  [cb]                Callback function
   * @returns  {Promise|undefined}
   */
  unblockUserByIdentifier(...args) {
    return this.userBlocks.deleteByIdentifier(...args);
  }

  /**
   * Get a single Guardian enrollment.
   *
   * @example
   * management.getGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollment) {
   *   console.log(enrollment);
   * });
   * @param   {object}    data      The Guardian enrollment data object.
   * @param   {string}    data.id   The Guardian enrollment id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianEnrollment(...args) {
    return this.guardian.getGuardianEnrollment(...args);
  }

  /**
   * Delete a user's Guardian enrollment.
   *
   * @example
   * management.deleteGuardianEnrollment({ id: ENROLLMENT_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Email provider deleted.
   * });
   * @param   {object}    data      The Guardian enrollment data object.
   * @param   {string}    data.id   The Guardian enrollment id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  deleteGuardianEnrollment(...args) {
    return this.guardian.deleteGuardianEnrollment(...args);
  }

  /**
   * Get all blacklisted tokens.
   *
   * @example
   * management.getBlacklistedTokens(function (err, tokens) {
   *   console.log(tokens.length);
   * });
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  getBlacklistedTokens(...args) {
    return this.blacklistedTokens.getAll(...args);
  }

  /**
   * Blacklist a new token.
   *
   * @example
   * var token = {
   *  aud: 'aud',
   *  jti: 'jti'
   * };
   *
   * management.blacklistToken(token, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Token blacklisted.
   * });
   * @param   {object}    token      Token data.
   * @param   {string}    token.aud  Audience (your app client ID).
   * @param   {string}    token.jti  The JWT ID claim.
   * @param   {Function}  [cb]       Callback function.
   * @returns  {Promise|undefined}
   */
  blacklistToken(...args) {
    return this.blacklistedTokens.add(...args);
  }

  /**
   *  Create a new Email Template.
   *
   * @example
   * management.createEmailTemplate(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   // Email Template created.
   * });
   * @param   {object}    data     Email Template data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createEmailTemplate(...args) {
    return this.emailTemplates.create(...args);
  }

  /**
   * Get an Auth0 Email Template.
   *
   * @example
   * management.getEmailTemplate({ name: EMAIL_TEMPLATE_NAME }, function (err, emailTemplate) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(emailTemplate);
   * });
   * @param   {object}    params          Email Template parameters.
   * @param   {string}    params.name     Template Name
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  getEmailTemplate(...args) {
    return this.emailTemplates.get(...args);
  }

  /**
   * Update an existing Email Template.
   *
   * @example
   * var data = { from: 'new@email.com' };
   * var params = { name: EMAIL_TEMPLATE_NAME };
   *
   * management.updateEmailTemplates(params, data, function (err, emailTemplate) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(emailTemplate.from);  // 'new@email.com'
   * });
   * @param   {object}    params          Email Template parameters.
   * @param   {string}    params.name     Template Name
   * @param   {object}    data            Updated Email Template data.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  updateEmailTemplate(...args) {
    return this.emailTemplates.update(...args);
  }

  /**
   * Get the email provider.
   *
   * @example
   * management.getEmailProvider(function (err, provider) {
   *   console.log(provider.length);
   * });
   * @param   {Function}  [cb]    Callback function.
   * @param   {object}    [params]          Clients parameters.
   * @param   {number}    [params.fields] A comma separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve: name, enabled, settings fields.
   * @param   {number}    [params.include_fields]  true if the fields specified are to be excluded from the result, false otherwise (defaults to true)
   * @returns  {Promise|undefined}
   */
  getEmailProvider(...args) {
    return this.emailProvider.get(...args);
  }

  /**
   * Configure the email provider.
   *
   * @example
   * management.configureEmailProvider(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Email provider configured.
   * });
   * @param   {object}    data     The email provider data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  configureEmailProvider(...args) {
    return this.emailProvider.configure(...args);
  }

  /**
   * Delete email provider.
   *
   * @example
   * management.deleteEmailProvider(function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Email provider deleted.
   * });
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  deleteEmailProvider(...args) {
    return this.emailProvider.delete(...args);
  }

  /**
   * Update the email provider.
   *
   * @example
   * management.updateEmailProvider(params, data, function (err, provider) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Updated email provider.
   *   console.log(provider);
   * });
   * @param   {object}    params            Email provider parameters.
   * @param   {object}    data              Updated email provider data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateEmailProvider(...args) {
    return this.emailProvider.update(...args);
  }

  /**
   * Get a the active users count.
   *
   * @example
   * management.getActiveUsersCount(function (err, usersCount) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(usersCount);
   * });
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise|undefined}
   */
  getActiveUsersCount(...args) {
    return this.stats.getActiveUsersCount(...args);
  }

  /**
   * Get the daily stats.
   *
   * @example
   * var params = {
   *   from: '{YYYYMMDD}',  // First day included in the stats.
   *   to: '{YYYYMMDD}'  // Last day included in the stats.
   * };
   *
   * management.getDaily(params, function (err, stats) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(stats);
   * });
   * @param   {object}    params        Stats parameters.
   * @param   {string}    params.from   The first day in YYYYMMDD format.
   * @param   {string}    params.to     The last day in YYYYMMDD format.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getDailyStats(...args) {
    return this.stats.getDaily(...args);
  }

  /**
   * Get the tenant settings..
   *
   * @example
   * management.getSettings(function (err, settings) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(settings);
   * });
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise|undefined}
   */
  getTenantSettings(...args) {
    return this.tenant.getSettings(...args);
  }

  /**
   * Update the tenant settings.
   *
   * @example
   * management.updateTenantSettings(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    data  The new tenant settings.
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise|undefined}
   */
  updateTenantSettings(...args) {
    return this.tenant.updateSettings(...args);
  }

  /**
   * Get a job by its ID.
   *
   * @example
   * var params = {
   *   id: '{JOB_ID}'
   * };
   *
   * management.getJob(params, function (err, job) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Retrieved job.
   *   console.log(job);
   * });
   * @param   {object}    params        Job parameters.
   * @param   {string}    params.id     Job ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getJob(...args) {
    return this.jobs.get(...args);
  }

  /**
   * Given a path to a file and a connection id, create a new job that imports the
   * users contained in the file or JSON string and associate them with the given
   * connection.
   *
   * @example
   * var params = {
   *   connection_id: '{CONNECTION_ID}',
   *   users: '{PATH_TO_USERS_FILE}' // or users_json: '{USERS_JSON_STRING}'
   * };
   *
   * management.importUsers(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    data                          Users import data.
   * @param   {string}    data.connection_id            connection_id of the connection to which users will be imported.
   * @param   {string}    [data.users]                  Path to the users data file. Either users or users_json is mandatory.
   * @param   {string}    [data.users_json]             JSON data for the users.
   * @param   {boolean}   [data.upsert]                 Whether to update users if they already exist (true) or to ignore them (false).
   * @param   {boolean}   [data.send_completion_email]  Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
   * @param   {Function}  [cb]                          Callback function.
   * @returns  {Promise|undefined}
   */
  importUsers(...args) {
    return this.jobs.importUsers(...args);
  }

  /**
   * Given a path to a file and a connection id, create a new job that imports the
   * users contained in the file or JSON string and associate them with the given
   * connection.
   *
   * @example
   * var params = {
   *   connection_id: '{CONNECTION_ID}',
   *   users: '{PATH_TO_USERS_FILE}' // or users_json: '{USERS_JSON_STRING}'
   * };
   *
   * management.importUsersJob(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    data                          Users import data.
   * @param   {string}    data.connection_id            connection_id of the connection to which users will be imported.
   * @param   {string}    [data.users]                  Path to the users data file. Either users or users_json is mandatory.
   * @param   {string}    [data.users_json]             JSON data for the users.
   * @param   {boolean}   [data.upsert]                 Whether to update users if they already exist (true) or to ignore them (false).
   * @param   {boolean}   [data.send_completion_email]  Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
   * @param   {Function}  [cb]                          Callback function.
   * @returns  {Promise|undefined}
   */
  importUsersJob(...args) {
    return this.jobs.importUsersJob(...args);
  }

  /**
   * Export all users to a file using a long running job.
   *
   * @example
   * var data = {
   *   connection_id: 'con_0000000000000001',
   *   format: 'csv',
   *   limit: 5,
   *   fields: [
   *     {
   *       "name": "user_id"
   *     },
   *     {
   *       "name": "name"
   *     },
   *     {
   *       "name": "email"
   *     },
   *     {
   *       "name": "identities[0].connection",
   *       "export_as": "provider"
   *     },
   *     {
   *       "name": "user_metadata.some_field"
   *     }
   *   ]
   * }
   *
   * management.exportUsers(data, function (err, results) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Retrieved job.
   *   console.log(results);
   * });
   * @param   {object}    data                  Users export data.
   * @param   {string}    [data.connection_id]  The connection id of the connection from which users will be exported
   * @param   {string}    [data.format]         The format of the file. Valid values are: "json" and "csv".
   * @param   {number}    [data.limit]          Limit the number of records.
   * @param   {object[]}  [data.fields]         A list of fields to be included in the CSV. If omitted, a set of predefined fields will be exported.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  exportUsers(...args) {
    return this.jobs.exportUsers(...args);
  }

  /**
   * Given a job ID, retrieve the failed/errored items
   *
   * @example
   * var params = {
   *   id: '{JOB_ID}'
   * };
   *
   * management.jobs.errors(params, function (err, job) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Retrieved job.
   *   console.log(job);
   * });
   * @param   {object}    params        Job parameters.
   * @param   {string}    params.id     Job ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getJobErrors(...args) {
    return this.jobs.errors(...args);
  }

  /**
   * Send a verification email to a user.
   *
   * @example
   * var params = {
   * 	user_id: '{USER_ID}'
   * };
   *
   * management.sendEmailVerification(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    data          User data object.
   * @param   {string}    data.user_id  ID of the user to be verified.
   * @param   {string}    [data.organization_id] Organization ID
   * @param   {string}    [data.client_id] client_id of the client (application). If no value provided, the global Client ID will be used.
   * @param   {object}    [data.identity] Used to verify secondary, federated, and passwordless-email identities.
   * @param   {string}    data.identity.user_id user_id of the identity.
   * @param   {string}    data.identity.provider provider of the identity.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  sendEmailVerification(...args) {
    return this.jobs.verifyEmail(...args);
  }

  /**
   * Create a new password change ticket.
   *
   * @example
   *
   * var params = {
   *   result_url: '{REDIRECT_URL}',  // Redirect after using the ticket.
   *   user_id: '{USER_ID}'
   * };
   *
   * // or
   *
   * var params = {
   *   result_url: '{REDIRECT_URL}',  // Redirect after using the ticket.
   *   email: '{USER_EMAIL}',
   *   connection_id: '{CONNECTION}' // eg. con_00000000001
   * };
   *
   * auth0.createPasswordChangeTicket(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise}
   */
  createPasswordChangeTicket(...args) {
    return this.tickets.changePassword(...args);
  }

  /**
   * Create an email verification ticket.
   *
   * @example
   * var data = {
   *   user_id: '{USER_ID}',
   *   result_url: '{REDIRECT_URL}' // Optional redirect after the ticket is used.
   * };
   *
   * auth0.createEmailVerificationTicket(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise}
   */
  createEmailVerificationTicket(...args) {
    return this.tickets.verifyEmail(...args);
  }

  /**
   * Get an Auth0 log.
   *
   * @example
   * management.getLog({ id: EVENT_ID }, function (err, log) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(log);
   * });
   * @param   {object}    params          Log parameters.
   * @param   {string}    params.id       Event ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  getLog(...args) {
    return this.logs.get(...args);
  }

  /**
   * Get all logs.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings and the search query. If pagination options are
   *   not present, the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 2
   * };
   *
   * management.getLogs(params, function (err, logs) {
   *   console.log(logs.length);
   * });
   * @param   {object}    [params]                Logs params.
   * @param   {string}    [params.q]              Search Criteria using Query String Syntax
   * @param   {number}    [params.page]           Page number. Zero based
   * @param   {number}    [params.per_page]       The amount of entries per page
   * @param   {string}    [params.sort]           The field to use for sorting.
   * @param   {string}    [params.fields]         A comma separated list of fields to include or exclude
   * @param   {boolean}   [params.include_fields] true if the fields specified are to be included in the result, false otherwise.
   * @param   {boolean}   [params.include_totals] true if a query summary must be included in the result, false otherwise. Default false
   * @param   {Function}  [cb]                    Callback function.
   * @returns  {Promise|undefined}
   */
  getLogs(...args) {
    return this.logs.getAll(...args);
  }

  /**
   * Get all Log Streams.
   *
   *
   *
   * management.getLogStreams( function (err, logStreams) {
   *   console.log(logStreams.length);
   * });
   *
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getLogStreams(...args) {
    return this.logStreams.getAll(...args);
  }

  /**
   * Create a new Log Stream.
   *
   * @example
   * management.createLogStream(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Log Stream created.
   * });
   * @param   {object}    data          Log Stream data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  createLogStream(...args) {
    return this.logStreams.create(...args);
  }

  /**
   * Get an Auth0 Log Stream.
   *
   * @example
   * management.getLogStream({ id: LOG_STREAM_ID }, function (err, logStream) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(logStream);
   * });
   * @param   {object}    params        Log Stream parameters.
   * @param   {string}    params.id     Log Stream ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getLogStream(...args) {
    return this.logStreams.get(...args);
  }

  /**
   * Delete an existing Log Stream.
   *
   * @example
   * management.deleteLogStream({ id: LOG_STREAM_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Log Stream deleted.
   * });
   * @param   {object}    params        Log Stream parameters.
   * @param   {string}    params.id     Log Stream ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  deleteLogStream(...args) {
    return this.logStreams.delete(...args);
  }

  /**
   * Update an existing Log Stream.
   *
   * @example
   * var params = { id: LOG_STREAM_ID };
   * var data = { name: 'my-log-stream'};
   * management.updateLogStream(params, data, function (err, logStream) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(logStream.name); // 'my-log-stream'.
   * });
   * @param   {object}    params        Rule parameters.
   * @param   {string}    params.id     Rule ID.
   * @param   {object}    data          Updated rule data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  updateLogStream(...args) {
    return this.logStreams.update(...args);
  }

  /**
   * Create a new resource server.
   *
   * @example
   * management.createResourceServer(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Resource Server created.
   * });
   * @param   {object}    data     Resource Server data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createResourceServer(...args) {
    return this.resourceServers.create(...args);
  }

  /**
   * Get all resource servers.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.getResourceServers(params, function (err, resourceServers) {
   *   console.log(resourceServers.length);
   * });
   * @param   {object}    [params]          Resource Servers parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getResourceServers(...args) {
    return this.resourceServers.getAll(...args);
  }

  /**
   * Get a Resource Server.
   *
   * @example
   * management.getResourceServer({ id: RESOURCE_SERVER_ID }, function (err, resourceServer) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(resourceServer);
   * });
   * @param   {object}    params          Resource Server parameters.
   * @param   {string}    params.id       Resource Server ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  getResourceServer(...args) {
    return this.resourceServers.get(...args);
  }

  /**
   * Delete an existing resource server.
   *
   * @example
   * management.deleteResourceServer({ id: RESOURCE_SERVER_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Resource Server deleted.
   * });
   * @param   {object}    params          Resource Server parameters.
   * @param   {string}    params.id       Resource Server ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  deleteResourceServer(...args) {
    return this.resourceServers.delete(...args);
  }

  /**
   * Update an existing resource server.
   *
   * @example
   * var data = { name: 'newResourceServerName' };
   * var params = { id: RESOURCE_SERVER_ID };
   *
   * management.updateResourceServer(params, data, function (err, resourceServer) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(resourceServer.name);  // 'newResourceServerName'
   * });
   * @param   {object}    params          Resource Server parameters.
   * @param   {string}    params.id       Resource Server ID.
   * @param   {object}    data            Updated Resource Server data.
   * @param   {Function}  [cb]            Callback function.
   * @returns    {Promise|undefined}
   */
  updateResourceServer(...args) {
    return this.resourceServers.update(...args);
  }

  /**
   * Set a new rules config.
   *
   * @example
   * var params = { key: RULE_CONFIG_KEY };
   * var data =   { value: RULES_CONFIG_VALUE };
   *
   * management.setRulesConfig(params, data, function (err, rulesConfig) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Rules Config set.
   * });
   * @param   {object}    params        Rule Config parameters.
   * @param   {string}    params.key    Rule Config key.
   * @param   {object}    data          Rule Config Data parameters.
   * @param   {string}    data.value    Rule Config Data value.
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  setRulesConfig(...args) {
    return this.rulesConfigs.set(...args);
  }

  /**
   * Get rules config.
   *
   * @param     {Function}  [cb]  Callback function.
   * @example
   *
   * management.getRulesConfigs(function (err, rulesConfigs) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Get Rules Configs.
   * });
   * @returns  {Promise|undefined}
   */
  getRulesConfigs(...args) {
    return this.rulesConfigs.getAll(...args);
  }

  /**
   * Delete rules config.
   *
   * @example
   *
   * management.deleteRulesConfig({ key: RULE_CONFIG_KEY }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Rules Config deleted.
   * });
   * @param   {object}    params        Rule Configs parameters.
   * @param   {string}    params.key    Rule Configs key.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  deleteRulesConfig(...args) {
    return this.rulesConfigs.delete(...args);
  }

  /**
   * Create an Auth0 Custom Domain.
   *
   * @example
   * management.createCustomDomain(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // CustomDomain created.
   * });
   * @param   {object}    data     The custom domain data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createCustomDomain(...args) {
    return this.customDomains.create(...args);
  }

  /**
   * Get all Auth0 CustomDomains.
   *
   * @example
   * management.getCustomDomains(function (err, customDomains) {
   *   console.log(customDomains.length);
   * });
   * @returns  {Promise|undefined}
   */
  getCustomDomains(...args) {
    return this.customDomains.getAll(...args);
  }

  /**
   * Get a Custom Domain.
   *
   * @example
   * management.getCustomDomain({ id: CUSTOM_DOMAIN_ID }, function (err, customDomain) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(customDomain);
   * });
   * @param   {object}    params            Custom Domain parameters.
   * @param   {string}    params.id         Custom Domain ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getCustomDomain(...args) {
    return this.customDomains.get(...args);
  }

  /**
   * Verify a Custom Domain.
   *
   * @example
   * management.verifyCustomDomain({ id: CUSTOM_DOMAIN_ID }, function (err, customDomain) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(customDomain);
   * });
   * @param   {object}    params            Custom Domain parameters.
   * @param   {string}    params.id         Custom Domain ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  verifyCustomDomain(...args) {
    return this.customDomains.verify(...args);
  }

  /**
   * Delete a Custom Domain.
   *
   * @example
   * management.deleteCustomDomain({ id: CUSTOM_DOMAIN_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // CustomDomain deleted.
   * });
   * @param   {object}    params            Custom Domain parameters.
   * @param   {string}    params.id         Custom Domain ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  deleteCustomDomain(...args) {
    return this.customDomains.delete(...args);
  }

  /**
   * Create a Guardian enrollment ticket.
   *
   * @example
   * management.createGuardianEnrollmentTicket(function (err, ticket) {
   *   console.log(ticket);
   * });
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  createGuardianEnrollmentTicket(...args) {
    return this.guardian.createEnrollmentTicket(...args);
  }

  /**
   * Get a list of Guardian factors and statuses.
   *
   * @example
   * management.getGuardianFactors(function (err, factors) {
   *   console.log(factors.length);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianFactors(...args) {
    return this.guardian.getFactors(...args);
  }

  /**
   * Get the settings of a Guardian factor.
   *
   * @example
   * management.getGuardianFactorSettings({ name: 'duo' }, function (err, settings) {
   *   console.log(settings);
   * });
   * @param   {object}    params            Factor parameters.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianFactorSettings(...args) {
    return this.guardian.getFactorSettings(...args);
  }

  /**
   * Get Guardian factor provider configuration
   *
   * @example
   * management.getFactorProvider({ name: 'sms', provider: 'twilio'}, function (err, provider) {
   *   console.log(provider);
   * });
   * @param   {object}    params            Factor provider parameters.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianFactorProvider(...args) {
    return this.guardian.getFactorProvider(...args);
  }

  /**
   * Update Guardian's factor provider
   *
   * @example
   * management.updateGuardianFactorProvider({ name: 'sms', provider: 'twilio' }, {
   *   messaging_service_sid: 'XXXXXXXXXXXXXX',
   *   auth_token: 'XXXXXXXXXXXXXX',
   *   sid: 'XXXXXXXXXXXXXX'
   * }, function (err, provider) {
   *   console.log(provider);
   * });
   * @param   {object}    params            Factor provider parameters.
   * @param   {object}    data              Updated Factor provider data.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  updateGuardianFactorProvider(...args) {
    return this.guardian.updateFactorProvider(...args);
  }

  /**
   * Update a Guardian's factor settings
   *
   * @example
   * management.updateGuardianFactorSettings(
   *  { name: 'webauthn-roaming' },
   *  { userVerification: 'discouraged', overrideRelyingParty: false },
   *  function (err, settings) {
   *   console.log(settings);
   * })
   * @param   {object}    params            Factor parameters.
   * @param   {object}    data              Updated Factor settings data.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  updateGuardianFactorSettings(...args) {
    return this.guardian.updateFactorSettings(...args);
  }

  /**
   * Get Guardian enrollment and verification factor templates
   *
   * @example
   * management.getGuardianFactorTemplates({ name: 'sms' }, function (err, templates) {
   *   console.log(templates);
   * });
   * @param   {object}    params            Factor parameters.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianFactorTemplates(...args) {
    return this.guardian.getFactorTemplates(...args);
  }

  /**
   * Update Guardian enrollment and verification factor templates
   *
   * @example
   * management.updateGuardianFactorTemplates({ name: 'sms' }, {
   *   enrollment_message: "{{code}} is your verification code for {{tenant.friendly_name}}. Please enter this code to verify your enrollment.",
   *   verification_message: "{{code}} is your verification code for {{tenant.friendly_name}}"
   * }, function (err, templates) {
   *   console.log(templates);
   * });
   * @param   {object}    params            Factor parameters.
   * @param   {object}    data              Updated factor templates data.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  updateGuardianFactorTemplates(...args) {
    return this.guardian.updateFactorTemplates(...args);
  }

  /**
   * Update Guardian Factor
   *
   * @example
   * management.updateGuardianFactor({ name: 'sms' }, {
   *   enabled: true
   * }, function (err, factor) {
   *   console.log(factor);
   * });
   * @param   {object}    params            Factor parameters.
   * @param   {object}    data              Updated factor data.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  updateGuardianFactor(...args) {
    return this.guardian.updateFactor(...args);
  }

  /**
   * Get enabled Guardian policies
   *
   * @example
   * management.getGuardianPolicies(function (err, policies) {
   *   console.log(policies);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianPolicies(...args) {
    return this.guardian.getPolicies(...args);
  }

  /**
   * Update enabled Guardian policies
   *
   * @example
   * management.updateGuardianPolicies({}, [
   *   'all-applications'
   * ], function (err, policies) {
   *   console.log(policies);
   * });
   * @param   {object}    params            Parameters.
   * @param   {string[]}  data              Policies to enable. Empty array disables all policies.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  updateGuardianPolicies(...args) {
    return this.guardian.updatePolicies(...args);
  }

  /**
   * Get the Guardian phone factor's selected provider
   *
   * @example
   * management.getGuardianPhoneFactorSelectedProvider(function (err, selectedProvider) {
   *   console.log(selectedProvider);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianPhoneFactorSelectedProvider(...args) {
    return this.guardian.getPhoneFactorSelectedProvider(...args);
  }

  /**
   * Update the Guardian phone factor's selected provider
   *
   * @example
   * management.updateGuardianPhoneFactorSelectedProvider({}, {
   *   provider: 'twilio'
   * }, function (err, factor) {
   *   console.log(factor);
   * });
   * @param   {object}    params            Parameters.
   * @param   {object}    data              Updated selected provider data.
   * @param   {string}    data.provider     Name of the selected provider
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  updateGuardianPhoneFactorSelectedProvider(...args) {
    return this.guardian.updatePhoneFactorSelectedProvider(...args);
  }

  /**
   * Get the Guardian phone factor's message types
   *
   * @example
   * management.getGuardianPhoneFactorMessageTypes(function (err, messageTypes) {
   *   console.log(messageTypes);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianPhoneFactorMessageTypes(...args) {
    return this.guardian.getPhoneFactorMessageTypes(...args);
  }

  /**
   * Update the Guardian phone factor's message types
   *
   * @example
   * management.updateGuardianPhoneFactorMessageTypes({}, {
   *   message_types: ['sms', 'voice']
   * }, function (err, factor) {
   *   console.log(factor);
   * });
   * @param   {object}    params                Parameters.
   * @param   {object}    data                  Updated selected provider data.
   * @param   {string[]}  data.message_types    Message types (only `"sms"` and `"voice"` are supported).
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  updateGuardianPhoneFactorMessageTypes(...args) {
    return this.guardian.updatePhoneFactorMessageTypes(...args);
  }

  /**
   * Get all roles.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.getRoles(params, function (err, roles) {
   *   console.log(roles.length);
   * });
   * @param   {object}    [params]          Roles parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getRoles(...args) {
    return this.roles.getAll(...args);
  }

  /**
   * Create a new role.
   *
   * @example
   * data = {"name": "test1","description": "123"}
   * management.createRole(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Role created.
   * });
   * @param   {object}    data     Role data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createRole(...args) {
    return this.roles.create(...args);
  }

  /**
   * Get an Auth0 role.
   *
   * @example
   * management.getRole({ id: ROLE_ID }, function (err, role) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(role);
   * });
   * @param   {object}    params        Role parameters.
   * @param   {string}    params.id     Role ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getRole(...args) {
    return this.roles.get(...args);
  }

  /**
   * Delete an existing role.
   *
   * @example
   * management.deleteRole({ id: ROLE_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Role deleted.
   * });
   * @param   {object}    params        Role parameters.
   * @param   {string}    params.id     Role ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  deleteRole(...args) {
    return this.roles.delete(...args);
  }

  /**
   * Update an existing role.
   *
   * @example
   * var params = { id: ROLE_ID };
   * var data = { name: 'my-role'};
   * management.updateRole(params, data, function (err, role) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(role.name); // 'my-role'.
   * });
   * @param   {object}    params        Role parameters.
   * @param   {string}    params.id     Role ID.
   * @param   {object}    data          Updated role data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  updateRole(...args) {
    return this.roles.update(...args);
  }

  /**
   * Get permissions for a given role
   *
   * @example
   * var params =  { id :'ROLE_ID'};
   * @example <caption>
   *   This method takes a roleId and
   *   returns all permissions within that role
   *
   * </caption>
   *
   * management.getPermissionsInRole(params, function (err, permissions) {
   *   console.log(permissions);
   * });
   * @param   {string}    [roleId]           Id of the role
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getPermissionsInRole(...args) {
    return this.roles.getPermissions(...args);
  }

  /**
   * Add permissions in a role
   *
   * @example
   * var params = { id :'ROLE_ID'};
   * var data = { "permissions" : [{"permission_name" :"do:something" ,"resource_server_identifier" :"test123" }]};
   *
   * management.addPermissionsInRole(params, data, function (err, permissions) {
   *   console.log(permissions);
   * });
   * @param   {string}    params.id                ID of the Role.
   * @param   {object}    data                permissions data
   * @param   {string}    data.permissions    Array of permissions
   * @param   {string}    data.permissions.permission_name  Name of a permission
   * @param   {string}    data.permissions.resource_server_identifier  Identifier for a resource
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  addPermissionsInRole(...args) {
    return this.roles.addPermissions(...args);
  }

  /**
   * Remove permissions from a role
   *
   * @example
   * var params = { id :'ROLE_ID'};
   * var data = { "permissions" : [{"permission_name" :"do:something" ,"resource_server_identifier" :"test123" }]};
   *
   * management.removePermissionsFromRole(params, data, function (err, permissions) {
   *   console.log(permissions);
   * });
   * @param   {string}    params.id                ID of the Role.
   * @param   {object}    data                permissions data
   * @param   {string}    data.permissions    Array of permissions
   * @param   {string}    data.permissions.permission_name  Name of a permission
   * @param   {string}    data.permissions.resource_server_identifier  Identifier for a resource
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  removePermissionsFromRole(...args) {
    return this.roles.removePermissions(...args);
  }

  /**
   * Get users in a given role
   *
   * @example
   * var params = {
   *   id: 'ROLE_ID',
   *   per_page: 50,
   *   page: 0
   * };
   * @example <caption>
   *   This method takes a roleId and returns all users within that role. Supports offset (page, per_page) and checkpoint pagination (from, take). You must use checkpoint pagination to retrieve beyond the first 1000 records.
   * </caption>
   *
   * management.getUsersInRole(params, function (err, users) {
   *   console.log(users);
   * });
   * @param   {string}    [id]              Id of the role
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {string}    [params.from]     Optional id from which to start selection.
   * @param   {number}    [params.take]     The total amount of entries to retrieve when using the from parameter. Defaults to 50.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getUsersInRole(...args) {
    return this.roles.getUsers(...args);
  }

  /**
   * Get all hooks.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.getHooks(params, function (err, hooks) {
   *   console.log(hooks.length);
   * });
   * @param   {object}    [params]          Hooks parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getHooks(...args) {
    return this.hooks.getAll(...args);
  }

  /**
   * Get an Auth0 hook.
   *
   * @example
   * management.getHook({ id: HOOK_ID }, function (err, hook) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(hook);
   * });
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getHook(...args) {
    return this.hooks.get(...args);
  }

  /**
   * Create a new hook.
   *
   * @example
   * management.createHook(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Hook created.
   * });
   * @param   {object}    data     Hook data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createHook(...args) {
    return this.hooks.create(...args);
  }

  /**
   * Update an existing hook.
   *
   * @example
   * var params = { id: HOOK_ID };
   * var data = { name: 'my-hook'};
   * management.updateHook(params, data, function (err, hook) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(hook.name); // 'my-hook'.
   * });
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {object}    data          Updated hook data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  updateHook(...args) {
    return this.hooks.update(...args);
  }

  /**
   * Delete an existing hook.
   *
   * @example
   * auth0.deleteHook({ id: HOOK_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Hook deleted.
   * });
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  deleteHook(...args) {
    return this.hooks.delete(...args);
  }

  /**
   * Get an Auth0 hook's secrets.
   *
   * @example
   * var params = { id: HOOK_ID }
   * management.getHookSecrets(params, function (err, secrets) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(secrets);
   * });
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getHookSecrets(...args) {
    return this.hooks.getSecrets(...args);
  }

  /**
   * Add hook screts.
   *
   * @example
   * var params = { id: 'HOOK_ID' }
   * var data = { DB_PASSWORD: 'password1', API_TOKEN: 'secret' }
   * management.addHookScrets(params, data, function (err, secrets) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Hook secrets created.
   * });
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {object}    data          Secrets key/value pairs
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  addHookSecrets(...args) {
    return this.hooks.addSecrets(...args);
  }

  /**
   * Update an existing hook.
   *
   * @example
   * var params = { id: HOOK_ID };
   * var data = { API_TOKEN: 'updated-secret'};
   * management.updateHookSecrets(params, data, function (err, secrets) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(secrets)
   * });
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {object}    data          Secrets key/value pairs
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  updateHookSecrets(...args) {
    return this.hooks.updateSecrets(...args);
  }

  /**
   * Delete an existing hook.
   *
   * @example
   * var params = { id: HOOK_ID }
   * var data = ['API_TOKEN', 'DB_PASSWORD']
   * auth0.removeHookSecrets(params, data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Hook deleted.
   * });
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {object}    data          Secrets key/value pairs
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  removeHookSecrets(...args) {
    return this.hooks.removeSecrets(...args);
  }

  /**
   * Returns the access_token.
   *
   * @returns {Promise}   Promise returning an access_token.
   */
  getAccessToken(...args) {
    return this.tokenProvider.getAccessToken(...args);
  }

  /**
   * Update the branding settings.
   *
   * @example
   * management.updateBrandingSettings(data, function (err, branding) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   * // Updated branding
   *    console.log(branding);
   * });
   * @param   {object}    params            Branding parameters.
   * @param   {object}    data              Updated branding data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateBrandingSettings(...args) {
    return this.branding.updateSettings(...args);
  }

  /**
   * Get the branding settings..
   *
   * @example
   * management.getBrandingSettings(data, function (err, branding) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   * // Branding
   *    console.log(branding);
   * });
   * @param   {object}    params            Branding parameters.
   * @param   {object}    data              Branding data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getBrandingSettings(...args) {
    return this.branding.getSettings(...args);
  }

  /**
   * Get the new universal login template.
   *
   * @example
   * management.getBrandingUniversalLoginTemplate(data, function (err, template) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   * // Branding
   *    console.log(template);
   * });
   * @param   {object}    params            Branding parameters (leave empty).
   * @param   {object}    data              Branding data (leave empty).
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getBrandingUniversalLoginTemplate(...args) {
    return this.branding.getUniversalLoginTemplate(...args);
  }

  /**
   * Set the new universal login template.
   *
   * @example
   * management.setBrandingUniversalLoginTemplate({}, { template: "a template" }, function (err, template) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params            Branding parameters (leave empty).
   * @param   {object}    template          Branding data (object with template field).
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  setBrandingUniversalLoginTemplate(...args) {
    return this.branding.setUniversalLoginTemplate(...args);
  }

  /**
   * Delete the new universal login template.
   *
   * @example
   * management.deleteBrandingUniversalLoginTemplate(template, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params            Branding parameters (leave empty).
   * @param   {object}    data              Branding data (leave empty).
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  deleteBrandingUniversalLoginTemplate(...args) {
    return this.branding.deleteUniversalLoginTemplate(...args);
  }

  /**
   * Update the tenant migrations.
   *
   * @example
   * data = { flags: { migration: true } };
   * management.updateMigrations(data, function (err, migrations) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   * // Updated migrations flags
   *    console.log(migrations.flags);
   * });
   * @param   {object}    data              Updated migrations data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateMigrations(...args) {
    return this.migrations.updateMigrations(...args);
  }

  /**
   * Get migrations flags
   *
   * @example
   * management.getMigrations(function (err, migrations) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   * // Migration flags
   *    console.log(migrations.flags);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getMigrations(...args) {
    return this.migrations.getMigrations(...args);
  }

  /**
   * Get prompts settings..
   *
   * @example
   * management.getPromptsSettings(function (err, settings) {
   * console.log(settings);
   * });
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise|undefined}
   */
  getPromptsSettings(...args) {
    return this.prompts.getSettings(...args);
  }

  /**
   * Update prompts settings.
   *
   * @example
   * management.updatePromptsSettings(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    data  The new prompts settings.
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise|undefined}
   */
  updatePromptsSettings(...args) {
    return this.prompts.updateSettings(...args);
  }
  /**
   * Retrieve custom text for a specific prompt and language.
   *
   * @example
   * var params = { prompt: PROMPT_NAME, language: LANGUAGE };
   *
   * management.prompts.getCustomTextByLanguage(params, function (err, customText) {
   *  console.log('CustomText', customText);
   * });
   * @param   {object}    params            Data object.
   * @param   {string}    params.prompt     Name of the prompt.
   * @param   {string}    params.language   Language to retrieve.
   * @param   {Function}  [cb]              Callback function
   * @returns  {Promise|undefined}
   */
  getCustomTextByLanguage(...args) {
    return this.prompts.getCustomTextByLanguage(...args);
  }

  /**
   * Set custom text for a specific prompt.
   *
   * @example
   * var params = { prompt: PROMPT_NAME, language: LANGUAGE, body: BODY_OBJECT };
   *
   * management.prompts.updateCustomTextByLanguage(params, function (err, customText) {
   * console.log('CustomText', customText);
   * });
   * @param   {object}    params            Data object.
   * @param   {string}    params.prompt     Name of the prompt.
   * @param   {string}    params.language   Language to retrieve.
   * @param   {object}    params.body       An object containing custom dictionaries for a group of screens.
   * @param   {Function}  [cb]              Callback function
   * @returns  {Promise|undefined}
   */
  updateCustomTextByLanguage(...args) {
    return this.prompts.updateCustomTextByLanguage(...args);
  }
}

module.exports = ManagementClient;
