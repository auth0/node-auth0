/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type { TenantSettings, TenantSettingsUpdate } from '../models';

export interface TenantSettingsRouteRequest {
  fields?: string;
  include_fields?: boolean;
}

/**
 *
 */
export class TenantsManager extends runtime.BaseAPI {
  /**
   * Update settings for a tenant.
   * Update tenant settings
   * @throws {RequiredError}
   * @memberof TenantsManager
   */
  async updateSettingsRaw(
    bodyParameters: TenantSettingsUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TenantSettings>> {
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update settings for a tenant.
   * Update tenant settings
   */
  async updateSettings(
    bodyParameters: TenantSettingsUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TenantSettings> {
    const response = await this.updateSettingsRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve tenant settings. A list of fields to include or exclude may also be specified.
   * Get tenant settings
   * @throws {RequiredError}
   * @memberof TenantsManager
   */
  async getSettingsRaw(
    requestParameters: TenantSettingsRouteRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TenantSettings>> {
    const queryParameters: any = {};

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    const response = await this.request(
      {
        path: `/tenants/settings`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve tenant settings. A list of fields to include or exclude may also be specified.
   * Get tenant settings
   */
  async getSettings(
    requestParameters: TenantSettingsRouteRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TenantSettings> {
    const response = await this.getSettingsRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
