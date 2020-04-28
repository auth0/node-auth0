var extend = require('util')._extend;
var sanitizeArguments = require('../utils').sanitizeArguments;

var ArgumentError = require('rest-facade').ArgumentError;
var RestClient = require('rest-facade').Client;

var SanitizedError = require('../errors').SanitizedError;
var OAUthWithIDTokenValidation = require('./OAUthWithIDTokenValidation');

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
 * Abstracts the sign-in, sign-up and change-password processes for Database &
 * Active Directory authentication services.
 * @constructor
 * @memberOf module:auth
 *
 * @param  {Object}              options                             Authenticator options.
 * @param  {String}              options.baseUrl                     The Auth0 account URL.
 * @param  {String}              options.domain                      AuthenticationClient server domain
 * @param  {String}              [options.clientId]                  Default client ID.
 * @param  {String}              [options.clientSecret]              Default client Secret.
 * @param  {Boolean}             [options.__bypassIdTokenValidation] Whether the id_token should be validated or not
 */
var OAuthAuthenticator = function(options) {
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
    errorCustomizer: SanitizedError,
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers
  };

  this.oauth = new RestClient(options.baseUrl + '/oauth/:type', clientOptions);
  this.oauthWithIDTokenValidation = new OAUthWithIDTokenValidation(this.oauth, options);
  this.clientId = options.clientId;
  this.clientSecret = options.clientSecret;
};

/**
 * Sign in using a username and password.
 *
 * @method    signIn
 * @memberOf  module:auth.OAuthAuthenticator.prototype
 *
 * @example <caption>
 *   Given the user's credentials and the connection specified, it
 *   will return a JSON with the access_token and id_token.
 *   More information in the
 *   <a href="https://auth0.com/docs/api/authentication#database-ad-ldap-active-">
 *     API Docs
 *   </a>.
 * </caption>
 *
 * var data = {
 *   client_id: '{CLIENT_ID}',  // Optional field.
 *   username: '{USERNAME}',
 *   password: '{PASSWORD}',
 *   connection: '{CONNECTION_NAME}',
 *   scope: 'openid'  // Optional field.
 * };
 *
 * auth0.oauth.signIn(data, function (err, userData) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(userData);
 * });
 *
 * @param   {Object}    userData               User credentials object.
 * @param   {String}    userData.username      Username.
 * @param   {String}    userData.password      User password.
 * @param   {String}    userData.connection    The identity provider in use.
 * @param   {Object}    [options]              Additional options.
 * @param   {String}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
 *
 * @return  {Promise|undefined}
 */
OAuthAuthenticator.prototype.signIn = function(userData, options, cb) {
  var { options, cb } = sanitizeArguments(options, cb);
  var defaultParams = {
    type: 'ro'
  };
  var params = extend(defaultParams, getParamsFromOptions(options));
  var defaultFields = {
    client_id: this.clientId,
    grant_type: 'password',
    scope: 'openid'
  };
  var data = extend(defaultFields, userData);

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.connection !== 'string' || data.connection.split().length === 0) {
    throw new ArgumentError('connection field is required');
  }

  if (cb && cb instanceof Function) {
    return this.oauthWithIDTokenValidation.create(params, data, cb);
  }

  return this.oauthWithIDTokenValidation.create(params, data);
};

/**
 * Sign in using a username and password
 *
 * @method    passwordGrant
 * @memberOf  module:auth.OAuthAuthenticator.prototype
 *
 * @example <caption>
 *   Given the user's credentials perform the OAuth password grant
 *   or Password Realm grant if a realm is provided,
 *   it will return a JSON with the access_token and id_token.
 *   More information in the
 *   <a href="https://auth0.com/docs/api/authentication#resource-owner-password">
 *     API Docs
 *   </a>.
 * </caption>
 *
 * var data = {
 *   client_id: '{CLIENT_ID}',  // Optional field.
 *   username: '{USERNAME}',
 *   password: '{PASSWORD}',
 *   realm: '{CONNECTION_NAME}', // Optional field.
 *   scope: 'openid'  // Optional field.
 * };
 *
 * auth0.oauth.passwordGrant(data, function (err, userData) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(userData);
 * });
 *
 * @param   {Object}    userData               User credentials object.
 * @param   {String}    userData.username      Username.
 * @param   {String}    userData.password      User password.
 * @param   {String}    [userData.realm]       Name of the realm to use to authenticate or the connection name
 * @param   {Object}    [options]              Additional options.
 * @param   {String}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
 *
 * @return  {Promise|undefined}
 */
OAuthAuthenticator.prototype.passwordGrant = function(userData, options, cb) {
  var { options, cb } = sanitizeArguments(options, cb);
  var defaultParams = {
    type: 'token'
  };
  var params = extend(defaultParams, getParamsFromOptions(options));
  var defaultFields = {
    client_id: this.clientId,
    client_secret: this.clientSecret,
    grant_type: 'password'
  };
  var data = extend(defaultFields, userData);

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.username !== 'string' || data.username.split().length === 0) {
    throw new ArgumentError('username field is required');
  }

  if (typeof data.password !== 'string' || data.password.split().length === 0) {
    throw new ArgumentError('password field is required');
  }

  if (typeof data.realm === 'string' && data.realm.split().length !== 0) {
    data.grant_type = 'http://auth0.com/oauth/grant-type/password-realm';
  }

  if (cb && cb instanceof Function) {
    return this.oauthWithIDTokenValidation.create(params, data, cb);
  }

  return this.oauthWithIDTokenValidation.create(params, data);
};

