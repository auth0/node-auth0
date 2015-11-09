var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external Rest
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class DeviceCredential
 * Manages Auth0 Device Credentials.
 * @constructor
 *
 * @param {Object} options            The credential options.
 * @param {String} options.token      The API access token.
 * @param {String} [options.region]   The code for the region in use.
 * @param {String} [options.domain]   The API domain for the region in use.
 */
var DeviceCredential = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide credential options');
  }

  /**
   * Options object for the RestClient instance.
   *
   * @type {Object}
   */
  clientOptions = {
    headers: { 'Authorization': 'Bearer ' + options.accessToken },
    query: { convertCase: 'snakeCase' }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 DeviceCredentials endpoint]{@link https://auth0.com/docs/api/v2#!/Device_Credentials}.
   *
   * @type {external:RestDeviceCredential}
   */
  this.resource = new RestDeviceCredential(options.baseUrl + '/device-credentials/:credentialId', clientOptions);
};

/**
 * Create an Auth0 credential.
 *
 * @method    create
 * @memberOf  DeviceCredential
 * @return    {Promise}
 */
utils.wrapPropertyMethod(DeviceCredential, 'createPublicKey', 'resource.create');

/**
 * Get all Auth0 credentials.
 *
 * @method  getAll
 * @memberOf  DeviceCredential
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(DeviceCredential, 'getAll', 'resource.getAll');

/**
 * Delete an Auth0 device credential.
 *
 * @method    delete
 * @memberOf  DeviceCredential
 * @return    {Promise}
 */
utils.wrapPropertyMethod(DeviceCredential, 'delete', 'resource.delete');


module.exports = DeviceCredential;
