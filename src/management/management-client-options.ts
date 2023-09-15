import { ClientOptions } from '../lib/runtime.js';

export interface ManagementClientOptions extends ClientOptions {
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
  clientAssertionSigningAlg?: string;
}

export type ManagementClientOptionsWithClientCredentials =
  | ManagementClientOptionsWithClientSecret
  | ManagementClientOptionsWithClientAssertion;
