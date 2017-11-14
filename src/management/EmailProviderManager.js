var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */


/**
 * @class EmailProviderManager
 * Auth0 Email Provider.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var EmailProviderManager = function (options) {
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
   * @type {Object}
   */
  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 Clients endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(options.baseUrl + '/emails/provider', clientOptions, options.tokenProvider);
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};


/**
 * Configure the email provider.
 *
 * @method    configure
 * @memberOf  module:management.EmailProviderManager.prototype
 *
 * @example
 * management.emailProvider.configure(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Email provider configured.
 * });
 * @param   {Object}    data     The email provider data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(EmailProviderManager, 'configure', 'resource.create');


/**
 * Get the email provider.
 *
 * @method    get
 * @memberOf  module:management.EmailProviderManager.prototype
 *
 * @example
 * management.emailProvider.get(function (err, provider) {
 *   console.log(provider);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(EmailProviderManager, 'get', 'resource.getAll');


/**
 * Update the email provider.
 *
 * @method    update
 * @memberOf  module:management.EmailProviderManager.prototype
 *
 * @example
 * management.emailProvider.update(params, data, function (err, provider) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Updated email provider.
 *   console.log(provider);
 * });
 *
 * @param   {Object}    params            Email provider parameters.
 * @param   {Object}    data              Updated email provider data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(EmailProviderManager, 'update', 'resource.patch');


/**
 * Delete email provider.
 *
 * @method    delete
 * @memberOf  module:management.EmailProviderManager.prototype
 *
 * @example
 * management.emailProvider.delete(function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Email provider configured.
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(EmailProviderManager, 'delete', 'resource.delete');


module.exports = EmailProviderManager;
