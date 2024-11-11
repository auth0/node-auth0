import nock from 'nock';
import { jest } from '@jest/globals';
import * as jose from 'jose';
import { TEST_PUBLIC_KEY, TEST_PRIVATE_KEY } from '../constants.js';
import { IDTokenValidator } from '../../src/auth/id-token-validator.js';

const DOMAIN = 'tenant.auth0.com';
const URL = `https://${DOMAIN}/`;
const CLIENT_ID = 'test-client-id';
const CLIENT_SECRET = 'test-client-secret';

const now = () => Math.floor(Date.now() / 1000);

const sign = async ({
  payload = {},
  clientSecret = undefined,
  privateKey = undefined,
  publicKey = undefined,
  issuer = URL,
  sub = 'me',
  exp = now() + 3600,
  iat = now(),
  aud = CLIENT_ID,
}: any) => {
  let alg = 'RS256';
  let secretOrKey = privateKey;

  if (clientSecret) {
    alg = 'HS256';
    secretOrKey = new TextEncoder().encode(clientSecret);
  } else {
    secretOrKey = privateKey || (await jose.importPKCS8(TEST_PRIVATE_KEY, alg));
  }
  const jwk = await jose.exportJWK(publicKey || (await jose.importSPKI(TEST_PUBLIC_KEY, alg)));
  nock(URL)
    .persist()
    .get('/.well-known/jwks.json')
    .reply(200, { keys: [{ kid: '1', ...jwk }] });

  return new jose.SignJWT({
    iss: issuer,
    sub,
    aud,
    exp,
    iat,
    ...payload,
  })
    .setProtectedHeader({ alg, kid: '1' })
    .sign(secretOrKey);
};

describe('id-token-validator', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('validates the id token and fulfills with input value (when signed by secret)', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      idTokenSigningAlg: 'HS256',
    });
    const jwt = await sign({ clientSecret: CLIENT_SECRET });
    await expect(idTokenValidator.validate(jwt)).resolves.not.toThrowError();
  });

  it('validates the id token and fulfills with input value (when signed by private key)', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({});
    await expect(idTokenValidator.validate(jwt)).resolves.not.toThrowError();
  });

  it('validates the idTokenSigningAlg is the one used', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ clientSecret: CLIENT_SECRET });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(/Unsupported "alg" value/);
  });

  it('rejects when azp is not present when more audiences are provided', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ aud: [CLIENT_ID, 'bar'] });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(azp\) claim must be a string/
    );
  });

  it('rejects unknown azp values', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ aud: [CLIENT_ID, 'bar'], payload: { azp: 'not client id' } });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(/\(azp\) claim mismatch/);
  });

  it('verifies the audience when azp is there', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ aud: [CLIENT_ID, 'bar'], payload: { azp: CLIENT_ID } });
    await expect(idTokenValidator.validate(jwt)).resolves.not.toThrowError();
  });

  it('verifies the audience when string', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ aud: 'not client id' });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(/\(aud\) claim mismatch/);
  });

  it('verifies the audience when array', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ aud: ['not client id'] });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(/\(aud\) claim mismatch/);
  });

  it('verifies the audience when invalid', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ aud: 42 });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(aud\) claim must be a string or array of strings present in the ID token/
    );
  });

  it('passes with nonce check', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ payload: { nonce: 'foo' } });
    await expect(idTokenValidator.validate(jwt, { nonce: 'foo' })).resolves.not.toThrowError();
  });

  it('validates nonce when provided to check for', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({});
    await expect(idTokenValidator.validate(jwt, { nonce: 'foo' })).rejects.toThrowError(
      /\(nonce\) claim must be a string present in the ID token/
    );
  });

  it('validates nonce when in token', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ payload: { nonce: 'foo' } });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(nonce\) claim mismatch in the ID token/
    );
  });

  it('verifies iss is present', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ issuer: null });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(iss\) claim must be a string present in the ID token/
    );
  });

  it('verifies iss matches the provided issuer', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ issuer: 'foo' });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(iss\) claim mismatch in the ID token; expected "https:\/\/tenant.auth0.com\/", found "foo"/
    );
  });

  it('verifies sub is present', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ sub: null });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(sub\) claim must be a string present in the ID token/
    );
  });

  it('verifies aud is present', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ aud: null });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(aud\) claim must be a string or array of strings present in the ID token/
    );
  });

  it('verifies exp is present', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ exp: null });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(exp\) claim must be a number present in the ID token/
    );
  });

  it('verifies iat is present', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ iat: null });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(iat\) claim must be a number present in the ID token/
    );
  });

  it('verifies iat is a number', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ iat: 'foo' });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(iat\) claim must be a number present in the ID token/
    );
  });

  it('allows iat skew', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ iat: now() + 1000 });
    await expect(idTokenValidator.validate(jwt)).resolves.not.toThrowError();
  });

  it('verifies exp is a number', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ exp: 'foo' });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(exp\) claim must be a number present in the ID token/
    );
  });

  it('verifies exp is in the future', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      clockTolerance: 10,
    });
    const jwt = await sign({ exp: now() - 15 });
    await expect(idTokenValidator.validate(jwt)).rejects.toThrowError(
      /\(exp\) claim error in the ID token; current time \(.*?\) is after expiration time \(.*?\)/
    );
  });

  it('allows exp skew', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      clockTolerance: 10,
    });
    const jwt = await sign({ exp: now() - 5 });
    await expect(idTokenValidator.validate(jwt)).resolves.not.toThrowError();
  });

  it('passes when auth_time is within max_age', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ payload: { auth_time: now() - 100 } });
    await expect(idTokenValidator.validate(jwt, { maxAge: 200 })).resolves.not.toThrowError();
  });

  it('verifies auth_time did not exceed max_age', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ payload: { auth_time: now() - 400 } });
    await expect(idTokenValidator.validate(jwt, { maxAge: 200 })).rejects.toThrowError(
      /\(auth_time\) claim in the ID token indicates that too much time has passed/
    );
  });

  it('allows auth_time skew', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      clockTolerance: 100,
    });
    const jwt = await sign({ payload: { auth_time: now() - 250 } });
    await expect(idTokenValidator.validate(jwt, { maxAge: 200 })).resolves.not.toThrowError();
  });

  it('verifies auth_time is a number when maxAge is passed', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const jwt = await sign({ payload: { auth_time: 'foo' } });
    await expect(idTokenValidator.validate(jwt, { maxAge: 200 })).rejects.toThrowError(
      /\(auth_time\) claim must be a number present in the ID token/
    );
  });

  it('should throw when organization id is in options, but org_id missing from claim', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });

    const jwt = await sign({ payload: { org_id: undefined } });

    await expect(idTokenValidator.validate(jwt, { organization: 'org_123' })).rejects.toThrow(
      'Organization Id (org_id) claim must be a string present in the ID token'
    );
  });

  it('should throw when organization name is in options, but org_name missing from claim', async () => {
    const idTokenValidator = new IDTokenValidator({
      domain: DOMAIN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });

    const jwt = await sign({ payload: { org_name: undefined } });

    await expect(idTokenValidator.validate(jwt, { organization: 'testorg' })).rejects.toThrow(
      'Organization Name (org_name) claim must be a string present in the ID token'
    );
  });
});
