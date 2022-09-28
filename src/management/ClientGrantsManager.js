const BaseManager = require('./BaseManager');

/**
 * Auth0 Client Grants Manager.
 *
 * See {@link https://auth0.com/docs/api/v2#!/Client_Grants Client Grants}
 */
class ClientGrantsManager extends BaseManager {
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
     * {@link https://auth0.com/docs/api/v2#!/Client_Grants Auth0 Client Grants endpoint}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/client-grants/:id');
  }

  /**
   * Create an Auth0 client grant.
   *
   * @example
   * management.clientGrants.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Client grant created.
   * });
   * @param   {object}    data     The client data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all Auth0 Client Grants.
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
   *
   * management.clientGrants.getAll(params, function (err, grants) {
   *   console.log(grants.length);
   * });
   * @param   {object}    [params]          Client Grants parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Update an Auth0 client grant.
   *
   * @example
   * var data = {
   *   client_id: CLIENT_ID,
   *   audience: AUDIENCE,
   *   scope: []
   * };
   * var params = { id: CLIENT_GRANT_ID };
   *
   * management.clientGrants.update(params, data, function (err, grant) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(grant.id);
   * });
   * @param   {object}    params     Client parameters.
   * @param   {string}    params.id  Client grant ID.
   * @param   {object}    data       Updated client data.
   * @param   {Function}  [cb]       Callback function.
   * @returns    {Promise|undefined}
   */
  update(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Delete an Auth0 client grant.
   *
   * @example
   * management.clientGrants.delete({ id: GRANT_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Grant deleted.
   * });
   * @param   {object}    params     Client parameters.
   * @param   {string}    params.id  Client grant ID.
   * @param   {Function}  [cb]       Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = ClientGrantsManager;
