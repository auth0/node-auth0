const { ArgumentError } = require('rest-facade');
const utils = require('../utils');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 *
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class DeviceCredentialsManager
 * Manages Auth0 Device Credentials.
 * @class
 * @memberof module:management
 * @param {object} options            The client options.
 * @param {string} options.baseUrl    The URL of the API.
 * @param {object} [options.headers]  Headers to be included in all requests.
 * @param {object} [options.retry]    Retry Policy Config
 */
const DeviceCredentialsManager = function (options) {
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
};

/**
 * Create an Auth0 credential.
 *
 * @function    create
 * @memberof  module:management.DeviceCredentialsManager.prototype
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
utils.wrapPropertyMethod(DeviceCredentialsManager, 'createPublicKey', 'resource.create');

/**
 * Get all Auth0 credentials.
 *
 * @function  getAll
 * @memberof  module:management.DeviceCredentialsManager.prototype
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
utils.wrapPropertyMethod(DeviceCredentialsManager, 'getAll', 'resource.getAll');

/**
 * Delete an Auth0 device credential.
 *
 * @function    delete
 * @memberof  module:management.DeviceCredentialsManager.prototype
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
utils.wrapPropertyMethod(DeviceCredentialsManager, 'delete', 'resource.delete');

module.exports = DeviceCredentialsManager;
