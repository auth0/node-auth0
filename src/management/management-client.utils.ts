import {
  ManagementClientOptionsWithClientCredentials,
  ManagementClientOptionsWithToken,
} from './management-client.options';
import { TokenProvider, TokenProviderOptions } from './token-provider';

export function toTokenProviderOptions(
  options: ManagementClientOptionsWithClientCredentials
): TokenProviderOptions {
  const base = {
    domain: options.domain,
    audience: options.audience ?? `https://${options.domain}/api/v2/`,
  };

  if ('clientAssertionSigningKey' in options) {
    return {
      ...base,
      clientId: options.clientId,
      clientAssertionSigningKey: options.clientAssertionSigningKey,
    };
  } else {
    return {
      ...base,
      clientId: options.clientId,
      clientSecret: options.clientSecret,
    };
  }
}

export function tokenProviderFactory(
  options: ManagementClientOptionsWithToken | ManagementClientOptionsWithClientCredentials
) {
  if ('token' in options) {
    return {
      getAccessToken: () => Promise.resolve(options.token),
    } as TokenProvider;
  } else {
    return new TokenProvider(toTokenProviderOptions(options));
  }
}
