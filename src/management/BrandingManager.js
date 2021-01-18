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
 * @class BrandingManager
 * Manages settings related to branding.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var BrandingManager = function(options) {
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
   * {@link https://auth0.com/docs/api/management/v2#!/Branding Branding endpoint}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/branding',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/management/v2#!/Branding/get_universal_login Branding new universal login template endpoint}.
   *
   * @type {external:RestClient}
   */
  var brandingTemplateAuth0RestClient = new Auth0RestClient(
    options.baseUrl + '/branding/templates/universal-login',
    clientOptions,
    options.tokenProvider
  );
  this.brandingTemplates = new RetryRestClient(brandingTemplateAuth0RestClient, options.retry);
};

/**
 * Update the branding settings.
 *
 * @method    updateSettings
 * @memberOf  module:management.BrandingManager.prototype
 *
 * @example
 * management.branding.updateSettings(data, function (err, branding) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 * // Updated branding
 *    console.log(branding);
 * });
 *
 * @param   {Object}    params            Branding parameters.
 * @param   {Object}    data              Updated branding data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(BrandingManager, 'updateSettings', 'resource.patch');

/**
 * Get the branding settings..
 *
 * @method    getSettings
 * @memberOf  module:management.BrandingManager.prototype
 *
 * @example
 * management.branding.getSettings(data, function (err, branding) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 * // Branding
 *    console.log(branding);
 * });
 *
 * @param   {Object}    params            Branding parameters.
 * @param   {Object}    data              Branding data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(BrandingManager, 'getSettings', 'resource.get');

/**
 * Get the new universal login template.
 *
 * @method    getUniversalLoginTemplate
 * @memberOf  module:management.BrandingManager.prototype
 *
 * @example
 * management.branding.getUniversalLoginTemplate(data, function (err, template) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 * // Branding
 *    console.log(template);
 * });
 *
 * @param   {Object}    params            Branding parameters (leave empty).
 * @param   {Object}    data              Branding data (leave empty).
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(BrandingManager, 'getUniversalLoginTemplate', 'brandingTemplates.get');

/**
 * Set the new universal login template.
 *
 * @method    setUniversalLoginTemplate
 * @memberOf  module:management.BrandingManager.prototype
 *
 * @example
 * management.branding.setUniversalLoginTemplate({ template: "a template" }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params            Branding parameters (leavy empty).
 * @param   {Object}    data              Branding data (object with template field).
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(BrandingManager, 'setUniversalLoginTemplate', 'brandingTemplates.update');

/**
 * Delete the new universal login template (revert to default).
 *
 * @method    deleteUniversalLoginTemplate
 * @memberOf  module:management.BrandingManager.prototype
 *
 * @example
 * management.branding.deleteUniversalLoginTemplate(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params            Branding parameters (leavy empty).
 * @param   {Object}    data              Branding data (leave empty).
 * @param   {Function}  [cb]              Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(BrandingManager, 'deleteUniversalLoginTemplate', 'brandingTemplates.delete');

module.exports = BrandingManager;
