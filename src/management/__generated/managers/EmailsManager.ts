import * as runtime from '../../runtime';
import type { InitOverride, InitOverrideFunction, ApiResponse } from '../../../../../src/runtime';
import type { EmailProvider, PatchProviderRequest, PostProviderRequest } from '../models';

const { BaseAPI } = runtime;

export interface GetProviderRequest {
  /**
   * Comma-separated list of fields to include or exclude (dependent upon include_fields) from the result. Leave empty to retrieve `name` and `enabled`. Additional fields available include `credentials`, `default_from_address`, and `settings`.
   * @type {string}
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   * @type {boolean}
   */
  include_fields?: boolean;
}

/**
 *
 */
export class EmailsManager extends BaseAPI {
  /**
   * Retrieve <a href="https://auth0.com/docs/email/providers">email provider</a> details. A list of fields to include or exclude may also be specified.
   *
   * Get the email provider
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetProviderRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<EmailProvider>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/emails/provider`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/email/providers\">email provider</a> details. A list of fields to include or exclude may also be specified.<br/>
   * Get the email provider
   */
  async get(
    requestParameters: GetProviderRequest = {},
    initOverrides?: InitOverride
  ): Promise<EmailProvider> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an <a href="https://auth0.com/docs/email/providers">email provider</a>.
   * The <code>credentials</code> object requires different properties depending on the email provider (which is specified using the <code>name</code> property):
   * <ul><li><code>mandrill</code> requires <code>api_key</code></li><li><code>sendgrid</code> requires <code>api_key</code></li><li><code>sparkpost</code> requires <code>api_key</code>. Optionally, set <code>region</code> to <code>eu</code> to use the SparkPost service hosted in Western Europe; set to <code>null</code> to use the SparkPost service hosted in North America. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.</li><li><code>mailgun</code> requires <code>api_key</code> and <code>domain</code>. Optionally, set <code>region</code> to <code>eu</code> to use the Mailgun service hosted in Europe; set to <code>null</code> otherwise. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.</li><li><code>ses</code> requires <code>accessKeyId</code>, <code>secretAccessKey</code>, and <code>region</code></li><li><code>smtp</code> requires <code>smtp_host</code>, <code>smtp_port</code>, <code>smtp_user</code>, and <code>smtp_pass</code></li></ul>Depending on the type of provider it is possible to specify <code>settings</code> object with different configuration options, which will be used when sending an email:
   * <ul><li><code>smtp</code> provider, <code>settings</code> may contain <code>headers</code> object. When using AWS SES SMTP host, you may provide a name of configuration set in <code>X-SES-Configuration-Set</code> header. Value must be a string.</li><li>for <code>ses</code> provider, <code>settings</code> may contain <code>message</code> object, where you can provide a name of configuration set in <code>configuration_set_name</code> property. Value must be a string.</li></ul>
   *
   * Update the email provider
   * @throws {RequiredError}
   */
  async updateRaw(
    bodyParameters: PatchProviderRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<EmailProvider>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/emails/provider`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update an <a href=\"https://auth0.com/docs/email/providers\">email provider</a>.<br/>The <code>credentials</code> object requires different properties depending on the email provider (which is specified using the <code>name</code> property):<br/><ul><li><code>mandrill</code> requires <code>api_key</code></li><li><code>sendgrid</code> requires <code>api_key</code></li><li><code>sparkpost</code> requires <code>api_key</code>. Optionally, set <code>region</code> to <code>eu</code> to use the SparkPost service hosted in Western Europe; set to <code>null</code> to use the SparkPost service hosted in North America. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.</li><li><code>mailgun</code> requires <code>api_key</code> and <code>domain</code>. Optionally, set <code>region</code> to <code>eu</code> to use the Mailgun service hosted in Europe; set to <code>null</code> otherwise. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.</li><li><code>ses</code> requires <code>accessKeyId</code>, <code>secretAccessKey</code>, and <code>region</code></li><li><code>smtp</code> requires <code>smtp_host</code>, <code>smtp_port</code>, <code>smtp_user</code>, and <code>smtp_pass</code></li></ul>Depending on the type of provider it is possible to specify <code>settings</code> object with different configuration options, which will be used when sending an email:<br/><ul><li><code>smtp</code> provider, <code>settings</code> may contain <code>headers</code> object. When using AWS SES SMTP host, you may provide a name of configuration set in <code>X-SES-Configuration-Set</code> header. Value must be a string.</li><li>for <code>ses</code> provider, <code>settings</code> may contain <code>message</code> object, where you can provide a name of configuration set in <code>configuration_set_name</code> property. Value must be a string.</li></ul><br/>
   * Update the email provider
   */
  async update(
    bodyParameters: PatchProviderRequest,
    initOverrides?: InitOverride
  ): Promise<EmailProvider> {
    const response = await this.updateRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create an <a href="https://auth0.com/docs/email/providers">email provider</a>.
   * The <code>credentials</code> object requires different properties depending on the email provider (which is specified using the <code>name</code> property):
   * <ul><li><code>mandrill</code> requires <code>api_key</code></li><li><code>sendgrid</code> requires <code>api_key</code></li><li><code>sparkpost</code> requires <code>api_key</code>. Optionally, set <code>region</code> to <code>eu</code> to use the SparkPost service hosted in Western Europe; set to <code>null</code> to use the SparkPost service hosted in North America. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.</li><li><code>mailgun</code> requires <code>api_key</code> and <code>domain</code>. Optionally, set <code>region</code> to <code>eu</code> to use the Mailgun service hosted in Europe; set to <code>null</code> otherwise. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.</li><li><code>ses</code> requires <code>accessKeyId</code>, <code>secretAccessKey</code>, and <code>region</code></li><li><code>smtp</code> requires <code>smtp_host</code>, <code>smtp_port</code>, <code>smtp_user</code>, and <code>smtp_pass</code></li></ul>Depending on the type of provider it is possible to specify <code>settings</code> object with different configuration options, which will be used when sending an email:
   * <ul><li><code>smtp</code> provider, <code>settings</code> may contain <code>headers</code> object. When using AWS SES SMTP host, you may provide a name of configuration set in <code>X-SES-Configuration-Set</code> header. Value must be a string.</li><li>for <code>ses</code> provider, <code>settings</code> may contain <code>message</code> object, where you can provide a name of configuration set in <code>configuration_set_name</code> property. Value must be a string.</li></ul>
   *
   * Configure the email provider
   * @throws {RequiredError}
   */
  async configureRaw(
    bodyParameters: PostProviderRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<EmailProvider>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/emails/provider`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create an <a href=\"https://auth0.com/docs/email/providers\">email provider</a>.<br/>The <code>credentials</code> object requires different properties depending on the email provider (which is specified using the <code>name</code> property):<br/><ul><li><code>mandrill</code> requires <code>api_key</code></li><li><code>sendgrid</code> requires <code>api_key</code></li><li><code>sparkpost</code> requires <code>api_key</code>. Optionally, set <code>region</code> to <code>eu</code> to use the SparkPost service hosted in Western Europe; set to <code>null</code> to use the SparkPost service hosted in North America. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.</li><li><code>mailgun</code> requires <code>api_key</code> and <code>domain</code>. Optionally, set <code>region</code> to <code>eu</code> to use the Mailgun service hosted in Europe; set to <code>null</code> otherwise. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.</li><li><code>ses</code> requires <code>accessKeyId</code>, <code>secretAccessKey</code>, and <code>region</code></li><li><code>smtp</code> requires <code>smtp_host</code>, <code>smtp_port</code>, <code>smtp_user</code>, and <code>smtp_pass</code></li></ul>Depending on the type of provider it is possible to specify <code>settings</code> object with different configuration options, which will be used when sending an email:<br/><ul><li><code>smtp</code> provider, <code>settings</code> may contain <code>headers</code> object. When using AWS SES SMTP host, you may provide a name of configuration set in <code>X-SES-Configuration-Set</code> header. Value must be a string.</li><li>for <code>ses</code> provider, <code>settings</code> may contain <code>message</code> object, where you can provide a name of configuration set in <code>configuration_set_name</code> property. Value must be a string.</li></ul><br/>
   * Configure the email provider
   */
  async configure(
    bodyParameters: PostProviderRequest,
    initOverrides?: InitOverride
  ): Promise<EmailProvider> {
    const response = await this.configureRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
