const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Auth0 Clients Manager.
 *
 * {@link https://auth0.com/docs/api/v2#!/Clients Clients} represent
 * applications.
 * You can learn more about this in the
 * {@link https://auth0.com/docs/applications Applications} section of the
 * documentation.
 */
class ClientsManager {
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
     * {@link https://auth0.com/docs/api/v2#!/Clients Auth0 Clients endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/clients/:client_id`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/management/v2#!/Clients/post_rotate_secret Auth0 Clients Rotate a client secret}.
     *
     * @type {external:RestClient}
     */
    const auth0RotateSecretClient = new Auth0RestClient(
      `${options.baseUrl}/clients/:client_id/rotate-secret`,
      clientOptions,
      options.tokenProvider
    );
    this.rotateSecretResource = new RetryRestClient(auth0RotateSecretClient, options.retry);
  }

  /**
   * Create an Auth0 client.
   *
   * @example
   * management.clients.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Client created.
   * });
   * @param   {object}    data     The client data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all Auth0 clients.
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
   * management.clients.getAll(params, function (err, clients) {
   *   console.log(clients.length);
   * });
   * @param   {object}    [params]          Clients parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Get an Auth0 client.
   *
   * @example
   * management.clients.get({ client_id: CLIENT_ID }, function (err, client) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(client);
   * });
   * @param   {object}    params            Client parameters.
   * @param   {string}    params.client_id  Application client ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }

  /**
   * Update an Auth0 client.
   *
   * @example
   * var data = { name: 'newClientName' };
   * var params = { client_id: CLIENT_ID };
   *
   * management.clients.update(params, data, function (err, client) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(client.name);  // 'newClientName'
   * });
   * @param   {object}    params            Client parameters.
   * @param   {string}    params.client_id  Application client ID.
   * @param   {object}    data              Updated client data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  update(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Delete an Auth0 client.
   *
   * @example
   * management.clients.delete({ client_id: CLIENT_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Client deleted.
   * });
   * @param   {object}    params            Client parameters.
   * @param   {string}    params.client_id  Application client ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }

  /**
   * Rotate a client secret
   *
   * @example
   * management.clients.rotateClientSecret({ client_id: CLIENT_ID }, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Client secret rotated.
   * });
   * @param   {object}    params              params object
   * @param   {string}    params.client_id    Application client ID.
   * @returns  {Promise|undefined}
   */
  rotateClientSecret(params, cb) {
    const query = params || {};

    // Require a client ID.
    if (!params.client_id) {
      throw new ArgumentError('The client_id cannot be null or undefined');
    }

    if (cb && cb instanceof Function) {
      return this.rotateSecretResource.create(query, {}, cb);
    }

    return this.rotateSecretResource.create(query, {});
  }
}

module.exports = ClientsManager;
