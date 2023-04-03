/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type { GetUsers200ResponseOneOfInner } from '../models';

export interface GetUsersByEmailRequest {
  email: string;
  fields?: string;
  include_fields?: boolean;
}

/**
 *
 */
export class UsersByEmailManager extends runtime.BaseAPI {
  /**
   * If Auth0 is the identify provider (idP), the email address associated with a user is saved in lower case, regardless of how you initially provided it. For example, if you register a user as <b>JohnSmith@example.com</b>, Auth0 saves the user\'s email as <b>johnsmith@example.com</b>.<br/><br/>In cases where Auth0 is not the idP, the `email` is stored based on the rules of idP, so make sure the search is made using the correct capitalization.<br/><br/>When using this endpoint, make sure that you are searching for users via email addresses using the correct case.<br/>
   * Search Users by Email
   * @throws {RequiredError}
   * @memberof UsersByEmailManager
   */
  async getByEmailRaw(
    requestParameters: GetUsersByEmailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<GetUsers200ResponseOneOfInner>>> {
    if (requestParameters.email === null || requestParameters.email === undefined) {
      throw new runtime.RequiredError(
        'email',
        'Required parameter requestParameters.email was null or undefined when calling getByEmail.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    if (requestParameters.email !== undefined) {
      queryParameters['email'] = requestParameters.email;
    }

    const response = await this.request(
      {
        path: `/users-by-email`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * If Auth0 is the identify provider (idP), the email address associated with a user is saved in lower case, regardless of how you initially provided it. For example, if you register a user as <b>JohnSmith@example.com</b>, Auth0 saves the user\'s email as <b>johnsmith@example.com</b>.<br/><br/>In cases where Auth0 is not the idP, the `email` is stored based on the rules of idP, so make sure the search is made using the correct capitalization.<br/><br/>When using this endpoint, make sure that you are searching for users via email addresses using the correct case.<br/>
   * Search Users by Email
   */
  async getByEmail(
    requestParameters: GetUsersByEmailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<GetUsers200ResponseOneOfInner>> {
    const response = await this.getByEmailRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
