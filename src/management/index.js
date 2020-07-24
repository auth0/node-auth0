/** @module management */

var util = require('util');
var utils = require('../utils');
var jsonToBase64 = utils.jsonToBase64;
var generateClientInfo = utils.generateClientInfo;
var ArgumentError = require('rest-facade').ArgumentError;
var assign = Object.assign || require('object.assign');

// Managers.
var ClientsManager = require('./ClientsManager');
var ClientGrantsManager = require('./ClientGrantsManager');
var GrantsManager = require('./GrantsManager');
var UsersManager = require('./UsersManager');
var UserBlocksManager = require('./UserBlocksManager');
var ConnectionsManager = require('./ConnectionsManager');
var BlacklistedTokensManager = require('./BlacklistedTokensManager');
var RulesManager = require('./RulesManager');
var DeviceCredentialsManager = require('./DeviceCredentialsManager');
var EmailProviderManager = require('./EmailProviderManager');
var StatsManager = require('./StatsManager');
var TenantManager = require('./TenantManager');
var JobsManager = require('./JobsManager');
var TicketsManager = require('./TicketsManager');
var LogsManager = require('./LogsManager');
var LogStreamsManager = require('./LogStreamsManager');
var ResourceServersManager = require('./ResourceServersManager');
var ManagementTokenProvider = require('./ManagementTokenProvider');
var RulesConfigsManager = require('./RulesConfigsManager');
var EmailTemplatesManager = require('./EmailTemplatesManager');
var GuardianManager = require('./GuardianManager');
var CustomDomainsManager = require('./CustomDomainsManager');
var RolesManager = require('./RolesManager');
var HooksManager = require('./HooksManager');
var BrandingManager = require('./BrandingManager');
var MigrationsManager = require('./MigrationsManager');

var BASE_URL_FORMAT = 'https://%s/api/v2';
var MANAGEMENT_API_AUD_FORMAT = 'https://%s/api/v2/';

/**
 * @class ManagementClient
 * Management API SDK.
 *
 * The Auth0 Management API is meant to be used by back-end servers or trusted
 * parties performing administrative tasks. Generally speaking, anything that
 * can be done through the Auth0 dashboard (and more) can also be done through
 * this API.
 * @constructor
 * @memberOf module:management
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
 *
 *
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
 *
 * @param   {Object}  options                                   Options for the ManagementClient SDK.
 *          If a token is provided only the domain is required, other parameters are ignored.
 *          If no token is provided domain, clientId, clientSecret and scopes are required
 * @param   {String}  options.domain                              ManagementClient server domain.
 * @param   {String}  [options.token]                             API access token.
 * @param   {String}  [options.clientId]                          Management API Non Interactive Client Id.
 * @param   {String}  [options.clientSecret]                      Management API Non Interactive Client Secret.
 * @param   {String}  [options.audience]                          Management API Audience. By default is your domain's, e.g. the domain is `tenant.auth0.com` and the audience is `http://tenant.auth0.com/api/v2/`
 * @param   {String}  [options.scope]                             Management API Scopes.
 * @param   {Boolean} [options.tokenProvider.enableCache=true]    Enabled or Disable Cache.
 * @param   {Number}  [options.tokenProvider.cacheTTLInSeconds]   By default the `expires_in` value will be used to determine the cached time of the token, this can be overridden.
 * @param   {Boolean} [options.retry.enabled=true]                Enabled or Disable Retry Policy functionality.
 * @param   {Number}  [options.retry.maxRetries=10]               Retry failed requests X times.
 * @param   {Object}  [options.headers]                           Additional headers that will be added to the outgoing requests.
 *
 */
