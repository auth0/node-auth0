/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
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

export interface DeleteEnabledConnectionsByConnectionIdRequest {
  id: string;
  connectionId: string;
}

export interface DeleteInvitationsByInvitationIdRequest {
  id: string;
  invitation_id: string;
}

export interface DeleteMembersOperationRequest {
  id: string;
}

export interface DeleteOrganizationMemberRolesOperationRequest {
  id: string;
  user_id: string;
}

export interface DeleteOrganizationsByIdRequest {
  id: string;
}

export interface GetEnabledConnectionsRequest {
  id: string;
  page?: number;
  per_page?: number;
  include_totals?: boolean;
}

export interface GetEnabledConnectionsByConnectionIdRequest {
  id: string;
  connectionId: string;
}

export interface GetInvitationsRequest {
  id: string;
  page?: number;
  per_page?: number;
  include_totals?: boolean;
  fields?: string;
  include_fields?: boolean;
  sort?: string;
}

export interface GetInvitationsByInvitationIdRequest {
  id: string;
  invitation_id: string;
  fields?: string;
  include_fields?: boolean;
}

export interface GetMembersRequest {
  id: string;
  page?: number;
  per_page?: number;
  include_totals?: boolean;
  from?: string;
  take?: number;
}

export interface GetNameByNameRequest {
  name: string;
}

export interface GetOrganizationMemberRolesRequest {
  id: string;
  user_id: string;
  page?: number;
  per_page?: number;
  include_totals?: boolean;
}

export interface GetOrganizationsRequest {
  page?: number;
  per_page?: number;
  include_totals?: boolean;
  from?: string;
  take?: number;
  sort?: string;
}

export interface GetOrganizationsByIdRequest {
  id: string;
}

export interface PatchEnabledConnectionsByConnectionIdOperationRequest {
  id: string;
  connectionId: string;
}

export interface PatchOrganizationsByIdOperationRequest {
  id: string;
}

export interface PostEnabledConnectionsOperationRequest {
  id: string;
}

export interface PostInvitationsOperationRequest {
  id: string;
}

export interface PostMembersOperationRequest {
  id: string;
}

export interface PostOrganizationMemberRolesOperationRequest {
  id: string;
  user_id: string;
}

/**
 *
 */
