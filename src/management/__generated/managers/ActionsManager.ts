import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type {
  GetActionVersions200Response,
  GetActionVersions200ResponseVersionsInner,
  GetActions200Response,
  GetActions200ResponseActionsInner,
  GetBindings200Response,
  GetExecution200Response,
  GetTriggers200Response,
  PatchActionRequest,
  PatchBindings200Response,
  PatchBindingsRequest,
  PostActionRequest,
  PostDeployDraftVersionRequest,
  PostTestAction200Response,
  PostTestActionRequest,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteActionRequest {
  /**
   * The ID of the action to delete.
   * @type {string}
   */
  id: string;
  /**
   * Force action deletion detaching bindings
   * @type {boolean}
   */
  force?: boolean;
}

export interface GetActionRequest {
  /**
   * The ID of the action to retrieve.
   * @type {string}
   */
  id: string;
}

export interface GetActionVersionRequest {
  /**
   * The ID of the action.
   * @type {string}
   */
  actionId: string;
  /**
   * The ID of the action version.
   * @type {string}
   */
  id: string;
}

export interface GetActionVersionsRequest {
  /**
   * The ID of the action.
   * @type {string}
   */
  actionId: string;
  /**
   * Use this field to request a specific page of the list results.
   * @type {number}
   */
  page?: number;
  /**
   * This field specify the maximum number of results to be returned by the server. 20 by default
   * @type {number}
   */
  per_page?: number;
}

export interface GetActionsRequest {
  /**
   * An actions extensibility point.
   * @type {GetActionsTriggerIdEnum}
   */
  triggerId?: GetActionsTriggerIdEnum;
  /**
   * The name of the action to retrieve.
   * @type {string}
   */
  actionName?: string;
  /**
   * Optional filter to only retrieve actions that are deployed.
   * @type {boolean}
   */
  deployed?: boolean;
  /**
   * Use this field to request a specific page of the list results.
   * @type {number}
   */
  page?: number;
  /**
   * The maximum number of results to be returned by the server in single response. 20 by default
   * @type {number}
   */
  per_page?: number;
  /**
   * Optional. When true, return only installed actions. When false, return only custom actions. Returns all actions by default.
   * @type {boolean}
   */
  installed?: boolean;
}

export interface GetBindingsRequest {
  /**
   * An actions extensibility point.
   * @type {GetBindingsTriggerIdEnum}
   */
  triggerId: GetBindingsTriggerIdEnum;
  /**
   * Use this field to request a specific page of the list results.
   * @type {number}
   */
  page?: number;
  /**
   * The maximum number of results to be returned in a single request. 20 by default
   * @type {number}
   */
  per_page?: number;
}

export interface GetExecutionRequest {
  /**
   * The ID of the execution to retrieve.
   * @type {string}
   */
  id: string;
}

export interface PatchActionOperationRequest {
  /**
   * The id of the action to update.
   * @type {string}
   */
  id: string;
}

export interface PatchBindingsOperationRequest {
  /**
   * An actions extensibility point.
   * @type {PatchBindingsOperationTriggerIdEnum}
   */
  triggerId: PatchBindingsOperationTriggerIdEnum;
}

export interface PostDeployActionRequest {
  /**
   * The ID of an action.
   * @type {string}
   */
  id: string;
}

export interface PostDeployDraftVersionOperationRequest {
  /**
   * The ID of an action version.
   * @type {string}
   */
  id: string;
  /**
   * The ID of an action.
   * @type {string}
   */
  actionId: string;
}

export interface PostTestActionOperationRequest {
  /**
   * The id of the action to test.
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class ActionsManager extends BaseAPI {
  /**
   * Deletes an action and all of its associated versions. An action must be unbound from all triggers
   * before it can be deleted.
   *
   * Delete an action
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteActionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'force',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/actions/actions/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve an action by its ID.
   *
   * Get an action
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetActionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetActions200ResponseActionsInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/actions/actions/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a specific version of an action. An action version is created whenever
   * an action is deployed. An action version is immutable, once created.
   *
   * Get a specific version of an action
   * @throws {RequiredError}
   */
  async getVersion(
    requestParameters: GetActionVersionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetActionVersions200ResponseVersionsInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['actionId', 'id']);

    const response = await this.request(
      {
        path: `/actions/actions/{actionId}/versions/{id}`
          .replace('{actionId}', encodeURIComponent(String(requestParameters.actionId)))
          .replace('{id}', encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve all of an action's versions. An action version is created whenever
   * an action is deployed. An action version is immutable, once created.
   *
   * Get an action's versions
   * @throws {RequiredError}
   */
  async getVersions(
    requestParameters: GetActionVersionsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetActionVersions200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['actionId']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'page',
        config: {},
      },
      {
        key: 'per_page',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/actions/actions/{actionId}/versions`.replace(
          '{actionId}',
          encodeURIComponent(String(requestParameters.actionId))
        ),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve all actions.
   *
   * Get actions
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetActionsRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetActions200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'triggerId',
        config: {},
      },
      {
        key: 'actionName',
        config: {},
      },
      {
        key: 'deployed',
        config: {},
      },
      {
        key: 'page',
        config: {},
      },
      {
        key: 'per_page',
        config: {},
      },
      {
        key: 'installed',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/actions/actions`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve the actions that are bound to a trigger. Once an action is created and deployed, it must be
   * attached (i.e. bound) to a trigger so that it will be executed as part of a flow. The list of actions returned
   * reflects the order in which they will be executed during the appropriate flow.
   *
   * Get trigger bindings
   * @throws {RequiredError}
   */
  async getTriggerBindings(
    requestParameters: GetBindingsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetBindings200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['triggerId']);

    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'page',
        config: {},
      },
      {
        key: 'per_page',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/actions/triggers/{triggerId}/bindings`.replace(
          '{triggerId}',
          encodeURIComponent(String(requestParameters.triggerId))
        ),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve information about a specific execution of a trigger. Relevant execution IDs will be included in tenant logs
   * generated as part of that authentication flow. Executions will only be stored for 10 days after their creation.
   *
   * Get an execution
   * @throws {RequiredError}
   */
  async getExecution(
    requestParameters: GetExecutionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetExecution200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/actions/executions/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve the set of triggers currently available within actions. A trigger is an extensibility point to which actions
   * can be bound.
   *
   * Get triggers
   * @throws {RequiredError}
   */
  async getAllTriggers(initOverrides?: InitOverride): Promise<ApiResponse<GetTriggers200Response>> {
    const response = await this.request(
      {
        path: `/actions/triggers`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update an existing action. If this action is currently bound to a trigger, updating it will <strong>not</strong> affect
   * any user flows until the action is deployed.
   *
   * Update an action
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchActionOperationRequest,
    bodyParameters: PatchActionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetActions200ResponseActionsInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/actions/actions/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update the actions that are bound (i.e. attached) to a trigger. Once an action is created and deployed, it must be
   * attached (i.e. bound) to a trigger so that it will be executed as part of a flow. The order in which the actions are
   * provided will determine the order in which they are executed.
   *
   * Update trigger bindings
   * @throws {RequiredError}
   */
  async updateTriggerBindings(
    requestParameters: PatchBindingsOperationRequest,
    bodyParameters: PatchBindingsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PatchBindings200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['triggerId']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/actions/triggers/{triggerId}/bindings`.replace(
          '{triggerId}',
          encodeURIComponent(String(requestParameters.triggerId))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create an action. Once an action is created, it must be deployed, and then
   * bound to a trigger before it will be executed as part of a flow.
   *
   * Create an action
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: PostActionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetActions200ResponseActionsInner>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/actions/actions`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Deploy an action. Deploying an action will create a new immutable version of the action. If the action is
   * currently bound to a trigger, then the system will begin executing the newly deployed version of the action immediately. Otherwise, the action will only be executed as a part of a flow once it is bound to that flow.
   *
   * Deploy an action
   * @throws {RequiredError}
   */
  async deploy(
    requestParameters: PostDeployActionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetActionVersions200ResponseVersionsInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/actions/actions/{id}/deploy`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Performs the equivalent of a roll-back of an action to an earlier, specified version. Creates a new, deployed
   * action version that is identical to the specified version. If this action is currently bound to a trigger, the
   * system will begin executing the newly-created version immediately.
   *
   * Roll back to a previous action version
   * @throws {RequiredError}
   */
  async deployVersion(
    requestParameters: PostDeployDraftVersionOperationRequest,
    bodyParameters: PostDeployDraftVersionRequest | null,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetActionVersions200ResponseVersionsInner>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id', 'actionId']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/actions/actions/{actionId}/versions/{id}/deploy`
          .replace('{id}', encodeURIComponent(String(requestParameters.id)))
          .replace('{actionId}', encodeURIComponent(String(requestParameters.actionId))),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Test an action. After updating an action, it can be tested prior to being deployed to ensure it behaves as expected.
   *
   * Test an Action
   * @throws {RequiredError}
   */
  async test(
    requestParameters: PostTestActionOperationRequest,
    bodyParameters: PostTestActionRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostTestAction200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/actions/actions/{id}/test`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}

/**
 * @export
 */
export const GetActionsTriggerIdEnum = {
  post_login: 'post-login',
  credentials_exchange: 'credentials-exchange',
  pre_user_registration: 'pre-user-registration',
  post_user_registration: 'post-user-registration',
  post_change_password: 'post-change-password',
  send_phone_message: 'send-phone-message',
  iga_approval: 'iga-approval',
  iga_certification: 'iga-certification',
  iga_fulfillment_assignment: 'iga-fulfillment-assignment',
  iga_fulfillment_execution: 'iga-fulfillment-execution',
} as const;
export type GetActionsTriggerIdEnum =
  typeof GetActionsTriggerIdEnum[keyof typeof GetActionsTriggerIdEnum];
/**
 * @export
 */
export const GetBindingsTriggerIdEnum = {
  post_login: 'post-login',
  credentials_exchange: 'credentials-exchange',
  pre_user_registration: 'pre-user-registration',
  post_user_registration: 'post-user-registration',
  post_change_password: 'post-change-password',
  send_phone_message: 'send-phone-message',
  iga_approval: 'iga-approval',
  iga_certification: 'iga-certification',
  iga_fulfillment_assignment: 'iga-fulfillment-assignment',
  iga_fulfillment_execution: 'iga-fulfillment-execution',
} as const;
export type GetBindingsTriggerIdEnum =
  typeof GetBindingsTriggerIdEnum[keyof typeof GetBindingsTriggerIdEnum];
/**
 * @export
 */
export const PatchBindingsOperationTriggerIdEnum = {
  post_login: 'post-login',
  credentials_exchange: 'credentials-exchange',
  pre_user_registration: 'pre-user-registration',
  post_user_registration: 'post-user-registration',
  post_change_password: 'post-change-password',
  send_phone_message: 'send-phone-message',
  iga_approval: 'iga-approval',
  iga_certification: 'iga-certification',
  iga_fulfillment_assignment: 'iga-fulfillment-assignment',
  iga_fulfillment_execution: 'iga-fulfillment-execution',
} as const;
export type PatchBindingsOperationTriggerIdEnum =
  typeof PatchBindingsOperationTriggerIdEnum[keyof typeof PatchBindingsOperationTriggerIdEnum];