var ManagementClient = function(options) {
  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Management API SDK options must be an object');
  }

  if (!options.domain || options.domain.length === 0) {
    throw new ArgumentError('Must provide a domain');
  }

  var baseUrl = util.format(BASE_URL_FORMAT, options.domain);
  var userAgent = options.userAgent || 'node.js/' + process.version.replace('v', '');

  var defaultHeaders = {
    'User-agent': 'node.js/' + process.version.replace('v', ''),
    'Content-Type': 'application/json'
  };

  var managerOptions = {
    headers: assign(defaultHeaders, options.headers || {}),
    baseUrl: baseUrl
  };

  if (options.token === undefined) {
    var config = assign(
      { audience: util.format(MANAGEMENT_API_AUD_FORMAT, options.domain) },
      options
    );

    if (options.tokenProvider) {
      config.enableCache = options.tokenProvider.enableCache;
      config.cacheTTLInSeconds = options.tokenProvider.cacheTTLInSeconds;
      delete config.tokenProvider;
    }

    this.tokenProvider = new ManagementTokenProvider(config);
    managerOptions.tokenProvider = this.tokenProvider;
  } else if (typeof options.token !== 'string' || options.token.length === 0) {
    throw new ArgumentError('Must provide a token');
  } else {
    this.tokenProvider = {
      getAccessToken: function() {
        return Promise.resolve(options.token);
      }
    };
    managerOptions.headers['Authorization'] = 'Bearer ' + options.token;
  }

  if (options.telemetry !== false) {
    var clientInfo = options.clientInfo || generateClientInfo();
    if ('string' === typeof clientInfo.name && clientInfo.name.length > 0) {
      var telemetry = jsonToBase64(clientInfo);
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
   * @type {BlacklistedtokensManager}
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
   * @type {HooksManager}
   */
  this.branding = new BrandingManager(managerOptions);

  /**
   * ManagementClient migrations manager.
   *
   * @type {MigrationsManager}
   */
  this.migrations = new MigrationsManager(managerOptions);
};

/**
 * Get all connections.
 *
 * @method    getConnections
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    [params]          Connections params.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getConnections', 'connections.getAll');

/**
 * Create a new connection.
 *
 * @method    createConnection
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createConnection(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Connection created.
 * });
 *
 * @param   {Object}    data     Connection data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createConnection', 'connections.create');

/**
 * Get an Auth0 connection.
 *
 * @method    getConnection
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getConnection({ id: CONNECTION_ID }, function (err, connection) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(connection);
 * });
 *
 * @param   {Object}    params          Connection parameters.
 * @param   {String}    params.id       Connection ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getConnection', 'connections.get');

/**
 * Delete an existing connection.
 *
 * @method    deleteConnection
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteConnection({ id: CONNECTION_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Connection deleted.
 * });
 *
 * @param   {Object}    params          Connection parameters.
 * @param   {String}    params.id       Connection ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteConnection', 'connections.delete');

/**
 * Update an existing connection.
 *
 * @method    updateConnection
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Connection parameters.
 * @param   {String}    params.id     Connection ID.
 * @param   {Object}    data          Updated connection data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateConnection', 'connections.update');

/**
 * Get all Auth0 clients.
 *
 * @method    getClients
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    [params]          Clients parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getClients', 'clients.getAll');

/**
 * Get an Auth0 client.
 *
 * @method    getClient
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getClient({ client_id: CLIENT_ID }, function (err, client) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(client);
 * });
 *
 * @param   {Object}    params            Client parameters.
 * @param   {String}    params.client_id  Application client ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getClient', 'clients.get');

/**
 * Create an Auth0 client.
 *
 * @method    createClient
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createClient(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client created.
 * });
 *
 * @param   {Object}    data     The client data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createClient', 'clients.create');

/**
 * Update an Auth0 client.
 *
 * @method    updateClient
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params            Client parameters.
 * @param   {String}    params.client_id  Application client ID.
 * @param   {Object}    data              Updated client data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateClient', 'clients.update');

/**
 * Delete an Auth0 client.
 *
 * @method    deleteClient
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteClient({ client_id: CLIENT_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client deleted.
 * });
 *
 * @param   {Object}    params            Client parameters.
 * @param   {String}    params.client_id  Application client ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteClient', 'clients.delete');

/**
 * Get all Auth0 Client Grants.
 *
 * @method    getClientGrants
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    [params]          Client Grants parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getClientGrants', 'clientGrants.getAll');

/**
 * Create an Auth0 client grant.
 *
 * @method    createClientGrant
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.clientGrants.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client grant created.
 * });
 *
 * @param   {Object}    data     The client data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createClientGrant', 'clientGrants.create');

/**
 * Update an Auth0 client grant.
 *
 * @method    updateClientGrant
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params     Client parameters.
 * @param   {String}    params.id  Client grant ID.
 * @param   {Object}    data       Updated client data.
 * @param   {Function}  [cb]       Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateClientGrant', 'clientGrants.update');

/**
 * Delete an Auth0 client grant.
 *
 * @method    deleteClientGrant
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.clientGrants.delete({ id: GRANT_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Grant deleted.
 * });
 *
 * @param   {Object}    params     Client parameters.
 * @param   {String}    params.id  Client grant ID.
 * @param   {Function}  [cb]       Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteClientGrant', 'clientGrants.delete');

/**
 * Get all Auth0 Grants.
 *
 * @method    getGrants
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params                Grants parameters.
 * @param   {Number}    params.per_page       Number of results per page.
 * @param   {Number}    params.page           Page number, zero indexed.
 * @param   {Boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
 * @param   {String}    params.user_id        The user_id of the grants to retrieve.
 * @param   {String}    params.client_id      The client_id of the grants to retrieve.
 * @param   {String}    params.audience       The audience of the grants to retrieve.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getGrants', 'grants.getAll');

/**
 * Delete an Auth0 grant.
 *
 * @method    deleteGrant
 * @memberOf  module:management.GrantsManager.prototype
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
 *
 * @param   {Object}    params         Grant parameters.
 * @param   {String}    params.id      Grant ID.
 * @param   {String}    params.user_id The user_id of the grants to delete.
 * @param   {Function}  [cb]           Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteGrant', 'grants.delete');

/**
 * Create an Auth0 credential.
 *
 * @method    createDevicePublicKey
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createConnection(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Credential created.
 * });
 *
 * @param   {Object}    data     The device credential data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'createDevicePublicKey',
  'deviceCredentials.createPublicKey'
);

/**
 * Get all Auth0 credentials.
 *
 * @method    getDeviceCredentials
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * var params = {user_id: "USER_ID"};
 *
 * management.getDeviceCredentials(params, function (err, credentials) {
 *   console.log(credentials.length);
 * });
 *
 * @param   {Object}    params  Credential parameters.
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getDeviceCredentials', 'deviceCredentials.getAll');

/**
 * Delete an Auth0 device credential.
 *
 * @method    deleteDeviceCredential
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params          Credential parameters.
 * @param   {String}    params.id       Device credential ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteDeviceCredential', 'deviceCredentials.delete');

/**
 * Get all rules.
 *
 * @method    getRules
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    [params]          Rules parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getRules', 'rules.getAll');

/**
 * Create a new rule.
 *
 * @method    createRule
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createRule(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Rule created.
 * });
 *
 * @param   {Object}    data     Rule data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createRule', 'rules.create');

/**
 * Get an Auth0 rule.
 *
 * @method    getRule
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getRule({ id: RULE_ID }, function (err, rule) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(rule);
 * });
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getRule', 'rules.get');

/**
 * Delete an existing rule.
 *
 * @method    deleteRule
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * auth0.deleteRule({ id: RULE_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Rule deleted.
 * });
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteRule', 'rules.delete');

/**
 * Update an existing rule.
 *
 * @method    updateRule
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Object}    data          Updated rule data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateRule', 'rules.update');

/**
 * Get all users.
 *
 * @method    getUsers
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    [params]               Users params.
 * @param   {Number}    [params.search_engine] The version of the search engine to use.
 * @param   {String}    [params.q]             User Search string to filter which users are returned. Follows Lucene query string syntax as documented at https://auth0.com/docs/api/management/v2#!/Users/get_users.
 * @param   {Number}    [params.per_page]      Number of results per page.
 * @param   {Number}    [params.page]          Page number, zero indexed.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUsers', 'users.getAll');

/**
 * Get users for a given email address
 *
 * @method    getUsersByEmail
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example <caption>
 *   This method takes an email address as the first argument,
 *   and returns all users with that email address
 * </caption>
 *
 * auth0.getUsersByEmail(email, function (err, users) {
 *   console.log(users);
 * });
 *
 * @param   {String}    [email]           Email Address of users to locate
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUsersByEmail', 'users.getByEmail');

/**
 * Get a user by its id.
 *
 * @method    getUser
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getUser({ id: USER_ID }, function (err, user) {
 *   console.log(user);
 * });
 *
 * @param   {Object}    data      The user data object.
 * @param   {String}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUser', 'users.get');

/**
 * Delete all users.
 *
 * @method    deleteAllUsers
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteAllUsers(function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Users deleted
 * });
 *
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 *
 * @deprecated This method will be removed in the next major release.
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteAllUsers', 'users.deleteAll');

/**
 * Delete a user by its id.
 *
 * @method    deleteUser
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteUser({ id: USER_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // User deleted.
 * });
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteUser', 'users.delete');

/**
 * Create a new user.
 *
 * @method    createUser
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createUser(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // User created.
 * });
 *
 * @param   {Object}    data    User data.
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createUser', 'users.create');

/**
 * Update a user by its id.
 *
 * @method    updateUser
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params      The user parameters.
 * @param   {String}    params.id   The user id.
 * @param   {Object}    data        New user data.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateUser', 'users.update');

/**
 * Update the user metadata for a user.
 *
 * @method    updateUserMetadata
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Object}    metadata    New user metadata.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateUserMetadata', 'users.updateUserMetadata');

/**
 * Update the app metadata for a user.
 *
 * @method    updateAppMetadata
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Object}    metadata    New app metadata.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateAppMetadata', 'users.updateAppMetadata');

/**
 * Delete a multifactor provider for a user.
 *
 * @method    deleteUserMultifactor
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params            Data object.
 * @param   {String}    params.id         The user id.
 * @param   {String}    params.provider   Multifactor provider.
 * @param   {Function}  [cb]              Callback function
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'deleteUserMultifactor',
  'users.deleteMultifactorProvider'
);

/**
 * Delete a multifactor provider for a user.
 *
 * @method    deleteUserMultifcator
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params            Data object.
 * @param   {String}    params.id         The user id.
 * @param   {String}    params.provider   Multifactor provider.
 * @param   {Function}  [cb]              Callback function
 *
 * @return  {Promise|undefined}
 *
 * @deprecated The function name has a typo.
 * We're shipping this so it doesn't break compatibility.
 * Use {@link deleteUserMultifactor} instead.
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'deleteUserMultifcator',
  'users.deleteMultifactorProvider'
);

/**
 * Unlink the given accounts.
 *
 * @method    unlinkUsers
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params            Linked users data.
 * @param   {String}    params.id         Primary user ID.
 * @param   {String}    params.provider   Identity provider in use.
 * @param   {String}    params.user_id    Secondary user ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'unlinkUsers', 'users.unlink');

/**
 * Link the user with another account.
 *
 * @method    linkUsers
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {String}    userId                ID of the primary user.
 * @param   {Object}    params                Secondary user data.
 * @param   {String}    params.user_id        ID of the user to be linked.
 * @param   {String}    params.connection_id  ID of the connection to be used.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'linkUsers', 'users.link');

/**
 * Get user's log events.
 *
 * @method    getUserLogs
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params                Get logs data.
 * @param   {String}    params.id             User id.
 * @param   {Number}    params.per_page       Number of results per page.
 * @param   {Number}    params.page           Page number, zero indexed.
 * @param   {String}    params.sort           The field to use for sorting. Use field:order where order is 1 for ascending and -1 for descending. For example date:-1.
 * @param   {Boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUserLogs', 'users.logs');

/**
 * Get user's roles
 *
 * @method    getUserRoles
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params                Get roles data.
 * @param   {String}    params.id             User id.
 * @param   {Number}    params.per_page       Number of results per page.
 * @param   {Number}    params.page           Page number, zero indexed.
 * @param   {String}    params.sort           The field to use for sorting. Use field:order where order is 1 for ascending and -1 for descending. For example date:-1.
 * @param   {Boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUserRoles', 'users.getRoles');

/**
 * Assign roles to a user
 *
 * @method    assignRolestoUser
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params       params object
 * @param   {String}    params.id    user_id
 * @param   {Object}    data         data object containing list of role IDs
 * @param   {String}    data.roles  Array of role IDs
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'assignRolestoUser', 'users.assignRoles');

/**
 * Remove roles from a user
 *
 * @method    removeRolesFromUser
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params       params object
 * @param   {String}    params.id    user_id
 * @param   {String}    data         data object containing list of role IDs
 * @param   {String}    data.roles  Array of role IDs
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'removeRolesFromUser', 'users.removeRoles');

/**
 * Get user's permissions
 *
 * @method    getUserPermissions
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params                Get permissions data.
 * @param   {String}    params.id             User id.
 * @param   {Number}    params.per_page       Number of results per page.
 * @param   {Number}    params.page           Page number, zero indexed.
 * @param   {String}    params.sort           The field to use for sorting. Use field:order where order is 1 for ascending and -1 for descending. For example date:-1.
 * @param   {Boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUserPermissions', 'users.getPermissions');

/**
 * Assign permissions to a user
 *
 * @method    assignPermissionsToUser
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params       params object
 * @param   {String}    params.id    user_id
 * @param   {String}    data         data object containing list of permissions
 * @param   {String}    data.permissions  Array of permission IDs
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'assignPermissionsToUser', 'users.assignPermissions');

/**
 * Remove permissions from a user
 *
 * @method    removePermissionsFromUser
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params       params object
 * @param   {String}    params.id    user_id
 * @param   {String}    data         data object containing list of permission IDs
 * @param   {String}    data.permissions  Array of permission IDs
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'removePermissionsFromUser', 'users.removePermissions');

/**
 * Get a list of a user's Guardian enrollments.
 *
 * @method    getGuardianEnrollments
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getGuardianEnrollments({ id: USER_ID }, function (err, enrollments) {
 *   console.log(enrollments);
 * });
 *
 * @param   {Object}    data      The user data object.
 * @param   {String}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'getGuardianEnrollments',
  'users.getGuardianEnrollments'
);

/**
 * Generate new Guardian recovery code.
 *
 * @method    regenerateRecoveryCode
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.regenerateRecoveryCode({ id: USER_ID }, function (err, newRecoveryCode) {
 *   console.log(newRecoveryCode);
 * });
 *
 * @param   {Object}    data      The user data object.
 * @param   {String}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'regenerateRecoveryCode',
  'users.regenerateRecoveryCode'
);

/**
 * Get user blocks by its id.
 *
 * @method    getUserBlocks
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getUserBlocks({ id: USER_ID }, function (err, blocks) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(blocks);
 * });
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUserBlocks', 'userBlocks.get');

/**
 * Unblock an user by its id.
 *
 * @method    unblockUser
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.unblockUser({ id: USER_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // User unblocked.
 * });
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'unblockUser', 'userBlocks.delete');

/**
 * Get user blocks by its identifier.
 *
 * @method    getUserBlocksByIdentifier
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getUserBlocksByIdentifier({ identifier: USER_ID }, function (err, blocks) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(blocks);
 * });
 *
 * @param   {Object}    params              The user data object..
 * @param   {String}    params.identifier   The user identifier, any of: username, phone_number, email.
 * @param   {Function}  [cb]                Callback function
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'getUserBlocksByIdentifier',
  'userBlocks.getByIdentifier'
);

/**
 * Unblock an user by its id.
 *
 * @method    unblockUser
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.unblockUserByIdentifier({ identifier: USER_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // User unblocked.
 * });
 *
 * @param   {Object}    params              The user data object..
 * @param   {String}    params.identifier   The user identifier, any of: username, phone_number, email.
 * @param   {Function}  [cb]                Callback function
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'unblockUserByIdentifier',
  'userBlocks.deleteByIdentifier'
);

/**
 * Get a single Guardian enrollment.
 *
 * @method    getGuardianEnrollment
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollment) {
 *   console.log(enrollment);
 * });
 *
 * @param   {Object}    data      The Guardian enrollment data object.
 * @param   {String}    data.id   The Guardian enrollment id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'getGuardianEnrollment',
  'guardian.getGuardianEnrollment'
);

/**
 * Delete a user's Guardian enrollment.
 *
 * @method    deleteGuardianEnrollment
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteGuardianEnrollment({ id: ENROLLMENT_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Email provider deleted.
 * });
 *
 * @param   {Object}    data      The Guardian enrollment data object.
 * @param   {String}    data.id   The Guardian enrollment id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'deleteGuardianEnrollment',
  'guardian.deleteGuardianEnrollment'
);

/**
 * Get all blacklisted tokens.
 *
 * @method    getBlacklistedTokens
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getBlacklistedTokens(function (err, tokens) {
 *   console.log(tokens.length);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getBlacklistedTokens', 'blacklistedTokens.getAll');

/**
 * Blacklist a new token.
 *
 * @method    blacklistToken
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    token      Token data.
 * @param   {String}    token.aud  Audience (your app client ID).
 * @param   {String}    token.jti  The JWT ID claim.
 * @param   {Function}  [cb]       Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'blacklistToken', 'blacklistedTokens.add');

/**
 *  Create a new Email Template.
 *
 * @method    createEmailTemplate
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createEmailTemplate(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   // Email Template created.
 * });
 *
 * @param   {Object}    data     Email Template data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createEmailTemplate', 'emailTemplates.create');

/**
 * Get an Auth0 Email Template.
 *
 * @method    getEmailTemplate
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getEmailTemplate({ name: EMAIL_TEMPLATE_NAME }, function (err, emailTemplate) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(emailTemplate);
 * });
 *
 * @param   {Object}    params          Email Template parameters.
 * @param   {String}    params.name     Template Name
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getEmailTemplate', 'emailTemplates.get');

/**
 * Update an existing Email Template.
 *
 * @method    updateEmailTemplates
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params          Email Template parameters.
 * @param   {String}    params.name     Template Name
 * @param   {Object}    data            Updated Email Template data.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateEmailTemplate', 'emailTemplates.update');

/**
 * Get the email provider.
 *
 * @method    getEmailProvider
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getEmailProvider(function (err, provider) {
 *   console.log(provider.length);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 * @param   {Object}    [params]          Clients parameters.
 * @param   {Number}    [params.fields] A comma separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve: name, enabled, settings fields.
 * @param   {Number}    [params.include_fields]  true if the fields specified are to be excluded from the result, false otherwise (defaults to true)

 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getEmailProvider', 'emailProvider.get');

/**
 * Configure the email provider.
 *
 * @method    configureEmailProvider
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.configureEmailProvider(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Email provider configured.
 * });
 *
 * @param   {Object}    data     The email provider data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'configureEmailProvider', 'emailProvider.configure');

/**
 * Delete email provider.
 *
 * @method    deleteEmailProvider
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteEmailProvider(function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Email provider deleted.
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteEmailProvider', 'emailProvider.delete');

/**
 * Update the email provider.
 *
 * @method    updateEmailProvider
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params            Email provider parameters.
 * @param   {Object}    data              Updated email provider data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateEmailProvider', 'emailProvider.update');

/**
 * Get a the active users count.
 *
 * @method    getActiveUsersCount
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getActiveUsersCount(function (err, usersCount) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(usersCount);
 * });
 *
 * @param   {Function}  [cb]  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getActiveUsersCount', 'stats.getActiveUsersCount');

/**
 * Get the daily stats.
 *
 * @method    getDailyStats
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Stats parameters.
 * @param   {String}    params.from   The first day in YYYYMMDD format.
 * @param   {String}    params.to     The last day in YYYYMMDD format.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getDailyStats', 'stats.getDaily');

/**
 * Get the tenant settings..
 *
 * @method    getTenantSettings
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getSettings(function (err, settings) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(settings);
 * });
 *
 * @param   {Function}  [cb]  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getTenantSettings', 'tenant.getSettings');

/**
 * Update the tenant settings.
 *
 * @method    updateTenantSettings
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.updateTenantSettings(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    data  The new tenant settings.
 * @param   {Function}  [cb]  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateTenantSettings', 'tenant.updateSettings');

/**
 * Get a job by its ID.
 *
 * @method    getJob
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Job parameters.
 * @param   {String}    params.id     Job ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getJob', 'jobs.get');

/**
 * Given a path to a file and a connection id, create a new job that imports the
 * users contained in the file or JSON string and associate them with the given
 * connection.
 *
 * @method    importUsers
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    data                          Users import data.
 * @param   {String}    data.connection_id            connection_id of the connection to which users will be imported.
 * @param   {String}    [data.users]                  Path to the users data file. Either users or users_json is mandatory.
 * @param   {String}    [data.users_json]             JSON data for the users.
 * @param   {Boolean}   [data.upsert]                 Whether to update users if they already exist (true) or to ignore them (false).
 * @param   {Boolean}   [data.send_completion_email]  Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
 * @param   {Function}  [cb]                          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'importUsers', 'jobs.importUsers');

/**
 * Export all users to a file using a long running job.
 *
 * @method   exportUsers
 * @memberOf module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    data                  Users export data.
 * @param   {String}    [data.connection_id]  The connection id of the connection from which users will be exported
 * @param   {String}    [data.format]         The format of the file. Valid values are: "json" and "csv".
 * @param   {Number}    [data.limit]          Limit the number of records.
 * @param   {Object[]}  [data.fields]         A list of fields to be included in the CSV. If omitted, a set of predefined fields will be exported.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'exportUsers', 'jobs.exportUsers');

/**
 * Send a verification email to a user.
 *
 * @method    sendEmailVerification
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    data          User data object.
 * @param   {String}    data.user_id  ID of the user to be verified.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'sendEmailVerification', 'jobs.verifyEmail');

/**
 * Create a new password change ticket.
 *
 * @method    createPasswordChangeTicket
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
utils.wrapPropertyMethod(ManagementClient, 'createPasswordChangeTicket', 'tickets.changePassword');

/**
 * Create an email verification ticket.
 *
 * @method    createEmailVerificationTicket
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
utils.wrapPropertyMethod(ManagementClient, 'createEmailVerificationTicket', 'tickets.verifyEmail');

/**
 * Get an Auth0 log.
 *
 * @method    getLog
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getLog({ id: EVENT_ID }, function (err, log) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(log);
 * });
 *
 * @param   {Object}    params          Log parameters.
 * @param   {String}    params.id       Event ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getLog', 'logs.get');

/**
 * Get all logs.
 *
 * @method    getLogs
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    [params]                Logs params.
 * @param   {String}    [params.q]              Search Criteria using Query String Syntax
 * @param   {Number}    [params.page]           Page number. Zero based
 * @param   {Number}    [params.per_page]       The amount of entries per page
 * @param   {String}    [params.sort]           The field to use for sorting.
 * @param   {String}    [params.fields]         A comma separated list of fields to include or exclude
 * @param   {Boolean}   [params.include_fields] true if the fields specified are to be included in the result, false otherwise.
 * @param   {Boolean}   [params.include_totals] true if a query summary must be included in the result, false otherwise. Default false
 * @param   {Function}  [cb]                    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getLogs', 'logs.getAll');

/**
 * Get all Log Streams.
 *
 * @method    getLogStreams
 * @memberOf  module:management.ManagementClient.prototype
 *
 *
 *
 * management.getLogStreams( function (err, logStreams) {
 *   console.log(logStreams.length);
 * });
 *
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getLogStreams', 'logStreams.getAll');

/**
 * Create a new Log Stream.
 *
 * @method    createLogStream
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createLogStream(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Log Stream created.
 * });
 *
 * @param   {Object}    data          Log Stream data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createLogStream', 'logStreams.create');

/**
 * Get an Auth0 Log Stream.
 *
 * @method    getLogStream
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getLogStream({ id: LOG_STREAM_ID }, function (err, logStream) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(logStream);
 * });
 *
 * @param   {Object}    params        Log Stream parameters.
 * @param   {String}    params.id     Log Stream ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getLogStream', 'logStreams.get');

/**
 * Delete an existing Log Stream.
 *
 * @method    deleteLogStream
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteLogStream({ id: LOG_STREAM_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Log Stream deleted.
 * });
 *
 * @param   {Object}    params        Log Stream parameters.
 * @param   {String}    params.id     Log Stream ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteLogStream', 'logStreams.delete');

/**
 * Update an existing Log Stream.
 *
 * @method    updateLogStream
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Object}    data          Updated rule data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateLogStream', 'logStreams.update');

/**
 * Create a new resource server.
 *
 * @method    createResourceServer
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createResourceServer(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Resource Server created.
 * });
 *
 * @param   {Object}    data     Resource Server data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createResourceServer', 'resourceServers.create');

/**
 * Get all resource servers.
 *
 * @method    getResourceServers
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    [params]          Resource Servers parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getResourceServers', 'resourceServers.getAll');

/**
 * Get a Resource Server.
 *
 * @method    getResourceServer
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getResourceServer({ id: RESOURCE_SERVER_ID }, function (err, resourceServer) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(resourceServer);
 * });
 *
 * @param   {Object}    params          Resource Server parameters.
 * @param   {String}    params.id       Resource Server ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getResourceServer', 'resourceServers.get');

/**
 * Delete an existing resource server.
 *
 * @method    deleteResourceServer
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteResourceServer({ id: RESOURCE_SERVER_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Resource Server deleted.
 * });
 *
 * @param   {Object}    params          Resource Server parameters.
 * @param   {String}    params.id       Resource Server ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteResourceServer', 'resourceServers.delete');

/**
 * Update an existing resource server.
 *
 * @method    updateResourceServer
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params          Resource Server parameters.
 * @param   {String}    params.id       Resource Server ID.
 * @param   {Object}    data            Updated Resource Server data.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateResourceServer', 'resourceServers.update');

/**
 * Set a new rules config.
 *
 * @method    setRulesConfig
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Rule Config parameters.
 * @param   {String}    params.key    Rule Config key.
 * @param   {Object}    data          Rule Config Data parameters.
 * @param   {String}    data.value    Rule Config Data value.
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'setRulesConfig', 'rulesConfigs.set');

/**
 * Get rules config.
 *
 * @method    getRulesConfigs
 * @memberOf  module:management.ManagementClient.prototype
 * @param     {Function}  [cb]  Callback function.
 *
 * @example
 *
 * management.getRulesConfigs(function (err, rulesConfigs) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Get Rules Configs.
 * });
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getRulesConfigs', 'rulesConfigs.getAll');

/**
 * Delete rules config.
 *
 * @method    deleteRulesConfig
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Rule Configs parameters.
 * @param   {String}    params.key    Rule Configs key.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteRulesConfig', 'rulesConfigs.delete');

/**
 * Create an Auth0 Custom Domain.
 *
 * @method    createCustomDomain
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createCustomDomain(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // CustomDomain created.
 * });
 *
 * @param   {Object}    data     The custom domain data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createCustomDomain', 'customDomains.create');

/**
 * Get all Auth0 CustomDomains.
 *
 * @method    getCustomDomains
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getCustomDomains(function (err, customDomains) {
 *   console.log(customDomains.length);
 * });
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getCustomDomains', 'customDomains.getAll');

/**
 * Get a Custom Domain.
 *
 * @method    getCustomDomain
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getCustomDomain({ id: CUSTOM_DOMAIN_ID }, function (err, customDomain) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(customDomain);
 * });
 *
 * @param   {Object}    params            Custom Domain parameters.
 * @param   {String}    params.id         Custom Domain ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getCustomDomain', 'customDomains.get');

/**
 * Verify a Custom Domain.
 *
 * @method    verifyCustomDomain
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.verifyCustomDomain({ id: CUSTOM_DOMAIN_ID }, function (err, customDomain) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(customDomain);
 * });
 *
 * @param   {Object}    params            Custom Domain parameters.
 * @param   {String}    params.id         Custom Domain ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'verifyCustomDomain', 'customDomains.verify');

/**
 * Delete a Custom Domain.
 *
 * @method    deleteCustomDomain
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteCustomDomain({ id: CUSTOM_DOMAIN_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // CustomDomain deleted.
 * });
 *
 * @param   {Object}    params            Custom Domain parameters.
 * @param   {String}    params.id         Custom Domain ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteCustomDomain', 'customDomains.delete');

/**
 * Create a Guardian enrollment ticket.
 *
 * @method    createGuardianEnrollmentTicket
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createGuardianEnrollmentTicket(function (err, ticket) {
 *   console.log(ticket);
 * });
 *
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'createGuardianEnrollmentTicket',
  'guardian.createEnrollmentTicket'
);

/**
 * Get a list of Guardian factors and statuses.
 *
 * @method    getGuardianFactors
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getGuardianFactors(function (err, factors) {
 *   console.log(factors.length);
 * });
 *
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getGuardianFactors', 'guardian.getFactors');

/**
 * Get Guardian factor provider configuration
 *
 * @method    getGuardianFactorProvider
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getFactorProvider({ name: 'sms', provider: 'twilio'}, function (err, provider) {
 *   console.log(provider);
 * });
 *
 * @param   {Object}    params            Factor provider parameters.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'getGuardianFactorProvider',
  'guardian.getFactorProvider'
);

/**
 * Update Guardian's factor provider
 *
 * @method    updateFactorProvider
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.updateGuardianFactorProvider({ name: 'sms', provider: 'twilio' }, {
 *   messaging_service_sid: 'XXXXXXXXXXXXXX',
 *   auth_token: 'XXXXXXXXXXXXXX',
 *   sid: 'XXXXXXXXXXXXXX'
 * }, function (err, provider) {
 *   console.log(provider);
 * });
 *
 * @param   {Object}    params            Factor provider parameters.
 * @param   {Object}    data              Updated Factor provider data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'updateGuardianFactorProvider',
  'guardian.updateFactorProvider'
);

/**
 * Get Guardian enrollment and verification factor templates
 *
 * @method    getGuardianFactorTemplates
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getGuardianFactorTemplates({ name: 'sms' }, function (err, templates) {
 *   console.log(templates);
 * });
 *
 * @param   {Object}    params            Factor parameters.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'getGuardianFactorTemplates',
  'guardian.getFactorTemplates'
);

/**
 * Update Guardian enrollment and verification factor templates
 *
 * @method    updateGuardianFactorTemplates
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.updateGuardianFactorTemplates({ name: 'sms' }, {
 *   enrollment_message: "{{code}} is your verification code for {{tenant.friendly_name}}. Please enter this code to verify your enrollment.",
 *   verification_message: "{{code}} is your verification code for {{tenant.friendly_name}}"
 * }, function (err, templates) {
 *   console.log(templates);
 * });
 *
 * @param   {Object}    params            Factor parameters.
 * @param   {Object}    data              Updated factor templates data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'updateGuardianFactorTemplates',
  'guardian.updateFactorTemplates'
);

/**
 * Update Guardian Factor
 *
 * @method    updateGuardianFactor
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.updateGuardianFactor({ name: 'sms' }, {
 *   enabled: true
 * }, function (err, factor) {
 *   console.log(factor);
 * });
 *
 * @param   {Object}    params            Factor parameters.
 * @param   {Object}    data              Updated factor data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateGuardianFactor', 'guardian.updateFactor');

/**
 * Get enabled Guardian policies
 *
 * @method    getGuardianPolicies
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getGuardianPolicies(function (err, policies) {
 *   console.log(policies);
 * });
 *
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getGuardianPolicies', 'guardian.getPolicies');

/**
 * Update enabled Guardian policies
 *
 * @method    updateGuardianPolicies
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.updateGuardianPolicies({}, [
 *   'all-applications'
 * ], function (err, policies) {
 *   console.log(policies);
 * });
 *
 * @param   {Object}    params            Parameters.
 * @param   {String[]}  data              Policies to enable. Empty array disables all policies.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateGuardianPolicies', 'guardian.updatePolicies');

/**
 * Get the Guardian phone factor's selected provider
 *
 * @method    getGuardianPhoneFactorSelectedProvider
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getGuardianPhoneFactorSelectedProvider(function (err, selectedProvider) {
 *   console.log(selectedProvider);
 * });
 *
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'getGuardianPhoneFactorSelectedProvider',
  'guardian.getPhoneFactorSelectedProvider'
);

/**
 * Update the Guardian phone factor's selected provider
 *
 * @method    updateGuardianPhoneFactorSelectedProvider
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.updateGuardianPhoneFactorSelectedProvider({}, {
 *   provider: 'twilio'
 * }, function (err, factor) {
 *   console.log(factor);
 * });
 *
 * @param   {Object}    params            Parameters.
 * @param   {Object}    data              Updated selected provider data.
 * @param   {String}    data.provider     Name of the selected provider
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'updateGuardianPhoneFactorSelectedProvider',
  'guardian.updatePhoneFactorSelectedProvider'
);

/**
 * Get the Guardian phone factor's message types
 *
 * @method    getGuardianPhoneFactorMessageTypes
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getGuardianPhoneFactorMessageTypes(function (err, messageTypes) {
 *   console.log(messageTypes);
 * });
 *
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'getGuardianPhoneFactorMessageTypes',
  'guardian.getPhoneFactorMessageTypes'
);

/**
 * Update the Guardian phone factor's message types
 *
 * @method    updateGuardianPhoneFactorMessageTypes
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.updateGuardianPhoneFactorMessageTypes({}, {
 *   message_types: ['sms', 'voice']
 * }, function (err, factor) {
 *   console.log(factor);
 * });
 *
 * @param   {Object}    params                Parameters.
 * @param   {Object}    data                  Updated selected provider data.
 * @param   {String[]}  data.message_types    Message types (only `"sms"` and `"voice"` are supported).
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  ManagementClient,
  'updateGuardianPhoneFactorMessageTypes',
  'guardian.updatePhoneFactorMessageTypes'
);

/**
 * Get all roles.
 *
 * @method    getRoles
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    [params]          Roles parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getRoles', 'roles.getAll');

/**
 * Create a new role.
 *
 * @method    createRole
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    data     Role data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createRole', 'roles.create');

/**
 * Get an Auth0 role.
 *
 * @method    getRole
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getRole({ id: ROLE_ID }, function (err, role) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(role);
 * });
 *
 * @param   {Object}    params        Role parameters.
 * @param   {String}    params.id     Role ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getRole', 'roles.get');

/**
 * Delete an existing role.
 *
 * @method    deleteRole
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteRole({ id: ROLE_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Role deleted.
 * });
 *
 * @param   {Object}    params        Role parameters.
 * @param   {String}    params.id     Role ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteRole', 'roles.delete');

/**
 * Update an existing role.
 *
 * @method    updateRole
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Role parameters.
 * @param   {String}    params.id     Role ID.
 * @param   {Object}    data          Updated role data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateRole', 'roles.update');

/**
 * Get permissions for a given role
 *
 * @method    getPermissionsInRole
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {String}    [roleId]           Id of the role
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getPermissionsInRole', 'roles.getPermissions');

/**
 * Add permissions in a role
 *
 * @method    addPermissionsInRole
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * var params = { id :'ROLE_ID'};
 * var data = { "permissions" : [{"permission_name" :"do:something" ,"resource_server_identifier" :"test123" }]};
 *
 * management.addPermissionsInRole(params, data, function (err, permissions) {
 *   console.log(permissions);
 * });
 *
 * @param   {String}    params.id                ID of the Role.
 * @param   {Object}    data                permissions data
 * @param   {String}    data.permissions    Array of permissions
 * @param   {String}    data.permissions.permission_name  Name of a permission
 * @param   {String}    data.permissions.resource_server_identifier  Identifier for a resource
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'addPermissionsInRole', 'roles.addPermissions');

/**
 * Remove permissions from a role
 *
 * @method    removePermissionsFromRole
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * var params = { id :'ROLE_ID'};
 * var data = { "permissions" : [{"permission_name" :"do:something" ,"resource_server_identifier" :"test123" }]};
 *
 * management.removePermissionsFromRole(params, data, function (err, permissions) {
 *   console.log(permissions);
 * });
 *
 * @param   {String}    params.id                ID of the Role.
 * @param   {Object}    data                permissions data
 * @param   {String}    data.permissions    Array of permissions
 * @param   {String}    data.permissions.permission_name  Name of a permission
 * @param   {String}    data.permissions.resource_server_identifier  Identifier for a resource
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'removePermissionsFromRole', 'roles.removePermissions');

/**
 * Get users in a given role
 *
 * @method    getUsersInRole
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * var params = {
 *   id: 'ROLE_ID'
 *   per_page: 50,
 *   page: 0
 * };
 *
 * @example <caption>
 *   This method takes a roleId and returns all users within that role
 * </caption>
 *
 * management.getUsersInRole(params, function (err, users) {
 *   console.log(users);
 * });
 *
 * @param   {String}    [id]           Id of the role
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUsersInRole', 'roles.getUsers');

/**
 * Get all hooks.
 *
 * @method    getHooks
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    [params]          Hooks parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getHooks', 'hooks.getAll');

/**
 * Get an Auth0 hook.
 *
 * @method    getHook
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getHook({ id: HOOK_ID }, function (err, hook) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(hook);
 * });
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getHook', 'hooks.get');

/**
 * Create a new hook.
 *
 * @method    createHook
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.createHook(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Hook created.
 * });
 *
 * @param   {Object}    data     Hook data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'createHook', 'hooks.create');

/**
 * Update an existing hook.
 *
 * @method    updateHook
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Object}    data          Updated hook data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateHook', 'hooks.update');

/**
 * Delete an existing hook.
 *
 * @method    deleteHook
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * auth0.deleteHook({ id: HOOK_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Hook deleted.
 * });
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteHook', 'hooks.delete');

/**
 * Get an Auth0 hook's secrets.
 *
 * @method    getHookSecrets
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getHookSecrets', 'hooks.getSecrets');

/**
 * Add hook screts.
 *
 * @method    addHookScrets
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Object}    data          Secrets key/value pairs
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'addHookSecrets', 'hooks.addSecrets');

/**
 * Update an existing hook.
 *
 * @method    updateHookSecrets
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Object}    data          Secrets key/value pairs
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateHookSecrets', 'hooks.updateSecrets');

/**
 * Delete an existing hook.
 *
 * @method    removeHookSecrets
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Object}    data          Secrets key/value pairs
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'removeHookSecrets', 'hooks.removeSecrets');

/**
 * Returns the access_token.
 *
 * @method    getAccessToken
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @return {Promise}   Promise returning an access_token.
 */
utils.wrapPropertyMethod(ManagementClient, 'getAccessToken', 'tokenProvider.getAccessToken');

/**
 * Update the branding settings.
 *
 * @method    updateBrandingSettings
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params            Branding parameters.
 * @param   {Object}    data              Updated branding data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateBrandingSettings', 'branding.updateSettings');

/**
 * Get the branding settings..
 *
 * @method    getBrandingSettings
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    params            Branding parameters.
 * @param   {Object}    data              Branding data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getBrandingSettings', 'branding.getSettings');

/**
 * Update the tenant migrations.
 *
 * @method    updateMigrations
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Object}    data              Updated migrations data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'updateMigrations', 'migrations.updateMigrations');

/**
 * Get migrations flags
 *
 * @method    getMigrations
 * @memberOf  module:management.ManagementClient.prototype
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
 *
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getMigrations', 'migrations.getMigrations');

module.exports = ManagementClient;
