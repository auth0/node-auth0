import { BaseAPI, Configuration as BaseConfiguration, ResponseError } from '../runtime';
import { AddClientAuthenticationPayload, addClientAuthentication } from './clientAuthentication';
import { Response, Headers } from 'node-fetch';

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
  constructor(
    public error: string,
    public error_description: string,
    public statusCode: number,
    public body: string,
    public headers: Headers
  ) {
    super(error_description || error);
  }
}

async function parseError(response: Response) {
  // Errors typically have a specific format:
  // {
  //    error: 'invalid_body',
  //    error_description: 'Bad Request',
  // }

  const body = await response.text();
  let data: AuthApiErrorResponse;

  try {
    data = JSON.parse(body) as AuthApiErrorResponse;
    return new AuthApiError(
      data.error,
      data.error_description,
      response.status,
      body,
      response.headers
    );
  } catch (_) {
    return new ResponseError(
      response.status,
      body,
      response.headers,
      'Response returned an error code'
    );
  }
}
export class BaseAuthAPI extends BaseAPI {
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
