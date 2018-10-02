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
 * @class RulesConfigsManager
 * The rules configs manager class provides a simple abstraction for performing CRUD operations
 * on Auth0 RulesConfigsManager.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
class RulesConfigsManager {
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

    const { headers, tokenProvider, retry, baseUrl } = options;

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
     * {@link https://auth0.com/docs/api/v2#!/RulesConfigsManager Auth0 RulesConfigsManager}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${baseUrl}/rules-configs/:key`,
      clientOptions,
      tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, retry);
  }
}

/**
 * Set a new rules config.
 *
 * @method    set
 * @memberOf  module:management.RulesConfigsManager.prototype
 *
 * @example
 * const params = { key: RULE_CONFIG_KEY };
 * const data =   { value: RULES_CONFIG_VALUE };
 *
 * management.rulesConfigs.set(params, data, function (err, rulesConfig) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Rules Config set.
 * });
 *
 * @param   {Object}    params        Rule Config parameters.
 * @param   {String}    params.key    Rule Config key.
 * @param   {Object}    data          Rule Config Data parameters.
 * @param   {String}    data.value    Rule Config Data value.
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(RulesConfigsManager, 'set', 'resource.update');

/**
 * Get all rules configs.
 *
 * @method    getAll
 * @memberOf  module:management.RulesConfigsManager.prototype
 *
 * @example
 * management.rulesConfigs.getAll(function (err, rulesConfig) {
 *   console.log(rulesConfig.length);
 * });
 *
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(RulesConfigsManager, 'getAll', 'resource.getAll');

/**
 * Delete an existing rules config.
 *
 * @method    delete
 * @memberOf  module:management.RulesConfigsManager.prototype
 *
 * @example
 * management.rulesConfigs.delete({ key: RULE_CONFIG_KEY }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Rules Config deleted.
 * });
 *
 * @param   {Object}    params        Rule Configs parameters.
 * @param   {String}    params.key    Rule Configs key.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(RulesConfigsManager, 'delete', 'resource.delete');

module.exports = RulesConfigsManager;
