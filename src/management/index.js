/** @module management */

var util = require('util');

var pkg = require('../../package.json');
var utils = require('../utils');
var jsonToBase64 = utils.jsonToBase64;
var ArgumentError = require('../exceptions').ArgumentError;

// Managers.
var ClientsManager = require('./ClientsManager');
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

var BASE_URL_FORMAT = 'https://%s/api/v2';


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
 *   token: '{YOUR_API_V2_TOKEN}',
 *   domain: '{YOUR_ACCOUNT}.auth0.com'
 * });
 *
 * @param   {Object}  options           Options for the ManagementClient SDK.
 * @param   {String}  options.token     API access token.
 * @param   {String}  [options.domain]  ManagementClient server domain.
 */
var ManagementClient = function (options) {
  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Management API SDK options must be an object');
  }

  if (!options.token || options.token.length === 0) {
    throw new ArgumentError('An access token must be provided');
  }

  if (!options.domain || options.domain.length === 0) {
    throw new ArgumentError('Must provide a domain');
  }

  var managerOptions = {
    headers: {
      'Authorization': 'Bearer ' + options.token,
      'User-agent': 'node.js/' + process.version.replace('v', ''),
      'Content-Type': 'application/json'
    },
    baseUrl: util.format(BASE_URL_FORMAT, options.domain)
  };

  if (options.telemetry !== false) {
    var telemetry = jsonToBase64(this.getClientInfo());
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
 * Binding for auth0.connections.getAll()
 *
 * @method    getConnections
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getConnections', 'connections.getAll');


/**
 * Binding for auth0.connections.create()
 *
 * @method    createConnection
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'createConnection', 'connections.create');


/**
 * Binding for auth0.connections.get()
 *
 * @method    getConnection
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getConnection', 'connections.get');


/**
 * Binding for auth0.connections.delete()
 *
 * @method    deleteConnection
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteConnection', 'connections.delete');


/**
 * Binding for auth0.connections.update()
 *
 * @method    updateConnection
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'updateConnection', 'connections.update');


/**
 * Binding for auth0.clients.getAll()
 *
 * @method    getClients
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getClients', 'clients.getAll');


/**
 * Binding for auth0.clients.get()
 *
 * @method    getClient
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getClient', 'clients.get');


/**
 * Binding for auth0.clients.create()
 *
 * @method    createClient
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'createClient', 'clients.create');


/**
 * Binding for auth0.clients.update()
 *
 * @method    updateClient
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'updateClient', 'clients.update');


/**
 * Binding for auth0.clients.delete()
 *
 * @method    deleteClient
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteClient', 'clients.delete');


/**
 * Binding for auth0.deviceCredentials.createPubicKey()
 *
 * @method    createDevicePublicKey
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'createDevicePublicKey', 'deviceCredentials.createPublicKey');


/**
 * Binding for auth0.deviceCredentials.getAll()
 *
 * @method    getDeviceCredentials
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getDeviceCredentials', 'deviceCredentials.getAll');


/**
 * Binding for auth0.deviceCredentials.delete()
 *
 * @method    deleteDeviceCredential
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteDeviceCredential', 'deviceCredentials.delete');


/**
 * Binding for auth0.rules.getAll()
 *
 * @method    getRules
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getRules', 'rules.getAll');


/**
 * Binding for auth0.rules.create()
 *
 * @method    createRules
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'createRule', 'rules.create');


/**
 * Binding for auth0.rules.get()
 *
 * @method    getRule
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getRule', 'rules.get');


/**
 * Binding for auth0.rules.delete()
 *
 * @method    deleteRule
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteRule', 'rules.delete');


/**
 * Binding for auth0.rules.update()
 *
 * @method    updateRule
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'updateRule', 'rules.update');


/**
 * Binding for auth0.users.getAll()
 *
 * @method    getUsers
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getUsers', 'users.getAll');


/**
 * Binding for auth0.users.get()
 *
 * @method    getUser
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getUser', 'users.get');


/**
 * Binding for auth0.users.deleteAll()
 *
 * @method    deleteAllUsers
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteAllUsers', 'users.deleteAll');


/**
 * Binding for auth0.users.delete()
 *
 * @method    deleteUser
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteUser', 'users.delete');


/**
 * Binding for auth0.users.create()
 *
 * @method    createUser
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'createUser', 'users.create');


/**
 * Binding for auth0.users.update()
 *
 * @method    updateUser
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'updateUser', 'users.update');


/**
 * Binding for auth0.users.updateUserMetadata()
 *
 * @method    updateUserMetadata
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'updateUserMetadata', 'users.updateUserMetadata');


/**
 * Binding for auth0.users.updateAppMetadata()
 *
 * @method    updateAppMetadata
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'updateAppMetadata', 'users.updateAppMetadata');


/**
 * Binding for auth0.users.deleteMultifactorProvider()
 *
 * @method    deleteUserMultifactor
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteUserMultifcator', 'users.deleteMultifactorProvider');


/**
 * Binding for auth0.users.unlink()
 *
 * @method    unlinkUsers
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'unlinkUsers', 'users.unlink');


/**
 * Binding for auth0.users.link()
 *
 * @method    linkUsers
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'linkUsers', 'users.link');


/**
 * Binding for auth0.blacklistedTokens.getAll()
 *
 * @method    getBlacklistedTokens
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getBlacklistedTokens', 'blacklistedTokens.getAll');


/**
 * Binding for auth0.blacklistedTokens.add()
 *
 * @method    blacklistToken
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'blacklistToken', 'blacklistedTokens.add');


/**
 * Binding for auth0.emailProvider.get()
 *
 * @method    getEmailProvider
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getEmailProvider', 'emailProvider.get');


/**
 * Binding for auth0.emailProvider.configure()
 *
 * @method    configureEmailProvider
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'configureEmailProvider', 'emailProvider.configure');


/**
 * Binding for auth0.emailProvider.delete()
 *
 * @method    deleteEmailProvider
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'deleteEmailProvider', 'emailProvider.delete');


/**
 * Binding for auth0.emailProvider.update()
 *
 * @method    updateEmailProvider
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'updateEmailProvider', 'emailProvider.update');


/**
 * Binding for auth0.stats.getActiveUsersCount()
 *
 * @method    getActiveUsersCount
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getActiveUsersCount', 'stats.getActiveUsersCount');


/**
 * Binding for auth0.stats.getDaily()
 *
 * @method    getDailyStats
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getDailyStats', 'stats.getDaily');


/**
 * Binding for auth0.tenatn.getSettings()
 *
 * @method    getTenantSettings
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getTenantSettings', 'tenant.getSettings');


/**
 * Binding for auth0.tenant.updateSettings()
 *
 * @method    updateTenantSettings
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'updateTenantSettings', 'tenant.updateSettings');


/**
 * Binding for auth0.jobs.get()
 *
 * @method    getJob
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'getJob', 'jobs.get');


/**
 * Binding for auth0.jobs.importUsers()
 *
 * @method    importUsers
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'importUsers', 'jobs.importUsers');


/**
 * Binding for auth0.jobs.verifyEmail()
 *
 * @method    sendEmailVerification
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'sendEmailVerification', 'jobs.verifyEmail');


/**
 * Binding for auth0.tickets.changePassword()
 *
 * @method    createPasswordChangeTicket
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'createPasswordChangeTicket', 'tickets.changePassword');


/**
 * Binding for auth0.tickets.verifyEmail()
 *
 * @method    createEmailVerificationTicket
 * @memberOf  module:management.ManagementClient.prototype
 */
utils.wrapPropertyMethod(ManagementClient, 'createEmailVerificationTicket', 'tickets.verifyEmail');


module.exports = ManagementClient;
