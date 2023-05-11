import nock from 'nock';
import { jest } from '@jest/globals';
import { AuthenticationClient, ManagementClient } from '../../src';
import { ResponseError } from '../../src/lib/errors';
import { InitOverrideFunction, RequestOpts } from '../../src/lib/models';
import { BaseAPI } from '../../src/lib/runtime';
import { RequestInit, Response } from 'node-fetch';
import { AuthApiError } from '../../src/auth/base-auth-api';
import { ManagementApiError } from '../../src/management';

import * as utils from '../../src/utils';
import { base64url } from 'jose';

export class TestClient extends BaseAPI {
  public async testRequest(
    context: RequestOpts,
    initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Response> {
    return this.request(context, initOverrides);
  }
}

const parseError = async (response: Response) => {
  const body = await response.text();
  return new ResponseError(
    response.status,
    body,
    response.headers,
    'Response returned an error code'
  );
};

describe('Runtime', () => {
  const URL = 'https://tenant.auth0.com/api/v2';
  let interval: NodeJS.Timer;

  beforeEach(() => {
    interval = setInterval(() => jest.advanceTimersByTime(1000), 10);
    jest.useFakeTimers({
      doNotFake: ['nextTick'],
    });
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
    jest.useRealTimers();
    clearInterval(interval);
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
      parseError,
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
      parseError,
    });

    await expect(
      client.testRequest({
        path: `/clients`,
        method: 'GET',
      })
    ).rejects.toThrowError(expect.objectContaining({ statusCode: 429 }));
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
      parseError,
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
    nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .reply(428)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
      parseError,
    });

