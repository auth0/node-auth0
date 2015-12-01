var util = require('util');

var pkg = require('../package.json');
var utils = require('./utils');
var jsonToBase64 = utils.jsonToBase64;
var ArgumentError = require('./exceptions').ArgumentError;

// Managers.
var ClientsManager = require('./management/ClientsManager');
var UsersManager = require('./management/UsersManager');
var ConnectionsManager = require('./management/ConnectionsManager');
var BlacklistedTokensManager = require('./management/BlacklistedTokensManager');
var RulesManager = require('./management/RulesManager');
var DeviceCredentialsManager = require('./management/DeviceCredentialsManager');
var EmailProviderManager = require('./management/EmailProviderManager');
var StatsManager = require('./management/StatsManager');
var TenantManager = require('./management/TenantManager');
var JobsManager = require('./management/JobsManager');
var TicketsManager = require('./management/TicketsManager');

// Authenticators.
var OAuthAuthenticator = require('./auth/OAuthAuthenticator');
var DatabaseAuthenticator = require('./auth/DatabaseAuthenticator');
var PasswordlessAuthenticator = require('./auth/PasswordlessAuthenticator');

var BASE_URL_FORMAT = 'https://%s/api/v2';


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
    clientId: options.clientId,
    domain: options.domain,
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

  /**
   * OAuth authenticator.
   *
   * @type {OAuthAuthenticator}
   */
  this.oauth = new OAuthAuthenticator(managerOptions);

  /**
   * Database authenticator.
   *
   * @type {DatabaseAuthenticator}
   */
  this.database = new DatabaseAuthenticator(managerOptions, this.oauth);

  /**
   * Passwordless authenticator.
   *
   * @type {PasswordlessAuthenticator}
   */
  this.passwordless = new PasswordlessAuthenticator(managerOptions, this.oauth);
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
 * Binding for auth0.connections.getAll()
 *
 * @method getConnections
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getConnections', 'connections.getAll');


