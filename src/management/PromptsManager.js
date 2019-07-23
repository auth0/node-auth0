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
 * @class PromptsManager
 * Manages settings related to prompts.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var PromptsManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/management/v2#!/Prompts Prompts endpoint}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/prompts',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Update the prompts settings.
 *
 * @method    updateSettings
 * @memberOf  module:management.PromptsManager.prototype
 *
 * @example
 * management.prompts.updateSettings(data, function (err, prompts) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 * // Updated prompts
 *    console.log(prompts);
 * });
 *
 * @param   {Object}    params            Prompts parameters.
 * @param   {Object}    data              Updated prompts data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(PromptsManager, 'updateSettings', 'resource.patch');

/**
 * Get the prompts settings..
 *
 * @method    getSettings
 * @memberOf  module:management.PromptsManager.prototype
 *
 * @example
 * management.prompts.getSettings(data, function (err, prompts) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 * // Prompts
 *    console.log(prompts);
 * });
 *
 * @param   {Object}    params            Prompts parameters.
 * @param   {Object}    data              Prompts data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(PromptsManager, 'getSettings', 'resource.get');

module.exports = PromptsManager;
