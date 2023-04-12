import * as runtime from '../../runtime';
import type { InitOverride, InitOverrideFunction, ApiResponse } from '../../../../../src/runtime';
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
  async getActiveUsersCountRaw(initOverrides?: InitOverride): Promise<ApiResponse<number>> {
    const response = await this.request(
      {
        path: `/stats/active-users`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.TextApiResponse(response) as any;
  }

  /**
   * Retrieve the number of active users that logged in during the last 30 days.
   * Get active users count
   */
  async getActiveUsersCount(initOverrides?: InitOverride): Promise<number> {
    const response = await this.getActiveUsersCountRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the number of logins, signups and breached-password detections (subscription required) that occurred each day within a specified date range.
   * Get daily stats
   * @throws {RequiredError}
   */
  async getDailyRaw(
    requestParameters: GetDailyRequest,
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve the number of logins, signups and breached-password detections (subscription required) that occurred each day within a specified date range.
   * Get daily stats
   */
  async getDaily(
    requestParameters: GetDailyRequest = {},
    initOverrides?: InitOverride
  ): Promise<Array<StatsEntry>> {
    const response = await this.getDailyRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
