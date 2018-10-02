const { ArgumentError } = require('rest-facade');
const { getRequestPromise } = require('../utils');

/**
 * @class
 * Provides methods for getting user information and impersonating users.
 * @constructor
 * @memberOf module:auth
 *
 * @param  {Object}   options               Manager options.
 * @param  {String}   options.baseUrl       The auth0 account URL.
 * @param  {String}   [options.headers]     Default request headers.
 * @param  {String}   [options.clientId]    Default client ID.
 */
class UsersManager {
  constructor(options) {
    if (typeof options !== 'object') {
      throw new ArgumentError('Missing users manager options');
    }

    if (typeof options.baseUrl !== 'string') {
      throw new ArgumentError('baseUrl field is required');
    }

    const { baseUrl, headers, clientId } = options;

    this.baseUrl = baseUrl;
    this.headers = headers;
    this.clientId = clientId;
  }

  /**
   * Given an access token get the user profile linked to it.
   *
   * @method    getInfo
   * @memberOf  module:auth.UsersManager.prototype
   *
   * @example <caption>
   *   Get the user information based on the Auth0 access token (obtained during
   *   login). Find more information in the
   *   <a href="https://auth0.com/docs/auth-api#!#get--userinfo">API Docs</a>.
   * </caption>
   *
   * auth0.users.getInfo(accessToken, function (err, userInfo) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(userInfo);
   * });
   *
   * @param   {String}    accessToken   User access token.
   * @param   {Function}  [cb]          Callback function.
   *
   * @return  {Promise|undefined}
   */
  getInfo(accessToken, cb) {
    const url = `${this.baseUrl}/userinfo`;
    const headers = Object.assign({}, this.headers);

    if (accessToken === null || accessToken === undefined) {
      throw new ArgumentError('An access token is required');
    }

    if (typeof accessToken !== 'string' || accessToken.trim().length === 0) {
      throw new ArgumentError('Invalid access token');
    }

    // Send the user access token in the Authorization header.
    headers.Authorization = `Bearer ${accessToken}`;

    // Perform the request.
    const promise = getRequestPromise({
      method: 'GET',
      url,
      headers,
      data: {}
    });

    // Use callback if given.
    if (cb instanceof Function) {
      promise.then(cb.bind(null, null)).catch(cb);
      return;
    }

    return promise;
  }

  /**
   * Impersonate the user with the given user ID.
   *
   * @method    impersonate
   * @memberOf  module:auth.UsersManager.prototype
   *
   * @example <caption>
   *   Gets a link that can be used once to log in as a specific user. Useful for
   *   troubleshooting. Find more information in the
   *   [API Docs](https://auth0.com/docs/auth-api#!#post--users--user_id--impersonate).
   * </caption>
   *
   * const settings = {
   *   impersonator_id: '{IMPERSONATOR_ID}',
   *   protocol: 'oauth2',
   *   additionalParameters: {}  // Optional additional params.
   * };
   *
   * auth0.users.impersonate(userId, settings, function (err, link) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(link);
   * });
   *
   * @param   {String}    userId                    User ID token.
   * @param   {Object}    settings                  Impersonation settings.
   * @param   {String}    settings.impersonator_id  Impersonator user ID.
   * @param   {String}    settings.protocol         The authentication protocol.
   * @param   {String}    settings.token            API v1 token obtained for impersonation
   * @param   {String}    [settings.clientId]       Client id used for impersonation. Uses the one supplied in the constructor by default.
   * @param   {Function}  [cb]                     Callback function.
   *
   * @return  {Promise|undefined}
   */
  impersonate(userId, settings, cb) {
    const url = `${this.baseUrl}/users/${userId}/impersonate`;

    if (userId === null || userId === undefined) {
      throw new ArgumentError('You must specify a user ID');
    }

    if (typeof userId !== 'string' || userId.trim().length === 0) {
      throw new ArgumentError('The user ID is not valid');
    }

    if (typeof settings !== 'object') {
      throw new ArgumentError('Missing impersonation settings object');
    }

    if (
      typeof settings.impersonator_id !== 'string' ||
      settings.impersonator_id.trim().length === 0
    ) {
      throw new ArgumentError('impersonator_id field is required');
    }

    if (typeof settings.protocol !== 'string' || settings.protocol.trim().length === 0) {
      throw new ArgumentError('protocol field is required');
    }

    if (typeof settings.token !== 'string' || settings.token.trim().length === 0) {
      throw new ArgumentError('token field is required');
    }

    const { clientId = this.clientId } = settings;
    const data = Object.assign({ client_id: clientId }, settings);

    const headers = Object.assign(
      {
        Authorization: `Bearer ${settings.token}`
      },
      this.headers
    );

    // Perform the request.
    const promise = getRequestPromise({
      method: 'POST',
      headers: headers,
      data: data,
      url: url
    });

    // Use callback if given.
    if (cb instanceof Function) {
      promise.then(cb.bind(null, null)).catch(cb);
      return;
    }

    return promise;
  }
}

module.exports = UsersManager;
