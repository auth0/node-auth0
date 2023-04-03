/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  PatchBreachedPasswordDetectionRequest,
  PatchBruteForceProtectionRequest,
  PatchSuspiciousIpThrottlingRequest,
} from '../models';

/**
 *
 */
export class AttackProtectionManager extends runtime.BaseAPI {
  /**
   * Get breached password detection settings
   * Get breached password detection settings
   * @throws {RequiredError}
   * @memberof AttackProtectionManager
   */
  async getBreachedPasswordDetectionConfigRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
  async getBreachedPasswordDetectionConfig(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.getBreachedPasswordDetectionConfigRaw(initOverrides);
  }

  /**
   * Get the brute force configuration
   * Get the brute force configuration
   * @throws {RequiredError}
   * @memberof AttackProtectionManager
   */
  async getBruteForceConfigRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
  async getBruteForceConfig(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.getBruteForceConfigRaw(initOverrides);
  }

  /**
   * Get the brute force configuration defaults
   * Get the brute force configuration defaults
   * @throws {RequiredError}
   * @memberof AttackProtectionManager
   */
  async getBruteForceDefaultsRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
  async getBruteForceDefaults(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.getBruteForceDefaultsRaw(initOverrides);
  }

  /**
   * Get the suspicious IP throttling configuration
   * Get the suspicious IP throttling configuration
   * @throws {RequiredError}
   * @memberof AttackProtectionManager
   */
  async getSuspiciousIpThrottlingConfigRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
  async getSuspiciousIpThrottlingConfig(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.getSuspiciousIpThrottlingConfigRaw(initOverrides);
  }

  /**
   * Update breached password detection settings
   * Update breached password detection settings
   * @throws {RequiredError}
   * @memberof AttackProtectionManager
   */
  async updateBreachedPasswordDetectionConfigRaw(
    bodyParameters: PatchBreachedPasswordDetectionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.updateBreachedPasswordDetectionConfigRaw(bodyParameters, initOverrides);
  }

  /**
   * Update the brute force configuration
   * Update the brute force configuration
   * @throws {RequiredError}
   * @memberof AttackProtectionManager
   */
  async updateBruteForceConfigRaw(
    bodyParameters: PatchBruteForceProtectionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.updateBruteForceConfigRaw(bodyParameters, initOverrides);
  }

  /**
   * Update the suspicious IP throttling configuration
   * Update the suspicious IP throttling configuration
   * @throws {RequiredError}
   * @memberof AttackProtectionManager
   */
  async updateSuspiciousIpThrottlingConfigRaw(
    bodyParameters: PatchSuspiciousIpThrottlingRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.updateSuspiciousIpThrottlingConfigRaw(bodyParameters, initOverrides);
  }
}
