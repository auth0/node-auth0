/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  GetErrors200Response,
  Job,
  PostUsersExportsRequest,
  PostVerificationEmailRequest,
} from '../models';

export interface GetErrorsRequest {
  id: string;
}

export interface GetJobsByIdRequest {
  id: string;
}

export interface PostUsersImportsData {
  users: Blob;
  connection_id: string;
  upsert?: boolean;
  external_id?: string;
  send_completion_email?: boolean;
}

/**
 *
 */
export class JobsManager extends runtime.BaseAPI {
  /**
   * Retrieve error details of a failed job.
   * Get job error details
   * @throws {RequiredError}
   * @memberof JobsManager
   */
  async getErrorsRaw(
    requestParameters: GetErrorsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetErrors200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getErrors.'
      );
    }

    const response = await this.request(
      {
        path: `/jobs/{id}/errors`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetErrors200Response> {
    const response = await this.getErrorsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves a job. Useful to check its status.
   * Get a job
   * @throws {RequiredError}
   * @memberof JobsManager
   */
  async getRaw(
    requestParameters: GetJobsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Job>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }

    const response = await this.request(
      {
        path: `/jobs/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
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
  async get(
    requestParameters: GetJobsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Job> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Export all users to a file via a long-running job.
   * Create export users job
   * @throws {RequiredError}
   * @memberof JobsManager
   */
  async exportUsersRaw(
    bodyParameters: PostUsersExportsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Job>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Job> {
    const response = await this.exportUsersRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Import users from a <a href=\"https://manage.local.dev.auth0.com/docs/users/references/bulk-import-database-schema-examples\">formatted file</a> into a connection via a long-running job.
   * Create import users job
   * @throws {RequiredError}
   * @memberof JobsManager
   */
  async importUsersRaw(
    bodyParameters: PostUsersImportsData,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Job>> {
    const consumes: runtime.Consume[] = [{ contentType: 'multipart/form-data' }];
    // @ts-ignore: canConsumeForm may be unused
    const canConsumeForm = runtime.canConsumeForm(consumes);

    let formParams: { append(param: string, value: any): any };
    let useForm = false;
    // use FormData to transmit files using content-type "multipart/form-data"
    useForm = canConsumeForm;
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Job> {
    const response = await this.importUsersRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Send an email to the specified user that asks them to click a link to <a href=\"https://auth0.com/docs/email/custom#verification-email\">verify their email address</a>.<br/><br/>Note: You must have the `Status` toggle enabled for the verification email template for the email to be sent.
   * Send an email address verification email
   * @throws {RequiredError}
   * @memberof JobsManager
   */
  async verifyEmailRaw(
    bodyParameters: PostVerificationEmailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Job>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Job> {
    const response = await this.verifyEmailRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
