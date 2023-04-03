/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';

export interface DeleteIpsByIdRequest {
  id: string;
}

export interface GetIpsByIdRequest {
  id: string;
}

/**
 *
 */
export class AnomalyManager extends runtime.BaseAPI {
  /**
   * Unblock an IP address currently blocked by the <a href=\"https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling\">Suspicious IP Throttling</a> due to multiple suspicious attempts.
   * Remove the blocked IP address
   * @throws {RequiredError}
   * @memberof AnomalyManager
   */
  async deleteBlockedIpRaw(
    requestParameters: DeleteIpsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deleteBlockedIp.'
      );
    }

    const response = await this.request(
      {
        path: `/anomaly/blocks/ips/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteBlockedIpRaw(requestParameters, initOverrides);
  }

  /**
   * Check if a given IP address is blocked via the <a href=\"https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling\">Suspicious IP Throttling</a> due to multiple suspicious attempts.
   * Check if an IP address is blocked
   * @throws {RequiredError}
   * @memberof AnomalyManager
   */
  async checkIfIpIsBlockedRaw(
    requestParameters: GetIpsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling checkIfIpIsBlocked.'
      );
    }

    const response = await this.request(
      {
        path: `/anomaly/blocks/ips/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.checkIfIpIsBlockedRaw(requestParameters, initOverrides);
  }
}
