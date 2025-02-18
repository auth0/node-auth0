import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetEncryptionKeys200Response,
  GetEncryptionKeys200ResponseOneOfInner,
  GetSigningKeys200ResponseInner,
  PostEncryptionKeyRequest,
  PostEncryptionRequest,
  PostEncryptionWrappingKey201Response,
  PostSigningKeys201Response,
  PutSigningKeys200Response,
  GetEncryptionKeys200ResponseOneOf,
  DeleteEncryptionKeyRequest,
  GetEncryptionKeyRequest,
  GetEncryptionKeysRequest,
  GetSigningKeyRequest,
  PostEncryptionKeyOperationRequest,
  PostEncryptionWrappingKeyRequest,
  PutSigningKeysRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class KeysManager extends BaseAPI {
  /**
   * Delete the custom provided encryption key with the given ID and move back to using native encryption key.
   * Delete the encryption key by its key id
   *
   * @throws {RequiredError}
   */
  async deleteEncryptionKey(
    requestParameters: DeleteEncryptionKeyRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['kid']);

    const response = await this.request(
      {
        path: `/keys/encryption/{kid}`.replace(
          '{kid}',
          encodeURIComponent(String(requestParameters.kid))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details of the encryption key with the given ID.
   * Get the encryption key by its key id
   *
   * @throws {RequiredError}
   */
  async getEncryptionKey(
    requestParameters: GetEncryptionKeyRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEncryptionKeys200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['kid']);

    const response = await this.request(
      {
        path: `/keys/encryption/{kid}`.replace(
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
   * Retrieve details of all the encryption keys associated with your tenant.
   * Get all encryption keys
   *
   * @throws {RequiredError}
   */
  async getAllEncryptionKeys(
    requestParameters: GetEncryptionKeysRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEncryptionKeys200ResponseOneOf>>;
  async getAllEncryptionKeys(
    requestParameters?: GetEncryptionKeysRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<GetEncryptionKeys200ResponseOneOfInner>>>;
  async getAllEncryptionKeys(
    requestParameters: GetEncryptionKeysRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEncryptionKeys200Response>> {
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
        path: `/keys/encryption`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
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
   * Create the new, pre-activated encryption key, without the key material.
   * Create the new encryption key
   *
   * @throws {RequiredError}
   */
  async createEncryptionKey(
    bodyParameters: PostEncryptionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEncryptionKeys200ResponseOneOfInner>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/keys/encryption`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Import wrapped key material and activate encryption key.
   * Import the encryption key
   *
   * @throws {RequiredError}
   */
  async importEncryptionKey(
    requestParameters: PostEncryptionKeyOperationRequest,
    bodyParameters: PostEncryptionKeyRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetEncryptionKeys200ResponseOneOfInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['kid']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/keys/encryption/{kid}`.replace(
          '{kid}',
          encodeURIComponent(String(requestParameters.kid))
        ),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Perform rekeying operation on the key hierarchy.
   * Rekey the key hierarchy
   *
   * @throws {RequiredError}
   */
  async postEncryptionRekey(initOverrides?: InitOverride): Promise<ApiResponse<void>> {
    const response = await this.request(
      {
        path: `/keys/encryption/rekey`,
        method: 'POST',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Create the public wrapping key to wrap your own encryption key material.
   * Create the public wrapping key
   *
   * @throws {RequiredError}
   */
  async createPublicWrappingKey(
    requestParameters: PostEncryptionWrappingKeyRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostEncryptionWrappingKey201Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['kid']);

    const response = await this.request(
      {
        path: `/keys/encryption/{kid}/wrapping-key`.replace(
          '{kid}',
          encodeURIComponent(String(requestParameters.kid))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
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
