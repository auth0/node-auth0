import memoizer from 'lru-memoizer';
import { promisify } from 'util';

import { AuthenticationClient } from '../auth';
import { TokenSet } from '../auth/OAuth';

export interface BaseTokenProviderOptions {
  domain: string;
  audience: string;
  clientId: string;
  enableCache?: boolean;
  cacheTTLInSeconds?: number;
}

export interface TokenProviderOptionsWithClientSecret extends BaseTokenProviderOptions {
  clientSecret: string;
}

export interface TokenProviderOptionsWithClientAssertion extends BaseTokenProviderOptions {
  clientAssertionSigningKey: string;
}

export type TokenProviderOptions =
  | TokenProviderOptionsWithClientSecret
  | TokenProviderOptionsWithClientAssertion;

export class TokenProvider {
  private options: TokenProviderOptions;

  private authenticationClient: AuthenticationClient;

  constructor(options: TokenProviderOptions) {
    if (!options || typeof options !== 'object') {
      throw new Error('Options must be an object');
    }

    const params = { enableCache: true, ...options };

    if (!params.domain || params.domain.length === 0) {
      throw new Error('Must provide a domain');
    }

    if (!params.clientId || params.clientId.length === 0) {
      throw new Error('Must provide a clientId');
    }

    if (!('clientSecret' in params) && !('clientAssertionSigningKey' in params)) {
      throw new Error('Must provide a clientSecret or a clientAssertionSigningKey');
    } else if (
      ('clientSecret' in params && params.clientSecret.length === 0) ||
      ('clientAssertionSigningKey' in params && params.clientAssertionSigningKey.length === 0)
    ) {
      throw new Error('Must provide a clientSecret or a clientAssertionSigningKey');
    }

    if (!params.audience || params.audience.length === 0) {
      throw new Error('Must provide a audience');
    }

    if (typeof params.enableCache !== 'boolean') {
      throw new Error('enableCache must be a boolean');
    }

    if (params.enableCache && params.cacheTTLInSeconds) {
      if (typeof params.cacheTTLInSeconds !== 'number') {
        throw new Error('cacheTTLInSeconds must be a number');
      }

      if (params.cacheTTLInSeconds <= 0) {
        throw new Error('cacheTTLInSeconds must be a greater than 0');
      }
    }

    this.options = params;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { audience, enableCache, cacheTTLInSeconds, ...authenticationClientOptions } =
      this.options;

    this.authenticationClient = new AuthenticationClient({
      ...authenticationClientOptions,
      baseUrl: `https://${params.domain}`,
    });
  }

  private getCachedAccessToken = promisify<TokenProviderOptions, TokenSet>(
    memoizer<TokenProviderOptions, TokenSet>({
      load: (options: TokenProviderOptions, callback: (err: any, data?: TokenSet) => void) => {
        this.authenticationClient.oauth
          .clientCredentialsGrant({ audience: this.options.audience })
          .then(({ data }: { data: TokenSet }) => {
            callback(null, data);
          })
          .catch((err: any) => {
            callback(err, undefined);
          });
      },
      hash(options: TokenProviderOptions) {
        return `${options.domain}-${options.clientId}-${options.audience}`;
      },
      itemMaxAge(options: TokenProviderOptions, data: TokenSet) {
        if (options.cacheTTLInSeconds) {
          return options.cacheTTLInSeconds * 1000;
        }

        // if the expires_in is lower or equal to than 10 seconds, do not subtract 10 additional seconds.
        if (data.expires_in && data.expires_in <= 10 /* seconds */) {
          return data.expires_in * 1000;
        } else if (data.expires_in) {
          // Subtract 10 seconds from expires_in to fetch a new one, before it expires.
          return data.expires_in * 1000 - 10000 /* milliseconds */;
        }
        return 60 * 60 * 1000; //1h
      },

      // TODO: Need to patch lru-memoizer to accept a max on its types.
      // max: 100,
    })
  );

  /**
   * Returns the access_token.
   *
   * @returns {Promise} Promise returning an access_token.
   */
  async getAccessToken() {
    if (this.options.enableCache) {
      const data = await this.getCachedAccessToken(this.options);
      return data.access_token;
    } else {
      const { data } = await this.authenticationClient.oauth.clientCredentialsGrant({
        audience: this.options.audience,
      });
      return data.access_token;
    }
  }
}
