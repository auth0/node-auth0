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
 * @class ActionsTriggerBindingsManager
 * Auth0 ActionsTriggerBindings Provider.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var ActionsTriggerBindingsManager = function(options) {
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
   * [Auth0 ActionsTriggerBindings endpoint]{@link https://auth0.com/docs/api/v2#!/actionsTriggerBindings}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/actions/triggers/:trigger_id/bindings/:binding_id',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Create a new ActionsTriggerBinding.
 *
 * @method    create
 * @memberOf  module:management.ActionsTriggerBindingsManager.prototype
 *
 * @example
 * var params = { trigger_id: TRIGGER_ID };
 * const data = {
 *   action_id: ACTION_ID,
 *   display_name: "display name",
 *   secrets: [],
 *   configuration: [],
 *   metadata: {},
 * };
 * auth0.createActionTriggerBinding(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *    // ActionTriggerBinding created.
 * });
 * @param   {Object}    params                 ActionTriggerBinding parameters.
 * @param   {String}    params.triggger_id     Action Trigger ID.
 * @param   {Object}    data                   ActionTriggerBinding data object.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsTriggerBindingsManager, 'create', 'resource.create');

/**
 * Get all actionsTriggerBindings by trigger id.
 *
 * @method    getAll
 * @memberOf  module:management.ActionsTriggerBindingsManager.prototype
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
 * management.actionsTriggerBindings.getAll({ trigger_id: TRIGGER_ID }, function (err, actionsTriggerBindings) {
 *   console.log(actionsTriggerBindings.length);
 * });
 *
 * @param   {Object}    [params]               ActionsTriggerBindings parameters.
 * @param   {Number}    [params.per_page]      Number of results per page.
 * @param   {Number}    [params.page]          Page number, zero indexed.
 * @param   {String}    [params.trigger_id]     ActionsTriggerBindings trigger ID.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsTriggerBindingsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 action trigger binding.
 *
 * @method    get
 * @memberOf  module:management.ActionsTriggerBindingsManager.prototype
 *
 * @example
 * management.actionsTriggerBindings.get({ id: ACTION_ID }, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(action);
 * });
 *
 * @param   {Object}    params        ActionsTriggerBindings parameters.
 * @param   {String}    params.trigger_id     Action trigger ID.
 * @param   {String}    params.binding_id     Action trigger binding ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsTriggerBindingsManager, 'get', 'resource.get');

/**
 * Update an existing action trigger binding.
 *
 * @method    update
 * @memberOf  module:management.ActionsTriggerBindingsManager.prototype
 *
 * @example
 * var data = { display_name: 'new-display_name' };
 * var params = { trigger_id: TRIGGER_ID, binding_id: BINDING_ID };
 *
 * // Using auth0 instance.
 * management.updateActionsTriggerBindings(params, data, function (err, actionTriggerBinding) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(actionTriggerBinding.display_name);  // 'new-display_name'
 * });
 *
 * // Using the ActionsTriggerBindings manager directly.
 * management.actionsTriggerBindings.update(params, data, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(action.name);  // 'new-name'
 * });
 *
 * @param   {Object}    params                Actions Trigger Binding parameters.
 * @param   {String}    params.trigger_id     Actions Trigger ID.
 * @param   {String}    params.binding_id     Actions Trigger Binding ID.
 * @param   {Object}    data                  Updated action trigger binding data.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsTriggerBindingsManager, 'update', 'resource.patch');

/**
 * Delete an existing action trigger binding.
 *
 * @method    delete
 * @memberOf  module:management.ActionsTriggerBindingsManager.prototype
 *
 * @example
 * management.actionsTriggerBindings.delete({ trigger_id: TRIGGER_ID , binding_id: BINDING_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Action Trigger Binding deleted.
 * });
 *
 * @param   {Object}    params                Action Trigger Binding parameters.
 * @param   {String}    params.trigger_id     Action Trigger ID.
 * @param   {String}    params.binding_id     Action Trigger Binding ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsTriggerBindingsManager, 'delete', 'resource.delete');

module.exports = ActionsTriggerBindingsManager;
