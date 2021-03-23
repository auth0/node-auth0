var assert = require('assert');
var expect = require('chai').expect;
var jws = require('jws');
var idToken = require('../src/auth/idToken');

var secretHMAC = 'secret';
//openssl genrsa -out private.pem 2048
//openssl rsa -in private.pem -pubout -out public.pem
var privateKeyRSA = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC4ZtdaIrd1BPIJ
tfnF0TjIK5inQAXZ3XlCrUlJdP+XHwIRxdv1FsN12XyMYO/6ymLmo9ryoQeIrsXB
XYqlET3zfAY+diwCb0HEsVvhisthwMU4gZQu6TYW2s9LnXZB5rVtcBK69hcSlA2k
ZudMZWxZcj0L7KMfO2rIvaHw/qaVOE9j0T257Z8Kp2CLF9MUgX0ObhIsdumFRLaL
DvDUmBPr2zuh/34j2XmWwn1yjN/WvGtdfhXW79Ki1S40HcWnygHgLV8sESFKUxxQ
mKvPUTwDOIwLFL5WtE8Mz7N++kgmDcmWMCHc8kcOIu73Ta/3D4imW7VbKgHZo9+K
3ESFE3RjAgMBAAECggEBAJTEIyjMqUT24G2FKiS1TiHvShBkTlQdoR5xvpZMlYbN
tVWxUmrAGqCQ/TIjYnfpnzCDMLhdwT48Ab6mQJw69MfiXwc1PvwX1e9hRscGul36
ryGPKIVQEBsQG/zc4/L2tZe8ut+qeaK7XuYrPp8bk/X1e9qK5m7j+JpKosNSLgJj
NIbYsBkG2Mlq671irKYj2hVZeaBQmWmZxK4fw0Istz2WfN5nUKUeJhTwpR+JLUg4
ELYYoB7EO0Cej9UBG30hbgu4RyXA+VbptJ+H042K5QJROUbtnLWuuWosZ5ATldwO
u03dIXL0SH0ao5NcWBzxU4F2sBXZRGP2x/jiSLHcqoECgYEA4qD7mXQpu1b8XO8U
6abpKloJCatSAHzjgdR2eRDRx5PMvloipfwqA77pnbjTUFajqWQgOXsDTCjcdQui
wf5XAaWu+TeAVTytLQbSiTsBhrnoqVrr3RoyDQmdnwHT8aCMouOgcC5thP9vQ8Us
rVdjvRRbnJpg3BeSNimH+u9AHgsCgYEA0EzcbOltCWPHRAY7B3Ge/AKBjBQr86Kv
TdpTlxePBDVIlH+BM6oct2gaSZZoHbqPjbq5v7yf0fKVcXE4bSVgqfDJ/sZQu9Lp
PTeV7wkk0OsAMKk7QukEpPno5q6tOTNnFecpUhVLLlqbfqkB2baYYwLJR3IRzboJ
FQbLY93E8gkCgYB+zlC5VlQbbNqcLXJoImqItgQkkuW5PCgYdwcrSov2ve5r/Acz
FNt1aRdSlx4176R3nXyibQA1Vw+ztiUFowiP9WLoM3PtPZwwe4bGHmwGNHPIfwVG
m+exf9XgKKespYbLhc45tuC08DATnXoYK7O1EnUINSFJRS8cezSI5eHcbQKBgQDC
PgqHXZ2aVftqCc1eAaxaIRQhRmY+CgUjumaczRFGwVFveP9I6Gdi+Kca3DE3F9Pq
PKgejo0SwP5vDT+rOGHN14bmGJUMsX9i4MTmZUZ5s8s3lXh3ysfT+GAhTd6nKrIE
kM3Nh6HWFhROptfc6BNusRh1kX/cspDplK5x8EpJ0QKBgQDWFg6S2je0KtbV5PYe
RultUEe2C0jYMDQx+JYxbPmtcopvZQrFEur3WKVuLy5UAy7EBvwMnZwIG7OOohJb
vkSpADK6VPn9lbqq7O8cTedEHttm6otmLt8ZyEl3hZMaL3hbuRj6ysjmoFKx6CrX
rK0/Ikt5ybqUzKCMJZg2VKGTxg==
-----END PRIVATE KEY-----`;

//base date expressed in MS
//expected values for a good id token payload
var expectations = {
  clientId: 'tokens-test-123',
  clientIdAlt: 'external-test-999',
  issuer: 'https://tokens-test.auth0.com/',
  nonce: 'a1b2c3d4e5',
  clock: Date.now()
};

//date helpers
var TODAY_IN_SECONDS = Math.floor(expectations.clock / 1000);
var ONE_DAY_IN_SECONDS = 3600 * 24;
function yesterday() {
  return TODAY_IN_SECONDS - ONE_DAY_IN_SECONDS;
}
function tomorrow() {
  return TODAY_IN_SECONDS + ONE_DAY_IN_SECONDS;
}
//good id token payload
var payload = {
  iss: expectations.issuer,
  sub: 'auth0|123456789',
  aud: [expectations.clientId, expectations.clientIdAlt],
  exp: tomorrow(),
  iat: yesterday(),
  nonce: expectations.nonce,
  azp: expectations.clientId,
  org_id: 'test|org',
  auth_time: TODAY_IN_SECONDS
};

var defaultOptions = {
  issuer: expectations.issuer,
  audience: [expectations.clientId, expectations.clientIdAlt],
  nonce: expectations.nonce
};

function generateJWT(bodyOverrides, alg) {
  var body = Object.assign({}, payload, bodyOverrides || {});
  alg = alg || 'RS256';
  var options = {
    header: { alg: alg },
    payload: body
  };
  if (alg === 'RS256') {
    options.privateKey = privateKeyRSA;
  } else if (alg === 'HS256') {
    options.secret = secretHMAC;
  }
  return jws.sign(options);
}

describe('idToken.decode', function() {
  it('should decode a valid token', function() {
    var alg = 'RS256';
    var token = generateJWT({ name: 'ÁÁutf8' }, alg);
    var decoded = idToken.decode(token);

    assert.equal(decoded._raw, token);
    assert.equal(decoded.header.alg, alg);

    Object.keys(payload).forEach(function(key) {
      assert.deepEqual(payload[key], decoded.payload[key]);
    });
  });

  it('throws errors on invalid tokens', function() {
    var IDTOKEN_ERROR_MESSAGE = 'ID token could not be decoded';

    it('throws when there is more or less than 3 parts', function() {
      assert.throws(idToken.decode('test'), IDTOKEN_ERROR_MESSAGE);
      assert.throws(idToken.decode('test.'), IDTOKEN_ERROR_MESSAGE);
      assert.throws(idToken.decode('test.test'), IDTOKEN_ERROR_MESSAGE);
      assert.throws(idToken.decode('test.test.test.test'), IDTOKEN_ERROR_MESSAGE);
    });
    it('throws when there is no header', function() {
      assert.throws(idToken.decode('.test.test'), IDTOKEN_ERROR_MESSAGE);
    });
    it('throws when there is no payload', function() {
      assert.throws(idToken.decode('test..test'), IDTOKEN_ERROR_MESSAGE);
    });
    it('throws when there is no signature', function() {
      assert.throws(idToken.decode('test.test.'), IDTOKEN_ERROR_MESSAGE);
    });
  });
});

describe('idToken.validate', function() {
  var expectedOptions;

  beforeEach(function() {
    expectedOptions = Object.assign({}, defaultOptions);
    expectedOptions.audience = expectations.clientId;
    expectedOptions.maxAge = 123;
  });

  it('should throw when no id token is present', function() {
    expect(function() {
      idToken.validate();
    }).to.throw('ID token is required but missing');
  });
  it('should throw when no Issuer is present in the claim', function() {
    expect(function() {
      idToken.validate(generateJWT({ iss: undefined }));
    }).to.throw('Issuer (iss) claim must be a string present in the ID token');
  });
  it('should throw when the expected issuer is not in the claim', function() {
    expect(function() {
      idToken.validate(generateJWT({}), { issuer: 'ExpectedIssuer' });
    }).to.throw(
      'Issuer (iss) claim mismatch in the ID token; expected "ExpectedIssuer", found "https://tokens-test.auth0.com/"'
    );
  });
  it('should throw when the claim has no Subject', function() {
    expect(function() {
      idToken.validate(generateJWT({ sub: undefined }), defaultOptions);
    }).to.throw('Subject (sub) claim must be a string present in the ID token');
  });
  it('should throw when the alg is neither rs256 or hs256', function() {
    var token =
      'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL3Rva2Vucy10ZXN0LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHwxMjM0NTY3ODkiLCJhdWQiOiJ0b2tlbnMtdGVzdC0xMjMifQ.cZ4qDwoKdKQx8DtD-F-xVKCxd3rz58wSJh3k28z5qnpzm4x3xRiyHCuUvtxmL2aPdBQ37Zt8Mt5drd9hZhNzFQ';

    expect(function() {
      idToken.validate(token, defaultOptions);
    }).to.throw(
      'Signature algorithm of "HS512" is not supported. Expected the ID token to be signed with "RS256" or "HS256".'
    );
  });
  it('should throw when the audience is not a string or array', function() {
    expect(function() {
      idToken.validate(generateJWT({ aud: undefined }), defaultOptions);
    }).to.throw(
      'Audience (aud) claim must be a string or array of strings present in the ID token'
    );
  });
  it('should throw when claim audience is a String and not expected audience', function() {
    expect(function() {
      idToken.validate(generateJWT({ aud: 'notExpected' }), expectedOptions);
    }).to.throw(
      'Audience (aud) claim mismatch in the ID token; expected "tokens-test-123" but found "notExpected"'
    );
  });
  it('should throw when claim audience is an Array and not expected audience', function() {
    expect(function() {
      idToken.validate(generateJWT({ aud: ['notExpected'] }), expectedOptions);
    }).to.throw(
      'Audience (aud) claim mismatch in the ID token; expected "tokens-test-123" but was not one of "notExpected"'
    );
  });
  it('should throw when expected audience is not a String or Array', function() {
    expect(function() {
      idToken.validate(generateJWT({ aud: 10000 }), expectedOptions);
    }).to.throw(
      'Audience (aud) claim must be a string or array of strings present in the ID token'
    );
    expect(function() {
      idToken.validate(generateJWT({ aud: {} }), expectedOptions);
    }).to.throw(
      'Audience (aud) claim must be a string or array of strings present in the ID token'
    );
  });
  it('should throw when azp claim not found when aud has multiple values', function() {
    expect(function() {
      idToken.validate(generateJWT({ azp: undefined }), expectedOptions);
    }).to.throw(
      'Authorized Party (azp) claim must be a string present in the ID token when Audience (aud) claim has multiple values'
    );
  });
  it('should throw when azp claim doesnt match the expected aud', function() {
    expectedOptions.audience = expectations.clientIdAlt;

    expect(function() {
      idToken.validate(generateJWT({}), expectedOptions);
    }).to.throw(
      'Authorized Party (azp) claim mismatch in the ID token; expected "external-test-999", found "tokens-test-123"'
    );
  });
  it('should throw when nonce is in options, but missing from claim', function() {
    expect(function() {
      idToken.validate(generateJWT({ nonce: undefined }), expectedOptions);
    }).to.throw('Nonce (nonce) claim must be a string present in the ID token');
  });
  it('should throw when nonce claim doesnt match nonce expected', function() {
    expectedOptions.nonce = 'noncey';

    expect(function() {
      idToken.validate(generateJWT({ nonce: 'notExpectedNonce' }), expectedOptions);
    }).to.throw(
      'Nonce (nonce) claim mismatch in the ID token; expected "noncey", found "notExpectedNonce"'
    );
  });
  it('should throw when nonce claim is not a string', function() {
    expect(function() {
      idToken.validate(generateJWT({ nonce: 10000 }), expectedOptions);
    }).to.throw('Nonce (nonce) claim must be a string present in the ID token');
    expect(function() {
      idToken.validate(generateJWT({ nonce: {} }), expectedOptions);
    }).to.throw('Nonce (nonce) claim must be a string present in the ID token');
  });
  it('should throw when auth_time is not a number', function() {
    expect(function() {
      idToken.validate(generateJWT({ auth_time: undefined }), expectedOptions);
    }).to.throw(
      'Authentication Time (auth_time) claim must be a number present in the ID token when Max Age (max_age) is specified'
    );
  });
  it('should throw when exp is not a number', function() {
    expect(function() {
      idToken.validate(generateJWT({ exp: 'not a number' }), expectedOptions);
    }).to.throw('Expiration Time (exp) claim must be a number present in the ID token');
  });
  it('should throw when exp has passed', function() {
    expect(function() {
      idToken.validate(generateJWT({ exp: yesterday() }), expectedOptions);
    }).to.throw('is after expiration time');
  });
  it('should throw when idtoken indicates too much time has passed', function() {
    expect(function() {
      idToken.validate(generateJWT({ auth_time: yesterday() }), expectedOptions);
    }).to.throw(
      'Authentication Time (auth_time) claim in the ID token indicates that too much time has passed since the last end-user authentication.'
    );
  });
  it('should throw when organization is in options, but org_id missing from claim', function() {
    expectedOptions.organization = 'testorg';

    expect(function() {
      idToken.validate(generateJWT({ org_id: undefined }), expectedOptions);
    }).to.throw('Organization Id (org_id) claim must be a string present in the ID token');
  });
  it('should throw when org claim doesnt match org expected', function() {
    expectedOptions.organization = 'testorg';

    expect(function() {
      idToken.validate(generateJWT({ org_id: 'notExpectedOrg' }), expectedOptions);
    }).to.throw(
      'Organization Id (org_id) claim value mismatch in the ID token; expected "testorg", found "notExpectedOrg'
    );
  });
  it('should NOT throw when org_id matches expected organization', function() {
    expectedOptions.organization = 'testorg';

    expect(function() {
      idToken.validate(generateJWT({ org_id: 'testorg' }), expectedOptions);
    }).not.to.throw();
  });
});
