/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  GetResourceServers200Response,
  PostResourceServersRequest,
  ResourceServer,
  ResourceServerUpdate,
} from '../models';

export interface DeleteResourceServersByIdRequest {
  id: string;
}

export interface GetResourceServersRequest {
  page?: number;
  per_page?: number;
  include_totals?: boolean;
  include_fields?: boolean;
}

export interface GetResourceServersByIdRequest {
  id: string;
  include_fields?: boolean;
}

export interface PatchResourceServersByIdRequest {
  id: string;
}

/**
 *
 */
export class ResourceServersManager extends runtime.BaseAPI {
  /**
   * Delete an existing API (also known as a resource server).
   * Delete a resource server
   * @throws {RequiredError}
   * @memberof ResourceServersManager
   */
  async deleteRaw(
    requestParameters: DeleteResourceServersByIdRequest,
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
        path: `/resource-servers/{id}`.replace(
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
   * Delete an existing API (also known as a resource server).
   * Delete a resource server
   */
  async delete(
    requestParameters: DeleteResourceServersByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/apis\">APIs</a> (also known as resource servers) that you can consume from your authorized applications.
   * Get resource servers
   * @throws {RequiredError}
   * @memberof ResourceServersManager
   */
  async getAllRaw(
    requestParameters: GetResourceServersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetResourceServers200Response>> {
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

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    const response = await this.request(
      {
        path: `/resource-servers`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/apis\">APIs</a> (also known as resource servers) that you can consume from your authorized applications.
   * Get resource servers
   */
  async getAll(
    requestParameters: GetResourceServersRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetResourceServers200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve an <a href=\"https://auth0.com/docs/apis\">API</a> (also known as resource server).
   * Get a resource server
   * @throws {RequiredError}
   * @memberof ResourceServersManager
   */
  async getRaw(
    requestParameters: GetResourceServersByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ResourceServer>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    const response = await this.request(
      {
        path: `/resource-servers/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve an <a href=\"https://auth0.com/docs/apis\">API</a> (also known as resource server).
   * Get a resource server
   */
  async get(
    requestParameters: GetResourceServersByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ResourceServer> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an existing API (also known as a resource server).
   * Update a resource server
   * @throws {RequiredError}
   * @memberof ResourceServersManager
   */
  async updateRaw(
    requestParameters: PatchResourceServersByIdRequest,
    bodyParameters: ResourceServerUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
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
        path: `/resource-servers/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Update an existing API (also known as a resource server).
   * Update a resource server
   */
  async update(
    requestParameters: PatchResourceServersByIdRequest,
    bodyParameters: ResourceServerUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.updateRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Create a new API (also known as a resource server).
   * Create a resource server
   * @throws {RequiredError}
   * @memberof ResourceServersManager
   */
  async createRaw(
    bodyParameters: PostResourceServersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/resource-servers`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Create a new API (also known as a resource server).
   * Create a resource server
   */
  async create(
    bodyParameters: PostResourceServersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.createRaw(bodyParameters, initOverrides);
  }
}