/**
 * Binding for auth0.connections.create()
 *
 * @method createConnection
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createConnection', 'connections.create');


/**
 * Binding for auth0.connections.get()
 *
 * @method getConnection
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getConnection', 'connections.get');


/**
 * Binding for auth0.connections.delete()
 *
 * @method deleteConnection
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteConnection', 'connections.delete');


/**
 * Binding for auth0.connections.update()
 *
 * @method updateConnection
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateConnection', 'connections.update');


/**
 * Binding for auth0.clients.getAll()
 *
 * @method getClients
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getClients', 'clients.getAll');


/**
 * Binding for auth0.clients.get()
 *
 * @method getClient
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getClient', 'clients.get');


/**
 * Binding for auth0.clients.create()
 *
 * @method createClient
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createClient', 'clients.create');


/**
 * Binding for auth0.clients.update()
 *
 * @method updateClient
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateClient', 'clients.update');


/**
 * Binding for auth0.clients.delete()
 *
 * @method deleteClient
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteClient', 'clients.delete');


/**
 * Binding for auth0.deviceCredentials.createPubicKey()
 *
 * @method createDevicePublicKey
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createDevicePublicKey', 'deviceCredentials.createPublicKey');


/**
 * Binding for auth0.deviceCredentials.getAll()
 *
 * @method getDeviceCredentials
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getDeviceCredentials', 'deviceCredentials.getAll');


/**
 * Binding for auth0.deviceCredentials.delete()
 *
 * @method deleteDeviceCredential
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteDeviceCredential', 'deviceCredentials.delete');


/**
 * Binding for auth0.rules.getAll()
 *
 * @method getRules
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getRules', 'rules.getAll');


/**
 * Binding for auth0.rules.create()
 *
 * @method createRules
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createRule', 'rules.create');


/**
 * Binding for auth0.rules.get()
 *
 * @method getRule
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getRule', 'rules.get');


/**
 * Binding for auth0.rules.delete()
 *
 * @method deleteRule
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteRule', 'rules.delete');


/**
 * Binding for auth0.rules.update()
 *
 * @method updateRule
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateRule', 'rules.update');


/**
 * Binding for auth0.users.getAll()
 *
 * @method getUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getUsers', 'users.getAll');


/**
 * Binding for auth0.users.get()
 *
 * @method getUser
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getUser', 'users.get');


/**
 * Binding for auth0.users.deleteAll()
 *
 * @method deleteAllUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteAllUsers', 'users.deleteAll');


/**
 * Binding for auth0.users.delete()
 *
 * @method deleteUser
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteUser', 'users.delete');


/**
 * Binding for auth0.users.create()
 *
 * @method createUser
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createUser', 'users.create');


/**
 * Binding for auth0.users.update()
 *
 * @method updateUser
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateUser', 'users.update');


/**
 * Binding for auth0.users.updateUserMetadata()
 *
 * @method updateUserMetadata
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateUserMetadata', 'users.updateUserMetadata');


/**
 * Binding for auth0.users.updateAppMetadata()
 *
 * @method updateAppMetadata
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateAppMetadata', 'users.updateAppMetadata');


/**
 * Binding for auth0.users.deleteMultifactorProvider()
 *
 * @method deleteUserMultifactor
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteUserMultifcator', 'users.deleteMultifactorProvider');


/**
 * Binding for auth0.users.unlink()
 *
 * @method unlinkUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'unlinkUsers', 'users.unlink');


/**
 * Binding for auth0.users.link()
 *
 * @method linkUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'linkUsers', 'users.link');


/**
 * Binding for auth0.blacklistedTokens.getAll()
 *
 * @method getBlacklistedTokens
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getBlacklistedTokens', 'blacklistedTokens.getAll');


/**
 * Binding for auth0.blacklistedTokens.add()
 *
 * @method blacklistToken
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'blacklistToken', 'blacklistedTokens.add');


/**
 * Binding for auth0.emailProvider.get()
 *
 * @method getEmailProvider
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getEmailProvider', 'emailProvider.get');


/**
 * Binding for auth0.emailProvider.configure()
 *
 * @method configureEmailProvider
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'configureEmailProvider', 'emailProvider.configure');


/**
 * Binding for auth0.emailProvider.delete()
 *
 * @method deleteEmailProvider
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteEmailProvider', 'emailProvider.delete');


/**
 * Binding for auth0.emailProvider.update()
 *
 * @method updateEmailProvider
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateEmailProvider', 'emailProvider.update');


/**
 * Binding for auth0.stats.getActiveUsersCount()
 *
 * @method getActiveUsersCount
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getActiveUsersCount', 'stats.getActiveUsersCount');


/**
 * Binding for auth0.stats.getDaily()
 *
 * @method getDailyStats
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getDailyStats', 'stats.getDaily');


/**
 * Binding for auth0.tenatn.getSettings()
 *
 * @method getTenantSettings
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getTenantSettings', 'tenant.getSettings');


/**
 * Binding for auth0.tenant.updateSettings()
 *
 * @method updateTenantSettings
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateTenantSettings', 'tenant.updateSettings');


/**
 * Binding for auth0.jobs.get()
 *
 * @method getJob
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getJob', 'jobs.get');


/**
 * Binding for auth0.jobs.importUsers()
 *
 * @method importUsers
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'importUsers', 'jobs.importUsers');


/**
 * Binding for auth0.jobs.verifyEmail()
 *
 * @method sendEmailVerification
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'sendEmailVerification', 'jobs.verifyEmail');


/**
 * Binding for auth0.tickets.changePassword()
 *
 * @method createPasswordChangeTicket
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createPasswordChangeTicket', 'tickets.changePassword');


/**
 * Binding for auth0.tickets.verifyEmail()
 *
 * @method createEmailVerificationTicket
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createEmailVerificationTicket', 'tickets.verifyEmail');


module.exports = Auth0;
