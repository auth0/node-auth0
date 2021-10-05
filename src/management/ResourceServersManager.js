const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Auth0 Resource Servers Manager.
 *
 * {@link https://auth0.com/docs/api/management/v2#!/Resource_Servers Resource Servers} represents
 * your APIs.
 * You can learn more about this in the
 * {@link https://auth0.com/docs/api-auth API Authorization} section of the
 * documentation.
 */
class ResourceServersManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide resource server options');
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
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/ResourceServers Auth0 Resource Servers endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/resource-servers/:id`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);
  }

  /**
   * Create an API (Resource Server).
   *
   * @example
   * management.resourceServers.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Resource Server created.
   * });
   * @param   {object}    data     Resource Server data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all resource servers.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.resourceServers.getAll(params, function (err, resourceServers) {
   *   console.log(resourceServers.length);
   * });
   * @param   {object}    [params]          Resource Servers parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Get a Resource Server.
   *
   * @example
   * management.resourceServers.get({ id: RESOURCE_SERVER_ID }, function (err, resourceServer) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(resourceServer);
   * });
   * @param   {object}    params            Resource Server parameters.
   * @param   {string}    params.id         Resource Server ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }

  /**
   * Update an existing resource server.
   *
   * @example
   * var data = { name: 'newResourceServerName' };
   * var params = { id: RESOURCE_SERVER_ID };
   *
   * management.resourceServers.update(params, data, function (err, resourceServer) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(resourceServer.name);  // 'newResourceServernName'
   * });
   * @param   {object}    params            Resource Server parameters.
   * @param   {string}    params.id         Resource Server ID.
   * @param   {object}    data              Updated Resource Server data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  update(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Delete an existing Resource Server.
   *
   * @example
   * management.resourceServers.delete({ id: RESOURCE_SERVER_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Resource Server deleted.
   * });
   * @param   {object}    params            Resource Server parameters.
   * @param   {string}    params.id         Resource Server ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = ResourceServersManager;
