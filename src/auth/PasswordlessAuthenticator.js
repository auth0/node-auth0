const { ArgumentError } = require('rest-facade');
const RestClient = require('rest-facade').Client;
const { sanitizeArguments } = require('../utils');

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
  return params;
}

/**
 * Handles authenticator with passwordless flows, e.g. SMS, Touch ID, etc.
 */

class PasswordlessAuthenticator {
  /**
   * @param  {object}              options            Authenticator options.
   * @param  {string}              options.baseUrl    The auth0 account URL.
   * @param  {string}              [options.clientId] Default client ID.
   * @param  {string}              [options.clientSecret] Default client secret.
   * @param  {OAuthAuthenticator}  oauth              OAuthAuthenticator instance.
   */
  constructor(options, oauth) {
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
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
    };

    this.oauth = oauth;
    this.passwordless = new RestClient(`${options.baseUrl}/passwordless/start`, clientOptions);
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
  }

  /**
   * Sign in with the given user credentials.
   *
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
   * @example <caption>
   *   The user data object has the following structure.
   * </caption>
   *
   * {
   *   id_token: String,
   *   access_token: String,
   *   token_type: String
   * }
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
   * @param   {object}    userData              User credentials object.
   * @param   {string}    userData.username     The user's phone number if realm=sms, or the user's email if realm=email
   * @param   {string}    userData.otp        The user's verification code. Required
   * @param   {string}    [userData.audience]     API Identifier of the API for which you want to get an Access Token.
   * @param   {string}    [userData.realm=sms]  Realm string: "sms" or "email".
   * @param   {string}    [userData.password]     [DEPRECATED] Password required if using legacy /oauth/ro endpoint
   * @param   {string}    [userData.connection=sms] [DEPRECATED] Connection string: "sms" or "email".
   * @param   {object}    [options]              Additional options.
   * @param   {string}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
   * @param   {Function}  [cb]                  Method callback.
   * @returns  {Promise|undefined}
   */
  signIn(userData, options, cb) {
    const { options: sanitizedOptions, cb: sanitizedCb } = sanitizeArguments(options, cb);

    if (!userData || typeof userData !== 'object') {
      throw new ArgumentError('Missing user data object');
    }

    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      ...userData,
    };

    if (typeof data.username !== 'string' || data.username.trim().length === 0) {
      throw new ArgumentError('username field (phone number) is required');
    }

    // If otp is provided, attempt to sign in using otp grant
    if (typeof data.otp === 'string' && data.otp.trim().length > 0) {
      if (!data.realm || (data.realm !== 'email' && data.realm !== 'sms')) {
        data.realm = 'sms';
      }
      data.grant_type = 'http://auth0.com/oauth/grant-type/passwordless/otp';
      return this.oauth.signIn(data, { type: 'token', ...sanitizedOptions }, sanitizedCb);
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
    return this.oauth.signIn(data, sanitizedOptions, sanitizedCb);
  }

  /**
   * Start passwordless flow sending an email.
   *
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
   * @param   {object}    userData                User account data.
   * @param   {string}    userData.email          User email address.
   * @param   {string}    userData.send           The type of email to be sent.
   * @param   {object}    [options]              Additional options.
   * @param   {string}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
   * @param   {Function}  [cb]                    Method callback.
   * @returns  {Promise|undefined}
   */
  sendEmail(userData, options, cb) {
    const { options: sanitizedOptions, cb: sanitizedCb } = sanitizeArguments(options, cb);
    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      ...userData,
    };
    const params = getParamsFromOptions(sanitizedOptions);

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

    if (sanitizedCb && sanitizedCb instanceof Function) {
      return this.passwordless.create(params, data, sanitizedCb);
    }

    return this.passwordless.create(params, data);
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
   * auth0.passwordless.sendSMS(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    userData                User account data.
   * @param   {string}    userData.phone_number   User phone number.
   * @param   {object}    [options]              Additional options.
   * @param   {string}    [options.forwardedFor] Value to be used for auth0-forwarded-for header
   * @param   {Function}  [cb]                    Method callback.
   * @returns  {Promise|undefined}
   */
  sendSMS(userData, options, cb) {
    const { options: sanitizedOptions, cb: sanitizedCb } = sanitizeArguments(options, cb);
    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      ...userData,
    };
    const params = getParamsFromOptions(sanitizedOptions);

    // Don't let the user override the connection nor the grant type.
    data.connection = 'sms';

    if (!userData || typeof userData !== 'object') {
      throw new ArgumentError('Missing user data object');
    }

    if (typeof data.phone_number !== 'string' || data.phone_number.trim().length === 0) {
      throw new ArgumentError('phone_number field is required');
    }

    if (sanitizedCb && sanitizedCb instanceof Function) {
      return this.passwordless.create(params, data, sanitizedCb);
    }

    return this.passwordless.create(params, data);
  }
}

module.exports = PasswordlessAuthenticator;
