import { ClientOptions } from '../lib/runtime.js';

export interface ManagementClientOptions extends ClientOptions {
  domain: string;
  audience?: string;
  headers?: Record<string, string>;
}

export interface ManagementClientOptionsWithToken extends ManagementClientOptions {
  token: string | (() => Promise<string>) | (() => string);
}

export interface ManagementClientOptionsWithClientSecret extends ManagementClientOptions {
  clientId: string;
  clientSecret: string;
  useMTLS?: boolean;
}

export interface ManagementClientOptionsWithClientAssertion extends ManagementClientOptions {
  clientId: string;
  clientAssertionSigningKey: string;
  clientAssertionSigningAlg?: string;
  useMTLS?: boolean;
}

export type ManagementClientOptionsWithClientCredentials =
  | ManagementClientOptionsWithClientSecret
  | ManagementClientOptionsWithClientAssertion;
