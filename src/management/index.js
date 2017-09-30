/** @module management */

var util = require('util');

var pkg = require('../../package.json');
var utils = require('../utils');
var jsonToBase64 = utils.jsonToBase64;
var ArgumentError = require('rest-facade').ArgumentError;
var assign = Object.assign || require('object.assign');

// Managers.
var ClientsManager = require('./ClientsManager');
var ClientGrantsManager = require('./ClientGrantsManager');
var UsersManager = require('./UsersManager');
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
var ResourceServersManager = require('./ResourceServersManager');
var ManagementTokenProvider = require('./ManagementTokenProvider');

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
 * @param   {String}  [options.tokenProvider.enableCache=true]    Enabled or Disable Cache.
 * @param   {Number}  [options.tokenProvider.cacheTTLInSeconds]   By default the `expires_in` value will be used to determine the cached time of the token, this can be overridden.
 *
 */
var ManagementClient = function (options) {
  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Management API SDK options must be an object');
  }

  if (!options.domain || options.domain.length === 0) {
      throw new ArgumentError('Must provide a domain');
  }

  var baseUrl = util.format(BASE_URL_FORMAT, options.domain);
  var managerOptions = {
    headers: {
      'User-agent': 'node.js/' + process.version.replace('v', ''),
      'Content-Type': 'application/json'
    },
    baseUrl: baseUrl
  };

  if (options.token === undefined) {
    var config = assign({ audience: util.format(MANAGEMENT_API_AUD_FORMAT, options.domain) }, options);

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
    managerOptions.headers['Authorization'] = 'Bearer ' + options.token;
  }

  if (options.telemetry !== false) {
    var telemetry = jsonToBase64(options.clientInfo || this.getClientInfo());
    managerOptions.headers['Auth0-Client'] = telemetry;
  }

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
   * Simple abstraction for performing CRUD operations on the
   * users endpoint.
   *
   * @type {UsersManager}
   */
  this.users = new UsersManager(managerOptions);

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
   * Simple abstraction for performing CRUD operations on the
   * resource servers endpoint.
   *
   * @type {ResourceServersManager}
   */
  this.resourceServers = new ResourceServersManager(managerOptions);

};


/**
 * Return an object with information about the current client,
 *
 * @method    getClientInfo
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @return {Object}   Object containing client information.
 */
ManagementClient.prototype.getClientInfo = function () {
  var clientInfo = {
    name: 'node-auth0',
    version: pkg.version,
    dependencies: [],
    environment: [{
      name: 'node.js',
      version: process.version.replace('v', '')
    }]
  };
  // Add the dependencies to the client info object.
  Object
    .keys(pkg.dependencies)
    .forEach(function (name) {
      clientInfo.dependencies.push({
        name: name,
        version: pkg.dependencies[name]
      });
    });

  return clientInfo;
};


/**
 * Get all connections.
 *
 * @method    getConnections
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getConnections(function (err, connections) {
 *   console.log(connections.length);
 * });
 *
 * @param   {Object}    data     Connection data object.
 * @param   {Function}  [cb]     Callback function.
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
 *   // Conection created.
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
 *   // Conection deleted.
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
 * @param   {Object}    params        Conneciton parameters.
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
 * @example
 * management.getClients(function (err, clients) {
 *   console.log(clients.length);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
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
 * @method    getAll
 * @memberOf  module:management.ClientGrantsManager.prototype
 *
 * @example
 * management.clientGrants.getAll(function (err, grants) {
 *   console.log(grants.length);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getClientGrants', 'clientGrants.getAll');


/**
 * Create an Auth0 client grant.
 *
 * @method    create
 * @memberOf  module:management.ClientGrantsManager.prototype
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
 * @method    update
 * @memberOf  module:management.ClientGrantsManager.prototype
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
 * @method    delete
 * @memberOf  module:management.ClientGrantsManager.prototype
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
utils.wrapPropertyMethod(ManagementClient, 'createDevicePublicKey', 'deviceCredentials.createPublicKey');


/**
 * Get all Auth0 credentials.
 *
 * @method    getDeviceCredentials
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.getDeviceCredentials(function (err, credentials) {
 *   console.log(credentials.length);
 * });
 *
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
 * @example
 * management.getRules(function (err, rules) {
 *   console.log(rules.length);
 * });
 *
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getRules', 'rules.getAll');


/**
 * Create a new rule.
 *
 * @method    createRules
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
 * Delete an existing rule.
 *
 * @method    updateRule
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * management.deleteRule({ id: RULE_ID }, function (err) {
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
utils.wrapPropertyMethod(ManagementClient, 'updateRule', 'rules.update');


/**
 * Get all users.
 *
 * @method    getUsers
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example <caption>
 *   This method takes an optional object as first argument that may be used to
 *   specify pagination settings and the search query.
 * </caption>
 *
 * // Pagination settings.
 * var params = {
 *   per_page: 10,
 *   page: 2
 * };
 *
 * auth0.getUsers(params, function (err, users) {
 *   console.log(users.length);
 * });
 *
 * @param   {Object}    [params]          Users params.
 * @param   {Number}    [params.per_page] Number of users per page.
 * @param   {Number}    [params.page]     Page number.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUsers', 'users.getAll');


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
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteUserMultifcator', 'users.deleteMultifactorProvider');


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
 * var params = { id: USER_ID };
 * var data = {
 *   user_id: 'OTHER_USER_ID',
 *   connection_id: 'CONNECTION_ID'
 * };
 *
 * management.linkUsers(params, data, function (err, user) {
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
 * @param   {Number}    params.per_page       Number of logs per page.
 * @param   {Number}    params.page           Page number.
 * @param   {String}    params.sort           The field to use for sorting. Use field:order where order is 1 for ascending and -1 for descending. For example date:-1.
 * @param   {Boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getUserLogs', 'users.logs');

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
utils.wrapPropertyMethod(ManagementClient, 'getGuardianEnrollments', 'users.getGuardianEnrollments');


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
 *
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
 * management.updateEmailProvider(data, function (err, provider) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Updated email provider.
 *   console.log(provider);
 * });
 *
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
 * users contained in the file and associate them with the given connection.
 *
 * @method    importUsers
 * @memberOf  module:management.ManagementClient.prototype
 *
 * @example
 * var params = {
 *   connection_id: '{CONNECTION_ID}',
 *   users: '{PATH_TO_USERS_FILE}'
 * };
 *
 * management.get(params, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    data                Users import data.
 * @param   {String}    data.connectionId   Connection for the users insertion.
 * @param   {String}    data.users          Path to the users data file.
 * @param   {Function}  [cb]                Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'importUsers', 'jobs.importUsers');


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
 * management.sendEmailVerification(function (err) {
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
 * var params = {
 *   result_url: '{REDIRECT_URL}',  // Redirect after using the ticket.
 *   user_id: '{USER_ID}',  // Optional.
 *   email: '{USER_EMAIL}',  // Optional.
 *   new_password: '{PASSWORD}'
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
 * @example
 * management.getLogs(function (err, logs) {
 *   console.log(logs.length);
 * });
 *
 * @param   {Object}    data     Log data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ManagementClient, 'getLogs', 'logs.getAll');


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
 * @example
 * management.getResourceServers(function (err, resourceServers) {
 *   console.log(resourceServers.length);
 * });
 *
 * @param   {Object}    data     Connection data object.
 * @param   {Function}  [cb]     Callback function.
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
module.exports = ManagementClient;
