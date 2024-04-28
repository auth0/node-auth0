import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetBreachedPasswordDetection200Response,
  GetBruteForceProtection200Response,
  GetSuspiciousIpThrottling200Response,
  PatchBreachedPasswordDetectionRequest,
  PatchBruteForceProtectionRequest,
  PatchSuspiciousIpThrottlingRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class AttackProtectionManager extends BaseAPI {
  /**
   * Retrieve details of the Breached Password Detection configuration of your tenant.
   * Get Breached Password Detection settings
   *
   * @throws {RequiredError}
   */
  async getBreachedPasswordDetectionConfig(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBreachedPasswordDetection200Response>> {
    const response = await this.request(
      {
        path: `/attack-protection/breached-password-detection`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details of the Brute-force Protection configuration of your tenant.
   * Get Brute-force settings
   *
   * @throws {RequiredError}
   */
  async getBruteForceConfig(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBruteForceProtection200Response>> {
    const response = await this.request(
      {
        path: `/attack-protection/brute-force-protection`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details of the Suspicious IP Throttling configuration of your tenant.
   * Get Suspicious IP Throttling settings
   *
   * @throws {RequiredError}
   */
  async getSuspiciousIpThrottlingConfig(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetSuspiciousIpThrottling200Response>> {
    const response = await this.request(
      {
        path: `/attack-protection/suspicious-ip-throttling`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update details of the Breached Password Detection configuration of your tenant.
   * Update Breached Password Detection settings
   *
   * @throws {RequiredError}
   */
  async updateBreachedPasswordDetectionConfig(
    bodyParameters: PatchBreachedPasswordDetectionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBreachedPasswordDetection200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/attack-protection/breached-password-detection`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update the Brute-force Protection configuration of your tenant.
   * Update Brute-force settings
   *
   * @throws {RequiredError}
   */
  async updateBruteForceConfig(
    bodyParameters: PatchBruteForceProtectionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBruteForceProtection200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/attack-protection/brute-force-protection`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update the details of the Suspicious IP Throttling configuration of your tenant.
   * Update Suspicious IP Throttling settings
   *
   * @throws {RequiredError}
   */
  async updateSuspiciousIpThrottlingConfig(
    bodyParameters: PatchSuspiciousIpThrottlingRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetSuspiciousIpThrottling200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/attack-protection/suspicious-ip-throttling`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
