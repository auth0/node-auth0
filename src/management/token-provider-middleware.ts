import { FetchParams, Middleware, RequestContext } from '../lib/runtime.js';
import {
  ManagementClientOptionsWithClientAssertion,
  ManagementClientOptionsWithClientCredentials,
  ManagementClientOptionsWithClientSecret,
  ManagementClientOptionsWithToken,
} from './management-client-options.js';
import { TokenProvider } from './token-provider.js';

export class TokenProviderMiddleware implements Middleware {
  private tokenProvider: { getAccessToken: () => Promise<string> };
  constructor(
    options: ManagementClientOptionsWithToken | ManagementClientOptionsWithClientCredentials
  ) {
    if ('token' in options) {
      this.tokenProvider = {
        getAccessToken: () => Promise.resolve(options.token),
      };
    } else {
      this.tokenProvider = new TokenProvider({
        ...options,
        audience: options.audience ?? `https://${options.domain}/api/v2/`,
        ...{ clientSecret: (options as ManagementClientOptionsWithClientSecret).clientSecret },
        ...{
          clientAssertionSigningKey: (options as ManagementClientOptionsWithClientAssertion)
            .clientAssertionSigningKey,
        },
      });
    }
  }

  async pre?(context: RequestContext): Promise<FetchParams | void> {
    const token = await this.tokenProvider.getAccessToken();
    context.init.headers = {
      ...context.init.headers,
      Authorization: `Bearer ${token}`,
    };
    return {
      url: context.url,
      init: context.init,
    };
  }
}
