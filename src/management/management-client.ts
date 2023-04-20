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
    super({
      baseUrl: `https://${options.domain}/api/v2`,
      middleware: [
        ...(options.middleware || []),
        new TokenProviderMiddleware(tokenProviderFactory(options)),
      ],
    });
  }
}
