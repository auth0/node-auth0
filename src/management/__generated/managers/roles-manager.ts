import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetOrganizationMemberRoles200Response,
  GetOrganizationMemberRoles200ResponseOneOfInner,
  GetRolePermission200Response,
  GetRoleUser200Response,
  PostRolePermissionAssignmentRequest,
  PostRoleUsersRequest,
  RoleCreate,
  RoleUpdate,
  GetRolePermission200ResponseOneOf,
  Permission,
  GetRoleUser200ResponseOneOf,
  GetRoleUser200ResponseOneOfInner,
  GetOrganizationMemberRoles200ResponseOneOf,
  DeleteRolePermissionAssignmentRequest,
  DeleteRolesByIdRequest,
  GetRolePermissionRequest,
  GetRoleUserRequest,
  GetRolesRequest,
  GetRolesByIdRequest,
  PatchRolesByIdRequest,
  PostRolePermissionAssignmentOperationRequest,
  PostRoleUsersOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class RolesManager extends BaseAPI {
  /**
   * Remove permissions associated with a role.
   *
   * Remove permissions from a role
   *
   * @throws {RequiredError}
   */
  async deletePermissions(
    requestParameters: DeleteRolePermissionAssignmentRequest,
    bodyParameters: PostRolePermissionAssignmentRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/roles/{id}/permissions`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete a role.
   *
   * Delete a role
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteRolesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/roles/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve list of permissions granted by a role.
   *
   * Get permissions granted by role
   *
   * @throws {RequiredError}
   */
  async getPermissions(
    requestParameters: GetRolePermissionRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetRolePermission200ResponseOneOf>>;
  async getPermissions(
    requestParameters?: GetRolePermissionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<Permission>>>;
  async getPermissions(
    requestParameters: GetRolePermissionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetRolePermission200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'per_page',
        config: {},
      },
      {
        key: 'page',
        config: {},
      },
      {
        key: 'include_totals',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/roles/{id}/permissions`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve users associated with a role. This endpoint supports two types of pagination:
   * - Offset pagination
   * - Checkpoint pagination
   *
   * Checkpoint pagination must be used if you need to retrieve more than 1000 users for a given role.
   *
   * <h2>Checkpoint Pagination</h2>
   *
   * To search by checkpoint, use the following parameters:
   * - from: Optional id from which to start selection.
   * - take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.
   *
   * Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.
   *
   * Get a role's users
   *
   * @throws {RequiredError}
   */
  async getUsers(
    requestParameters: GetRoleUserRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetRoleUser200ResponseOneOf>>;
  async getUsers(
    requestParameters?: GetRoleUserRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetRoleUser200ResponseOneOfInner>>>;
  async getUsers(
    requestParameters: GetRoleUserRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetRoleUser200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'per_page',
        config: {},
      },
      {
        key: 'page',
        config: {},
      },
      {
        key: 'include_totals',
        config: {},
      },
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
        path: `/roles/{id}/users`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve filtered list of roles that can be assigned to users.
   *
   * Get roles
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetRolesRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationMemberRoles200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetRolesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetOrganizationMemberRoles200ResponseOneOfInner>>>;
  async getAll(
    requestParameters: GetRolesRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationMemberRoles200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'per_page',
        config: {},
      },
      {
        key: 'page',
        config: {},
      },
      {
        key: 'include_totals',
        config: {},
      },
      {
        key: 'name_filter',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/roles`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a role.
   *
   * Get a role
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetRolesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationMemberRoles200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/roles/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update a role.
   *
   * Update a role
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchRolesByIdRequest,
    bodyParameters: RoleUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationMemberRoles200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/roles/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Associate permissions with a role.
   *
   * Associate permissions with a role
   *
   * @throws {RequiredError}
   */
  async addPermissions(
    requestParameters: PostRolePermissionAssignmentOperationRequest,
    bodyParameters: PostRolePermissionAssignmentRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/roles/{id}/permissions`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Assign users to a role.
   * Assign users to a role
   *
   * @throws {RequiredError}
   */
  async assignUsers(
    requestParameters: PostRoleUsersOperationRequest,
    bodyParameters: PostRoleUsersRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/roles/{id}/users`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Create a new role.
   *
   * Create a role
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: RoleCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationMemberRoles200ResponseOneOfInner>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/roles`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
