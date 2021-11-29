const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Auth0 Grants Manager.
 *
 * See {@link https://auth0.com/docs/api/v2#!/Grants Grants}
 */
class GrantsManager {
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
     * {@link https://auth0.com/docs/api/v2#!/Grants Auth0 Grants endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/grants/:id`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);
  }

  /**
   * Get all Auth0 Grants.
   *
   * @example
   * var params = {
   *   per_page: 10,
   *   page: 0,
   *   include_totals: true,
   *   user_id: 'USER_ID',
   *   client_id: 'CLIENT_ID',
   *   audience: 'AUDIENCE'
   * };
   *
   * management.getGrants(params, function (err, grants) {
   *   console.log(grants.length);
   * });
   * @param   {object}    params                Grants parameters.
   * @param   {number}    params.per_page       Number of results per page.
   * @param   {number}    params.page           Page number, zero indexed.
   * @param   {boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
   * @param   {string}    params.user_id        The user_id of the grants to retrieve.
   * @param   {string}    params.client_id      The client_id of the grants to retrieve.
   * @param   {string}    params.audience       The audience of the grants to retrieve.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Delete an Auth0 grant.
   *
   * @example
   * var params = {
   *    id: 'GRANT_ID',
   *    user_id: 'USER_ID'
   * };
   *
   * management.deleteGrant(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Grant deleted.
   * });
   * @param   {object}    params         Grant parameters.
   * @param   {string}    params.id      Grant ID.
   * @param   {string}    params.user_id The user_id of the grants to delete.
   * @param   {Function}  [cb]           Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = GrantsManager;
