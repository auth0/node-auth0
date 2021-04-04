var extend = require('util')._extend;

var ArgumentError = require('rest-facade').ArgumentError;
var RestClient = require('rest-facade').Client;
var sanitizeArguments = require('../utils').sanitizeArguments;

function getParamsFromOptions(options) {
  const params = {};
  if (!options || typeof options !== 'object') {
    return params;
  }
  if (options.forwardedFor) {
    params._requestCustomizer = function(req) {
      req.set('auth0-forwarded-for', options.forwardedFor);
    };
  }
  return params;
}

/**
 * @class
 * Handles authenticator with passwordless flows, e.g. SMS, Touch ID, etc.
 * @constructor
 * @memberOf module:auth
 *
 * @param  {Object}              options            Authenticator options.
 * @param  {String}              options.baseUrl    The auth0 account URL.
 * @param  {String}              [options.clientId] Default client ID.
 * @param  {String}              [options.clientSecret] Default client secret.
 * @param  {OAuthAuthenticator}  oauth              OAuthAuthenticator instance.
 */
var PasswordlessAuthenticator = function(options, oauth) {
  if (!options) {
    throw new ArgumentError('Missing authenticator options');
  }

  if (typeof options !== 'object') {
    throw new ArgumentError('The authenticator options must be an object');
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers
  };

  this.oauth = oauth;
  this.passwordless = new RestClient(options.baseUrl + '/passwordless/start', clientOptions);
  this.clientId = options.clientId;
  this.clientSecret = options.clientSecret;
};

/**
 * Sign in with the given user credentials.
 *
 * @method    signIn
 * @memberOf  module:auth.PasswordlessAuthenticator.prototype
 * @example <caption>
 * Once you have a verification code, use this endpoint to login
 * the user with their phone number/email and verification code.
 *
 * https://auth0.com/docs/api/authentication#authenticate-user
 * </caption>
 *
 * var data = {
 *   username: '{PHONE_NUMBER OR EMAIL}',
 *   otp: '{VERIFICATION_CODE}',
 *   realm: '{sms or email}' // OPTIONAL DEFAULTS TO SMS
 * };
 *
 * auth0.passwordless.signIn(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @example <caption>
 *   The user data object has the following structure.
 * </caption>
 *
 * {
 *   id_token: String,
 *   access_token: String,
 *   token_type: String
 * }
 *
 * @example <caption>
 *  LEGACY signIn using the `/oauth/ro` endpoint. When otp is not specified
 *  password is required. Given the user credentials (`phone_number` and `code`),
 *  it will do the authentication on the provider and return a JSON with
 *  the `access_token` and `id_token`.
 *
 * https://auth0.com/docs/api/authentication#resource-owner
 * </caption>
 *
 * var data = {
 *   username: '{PHONE_NUMBER}',
 *   password: '{VERIFICATION_CODE}'
 * };
 *
 * auth0.passwordless.signIn(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    userData              User credentials object.
 * @param   {String}    userData.username     The user's phone number if realm=sms, or the user's email if realm=email
 * @param   {String}    userData.otp        The user's verification code. Required
 * @param   {String}    [userData.realm=sms]  Realm string: "sms" or "email".
 * @param   {String}    [userData.password]     [DEPRECATED] Password required if using legacy /oauth/ro endpoint
 * @param   {String}    [userData.connection=sms] [DEPRECATED] Connection string: "sms" or "email".
 * @param   {Object}    [options]              Additional options.
 * @param   {String}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
 * @param   {Function}  [cb]                  Method callback.
 *
 * @return  {Promise|undefined}
 */
PasswordlessAuthenticator.prototype.signIn = function(userData, options, cb) {
  var { options, cb } = sanitizeArguments(options, cb);
  var defaultFields = {
    client_id: this.clientId,
    client_secret: this.clientSecret
  };
  var data = extend(defaultFields, userData);

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.username !== 'string' || data.username.trim().length === 0) {
    throw new ArgumentError('username field (phone number) is required');
  }

  // If otp is provided, attempt to sign in using otp grant
  if (typeof data.otp === 'string' && data.otp.trim().length > 0) {
    if (!data.realm || (data.realm !== 'email' && data.realm !== 'sms')) {
      data.realm = 'sms';
    }
    data.grant_type = 'http://auth0.com/oauth/grant-type/passwordless/otp';
    return this.oauth.signIn(data, extend({ type: 'token' }, options), cb);
  }

  // Don't let the user override the connection nor the grant type.
  if (!data.connection || (data.connection !== 'email' && data.connection !== 'sms')) {
    data.connection = 'sms';
  }
  data.grant_type = 'password';

  if (typeof data.password !== 'string' || data.password.trim().length === 0) {
    throw new ArgumentError('password field (verification code) is required');
  }

  console.warn(
    'The oauth/ro endpoint has been deprecated. Please use the realm and otp parameters in this function.'
  );
  return this.oauth.signIn(data, options, cb);
};

