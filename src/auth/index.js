var util = require('util');

var pkg = require('../../package.json');
var utils = require('../utils');
var jsonToBase64 = utils.jsonToBase64;
var ArgumentError = require('../exceptions').ArgumentError;

// Authenticators.
var OAuthAuthenticator = require('./OAuthAuthenticator');
var DatabaseAuthenticator = require('./DatabaseAuthenticator');
var PasswordlessAuthenticator = require('./PasswordlessAuthenticator');

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

  if (!options.token || options.token.length === 0) {
    throw new ArgumentError('An access token must be provided');
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


module.exports = AuthenticationClient;
