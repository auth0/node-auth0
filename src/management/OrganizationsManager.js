const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * The organizations class provides a simple abstraction for performing CRUD operations
 * on Auth0 OrganizationsManager.
 */
class OrganizationsManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
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
     * @type {object}
     */
    const clientOptions = {
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://auth0.com/docs/api/v2}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/organizations/:id`,
      clientOptions,
      options.tokenProvider
    );
    this.organizations = new RetryRestClient(auth0RestClient, options.retry);

    const connectionsInRoleClient = new Auth0RestClient(
      `${options.baseUrl}/organizations/:id/enabled_connections/:connection_id`,
      clientOptions,
      options.tokenProvider
    );
    this.connections = new RetryRestClient(connectionsInRoleClient, options.retry);

    const membersClient = new Auth0RestClient(
      `${options.baseUrl}/organizations/:id/members/:user_id`,
      clientOptions,
      options.tokenProvider
    );
    this.members = new RetryRestClient(membersClient, options.retry);

    const invitationClient = new Auth0RestClient(
      `${options.baseUrl}/organizations/:id/invitations/:invitation_id`,
      clientOptions,
      options.tokenProvider
    );
    this.invitations = new RetryRestClient(invitationClient, options.retry);

    const rolesClient = new Auth0RestClient(
      `${options.baseUrl}/organizations/:id/members/:user_id/roles`,
      clientOptions,
      options.tokenProvider
    );
    this.roles = new RetryRestClient(rolesClient, options.retry);

    const organizationByNameClient = new Auth0RestClient(
      `${options.baseUrl}/organizations/name/:name`,
      clientOptions,
      options.tokenProvider
    );
    this.organizationsByName = new RetryRestClient(organizationByNameClient, options.retry);
  }

  /**
   * Create a new organization.
   *
   * @example
   * management.organizations.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Organization created.
   * });
   * @param   {object}    data     Organization data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.organizations.create(...args);
  }

  /**
   * Get all organizations.
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
   * @param   {object}    [params]          Organizations parameters.
   * @param   {number}    [params.per_page] Number of results per page.
   * @param   {number}    [params.page]     Page number, zero indexed.
   * @param   {string}    [params.from]     For checkpoint pagination, the Id from which to start selection from.
   * @param   {number}    [params.take]     For checkpoint pagination, the number of entries to retrieve. Default 50.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.organizations.getAll(...args);
  }

  /**
   * Get an Auth0 organization.
   *
   * @example
   * management.organizations.getByID({ id: ORGANIZATION_ID }, function (err, role) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(organization);
   * });
   * @param   {object}    params        Organization parameters.
   * @param   {string}    params.id     Organization ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getByID(...args) {
    return this.organizations.get(...args);
  }

  /**
   * Get an Auth0 organization.
   *
   * @example
   * management.organizations.getByName({ name: ORGANIZATION_NAME}, function (err, role) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(organization);
   * });
   * @param   {object}    params        Organization parameters.
   * @param   {string}    params.name   Organization name.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getByName(...args) {
    return this.organizationsByName.get(...args);
  }

  /**
   * Update an existing organization.
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
   * @param   {object}    params        Organization parameters.
   * @param   {string}    params.id     Organization ID.
   * @param   {object}    data          Updated organization data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  update(...args) {
    return this.organizations.patch(...args);
  }

  /**
   * Delete an existing organization.
   *
   * @example
   * management.organizations.delete({ id: ORGANIZATION_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Organization deleted.
   * });
   * @param   {object}    params        Organization parameters.
   * @param   {string}    params.id     Organization ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.organizations.delete(...args);
  }

  /**
   *Organization Connections
   */

  /**
   * Get Enabled Connections in a Organization
   *
   * @example <caption>
   *   This method takes an organization ID and returns the enabled connections in an Organization
   * </caption>
   * var params = {id : 'ORGANIZATION_ID'}
   *
   * management.organizations.getEnabledConnections( {id : 'ORGANIZATION_ID'}, function (err, enabled_connections) {
   *   console.log(enabled_connections);
   * });
   * @param   {object}    params        Organization parameters.
   * @param   {string}    params.id     Organization ID.
   * @param   {Function}  [cb]                Callback function.
   * @returns  {Promise|undefined}
   */
  getEnabledConnections(params, callback) {
    return this.connections.getAll(params, callback);
  }

  /**
   * Get Enabled Connection in a Organization
   *
   * @example <caption>
   *   This methods takes the organization ID and connection ID and returns the enabled connection
   * </caption>
   * var params = {id : 'ORGANIZATION_ID', connection_id: 'CONNECTION_ID'}
   *
   * management.organizations.getEnabledConnections( {id : 'ORGANIZATION_ID', connection_id: 'CONNECTION_ID'}, function (err, enabled_connection) {
   *   console.log(enabled_connection);
   * });
   * @param   {object}    params        Organization parameters.
   * @param   {string}    params.id     Organization ID.
   * @param   {string}    params.connection_id     Connection ID.
   * @param   {Function}  [callback]                Callback function.
   * @returns  {Promise|undefined}
   */
  getEnabledConnection(params, callback) {
    return this.connections.get(params, callback);
  }

  /**
   * Add an enabled connection for an organization
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
   * @param   {object}    params                Organization parameters
   * @param   {string}    params.id             ID of the Organization.
   * @param   {object}    data                  enable connection data
   * @param   {string}    data.connection_id    connection ID to enable
   * @param   {boolean}   data.assign_membership_on_login flag to allow assign membership on login
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */

  addEnabledConnection(params, data, cb) {
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
  }

  /**
   * Remove an enabled connection from an organization
   *
   * @example
   * var params =  { id :'ORGANIZATION_ID', connection_id: 'CONNECTION_ID' };
   *
   * management.organizations.removeEnabledConnection(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params                Organization parameters
   * @param   {string}    params.id             ID of the Organization.
   * @param   {string}    params.connection_id  ID of the Connection.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */

  removeEnabledConnection(params, cb) {
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
  }

  /**
   * Update an enabled connection from an organization
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
   * @param   {object}    params                Organization parameters
   * @param   {string}    params.id             ID of the Organization.
   * @param   {string}    params.connection_id  ID of the Connection.
   * @param   {object}    data                  Updated connection.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */

  updateEnabledConnection(params, data, cb) {
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
  }

  /**
   *Organization Members
   */

  /**
   * Get Members in a Organization
   *
   * @example <caption>
   *   This method takes an organization ID and returns the members in an Organization
   * </caption>
   *
   *  var params = {id : 'ORGANIZATION_ID'}
   *
   * management.organizations.getMembers( {id : 'ORGANIZATION_ID'}, function (err, members) {
   *   console.log(members);
   * });
   * @param   {object}    params        Organization parameters
   * @param   {string}    params.id     Organization ID
   * @param   {string}    [params.from] For checkpoint pagination, the Id from which to start selection from.
   * @param   {number}    [params.take] For checkpoint pagination, the number of entries to retrieve. Default 50.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  getMembers(params, callback) {
    return this.members.getAll(params, callback);
  }

  /**
   * Add members in an organization
   *
   * @example
   * var params =  { id :'ORGANIZATION_ID'};
   * var data = { members: [ 'USER_ID1', 'USER_ID2' ] }
   * management.organizations.addMembers(params, data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params                Organization parameters
   * @param   {string}    params.id             ID of the Organization.
   * @param   {object}    data                  add members data
   * @param   {Array}     data.members          Array of user IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  addMembers(params, data, cb) {
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
  }

  /**
   * Remove members from an organization
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
   * @param   {object}    params                Organization parameters
   * @param   {string}    params.id             ID of the Organization.
   * @param   {object}    data                  add members data
   * @param   {Array}     data.members          Array of user IDs
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  removeMembers(params, data, cb) {
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
  }

  /**
   *Organization Invites
   */

  /**
   * Get Invites in a Organization
   *
   * @example
   * var params = {id : 'ORGANIZATION_ID'}
   * @example <caption>
   *   This method takes an organization ID and returns the invites in an Organization
   * </caption>
   *
   * management.organizations.getInvitations( {id : 'ORGANIZATION_ID'}, function (err, invites) {
   *   console.log(invites);
   * @param callback
   * });
   * @param   {object}    params              Organization parameters
   * @param   {string}    params.id           Organization ID
   * @param   {number}    [params.per_page]   Number of results per page.
   * @param   {number}    [params.page]       Page number, zero indexed.
   * @param   {string}    [params.from]       For checkpoint pagination, the Id from which to start selection from.
   * @param   {number}    [params.take]       For checkpoint pagination, the number of entries to retrieve. Default 50.
   * @param   {string}    [params.fields]     Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   * @param   {boolean}   [params.include_fields]     Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   * @param   {string}    [params.sort]      Field to sort by. Use field:order where order is 1 for ascending and -1 for descending Defaults to created_at:-1.
   * @param   {Function}  [cb]                Callback function.
   * @returns  {Promise|undefined}
   */
  getInvitations(params, callback) {
    return this.invitations.getAll(params, callback);
  }

  /**
   * Get an Invitation in a Organization
   *
   * @example
   * var params = {id : 'ORGANIZATION_ID', invitation_id: 'INVITATION_ID'}
   * @param callback
   * @example <caption>
   *   This methods takes the organization ID and user ID and returns the invitation
   * </caption>
   *
   * management.organizations.getInvitation({id : 'ORGANIZATION_ID', invitation_id: 'INVITATION_ID'}, function (err, invite) {
   *   console.log(invite);
   * });
   * @param   {object}    params                 Organization parameters
   * @param   {string}    params.id              Organization ID
   * @param   {string}    params.invitation_id   Invitation ID
   * @param   {Function}  [cb]                   Callback function.
   * @returns  {Promise|undefined}
   */
  getInvitation(params, callback) {
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
  }

  /**
   * Create an invitation in an organization
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
   * @param   {object}  params                        Organization parameters
   * @param   {string}  params.id                     ID of the Organization.
   * @param   {Array}   data                          Invitation data
   * @param   {object}  data.inviter                  The person who is sending the invite.
   * @param   {string}  data.inviter.name             Name of the person who is sending the invite
   * @param   {object}  data.invitee                  Invitee to whom invitation is intended for
   * @param   {object}  data.invitee.email            Email of the invitee to whom invitation is intended for
   * @param   {string}  data.client_id                Auth0 client used to resolve the default application login URI. This endpoint must expect &invitation=... and &organization=... parameters (added by API2) to continue the flow with /authorize. If client_id  does not have configured login URI, use the tenant level default login route if configured, otherwise return 400
   * @param   {string}  [data.connection_id]          Force user to authenticate against a specific identity provider.
   * @param   {object}  [data.app_metadata]           Application metadata to be assigned to the user after accept the invitation.
   * @param   {object}  [data.user_metadata]          User metadata to be assigned to the user after accept the invitation.
   * @param   {Array}   [data.roles]                  List of roles to be assigned to the user
   * @param   {number}  [data.ttl_sec]                Number of seconds for which the invitation is valid before expiration. If unspecified or set to 0, this value defaults to 604800 seconds (7 days).  Upper limit on ttl_sec is 30 days.
   * @param   {boolean} [data.send_invitation_email]  Whether the user will receive an invitation email (true) or no email (false). Default is true.
   * @param   {Function}  [cb]                        Callback function.
   * @returns  {Promise|undefined}
   */
  createInvitation(params, data, cb) {
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
  }

  /**
   * Delete an invitation from an organization
   *
   * @example
   * var params =  { id :'ORGANIZATION_ID', invitation_id: 'INVITATION_ID };
   *
   * management.organizations.deleteInvitation(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    params                Organization parameters
   * @param   {string}    params.id             ID of the Organization.
   * @param   {string}    params.invitation_id  Invitation ID
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  deleteInvitation(params, cb) {
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
  }

  /**
   *Organization Roles Membership
   */

  /**
   * Get Roles from a Member in a Organization
   *
   * @example
   * var params = {id : 'ORGANIZATION_ID', user_id: 'user_id'}
   * @param callback
   * @example <caption>
   *   This methods takes the organization ID and user ID and returns the roles
   * </caption>
   *
   * management.organizations.getMemberRoles( {id : 'ORGANIZATION_ID', user_id: 'user_id'}, function (err, roles) {
   *   console.log(roles);
   * });
   * @param   {object}    params              Organization parameters
   * @param   {string}    params.id           ID of the Organization.
   * @param   {string}    params.user_id      ID of the user.
   * @param   {Function}  [cb]                Callback function.
   * @returns  {Promise|undefined}
   */
  getMemberRoles(params, callback) {
    return this.roles.getAll(params, callback);
  }

  /**
   * Add a Role to a Member in an organization
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
   * @param   {object}    params                Organization parameters
   * @param   {string}    params.id             ID of the Organization.
   * @param   {string}    params.user_id        ID of the user.
   * @param   {object}    data                  Add member roles data.
   * @param   {Array}     data.roles            Array of role IDs.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  addMemberRoles(params, data, cb) {
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
  }

  /**
   * Remove Roles from a Member of an organization
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
   * @param   {object}    params                Organization parameters
   * @param   {string}    params.id             ID of the Organization.
   * @param   {string}    params.user_id        Id of the User
   * @param   {object}    data                  Remove member roles data.
   * @param   {Array}     data.roles            Array of role IDs.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  removeMemberRoles(params, data, cb) {
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
  }
}

module.exports = OrganizationsManager;
