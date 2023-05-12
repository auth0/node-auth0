import { AuthenticationClient } from '../auth';
import { TokenSet } from '../auth/oauth';
import { JSONApiResponse } from '../lib/models';

const LEEWAY = 10 * 1000;

interface BaseOptions {
  domain: string;
  audience: string;
  clientId: string;
  enableCache?: boolean;
}

export class TokenProvider {
  private authenticationClient: AuthenticationClient;
  private expiresAt = 0;
  private accessToken = '';
  private pending: Promise<JSONApiResponse<TokenSet>> | undefined;

  constructor(options: BaseOptions & { clientSecret: string });
  constructor(options: BaseOptions & { clientAssertionSigningKey: string });
  constructor(private options: any) {
    this.authenticationClient = new AuthenticationClient({
      clientId: options.clientId,
      domain: options.domain,
      clientSecret: options.clientSecret,
      clientAssertionSigningKey: options.clientAssertionSigningKey,
    });
  }

  public async getAccessToken() {
    const disableCache = this.options.enableCache === false;
    if (disableCache || !this.accessToken || Date.now() > this.expiresAt - LEEWAY) {
      this.pending =
        (!disableCache && this.pending) ||
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
