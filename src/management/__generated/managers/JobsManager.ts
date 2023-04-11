import * as runtime from '../../runtime';
import type { InitOverrideFunction, ApiResponse } from '../../runtime';
import type {
  GetErrors200Response,
  Job,
  PostUsersExportsRequest,
  PostVerificationEmailRequest,
} from '../models';

const { BaseAPI } = runtime;

export type InitOverrides = RequestInit | InitOverrideFunction;

export interface GetErrorsRequest {
  /**
   * ID of the job.
   * @type {string}
   */
  id: string;
}

export interface GetJobsByIdRequest {
  /**
   * ID of the job.
   * @type {string}
   */
  id: string;
}

export interface PostUsersImportsData {
  /**
   *
   * @type {Blob}
   */
  users: Blob;
  /**
   * connection_id of the connection to which users will be imported.
   * @type {string}
   */
  connection_id: string;
  /**
   * Whether to update users if they already exist (true) or to ignore them (false).
   * @type {boolean}
   */
  upsert?: boolean;
  /**
   * Customer-defined ID.
   * @type {string}
   */
  external_id?: string;
  /**
   * Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
   * @type {boolean}
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
   * @throws {RequiredError}
   */
  async getErrorsRaw(
    requestParameters: GetErrorsRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<GetErrors200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/jobs/{id}/errors`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve error details of a failed job.
   * Get job error details
   */
  async getErrors(
    requestParameters: GetErrorsRequest,
    initOverrides?: InitOverrides
  ): Promise<GetErrors200Response> {
    const response = await this.getErrorsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves a job. Useful to check its status.
   * Get a job
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetJobsByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<Job>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/jobs/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieves a job. Useful to check its status.
   * Get a job
   */
  async get(requestParameters: GetJobsByIdRequest, initOverrides?: InitOverrides): Promise<Job> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Export all users to a file via a long-running job.
   * Create export users job
   * @throws {RequiredError}
   */
  async exportUsersRaw(
    bodyParameters: PostUsersExportsRequest,
    initOverrides?: InitOverrides
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Export all users to a file via a long-running job.
   * Create export users job
   */
  async exportUsers(
    bodyParameters: PostUsersExportsRequest,
    initOverrides?: InitOverrides
  ): Promise<Job> {
    const response = await this.exportUsersRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Import users from a <a href="https://manage.local.dev.auth0.com/docs/users/references/bulk-import-database-schema-examples">formatted file</a> into a connection via a long-running job.
   * Create import users job
   * @throws {RequiredError}
   */
  async importUsersRaw(
    bodyParameters: PostUsersImportsData,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<Job>> {
    const consumes: runtime.Consume[] = [{ contentType: 'multipart/form-data' }];
    // @ts-ignore: canConsumeForm may be unused
    const canConsumeForm = runtime.canConsumeForm(consumes);

    let formParams: { append(param: string, value: any): any };
    let useForm = false;
    // use FormData to transmit files using content-type "multipart/form-data"
    useForm = runtime.canConsumeForm;
    if (useForm) {
      formParams = new FormData();
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Import users from a <a href=\"https://manage.local.dev.auth0.com/docs/users/references/bulk-import-database-schema-examples\">formatted file</a> into a connection via a long-running job.
   * Create import users job
   */
  async importUsers(
    bodyParameters: PostUsersImportsData,
    initOverrides?: InitOverrides
  ): Promise<Job> {
    const response = await this.importUsersRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Send an email to the specified user that asks them to click a link to <a href="https://auth0.com/docs/email/custom#verification-email">verify their email address</a>.
   *
   * Note: You must have the `Status` toggle enabled for the verification email template for the email to be sent.
   * Send an email address verification email
   * @throws {RequiredError}
   */
  async verifyEmailRaw(
    bodyParameters: PostVerificationEmailRequest,
    initOverrides?: InitOverrides
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Send an email to the specified user that asks them to click a link to <a href=\"https://auth0.com/docs/email/custom#verification-email\">verify their email address</a>.<br/><br/>Note: You must have the `Status` toggle enabled for the verification email template for the email to be sent.
   * Send an email address verification email
   */
  async verifyEmail(
    bodyParameters: PostVerificationEmailRequest,
    initOverrides?: InitOverrides
  ): Promise<Job> {
    const response = await this.verifyEmailRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
