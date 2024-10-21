import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  SSOProfile,
  SSOProfileCreate,
  SSOProfileUpdate,
  SelfServiceProfilesIdDeleteRequest,
  SelfServiceProfilesIdGetRequest,
  SelfServiceProfilesIdPatchRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class SelfServiceSSOManager extends BaseAPI {
  /**
   * Retrieve SSO profiles for the tenant
   *
   * @throws {RequiredError}
   */
  async selfServiceProfilesGet(initOverrides?: InitOverride): Promise<ApiResponse<SSOProfile>> {
    const response = await this.request(
      {
        path: `/self-service-profiles`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Delete SSO profile by ID
   *
   * @throws {RequiredError}
   */
  async selfServiceProfilesIdDelete(
    requestParameters: SelfServiceProfilesIdDeleteRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/self-service-profiles/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve SSO profile by ID
   *
   * @throws {RequiredError}
   */
  async selfServiceProfilesIdGet(
    requestParameters: SelfServiceProfilesIdGetRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SSOProfile>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/self-service-profiles/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update an SSO profile
   *
   * @throws {RequiredError}
   */
  async selfServiceProfilesIdPatch(
    requestParameters: SelfServiceProfilesIdPatchRequest,
    bodyParameters: SSOProfileUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SSOProfile>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/self-service-profiles/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create an SSO profile
   *
   * @throws {RequiredError}
   */
  async selfServiceProfilesPost(
    bodyParameters: SSOProfileCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SSOProfile>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/self-service-profiles`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
