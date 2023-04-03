import { FetchParams, Middleware, RequestContext } from './__generated';
import { TokenProvider } from './token-provider';

export class TokenProviderMiddleware implements Middleware {
  constructor(private tokenProvider: TokenProvider) {}

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
