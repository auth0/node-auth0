const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Manages settings related to prompts.
 */
class PromptsManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
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

    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/management/v2#!/Prompts Prompts endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/prompts`,
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
    const customTextByLanguageAuth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/prompts/:prompt/custom-text/:language`,
      clientOptions,
      options.tokenProvider
    );
    this.customTextByLanguage = new RetryRestClient(
      customTextByLanguageAuth0RestClient,
      options.retry
    );
  }

  /**
   * Update the prompts settings.
   *
   * @example
   * management.prompts.updateSettings(params, data, function (err, prompts) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   * // Updated prompts
   *    console.log(prompts);
   * });
   * @param   {object}    params            Prompts parameters.
   * @param   {object}    data              Updated prompts data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateSettings(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Get the prompts settings..
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
   * @param   {object}    params            Prompts parameters.
   * @param   {object}    data              Prompts data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getSettings(...args) {
    return this.resource.get(...args);
  }

  /**
   * Retrieve custom text for a specific prompt and language.
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
   * @param   {object}    params            Data object.
   * @param   {string}    params.prompt     Name of the prompt.
   * @param   {string}    params.language   Language to retrieve.
   * @param   {Function}  [cb]              Callback function
   * @returns  {Promise|undefined}
   */
  getCustomTextByLanguage(params, cb) {
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
  }

  /**
   * Set custom text for a specific prompt.
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
   * @param   {object}    params            Data object.
   * @param   {string}    params.prompt     Name of the prompt.
   * @param   {string}    params.language   Language to retrieve.
   * @param   {object}    params.body       An object containing custom dictionaries for a group of screens.
   * @param   {Function}  [cb]              Callback function
   * @returns  {Promise|undefined}
   */
  updateCustomTextByLanguage(params, cb) {
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

    const options = {
      prompt: params.prompt,
      language: params.language,
    };

    if (cb && cb instanceof Function) {
      return this.customTextByLanguage.update(options, params.body, cb);
    }

    return this.customTextByLanguage.update(options, params.body);
  }
}

module.exports = PromptsManager;
