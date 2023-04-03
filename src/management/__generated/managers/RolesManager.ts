/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
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

export interface DeleteRolePermissionAssignmentRequest {
  id: string;
}

export interface DeleteRolesByIdRequest {
  id: string;
}

export interface GetRolePermissionRequest {
  id: string;
  per_page?: number;
  page?: number;
  include_totals?: boolean;
}

export interface GetRoleUserRequest {
  id: string;
  per_page?: number;
  page?: number;
  include_totals?: boolean;
  from?: string;
  take?: number;
}

export interface GetRolesRequest {
  per_page?: number;
  page?: number;
  include_totals?: boolean;
  name_filter?: string;
}

export interface GetRolesByIdRequest {
  id: string;
}

export interface PatchRolesByIdRequest {
  id: string;
}

export interface PostRolePermissionAssignmentOperationRequest {
  id: string;
}

export interface PostRoleUsersOperationRequest {
  id: string;
}

/**
 *
 */
export class RolesManager extends runtime.BaseAPI {
  /**
   * Remove permissions associated with a role.<br/>
   * Remove permissions from a role
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async removePermissionsRaw(
    requestParameters: DeleteRolePermissionAssignmentRequest,
    bodyParameters: PostRolePermissionAssignmentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<any>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling removePermissions.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/roles/{id}/permissions`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<any> {
    const response = await this.removePermissionsRaw(
      requestParameters,
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Delete a role.<br/>
   * Delete a role
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async deleteRaw(
    requestParameters: DeleteRolesByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling delete.'
      );
    }

    const response = await this.request(
      {
        path: `/roles/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve list of permissions granted by a role.<br/>
   * Get permissions granted by role
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async getPermissionsRaw(
    requestParameters: GetRolePermissionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetRolePermission200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getPermissions.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    const response = await this.request(
      {
        path: `/roles/{id}/permissions`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetRolePermission200Response> {
    const response = await this.getPermissionsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve users associated with a role. This endpoint supports two types of pagination:<br/>- Offset pagination<br/>- Checkpoint pagination<br/><br/>Checkpoint pagination must be used if you need to retrieve more than 1000 users for a given role.<br/><br/><h2>Checkpoint Pagination</h2><br/><br/>To search by checkpoint, use the following parameters:<br/>- from: Optional id from which to start selection.<br/>- take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.<br/><br/>Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.<br/>
   * Get a role\'s users
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async getUsersRaw(
    requestParameters: GetRoleUserRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetRoleUser200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getUsers.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    if (requestParameters.from !== undefined) {
      queryParameters['from'] = requestParameters.from;
    }

    if (requestParameters.take !== undefined) {
      queryParameters['take'] = requestParameters.take;
    }

    const response = await this.request(
      {
        path: `/roles/{id}/users`.replace(
          `{${'id'}}`,
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
   * Retrieve users associated with a role. This endpoint supports two types of pagination:<br/>- Offset pagination<br/>- Checkpoint pagination<br/><br/>Checkpoint pagination must be used if you need to retrieve more than 1000 users for a given role.<br/><br/><h2>Checkpoint Pagination</h2><br/><br/>To search by checkpoint, use the following parameters:<br/>- from: Optional id from which to start selection.<br/>- take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.<br/><br/>Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.<br/>
   * Get a role\'s users
   */
  async getUsers(
    requestParameters: GetRoleUserRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetRoleUser200Response> {
    const response = await this.getUsersRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve filtered list of roles that can be assigned to users.<br/>
   * Get roles
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async getAllRaw(
    requestParameters: GetRolesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizationMemberRoles200Response>> {
    const queryParameters: any = {};

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    if (requestParameters.name_filter !== undefined) {
      queryParameters['name_filter'] = requestParameters.name_filter;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizationMemberRoles200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a role.<br/>
   * Get a role
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async getRaw(
    requestParameters: GetRolesByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizationMemberRoles200ResponseOneOfInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }

    const response = await this.request(
      {
        path: `/roles/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizationMemberRoles200ResponseOneOfInner> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update a role.<br/>
   * Update a role
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async updateRaw(
    requestParameters: PatchRolesByIdRequest,
    bodyParameters: RoleUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizationMemberRoles200ResponseOneOfInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling update.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/roles/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizationMemberRoles200ResponseOneOfInner> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Associate permissions with a role.<br/>
   * Associate permissions with a role
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async addPermissionsRaw(
    requestParameters: PostRolePermissionAssignmentOperationRequest,
    bodyParameters: PostRolePermissionAssignmentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<any>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling addPermissions.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/roles/{id}/permissions`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<any> {
    const response = await this.addPermissionsRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Assign users to a role.
   * Assign users to a role
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async assignUsersRaw(
    requestParameters: PostRoleUsersOperationRequest,
    bodyParameters: PostRoleUsersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<any>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling assignUsers.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/roles/{id}/users`.replace(
          `{${'id'}}`,
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
   * Assign users to a role.
   * Assign users to a role
   */
  async assignUsers(
    requestParameters: PostRoleUsersOperationRequest,
    bodyParameters: PostRoleUsersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<any> {
    const response = await this.assignUsersRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a new role.<br/>
   * Create a role
   * @throws {RequiredError}
   * @memberof RolesManager
   */
  async createRaw(
    bodyParameters: RoleCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizationMemberRoles200ResponseOneOfInner>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizationMemberRoles200ResponseOneOfInner> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
