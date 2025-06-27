import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetForms200Response,
  PatchFormsByIdRequest,
  PostForms201Response,
  PostFormsRequest,
  GetForms200ResponseOneOf,
  GetForms200ResponseOneOfInner,
  DeleteFormsByIdRequest,
  GetFormsRequest,
  GetFormsByIdRequest,
  PatchFormsByIdOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class FormsManager extends BaseAPI {
  /**
   * Delete a form
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteFormsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/forms/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Get forms
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetFormsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetForms200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetFormsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetForms200ResponseOneOfInner>>>;
  async getAll(
    requestParameters: GetFormsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetForms200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
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
        key: 'hydrate',
        config: {
          isArray: true,
          isCollectionFormatMulti: true,
        },
      },
    ]);

    const response = await this.request(
      {
        path: `/forms`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get a form
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetFormsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostForms201Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'hydrate',
        config: {
          isArray: true,
          isCollectionFormatMulti: true,
        },
      },
    ]);

    const response = await this.request(
      {
        path: `/forms/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update a form
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchFormsByIdOperationRequest,
    bodyParameters: PatchFormsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostForms201Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/forms/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a form
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: PostFormsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostForms201Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/forms`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
