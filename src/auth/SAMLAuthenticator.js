var extend = require('util')._extend;

var ArgumentError = require('../exceptions').ArgumentError;
var RestClient = require('rest-facade').Client;


/**
 * @class
 * Abstracts the sign-in, sign-up and change-password processes for SAML
 * auhtentication services.
 * @constructor
 */
var SAMLAuthenticator = function (options, oauth) {
  if (!options) {
    throw new ArgumentError('Missing authenticator options');
  }

  if (typeof options !== 'object') {
    throw new ArgumentError('The authenticator options must be an object');
  }

  var samlUrl = 'https://' + options.domain + '/samlp/:type/:client_id';

  this.oauth = oauth;
  this.saml = new RestClient(samlUrl);
  this.clientId = options.clientId;
};


/**
 * Initiate SAML login.
 *
 * @method signIn
 * @memberOf SAMLAuthenticator
 */
SAMLAuthenticator.prototype.signIn = function (params, cb) {
  var defaultFields = {
    client_id: this.clientId
  };
  var data = extend(defaultFields, userData);

  if (typeof params !== 'object'
      || typeof data.connection !== 'string'
      || data.connection.trim().length === 0) {
    throw new ArgumentError('connection field is required');
  }

  return this.saml.get(data, cb);
};


/**
 *
 * @method getMetadata
 * @memberOf SAMLAuthenticator
 */
SAMLAuthenticator.prototype.getMetadata = function (userData, cb) {
};


module.exports = SAMLAuthenticator;
