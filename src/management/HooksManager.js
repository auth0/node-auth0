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
 * @class HooksManager
 * The hooks manager class provides a simple abstraction for performing CRUD operations
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
  this.resource = new RetryRestClient(auth0RestClient, options.retry);

  var hookSecretsClient = new Auth0RestClient(
    options.baseUrl + '/hooks/:id/secrets',
    clientOptions,
    options.tokenProvider
  );
  this.secrets = new RetryRestClient(hookSecretsClient, options.retry);
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
utils.wrapPropertyMethod(HooksManager, 'create', 'resource.create');

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
 *   per_page: 10,
 *   page: 0
 * };
 *
 * management.hooks.getAll(params, function (err, hooks) {
 *   console.log(hooks.length);
 * });
 *
 * @param   {Object}    [params]          Hooks parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(HooksManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 hook.
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
utils.wrapPropertyMethod(HooksManager, 'get', 'resource.get');

/**
 * Update an existing hook.
 *
 * @method    update
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * var data = { name: 'New name' };
 * var params = { id: HOOK_ID };
 *
 * // Using auth0 instance.
 * management.updateHook(params, data, function (err, hook) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(hook.name);  // 'New name'
 * });
 *
 * // Using the hooks manager directly.
 * management.hooks.update(params, data, function (err, hook) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(hook.name);  // 'New name'
 * });
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Object}    data          Updated hook data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(HooksManager, 'update', 'resource.patch');

/**
 * Delete an existing hook.
 *
 * @method    delete
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * management.hooks.delete({ id: HOOK_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Hook deleted.
 * });
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     Hook ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(HooksManager, 'delete', 'resource.delete');

/**
 * Get Hook secrets
 *
 * @method    getSecrets
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * var params = {id : 'HOOK_ID'}
 * @example <caption>
 *   This method takes a first argument as the hookId and returns the secrets for the hook. The secret values will be hidden.
 * </caption>
 *
 * management.hooks.getSecrets( {id : 'HOOK_ID'}, function (err, secrets) {
 *   console.log(secrets);
 * });
 *
 * @param   {Object}    params            Hook parameters.
 * @param   {String}    params.id         ID of the Hook.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
HooksManager.prototype.getSecrets = function(params, callback) {
  return this.secrets.getAll(params, callback);
};

/**
 * Add secrets in a hook
 *
 * @method    addSecrets
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * var params =  { id :'HOOK_ID'};
 * var data   = { "DB_USER" :  "jdoe", "DB_PASS": "password123!"};
 *
 * management.hooks.addSecrets(params, data, function (err, secrets) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // secrets added.
 * });
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     ID of the Hook.
 * @param   {Object}    data          object containing secrets as key/value pairs
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */

HooksManager.prototype.addSecrets = function(params, data, cb) {
  params = params || {};
  data = data || {};

  // Require an ID.
  if (!params.id) {
    throw new ArgumentError('The id passed in params cannot be null or undefined');
  }

  if (typeof params.id !== 'string') {
    throw new ArgumentError('The hook Id has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.secrets.create(params, data, cb);
  }

  return this.secrets.create(params, data);
};

/**
 * Update secrets in a hook
 *
 * @method    updateSecrets
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * var params =  { id :'HOOK_ID'};
 * var data   = { "DB_USER" :  "jdoe", "DB_PASS": "password123!"};
 *
 * management.hooks.updateSecrets(params, data, function (err, secrets) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // secrets updated.
 * });
 *
 * @param   {Object}    params        Hook parameters.
 * @param   {String}    params.id     ID of the Hook.
 * @param   {Object}    data          object containing secrets as key/value pairs
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */

HooksManager.prototype.updateSecrets = function(params, data, cb) {
  params = params || {};
  data = data || {};

  // Require an ID.
  if (!params.id) {
    throw new ArgumentError('The id passed in params cannot be null or undefined');
  }

  if (typeof params.id !== 'string') {
    throw new ArgumentError('The hook Id has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.secrets.patch(params, data, cb);
  }

  return this.secrets.patch(params, data);
};

/**
 * Remove secrets from a hook
 *
 * @method    removeSecrets
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * var params =  { id :'HOOK_ID'};
 * var data =["DB_PASS"];
 *
 * management.hooks.removeSecrets(params, data, function (err, hook) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // secrets added.
 * });
 *
 * @param   {Object}    params      Hook parameters.
 * @param   {String}    params.id   ID of the Hook.
 * @param   {Object}    data        Array of secret names
 * @param   {Function}  [cb]        Callback function.
 *
 * @return  {Promise|undefined}
 */

HooksManager.prototype.removeSecrets = function(params, data, cb) {
  params = params || {};
  data = data || {};

  // Require an ID.
  if (!params.id) {
    throw new ArgumentError('The id passed in params cannot be null or undefined');
  }

  if (typeof params.id !== 'string') {
    throw new ArgumentError('The hook Id has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.secrets.delete(params, data, cb);
  }

  return this.secrets.delete(params, data);
};

module.exports = HooksManager;
