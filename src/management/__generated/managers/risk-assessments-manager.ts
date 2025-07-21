import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetRiskAssessmentsSettingsNewDeviceResponseContent,
  GetRiskAssessmentsSettingsResponseContent,
  UpdateRiskAssessmentsSettingsNewDeviceRequestContent,
  UpdateRiskAssessmentsSettingsNewDeviceResponseContent,
  UpdateRiskAssessmentsSettingsRequestContent,
  UpdateRiskAssessmentsSettingsResponseContent,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class RiskAssessmentsManager extends BaseAPI {
  /**
   * Gets the risk assessment settings for the new device assessor
   *
   * @throws {RequiredError}
   */
  async getNewDeviceSettings(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetRiskAssessmentsSettingsNewDeviceResponseContent>> {
    const response = await this.request(
      {
        path: `/risk-assessments/settings/new-device`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Gets the tenant settings for risk assessments
   * Get risk assessment settings
   *
   * @throws {RequiredError}
   */
  async getSettings(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetRiskAssessmentsSettingsResponseContent>> {
    const response = await this.request(
      {
        path: `/risk-assessments/settings`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Updates the risk assessment settings for the new device assessor
   *
   * @throws {RequiredError}
   */
  async updateNewDeviceSettings(
    bodyParameters: UpdateRiskAssessmentsSettingsNewDeviceRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UpdateRiskAssessmentsSettingsNewDeviceResponseContent>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/risk-assessments/settings/new-device`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Updates the tenant settings for risk assessments
   * Updates risk assessment settings
   *
   * @throws {RequiredError}
   */
  async updateSettings(
    bodyParameters: UpdateRiskAssessmentsSettingsRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UpdateRiskAssessmentsSettingsResponseContent>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/risk-assessments/settings`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
