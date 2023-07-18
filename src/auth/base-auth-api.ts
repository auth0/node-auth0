import { ResponseError } from '../lib/errors.js';
import { BaseAPI, ClientOptions } from '../lib/runtime.js';
import {
  AddClientAuthenticationPayload,
  addClientAuthentication,
} from './client-authentication.js';

export interface AuthenticationClientOptions extends ClientOptions {
  domain: string;
  clientId: string;
  clientSecret?: string;
  clientAssertionSigningKey?: string;
  clientAssertionSigningAlg?: string;
  idTokenSigningAlg?: string; // default 'RS256'
  clockTolerance?: number; // default 60s,
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

function parseErrorBody(body: any): AuthApiErrorResponse {
  const rawData = JSON.parse(body);
  let data: AuthApiErrorResponse;

  if (rawData.code) {
    data = {
      error: rawData.code,
      error_description: rawData.description,
    };
  } else {
    data = rawData as AuthApiErrorResponse;
  }

  return data;
}

async function parseError(response: Response) {
  // Errors typically have a specific format:
  // {
  //    error: 'invalid_body',
  //    error_description: 'Bad Request',
  // }

  const body = await response.text();

  try {
    const data = parseErrorBody(body);

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

  constructor(options: AuthenticationClientOptions) {
    super({ ...options, baseUrl: `https://${options.domain}`, parseError });

    this.domain = options.domain;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.clientAssertionSigningKey = options.clientAssertionSigningKey;
    this.clientAssertionSigningAlg = options.clientAssertionSigningAlg;
  }

  /**
   * @private
   */
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
