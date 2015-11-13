var util = require('util');
var utils = require('./utils');
var constants = require('./constants');
var BASE_URL_FORMAT = 'https://%s/api/v2';
var ArgumentError = require('./exceptions').ArgumentError;

var ClientsManager = require('./ClientsManager');
var UsersManager = require('./UsersManager');
var ConnectionsManager = require('./ConnectionsManager');
var BlacklistedTokensManager = require('./BlacklistedTokensManager');
var RulesManager = require('./RulesManager');
var DeviceCredentialsManager = require('./DeviceCredentialsManager');
var EmailProviderManager = require('./EmailProviderManager');

/**
 * @class
 * Auth0 module.
 * @constructor
 *
 * @param   {Object}  options           Options for the Auth0 SDK.
 * @param   {String}  options.token     API access token.
 * @param   {String}  [options.domain]  Auth0 server domain.
 * @param   {String}  [options.region]  Auth0 server region.
 */
var Auth0 = function (options) {
  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Auth0 SDK options must be an object');
  }

  if (!options.token || options.token.length === 0){
    throw new ArgumentError('An access token must be provided');
  }

  if (options.domain && options.region){
    throw new ArgumentError('Cannot provide both region and domain');
  }

  /**
   * Auth0 servers region. If not provided, defaults to US.
   *
   * @property {String} region
   */
  this.region = (options.region || constants.DEFAULT_REGION).toLowerCase();

  /**
   * Auth0 domain being used (depends on the region).
   *
   * @type {String}
   */
  this.domain = options.domain || constants.DOMAINS_BY_REGION[this.region]

  /**
   * Access token provided by the user.
   *
   * @type {String}
   */
  this.accessToken = options.token;

  /**
   * URL of the API being consumed.
   *
   * @type {String}
   */
  this.baseUrl = util.format(BASE_URL_FORMAT, this.domain);

  if (!this.domain){
    var regions = Object.keys(constants.DOMAINS_BY_REGION);

    throw new ArgumentError(
      'The region is invalid, valid values are any of: "' +
      regions.join('","') + '"'
    );
  }

  this.clients = new ClientsManager(this);
  this.users = new UsersManager(this);
  this.client = new ConnectionsManager(this);
  this.deviceCredentials = new DeviceCredentialsManager(this);
  this.rules = new RulesManager(this);
  this.blacklistedTokens = new BlacklistedTokensManager(this);
  this.emailProvider = new EmailProviderManager(this);
};

/**
 * Wrapper for auth0.connections.getAll()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getConnections', 'connections.getAll');

/**
 * Wrapper for auth0.connections.create()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createConnection', 'connections.create');

/**
 * Wrapper for auth0.connections.get()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getConnection', 'connections.get');

/**
 * Wrapper for auth0.connections.delete()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteConnection', 'connections.delete');

/**
 * Wrapper for auth0.connections.update()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateConnection', 'connections.update');

/**
 * Wrapper for auth0.clients.getAll()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getClients', 'clients.getAll');

/**
 * Wrapper for auth0.clients.get()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getClient', 'clients.get');

/**
 * Wrapper for auth0.clients.create()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createClient', 'clients.create');

/**
 * Wrapper for auth0.clients.update()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateClient', 'clients.update');

/**
 * Wrapper for auth0.clients.delete()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteClient', 'clients.delete');


/**
 * Wrapper for auth0.deviceCredentials.createPubicKey()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createDevicePublicKey', 'deviceCredentials.createPublicKey');


/**
 * Wrapper for auth0.deviceCredentials.getAll()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getDeviceCredentials', 'deviceCredentials.getAll');


/**
 * Wrapper for auth0.deviceCredentials.delete()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteDeviceCredential', 'deviceCredentials.delete');


/**
 * Wrapper for auth0.rules.getAll()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getRules', 'rules.getAll');


/**
 * Wrapper for auth0.rules.create()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createRule', 'rules.create');

/**
 * Wrapper for auth0.rules.get()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getRule', 'rules.get');

/**
 * Wrapper for auth0.rules.delete()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteRule', 'rules.delete');

/**
 * Wrapper for auth0.rules.update()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateRule', 'rules.update');

/**
 * Wrapper for auth0.users.getAll()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getUsers', 'users.getAll');

/**
 * Wrapper for auth0.users.get()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getUser', 'users.get');

/**
 * Wrapper for auth0.users.deleteAll()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteAllUsers', 'users.deleteAll');

/**
 * Wrapper for auth0.users.delete()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteUser', 'users.delete');

/**
 * Wrapper for auth0.users.create()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'createUser', 'users.create');

/**
 * Wrapper for auth0.users.update()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateUser', 'users.update');

/**
 * Wrapper for auth0.blacklistedTokens.getAll()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getBlacklistedTokens', 'blacklistedTokens.getAll');

/**
 * Wrapper for auth0.blacklistedTokens.add()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'blacklistToken', 'blacklistedTokens.add');

/**
 * Wrapper for auth0.emailProvider.get()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'getEmailProvider', 'emailProvider.get');

/**
 * Wrapper for auth0.emailProvider.configure()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'configureEmailProvider', 'emailProvider.configure');

/**
 * Wrapper for auth0.emailProvider.delete()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'deleteEmailProvider', 'emailProvider.delete');

/**
 * Wrapper for auth0.emailProvider.update()
 *
 * @method
 * @memberOf Auth0
 */
utils.wrapPropertyMethod(Auth0, 'updateEmailProvider', 'emailProvider.update');


module.exports = Auth0;
