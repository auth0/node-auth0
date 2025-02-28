import { ResponseError } from '../lib/errors.js';
import {
  BaseAPI,
  ClientOptions,
  HTTPMethod,
  InitOverride,
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

  /**
   * Makes a generic token request and returns the response data.
   *
   * @template T - The type of the response data.
   * @param {RequestInputs} requestInputs - The inputs required to make the request.
   * @returns {Promise<T>} - A promise that resolves to the response data of type T.
   */
  protected async getGenericResponseData<T>(requestInputs: RequestInputs): Promise<T> {
    return (await genericTokenRequest<T>(this.request.bind(this), requestInputs)).data;
  }
}

const TOKEN_URL = '/oauth/token';
const TOKEN_METHOD = 'POST';
const TOKEN_REQUEST_HEADERS: Record<string, string> = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

type RequestInputs = {
  path?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string[][] | Record<string, string> | string | URLSearchParams;
  initOverrides?: InitOverride;
};

/**
 * Makes a generic token request and returns a JSON API response.
 *
 * @template T - The type of the response data.
 * @param request - A function that performs the HTTP request.
 * @param request.context - The request options including path, method, headers, and body.
 * @param request.initOverrides - Optional overrides for the request initialization.
 * @param body - The body of the request, typically containing the token request parameters.
 * @param initOverrides - Optional overrides for the request initialization.
 * @returns A promise that resolves to a JSON API response of type T.
 */
const genericTokenRequest = async <T>(
  request: (
    context: RequestOpts,
    initOverrides?: RequestInit | InitOverrideFunction
  ) => Promise<Response>,
  { path, method, body, headers, initOverrides }: RequestInputs
): Promise<JSONApiResponse<T>> => {
  const response = await request(
    {
      path: path ?? TOKEN_URL,
      method: (method ?? TOKEN_METHOD) as HTTPMethod,
      headers: headers ?? TOKEN_REQUEST_HEADERS,
      body: new URLSearchParams(body),
    },
    initOverrides ?? {}
  );
  const r: JSONApiResponse<T> = await JSONApiResponse.fromResponse(response);
  return r;
};

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
  const res: JSONApiResponse<TokenSet> = await genericTokenRequest(request, {
    body: {
      client_id: clientId,
      ...bodyParameters,
      grant_type: grantType,
    },
    initOverrides,
  });
  if (res.data.id_token) {
    await idTokenValidator.validate(res.data.id_token, idTokenValidateOptions);
  }
  return res;
}

/**
 * Standardized token response structure for Auth0 authentication flows
 *
 * @remarks
 * **Token Lifetime Management**:
 * - Cache tokens according to `expires_in` value
 * - Rotate refresh tokens using `offline_access` scope
 * - Revoke compromised tokens immediately
 *
 * @security
 * - Store tokens in secure, encrypted storage
 * - Never expose in client-side code or logs
 */
export type TokenResponse = {
  /** Bearer token for API authorization */
  access_token: string;

  /** Refresh token (requires `offline_access` scope) */
  refresh_token?: string;

  /** JWT containing user identity claims */
  id_token: string;

  /** Typically "Bearer" */
  token_type?: string;

  /** Token validity in seconds (default: 86400) */
  expires_in: number;

  /** Granted permissions space */
  scope: string;
};
