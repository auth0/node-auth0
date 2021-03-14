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
 * Auth0 Actions Provider.
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
    options.baseUrl + '/actions/actions/:action_id',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);

  var actionsDeployRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:action_id/deploy',
    clientOptions,
    options.tokenProvider
  );
  this.actionsDeploy = new RetryRestClient(actionsDeployRestClient, options.retry);

  var actionsTestRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:action_id/test',
    clientOptions,
    options.tokenProvider
  );
  this.actionsTest = new RetryRestClient(actionsTestRestClient, options.retry);

  var triggersRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/triggers',
    clientOptions,
    options.tokenProvider
  );
  this.triggers = new RetryRestClient(triggersRestClient, options.retry);

  var triggerBindingsRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/trigger/:trigger_id/bindings',
    clientOptions,
    options.tokenProvider
  );
  this.triggerBindings = new RetryRestClient(triggerBindingsRestClient, options.retry);

  var triggersTestRestClient = new Auth0RestClient(
    options.baseUrl + '/actions/triggers/:trigger_id/test',
    clientOptions,
    options.tokenProvider
  );
  this.triggersTest = new RetryRestClient(triggersTestRestClient, options.retry);
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
 * test an Trigger.
 *
 * @method    testTrigger
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * var params = { trigger_id: TRIGGER_ID};
 * auth0.testTrigger(params, payload, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }

 * });
 *
 * @param   {Object}    params                Action parameters.
 * @param   {String}    params.trigger_id     Trigger ID.
 * @param   {Object}    payload               Payload represents the entire structure necessary to test a particular trigger
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.testTrigger = function(params, payload, cb) {
  params = params || {};
  payload = payload || {};

  if (cb && cb instanceof Function) {
    return this.triggersTest.create(params, payload, cb);
  }

  return this.triggersTest.create(params, payload);
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
 * management.getTriggerBindings(params, function (err, bindings) {
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
ActionsManager.prototype.getAll = function(params, cb) {
  params = params || {};

  if (cb && cb instanceof Function) {
    return this.triggerBindings.getAll(params, cb);
  }

  return this.triggerBindings.getAll(params);
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
 * management.updateTriggerBindings(params, data, function (err, bindings) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(bindings.length);  // 2
 * });
 *
 * @param   {Object}    params                Actions Binding parameters.
 * @param   {String}    params.trigger_id     Actions Trigger ID.
 * @param   {Object}    data                  bindings_id list
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.updateTriggerBindings = function(params, cb) {
  params = params || {};

  if (cb && cb instanceof Function) {
    return this.triggerBindings.patch(params, cb);
  }

  return this.triggerBindings.patch(params);
};

/**
 * Get an Auth0 action.
 *
 * @method    get
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * management.actions.get({ action_id: ACTION_ID }, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(action);
 * });
 *
 * @param   {Object}    params               Action parameters.
 * @param   {String}    params.action_id     Action ID.
 * @param   {Function}  [cb]                 Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsManager, 'get', 'resource.get');

/**
 * Update an existing action.
 *
 * @method    update
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * var data = { name: 'new-name' };
 * var params = { action_id: ACTION_ID };
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
 * @param   {String}    params.action_id     Action ID.
 * @param   {Object}    data          Updated action data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsManager, 'update', 'resource.patch');

/**
 * Delete an existing action. Deleting an Action deletes all the action's versions
 *
 * @method    delete
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * management.actions.delete({ action_id: ACTION_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Action deleted.
 * });
 *
 * @param   {Object}    params        Action parameters.
 * @param   {String}    params.action_id     Action ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsManager, 'delete', 'resource.delete');

/**
 * test an Action.
 *
 * @method    testAction
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * var params = { trigger_id: TRIGGER_ID};
 * auth0.testAction(params, payload, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }

 * });
 *
 * @param   {Object}    params                Action parameters.
 * @param   {String}    params.action_id      Action ID.
 * @param   {Object}    payload               Payload represents the entire structure necessary to test a particular trigger
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.testAction = function(params, payload, cb) {
  params = params || {};
  payload = payload || {};

  if (cb && cb instanceof Function) {
    return this.testAction.create(params, payload, cb);
  }

  return this.testAction.create(params, payload);
};

/**
 * deploy an Action.
 * The action must be in a state of 'built' before it can be deployed.
 *
 * @method    deployAction
 * @memberOf  module:management.ActionsManager.prototype
 *
 * @example
 * var params = { trigger_id: TRIGGER_ID};
 * auth0.deployAction(params, function (err, actionVersion) {
 *   if (err) {
 *     // Handle error.
 *   }

 * });
 *
 * @param   {Object}    params                Action parameters.
 * @param   {String}    params.action_id      Action ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionsManager.prototype.deployAction = function(params, cb) {
  params = params || {};

  if (cb && cb instanceof Function) {
    return this.deployAction.create(params, cb);
  }

  return this.deployAction.create(params);
};

module.exports = ActionsManager;
