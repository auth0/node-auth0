import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  CreateUserAttributeProfileRequestContent,
  CreateUserAttributeProfileResponseContent,
  GetUserAttributeProfileResponseContent,
  GetUserAttributeProfileTemplateResponseContent,
  ListUserAttributeProfileTemplateResponseContent,
  ListUserAttributeProfilesPaginatedResponseContent,
  UpdateUserAttributeProfileRequestContent,
  UpdateUserAttributeProfileResponseContent,
  DeleteUserAttributeProfilesByIdRequest,
  GetUserAttributeProfileTemplateRequest,
  GetUserAttributeProfilesRequest,
  GetUserAttributeProfilesByIdRequest,
  PatchUserAttributeProfilesByIdRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class UserAttributeProfilesManager extends BaseAPI {
  /**
   * Delete a single User Attribute Profile specified by ID.
   *
   * Delete User Attribute Profile
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteUserAttributeProfilesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/user-attribute-profiles/{id}`.replace(
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
   * Retrieve a User Attribute Profile Template.
   *
   * Get User Attribute Profile Template
   *
   * @throws {RequiredError}
   */
  async getTemplate(
    requestParameters: GetUserAttributeProfileTemplateRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetUserAttributeProfileTemplateResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/user-attribute-profiles/templates/{id}`.replace(
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
   * Retrieve a list of User Attribute Profile Templates.
   *
   * Get User Attribute Profile Templates
   *
   * @throws {RequiredError}
   */
  async getAllTemplates(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ListUserAttributeProfileTemplateResponseContent>> {
    const response = await this.request(
      {
        path: `/user-attribute-profiles/templates`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a list of User Attribute Profiles. This endpoint supports Checkpoint pagination.
   *
   * Get User Attribute Profiles
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetUserAttributeProfilesRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ListUserAttributeProfilesPaginatedResponseContent>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'from',
        config: {},
      },
      {
        key: 'take',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/user-attribute-profiles`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details about a single User Attribute Profile specified by ID.
   * Get User Attribute Profile
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetUserAttributeProfilesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetUserAttributeProfileResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/user-attribute-profiles/{id}`.replace(
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
   * Update the details of a specific User attribute profile, such as name, user_id and user_attributes.
   *
   * Modify a user attribute profile
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchUserAttributeProfilesByIdRequest,
    bodyParameters: UpdateUserAttributeProfileRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UpdateUserAttributeProfileResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user-attribute-profiles/{id}`.replace(
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
   * Retrieve details about a single User Attribute Profile specified by ID.
   * Post User Attribute Profile
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: CreateUserAttributeProfileRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<CreateUserAttributeProfileResponseContent>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user-attribute-profiles`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
