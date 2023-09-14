import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  EmailTemplateUpdate,
  GetEmailTemplatesByTemplateName200Response,
  PatchEmailTemplatesByTemplateNameRequest,
  PostEmailTemplatesRequest,
  GetEmailTemplatesByTemplateNameRequest,
  PatchEmailTemplatesByTemplateNameOperationRequest,
  PutEmailTemplatesByTemplateNameRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

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
    requestParameters: PatchEmailTemplatesByTemplateNameOperationRequest,
    bodyParameters: PatchEmailTemplatesByTemplateNameRequest,
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
