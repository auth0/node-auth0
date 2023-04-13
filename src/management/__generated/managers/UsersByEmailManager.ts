import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { GetUsers200ResponseOneOfInner } from '../models';

const { BaseAPI } = runtime;

export interface GetUsersByEmailRequest {
  /**
   * Email address to search for (case-sensitive).
   * @type {string}
   */
  email: string;
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

/**
 *
 */
export class UsersByEmailManager extends BaseAPI {
  /**
   * If Auth0 is the identify provider (idP), the email address associated with a user is saved in lower case, regardless of how you initially provided it. For example, if you register a user as <b>JohnSmith@example.com</b>, Auth0 saves the user's email as <b>johnsmith@example.com</b>.
   *
   * In cases where Auth0 is not the idP, the `email` is stored based on the rules of idP, so make sure the search is made using the correct capitalization.
   *
   * When using this endpoint, make sure that you are searching for users via email addresses using the correct case.
   *
   * Search Users by Email
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
