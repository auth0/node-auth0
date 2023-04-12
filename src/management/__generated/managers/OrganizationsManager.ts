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
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteEnabledConnectionsByConnectionIdRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * Connection identifier
   * @type {string}
   */
  connectionId: string;
}

export interface DeleteInvitationsByInvitationIdRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * The id of the user invitation.
   * @type {string}
   */
  invitation_id: string;
}

export interface DeleteMembersOperationRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
}

export interface DeleteOrganizationMemberRolesOperationRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * User ID of the organization member to remove roles from.
   * @type {string}
   */
  user_id: string;
}

export interface DeleteOrganizationsByIdRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
}

export interface GetEnabledConnectionsRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   * @type {number}
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
}

export interface GetEnabledConnectionsByConnectionIdRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * Connection identifier
   * @type {string}
   */
  connectionId: string;
}

export interface GetInvitationsRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   * @type {number}
   */
  per_page?: number;
  /**
   * When true, return results inside an object that also contains the start and limit.  When false (default), a direct array of results is returned.  We do not yet support returning the total invitations count.
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   * @type {string}
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   * @type {boolean}
   */
  include_fields?: boolean;
  /**
   * Field to sort by. Use field:order where order is 1 for ascending and -1 for descending Defaults to created_at:-1.
   * @type {string}
   */
  sort?: string;
}

export interface GetInvitationsByInvitationIdRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * The id of the user invitation.
   * @type {string}
   */
  invitation_id: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   * @type {string}
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   * @type {boolean}
   */
  include_fields?: boolean;
}

export interface GetMembersRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   * @type {number}
   */
  per_page?: number;
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

export interface GetNameByNameRequest {
  /**
   * name of the organization to retrieve.
   * @type {string}
   */
  name: string;
}

export interface GetOrganizationMemberRolesRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * ID of the user to associate roles with.
   * @type {string}
   */
  user_id: string;
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   * @type {number}
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
}

export interface GetOrganizationsRequest {
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   * @type {number}
   */
  per_page?: number;
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
  /**
   * Field to sort by. Use &lt;code&gt;field:order&lt;/code&gt; where order is &lt;code&gt;1&lt;/code&gt; for ascending and &lt;code&gt;-1&lt;/code&gt; for descending. e.g. &lt;code&gt;created_at:1&lt;/code&gt;. We currently support sorting by the following fields: &lt;code&gt;name&lt;/code&gt;, &lt;code&gt;display_name&lt;/code&gt; and &lt;code&gt;created_at&lt;/code&gt;.
   * @type {string}
   */
  sort?: string;
}

export interface GetOrganizationsByIdRequest {
  /**
   * ID of the organization to retrieve.
   * @type {string}
   */
  id: string;
}

export interface PatchEnabledConnectionsByConnectionIdOperationRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * Connection identifier
   * @type {string}
   */
  connectionId: string;
}

export interface PatchOrganizationsByIdOperationRequest {
  /**
   * ID of the organization to update.
   * @type {string}
   */
  id: string;
}

export interface PostEnabledConnectionsOperationRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
}

export interface PostInvitationsOperationRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
}

export interface PostMembersOperationRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
}

export interface PostOrganizationMemberRolesOperationRequest {
  /**
   * Organization identifier
   * @type {string}
   */
  id: string;
  /**
   * ID of the user to associate roles with.
   * @type {string}
   */
  user_id: string;
}

/**
 *
 */
export class OrganizationsManager extends BaseAPI {
  /**
   * Delete connections from an organization
   * @throws {RequiredError}
   */
  async removeEnabledConnectionRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete connections from an organization
   */
  async removeEnabledConnection(
    requestParameters: DeleteEnabledConnectionsByConnectionIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.removeEnabledConnectionRaw(requestParameters, initOverrides);
  }

