import path from 'path';
import { fileURLToPath } from 'url';
import nock from 'nock';

import OAuth from '../../src/auth/OAuth';

const { back: nockBack } = nock;

nockBack.fixtures = `${path.dirname(fileURLToPath(import.meta.url))}/fixtures`;

const DOMAIN = 'test-domain.auth0.com';
const BASE_URL = `https://${DOMAIN}`;
const AUDIENCE = `https://${DOMAIN}/api/v2/`;
const CLIENT_ID = 'test-client-id';
const CLIENT_SECRET = 'test-client-secret';
const ACCESS_TOKEN = 'my-access-token';

const opts = {
  domain: DOMAIN,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

describe('OAuth', () => {
  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('oauth.json'));
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
          access_token: expect.any(String),
          expires_in: expect.any(Number),
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

  describe('#clientCredentialsGrant', () => {
    it('should require an audience', () => {
      const oauth = new OAuth(opts);
      expect(oauth.clientCredentialsGrant({} as { audience: string })).rejects.toThrow(
        'Required parameter requestParameters.audience was null or undefined.'
      );
    });

    it('should return tokens', async () => {
      const oauth = new OAuth(opts);
      await expect(
        oauth.clientCredentialsGrant({ audience: `https://${opts.domain}/api/v2/` })
      ).resolves.toMatchObject({
        data: {
          access_token: expect.any(String),
          expires_in: expect.any(Number),
          token_type: 'Bearer',
        },
      });
    });
  });
});
