// @todo: remove bluebird when node v6 becomes EoL
const { promisify } = require('bluebird');
const { ArgumentError } = require('rest-facade');
const memoizer = require('lru-memoizer');
const AuthenticationClient = require('../auth');

const DEFAULT_OPTIONS = { enableCache: true };

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
class ManagementTokenProvider {
  constructor(options) {
    if (!options || typeof options !== 'object') {
      throw new ArgumentError('Options must be an object');
    }

    const params = Object.assign({}, DEFAULT_OPTIONS, options);

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

    if (typeof params.enableCache !== 'boolean') {
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

    if (params.scope && typeof params.scope !== 'string') {
      throw new ArgumentError('scope must be a string');
    }

    this.options = params;
    const { domain, clientId, clientSecret, telemetry } = this.options;
    const authenticationClientOptions = {
      domain,
      clientId,
      clientSecret,
      telemetry
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
  getAccessToken() {
    if (this.options.enableCache) {
      return this.getCachedAccessToken(this.options).then(({ access_token }) => access_token);
    } else {
      const { domain, scope, audience } = this.options;
      return this.clientCredentialsGrant(domain, scope, audience).then(
        ({ access_token }) => access_token
      );
    }
  }

  clientCredentialsGrant(domain, scope, audience) {
    return this.authenticationClient.clientCredentialsGrant({ audience, scope });
  }
}

ManagementTokenProvider.prototype.getCachedAccessToken = promisify(
  memoizer({
    load(options, callback) {
      const { domain, scope, audience } = options;
      this.clientCredentialsGrant(domain, scope, audience)
        .then(data => {
          callback(null, data);
        })
        .catch(err => {
          callback(err);
        });
    },
    hash(options) {
      const { domain, clientId, scope } = options;
      return `${domain}-${clientId}-${scope}`;
    },
    itemMaxAge(options, data) {
      if (options.cacheTTLInSeconds) {
        return options.cacheTTLInSeconds * 1000;
      }

      // if the expires_in is lower than 10 seconds, do not subtract 10 additional seconds.
      if (data.expires_in && data.expires_in < 10 /* seconds */) {
        return data.expires_in * 1000;
      } else if (data.expires_in) {
        // Subtract 10 seconds from expires_in to fetch a new one, before it expires.
        return data.expires_in * 1000 - 10000 /* milliseconds */;
      }
      return 60 * 60 * 1000; //1h
    },
    max: 100
  })
);

module.exports = ManagementTokenProvider;
