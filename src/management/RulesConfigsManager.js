var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

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
var RulesConfigsManager = function (options) {
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
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for performing CRUD operations on
   * {@link https://auth0.com/docs/api/v2#!/RulesConfigsManager Auth0 RulesConfigsManager}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(options.baseUrl + '/rules-configs/:key', clientOptions, options.tokenProvider);
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};


/**
 * Set a new rules config.
 *
 * @method    set
 * @memberOf  module:management.RulesConfigsManager.prototype
 *
 * @example
 * var params = { key: RULE_CONFIG_KEY };
 * var data =   { value: RULES_CONFIG_VALUE };
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
utils.wrapPropertyMethod(RulesConfigsManager, 'set', 'resource.update');


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
utils.wrapPropertyMethod(RulesConfigsManager, 'getAll', 'resource.getAll');


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
utils.wrapPropertyMethod(RulesConfigsManager, 'delete', 'resource.delete');

module.exports = RulesConfigsManager;