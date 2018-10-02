const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const { ArgumentError } = require('rest-facade');

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
class OAUthWithIDTokenValidation {
  constructor(oauth, options) {
    if (!oauth) {
      throw new ArgumentError('Missing OAuthAuthenticator param');
    }

    if (!options) {
      throw new ArgumentError('Missing authenticator options');
    }

    if (typeof options !== 'object') {
      throw new ArgumentError('The authenticator options must be an object');
    }

    const { domain, clientId, clientSecret, supportedAlgorithms = ['HS256', 'RS256'] } = options;

    this.oauth = oauth;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.domain = domain;
    this.supportedAlgorithms = supportedAlgorithms;
    this._jwksClient = jwksClient({
      jwksUri: `https://${domain}/.well-known/jwks.json`
    });
  }

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
  create(params, data, cb) {
    const createAndValidate = this.oauth.create(params, data).then(r => {
      if (!r.id_token) {
        return r;
      }
      const getKey = ({ alg, kid }, callback) => {
        if (alg === 'HS256') {
          return callback(null, Buffer.from(this.clientSecret, 'base64'));
        }
        this._jwksClient.getSigningKey(kid, (err, key) => {
          if (err) {
            return callback(err);
          }
          const signingKey = key.publicKey || key.rsaPublicKey;
          return callback(null, signingKey);
        });
      };
      return new Promise((res, rej) => {
        jwt.verify(
          r.id_token,
          getKey.bind(this),
          {
            algorithms: this.supportedAlgorithms,
            audience: this.clientId,
            issuer: `https://${this.domain}/`
          },
          (err, payload) => {
            if (err) {
              return rej(err);
            }
            return res(r);
          }
        );
      });
    });
    if (!cb) {
      return createAndValidate;
    }
    createAndValidate.then(r => cb(null, r)).catch(e => cb(e));
  }
}

module.exports = OAUthWithIDTokenValidation;
