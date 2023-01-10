const { ArgumentError } = require('rest-facade');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

/**
 * Create a JWT signed with the clientAssertionSigningKey
 * for use on clients with token endpoint auth method of private_key_jwt.
 *
 * @param {string} domain The domain of the Authorization Server (can be a custom domain).
 * @param {string} clientId The Client ID.
 * @param {string} clientAssertionSigningKey A private key in PEM format to sign the client assertion JWT.
 * @param {string} clientAssertionSigningAlg The alg to use to sign the JWT (default RS256)
 * @returns {string} A JWT.
 */
const createClientAssertionJWT = ({
  clientId,
  clientAssertionSigningKey,
  clientAssertionSigningAlg,
  domain,
}) => {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientId,
    sub: clientId,
    aud: `https://${domain}/`,
    iat: now,
    exp: now + 180,
    jti: uuid.v4(),
  };
  return jwt.sign(payload, clientAssertionSigningKey, {
    algorithm: clientAssertionSigningAlg || 'RS256',
  });
};

/**
 * Adds client authentication, if available, to the payload of the following requests:
 * - /oauth/token
 * - /oauth/revoke
 * - /mfa/associate
 * - /mfa/challenge
 * - /passwordless/start
 *
 * Adds `client_secret` for Client Secret Post token endpoint auth method (the SDK doesn't use Client Secret Basic)
 * Adds `client_assertion` and `client_assertion_type` for Private Key JWT token endpoint auth method.
 *
 * If `clientAssertionSigningKey` is provided it takes precedent over `clientSecret` .
 *
 * @param {object} payload The body of the request to be authenticated.
 * @param {string} domain The domain of the Authorization Server (can be a custom domain).
 * @param {boolean} [required] True if client authentication is required.
 * @param {string} [clientAssertionSigningKey] A private key in PEM format to sign the client assertion JWT.
 * @param {string} clientAssertionSigningAlg The alg to use to sign the JWT (default RS256)
 * @param {string} [clientSecret] The client secret.
 * @returns {object} The payload with additional fields for client authentication.
 */
const addClientAuthentication = ({
  payload,
  domain,
  required,
  clientAssertionSigningKey,
  clientAssertionSigningAlg,
  clientSecret,
}) => {
  const clientId = payload.client_id;
  if (clientAssertionSigningKey && !payload.client_assertion) {
    payload.client_assertion = createClientAssertionJWT({
      clientId,
      clientAssertionSigningKey,
      clientAssertionSigningAlg,
      domain,
    });
    payload.client_assertion_type = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
  } else if (clientSecret && !payload.client_secret) {
    payload.client_secret = clientSecret;
  }
  if (
    required &&
    (!payload.client_secret || payload.client_secret.trim().length === 0) &&
    (!payload.client_assertion || payload.client_assertion.trim().length === 0)
  ) {
    throw new ArgumentError('The client_secret or client_assertion field is required.');
  }
  return payload;
};

module.exports.addClientAuthentication = addClientAuthentication;
