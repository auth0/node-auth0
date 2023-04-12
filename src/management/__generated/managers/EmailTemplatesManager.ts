import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type {
  EmailTemplateUpdate,
  GetEmailTemplatesByTemplateName200Response,
  PostEmailTemplatesRequest,
} from '../models';

const { BaseAPI } = runtime;

export interface GetEmailTemplatesByTemplateNameRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   * @type {GetEmailTemplatesByTemplateNameTemplateNameEnum}
   */
  templateName: GetEmailTemplatesByTemplateNameTemplateNameEnum;
}

export interface PatchEmailTemplatesByTemplateNameRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   * @type {PatchEmailTemplatesByTemplateNameTemplateNameEnum}
   */
  templateName: PatchEmailTemplatesByTemplateNameTemplateNameEnum;
}

export interface PutEmailTemplatesByTemplateNameRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   * @type {PutEmailTemplatesByTemplateNameTemplateNameEnum}
   */
  templateName: PutEmailTemplatesByTemplateNameTemplateNameEnum;
}

/**
 *
 */
export class EmailTemplatesManager extends BaseAPI {
  /**
   * Retrieve an email template by pre-defined name. These names are `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, and `user_invitation`. The names `change_password`, and `password_reset` are also supported for legacy scenarios.
   * Get an email template
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetEmailTemplatesByTemplateNameRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEmailTemplatesByTemplateName200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['templateName']);

    const response = await this.request(
      {
        path: `/email-templates/{templateName}`.replace(
          '{templateName}',
          encodeURIComponent(String(requestParameters.templateName))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve an email template by pre-defined name. These names are `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, and `user_invitation`. The names `change_password`, and `password_reset` are also supported for legacy scenarios.
   * Get an email template
   */
  async get(
    requestParameters: GetEmailTemplatesByTemplateNameRequest,
    initOverrides?: InitOverride
  ): Promise<GetEmailTemplatesByTemplateName200Response> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Modify an email template.
   * Patch an email template
   * @throws {RequiredError}
   */
  async updateRaw(
    requestParameters: PatchEmailTemplatesByTemplateNameRequest,
    bodyParameters: GetEmailTemplatesByTemplateName200Response,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEmailTemplatesByTemplateName200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['templateName']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/email-templates/{templateName}`.replace(
          '{templateName}',
          encodeURIComponent(String(requestParameters.templateName))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Modify an email template.
   * Patch an email template
   */
  async update(
    requestParameters: PatchEmailTemplatesByTemplateNameRequest,
    bodyParameters: GetEmailTemplatesByTemplateName200Response,
    initOverrides?: InitOverride
  ): Promise<GetEmailTemplatesByTemplateName200Response> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create an email template.
   * Create an email template
   * @throws {RequiredError}
   */
  async createRaw(
    bodyParameters: PostEmailTemplatesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostEmailTemplatesRequest>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/email-templates`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create an email template.
   * Create an email template
   */
  async create(
    bodyParameters: PostEmailTemplatesRequest,
    initOverrides?: InitOverride
  ): Promise<PostEmailTemplatesRequest> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an email template.
   * Update an email template
   * @throws {RequiredError}
   */
  async putRaw(
    requestParameters: PutEmailTemplatesByTemplateNameRequest,
    bodyParameters: EmailTemplateUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostEmailTemplatesRequest>> {
    runtime.validateRequiredRequestParams(requestParameters, ['templateName']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/email-templates/{templateName}`.replace(
          '{templateName}',
          encodeURIComponent(String(requestParameters.templateName))
        ),
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update an email template.
   * Update an email template
   */
  async put(
    requestParameters: PutEmailTemplatesByTemplateNameRequest,
    bodyParameters: EmailTemplateUpdate,
    initOverrides?: InitOverride
  ): Promise<PostEmailTemplatesRequest> {
    const response = await this.putRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }
}

/**
 * @export
 */
export const GetEmailTemplatesByTemplateNameTemplateNameEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type GetEmailTemplatesByTemplateNameTemplateNameEnum =
  typeof GetEmailTemplatesByTemplateNameTemplateNameEnum[keyof typeof GetEmailTemplatesByTemplateNameTemplateNameEnum];
/**
 * @export
 */
export const PatchEmailTemplatesByTemplateNameTemplateNameEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type PatchEmailTemplatesByTemplateNameTemplateNameEnum =
  typeof PatchEmailTemplatesByTemplateNameTemplateNameEnum[keyof typeof PatchEmailTemplatesByTemplateNameTemplateNameEnum];
/**
 * @export
 */
export const PutEmailTemplatesByTemplateNameTemplateNameEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type PutEmailTemplatesByTemplateNameTemplateNameEnum =
  typeof PutEmailTemplatesByTemplateNameTemplateNameEnum[keyof typeof PutEmailTemplatesByTemplateNameTemplateNameEnum];
