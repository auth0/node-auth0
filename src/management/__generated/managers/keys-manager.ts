import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetSigningKeys200ResponseInner,
  PostSigningKeys201Response,
  PutSigningKeys200Response,
  GetSigningKeyRequest,
  PutSigningKeysRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class KeysManager extends BaseAPI {
  /**
   * Retrieve details of the application signing key with the given ID.
   * Get an Application Signing Key by its key id
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetSigningKeyRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetSigningKeys200ResponseInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['kid']);

    const response = await this.request(
      {
        path: `/keys/signing/{kid}`.replace(
          '{kid}',
          encodeURIComponent(String(requestParameters.kid))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details of all the application signing keys associated with your tenant.
   * Get all Application Signing Keys
   *
   * @throws {RequiredError}
   */
  async getAll(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetSigningKeys200ResponseInner>>> {
    const response = await this.request(
      {
        path: `/keys/signing`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Rotate the application signing key of your tenant.
   * Rotate the Application Signing Key
   *
   * @throws {RequiredError}
   */
  async rotate(initOverrides?: InitOverride): Promise<ApiResponse<PostSigningKeys201Response>> {
    const response = await this.request(
      {
        path: `/keys/signing/rotate`,
        method: 'POST',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Revoke the application signing key with the given ID.
   * Revoke an Application Signing Key by its key id
   *
   * @throws {RequiredError}
   */
  async revoke(
    requestParameters: PutSigningKeysRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutSigningKeys200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['kid']);

    const response = await this.request(
      {
        path: `/keys/signing/{kid}/revoke`.replace(
          '{kid}',
          encodeURIComponent(String(requestParameters.kid))
        ),
        method: 'PUT',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
