import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type {
  DeletePermissionsRequest,
  DeleteUserIdentityByUserId200ResponseInner,
  DeleteUserRolesRequest,
  GetAuthenticationMethods200Response,
  GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner,
  GetLogs200Response,
  GetOrganizationMemberRoles200Response,
  GetPermissions200Response,
  GetUserOrganizations200Response,
  GetUsers200Response,
  GetUsers200ResponseOneOfInner,
  PatchAuthenticationMethodsByAuthenticationMethodIdRequest,
  PostAuthenticationMethods201Response,
  PostAuthenticationMethodsRequest,
  PostIdentitiesRequest,
  PostPermissionsRequest,
  PostRecoveryCodeRegeneration200Response,
  PostUserRolesRequest,
  PutAuthenticationMethodsRequestInner,
  UserCreate,
  UserEnrollment,
  UserIdentity,
  UserUpdate,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteAuthenticationMethodsByAuthenticationMethodIdRequest {
  /**
   * The ID of the user in question.
   */
  id: string;
  /**
   * The ID of the authentication method to delete.
   */
  authentication_method_id: string;
}

export interface DeleteAuthenticatorsRequest {
  /**
   * ID of the user to delete.
   */
  id: string;
}

export interface DeleteMultifactorByProviderRequest {
  /**
   * ID of the user to remove a multifactor configuration from.
   */
  id: string;
  /**
   * The multi-factor provider. Supported values 'duo' or 'google-authenticator'
   */
  provider: DeleteMultifactorByProviderProviderEnum;
}

export interface DeletePermissionsOperationRequest {
  /**
   * ID of the user to remove permissions from.
   */
  id: string;
}

export interface DeleteUserIdentityByUserIdRequest {
  /**
   * ID of the primary user account.
   */
  id: string;
  /**
   * Identity provider name of the secondary linked account (e.g. `google-oauth2`).
   */
  provider: DeleteUserIdentityByUserIdProviderEnum;
  /**
   * ID of the secondary linked account (e.g. `123456789081523216417` part after the `|` in `google-oauth2|123456789081523216417`).
   */
  user_id: string;
}

export interface DeleteUserRolesOperationRequest {
  /**
   * ID of the user to remove roles from.
   */
  id: string;
}

export interface DeleteUsersByIdRequest {
  /**
   * ID of the user to delete.
   */
  id: string;
}

export interface GetAuthenticationMethodsRequest {
  /**
   * The ID of the user in question.
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0. Default is 0.
   */
  page?: number;
  /**
   * Number of results per page. Default is 50.
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
}

export interface GetAuthenticationMethodsByAuthenticationMethodIdRequest {
  /**
   * The ID of the user in question.
   */
  id: string;
  /**
   * The ID of the authentication methods in question.
   */
  authentication_method_id: string;
}

export interface GetEnrollmentsRequest {
  /**
   * ID of the user to list enrollments for.
   */
  id: string;
}

export interface GetLogsByUserRequest {
  /**
   * ID of the user of the logs to retrieve
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   */
  per_page?: number;
  /**
   * Field to sort by. Use `fieldname:1` for ascending order and `fieldname:-1` for descending.
   */
  sort?: string;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
}

export interface GetPermissionsRequest {
  /**
   * ID of the user to retrieve the permissions for.
   */
  id: string;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
}

export interface GetUserOrganizationsRequest {
  /**
   * ID of the user to retrieve the organizations for.
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

export interface GetUserRolesRequest {
  /**
   * ID of the user to list roles for.
   */
  id: string;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
}

export interface GetUsersRequest {
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
  /**
   * Field to sort by. Use <code>field:order</code> where order is <code>1</code> for ascending and <code>-1</code> for descending. e.g. <code>created_at:1</code>
   */
  sort?: string;
  /**
   * Connection filter. Only applies when using <code>search_engine=v1</code>. To filter by connection with <code>search_engine=v2|v3</code>, use <code>q=identities.connection:"connection_name"</code>
   */
  connection?: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   */
  include_fields?: boolean;
  /**
   * Query in <a target='_new' href ='http://www.lucenetutorial.com/lucene-query-syntax.html'>Lucene query string syntax</a>. Some query types cannot be used on metadata fields, for details see <a href='https://manage.local.dev.auth0.com/docs/users/search/v3/query-syntax#searchable-fields'>Searchable Fields</a>.
   */
  q?: string;
  /**
   * The version of the search engine
   */
  search_engine?: GetUsersSearchEngineEnum;
}

export interface GetUsersByIdRequest {
  /**
   * ID of the user to retrieve.
   */
  id: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   */
  include_fields?: boolean;
}

export interface PatchAuthenticationMethodsByAuthenticationMethodIdOperationRequest {
  /**
   * The ID of the user in question.
   */
  id: string;
  /**
   * The ID of the authentication method to update.
   */
  authentication_method_id: string;
}

export interface PatchUsersByIdRequest {
  /**
   * ID of the user to update.
   */
  id: string;
}

export interface PostAuthenticationMethodsOperationRequest {
  /**
   * The ID of the user to whom the new authentication method will be assigned.
   */
  id: string;
}

export interface PostIdentitiesOperationRequest {
  /**
   * ID of the primary user account to link a second user account to.
   */
  id: string;
}

export interface PostInvalidateRememberBrowserRequest {
  /**
   * ID of the user to invalidate all remembered browsers and authentication factors for.
   */
  id: string;
}

export interface PostPermissionsOperationRequest {
  /**
   * ID of the user to assign permissions to.
   */
  id: string;
}

export interface PostRecoveryCodeRegenerationRequest {
  /**
   * ID of the user to regenerate a multi-factor authentication recovery code for.
   */
  id: string;
}

export interface PostUserRolesOperationRequest {
  /**
   * ID of the user to associate roles with.
   */
  id: string;
}

export interface PutAuthenticationMethodsRequest {
  /**
   * The ID of the user in question.
   */
  id: string;
}

/**
 *
 */
export class UsersManager extends BaseAPI {
  /**
   * Deletes an authentication method by ID
   *
   * @throws {RequiredError}
   */
  async deleteAuthenticationMethod(
    requestParameters: DeleteAuthenticationMethodsByAuthenticationMethodIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'authentication_method_id']);

    const response = await this.request(
      {
        path: `/users/{id}/authentication-methods/{authentication_method_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace(
            '{authentication_method_id}',
            encodeURIComponent(String(requestParameters.authentication_method_id))
          ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete All Authenticators
   *
   * @throws {RequiredError}
   */
  async deleteAllAuthenticators(
    requestParameters: DeleteAuthenticatorsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/users/{id}/authenticators`.replace(
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
   * Delete a <a href="https://auth0.com/docs/multifactor-authentication">multifactor</a> configuration for a user. This forces the user to re-configure the multi-factor provider.
   * Delete a User's Multi-factor Provider
   *
   * @throws {RequiredError}
   */
  async deleteMultifactorProvider(
    requestParameters: DeleteMultifactorByProviderRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'provider']);

    const response = await this.request(
      {
        path: `/users/{id}/multifactor/{provider}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{provider}', encodeURIComponent(String(requestParameters.provider))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Remove permissions from a user.
   *
   * Remove Permissions from a User
   *
   * @throws {RequiredError}
   */
  async deletePermissiojs(
    requestParameters: DeletePermissionsOperationRequest,
    bodyParameters: DeletePermissionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users/{id}/permissions`.replace(
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
   * Unlink an identity from the target user making it a separate user account again.
   * Unlink a User Identity
   *
   * @throws {RequiredError}
   */
  async unlink(
    requestParameters: DeleteUserIdentityByUserIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<DeleteUserIdentityByUserId200ResponseInner>>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'provider', 'user_id']);

    const response = await this.request(
      {
        path: `/users/{id}/identities/{provider}/{user_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{provider}', encodeURIComponent(String(requestParameters.provider)))
          .replace('{user_id}', encodeURIComponent(String(requestParameters.user_id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Remove roles from a user.
   * Removes roles from a user
   *
   * @throws {RequiredError}
   */
  async deleteRoles(
    requestParameters: DeleteUserRolesOperationRequest,
    bodyParameters: DeleteUserRolesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users/{id}/roles`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete a user.
   * Delete a User
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteUsersByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/users/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Gets a list of authentication methods
   *
   * @throws {RequiredError}
   */
  async getAuthenticationMethods(
    requestParameters: GetAuthenticationMethodsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetAuthenticationMethods200Response>> {
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
        path: `/users/{id}/authentication-methods`.replace(
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
   * Gets an authentication method by ID.
   *
   * @throws {RequiredError}
   */
  async getAuthenticationMethod(
    requestParameters: GetAuthenticationMethodsByAuthenticationMethodIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'authentication_method_id']);

    const response = await this.request(
      {
        path: `/users/{id}/authentication-methods/{authentication_method_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace(
            '{authentication_method_id}',
            encodeURIComponent(String(requestParameters.authentication_method_id))
          ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve the first confirmed <a href="https://auth0.com/docs/multifactor-authentication/guardian">Guardian</a> enrollment for a user.
   * Get the First Confirmed Multi-factor Authentication Enrollment
   *
   * @throws {RequiredError}
   */
  async getEnrollments(
    requestParameters: GetEnrollmentsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<UserEnrollment>>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/users/{id}/enrollments`.replace(
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
   * Retrieve log events for a specific user.
   *
   * Note: For more information on all possible event types, their respective acronyms and descriptions, see <a href="https://auth0.com/docs/logs/log-event-type-codes">Log Event Type Codes</a>.
   *
   * For more information on the list of fields that can be used in `sort`, see <a href="https://auth0.com/docs/logs/log-search-query-syntax#searchable-fields">Searchable Fields</a>.
   *
   * Auth0 <a href="https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#limitations">limits the number of logs</a> you can return by search criteria to 100 logs per request. Furthermore, you may only paginate through up to 1,000 search results. If you exceed this threshold, please redefine your search.
   * Get user's log events
   *
   * @throws {RequiredError}
   */
  async getLogs(
    requestParameters: GetLogsByUserRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetLogs200Response>> {
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
        key: 'sort',
        config: {},
      },
      {
        key: 'include_totals',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/users/{id}/logs`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve all permissions associated with the user.
   * Get a User's Permissions
   *
   * @throws {RequiredError}
   */
  async getPermissions(
    requestParameters: GetPermissionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPermissions200Response>> {
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
        path: `/users/{id}/permissions`.replace(
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
   * This endpoint will retrieve all organizations that the specified user is a member of.
   *
   * List user's organizations
   *
   * @throws {RequiredError}
   */
  async getUserOrganizations(
    requestParameters: GetUserOrganizationsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetUserOrganizations200Response>> {
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
        path: `/users/{id}/organizations`.replace(
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
   * List the the roles associated with a user.
   * Get a user's roles
   *
   * @throws {RequiredError}
   */
  async getRoles(
    requestParameters: GetUserRolesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetOrganizationMemberRoles200Response>> {
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
        path: `/users/{id}/roles`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details of users. It is possible to:
   *
   * - Specify a search criteria for users
   * - Sort the users to be returned
   * - Select the fields to be returned
   * - Specify the number of users to retrieve per page and the page index
   *  <!-- only v3 is available -->
   * The <code>q</code> query parameter can be used to get users that match the specified criteria <a href="https://manage.local.dev.auth0.com/docs/users/search/v3/query-syntax">using query string syntax.</a>
   *
   * <a href="https://manage.local.dev.auth0.com/docs/users/search/v3">Learn more about searching for users.</a>
   *
   * Read about <a href="https://manage.local.dev.auth0.com/docs/users/search/best-practices">best practices</a> when working with the API endpoints for retrieving users.
   *
   * Auth0 limits the number of users you can return. If you exceed this threshold, please redefine your search, use the <a href="https://manage.local.dev.auth0.com/docs/api/management/v2#!/Jobs/post_users_exports">export job</a>, or the <a href="https://manage.local.dev.auth0.com/docs/extensions/user-import-export">User Import / Export</a> extension.
   *
   * List or Search Users
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetUsersRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetUsers200Response>> {
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
        key: 'sort',
        config: {},
      },
      {
        key: 'connection',
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
        key: 'q',
        config: {},
      },
      {
        key: 'search_engine',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/users`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve user details. A list of fields to include or exclude may also be specified.
   * Get a User
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetUsersByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetUsers200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

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
        path: `/users/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Updates an authentication method.
   *
   * @throws {RequiredError}
   */
  async updateAuthenticationMethod(
    requestParameters: PatchAuthenticationMethodsByAuthenticationMethodIdOperationRequest,
    bodyParameters: PatchAuthenticationMethodsByAuthenticationMethodIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'authentication_method_id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users/{id}/authentication-methods/{authentication_method_id}`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace(
            '{authentication_method_id}',
            encodeURIComponent(String(requestParameters.authentication_method_id))
          ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Update a user.
   *
   * These are the attributes that can be updated at the root level:
   *
   * <ul>
   *     <li>app_metadata</li>
   *     <li>blocked</li>
   *     <li>email</li>
   *     <li>email_verified</li>
   *     <li>family_name</li>
   *     <li>given_name</li>
   *     <li>name</li>
   *     <li>nickname</li>
   *     <li>password</li>
   *     <li>phone_number</li>
   *     <li>phone_verified</li>
   *     <li>picture</li>
   *     <li>username</li>
   *     <li>user_metadata</li>
   *     <li>verify_email</li>
   * </ul>
   *
   * Some considerations:
   * <ul>
   *     <li>The properties of the new object will replace the old ones.</li>
   *     <li>The metadata fields are an exception to this rule (<code>user_metadata</code> and <code>app_metadata</code>). These properties are merged instead of being replaced but be careful, the merge only occurs on the first level.</li>
   *     <li>If you are updating <code>email</code>, <code>email_verified</code>, <code>phone_number</code>, <code>phone_verified</code>, <code>username</code> or <code>password</code> of a secondary identity, you need to specify the <code>connection</code> property too.</li>
   *     <li>If you are updating <code>email</code> or <code>phone_number</code> you can specify, optionally, the <code>client_id</code> property.</li>
   *     <li>Updating <code>email_verified</code> is not supported for enterprise and passwordless sms connections.</li>
   *     <li>Updating the <code>blocked</code> to <code>false</code> does not affect the user's blocked state from an excessive amount of incorrectly provided credentials. Use the "Unblock a user" endpoint from the "User Blocks" API to change the user's state.</li>
   * </ul>
   *
   * <h5>Updating a field (non-metadata property)</h5>
   * To mark the email address of a user as verified, the body to send should be:
   * <pre><code>{ "email_verified": true }</code></pre>
   *
   * <h5>Updating a user metadata root property</h5>Let's assume that our test user has the following <code>user_metadata</code>:
   * <pre><code>{ "user_metadata" : { "profileCode": 1479 } }</code></pre>
   *
   * To add the field <code>addresses</code> the body to send should be:
   * <pre><code>{ "user_metadata" : { "addresses": {"work_address": "100 Industrial Way"} }}</code></pre>
   *
   * The modified object ends up with the following <code>user_metadata</code> property:<pre><code>{
   *   "user_metadata": {
   *     "profileCode": 1479,
   *     "addresses": { "work_address": "100 Industrial Way" }
   *   }
   * }</code></pre>
   *
   * <h5>Updating an inner user metadata property</h5>If there's existing user metadata to which we want to add  <code>"home_address": "742 Evergreen Terrace"</code> (using the <code>addresses</code> property) we should send the whole <code>addresses</code> object. Since this is a first-level object, the object will be merged in, but its own properties will not be. The body to send should be:
   * <pre><code>{
   *   "user_metadata": {
   *     "addresses": {
   *       "work_address": "100 Industrial Way",
   *       "home_address": "742 Evergreen Terrace"
   *     }
   *   }
   * }</code></pre>
   *
   * The modified object ends up with the following <code>user_metadata</code> property:
   * <pre><code>{
   *   "user_metadata": {
   *     "profileCode": 1479,
   *     "addresses": {
   *       "work_address": "100 Industrial Way",
   *       "home_address": "742 Evergreen Terrace"
   *     }
   *   }
   * }</code></pre>
   *
   * Update a User
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchUsersByIdRequest,
    bodyParameters: UserUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetUsers200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Creates an authentication method for a given user.
   *
   * @throws {RequiredError}
   */
  async createAuthenticationMethod(
    requestParameters: PostAuthenticationMethodsOperationRequest,
    bodyParameters: PostAuthenticationMethodsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostAuthenticationMethods201Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users/{id}/authentication-methods`.replace(
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
   * Link two user accounts together forming a primary and secondary relationship. On successful linking, the endpoint returns the new array of the primary account identities.
   *
   * Note: There are two ways of invoking the endpoint:
   *
   * <ul>
   *   <li>With the authenticated primary account's JWT in the Authorization header, which has the <code>update:current_user_identities</code> scope:
   *     <pre>
   *       POST /api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities
   *       Authorization: "Bearer PRIMARY_ACCOUNT_JWT"
   *       {
   *         "link_with": "SECONDARY_ACCOUNT_JWT"
   *       }
   *     </pre>
   *     In this case, only the <code>link_with</code> param is required in the body, which also contains the JWT obtained upon the secondary account's authentication.
   *   </li>
   *   <li>With a token generated by the API V2 containing the <code>update:users</code> scope:
   *     <pre>
   *     POST /api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities
   *     Authorization: "Bearer YOUR_API_V2_TOKEN"
   *     {
   *       "provider": "SECONDARY_ACCOUNT_PROVIDER",
   *       "connection_id": "SECONDARY_ACCOUNT_CONNECTION_ID(OPTIONAL)",
   *       "user_id": "SECONDARY_ACCOUNT_USER_ID"
   *     }
   *     </pre>
   *     In this case you need to send <code>provider</code> and <code>user_id</code> in the body. Optionally you can also send the <code>connection_id</code> param which is suitable for identifying a particular database connection for the 'auth0' provider.
   *   </li>
   * </ul>
   * Link a User Account
   *
   * @throws {RequiredError}
   */
  async link(
    requestParameters: PostIdentitiesOperationRequest,
    bodyParameters: PostIdentitiesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<UserIdentity>>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users/{id}/identities`.replace(
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
   * Invalidate all remembered browsers across all <a href="https://auth0.com/docs/multifactor-authentication">authentication factors</a> for a user.
   * Invalidate All Remembered Browsers for Multi-factor Authentication
   *
   * @throws {RequiredError}
   */
  async invalidateRememberBrowser(
    requestParameters: PostInvalidateRememberBrowserRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/users/{id}/multifactor/actions/invalidate-remember-browser`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Assign permissions to a user.
   * Assign Permissions to a User
   *
   * @throws {RequiredError}
   */
  async assignPermissions(
    requestParameters: PostPermissionsOperationRequest,
    bodyParameters: PostPermissionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<any>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users/{id}/permissions`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.TextApiResponse.fromResponse(response) as any;
  }

  /**
   * Remove the current <a href="https://auth0.com/docs/multifactor-authentication/guardian">multi-factor authentication</a> recovery code and generate a new one.
   * Generate New Multi-factor Authentication Recovery Code
   *
   * @throws {RequiredError}
   */
  async regenerateRecoveryCode(
    requestParameters: PostRecoveryCodeRegenerationRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostRecoveryCodeRegeneration200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/users/{id}/recovery-code-regeneration`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Associate roles with a user.
   * Assign roles to a user
   *
   * @throws {RequiredError}
   */
  async assignRoles(
    requestParameters: PostUserRolesOperationRequest,
    bodyParameters: PostUserRolesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users/{id}/roles`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Create a new user for a given <a href="https://auth0.com/docs/connections/database">database</a> or <a href="https://auth0.com/docs/connections/passwordless">passwordless</a> connection.
   *
   * Note: <code>connection</code> is required but other parameters such as <code>email</code> and <code>password</code> are dependent upon the type of connection.
   * Create a User
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: UserCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetUsers200ResponseOneOfInner>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Updates all authentication methods by replacing them with the given ones.
   *
   * @throws {RequiredError}
   */
  async updateAuthenticationMethods(
    requestParameters: PutAuthenticationMethodsRequest,
    bodyParameters: Array<PutAuthenticationMethodsRequestInner>,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/users/{id}/authentication-methods`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }
}

export const DeleteMultifactorByProviderProviderEnum = {
  duo: 'duo',
  google_authenticator: 'google-authenticator',
} as const;
export type DeleteMultifactorByProviderProviderEnum =
  (typeof DeleteMultifactorByProviderProviderEnum)[keyof typeof DeleteMultifactorByProviderProviderEnum];

export const DeleteUserIdentityByUserIdProviderEnum = {
  ad: 'ad',
  adfs: 'adfs',
  amazon: 'amazon',
  apple: 'apple',
  dropbox: 'dropbox',
  bitbucket: 'bitbucket',
  aol: 'aol',
  auth0_oidc: 'auth0-oidc',
  auth0: 'auth0',
  baidu: 'baidu',
  bitly: 'bitly',
  box: 'box',
  custom: 'custom',
  daccount: 'daccount',
  dwolla: 'dwolla',
  email: 'email',
  evernote_sandbox: 'evernote-sandbox',
  evernote: 'evernote',
  exact: 'exact',
  facebook: 'facebook',
  fitbit: 'fitbit',
  flickr: 'flickr',
  github: 'github',
  google_apps: 'google-apps',
  google_oauth2: 'google-oauth2',
  instagram: 'instagram',
  ip: 'ip',
  line: 'line',
  linkedin: 'linkedin',
  miicard: 'miicard',
  oauth1: 'oauth1',
  oauth2: 'oauth2',
  office365: 'office365',
  oidc: 'oidc',
  okta: 'okta',
  paypal: 'paypal',
  paypal_sandbox: 'paypal-sandbox',
  pingfederate: 'pingfederate',
  planningcenter: 'planningcenter',
  renren: 'renren',
  salesforce_community: 'salesforce-community',
  salesforce_sandbox: 'salesforce-sandbox',
  salesforce: 'salesforce',
  samlp: 'samlp',
  sharepoint: 'sharepoint',
  shopify: 'shopify',
  sms: 'sms',
  soundcloud: 'soundcloud',
  thecity_sandbox: 'thecity-sandbox',
  thecity: 'thecity',
  thirtysevensignals: 'thirtysevensignals',
  twitter: 'twitter',
  untappd: 'untappd',
  vkontakte: 'vkontakte',
  waad: 'waad',
  weibo: 'weibo',
  windowslive: 'windowslive',
  wordpress: 'wordpress',
  yahoo: 'yahoo',
  yammer: 'yammer',
  yandex: 'yandex',
} as const;
export type DeleteUserIdentityByUserIdProviderEnum =
  (typeof DeleteUserIdentityByUserIdProviderEnum)[keyof typeof DeleteUserIdentityByUserIdProviderEnum];

export const GetUsersSearchEngineEnum = {
  v1: 'v1',
  v2: 'v2',
  v3: 'v3',
} as const;
export type GetUsersSearchEngineEnum =
  (typeof GetUsersSearchEngineEnum)[keyof typeof GetUsersSearchEngineEnum];
