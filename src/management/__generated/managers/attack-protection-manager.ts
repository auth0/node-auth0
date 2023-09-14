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
   * Get breached password detection settings
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
   * Get the brute force configuration
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
   * Get the suspicious IP throttling configuration
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
   * Update breached password detection settings
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
   * Update the brute force configuration
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
   * Update the suspicious IP throttling configuration
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
