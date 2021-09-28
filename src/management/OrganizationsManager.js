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
 * @class OrganizationsManager
 * The organizations class provides a simple abstraction for performing CRUD operations
 * on Auth0 OrganizationsManager.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var OrganizationsManager = function(options) {
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
   * {@link https://auth0.com/docs/api/v2}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/organizations/:id',
    clientOptions,
    options.tokenProvider
  );
  this.organizations = new RetryRestClient(auth0RestClient, options.retry);

  var connectionsInRoleClient = new Auth0RestClient(
    options.baseUrl + '/organizations/:id/enabled_connections/:connection_id',
    clientOptions,
    options.tokenProvider
  );
  this.connections = new RetryRestClient(connectionsInRoleClient, options.retry);

  var membersClient = new Auth0RestClient(
    options.baseUrl + '/organizations/:id/members/:user_id',
    clientOptions,
    options.tokenProvider
  );
  this.members = new RetryRestClient(membersClient, options.retry);

  var invitationClient = new Auth0RestClient(
    options.baseUrl + '/organizations/:id/invitations/:invitation_id',
    clientOptions,
    options.tokenProvider
  );
  this.invitations = new RetryRestClient(invitationClient, options.retry);

  var rolesClient = new Auth0RestClient(
    options.baseUrl + '/organizations/:id/members/:user_id/roles',
    clientOptions,
    options.tokenProvider
  );
  this.roles = new RetryRestClient(rolesClient, options.retry);

  var organizationByNameClient = new Auth0RestClient(
    options.baseUrl + '/organizations/name/:name',
    clientOptions,
    options.tokenProvider
  );
  this.organizationsByName = new RetryRestClient(organizationByNameClient, options.retry);
};

/**
 * Create a new organization.
 *
 * @method    create
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * management.organizations.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Organization created.
 * });
 *
 * @param   {Object}    data     Organization data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'create', 'organizations.create');

/**
 * Get all organizations.
 *
 * @method    getAll
 * @memberOf  module:management.OrganizationsManager.prototype
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
 * management.organizations.getAll(params, function (err, organizations) {
 *   console.log(organizations.length);
 * });
 *
 * @param   {Object}    [params]          Organizations parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {String}    [params.from]     For checkpoint pagination, the Id from which to start selection from.
 * @param   {Number}    [params.take]     For checkpoint pagination, the number of entries to retrieve. Default 50.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'getAll', 'organizations.getAll');

/**
 * Get an Auth0 organization.
 *
 * @method    getByID
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * management.organizations.getByID({ id: ORGANIZATION_ID }, function (err, role) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(organization);
 * });
 *
 * @param   {Object}    params        Organization parameters.
 * @param   {String}    params.id     Organization ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'getByID', 'organizations.get');

/**
 * Get an Auth0 organization.
 *
 * @method    getByName
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * management.organizations.getByName({ name: ORGANIZATION_NAME}, function (err, role) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(organization);
 * });
 *
 * @param   {Object}    params        Organization parameters.
 * @param   {String}    params.name   Organization name.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'getByName', 'organizationsByName.get');

/**
 * Update an existing organization.
 *
 * @method    update
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var data = { display_name: 'New name' };
 * var params = { id: ORGANIZATION_ID };
 *
 * management.organizations.update(params, data, function (err, organization) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(organization.name);  // 'New name'
 * });
 *
 * @param   {Object}    params        Organization parameters.
 * @param   {String}    params.id     Organization ID.
 * @param   {Object}    data          Updated organization data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'update', 'organizations.patch');

/**
 * Delete an existing organization.
 *
 * @method    delete
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * management.organizations.delete({ id: ORGANIZATION_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Organization deleted.
 * });
 *
 * @param   {Object}    params        Organization parameters.
 * @param   {String}    params.id     Organization ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'delete', 'organizations.delete');

/**
 **** Organization Connections
 */

