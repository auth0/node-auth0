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
 * @class ActionVersionsManager
 * Auth0 ActionVersion Provider.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var ActionVersionsManager = function(options) {
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
   * [Auth0 ActionVersions endpoint]{@link https://auth0.com/docs/api/v2#!/actionVersions}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:action_id/versions/:version_id',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Create a new ActionVersion.
 *
 * @method    create
 * @memberOf  module:management.ActionVersionsManager.prototype
 *
 * @example
 * var params = { action_id: ACTION_ID };
 * auth0.createActionVersion(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *    // ActionVersion created.
 * });
 *
 * @param   {Object}    params                ActionVersion parameters.
 * @param   {String}    params.action_id      Action ID.
 * @param   {Object}    data                  ActionVersion data object.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionVersionsManager, 'create', 'resource.create');

/**
 * Get all action versions
 *
 * @method    getAll
 * @memberOf  module:management.ActionVersionsManager.prototype
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
 * management.actionVersions.getAll({ action_id: ACTION_ID }, function (err, actionVersions) {
 *   console.log(actionVersions.length);
 * });
 *
 * @param   {Object}    [params]               ActionVersions parameters.
 * @param   {Number}    [params.per_page]      Number of results per page.
 * @param   {Number}    [params.page]          Page number, zero indexed.
 * @param   {String}    [params.action_id]     Action ID.
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionVersionsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 action version.
 *
 * @method    get
 * @memberOf  module:management.ActionManager.prototype
 *
 * @example
 * management.actionVersions.get({ action_id: ACTION_ID, version_id : VERSION_ID }, function (err, actionVersion) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(actionVersion);
 * });
 *
 * @param   {Object}    params                ActionVersion parameters.
 * @param   {String}    params.action_id      Action ID.
 * @param   {String}    params.version_id     Action version ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionVersionsManager, 'get', 'resource.get');

/**
 * Delete an existing action version.
 *
 * @method    delete
 * @memberOf  module:management.ActionVersionsManager.prototype
 *
 * @example
 * management.actionVersions.delete({ action_id: ACTION_ID, version_id : VERSION_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Action version deleted.
 * });
 *
 * @param   {Object}    params                Action parameters.
 * @param   {String}    params.action_id      Action ID.
 * @param   {String}    params.version_id     Action version ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionVersionsManager, 'delete', 'resource.delete');

module.exports = ActionVersionsManager;
