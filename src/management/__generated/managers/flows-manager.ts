import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetFlows200Response,
  PatchFlowsByIdRequest,
  PostFlows201Response,
  PostFlowsRequest,
  GetFlows200ResponseOneOf,
  GetFlows200ResponseOneOfInner,
  GetFlowsRequest,
  GetFlowsByIdRequest,
  PatchFlowsByIdOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class FlowsManager extends BaseAPI {
  /**
   * Get flows
   *
   * @throws {RequiredError}
   */
  async getFlows(
    requestParameters: GetFlowsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetFlows200ResponseOneOf>>;
  async getFlows(
    requestParameters?: GetFlowsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetFlows200ResponseOneOfInner>>>;
  async getFlows(
    requestParameters: GetFlowsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetFlows200Response>> {
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
      {
        key: 'synchronous',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/flows`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get a flow
   *
   * @throws {RequiredError}
   */
  async getFlowsById(
    requestParameters: GetFlowsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostFlows201Response>> {
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
        path: `/flows/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update a flow
   *
   * @throws {RequiredError}
   */
  async patchFlowsById(
    requestParameters: PatchFlowsByIdOperationRequest,
    bodyParameters: PatchFlowsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostFlows201Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/flows/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a flow
   *
   * @throws {RequiredError}
   */
  async postFlows(
    bodyParameters: PostFlowsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostFlows201Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/flows`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
