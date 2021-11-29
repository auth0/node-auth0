const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Manages settings related to branding.
 */
class BrandingManager {
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
     * {@link https://auth0.com/docs/api/management/v2#!/Branding Branding endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/branding`,
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
    const brandingTemplateAuth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/branding/templates/universal-login`,
      clientOptions,
      options.tokenProvider
    );
    this.brandingTemplates = new RetryRestClient(brandingTemplateAuth0RestClient, options.retry);
  }

  /**
   * Update the branding settings.
   *
   * @example
   * management.branding.updateSettings(params, data, function (err, branding) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   * // Updated branding
   *    console.log(branding);
   * });
   * @param   {object}    params            Branding parameters (leavy empty).
   * @param   {object}    data              Updated branding data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateSettings(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Get the branding settings..
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
   * @param   {object}    params            Branding parameters.
   * @param   {object}    data              Branding data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getSettings(...args) {
    return this.resource.get(...args);
  }

  /**
   * Get the new universal login template.
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
   * @param   {object}    params            Branding parameters (leave empty).
   * @param   {object}    data              Branding data (leave empty).
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getUniversalLoginTemplate(...args) {
    return this.brandingTemplates.get(...args);
  }

  /**
   * Set the new universal login template.
   *
   * @example
   * management.branding.setUniversalLoginTemplate(params, data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params            Branding parameters (leavy empty).
   * @param   {object}    data              Branding data (object with template field).
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  setUniversalLoginTemplate(...args) {
    return this.brandingTemplates.update(...args);
  }

  /**
   * Delete the new universal login template (revert to default).
   *
   * @example
   * management.branding.deleteUniversalLoginTemplate(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params            Branding parameters (leavy empty).
   * @param   {object}    data              Branding data (leave empty).
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  deleteUniversalLoginTemplate(...args) {
    return this.brandingTemplates.delete(...args);
  }
}

module.exports = BrandingManager;
