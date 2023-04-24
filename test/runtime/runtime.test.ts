import nock from 'nock';
import { jest } from '@jest/globals';
import { AuthenticationClient, ManagementClient } from '../../src';
import { BaseAPI, InitOverrideFunction, RequestOpts, ResponseError } from '../../src/runtime';
import { RequestInit, Response } from 'node-fetch';

export class TestClient extends BaseAPI {
  public async testRequest(
    context: RequestOpts,
    initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Response> {
    return this.request(context, initOverrides);
  }
}

describe('Runtime', () => {
  const URL = 'https://tenant.auth0.com/api/v2';

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('should retry 429 until getting a succesful response', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .times(2)
      .reply(429)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
    });

    const response = await client.testRequest({
      path: `/clients`,
      method: 'GET',
    });

    const data = (await response.json()) as Array<{ client_id: string }>;

    expect(data[0].client_id).toBe('123');
    expect(request.isDone()).toBe(true);
  });

  it('should only retry until default configured attempts', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .times(4)
      .reply(429)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
    });

    try {
      await client.testRequest({
        path: `/clients`,
        method: 'GET',
      });
      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof ResponseError) {
        expect(e.response.status).toBe(429);
        expect(request.isDone()).toBe(false);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
  });

  it('should retry 429 the configured amount of times', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .times(4)
      .reply(429)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
      retry: {
        maxRetries: 4,
      },
    });

    const response = await client.testRequest({
      path: `/clients`,
      method: 'GET',
    });

    const data = (await response.json()) as Array<{ client_id: string }>;

    expect(data[0].client_id).toBe('123');
    expect(request.isDone()).toBe(true);
  });

  it('should not retry if not 429', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .reply(428)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
    });

    try {
      await client.testRequest({
        path: `/clients`,
        method: 'GET',
      });
      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof ResponseError) {
        expect(e.response.status).toBe(428);
        expect(request.isDone()).toBe(false);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
  });

  it('should not retry if not enabled', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .reply(429)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
      retry: {
        enabled: false,
      },
    });

    try {
      await client.testRequest({
        path: `/clients`,
        method: 'GET',
      });

      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof ResponseError) {
        expect(e.response.status).toBe(429);
        expect(request.isDone()).toBe(false);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
  });
});

describe('Runtime for ManagementClient', () => {
  const URL = 'https://tenant.auth0.com/api/v2';

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('should retry if enabled', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .times(2)
      .reply(429)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    const response = await client.clients.getAll();

    expect(response.data[0].client_id).toBe('123');
    expect(request.isDone()).toBe(true);
  });

  it('should not retry if not enabled', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .reply(429)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
      retry: {
        enabled: false,
      },
    });

    try {
      await client.clients.getAll();

      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof ResponseError) {
        expect(e.response.status).toBe(429);
        expect(request.isDone()).toBe(false);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
  });
});

describe('Runtime for AuthenticationClient', () => {
  const URL = 'https://tenant.auth0.com';
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('should retry if enabled', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .post('/oauth/token')
      .times(2)
      .reply(429)
      .post('/oauth/token')
      .reply(200, { access_token: '123' });

    const client = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId: '123',
      clientSecret: '123',
    });
    const response = await client.oauth.clientCredentialsGrant({
      audience: '123',
    });

    expect(response.data.access_token).toBe('123');
    expect(request.isDone()).toBe(true);
  });

  it('should not retry if not enabled', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .post('/oauth/token')
      .reply(429)
      .post('/oauth/token')
      .reply(200, { access_token: '123' });

    const client = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId: '123',
      clientSecret: '123',
      retry: {
        enabled: false,
      },
    });

    try {
      await client.oauth.clientCredentialsGrant({
        audience: '123',
      });

      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof ResponseError) {
        expect(e.response.status).toBe(429);
        expect(request.isDone()).toBe(false);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
  });
});
