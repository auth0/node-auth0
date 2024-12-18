import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  CreateOrganizationClientGrantsRequest,
  DeleteMembersRequest,
  DeleteOrganizationMemberRolesRequest,
  GetClientGrantOrganizations200ResponseOneOfInner,
  GetEnabledConnections200Response,
  GetEnabledConnections200ResponseOneOfInner,
  GetInvitations200Response,
  GetInvitations200ResponseOneOfInner,
  GetMembers200Response,
  GetOrganizationClientGrants200Response,
  GetOrganizationClientGrants200ResponseOneOfInner,
  GetOrganizationMemberRoles200Response,
  GetOrganizations200Response,
  PatchEnabledConnectionsByConnectionIdRequest,
  PatchOrganizationsByIdRequest,
  PostEnabledConnectionsRequest,
  PostInvitationsRequest,
  PostMembersRequest,
  PostOrganizationMemberRolesRequest,
  PostOrganizations201Response,
  PostOrganizationsRequest,
  GetEnabledConnections200ResponseOneOf,
  GetInvitations200ResponseOneOf,
  GetMembers200ResponseOneOf,
  GetMembers200ResponseOneOfInner,
  GetOrganizationClientGrants200ResponseOneOf,
  GetOrganizationMemberRoles200ResponseOneOf,
  GetOrganizationMemberRoles200ResponseOneOfInner,
  GetClientGrantOrganizations200ResponseOneOf,
  CreateOrganizationClientGrantsOperationRequest,
  DeleteClientGrantsByGrantIdRequest,
  DeleteEnabledConnectionsByConnectionIdRequest,
  DeleteInvitationsByInvitationIdRequest,
  DeleteMembersOperationRequest,
  DeleteOrganizationMemberRolesOperationRequest,
  DeleteOrganizationsByIdRequest,
  GetEnabledConnectionsRequest,
  GetEnabledConnectionsByConnectionIdRequest,
  GetInvitationsRequest,
  GetInvitationsByInvitationIdRequest,
  GetMembersRequest,
  GetNameByNameRequest,
  GetOrganizationClientGrantsRequest,
  GetOrganizationMemberRolesRequest,
  GetOrganizationsRequest,
  GetOrganizationsByIdRequest,
  PatchEnabledConnectionsByConnectionIdOperationRequest,
  PatchOrganizationsByIdOperationRequest,
  PostEnabledConnectionsOperationRequest,
  PostInvitationsOperationRequest,
  PostMembersOperationRequest,
  PostOrganizationMemberRolesOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class OrganizationsManager extends BaseAPI {
  /**
   * Associate a client grant with an organization
   *
   * @throws {RequiredError}
   */
  async postOrganizationClientGrants(
    requestParameters: CreateOrganizationClientGrantsOperationRequest,
    bodyParameters: CreateOrganizationClientGrantsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationClientGrants200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/client-grants`.replace(
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
   * Remove a client grant from an organization
   *
   * @throws {RequiredError}
   */
  async deleteClientGrantsByGrantId(
    requestParameters: DeleteClientGrantsByGrantIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'grant_id']);

    const response = await this.request(
      {
        path: `/organizations/{id}/client-grants/{grant_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{grant_id}', encodeURIComponent(String(requestParameters.grant_id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Disable a specific connection for an Organization. Once disabled, Organization members can no longer use that connection to authenticate.
   *
   * <b>Note</b>: This action does not remove the connection from your tenant.
   *
   * Delete connections from an organization
   *
   * @throws {RequiredError}
   */
  async deleteEnabledConnection(
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
   * Delete an invitation to an Organization
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
   * Remove one or more Organization-specific <a href="https://auth0.com/docs/manage-users/access-control/rbac">roles</a> from a given user.
   *
   * Users can be members of multiple Organizations with unique roles assigned for each membership. This action removes roles from a user in relation to the specified Organization. Roles assigned to the user within a different Organization cannot be managed in the same call.
   *
   * Delete user roles from an Organization member
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
   * Remove an Organization from your tenant.  This action cannot be undone.
   *
   * <b>Note</b>: Members are automatically disassociated from an Organization when it is deleted. However, this action does <b>not</b> delete these users from your tenant.
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
   * Retrieve details about a specific connection currently enabled for an Organization. Information returned includes details such as connection ID, name, strategy, and whether the connection automatically grants membership upon login.
   *
   * Get connections enabled for an organization
   *
   * @throws {RequiredError}
   */
  async getEnabledConnections(
    requestParameters: GetEnabledConnectionsRequest & { include_totals: true },
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
   * Retrieve details about a specific connection currently enabled for an Organization. Information returned includes details such as connection ID, name, strategy, and whether the connection automatically grants membership upon login.
   *
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
   * Retrieve a detailed list of invitations sent to users for a specific Organization. The list includes details such as inviter and invitee information, invitation URLs, and dates of creation and expiration. To learn more about Organization invitations, review <a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/invite-members">Invite Organization Members</a>.
   *
   * Get invitations to an organization
   *
   * @throws {RequiredError}
   */
  async getInvitations(
    requestParameters: GetInvitationsRequest & { include_totals: true },
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
   * Get a specific invitation to an Organization
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
   * List organization members.
   *
   * <ul>
   *   <li>
   *     Use the <code>fields</code> parameter to optionally define the specific member details retrieved. If
   *     <code>fields</code> is left blank, all fields (except roles) are returned.
   *   </li>
   *   <li>
   *     Member roles are not sent by default. Use <code>fields=roles</code> to retrieve the roles assigned to each listed
   *     member. To use this parameter, you must include the <code>read:organization_member_roles</code> scope in the token.
   *   </li>
   * </ul>
   *
   * This endpoint supports two types of pagination:
   *
   * - Offset pagination
   * - Checkpoint pagination
   *
   * Checkpoint pagination must be used if you need to retrieve more than 1000
   * organization members.
   *
   * <h2>Checkpoint Pagination</h2>
   *
   * To search by checkpoint, use the following parameters: - from: Optional id from which to start selection. - take: The
   * total amount of entries to retrieve when using the from parameter. Defaults to 50. Note: The first time you call this
   * endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a
   * <code>next</code> value will be included in the response. You can use this for subsequent API calls. When
   * <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.
   *
   * Get members who belong to an organization
   *
   * @throws {RequiredError}
   */
  async getMembers(
    requestParameters: GetMembersRequest & { include_totals: true },
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
   * Retrieve details about a single Organization specified by name.
   *
   * Get organization by name
   *
   * @throws {RequiredError}
   */
  async getByName(
    requestParameters: GetNameByNameRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClientGrantOrganizations200ResponseOneOfInner>> {
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
   * Get client grants associated to an organization
   *
   * @throws {RequiredError}
   */
  async getOrganizationClientGrants(
    requestParameters: GetOrganizationClientGrantsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationClientGrants200ResponseOneOf>>;
  async getOrganizationClientGrants(
    requestParameters?: GetOrganizationClientGrantsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetOrganizationClientGrants200ResponseOneOfInner>>>;
  async getOrganizationClientGrants(
    requestParameters: GetOrganizationClientGrantsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationClientGrants200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'audience',
        config: {},
      },
      {
        key: 'client_id',
        config: {},
      },
      {
        key: 'grant_ids',
        config: {
          isArray: true,
          isCollectionFormatMulti: true,
        },
      },
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
        path: `/organizations/{id}/client-grants`.replace(
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
   * Retrieve detailed list of roles assigned to a given user within the context of a specific Organization.
   *
   * Users can be members of multiple Organizations with unique roles assigned for each membership. This action only returns the roles associated with the specified Organization; any roles assigned to the user within other Organizations are not included.
   *
   * Get user roles assigned to an Organization member
   *
   * @throws {RequiredError}
   */
  async getMemberRoles(
    requestParameters: GetOrganizationMemberRolesRequest & { include_totals: true },
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
   * Retrieve detailed list of all Organizations available in your tenant. For more information, see Auth0 Organizations.
   *
   * This endpoint supports two types of pagination:
   * <ul>
   * <li>Offset pagination</li>
   * <li>Checkpoint pagination</li>
   * </ul>
   *
   * Checkpoint pagination must be used if you need to retrieve more than 1000 organizations.
   *
   * <h2>Checkpoint Pagination</h2>
   *
   * To search by checkpoint, use the following parameters:
   * <ul>
   * <li><code>from</code>: Optional id from which to start selection.</li>
   * <li><code>take</code>: The total number of entries to retrieve when using the <code>from</code> parameter. Defaults to 50.</li>
   * </ul>
   *
   * <b>Note</b>: The first time you call this endpoint using checkpoint pagination, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no pages are remaining.
   *
   * Get organizations
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetOrganizationsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClientGrantOrganizations200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetOrganizationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetClientGrantOrganizations200ResponseOneOfInner>>>;
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
   * Retrieve details about a single Organization specified by ID.
   *
   * Get organization
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetOrganizationsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClientGrantOrganizations200ResponseOneOfInner>> {
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
   * Modify the details of a specific connection currently enabled for an Organization.
   *
   * Update the Connection of an Organization
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
   * Update the details of a specific <a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/create-organizations">Organization</a>, such as name and display name, branding options, and metadata.
   *
   * Modify an Organization
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchOrganizationsByIdOperationRequest,
    bodyParameters: PatchOrganizationsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetClientGrantOrganizations200ResponseOneOfInner>> {
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
   * Enable a specific connection for a given Organization. To enable a connection, it must already exist within your tenant; connections cannot be created through this action.
   *
   * <a href="https://auth0.com/docs/authenticate/identity-providers">Connections</a> represent the relationship between Auth0 and a source of users. Available types of connections include database, enterprise, and social.
   *
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
   * Create a user invitation for a specific Organization. Upon creation, the listed user receives an email inviting them to join the Organization. To learn more about Organization invitations, review <a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/invite-members">Invite Organization Members</a>.
   *
   * Create invitations to an organization
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
   * Set one or more existing users as members of a specific <a href="https://auth0.com/docs/manage-users/organizations">Organization</a>.
   *
   * To add a user to an Organization through this action, the user must already exist in your tenant. If a user does not yet exist, you can <a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/invite-members">invite them to create an account</a>, manually create them through the Auth0 Dashboard, or use the Management API.
   *
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
   * Assign one or more <a href="https://auth0.com/docs/manage-users/access-control/rbac">roles</a> to a user to determine their access for a specific Organization.
   *
   * Users can be members of multiple Organizations with unique roles assigned for each membership. This action assigns roles to a user only for the specified Organization. Roles cannot be assigned to a user across multiple Organizations in the same call.
   *
   * Assign user roles to an Organization member
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
   * Create a new Organization within your tenant.  To learn more about Organization settings, behavior, and configuration options, review <a href="https://auth0.com/docs/manage-users/organizations/create-first-organization">Create Your First Organization</a>.
   *
   * Create an Organization
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: PostOrganizationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostOrganizations201Response>> {
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
