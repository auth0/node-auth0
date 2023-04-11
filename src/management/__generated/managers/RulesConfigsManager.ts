import * as runtime from '../../runtime';
import type { InitOverrideFunction, ApiResponse } from '../../runtime';
import type {
  GetRulesConfigs200ResponseInner,
  PutRulesConfigsByKey200Response,
  PutRulesConfigsByKeyRequest,
} from '../models';

const { BaseAPI } = runtime;

export type InitOverrides = RequestInit | InitOverrideFunction;

export interface DeleteRulesConfigsByKeyRequest {
  /**
   * Key of the rules config variable to delete.
   * @type {string}
   */
  key: string;
}

export interface PutRulesConfigsByKeyOperationRequest {
  /**
   * Key of the rules config variable to set (max length: 127 characters).
   * @type {string}
   */
  key: string;
}

/**
 *
 */
export class RulesConfigsManager extends BaseAPI {
  /**
   * Delete a rules config variable identified by its key.
   * Delete rules config for a given key
   * @throws {RequiredError}
   */
  async deleteRaw(
    requestParameters: DeleteRulesConfigsByKeyRequest,
    initOverrides?: InitOverrides
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a rules config variable identified by its key.
   * Delete rules config for a given key
   */
  async delete(
    requestParameters: DeleteRulesConfigsByKeyRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve rules config variable keys.
   *
   *     Note: For security, config variable values cannot be retrieved outside rule execution.
   * Retrieve config variable keys for rules (get_rules-configs)
   * @throws {RequiredError}
   */
  async getAllRaw(
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<Array<GetRulesConfigs200ResponseInner>>> {
    const response = await this.request(
      {
        path: `/rules-configs`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve rules config variable keys.<br/><br/>    Note: For security, config variable values cannot be retrieved outside rule execution.
   * Retrieve config variable keys for rules (get_rules-configs)
   */
  async getAll(initOverrides?: InitOverrides): Promise<Array<GetRulesConfigs200ResponseInner>> {
    const response = await this.getAllRaw(initOverrides);
    return await response.value();
  }

  /**
   * Sets a rules config variable.
   * Set rules config for a given key
   * @throws {RequiredError}
   */
  async setRaw(
    requestParameters: PutRulesConfigsByKeyOperationRequest,
    bodyParameters: PutRulesConfigsByKeyRequest,
    initOverrides?: InitOverrides
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Sets a rules config variable.
   * Set rules config for a given key
   */
  async set(
    requestParameters: PutRulesConfigsByKeyOperationRequest,
    bodyParameters: PutRulesConfigsByKeyRequest,
    initOverrides?: InitOverrides
  ): Promise<PutRulesConfigsByKey200Response> {
    const response = await this.setRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }
}
