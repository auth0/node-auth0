/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type { GetLogs200Response, Log } from '../models';

export interface GetLogsRequest {
  page?: number;
  per_page?: number;
  sort?: string;
  fields?: string;
  include_fields?: boolean;
  include_totals?: boolean;
  from?: string;
  take?: number;
  q?: string;
}

export interface GetLogsByIdRequest {
  id: string;
}

/**
 *
 */
export class LogsManager extends runtime.BaseAPI {
  /**
   * Retrieve log entries that match the specified search criteria (or all log entries if no criteria specified).<br/><br/>Set custom search criteria using the <code>q</code> parameter, or search from a specific log ID (<i>\"search from checkpoint\"</i>).<br/><br/>For more information on all possible event types, their respective acronyms, and descriptions, see <a href=\"https://auth0.com/docs/logs/log-event-type-codes\">Log Event Type Codes</a>.<br/><br/><h5>To set custom search criteria, use the following parameters:</h5><br/><br/><ul><br/>    <li><b>q:</b> Search Criteria using <a href=\"https://auth0.com/docs/logs/log-search-query-syntax\">Query String Syntax</a></li><br/>    <li><b>page:</b> Page index of the results to return. First page is 0.</li><br/>    <li><b>per_page:</b> Number of results per page.</li><br/>    <li><b>sort:</b> Field to use for sorting appended with `:1` for ascending and `:-1` for descending. e.g. `date:-1`</li><br/>    <li><b>fields:</b> Comma-separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve all fields.</li><br/>    <li><b>include_fields:</b> Whether specified fields are to be included (true) or excluded (false).</li><br/>    <li><b>include_totals:</b> Return results inside an object that contains the total result count (true) or as a direct array of results (false, default). <b>Deprecated:</b> this field is deprecated and should be removed from use. See <a href=\"https://auth0.com/docs/product-lifecycle/deprecations-and-migrations/migrate-to-tenant-log-search-v3#pagination\">Search Engine V3 Breaking Changes</a></li><br/></ul><br/><br/>For more information on the list of fields that can be used in <code>fields</code> and <code>sort</code>, see <a href=\"https://auth0.com/docs/logs/log-search-query-syntax#searchable-fields\">Searchable Fields</a>.<br/><br/>Auth0 <a href=\"https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#limitations\">limits the number of logs</a> you can return by search criteria to 100 logs per request. Furthermore, you may paginate only through 1,000 search results. If you exceed this threshold, please redefine your search or use the <a href=\"https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#retrieve-logs-by-checkpoint\">get logs by checkpoint method</a>.<br/><br/><h5>To search from a checkpoint log ID, use the following parameters:</h5><br/><ul><br/>    <li><b>from:</b> Log Event ID from which to start retrieving logs. You can limit the number of logs returned using the <code>take</code> parameter. If you use <code>from</code> at the same time as <code>q</code>, <code>from</code> takes precedence and <code>q</code> is ignored.</li><br/>    <li><b>take:</b> Number of entries to retrieve when using the <code>from</code> parameter.</li><br/></ul><br/><br/><strong>Important:</strong> When fetching logs from a checkpoint log ID, any parameter other than <code>from</code> and <code>take</code> will be ignored, and date ordering is not guaranteed.<br/>
   * Search log events
   * @throws {RequiredError}
   * @memberof LogsManager
   */
  async getAllRaw(
    requestParameters: GetLogsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetLogs200Response>> {
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.sort !== undefined) {
      queryParameters['sort'] = requestParameters.sort;
    }

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    if (requestParameters.from !== undefined) {
      queryParameters['from'] = requestParameters.from;
    }

    if (requestParameters.take !== undefined) {
      queryParameters['take'] = requestParameters.take;
    }

    if (requestParameters.q !== undefined) {
      queryParameters['q'] = requestParameters.q;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetLogs200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve an individual log event.
   * Get a log event by id
   * @throws {RequiredError}
   * @memberof LogsManager
   */
  async getRaw(
    requestParameters: GetLogsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Log>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }

    const response = await this.request(
      {
        path: `/logs/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
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
  async get(
    requestParameters: GetLogsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Log> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
