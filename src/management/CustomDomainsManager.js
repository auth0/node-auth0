const { ArgumentError } = require('rest-facade');
const BaseManager = require('./BaseManager');

/**
 * Auth0 Custom Domains Manager.
 *
 * {@link https://auth0.com/docs/api/management/v2#!/Custom_Domains/get_custom_domains CustomDomains} represent
 * custom domain names.
 * You can learn more about this in the
 * {@link https://auth0.com/docs/custom-domains CustomDomains} section of the
 * documentation.
 */
class CustomDomainsManager extends BaseManager {
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
     * {@link https://auth0.com/docs/api/v2#!/Custom_Domains Auth0 Custom Domains endpoint}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/custom-domains/:id');

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Custom_Domains Auth0 Custom Domains Verify endpoint}.
     *
     * @type {external:RestClient}
     */
    this.vefifyResource = this._getRestClient('/custom-domains/:id/verify');
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
