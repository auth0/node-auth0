const BaseManager = require('./BaseManager');

/**
 * The rule class provides a simple abstraction for performing CRUD operations
 * on Auth0 RulesManagers.
 */
class RulesManager extends BaseManager {
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
     * {@link https://auth0.com/docs/api/v2#!/RulesManagers Auth0 RulesManagers}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/rules/:id');
  }

  /**
   * Create a new rule.
   *
   * @example
   * management.rules.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Rule created.
   * });
   * @param   {object}    data     Rule data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all rules.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.rules.getAll(params, function (err, rules) {
   *   console.log(rules.length);
   * });
   * @param   {object}    [params]          Rules parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Get an Auth0 rule.
   *
   * @example
   * management.rules.get({ id: RULE_ID }, function (err, rule) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(rule);
   * });
   * @param   {object}    params        Rule parameters.
   * @param   {string}    params.id     Rule ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }

  /**
   * Update an existing rule.
   *
   * @example
   * var data = { name: 'New name' };
   * var params = { id: RULE_ID };
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
   * @param   {object}    params        Rule parameters.
   * @param   {string}    params.id     Rule ID.
   * @param   {object}    data          Updated rule data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  update(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Delete an existing rule.
   *
   * @example
   * management.rules.delete({ id: RULE_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Rule deleted.
   * });
   * @param   {object}    params        Rule parameters.
   * @param   {string}    params.id     Rule ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = RulesManager;
