var jwt = require('jsonwebtoken');
var jwksClient = require('jwks-rsa');
var Promise = require('bluebird');

var ArgumentError = require('rest-facade').ArgumentError;

/**
 * @class
 * Abstracts the `oauth.create` method with additional id_token validation\
 * @constructor
 * @memberOf module:auth
 *
 * @param  {Object}              options                Authenticator options.
 * @param  {String}              options.baseUrl        The auth0 account URL.
 * @param  {String}              options.domain       AuthenticationClient server domain
 * @param  {String}              [options.clientId]     Default client ID.
 * @param  {String}              [options.clientSecret] Default client Secret.
 */
var OAUthWithIDTokenValidation = function(oauth, options) {
  if (!oauth) {
    throw new ArgumentError('Missing authenticator options');
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
};

/**
 * Creates an oauth request
 *
 * @method    create
 * @memberOf  module:auth.OAuthWithIDTokenValidation.prototype
 *
 * @param   {Object}    options               Options are passed through
 * @param   {Function}  [callbabck]           Callback function
 *
 * @return  {Promise|undefined}
 */
OAUthWithIDTokenValidation.prototype.create = function(params, data, callback) {
  const createAndValidate = this.oauth.create(params, data).then(r => {
    var _this = this;
    if (r.id_token) {
      var client = jwksClient({
        jwksUri: 'https://' + this.domain + '/.well-known/jwks.json'
      });
      function getKey(header, callback) {
        if (header.alg === 'HS256') {
          return callback(null, Buffer.from(_this.clientSecret, 'base64'));
        }
        client.getSigningKey(header.kid, function(err, key) {
          var signingKey = key.publicKey || key.rsaPublicKey;
          callback(err, signingKey);
        });
      }

      return new Promise((res, rej) => {
        jwt.verify(
          r.id_token,
          getKey,
          {
            algorithms: ['HS256', 'RS256']
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
  if (!callback) {
    return createAndValidate;
  }
  createAndValidate.then(r => callback(null, r)).catch(e => callback(e));
};

module.exports = OAUthWithIDTokenValidation;
