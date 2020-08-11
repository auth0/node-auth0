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
 * Get all actions by trigger id.
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
 *   page: 0
 * };
 *
 * management.actions.getAll({ trigger_id: TRIGGER_ID }, function (err, actions) {
 *   console.log(actions.length);
 * });
 *
 * @param   {Object}    [params]               Actions parameters.
 * @param   {Number}    [params.per_page]      Number of results per page.
 * @param   {Number}    [params.page]          Page number, zero indexed.
 * @param   {String}    [params.trigger_id]     Actions trigger ID.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 action.
 *
 * @method    get
 * @memberOf  module:management.ActionManager.prototype
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
 * Delete an existing action.
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

module.exports = ActionsManager;
