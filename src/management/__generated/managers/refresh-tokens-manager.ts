import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetRefreshToken200Response,
  DeleteRefreshTokenRequest,
  GetRefreshTokenRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class RefreshTokensManager extends BaseAPI {
  /**
   * Delete a refresh token by its ID.
   * Delete a refresh tokens
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteRefreshTokenRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/refresh-tokens/{id}`.replace(
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
   * Retrieve refresh token information.
   * Get a refresh token
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetRefreshTokenRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetRefreshToken200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/refresh-tokens/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
