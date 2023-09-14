import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type { DeleteIpsByIdRequest, GetIpsByIdRequest } from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class AnomalyManager extends BaseAPI {
  /**
   * Unblock an IP address currently blocked by the <a href="https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling">Suspicious IP Throttling</a> due to multiple suspicious attempts.
   * Remove the blocked IP address
   *
   * @throws {RequiredError}
   */
  async deleteBlockedIp(
    requestParameters: DeleteIpsByIdRequest,
    initOverrides?: InitOverride
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

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Check if a given IP address is blocked via the <a href="https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling">Suspicious IP Throttling</a> due to multiple suspicious attempts.
   * Check if an IP address is blocked
   *
   * @throws {RequiredError}
   */
  async checkIfIpIsBlocked(
    requestParameters: GetIpsByIdRequest,
    initOverrides?: InitOverride
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

    return runtime.VoidApiResponse.fromResponse(response);
  }
}
