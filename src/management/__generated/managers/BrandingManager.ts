import * as runtime from '../../runtime';
import type { InitOverrideFunction, ApiResponse } from '../../runtime';
import type {
  GetBranding200Response,
  GetUniversalLogin200Response,
  PatchBrandingRequest,
  PostBrandingTheme200Response,
  PostBrandingThemeRequest,
  PutUniversalLoginRequest,
} from '../models';

const { BaseAPI } = runtime;

export type InitOverrides = RequestInit | InitOverrideFunction;

export interface DeleteBrandingThemeRequest {
  /**
   * The ID of the theme
   * @type {string}
   */
  themeId: string;
}

export interface GetBrandingThemeRequest {
  /**
   * The ID of the theme
   * @type {string}
   */
  themeId: string;
}

export interface PatchBrandingThemeRequest {
  /**
   * The ID of the theme
   * @type {string}
   */
  themeId: string;
}

/**
 *
 */
export class BrandingManager extends BaseAPI {
  /**
   * Delete branding theme.
   * Delete branding theme
   * @throws {RequiredError}
   */
  async deleteThemeRaw(
    requestParameters: DeleteBrandingThemeRequest,
    initOverrides?: InitOverrides
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete branding theme.
   * Delete branding theme
   */
  async deleteTheme(
    requestParameters: DeleteBrandingThemeRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.deleteThemeRaw(requestParameters, initOverrides);
  }

  /**
   * Delete template for New Universal Login Experience
   * @throws {RequiredError}
   */
  async deleteUniversalLoginTemplateRaw(initOverrides?: InitOverrides): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/branding/templates/universal-login`,
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete template for New Universal Login Experience
   */
  async deleteUniversalLoginTemplate(initOverrides?: InitOverrides): Promise<void> {
    await this.deleteUniversalLoginTemplateRaw(initOverrides);
  }

  /**
   * Retrieve branding settings.
   * Get branding settings
   * @throws {RequiredError}
   */
  async getSettingsRaw(
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<GetBranding200Response>> {
    const response = await this.request(
      {
        path: `/branding`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve branding settings.
   * Get branding settings
   */
  async getSettings(initOverrides?: InitOverrides): Promise<GetBranding200Response> {
    const response = await this.getSettingsRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve branding theme.
   * Get branding theme
   * @throws {RequiredError}
   */
  async getThemeRaw(
    requestParameters: GetBrandingThemeRequest,
    initOverrides?: InitOverrides
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve branding theme.
   * Get branding theme
   */
  async getTheme(
    requestParameters: GetBrandingThemeRequest,
    initOverrides?: InitOverrides
  ): Promise<PostBrandingTheme200Response> {
    const response = await this.getThemeRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve default branding theme.
   * Get default branding theme
   * @throws {RequiredError}
   */
  async getDefaultThemeRaw(
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<PostBrandingTheme200Response>> {
    const response = await this.request(
      {
        path: `/branding/themes/default`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve default branding theme.
   * Get default branding theme
   */
  async getDefaultTheme(initOverrides?: InitOverrides): Promise<PostBrandingTheme200Response> {
    const response = await this.getDefaultThemeRaw(initOverrides);
    return await response.value();
  }

  /**
   * Get template for New Universal Login Experience
   * @throws {RequiredError}
   */
  async getUniversalLoginTemplateRaw(
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<GetUniversalLogin200Response>> {
    const response = await this.request(
      {
        path: `/branding/templates/universal-login`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get template for New Universal Login Experience
   */
  async getUniversalLoginTemplate(
    initOverrides?: InitOverrides
  ): Promise<GetUniversalLogin200Response> {
    const response = await this.getUniversalLoginTemplateRaw(initOverrides);
    return await response.value();
  }

  /**
   * Update branding settings.
   * Update branding settings
   * @throws {RequiredError}
   */
  async updateSettingsRaw(
    bodyParameters: PatchBrandingRequest,
    initOverrides?: InitOverrides
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update branding settings.
   * Update branding settings
   */
  async updateSettings(
    bodyParameters: PatchBrandingRequest,
    initOverrides?: InitOverrides
  ): Promise<GetBranding200Response> {
    const response = await this.updateSettingsRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update branding theme.
   * Update branding theme
   * @throws {RequiredError}
   */
  async updateThemeRaw(
    requestParameters: PatchBrandingThemeRequest,
    bodyParameters: PostBrandingThemeRequest,
    initOverrides?: InitOverrides
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update branding theme.
   * Update branding theme
   */
  async updateTheme(
    requestParameters: PatchBrandingThemeRequest,
    bodyParameters: PostBrandingThemeRequest,
    initOverrides?: InitOverrides
  ): Promise<PostBrandingTheme200Response> {
    const response = await this.updateThemeRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create branding theme.
   * Create branding theme
   * @throws {RequiredError}
   */
  async createThemeRaw(
    bodyParameters: PostBrandingThemeRequest,
    initOverrides?: InitOverrides
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create branding theme.
   * Create branding theme
   */
  async createTheme(
    bodyParameters: PostBrandingThemeRequest,
    initOverrides?: InitOverrides
  ): Promise<PostBrandingTheme200Response> {
    const response = await this.createThemeRaw(bodyParameters, initOverrides);
    return await response.value();
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
   * @throws {RequiredError}
   */
  async setUniversalLoginTemplateRaw(
    bodyParameters: PutUniversalLoginRequest,
    initOverrides?: InitOverrides
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Update the Universal Login branding template.<br/><br/><p>When <code>content-type</code> header is set to <code>application/json</code>, the expected body must be JSON:</p><br/><pre><br/>{<br/>  \"template\": \"&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;{%- auth0:head -%}&lt;/head&gt;&lt;body&gt;{%- auth0:widget -%}&lt;/body&gt;&lt;/html&gt;\"<br/>}<br/></pre><br/><br/><p><br/>  When <code>content-type</code> header is set to <code>text/html</code>, the expected body must be the HTML template:<br/></p><br/><pre><br/>&lt!DOCTYPE html&gt;<br/>&lt;code&gt;<br/>  &lt;html&gt;<br/>    &lt;head&gt;<br/>     {%- auth0:head -%}<br/>    &lt;/head&gt;<br/>    &lt;body&gt;<br/>      {%- auth0:widget -%}<br/>    &lt;/body&gt;<br/>  &lt;/html&gt;<br/>&lt;/code&gt;<br/></pre><br/>
   * Set template for New Universal Login Experience
   */
  async setUniversalLoginTemplate(
    bodyParameters: PutUniversalLoginRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.setUniversalLoginTemplateRaw(bodyParameters, initOverrides);
  }
}
