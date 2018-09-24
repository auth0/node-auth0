var jwt = require('jsonwebtoken');
var jwksClient = require('jwks-rsa');
var Promise = require('bluebird');

var ArgumentError = require('rest-facade').ArgumentError;

/**
 * @class
 * Abstracts the `oauth.create` method with additional id_token validation
 * @constructor
 * @memberOf module:auth
 *
 * @param  {Object}              oauth                           An instance of @type {OAuthAuthenticator}
 * @param  {Object}              options                         Authenticator options.
 * @param  {String}              options.domain                  AuthenticationClient server domain
 * @param  {String}              [options.clientId]              Default client ID.
 * @param  {String}              [options.clientSecret]          Default client Secret.
 * @param  {String}              [options.supportedAlgorithms]   Algorithms that your application expects to receive
 */
var OAUthWithIDTokenValidation = function(oauth, options) {
  if (!oauth) {
    throw new ArgumentError('Missing OAuthAuthenticator param');
  }

  if (!options) {
    throw new ArgumentError('Missing authenticator options');
  }

  if (typeof options !== 'object') {
    throw new ArgumentError('The authenticator options must be an object');
  }

  this.oauth = oauth;
  this.clientId = options.clientId;
  this.clientSecret = options.clientSecret;
  this.domain = options.domain;
  this.supportedAlgorithms = options.supportedAlgorithms || ['HS256', 'RS256'];
  this._jwksClient = jwksClient({
    jwksUri: 'https://' + options.domain + '/.well-known/jwks.json'
  });
};

/**
 * Creates an oauth request and validates the id_token (if any)
 *
 * @method    create
 * @memberOf  module:auth.OAuthWithIDTokenValidation.prototype
 *
 * @param   {Object}    params            OAuth parameters that are passed through
 * @param   {Object}    data              Custom parameters sent to the OAuth endpoint
 * @param   {Function}  [callback]        Callback function
 *
 * @return  {Promise|undefined}
 */
OAUthWithIDTokenValidation.prototype.create = function(params, data, cb) {
  const createAndValidate = this.oauth.create(params, data).then(r => {
    var _this = this;
    if (r.id_token) {
      function getKey(header, callback) {
        if (header.alg === 'HS256') {
          return callback(null, Buffer.from(_this.clientSecret, 'base64'));
        }
        _this._jwksClient.getSigningKey(header.kid, function(err, key) {
          if (err) {
            return callback(err);
          }
          var signingKey = key.publicKey || key.rsaPublicKey;
          return callback(null, signingKey);
        });
      }
      return new Promise((res, rej) => {
        jwt.verify(
          r.id_token,
          getKey,
          {
            algorithms: this.supportedAlgorithms,
            audience: this.clientId,
            issuer: 'https://' + this.domain + '/'
          },
          function(err, payload) {
            if (err) {
              return rej(err);
            }
            return res(r);
          }
        );
      });
    }
    return r;
  });
  if (!cb) {
    return createAndValidate;
  }
  createAndValidate.then(r => cb(null, r)).catch(e => cb(e));
};

module.exports = OAUthWithIDTokenValidation;
