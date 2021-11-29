const { sanitizeArguments } = require('../utils');
const { ArgumentError } = require('rest-facade');
const RestClient = require('rest-facade').Client;
const { SanitizedError } = require('../errors');
const OAUthWithIDTokenValidation = require('./OAUthWithIDTokenValidation');

function getParamsFromOptions(options) {
  const params = {};
  if (!options || typeof options !== 'object') {
    return params;
  }
  if (options.forwardedFor) {
    params._requestCustomizer = function (req) {
      req.set('auth0-forwarded-for', options.forwardedFor);
    };
  }
  if (options.type) {
    params.type = options.type;
  }
  return params;
}

/**
 * Abstracts the sign-in, sign-up and change-password processes for Database &
 * Active Directory authentication services.
 */
class OAuthAuthenticator {
  /**
   * @param  {object}              options                             Authenticator options.
   * @param  {string}              options.baseUrl                     The Auth0 account URL.
   * @param  {string}              options.domain                      AuthenticationClient server domain
   * @param  {string}              [options.clientId]                  Default client ID.
   * @param  {string}              [options.clientSecret]              Default client Secret.
   * @param  {boolean}             [options.__bypassIdTokenValidation] Whether the id_token should be validated or not
   */
  constructor(options) {
    if (!options) {
      throw new ArgumentError('Missing authenticator options');
    }

    if (typeof options !== 'object') {
      throw new ArgumentError('The authenticator options must be an object');
    }

    /**
     * Options object for the Rest Client instance.
     *
     * @type {object}
     */
    const clientOptions = {
      errorCustomizer: SanitizedError,
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
    };

    this.oauth = new RestClient(`${options.baseUrl}/oauth/:type`, clientOptions);
    this.oauthWithIDTokenValidation = new OAUthWithIDTokenValidation(this.oauth, options);
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
  }

  /**
   * Sign in using a username and password.
   *
   * @example <caption>
   *   Given the user's credentials and the connection specified, it
   *   will return a JSON with the access_token and id_token.
   *   More information in the
   *
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
   * @param   {object}    userData               User credentials object.
   * @param   {string}    userData.username      Username.
   * @param   {string}    userData.password      User password.
   * @param   {string}    userData.connection    The identity provider in use.
   * @param   {object}    [options]              Additional options.
   * @param   {string}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
   * @param {Function} cb                        Callback
   * @returns  {Promise|undefined}
   */
  signIn(userData, options, cb) {
    if (!userData || typeof userData !== 'object') {
      throw new ArgumentError('Missing user data object');
    }

    const { options: sanitizedOptions, cb: sanitizedCb } = sanitizeArguments(options, cb);
    const params = {
      type: 'ro',
      ...getParamsFromOptions(sanitizedOptions),
    };

    const data = {
      client_id: this.clientId,
      grant_type: 'password',
      scope: 'openid',
      ...userData,
    };

    if (
      params.type === 'ro' &&
      (typeof data.connection !== 'string' || data.connection.split().length === 0)
    ) {
      throw new ArgumentError('connection field is required');
    }

    if (sanitizedCb && sanitizedCb instanceof Function) {
      return this.oauthWithIDTokenValidation.create(params, data, sanitizedCb);
    }

    return this.oauthWithIDTokenValidation.create(params, data);
  }

  /**
   * Sign in using a username and password
   *
   * @example <caption>
   *   Given the user's credentials perform the OAuth password grant
   *   or Password Realm grant if a realm is provided,
   *   it will return a JSON with the access_token and id_token.
   *
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
   * @param   {object}    userData               User credentials object.
   * @param   {string}    userData.username      Username.
   * @param   {string}    userData.password      User password.
   * @param   {string}    [userData.realm]       Name of the realm to use to authenticate or the connection name
   * @param   {object}    [options]              Additional options.
   * @param   {string}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
   * @param {Function} cb                        Callback
   * @returns  {Promise|undefined}
   */
  passwordGrant(userData, options, cb) {
    const { options: sanitizedOptions, cb: sanitizedCb } = sanitizeArguments(options, cb);

    if (!userData || typeof userData !== 'object') {
      throw new ArgumentError('Missing user data object');
    }

    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'password',
      ...userData,
    };

