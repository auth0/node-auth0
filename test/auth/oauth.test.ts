import path from 'path';
import { fileURLToPath } from 'url';
import nock from 'nock';

import OAuth from '../../src/auth/OAuth';

const { back: nockBack } = nock;

const opts = {
  domain: 'test-domain.auth0.com',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
};

describe('OAuth', () => {
  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('auth/fixtures/oauth.json'));
  });

  afterAll(() => {
    nockDone();
  });

  describe('#authorizationCodeGrant', () => {
    it('should require a code', () => {
      const oauth = new OAuth(opts);
      expect(oauth.authorizationCodeGrant({} as { code: string })).rejects.toThrow(
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
          response: expect.anything(),
        })
      );
    });
  });

  describe('#authorizationCodeGrantWithPKCE', () => {
    it('should require a code_verifier', () => {
      const oauth = new OAuth(opts);
      expect(
        oauth.authorizationCodeGrantWithPKCE({ code: 'foo' } as {
          code: string;
          code_verifier: string;
        })
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
          response: expect.anything(),
        })
      );
    });
  });

  describe('#clientCredentialsGrant', () => {
    it('should require an audience', () => {
      const oauth = new OAuth(opts);
      expect(oauth.clientCredentialsGrant({} as { audience: string })).rejects.toThrow(
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
});
