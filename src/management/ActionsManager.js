const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * {@link https://auth0.com/docs/api/v2#!/Actions/get_actions Actions} provide a way to extend
 * Auth0 flows with custom logic.
 * See the {@link https://auth0.com/docs/actions Actions documentation} for more information.
 */
class ActionsManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide client options');
    }

    if (options.baseUrl === null || options.baseUrl === undefined) {
      throw new ArgumentError('Must provide a base URL for the API');
    }

    if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
      throw new ArgumentError('The provided base URL is invalid');
    }

    /**
     * Options object for the Rest Client instance.
     *
     * @type {object}
     */
    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for consuming the
     * [Auth0 Actions endpoint]{@link https://auth0.com/docs/api/v2#!/actions}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/actions/actions/:id`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);

    const actionsDeployRestClient = new Auth0RestClient(
      `${options.baseUrl}/actions/actions/:id/deploy`,
      clientOptions,
      options.tokenProvider
    );
    this.actionsDeploy = new RetryRestClient(actionsDeployRestClient, options.retry);

    const actionsTestRestClient = new Auth0RestClient(
      `${options.baseUrl}/actions/actions/:id/test`,
      clientOptions,
      options.tokenProvider
    );
    this.actionsTest = new RetryRestClient(actionsTestRestClient, options.retry);

    const triggersRestClient = new Auth0RestClient(
      `${options.baseUrl}/actions/triggers/:trigger_id`,
      clientOptions,
      options.tokenProvider
    );
    this.triggers = new RetryRestClient(triggersRestClient, options.retry);

    const triggerBindingsRestClient = new Auth0RestClient(
      `${options.baseUrl}/actions/triggers/:trigger_id/bindings`,
      clientOptions,
      options.tokenProvider
    );
    this.triggerBindings = new RetryRestClient(triggerBindingsRestClient, options.retry);

    const executionsRestClient = new Auth0RestClient(
      `${options.baseUrl}/actions/executions/:execution_id`,
      clientOptions,
      options.tokenProvider
    );
    this.executions = new RetryRestClient(executionsRestClient, options.retry);

    const actionVersionRestClient = new Auth0RestClient(
      `${options.baseUrl}/actions/actions/:id/versions/:version_id`,
      clientOptions,
      options.tokenProvider
    );
    this.actionVersions = new RetryRestClient(actionVersionRestClient, options.retry);

    const deployActionVersionRestClient = new Auth0RestClient(
      `${options.baseUrl}/actions/actions/:id/versions/:version_id/deploy`,
      clientOptions,
      options.tokenProvider
    );
    this.actionVersionDeploy = new RetryRestClient(deployActionVersionRestClient, options.retry);
  }

  /**
   * Get all Triggers.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.actions.getAllTriggers(params, function (err, actions) {
   *   console.log(actions.length);
   * });
   * @param   {object}    [params]               Actions parameters.
   * @param   {number}    [params.per_page]      Number of results per page.
   * @param   {number}    [params.page]          Page number, zero indexed.
   * @param   {Function}  [cb]                   Callback function.
   * @returns  {Promise|undefined}
   */
  getAllTriggers(params, cb) {
    params = params || {};

    if (cb && cb instanceof Function) {
      return this.triggers.getAll(params, cb);
    }

    return this.triggers.getAll(params);
  }

  /**
   * Update the actions bound to a trigger .
   *
   * @example
   * var data = { bindings: [{ id_type: "action_id", id_value: ACTION_ID1},{id_type: "action_name", id_value: ACTION_NAME2}];
   * var params = { trigger_id: TRIGGER_ID };
   *
   * // Using auth0 instance.
   * management.actions.updateTriggerBindings(params, data, function (err, bindings) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(bindings.length);  // 2
   * });
   * @param   {object}    params                Actions Binding parameters.
   * @param   {string}    params.trigger_id     Actions Trigger ID.
   * @param   {object}    data                  bindings array
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  updateTriggerBindings(params, data, cb) {
    params = params || {};

    if (cb && cb instanceof Function) {
      return this.triggerBindings.patch(params, data, cb);
    }

    return this.triggerBindings.patch(params, data);
  }

  /**
   * Get the actions bound to a trigger .
   *
   * @example
   * var params = { trigger_id: TRIGGER_ID };
   *
   * // Using auth0 instance.
   * management.actions.getTriggerBindings(params, function (err, bindings) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(bindings.length);  // 2
   * });
   * @param   {object}    params                Actions Binding parameters.
   * @param   {string}    params.trigger_id     Actions Trigger ID.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  getTriggerBindings(params, cb) {
    params = params || {};

    if (cb && cb instanceof Function) {
      return this.triggerBindings.getAll(params, cb);
    }

    return this.triggerBindings.getAll(params);
  }

  /**
   * Create a new Action.
   *
   * @example
   * management.actions.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Action created.
   * });
   * @param   {object}    data     Action data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all actions.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0,
   *   triggerId:'TRIGGER_ID',
   *   actionName: 'ACTION_NAME'
   * };
   *
   * management.actions.getAll(params, function (err, actions) {
   *   console.log(actions.length);
   * });
   * @param   {object}    [params]               Actions parameters.
   * @param   {number}    [params.per_page]      Number of results per page.
   * @param   {number}    [params.page]          Page number, zero indexed.
   * @param   {string}    [params.triggerId]     The trigger ID of the actions to retrieve.
   * @param   {string}    [params.actionName]    The name of the actions to retrieve.
   * @param   {Function}  [cb]                   Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Get an Auth0 action.
   *
   * @example
   * management.actions.get({ id: ACTION_ID }, function (err, action) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(action);
   * });
   * @param   {object}    params               Action parameters.
   * @param   {string}    params.id     Action ID.
   * @param   {Function}  [cb]                 Callback function.
   * @returns  {Promise|undefined}
   */
  get(params, cb) {
    params = params || {};

    if (params.action_id) {
      params.id = params.action_id;
      delete params.action_id;
    }

    if (cb && cb instanceof Function) {
      return this.resource.get(params, cb);
    }

    return this.resource.get(params);
  }

  /**
   * Update an existing action.
   *
   * @example
   * var data = { name: 'new-name' };
   * var params = { id: ACTION_ID };
   *
   * // Using auth0 instance.
   * management.updateAction(params, data, function (err, action) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(action.name);  // 'new-name'
   * });
   *
   * // Using the Actions manager directly.
   * management.actions.update(params, data, function (err, action) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(action.name);  // 'new-name'
   * });
   * @param   {object}    params        Action parameters.
   * @param   {string}    params.id     Action ID.
   * @param   {object}    data          Updated action data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  update(params, data, cb) {
    params = params || {};

    if (params.action_id) {
      params.id = params.action_id;
      delete params.action_id;
    }

    if (cb && cb instanceof Function) {
      return this.resource.patch(params, data, cb);
    }

    return this.resource.patch(params, data);
  }

  /**
   * Delete an existing action. Deleting an Action deletes all the action's versions
   *
   * @example
   * management.actions.delete({ id: ACTION_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Action deleted.
   * });
   * @param   {object}    params        Action parameters.
   * @param   {string}    params.id     Action ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  delete(params, cb) {
    params = params || {};

    if (params.action_id) {
      params.id = params.action_id;
      delete params.action_id;
    }

    if (cb && cb instanceof Function) {
      return this.resource.delete(params, cb);
    }

    return this.resource.delete(params);
  }

  /**
   * test an Action.
   *
   * @example
   * var params = { id: ACTION_ID};
   * management.actions.test(params, payload, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params                Action parameters.
   * @param   {string}    params.id      Action ID.
   * @param   {object}    payload               Payload represents the entire structure necessary to test a particular trigger
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  test(params, payload, cb) {
    params = params || {};
    payload = payload || {};

    if (params.action_id) {
      params.id = params.action_id;
      delete params.action_id;
    }

    if (cb && cb instanceof Function) {
      return this.actionsTest.create(params, payload, cb);
    }

    return this.actionsTest.create(params, payload);
  }

  /**
   * deploy an Action.
   * The action must be in a state of 'built' before it can be deployed.
   *
   * @example
   * var params = { id: ACTION_ID};
   * mangement.actions.deploy(params, function (err, actionVersion) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params                Action parameters.
   * @param   {string}    params.id      Action ID.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  deploy(params, cb) {
    params = params || {};

    if (params.action_id) {
      params.id = params.action_id;
      delete params.action_id;
    }

    if (cb && cb instanceof Function) {
      return this.actionsDeploy.create(params, {}, cb);
    }

    return this.actionsDeploy.create(params, {});
  }

  /**
   * Get all action versions
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings. If pagination options are not present,
   *   the first page of a limited number of results will be returned.
   * </caption>
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.actions.getVersions({ id: ACTION_ID }, function (err, actionVersions) {
   *   console.log(actionVersions.length);
   * });
   * @param   {object}    [params]               ActionVersions parameters.
   * @param   {number}    [params.per_page]      Number of results per page.
   * @param   {number}    [params.page]          Page number, zero indexed.
   * @param   {string}    [params.id]     Action ID.
   * @param   {Function}  [cb]                   Callback function.
   * @returns  {Promise|undefined}
   */
  getVersions(params, cb) {
    params = params || {};

    if (params.action_id) {
      params.id = params.action_id;
      delete params.action_id;
    }

    if (cb && cb instanceof Function) {
      return this.actionVersions.getAll(params, cb);
    }

    return this.actionVersions.getAll(params);
  }

  /**
   * Get an Action Version.
   *
   * @example
   * var params = { id: ACTION_ID, version_id: VERSION_ID };
   * management.actions.getVersion(params, function (err, actionVersion) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params                Action parameters.
   * @param   {string}    params.id      Action ID.
   * @param   {string}    params.version_id     ActionVersion ID.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  getVersion(params, cb) {
    params = params || {};

    if (params.action_id) {
      params.id = params.action_id;
      delete params.action_id;
    }

    if (cb && cb instanceof Function) {
      return this.actionVersions.get(params, cb);
    }

    return this.actionVersions.get(params);
  }

  /**
   * Create an Action Version. In general, updating an action and then
   * deploying it is the preferred way of creating an action version, but
   * this operation is supported as a way of creating versions without
   * updating the action's code (which can be useful in some CI/CD scenarios).
   *
   * @example
   * var params = { id: ACTION_ID };
   * management.actions.createActionVersion(params, data, function (err, actionVersion) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params                Action parameters.
   * @param   {string}    params.id      Action ID.
   * @param   {object}    data                  ActionVersion parameters.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  createVersion(params, data, cb) {
    params = params || {};

    if (params.action_id) {
      params.id = params.action_id;
      delete params.action_id;
    }

    if (cb && cb instanceof Function) {
      return this.actionVersions.create(params, data, cb);
    }

    return this.actionVersions.create(params, data);
  }

  /**
   * deploy an Action Version to roll back to a previous version.
   *
   * @example
   * var params = { id: ACTION_ID, version_id: VERSION_ID };
   * management.actions.deployVersion(params, function (err, actionVersion) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params                Action parameters.
   * @param   {string}    params.id      Action ID.
   * @param   {string}    params.version_id     Action ID.
   * @param   {boolean}   params.update_draft   Update draft
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  deployVersion(params, cb) {
    params = params || {};

    if (params.action_id) {
      params.id = params.action_id;
      delete params.action_id;
    }

    const body = {};

    if (params.update_draft) {
      body.update_draft = params.update_draft;
      delete params.update_draft;
    }

    if (cb && cb instanceof Function) {
      return this.actionVersionDeploy.create(params, body, cb);
    }

    return this.actionVersionDeploy.create(params, body);
  }

  /**
   * Get an execution by ID.
   *
   * @example
   * management.actions.getExecution({ execution_id: EXECUTION_ID }, function (err, action) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(ActionExecution);
   * });
   * @param   {object}    params                  Action Execution parameters.
   * @param   {string}    params.id     Action Execution ID.
   * @param   {Function}  [cb]                    Callback function.
   * @returns  {Promise|undefined}
   */
  getExecution(params, cb) {
    params = params || {};

    if (cb && cb instanceof Function) {
      return this.executions.get(params, cb);
    }

    return this.executions.get(params);
  }
}

module.exports = ActionsManager;
