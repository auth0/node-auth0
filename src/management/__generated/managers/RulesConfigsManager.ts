/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  GetRulesConfigs200ResponseInner,
  PutRulesConfigsByKey200Response,
  PutRulesConfigsByKeyRequest,
} from '../models';

export interface DeleteRulesConfigsByKeyRequest {
  key: string;
}

export interface PutRulesConfigsByKeyOperationRequest {
  key: string;
}

/**
 *
 */
export class RulesConfigsManager extends runtime.BaseAPI {
  /**
   * Delete a rules config variable identified by its key.
   * Delete rules config for a given key
   * @throws {RequiredError}
   * @memberof RulesConfigsManager
   */
  async deleteRaw(
    requestParameters: DeleteRulesConfigsByKeyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.key === null || requestParameters.key === undefined) {
      throw new runtime.RequiredError(
        'key',
        'Required parameter requestParameters.key was null or undefined when calling delete.'
      );
    }

    const response = await this.request(
      {
        path: `/rules-configs/{key}`.replace(
          `{${'key'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve rules config variable keys.<br/><br/>    Note: For security, config variable values cannot be retrieved outside rule execution.
   * Retrieve config variable keys for rules (get_rules-configs)
   * @throws {RequiredError}
   * @memberof RulesConfigsManager
   */
  async getAllRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<GetRulesConfigs200ResponseInner>>> {
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
  async getAll(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<GetRulesConfigs200ResponseInner>> {
    const response = await this.getAllRaw(initOverrides);
    return await response.value();
  }

  /**
   * Sets a rules config variable.
   * Set rules config for a given key
   * @throws {RequiredError}
   * @memberof RulesConfigsManager
   */
  async setRaw(
    requestParameters: PutRulesConfigsByKeyOperationRequest,
    bodyParameters: PutRulesConfigsByKeyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PutRulesConfigsByKey200Response>> {
    if (requestParameters.key === null || requestParameters.key === undefined) {
      throw new runtime.RequiredError(
        'key',
        'Required parameter requestParameters.key was null or undefined when calling set.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/rules-configs/{key}`.replace(
          `{${'key'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PutRulesConfigsByKey200Response> {
    const response = await this.setRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }
}
