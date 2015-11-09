var util = require('util');
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
  this.connections = new ConnectionsManager(this);
  this.deviceCredentials = new DeviceCredentialsManager(this);
  this.rules = new RulesManager(this);
  this.blacklistedTokens = new BlacklistedTokensManager(this);
  this.emailProvider = new EmailProviderManager(this);
};


module.exports = Auth0;
