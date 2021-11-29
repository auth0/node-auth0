const axios = require('axios');
const { ArgumentError } = require('rest-facade');

/**
 * Provides methods for getting token data and exchanging tokens.
 */
class TokensManager {
  /**
   * @param  {object}   options                 Manager options.
   * @param  {string}   options.baseUrl         The auth0 account URL.
   * @param  {string}   [options.headers]       Default request headers.
   * @param  {string}   [options.clientId]      Default client ID.
   * @param  {string}   [options.clientSecret]  Default client Secret.
   */
  constructor(options) {
    if (typeof options !== 'object') {
      throw new ArgumentError('Missing tokens manager options');
    }

    if (typeof options.baseUrl !== 'string') {
      throw new ArgumentError('baseUrl field is required');
    }

    this.baseUrl = options.baseUrl;
    this.headers = options.headers || {};
    this.clientId = options.clientId || '';
    this.clientSecret = options.clientSecret || '';
  }

  /**
   * Given an ID token get the user profile linked to it.
   *
   * @example <caption>
   *   Validates a JSON Web Token (signature and expiration) and returns the user
   *   information associated with the user id (sub property) of the token. Find
   *   more information in the
   *   <a href="https://auth0.com/docs/auth-api#!#post--tokeninfo">API Docs</a>.
   * </caption>
   *
   * auth0.tokens.getInfo(token, function (err, tokenInfo) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(tokenInfo);
   * });
   * @param   {string}    idToken     User ID token.
   * @param   {Function}  [cb]        Method callback.
   * @returns  {Promise|undefined}
   */
  getInfo(idToken, cb) {
    const headers = { ...this.headers };

    if (idToken === null || idToken === undefined) {
      throw new ArgumentError('An ID token is required');
    }

    if (typeof idToken !== 'string' || idToken.trim().length === 0) {
      throw new ArgumentError('The ID token is not valid');
    }

    // Perform the request.
    const promise = axios({
      method: 'POST',
      url: `${this.baseUrl}/tokeninfo`,
      data: { id_token: idToken },
      headers,
    }).then(({ data }) => data);

    // Use callback if given.
    if (cb instanceof Function) {
      promise.then(cb.bind(null, null)).catch(cb);
      return;
    }

    return promise;
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
   * auth0.tokens.getDelegationToken(data, function (err, token) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(token);
   * });
   * @param   {object}    data                Token data object.
   * @param   {string}    data.id_token       User ID token.
   * @param   {string}    data.refresh_token  User refresh token.
   * @param   {string}    data.target         Target client ID.
   * @param   {string}    data.api_type       The API to be used (aws, auth0, etc).
   * @param   {string}    data.grant_type     Grant type (password, jwt, etc).
   * @param   {Function}  [cb]                Callback function.
   * @returns  {Promise|undefined}
   */
  getDelegationToken(data, cb) {
    const body = { client_id: this.clientId, ...data };
    const { headers } = this;

    if (!data) {
      throw new ArgumentError('Missing token data object');
    }

    const hasIdToken = typeof data.id_token === 'string' && data.id_token.trim().length !== 0;

    const hasRefreshToken =
      typeof data.refresh_token === 'string' && data.refresh_token.trim().length !== 0;

    if (!hasIdToken && !hasRefreshToken) {
      throw new ArgumentError('one of id_token or refresh_token is required');
    }

    if (hasIdToken && hasRefreshToken) {
      throw new ArgumentError(
        'id_token and refresh_token fields cannot be specified simulatenously'
      );
    }

    if (typeof data.target !== 'string' || data.target.trim().length === 0) {
      throw new ArgumentError('target field is required');
    }

    if (typeof data.api_type !== 'string' || data.api_type.trim().length === 0) {
      throw new ArgumentError('api_type field is required');
    }

    if (typeof data.grant_type !== 'string' || data.grant_type.trim().length === 0) {
      throw new ArgumentError('grant_type field is required');
    }

    // Perform the request.
    const promise = axios({
      method: 'POST',
      url: `${this.baseUrl}/delegation`,
      data: body,
      headers,
    }).then(({ data }) => data);

    // Use callback if given.
    if (cb instanceof Function) {
      promise.then(cb.bind(null, null)).catch(cb);
      return;
    }

    return promise;
  }

  /**
   * Proactively revoke an issued refresh token.
   *
   * @example <caption>
   *   Given an existing refresh token, this endpoint will revoke it in order
   *   to prevent unauthorized silently user authentication tokens refresh.
   *   Find more information in the <a href="https://auth0.com/docs/api/authentication#revoke-refresh-token">API Docs</a>.
   * </caption>
   *
   *  var data = {
   *   token: '{REFRESH_TOKEN}'
   * };
   *
   * auth0.tokens.revokeRefreshToken(data, function (err, _) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Do stuff.
   * });
   * @param   {object}    data                  Token data object.
   * @param   {string}    data.token            User refresh token.
   * @param   {string}    [data.client_id]      Target client ID.
   * @param   {string}    [data.client_secret]  Target client secret.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  revokeRefreshToken(data, cb) {
    if (!data) {
      throw new ArgumentError('Missing token data object');
    }

    const hasToken = typeof data.token === 'string' && data.token.trim().length !== 0;

    if (!hasToken) {
      throw new ArgumentError('token property is required');
    }

    const hasClientId =
      (data.client_id &&
        typeof data.client_id === 'string' &&
        data.client_id.trim().length !== 0) ||
      this.clientId !== '';

    if (!hasClientId) {
      throw new ArgumentError(
        'Neither token data client_id property or constructor clientId property has been set'
      );
    }

    const body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      ...data,
    };

    const { headers } = this;

    // Perform the request.
    const promise = axios({
      method: 'POST',
      url: `${this.baseUrl}/oauth/revoke`,
      data: body,
      headers,
    }).then(({ data }) => data);

    // Use callback if given.
    if (cb instanceof Function) {
      promise.then(cb.bind(null, null)).catch(cb);
      return;
    }

    return promise;
  }
}

module.exports = TokensManager;
