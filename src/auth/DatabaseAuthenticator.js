var extend = require('util')._extend;

var ArgumentError = require('rest-facade').ArgumentError;
var RestClient = require('rest-facade').Client;


/**
 * @class
 * Abstracts the sign-in, sign-up and change-password processes for Database &
 * Active Directory authentication services.
 * @constructor
 * @memberOf module:auth
 *
 * @param  {Object}              options            Authenticator options.
 * @param  {String}              options.baseUrl    The auth0 account URL.
 * @param  {String}              [options.clientId] Default client ID.
 * @param  {OAuthAuthenticator}  oauth              OAuthAuthenticator instance.
 */
var DatabaseAuthenticator = function (options, oauth) {
  if (!options) {
    throw new ArgumentError('Missing authenticator options');
  }

  if (typeof options !== 'object') {
    throw new ArgumentError('The authenticator options must be an object');
  }

  /**
   * Options object for the Rest Client instace.
   *
   * @type {Object}
   */
  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' }
  };

  this.oauth = oauth;
  this.dbConnections = new RestClient(options.baseUrl + '/dbconnections/:type', clientOptions);
  this.clientId = options.clientId;
};


/**
 * Sign in using a database or active directory service.
 * @method    signIn
 * @memberOf  module:auth.DatabaseAuthenticator.prototype
 *
 * @example <caption>
 *   Given the user credentials and the connection specified, it will do the
 *   authentication on the provider and return a JSON with the `access_token`
 *   and `id_token`. Find more information about the structure of the data
 *   object in the <a href="https://auth0.com/docs/auth-api#!#post--oauth-ro">
 *   API docs</a>.
 * </caption>
 *
 * var data = {
 *   username: '{USERNAME}',
 *   password: '{PASSWORD}',
 *   connection: 'Username-Password-Authentication' // Optional field.
 * };
 *
 * auth0.database.signIn(data, function (err, userData) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(userData);
 * });
 *
 * @param   {Object}    data              User credentials object.
 * @param   {String}    data.username     Username.
 * @param   {String}    data.password     User password.
 * @param   {String}    data.connection   Identity provider in use.
 * @param   {Function}  [cb]              Method callback.
 *
 * @return  {Promise|undefined}
 */
DatabaseAuthenticator.prototype.signIn = function (userData, cb) {
  var defaultFields = {
    connection: 'Username-Password-Authentication'
  };
  var data = extend(defaultFields, userData);

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.username !== 'string'
      || data.username.trim().length === 0) {
    throw new ArgumentError('username field is required');
  }

  if (typeof data.password !== 'string'
      || data.password.trim().length === 0) {
    throw new ArgumentError('password field is required');
  }

  return this.oauth.signIn(data, cb);
};


/**
 * Sign up using a database or active directory service.
 * @method    signUp
 * @memberOf  module:auth.DatabaseAuthenticator.prototype
 *
 * @example <caption>
 *   Given the user credentials, the connection specified and (optionally) the
 *   client ID, it will create a new user. Find more information in the
 *   <a href="https://auth0.com/docs/auth-api#!#post--dbconnections-signup">
 *   API Docs</a>.
 * </caption>
 *
 * var data = {
 *   email: '{EMAIL}',
 *   password: '{PASSWORD}',
 *   connection: 'Username-Password-Authentication' // Optional field.
 * };
 *
 * auth0.database.signUp(data, function (err, userData) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(userData);
 * });
 *
 * @param   {Object}    data              User credentials object.
 * @param   {String}    data.email        User email address.
 * @param   {String}    data.password     User password.
 * @param   {Stinrg}    data.connection   Identity provider in use.
 * @param   {Function}  [cb]              Method callback.
 *
 * @return  {Promise|undefined}
 */
