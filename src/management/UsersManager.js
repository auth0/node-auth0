var ArgumentError = require('rest-facade').ArgumentError;
var Auth0RestClient = require('../Auth0RestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */


/**
 * @class
 * Abstracts interaction with the users endpoint.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 */
var UsersManager = function (options){
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };
  
  this.users = new Auth0RestClient(options.baseUrl + '/users/:id', clientOptions, options.tokenProvider);

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Users/delete_multifactor_by_provider
   * Multifactor Provider endpoint}.
   *
   * @type {external:RestClient}
   */
  this.multifactor = new Auth0RestClient(options.baseUrl + '/users/:id/multifactor/:provider', clientOptions, options.tokenProvider);

  /**
   * Provides a simple abstraction layer for linking user accounts.
   *
   * @type {external:RestClient}
   */
  this.identities = new Auth0RestClient(options.baseUrl + '/users/:id/identities/:provider/:user_id', clientOptions, options.tokenProvider);

  /**
   * Provides a simple abstraction layer for user logs
   *
   * @type {external:RestClient}
   */
  this.userLogs = new Auth0RestClient(options.baseUrl + '/users/:id/logs', clientOptions, options.tokenProvider);

  /**
   * Provides an abstraction layer for retrieving Guardian enrollments.
   *
   * @type {external:RestClient}
   */
  this.enrollments = new Auth0RestClient(options.baseUrl + '/users/:id/enrollments', clientOptions, options.tokenProvider);
};


/**
 * Create a new user.
 *
 * @method    create
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * management.users.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // User created.
 * });
 *
 * @param   {Object}    data    User data.
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.create = function (data, cb) {
  if (cb && cb instanceof Function) {
    return this.users.create(data, cb);
  }

  return this.users.create(data);
};


/**
 * Get all users.
 *
 * @method    getAll
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example <caption>
 *   This method takes an optional object as first argument that may be used to
 *   specify pagination settings and the search query.
 * </caption>
 *
 * // Pagination settings.
 * var params = {
 *   per_page: 10,
 *   page: 2
 * };
 *
 * management.users.getAll(function (err, users) {
 *   console.log(users.length);
 * });
 *
 * @param   {Object}    [params]          Users params.
 * @param   {Number}    [params.per_page] Number of users per page.
 * @param   {Number}    [params.page]     Page number.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.getAll = function (params) {
  return this.users.getAll.apply(this.users, arguments);
};


/**
 * Get a user by its id.
 *
 * @method    get
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * management.users.get({ id: USER_ID }, function (err, user) {
 *   console.log(user);
 * });
 *
 * @param   {Object}    data      The user data object.
 * @param   {String}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.get = function () {
  return this.users.get.apply(this.users, arguments);
};


/**
 * Update a user by its id.
 *
 * @method    update
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * var params = { id: USER_ID };
 *
 * management.users.update(params, data, function (err, user) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Updated user.
 *   console.log(user);
 * });
 *
 * @param   {Object}    params      The user parameters.
 * @param   {String}    params.id   The user id.
 * @param   {Object}    data        New user data.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.update = function () {
  return this.users.patch.apply(this.users, arguments);
};


/**
 * Update the user metadata.
 *
 * @method    updateUserMetadata
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * var params = { id: USER_ID };
 * var metadata = {
 *   address: '123th Node.js Street'
 * };
 *
 * management.users.updateUserMetadata(params, metadata, function (err, user) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Updated user.
 *   console.log(user);
 * });
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Object}    metadata    New user metadata.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.updateUserMetadata = function (params, metadata, cb) {
  var data = {
    user_metadata: metadata
  };

  if (cb && cb instanceof Function) {
    return this.users.patch(params, data, cb);
  }

  return this.users.patch(params, data);
};


/**
 * Update the app metadata.
 *
 * @method    updateAppMetadata
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * var params = { id: USER_ID };
 * var metadata = {
 *   foo: 'bar'
 * };
 *
 * management.users.updateAppMetadata(params, metadata, function (err, user) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Updated user.
 *   console.log(user);
 * });
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Object}    metadata    New app metadata.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.updateAppMetadata = function (params, metadata, cb) {
  var data = {
    app_metadata: metadata
  };

  if (cb && cb instanceof Function) {
    return this.users.patch(params, data, cb);
  }

  return this.users.patch(params, data);
};


/**
 * Delete a user by its id.
 *
 * @method    delete
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * management.users.delete({ id: USER_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // User deleted.
 * });
 *
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.delete = function (params) {
  if (typeof params !== 'object' || typeof params.id !== 'string') {
    throw new ArgumentError('You must provide an id for the delete method');
  }

  return this.users.delete.apply(this.users, arguments);
};


/**
 * Delete all users.
 *
 * @method    deleteAll
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * management.users.deleteAll(function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Users deleted
 * });
 *
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.deleteAll = function (cb) {
  if (typeof cb !== 'function') {
    var errorMsg = 'The deleteAll method only accepts a callback as argument';

    throw new ArgumentError(errorMsg);
  }

  return this.users.delete.apply(this.users, arguments);
};


/**
 * Delete a multifactor provider.
 *
 * @method    deleteMultifactorProvider
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * var params = { id: USER_ID, provider: MULTIFACTOR_PROVIDER };
 *
 * management.users.deleteMultifactorProvider(params, function (err, user) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Users accounts unlinked.
 * });
 *
 * @param   {Object}    params            Data object.
 * @param   {String}    params.id         The user id.
 * @param   {String}    params.provider   Multifactor provider.
 * @param   {Function}  [cb]              Callback function
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.deleteMultifactorProvider = function (params, cb) {
  params = params || {};

  if (!params.id || typeof params.id !== 'string') {
    throw new ArgumentError('The id parameter must be a valid user id');
  }

  if (!params.provider || typeof params.provider !== 'string') {
    throw new ArgumentError('Must specify a provider');
  }

  if (cb && cb instanceof Function) {
    return this.multifactor.delete(params, cb);
  }

  return this.multifactor.delete(params);
};


/**
 * Link the user with another account.
 *
 * @method    link
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * var params = { id: USER_ID };
 * var data = {
 * 	user_id: 'OTHER_USER_ID',
 * 	connection_id: 'CONNECTION_ID'
 * };
 *
 * management.users.link(params, data, function (err, user) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Users linked.
 * });
 *
 * @param   {String}    userId                ID of the primary user.
 * @param   {Object}    params                Secondary user data.
 * @param   {String}    params.user_id        ID of the user to be linked.
 * @param   {String}    params.connection_id  ID of the connection to be used.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.link = function (userId, params, cb) {
  var query = { id: userId };
  params = params || {};

  // Require a user ID.
  if (!userId || typeof userId !== 'string') {
    throw new ArgumentError('The userId cannot be null or undefined');
  }

  if (cb && cb instanceof Function) {
    return this.identities.create(query, params, cb);
  }

  return this.identities.create(query, params);
};


/**
 * Unlink the given accounts.
 *
 * @method    unlink
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * var params = { id: USER_ID, provider: 'auht0', user_id: OTHER_USER_ID };
 *
 * management.users.unlink(params, function (err, user) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Users accounts unlinked.
 * });
 *
 * @param   {Object}    params            Linked users data.
 * @param   {String}    params.id         Primary user ID.
 * @param   {String}    params.provider   Identity provider in use.
 * @param   {String}    params.user_id    Secondary user ID.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return {Promise|undefined}
 */
