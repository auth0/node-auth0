import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetSession200Response,
  DeleteSessionRequest,
  RevokeSessionRequest,
  GetSessionRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class SessionsManager extends BaseAPI {
  /**
   * Delete a session by ID.
   * Delete session
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteSessionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/sessions/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Revokes a session by ID and all associated refresh tokens.
   *
   * @throws {RequiredError}
   */
  async revoke(
    requestParameters: RevokeSessionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/sessions/{id}/revoke`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve session information.
   * Get session
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetSessionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetSession200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/sessions/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
