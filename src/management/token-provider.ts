import { AuthenticationClient } from '../auth/index.js';
import { TokenSet } from '../auth/oauth.js';
import { JSONApiResponse } from '../lib/models.js';
import {
  ManagementClientOptionsWithClientAssertion,
  ManagementClientOptionsWithClientCredentials,
  ManagementClientOptionsWithClientSecret,
} from './management-client-options.js';

const LEEWAY = 10 * 1000;

export class TokenProvider {
  private authenticationClient: AuthenticationClient;
  private expiresAt = 0;
  private accessToken = '';
  private pending: Promise<JSONApiResponse<TokenSet>> | undefined;

  constructor(options: ManagementClientOptionsWithClientSecret & { audience: string });
  constructor(options: ManagementClientOptionsWithClientAssertion & { audience: string });
  constructor(
    private options: ManagementClientOptionsWithClientCredentials & { audience: string }
  ) {
    this.authenticationClient = new AuthenticationClient(options);
  }

  public async getAccessToken() {
    if (!this.accessToken || Date.now() > this.expiresAt - LEEWAY) {
      this.pending =
        this.pending ||
        this.authenticationClient.oauth.clientCredentialsGrant({
          audience: this.options.audience,
        });
      const {
        data: { access_token: accessToken, expires_in: expiresIn },
      } = await this.pending.finally(() => {
        delete this.pending;
      });
      this.expiresAt = Date.now() + expiresIn * 1000;
      this.accessToken = accessToken;
    }
    return this.accessToken;
  }
}
