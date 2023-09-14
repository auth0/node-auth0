import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetBranding200Response,
  GetUniversalLogin200Response,
  PatchBrandingRequest,
  PostBrandingTheme200Response,
  PostBrandingThemeRequest,
  PutUniversalLoginRequest,
  DeleteBrandingThemeRequest,
  GetBrandingThemeRequest,
  PatchBrandingThemeRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class BrandingManager extends BaseAPI {
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
}