export class OrganizationsManager extends runtime.BaseAPI {
  /**
   * Delete connections from an organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async removeEnabledConnectionRaw(
    requestParameters: DeleteEnabledConnectionsByConnectionIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling removeEnabledConnection.'
      );
    }
    if (requestParameters.connectionId === null || requestParameters.connectionId === undefined) {
      throw new runtime.RequiredError(
        'connectionId',
        'Required parameter requestParameters.connectionId was null or undefined when calling removeEnabledConnection.'
      );
    }

    const response = await this.request(
      {
        path: `/organizations/{id}/enabled_connections/{connectionId}`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(
            `{${'connectionId'}}`,
            encodeURIComponent(String(requestParameters.connectionId))
          ),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.removeEnabledConnectionRaw(requestParameters, initOverrides);
  }

  /**
   * Delete an invitation to organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async deleteInvitationRaw(
    requestParameters: DeleteInvitationsByInvitationIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deleteInvitation.'
      );
    }
    if (requestParameters.invitation_id === null || requestParameters.invitation_id === undefined) {
      throw new runtime.RequiredError(
        'invitation_id',
        'Required parameter requestParameters.invitation_id was null or undefined when calling deleteInvitation.'
      );
    }

    const response = await this.request(
      {
        path: `/organizations/{id}/invitations/{invitation_id}`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(
            `{${'invitation_id'}}`,
            encodeURIComponent(String(requestParameters.invitation_id))
          ),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteInvitationRaw(requestParameters, initOverrides);
  }

  /**
   * Delete members from an organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async deleteMembersRaw(
    requestParameters: DeleteMembersOperationRequest,
    bodyParameters: DeleteMembersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deleteMembers.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/members`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteMembersRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Remove one or more roles from a given user in the context of the provided organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async deleteMemberRolesRaw(
    requestParameters: DeleteOrganizationMemberRolesOperationRequest,
    bodyParameters: DeleteOrganizationMemberRolesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deleteMemberRoles.'
      );
    }
    if (requestParameters.user_id === null || requestParameters.user_id === undefined) {
      throw new runtime.RequiredError(
        'user_id',
        'Required parameter requestParameters.user_id was null or undefined when calling deleteMemberRoles.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/members/{user_id}/roles`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(`{${'user_id'}}`, encodeURIComponent(String(requestParameters.user_id))),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteMemberRolesRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Delete a specific organization<br/>
   * Delete organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async deleteRaw(
    requestParameters: DeleteOrganizationsByIdRequest,
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
        path: `/organizations/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Get connections enabled for an organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async getEnabledConnectionsRaw(
    requestParameters: GetEnabledConnectionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetEnabledConnections200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getEnabledConnections.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    const response = await this.request(
      {
        path: `/organizations/{id}/enabled_connections`.replace(
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
   * Get connections enabled for an organization
   */
  async getEnabledConnections(
    requestParameters: GetEnabledConnectionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetEnabledConnections200Response> {
    const response = await this.getEnabledConnectionsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get an enabled connection for an organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async getEnabledConnectionRaw(
    requestParameters: GetEnabledConnectionsByConnectionIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetEnabledConnections200ResponseOneOfInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getEnabledConnection.'
      );
    }
    if (requestParameters.connectionId === null || requestParameters.connectionId === undefined) {
      throw new runtime.RequiredError(
        'connectionId',
        'Required parameter requestParameters.connectionId was null or undefined when calling getEnabledConnection.'
      );
    }

    const response = await this.request(
      {
        path: `/organizations/{id}/enabled_connections/{connectionId}`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(
            `{${'connectionId'}}`,
            encodeURIComponent(String(requestParameters.connectionId))
          ),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetEnabledConnections200ResponseOneOfInner> {
    const response = await this.getEnabledConnectionRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get invitations to organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async getInvitationsRaw(
    requestParameters: GetInvitationsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetInvitations200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getInvitations.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    if (requestParameters.sort !== undefined) {
      queryParameters['sort'] = requestParameters.sort;
    }

    const response = await this.request(
      {
        path: `/organizations/{id}/invitations`.replace(
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
   * Get invitations to organization
   */
  async getInvitations(
    requestParameters: GetInvitationsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetInvitations200Response> {
    const response = await this.getInvitationsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get an invitation to organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async getInvitationRaw(
    requestParameters: GetInvitationsByInvitationIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetInvitations200ResponseOneOfInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getInvitation.'
      );
    }
    if (requestParameters.invitation_id === null || requestParameters.invitation_id === undefined) {
      throw new runtime.RequiredError(
        'invitation_id',
        'Required parameter requestParameters.invitation_id was null or undefined when calling getInvitation.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    const response = await this.request(
      {
        path: `/organizations/{id}/invitations/{invitation_id}`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(
            `{${'invitation_id'}}`,
            encodeURIComponent(String(requestParameters.invitation_id))
          ),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetInvitations200ResponseOneOfInner> {
    const response = await this.getInvitationRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * List organization members. This endpoint supports two types of pagination:<br/>- Offset pagination<br/>- Checkpoint pagination<br/><br/>Checkpoint pagination must be used if you need to retrieve more than 1000 organization members.<br/><br/><h2>Checkpoint Pagination</h2><br/><br/>To search by checkpoint, use the following parameters:<br/>- from: Optional id from which to start selection.<br/>- take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.<br/><br/>Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.<br/>
   * Get members who belong to an organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async getMembersRaw(
    requestParameters: GetMembersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetMembers200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getMembers.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
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
        path: `/organizations/{id}/members`.replace(
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
   * List organization members. This endpoint supports two types of pagination:<br/>- Offset pagination<br/>- Checkpoint pagination<br/><br/>Checkpoint pagination must be used if you need to retrieve more than 1000 organization members.<br/><br/><h2>Checkpoint Pagination</h2><br/><br/>To search by checkpoint, use the following parameters:<br/>- from: Optional id from which to start selection.<br/>- take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.<br/><br/>Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.<br/>
   * Get members who belong to an organization
   */
  async getMembers(
    requestParameters: GetMembersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetMembers200Response> {
    const response = await this.getMembersRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get a specific organization by name<br/>
   * Get organization by name
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async getByNameRaw(
    requestParameters: GetNameByNameRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizations200ResponseOneOfInner>> {
    if (requestParameters.name === null || requestParameters.name === undefined) {
      throw new runtime.RequiredError(
        'name',
        'Required parameter requestParameters.name was null or undefined when calling getByName.'
      );
    }

    const response = await this.request(
      {
        path: `/organizations/name/{name}`.replace(
          `{${'name'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizations200ResponseOneOfInner> {
    const response = await this.getByNameRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get the roles assigned to an organization member
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async getMemberRolesRaw(
    requestParameters: GetOrganizationMemberRolesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizationMemberRoles200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getMemberRoles.'
      );
    }
    if (requestParameters.user_id === null || requestParameters.user_id === undefined) {
      throw new runtime.RequiredError(
        'user_id',
        'Required parameter requestParameters.user_id was null or undefined when calling getMemberRoles.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    const response = await this.request(
      {
        path: `/organizations/{id}/members/{user_id}/roles`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(`{${'user_id'}}`, encodeURIComponent(String(requestParameters.user_id))),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizationMemberRoles200Response> {
    const response = await this.getMemberRolesRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * List available organizations. This endpoint supports two types of pagination:<br/>- Offset pagination<br/>- Checkpoint pagination<br/><br/>Checkpoint pagination must be used if you need to retrieve more than 1000 organizations.<br/><br/><h2>Checkpoint Pagination</h2><br/><br/>To search by checkpoint, use the following parameters:<br/>- from: Optional id from which to start selection.<br/>- take: The total amount of entries to retrieve when using the from parameter. Defaults to 50.<br/><br/>Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.<br/>
   * Get organizations
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async getAllRaw(
    requestParameters: GetOrganizationsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizations200Response>> {
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
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

    if (requestParameters.sort !== undefined) {
      queryParameters['sort'] = requestParameters.sort;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizations200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get a specific organization<br/>
   * Get organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async getRaw(
    requestParameters: GetOrganizationsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizations200ResponseOneOfInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }

    const response = await this.request(
      {
        path: `/organizations/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizations200ResponseOneOfInner> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Modify an enabled_connection belonging to an Organization.<br/>
   * Modify an Organizations Connection
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async updateEnabledConnectionRaw(
    requestParameters: PatchEnabledConnectionsByConnectionIdOperationRequest,
    bodyParameters: PatchEnabledConnectionsByConnectionIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetEnabledConnections200ResponseOneOfInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling updateEnabledConnection.'
      );
    }
    if (requestParameters.connectionId === null || requestParameters.connectionId === undefined) {
      throw new runtime.RequiredError(
        'connectionId',
        'Required parameter requestParameters.connectionId was null or undefined when calling updateEnabledConnection.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/enabled_connections/{connectionId}`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(
            `{${'connectionId'}}`,
            encodeURIComponent(String(requestParameters.connectionId))
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
   * Modify an enabled_connection belonging to an Organization.<br/>
   * Modify an Organizations Connection
   */
  async updateEnabledConnection(
    requestParameters: PatchEnabledConnectionsByConnectionIdOperationRequest,
    bodyParameters: PatchEnabledConnectionsByConnectionIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetEnabledConnections200ResponseOneOfInner> {
    const response = await this.updateEnabledConnectionRaw(
      requestParameters,
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Modify an organization<br/>
   * Modify an Organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async updateRaw(
    requestParameters: PatchOrganizationsByIdOperationRequest,
    bodyParameters: PatchOrganizationsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizations200ResponseOneOfInner>> {
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
        path: `/organizations/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizations200ResponseOneOfInner> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Add connections to an organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async addEnabledConnectionRaw(
    requestParameters: PostEnabledConnectionsOperationRequest,
    bodyParameters: PostEnabledConnectionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetEnabledConnections200ResponseOneOfInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling addEnabledConnection.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/enabled_connections`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
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
   * @memberof OrganizationsManager
   */
  async createInvitationRaw(
    requestParameters: PostInvitationsOperationRequest,
    bodyParameters: PostInvitationsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetInvitations200ResponseOneOfInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling createInvitation.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/invitations`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
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
   * @memberof OrganizationsManager
   */
  async addMembersRaw(
    requestParameters: PostMembersOperationRequest,
    bodyParameters: PostMembersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling addMembers.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/members`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.addMembersRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Assign one or more roles to a given user that will be applied in the context of the provided organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async addMemberRolesRaw(
    requestParameters: PostOrganizationMemberRolesOperationRequest,
    bodyParameters: PostOrganizationMemberRolesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling addMemberRoles.'
      );
    }
    if (requestParameters.user_id === null || requestParameters.user_id === undefined) {
      throw new runtime.RequiredError(
        'user_id',
        'Required parameter requestParameters.user_id was null or undefined when calling addMemberRoles.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/organizations/{id}/members/{user_id}/roles`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(`{${'user_id'}}`, encodeURIComponent(String(requestParameters.user_id))),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.addMemberRolesRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Create an organization<br/>
   * Create an Organization
   * @throws {RequiredError}
   * @memberof OrganizationsManager
   */
  async createRaw(
    bodyParameters: PostOrganizationsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetOrganizations200ResponseOneOfInner>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetOrganizations200ResponseOneOfInner> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
