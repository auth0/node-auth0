import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type {
  GetErrors200Response,
  Job,
  PostUsersExportsRequest,
  PostVerificationEmailRequest,
} from '../models';

const { BaseAPI } = runtime;

export interface GetErrorsRequest {
  /**
   * ID of the job.
   */
  id: string;
}

export interface GetJobsByIdRequest {
  /**
   * ID of the job.
   */
  id: string;
}

export interface PostUsersImportsData {
  /**
   *
   */
  users: typeof runtime.Blob;
  /**
   * connection_id of the connection to which users will be imported.
   */
  connection_id: string;
  /**
   * Whether to update users if they already exist (true) or to ignore them (false).
   */
  upsert?: boolean;
  /**
   * Customer-defined ID.
   */
  external_id?: string;
  /**
   * Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
   */
  send_completion_email?: boolean;
}

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
  ): Promise<ApiResponse<GetErrors200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/jobs/{id}/errors`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
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
    const consumes: runtime.Consume[] = [{ contentType: 'multipart/form-data' }];

    let formParams: { append(param: string, value: any): any };
    let useForm = false;
    // use FormData to transmit files using content-type "multipart/form-data"
    useForm = runtime.canConsumeForm(consumes);
    if (useForm) {
      formParams = new runtime.FormData();
    } else {
      formParams = new URLSearchParams();
    }

    if (bodyParameters.users !== undefined) {
      formParams.append('users', bodyParameters.users as any);
    }

    if (bodyParameters.connection_id !== undefined) {
      formParams.append('connection_id', bodyParameters.connection_id as any);
    }

    if (bodyParameters.upsert !== undefined) {
      formParams.append('upsert', bodyParameters.upsert as any);
    }

    if (bodyParameters.external_id !== undefined) {
      formParams.append('external_id', bodyParameters.external_id as any);
    }

    if (bodyParameters.send_completion_email !== undefined) {
      formParams.append('send_completion_email', bodyParameters.send_completion_email as any);
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
