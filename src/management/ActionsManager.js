var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class ActionsManager
 * {@link https://auth0.com/docs/api/v2#!/Actions/get_actions Actions} provide a way to extend
 * Auth0 flows with custom logic.
 * See the {@link https://auth0.com/docs/actions Actions documentation} for more information.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var ActionsManager = function(options) {
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
   * @type {Object}
   */
  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 Actions endpoint]{@link https://auth0.com/docs/api/v2#!/actions}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:id',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);

  var actionsDeployRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:id/deploy',
    clientOptions,
    options.tokenProvider
  );
  this.actionsDeploy = new RetryRestClient(actionsDeployRestClient, options.retry);

  var actionsTestRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:id/test',
    clientOptions,
    options.tokenProvider
  );
  this.actionsTest = new RetryRestClient(actionsTestRestClient, options.retry);

  var triggersRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/triggers/:trigger_id',
    clientOptions,
    options.tokenProvider
  );
  this.triggers = new RetryRestClient(triggersRestClient, options.retry);

  var triggerBindingsRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/triggers/:trigger_id/bindings',
    clientOptions,
    options.tokenProvider
  );
  this.triggerBindings = new RetryRestClient(triggerBindingsRestClient, options.retry);

  var executionsRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/executions/:execution_id',
    clientOptions,
    options.tokenProvider
  );
  this.executions = new RetryRestClient(executionsRestClient, options.retry);

  var actionVersionRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:id/versions/:version_id',
    clientOptions,
    options.tokenProvider
  );
  this.actionVersions = new RetryRestClient(actionVersionRestClient, options.retry);

  var deployActionVersionRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:id/versions/:version_id/deploy',
    clientOptions,
    options.tokenProvider
  );
  this.actionVersionDeploy = new RetryRestClient(deployActionVersionRestClient, options.retry);
};

