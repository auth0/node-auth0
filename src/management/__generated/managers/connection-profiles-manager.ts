import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  CreateConnectionProfileRequestContent,
  CreateConnectionProfileResponseContent,
  GetConnectionProfileResponseContent,
  GetConnectionProfileTemplateResponseContent,
  ListConnectionProfileTemplateResponseContent,
  ListConnectionProfilesPaginatedResponseContent,
  UpdateConnectionProfileRequestContent,
  UpdateConnectionProfileResponseContent,
  DeleteConnectionProfilesByIdRequest,
  GetConnectionProfileTemplateRequest,
  GetConnectionProfilesRequest,
  GetConnectionProfilesByIdRequest,
  PatchConnectionProfilesByIdRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class ConnectionProfilesManager extends BaseAPI {
  /**
   * Delete a single Connection Profile specified by ID.
   *
   * Delete Connection Profile
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteConnectionProfilesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connection-profiles/{id}`.replace(
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
   * Retrieve a Connection Profile Template.
   *
   * Get Connection Profile Template
   *
   * @throws {RequiredError}
   */
  async getTemplate(
    requestParameters: GetConnectionProfileTemplateRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetConnectionProfileTemplateResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connection-profiles/templates/{id}`.replace(
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
   * Retrieve a list of Connection Profile Templates.
   *
   * Get Connection Profile Templates
   *
   * @throws {RequiredError}
   */
  async getAllTemplates(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ListConnectionProfileTemplateResponseContent>> {
    const response = await this.request(
      {
        path: `/connection-profiles/templates`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a list of Connection Profiles. This endpoint supports Checkpoint pagination.
   *
   * Get Connection Profiles
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetConnectionProfilesRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ListConnectionProfilesPaginatedResponseContent>> {
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
        path: `/connection-profiles`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details about a single Connection Profile specified by ID.
   *
   * Get Connection Profile
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetConnectionProfilesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetConnectionProfileResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/connection-profiles/{id}`.replace(
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
   * Update the details of a specific Connection Profile.
   *
   * Modify a Connection Profile
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchConnectionProfilesByIdRequest,
    bodyParameters: UpdateConnectionProfileRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UpdateConnectionProfileResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/connection-profiles/{id}`.replace(
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
   * Create a Connection Profile.
   *
   * Create a connection profile
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: CreateConnectionProfileRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<CreateConnectionProfileResponseContent>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/connection-profiles`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
