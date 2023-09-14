import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetLogs200Response,
  Log,
  GetLogs200ResponseOneOf,
  GetLogsRequest,
  GetLogsByIdRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

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
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetLogsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetLogs200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetLogsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<Log>>>;
  async getAll(
    requestParameters: GetLogsRequest = {},
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve an individual log event.
   * Get a log event by id
   *
   * @throws {RequiredError}
   */
  async get(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
