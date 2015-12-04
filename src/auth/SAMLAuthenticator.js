var extend = require('util')._extend;

var ArgumentError = require('../exceptions').ArgumentError;
var RestClient = require('rest-facade').Client;


/**
 * @class
 * Abstracts the sign-in, sign-up and change-password processes for SAML
 * auhtentication services.
 * @constructor
 */
var SAMLAuthenticator = function (options) {
  if (!options) {
    throw new ArgumentError('Missing authenticator options');
  }

  if (typeof options !== 'object') {
    throw new ArgumentError('The authenticator options must be an object');
  }

  var samlUrl = 'https://' + options.domain + '/samlp/:type/:client_id';

  this.saml = new RestClient(samlUrl);
  this.clientId = options.clientId;
};


/**
 *
 * @method getMetadata
 * @memberOf SAMLAuthenticator
 */
SAMLAuthenticator.prototype.getMetadata = function (userData, cb) {
};


module.exports = SAMLAuthenticator;
