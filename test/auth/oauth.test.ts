import nock from 'nock';
import {
  OAuth,
  AuthorizationCodeGrantRequest,
  AuthorizationCodeGrantWithPKCERequest,
  ClientCredentialsGrantRequest,
  PasswordGrantRequest,
  RefreshTokenGrantRequest,
  RevokeRefreshTokenRequest,
} from '../../src/auth/OAuth';
import { withIdToken } from '../utils/withIdToken';

const { back: nockBack } = nock;

const opts = {
  domain: 'test-domain.auth0.com',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  idTokenSigningAlg: 'HS256',
};

describe('OAuth', () => {
  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('auth/fixtures/oauth.json', {
      before: await withIdToken(opts),
    }));
  });

  afterAll(() => {
    nockDone();
  });

  describe('#authorizationCodeGrant', () => {
    it('should require a code', () => {
      const oauth = new OAuth(opts);
      expect(oauth.authorizationCodeGrant({} as AuthorizationCodeGrantRequest)).rejects.toThrow(
        'Required parameter requestParameters.code was null or undefined.'
      );
    });

    it('should return tokens', async () => {
      const oauth = new OAuth(opts);
      await expect(
        oauth.authorizationCodeGrant({
          code: 'test-valid-code',
          redirect_uri: 'https://example.com',
        })
      ).resolves.toMatchObject({
        data: {
          access_token: 'my-access-token',
          expires_in: 86400,
          token_type: 'Bearer',
        },
      });
    });

    it('should throw for invalid code', async () => {
      const oauth = new OAuth(opts);
      await expect(
        oauth.authorizationCodeGrant({
          code: 'test-invalid-code',
          redirect_uri: 'https://example.com',
        })
      ).rejects.toThrowError(
        expect.objectContaining({
          body: expect.anything(),
        })
      );
    });
  });

  describe('#authorizationCodeGrantWithPKCE', () => {
    it('should require a code_verifier', () => {
      const oauth = new OAuth(opts);
      expect(
        oauth.authorizationCodeGrantWithPKCE({
          code: 'foo',
        } as AuthorizationCodeGrantWithPKCERequest)
      ).rejects.toThrow(
        'Required parameter requestParameters.code_verifier was null or undefined.'
      );
    });

    it('should return tokens', async () => {
      const oauth = new OAuth(opts);
      await expect(
        oauth.authorizationCodeGrantWithPKCE({
          code: 'test-code',
          code_verifier: 'test-valid-code-verifier',
          redirect_uri: 'https://example.com',
        })
      ).resolves.toMatchObject({
        data: {
          access_token: 'my-access-token',
          expires_in: 86400,
          token_type: 'Bearer',
        },
      });
    });

    it('should throw for invalid code verifier', async () => {
      const oauth = new OAuth(opts);
      await expect(
        oauth.authorizationCodeGrantWithPKCE({
          code: 'test-code',
          code_verifier: 'test-invalid-code-verifier',
          redirect_uri: 'https://example.com',
        })
      ).rejects.toThrowError(
        expect.objectContaining({
          body: expect.anything(),
        })
      );
    });
  });

  describe('#clientCredentialsGrant', () => {
    it('should require an audience', () => {
      const oauth = new OAuth(opts);
      expect(oauth.clientCredentialsGrant({} as ClientCredentialsGrantRequest)).rejects.toThrow(
        'Required parameter requestParameters.audience was null or undefined.'
      );
    });

    it('should return tokens', async () => {
      const oauth = new OAuth(opts);
      await expect(oauth.clientCredentialsGrant({ audience: 'my-api' })).resolves.toMatchObject({
        data: {
          access_token: 'my-access-token',
          expires_in: 86400,
          token_type: 'Bearer',
        },
      });
    });
  });

  describe('#passwordGrant', () => {
    it('should require a password', () => {
      const oauth = new OAuth(opts);
      expect(oauth.passwordGrant({ username: 'foo' } as PasswordGrantRequest)).rejects.toThrow(
        'Required parameter requestParameters.password was null or undefined.'
      );
    });

    it('should return tokens', async () => {
      const oauth = new OAuth(opts);
      await expect(
        oauth.passwordGrant({ username: 'test-username', password: 'test-password' })
      ).resolves.toMatchObject({
        data: {
          access_token: 'my-access-token',
          expires_in: 86400,
          token_type: 'Bearer',
          id_token: expect.any(String),
          scope: 'openid profile email address phone',
        },
      });
    });

    it('should return tokens when passed a realm', async () => {
      const oauth = new OAuth(opts);
      await expect(
        oauth.passwordGrant({
          username: 'test-username',
          password: 'test-password',
          realm: 'Username-Password-Authentication',
        })
      ).resolves.toMatchObject({
        data: {
          access_token: 'my-access-token',
          expires_in: 86400,
          token_type: 'Bearer',
          id_token: expect.any(String),
          scope: 'openid profile email address phone',
        },
      });
    });
  });

  describe('#refreshTokenGrant', () => {
    it('should require a refresh token', () => {
      const oauth = new OAuth(opts);
      expect(oauth.refreshTokenGrant({} as RefreshTokenGrantRequest)).rejects.toThrow(
        'Required parameter requestParameters.refresh_token was null or undefined.'
      );
    });

    it('should return tokens', async () => {
      const oauth = new OAuth(opts);
      await expect(
        oauth.refreshTokenGrant({ refresh_token: 'test-refresh-token' })
      ).resolves.toMatchObject({
        data: {
          access_token: 'my-access-token',
          expires_in: 86400,
          token_type: 'Bearer',
          id_token: expect.any(String),
          scope: 'openid profile email address phone offline_access',
        },
      });
    });
  });

  describe('#revokeRefreshToken', () => {
    it('should require a refresh token', () => {
      const oauth = new OAuth(opts);
      expect(oauth.revokeRefreshToken({} as RevokeRefreshTokenRequest)).rejects.toThrow(
        'Required parameter requestParameters.token was null or undefined.'
      );
    });

    it('should return tokens', async () => {
      const oauth = new OAuth(opts);
      await expect(
        oauth.revokeRefreshToken({ token: 'test-refresh-token' })
      ).resolves.toMatchObject({
        status: 200,
      });
    });
  });
});
