import { ManagementClientBase } from './__generated';
import {
  ManagementClientOptionsWithClientCredentials,
  ManagementClientOptionsWithToken,
} from './management-client.options';
import { TokenProviderMiddleware } from './TokenProviderMiddleware';

export class ManagementClient extends ManagementClientBase {
  constructor(options: ManagementClientOptionsWithToken);
  constructor(options: ManagementClientOptionsWithClientCredentials);
  constructor(
    options: ManagementClientOptionsWithToken | ManagementClientOptionsWithClientCredentials
  ) {
    super({
      ...options,
      baseUrl: `https://${options.domain}/api/v2`,
      middleware: [...(options.middleware || []), new TokenProviderMiddleware(options)],
    });
  }
}
