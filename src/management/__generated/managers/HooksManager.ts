import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { GetHooks200Response, Hook, HookCreate, HookUpdate } from '../models';

const { BaseAPI } = runtime;

export interface DeleteHooksByIdRequest {
  /**
   * ID of the hook to delete.
   */
  id: string;
}

export interface DeleteSecretsRequest {
  /**
   * ID of the hook whose secrets to delete.
   */
  id: string;
}

export interface GetHooksRequest {
  /**
   * Page index of the results to return. First page is 0.
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   */
  include_totals?: boolean;
  /**
   * Optional filter on whether a hook is enabled (true) or disabled (false).
   */
  enabled?: boolean;
  /**
   * Comma-separated list of fields to include in the result. Leave empty to retrieve all fields.
   */
  fields?: string;
  /**
   * Retrieves hooks that match the trigger
   */
  triggerId?: GetHooksTriggerIdEnum;
}

export interface GetHooksByIdRequest {
  /**
   * ID of the hook to retrieve.
   */
  id: string;
  /**
   * Comma-separated list of fields to include in the result. Leave empty to retrieve all fields.
   */
  fields?: string;
}

export interface GetSecretsRequest {
  /**
   * ID of the hook to retrieve secrets from.
   */
  id: string;
}

export interface PatchHooksByIdRequest {
  /**
   * ID of the hook to update.
   */
  id: string;
}

export interface PatchSecretsRequest {
  /**
   * ID of the hook whose secrets to update.
   */
  id: string;
}

export interface PostSecretsRequest {
  /**
   * The id of the hook to retrieve
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
   *
   * @throws {RequiredError}
   */
  async delete(
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

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Delete one or more existing secrets for a given hook. Accepts an array of secret names to delete.
   * Delete hook secrets
   *
   * @throws {RequiredError}
   */
  async deleteSecrets(
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

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve all <a href="https://auth0.com/docs/hooks">hooks</a>. Accepts a list of fields to include or exclude in the result.
   *
   * Get hooks
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetHooksRequest = {},
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve <a href="https://auth0.com/docs/hooks">a hook</a> by its ID. Accepts a list of fields to include in the result.
   *
   * Get a hook
   *
   * @throws {RequiredError}
   */
  async get(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a hook's secrets by the ID of the hook.
   *
   * Get hook secrets
   *
   * @throws {RequiredError}
   */
  async getSecrets(
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

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * Update an existing hook.
   *
   * Update a hook
   *
   * @throws {RequiredError}
   */
  async update(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update one or more existing secrets for an existing hook. Accepts an object of key-value pairs, where the key is the name of the existing secret.
   *
   * Update hook secrets
   *
   * @throws {RequiredError}
   */
  async updateSecrets(
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

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * Create a new hook.
   *
   * Create a hook
   *
   * @throws {RequiredError}
   */
  async create(
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Add one or more secrets to an existing hook. Accepts an object of key-value pairs, where the key is the name of the secret. A hook can have a maximum of 20 secrets.
   *
   * Add hook secrets
   *
   * @throws {RequiredError}
   */
  async addSecrets(
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

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }
}

export const GetHooksTriggerIdEnum = {
  credentials_exchange: 'credentials-exchange',
  pre_user_registration: 'pre-user-registration',
  post_user_registration: 'post-user-registration',
  post_change_password: 'post-change-password',
  send_phone_message: 'send-phone-message',
} as const;
export type GetHooksTriggerIdEnum =
  (typeof GetHooksTriggerIdEnum)[keyof typeof GetHooksTriggerIdEnum];
