const BaseManager = require('./BaseManager');

/**
 * The client credentials class provides a simple abstraction for performing CRUD operations
 * on Auth0 ClientCredentials.
 */
class ClientCredentialsManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    /**
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/clients/:client_id/credentials/:credential_id');
  }

  /**
   * Create a new client credential.
   *
   * @example
   * var params = { client_id: CLIENT_ID };
   *
   * management.clientCredentials.create(params, data, function (err, credential) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // The credential created.
   *   console.log({credential});
   * });
   * @param   {string}    params.client_id   The client id.
   * @param   {object}    data               Client Credential data object.
   * @param   {Function}  [cb]               Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Return a list of credentials for a given client.
   *
   * @example
   * var params = { client_id: CLIENT_ID };
   *
   * management.clientCredentials.getAll(params, function (err, credentials) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // A list of credentials associated with that client.
   *   console.log({credentials});
   * });
   * @param   {string}    params.client_id   The client id.
   * @param   {Function}  [cb]               Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Return a credential for a given client.
   *
   * @example
   * var params = { client_id: CLIENT_ID, credential_id: CREDENTIAL_ID };
   *
   * management.clientCredentials.getById(data, function (err, credential) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // A specific credential associated with that credential.
   *   console.log({credential});
   * });
   * @param   {string}    params.client_id      The client id.
   * @param   {string}    params.credential_id  The credential id.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }

  /**
   * Delete a credential for a given client.
   *
   * @example
   * var params = { client_id: CLIENT_ID, credential_id: CREDENTIAL_ID };
   *
   * management.clientCredentials.delete(params, data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {string}    params.client_id      The client id.
   * @param   {string}    params.credential_id  The credential id.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = ClientCredentialsManager;
