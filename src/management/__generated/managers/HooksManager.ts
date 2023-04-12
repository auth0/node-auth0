import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { GetHooks200Response, Hook, HookCreate, HookUpdate } from '../models';

const { BaseAPI } = runtime;

export interface DeleteHooksByIdRequest {
  /**
   * ID of the hook to delete.
   * @type {string}
   */
  id: string;
}

export interface DeleteSecretsRequest {
  /**
   * ID of the hook whose secrets to delete.
   * @type {string}
   */
  id: string;
}

export interface GetHooksRequest {
  /**
   * Page index of the results to return. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   * @type {number}
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   * @type {boolean}
   */
  include_totals?: boolean;
  /**
   * Optional filter on whether a hook is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Comma-separated list of fields to include in the result. Leave empty to retrieve all fields.
   * @type {string}
   */
  fields?: string;
  /**
   * Retrieves hooks that match the trigger
   * @type {GetHooksTriggerIdEnum}
   */
  triggerId?: GetHooksTriggerIdEnum;
}

export interface GetHooksByIdRequest {
  /**
   * ID of the hook to retrieve.
   * @type {string}
   */
  id: string;
  /**
   * Comma-separated list of fields to include in the result. Leave empty to retrieve all fields.
   * @type {string}
   */
  fields?: string;
}

export interface GetSecretsRequest {
  /**
   * ID of the hook to retrieve secrets from.
   * @type {string}
   */
  id: string;
}

export interface PatchHooksByIdRequest {
  /**
   * ID of the hook to update.
   * @type {string}
   */
  id: string;
}

export interface PatchSecretsRequest {
  /**
   * ID of the hook whose secrets to update.
   * @type {string}
   */
  id: string;
}

export interface PostSecretsRequest {
  /**
   * The id of the hook to retrieve
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class HooksManager extends BaseAPI {
  /**
   * Delete a hook.
   *
   * Delete a hook
   * @throws {RequiredError}
   */
  async deleteRaw(
    requestParameters: DeleteHooksByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/hooks/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a hook.<br/>
   * Delete a hook
   */
  async delete(
    requestParameters: DeleteHooksByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Delete one or more existing secrets for a given hook. Accepts an array of secret names to delete.
   * Delete hook secrets
   * @throws {RequiredError}
   */
  async deleteSecretsRaw(
    requestParameters: DeleteSecretsRequest,
    bodyParameters: Array<string>,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/hooks/{id}/secrets`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete one or more existing secrets for a given hook. Accepts an array of secret names to delete.
   * Delete hook secrets
   */
  async deleteSecrets(
    requestParameters: DeleteSecretsRequest,
    bodyParameters: Array<string>,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteSecretsRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Retrieve all <a href="https://auth0.com/docs/hooks">hooks</a>. Accepts a list of fields to include or exclude in the result.
   *
   * Get hooks
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetHooksRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetHooks200Response>> {
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
        key: 'enabled',
        config: {},
      },
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'triggerId',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/hooks`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve all <a href=\"https://auth0.com/docs/hooks\">hooks</a>. Accepts a list of fields to include or exclude in the result.<br/>
   * Get hooks
   */
  async getAll(
    requestParameters: GetHooksRequest = {},
    initOverrides?: InitOverride
  ): Promise<GetHooks200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve <a href="https://auth0.com/docs/hooks">a hook</a> by its ID. Accepts a list of fields to include in the result.
   *
   * Get a hook
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetHooksByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Hook>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'fields',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/hooks/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/hooks\">a hook</a> by its ID. Accepts a list of fields to include in the result.<br/>
   * Get a hook
   */
  async get(requestParameters: GetHooksByIdRequest, initOverrides?: InitOverride): Promise<Hook> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a hook's secrets by the ID of the hook.
   *
   * Get hook secrets
   * @throws {RequiredError}
   */
  async getSecretsRaw(
    requestParameters: GetSecretsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/hooks/{id}/secrets`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Retrieve a hook\'s secrets by the ID of the hook. <br/>
   * Get hook secrets
   */
  async getSecrets(
    requestParameters: GetSecretsRequest,
    initOverrides?: InitOverride
  ): Promise<{ [key: string]: any }> {
    const response = await this.getSecretsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an existing hook.
   *
   * Update a hook
   * @throws {RequiredError}
   */
  async updateRaw(
    requestParameters: PatchHooksByIdRequest,
    bodyParameters: HookUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Hook>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/hooks/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update an existing hook.<br/>
   * Update a hook
   */
  async update(
    requestParameters: PatchHooksByIdRequest,
    bodyParameters: HookUpdate,
    initOverrides?: InitOverride
  ): Promise<Hook> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update one or more existing secrets for an existing hook. Accepts an object of key-value pairs, where the key is the name of the existing secret.
   *
   * Update hook secrets
   * @throws {RequiredError}
   */
  async updateSecretsRaw(
    requestParameters: PatchSecretsRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/hooks/{id}/secrets`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Update one or more existing secrets for an existing hook. Accepts an object of key-value pairs, where the key is the name of the existing secret. <br/>
   * Update hook secrets
   */
  async updateSecrets(
    requestParameters: PatchSecretsRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: InitOverride
  ): Promise<{ [key: string]: any }> {
    const response = await this.updateSecretsRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a new hook.
   *
   * Create a hook
   * @throws {RequiredError}
   */
  async createRaw(
    bodyParameters: HookCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Hook>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/hooks`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create a new hook.<br/>
   * Create a hook
   */
  async create(bodyParameters: HookCreate, initOverrides?: InitOverride): Promise<Hook> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Add one or more secrets to an existing hook. Accepts an object of key-value pairs, where the key is the name of the secret. A hook can have a maximum of 20 secrets.
   *
   * Add hook secrets
   * @throws {RequiredError}
   */
  async addSecretsRaw(
    requestParameters: PostSecretsRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/hooks/{id}/secrets`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Add one or more secrets to an existing hook. Accepts an object of key-value pairs, where the key is the name of the secret. A hook can have a maximum of 20 secrets. <br/>
   * Add hook secrets
   */
  async addSecrets(
    requestParameters: PostSecretsRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: InitOverride
  ): Promise<{ [key: string]: any }> {
    const response = await this.addSecretsRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }
}

/**
 * @export
 */
export const GetHooksTriggerIdEnum = {
  credentials_exchange: 'credentials-exchange',
  pre_user_registration: 'pre-user-registration',
  post_user_registration: 'post-user-registration',
  post_change_password: 'post-change-password',
  send_phone_message: 'send-phone-message',
} as const;
export type GetHooksTriggerIdEnum =
  typeof GetHooksTriggerIdEnum[keyof typeof GetHooksTriggerIdEnum];
