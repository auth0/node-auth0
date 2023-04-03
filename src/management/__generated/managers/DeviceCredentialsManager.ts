/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  DeviceCredentialCreate,
  GetDeviceCredentials200Response,
  PostDeviceCredentials201Response,
} from '../models';

export interface DeleteDeviceCredentialsByIdRequest {
  id: string;
}

export interface GetDeviceCredentialsRequest {
  page?: number;
  per_page?: number;
  include_totals?: boolean;
  fields?: string;
  include_fields?: boolean;
  user_id?: string;
  client_id?: string;
  type?: GetDeviceCredentialsTypeEnum;
}

/**
 *
 */
export class DeviceCredentialsManager extends runtime.BaseAPI {
  /**
   * Delete a device credential.
   * Delete a device credential
   * @throws {RequiredError}
   * @memberof DeviceCredentialsManager
   */
  async deleteRaw(
    requestParameters: DeleteDeviceCredentialsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling delete.'
      );
    }

    const response = await this.request(
      {
        path: `/device-credentials/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Device Credentials relate to refresh tokens and rotating refresh tokens for a given user_id.<br/><br/>Note: Device Credentials APIs are designed for ad-hoc administrative use only, and paging is by default enabled for GET requests.<br/>Note: When Refresh Token Rotation is enabled, the endpoint becomes eventual consistent.<br/>
   * Retrieve device credentials
   * @throws {RequiredError}
   * @memberof DeviceCredentialsManager
   */
  async getAllRaw(
    requestParameters: GetDeviceCredentialsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetDeviceCredentials200Response>> {
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    if (requestParameters.user_id !== undefined) {
      queryParameters['user_id'] = requestParameters.user_id;
    }

    if (requestParameters.client_id !== undefined) {
      queryParameters['client_id'] = requestParameters.client_id;
    }

    if (requestParameters.type !== undefined) {
      queryParameters['type'] = requestParameters.type;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetDeviceCredentials200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Device Credentials relate to refresh tokens and rotating refresh tokens for a given user_id.<br/><br/>Note: Device Credentials APIs are designed for ad-hoc administrative use only, and paging is by default enabled for GET requests.<br/>Note: When Refresh Token Rotation is enabled, the endpoint becomes eventual consistent.<br/>
   * Create a device public key credential
   * @throws {RequiredError}
   * @memberof DeviceCredentialsManager
   */
  async createPublicKeyRaw(
    bodyParameters: DeviceCredentialCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostDeviceCredentials201Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
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
