import nock from 'nock';
import { jest } from '@jest/globals';

import OAuth, { TokenSet } from '../../src/auth/OAuth';
import { AuthenticationClient } from '../../src/auth';

const domain = 'example.auth0.com';
const baseUrl = `https://${domain}`;

const opts = {
  domain,
  clientId: 'my-client-id',
  clientSecret: 'my-client-secret',
};

const tokens = {
  access_token: 'my-access-token',
  expires_in: 86400,
  token_type: 'Bearer',
};

describe('OAuth', () => {
  let auth0: AuthenticationClient;
  let spy: jest.Mock;

  beforeEach(() => {
    auth0 = new AuthenticationClient(opts);
    spy = jest.fn().mockReturnValue(tokens);
    nock(baseUrl).post('/oauth/token').reply(200, spy);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should create an OAuth instance', () => {
    expect(auth0.oauth).toBeInstanceOf(OAuth);
  });

  describe('#clientCredentialsGrant', () => {
    it('should require an audience', () => {
      expect(auth0.oauth.clientCredentialsGrant({} as { audience: string })).rejects.toThrow(
        'Required parameter requestParameters.audience was null or undefined.'
      );
    });

    it('should return tokens', async () => {
      await expect(auth0.oauth.clientCredentialsGrant({ audience: 'foo' })).resolves.toMatchObject({
        data: tokens,
      });
      expect(spy).toHaveBeenCalled();
    });
  });
});
