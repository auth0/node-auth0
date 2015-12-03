var extend = require('util')._extend;
var getRequestPromise = require('../utils').getRequestPromise;

var ArgumentError = require('../exceptions').ArgumentError;


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
 * Refresh the token.
 *
 * @method
 * @memberOf TokensManager
 */
TokensManager.prototype.refresh = function (accessToken, cb) {

};


/**
 * Get the token info.
 *
 * @method
 * @memberOf TokensManager
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
 * @memberOf TokensManager
 */
TokensManager.prototype.getDelegationToken = function (data, cb) {
  var body = extend({ client_id : this.clientId }, data);
  var headers = this.headers;

  if (!data) {
    throw new ArgumentError('Missing token data object');
  }

  if (typeof data.id_token !== 'string' || data.id_token.trim().length === 0) {
    throw new ArgumentError('id_token field is required');
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