/**
 * Exchange a refresh token
 *
 * @method    refreshToken
 * @memberOf  module:auth.OAuthAuthenticator.prototype
 *
 * @example <caption>
 *   Given a refresh token from a previous authentication request
 *   it will return a JSON with the access_token and id_token if
 *   the openid scope was originally included.
 *   More information in the
 *   <a href="https://auth0.com/docs/api/authentication#refresh-token">
 *     API Docs
 *   </a>.
 * </caption>
 *
 * var data = {
 *   refresh_token: '{REFRESH_TOKEN}',
 * };
 *
 * auth0.oauth.refreshToken(data, function (err, data) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(data);
 * });
 *
 * @param   {Object}    data                Data object.
 * @param   {String}    data.refresh_token  Refresh token.
 *
 * @return  {Promise|undefined}
 */
OAuthAuthenticator.prototype.refreshToken = function(data, cb) {
  if (!data || typeof data !== 'object') {
    throw new ArgumentError('Missing data object');
  }

  var defaultFields = {
    client_id: this.clientId,
    client_secret: this.clientSecret,
    grant_type: 'refresh_token'
  };

  var data = extend(defaultFields, data);
  if (typeof data.refresh_token !== 'string' || data.refresh_token.split().length === 0) {
    throw new ArgumentError('refresh_token is required');
  }

  var params = {
    type: 'token'
  };

  if (cb && cb instanceof Function) {
    return this.oauth.create(params, data, cb);
  }
  return this.oauth.create(params, data);
};

/**
 * Sign in using a social provider access token.
 *
 * @method    socialSignIn
 * @memberOf  module:auth.OAuthAuthenticator.prototype
 *
 * @param   {Object}    data                User credentials object.
 * @param   {String}    data.access_token   User access token.
 * @param   {String}    data.connection     Identity provider.
 *
 * @return  {Promise|undefined}
 */
OAuthAuthenticator.prototype.socialSignIn = function(data, cb) {
  var params = {
    type: 'access_token'
  };

  if (typeof data !== 'object') {
    throw new ArgumentError('Missing user credential objects');
  }

  if (typeof data.access_token !== 'string' || data.access_token.trim().length === 0) {
    throw new ArgumentError('access_token field is required');
  }

  if (typeof data.connection !== 'string' || data.connection.trim().length === 0) {
    throw new ArgumentError('connection field is required');
  }

  if (cb && cb instanceof Function) {
    return this.oauth.create(params, data, cb);
  }

  return this.oauth.create(params, data);
};

OAuthAuthenticator.prototype.clientCredentialsGrant = function(options, cb) {
  var params = {
    type: 'token'
  };

  var defaultFields = {
    grant_type: 'client_credentials',
    client_id: this.clientId,
    client_secret: this.clientSecret
  };

  var data = extend(defaultFields, options);

  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Missing options object');
  }

  if (!data.client_id || data.client_id.trim().length === 0) {
    throw new ArgumentError('client_id field is required');
  }

  if (!data.client_secret || data.client_secret.trim().length === 0) {
    throw new ArgumentError('client_secret field is required');
  }

  if (cb && cb instanceof Function) {
    return this.oauth.create(params, data, cb);
  }

  return this.oauth.create(params, data);
};

/**
 * Sign in using an authorization code
 *
 * @method    authorizationCodeGrant
 * @memberOf  module:auth.OAuthAuthenticator.prototype
 *
 * @example <caption>
 *   Given the code returned in the URL params after the redirect
 *   from successful authentication, exchange the code for auth0
 *   credentials. It will return JSON with the access_token and id_token.
 *   More information in the
 *   <a href="https://auth0.com/docs/api/authentication#authorization-code-grant">
 *     API Docs
 *   </a>.
 * </caption>
 *
 * var data = {
 *   code: '{CODE}',
 *   redirect_uri: '{REDIRECT_URI}',
 *   client_id: '{CLIENT_ID}',  // Optional field.
 *   client_secret: '{CLIENT_SECRET}',  // Optional field.
 * };
 *
 * auth0.oauth.authorizationCodeGrant(data, function (err, userData) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(userData);
 * });
 *
 * @param   {Object}    data                  Authorization code payload
 * @param   {String}    userData.code         Code in URL returned after authentication
 * @param   {String}    userData.redirect_uri The URL to which Auth0 will redirect the browser after authorization has been granted by the user.
 *
 * @return  {Promise|undefined}
 */
OAuthAuthenticator.prototype.authorizationCodeGrant = function(options, cb) {
  var params = {
    type: 'token'
  };

  var defaultFields = {
    grant_type: 'authorization_code',
    client_id: this.clientId,
    client_secret: this.clientSecret
  };

  var data = extend(defaultFields, options);

  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Missing options object');
  }

  if (!data.code || data.code.trim().length === 0) {
    throw new ArgumentError('code field is required');
  }

  if (!data.redirect_uri || data.redirect_uri.trim().length === 0) {
    throw new ArgumentError('redirect_uri field is required');
  }

  if (cb && cb instanceof Function) {
    return this.oauthWithIDTokenValidation.create(params, data, cb);
  }

  return this.oauthWithIDTokenValidation.create(params, data);
};

module.exports = OAuthAuthenticator;
