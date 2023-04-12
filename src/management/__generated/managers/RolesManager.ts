import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type {
  GetOrganizationMemberRoles200Response,
  GetOrganizationMemberRoles200ResponseOneOfInner,
  GetRolePermission200Response,
  GetRoleUser200Response,
  PostRolePermissionAssignmentRequest,
  PostRoleUsersRequest,
  RoleCreate,
  RoleUpdate,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteRolePermissionAssignmentRequest {
  /**
   * ID of the role to remove permissions from.
   * @type {string}
   */
  id: string;
}

export interface DeleteRolesByIdRequest {
  /**
   * ID of the role to delete.
   * @type {string}
   */
  id: string;
}

export interface GetRolePermissionRequest {
  /**
   * ID of the role to list granted permissions.
   * @type {string}
   */
  id: string;
  /**
   * Number of results per page. Defaults to 50.
   * @type {number}
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
}

export interface GetRoleUserRequest {
  /**
   * ID of the role to retrieve a list of users associated with.
   * @type {string}
   */
  id: string;
  /**
   * Number of results per page. Defaults to 50.
   * @type {number}
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Optional Id from which to start selection.
   * @type {string}
   */
  from?: string;
  /**
   * Number of results per page. Defaults to 50.
   * @type {number}
   */
  take?: number;
}

export interface GetRolesRequest {
  /**
   * Number of results per page. Defaults to 50.
   * @type {number}
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Optional filter on name (case-insensitive).
   * @type {string}
   */
  name_filter?: string;
}

export interface GetRolesByIdRequest {
  /**
   * ID of the role to retrieve.
   * @type {string}
   */
  id: string;
}

export interface PatchRolesByIdRequest {
  /**
   * ID of the role to update.
   * @type {string}
   */
  id: string;
}

export interface PostRolePermissionAssignmentOperationRequest {
  /**
   * ID of the role to add permissions to.
   * @type {string}
   */
  id: string;
}

export interface PostRoleUsersOperationRequest {
  /**
   * ID of the role to assign users to.
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class RolesManager extends BaseAPI {
  /**
   * Remove permissions associated with a role.
   *
   * Remove permissions from a role
   * @throws {RequiredError}
   */
  async removePermissionsRaw(
    requestParameters: DeleteRolePermissionAssignmentRequest,
    bodyParameters: PostRolePermissionAssignmentRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<any>> {
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

    return new runtime.TextApiResponse(response) as any;
  }

  /**
   * Remove permissions associated with a role.<br/>
   * Remove permissions from a role
   */
  async removePermissions(
    requestParameters: DeleteRolePermissionAssignmentRequest,
    bodyParameters: PostRolePermissionAssignmentRequest,
    initOverrides?: InitOverride
  ): Promise<any> {
    const response = await this.removePermissionsRaw(
      requestParameters,
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Delete a role.
   *
   * Delete a role
   * @throws {RequiredError}
   */
  async deleteRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a role.<br/>
   * Delete a role
   */
  async delete(
    requestParameters: DeleteRolesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve list of permissions granted by a role.
   *
   * Get permissions granted by role
   * @throws {RequiredError}
   */
  async getPermissionsRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve list of permissions granted by a role.<br/>
   * Get permissions granted by role
   */
  async getPermissions(
    requestParameters: GetRolePermissionRequest,
    initOverrides?: InitOverride
  ): Promise<GetRolePermission200Response> {
    const response = await this.getPermissionsRaw(requestParameters, initOverrides);
    return await response.value();
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
   * @throws {RequiredError}
   */
  async getUsersRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve users associated with a role. This endpoint supports two types of pagination:<br/>- Offset pagination<br/>- Checkpoint pagination<br/><br/>Checkpoint pagination must be used if you need to retrieve more than 1000 users for a given role.<br/><br/><h2>Checkpoint Pagination</h2><br/><br/>To search by checkpoint, use the following parameters:<br/>- from: Optional id from which to start selection.<br/>- take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.<br/><br/>Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.<br/>
   * Get a role\'s users
   */
  async getUsers(
    requestParameters: GetRoleUserRequest,
    initOverrides?: InitOverride
  ): Promise<GetRoleUser200Response> {
    const response = await this.getUsersRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve filtered list of roles that can be assigned to users.
   *
   * Get roles
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetRolesRequest,
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve filtered list of roles that can be assigned to users.<br/>
   * Get roles
   */
  async getAll(
    requestParameters: GetRolesRequest = {},
    initOverrides?: InitOverride
  ): Promise<GetOrganizationMemberRoles200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a role.
   *
   * Get a role
   * @throws {RequiredError}
   */
  async getRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve a role.<br/>
   * Get a role
   */
  async get(
    requestParameters: GetRolesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<GetOrganizationMemberRoles200ResponseOneOfInner> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update a role.
   *
   * Update a role
   * @throws {RequiredError}
   */
  async updateRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update a role.<br/>
   * Update a role
   */
  async update(
    requestParameters: PatchRolesByIdRequest,
    bodyParameters: RoleUpdate,
    initOverrides?: InitOverride
  ): Promise<GetOrganizationMemberRoles200ResponseOneOfInner> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Associate permissions with a role.
   *
   * Associate permissions with a role
   * @throws {RequiredError}
   */
  async addPermissionsRaw(
    requestParameters: PostRolePermissionAssignmentOperationRequest,
    bodyParameters: PostRolePermissionAssignmentRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<any>> {
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

    return new runtime.TextApiResponse(response) as any;
  }

  /**
   * Associate permissions with a role.<br/>
   * Associate permissions with a role
   */
  async addPermissions(
    requestParameters: PostRolePermissionAssignmentOperationRequest,
    bodyParameters: PostRolePermissionAssignmentRequest,
    initOverrides?: InitOverride
  ): Promise<any> {
    const response = await this.addPermissionsRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Assign users to a role.
   * Assign users to a role
   * @throws {RequiredError}
   */
  async assignUsersRaw(
    requestParameters: PostRoleUsersOperationRequest,
    bodyParameters: PostRoleUsersRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<any>> {
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

    return new runtime.TextApiResponse(response) as any;
  }

  /**
   * Assign users to a role.
   * Assign users to a role
   */
  async assignUsers(
    requestParameters: PostRoleUsersOperationRequest,
    bodyParameters: PostRoleUsersRequest,
    initOverrides?: InitOverride
  ): Promise<any> {
    const response = await this.assignUsersRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a new role.
   *
   * Create a role
   * @throws {RequiredError}
   */
  async createRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create a new role.<br/>
   * Create a role
   */
  async create(
    bodyParameters: RoleCreate,
    initOverrides?: InitOverride
  ): Promise<GetOrganizationMemberRoles200ResponseOneOfInner> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
