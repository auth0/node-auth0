var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * @class CustomDomainsManager
 * Auth0 Custom Domains Manager.
 *
 * {@link https://auth0.com/docs/api/management/v2#!/Custom_Domains/get_custom_domains CustomDomains} represent
 * custom domain names.
 * You can learn more about this in the
 * {@link https://auth0.com/docs/custom-domains CustomDomains} section of the
 * documentation.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var CustomDomainsManager = function(options) {
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
   * @type {Object}
   */
  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Custom_Domains Auth0 Custom Domains endpoint}.
   *
   * @type {external:RestClient}
   */
  var auth0CustomDomainsRestClient = new Auth0RestClient(
    options.baseUrl + '/custom-domains/:id',
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
  var auth0VerifyRestClient = new Auth0RestClient(
    options.baseUrl + '/custom-domains/:id/verify',
    clientOptions,
    options.tokenProvider
  );
  this.vefifyResource = new RetryRestClient(auth0VerifyRestClient, options.retry);
};

/**
 * Create an Auth0 Custom Domain.
 *
 * @method    create
 * @memberOf  module:management.CustomDomainsManager.prototype
 *
 * @example
 * management.customDomains.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // CustomDomain created.
 * });
 *
 * @param   {Object}    data     The custom domain data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(CustomDomainsManager, 'create', 'resource.create');

/**
 * Get all Auth0 CustomDomains.
 *
 * @method    getAll
 * @memberOf  module:management.CustomDomainsManager.prototype
 *
 * @example
 * management.customDomains.getAll(function (err, customDomains) {
 *   console.log(customDomains.length);
 * });
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(CustomDomainsManager, 'getAll', 'resource.getAll');

/**
 * Get a Custom Domain.
 *
 * @method    get
 * @memberOf  module:management.CustomDomainsManager.prototype
 *
 * @example
 * management.customDomains.get({ id: CUSTOM_DOMAIN_ID }, function (err, customDomain) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(customDomain);
 * });
 *
 * @param   {Object}    params            Custom Domain parameters.
 * @param   {String}    params.id         Custom Domain ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(CustomDomainsManager, 'get', 'resource.get');

/**
 * Verify a Custom Domain.
 *
 * @method    verify
 * @memberOf  module:management.CustomDomainsManager.prototype
 *
 * @example
 * management.customDomains.verify({ id: CUSTOM_DOMAIN_ID }, function (err, customDomain) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(customDomain);
 * });
 *
 * @param   {Object}    params            Custom Domain parameters.
 * @param   {String}    params.id         Custom Domain ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
CustomDomainsManager.prototype.verify = function(params, cb) {
  if (!params || !params.id) {
    throw new ArgumentError('The custom domain id cannot be null or undefined');
  }

  if (cb && cb instanceof Function) {
    return this.vefifyResource.create(params, {}, cb);
  }

  return this.vefifyResource.create(params, {});
};

/**
 * Delete a Custom Domain.
 *
 * @method    delete
 * @memberOf  module:management.CustomDomainsManager.prototype
 *
 * @example
 * management.customDomains.delete({ id: CUSTOM_DOMAIN_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // CustomDomain deleted.
 * });
 *
 * @param   {Object}    params            Custom Domain parameters.
 * @param   {String}    params.id         Custom Domain ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(CustomDomainsManager, 'delete', 'resource.delete');

module.exports = CustomDomainsManager;
