import { Configuration } from '../runtime';

export interface ManagementClientOptions extends Omit<Configuration, 'baseUrl'> {
  domain: string;
  audience?: string;
}

export interface ManagementClientOptionsWithToken extends ManagementClientOptions {
  token: string;
}

export interface ManagementClientOptionsWithClientSecret extends ManagementClientOptions {
  clientId: string;
  clientSecret: string;
}

export interface ManagementClientOptionsWithClientAssertion extends ManagementClientOptions {
  clientId: string;
  clientAssertionSigningKey: string;
}

export type ManagementClientOptionsWithClientCredentials =
  | ManagementClientOptionsWithClientSecret
  | ManagementClientOptionsWithClientAssertion;
