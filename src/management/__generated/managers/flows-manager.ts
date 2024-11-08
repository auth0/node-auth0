import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetFlows200Response,
  GetFlowsExecutions200Response,
  GetFlowsExecutionsByExecutionId200Response,
  GetFlowsVaultConnections200Response,
  PatchFlowsByIdRequest,
  PatchFlowsVaultConnectionsByIdRequest,
  PostFlows201Response,
  PostFlowsRequest,
  PostFlowsVaultConnections201Response,
  PostFlowsVaultConnectionsRequest,
  GetFlows200ResponseOneOf,
  GetFlows200ResponseOneOfInner,
  GetFlowsExecutions200ResponseOneOf,
  GetFlowsExecutions200ResponseOneOfInner,
  GetFlowsVaultConnections200ResponseOneOf,
  GetFlowsVaultConnections200ResponseOneOfInner,
  DeleteFlowsByIdRequest,
  DeleteFlowsExecutionsByExecutionIdRequest,
  DeleteFlowsVaultConnectionsByIdRequest,
  GetFlowsRequest,
  GetFlowsByIdRequest,
  GetFlowsExecutionsRequest,
  GetFlowsExecutionsByExecutionIdRequest,
  GetFlowsVaultConnectionsRequest,
  GetFlowsVaultConnectionsByIdRequest,
  PatchFlowsByIdOperationRequest,
  PatchFlowsVaultConnectionsByIdOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class FlowsManager extends BaseAPI {
  /**
   * Delete a flow
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteFlowsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/flows/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete a flow execution
   *
   * @throws {RequiredError}
   */
  async deleteExecution(
    requestParameters: DeleteFlowsExecutionsByExecutionIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['flow_id', 'execution_id']);

    const response = await this.request(
      {
        path: `/flows/{flow_id}/executions/{execution_id}`
          .replace('{flow_id}', encodeURIComponent(String(requestParameters.flow_id)))
          .replace('{execution_id}', encodeURIComponent(String(requestParameters.execution_id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete a Flows Vault connection
   *
   * @throws {RequiredError}
   */
  async deleteConnection(
    requestParameters: DeleteFlowsVaultConnectionsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/flows/vault/connections/{id}`.replace(
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
   * Get flows
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetFlowsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetFlows200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetFlowsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetFlows200ResponseOneOfInner>>>;
  async getAll(
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
  async get(
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
   * Get flow executions
   *
   * @throws {RequiredError}
   */
  async getAllExecutions(
    requestParameters: GetFlowsExecutionsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetFlowsExecutions200ResponseOneOf>>;
  async getAllExecutions(
    requestParameters?: GetFlowsExecutionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetFlowsExecutions200ResponseOneOfInner>>>;
  async getAllExecutions(
    requestParameters: GetFlowsExecutionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetFlowsExecutions200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['flow_id']);

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
        key: 'from',
        config: {},
      },
      {
        key: 'take',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/flows/{flow_id}/executions`.replace(
          '{flow_id}',
          encodeURIComponent(String(requestParameters.flow_id))
        ),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get a flow execution
   *
   * @throws {RequiredError}
   */
  async getExecution(
    requestParameters: GetFlowsExecutionsByExecutionIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetFlowsExecutionsByExecutionId200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['flow_id', 'execution_id']);

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
        path: `/flows/{flow_id}/executions/{execution_id}`
          .replace('{flow_id}', encodeURIComponent(String(requestParameters.flow_id)))
          .replace('{execution_id}', encodeURIComponent(String(requestParameters.execution_id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get Flows Vault connection list
   *
   * @throws {RequiredError}
   */
  async getAllConnections(
    requestParameters: GetFlowsVaultConnectionsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetFlowsVaultConnections200ResponseOneOf>>;
  async getAllConnections(
    requestParameters?: GetFlowsVaultConnectionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetFlowsVaultConnections200ResponseOneOfInner>>>;
  async getAllConnections(
    requestParameters: GetFlowsVaultConnectionsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetFlowsVaultConnections200Response>> {
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
    ]);

    const response = await this.request(
      {
        path: `/flows/vault/connections`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Get a Flows Vault connection
   *
   * @throws {RequiredError}
   */
  async getConnection(
    requestParameters: GetFlowsVaultConnectionsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostFlowsVaultConnections201Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/flows/vault/connections/{id}`.replace(
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
   * Update a flow
   *
   * @throws {RequiredError}
   */
  async update(
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
   * Update a Flows Vault connection
   *
   * @throws {RequiredError}
   */
  async updateConnection(
    requestParameters: PatchFlowsVaultConnectionsByIdOperationRequest,
    bodyParameters: PatchFlowsVaultConnectionsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostFlowsVaultConnections201Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/flows/vault/connections/{id}`.replace(
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
   * Create a flow
   *
   * @throws {RequiredError}
   */
  async create(
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

  /**
   * Create a Flows Vault connection
   *
   * @throws {RequiredError}
   */
  async createConnection(
    bodyParameters: PostFlowsVaultConnectionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostFlowsVaultConnections201Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/flows/vault/connections`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
