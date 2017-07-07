/** @module auth **/

var util = require('util');

var pkg = require('../../package.json');
var utils = require('../utils');
var jsonToBase64 = utils.jsonToBase64;
var ArgumentError = require('rest-facade').ArgumentError;

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
 * Authentication API SDK.
 *
 * This client must used to access Auth0's
 * <a href="https://auth0.com/docs/auth-api">Authentication API</a>.
 * @constructor
 * @memberOf module:auth
 *
 * @example <caption>
 *   The <b>AuthenticationClient</b> constructor takes an <i>optional</i> client
 *   ID, if specified it will be used as default value for all endpoints that
 *   accept a client ID.
 * </caption>
 *
 * var AuthenticationClient = require('auth0'). AuthenticationClient;
 * var auth0 = new AuthenticationClient({
 *   domain: '{YOUR_ACCOUNT}.auth0.com',
 *   clientId: '{OPTIONAL_CLIENT_ID}'
 * });
 *
 * @param   {Object}  options                 Options for the Authentication Client
 *                                            SDK.
 * @param   {String}  options.domain          AuthenticationClient server domain.
 * @param   {String}  [options.clientId]      Default client ID.
 * @param   {String}  [options.clientSecret]  Default client Secret.
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
    domain: options.domain,
    clientSecret: options.clientSecret,
    headers: {
      'User-agent': 'node.js/' + process.version.replace('v', ''),
      'Content-Type': 'application/json'
    },
    baseUrl: util.format(BASE_URL_FORMAT, options.domain)
  };

  if (options.telemetry !== false) {
    var telemetry = jsonToBase64(options.clientInfo || this.getClientInfo());
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
 * @method    getClientInfo
 * @memberOf  module:auth.AuthenticationClient.prototype
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
 * Start passwordless flow sending an email.
 *
 * @method    requestMagicLink
 * @memberOf  module:auth.AuthenticationClient.prototype
 *
 * @example <caption>
 *   Given the user `email` address, it will send an email with a link. You can
 *   then authenticate with this user opening the link and he will be
 *   automatically logged in to the application. Optionally, you can
 *   append/override parameters to the link (like `scope`, `redirect_uri`,
 *   `protocol`, `response_type`, etc.) using `authParams` object.
 *
 *   Find more information in the
 *   <a href="https://auth0.com/docs/auth-api#!#post--with_email">API Docs</a>
 * </caption>
 *
 * var data = {
 *   email: '{EMAIL}',
 *   authParams: {} // Optional auth params.
 * };
 *
 * auth0.requestMagicLink(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * };
 *
 * @param   {Object}  data              User data object.
 * @param   {String}  data.email        User email address.
 * @param   {Object}  [data.authParams] Authentication parameters.
 *
 * @return  {Promise|undefined}
 */
AuthenticationClient.prototype.requestMagicLink = function (data, cb) {
  data.send = 'link';

  return this.passwordless.sendEmail(data, cb);
};


/**
 * Start passwordless flow sending an email.
 *
 * @method    requestEmailCode
 * @memberOf  module:auth.AuthenticationClient.prototype
 *
 * @example <caption>
 *   Given the user `email` address, it will send an email with a verification
 *   code. You can then authenticate with this user using the `/oauth/ro`
 *   endpoint using the email as username and the code as password.
 *
 *   Find more information in the
 *   <a href="https://auth0.com/docs/auth-api#!#post--with_email">API Docs</a>
 * </caption>
 *
 * var data = {
 *   email: '{EMAIL}',
 *   authParams: {} // Optional auth params.
 * };
 *
 * auth0.requestEmailCode(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * };
 *
 * @param   {Object}  data              User data object.
 * @param   {String}  data.email        User email address.
 * @param   {Object}  [data.authParams] Authentication parameters.
 *
 * @return  {Promise|undefined}
 */
AuthenticationClient.prototype.requestEmailCode = function (data, cb) {
  data.send = 'code';

  return this.passwordless.sendEmail(data, cb);
};


/**
 * Start passwordless flow sending an SMS.
 *
 * @method    requestSMSCode
 * @memberOf  module:auth.AuthenticationClient.prototype
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
 * auth0.requestSMSCode(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 * });
 *
 * @param   {Object}  data                User data object.
 * @param   {String}  data.phone_number   The user phone number.
 *
 * @return  {Promise|undefined}
 */
AuthenticationClient.prototype.requestSMSCode = function (data, cb) {
  var translatedData = {
    phone_number: data.phoneNumber || data.phone_number
  };

  return this.passwordless.sendSMS(translatedData, cb);
};


/**
 * Sign in with the given user credentials.
 *
 * @method    verifySMSCode
 * @memberOf  module:auth.AuthenticationClient.prototype
 *
 * @example <caption>
 *   Given the user credentials (`phone_number` and `code`), it will do the
 *   authentication on the provider and return a JSON with the `access_token`
 *   and `id_token`.
 * </caption>
 *
 * var data = {
 *   username: '{PHONE_NUMBER}',
 *   password: '{VERIFICATION_CODE}'
 * };
 *
 * auth0.verifySMSCode(data, function (err) {
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
 * @param   {Object}  data              Credentials object.
 * @param   {String}  data.username     Phone number.
 * @param   {String}  data.password     Verification code.
 * @param   {String}  data.target       Target client ID.
 * @param   {String}  data.grant_type   Grant type.
 *
 * @return  {Promise|undefined}
 */
AuthenticationClient.prototype.verifySMSCode = function (data, cb) {
  var translatedData = {
    username: data.phoneNumber || data.phone_number || data.username,
    password: data.code || data.password
  };

  return this.passwordless.signIn(translatedData, cb);
};


/**
 * Exchange the token of the logged in user with a token that is valid to call
 * the API (signed with the API secret).
 *
 * @method    getDelegationToken
 * @memberOf  module:auth.AuthenticationClient.prototype
 *
 * @example <caption>
 *   Given an existing token, this endpoint will generate a new token signed
 *   with the target client secret. This is used to flow the identity of the
 *   user from the application to an API or across different APIs that are
 *   protected with different secrets. Find more information in the
 *   <a href="https://auth0.com/docs/auth-api#!#post--delegation">API Docs</a>.
 * </caption>
 *
 * var data = {
 *   id_token: '{ID_TOKEN}',
 *   api_type: 'app',
 *   target: '{TARGET}',
 *   grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer'
 * };
 *
 * auth0.getDelegationToken(data, function (err, token) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(token);
 * });
 *
 * @param   {Object}  data              Token data object.
 * @param   {String}  data.id_token     The user ID token.
 * @param   {String}  data.api_type     The API type (aws, firebase, etc).
 * @param   {String}  data.target       The target client ID.
 * @param   {String}  data.grant_type   The grant type.
 *
 * @return  {Promise|undefined}
 */
AuthenticationClient.prototype.getDelegationToken = function (data, cb) {
  var translatedData = {
    id_token: data.id_token,
    api_type: data.api || data.api_type,
    scope: data.scope,
    target: data.targetClientId || data.target,
    grant_type: data.grant_type
  };

  return this.tokens.getDelegationToken(translatedData, cb);
};


/**
 * Change password using a database or active directory service.
 *
 * @method    changePassword
 * @memberOf  module:auth.AuthenticationClient.prototype
 *
 * @example <caption>
 *   Given the user email, the connection specified and the new password to
 *   use, Auth0 will send a forgot password email. Once the user clicks on the
 *   confirm password change link, the new password specified in this POST will
 *   be set to this user. Find more information in the
 *   <a href="https://auth0.com/docs/auth-api#!#post--dbconnections-change_password">
 *   API Docs</a>.
 * </caption>
 *
 * var data = {
 *   email: '{EMAIL}',
 *   password: '{PASSWORD}',
 *   connection: 'Username-Password-Authentication'
 * };
 *
 * auth0.changePassword(data, function (err, message) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(message);
 * });
 *
 * @param   {Object}    data            User data object.
 * @param   {String}    data.email      User email.
 * @param   {String}    data.password   User password.
 * @param   {String}    data.connection Identity provider for the user.
 *
 * @return  {Promise|undefined}
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
 * Request a change password email using a database or active directory service.
 *
 * @method    requestChangePasswordEmail
 * @memberOf  module:auth.AuthenticationClient.prototype
 *
 * @example <caption>
 *   Given the user email, the connection specified, Auth0 will send a change
 *   password email. once the user clicks on the confirm password change link,
 *   the new password specified in this POST will be set to this user. Find more
 *   information in the <a href="https://auth0.com/docs/auth-api#!#post--dbconnections-change_password>
 *   API Docs</a>.
 * </caption>
 *
 * var data = {
 *   email: '{EMAIL}',
 *   connection: 'Username-Password-Authentication'
 * };
 *
 * auth0.requestChangePasswordEmail(data, function (err, message) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(message);
 * });
 *
 * @param   {Object}    data            User data object.
 * @param   {String}    data.email      User email.
 * @param   {String}    data.connection Identity provider for the user.
 *
 * @return  {Promise|undefined}
 */
AuthenticationClient.prototype.requestChangePasswordEmail = function (data, cb) {
  var translatedData = {
    connection: data.connection,
    email: data.email || data.username
  };

  return this.database.requestChangePasswordEmail(data, cb);
};


/**
 * Given an access token get the user profile linked to it.
 *
 * @method    getProfile
 * @memberOf  module:auth.AuthenticationClient.prototype
 *
 * @example <caption>
 *   Get the user information based on the Auth0 access token (obtained during
 *   login). Find more information in the
 *   <a href="https://auth0.com/docs/auth-api#!#get--userinfo">API Docs</a>.
 * </caption>
 *
 * auth0.getProfile(data, function (err, userInfo) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(userInfo);
 * });
 *
 * @param     {String}  accessToken   The user access token.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(AuthenticationClient, 'getProfile', 'users.getInfo');

/**
 * Gets an access token using the client credentials grant flow.
 *
 * @method    clientCredentialsGrant
 * @memberOf  module:auth.AuthenticationClient.prototype
 *
 * @example <caption>
 *   Gets an access token using the client credentials grant flow. Find more information in the
 *   <a href="https://auth0.com/docs/api-auth/config/asking-for-access-tokens">API Docs</a>.
 * </caption>
 *
 * auth0.clientCredentialsGrant({
 *   audience: 'https://tenant.auth0.com/api/v2/',
 *   scope: 'read:users update:users'
 * }, function (err, response) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(response);
 * });
 *
 * @param     {Object}  options
 * @param     {String}  [options.scope] scopes to request to be added to the returned access token
 * @param     {String}  [options.audience] audience or identifier of the API where the access token will be used, e.g. Auth0 Management API
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(AuthenticationClient, 'clientCredentialsGrant', 'oauth.clientCredentialsGrant');

/**
 * Sign in using a username and password
 *
 * @method    passwordGrant
 * @memberOf  module:auth.AuthenticationClient.prototype
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
 *   password: '{PASSWORD}'
 *   realm: '{CONNECTION_NAME}', // Optional field.
 *   scope: 'openid'  // Optional field.
 * };
 *
 * auth0.oauth.token(data, function (err, userData) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(userData);
 * });
 *
 * @param   {Object}    userData              User credentials object.
 * @param   {String}    userData.username     Username.
 * @param   {String}    userData.password     User password.
 * @param   {String}    [userData.realm]      Name of the realm to use to authenticate or the connection name
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(AuthenticationClient, 'passwordGrant', 'oauth.passwordGrant');

module.exports = AuthenticationClient;
