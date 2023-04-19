import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type {
  DeleteMembersRequest,
  DeleteOrganizationMemberRolesRequest,
  GetEnabledConnections200Response,
  GetEnabledConnections200ResponseOneOfInner,
  GetInvitations200Response,
  GetInvitations200ResponseOneOfInner,
  GetMembers200Response,
  GetOrganizationMemberRoles200Response,
  GetOrganizations200Response,
  GetOrganizations200ResponseOneOfInner,
  PatchEnabledConnectionsByConnectionIdRequest,
  PatchOrganizationsByIdRequest,
  PostEnabledConnectionsRequest,
  PostInvitationsRequest,
  PostMembersRequest,
  PostOrganizationMemberRolesRequest,
  PostOrganizationsRequest,
  GetEnabledConnections200ResponseOneOf,
  GetInvitations200ResponseOneOf,
  GetMembers200ResponseOneOf,
  GetMembers200ResponseOneOfInner,
  GetOrganizationMemberRoles200ResponseOneOf,
  GetOrganizationMemberRoles200ResponseOneOfInner,
  GetOrganizations200ResponseOneOf,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteEnabledConnectionsByConnectionIdRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * Connection identifier
   */
  connectionId: string;
}

export interface DeleteInvitationsByInvitationIdRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * The id of the user invitation.
   */
  invitation_id: string;
}

export interface DeleteMembersOperationRequest {
  /**
   * Organization identifier
   */
  id: string;
}

export interface DeleteOrganizationMemberRolesOperationRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * User ID of the organization member to remove roles from.
   */
  user_id: string;
}

export interface DeleteOrganizationsByIdRequest {
  /**
   * Organization identifier
   */
  id: string;
}

export interface GetEnabledConnectionsRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
}

export interface GetEnabledConnectionsByConnectionIdRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * Connection identifier
   */
  connectionId: string;
}

export interface GetInvitationsRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   */
  per_page?: number;
  /**
   * When true, return results inside an object that also contains the start and limit.  When false (default), a direct array of results is returned.  We do not yet support returning the total invitations count.
   */
  include_totals?: boolean;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   */
  include_fields?: boolean;
  /**
   * Field to sort by. Use field:order where order is 1 for ascending and -1 for descending Defaults to created_at:-1.
   */
  sort?: string;
}

export interface GetInvitationsByInvitationIdRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * The id of the user invitation.
   */
  invitation_id: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   */
  include_fields?: boolean;
}

export interface GetMembersRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
  /**
   * Optional Id from which to start selection.
   */
  from?: string;
  /**
   * Number of results per page. Defaults to 50.
   */
  take?: number;
}

export interface GetNameByNameRequest {
  /**
   * name of the organization to retrieve.
   */
  name: string;
}

export interface GetOrganizationMemberRolesRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * ID of the user to associate roles with.
   */
  user_id: string;
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
}

export interface GetOrganizationsRequest {
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
  /**
   * Optional Id from which to start selection.
   */
  from?: string;
  /**
   * Number of results per page. Defaults to 50.
   */
  take?: number;
  /**
   * Field to sort by. Use &lt;code&gt;field:order&lt;/code&gt; where order is &lt;code&gt;1&lt;/code&gt; for ascending and &lt;code&gt;-1&lt;/code&gt; for descending. e.g. &lt;code&gt;created_at:1&lt;/code&gt;. We currently support sorting by the following fields: &lt;code&gt;name&lt;/code&gt;, &lt;code&gt;display_name&lt;/code&gt; and &lt;code&gt;created_at&lt;/code&gt;.
   */
  sort?: string;
}

export interface GetOrganizationsByIdRequest {
  /**
   * ID of the organization to retrieve.
   */
  id: string;
}

export interface PatchEnabledConnectionsByConnectionIdOperationRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * Connection identifier
   */
  connectionId: string;
}

export interface PatchOrganizationsByIdOperationRequest {
  /**
   * ID of the organization to update.
   */
  id: string;
}

export interface PostEnabledConnectionsOperationRequest {
  /**
   * Organization identifier
   */
  id: string;
}

