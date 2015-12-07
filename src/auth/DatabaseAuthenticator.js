var extend = require('util')._extend;

var ArgumentError = require('../exceptions').ArgumentError;
var RestClient = require('rest-facade').Client;


/**
 * @class
 * Abstracts the sign-in, sign-up and change-password processes for Database &
 * Active Directory auhtentication services.
 * @constructor
 */
var DatabaseAuthenticator = function (options, oauth) {
  if (!options) {
    throw new ArgumentError('Missing authenticator options');
  }

  if (typeof options !== 'object') {
    throw new ArgumentError('The authenticator options must be an object');
  }

  var dbConnectionsUrl = options.baseUrl + '/dbconnections/:type';

  this.oauth = oauth;
  this.dbConnections = new RestClient(dbConnectionsUrl);
  this.clientId = options.clientId;
};


/**
 * Sign in using a database or active directory service.
 *
 * @method    signIn
 * @memberOf  DatabaseAuthenticator
 *
 * @param   {Object}  data              User credentials object.
 * @param   {String}  data.username     Username.
 * @param   {String}  data.password     User password.
 * @param   {Stinrg}  data.connection   Identity provider in use.
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
 *
 * @method    signUp
 * @memberOf  DatabaseAuthenticator
 *
 * @param   {Object}  data              User credentials object.
 * @param   {String}  data.email        User email address.
 * @param   {String}  data.password     User password.
 * @param   {Stinrg}  data.connection   Identity provider in use.
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
 * Change passwor using a database or active directory service.
 *
 * @method changePassword
 * @memberOf DatabaseAuthenticator
 *
 * @param   {Object}  data              User credentials object.
 * @param   {String}  data.email        User email address.
 * @param   {String}  data.password     New password.
 * @param   {Stinrg}  data.connection   Identity provider in use.
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


module.exports = DatabaseAuthenticator;
