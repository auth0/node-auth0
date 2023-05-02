import nock from 'nock';
import { jest } from '@jest/globals';
import { AuthenticationClient, ManagementClient } from '../../src';
import { BaseAPI, InitOverrideFunction, RequestOpts, ResponseError } from '../../src/runtime';
import { RequestInit, Response } from 'node-fetch';
import { AuthApiError } from '../../src/auth/BaseAuthApi';
import { ManagementApiError } from '../../src/management';

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
        expect(e.statusCode).toBe(429);
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
        expect(e.statusCode).toBe(428);
        expect(request.isDone()).toBe(false);
      } else {
        expect(e).toBeInstanceOf(ResponseError);
      }
    }
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
      retry: {
        retryWhen: [428],
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
        expect(e.statusCode).toBe(429);
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
        expect(e.statusCode).toBe(429);
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

  it('should throw an ManagementApiError when backend provides known error details', async () => {
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
});
