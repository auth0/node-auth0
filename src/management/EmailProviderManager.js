var RestClient = require('rest-facade').Client;
var ArgumentError = require('../exceptions').ArgumentError;
var utils = require('../utils');


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
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
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
 *
 * @example
 * // Using auth0 instance.
 * auth0.configureEmailProvider(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Email provider configured.
 * });
 *
 *
 * // Using the email provider manager directly.
 * auth0.emailProvider.configure(data, function (err) {
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
 * @method  get
 * @memberOf  EmailProviderManager
 *
 * @example
 * // Using auth0 instance.
 * auth0.getEmailProvider(function (err, provider) {
 *   console.log(provider.length);
 * });
 *
 *
 * // Using the email provider manager directly.
 * auth0.emailProvider.get(function (err, provider) {
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
 * @memberOf  EmailProviderManager
 *
 * @example
 * // Using auth0 instance.
 * auth0.updateEmailProvider(data, function (err, provider) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Updated email provider.
 *   console.log(provider);
 * });
 *
 *
 * // Using the email provider manager directly.
 * auth0.emailProvider.update(function (err, provider) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Updated email provider.
 *   console.log(provider);
 * });
 *
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
 * @memberOf  EmailProviderManager
 *
 * @example
 * // Using auth0 instance.
 * auth0.deleteEmailProvider(function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Email provider deleted.
 * });
 *
 *
 * // Using the email provider manager directly.
 * auth0.emailProvider.delete(function (err) {
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
