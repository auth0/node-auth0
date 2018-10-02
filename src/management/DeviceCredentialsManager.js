const { ArgumentError } = require('rest-facade');
const { wrapPropertyMethod } = require('../utils');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class DeviceCredentialsManager
 * Manages Auth0 Device Credentials.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
class DeviceCredentialsManager {
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

    const { headers, baseUrl, tokenProvider, retry } = options;

    /**
     * Options object for the RestClient instance.
     *
     * @type {Object}
     */
    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers,
      query: { repeatParams: false }
    };

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Device_Credentials
     *  Auth0 DeviceCredentialsManagers endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${baseUrl}/device-credentials/:id`,
      clientOptions,
      tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, retry);
  }
}

/**
 * Create an Auth0 credential.
 *
 * @method    create
 * @memberOf  module:management.DeviceCredentialsManager.prototype
 *
 * @example
 * management.deviceCredentials.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Credential created.
 * });
 *
 * @param   {Object}    data     The device credential data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(DeviceCredentialsManager, 'createPublicKey', 'resource.create');

/**
 * Get all Auth0 credentials.
 *
 * @method  getAll
 * @memberOf  module:management.DeviceCredentialsManager.prototype
 *
 * @example
 * management.deviceCredentials.getAll(function (err, credentials) {
 *   console.log(credentials.length);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(DeviceCredentialsManager, 'getAll', 'resource.getAll');

/**
 * Delete an Auth0 device credential.
 *
 * @method    delete
 * @memberOf  module:management.DeviceCredentialsManager.prototype
 *
 * @example
 * const params = { id: CREDENTIAL_ID };
 *
 * management.deviceCredentials.delete(params, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Credential deleted.
 * });
 *
 * @param   {Object}    params          Credential parameters.
 * @param   {String}    params.id       Device credential ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(DeviceCredentialsManager, 'delete', 'resource.delete');

module.exports = DeviceCredentialsManager;
