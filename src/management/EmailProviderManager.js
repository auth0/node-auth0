const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Auth0 Email Provider.
 */
class EmailProviderManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
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
     * @type {object}
     */
    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for consuming the
     * [Auth0 Clients endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/emails/provider`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);
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
