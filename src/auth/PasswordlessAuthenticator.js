var extend = require('util')._extend;

var ArgumentError = require('../exceptions').ArgumentError;
var RestClient = require('rest-facade').Client;


/**
 * @class
 * Handles authenticator with passwordless flows, e.g. SMS, Touch ID, etc.
 * @constructor
 *
 * @param  {Object}              options            Authenticator options.
 * @param  {String}              options.baseUrl    The auth0 account URL.
 * @param  {String}              [options.clientId] Default client ID.
 * @param  {OAuthAuthenticator}  oauth              OAuthAuthenticator instance.
 */
var PasswordlessAuthenticator = function (options, oauth) {
  if (!options) {
    throw new ArgumentError('Missing authenticator options');
  }

  if (typeof options !== 'object') {
    throw new ArgumentError('The authenticator options must be an object');
  }

  var baseUrl = options.baseUrl + '/passwordless/start';

  this.oauth = oauth;
  this.passwordless = new RestClient(baseUrl);
  this.clientId = options.clientId;
};


/**
 * Sign in with the given user credentials.
 *
 * @method
 * @memberOf PasswordlessAuthenticator
 *
 * @param   {Object}    userData              User credentials object.
 * @param   {String}    userData.username     Username.
 * @param   {String}    userData.password     Password.
 * @param   {String}    [userData.client_id]  Client ID.
 *
 * @return  {Promise|undefined}
 */
PasswordlessAuthenticator.prototype.signIn = function (userData, cb) {
  var defaultFields = {
    client_id: this.clientId
  };
  var data = extend(defaultFields, userData);

  // Don't let the user override the connection nor the grant type.
  data.connection = 'sms';
  data.grant_type = 'password';

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.username !== 'string'
      || data.username.trim().length === 0) {
    throw new ArgumentError('username field (phone number) is required');
  }

  if (typeof data.password !== 'string'
      || data.password.trim().length === 0) {
    throw new ArgumentError('password field (verification code) is required');
  }

  return this.oauth.signIn(data, cb);
};


/**
 * Start passwordless flow sending an email.
 *
 * @method
 * @memberOf PasswordlessAuthenticator
 *
 * @param   {Object}    userData                User account data.
 * @param   {String}    userData.email          User email address.
 * @param   {String}    userData.send           The type of email to be sent.
 *
 * @return  {Promise|undefined}
 */
PasswordlessAuthenticator.prototype.sendEmail = function (userData, cb) {
  var defaultFields = {
    client_id: this.clientId
  };
  var data = extend(defaultFields, userData);

  // Don't let the user override the connection nor the grant type.
  data.connection = 'email';

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.email !== 'string'
      || data.email.trim().length === 0) {
    throw new ArgumentError('email field is required');
  }

  if (typeof data.send !== 'string'
      || data.send.trim().length === 0) {
    throw new ArgumentError('send field is required');
  }

  if (cb && cb instanceof Function) {
    return this.passwordless.create(data, cb);
  }

  return this.passwordless.create(data);
};


/**
 * Start passwordless flow sending an SMS.
 *
 * @method
 * @memberOf PasswordlessAuthenticator
 *
 * @param   {Object}  userData                User account data.
 * @param   {String}  userData.phone_number   User phone number.
 * @param   {String}  [userData.client_id]    Client ID.
 *
 * @return  {Promise|undefined}
 */
PasswordlessAuthenticator.prototype.sendSMS = function (userData, cb) {
  var defaultFields = {
    client_id: this.clientId
  };
  var data = extend(defaultFields, userData);

  // Don't let the user override the connection nor the grant type.
  data.connection = 'sms';

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.phone_number !== 'string'
      || data.phone_number.trim().length === 0) {
    throw new ArgumentError('phone_number field is required');
  }

  if (cb && cb instanceof Function) {
    return this.passwordless.create(data, cb);
  }

  return this.passwordless.create(data);
};


module.exports = PasswordlessAuthenticator;
