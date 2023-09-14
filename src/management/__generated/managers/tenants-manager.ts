import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  TenantSettings,
  TenantSettingsUpdate,
  TenantSettingsRouteRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

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
