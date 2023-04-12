import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { GetLogs200Response, Log } from '../models';

const { BaseAPI } = runtime;

export interface GetLogsRequest {
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   *  Number of results per page. Paging is disabled if parameter not sent. Default: <code>50</code>. Max value: <code>100</code>
   * @type {number}
   */
  per_page?: number;
  /**
   * Field to use for sorting appended with <code>:1</code>  for ascending and <code>:-1</code> for descending. e.g. <code>date:-1</code>
   * @type {string}
   */
  sort?: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for <code>include_fields</code>) in the result. Leave empty to retrieve all fields.
   * @type {string}
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (<code>true</code>) or excluded (<code>false</code>)
   * @type {boolean}
   */
  include_fields?: boolean;
  /**
   * Return results as an array when false (default). Return results inside an object that also contains a total result count when true.
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Log Event Id from which to start selection from.
   * @type {string}
   */
  from?: string;
  /**
   * Number of entries to retrieve when using the <code>from</code> parameter. Default <code>50</code>, max <code>100</code>
   * @type {number}
   */
  take?: number;
  /**
   * Query in <a target='_new' href ='http://www.lucenetutorial.com/lucene-query-syntax.html'>Lucene query string syntax</a>.
   * @type {string}
   */
  q?: string;
}

export interface GetLogsByIdRequest {
  /**
   * log_id of the log to retrieve.
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class LogsManager extends BaseAPI {
  /**
   * Retrieve log entries that match the specified search criteria (or all log entries if no criteria specified).
   *
   * Set custom search criteria using the <code>q</code> parameter, or search from a specific log ID (<i>"search from checkpoint"</i>).
   *
   * For more information on all possible event types, their respective acronyms, and descriptions, see <a href="https://auth0.com/docs/logs/log-event-type-codes">Log Event Type Codes</a>.
   *
   * <h5>To set custom search criteria, use the following parameters:</h5>
   *
   * <ul>
   *     <li><b>q:</b> Search Criteria using <a href="https://auth0.com/docs/logs/log-search-query-syntax">Query String Syntax</a></li>
   *     <li><b>page:</b> Page index of the results to return. First page is 0.</li>
   *     <li><b>per_page:</b> Number of results per page.</li>
   *     <li><b>sort:</b> Field to use for sorting appended with `:1` for ascending and `:-1` for descending. e.g. `date:-1`</li>
   *     <li><b>fields:</b> Comma-separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve all fields.</li>
   *     <li><b>include_fields:</b> Whether specified fields are to be included (true) or excluded (false).</li>
   *     <li><b>include_totals:</b> Return results inside an object that contains the total result count (true) or as a direct array of results (false, default). <b>Deprecated:</b> this field is deprecated and should be removed from use. See <a href="https://auth0.com/docs/product-lifecycle/deprecations-and-migrations/migrate-to-tenant-log-search-v3#pagination">Search Engine V3 Breaking Changes</a></li>
   * </ul>
   *
   * For more information on the list of fields that can be used in <code>fields</code> and <code>sort</code>, see <a href="https://auth0.com/docs/logs/log-search-query-syntax#searchable-fields">Searchable Fields</a>.
   *
   * Auth0 <a href="https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#limitations">limits the number of logs</a> you can return by search criteria to 100 logs per request. Furthermore, you may paginate only through 1,000 search results. If you exceed this threshold, please redefine your search or use the <a href="https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#retrieve-logs-by-checkpoint">get logs by checkpoint method</a>.
   *
   * <h5>To search from a checkpoint log ID, use the following parameters:</h5>
   * <ul>
   *     <li><b>from:</b> Log Event ID from which to start retrieving logs. You can limit the number of logs returned using the <code>take</code> parameter. If you use <code>from</code> at the same time as <code>q</code>, <code>from</code> takes precedence and <code>q</code> is ignored.</li>
   *     <li><b>take:</b> Number of entries to retrieve when using the <code>from</code> parameter.</li>
   * </ul>
   *
   * <strong>Important:</strong> When fetching logs from a checkpoint log ID, any parameter other than <code>from</code> and <code>take</code> will be ignored, and date ordering is not guaranteed.
   *
   * Search log events
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetLogsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetLogs200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'page',
        config: {},
      },
      {
        key: 'per_page',
        config: {},
      },
      {
        key: 'sort',
        config: {},
      },
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
      {
        key: 'include_totals',
        config: {},
      },
      {
        key: 'from',
        config: {},
      },
      {
        key: 'take',
        config: {},
      },
      {
        key: 'q',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/logs`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve log entries that match the specified search criteria (or all log entries if no criteria specified).<br/><br/>Set custom search criteria using the <code>q</code> parameter, or search from a specific log ID (<i>\"search from checkpoint\"</i>).<br/><br/>For more information on all possible event types, their respective acronyms, and descriptions, see <a href=\"https://auth0.com/docs/logs/log-event-type-codes\">Log Event Type Codes</a>.<br/><br/><h5>To set custom search criteria, use the following parameters:</h5><br/><br/><ul><br/>    <li><b>q:</b> Search Criteria using <a href=\"https://auth0.com/docs/logs/log-search-query-syntax\">Query String Syntax</a></li><br/>    <li><b>page:</b> Page index of the results to return. First page is 0.</li><br/>    <li><b>per_page:</b> Number of results per page.</li><br/>    <li><b>sort:</b> Field to use for sorting appended with `:1` for ascending and `:-1` for descending. e.g. `date:-1`</li><br/>    <li><b>fields:</b> Comma-separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve all fields.</li><br/>    <li><b>include_fields:</b> Whether specified fields are to be included (true) or excluded (false).</li><br/>    <li><b>include_totals:</b> Return results inside an object that contains the total result count (true) or as a direct array of results (false, default). <b>Deprecated:</b> this field is deprecated and should be removed from use. See <a href=\"https://auth0.com/docs/product-lifecycle/deprecations-and-migrations/migrate-to-tenant-log-search-v3#pagination\">Search Engine V3 Breaking Changes</a></li><br/></ul><br/><br/>For more information on the list of fields that can be used in <code>fields</code> and <code>sort</code>, see <a href=\"https://auth0.com/docs/logs/log-search-query-syntax#searchable-fields\">Searchable Fields</a>.<br/><br/>Auth0 <a href=\"https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#limitations\">limits the number of logs</a> you can return by search criteria to 100 logs per request. Furthermore, you may paginate only through 1,000 search results. If you exceed this threshold, please redefine your search or use the <a href=\"https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#retrieve-logs-by-checkpoint\">get logs by checkpoint method</a>.<br/><br/><h5>To search from a checkpoint log ID, use the following parameters:</h5><br/><ul><br/>    <li><b>from:</b> Log Event ID from which to start retrieving logs. You can limit the number of logs returned using the <code>take</code> parameter. If you use <code>from</code> at the same time as <code>q</code>, <code>from</code> takes precedence and <code>q</code> is ignored.</li><br/>    <li><b>take:</b> Number of entries to retrieve when using the <code>from</code> parameter.</li><br/></ul><br/><br/><strong>Important:</strong> When fetching logs from a checkpoint log ID, any parameter other than <code>from</code> and <code>take</code> will be ignored, and date ordering is not guaranteed.<br/>
   * Search log events
   */
  async getAll(
    requestParameters: GetLogsRequest = {},
    initOverrides?: InitOverride
  ): Promise<GetLogs200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve an individual log event.
   * Get a log event by id
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetLogsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Log>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/logs/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve an individual log event.
   * Get a log event by id
   */
  async get(requestParameters: GetLogsByIdRequest, initOverrides?: InitOverride): Promise<Log> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
