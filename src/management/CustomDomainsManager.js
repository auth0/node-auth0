const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Auth0 Custom Domains Manager.
 *
 * {@link https://auth0.com/docs/api/management/v2#!/Custom_Domains/get_custom_domains CustomDomains} represent
 * custom domain names.
 * You can learn more about this in the
 * {@link https://auth0.com/docs/custom-domains CustomDomains} section of the
 * documentation.
 */
class CustomDomainsManager {
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
     * {@link https://auth0.com/docs/api/v2#!/Custom_Domains Auth0 Custom Domains endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0CustomDomainsRestClient = new Auth0RestClient(
      `${options.baseUrl}/custom-domains/:id`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0CustomDomainsRestClient, options.retry);

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Custom_Domains Auth0 Custom Domains Verify endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0VerifyRestClient = new Auth0RestClient(
      `${options.baseUrl}/custom-domains/:id/verify`,
      clientOptions,
      options.tokenProvider
    );
    this.vefifyResource = new RetryRestClient(auth0VerifyRestClient, options.retry);
  }

  /**
   * Create an Auth0 Custom Domain.
   *
   * @example
   * management.customDomains.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // CustomDomain created.
   * });
   * @param   {object}    data     The custom domain data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all Auth0 CustomDomains.
   *
   * @example
   * management.customDomains.getAll(function (err, customDomains) {
   *   console.log(customDomains.length);
   * });
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Get a Custom Domain.
   *
   * @example
   * management.customDomains.get({ id: CUSTOM_DOMAIN_ID }, function (err, customDomain) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(customDomain);
   * });
   * @param   {object}    params            Custom Domain parameters.
   * @param   {string}    params.id         Custom Domain ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }

  /**
   * Verify a Custom Domain.
   *
   * @example
   * management.customDomains.verify({ id: CUSTOM_DOMAIN_ID }, function (err, customDomain) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(customDomain);
   * });
   * @param   {object}    params            Custom Domain parameters.
   * @param   {string}    params.id         Custom Domain ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  verify(params, cb) {
    if (!params || !params.id) {
      throw new ArgumentError('The custom domain id cannot be null or undefined');
    }

    if (cb && cb instanceof Function) {
      return this.vefifyResource.create(params, {}, cb);
    }

    return this.vefifyResource.create(params, {});
  }

  /**
   * Delete a Custom Domain.
   *
   * @example
   * management.customDomains.delete({ id: CUSTOM_DOMAIN_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // CustomDomain deleted.
   * });
   * @param   {object}    params            Custom Domain parameters.
   * @param   {string}    params.id         Custom Domain ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = CustomDomainsManager;
