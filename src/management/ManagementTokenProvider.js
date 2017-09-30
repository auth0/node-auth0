var ArgumentError = require('rest-facade').ArgumentError;
var assign = Object.assign || require('object.assign');
var AuthenticationClient = require('../auth');
var memoizer = require('lru-memoizer');
var Promise = require('bluebird');

var DEFAULT_OPTIONS = { enableCache: true };

/**
 * @class ManagementTokenProvider
 * Auth0 Management API Token Provider.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object}  options                         Options for the ManagementTokenProvider.
 * @param {String}  options.domain                  ManagementClient server domain.
 * @param {String}  options.clientId                Non Interactive Client Id.
 * @param {String}  options.clientSecret            Non Interactive Client Secret.
 * @param {String}  options.scope                   Non Interactive Client Scope.
 * @param {String}  options.audience                Audience of the Management API.
 * @param {Boolean} [options.enableCache=true]      Enabled or Disable Cache
 * @param {Number}  [options.cacheTTLInSeconds]     By default the `expires_in` value will be used to determine the cached time of the token, this can be overridden.
 */
var ManagementTokenProvider = function (options) {
  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Options must be an object');
  }

  var params = assign({}, DEFAULT_OPTIONS, options);

  if (!params.domain || params.domain.length === 0) {
    throw new ArgumentError('Must provide a domain');
  }

  if (!params.clientId || params.clientId.length === 0) {
    throw new ArgumentError('Must provide a clientId');
  }

  if (!params.clientSecret || params.clientSecret.length === 0) {
    throw new ArgumentError('Must provide a clientSecret');
  }

  if (!params.audience || params.audience.length === 0) {
    throw new ArgumentError('Must provide a audience');
  }

  if (typeof params.enableCache !== 'boolean'){
    throw new ArgumentError('enableCache must be a boolean');
  }

  if (params.enableCache && params.cacheTTLInSeconds) {
    if (typeof params.cacheTTLInSeconds !== 'number') {
      throw new ArgumentError('cacheTTLInSeconds must be a number');
    }

    if (params.cacheTTLInSeconds <= 0) {
      throw new ArgumentError('cacheTTLInSeconds must be a greater than 0');
    }
  }

  if (params.scope && typeof params.scope !== 'string'){
    throw new ArgumentError('scope must be a string');
  }

  this.options = params;
  var authenticationClientOptions = {
    domain: this.options.domain,
    clientId: this.options.clientId,
    clientSecret: this.options.clientSecret,
    telemetry: this.options.telemetry
  };
  this.authenticationClient = new AuthenticationClient(authenticationClientOptions);
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
  if(this.options.enableCache){
     return this.getCachedAccessToken(this.options)
      .then(function (data) {
        return data.access_token
      });
  }else{
    return this.clientCredentialsGrant(this.options.domain, this.options.scope, this.options.audience)
      .then(function (data) {
        return data.access_token
      });
  }
}

ManagementTokenProvider.prototype.getCachedAccessToken = Promise.promisify(
  memoizer({
    load: function (options, callback) {
      this.clientCredentialsGrant(options.domain, options.scope, options.audience)
        .then(function (data) {
          callback(null, data);
        })
        .catch(function (err) {
          callback(err);
        });
    },
    hash: function (options) {
      return options.domain + '-' + options.clientId + '-' + options.scope;
    },
    itemMaxAge: function (options, data) {
      if(options.cacheTTLInSeconds){
        return options.cacheTTLInSeconds * 1000;
      }

      // if the expires_in is lower than 10 seconds, do not subtract 10 additional seconds.
      if (data.expires_in && data.expires_in < 10 /* seconds */){
        return data.expires_in * 1000;
      }else if(data.expires_in){
        // Subtract 10 seconds from expires_in to fetch a new one, before it expires.
        return data.expires_in * 1000 - 10000 /* milliseconds */;
      }
      return 60 * 60 * 1000; //1h
    },
    max: 100
  })
);

ManagementTokenProvider.prototype.clientCredentialsGrant = function (domain, scope, audience) {
  return this.authenticationClient.clientCredentialsGrant({
    audience: audience,
    scope: scope
  });
};

module.exports = ManagementTokenProvider;
