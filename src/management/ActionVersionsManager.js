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

  var deployVersionsClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:action_id/versions/:version_id/deploy',
    clientOptions,
    options.tokenProvider
  );
  this.actionVersion = new RetryRestClient(deployVersionsClient, options.retry);

  var testVersionsClient = new Auth0RestClient(
    options.baseUrl + '/actions/actions/:action_id/versions/:version_id/test',
    clientOptions,
    options.tokenProvider
  );
  this.testActionVersion = new RetryRestClient(testVersionsClient, options.retry);
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
 * deploy an ActionVersion.
 *
 * @method    deploy
 * @memberOf  module:management.ActionVersionsManager.prototype
 *
 * @example
 * var params = { action_id: ACTION_ID , version_id: VERSION_ID};
 * auth0.deployActionVersion(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *    // ActionVersion deployed.
 * });
 *
 * @param   {Object}    params                ActionVersion parameters.
 * @param   {String}    params.action_id      Action ID.
 * @param   {String}    params.verion_id      Version ID.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionVersionsManager.prototype.deploy = function(params, data, cb) {
  params = params || {};
  data = data || {};

  if (cb && cb instanceof Function) {
    return this.actionVersion.create(params, data, cb);
  }

  return this.actionVersion.create(params, data);
};

/**
 * test an ActionVersion.
 *
 * @method    test
 * @memberOf  module:management.ActionVersionsManager.prototype
 *
 * @example
 * var params = { action_id: ACTION_ID , version_id: VERSION_ID};
 * auth0.testActionVersion(params, payload, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 
 * });
 *
 * @param   {Object}    params                ActionVersion parameters.
 * @param   {String}    params.action_id      Action ID.
 * @param   {String}    params.version_id     Version ID.
 * @param   {Object}    payload               Payload represents the entire structure necessary to test a particular action version
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
ActionVersionsManager.prototype.test = function(params, payload, cb) {
  params = params || {};
  payload = payload || {};

  if (cb && cb instanceof Function) {
    return this.testActionVersion.create(params, payload, cb);
  }

  return this.testActionVersion.create(params, payload);
};

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
 * Get an action version.
 *
 * @method    get
 * @memberOf  module:management.ActionVersionsManager.prototype
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

/**
 * Update/create an draft action version.
 *
 * @method    upsertDraft
 * @memberOf  module:management.ActionVersionsManager.prototype
 *
 * @example
 * var params = { action_id: ACTION_ID , version_id: VERSION_ID};
 *
 * // Using auth0 instance.
 * management.upsertDraftActionVersion(params, data, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(draftActionVersion);
 * });
 *
 * // Using the ActionVersions manager directly.
 * management.actionVersions.upsertDraft(params, data, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(draftActionVersion);
 * });
 *
 * @param   {Object}    params               Action parameters.
 * @param   {String}    params.action_id     Action ID.
 * @param   {String}    params.version_id    This value must be 'draft'.
 * @param   {Object}    data                 Updated action data.
 * @param   {Function}  [cb]                 Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionVersionsManager, 'upsertDraft', 'resource.patch');

module.exports = ActionVersionsManager;
