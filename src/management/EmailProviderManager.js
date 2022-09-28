const BaseManager = require('./BaseManager');

/**
 * Auth0 Email Provider.
 */
class EmailProviderManager extends BaseManager {
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
     * [Auth0 Clients endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/emails/provider');
  }

  /**
   * Configure the email provider.
   *
   * @example
   * management.emailProvider.configure(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Email provider configured.
   * });
   * @param   {object}    data     The email provider data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  configure(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get the email provider.
   *
   * @example
   * management.emailProvider.get(function (err, provider) {
   *   console.log(provider);
   * });
   * @param   {Function}  [cb]    Callback function.
   * @param   {object}    [params]          Clients parameters.
   * @param   {number}    [params.fields] A comma separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve: name, enabled, settings fields.
   * @param   {number}    [params.include_fields]  true if the fields specified are to be excluded from the result, false otherwise (defaults to true)
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Update the email provider.
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
   * @param   {object}    params            Email provider parameters.
   * @param   {object}    data              Updated email provider data.
   * @param   {Function}  [cb]              Callback function.
   * @returns    {Promise|undefined}
   */
  update(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Delete email provider.
   *
   * @example
   * management.emailProvider.delete(function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Email provider configured.
   * });
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = EmailProviderManager;
