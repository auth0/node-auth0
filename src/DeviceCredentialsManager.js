var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class DeviceCredentialsManager
 * Manages Auth0 Device Credentials.
 * @constructor
 *
 * @param {Object} options            The credential options.
 * @param {String} options.token      The API access token.
 * @param {String} [options.region]   The code for the region in use.
 * @param {String} [options.domain]   The API domain for the region in use.
 */
var DeviceCredentialsManager = function (options) {
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
   * @type {Object}
   */
  clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 DeviceCredentialsManagers endpoint]{@link https://auth0.com/docs/api/v2#!/Device_Credentials}.
   *
   * @type {external:RestDeviceCredentialsManager}
   */
  this.resource = new RestClient(options.baseUrl + '/device-credentials/:id', clientOptions);
};

/**
 * Create an Auth0 credential.
 *
 * @method    create
 * @memberOf  DeviceCredentialsManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(DeviceCredentialsManager, 'createPublicKey', 'resource.create');

/**
 * Get all Auth0 credentials.
 *
 * @method  getAll
 * @memberOf  DeviceCredentialsManager
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(DeviceCredentialsManager, 'getAll', 'resource.getAll');

/**
 * Delete an Auth0 device credential.
 *
 * @method    delete
 * @memberOf  DeviceCredentialsManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(DeviceCredentialsManager, 'delete', 'resource.delete');


module.exports = DeviceCredentialsManager;
