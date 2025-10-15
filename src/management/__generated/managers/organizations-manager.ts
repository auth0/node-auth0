import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  CreateOrganizationDiscoveryDomainRequestContent,
  CreateOrganizationDiscoveryDomainResponseContent,
  DeleteMembersRequest,
  DeleteOrganizationMemberRolesRequest,
  GetEnabledConnections200Response,
  GetEnabledConnections200ResponseOneOfInner,
  GetInvitations200Response,
  GetInvitations200ResponseOneOfInner,
  GetMembers200Response,
  GetOrganizationClientGrants200Response,
  GetOrganizationClientGrants200ResponseOneOfInner,
  GetOrganizationDiscoveryDomainResponseContent,
  GetOrganizationMemberRoles200Response,
  GetOrganizations200Response,
  GetOrganizations200ResponseOneOfInner,
  ListOrganizationDiscoveryDomainsResponseContent,
  PatchEnabledConnectionsByConnectionIdRequest,
  PatchOrganizationsByIdRequest,
  PostEnabledConnectionsRequest,
  PostInvitationsRequest,
  PostMembersRequest,
  PostOrganizationClientGrantsRequest,
  PostOrganizationMemberRolesRequest,
  PostOrganizations201Response,
  PostOrganizationsRequest,
  UpdateOrganizationDiscoveryDomainRequestContent,
  UpdateOrganizationDiscoveryDomainResponseContent,
  GetEnabledConnections200ResponseOneOf,
  GetInvitations200ResponseOneOf,
  GetMembers200ResponseOneOf,
  GetMembers200ResponseOneOfInner,
  GetOrganizationClientGrants200ResponseOneOf,
  GetOrganizationMemberRoles200ResponseOneOf,
  GetOrganizationMemberRoles200ResponseOneOfInner,
  GetOrganizations200ResponseOneOf,
  DeleteClientGrantsByGrantIdRequest,
  DeleteDiscoveryDomainsByDiscoveryDomainIdRequest,
  DeleteEnabledConnectionsByConnectionIdRequest,
  DeleteInvitationsByInvitationIdRequest,
  DeleteMembersOperationRequest,
  DeleteOrganizationMemberRolesOperationRequest,
  DeleteOrganizationsByIdRequest,
  GetDiscoveryDomainsRequest,
  GetDiscoveryDomainsByDiscoveryDomainIdRequest,
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
  PatchDiscoveryDomainsByDiscoveryDomainIdRequest,
  PatchEnabledConnectionsByConnectionIdOperationRequest,
  PatchOrganizationsByIdOperationRequest,
  PostDiscoveryDomainsRequest,
  PostEnabledConnectionsOperationRequest,
  PostInvitationsOperationRequest,
  PostMembersOperationRequest,
  PostOrganizationClientGrantsOperationRequest,
  PostOrganizationMemberRolesOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class OrganizationsManager extends BaseAPI {
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
   * Remove a discovery domain from an organization. This action cannot be undone.
   * Delete an organization discovery domain
   *
   * @throws {RequiredError}
   */
  async deleteDiscoveryDomain(
    requestParameters: DeleteDiscoveryDomainsByDiscoveryDomainIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'discovery_domain_id']);

    const response = await this.request(
      {
        path: `/organizations/{id}/discovery-domains/{discovery_domain_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace(
            '{discovery_domain_id}',
            encodeURIComponent(String(requestParameters.discovery_domain_id))
          ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
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
   * Retrieve list of all organization discovery domains associated with the specified organization.
   *
   * Retrieve all organization discovery domains
   *
   * @throws {RequiredError}
   */
  async getAllDiscoveryDomains(
    requestParameters: GetDiscoveryDomainsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ListOrganizationDiscoveryDomainsResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

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
        path: `/organizations/{id}/discovery-domains`.replace(
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
   * Retrieve details about a single organization discovery domain specified by ID.
   *
   * Retrieve an organization discovery domain by ID
   *
   * @throws {RequiredError}
   */
  async getDiscoveryDomain(
    requestParameters: GetDiscoveryDomainsByDiscoveryDomainIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationDiscoveryDomainResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'discovery_domain_id']);

    const response = await this.request(
      {
        path: `/organizations/{id}/discovery-domains/{discovery_domain_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace(
            '{discovery_domain_id}',
            encodeURIComponent(String(requestParameters.discovery_domain_id))
          ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
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
   * Get the roles assigned to an organization member
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
   * Retrieve details about a single Organization specified by ID.
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
   * Update the verification status for an organization discovery domain. The <code>status</code> field must be either <code>pending</code> or <code>verified</code>.
   * Update an organization discovery domain
   *
   * @throws {RequiredError}
   */
  async updateDiscoveryDomain(
    requestParameters: PatchDiscoveryDomainsByDiscoveryDomainIdRequest,
    bodyParameters: UpdateOrganizationDiscoveryDomainRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UpdateOrganizationDiscoveryDomainResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'discovery_domain_id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/discovery-domains/{discovery_domain_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace(
            '{discovery_domain_id}',
            encodeURIComponent(String(requestParameters.discovery_domain_id))
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
   * Update the verification status for an organization discovery domain. The <code>status</code> field must be either <code>pending</code> or <code>verified</code>.
   * Create an organization discovery domain
   *
   * @throws {RequiredError}
   */
  async createDiscoveryDomain(
    requestParameters: PostDiscoveryDomainsRequest,
    bodyParameters: CreateOrganizationDiscoveryDomainRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<CreateOrganizationDiscoveryDomainResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/discovery-domains`.replace(
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
   * Associate a client grant with an organization
   *
   * @throws {RequiredError}
   */
  async postOrganizationClientGrants(
    requestParameters: PostOrganizationClientGrantsOperationRequest,
    bodyParameters: PostOrganizationClientGrantsRequest,
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
