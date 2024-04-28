import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  PostEmailVerification201Response,
  PostEmailVerificationRequest,
  PostPasswordChange201Response,
  PostPasswordChangeRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class TicketsManager extends BaseAPI {
  /**
   * Create an email verification ticket for a given user. An email verification ticket is a generated URL that the user can consume to verify their email address.
   *
   * Create an email verification ticket
   *
   * @throws {RequiredError}
   */
  async verifyEmail(
    bodyParameters: PostEmailVerificationRequest,
    initOverrides?: InitOverride
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a password change ticket for a given user. A password change ticket is a generated URL that the user can consume to start a reset password flow.
   *
   * Note: This endpoint does not verify the given user’s identity. If you call this endpoint within your application, you must design your application to verify the user’s identity.
   *
   * Create a password change ticket
   *
   * @throws {RequiredError}
   */
  async changePassword(
    bodyParameters: PostPasswordChangeRequest,
    initOverrides?: InitOverride
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

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
