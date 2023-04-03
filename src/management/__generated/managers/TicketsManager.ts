/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  PostEmailVerification201Response,
  PostEmailVerificationRequest,
  PostPasswordChange201Response,
  PostPasswordChangeRequest,
} from '../models';

/**
 *
 */
export class TicketsManager extends runtime.BaseAPI {
  /**
   * Create a <a href=\"https://auth0.com/docs/email/custom#verification-email\">ticket to verify a user\'s email address</a>.
   * Create an email verification ticket
   * @throws {RequiredError}
   * @memberof TicketsManager
   */
  async verifyEmailRaw(
    bodyParameters: PostEmailVerificationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostEmailVerification201Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/tickets/email-verification`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create a <a href=\"https://auth0.com/docs/email/custom#verification-email\">ticket to verify a user\'s email address</a>.
   * Create an email verification ticket
   */
  async verifyEmail(
    bodyParameters: PostEmailVerificationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostEmailVerification201Response> {
    const response = await this.verifyEmailRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a <a href=\"https://auth0.com/docs/connections/database/password-change\">password change ticket</a> for a user.
   * Create a password change ticket
   * @throws {RequiredError}
   * @memberof TicketsManager
   */
  async changePasswordRaw(
    bodyParameters: PostPasswordChangeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostPasswordChange201Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/tickets/password-change`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create a <a href=\"https://auth0.com/docs/connections/database/password-change\">password change ticket</a> for a user.
   * Create a password change ticket
   */
  async changePassword(
    bodyParameters: PostPasswordChangeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostPasswordChange201Response> {
    const response = await this.changePasswordRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
