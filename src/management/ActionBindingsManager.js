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
 * @class ActionBindingsManager
 * Auth0 ActionBindings Provider.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var ActionBindingsManager = function(options) {
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
   * [Auth0 ActionBindings endpoint]{@link https://auth0.com/docs/api/v2#!/actionsBindings}.
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
 * Create a new ActionBinding.
 *
 * @method    create
 * @memberOf  module:management.ActionBindingsManager.prototype
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
 * auth0.createActionBinding(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *    // ActionBinding created.
 * });
 * @param   {Object}    params                 ActionBinding parameters.
 * @param   {String}    params.triggger_id     Action Trigger ID.
 * @param   {Object}    data                   ActionBinding data object.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionBindingsManager, 'create', 'resource.create');

/**
 * Get all actionsBindings by trigger id.
 *
 * @method    getAll
 * @memberOf  module:management.ActionBindingsManager.prototype
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
 * management.actionBindings.getAll({ trigger_id: TRIGGER_ID }, function (err, actionBindings) {
 *   console.log(actionBindings.length);
 * });
 *
 * @param   {Object}    [params]               ActionBindings parameters.
 * @param   {Number}    [params.per_page]      Number of results per page.
 * @param   {Number}    [params.page]          Page number, zero indexed.
 * @param   {String}    [params.trigger_id]    trigger ID.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionBindingsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 action binding.
 *
 * @method    get
 * @memberOf  module:management.ActionBindingsManager.prototype
 *
 * @example
 * management.actionBindings.get({ id: ACTION_ID }, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(action);
 * });
 *
 * @param   {Object}    params                ActionBindings parameters.
 * @param   {String}    params.trigger_id     Action trigger ID.
 * @param   {String}    params.binding_id     Action trigger binding ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionBindingsManager, 'get', 'resource.get');

/**
 * Update an existing action binding.
 *
 * @method    update
 * @memberOf  module:management.ActionBindingsManager.prototype
 *
 * @example
 * var data = { display_name: 'new-display_name' };
 * var params = { trigger_id: TRIGGER_ID, binding_id: BINDING_ID };
 *
 * // Using auth0 instance.
 * management.updateActionBindings(params, data, function (err, actionBinding) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(actionBinding.display_name);  // 'new-display_name'
 * });
 *
 * // Using the ActionBindings manager directly.
 * management.actionBindings.update(params, data, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(action.name);  // 'new-name'
 * });
 *
 * @param   {Object}    params                Actions Binding parameters.
 * @param   {String}    params.trigger_id     Actions Trigger ID.
 * @param   {String}    params.binding_id     Actions Binding ID.
 * @param   {Object}    data                  Updated action binding data.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionBindingsManager, 'update', 'resource.patch');

/**
 * Delete an existing action binding.
 *
 * @method    delete
 * @memberOf  module:management.ActionBindingsManager.prototype
 *
 * @example
 * management.actionBindings.delete({ trigger_id: TRIGGER_ID , binding_id: BINDING_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Action Binding deleted.
 * });
 *
 * @param   {Object}    params                Action  Binding parameters.
 * @param   {String}    params.trigger_id     Action Trigger ID.
 * @param   {String}    params.binding_id     Action  Binding ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionBindingsManager, 'delete', 'resource.delete');

module.exports = ActionBindingsManager;
