import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type { GetUsers200ResponseOneOfInner, GetUsersByEmailRequest } from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class UsersByEmailManager extends BaseAPI {
  /**
   * Find users by email. If Auth0 is the identity provider (idP), the email address associated with a user is saved in lower case, regardless of how you initially provided it.
   *
   * For example, if you register a user as JohnSmith@example.com, Auth0 saves the user's email as johnsmith@example.com.
   *
   * Therefore, when using this endpoint, make sure that you are searching for users via email addresses using the correct case.
   *
   * Search Users by Email
   *
   * @throws {RequiredError}
   */
  async getByEmail(
    requestParameters: GetUsersByEmailRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetUsers200ResponseOneOfInner>>> {
    runtime.validateRequiredRequestParams(requestParameters, ['email']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
      {
        key: 'email',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/users-by-email`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
