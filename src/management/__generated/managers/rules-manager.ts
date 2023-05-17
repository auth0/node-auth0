import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetRules200Response,
  Rule,
  RuleCreate,
  RuleUpdate,
  GetRules200ResponseOneOf,
  DeleteRulesByIdRequest,
  GetRulesRequest,
  GetRulesByIdRequest,
  PatchRulesByIdRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

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
    requestParameters: GetRulesRequest & { include_totals: true },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetRules200ResponseOneOf>>;
  async getAll(
    requestParameters?: GetRulesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<Rule>>>;
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