UsersManager.prototype.unlink = function (params, cb) {
  params = params || {};

  if (!params.id || typeof params.id !== 'string') {
    throw new ArgumentError('id field is required');
  }

  if (!params.user_id || typeof params.user_id !== 'string') {
    throw new ArgumentError('user_id field is required');
  }

  if (!params.provider || typeof params.provider !== 'string') {
    throw new ArgumentError('provider field is required');
  }

  if (cb && cb instanceof Function) {
    return this.identities.delete(params, cb);
  }

  return this.identities.delete(params);
};

/**
 * Get user's log events.
 *
 * @method    logs
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * var params = { id: USER_ID, page: 0, per_page: 50, sort: 'date:-1', include_totals: true };
 *
 * management.users.logs(params, function (err, logs) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(logs);
 * });
 *
 * @param   {Object}    params                Get logs data.
 * @param   {String}    params.id             User id.
 * @param   {Number}    params.per_page       Number of logs per page.
 * @param   {Number}    params.page           Page number.
 * @param   {String}    params.sort           The field to use for sorting. Use field:order where order is 1 for ascending and -1 for descending. For example date:-1.
 * @param   {Boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return {Promise|undefined}
 */
UsersManager.prototype.logs = function (params, cb) {
  params = params || {};

  if (!params.id || typeof params.id !== 'string') {
    throw new ArgumentError('id field is required');
  }

  return this.userLogs.get(params, cb);
};

/**
 * Get a list of Guardian enrollments.
 *
 * @method    getGuardianEnrollments
 * @memberOf  module:management.UsersManager.prototype
 *
 * @example
 * management.users.getGuardianEnrollments({ id: USER_ID }, function (err, enrollments) {
 *   console.log(enrollments);
 * });
 *
 * @param   {Object}    data      The user data object.
 * @param   {String}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
UsersManager.prototype.getGuardianEnrollments = function () {
  return this.enrollments.get.apply(this.enrollments, arguments);
};

module.exports = UsersManager;
