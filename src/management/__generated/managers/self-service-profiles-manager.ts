import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetSelfServiceProfiles200Response,
  PostSsoTicketRequest,
  SsProfile,
  SsProfileCreate,
  SsProfileUpdate,
  SsoAccessTicketResponse,
  GetSelfServiceProfiles200ResponseOneOf,
  DeleteSelfServiceProfilesByIdRequest,
  GetSelfServiceProfileCustomTextRequest,
  GetSelfServiceProfilesRequest,
  GetSelfServiceProfilesByIdRequest,
  PatchSelfServiceProfilesByIdRequest,
  PostRevokeRequest,
  PostSsoTicketOperationRequest,
  PutSelfServiceProfileCustomTextRequest,
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
  async delete(
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
   * Retrieves text customizations for a given self-service profile, language and Self Service SSO Flow page.
   *
   * Get custom text for a self-service profile
   *
   * @throws {RequiredError}
   */
  async getCustomText(
    requestParameters: GetSelfServiceProfileCustomTextRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'language', 'page']);

    const response = await this.request(
      {
        path: `/self-service-profiles/{id}/custom-text/{language}/{page}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{language}', encodeURIComponent(String(requestParameters.language)))
          .replace('{page}', encodeURIComponent(String(requestParameters.page))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * Retrieves self-service profiles. Currently only one profile can be created per tenant.
   * Get self-service profiles
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetSelfServiceProfilesRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetSelfServiceProfiles200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetSelfServiceProfilesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<SsProfile>>>;
  async getAll(
    requestParameters: GetSelfServiceProfilesRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetSelfServiceProfiles200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'page',
        config: {},
      },
      {
        key: 'per_page',
        config: {},
      },
      {
        key: 'include_totals',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/self-service-profiles`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieves a self-service profile by Id.
   * Get a self-service profile by Id
   *
   * @throws {RequiredError}
   */
  async get(
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
  async update(
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
   * Revokes an SSO access ticket and invalidates associated sessions. The ticket will no longer be accepted to initiate a Self-Service SSO session. If any users have already started a session through this ticket, their session will be terminated. Clients should expect a `202 Accepted` response upon successful processing, indicating that the request has been acknowledged and that the revocation is underway but may not be fully completed at the time of response. If the specified ticket does not exist, a `202 Accepted` response is also returned, signaling that no further action is required.
   * Clients should treat these `202` responses as an acknowledgment that the request has been accepted and is in progress, even if the ticket was not found.
   *
   * Revoke an SSO access ticket
   *
   * @throws {RequiredError}
   */
  async revokeSsoTicket(
    requestParameters: PostRevokeRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<any>> {
    runtime.validateRequiredRequestParams(requestParameters, ['profileId', 'id']);

    const response = await this.request(
      {
        path: `/self-service-profiles/{profileId}/sso-ticket/{id}/revoke`
          .replace('{profileId}', encodeURIComponent(String(requestParameters.profileId)))
          .replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'POST',
      },
      initOverrides
    );

    return runtime.TextApiResponse.fromResponse(response) as any;
  }

  /**
   * Creates a self-service profile. Currently only one profile can be created per tenant.
   * Create a self-service profile
   *
   * @throws {RequiredError}
   */
  async create(
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
   * Creates an SSO access ticket to initiate the Self Service SSO Flow using a self-service profile.
   *
   * Create an SSO access ticket to initiate the Self Service SSO Flow
   *
   * @throws {RequiredError}
   */
  async createSsoTicket(
    requestParameters: PostSsoTicketOperationRequest,
    bodyParameters: PostSsoTicketRequest,
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

  /**
   * Updates text customizations for a given self-service profile, language and Self Service SSO Flow page.
   *
   * Set custom text for a self-service profile
   *
   * @throws {RequiredError}
   */
  async updateCustomText(
    requestParameters: PutSelfServiceProfileCustomTextRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'language', 'page']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/self-service-profiles/{id}/custom-text/{language}/{page}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{language}', encodeURIComponent(String(requestParameters.language)))
          .replace('{page}', encodeURIComponent(String(requestParameters.page))),
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }
}
