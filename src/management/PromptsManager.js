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

  /**
   * Retrieve custom text for a specific prompt and language.
   * {@link https://auth0.com/docs/api/management/v2#!/Prompts/get_custom_text_by_language Custom Text endpoint}
   *
   *
   * @type {external:RestClient}
   */
  var customTextByLanguageAuth0RestClient = new Auth0RestClient(
    options.baseUrl + '/prompts/:prompt/custom-text/:language',
    clientOptions,
    options.tokenProvider
  );
  this.customTextByLanguage = new RetryRestClient(
    customTextByLanguageAuth0RestClient,
    options.retry
  );
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

/**
 * Retrieve custom text for a specific prompt and language.
 *
 * @method    getCustomTextByLanguage
 * @memberOf  module:management.PromptsManager.prototype
 *
 * @example
 * var params = { prompt: PROMPT_NAME, language: LANGUAGE };
 *
 * management.prompts.getCustomTextByLanguage(params, function (err, customText) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log('CustomText', customText);
 * });
 *
 * @param   {Object}    params            Data object.
 * @param   {String}    params.prompt     Name of the prompt.
 * @param   {String}    params.language   Language to retrieve.
 * @param   {Function}  [cb]              Callback function
 *
 * @return  {Promise|undefined}
 */
PromptsManager.prototype.getCustomTextByLanguage = function(params, cb) {
  params = params || {};

  if (!params.prompt || typeof params.prompt !== 'string') {
    throw new ArgumentError('The prompt parameter must be a string');
  }

  if (!params.language || typeof params.language !== 'string') {
    throw new ArgumentError('The language parameter must be a string');
  }

  if (cb && cb instanceof Function) {
    return this.customTextByLanguage.get(params, cb);
  }

  return this.customTextByLanguage.get(params);
};

/**
 * Set custom text for a specific prompt.
 *
 * @method    updateCustomTextByLanguage
 * @memberOf  module:management.PromptsManager.prototype
 *
 * @example
 * var params = { prompt: PROMPT_NAME, language: LANGUAGE, body: BODY_OBJECT };
 *
 * management.prompts.updateCustomTextByLanguage(params, function (err, customText) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log('CustomText', customText);
 * });
 *
 * @param   {Object}    params            Data object.
 * @param   {String}    params.prompt     Name of the prompt.
 * @param   {String}    params.language   Language to retrieve.
 * @param   {Object}    params.body       An object containing custom dictionaries for a group of screens.
 * @param   {Function}  [cb]              Callback function
 *
 * @return  {Promise|undefined}
 */
PromptsManager.prototype.updateCustomTextByLanguage = function(params, cb) {
  params = params || {};

  if (!params.prompt || typeof params.prompt !== 'string') {
    throw new ArgumentError('The prompt parameter must be a string');
  }

  if (!params.language || typeof params.language !== 'string') {
    throw new ArgumentError('The language parameter must be a string');
  }

  if (!params.body || typeof params.body !== 'object') {
    throw new ArgumentError('The body parameter must be an object');
  }

  if (cb && cb instanceof Function) {
    return this.customTextByLanguage.update(params, params.body, cb);
  }

  return this.customTextByLanguage.update(params, params.body);
};

module.exports = PromptsManager;
