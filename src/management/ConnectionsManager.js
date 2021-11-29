const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Represents the relationship between Auth0 and an Identity provider.
 */
class ConnectionsManager {
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
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://auth0.com/docs/api/v2#!/ConnectionsManagers Auth0
     *  Connections}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/connections/:id`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);

    const statusClient = new Auth0RestClient(
      `${options.baseUrl}/connections/:id/status`,
      clientOptions,
      options.tokenProvider
    );
    this.status = new RetryRestClient(statusClient, options.retry);

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/management/v2#!/Connections/delete_users_by_email
     * endpoint}.
     *
     * @type {external:RestClient}
     */
    const userAuth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/connections/:id/users`,
      clientOptions,
      options.tokenProvider
    );
    this.user = new RetryRestClient(userAuth0RestClient, options.retry);
  }

  /**
   * Create a new connection.
   *
   * @example
   * management.connections.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Connection created.
   * });
   * @param   {object}    data     Connection data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all connections.
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
   * management.connections.getAll(params, function (err, connections) {
   *   console.log(connections.length);
   * });
   * @param   {object}    [params]          Connections params.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Get an Auth0 connection.
   *
   * @example
   * management.connections.get({ id: CONNECTION_ID }, function (err, connection) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(connection);
   * });
   * @param   {object}    params          Connection parameters.
   * @param   {string}    params.id       Connection ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }

  /**
   * Update an existing connection.
   *
   * @example
   * var data = { name: 'newConnectionName' };
   * var params = { id: CONNECTION_ID };
   *
   * management.connections.update(params, data, function (err, connection) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(connection.name);  // 'newConnectionName'
   * });
   * @param   {object}    params        Connection parameters.
   * @param   {string}    params.id     Connection ID.
   * @param   {object}    data          Updated connection data.
   * @param   {Function}  [cb]          Callback function.
   * @returns    {Promise|undefined}
   */
  update(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Delete an existing connection.
   *
   * @example
   * management.connections.delete({ id: CONNECTION_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Connection deleted.
   * });
   * @param   {object}    params          Connection parameters.
   * @param   {string}    params.id       Connection ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }

  /**
   * Checks the status of an ad/ldap connection referenced by its ID.
   *
   * @example
   * var params = {id : 'CONNECTION_ID'}
   * @example <caption>
   *   This methods takes the connection ID and returns the status when online, or an error when offline.
   * </caption>
   *
   * management.connections.checkStatus( {id : 'CONNECTION_ID'}, function (err, status) {
   *   if (err) {
   *     console.log('OFFLINE', err);
   *   } else {
   *     console.log('ONLINE', status);
   *   }
   * });
   * @param   {object}    params              Connection parameters
   * @param   {string}    params.id           ID of the Connection.
   * @param   {Function}  [cb]                Callback function.
   * @returns  {Promise|undefined}
   */
  checkStatus(...args) {
    return this.status.get(...args);
  }

  /**
   * Delete a connection user by email.
   *
   * @example
   * management.connections.deleteUserByEmail({ id: CONNECTION_ID, email:USER_EMAIL }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User deleted.
   * });
   * @param   {object}    params          Connection parameters.
   * @param   {string}    params.id       Connection ID.
   * @param   {string}    params.email    User Email.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  deleteUserByEmail(params, cb) {
    if (typeof params !== 'object' || typeof params.email !== 'string' || params.email.length < 1) {
      throw new ArgumentError('You must provide an email for the deleteUserByEmail method');
    }

    if (!params.id) {
      throw new ArgumentError('The connection id cannot be null or undefined');
    }

    if (cb && cb instanceof Function) {
      return this.user.delete(params, {}, cb);
    }

    return this.user.delete(params, {});
  }
}

module.exports = ConnectionsManager;
