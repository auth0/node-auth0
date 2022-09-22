const BaseManager = require('./BaseManager');

/**
 * Represents the relationship between Auth0 and an Identity provider.
 */
class LogsManager extends BaseManager {
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
     * {@link https://auth0.com/docs/api/v2#!/LogsManagers Auth0
     *  Logs}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/logs/:id');
  }

  /**
   * Get all logs.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings and the search query. If pagination options are
   *   not present, the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 2
   * };
   *
   * management.logs.getAll(params, function (err, logs) {
   *   console.log(logs.length);
   * });
   * @param   {object}    [params]                Logs params.
   * @param   {string}    [params.q]              Search Criteria using Query String Syntax
   * @param   {number}    [params.page]           Page number. Zero based
   * @param   {number}    [params.per_page]       The amount of entries per page
   * @param   {string}    [params.sort]           The field to use for sorting.
   * @param   {string}    [params.fields]         A comma separated list of fields to include or exclude
   * @param   {boolean}   [params.include_fields] true if the fields specified are to be included in the result, false otherwise.
   * @param   {boolean}   [params.include_totals] true if a query summary must be included in the result, false otherwise. Default false
   * @param   {string}    [params.from]           For checkpoint pagination, log event Id from which to start selection from.
   * @param   {number}    [params.take]           When using the `from` parameter, the number of entries to retrieve. Default 50, max 100.
   * @param   {Function}  [cb]                    Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Get an Auth0 log.
   *
   * @example
   * management.logs.get({ id: EVENT_ID }, function (err, log) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(log);
   * });
   * @param   {object}    params          Log parameters.
   * @param   {string}    params.id       Log ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }
}

module.exports = LogsManager;
