var extend = require('util')._extend;

var ArgumentError = require('../exceptions').ArgumentError;
var RestClient = require('rest-facade').Client;


/**
 * @class
 * Abstracts the sign-in, sign-up and change-password processes for Database &
 * Active Directory auhtentication services.
 * @constructor
 *
 * @param  {Object}              options            Authenticator options.
 * @param  {String}              options.baseUrl    The auth0 account URL.
 * @param  {String}              [options.clientId] Default client ID.
 */
var OAuthAuthenticator = function (options) {
  if (!options) {
    throw new ArgumentError('Missing authenticator options');
  }

  if (typeof options !== 'object') {
    throw new ArgumentError('The authenticator options must be an object');
  }

  var oauthUrl = options.baseUrl + '/oauth/:type';

  this.oauth = new RestClient(oauthUrl);
  this.clientId = options.clientId;
};


/**
 * Sign in using a username and password.
 *
 * @method    signIn
 * @memberOf  OAuthAuthenticator
 *
 * @param   {Object}    userData              User credentials object.
 * @param   {String}    userData.username     Username.
 * @param   {String}    userData.password     User password.
 * @param   {String}    userData.connection   The identity provider in use.
 *
 * @return  {Promise|undefined}
 */
OAuthAuthenticator.prototype.signIn = function (userData, cb) {
  var params = {
    type: 'ro'
  };
  var defaultFields = {
    client_id: this.clientId,
    grant_type: 'password',
    scope: 'openid'
  };
  var data = extend(defaultFields, userData);

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.connection !== 'string'
      || data.connection.split().length === 0)
  {
    throw new ArgumentError('connection field is required');
  }

  if (cb && cb instanceof Function) {
    return this.oauth.create(params, data, cb);
  }

  return this.oauth.create(params, data);
};


/**
 * Sign in using a social provider access token.
 *
 * @method    socialSignIn
 * @memberOf  OAuthAuthenticator
 *
 * @param   {Object}    data                User credentials object.
 * @param   {String}    data.access_token   User access token.
 * @param   {String}    data.connection     Identity provider.
 *
 * @return  {Promise|undefined}
 */
OAuthAuthenticator.prototype.socialSignIn = function (data, cb) {
  var params = {
    type: 'access_token'
  };

  if (typeof data !== 'object') {
    throw new ArgumentError('Missing user credential objects');
  }

  if (typeof data.access_token !== 'string'
      || data.access_token.trim().length === 0) {
    throw new ArgumentError('access_token field is required');
  }

  if (typeof data.connection !== 'string'
      || data.connection.trim().length === 0) {
    throw new ArgumentError('connection field is required');
  }

  if (cb && cb instanceof Function) {
    return this.oauth.create(params, data, cb);
  }

  return this.oauth.create(params, data);
};


module.exports = OAuthAuthenticator;
