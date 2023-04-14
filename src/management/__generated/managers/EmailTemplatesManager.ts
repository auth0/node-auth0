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
   */
  templateName: GetEmailTemplatesByTemplateNameTemplateNameEnum;
}

export interface PatchEmailTemplatesByTemplateNameRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   */
  templateName: PatchEmailTemplatesByTemplateNameTemplateNameEnum;
}

export interface PutEmailTemplatesByTemplateNameRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
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
   *
   * @throws {RequiredError}
   */
  async get(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Modify an email template.
   * Patch an email template
   *
   * @throws {RequiredError}
   */
  async update(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create an email template.
   * Create an email template
   *
   * @throws {RequiredError}
   */
  async create(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update an email template.
   * Update an email template
   *
   * @throws {RequiredError}
   */
  async put(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }
}

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
