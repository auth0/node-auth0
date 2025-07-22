import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  CreatePhoneProviderRequest,
  CreatePhoneTemplateRequestContent,
  CreatePhoneTemplateResponseContent,
  GetBranding200Response,
  GetBrandingPhoneProviders200Response,
  GetBrandingPhoneProviders200ResponseProvidersInner,
  GetPhoneTemplateResponseContent,
  GetUniversalLogin200Response,
  ListPhoneTemplatesResponseContent,
  PatchBrandingRequest,
  PostBrandingTheme200Response,
  PostBrandingThemeRequest,
  PutUniversalLoginRequest,
  ResetPhoneTemplateResponseContent,
  UpdatePhoneProviderRequest,
  UpdatePhoneTemplateRequestContent,
  UpdatePhoneTemplateResponseContent,
  DeleteBrandingThemeRequest,
  DeletePhoneProviderRequest,
  DeletePhoneTemplateRequest,
  GetBrandingPhoneProvidersRequest,
  GetBrandingThemeRequest,
  GetPhoneProviderRequest,
  GetPhoneTemplateRequest,
  GetPhoneTemplatesRequest,
  PatchBrandingThemeRequest,
  ResetPhoneTemplateRequest,
  UpdatePhoneProviderOperationRequest,
  UpdatePhoneTemplateRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class BrandingManager extends BaseAPI {
  /**
   * Create a <a href="https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers">phone provider</a>.
   * The <code>credentials</code> object requires different properties depending on the phone provider (which is specified using the <code>name</code> property).
   *
   * Configure the phone provider
   *
   * @throws {RequiredError}
   */
  async configurePhoneProvider(
    bodyParameters: CreatePhoneProviderRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBrandingPhoneProviders200ResponseProvidersInner>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding/phone/providers`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a phone notification template
   *
   * @throws {RequiredError}
   */
  async createPhoneTemplate(
    bodyParameters: CreatePhoneTemplateRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<CreatePhoneTemplateResponseContent>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding/phone/templates`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Delete branding theme.
   * Delete branding theme
   *
   * @throws {RequiredError}
   */
  async deleteTheme(
    requestParameters: DeleteBrandingThemeRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['themeId']);

    const response = await this.request(
      {
        path: `/branding/themes/{themeId}`.replace(
          '{themeId}',
          encodeURIComponent(String(requestParameters.themeId))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete the configured phone provider.
   *
   * Deletes a Phone Provider
   *
   * @throws {RequiredError}
   */
  async deletePhoneProvider(
    requestParameters: DeletePhoneProviderRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/branding/phone/providers/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete a phone notification template
   *
   * @throws {RequiredError}
   */
  async deletePhoneTemplate(
    requestParameters: DeletePhoneTemplateRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/branding/phone/templates/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete template for New Universal Login Experience
   *
   * @throws {RequiredError}
   */
  async deleteUniversalLoginTemplate(initOverrides?: InitOverride): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/branding/templates/universal-login`,
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve branding settings.
   * Get branding settings
   *
   * @throws {RequiredError}
   */
  async getSettings(initOverrides?: InitOverride): Promise<ApiResponse<GetBranding200Response>> {
    const response = await this.request(
      {
        path: `/branding`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a list of <a href="https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers">phone providers</a> details set for a Tenant. A list of fields to include or exclude may also be specified.
   *
   * Get a list of phone providers
   *
   * @throws {RequiredError}
   */
  async getAllPhoneProviders(
    requestParameters: GetBrandingPhoneProvidersRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBrandingPhoneProviders200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'disabled',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/branding/phone/providers`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve branding theme.
   * Get branding theme
   *
   * @throws {RequiredError}
   */
  async getTheme(
    requestParameters: GetBrandingThemeRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostBrandingTheme200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['themeId']);

    const response = await this.request(
      {
        path: `/branding/themes/{themeId}`.replace(
          '{themeId}',
          encodeURIComponent(String(requestParameters.themeId))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve default branding theme.
   * Get default branding theme
   *
   * @throws {RequiredError}
   */
  async getDefaultTheme(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostBrandingTheme200Response>> {
    const response = await this.request(
      {
        path: `/branding/themes/default`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve <a href="https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers">phone provider</a> details. A list of fields to include or exclude may also be specified.
   *
   * Get a phone provider
   *
   * @throws {RequiredError}
   */
  async getPhoneProvider(
    requestParameters: GetPhoneProviderRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBrandingPhoneProviders200ResponseProvidersInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/branding/phone/providers/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get a phone notification template
   *
   * @throws {RequiredError}
   */
  async getPhoneTemplate(
    requestParameters: GetPhoneTemplateRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPhoneTemplateResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/branding/phone/templates/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get a list of phone notification templates
   *
   * @throws {RequiredError}
   */
  async getAllPhoneTemplates(
    requestParameters: GetPhoneTemplatesRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ListPhoneTemplatesResponseContent>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'disabled',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/branding/phone/templates`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get template for New Universal Login Experience
   *
   * @throws {RequiredError}
   */
  async getUniversalLoginTemplate(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetUniversalLogin200Response>> {
    const response = await this.request(
      {
        path: `/branding/templates/universal-login`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update branding settings.
   * Update branding settings
   *
   * @throws {RequiredError}
   */
  async updateSettings(
    bodyParameters: PatchBrandingRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBranding200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update branding theme.
   * Update branding theme
   *
   * @throws {RequiredError}
   */
  async updateTheme(
    requestParameters: PatchBrandingThemeRequest,
    bodyParameters: PostBrandingThemeRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostBrandingTheme200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['themeId']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding/themes/{themeId}`.replace(
          '{themeId}',
          encodeURIComponent(String(requestParameters.themeId))
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
   * Create branding theme.
   * Create branding theme
   *
   * @throws {RequiredError}
   */
  async createTheme(
    bodyParameters: PostBrandingThemeRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostBrandingTheme200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding/themes`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update the Universal Login branding template.
   *
   * <p>When <code>content-type</code> header is set to <code>application/json</code>, the expected body must be JSON:</p>
   * <pre>
   * {
   *   "template": "&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;{%- auth0:head -%}&lt;/head&gt;&lt;body&gt;{%- auth0:widget -%}&lt;/body&gt;&lt;/html&gt;"
   * }
   * </pre>
   *
   * <p>
   *   When <code>content-type</code> header is set to <code>text/html</code>, the expected body must be the HTML template:
   * </p>
   * <pre>
   * &lt!DOCTYPE html&gt;
   * &lt;code&gt;
   *   &lt;html&gt;
   *     &lt;head&gt;
   *      {%- auth0:head -%}
   *     &lt;/head&gt;
   *     &lt;body&gt;
   *       {%- auth0:widget -%}
   *     &lt;/body&gt;
   *   &lt;/html&gt;
   * &lt;/code&gt;
   * </pre>
   *
   * Set template for New Universal Login Experience
   *
   * @throws {RequiredError}
   */
  async setUniversalLoginTemplate(
    bodyParameters: PutUniversalLoginRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding/templates/universal-login`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Resets a phone notification template values
   *
   * @throws {RequiredError}
   */
  async resetTemplate(
    requestParameters: ResetPhoneTemplateRequest,
    bodyParameters: any | null,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<ResetPhoneTemplateResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding/phone/templates/{id}/reset`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters as any,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update a <a href="https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers">phone provider</a>.
   * The <code>credentials</code> object requires different properties depending on the phone provider (which is specified using the <code>name</code> property).
   *
   * Update the phone provider
   *
   * @throws {RequiredError}
   */
  async updatePhoneProvider(
    requestParameters: UpdatePhoneProviderOperationRequest,
    bodyParameters: UpdatePhoneProviderRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBrandingPhoneProviders200ResponseProvidersInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding/phone/providers/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
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
   * Update a phone notification template
   *
   * @throws {RequiredError}
   */
  async updatePhoneTemplate(
    requestParameters: UpdatePhoneTemplateRequest,
    bodyParameters: UpdatePhoneTemplateRequestContent,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<UpdatePhoneTemplateResponseContent>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding/phone/templates/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
