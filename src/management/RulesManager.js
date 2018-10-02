const { ArgumentError } = require('rest-facade');
const { wrapPropertyMethod } = require('../utils');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class RulesManager
 * The rule class provides a simple abstraction for performing CRUD operations
 * on Auth0 RulesManagers.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
class RulesManager {
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

    const { headers, baseUrl, tokenProvider, retry } = options;

    /**
     * Options object for the Rest Client instance.
     *
     * @type {Object}
     */
    const clientOptions = {
      headers,
      query: { repeatParams: false }
    };

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://auth0.com/docs/api/v2#!/RulesManagers Auth0 RulesManagers}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${baseUrl}/rules/:id`,
      clientOptions,
      tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, retry);
  }
}

/**
 * Create a new rule.
 *
 * @method    create
 * @memberOf  module:management.RulesManager.prototype
 *
 * @example
 * management.rules.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Rule created.
 * });
 *
 * @param   {Object}    data     Rule data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(RulesManager, 'create', 'resource.create');

/**
 * Get all rules.
 *
 * @method    getAll
 * @memberOf  module:management.RulesManager.prototype
 *
 * @example <caption>
 *   This method takes an optional object as first argument that may be used to
 *   specify pagination settings. If pagination options are not present,
 *   the first page of a limited number of results will be returned.
 * </caption>
 *
 * // Pagination settings.
 * const params = {
 *   per_page: 10,
 *   page: 0
 * };
 *
 * management.rules.getAll(params, function (err, rules) {
 *   console.log(rules.length);
 * });
 *
 * @param   {Object}    [params]          Rules parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(RulesManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 rule.
 *
 * @method    get
 * @memberOf  module:management.RulesManager.prototype
 *
 * @example
 * management.rules.get({ id: RULE_ID }, function (err, rule) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(rule);
 * });
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(RulesManager, 'get', 'resource.get');

/**
 * Update an existing rule.
 *
 * @method    update
 * @memberOf  module:management.RulesManager.prototype
 *
 * @example
 * const data = { name: 'New name' };
 * const params = { id: RULE_ID };
 *
 * // Using auth0 instance.
 * management.updateRule(params, data, function (err, rule) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(rule.name);  // 'New name'
 * });
 *
 * // Using the rules manager directly.
 * management.rules.update(params, data, function (err, rule) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(rule.name);  // 'New name'
 * });
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Object}    data          Updated rule data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(RulesManager, 'update', 'resource.patch');

/**
 * Delete an existing rule.
 *
 * @method    delete
 * @memberOf  module:management.RulesManager.prototype
 *
 * @example
 * management.rules.delete({ id: RULE_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Rule deleted.
 * });
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(RulesManager, 'delete', 'resource.delete');

module.exports = RulesManager;
