import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type {
  GetSigningKeys200ResponseInner,
  PostSigningKeys201Response,
  PutSigningKeys200Response,
} from '../models';

const { BaseAPI } = runtime;

export interface GetSigningKeyRequest {
  /**
   * Key id of the key to retrieve
   * @type {string}
   */
  kid: string;
}

export interface PutSigningKeysRequest {
  /**
   * Key id of the key to revoke
   * @type {string}
   */
  kid: string;
}

/**
 *
 */
export class KeysManager extends BaseAPI {
  /**
   * Get an Application Signing Key by its key id
   * Get an Application Signing Key by its key id
   * @throws {RequiredError}
   */
  async getRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get an Application Signing Key by its key id
   * Get an Application Signing Key by its key id
   */
  async get(
    requestParameters: GetSigningKeyRequest,
    initOverrides?: InitOverride
  ): Promise<GetSigningKeys200ResponseInner> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get all Application Signing Keys
   * Get all Application Signing Keys
   * @throws {RequiredError}
   */
  async getAllRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetSigningKeys200ResponseInner>>> {
    const response = await this.request(
      {
        path: `/keys/signing`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get all Application Signing Keys
   * Get all Application Signing Keys
   */
  async getAll(initOverrides?: InitOverride): Promise<Array<GetSigningKeys200ResponseInner>> {
    const response = await this.getAllRaw(initOverrides);
    return await response.value();
  }

  /**
   * Rotate the Application Signing Key
   * Rotate the Application Signing Key
   * @throws {RequiredError}
   */
  async rotateRaw(initOverrides?: InitOverride): Promise<ApiResponse<PostSigningKeys201Response>> {
    const response = await this.request(
      {
        path: `/keys/signing/rotate`,
        method: 'POST',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Rotate the Application Signing Key
   * Rotate the Application Signing Key
   */
  async rotate(initOverrides?: InitOverride): Promise<PostSigningKeys201Response> {
    const response = await this.rotateRaw(initOverrides);
    return await response.value();
  }

  /**
   * Revoke an Application Signing Key by its key id
   * Revoke an Application Signing Key by its key id
   * @throws {RequiredError}
   */
  async revokeRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Revoke an Application Signing Key by its key id
   * Revoke an Application Signing Key by its key id
   */
  async revoke(
    requestParameters: PutSigningKeysRequest,
    initOverrides?: InitOverride
  ): Promise<PutSigningKeys200Response> {
    const response = await this.revokeRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
