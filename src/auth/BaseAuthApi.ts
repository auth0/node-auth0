import { BaseAPI, Configuration as BaseConfiguration, ResponseError } from '../runtime';
import { AddClientAuthenticationPayload, addClientAuthentication } from './clientAuthentication';
import { Response } from 'node-fetch';

export interface Configuration extends Omit<BaseConfiguration, 'baseUrl' | 'parseError'> {
  domain: string;
  clientId: string;
  clientSecret?: string;
  clientAssertionSigningKey?: string;
  clientAssertionSigningAlg?: string;
}

interface AuthApiErrorResponse {
  error_description: string;
  error: string;
}

export class AuthApiError extends Error {
  override name = 'AuthApiError' as const;
  constructor(public error: string, public error_description: string) {
    super(error_description);
  }
}

async function parseError(response: Response) {
  // Errors typically have a specific format:
  // {
  //    error: 'invalid_body',
  //    error_description: 'Bad Request',
  // }

  let data: AuthApiErrorResponse;

  try {
    data = (await response.json()) as AuthApiErrorResponse;
  } catch (_) {
    return new ResponseError(response, response.status, 'Response returned an error code');
  }

  if (data.error && data.error_description) {
    return new AuthApiError(data.error, data.error_description);
  } else {
    return new ResponseError(response, response.status, 'Response returned an error code');
  }
}
export default class BaseAuthAPI extends BaseAPI {
  domain: string;
  clientId: string;
  clientSecret?: string;
  clientAssertionSigningKey?: string;
  clientAssertionSigningAlg?: string;

  constructor(configuration: Configuration) {
    super({ ...configuration, baseUrl: `https://${configuration.domain}`, parseError });

    this.domain = configuration.domain;
    this.clientId = configuration.clientId;
    this.clientSecret = configuration.clientSecret;
    this.clientAssertionSigningKey = configuration.clientAssertionSigningKey;
    this.clientAssertionSigningAlg = configuration.clientAssertionSigningAlg;
  }

  protected async addClientAuthentication(
    payload: AddClientAuthenticationPayload,
    required: boolean
  ): Promise<AddClientAuthenticationPayload> {
    return addClientAuthentication({
      payload,
      domain: this.domain,
      required,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      clientAssertionSigningKey: this.clientAssertionSigningKey,
      clientAssertionSigningAlg: this.clientAssertionSigningAlg,
    });
  }
}
