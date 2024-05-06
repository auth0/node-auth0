import { ResponseError } from '../lib/errors.js';
import {
  BaseAPI,
  ClientOptions,
  InitOverrideFunction,
  JSONApiResponse,
  RequestOpts,
} from '../lib/runtime.js';
import {
  AddClientAuthenticationPayload,
  addClientAuthentication,
} from './client-authentication.js';
import { IDTokenValidator } from './id-token-validator.js';
import { GrantOptions, TokenSet } from './oauth.js';
import { TelemetryMiddleware } from '../lib/middleware/telemetry-middleware.js';

export interface AuthenticationClientOptions extends ClientOptions {
  domain: string;
  clientId: string;
  clientSecret?: string;
  clientAssertionSigningKey?: string;
  clientAssertionSigningAlg?: string;
  idTokenSigningAlg?: string; // default 'RS256'
  clockTolerance?: number; // default 60s,
  useMTLS?: boolean;
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

  if (rawData.error) {
    data = rawData as AuthApiErrorResponse;
  } else {
    data = {
      error: rawData.code,
      error_description: rawData.description,
    };
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
  useMTLS?: boolean;

  constructor(options: AuthenticationClientOptions) {
    super({
      ...options,
      baseUrl: `https://${options.domain}`,
      middleware: options.telemetry !== false ? [new TelemetryMiddleware(options)] : [],
      parseError,
      retry: { enabled: false, ...options.retry },
    });

    this.domain = options.domain;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.clientAssertionSigningKey = options.clientAssertionSigningKey;
    this.clientAssertionSigningAlg = options.clientAssertionSigningAlg;
    this.useMTLS = options.useMTLS;
  }

  /**
   * @private
   */
  protected async addClientAuthentication(
    payload: AddClientAuthenticationPayload
  ): Promise<AddClientAuthenticationPayload> {
    return addClientAuthentication({
      payload,
      domain: this.domain,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      clientAssertionSigningKey: this.clientAssertionSigningKey,
      clientAssertionSigningAlg: this.clientAssertionSigningAlg,
      useMTLS: this.useMTLS,
    });
  }
}

/**
 * @private
 * Perform an OAuth 2.0 grant.
 */
export async function grant(
  grantType: string,
  bodyParameters: Record<string, any>,
  { idTokenValidateOptions, initOverrides }: GrantOptions = {},
  clientId: string,
  idTokenValidator: IDTokenValidator,
  request: (
    context: RequestOpts,
    initOverrides?: RequestInit | InitOverrideFunction
  ) => Promise<Response>
): Promise<JSONApiResponse<TokenSet>> {
  const response = await request(
    {
      path: '/oauth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        ...bodyParameters,
        grant_type: grantType,
      }),
    },
    initOverrides
  );

  const res: JSONApiResponse<TokenSet> = await JSONApiResponse.fromResponse(response);
  if (res.data.id_token) {
    await idTokenValidator.validate(res.data.id_token, idTokenValidateOptions);
  }
  return res;
}
