/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  ClientGrant,
  ClientGrantCreate,
  GetClientGrants200Response,
  PatchClientGrantsByIdRequest,
} from '../models';

export interface DeleteClientGrantsByIdRequest {
  id: string;
}

export interface GetClientGrantsRequest {
  per_page?: number;
  page?: number;
  include_totals?: boolean;
  audience?: string;
  client_id?: string;
}

export interface PatchClientGrantsByIdOperationRequest {
  id: string;
}

/**
 *
 */
export class ClientGrantsManager extends runtime.BaseAPI {
  /**
   * Delete a client grant.
   * Delete client grant
   * @throws {RequiredError}
   * @memberof ClientGrantsManager
   */
  async deleteRaw(
    requestParameters: DeleteClientGrantsByIdRequest,
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
        path: `/client-grants/{id}`.replace(
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
   * Delete a client grant.
   * Delete client grant
   */
  async delete(
    requestParameters: DeleteClientGrantsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/api-auth/grant/client-credentials\">client grants</a>.<br/>
   * Get client grants
   * @throws {RequiredError}
   * @memberof ClientGrantsManager
   */
  async getAllRaw(
    requestParameters: GetClientGrantsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetClientGrants200Response>> {
    const queryParameters: any = {};

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.include_totals !== undefined) {
      queryParameters['include_totals'] = requestParameters.include_totals;
    }

    if (requestParameters.audience !== undefined) {
      queryParameters['audience'] = requestParameters.audience;
    }

    if (requestParameters.client_id !== undefined) {
      queryParameters['client_id'] = requestParameters.client_id;
    }

    const response = await this.request(
      {
        path: `/client-grants`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/api-auth/grant/client-credentials\">client grants</a>.<br/>
   * Get client grants
   */
  async getAll(
    requestParameters: GetClientGrantsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetClientGrants200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update a client grant.
   * Update client grant
   * @throws {RequiredError}
   * @memberof ClientGrantsManager
   */
  async updateRaw(
    requestParameters: PatchClientGrantsByIdOperationRequest,
    bodyParameters: PatchClientGrantsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ClientGrant>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling update.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/client-grants/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update a client grant.
   * Update client grant
   */
  async update(
    requestParameters: PatchClientGrantsByIdOperationRequest,
    bodyParameters: PatchClientGrantsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ClientGrant> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a client grant.
   * Create client grant
   * @throws {RequiredError}
   * @memberof ClientGrantsManager
   */
  async createRaw(
    bodyParameters: ClientGrantCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/client-grants`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Create a client grant.
   * Create client grant
   */
  async create(
    bodyParameters: ClientGrantCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.createRaw(bodyParameters, initOverrides);
  }
}
