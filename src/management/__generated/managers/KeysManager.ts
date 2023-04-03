/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  GetSigningKeys200ResponseInner,
  PostSigningKeys201Response,
  PutSigningKeys200Response,
} from '../models';

export interface GetSigningKeyRequest {
  kid: string;
}

export interface PutSigningKeysRequest {
  kid: string;
}

/**
 *
 */
export class KeysManager extends runtime.BaseAPI {
  /**
   * Get an Application Signing Key by its key id
   * Get an Application Signing Key by its key id
   * @throws {RequiredError}
   * @memberof KeysManager
   */
  async getRaw(
    requestParameters: GetSigningKeyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetSigningKeys200ResponseInner>> {
    if (requestParameters.kid === null || requestParameters.kid === undefined) {
      throw new runtime.RequiredError(
        'kid',
        'Required parameter requestParameters.kid was null or undefined when calling get.'
      );
    }

    const response = await this.request(
      {
        path: `/keys/signing/{kid}`.replace(
          `{${'kid'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetSigningKeys200ResponseInner> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get all Application Signing Keys
   * Get all Application Signing Keys
   * @throws {RequiredError}
   * @memberof KeysManager
   */
  async getAllRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<GetSigningKeys200ResponseInner>>> {
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
  async getAll(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<GetSigningKeys200ResponseInner>> {
    const response = await this.getAllRaw(initOverrides);
    return await response.value();
  }

  /**
   * Rotate the Application Signing Key
   * Rotate the Application Signing Key
   * @throws {RequiredError}
   * @memberof KeysManager
   */
  async rotateRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostSigningKeys201Response>> {
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
  async rotate(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostSigningKeys201Response> {
    const response = await this.rotateRaw(initOverrides);
    return await response.value();
  }

  /**
   * Revoke an Application Signing Key by its key id
   * Revoke an Application Signing Key by its key id
   * @throws {RequiredError}
   * @memberof KeysManager
   */
  async revokeRaw(
    requestParameters: PutSigningKeysRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PutSigningKeys200Response>> {
    if (requestParameters.kid === null || requestParameters.kid === undefined) {
      throw new runtime.RequiredError(
        'kid',
        'Required parameter requestParameters.kid was null or undefined when calling revoke.'
      );
    }

    const response = await this.request(
      {
        path: `/keys/signing/{kid}/revoke`.replace(
          `{${'kid'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PutSigningKeys200Response> {
    const response = await this.revokeRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