/**
 * Get Enabled Connections in a Organization
 *
 * @method    getEnabledConnections
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params = {id : 'ORGANIZATION_ID'}
 * @example <caption>
 *   This method takes an organization ID and returns the enabled connections in an Organization
 * </caption>
 *
 * management.organizations.getEnabledConnections( {id : 'ORGANIZATION_ID'}, function (err, enabled_connections) {
 *   console.log(enabled_connections);
 * });
 *
 * @param   {Object}    params        Organization parameters.
 * @param   {String}    params.id     Organization ID.
 * @param   {Function}  [cb]                Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.getEnabledConnections = function(params, callback) {
  return this.connections.getAll(params, callback);
};

/**
 * Get Enabled Connection in a Organization
 *
 * @method    getEnabledConnection
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params = {id : 'ORGANIZATION_ID', connection_id: 'CONNECTION_ID'}
 * @example <caption>
 *   This methods takes the organization ID and connection ID and returns the enabled connection
 * </caption>
 *
 * management.organizations.getEnabledConnections( {id : 'ORGANIZATION_ID', connection_id: 'CONNECTION_ID'}, function (err, enabled_connection) {
 *   console.log(enabled_connection);
 * });
 *
 * @param   {Object}    params        Organization parameters.
 * @param   {String}    params.id     Organization ID.
 * @param   {String}    params.connection_id     Connection ID.
 * @param   {Function}  [cb]                Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.getEnabledConnection = function(params, callback) {
  return this.connections.get(params, callback);
};

/**
 * Add an enabled connection for an organization
 *
 * @method    addEnabledConnection
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params =  { id :'ORGANIZATION_ID'};
 * var data = { "connection_id" : "CONNECTION_ID", assign_membership_on_login: false };
 *
 * management.organizations.addEnabledConnection(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params                Organization parameters
 * @param   {String}    params.id             ID of the Organization.
 * @param   {Object}    data                  enable connection data
 * @param   {String}    data.connection_id    connection ID to enable
 * @param   {Boolean}   data.assign_membership_on_login flag to allow assign membership on login
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */

OrganizationsManager.prototype.addEnabledConnection = function(params, data, cb) {
  data = data || {};
  params = params || {};

  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.connections.create(params, data, cb);
  }

  return this.connections.create(params, data);
};

/**
 * Remove an enabled connection from an organization
 *
 * @method    removeEnabledConnection
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params =  { id :'ORGANIZATION_ID', connection_id: 'CONNECTION_ID' };
 *
 * management.organizations.removeEnabledConnection(params, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 * @param   {Object}    params                Organization parameters
 * @param   {String}    params.id             ID of the Organization.
 * @param   {String}    params.connection_id  ID of the Connection.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */

