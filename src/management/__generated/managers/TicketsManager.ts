import * as runtime from '../../runtime';
import type { InitOverrideFunction, ApiResponse } from '../../runtime';
import type {
  PostEmailVerification201Response,
  PostEmailVerificationRequest,
  PostPasswordChange201Response,
  PostPasswordChangeRequest,
} from '../models';

const { BaseAPI } = runtime;

export type InitOverrides = RequestInit | InitOverrideFunction;

/**
 *
 */
export class TicketsManager extends BaseAPI {
  /**
   * Create a <a href="https://auth0.com/docs/email/custom#verification-email">ticket to verify a user's email address</a>.
   * Create an email verification ticket
   * @throws {RequiredError}
   */
  async verifyEmailRaw(
    bodyParameters: PostEmailVerificationRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<PostEmailVerification201Response>> {
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
    initOverrides?: InitOverrides
  ): Promise<PostEmailVerification201Response> {
    const response = await this.verifyEmailRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a <a href="https://auth0.com/docs/connections/database/password-change">password change ticket</a> for a user.
   * Create a password change ticket
   * @throws {RequiredError}
   */
  async changePasswordRaw(
    bodyParameters: PostPasswordChangeRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<PostPasswordChange201Response>> {
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
    initOverrides?: InitOverrides
  ): Promise<PostPasswordChange201Response> {
    const response = await this.changePasswordRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
