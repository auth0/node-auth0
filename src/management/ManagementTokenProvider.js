const { ArgumentError } = require('rest-facade');
const AuthenticationClient = require('../auth');
const memoizer = require('lru-memoizer');
const util = require('util');

/**
 * Auth0 Management API Token Provider.
 */
class ManagementTokenProvider {
  /**
   * @param {object}  options                         Options for the ManagementTokenProvider.
   * @param {string}  options.domain                  ManagementClient server domain.
   * @param {string}  options.clientId                Non Interactive Client Id.
   * @param {string}  options.clientSecret            Non Interactive Client Secret.
   * @param {string}  options.scope                   Non Interactive Client Scope.
   * @param {string}  options.audience                Audience of the Management API.
   * @param {boolean} [options.enableCache=true]      Enabled or Disable Cache
   * @param {number}  [options.cacheTTLInSeconds]     By default the `expires_in` value will be used to determine the cached time of the token, this can be overridden.
   * @param {object}  [options.headers]               Additional headers that will be added to the outgoing requests.
   */
  constructor(options) {
    if (!options || typeof options !== 'object') {
      throw new ArgumentError('Options must be an object');
    }

    const params = { enableCache: true, ...options };

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
    const authenticationClientOptions = {
      domain: this.options.domain,
      clientId: this.options.clientId,
      clientSecret: this.options.clientSecret,
      telemetry: this.options.telemetry,
      clientInfo: this.options.clientInfo,
      headers: this.options.headers,
    };
    this.authenticationClient = new AuthenticationClient(authenticationClientOptions);

    const self = this;
    this.getCachedAccessToken = util.promisify(
      memoizer({
        load(options, callback) {
          self
            .clientCredentialsGrant(options.domain, options.scope, options.audience)
            .then((data) => {
              callback(null, data);
            })
            .catch((err) => {
              callback(err);
            });
        },
        hash(options) {
          return `${options.domain}-${options.clientId}-${options.scope}`;
        },
        itemMaxAge(options, data) {
          if (options.cacheTTLInSeconds) {
            return options.cacheTTLInSeconds * 1000;
          }

          // if the expires_in is lower or equal to than 10 seconds, do not subtract 10 additional seconds.
          if (data.expires_in && data.expires_in <= 10 /* seconds */) {
            return data.expires_in * 1000;
          } else if (data.expires_in) {
            // Subtract 10 seconds from expires_in to fetch a new one, before it expires.
            return data.expires_in * 1000 - 10000 /* milliseconds */;
          }
          return 60 * 60 * 1000; //1h
        },
        max: 100,
      })
    );
  }

  /**
   * Returns the access_token.
   *
   * @returns {Promise} Promise returning an access_token.
   */
  async getAccessToken() {
    if (this.options.enableCache) {
      const data = await this.getCachedAccessToken(this.options);
      return data.access_token;
    } else {
      const data = await this.clientCredentialsGrant(
        this.options.domain,
        this.options.scope,
        this.options.audience
      );
      return data.access_token;
    }
  }

  clientCredentialsGrant(domain, scope, audience) {
    return this.authenticationClient.clientCredentialsGrant({
      audience,
      scope,
    });
  }
}

module.exports = ManagementTokenProvider;