/**
 * Get all Triggers.
 *
 * @method    getAllTriggers
 * @memberOf  module:management.ActionsManager.prototype
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
 *
 * @param   {Object}    [params]               Actions parameters.
 * @param   {Number}    [params.per_page]      Number of results per page.
 * @param   {Number}    [params.page]          Page number, zero indexed.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.getAllTriggers = function(params, cb) {
  params = params || {};

  if (cb && cb instanceof Function) {
    return this.triggers.getAll(params, cb);
  }

  return this.triggers.getAll(params);
};

/**
 * Update the actions bound to a trigger .
 *
 * @method    updateTriggerBindings
 * @memberOf  module:management.ActionsManager.prototype
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
 *
 * @param   {Object}    params                Actions Binding parameters.
 * @param   {String}    params.trigger_id     Actions Trigger ID.
 * @param   {Object}    data                  bindings array
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.updateTriggerBindings = function(params, data, cb) {
  params = params || {};

  if (cb && cb instanceof Function) {
    return this.triggerBindings.patch(params, data, cb);
  }

  return this.triggerBindings.patch(params, data);
};

/**
 * Get the actions bound to a trigger .
 *
 * @method    getTriggerBindings
 * @memberOf  module:management.ActionsManager.prototype
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
 *
 * @param   {Object}    params                Actions Binding parameters.
 * @param   {String}    params.trigger_id     Actions Trigger ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.getTriggerBindings = function(params, cb) {
  params = params || {};

  if (cb && cb instanceof Function) {
    return this.triggerBindings.getAll(params, cb);
  }

  return this.triggerBindings.getAll(params);
};

/**
 * Create a new Action.
 *
 * @method    create
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * management.actions.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Action created.
 * });
 *
 * @param   {Object}    data     Action data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsManager, 'create', 'resource.create');

/**
 * Get all actions.
 *
 * @method    getAll
 * @memberOf  module:management.ActionsManager.prototype
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
 *
 * @param   {Object}    [params]               Actions parameters.
 * @param   {Number}    [params.per_page]      Number of results per page.
 * @param   {Number}    [params.page]          Page number, zero indexed.
 * @param   {String}    [params.triggerId]     The trigger ID of the actions to retrieve.
 * @param   {String}    [params.actionName]    The name of the actions to retrieve.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 action.
 *
 * @method    get
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * management.actions.get({ id: ACTION_ID }, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(action);
 * });
 *
 * @param   {Object}    params               Action parameters.
 * @param   {String}    params.id     Action ID.
 * @param   {Function}  [cb]                 Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.get = function(params, cb) {
  params = params || {};

  if (params.action_id) {
    params.id = params.action_id;
    delete params.action_id;
  }

  if (cb && cb instanceof Function) {
    return this.resource.get(params, cb);
  }

  return this.resource.get(params);
};

/**
 * Update an existing action.
 *
 * @method    update
 * @memberOf  module:management.ActionsManager.prototype
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
 *
 * @param   {Object}    params        Action parameters.
 * @param   {String}    params.id     Action ID.
 * @param   {Object}    data          Updated action data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.update = function(params, data, cb) {
  params = params || {};

  if (params.action_id) {
    params.id = params.action_id;
    delete params.action_id;
  }

  if (cb && cb instanceof Function) {
    return this.resource.patch(params, data, cb);
  }

  return this.resource.patch(params, data);
};

/**
 * Delete an existing action. Deleting an Action deletes all the action's versions
 *
 * @method    delete
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * management.actions.delete({ id: ACTION_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Action deleted.
 * });
 *
 * @param   {Object}    params        Action parameters.
 * @param   {String}    params.id     Action ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.delete = function(params, cb) {
  params = params || {};

  if (params.action_id) {
    params.id = params.action_id;
    delete params.action_id;
  }

  if (cb && cb instanceof Function) {
    return this.resource.delete(params, cb);
  }

  return this.resource.delete(params);
};

/**
 * test an Action.
 *
 * @method    test
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * var params = { id: ACTION_ID};
 * management.actions.test(params, payload, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }

 * });
 *
 * @param   {Object}    params                Action parameters.
 * @param   {String}    params.id      Action ID.
 * @param   {Object}    payload               Payload represents the entire structure necessary to test a particular trigger
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.test = function(params, payload, cb) {
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
};

/**
 * deploy an Action.
 * The action must be in a state of 'built' before it can be deployed.
 *
 * @method    deploy
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * var params = { id: ACTION_ID};
 * mangement.actions.deploy(params, function (err, actionVersion) {
 *   if (err) {
 *     // Handle error.
 *   }

 * });
 *
 * @param   {Object}    params                Action parameters.
 * @param   {String}    params.id      Action ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.deploy = function(params, cb) {
  params = params || {};

  if (params.action_id) {
    params.id = params.action_id;
    delete params.action_id;
  }

  if (cb && cb instanceof Function) {
    return this.actionsDeploy.create(params, {}, cb);
  }

  return this.actionsDeploy.create(params, {});
};

/**
 * Get all action versions
 *
 * @method    getVersions
 * @memberOf  module:management.ActionsManager.prototype
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
 *
 * @param   {Object}    [params]               ActionVersions parameters.
 * @param   {Number}    [params.per_page]      Number of results per page.
 * @param   {Number}    [params.page]          Page number, zero indexed.
 * @param   {String}    [params.id]     Action ID.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.getVersions = function(params, cb) {
  params = params || {};

  if (params.action_id) {
    params.id = params.action_id;
    delete params.action_id;
  }

  if (cb && cb instanceof Function) {
    return this.actionVersions.getAll(params, cb);
  }

  return this.actionVersions.getAll(params);
};

/**
 * Get an Action Version.
 *
 * @method    getVersion
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * var params = { id: ACTION_ID, version_id: VERSION_ID };
 * management.actions.getVersion(params, function (err, actionVersion) {
 *   if (err) {
 *     // Handle error.
 *   }

 * });
 *
 * @param   {Object}    params                Action parameters.
 * @param   {String}    params.id      Action ID.
 * @param   {String}    params.version_id     ActionVersion ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.getVersion = function(params, cb) {
  params = params || {};

  if (params.action_id) {
    params.id = params.action_id;
    delete params.action_id;
  }

  if (cb && cb instanceof Function) {
    return this.actionVersions.get(params, cb);
  }

  return this.actionVersions.get(params);
};

/**
 * Create an Action Version. In general, updating an action and then
 * deploying it is the preferred way of creating an action version, but
 * this operation is supported as a way of creating versions without
 * updating the action's code (which can be useful in some CI/CD scenarios).
 *
 * @method    createVersion
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * var params = { id: ACTION_ID };
 * management.actions.createActionVersion(params, data, function (err, actionVersion) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params                Action parameters.
 * @param   {String}    params.id      Action ID.
 * @param   {Object}    data                  ActionVersion parameters.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.createVersion = function(params, data, cb) {
  params = params || {};

  if (params.action_id) {
    params.id = params.action_id;
    delete params.action_id;
  }

  if (cb && cb instanceof Function) {
    return this.actionVersions.create(params, data, cb);
  }

  return this.actionVersions.create(params, data);
};

/**
 * deploy an Action Version to roll back to a previous version.
 *
 * @method    deployVersion
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * var params = { id: ACTION_ID, version_id: VERSION_ID };
 * management.actions.deployVersion(params, function (err, actionVersion) {
 *   if (err) {
 *     // Handle error.
 *   }

 * });
 *
 * @param   {Object}    params                Action parameters.
 * @param   {String}    params.id      Action ID.
 * @param   {String}    params.version_id     Action ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.deployVersion = function(params, cb) {
  params = params || {};

  if (params.action_id) {
    params.id = params.action_id;
    delete params.action_id;
  }

  if (cb && cb instanceof Function) {
    return this.actionVersionDeploy.create(params, {}, cb);
  }

  return this.actionVersionDeploy.create(params, {});
};

/**
 * Get an execution by ID.
 *
 * @method    getExecution
 * @memberOf  module:management.ActionExecutionsManager.prototype
 *
 * @example
 * management.actions.getExecution({ execution_id: EXECUTION_ID }, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(ActionExecution);
 * });
 *
 * @param   {Object}    params                  Action Execution parameters.
 * @param   {String}    params.id     Action Execution ID.
 * @param   {Function}  [cb]                    Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.getExecution = function(params, cb) {
  params = params || {};

  if (cb && cb instanceof Function) {
    return this.executions.get(params, cb);
  }

  return this.executions.get(params);
};

module.exports = ActionsManager;
