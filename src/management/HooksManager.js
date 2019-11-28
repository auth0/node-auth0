var ArgumentError = require('rest-facade').ArgumentError;
var HooksService = require('@auth0/hooks-api-core').Service;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * @class HooksManager
 * The hook class provides a simple abstraction for performing CRUD operations
 * on Auth0 HooksManagers.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var HooksManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
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
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for performing CRUD operations on
   * {@link https://auth0.com/docs/api/v2#!/HooksManagers Auth0 HooksManagers}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/hooks/:id',
    clientOptions,
    options.tokenProvider
  );
  this.resourceRest = new RetryRestClient(auth0RestClient, options.retry);
  this.resourceLib = new HooksService();
};

/**
 * Create a new hook.
 *
 * @method    create
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * management.hooks.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Hook created.
 * });
 *
 * @param   {Object}    data     Hook data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(HooksManager, 'create', 'resourceLib.createHook');

/**
 * Get all hooks.
 *
 * @method    getAll
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example <caption>
 *   This method takes an optional object as first argument that may be used to
 *   specify pagination settings. If pagination options are not present,
 *   the first page of a limited number of results will be returned.
 * </caption>
 *
 * // Pagination settings.
 * var params = {
 *   offset: 0,
 *   limit: 100
 * };
 * management.hooks.getAll(params, function (err, hooks) {
 *   console.log(hooks.length);
 * });
 *
 * @param   {Object}    [params]          Hooks parameters.
 * @param   {Number}    [params.offset]   Number of results per page.
 * @param   {Number}    [params.limit]    Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(HooksManager, 'getAll', 'resourceRest.getAll');

/**
 * Get a hook by id.
 *
 * @method    get
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * management.hooks.get({ id: HOOK_ID }, function (err, hook) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(hook);
 * });
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(HooksManager, 'get', 'resourceRest.get');

/**
 * Update an existing hook.
 *
 * @method    update
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * var data = { name: 'New name' };
 * var params = { id: HOOK_ID };
 * management.hooks.update(params, data, function (err, hook) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Hook updated.
 *   console.log(hook.name) // 'New name'
 * });
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Object}    data          Updated hook data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
HooksManager.prototype.update = function(params, data, cb) {
  if (cb && cb instanceof Function) {
    throw Error('Callback not supported in this iteration.');
  }

  // Return a promise.
  return this.resourceLib.updateHook({ ...data, id: params.id });
};

/**
 * Delete an existing hook.
 *
 * @method    delete
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * management.hooks.delete({ id : HOOK_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Hook deleted.
 * });
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 *
 * @return  {Promise|undefined}
 */
HooksManager.prototype.delete = function(params, cb) {
  if (cb && cb instanceof Function) {
    throw Error('Callback not supported in this iteration.');
  }

  // Return a promise.
  return this.resourceLib.deleteHookById(params.id);
};

module.exports = HooksManager;
