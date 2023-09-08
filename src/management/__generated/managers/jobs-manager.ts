import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetErrors200Response,
  Job,
  PostUsersExportsRequest,
  PostVerificationEmailRequest,
  GetErrorsRequest,
  GetJobsByIdRequest,
  PostUsersImportsData,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class JobsManager extends BaseAPI {
  /**
   * Retrieve error details of a failed job.
   * Get job error details
   *
   * @throws {RequiredError}
   */
  async getErrors(
    requestParameters: GetErrorsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetErrors200Response | void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/jobs/{id}/errors`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return response.status === 204
      ? runtime.VoidApiResponse.fromResponse(response)
      : runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieves a job. Useful to check its status.
   * Get a job
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetJobsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Job>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/jobs/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Export all users to a file via a long-running job.
   * Create export users job
   *
   * @throws {RequiredError}
   */
  async exportUsers(
    bodyParameters: PostUsersExportsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Job>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/jobs/users-exports`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Import users from a <a href="https://manage.local.dev.auth0.com/docs/users/references/bulk-import-database-schema-examples">formatted file</a> into a connection via a long-running job.
   * Create import users job
   *
   * @throws {RequiredError}
   */
  async importUsers(
    bodyParameters: PostUsersImportsData,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Job>> {
    const formParams = new FormData();

    if (bodyParameters.users !== undefined) {
      formParams.append('users', await runtime.parseFormParam(bodyParameters.users));
    }

    if (bodyParameters.connection_id !== undefined) {
      formParams.append(
        'connection_id',
        await runtime.parseFormParam(bodyParameters.connection_id)
      );
    }

    if (bodyParameters.upsert !== undefined) {
      formParams.append('upsert', await runtime.parseFormParam(bodyParameters.upsert));
    }

    if (bodyParameters.external_id !== undefined) {
      formParams.append('external_id', await runtime.parseFormParam(bodyParameters.external_id));
    }

    if (bodyParameters.send_completion_email !== undefined) {
      formParams.append(
        'send_completion_email',
        await runtime.parseFormParam(bodyParameters.send_completion_email)
      );
    }

    const response = await this.request(
      {
        path: `/jobs/users-imports`,
        method: 'POST',
        body: formParams,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Send an email to the specified user that asks them to click a link to <a href="https://auth0.com/docs/email/custom#verification-email">verify their email address</a>.
   *
   * Note: You must have the `Status` toggle enabled for the verification email template for the email to be sent.
   * Send an email address verification email
   *
   * @throws {RequiredError}
   */
  async verifyEmail(
    bodyParameters: PostVerificationEmailRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Job>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/jobs/verification-email`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
