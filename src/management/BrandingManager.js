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

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/management/v2#!/Branding/get_branding_theme Branding theme endpoint}.
     *
     * @type {external:RestClient}
     */
    const brandingThemesAuth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/branding/themes/:id`,
      clientOptions,
      options.tokenProvider
    );
    this.brandingThemes = new RetryRestClient(brandingThemesAuth0RestClient, options.retry);
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

  /**
   * Get the new universal login theme by id.
   *
   * @example
   * var params = { id: THEME_ID };
   *
   * management.branding.getTheme(params, function (err, theme) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *    // Theme
   *    console.log(theme);
   * });
   * @param   {object}    params            Theme params
   * @param   {object}    params.id         Theme identifier.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getTheme(...args) {
    return this.brandingThemes.get(...args);
  }

  /**
   * Get the default new universal login theme.
   *
   * @example
   * management.branding.getDefaultTheme(function (err, theme) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *    // Theme
   *    console.log(theme);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  getDefaultTheme(...args) {
    return this.brandingThemes.get(...[{ id: 'default' }].concat(args));
  }

  /**
   * Create a new theme.
   *
   * @example
   * management.branding.createTheme(data, function (err, theme) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Theme created.
   *   console.log(theme);
   * });
   * @param   {object}    data     theme data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  createTheme(...args) {
    return this.brandingThemes.create(...args);
  }

  /**
   * Update a theme.
   *
   * @example
   * var data = THEME_OBJ;
   * var params = { id: THEME_ID };
   *
   * management.branding.updateTheme(params, data, function (err, theme) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Theme updated.
   *   console.log(theme);
   * });
   * @param   {object}    params            Theme parameters.
   * @param   {object}    params.id         Theme identifier.
   * @param   {object}    data              Updated theme data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  updateTheme(...args) {
    return this.brandingThemes.patch(...args);
  }

  /**
   * Delete a theme.
   *
   * @example
   * var params = { id: THEME_ID };
   *
   * management.branding.deleteTheme(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Theme deleted.
   * });
   * @param   {object}    params            Theme parameters.
   * @param   {object}    params.id         Theme identifier.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  deleteTheme(...args) {
    return this.brandingThemes.delete(...args);
  }
}

module.exports = BrandingManager;
