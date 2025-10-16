import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetBotDetectionSettingsResponseContent,
  GetBreachedPasswordDetection200Response,
  GetBruteForceProtection200Response,
  GetCaptchaResponseContent,
  GetSuspiciousIpThrottling200Response,
  PatchBreachedPasswordDetectionRequest,
  PatchBruteForceProtectionRequest,
  PatchSuspiciousIpThrottlingRequest,
  UpdateBotDetectionSettingsRequestContent,
  UpdateBotDetectionSettingsResponseContent,
  UpdateCaptchaRequestContent,
  UpdateCaptchaResponseContent,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class AttackProtectionManager extends BaseAPI {
  /**
   * Get the Bot Detection configuration of your tenant.
   * Get Bot Detection settings
   *
   * @throws {RequiredError}
   */
  async getBotDetectionConfig(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBotDetectionSettingsResponseContent>> {
    const response = await this.request(
      {
        path: `/attack-protection/bot-detection`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

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
   * Get the CAPTCHA configuration for your client.
   * Get the CAPTCHA configuration for a tenant
   *
   * @throws {RequiredError}
   */
  async getCaptchaConfig(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetCaptchaResponseContent>> {
    const response = await this.request(
      {
        path: `/attack-protection/captcha`,
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
   * Update the Bot Detection configuration of your tenant.
   * Update Bot Detection settings
   *
   * @throws {RequiredError}
   */
  async updateBotDetectionConfig(
    bodyParameters: UpdateBotDetectionSettingsRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UpdateBotDetectionSettingsResponseContent>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/attack-protection/bot-detection`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
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
   * Update existing CAPTCHA configuration for your client.
   * Partial Update for CAPTCHA Configuration
   *
   * @throws {RequiredError}
   */
  async updateCaptchaConfig(
    bodyParameters: UpdateCaptchaRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UpdateCaptchaResponseContent>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/attack-protection/captcha`,
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
