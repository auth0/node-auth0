import fetch, { RequestInfo as NFRequestInfo, RequestInit as NFRequestInit } from 'node-fetch';
import { Configuration } from './runtime';
import { ManagementClientBase } from './__generated';
import {
  ManagementClientOptionsWithClientCredentials,
  ManagementClientOptionsWithToken,
} from './management-client.options';
import { tokenProviderFactory } from './management-client.utils';
import { TokenProviderMiddleware } from './token-provider.middleware';

export class ManagementClient extends ManagementClientBase {
  constructor(
    options: ManagementClientOptionsWithToken | ManagementClientOptionsWithClientCredentials
  ) {
    super(
      new Configuration({
        baseUrl: `https://${options.domain}/api/v2`,
        fetchApi: (url: RequestInfo, init: RequestInit) =>
          fetch(url as NFRequestInfo, init as NFRequestInit) as unknown as Promise<Response>,
        middleware: [],
      })
    );

    this.configuration.middleware.push(new TokenProviderMiddleware(tokenProviderFactory(options)));
  }
}
