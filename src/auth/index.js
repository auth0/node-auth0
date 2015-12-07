var util = require('util');

var pkg = require('../../package.json');
var utils = require('../utils');
var jsonToBase64 = utils.jsonToBase64;
var ArgumentError = require('../exceptions').ArgumentError;

// Authenticators.
var OAuthAuthenticator = require('./OAuthAuthenticator');
var DatabaseAuthenticator = require('./DatabaseAuthenticator');
var PasswordlessAuthenticator = require('./PasswordlessAuthenticator');

// Managers
var UsersManager = require('./UsersManager');
var TokensManager = require('./TokensManager');

var BASE_URL_FORMAT = 'https://%s';


/**
 * @class
 * Authentication Client SDK module.
 * @constructor
 *
 * @param   {Object}  options           Options for the Authentication Client SDK.
 * @param   {String}  options.clientId  Client ID.
 * @param   {String}  [options.domain]  AuthenticationClient server domain.
 */
var AuthenticationClient = function (options) {
  if (!options || typeof options !== 'object') {
    throw new ArgumentError(
      'Authentication Client SDK options must be an object'
    );
  }

  if (!options.domain || options.domain.length === 0) {
    throw new ArgumentError('Must provide a domain');
  }

  var managerOptions = {
    clientId: options.clientId,
    headers: {
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

  /**
   * Users manager.
   *
   * @type {UsersManager}
   */
  this.users = new UsersManager(managerOptions);

  /**
   * Tokens manager.
   *
   * @type {TokensManager}
   */
  this.tokens = new TokensManager(managerOptions);
};


/**
 * Return an object with information about the current client,
 *
 * @method
 * @memberOf AuthenticationClient
 *
 * @return {Object}   Object containing client information.
 */
AuthenticationClient.prototype.getClientInfo = function () {
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
 * Binding for auth0.passwordless.sendEmail().
 *
 * @method
 * @memberOf AuthenticationClient
 */
AuthenticationClient.prototype.requestMagicLink = function (data, cb) {
  data.send = 'link';

  return this.passwordless.sendEmail(data, cb);
};


/**
 * Binding for auth0.passwordless.sendEmail().
 *
 * @method
 * @memberOf AuthenticationClient
 */
AuthenticationClient.prototype.requestEmailCode = function (data, cb) {
  data.send = 'code';

  return this.passwordless.sendEmail(data, cb);
};


/**
 * Binding for auth0.passwordless.sendSMS().
 *
 * @method
 * @memberOf AuthenticationClient
 */
AuthenticationClient.prototype.requestSMSCode = function (data, cb) {
  var translatedData = {
    phone_number: data.phoneNumber || data.phone_number
  };

  return this.passwordless.sendSMS(translatedData, cb);
};


/**
 * Binding for auth0.passwordless.login().
 *
 * @method
 * @memberOf AuthenticationClient
 */
AuthenticationClient.prototype.verifySMSCode = function (data, cb) {
  var translatedData = {
    username: data.phoneNumber || data.phone_number || data.username,
    password: data.code || data.password
  };

  return this.passwordless.signIn(translatedData, cb);
};


/**
 * Binding for auth0.tokens.getDelegationToken().
 *
 * @method
 * @memberOf AuthenticationClient
 */
AuthenticationClient.prototype.getDelegationToken = function (data, cb) {
  var translatedData = {
    id_token: data.id_token,
    api_type: data.api || data.api_type,
    scope: data.scope,
    target: data.targetClientId || data.target
  };

  return this.tokens.getDelegationToken(translatedData, cb);
};


/**
 * Binding for auth0.database.changePassword().
 *
 * @method
 * @memberOf AuthenticationClient
 */
AuthenticationClient.prototype.changePassword = function (data, cb) {
  var translatedData = {
    connection: data.connection,
    email: data.email || data.username,
    password: data.password
  };

  return this.database.changePassword(data, cb);
};


/**
 * Binding for auth0.users.getInfo().
 *
 * @method getProfile
 * @memberOf AuthenticationClient
 */
utils.wrapPropertyMethod(AuthenticationClient, 'getProfile', 'users.getInfo');


module.exports = AuthenticationClient;
