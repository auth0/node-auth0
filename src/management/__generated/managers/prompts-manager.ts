import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  PromptsSettings,
  PromptsSettingsUpdate,
  GetCustomTextByLanguageRequest,
  PutCustomTextByLanguageRequest,
  GetTeplatePartialsByPromptRequest,
  PutTeplatePartialsByPromptRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class PromptsManager extends BaseAPI {
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
   * Retrieve template partials for a specific prompt.
   * Get template partials for a prompt
   *
   * @throws {RequiredError}
   */
  async getTemplatePartialsByPrompt(
    requestParameters: GetTeplatePartialsByPromptRequest,
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve prompts settings.
   * Get prompts settings
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
   * Update prompts settings.
   * Update prompts settings
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
   * Set template partials for a specific prompt. Existing partials will be overwritten.
   * Set template partials for a specific prompt
   *
   * @throws {RequiredError}
   */
  async updateTemplatePartialsByPrompt(
    requestParameters: PutTeplatePartialsByPromptRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
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

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
