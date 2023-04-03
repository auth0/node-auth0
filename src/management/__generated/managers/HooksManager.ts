/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type { GetHooks200Response, Hook, HookCreate, HookUpdate } from '../models';

export interface DeleteHooksByIdRequest {
  id: string;
}

export interface DeleteSecretsRequest {
  id: string;
}

export interface GetHooksRequest {
  page?: number;
  per_page?: number;
  include_totals?: boolean;
  enabled?: boolean;
  fields?: string;
  triggerId?: GetHooksTriggerIdEnum;
}

export interface GetHooksByIdRequest {
  id: string;
  fields?: string;
}

export interface GetSecretsRequest {
  id: string;
}

export interface PatchHooksByIdRequest {
  id: string;
}

export interface PatchSecretsRequest {
  id: string;
}

export interface PostSecretsRequest {
  id: string;
}

/**
 *
 */
export class HooksManager extends runtime.BaseAPI {
  /**
   * Delete a hook.<br/>
   * Delete a hook
   * @throws {RequiredError}
   * @memberof HooksManager
   */
  async deleteRaw(
    requestParameters: DeleteHooksByIdRequest,
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
        path: `/hooks/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Delete one or more existing secrets for a given hook. Accepts an array of secret names to delete.
   * Delete hook secrets
   * @throws {RequiredError}
   * @memberof HooksManager
   */
  async deleteSecretsRaw(
    requestParameters: DeleteSecretsRequest,
    bodyParameters: Array<string>,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deleteSecrets.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/hooks/{id}/secrets`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteSecretsRaw(requestParameters, bodyParameters, initOverrides);
  }

  /**
   * Retrieve all <a href=\"https://auth0.com/docs/hooks\">hooks</a>. Accepts a list of fields to include or exclude in the result.<br/>
   * Get hooks
   * @throws {RequiredError}
   * @memberof HooksManager
   */
  async getAllRaw(
    requestParameters: GetHooksRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetHooks200Response>> {
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

    if (requestParameters.enabled !== undefined) {
      queryParameters['enabled'] = requestParameters.enabled;
    }

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    if (requestParameters.triggerId !== undefined) {
      queryParameters['triggerId'] = requestParameters.triggerId;
    }

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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetHooks200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/hooks\">a hook</a> by its ID. Accepts a list of fields to include in the result.<br/>
   * Get a hook
   * @throws {RequiredError}
   * @memberof HooksManager
   */
  async getRaw(
    requestParameters: GetHooksByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Hook>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.fields !== undefined) {
      queryParameters['fields'] = requestParameters.fields;
    }

    const response = await this.request(
      {
        path: `/hooks/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
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
  async get(
    requestParameters: GetHooksByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Hook> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a hook\'s secrets by the ID of the hook. <br/>
   * Get hook secrets
   * @throws {RequiredError}
   * @memberof HooksManager
   */
  async getSecretsRaw(
    requestParameters: GetSecretsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<{ [key: string]: any }>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getSecrets.'
      );
    }

    const response = await this.request(
      {
        path: `/hooks/{id}/secrets`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<{ [key: string]: any }> {
    const response = await this.getSecretsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an existing hook.<br/>
   * Update a hook
   * @throws {RequiredError}
   * @memberof HooksManager
   */
  async updateRaw(
    requestParameters: PatchHooksByIdRequest,
    bodyParameters: HookUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Hook>> {
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
        path: `/hooks/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Hook> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update one or more existing secrets for an existing hook. Accepts an object of key-value pairs, where the key is the name of the existing secret. <br/>
   * Update hook secrets
   * @throws {RequiredError}
   * @memberof HooksManager
   */
  async updateSecretsRaw(
    requestParameters: PatchSecretsRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<{ [key: string]: any }>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling updateSecrets.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/hooks/{id}/secrets`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<{ [key: string]: any }> {
    const response = await this.updateSecretsRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a new hook.<br/>
   * Create a hook
   * @throws {RequiredError}
   * @memberof HooksManager
   */
  async createRaw(
    bodyParameters: HookCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Hook>> {
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
  async create(
    bodyParameters: HookCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Hook> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Add one or more secrets to an existing hook. Accepts an object of key-value pairs, where the key is the name of the secret. A hook can have a maximum of 20 secrets. <br/>
   * Add hook secrets
   * @throws {RequiredError}
   * @memberof HooksManager
   */
  async addSecretsRaw(
    requestParameters: PostSecretsRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<{ [key: string]: any }>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling addSecrets.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/hooks/{id}/secrets`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
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
