import * as runtime from '../../runtime';
import type { InitOverrideFunction, ApiResponse } from '../../runtime';
import type {
  PatchBreachedPasswordDetectionRequest,
  PatchBruteForceProtectionRequest,
  PatchSuspiciousIpThrottlingRequest,
} from '../models';

const { BaseAPI } = runtime;

export type InitOverrides = RequestInit | InitOverrideFunction;

/**
 *
 */
export class AttackProtectionManager extends BaseAPI {
  /**
   * Get breached password detection settings
   * Get breached password detection settings
   * @throws {RequiredError}
   */
  async getBreachedPasswordDetectionConfigRaw(
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/attack-protection/breached-password-detection`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Get breached password detection settings
   * Get breached password detection settings
   */
  async getBreachedPasswordDetectionConfig(initOverrides?: InitOverrides): Promise<void> {
    await this.getBreachedPasswordDetectionConfigRaw(initOverrides);
  }

  /**
   * Get the brute force configuration
   * Get the brute force configuration
   * @throws {RequiredError}
   */
  async getBruteForceConfigRaw(initOverrides?: InitOverrides): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/attack-protection/brute-force-protection`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Get the brute force configuration
   * Get the brute force configuration
   */
  async getBruteForceConfig(initOverrides?: InitOverrides): Promise<void> {
    await this.getBruteForceConfigRaw(initOverrides);
  }

  /**
   * Get the brute force configuration defaults
   * Get the brute force configuration defaults
   * @throws {RequiredError}
   */
  async getBruteForceDefaultsRaw(initOverrides?: InitOverrides): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/attack-protection/brute-force-protection/defaults`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Get the brute force configuration defaults
   * Get the brute force configuration defaults
   */
  async getBruteForceDefaults(initOverrides?: InitOverrides): Promise<void> {
    await this.getBruteForceDefaultsRaw(initOverrides);
  }

  /**
   * Get the suspicious IP throttling configuration
   * Get the suspicious IP throttling configuration
   * @throws {RequiredError}
   */
  async getSuspiciousIpThrottlingConfigRaw(
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/attack-protection/suspicious-ip-throttling`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Get the suspicious IP throttling configuration
   * Get the suspicious IP throttling configuration
   */
  async getSuspiciousIpThrottlingConfig(initOverrides?: InitOverrides): Promise<void> {
    await this.getSuspiciousIpThrottlingConfigRaw(initOverrides);
  }

  /**
   * Update breached password detection settings
   * Update breached password detection settings
   * @throws {RequiredError}
   */
  async updateBreachedPasswordDetectionConfigRaw(
    bodyParameters: PatchBreachedPasswordDetectionRequest,
    initOverrides?: InitOverrides
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Update breached password detection settings
   * Update breached password detection settings
   */
  async updateBreachedPasswordDetectionConfig(
    bodyParameters: PatchBreachedPasswordDetectionRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.updateBreachedPasswordDetectionConfigRaw(bodyParameters, initOverrides);
  }

  /**
   * Update the brute force configuration
   * Update the brute force configuration
   * @throws {RequiredError}
   */
  async updateBruteForceConfigRaw(
    bodyParameters: PatchBruteForceProtectionRequest,
    initOverrides?: InitOverrides
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Update the brute force configuration
   * Update the brute force configuration
   */
  async updateBruteForceConfig(
    bodyParameters: PatchBruteForceProtectionRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.updateBruteForceConfigRaw(bodyParameters, initOverrides);
  }

  /**
   * Update the suspicious IP throttling configuration
   * Update the suspicious IP throttling configuration
   * @throws {RequiredError}
   */
  async updateSuspiciousIpThrottlingConfigRaw(
    bodyParameters: PatchSuspiciousIpThrottlingRequest,
    initOverrides?: InitOverrides
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Update the suspicious IP throttling configuration
   * Update the suspicious IP throttling configuration
   */
  async updateSuspiciousIpThrottlingConfig(
    bodyParameters: PatchSuspiciousIpThrottlingRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.updateSuspiciousIpThrottlingConfigRaw(bodyParameters, initOverrides);
  }
}
