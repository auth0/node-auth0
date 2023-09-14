import nock from 'nock';
import { jest } from '@jest/globals';
import * as jose from 'jose';
import { AuthenticationClient } from '../../src/index.js';
import { TEST_PUBLIC_KEY, TEST_PRIVATE_KEY } from '../constants.js';

const URL = 'https://tenant.auth0.com/';
const clientId = 'test-client-id';
const verifyOpts = {
  algorithms: ['RS256'],
  audience: URL,
  issuer: clientId,
  subject: clientId,
  maxAge: 180,
};

const verify = async (jwt: string, key: string, opts: typeof verifyOpts) => {
  const publicKey = await jose.importSPKI(key, 'RS256');
  const { payload } = await jose.jwtVerify(jwt, publicKey, opts);
  return payload;
};
const sign = async (
  payload: jose.JWTPayload,
  key: string,
  { algorithm: alg }: { algorithm: string }
) => {
  const privateKey = await jose.importPKCS8(key, 'RS256');
  return new jose.SignJWT(payload).setProtectedHeader({ alg }).sign(privateKey);
};

describe('client-authentication', () => {
  const path = jest.fn();
  const body = jest.fn();
  const headers = jest.fn();
  const clientAssertion = jest.fn();

  beforeEach(() => {
    async function handler(this: any, pathIn: unknown, bodyIn: string) {
      const bodyParsed = Object.fromEntries(new URLSearchParams(bodyIn));
      path(pathIn);
      body(bodyParsed);
      headers(this.req.headers);
      if ((bodyParsed as any).client_assertion) {
        clientAssertion(await verify(bodyParsed.client_assertion, TEST_PUBLIC_KEY, verifyOpts));
      }
      return {
        access_token: 'test-access-token',
      };
    }

    nock(URL, { encodedQueryParams: true }).post('/oauth/token').reply(200, handler).persist();
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('should do client credentials grant with a client secret', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientSecret: 'foo',
    });
    await auth0.oauth.clientCredentialsGrant({
      audience: 'my-api',
    });
    expect(path).toHaveBeenCalledWith('/oauth/token');
    expect(body).toHaveBeenCalledWith({
      grant_type: 'client_credentials',
      client_id: clientId,
      audience: 'my-api',
      client_secret: 'foo',
    });
  });

  it('should do client credentials grant with a client assertion', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientAssertionSigningKey: TEST_PRIVATE_KEY,
    });
    await auth0.oauth.clientCredentialsGrant({
      audience: 'my-api',
    });
    expect(path).toHaveBeenCalledWith('/oauth/token');
    expect(body).toHaveBeenCalledWith(
      expect.objectContaining({
        grant_type: 'client_credentials',
        client_id: clientId,
        audience: 'my-api',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      })
    );
    expect(clientAssertion).toHaveBeenCalledWith({
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: expect.any(Number),
      exp: expect.any(Number),
      jti: expect.any(String),
    });
  });

  it('should require a client secret or client assertion with client credentials grant', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
    });
    await expect(() =>
      auth0.oauth.clientCredentialsGrant({
        audience: 'my-api',
      })
    ).rejects.toThrow('The client_secret or client_assertion field is required.');
  });

  it('should allow you to pass your own client assertion', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
    });
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: now,
      exp: now + 180,
      jti: 'foo',
    };
    await auth0.oauth.clientCredentialsGrant({
      audience: 'my-api',
      client_assertion: await sign(payload, TEST_PRIVATE_KEY, { algorithm: 'RS256' }),
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });
    expect(path).toHaveBeenCalledWith('/oauth/token');
    expect(body).toHaveBeenCalledWith(
      expect.objectContaining({
        grant_type: 'client_credentials',
        client_id: clientId,
        audience: 'my-api',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      })
    );
    expect(clientAssertion).toHaveBeenCalledWith({
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: expect.any(Number),
      exp: expect.any(Number),
      jti: 'foo',
    });
  });
});
