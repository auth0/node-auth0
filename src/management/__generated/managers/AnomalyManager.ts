import * as runtime from '../../runtime';
import type { InitOverrideFunction, ApiResponse } from '../../runtime';

const { BaseAPI } = runtime;

export type InitOverrides = RequestInit | InitOverrideFunction;

export interface DeleteIpsByIdRequest {
  /**
   * IP address to unblock.
   * @type {string}
   */
  id: string;
}

export interface GetIpsByIdRequest {
  /**
   * IP address to check.
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class AnomalyManager extends BaseAPI {
  /**
   * Unblock an IP address currently blocked by the <a href="https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling">Suspicious IP Throttling</a> due to multiple suspicious attempts.
   * Remove the blocked IP address
   * @throws {RequiredError}
   */
  async deleteBlockedIpRaw(
    requestParameters: DeleteIpsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/anomaly/blocks/ips/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Unblock an IP address currently blocked by the <a href=\"https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling\">Suspicious IP Throttling</a> due to multiple suspicious attempts.
   * Remove the blocked IP address
   */
  async deleteBlockedIp(
    requestParameters: DeleteIpsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.deleteBlockedIpRaw(requestParameters, initOverrides);
  }

  /**
   * Check if a given IP address is blocked via the <a href="https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling">Suspicious IP Throttling</a> due to multiple suspicious attempts.
   * Check if an IP address is blocked
   * @throws {RequiredError}
   */
  async checkIfIpIsBlockedRaw(
    requestParameters: GetIpsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/anomaly/blocks/ips/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Check if a given IP address is blocked via the <a href=\"https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling\">Suspicious IP Throttling</a> due to multiple suspicious attempts.
   * Check if an IP address is blocked
   */
  async checkIfIpIsBlocked(
    requestParameters: GetIpsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.checkIfIpIsBlockedRaw(requestParameters, initOverrides);
  }
}
