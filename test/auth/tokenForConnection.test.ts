import nock from 'nock';
import {
  TokenForConnection,
  TokenForConnectionOptions,
  getValidRefreshToken,
  TOKEN_FOR_CONNECTION_GRANT_TYPE,
  TOKEN_FOR_CONNECTION_REQUESTED_TOKEN_TYPE,
  TOKEN_FOR_CONNECTION_TOKEN_TYPE,
  TOKEN_URL,
} from '../../src/auth/tokenForConnection.js';
import { AuthenticationClientOptions } from '../../src/auth/base-auth-api.js';

const DOMAIN = 'test-tenant.auth0.com';
const CLIENT_ID = 'TEST_CLIENT_ID';
const CLIENT_SECRET = 'TEST_CLIENT_SECRET';
const REFRESH_TOKEN = 'test-refresh-token';
const CONNECTION = 'google-oauth2';

const mockOptions: AuthenticationClientOptions = {
  domain: DOMAIN,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

describe('TokenForConnection', () => {
  let client: TokenForConnection;

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  beforeEach(() => {
    client = new TokenForConnection(mockOptions);
    nock.cleanAll();
  });

  describe('getValidRefreshToken', () => {
    test('should return refresh token when present', () => {
      const tokenSet = { refresh_token: REFRESH_TOKEN };
      expect(getValidRefreshToken(tokenSet)).toBe(REFRESH_TOKEN);
    });

    test('should throw error when refresh token is missing', () => {
      const tokenSet = {};
      expect(() => getValidRefreshToken(tokenSet)).toThrow('refresh_token not present');
    });
  });

  describe('exchangeToken()', () => {
    const baseParams: TokenForConnectionOptions = {
      tokenSet: { refresh_token: REFRESH_TOKEN },
      connection: CONNECTION,
    };

    test('should successfully exchange refresh token for federated connection access token', async () => {
      nock(`https://${DOMAIN}`)
        .post(TOKEN_URL)
        .reply(function (uri, requestBody) {
          const body = new URLSearchParams(requestBody as string);

          // Note: our implementation adds only the client_secret, not the client_id.
          const isValid =
            body.get('grant_type') === TOKEN_FOR_CONNECTION_GRANT_TYPE &&
            body.get('subject_token') === REFRESH_TOKEN &&
            body.get('subject_token_type') === TOKEN_FOR_CONNECTION_TOKEN_TYPE &&
            body.get('requested_token_type') === TOKEN_FOR_CONNECTION_REQUESTED_TOKEN_TYPE &&
            body.get('connection') === CONNECTION &&
            body.get('client_secret') === CLIENT_SECRET;
          if (isValid) {
            return [
              200,
              {
                access_token: 'federated-access-token',
                token_type: 'Bearer',
                expires_in: 3600,
              },
            ];
          }
          return [400, { error: 'invalid_request', error_description: 'Invalid parameters' }];
        });

      const result = await client.exchangeToken(baseParams);

      expect(result).toEqual({
        access_token: 'federated-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
      });
    });

    test('should include login_hint when provided', async () => {
      const loginHint = 'user@example.com';

      nock(`https://${DOMAIN}`)
        .post(TOKEN_URL)
        .reply(function (uri, requestBody) {
          const body = new URLSearchParams(requestBody as string);
          const isValid =
            body.get('login_hint') === loginHint &&
            body.get('connection') === CONNECTION &&
            body.get('grant_type') === TOKEN_FOR_CONNECTION_GRANT_TYPE;
          if (isValid) {
            return [
              200,
              {
                access_token: 'federated-access-token',
                token_type: 'Bearer',
                expires_in: 3600,
              },
            ];
          }
          return [400, { error: 'invalid_request', error_description: 'Invalid parameters' }];
        });

      const result = await client.exchangeToken({
        ...baseParams,
        loginHint,
      });

      expect(result.access_token).toBe('federated-access-token');
    });

    test('should throw error when refresh token is missing', async () => {
      await expect(client.exchangeToken({ tokenSet: {}, connection: CONNECTION })).rejects.toThrow(
        'refresh_token not present'
      );
    });

    test('should handle API error responses', async () => {
      nock(`https://${DOMAIN}`).post(TOKEN_URL).reply(400, {
        error: 'invalid_grant',
        error_description: 'Invalid refresh token',
      });

      await expect(client.exchangeToken(baseParams)).rejects.toThrow('Invalid refresh token');
    });

    test('should handle unauthorized errors', async () => {
      nock(`https://${DOMAIN}`).post(TOKEN_URL).reply(401, {
        error: 'invalid_client',
        error_description: 'Invalid client credentials',
      });

      await expect(client.exchangeToken(baseParams)).rejects.toThrow('Invalid client credentials');
    });

    test('should handle connection not found errors', async () => {
      nock(`https://${DOMAIN}`).post(TOKEN_URL).reply(400, {
        error: 'invalid_request',
        error_description: 'Connection not found',
      });

      await expect(client.exchangeToken(baseParams)).rejects.toThrow('Connection not found');
    });

    test('should handle rate limiting', async () => {
      nock(`https://${DOMAIN}`).post(TOKEN_URL).reply(429, {
        error: 'too_many_requests',
        error_description: 'Too many requests, please try again later',
      });

      await expect(client.exchangeToken(baseParams)).rejects.toThrow('Too many requests');
    });

    test('should handle server errors', async () => {
      nock(`https://${DOMAIN}`).post(TOKEN_URL).reply(500, {
        error: 'server_error',
        error_description: 'Internal server error',
      });

      await expect(client.exchangeToken(baseParams)).rejects.toThrow('Internal server error');
    });
  });
});
