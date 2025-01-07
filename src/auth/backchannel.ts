// Wednesday, 8 January, 2025
// Client Initiated Backchannel Authentication (CIBA)

// CIBA is an OpenID Foundation standard for a decoupled authentication flow. It enables
// solution developers to build authentication flows where the user logging in does not do so
// directly on the device that receives the ID or access tokens (the “Consumption Device”), but
// instead on a separate “Authorization Device”.

import { JSONApiResponse } from '../lib/models.js';
import { BaseAuthAPI } from './base-auth-api.js';

/**
 * The response from the authorize endpoint.
 */
export type AuthorizeResponse = {
  /**
   * The authorization request ID.
   */
  auth_req_id: string;
  /**
   * The duration in seconds until the authentication request expires.
   */
  expires_in: number;
  /**
   * The interval in seconds to wait between poll requests.
   */
  interval: number;
};

type AuthorizeCredentialsPartial = {
  client_id: string;
  client_secret?: string;
  client_assertion?: string;
  client_assertion_type?: string;
};

/**
 * The login hint containing information about the user for authentication.
 */
type LoginHint = {
  /**
   * The format of the login hint.
   */
  format: 'iss_sub';
  /**
   * The issuer URL.
   */
  iss: string;
  /**
   * The subject identifier.
   */
  sub: string;
};

/**
 * Generates the login hint for the user.
 *
 * @param {string} userId - The user ID.
 * @param {string} domain - The tenant domain.
 * @returns {string} - The login hint as a JSON string.
 */
const getLoginHint = (userId: string, domain: string): string => {
  const loginHint: LoginHint = {
    format: 'iss_sub',
    iss: `https://${domain}/`,
    sub: `${userId}`,
  };
  return JSON.stringify(loginHint);
};

/**
 * Options for the authorize request.
 */
export type AuthorizeOptions = {
  /**
   * A human-readable string intended to be displayed on both the device calling /bc-authorize and the user’s authentication device.
   */
  binding_message: string;
  /**
   * A space-separated list of OIDC and custom API scopes.
   */
  scope: string;
  /**
   * Unique identifier of the audience for an issued token.
   */
  audience?: string;
  /**
   * Custom expiry time in seconds for this request.
   */
  request_expiry?: string;
  /**
   * The user ID.
   */
  userId: string;
  /**
   * Optional parameter for subject issuer context.
   */
  subjectIssuerContext?: string;
};

type AuthorizeRequest = Omit<AuthorizeOptions, 'userId'> &
  AuthorizeCredentialsPartial & {
    login_hint: string;
  };

/**
 * The response from the token endpoint.
 */
export type TokenResponse = {
  /**
   * The access token.
   */
  access_token: string;
  /**
   * The refresh token, available with the `offline_access` scope.
   */
  refresh_token?: string;
  /**
   * The user's ID Token.
   */
  id_token: string;
  /**
   * The token type of the access token.
   */
  token_type?: string;
  /**
   * The duration in seconds that the access token is valid.
   */
  expires_in: number;
  /**
   * The scopes associated with the token.
   */
  scope: string;
};

/**
 * Options for the token request.
 */
export type TokenOptions = {
  /**
   * The authorization request ID.
   */
  auth_req_id: string;
};

type TokenRequestBody = AuthorizeCredentialsPartial & {
  auth_req_id: string;
  grant_type: string;
};

/**
 * Interface for the backchannel authentication.
 */
export interface IBackchannel {
  authorize: (options: AuthorizeOptions) => Promise<AuthorizeResponse>;
  backchannelGrant: (options: TokenOptions) => Promise<TokenResponse>;
}

const CIBA_GRANT_TYPE = 'urn:openid:params:grant-type:ciba';
const CIBA_AUTHORIZE_URL = '/bc-authorize';
const CIBA_TOKEN_URL = '/oauth/token';

/**
 * Class implementing the backchannel authentication flow.
 */
export class Backchannel extends BaseAuthAPI implements IBackchannel {
  /**
   * Initiates a CIBA authorization request.
   *
   * @param {AuthorizeOptions} options - The options for the request.
   * @returns {Promise<AuthorizeResponse>} - The authorization response.
   *
   * @throws {Error} - If the request fails.
   */
  async authorize({ userId, ...options }: AuthorizeOptions): Promise<AuthorizeResponse> {
    const body: AuthorizeRequest = {
      ...options,
      login_hint: getLoginHint(userId, this.domain),
      client_id: this.clientId,
    };

    await this.addClientAuthentication(body);

    const response = await this.request.bind(this)(
      {
        path: CIBA_AUTHORIZE_URL,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body),
      },
      {}
    );

    const r: JSONApiResponse<AuthorizeResponse> = await JSONApiResponse.fromResponse(response);
    return r.data;
  }

  /**
   * Handles the backchannel grant flow for authentication. Client can poll this method at regular intervals to check if the backchannel auth request has been approved.
   *
   * @param {string} auth_req_id - The authorization request ID. This value is returned from the call to /bc-authorize. Once you have exchanged an auth_req_id for an ID and access token, it is no longer usable.
   * @returns {Promise<TokenResponse>} - A promise that resolves to the token response.
   *
   * @throws {Error} - Throws an error if the request fails.
   *
   * If the authorizing user has not yet approved or rejected the request, you will receive a response like this:
   * ```json
   * {
   *   "error": "authorization_pending",
   *   "error_description": "The end-user authorization is pending"
   * }
   * ```
   *
   * If the authorizing user rejects the request, you will receive a response like this:
   * ```json
   * {
   *   "error": "access_denied",
   *   "error_description": "The end-user denied the authorization request or it has been expired"
   * }
   * ```
   *
   * If you are polling too quickly (faster than the interval value returned from /bc-authorize), you will receive a response like this:
   * ```json
   * {
   *   "error": "slow_down",
   *   "error_description": "You are polling faster than allowed. Try again in 10 seconds."
   * }
   * ```
   */
  async backchannelGrant({ auth_req_id }: TokenOptions): Promise<TokenResponse> {
    const body: TokenRequestBody = {
      client_id: this.clientId,
      auth_req_id,
      grant_type: CIBA_GRANT_TYPE,
    };

    await this.addClientAuthentication(body);

    const response = await this.request.bind(this)(
      {
        path: CIBA_TOKEN_URL,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body),
      },
      {}
    );

    const r: JSONApiResponse<TokenResponse> = await JSONApiResponse.fromResponse(response);
    return r.data;
  }
}
