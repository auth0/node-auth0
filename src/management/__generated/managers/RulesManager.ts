/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type { GetRules200Response, Rule, RuleCreate, RuleUpdate } from '../models';

export interface DeleteRulesByIdRequest {
  id: string;
}

export interface GetRulesRequest {
  page?: number;
  per_page?: number;
  include_totals?: boolean;
  enabled?: boolean;
  fields?: string;
  include_fields?: boolean;
}

export interface GetRulesByIdRequest {
  id: string;
  fields?: string;
  include_fields?: boolean;
}

export interface PatchRulesByIdRequest {
  id: string;
}

/**
 *
 */
export class RulesManager extends runtime.BaseAPI {
  /**
   * Delete a rule.<br/>
   * Delete a rule
   * @throws {RequiredError}
   * @memberof RulesManager
   */
  async deleteRaw(
    requestParameters: DeleteRulesByIdRequest,
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
        path: `/rules/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a rule.<br/>
   * Delete a rule
   */
  async delete(
    requestParameters: DeleteRulesByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve a filtered list of <a href=\"https://auth0.com/docs/rules\">rules</a>. Accepts a list of fields to include or exclude.<br/>
   * Get rules
   * @throws {RequiredError}
   * @memberof RulesManager
   */
  async getAllRaw(
    requestParameters: GetRulesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetRules200Response>> {
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

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    const response = await this.request(
      {
        path: `/rules`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve a filtered list of <a href=\"https://auth0.com/docs/rules\">rules</a>. Accepts a list of fields to include or exclude.<br/>
   * Get rules
   */
  async getAll(
    requestParameters: GetRulesRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetRules200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/rules\">rule</a> details. Accepts a list of fields to include or exclude in the result.<br/>
   * Get a rule
   * @throws {RequiredError}
   * @memberof RulesManager
   */
  async getRaw(
    requestParameters: GetRulesByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Rule>> {
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

    if (requestParameters.include_fields !== undefined) {
      queryParameters['include_fields'] = requestParameters.include_fields;
    }

    const response = await this.request(
      {
        path: `/rules/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve <a href=\"https://auth0.com/docs/rules\">rule</a> details. Accepts a list of fields to include or exclude in the result.<br/>
   * Get a rule
   */
  async get(
    requestParameters: GetRulesByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Rule> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an existing rule.<br/>
   * Update a rule
   * @throws {RequiredError}
   * @memberof RulesManager
   */
  async updateRaw(
    requestParameters: PatchRulesByIdRequest,
    bodyParameters: RuleUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Rule>> {
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
        path: `/rules/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update an existing rule.<br/>
   * Update a rule
   */
  async update(
    requestParameters: PatchRulesByIdRequest,
    bodyParameters: RuleUpdate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Rule> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a <a href=\"https://auth0.com/docs/rules#create-a-new-rule-using-the-management-api\">new rule</a>.<br/><br/>Note: Changing a rule\'s stage of execution from the default <code>login_success</code> can change the rule\'s function signature to have user omitted.<br/>
   * Create a rule
   * @throws {RequiredError}
   * @memberof RulesManager
   */
  async createRaw(
    bodyParameters: RuleCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Rule>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/rules`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create a <a href=\"https://auth0.com/docs/rules#create-a-new-rule-using-the-management-api\">new rule</a>.<br/><br/>Note: Changing a rule\'s stage of execution from the default <code>login_success</code> can change the rule\'s function signature to have user omitted.<br/>
   * Create a rule
   */
  async create(
    bodyParameters: RuleCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Rule> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
