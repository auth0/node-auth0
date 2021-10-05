const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * The BlacklistedTokensManager class provides methods to retrieve the list of
 * blacklisted tokens and blacklist new ones..
 */
class BlacklistedTokensManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide client options');
    }

    if (options.baseUrl === null || options.baseUrl === undefined) {
      throw new ArgumentError('Must provide a base URL for the API');
    }

    if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
      throw new ArgumentError('The provided base URL is invalid');
    }

    /**
     * Options object for the Rest Client instance.
     *
     * @type {object}
     */
    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for consuming the
     * [Auth0 Blacklisted Tokens endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/blacklists/tokens`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);
  }

  /**
   * Blacklist a new token.
   *
   * @example
   * var token = {
   *  aud: 'aud',
   *  jti: 'jti'
   * };
   *
   * management.blacklistedTokens.add(token, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Token blacklisted.
   * });
   * @param   {object}    token      Token data.
   * @param   {string}    token.aud  Audience (your app client ID).
   * @param   {string}    token.jti  The JWT ID claim.
   * @param   {Function}  [cb]       Callback function.
   * @returns  {Promise|undefined}
   */
  add(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all blacklisted tokens.
   *
   * @example
   * management.blacklistedTokens.getAll(function (err, tokens) {
   *   console.log(tokens.length);
   * });
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }
}

module.exports = BlacklistedTokensManager;
