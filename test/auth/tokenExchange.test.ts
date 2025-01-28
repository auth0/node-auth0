// custom-token-exchange.test.ts
import nock from 'nock';
import { CustomTokenExchange, CustomTokenExchangeOptions } from '../../src/auth/tokenExchange.js';
import { AuthenticationClientOptions } from '../../src/auth/base-auth-api.js';

const DOMAIN = 'test-tenant.auth0.com';
const CLIENT_ID = 'TEST_CLIENT_ID';
const CLIENT_SECRET = 'TEST_CLIENT_SECRET';
const AUDIENCE = 'https://api.example.com';

const mockOptions: AuthenticationClientOptions = {
  domain: DOMAIN,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

describe('CustomTokenExchange', () => {
  let client: CustomTokenExchange;

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  beforeEach(() => {
    client = new CustomTokenExchange(mockOptions);
    nock.cleanAll();
  });

  describe('exchangeToken()', () => {
    const baseParams: CustomTokenExchangeOptions = {
      subject_token_type: 'urn:test:token',
      subject_token: 'external-token-123',
      audience: AUDIENCE,
    };

    test('should successfully exchange valid token', async () => {
      // Mock successful token response
      nock(`https://${DOMAIN}`)
        .post('/oauth/token', (body) => {
          return (
            body.grant_type === 'urn:ietf:params:oauth:grant-type:token-exchange' &&
            body.subject_token_type === 'urn:test:token' &&
            body.client_id === CLIENT_ID
          );
        })
        .reply(200, {
          access_token: 'eyJ.ACCESS.TOKEN',
          refresh_token: 'eyJ.REFRESH.TOKEN',
          id_token: 'eyJ.ID.TOKEN',
          token_type: 'Bearer',
          expires_in: 86400,
          scope: 'openid profile',
        });

      const result = await client.exchangeToken(baseParams);

      expect(result).toEqual({
        access_token: 'eyJ.ACCESS.TOKEN',
        refresh_token: 'eyJ.REFRESH.TOKEN',
        id_token: 'eyJ.ID.TOKEN',
        token_type: 'Bearer',
        expires_in: 86400,
        scope: 'openid profile',
      });
    });

    test('should include optional scope parameter in request body', async () => {
      nock(`https://${DOMAIN}`)
        .post('/oauth/token', (body) => {
          // Verify body contains URL-encoded scope parameter
          return (
            body.scope === 'openid profile email' &&
            body.grant_type === 'urn:ietf:params:oauth:grant-type:token-exchange'
          );
        })
        .reply(200, {
          access_token: '...',
          id_token: '...',
          expires_in: 3600,
          scope: 'openid profile email',
        });

      const result = await client.exchangeToken({
        ...baseParams,
        scope: 'openid profile email',
      });

      expect(result.scope).toBe('openid profile email');
    });

    test('should reject reserved IETF namespace', async () => {
      await expect(
        client.exchangeToken({
          ...baseParams,
          subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
        })
      ).rejects.toThrow('Reserved namespaces are prohibited');
    });

    test('should reject Auth0.com namespace', async () => {
      await expect(
        client.exchangeToken({
          ...baseParams,
          subject_token_type: 'https://auth0.com/custom-token',
        })
      ).rejects.toThrow('Reserved namespaces are prohibited');
    });

    test('should handle consent_required error', async () => {
      nock(`https://${DOMAIN}`).post('/oauth/token').reply(400, {
        error: 'invalid_request',
        error_description: 'Consent required',
      });

      await expect(client.exchangeToken(baseParams)).rejects.toThrow('Consent required');
    });

    test('should handle rate limiting', async () => {
      nock(`https://${DOMAIN}`).post('/oauth/token').reply(429, {
        error: 'too_many_attempts',
        error_description: 'Too many requests - try again later',
      });

      await expect(client.exchangeToken(baseParams)).rejects.toThrow('Too many requests');
    });

    test('should handle invalid credentials', async () => {
      nock(`https://${DOMAIN}`).post('/oauth/token').reply(401, {
        error: 'invalid_client',
        error_description: 'Invalid client credentials',
      });

      await expect(client.exchangeToken(baseParams)).rejects.toThrow('Invalid client credentials');
    });

    test('should forward custom parameters', async () => {
      nock(`https://${DOMAIN}`)
        .post('/oauth/token', /custom_param=value/)
        .reply(200, { access_token: '...', id_token: '...', expires_in: 3600 });

      await client.exchangeToken({
        ...baseParams,
        custom_param: 'value',
      });
    });

    test('should validate token type before making request', async () => {
      // No nock setup - should fail before making request
      await expect(
        client.exchangeToken({
          ...baseParams,
          subject_token_type: 'urn:auth0:invalid-type',
        })
      ).rejects.toThrow('Reserved namespaces are prohibited');
    });
  });

  describe('validateTokenType()', () => {
    const validCases = [
      'urn:company:custom-token',
      'https://api.company.com/token-type',
      'urn:partner:legacy-system:v1',
    ];

    const invalidCases = [
      { type: 'urn:ietf:params:oauth:jwt', reason: 'IETF namespace' },
      { type: 'https://auth0.com/token', reason: 'Auth0 root domain' },
      { type: 'urn:auth0:custom-type', reason: 'Auth0 URN' },
    ];

    validCases.forEach((tokenType) => {
      test(`should allow ${tokenType}`, () => {
        expect(() => (client as any).validateTokenType(tokenType)).not.toThrow();
      });
    });

    invalidCases.forEach(({ type, reason }) => {
      test(`should reject ${reason} (${type})`, () => {
        expect(() => (client as any).validateTokenType(type)).toThrow(/Reserved namespaces/);
      });
    });
  });
});