  /**
   * Delete an invitation to organization
   * @throws {RequiredError}
   */
  async deleteInvitationRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete an invitation to organization
   */
  async deleteInvitation(
    requestParameters: DeleteInvitationsByInvitationIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteInvitationRaw(requestParameters, initOverrides);
  }

  /**
   * Delete members from an organization
   * @throws {RequiredError}
   */
  async deleteMembersRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete members from an organization
   */
  async deleteMembers(
    requestParameters: DeleteMembersOperationRequest,
    bodyParameters: DeleteMembersRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteMembersRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Remove one or more roles from a given user in the context of the provided organization
   * @throws {RequiredError}
   */
  async deleteMemberRolesRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Remove one or more roles from a given user in the context of the provided organization
   */
  async deleteMemberRoles(
    requestParameters: DeleteOrganizationMemberRolesOperationRequest,
    bodyParameters: DeleteOrganizationMemberRolesRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteMemberRolesRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Delete a specific organization
   *
   * Delete organization
   * @throws {RequiredError}
   */
  async deleteRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a specific organization<br/>
   * Delete organization
   */
  async delete(
    requestParameters: DeleteOrganizationsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Get connections enabled for an organization
   * @throws {RequiredError}
   */
  async getEnabledConnectionsRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get connections enabled for an organization
   */
  async getEnabledConnections(
    requestParameters: GetEnabledConnectionsRequest,
    initOverrides?: InitOverride
  ): Promise<GetEnabledConnections200Response> {
    const response = await this.getEnabledConnectionsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get an enabled connection for an organization
   * @throws {RequiredError}
   */
  async getEnabledConnectionRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get an enabled connection for an organization
   */
  async getEnabledConnection(
    requestParameters: GetEnabledConnectionsByConnectionIdRequest,
    initOverrides?: InitOverride
  ): Promise<GetEnabledConnections200ResponseOneOfInner> {
    const response = await this.getEnabledConnectionRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get invitations to organization
   * @throws {RequiredError}
   */
  async getInvitationsRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get invitations to organization
   */
  async getInvitations(
    requestParameters: GetInvitationsRequest,
    initOverrides?: InitOverride
  ): Promise<GetInvitations200Response> {
    const response = await this.getInvitationsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get an invitation to organization
   * @throws {RequiredError}
   */
  async getInvitationRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get an invitation to organization
   */
  async getInvitation(
    requestParameters: GetInvitationsByInvitationIdRequest,
    initOverrides?: InitOverride
  ): Promise<GetInvitations200ResponseOneOfInner> {
    const response = await this.getInvitationRaw(requestParameters, initOverrides);
    return await response.value();
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
   * @throws {RequiredError}
   */
  async getMembersRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * List organization members. This endpoint supports two types of pagination:<br/>- Offset pagination<br/>- Checkpoint pagination<br/><br/>Checkpoint pagination must be used if you need to retrieve more than 1000 organization members.<br/><br/><h2>Checkpoint Pagination</h2><br/><br/>To search by checkpoint, use the following parameters:<br/>- from: Optional id from which to start selection.<br/>- take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.<br/><br/>Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.<br/>
   * Get members who belong to an organization
   */
  async getMembers(
    requestParameters: GetMembersRequest,
    initOverrides?: InitOverride
  ): Promise<GetMembers200Response> {
    const response = await this.getMembersRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get a specific organization by name
   *
   * Get organization by name
   * @throws {RequiredError}
   */
  async getByNameRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get a specific organization by name<br/>
   * Get organization by name
   */
  async getByName(
    requestParameters: GetNameByNameRequest,
    initOverrides?: InitOverride
  ): Promise<GetOrganizations200ResponseOneOfInner> {
    const response = await this.getByNameRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get the roles assigned to an organization member
   * @throws {RequiredError}
   */
  async getMemberRolesRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get the roles assigned to an organization member
   */
  async getMemberRoles(
    requestParameters: GetOrganizationMemberRolesRequest,
    initOverrides?: InitOverride
  ): Promise<GetOrganizationMemberRoles200Response> {
    const response = await this.getMemberRolesRaw(requestParameters, initOverrides);
    return await response.value();
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
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetOrganizationsRequest,
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * List available organizations. This endpoint supports two types of pagination:<br/>- Offset pagination<br/>- Checkpoint pagination<br/><br/>Checkpoint pagination must be used if you need to retrieve more than 1000 organizations.<br/><br/><h2>Checkpoint Pagination</h2><br/><br/>To search by checkpoint, use the following parameters:<br/>- from: Optional id from which to start selection.<br/>- take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.<br/><br/>Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.<br/>
   * Get organizations
   */
  async getAll(
    requestParameters: GetOrganizationsRequest = {},
    initOverrides?: InitOverride
  ): Promise<GetOrganizations200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get a specific organization
   *
   * Get organization
   * @throws {RequiredError}
   */
  async getRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get a specific organization<br/>
   * Get organization
   */
  async get(
    requestParameters: GetOrganizationsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<GetOrganizations200ResponseOneOfInner> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Modify an enabled_connection belonging to an Organization.
   *
   * Modify an Organizations Connection
   * @throws {RequiredError}
   */
  async updateEnabledConnectionRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Modify an enabled_connection belonging to an Organization.<br/>
   * Modify an Organizations Connection
   */
  async updateEnabledConnection(
    requestParameters: PatchEnabledConnectionsByConnectionIdOperationRequest,
    bodyParameters: PatchEnabledConnectionsByConnectionIdRequest,
    initOverrides?: InitOverride
  ): Promise<GetEnabledConnections200ResponseOneOfInner> {
    const response = await this.updateEnabledConnectionRaw(
      requestParameters,
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Modify an organization
   *
   * Modify an Organization
   * @throws {RequiredError}
   */
  async updateRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Modify an organization<br/>
   * Modify an Organization
   */
  async update(
    requestParameters: PatchOrganizationsByIdOperationRequest,
    bodyParameters: PatchOrganizationsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<GetOrganizations200ResponseOneOfInner> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Add connections to an organization
   * @throws {RequiredError}
   */
  async addEnabledConnectionRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Add connections to an organization
   */
  async addEnabledConnection(
    requestParameters: PostEnabledConnectionsOperationRequest,
    bodyParameters: PostEnabledConnectionsRequest,
    initOverrides?: InitOverride
  ): Promise<GetEnabledConnections200ResponseOneOfInner> {
    const response = await this.addEnabledConnectionRaw(
      requestParameters,
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Create invitations to organization
   * @throws {RequiredError}
   */
  async createInvitationRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create invitations to organization
   */
  async createInvitation(
    requestParameters: PostInvitationsOperationRequest,
    bodyParameters: PostInvitationsRequest,
    initOverrides?: InitOverride
  ): Promise<GetInvitations200ResponseOneOfInner> {
    const response = await this.createInvitationRaw(
      requestParameters,
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Add members to an organization
   * @throws {RequiredError}
   */
  async addMembersRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Add members to an organization
   */
  async addMembers(
    requestParameters: PostMembersOperationRequest,
    bodyParameters: PostMembersRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.addMembersRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Assign one or more roles to a given user that will be applied in the context of the provided organization
   * @throws {RequiredError}
   */
  async addMemberRolesRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Assign one or more roles to a given user that will be applied in the context of the provided organization
   */
  async addMemberRoles(
    requestParameters: PostOrganizationMemberRolesOperationRequest,
    bodyParameters: PostOrganizationMemberRolesRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.addMemberRolesRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Create an organization
   *
   * Create an Organization
   * @throws {RequiredError}
   */
  async createRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create an organization<br/>
   * Create an Organization
   */
  async create(
    bodyParameters: PostOrganizationsRequest,
    initOverrides?: InitOverride
  ): Promise<GetOrganizations200ResponseOneOfInner> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
