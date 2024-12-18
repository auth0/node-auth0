import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  DeviceCredentialCreate,
  GetDeviceCredentials200Response,
  PostDeviceCredentials201Response,
  GetDeviceCredentials200ResponseOneOf,
  DeviceCredential,
  DeleteDeviceCredentialsByIdRequest,
  GetDeviceCredentialsRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class DeviceCredentialsManager extends BaseAPI {
  /**
   * Permanently delete a device credential (such as a refresh token or public key) with the given ID.
   * Delete a device credential
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteDeviceCredentialsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/device-credentials/{id}`.replace(
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
   * Retrieve device credential information (<code>public_key</code>, <code>refresh_token</code>, or <code>rotating_refresh_token</code>) associated with a specific user.
   *
   * Retrieve device credentials
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetDeviceCredentialsRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetDeviceCredentials200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetDeviceCredentialsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<DeviceCredential>>>;
  async getAll(
    requestParameters: GetDeviceCredentialsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetDeviceCredentials200Response>> {
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
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
      {
        key: 'user_id',
        config: {},
      },
      {
        key: 'client_id',
        config: {},
      },
      {
        key: 'type',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/device-credentials`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a device credential public key to manage refresh token rotation for a given <code>user_id</code>. Device Credentials APIs are designed for ad-hoc administrative use only and paging is by default enabled for GET requests.
   *
   * When refresh token rotation is enabled, the endpoint becomes consistent. For more information, read <a href="https://auth0.com/docs/get-started/tenant-settings/signing-keys"> Signing Keys</a>.
   *
   * Create a device public key credential
   *
   * @throws {RequiredError}
   */
  async createPublicKey(
    bodyParameters: DeviceCredentialCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostDeviceCredentials201Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/device-credentials`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