    await expect(
      client.testRequest({
        path: `/clients`,
        method: 'GET',
      })
    ).rejects.toThrowError(expect.objectContaining({ statusCode: 428 }));
  });

  it('should retry using a configurable status code', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .times(2)
      .reply(428)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
      parseError,
      retry: {
        retryWhen: [428],
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

  it('should retry using multiple configurable status code', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .reply(428)
      .get('/clients')
      .reply(429)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
      parseError,
      retry: {
        retryWhen: [428, 429],
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

  it('should only retry configured status codes', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .reply(428)
      .get('/clients')
      .reply(429)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
      parseError,
      retry: {
        retryWhen: [428],
      },
    });

    await expect(
      client.testRequest({
        path: `/clients`,
        method: 'GET',
      })
    ).rejects.toThrowError(expect.objectContaining({ statusCode: 429 }));
  });

  it('should not retry if not enabled', async () => {
    const request = nock(URL, { encodedQueryParams: true })
      .get('/clients')
      .reply(429)
      .get('/clients')
      .reply(200, [{ client_id: '123' }]);

    const client = new TestClient({
      baseUrl: URL,
      parseError,
      retry: {
        enabled: false,
      },
    });

    await expect(
      client.testRequest({
        path: `/clients`,
        method: 'GET',
      })
    ).rejects.toThrowError(expect.objectContaining({ statusCode: 429 }));
  });

  it('should timeout after default time', async () => {
    const request = nock(URL).get('/clients').delayConnection(10000).reply(200, []);

    const client = new TestClient({
      baseUrl: URL,
      parseError,
    });

    await expect(
      client.testRequest({
        path: `/clients`,
        method: 'GET',
      })
    ).rejects.toThrowError(
      expect.objectContaining({ cause: expect.objectContaining({ name: 'TimeoutError' }) })
    );
    nock.abortPendingRequests();
  });

  it('should timeout after configured time', async () => {
    const request = nock(URL).get('/clients').delayConnection(100).reply(200, []);

    const client = new TestClient({
      baseUrl: URL,
      parseError,
      timeoutDuration: 50,
    });

    await expect(
      client.testRequest({
        path: `/clients`,
        method: 'GET',
      })
    ).rejects.toThrowError(
      expect.objectContaining({ cause: expect.objectContaining({ name: 'TimeoutError' }) })
    );
    nock.abortPendingRequests();
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
        expect(e.statusCode).toBe(429);
        expect(request.isDone()).toBe(false);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
  });

  it('should throw a ResponseError when response does not provide payload', async () => {
    nock(URL, { encodedQueryParams: true }).get('/clients').reply(428);

    const token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });

    try {
      await client.clients.getAll();
      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof ResponseError) {
        expect(e.statusCode).toBe(428);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
  });

  it('should throw an ManagementApiError when backend provides known error details', async () => {
    nock(URL, { encodedQueryParams: true }).get('/clients').reply(428, {
      error: 'test error',
      errorCode: 'test error code',
      message: 'test message',
      statusCode: 401,
    });

    const token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });

    try {
      await client.clients.getAll();
      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof ManagementApiError) {
        expect(e.error).toBe('test error');
        expect(e.errorCode).toBe('test error code');
        expect(e.message).toBe('test message');
        expect(e.statusCode).toBe(401);
      } else {
        expect(e).toBeInstanceOf(ManagementApiError);
      }
    }
  });

  it('should throw an ManagementApiError and fallback to the response status code when statusCode omitted from response', async () => {
    nock(URL, { encodedQueryParams: true }).get('/clients').reply(428, {
      error: 'test error',
      errorCode: 'test error code',
      message: 'test message',
    });

    const token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });

    try {
      await client.clients.getAll();
      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof ManagementApiError) {
        expect(e.error).toBe('test error');
        expect(e.errorCode).toBe('test error code');
        expect(e.message).toBe('test message');
        expect(e.statusCode).toBe(428);
      } else {
        expect(e).toBeInstanceOf(ManagementApiError);
      }
    }
  });

  it('should add the telemetry by default', async () => {
    const request = nock(URL)
      .get('/clients')
      .matchHeader('Auth0-Client', base64url.encode(JSON.stringify(utils.generateClientInfo())))
      .reply(200, []);

    const token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    await client.clients.getAll();

    expect(request.isDone()).toBe(true);
  });

  it('should add custom telemetry when provided', async () => {
    const mockClientInfo = { name: 'test', version: '12', env: { node: '16' } };

    const request = nock(URL)
      .get('/clients')
      .matchHeader('Auth0-Client', base64url.encode(JSON.stringify(mockClientInfo)))
      .reply(200, []);

    const token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
      clientInfo: mockClientInfo,
    });
    await client.clients.getAll();

    expect(request.isDone()).toBe(true);
  });

  it('should not add the telemetry when disabled', async () => {
    const request = nock(URL, { badheaders: ['Auth0-Client'] })
      .get('/clients')
      .reply(200, []);

    const token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
      telemetry: false,
    });
    await client.clients.getAll();

    expect(request.isDone()).toBe(true);
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
        expect(e.statusCode).toBe(429);
        expect(request.isDone()).toBe(false);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
  });

  it('should throw a ResponseError when response does not provide payload', async () => {
    nock(URL, { encodedQueryParams: true }).post('/oauth/token').reply(428);

    const client = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId: '123',
      clientSecret: '123',
    });

    try {
      await client.oauth.clientCredentialsGrant({
        audience: '123',
      });
      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof ResponseError) {
        expect(e.statusCode).toBe(428);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
  });

  it('should throw an AuthApiError when backend provides known error details', async () => {
    nock(URL, { encodedQueryParams: true })
      .post('/oauth/token')
      .reply(428, { error: 'test error', error_description: 'test error description' });

    const client = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId: '123',
      clientSecret: '123',
    });

    try {
      await client.oauth.clientCredentialsGrant({
        audience: '123',
      });
      // Should not reach this
      expect(true).toBeFalsy();
    } catch (e: any) {
      if (e instanceof AuthApiError) {
        expect(e.error).toBe('test error');
        expect(e.error_description).toBe('test error description');
        expect(e.message).toBe('test error description');
      } else {
        expect(e).toBeInstanceOf(AuthApiError);
      }
    }
  });

  it('should add the telemetry by default', async () => {
    const request = nock(URL)
      .post('/oauth/token')
      .matchHeader('Auth0-Client', base64url.encode(JSON.stringify(utils.generateClientInfo())))
      .reply(200, {});

    const client = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId: '123',
      clientSecret: '123',
    });

    await client.oauth.clientCredentialsGrant({
      audience: '123',
    });

    expect(request.isDone()).toBe(true);
  });

  it('should add custom telemetry when provided', async () => {
    const mockClientInfo = { name: 'test', version: '12', env: { node: '16' } };

    const request = nock(URL)
      .post('/oauth/token')
      .matchHeader('Auth0-Client', base64url.encode(JSON.stringify(mockClientInfo)))
      .reply(200, []);

    const client = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId: '123',
      clientSecret: '123',
      clientInfo: mockClientInfo,
    });

    await client.oauth.clientCredentialsGrant({
      audience: '123',
    });

    expect(request.isDone()).toBe(true);
  });

  it('should not add the telemetry when disabled', async () => {
    const request = nock(URL, { badheaders: ['Auth0-Client'] })
      .post('/oauth/token')
      .reply(200, []);

    const client = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId: '123',
      clientSecret: '123',
      telemetry: false,
    });

    await client.oauth.clientCredentialsGrant({
      audience: '123',
    });

    expect(request.isDone()).toBe(true);
  });
});
