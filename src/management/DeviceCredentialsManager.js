const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Manages Auth0 Device Credentials.
 */
class DeviceCredentialsManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide manager options');
    }

    if (options.baseUrl === null || options.baseUrl === undefined) {
      throw new ArgumentError('Must provide a base URL for the API');
    }

    if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
      throw new ArgumentError('The provided base URL is invalid');
    }

    /**
     * Options object for the RestClient instance.
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
     * {@link https://auth0.com/docs/api/v2#!/Device_Credentials
     *  Auth0 DeviceCredentialsManagers endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/device-credentials/:id`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);
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
