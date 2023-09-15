import nock from 'nock';
import { jest } from '@jest/globals';
import { RequestOpts, InitOverrideFunction, FetchAPI } from '../../src/lib/index.js';
import { BaseAPI } from '../../src/lib/runtime.js';
import { TokenProviderMiddleware } from '../../src/management/token-provider-middleware.js';

const domain = 'test-domain.auth0.com';

const customFetch = jest
  .fn<FetchAPI>()
  .mockImplementation((url: URL | RequestInfo, init?: RequestInit) => fetch(url, init));

const opts = {
  baseUrl: `https://${domain}`,
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  audience: 'my-api',
  parseError: async (response: Response) => {
    return new Error(`${response.status}`);
  },
  fetch: customFetch,
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
      .reply(200, function () {
        spy(this.req.headers);
        return {};
      });
    clientSecretClient = new TestClient({
      ...opts,
      middleware: [new TokenProviderMiddleware({ ...opts, domain })],
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  it('should use custom fetch', async () => {
    await expect(
      clientSecretClient.testRequest({ path: '/foo', method: 'GET' })
    ).resolves.toMatchObject({});
    expect(customFetch).toHaveBeenCalled();
  });
});
