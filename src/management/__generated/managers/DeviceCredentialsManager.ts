import * as runtime from '../../runtime';
import type { InitOverride, InitOverrideFunction, ApiResponse } from '../../../../../src/runtime';
import type {
  DeviceCredentialCreate,
  GetDeviceCredentials200Response,
  PostDeviceCredentials201Response,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteDeviceCredentialsByIdRequest {
  /**
   * ID of the credential to delete.
   * @type {string}
   */
  id: string;
}

export interface GetDeviceCredentialsRequest {
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page.  There is a maximum of 1000 results allowed from this endpoint.
   * @type {number}
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   * @type {string}
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   * @type {boolean}
   */
  include_fields?: boolean;
  /**
   * user_id of the devices to retrieve.
   * @type {string}
   */
  user_id?: string;
  /**
   * client_id of the devices to retrieve.
   * @type {string}
   */
  client_id?: string;
  /**
   * Type of credentials to retrieve. Must be `public_key`, `refresh_token` or `rotating_refresh_token`. The property will default to `refresh_token` when paging is requested
   * @type {GetDeviceCredentialsTypeEnum}
   */
  type?: GetDeviceCredentialsTypeEnum;
}

/**
 *
 */
export class DeviceCredentialsManager extends BaseAPI {
  /**
   * Delete a device credential.
   * Delete a device credential
   * @throws {RequiredError}
   */
  async deleteRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a device credential.
   * Delete a device credential
   */
  async delete(
    requestParameters: DeleteDeviceCredentialsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Device Credentials relate to refresh tokens and rotating refresh tokens for a given user_id.
   *
   * Note: Device Credentials APIs are designed for ad-hoc administrative use only, and paging is by default enabled for GET requests.
   * Note: When Refresh Token Rotation is enabled, the endpoint becomes eventual consistent.
   *
   * Retrieve device credentials
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetDeviceCredentialsRequest,
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Device Credentials relate to refresh tokens and rotating refresh tokens for a given user_id.<br/><br/>Note: Device Credentials APIs are designed for ad-hoc administrative use only, and paging is by default enabled for GET requests.<br/>Note: When Refresh Token Rotation is enabled, the endpoint becomes eventual consistent.<br/>
   * Retrieve device credentials
   */
  async getAll(
    requestParameters: GetDeviceCredentialsRequest = {},
    initOverrides?: InitOverride
  ): Promise<GetDeviceCredentials200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Device Credentials relate to refresh tokens and rotating refresh tokens for a given user_id.
   *
   * Note: Device Credentials APIs are designed for ad-hoc administrative use only, and paging is by default enabled for GET requests.
   * Note: When Refresh Token Rotation is enabled, the endpoint becomes eventual consistent.
   *
   * Create a device public key credential
   * @throws {RequiredError}
   */
  async createPublicKeyRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Device Credentials relate to refresh tokens and rotating refresh tokens for a given user_id.<br/><br/>Note: Device Credentials APIs are designed for ad-hoc administrative use only, and paging is by default enabled for GET requests.<br/>Note: When Refresh Token Rotation is enabled, the endpoint becomes eventual consistent.<br/>
   * Create a device public key credential
   */
  async createPublicKey(
    bodyParameters: DeviceCredentialCreate,
    initOverrides?: InitOverride
  ): Promise<PostDeviceCredentials201Response> {
    const response = await this.createPublicKeyRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}

/**
 * @export
 */
export const GetDeviceCredentialsTypeEnum = {
  public_key: 'public_key',
  refresh_token: 'refresh_token',
  rotating_refresh_token: 'rotating_refresh_token',
} as const;
export type GetDeviceCredentialsTypeEnum =
  typeof GetDeviceCredentialsTypeEnum[keyof typeof GetDeviceCredentialsTypeEnum];
