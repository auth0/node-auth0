var jwt = require('jsonwebtoken');
var jwksClient = require('jwks-rsa');
var Promise = require('bluebird');

var ArgumentError = require('rest-facade').ArgumentError;

var HS256_IGNORE_VALIDATION_MESSAGE =
  'Validation of `id_token` requires a `clientSecret` when using the HS256 algorithm. To ensure tokens are validated, please switch the signing algorithm to RS256 or provide a `clientSecret` in the constructor.';

/**
 * @class
 * Abstracts the `oauth.create` method with additional id_token validation
 * @constructor
 * @memberOf module:auth
 *
 * @param  {Object}              oauth                               An instance of @type {OAuthAuthenticator}
 * @param  {Object}              options                             Authenticator options.
 * @param  {String}              options.domain                      AuthenticationClient server domain
 * @param  {String}              [options.clientId]                  Default client ID.
 * @param  {String}              [options.clientSecret]              Default client Secret.
 * @param  {String}              [options.supportedAlgorithms]       Algorithms that your application expects to receive
 * @param  {Boolean}             [options.__bypassIdTokenValidation] Whether the id_token should be validated or not
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
  this.__bypassIdTokenValidation = options.__bypassIdTokenValidation;
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
  const _this = this;
  const createAndValidate = this.oauth.create(params, data).then(r => {
    if (_this.__bypassIdTokenValidation) {
      return r;
    }
    if (r.id_token) {
      function getKey(header, callback) {
        if (header.alg === 'HS256') {
          if (!_this.clientSecret) {
            return callback({ message: HS256_IGNORE_VALIDATION_MESSAGE });
          }
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
          function(err) {
            if (!err) {
              return res(r);
            }
            if (err.message && err.message.includes(HS256_IGNORE_VALIDATION_MESSAGE)) {
              console.warn(HS256_IGNORE_VALIDATION_MESSAGE);
              return res(r);
            }
            return rej(err);
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
