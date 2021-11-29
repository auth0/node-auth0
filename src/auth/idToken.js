const urlDecodeB64 = function (data) {
  return Buffer.from(data, 'base64').toString('utf8');
};

/**
 * Decodes a string token into the 3 parts, throws if the format is invalid
 *
 * @param {string} token token
 * @returns {object}
 */
const decode = function (token) {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('ID token could not be decoded');
  }

  return {
    _raw: token,
    header: JSON.parse(urlDecodeB64(parts[0])),
    payload: JSON.parse(urlDecodeB64(parts[1])),
    signature: parts[2],
  };
};

const DEFAULT_LEEWAY = 60; //default clock-skew, in seconds

/**
 * Validator for ID Tokens following OIDC spec.
 *
 * @param {string} token the string token to verify
 * @param {object} options the options required to run this verification
 * @returns {object} The decoded token payload, or throws an exception if validation failed
 */
const validate = function (token, options) {
  if (!token) {
    throw new Error('ID token is required but missing');
  }

  const decodedToken = decode(token);

  // Check algorithm
  const { header } = decodedToken;
  if (header.alg !== 'RS256' && header.alg !== 'HS256') {
    throw new Error(
      `Signature algorithm of "${header.alg}" is not supported. Expected the ID token to be signed with "RS256" or "HS256".`
    );
  }

  const { payload } = decodedToken;

  // Issuer
  if (!payload.iss || typeof payload.iss !== 'string') {
    throw new Error('Issuer (iss) claim must be a string present in the ID token');
  }
  if (payload.iss !== options.issuer) {
    throw new Error(
      `Issuer (iss) claim mismatch in the ID token; expected "${options.issuer}", found "${payload.iss}"`
    );
  }

  // Subject
  if (!payload.sub || typeof payload.sub !== 'string') {
    throw new Error('Subject (sub) claim must be a string present in the ID token');
  }

  // Audience
  if (!payload.aud || !(typeof payload.aud === 'string' || Array.isArray(payload.aud))) {
    throw new Error(
      'Audience (aud) claim must be a string or array of strings present in the ID token'
    );
  }
  if (Array.isArray(payload.aud) && !payload.aud.includes(options.audience)) {
    throw new Error(
      `Audience (aud) claim mismatch in the ID token; expected "${
        options.audience
      }" but was not one of "${payload.aud.join(', ')}"`
    );
  } else if (typeof payload.aud === 'string' && payload.aud !== options.audience) {
    throw new Error(
      `Audience (aud) claim mismatch in the ID token; expected "${options.audience}" but found "${payload.aud}"`
    );
  }

  // Organization
  if (options.organization) {
    if (!payload.org_id || typeof payload.org_id !== 'string') {
      throw new Error('Organization Id (org_id) claim must be a string present in the ID token');
    }

    if (payload.org_id !== options.organization) {
      throw new Error(
        `Organization Id (org_id) claim value mismatch in the ID token; expected "${options.organization}", found "${payload.org_id}"'`
      );
    }
  }

  // --Time validation (epoch)--
  const now = Math.floor(Date.now() / 1000);
  const leeway = options.leeway || DEFAULT_LEEWAY;

  // Expires at
  if (!payload.exp || typeof payload.exp !== 'number') {
    throw new Error('Expiration Time (exp) claim must be a number present in the ID token');
  }
  const expTime = payload.exp + leeway;

  if (now > expTime) {
    throw new Error(
      `Expiration Time (exp) claim error in the ID token; current time (${now}) is after expiration time (${expTime})`
    );
  }

  // Issued at
  if (!payload.iat || typeof payload.iat !== 'number') {
    throw new Error('Issued At (iat) claim must be a number present in the ID token');
  }

  // Nonce
  if (options.nonce) {
    if (!payload.nonce || typeof payload.nonce !== 'string') {
      throw new Error('Nonce (nonce) claim must be a string present in the ID token');
    }
    if (payload.nonce !== options.nonce) {
      throw new Error(
        `Nonce (nonce) claim mismatch in the ID token; expected "${options.nonce}", found "${payload.nonce}"`
      );
    }
  }

  // Authorized party
  if (Array.isArray(payload.aud) && payload.aud.length > 1) {
    if (!payload.azp || typeof payload.azp !== 'string') {
      throw new Error(
        'Authorized Party (azp) claim must be a string present in the ID token when Audience (aud) claim has multiple values'
      );
    }
    if (payload.azp !== options.audience) {
      throw new Error(
        `Authorized Party (azp) claim mismatch in the ID token; expected "${options.audience}", found "${payload.azp}"`
      );
    }
  }

  // Authentication time
  if (options.maxAge) {
    if (!payload.auth_time || typeof payload.auth_time !== 'number') {
      throw new Error(
        'Authentication Time (auth_time) claim must be a number present in the ID token when Max Age (max_age) is specified'
      );
    }

    const authValidUntil = payload.auth_time + options.maxAge + leeway;
    if (now > authValidUntil) {
      throw new Error(
        `Authentication Time (auth_time) claim in the ID token indicates that too much time has passed since the last end-user authentication. Currrent time (${now}) is after last auth at ${authValidUntil}`
      );
    }
  }

  return decodedToken;
};

module.exports = {
  decode,
  validate,
};