export interface PostInvitationsOperationRequest {
  /**
   * Organization identifier
   */
  id: string;
}

export interface PostMembersOperationRequest {
  /**
   * Organization identifier
   */
  id: string;
}

export interface PostOrganizationMemberRolesOperationRequest {
  /**
   * Organization identifier
   */
  id: string;
  /**
   * ID of the user to associate roles with.
   */
  user_id: string;
}

/**
 *
 */
export class OrganizationsManager extends BaseAPI {
  /**
   * Delete connections from an organization
   *
   * @throws {RequiredError}
   */
  async removeEnabledConnection(
    requestParameters: DeleteEnabledConnectionsByConnectionIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'connectionId']);

    const response = await this.request(
      {
        path: `/organizations/{id}/enabled_connections/{connectionId}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{connectionId}', encodeURIComponent(String(requestParameters.connectionId))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete an invitation to organization
   *
   * @throws {RequiredError}
   */
  async deleteInvitation(
    requestParameters: DeleteInvitationsByInvitationIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'invitation_id']);

    const response = await this.request(
      {
        path: `/organizations/{id}/invitations/{invitation_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{invitation_id}', encodeURIComponent(String(requestParameters.invitation_id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete members from an organization
   *
   * @throws {RequiredError}
   */
  async deleteMembers(
    requestParameters: DeleteMembersOperationRequest,
    bodyParameters: DeleteMembersRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/members`.replace(
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
   * Remove one or more roles from a given user in the context of the provided organization
   *
   * @throws {RequiredError}
   */
  async deleteMemberRoles(
    requestParameters: DeleteOrganizationMemberRolesOperationRequest,
    bodyParameters: DeleteOrganizationMemberRolesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'user_id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/members/{user_id}/roles`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{user_id}', encodeURIComponent(String(requestParameters.user_id))),
        method: 'DELETE',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete a specific organization
   *
   * Delete organization
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteOrganizationsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/organizations/{id}`.replace(
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
   * Get connections enabled for an organization
   *
   * @throws {RequiredError}
   */
  async getEnabledConnections(
    requestParameters: GetEnabledConnectionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEnabledConnections200ResponseOneOf>>;
  async getEnabledConnections(
    requestParameters?: GetEnabledConnectionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetEnabledConnections200ResponseOneOfInner>>>;
  async getEnabledConnections(
    requestParameters: GetEnabledConnectionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEnabledConnections200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

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
        path: `/organizations/{id}/enabled_connections`.replace(
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
   * Get an enabled connection for an organization
   *
   * @throws {RequiredError}
   */
  async getEnabledConnection(
    requestParameters: GetEnabledConnectionsByConnectionIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEnabledConnections200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'connectionId']);

    const response = await this.request(
      {
        path: `/organizations/{id}/enabled_connections/{connectionId}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{connectionId}', encodeURIComponent(String(requestParameters.connectionId))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get invitations to organization
   *
   * @throws {RequiredError}
   */
  async getInvitations(
    requestParameters: GetInvitationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetInvitations200ResponseOneOf>>;
  async getInvitations(
    requestParameters?: GetInvitationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetInvitations200ResponseOneOfInner>>>;
  async getInvitations(
    requestParameters: GetInvitationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetInvitations200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

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
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
      {
        key: 'sort',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/organizations/{id}/invitations`.replace(
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
   * Get an invitation to organization
   *
   * @throws {RequiredError}
   */
  async getInvitation(
    requestParameters: GetInvitationsByInvitationIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetInvitations200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'invitation_id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/organizations/{id}/invitations/{invitation_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{invitation_id}', encodeURIComponent(String(requestParameters.invitation_id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * List organization members. This endpoint supports two types of pagination:
   * - Offset pagination
   * - Checkpoint pagination
   *
   * Checkpoint pagination must be used if you need to retrieve more than 1000 organization members.
   *
   * <h2>Checkpoint Pagination</h2>
   *
   * To search by checkpoint, use the following parameters:
   * - from: Optional id from which to start selection.
   * - take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.
   *
   * Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.
   *
   * Get members who belong to an organization
   *
   * @throws {RequiredError}
   */
  async getMembers(
    requestParameters: GetMembersRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetMembers200ResponseOneOf>>;
  async getMembers(
    requestParameters?: GetMembersRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetMembers200ResponseOneOfInner>>>;
  async getMembers(
    requestParameters: GetMembersRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetMembers200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

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
        path: `/organizations/{id}/members`.replace(
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
   * Get a specific organization by name
   *
   * Get organization by name
   *
   * @throws {RequiredError}
   */
  async getByName(
    requestParameters: GetNameByNameRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizations200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['name']);

    const response = await this.request(
      {
        path: `/organizations/name/{name}`.replace(
          '{name}',
          encodeURIComponent(String(requestParameters.name))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get the roles assigned to an organization member
   *
   * @throws {RequiredError}
   */
  async getMemberRoles(
    requestParameters: GetOrganizationMemberRolesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationMemberRoles200ResponseOneOf>>;
  async getMemberRoles(
    requestParameters?: GetOrganizationMemberRolesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetOrganizationMemberRoles200ResponseOneOfInner>>>;
  async getMemberRoles(
    requestParameters: GetOrganizationMemberRolesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationMemberRoles200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'user_id']);

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
        path: `/organizations/{id}/members/{user_id}/roles`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{user_id}', encodeURIComponent(String(requestParameters.user_id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * List available organizations. This endpoint supports two types of pagination:
   * - Offset pagination
   * - Checkpoint pagination
   *
   * Checkpoint pagination must be used if you need to retrieve more than 1000 organizations.
   *
   * <h2>Checkpoint Pagination</h2>
   *
   * To search by checkpoint, use the following parameters:
   * - from: Optional id from which to start selection.
   * - take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.
   *
   * Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.
   *
   * Get organizations
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetOrganizationsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizations200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetOrganizationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetOrganizations200ResponseOneOfInner>>>;
  async getAll(
    requestParameters: GetOrganizationsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizations200Response>> {
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
      {
        key: 'from',
        config: {},
      },
      {
        key: 'take',
        config: {},
      },
      {
        key: 'sort',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/organizations`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get a specific organization
   *
   * Get organization
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetOrganizationsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizations200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/organizations/{id}`.replace(
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
   * Modify an enabled_connection belonging to an Organization.
   *
   * Modify an Organizations Connection
   *
   * @throws {RequiredError}
   */
  async updateEnabledConnection(
    requestParameters: PatchEnabledConnectionsByConnectionIdOperationRequest,
    bodyParameters: PatchEnabledConnectionsByConnectionIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEnabledConnections200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'connectionId']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/enabled_connections/{connectionId}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{connectionId}', encodeURIComponent(String(requestParameters.connectionId))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Modify an organization
   *
   * Modify an Organization
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchOrganizationsByIdOperationRequest,
    bodyParameters: PatchOrganizationsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizations200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}`.replace(
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
   * Add connections to an organization
   *
   * @throws {RequiredError}
   */
  async addEnabledConnection(
    requestParameters: PostEnabledConnectionsOperationRequest,
    bodyParameters: PostEnabledConnectionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEnabledConnections200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/enabled_connections`.replace(
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
   * Create invitations to organization
   *
   * @throws {RequiredError}
   */
  async createInvitation(
    requestParameters: PostInvitationsOperationRequest,
    bodyParameters: PostInvitationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetInvitations200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/invitations`.replace(
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
   * Add members to an organization
   *
   * @throws {RequiredError}
   */
  async addMembers(
    requestParameters: PostMembersOperationRequest,
    bodyParameters: PostMembersRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/members`.replace(
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
   * Assign one or more roles to a given user that will be applied in the context of the provided organization
   *
   * @throws {RequiredError}
   */
  async addMemberRoles(
    requestParameters: PostOrganizationMemberRolesOperationRequest,
    bodyParameters: PostOrganizationMemberRolesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'user_id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/members/{user_id}/roles`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{user_id}', encodeURIComponent(String(requestParameters.user_id))),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Create an organization
   *
   * Create an Organization
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: PostOrganizationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizations200ResponseOneOfInner>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
