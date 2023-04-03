/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
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

export interface DeleteActionRequest {
  id: string;
  force?: boolean;
}

export interface GetActionRequest {
  id: string;
}

export interface GetActionVersionRequest {
  actionId: string;
  id: string;
}

export interface GetActionVersionsRequest {
  actionId: string;
  page?: number;
  per_page?: number;
}

export interface GetActionsRequest {
  triggerId?: GetActionsTriggerIdEnum;
  actionName?: string;
  deployed?: boolean;
  page?: number;
  per_page?: number;
  installed?: boolean;
}

export interface GetBindingsRequest {
  triggerId: GetBindingsTriggerIdEnum;
  page?: number;
  per_page?: number;
}

export interface GetExecutionRequest {
  id: string;
}

export interface PatchActionOperationRequest {
  id: string;
}

export interface PatchBindingsOperationRequest {
  triggerId: PatchBindingsOperationTriggerIdEnum;
}

export interface PostDeployActionRequest {
  id: string;
}

export interface PostDeployDraftVersionOperationRequest {
  id: string;
  actionId: string;
}

export interface PostTestActionOperationRequest {
  id: string;
}

/**
 *
 */
export class ActionsManager extends runtime.BaseAPI {
  /**
   * Deletes an action and all of its associated versions. An action must be unbound from all triggers<br/>before it can be deleted.<br/>
   * Delete an action
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async deleteRaw(
    requestParameters: DeleteActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling delete.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.force !== undefined) {
      queryParameters['force'] = requestParameters.force;
    }

    const response = await this.request(
      {
        path: `/actions/actions/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Deletes an action and all of its associated versions. An action must be unbound from all triggers<br/>before it can be deleted.<br/>
   * Delete an action
   */
  async delete(
    requestParameters: DeleteActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve an action by its ID.<br/>
   * Get an action
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async getRaw(
    requestParameters: GetActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetActions200ResponseActionsInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }

    const response = await this.request(
      {
        path: `/actions/actions/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve an action by its ID.<br/>
   * Get an action
   */
  async get(
    requestParameters: GetActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetActions200ResponseActionsInner> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a specific version of an action. An action version is created whenever<br/>an action is deployed. An action version is immutable, once created.<br/>
   * Get a specific version of an action
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async getVersionRaw(
    requestParameters: GetActionVersionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetActionVersions200ResponseVersionsInner>> {
    if (requestParameters.actionId === null || requestParameters.actionId === undefined) {
      throw new runtime.RequiredError(
        'actionId',
        'Required parameter requestParameters.actionId was null or undefined when calling getVersion.'
      );
    }
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getVersion.'
      );
    }

    const response = await this.request(
      {
        path: `/actions/actions/{actionId}/versions/{id}`
          .replace(`{${'actionId'}}`, encodeURIComponent(String(requestParameters.actionId)))
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve a specific version of an action. An action version is created whenever<br/>an action is deployed. An action version is immutable, once created.<br/>
   * Get a specific version of an action
   */
  async getVersion(
    requestParameters: GetActionVersionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetActionVersions200ResponseVersionsInner> {
    const response = await this.getVersionRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve all of an action\'s versions. An action version is created whenever<br/>an action is deployed. An action version is immutable, once created.<br/>
   * Get an action\'s versions
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async getVersionsRaw(
    requestParameters: GetActionVersionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetActionVersions200Response>> {
    if (requestParameters.actionId === null || requestParameters.actionId === undefined) {
      throw new runtime.RequiredError(
        'actionId',
        'Required parameter requestParameters.actionId was null or undefined when calling getVersions.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    const response = await this.request(
      {
        path: `/actions/actions/{actionId}/versions`.replace(
          `{${'actionId'}}`,
          encodeURIComponent(String(requestParameters.actionId))
        ),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve all of an action\'s versions. An action version is created whenever<br/>an action is deployed. An action version is immutable, once created.<br/>
   * Get an action\'s versions
   */
  async getVersions(
    requestParameters: GetActionVersionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetActionVersions200Response> {
    const response = await this.getVersionsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve all actions.<br/>
   * Get actions
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async getAllRaw(
    requestParameters: GetActionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetActions200Response>> {
    const queryParameters: any = {};

    if (requestParameters.triggerId !== undefined) {
      queryParameters['triggerId'] = requestParameters.triggerId;
    }

    if (requestParameters.actionName !== undefined) {
      queryParameters['actionName'] = requestParameters.actionName;
    }

    if (requestParameters.deployed !== undefined) {
      queryParameters['deployed'] = requestParameters.deployed;
    }

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    if (requestParameters.installed !== undefined) {
      queryParameters['installed'] = requestParameters.installed;
    }

    const response = await this.request(
      {
        path: `/actions/actions`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve all actions.<br/>
   * Get actions
   */
  async getAll(
    requestParameters: GetActionsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetActions200Response> {
    const response = await this.getAllRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the actions that are bound to a trigger. Once an action is created and deployed, it must be<br/>attached (i.e. bound) to a trigger so that it will be executed as part of a flow. The list of actions returned<br/>reflects the order in which they will be executed during the appropriate flow.<br/>
   * Get trigger bindings
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async getTriggerBindingsRaw(
    requestParameters: GetBindingsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetBindings200Response>> {
    if (requestParameters.triggerId === null || requestParameters.triggerId === undefined) {
      throw new runtime.RequiredError(
        'triggerId',
        'Required parameter requestParameters.triggerId was null or undefined when calling getTriggerBindings.'
      );
    }
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.per_page !== undefined) {
      queryParameters['per_page'] = requestParameters.per_page;
    }

    const response = await this.request(
      {
        path: `/actions/triggers/{triggerId}/bindings`.replace(
          `{${'triggerId'}}`,
          encodeURIComponent(String(requestParameters.triggerId))
        ),
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve the actions that are bound to a trigger. Once an action is created and deployed, it must be<br/>attached (i.e. bound) to a trigger so that it will be executed as part of a flow. The list of actions returned<br/>reflects the order in which they will be executed during the appropriate flow.<br/>
   * Get trigger bindings
   */
  async getTriggerBindings(
    requestParameters: GetBindingsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetBindings200Response> {
    const response = await this.getTriggerBindingsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve information about a specific execution of a trigger. Relevant execution IDs will be included in tenant logs<br/>generated as part of that authentication flow. Executions will only be stored for 10 days after their creation.<br/>
   * Get an execution
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async getExecutionRaw(
    requestParameters: GetExecutionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetExecution200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getExecution.'
      );
    }

    const response = await this.request(
      {
        path: `/actions/executions/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve information about a specific execution of a trigger. Relevant execution IDs will be included in tenant logs<br/>generated as part of that authentication flow. Executions will only be stored for 10 days after their creation.<br/>
   * Get an execution
   */
  async getExecution(
    requestParameters: GetExecutionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetExecution200Response> {
    const response = await this.getExecutionRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the set of triggers currently available within actions. A trigger is an extensibility point to which actions <br/>can be bound.<br/>
   * Get triggers
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async getAllTriggersRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetTriggers200Response>> {
    const response = await this.request(
      {
        path: `/actions/triggers`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve the set of triggers currently available within actions. A trigger is an extensibility point to which actions <br/>can be bound.<br/>
   * Get triggers
   */
  async getAllTriggers(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetTriggers200Response> {
    const response = await this.getAllTriggersRaw(initOverrides);
    return await response.value();
  }

  /**
   * Update an existing action. If this action is currently bound to a trigger, updating it will <strong>not</strong> affect<br/>any user flows until the action is deployed.<br/>
   * Update an action
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async updateRaw(
    requestParameters: PatchActionOperationRequest,
    bodyParameters: PatchActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetActions200ResponseActionsInner>> {
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
        path: `/actions/actions/{id}`.replace(
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
   * Update an existing action. If this action is currently bound to a trigger, updating it will <strong>not</strong> affect<br/>any user flows until the action is deployed.<br/>
   * Update an action
   */
  async update(
    requestParameters: PatchActionOperationRequest,
    bodyParameters: PatchActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetActions200ResponseActionsInner> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update the actions that are bound (i.e. attached) to a trigger. Once an action is created and deployed, it must be<br/>attached (i.e. bound) to a trigger so that it will be executed as part of a flow. The order in which the actions are<br/>provided will determine the order in which they are executed.<br/>
   * Update trigger bindings
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async updateTriggerBindingsRaw(
    requestParameters: PatchBindingsOperationRequest,
    bodyParameters: PatchBindingsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PatchBindings200Response>> {
    if (requestParameters.triggerId === null || requestParameters.triggerId === undefined) {
      throw new runtime.RequiredError(
        'triggerId',
        'Required parameter requestParameters.triggerId was null or undefined when calling updateTriggerBindings.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/actions/triggers/{triggerId}/bindings`.replace(
          `{${'triggerId'}}`,
          encodeURIComponent(String(requestParameters.triggerId))
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
   * Update the actions that are bound (i.e. attached) to a trigger. Once an action is created and deployed, it must be<br/>attached (i.e. bound) to a trigger so that it will be executed as part of a flow. The order in which the actions are<br/>provided will determine the order in which they are executed.<br/>
   * Update trigger bindings
   */
  async updateTriggerBindings(
    requestParameters: PatchBindingsOperationRequest,
    bodyParameters: PatchBindingsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PatchBindings200Response> {
    const response = await this.updateTriggerBindingsRaw(
      requestParameters,
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Create an action. Once an action is created, it must be deployed, and then<br/>bound to a trigger before it will be executed as part of a flow.<br/>
   * Create an action
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async createRaw(
    bodyParameters: PostActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetActions200ResponseActionsInner>> {
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create an action. Once an action is created, it must be deployed, and then<br/>bound to a trigger before it will be executed as part of a flow.<br/>
   * Create an action
   */
  async create(
    bodyParameters: PostActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetActions200ResponseActionsInner> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Deploy an action. Deploying an action will create a new immutable version of the action. If the action is<br/>currently bound to a trigger, then the system will begin executing the newly deployed version of the action immediately. Otherwise, the action will only be executed as a part of a flow once it is bound to that flow.<br/>
   * Deploy an action
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async deployRaw(
    requestParameters: PostDeployActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetActionVersions200ResponseVersionsInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deploy.'
      );
    }

    const response = await this.request(
      {
        path: `/actions/actions/{id}/deploy`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Deploy an action. Deploying an action will create a new immutable version of the action. If the action is<br/>currently bound to a trigger, then the system will begin executing the newly deployed version of the action immediately. Otherwise, the action will only be executed as a part of a flow once it is bound to that flow.<br/>
   * Deploy an action
   */
  async deploy(
    requestParameters: PostDeployActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetActionVersions200ResponseVersionsInner> {
    const response = await this.deployRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Performs the equivalent of a roll-back of an action to an earlier, specified version. Creates a new, deployed<br/>action version that is identical to the specified version. If this action is currently bound to a trigger, the<br/>system will begin executing the newly-created version immediately.<br/>
   * Roll back to a previous action version
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async deployVersionRaw(
    requestParameters: PostDeployDraftVersionOperationRequest,
    bodyParameters: PostDeployDraftVersionRequest | null,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetActionVersions200ResponseVersionsInner>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deployVersion.'
      );
    }
    if (requestParameters.actionId === null || requestParameters.actionId === undefined) {
      throw new runtime.RequiredError(
        'actionId',
        'Required parameter requestParameters.actionId was null or undefined when calling deployVersion.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/actions/actions/{actionId}/versions/{id}/deploy`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(`{${'actionId'}}`, encodeURIComponent(String(requestParameters.actionId))),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Performs the equivalent of a roll-back of an action to an earlier, specified version. Creates a new, deployed<br/>action version that is identical to the specified version. If this action is currently bound to a trigger, the<br/>system will begin executing the newly-created version immediately.<br/>
   * Roll back to a previous action version
   */
  async deployVersion(
    requestParameters: PostDeployDraftVersionOperationRequest,
    bodyParameters: PostDeployDraftVersionRequest | null,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetActionVersions200ResponseVersionsInner> {
    const response = await this.deployVersionRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Test an action. After updating an action, it can be tested prior to being deployed to ensure it behaves as expected.<br/>
   * Test an Action
   * @throws {RequiredError}
   * @memberof ActionsManager
   */
  async testRaw(
    requestParameters: PostTestActionOperationRequest,
    bodyParameters: PostTestActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostTestAction200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling test.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/actions/actions/{id}/test`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Test an action. After updating an action, it can be tested prior to being deployed to ensure it behaves as expected.<br/>
   * Test an Action
   */
  async test(
    requestParameters: PostTestActionOperationRequest,
    bodyParameters: PostTestActionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostTestAction200Response> {
    const response = await this.testRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
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
