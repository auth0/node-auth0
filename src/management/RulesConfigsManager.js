const BaseManager = require('./BaseManager');

/**
 * The rules configs manager class provides a simple abstraction for performing CRUD operations
 * on Auth0 RulesConfigsManager.
 */
class RulesConfigsManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://auth0.com/docs/api/v2#!/RulesConfigsManager Auth0 RulesConfigsManager}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/rules-configs/:key');
  }

  /**
   * Set a new rules config.
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
   * @param   {object}    params        Rule Config parameters.
   * @param   {string}    params.key    Rule Config key.
   * @param   {object}    data          Rule Config Data parameters.
   * @param   {string}    data.value    Rule Config Data value.
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  set(...args) {
    return this.resource.update(...args);
  }

  /**
   * Get all rules configs.
   *
   * @example
   * management.rulesConfigs.getAll(function (err, rulesConfig) {
   *   console.log(rulesConfig.length);
   * });
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Delete an existing rules config.
   *
   * @example
   * management.rulesConfigs.delete({ key: RULE_CONFIG_KEY }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Rules Config deleted.
   * });
   * @param   {object}    params        Rule Configs parameters.
   * @param   {string}    params.key    Rule Configs key.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = RulesConfigsManager;
