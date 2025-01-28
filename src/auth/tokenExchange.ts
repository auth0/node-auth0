import { JSONApiResponse } from '../lib/models.js';
import { BaseAuthAPI } from './base-auth-api.js';

/**
 * Represents the configuration options required for initiating a Custom Token Exchange request
 * following RFC 8693 specifications.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8693 | RFC 8693: OAuth 2.0 Token Exchange}
 */
export type CustomTokenExchangeOptions = {
  /**
   * The type identifier for the subject token being exchanged
   *
   * @pattern
   * - Must be a namespaced URI under your organization's control
   * - Forbidden patterns:
   *   - `^urn:ietf:params:oauth:*` (IETF reserved)
   *   - `^https:\/\/auth0\.com/*` (Auth0 reserved)
   *   - `^urn:auth0:*` (Auth0 reserved)
   *
   * @example
   * "urn:acme:legacy-system-token"
   * "https://api.yourcompany.com/token-type/v1"
   */
  subject_token_type: string;

  /**
   * The opaque token value being exchanged for Auth0 tokens
   *
   * @security
   * - Must be validated in Auth0 Actions using strong cryptographic verification
   * - Implement replay attack protection
   * - Recommended validation libraries: `jose`, `jsonwebtoken`
   *
   * @example
   * "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   */
  subject_token: string;

  /**
   * The target audience for the requested Auth0 token
   *
   * @remarks
   * Must match exactly with an API identifier configured in your Auth0 tenant
   *
   * @example
   * "https://api.your-service.com/v1"
   */
  audience: string;

  /**
   * Space-separated list of OAuth 2.0 scopes being requested
   *
   * @remarks
   * Subject to API authorization policies configured in Auth0
   *
   * @example
   * "openid profile email read:data write:data"
   */
  scope?: string;

  /**
   * Additional custom parameters for Auth0 Action processing
   *
   * @remarks
   * Accessible in Action code via `event.request.body`
   *
   * @example
   * ```typescript
   * {
   *   custom_parameter: "session_context",
   *   device_fingerprint: "a3d8f7...",
   * }
   * ```
   */
  [key: string]: unknown;
};

/**
 * Internal request body structure for token exchange endpoint
 *
 * @privateRemarks
 * Combines user parameters with OAuth 2.0 required values and
 * client authentication managed by BaseAuthAPI
 */
type CustomTokenExchangeRequestBody = CustomTokenExchangeOptions & {
  /** @default "urn:ietf:params:oauth:grant-type:token-exchange" */
  grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange';

  /** Injected from BaseAuthAPI configuration */
  client_id: string;
};

/**
 * Interface defining Custom Token Exchange operations
 *
 * @see {@link https://auth0.com/docs/authenticate/protocols/custom-token-exchange | Auth0 Custom Token Exchange Docs}
 */
export interface ICustomTokenExchange {
  /**
   * Executes RFC 8693-compliant token exchange flow
   *
   * @throws {Auth0Error} For structured error responses
   * @throws {Error} For generic errors with these codes:
   * - `invalid_request`: Invalid parameters
   * - `consent_required`: Enable "Allow Skipping User Consent" in API settings
   * - `too_many_attempts`: Suspicious IP throttling triggered
   *
   * @example
   * ```typescript
   * // External IdP migration scenario
   * const tokens = await auth0.customTokenExchange.exchangeToken({
   *   subject_token_type: 'urn:external-idp:legacy',
   *   subject_token: externalIdPToken,
   *   audience: 'https://api.your-service.com',
   *   scope: 'openid profile'
   * });
   * ```
   */
  exchangeToken(options: CustomTokenExchangeOptions): Promise<TokenResponse>;
}

/** RFC 8693-defined grant type for token exchange */
const TOKEN_EXCHANGE_GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:token-exchange';
/** Auth0 token endpoint path */
const TOKEN_URL = '/oauth/token';

/**
 * Implements Auth0's Custom Token Exchange functionality with security best practices
 *
 * @security
 * - **HTTPS Enforcement**: All requests require TLS encryption
 * - **Credential Protection**: Client secrets never exposed in browser contexts
 * - **Input Validation**: Strict namespace enforcement for token types
 *
 * @example
 * ```typescript
 * // Secure token validation in Auth0 Action
 * exports.onExecuteCustomTokenExchange = async (event, api) => {
 *   const { jws } = require('jose');
 *   const { createRemoteJWKSet } = require('jose/jwks');
 *
 *   const JWKS = createRemoteJWKSet(new URL('https://external-idp.com/.well-known/jwks.json'));
 *
 *   try {
 *     const { payload } = await jws.verify(event.transaction.subject_token, JWKS);
 *     api.authentication.setUserById(payload.sub);
 *   } catch (error) {
 *     api.access.rejectInvalidSubjectToken('Invalid token signature');
 *   }
 * };
 * ```
 */
export class CustomTokenExchange extends BaseAuthAPI implements ICustomTokenExchange {
  /**
   * Executes token exchange flow with security validations
   *
   * @param options - Exchange configuration parameters
   * @returns Auth0-issued tokens with requested claims
   *
   * @throws {Error} When:
   * - `subject_token_type` uses prohibited namespace
   * - Network failures occur
   * - Auth0 returns error responses (4xx/5xx)
   */
  async exchangeToken(options: CustomTokenExchangeOptions): Promise<TokenResponse> {
    this.validateTokenType(options.subject_token_type);

    const body: CustomTokenExchangeRequestBody = {
      ...options,
      grant_type: TOKEN_EXCHANGE_GRANT_TYPE,
      client_id: this.clientId,
    };

    await this.addClientAuthentication(body);

    const response = await this.request(
      {
        path: TOKEN_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(body as Record<string, string>),
      },
      {}
    );

    const r: JSONApiResponse<TokenResponse> = await JSONApiResponse.fromResponse(response);
    return r.data;
  }

  /**
   * Enforces namespace ownership requirements for token types
   *
   * @param tokenType - Proposed subject_token_type value
   * @throws {Error} When reserved namespace pattern detected
   *
   * @privateRemarks
   * Implements RFC 8693 Section 4.1 requirements for token type URIs
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc8693#section-4.1 | RFC 8693 Section 4.1}
   */
  private validateTokenType(tokenType: string): void {
    const reservedPatterns = [
      /^urn:ietf:params:oauth:/i,
      /^https:\/\/auth0\.com\//i,
      /^urn:auth0:/i,
    ];

    if (reservedPatterns.some((pattern) => pattern.test(tokenType))) {
      throw new Error(
        `Invalid subject_token_type '${tokenType}'. ` +
          `Reserved namespaces are prohibited. Use URIs under your organization's control.`
      );
    }
  }
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
