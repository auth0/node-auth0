var ArgumentError = require('rest-facade').ArgumentError;
var assign = Object.assign || require('object.assign');
var AuthenticationClient = require('../auth');
var memoizer = require('lru-memoizer');
var Promise = require('bluebird');

var BASE_URL_FORMAT = 'https://%s';
var DEFAULT_OPTIONS = { useCache : true };

/**
 * @class ManagementTokenProvider
 * Auth0 Management API Token Provider.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options                  Options for the ManagementTokenProvider.
 * @param {String} options.domain           ManagementClient server domain.
 * @param {String} options.clientId         Non Interactive Client Id.
 * @param {String} options.clientSecret     Non Interactive Client Secret.
 * @param {String} [options.useCache]       Enable caching (default true)
 * @param {String} [options.scope]          Scope
 * @example <caption>
 *   Initialize a Management Token Provider class.
 * </caption>
 *
 * var ManagementTokenProvider = require('auth0').ManagementTokenProvider;
 * var provider = new ManagementTokenProvider({
 *   clientId: '{YOUR_NON_INTERACTIVE_CLIENT_ID}',
 *   clientSecret: '{YOUR_NON_INTERACTIVE_CLIENT_SECRET}',
 *   domain: '{YOUR_ACCOUNT}.auth0.com'
 * });
 */
var ManagementTokenProvider = function (options) {
  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Options must be an object');
  }

  var params = assign({}, DEFAULT_OPTIONS, options);

  if (!params.clientId || params.clientId.length === 0) {
    throw new ArgumentError('Must provide a Client Id');
  }

  if (!params.clientSecret || params.clientSecret.length === 0) {
    throw new ArgumentError('Must provide a Client Secret');
  }

  if(typeof params.useCache !== 'boolean'){
    throw new ArgumentError('The useCache must be a boolean');
  }
  
  this.options = params;

  this.authenticationClient = new AuthenticationClient({
    domain: params.domain,
    clientId: params.clientId,
    clientSecret: params.clientSecret,
    telemetry: params.telemetry
  });
}

/**
 * Returns the access_token.
 *
 * @method    getAccessToken
 * @memberOf  module:management.ManagementTokenProvider.prototype
 *
 * @return {Promise}   Promise returning an access_token.
 */
ManagementTokenProvider.prototype.getAccessToken = function () {
  
  if(this.options.useCache){
     return this.getCachedAccessToken(this.options.domain, this.options.clientId, this.options.scope)
      .then(function (data) {
        return data.access_token
      });
  }else{
    return this.clientCredentialsGrant(this.options.domain, this.options.scope)
      .then(function (data) {
        return data.access_token
      });
  }
}

ManagementTokenProvider.prototype.getCachedAccessToken = Promise.promisify(
  memoizer({
    load: function (domain, clientId, scope, callback) {
      this.clientCredentialsGrant(domain, scope)
        .then(function (data) {
          callback(null, data);
        })
        .catch(function (err) {
          callback(err);
        });
    },
    hash: function (domain, clientId, scope) {
      return domain + '-' + clientId + '-' + scope;
    },
    itemMaxAge: function (domain, clientid, scope, data) {
      // if the expires_in is lower than 10 seconds, do not subtract 10 additional seconds.
      if (data.expires_in && data.expires_in < 10 /* seconds */){
        return data.expires_in * 1000;
      }else if(data.expires_in){
        // Subtract 10 seconds from expires_in to fetch a new one, before it expires.
        return data.expires_in * 1000 - 10000/* milliseconds */;
      }
      return 3600 * 1000 // 1h; 
    },
    max: 100,
    maxAge: 1000 * 60
  })
);

ManagementTokenProvider.prototype.clientCredentialsGrant = function (domain, scope) {
  return this.authenticationClient.clientCredentialsGrant({
    audience: 'https://' + domain + '/api/v2/',
    scope: scope
  });
};

module.exports = ManagementTokenProvider;
