const BaseManager = require('./BaseManager');

/**
 * Manages settings related to branding.
 */
class BrandingManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/management/v2#!/Branding Branding endpoint}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/branding');

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/management/v2#!/Branding/get_universal_login Branding new universal login template endpoint}.
     *
     * @type {external:RestClient}
     */
    this.brandingTemplates = this._getRestClient('/branding/templates/universal-login');

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/management/v2#!/Branding/get_branding_theme Branding theme endpoint}.
     *
     * @type {external:RestClient}
     */
    this.brandingThemes = this._getRestClient('/branding/themes/:id');
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
