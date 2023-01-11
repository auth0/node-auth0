const BaseManager = require('./BaseManager');

/**
 * Manages Auth0 Device Credentials.
 */
class DeviceCredentialsManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    /**
     * Options object for the RestClient instance.
     *
     * @type {object}
     */

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Device_Credentials
     *  Auth0 DeviceCredentialsManagers endpoint}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/device-credentials/:id');
  }

  /**
   * Create an Auth0 credential.
   *
   * @example
   * management.deviceCredentials.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Credential created.
   * });
   * @param   {object}    data     The device credential data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createPublicKey(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all Auth0 credentials.
   *
   * @example
   * var params = {user_id: "USER_ID"};
   *
   * management.deviceCredentials.getAll(params, function (err, credentials) {
   *   console.log(credentials.length);
   * });
   * @param   {object}    params  Credential parameters.
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Delete an Auth0 device credential.
   *
   * @example
   * var params = { id: CREDENTIAL_ID };
   *
   * management.deviceCredentials.delete(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Credential deleted.
   * });
   * @param   {object}    params          Credential parameters.
   * @param   {string}    params.id       Device credential ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = DeviceCredentialsManager;
