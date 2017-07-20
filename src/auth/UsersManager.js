var extend = require('util')._extend;
var getRequestPromise = require('../utils').getRequestPromise;

var ArgumentError = require('rest-facade').ArgumentError;


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
var UsersManager = function (options) {
  if (typeof options !== 'object') {
    throw new ArgumentError('Missing users manager options');
  }

  if (typeof options.baseUrl !== 'string') {
    throw new ArgumentError('baseUrl field is required');
  }

  this.baseUrl = options.baseUrl;
  this.headers = options.headers;
  this.clientId = options.clientId;
};


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
UsersManager.prototype.getInfo = function (accessToken, cb) {
  var url = this.baseUrl + '/userinfo';
  var headers = extend({}, this.headers);

  if (accessToken === null || accessToken === undefined) {
    throw new ArgumentError('An access token is required');
  }

  if (typeof accessToken !== 'string' || accessToken.trim().length === 0) {
    throw new ArgumentError('Invalid access token');
  }

  // Send the user access token in the Authorization header.
  headers['Authorization'] = 'Bearer ' + accessToken;

  // Perform the request.
  var promise = getRequestPromise({
    method: 'GET',
    url: url,
    headers: headers,
    data: {}
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
 * var settings = {
 *   impersonator_id: '{IMPERSONATOR_ID}',
 *   protocol: 'oauth2',
 *   additionalParameters: {}  // Optional aditional params.
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
 * @param   {Function}  [cb]]                     Callback function.
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.impersonate = function (userId, settings, cb) {
  var url = this.baseUrl + '/users/' + userId + '/impersonate';

  if (userId === null || userId === undefined) {
    throw new ArgumentError('You must specify a user ID');
  }

  if (typeof userId !== 'string' || userId.trim().length === 0) {
    throw new ArgumentError('The user ID is not valid');
  }

  if (typeof settings !== 'object') {
    throw new ArgumentError('Missing impersonation settings object');
  }

  if (typeof settings.impersonator_id !== 'string'
      || settings.impersonator_id.trim().length === 0) {
    throw new ArgumentError('impersonator_id field is required');
  }

  if (typeof settings.protocol !== 'string'
      || settings.protocol.trim().length === 0) {
    throw new ArgumentError('protocol field is required');
  }

  if (typeof settings.token !== 'string'
      || settings.token.trim().length === 0) {
    throw new ArgumentError('token field is required');
  }

  var data = extend({ client_id: settings.clientId || this.clientId }, settings);
  var headers = extend({'Authorization': `Bearer ${settings.token}`}, this.headers);
  // Perform the request.
  var promise = getRequestPromise({
    method: 'POST',
    headers: headers,
    data: data,
    url: url
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


module.exports = UsersManager;
