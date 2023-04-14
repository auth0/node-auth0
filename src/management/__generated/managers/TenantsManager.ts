import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { TenantSettings, TenantSettingsUpdate } from '../models';

const { BaseAPI } = runtime;

export interface TenantSettingsRouteRequest {
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   */
  include_fields?: boolean;
}

/**
 *
 */
export class TenantsManager extends BaseAPI {
  /**
   * Update settings for a tenant.
   * Update tenant settings
   *
   * @throws {RequiredError}
   */
  async updateSettings(
    bodyParameters: TenantSettingsUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TenantSettings>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/tenants/settings`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve tenant settings. A list of fields to include or exclude may also be specified.
   * Get tenant settings
   *
   * @throws {RequiredError}
   */
  async getSettings(
    requestParameters: TenantSettingsRouteRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TenantSettings>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/tenants/settings`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
