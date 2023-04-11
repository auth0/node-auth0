import * as runtime from '../../runtime';
import type { InitOverrideFunction, ApiResponse } from '../../runtime';
import type { GetRules200Response, Rule, RuleCreate, RuleUpdate } from '../models';

const { BaseAPI } = runtime;

export type InitOverrides = RequestInit | InitOverrideFunction;

export interface DeleteRulesByIdRequest {
  /**
   * ID of the rule to delete.
   * @type {string}
   */
  id: string;
}

export interface GetRulesRequest {
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
   * Optional filter on whether a rule is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled?: boolean;
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
}

export interface GetRulesByIdRequest {
  /**
   * ID of the rule to retrieve.
   * @type {string}
   */
  id: string;
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
}

export interface PatchRulesByIdRequest {
  /**
   * ID of the rule to retrieve.
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class RulesManager extends BaseAPI {
  /**
   * Delete a rule.
   *
   * Delete a rule
   * @throws {RequiredError}
   */
  async deleteRaw(
    requestParameters: DeleteRulesByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/rules/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
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
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve a filtered list of <a href="https://auth0.com/docs/rules">rules</a>. Accepts a list of fields to include or exclude.
   *
   * Get rules
   * @throws {RequiredError}
   */
  async getAllRaw(
    requestParameters: GetRulesRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<GetRules200Response>> {
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
        key: 'include_fields',
        config: {},
      },
    ]);

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
    initOverrides?: InitOverrides
  ): Promise<GetRules200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve <a href="https://auth0.com/docs/rules">rule</a> details. Accepts a list of fields to include or exclude in the result.
   *
   * Get a rule
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetRulesByIdRequest,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<Rule>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'fields',
        config: {},
      },
      {
        key: 'include_fields',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/rules/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
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
  async get(requestParameters: GetRulesByIdRequest, initOverrides?: InitOverrides): Promise<Rule> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an existing rule.
   *
   * Update a rule
   * @throws {RequiredError}
   */
  async updateRaw(
    requestParameters: PatchRulesByIdRequest,
    bodyParameters: RuleUpdate,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<Rule>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/rules/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
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
    initOverrides?: InitOverrides
  ): Promise<Rule> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a <a href="https://auth0.com/docs/rules#create-a-new-rule-using-the-management-api">new rule</a>.
   *
   * Note: Changing a rule's stage of execution from the default <code>login_success</code> can change the rule's function signature to have user omitted.
   *
   * Create a rule
   * @throws {RequiredError}
   */
  async createRaw(
    bodyParameters: RuleCreate,
    initOverrides?: InitOverrides
  ): Promise<ApiResponse<Rule>> {
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
  async create(bodyParameters: RuleCreate, initOverrides?: InitOverrides): Promise<Rule> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}
