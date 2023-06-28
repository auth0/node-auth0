import nock from 'nock';
import { jest } from '@jest/globals';
import { RequestOpts, InitOverrideFunction } from '../../src/lib';
import { BaseAPI } from '../../src/lib/runtime';
import { TokenProviderMiddleware } from '../../src/management/token-provider-middleware';

const domain = 'test-domain.auth0.com';

const opts = {
  baseUrl: `https://${domain}`,
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  audience: 'my-api',
  parseError: async (response: Response) => {
    return new Error(`${response.status}`);
  },
};

export class TestClient extends BaseAPI {
  public async testRequest(
    context: RequestOpts,
    initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Response> {
    return this.request(context, initOverrides);
  }
}

describe('TokenProviderMiddleware', () => {
  const spy = jest.fn();
  let clientSecretClient: TestClient;
  let tokenClient: TestClient;

  beforeEach(() => {
    nock(opts.baseUrl)
      .persist()
      .post(
        '/oauth/token',
        `client_id=${opts.clientId}&audience=${opts.audience}&client_secret=${opts.clientSecret}&grant_type=client_credentials`
      )
      .reply(200, {
        access_token: 'my-access-token',
        expires_in: 86400,
        token_type: 'Bearer',
      });
    nock(opts.baseUrl)
      .get('/foo')
      .reply(200, function (y) {
        spy(this.req.headers);
        return {};
      });
    clientSecretClient = new TestClient({
      ...opts,
      middleware: [new TokenProviderMiddleware({ ...opts, domain })],
    });
    const { clientSecret, ...optsNoSecret } = opts;
    tokenClient = new TestClient({
      ...opts,
      middleware: [new TokenProviderMiddleware({ ...optsNoSecret, domain, token: 'token' })],
    });
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should use provided access token', async () => {
    await expect(tokenClient.testRequest({ path: '/foo', method: 'GET' })).resolves.toMatchObject(
      {}
    );
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        authorization: 'Bearer token',
      })
    );
  });

  it('should use provided clientSecret', async () => {
    await expect(
      clientSecretClient.testRequest({ path: '/foo', method: 'GET' })
    ).resolves.toMatchObject({});
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        authorization: 'Bearer my-access-token',
      })
    );
  });
});
