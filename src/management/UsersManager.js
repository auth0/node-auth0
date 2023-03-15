const { ArgumentError } = require('rest-facade');
const BaseManager = require('./BaseManager');

const { sanitizeArguments } = require('../utils');

/**
 * Abstracts interaction with the users endpoint.
 */
class UsersManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    this.users = this._getRestClient('/users/:id');

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Users/delete_multifactor_by_provider
     * Multifactor Provider endpoint}.
     *
     * @type {external:RestClient}
     */
    this.multifactor = this._getRestClient('/users/:id/multifactor/:provider');

    /**
     * Provides a simple abstraction layer for linking user accounts.
     *
     * @type {external:RestClient}
     */
    this.identities = this._getRestClient('/users/:id/identities/:provider/:user_id');

    /**
     * Provides a simple abstraction layer for user logs
     *
     * @type {external:RestClient}
     */
    this.userLogs = this._getRestClient('/users/:id/logs');

    /**
     * Provides an abstraction layer for retrieving Guardian enrollments.
     *
     * @type {external:RestClient}
     */
    this.enrollments = this._getRestClient('/users/:id/enrollments');

    /**
     * Provides an abstraction layer for the new "users-by-email" API
     *
     * @type {external:RestClient}
     */
    this.usersByEmail = this._getRestClient('/users-by-email');

    /**
     * Provides an abstraction layer for regenerating Guardian recovery codes.
     *
     * @type {external:RestClient}
     */
    this.recoveryCodeRegenerations = this._getRestClient('/users/:id/recovery-code-regeneration');

    /**
     * Provides an abstraction layer for invalidating all remembered browsers for MFA.
     *
     * @type {external:RestClient}
     */
    this.invalidateRememberBrowsers = this._getRestClient(
      '/users/:id/multifactor/actions/invalidate-remember-browser'
    );

    /**
     * Provides an abstraction layer for CRD on roles for a user
     *
     * @type {external:RestClient}
     */
    this.roles = this._getRestClient('/users/:id/roles');

    /**
     * Provides an abstraction layer for CRD on permissions directly on a user
     *
     * @type {external:RestClient}
     */
    this.permissions = this._getRestClient('/users/:id/permissions');

    /**
     * For CRUD on user's authenticators
     *
     * @type {external:RestClient}
     */
    this.authenticators = this._getRestClient('/users/:id/authenticators');

    this.organizations = this._getRestClient('/users/:id/organizations');

    this.authenticationMethods = this._getRestClient(
      '/users/:id/authentication-methods/:authentication_method_id'
    );
  }

  /**
   * Create a new user.
   *
   * @example
   * management.users.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User created.
   * });
   * @param   {object}    data    User data.
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  create(data, cb) {
    if (cb && cb instanceof Function) {
      return this.users.create(data, cb);
    }

    return this.users.create(data);
  }

  /**
   * Get all users.
   *
   * @example <caption>
   *   This method takes an optional object as first argument that may be used to
   *   specify pagination settings and the search query. If pagination options are
   *   not present, the first page of a limited number of results will be returned.
   * </caption>
   *
   * // Pagination settings.
   * var params = {
   *   per_page: 10,
   *   page: 0
   * };
   *
   * management.users.getAll(params, function (err, users) {
   *   console.log(users.length);
   * });
   * @param   {object}    [params]          Users params.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.users.getAll(...args);
  }

  /**
   * Get Users by an Email Address
   *
   * @example <caption>
   *   This method takes a first argument as the Email address to look for
   *   users, and uses the /users-by-email API, not the search API
   * </caption>
   *
   * management.users.getByEmail('email@address', function (err, users) {
   *   console.log(users);
   * });
   * @param   {string}    [email]                     Email address of user(s) to find
   * @param   {object}    [options]                   Additional options to pass to the endpoint
   * @param   {string}    [options.fields]            Comma-separated list of fields to include or exclude in the result
   * @param   {boolean}   [options.include_fields]    Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   * @param   {Function}  [cb]                        Callback function.
   * @returns  {Promise|undefined}
   */
  getByEmail(email, options, cb) {
    const { options: sanitizedOptions, cb: sanitizedCb } = sanitizeArguments(options, cb);

    return this.usersByEmail.getAll({ email, ...sanitizedOptions }, sanitizedCb);
  }

  /**
   * Get a user by its id.
   *
   * @example
   * management.users.get({ id: USER_ID }, function (err, user) {
   *   console.log(user);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.users.get(...args);
  }

  /**
   * Update a user by its id.
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
   * @param   {object}    params      The user parameters.
   * @param   {string}    params.id   The user id.
   * @param   {object}    data        New user data.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  update(...args) {
    return this.users.patch(...args);
  }

  /**
   * Update the user metadata.
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
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {object}    metadata    New user metadata.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  updateUserMetadata(params, metadata, cb) {
    const data = {
      user_metadata: metadata,
    };

    if (cb && cb instanceof Function) {
      return this.users.patch(params, data, cb);
    }

    return this.users.patch(params, data);
  }

  /**
   * Update the app metadata.
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
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {object}    metadata    New app metadata.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  updateAppMetadata(params, metadata, cb) {
    const data = {
      app_metadata: metadata,
    };

    if (cb && cb instanceof Function) {
      return this.users.patch(params, data, cb);
    }

    return this.users.patch(params, data);
  }

  /**
   * Delete a user by its id.
   *
   * @example
   * management.users.delete({ id: USER_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User deleted.
   * });
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  delete(params, ...restOfArgs) {
    if (typeof params !== 'object' || typeof params.id !== 'string') {
      throw new ArgumentError('You must provide an id for the delete method');
    }

    return this.users.delete(params, ...restOfArgs);
  }

  /**
   * Delete all users.
   *
   * @example
   * management.users.deleteAll(function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Users deleted
   * });
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   * @deprecated This method will be removed in the next major release.
   */
  deleteAll(cb, ...restOfArgs) {
    if (typeof cb !== 'function') {
      const errorMsg = 'The deleteAll method only accepts a callback as argument';

      throw new ArgumentError(errorMsg);
    }

    return this.users.delete(cb, ...restOfArgs);
  }

  /**
   * Delete a multifactor provider.
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
   * @param   {object}    params            Data object.
   * @param   {string}    params.id         The user id.
   * @param   {string}    params.provider   Multifactor provider.
   * @param   {Function}  [cb]              Callback function
   * @returns  {Promise|undefined}
   */
  deleteMultifactorProvider(params, cb) {
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
  }

  /**
   * Link the user with another account.
   *
   * @example
   * var userId = 'USER_ID';
   * var params = {
   *   user_id: 'OTHER_USER_ID',
   *   connection_id: 'CONNECTION_ID'
   * };
   *
   * management.users.link(userId, params, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Users linked.
   * });
   * @param   {string}    userId                ID of the primary user.
   * @param   {object}    params                Secondary user data.
   * @param   {string}    params.user_id        ID of the user to be linked.
   * @param   {string}    params.connection_id  ID of the connection to be used.
   * @param   {string}    params.provider       Identity provider of the secondary user account being linked.
   * @param   {string}    params.link_with      JWT for the secondary account being linked. If sending this parameter, provider, user_id, and connection_id must not be sent.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  link(userId, params, cb) {
    const query = { id: userId };
    params = params || {};

    // Require a user ID.
    if (!userId) {
      throw new ArgumentError('The userId cannot be null or undefined');
    }
    if (typeof userId !== 'string') {
      throw new ArgumentError('The userId has to be a string');
    }

    if (cb && cb instanceof Function) {
      return this.identities.create(query, params, cb);
    }

    return this.identities.create(query, params);
  }

  /**
   * Unlink the given accounts.
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
   * @param   {object}    params            Linked users data.
   * @param   {string}    params.id         Primary user ID.
   * @param   {string}    params.provider   Identity provider in use.
   * @param   {string}    params.user_id    Secondary user ID.
   * @param   {Function}  [cb]              Callback function.
   * @returns {Promise|undefined}
   */
  unlink(params, cb) {
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
  }

  /**
   * Get user's log events.
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
   * @param   {object}    params                Get logs data.
   * @param   {string}    params.id             User id.
   * @param   {number}    params.per_page       Number of results per page.
   * @param   {number}    params.page           Page number, zero indexed.
   * @param   {string}    params.sort           The field to use for sorting. Use field:order where order is 1 for ascending and -1 for descending. For example date:-1.
   * @param   {boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
   * @param   {Function}  [cb]                  Callback function.
   * @returns {Promise|undefined}
   */
  logs(params, cb) {
    params = params || {};

    if (!params.id || typeof params.id !== 'string') {
      throw new ArgumentError('id field is required');
    }

    return this.userLogs.get(params, cb);
  }

  /**
   * Get a list of Guardian enrollments.
   *
   * @example
   * management.users.getGuardianEnrollments({ id: USER_ID }, function (err, enrollments) {
   *   console.log(enrollments);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianEnrollments(...args) {
    return this.enrollments.get(...args);
  }

  /**
   * Generate new Guardian recovery code.
   *
   * @example
   * management.users.regenerateRecoveryCode("USER_ID", function (err, result) {
   *   console.log(result.recovery_code);
   * });
   * @param   {object}    params                Get logs data.
   * @param   {string}    params.id             User id.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  regenerateRecoveryCode(params, cb) {
    if (!params || !params.id) {
      throw new ArgumentError('The userId cannot be null or undefined');
    }

    if (cb && cb instanceof Function) {
      return this.recoveryCodeRegenerations.create(params, {}, cb);
    }

    return this.recoveryCodeRegenerations.create(params, {});
  }

  /**
   * Invalidate all remembered browsers for MFA.
   *
   * @example
   * management.users.invalidateRememberBrowser({ id: USER_ID }, function (err, result) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Invalidated all remembered browsers.
   * });
   * @param   {object}    params                The user data object.
   * @param   {string}    params.id             The user id.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  invalidateRememberBrowser(params, cb) {
    if (!params || !params.id) {
      throw new ArgumentError('The userId cannot be null or undefined');
    }

    if (cb && cb instanceof Function) {
      return this.invalidateRememberBrowsers.create(params, {}, cb);
    }

    return this.invalidateRememberBrowsers.create(params, {});
  }

  /**
   * Get a list of roles for a user.
   *
   * @example
   * management.users.getRoles({ id: USER_ID }, function (err, roles) {
   *   console.log(roles);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  getRoles(...args) {
    return this.roles.getAll(...args);
  }

  /**
   * Assign roles to a user
   *
   * @example
   * var params =  { id : 'USER_ID';
   * var data = { "roles" : ["roleId1", "roleID2"]};
   *
   * management.users.assignRoles(params, data, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // roles added.
   * });
   * @param   {object}    params       params object
   * @param   {string}    params.id    user_id
   * @param   {string}    data         data object containing list of role IDs
   * @param   {string}    data.roles  Array of role IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */

  assignRoles(params, data, cb) {
    const query = params || {};
    data = data || {};

    // Require a user ID.
    if (!params.id) {
      throw new ArgumentError('The user_id cannot be null or undefined');
    }
    if (typeof params.id !== 'string') {
      throw new ArgumentError('The user_id has to be a string');
    }

    if (cb && cb instanceof Function) {
      return this.roles.create(query, data, cb);
    }

    return this.roles.create(query, data);
  }

  /**
   * Remove roles from a user
   *
   * @example
   * var params =  { id : 'USER_ID';
   * var data = { "roles" : ["roleId1", "roleID2"]};
   *
   * management.users.removeRoles(params, data, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // roles removed.
   * });
   * @param   {object}    params       params object
   * @param   {string}    params.id    user_id
   * @param   {string}    data         data object containing list of role IDs
   * @param   {string}    data.roles  Array of role IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */

  removeRoles(params, data, cb) {
    const query = params || {};
    data = data || {};

    // Require a user ID.
    if (!params.id) {
      throw new ArgumentError('The user_id cannot be null or undefined');
    }
    if (typeof params.id !== 'string') {
      throw new ArgumentError('The user_id has to be a string');
    }

    if (cb && cb instanceof Function) {
      return this.roles.delete(query, data, cb);
    }

    return this.roles.delete(query, data);
  }

  /**
   * Get a list of permissions for a user.
   *
   * @example
   * management.users.getPermissions({ id: USER_ID }, function (err, permissions) {
   *   console.log(permissions);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  getPermissions(...args) {
    return this.permissions.getAll(...args);
  }

  /**
   * Assign permissions to a user
   *
   * @example
   * var params =  { id : 'USER_ID';
   * var data = { "permissions" : [{"permission_name" :"do:something" ,"resource_server_identifier" :"test123" }]};
   *
   * management.users.assignPermissions(params, data, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // permissions added.
   * });
   * @param   {object}    params       params object
   * @param   {string}    params.id    user_id
   * @param   {string}    data         data object containing list of permissions
   * @param   {string}    data.permissions  Array of permission IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */

  assignPermissions(params, data, cb) {
    const query = params || {};
    data = data || {};

    // Require a user ID.
    if (!params.id) {
      throw new ArgumentError('The user_id cannot be null or undefined');
    }
    if (typeof params.id !== 'string') {
      throw new ArgumentError('The user_id has to be a string');
    }

    if (cb && cb instanceof Function) {
      return this.permissions.create(query, data, cb);
    }

    return this.permissions.create(query, data);
  }

  /**
   * Remove permissions from a user
   *
   * @example
   * var params =  { id : 'USER_ID';
   * var data = { "permissions" : [{"permission_name" :"do:something" ,"resource_server_identifier" :"test123" }]};
   *
   * management.users.removePermissions(params, data, function (err, user) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // permissions removed.
   * });
   * @param   {object}    params       params object
   * @param   {string}    params.id    user_id
   * @param   {object}    data         data object containing list of permission IDs
   * @param   {string}    data.permissions  Array of permission IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */

  removePermissions(params, data, cb) {
    const query = params || {};
    data = data || {};

    // Require a user ID.
    if (!params.id) {
      throw new ArgumentError('The user_id cannot be null or undefined');
    }
    if (typeof params.id !== 'string') {
      throw new ArgumentError('The user_id has to be a string');
    }

    if (cb && cb instanceof Function) {
      return this.permissions.delete(query, data, cb);
    }

    return this.permissions.delete(query, data);
  }

  deleteAllAuthenticators(params, cb) {
    const query = params || {};

    // Require a user ID.
    if (!query.id) {
      throw new ArgumentError('The user_id cannot be null or undefined');
    }
    if (typeof query.id !== 'string') {
      throw new ArgumentError('The user_id has to be a string');
    }

    if (cb && cb instanceof Function) {
      return this.authenticators.delete(query, cb);
    }

    return this.authenticators.delete(query);
  }

  /**
   * Get a list of organizations for a user.
   *
   * @example
   * management.users.getUserOrganizations({ id: USER_ID }, function (err, orgs) {
   *   console.log(orgs);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  getUserOrganizations(...args) {
    return this.organizations.getAll(...args);
  }

  /**
   * Gets a list of authentication methods.
   *
   * @param   {object}    params      The user data object.
   * @param   {string}    params.id   The user id.
   * @param   {Function}  [cb]        Callback function.
   * @returns  {Promise|undefined}
   */
  getAuthenticationMethods(...args) {
    return this.authenticationMethods.getAll(...args);
  }

  /**
   * Gets an authentication method by ID.
   *
   * @param   {object}    params                          The user data object.
   * @param   {string}    params.id                       The user id.
   * @param   {string}    params.authentication_method_id The authentication method id.
   * @param   {Function}  [cb]                            Callback function.
   * @returns  {Promise|undefined}
   */
  getAuthenticationMethodById(...args) {
    return this.authenticationMethods.get(...args);
  }

  /**
   * Creates an authentication method for a given user.
   *
   * @param   {object}    params                          The user data object.
   * @param   {string}    params.id                       The user id.
   * @param   {object}    data                            Authentication method data.
   * @param   {Function}  [cb]                            Callback function.
   * @returns  {Promise|undefined}
   */
  createAuthenticationMethod(...args) {
    return this.authenticationMethods.create(...args);
  }

  /**
   * Updates all authentication methods for a user by replacing them with the given ones.
   *
   * @param   {object}    params                          The user data object.
   * @param   {string}    params.id                       The user id.
   * @param   {object}    data                            Updated authentication method data.
   * @param   {Function}  [cb]                            Callback function.
   * @returns  {Promise|undefined}
   */
  updateAuthenticationMethods(...args) {
    return this.authenticationMethods.update(...args);
  }

  /**
   * Updates an authentication method.
   *
   * @param   {object}    params                          The user data object.
   * @param   {string}    params.id                       The user id.
   * @param   {string}    params.authentication_method_id The authentication method id.
   * @param   {object}    data                            Updated authentication method data.
   * @param   {Function}  [cb]                            Callback function.
   * @returns  {Promise|undefined}
   */
  updateAuthenticationMethodById(...args) {
    return this.authenticationMethods.patch(...args);
  }

  /**
   * Deletes all authentication methods for the given user.
   *
   * @param   {object}    params                          The user data object.
   * @param   {string}    params.id                       The user id.
   * @param   {Function}  [cb]                            Callback function.
   * @returns  {Promise|undefined}
   */
  deleteAuthenticationMethods(...args) {
    return this.authenticationMethods.delete(...args);
  }

  /**
   * Deletes an authentication method by ID.
   *
   * @param   {object}    params                          The user data object.
   * @param   {string}    params.id                       The user id.
   * @param   {string}    params.authentication_method_id The authentication method id.
   * @param   {object}    data                            Updated authentication method data.
   * @param   {Function}  [cb]                            Callback function.
   * @returns  {Promise|undefined}
   */
  deleteAuthenticationMethodById(...args) {
    return this.authenticationMethods.delete(...args);
  }
}

module.exports = UsersManager;
