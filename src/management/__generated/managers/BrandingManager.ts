/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  GetBranding200Response,
  GetUniversalLogin200Response,
  PatchBrandingRequest,
  PostBrandingTheme200Response,
  PostBrandingThemeRequest,
  PutUniversalLoginRequest,
} from '../models';

export interface DeleteBrandingThemeRequest {
  themeId: string;
}

export interface GetBrandingThemeRequest {
  themeId: string;
}

export interface PatchBrandingThemeRequest {
  themeId: string;
}

/**
 *
 */
export class BrandingManager extends runtime.BaseAPI {
  /**
   * Delete branding theme.
   * Delete branding theme
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async deleteThemeRaw(
    requestParameters: DeleteBrandingThemeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.themeId === null || requestParameters.themeId === undefined) {
      throw new runtime.RequiredError(
        'themeId',
        'Required parameter requestParameters.themeId was null or undefined when calling deleteTheme.'
      );
    }

    const response = await this.request(
      {
        path: `/branding/themes/{themeId}`.replace(
          `{${'themeId'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteThemeRaw(requestParameters, initOverrides);
  }

  /**
   * Delete template for New Universal Login Experience
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async deleteUniversalLoginTemplateRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
  async deleteUniversalLoginTemplate(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteUniversalLoginTemplateRaw(initOverrides);
  }

  /**
   * Retrieve branding settings.
   * Get branding settings
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async getSettingsRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetBranding200Response>> {
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
  async getSettings(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetBranding200Response> {
    const response = await this.getSettingsRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve branding theme.
   * Get branding theme
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async getThemeRaw(
    requestParameters: GetBrandingThemeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostBrandingTheme200Response>> {
    if (requestParameters.themeId === null || requestParameters.themeId === undefined) {
      throw new runtime.RequiredError(
        'themeId',
        'Required parameter requestParameters.themeId was null or undefined when calling getTheme.'
      );
    }

    const response = await this.request(
      {
        path: `/branding/themes/{themeId}`.replace(
          `{${'themeId'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostBrandingTheme200Response> {
    const response = await this.getThemeRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve default branding theme.
   * Get default branding theme
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async getDefaultThemeRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostBrandingTheme200Response>> {
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
  async getDefaultTheme(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostBrandingTheme200Response> {
    const response = await this.getDefaultThemeRaw(initOverrides);
    return await response.value();
  }

  /**
   * Get template for New Universal Login Experience
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async getUniversalLoginTemplateRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetUniversalLogin200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetUniversalLogin200Response> {
    const response = await this.getUniversalLoginTemplateRaw(initOverrides);
    return await response.value();
  }

  /**
   * Update branding settings.
   * Update branding settings
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async updateSettingsRaw(
    bodyParameters: PatchBrandingRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetBranding200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetBranding200Response> {
    const response = await this.updateSettingsRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update branding theme.
   * Update branding theme
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async updateThemeRaw(
    requestParameters: PatchBrandingThemeRequest,
    bodyParameters: PostBrandingThemeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostBrandingTheme200Response>> {
    if (requestParameters.themeId === null || requestParameters.themeId === undefined) {
      throw new runtime.RequiredError(
        'themeId',
        'Required parameter requestParameters.themeId was null or undefined when calling updateTheme.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/branding/themes/{themeId}`.replace(
          `{${'themeId'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostBrandingTheme200Response> {
    const response = await this.updateThemeRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create branding theme.
   * Create branding theme
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async createThemeRaw(
    bodyParameters: PostBrandingThemeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostBrandingTheme200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostBrandingTheme200Response> {
    const response = await this.createThemeRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update the Universal Login branding template.<br/><br/><p>When <code>content-type</code> header is set to <code>application/json</code>, the expected body must be JSON:</p><br/><pre><br/>{<br/>  \"template\": \"&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;{%- auth0:head -%}&lt;/head&gt;&lt;body&gt;{%- auth0:widget -%}&lt;/body&gt;&lt;/html&gt;\"<br/>}<br/></pre><br/><br/><p><br/>  When <code>content-type</code> header is set to <code>text/html</code>, the expected body must be the HTML template:<br/></p><br/><pre><br/>&lt!DOCTYPE html&gt;<br/>&lt;code&gt;<br/>  &lt;html&gt;<br/>    &lt;head&gt;<br/>     {%- auth0:head -%}<br/>    &lt;/head&gt;<br/>    &lt;body&gt;<br/>      {%- auth0:widget -%}<br/>    &lt;/body&gt;<br/>  &lt;/html&gt;<br/>&lt;/code&gt;<br/></pre><br/>
   * Set template for New Universal Login Experience
   * @throws {RequiredError}
   * @memberof BrandingManager
   */
  async setUniversalLoginTemplateRaw(
    bodyParameters: PutUniversalLoginRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.setUniversalLoginTemplateRaw(bodyParameters, initOverrides);
  }
}
