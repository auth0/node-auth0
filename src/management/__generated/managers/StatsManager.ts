import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { StatsEntry } from '../models';

const { BaseAPI } = runtime;

export interface GetDailyRequest {
  /**
   * Optional first day of the date range (inclusive) in YYYYMMDD format.
   * @type {string}
   */
  from?: string;
  /**
   * Optional last day of the date range (inclusive) in YYYYMMDD format.
   * @type {string}
   */
  to?: string;
}

/**
 *
 */
export class StatsManager extends BaseAPI {
  /**
   * Retrieve the number of active users that logged in during the last 30 days.
   * Get active users count
   * @throws {RequiredError}
   */
  async getActiveUsersCount(initOverrides?: InitOverride): Promise<ApiResponse<number>> {
    const response = await this.request(
      {
        path: `/stats/active-users`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.TextApiResponse.fromResponse(response) as any;
  }

  /**
   * Retrieve the number of logins, signups and breached-password detections (subscription required) that occurred each day within a specified date range.
   * Get daily stats
   * @throws {RequiredError}
   */
  async getDaily(
    requestParameters: GetDailyRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<StatsEntry>>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'from',
        config: {},
      },
      {
        key: 'to',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/stats/daily`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
