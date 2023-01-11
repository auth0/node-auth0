const BaseManager = require('./BaseManager');

/**
 * The BlacklistedTokensManager class provides methods to retrieve the list of
 * blacklisted tokens and blacklist new ones..
 */
class BlacklistedTokensManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    /**
     * Provides an abstraction layer for consuming the
     * [Auth0 Blacklisted Tokens endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/blacklists/tokens');
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