OrganizationsManager.prototype.removeEnabledConnection = function(params, cb) {
  params = params || {};

  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (!params.connection_id) {
    throw new ArgumentError('The connection ID passed in params cannot be null or undefined');
  }
  if (typeof params.connection_id !== 'string') {
    throw new ArgumentError('The connection ID has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.connections.delete(params, {}, cb);
  }

  return this.connections.delete(params, {});
};

/**
 * Update an enabled connection from an organization
 *
 * @method    updateEnabledConnection
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params =  { id :'ORGANIZATION_ID', connection_id: 'CONNECTION_ID' };
 * var data = { assign_membership_on_login: true };
 *
 * management.organizations.updateEnabledConnection(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params                Organization parameters
 * @param   {String}    params.id             ID of the Organization.
 * @param   {String}    params.connection_id  ID of the Connection.
 * @param   {Object}    data                  Updated connection.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */

OrganizationsManager.prototype.updateEnabledConnection = function(params, data, cb) {
  data = data || {};
  params = params || {};

  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (!params.connection_id) {
    throw new ArgumentError('The connection ID passed in params cannot be null or undefined');
  }
  if (typeof params.connection_id !== 'string') {
    throw new ArgumentError('The connection ID has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.connections.patch(params, data, cb);
  }

  return this.connections.patch(params, data);
};

/**
 **** Organization Members
 */

/**
 * Get Members in a Organization
 *
 * @method    getMembers
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params = {id : 'ORGANIZATION_ID'}
 * @example <caption>
 *   This method takes an organization ID and returns the members in an Organization
 * </caption>
 *
 * management.organizations.getMembers( {id : 'ORGANIZATION_ID'}, function (err, members) {
 *   console.log(members);
 * });
 *
 * @param   {Object}    params        Organization parameters
 * @param   {String}    params.id     Organization ID
 * @param   {String}    [params.from] For checkpoint pagination, the Id from which to start selection from.
 * @param   {Number}    [params.take] For checkpoint pagination, the number of entries to retrieve. Default 50.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.getMembers = function(params, callback) {
  return this.members.getAll(params, callback);
};

/**
 * Add members in an organization
 *
 * @method    addMembers
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params =  { id :'ORGANIZATION_ID'};
 * var data = { members: [ 'USER_ID1', 'USER_ID2' ] }
 * management.organizations.addMembers(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params                Organization parameters
 * @param   {String}    params.id             ID of the Organization.
 * @param   {Object}    data                  add members data
 * @param   {Array}     data.members          Array of user IDs
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.addMembers = function(params, data, cb) {
  data = data || {};
  params = params || {};

  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.members.create(params, data, cb);
  }

  return this.members.create(params, data);
};

/**
 * Remove members from an organization
 *
 * @method    removeMembers
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params =  { id :'ORGANIZATION_ID' };
 * var data = { members: [ 'USER_ID1', 'USER_ID2' ] }
 *
 * management.organizations.removeMembers(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params                Organization parameters
 * @param   {String}    params.id             ID of the Organization.
 * @param   {Object}    data                  add members data
 * @param   {Array}     data.members          Array of user IDs
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.removeMembers = function(params, data, cb) {
  data = data || {};
  params = params || {};

  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.members.delete(params, data, cb);
  }

  return this.members.delete(params, data);
};

/**
 **** Organization Invites
 */

/**
 * Get Invites in a Organization
 *
 * @method   getInvitations
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params = {id : 'ORGANIZATION_ID'}
 * @example <caption>
 *   This method takes an organization ID and returns the invites in an Organization
 * </caption>
 *
 * management.organizations.getInvitations( {id : 'ORGANIZATION_ID'}, function (err, invites) {
 *   console.log(invites);
 * });
 *
 * @param   {Object}    params              Organization parameters
 * @param   {String}    params.id           Organization ID
 * @param   {Number}    [params.per_page]   Number of results per page.
 * @param   {Number}    [params.page]       Page number, zero indexed.
 * @param   {String}    [params.from]       For checkpoint pagination, the Id from which to start selection from.
 * @param   {Number}    [params.take]       For checkpoint pagination, the number of entries to retrieve. Default 50.
 * @param   {String}    [params.fields]     Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
 * @param   {Boolean}   [params.include_fields]     Whether specified fields are to be included (true) or excluded (false). Defaults to true.
 * @param   {String}    [params.sort]      Field to sort by. Use field:order where order is 1 for ascending and -1 for descending Defaults to created_at:-1.
 * @param   {Function}  [cb]                Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.getInvitations = function(params, callback) {
  return this.invitations.getAll(params, callback);
};

/**
 * Get an Invitation in a Organization
 *
 * @method    getInvitation
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params = {id : 'ORGANIZATION_ID', invitation_id: 'INVITATION_ID'}
 * @example <caption>
 *   This methods takes the organization ID and user ID and returns the invitation
 * </caption>
 *
 * management.organizations.getInvitation({id : 'ORGANIZATION_ID', invitation_id: 'INVITATION_ID'}, function (err, invite) {
 *   console.log(invite);
 * });
 *
 * @param   {Object}    params                 Organization parameters
 * @param   {String}    params.id              Organization ID
 * @param   {String}    params.invitation_id   Invitation ID
 * @param   {Function}  [cb]                   Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.getInvitation = function(params, callback) {
  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (!params.invitation_id) {
    throw new ArgumentError('The invitation ID passed in params cannot be null or undefined');
  }
  if (typeof params.invitation_id !== 'string') {
    throw new ArgumentError('The invitation ID has to be a string');
  }

  return this.invitations.get(params, callback);
};

/**
 * Create an invitation in an organization
 *
 * @method    createInvitation
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params =  { id :'ORGANIZATION_ID'};
 * var data = {
 *   client_id: CLIENT_ID,
 *   invitee: { email: 'invitee@example.com' },
 *   inviter: { name: 'John Doe' }
 * };
 *
 * management.organizations.createInvitation(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}  params                        Organization parameters
 * @param   {String}  params.id                     ID of the Organization.
 * @param   {Array}   data                          Invitation data
 * @param   {Object}  data.inviter                  The person who is sending the invite.
 * @param   {String}  data.inviter.name             Name of the person who is sending the invite
 * @param   {Object}  data.invitee                  Invitee to whom invitation is intended for
 * @param   {Object}  data.invitee.email            Email of the invitee to whom invitation is intended for
 * @param   {String}  data.client_id                Auth0 client used to resolve the default application login URI. This endpoint must expect &invitation=... and &organization=... parameters (added by API2) to continue the flow with /authorize. If client_id  does not have configured login URI, use the tenant level default login route if configured, otherwise return 400
 * @param   {String}  [data.connection_id]          Force user to authenticate against a specific identity provider.
 * @param   {Object}  [data.app_metadata]           Application metadata to be assigned to the user after accept the invitation.
 * @param   {Object}  [data.user_metadata]          User metadata to be assigned to the user after accept the invitation.
 * @param   {Array}   [data.roles]                  List of roles to be assigned to the user
 * @param   {Number}  [data.ttl_sec]                Number of seconds for which the invitation is valid before expiration. If unspecified or set to 0, this value defaults to 604800 seconds (7 days).  Upper limit on ttl_sec is 30 days.
 * @param   {Boolean} [data.send_invitation_email]  Whether the user will receive an invitation email (true) or no email (false). Default is true.
 * @param   {Function}  [cb]                        Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.createInvitation = function(params, data, cb) {
  data = data || [];
  params = params || {};

  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.invitations.create(params, data, cb);
  }

  return this.invitations.create(params, data);
};

/**
 * Delete an invitation from an organization
 *
 * @method    deleteInvitation
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params =  { id :'ORGANIZATION_ID', invitation_id: 'INVITATION_ID };
 *
 * management.organizations.deleteInvitation(params, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params                Organization parameters
 * @param   {String}    params.id             ID of the Organization.
 * @param   {String}    params.invitation_id  Invitation ID
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.deleteInvitation = function(params, cb) {
  params = params || {};

  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (!params.invitation_id) {
    throw new ArgumentError('The invitation ID passed in params cannot be null or undefined');
  }
  if (typeof params.invitation_id !== 'string') {
    throw new ArgumentError('The invitation ID has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.invitations.delete(params, {}, cb);
  }

  return this.invitations.delete(params, {});
};

/**
 **** Organization Roles Membership
 */

/**
 * Get Roles from a Member in a Organization
 *
 * @method    getMemberRoles
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params = {id : 'ORGANIZATION_ID', user_id: 'user_id'}
 * @example <caption>
 *   This methods takes the organization ID and user ID and returns the roles
 * </caption>
 *
 * management.organizations.getMemberRoles( {id : 'ORGANIZATION_ID', user_id: 'user_id'}, function (err, roles) {
 *   console.log(roles);
 * });
 *
 * @param   {Object}    params              Organization parameters
 * @param   {String}    params.id           ID of the Organization.
 * @param   {String}    params.user_id      ID of the user.
 * @param   {Function}  [cb]                Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.getMemberRoles = function(params, callback) {
  return this.roles.getAll(params, callback);
};

/**
 * Add a Role to a Member in an organization
 *
 * @method    addMemberRoles
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params =  {id : 'ORGANIZATION_ID', user_id: 'user_id'};
 * var data = { roles: ["ROLE_ID_1", "ROLE_ID_2"]}
 *
 * management.organizations.addMemberRoles(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params                Organization parameters
 * @param   {String}    params.id             ID of the Organization.
 * @param   {String}    params.user_id        ID of the user.
 * @param   {Object}    data                  Add member roles data.
 * @param   {Array}     data.roles            Array of role IDs.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.addMemberRoles = function(params, data, cb) {
  data = data || {};
  params = params || {};

  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (!params.user_id) {
    throw new ArgumentError('The user ID passed in params cannot be null or undefined');
  }
  if (typeof params.user_id !== 'string') {
    throw new ArgumentError('The user ID has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.roles.create(params, data, cb);
  }

  return this.roles.create(params, data);
};

/**
 * Remove Roles from a Member of an organization
 *
 * @method    removeMemberRoles
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var params =  { id :'ORGANIZATION_ID', user_id: 'USER_ID };
 * var data = { roles: ["ROLE_ID_1", "ROLE_ID_2"]}
 *
 * management.organizations.removeMemberRoles(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    params                Organization parameters
 * @param   {String}    params.id             ID of the Organization.
 * @param   {String}    params.user_id        Id of the User
 * @param   {Object}    data                  Remove member roles data.
 * @param   {Array}     data.roles            Array of role IDs.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
OrganizationsManager.prototype.removeMemberRoles = function(params, data, cb) {
  data = data || {};
  params = params || {};

  if (!params.id) {
    throw new ArgumentError('The organization ID passed in params cannot be null or undefined');
  }
  if (typeof params.id !== 'string') {
    throw new ArgumentError('The organization ID has to be a string');
  }

  if (!params.user_id) {
    throw new ArgumentError('The user ID passed in params cannot be null or undefined');
  }
  if (typeof params.user_id !== 'string') {
    throw new ArgumentError('The user ID has to be a string');
  }

  if (cb && cb instanceof Function) {
    return this.roles.delete(params, data, cb);
  }

  return this.roles.delete(params, data);
};

module.exports = OrganizationsManager;