/**
 * Start passwordless flow sending an email.
 *
 * @method    sendEmail
 * @memberOf  module:auth.PasswordlessAuthenticator.prototype
 * @example <caption>
 *   Given the user `email` address, it will send an email with:
 *
 *   <ul>
 *     <li>A link (default, `send:"link"`). You can then authenticate with this
 *       user opening the link and he will be automatically logged in to the
 *       application. Optionally, you can append/override parameters to the link
 *       (like `scope`, `redirect_uri`, `protocol`, `response_type`, etc.) using
 *       `authParams` object.
 *     </li>
 *     <li>
 *       A verification code (`send:"code"`). You can then authenticate with
 *       this user using the `/oauth/ro` endpoint specifying `email` as
 *       `username` and `code` as `password`.
 *     </li>
 *   </ul>
 *
 *   Find more information in the
 *   <a href="https://auth0.com/docs/auth-api#!#post--with_email">API Docs</a>
 * </caption>
 *
 * var data = {
 *   email: '{EMAIL}',
 *   send: 'link',
 *   authParams: {} // Optional auth params.
 * };
 *
 * auth0.passwordless.sendEmail(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    userData                User account data.
 * @param   {String}    userData.email          User email address.
 * @param   {String}    userData.send           The type of email to be sent.
 * @param   {Object}    [options]              Additional options.
 * @param   {String}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
 * @param   {Function}  [cb]                    Method callback.
 *
 * @return  {Promise|undefined}
 */
PasswordlessAuthenticator.prototype.sendEmail = function(userData, options, cb) {
  var { options, cb } = sanitizeArguments(options, cb);
  var defaultFields = {
    client_id: this.clientId,
    client_secret: this.clientSecret
  };
  var params = getParamsFromOptions(options);
  var data = extend(defaultFields, userData);

  // Don't let the user override the connection nor the grant type.
  data.connection = 'email';

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.email !== 'string' || data.email.trim().length === 0) {
    throw new ArgumentError('email field is required');
  }

  if (typeof data.send !== 'string' || data.send.trim().length === 0) {
    throw new ArgumentError('send field is required');
  }

  if (cb && cb instanceof Function) {
    return this.passwordless.create(params, data, cb);
  }

  return this.passwordless.create(params, data);
};

/**
 * Start passwordless flow sending an SMS.
 *
 * @method    sendSMS
 * @memberOf  module:auth.PasswordlessAuthenticator.prototype
 *
 * @example <caption>
 *   Given the user `phone_number`, it will send a SMS message with a
 *   verification code. You can then authenticate with this user using the
 *   `/oauth/ro` endpoint specifying `phone_number` as `username` and `code` as
 *   `password`:
 * </caption>
 *
 * var data = {
 *   phone_number: '{PHONE}'
 * };
 *
 * auth0.passwordless.sendSMS(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    userData                User account data.
 * @param   {String}    userData.phone_number   User phone number.
 * @param   {Object}    [options]              Additional options.
 * @param   {String}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
 * @param   {Function}  [cb]                    Method callback.
 *
 * @return  {Promise|undefined}
 */
PasswordlessAuthenticator.prototype.sendSMS = function(userData, options, cb) {
  var { options, cb } = sanitizeArguments(options, cb);
  var defaultFields = {
    client_id: this.clientId,
    client_secret: this.clientSecret
  };
  var params = getParamsFromOptions(options);
  var data = extend(defaultFields, userData);

  // Don't let the user override the connection nor the grant type.
  data.connection = 'sms';

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.phone_number !== 'string' || data.phone_number.trim().length === 0) {
    throw new ArgumentError('phone_number field is required');
  }

  if (cb && cb instanceof Function) {
    return this.passwordless.create(params, data, cb);
  }

  return this.passwordless.create(params, data);
};

module.exports = PasswordlessAuthenticator;
