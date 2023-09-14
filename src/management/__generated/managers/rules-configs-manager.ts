import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetRulesConfigs200ResponseInner,
  PutRulesConfigsByKey200Response,
  PutRulesConfigsByKeyRequest,
  DeleteRulesConfigsByKeyRequest,
  PutRulesConfigsByKeyOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class RulesConfigsManager extends BaseAPI {
  /**
   * Delete a rules config variable identified by its key.
   * Delete rules config for a given key
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteRulesConfigsByKeyRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['key']);

    const response = await this.request(
      {
        path: `/rules-configs/{key}`.replace(
          '{key}',
          encodeURIComponent(String(requestParameters.key))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve rules config variable keys.
   *
   *     Note: For security, config variable values cannot be retrieved outside rule execution.
   * Retrieve config variable keys for rules (get_rules-configs)
   *
   * @throws {RequiredError}
   */
  async getAll(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetRulesConfigs200ResponseInner>>> {
    const response = await this.request(
      {
        path: `/rules-configs`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Sets a rules config variable.
   * Set rules config for a given key
   *
   * @throws {RequiredError}
   */
  async set(
    requestParameters: PutRulesConfigsByKeyOperationRequest,
    bodyParameters: PutRulesConfigsByKeyRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutRulesConfigsByKey200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['key']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/rules-configs/{key}`.replace(
          '{key}',
          encodeURIComponent(String(requestParameters.key))
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