    if (typeof data.username !== 'string' || data.username.split().length === 0) {
      throw new ArgumentError('username field is required');
    }

    if (typeof data.password !== 'string' || data.password.split().length === 0) {
      throw new ArgumentError('password field is required');
    }

    if (typeof data.realm === 'string' && data.realm.split().length !== 0) {
      data.grant_type = 'http://auth0.com/oauth/grant-type/password-realm';
    }

    const params = {
      type: 'token',
      ...getParamsFromOptions(sanitizedOptions),
    };

    if (sanitizedCb && sanitizedCb instanceof Function) {
      return this.oauthWithIDTokenValidation.create(params, data, sanitizedCb);
    }

    return this.oauthWithIDTokenValidation.create(params, data);
  }

  /**
   * Exchange a refresh token
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
   * @param   {object}    data                Data object.
   * @param   {string}    data.refresh_token  Refresh token.
   * @param  {Function}  cb Callback
   * @returns  {Promise|undefined}
   */
  refreshToken(data, cb) {
    if (!data || typeof data !== 'object') {
      throw new ArgumentError('Missing data object');
    }

    data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      ...data,
    };

    if (typeof data.refresh_token !== 'string' || data.refresh_token.split().length === 0) {
      throw new ArgumentError('refresh_token is required');
    }

    const params = {
      type: 'token',
    };

    if (cb && cb instanceof Function) {
      return this.oauth.create(params, data, cb);
    }
    return this.oauth.create(params, data);
  }

  /**
   * Sign in using a social provider access token.
   *
   * @param   {object}    data                User credentials object.
   * @param   {string}    data.access_token   User access token.
   * @param   {string}    data.connection     Identity provider.
   * @param   {Function}    cb     Callback
   * @returns  {Promise|undefined}
   */
  socialSignIn(data, cb) {
    const params = {
      type: 'access_token',
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
  }

  clientCredentialsGrant(options, cb) {
    if (!options || typeof options !== 'object') {
      throw new ArgumentError('Missing options object');
    }

    const data = {
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      ...options,
    };

    if (!data.client_id || data.client_id.trim().length === 0) {
      throw new ArgumentError('client_id field is required');
    }

    if (!data.client_secret || data.client_secret.trim().length === 0) {
      throw new ArgumentError('client_secret field is required');
    }

    const params = {
      type: 'token',
    };

    if (cb && cb instanceof Function) {
      return this.oauth.create(params, data, cb);
    }

    return this.oauth.create(params, data);
  }

  /**
   * Sign in using an authorization code
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
   * var options = {
   *   code: '{CODE}',
   *   redirect_uri: '{REDIRECT_URI}',
   *   organization: '{ORGANIZATION_ID}' // Optiional field.
   * };
   *
   * auth0.oauth.authorizationCodeGrant(options, function (err, userData) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(userData);
   * });
   * @param   {object}    options                  Authorization code payload
   * @param   {string}    options.organization     Organization ID
   * @param   {string}    options.code             Code in URL returned after authentication
   * @param   {string}    options.redirect_uri     The URL to which Auth0 will redirect the browser after authorization has been granted by the user.
   * @param {Function} cb Callback
   * @returns  {Promise|undefined}
   */
  authorizationCodeGrant(options, cb) {
    if (!options || typeof options !== 'object') {
      throw new ArgumentError('Missing options object');
    }

    const data = {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      ...options,
    };

    if (!data.code || data.code.trim().length === 0) {
      throw new ArgumentError('code field is required');
    }

    if (!data.redirect_uri || data.redirect_uri.trim().length === 0) {
      throw new ArgumentError('redirect_uri field is required');
    }

    const params = {
      type: 'token',
    };

    if (cb && cb instanceof Function) {
      return this.oauthWithIDTokenValidation.create(params, data, cb);
    }

    return this.oauthWithIDTokenValidation.create(params, data);
  }
}

module.exports = OAuthAuthenticator;
