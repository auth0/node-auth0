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
   * Remove one or more <a href="https://auth0.com/docs/manage-users/access-control/configure-core-rbac/manage-permissions">permissions</a> from a specified user role.
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
   * Delete a specific <a href="https://auth0.com/docs/manage-users/access-control/rbac">user role</a> from your tenant. Once deleted, it is removed from any user who was previously assigned that role. This action cannot be undone.
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
   * Retrieve detailed list (name, description, resource server) of permissions granted by a specified user role.
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
   * Retrieve list of users associated with a specific role. For Dashboard instructions, review <a href="https://auth0.com/docs/manage-users/access-control/configure-core-rbac/roles/view-users-assigned-to-roles">View Users Assigned to Roles</a>.
   *
   * This endpoint supports two types of pagination:
   * <ul>
   * <li>Offset pagination</li>
   * <li>Checkpoint pagination</li>
   * </ul>
   *
   * Checkpoint pagination must be used if you need to retrieve more than 1000 organization members.
   *
   * <h2>Checkpoint Pagination</h2>
   *
   * To search by checkpoint, use the following parameters:
   * <ul>
   * <li><code>from</code>: Optional id from which to start selection.</li>
   * <li><code>take</code>: The total amount of entries to retrieve when using the from parameter. Defaults to 50.</li>
   * </ul>
   *
   * <b>Note</b>: The first time you call this endpoint using checkpoint pagination, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no pages are remaining.
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
   * Retrieve detailed list of user roles created in your tenant.
   *
   * <b>Note</b>: The returned list does not include standard roles available for tenant members, such as Admin or Support Access.
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
   * Retrieve details about a specific <a href="https://auth0.com/docs/manage-users/access-control/rbac">user role</a> specified by ID.
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
   * Modify the details of a specific <a href="https://auth0.com/docs/manage-users/access-control/rbac">user role</a> specified by ID.
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
   * Add one or more <a href="https://auth0.com/docs/manage-users/access-control/configure-core-rbac/manage-permissions">permissions</a> to a specified user role.
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
   * Assign one or more users to an existing user role. To learn more, review <a href="https://auth0.com/docs/manage-users/access-control/rbac">Role-Based Access Control</a>.
   *
   * <b>Note</b>: New roles cannot be created through this action.
   *
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
   * Create a user role for <a href="https://auth0.com/docs/manage-users/access-control/rbac">Role-Based Access Control</a>.
   *
   * <b>Note</b>: New roles are not associated with any permissions by default. To assign existing permissions to your role, review Associate Permissions with a Role. To create new permissions, review Add API Permissions.
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
