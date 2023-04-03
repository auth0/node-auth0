/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type { StatsEntry } from '../models';

export interface GetDailyRequest {
  from?: string;
  to?: string;
}

/**
 *
 */
export class StatsManager extends runtime.BaseAPI {
  /**
   * Retrieve the number of active users that logged in during the last 30 days.
   * Get active users count
   * @throws {RequiredError}
   * @memberof StatsManager
   */
  async getActiveUsersCountRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<number>> {
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
  async getActiveUsersCount(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<number> {
    const response = await this.getActiveUsersCountRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the number of logins, signups and breached-password detections (subscription required) that occurred each day within a specified date range.
   * Get daily stats
   * @throws {RequiredError}
   * @memberof StatsManager
   */
  async getDailyRaw(
    requestParameters: GetDailyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<StatsEntry>>> {
    const queryParameters: any = {};

    if (requestParameters.from !== undefined) {
      queryParameters['from'] = requestParameters.from;
    }

    if (requestParameters.to !== undefined) {
      queryParameters['to'] = requestParameters.to;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<StatsEntry>> {
    const response = await this.getDailyRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
