var extend = require('util')._extend;
var getRequestPromise = require('../utils').getRequestPromise;

var ArgumentError = require('rest-facade').ArgumentError;


/**
 * @class
 * Provides methods for getting token data and exchanging tokens.
 * @constructor
 * @memberOf module:auth
 *
 * @param  {Object}   options               Manager options.
 * @param  {String}   options.baseUrl       The auth0 account URL.
 * @param  {String}   [options.headers]     Default request headers.
 * @param  {String}   [options.clientId]    Default client ID.
 */
var TokensManager = function (options) {
  if (typeof options !== 'object') {
    throw new ArgumentError('Missing tokens manager options');
  }

  if (typeof options.baseUrl !== 'string') {
    throw new ArgumentError('baseUrl field is required');
  }

  this.baseUrl = options.baseUrl;
  this.headers = options.headers || {};
  this.clientId = options.clientId || '';
};


/**
 * Given an ID token get the user profile linked to it.
 *
 * @method
 * @memberOf module:auth.TokensManager.prototype
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
 *
 * @param   {String}    idToken     User ID token.
 * @param   {Function}  [cb]        Method callback.
 *
 * @return  {Promise|undefined}
 */
TokensManager.prototype.getInfo = function (idToken, cb) {
  var headers = extend({}, this.headers);

  if (idToken === null || idToken === undefined) {
    throw new ArgumentError('An ID token is required');
  }

  if (typeof idToken !== 'string' || idToken.trim().length === 0) {
    throw new ArgumentError('The ID token is not valid');
  }

  // Perform the request.
  var promise = getRequestPromise({
    method: 'POST',
    url: this.baseUrl + '/tokeninfo',
    data: { id_token: idToken },
    headers: headers
  });

  // Use callback if given.
  if (cb instanceof Function) {
    promise
      .then(cb.bind(null, null))
      .catch(cb);
    return;
  }

  return promise;
};


/**
 * Exchange the token of the logged in user with a token that is valid to call
 * the API (signed with the API secret).
 *
 * @method
 * @memberOf module:auth.TokensManager.prototype
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
 *
 * @param   {Object}    data                Token data object.
 * @param   {String}    data.id_token       User ID token.
 * @param   {String}    data.refresh_token  User refresh token.
 * @param   {String}    data.target         Target client ID.
 * @param   {String}    data.api_type       The API to be used (aws, auth0, etc).
 * @param   {String}    data.grant_type     Grant type (password, jwt, etc).
 * @param   {Function}  [cb]                Callback function.
 *
 * @return  {Promise|undefined}
 */
TokensManager.prototype.getDelegationToken = function (data, cb) {
  var body = extend({ client_id : this.clientId }, data);
  var headers = this.headers;

  if (!data) {
    throw new ArgumentError('Missing token data object');
  }

  var hasIdToken = typeof data.id_token === 'string'
      && data.id_token.trim().length !== 0;

  var hasRefreshToken = typeof data.refresh_token === 'string'
      && data.refresh_token.trim().length !== 0;

  if (!hasIdToken && !hasRefreshToken) {
    throw new ArgumentError('one of id_token or refresh_token is required');
  }

  if (hasIdToken && hasRefreshToken) {
    throw new ArgumentError('id_token and refresh_token fields cannot be specified simulatenously');
  }

  if (typeof data.target !== 'string'
      || data.target.trim().length === 0) {
    throw new ArgumentError('target field is required');
  }

  if (typeof data.api_type !== 'string'
      || data.api_type.trim().length === 0) {
    throw new ArgumentError('api_type field is required');
  }

  if (typeof data.grant_type !== 'string'
      || data.grant_type.trim().length === 0) {
    throw new ArgumentError('grant_type field is required');
  }

  // Perform the request.
  var promise = getRequestPromise({
    method: 'POST',
    url: this.baseUrl + '/delegation',
    data: body,
    headers: headers
  });

  // Use callback if given.
  if (cb instanceof Function) {
    promise
      .then(cb.bind(null, null))
      .catch(cb);
    return;
  }

  return promise;
};


module.exports = TokensManager;