DatabaseAuthenticator.prototype.signUp = function (userData, cb) {
  var params = {
    type: 'signup'
  };
  var defaultFields = {
    client_id: this.clientId
  };
  var data = extend(defaultFields, userData);

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.email !== 'string'
      || data.email.trim().length === 0) {
    throw new ArgumentError('email field is required');
  }

  if (typeof data.password !== 'string'
      || data.password.trim().length === 0) {
    throw new ArgumentError('password field is required');
  }

  if (typeof data.connection !== 'string'
      || data.connection.trim().length === 0) {
    throw new ArgumentError('connection field is required');
  }

  if (cb && cb instanceof Function) {
    return this.dbConnections.create(params, data, cb);
  }

  return this.dbConnections.create(params, data);
};


/**
 * Change password using a database or active directory service.
 *
 * @method    changePassword
 * @memberOf  module:auth.DatabaseAuthenticator.prototype
 *
 * @example <caption>
 *   Given the user email, the connection specified and the new password to
 *   use, Auth0 will send a forgot password email. Once the user clicks on the
 *   confirm password change link, the new password specified in this POST will
 *   be set to this user. Find more information in the
 *   <a href="https://auth0.com/docs/auth-api#!#post--dbconnections-change_password>
 *   API Docs</a>.
 * </caption>
 *
 * var data = {
 *   email: '{EMAIL}',
 *   password: '{PASSWORD}',
 *   connection: 'Username-Password-Authentication'
 * };
 *
 * auth0.database.changePassword(data, function (err, message) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(message);
 * });
 *
 * @param   {Object}    data              User credentials object.
 * @param   {String}    data.email        User email address.
 * @param   {String}    data.password     New password.
 * @param   {String}    data.connection   Identity provider in use.
 * @param   {Function}  [cb]              Method callback.
 *
 * @return  {Promise|undefined}
 */
DatabaseAuthenticator.prototype.changePassword = function (userData, cb) {
  var params = {
    type: 'change_password'
  };
  var defaultFields = {
    client_id: this.clientId
  };
  var data = extend(defaultFields, userData);

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.email !== 'string'
      || data.email.trim().length === 0) {
    throw new ArgumentError('email field is required');
  }

  if (typeof data.password !== 'string'
      || data.password.trim().length === 0) {
    throw new ArgumentError('password field is required');
  }

  if (typeof data.connection !== 'string'
      || data.connection.trim().length === 0) {
    throw new ArgumentError('connection field is required');
  }

  if (cb && cb instanceof Function) {
    return this.dbConnections.create(params, data, cb);
  }

  return this.dbConnections.create(params, data);
};


/**
 * Request a change password email using a database or active directory service.
 *
 * @method    requestChangePasswordEmail
 * @memberOf  module:auth.DatabaseAuthenticator.prototype
 *
 * @example <caption>
 *   Given the user email, the connection specified, Auth0 will send a change
 *   password email. once the user clicks on the confirm password change link,
 *   the new password specified in this POST will be set to this user. Find more
 *   information in the <a href="https://auth0.com/docs/auth-api#!#post--dbconnections-change_password>
 *   API Docs</a>.
 * </caption>
 *
 * var data = {
 *   email: '{EMAIL}',
 *   connection: 'Username-Password-Authentication'
 * };
 *
 * auth0.database.requestChangePasswordEmail(data, function (err, message) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(message);
 * });
 *
 * @param   {Object}    data              User credentials object.
 * @param   {String}    data.email        User email address.
 * @param   {String}    data.connection   Identity provider in use.
 * @param   {Function}  [cb]              Method callback.
 *
 * @return  {Promise|undefined}
 */
DatabaseAuthenticator.prototype.requestChangePasswordEmail = function (userData, cb) {
  var params = {
    type: 'change_password'
  };
  var defaultFields = {
    client_id: this.clientId
  };
  var data = extend(defaultFields, userData);

  if (!userData || typeof userData !== 'object') {
    throw new ArgumentError('Missing user data object');
  }

  if (typeof data.email !== 'string'
      || data.email.trim().length === 0) {
    throw new ArgumentError('email field is required');
  }

  if (typeof data.connection !== 'string'
      || data.connection.trim().length === 0) {
    throw new ArgumentError('connection field is required');
  }

  if (cb && cb instanceof Function) {
    return this.dbConnections.create(params, data, cb);
  }

  return this.dbConnections.create(params, data);
};


module.exports = DatabaseAuthenticator;
