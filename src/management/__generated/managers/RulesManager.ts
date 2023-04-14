import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { GetRules200Response, Rule, RuleCreate, RuleUpdate } from '../models';

const { BaseAPI } = runtime;

export interface DeleteRulesByIdRequest {
  /**
   * ID of the rule to delete.
   */
  id: string;
}

export interface GetRulesRequest {
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
   * Optional filter on whether a rule is enabled (true) or disabled (false).
   */
  enabled?: boolean;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   */
  include_fields?: boolean;
}

export interface GetRulesByIdRequest {
  /**
   * ID of the rule to retrieve.
   */
  id: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   */
  include_fields?: boolean;
}

export interface PatchRulesByIdRequest {
  /**
   * ID of the rule to retrieve.
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
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteRulesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/rules/{id}`.replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a filtered list of <a href="https://auth0.com/docs/rules">rules</a>. Accepts a list of fields to include or exclude.
   *
   * Get rules
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetRulesRequest = {},
    initOverrides?: InitOverride
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve <a href="https://auth0.com/docs/rules">rule</a> details. Accepts a list of fields to include or exclude in the result.
   *
   * Get a rule
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetRulesByIdRequest,
    initOverrides?: InitOverride
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update an existing rule.
   *
   * Update a rule
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchRulesByIdRequest,
    bodyParameters: RuleUpdate,
    initOverrides?: InitOverride
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

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a <a href="https://auth0.com/docs/rules#create-a-new-rule-using-the-management-api">new rule</a>.
   *
   * Note: Changing a rule's stage of execution from the default <code>login_success</code> can change the rule's function signature to have user omitted.
   *
   * Create a rule
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: RuleCreate,
    initOverrides?: InitOverride
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

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
