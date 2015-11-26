var util = require('util');

var pkg = require('../package.json');
var utils = require('./utils');
var jsonToBase64 = utils.jsonToBase64;
var ArgumentError = require('./exceptions').ArgumentError;
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
var clientInfo = null;
var b65ClientInfo = null;


/**
 * @class
 * Auth0 module.
 * @constructor
 *
 * @param   {Object}  options           Options for the Auth0 SDK.
 * @param   {String}  options.token     API access token.
 * @param   {String}  [options.domain]  Auth0 server domain.
 */
var Auth0 = function (options) {
  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Auth0 SDK options must be an object');
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
    var telemetry = jsonToBase64(this.getAuth0ClientInfo());
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
   * Auth0 account statistics manager.
   *
   * @type {StatsManager}
   */
  this.stats = new StatsManager(managerOptions);

  /**
   * Auth0 tenant settings manager.
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
 * @method
 * @memberOf Auth0
 *
 * @return {Object}   Object containing client information.
 */
Auth0.prototype.getAuth0ClientInfo = function () {
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
 * Wrapper for auth0.connections.getAll()
 *
 * @method getConnections
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getConnections', 'connections.getAll');


/**
 * Wrapper for auth0.connections.create()
 *
 * @method createConnection
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createConnection', 'connections.create');


/**
 * Wrapper for auth0.connections.get()
 *
 * @method getConnection
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getConnection', 'connections.get');


/**
 * Wrapper for auth0.connections.delete()
 *
 * @method deleteConnection
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteConnection', 'connections.delete');


/**
 * Wrapper for auth0.connections.update()
 *
 * @method updateConnection
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateConnection', 'connections.update');


/**
 * Wrapper for auth0.clients.getAll()
 *
 * @method getClients
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getClients', 'clients.getAll');


/**
 * Wrapper for auth0.clients.get()
 *
 * @method getClient
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getClient', 'clients.get');


/**
 * Wrapper for auth0.clients.create()
 *
 * @method createClient
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createClient', 'clients.create');


/**
 * Wrapper for auth0.clients.update()
 *
 * @method updateClient
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateClient', 'clients.update');


/**
 * Wrapper for auth0.clients.delete()
 *
 * @method deleteClient
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteClient', 'clients.delete');


/**
 * Wrapper for auth0.deviceCredentials.createPubicKey()
 *
 * @method createDevicePublicKey
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createDevicePublicKey', 'deviceCredentials.createPublicKey');


/**
 * Wrapper for auth0.deviceCredentials.getAll()
 *
 * @method getDeviceCredentials
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getDeviceCredentials', 'deviceCredentials.getAll');


/**
 * Wrapper for auth0.deviceCredentials.delete()
 *
 * @method deleteDeviceCredential
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteDeviceCredential', 'deviceCredentials.delete');


/**
 * Wrapper for auth0.rules.getAll()
 *
 * @method getRules
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getRules', 'rules.getAll');


/**
 * Wrapper for auth0.rules.create()
 *
 * @method createRules
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createRule', 'rules.create');


/**
 * Wrapper for auth0.rules.get()
 *
 * @method getRule
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getRule', 'rules.get');


/**
 * Wrapper for auth0.rules.delete()
 *
 * @method deleteRule
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteRule', 'rules.delete');


/**
 * Wrapper for auth0.rules.update()
 *
 * @method updateRule
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateRule', 'rules.update');


/**
 * Wrapper for auth0.users.getAll()
 *
 * @method getUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getUsers', 'users.getAll');


/**
 * Wrapper for auth0.users.get()
 *
 * @method getUser
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getUser', 'users.get');


/**
 * Wrapper for auth0.users.deleteAll()
 *
 * @method deleteAllUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteAllUsers', 'users.deleteAll');


/**
 * Wrapper for auth0.users.delete()
 *
 * @method deleteUser
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteUser', 'users.delete');


/**
 * Wrapper for auth0.users.create()
 *
 * @method createUser
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createUser', 'users.create');


/**
 * Wrapper for auth0.users.update()
 *
 * @method updateUser
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateUser', 'users.update');


/**
 * Wrapper for auth0.users.updateUserMetadata()
 *
 * @method updateUserMetadata
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateUserMetadata', 'users.updateUserMetadata');


/**
 * Wrapper for auth0.users.updateAppMetadata()
 *
 * @method updateAppMetadata
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateAppMetadata', 'users.updateAppMetadata');


/**
 * Wrapper for auth0.users.deleteMultifactorProvider()
 *
 * @method deleteUserMultifactor
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteUserMultifcator', 'users.deleteMultifactorProvider');


/**
 * Wrapper for auth0.users.unlink()
 *
 * @method unlinkUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'unlinkUsers', 'users.unlink');


/**
 * Wrapper for auth0.users.link()
 *
 * @method linkUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'linkUsers', 'users.link');


/**
 * Wrapper for auth0.blacklistedTokens.getAll()
 *
 * @method getBlacklistedTokens
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getBlacklistedTokens', 'blacklistedTokens.getAll');


/**
 * Wrapper for auth0.blacklistedTokens.add()
 *
 * @method blacklistToken
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'blacklistToken', 'blacklistedTokens.add');


/**
 * Wrapper for auth0.emailProvider.get()
 *
 * @method getEmailProvider
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getEmailProvider', 'emailProvider.get');


/**
 * Wrapper for auth0.emailProvider.configure()
 *
 * @method configureEmailProvider
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'configureEmailProvider', 'emailProvider.configure');


/**
 * Wrapper for auth0.emailProvider.delete()
 *
 * @method deleteEmailProvider
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteEmailProvider', 'emailProvider.delete');


/**
 * Wrapper for auth0.emailProvider.update()
 *
 * @method updateEmailProvider
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateEmailProvider', 'emailProvider.update');


/**
 * Wrapper for auth0.stats.getActiveUsersCount()
 *
 * @method getActiveUsersCount
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getActiveUsersCount', 'stats.getActiveUsersCount');


/**
 * Wrapper for auth0.stats.getDaily()
 *
 * @method getDailyStats
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getDailyStats', 'stats.getDaily');


/**
 * Wrapper for auth0.tenatn.getSettings()
 *
 * @method getTenantSettings
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getTenantSettings', 'tenant.getSettings');


/**
 * Wrapper for auth0.tenant.updateSettings()
 *
 * @method updateTenantSettings
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateTenantSettings', 'tenant.updateSettings');


/**
 * Wrapper for auth0.jobs.get()
 *
 * @method getJob
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getJob', 'jobs.get');


/**
 * Wrapper for auth0.jobs.importUsers()
 *
 * @method importUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'importUsers', 'jobs.importUsers');


/**
 * Wrapper for auth0.jobs.verifyEmail()
 *
 * @method sendEmailVerification
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'sendEmailVerification', 'jobs.verifyEmail');


/**
 * Wrapper for auth0.tickets.changePassword()
 *
 * @method createPasswordChangeTicket
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createPasswordChangeTicket', 'tickets.changePassword');


/**
 * Wrapper for auth0.tickets.verifyEmail()
 *
 * @method createEmailVerificationTicket
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createEmailVerificationTicket', 'tickets.verifyEmail');


module.exports = Auth0;
