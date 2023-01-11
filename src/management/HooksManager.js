const { ArgumentError } = require('rest-facade');
const BaseManager = require('./BaseManager');

/**
 * The hooks manager class provides a simple abstraction for performing CRUD operations
 * on Auth0 HooksManagers.
 */
class HooksManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://auth0.com/docs/api/v2#!/HooksManagers Auth0 HooksManagers}.
     *
     * @type {external:RestClient}
     */
    this.resource = this._getRestClient('/hooks/:id');

    this.secrets = this._getRestClient('/hooks/:id/secrets');
  }

  /**
   * Create a new hook.
   *
   * @example
   * management.hooks.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Hook created.
   * });
   * @param   {object}    data     Hook data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get all hooks.
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
   * @param   {object}    [params]          Hooks parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Get an Auth0 hook.
   *
   * @example
   * management.hooks.get({ id: HOOK_ID }, function (err, hook) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(hook);
   * });
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }

  /**
   * Update an existing hook.
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
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {object}    data          Updated hook data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  update(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Delete an existing hook.
   *
   * @example
   * management.hooks.delete({ id: HOOK_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Hook deleted.
   * });
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     Hook ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }

  /**
   * Get Hook secrets
   *
   * @example <caption>
   *   This method takes a first argument as the hookId and returns the secrets for the hook. The secret values will be hidden.
   * </caption>
   *
   * var params = {id : 'HOOK_ID'}
   *
   * management.hooks.getSecrets( {id : 'HOOK_ID'}, function (err, secrets) {
   *   console.log(secrets);
   * });
   * @param   {object}    params            Hook parameters.
   * @param   {string}    params.id         ID of the Hook.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getSecrets(params, callback) {
    return this.secrets.getAll(params, callback);
  }

  /**
   * Add secrets in a hook
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
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     ID of the Hook.
   * @param   {object}    data          object containing secrets as key/value pairs
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */

  addSecrets(params, data, cb) {
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
  }

  /**
   * Update secrets in a hook
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
   * @param   {object}    params        Hook parameters.
   * @param   {string}    params.id     ID of the Hook.
   * @param   {object}    data          object containing secrets as key/value pairs
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */

  updateSecrets(params, data, cb) {
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
  }

  /**
   * Remove secrets from a hook
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
   * @param   {object}    params      Hook parameters.
   * @param   {string}    params.id   ID of the Hook.
   * @param   {object}    data        Array of secret names
   * @param   {Function}  [cb]        Callback function.
   * @returns  {Promise|undefined}
   */

  removeSecrets(params, data, cb) {
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
  }
}

module.exports = HooksManager;
