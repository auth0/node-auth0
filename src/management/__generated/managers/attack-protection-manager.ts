import * as runtime from '../../../lib/runtime';
import type { InitOverride, ApiResponse } from '../../../lib/runtime';
import type {
  PatchBreachedPasswordDetectionRequest,
  PatchBruteForceProtectionRequest,
  PatchSuspiciousIpThrottlingRequest,
} from '../models';

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
  ): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/attack-protection/breached-password-detection`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Get the brute force configuration
   *
   * @throws {RequiredError}
   */
  async getBruteForceConfig(initOverrides?: InitOverride): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/attack-protection/brute-force-protection`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Get the brute force configuration defaults
   *
   * @throws {RequiredError}
   */
  async getBruteForceDefaults(initOverrides?: InitOverride): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/attack-protection/brute-force-protection/defaults`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Get the suspicious IP throttling configuration
   *
   * @throws {RequiredError}
   */
  async getSuspiciousIpThrottlingConfig(initOverrides?: InitOverride): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/attack-protection/suspicious-ip-throttling`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Update breached password detection settings
   *
   * @throws {RequiredError}
   */
  async updateBreachedPasswordDetectionConfig(
    bodyParameters: PatchBreachedPasswordDetectionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
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

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Update the brute force configuration
   *
   * @throws {RequiredError}
   */
  async updateBruteForceConfig(
    bodyParameters: PatchBruteForceProtectionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
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

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Update the suspicious IP throttling configuration
   *
   * @throws {RequiredError}
   */
  async updateSuspiciousIpThrottlingConfig(
    bodyParameters: PatchSuspiciousIpThrottlingRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
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

    return runtime.VoidApiResponse.fromResponse(response);
  }
}
