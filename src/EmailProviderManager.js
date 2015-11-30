var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class EmailProviderManager
 * Auth0 Email Provider.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.token      The API access token.
 * @param {String} [options.region]   The code for the region in use.
 * @param {String} [options.domain]   The API domain for the region in use.
 */
var EmailProviderManager = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');h
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
   * @type {Object}
   */
  clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 Clients endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/emails/provider', clientOptions);
};

/**
 * Configure the email provider.
 *
 * @method  configure
 * @memberOf  EmailProviderManager
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(EmailProviderManager, 'configure', 'resource.create');

/**
 * Get the email provider.
 *
 * @method  get
 * @memberOf  EmailProviderManager
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(EmailProviderManager, 'get', 'resource.getAll');


/**
 * Update the email provider.
 *
 * @method    update
 * @memberOf  EmailProviderManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(EmailProviderManager, 'update', 'resource.patch');

/**
 * Delete email provider.
 *
 * @method    delete
 * @memberOf  EmailProviderManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(EmailProviderManager, 'delete', 'resource.delete');


module.exports = EmailProviderManager;
