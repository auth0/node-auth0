const util = require('util');
const utils = require('../utils');
const { jsonToBase64 } = utils;
const { ArgumentError } = require('rest-facade');

// Authenticators.
const OAuthAuthenticator = require('./OAuthAuthenticator');
const DatabaseAuthenticator = require('./DatabaseAuthenticator');
const PasswordlessAuthenticator = require('./PasswordlessAuthenticator');

// Managers
const UsersManager = require('./UsersManager');
const TokensManager = require('./TokensManager');

const BASE_URL_FORMAT = 'https://%s';

/**
 * Authentication API SDK.
 *
 * This client must used to access Auth0's {@link https://auth0.com/docs/auth-api Authentication API}.
 *
 * @example <caption>
 *   The <b>AuthenticationClient</b> constructor takes an <i>optional</i> client
 *   ID, if specified it will be used as default value for all endpoints that
 *   accept a client ID.
 * </caption>
 *
 * var AuthenticationClient = require('auth0').AuthenticationClient;
 * var auth0 = new AuthenticationClient({
 *   domain: '{YOUR_ACCOUNT}.auth0.com',
 *   clientId: '{OPTIONAL_CLIENT_ID}'
 * });
 */
class AuthenticationClient {
  /**
   * @param   {object}  options                           Options for the Authentication Client SDK.
   * @param   {string}  options.domain                    AuthenticationClient server domain.
   * @param   {string}  [options.clientId]                Default client ID.
   * @param   {string}  [options.clientSecret]            Default client Secret.
   * @param   {string}  [options.supportedAlgorithms]     Algorithms that your application expects to receive
   * @param  {boolean}  [options.__bypassIdTokenValidation] Whether the id_token should be validated or not
   * @param   {object}  [options.headers]                 Additional headers that will be added to the outgoing requests.
   */
  constructor(options) {
    if (!options || typeof options !== 'object') {
      throw new ArgumentError('Authentication Client SDK options must be an object');
    }

    if (!options.domain || options.domain.length === 0) {
      throw new ArgumentError('Must provide a domain');
    }

    const defaultHeaders = {
      'User-Agent': `node.js/${process.version.replace('v', '')}`,
      'Content-Type': 'application/json',
    };

    const managerOptions = {
      clientId: options.clientId,
      domain: options.domain,
      clientSecret: options.clientSecret,
      headers: Object.assign(defaultHeaders, options.headers || {}),
      baseUrl: util.format(BASE_URL_FORMAT, options.domain),
      supportedAlgorithms: options.supportedAlgorithms,
      __bypassIdTokenValidation: options.__bypassIdTokenValidation,
    };

    if (options.telemetry !== false) {
      const clientInfo = options.clientInfo || utils.generateClientInfo();
      if ('string' === typeof clientInfo.name && clientInfo.name) {
        const telemetry = jsonToBase64(clientInfo);
        managerOptions.headers['Auth0-Client'] = telemetry;
      }
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
  }

  /**
   * Start passwordless flow sending an email.
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
   * @param   {object}    data              User data object.
   * @param   {string}    data.email        User email address.
   * @param   {object}    [data.authParams] Authentication parameters.
   * @param   {Function}  [cb]              Method callback.
   * @returns  {Promise|undefined}
   */
  requestMagicLink(data, cb) {
    data.send = 'link';

    return this.passwordless.sendEmail(data, cb);
  }

  /**
   * Start passwordless flow sending an email.
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
   * @param   {object}    data              User data object.
   * @param   {string}    data.email        User email address.
   * @param   {object}    [data.authParams] Authentication parameters.
   * @param   {Function}  [cb]              Method callback.
   * @returns  {Promise|undefined}
   */
  requestEmailCode(data, cb) {
    data.send = 'code';

    return this.passwordless.sendEmail(data, cb);
  }

  /**
   * Verify the given OTP which was sent on the given email.
   *
   * @example <caption>
   *   Given the user credentials (`email` and `otp`), authenticates
   *   with the provider using the `/oauth/token` endpoint. Upon successful
   *   authentication, returns a JSON object containing the `access_token` and
   *   `id_token`.
   * </caption>
   *
   * var data = {
   *   email: '{EMAIL}',
   *   otp: '{VERIFICATION_CODE}'
   * };
   *
   * auth0.verifyEmailCode(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @example <caption>
   *   The user data object has the following structure.
   * </caption>
   *
   * {
   *   id_token: String,
   *   access_token: String,
   *   token_type: String
   * }
   * @param   {object}    data              Credentials object.
   * @param   {string}    data.email        Email.
   * @param   {string}    data.otp          Verification code.
   * @param   {Function}  [cb]              Method callback.
   * @returns  {Promise|undefined}
   */
  verifyEmailCode(data, cb) {
    const translatedData = {
      username: data.email,
      realm: 'email',
      otp: data.otp,
    };

    return this.passwordless.signIn(translatedData, cb);
  }

  /**
   * Start passwordless flow sending an SMS.
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
   * @param   {object}    data                User data object.
   * @param   {string}    data.phone_number   The user phone number.
   * @param   {Function}  [cb]                Method callback.
   * @returns  {Promise|undefined}
   */
  requestSMSCode(data, cb) {
    const translatedData = {
      phone_number: data.phoneNumber || data.phone_number,
    };

    return this.passwordless.sendSMS(translatedData, cb);
  }

  /**
   * Sign in with the given user credentials.
   *
   * @example <caption>
   *   Given the user credentials (`phone_number` and `otp`), authenticates
   *   with the provider using the `/oauth/token` endpoint. Upon successful
   *   authentication, returns a JSON object containing the `access_token` and
   *   `id_token`.
   * </caption>
   *
   * var data = {
   *   username: '{PHONE_NUMBER}'
   *   otp: '{VERIFICATION_CODE}'
   * };
   *
   * auth0.verifySMSCode(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @example <caption>
   *   Given the user credentials (`phone_number` and `password`), authenticates
   *   with the provider using the deprecated `/oauth/ro` endpoint. Upon successful
   *   authentication, returns a JSON object containing the `access_token` and
   *   `id_token`.
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
   * @example <caption>
   *   The user data object has the following structure.
   * </caption>
   *
   * {
   *   id_token: String,
   *   access_token: String,
   *   token_type: String
   * }
   * @param   {object}    data              Credentials object.
   * @param   {string}    data.username     Phone number.
   * @param   {string}    data.otp          Verification code. Use this instead of `password` to use the `/oauth/token` endpoint.
   * @param   {string}    data.password     Verification code. Use this instead of `otp` to use the `/oauth/ro` endpoint.
   * @param   {Function}  [cb]              Method callback.
   * @returns  {Promise|undefined}
   */
  verifySMSCode(data, cb) {
    const translatedData = {
      username: data.phoneNumber || data.phone_number || data.username,
    };

    if (data.otp) {
      translatedData.otp = data.otp;
    } else {
      translatedData.password = data.code || data.password;
    }

    return this.passwordless.signIn(translatedData, cb);
  }

  /**
   * Exchange the token of the logged in user with a token that is valid to call
   * the API (signed with the API secret).
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
   * @param   {object}    data              Token data object.
   * @param   {string}    data.id_token     The user ID token.
   * @param   {string}    data.api_type     The API type (aws, firebase, etc).
   * @param   {string}    data.target       The target client ID.
   * @param   {string}    data.grant_type   The grant type.
   * @param   {Function}  [cb]              Method callback.
   * @returns  {Promise|undefined}
   */
  getDelegationToken(data, cb) {
    const translatedData = {
      id_token: data.id_token,
      api_type: data.api || data.api_type,
      scope: data.scope,
      target: data.targetClientId || data.target,
      grant_type: data.grant_type,
    };

    return this.tokens.getDelegationToken(translatedData, cb);
  }

  /**
   * Change password using a database or active directory service.
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
   * @param   {object}    data            User data object.
   * @param   {string}    data.email      User email.
   * @param   {string}    data.password   User password.
   * @param   {string}    data.connection Identity provider for the user.
   * @param   {Function}  [cb]            Method callback.
   * @returns  {Promise|undefined}
   */
  changePassword(data, cb) {
    return this.database.changePassword(data, cb);
  }

  /**
   * Request a change password email using a database or active directory service.
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
   *   connection: 'Username-Password-Authentication',
   *   client_id: 'OS1VzKTVjizL0VCc9Hx2ae2aTPXWy6BD'
   * };
   *
   * auth0.requestChangePasswordEmail(data, function (err, message) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(message);
   * });
   * @param   {object}    data            User data object.
   * @param   {string}    data.email      User email.
   * @param   {string}    data.connection Identity provider for the user.
   * @param   {string}    data.client_id  Client ID of the Application requesting the password change, to be included in the email template.
   * @param   {Function}  [cb]            Method callback.
   * @returns  {Promise|undefined}
   */
  requestChangePasswordEmail(data, cb) {
    return this.database.requestChangePasswordEmail(data, cb);
  }

  /**
   * Given an access token get the user profile linked to it.
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
   * @param     {string}  accessToken   The user access token.
   * @returns    {Promise|undefined}
   */
  getProfile(...args) {
    return this.users.getInfo(...args);
  }

  /**
   * Gets an access token using the client credentials grant flow.
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
   * @param     {object}  options
   * @param     {string}  [options.scope] scopes to request to be added to the returned access token
   * @param     {string}  [options.audience] audience or identifier of the API where the access token will be used, e.g. Auth0 Management API
   * @returns    {Promise|undefined}
   */
  clientCredentialsGrant(...args) {
    return this.oauth.clientCredentialsGrant(...args);
  }

  /**
   * Sign in using a username and password
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
   * auth0.passwordGrant(data, function (err, userData) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(userData);
   * });
   * @param   {object}    userData              User credentials object.
   * @param   {string}    userData.username     Username.
   * @param   {string}    userData.password     User password.
   * @param   {string}    [userData.realm]      Name of the realm to use to authenticate or the connection name
   * @param   {object}    [options]              Additional options.
   * @param   {string}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
   * @returns  {Promise|undefined}
   */
  passwordGrant(...args) {
    return this.oauth.passwordGrant(...args);
  }

  /**
   * Sign in using a refresh token
   *
   * @example <caption>
   *   Given a refresh token from a previous authentication request,
   *   it will return a JSON with the access_token and id_token.
   *   More information in the
   *   <a href="https://auth0.com/docs/api/authentication#refresh-token">
   *     API Docs
   *   </a>.
   * </caption>
   *
   * var data = {
   *   client_id: '{CLIENT_ID}', // Optional field.
   *   refresh_token: '{REFRESH_TOKEN}',
   * };
   *
   * auth0.refreshToken(data, function (err, userData) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(userData);
   * });
   * @param   {object}    userData                User credentials object.
   * @param   {string}    userData.refresh_token  Refresh token.
   * @returns  {Promise|undefined}
   */
  refreshToken(...args) {
    return this.oauth.refreshToken(...args);
  }
}

module.exports = AuthenticationClient;
