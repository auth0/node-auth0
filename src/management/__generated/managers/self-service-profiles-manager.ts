import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  SsProfile,
  SsProfileCreate,
  SsProfileList,
  SsProfileUpdate,
  SsoAccessTicketResponse,
  SsoTicketRequestJson,
  DeleteSelfServiceProfilesByIdRequest,
  GetSelfServiceProfilesByIdRequest,
  PatchSelfServiceProfilesByIdRequest,
  PostSsoTicketRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class SelfServiceProfilesManager extends BaseAPI {
  /**
   * Deletes a self-service profile by Id.
   * Delete a self-service profile by Id
   *
   * @throws {RequiredError}
   */
  async deleteSelfServiceProfiles(
    requestParameters: DeleteSelfServiceProfilesByIdRequest,
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
   * Retrieves self-service profiles. Currently only one profile can be created per tenant.
   * Retrieve self-service profiles
   *
   * @throws {RequiredError}
   */
  async getSelfServiceProfiles(initOverrides?: InitOverride): Promise<ApiResponse<SsProfileList>> {
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
   * Retrieves a self-service profile by Id.
   * Retrieve a self-service profile by Id
   *
   * @throws {RequiredError}
   */
  async getSelfServiceProfilesById(
    requestParameters: GetSelfServiceProfilesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SsProfile>> {
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
   * Updates a self-service profile.
   * Update a self-service profile
   *
   * @throws {RequiredError}
   */
  async patchSelfServiceProfiles(
    requestParameters: PatchSelfServiceProfilesByIdRequest,
    bodyParameters: SsProfileUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SsProfile>> {
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
   * Creates a self-service profile. Currently only one profile can be created per tenant.
   * Create a self-service profile
   *
   * @throws {RequiredError}
   */
  async postSelfServiceProfiles(
    bodyParameters: SsProfileCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SsProfile>> {
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

  /**
   * Creates an sso-access ticket to initiate the Self Service SSO Flow using a self-service profile.
   * Create an sso-access ticket to initiate the Self Service SSO Flow
   *
   * @throws {RequiredError}
   */
  async postSsoTicket(
    requestParameters: PostSsoTicketRequest,
    bodyParameters: SsoTicketRequestJson,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SsoAccessTicketResponse>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/self-service-profiles/{id}/sso-ticket`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
