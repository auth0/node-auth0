import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetAllRendering200Response,
  GetRendering200Response,
  PatchRendering200Response,
  PatchRenderingRequest,
  PromptsSettings,
  PromptsSettingsUpdate,
  GetAllRendering200ResponseOneOf,
  GetAllRendering200ResponseOneOfInner,
  GetAllRenderingRequest,
  GetCustomTextByLanguageRequest,
  GetPartialsRequest,
  GetRenderingRequest,
  PatchRenderingOperationRequest,
  PutCustomTextByLanguageRequest,
  PutPartialsRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class PromptsManager extends BaseAPI {
  /**
   * Get render setting configurations for all screens.
   * Get render setting configurations for all screens
   *
   * @throws {RequiredError}
   */
  async getAllRenderingSettings(
    requestParameters: GetAllRenderingRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetAllRendering200ResponseOneOf>>;
  async getAllRenderingSettings(
    requestParameters?: GetAllRenderingRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetAllRendering200ResponseOneOfInner>>>;
  async getAllRenderingSettings(
    requestParameters: GetAllRenderingRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetAllRendering200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
      {
        key: 'page',
        config: {},
      },
      {
        key: 'per_page',
        config: {},
      },
      {
        key: 'include_totals',
        config: {},
      },
      {
        key: 'prompt',
        config: {},
      },
      {
        key: 'screen',
        config: {},
      },
      {
        key: 'rendering_mode',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/prompts/rendering`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve custom text for a specific prompt and language.
   * Get custom text for a prompt
   *
   * @throws {RequiredError}
   */
  async getCustomTextByLanguage(
    requestParameters: GetCustomTextByLanguageRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    runtime.validateRequiredRequestParams(requestParameters, ['prompt', 'language']);

    const response = await this.request(
      {
        path: `/prompts/{prompt}/custom-text/{language}`
          .replace('{prompt}', encodeURIComponent(String(requestParameters.prompt)))
          .replace('{language}', encodeURIComponent(String(requestParameters.language))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * Get template partials for a prompt
   * Get partials for a prompt
   *
   * @throws {RequiredError}
   */
  async getPartials(
    requestParameters: GetPartialsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    runtime.validateRequiredRequestParams(requestParameters, ['prompt']);

    const response = await this.request(
      {
        path: `/prompts/{prompt}/partials`.replace(
          '{prompt}',
          encodeURIComponent(String(requestParameters.prompt))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * Retrieve details of the Universal Login configuration of your tenant. This includes the <a href="https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first">Identifier First Authentication</a> and <a href="https://auth0.com/docs/secure/multi-factor-authentication/fido-authentication-with-webauthn/configure-webauthn-device-biometrics-for-mfa">WebAuthn with Device Biometrics for MFA</a> features.
   * Get prompt settings
   *
   * @throws {RequiredError}
   */
  async get(initOverrides?: InitOverride): Promise<ApiResponse<PromptsSettings>> {
    const response = await this.request(
      {
        path: `/prompts`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get render settings for a screen.
   * Get render settings for a screen
   *
   * @throws {RequiredError}
   */
  async getRendering(
    requestParameters: GetRenderingRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetRendering200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['prompt', 'screen']);

    const response = await this.request(
      {
        path: `/prompts/{prompt}/screen/{screen}/rendering`
          .replace('{prompt}', encodeURIComponent(String(requestParameters.prompt)))
          .replace('{screen}', encodeURIComponent(String(requestParameters.screen))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update the Universal Login configuration of your tenant. This includes the <a href="https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first">Identifier First Authentication</a> and <a href="https://auth0.com/docs/secure/multi-factor-authentication/fido-authentication-with-webauthn/configure-webauthn-device-biometrics-for-mfa">WebAuthn with Device Biometrics for MFA</a> features.
   * Update prompt settings
   *
   * @throws {RequiredError}
   */
  async update(
    bodyParameters: PromptsSettingsUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PromptsSettings>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/prompts`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Learn more about <a href='https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/configure-acul-screens'>configuring render settings</a> for advanced customization.
   *
   * <p>
   *   Example <code>head_tags</code> array. See our <a href='https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/configure-acul-screens'>documentation</a> on using Liquid variables within head tags.
   * </p>
   * <pre>{
   *   "head_tags": [
   *     {
   *       "tag": "script",
   *       "attributes": {
   *         "defer": true,
   *         "src": "URL_TO_ASSET",
   *         "async": true,
   *         "integrity": [
   *           "ASSET_SHA"
   *         ]
   *       }
   *     },
   *     {
   *       "tag": "link",
   *       "attributes": {
   *         "href": "URL_TO_ASSET",
   *         "rel": "stylesheet"
   *       }
   *     }
   *   ]
   * }
   * </pre>
   *
   * Update render settings for a screen
   *
   * @throws {RequiredError}
   */
  async updateRendering(
    requestParameters: PatchRenderingOperationRequest,
    bodyParameters: PatchRenderingRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PatchRendering200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['prompt', 'screen']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/prompts/{prompt}/screen/{screen}/rendering`
          .replace('{prompt}', encodeURIComponent(String(requestParameters.prompt)))
          .replace('{screen}', encodeURIComponent(String(requestParameters.screen))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Set custom text for a specific prompt. Existing texts will be overwritten.
   * Set custom text for a specific prompt
   *
   * @throws {RequiredError}
   */
  async updateCustomTextByLanguage(
    requestParameters: PutCustomTextByLanguageRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['prompt', 'language']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/prompts/{prompt}/custom-text/{language}`
          .replace('{prompt}', encodeURIComponent(String(requestParameters.prompt)))
          .replace('{language}', encodeURIComponent(String(requestParameters.language))),
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Set template partials for a prompt
   * Set partials for a prompt
   *
   * @throws {RequiredError}
   */
  async updatePartials(
    requestParameters: PutPartialsRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['prompt']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/prompts/{prompt}/partials`.replace(
          '{prompt}',
          encodeURIComponent(String(requestParameters.prompt))
        ),
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }
}
