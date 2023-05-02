import { InitOverride, JSONApiResponse, validateRequiredRequestParams } from '../runtime';
import BaseAuthAPI from './BaseAuthApi';

export interface TokenSet {
  /**
   * The access token.
   */
  access_token: string;
  /**
   * The refresh token, vavailable with the `offline_access` scope.
   */
  refresh_token?: string;
  /**
   * The user's ID Token.
   */
  id_token?: string;
  /**
   * The token type of the access token.
   */
  token_type: 'Bearer';
  /**
   * The duration in secs that that the access token is valid.
   */
  expires_in: number;
}

interface ClientCredentials {
  /**
   * Specify this to override the parent class's `clientId`
   */
  client_id?: string;
  /**
   * Specify this to override the parent class's `clientSecret`
   */
  client_secret?: string;
  /**
   * Specify this to provide your own client assertion JWT rather than
   * the class creating one for you from the `clientAssertionSigningKey`.
   */
  client_assertion?: string;
  /**
   * If you provide your own `client_assertion` you should also provide
   * the `client_assertion_type`.
   */
  client_assertion_type?: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
}

export interface AuthorizationCodeGrantRequest extends ClientCredentials {
  /**
   * The Authorization Code received from the initial `/authorize` call.
   */
  code: string;
  /**
   *	This is required only if it was set at the `/authorize` endpoint. The values must match.
   */
  redirect_uri?: string;
}

export interface AuthorizationCodeGrantWithPKCERequest extends AuthorizationCodeGrantRequest {
  /**
   * Cryptographically random key that was used to generate the code_challenge passed to `/authorize`.
   */
  code_verifier: string;
}

export interface ClientCredentialsGrantRequest extends ClientCredentials {
  /**
   * The unique identifier of the target API you want to access.
   */
  audience: string;
}

export interface PasswordGrantRequest extends ClientCredentials {
  /**
   * The unique identifier of the target API you want to access.
   */
  audience?: string;
  /**
   * Resource Owner's identifier, such as a username or email address.
   */
  username: string;
  /**
   * Resource Owner's secret.
   */
  password: string;
  /**
   * String value of the different scopes the application is asking for. Multiple scopes are separated with whitespace.
   */
  scope?: string;
  /**
   * String value of the realm the user belongs. Set this if you want to add realm support at this grant.
   * For more information on what realms are refer to https://auth0.com/docs/get-started/authentication-and-authorization-flow/resource-owner-password-flow#realm-support.
   */
  realm?: string;
}

export interface DeviceCodeGrantRequest {
  /**
   * Specify this to override the parent class's `clientId`
   */
  client_id?: string;

  /**
   * The device code previously returned from the `/oauth/device/code` endpoint.
   */
  device_code: string;
}

export interface RefreshTokenGrantRequest extends ClientCredentials {
  /**
   * The Refresh Token to use.
   */
  refresh_token: string;

  /**
   * A space-delimited list of requested scope permissions.
   * If not sent, the original scopes will be used; otherwise you can request a reduced set of scopes.
   */
  scope?: string;
}

export interface TokenExchangeGrantRequest {
  /**
   * Specify this to override the parent class's `clientId`
   */
  client_id?: string;

  /**
   * Externally-issued identity artifact, representing the user.
   */
  subject_token: string;

  /**
   * The unique identifier of the target API you want to access.
   */
  audience?: string;

  /**
   * String value of the different scopes the application is requesting.
   * Multiple scopes are separated with whitespace.
   */
  scope?: string;

  /**
   * Optional element used for native iOS interactions for which profile updates can occur.
   * Expected parameter value will be JSON in the form of: `{ name: { firstName: 'John', lastName: 'Smith }}`
   */
  user_profile: string;
}

/**
 *  OAuth 2.0 flows.
 */
export default class OAuth extends BaseAuthAPI {
  /**
   * Perform an OAuth 2.0 grant.
   * (You should only need this if you can't find the grant you need in this class.)
   */
  async grant<T = TokenSet>(
    grantType: string,
    bodyParameters: Record<string, any>,
    initOverrides?: InitOverride
  ): Promise<JSONApiResponse<T>> {
    const response = await this.request(
      {
        path: '/oauth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          ...bodyParameters,
          grant_type: grantType,
        }),
      },
      initOverrides
    );

    return JSONApiResponse.fromResponse(response);
  }

  /**
   * This is the flow that regular web apps use to access an API.
   *
   * Use this endpoint to exchange an Authorization Code for a Token.
   *
   * See: https://auth0.com/docs/api/authentication#authorization-code-flow44
   *
   * @example
   * ```js
   * const auth0 = new AuthenticationApi({
   *    domain: 'my-domain.auth0.com',
   *    clientId: 'myClientId',
   *    clientSecret: 'myClientSecret'
   * });
   *
   * await auth0.oauth.authorizationCodeGrant({ code: 'mycode' });
   * ```
   */
  async authorizationCodeGrant(
    bodyParameters: AuthorizationCodeGrantRequest,
    initOverrides?: InitOverride
  ): Promise<JSONApiResponse<TokenSet>> {
    validateRequiredRequestParams(bodyParameters, ['code']);

    return this.grant(
      'authorization_code',
      await this.addClientAuthentication(bodyParameters, true),
      initOverrides
    );
  }

  /**
   * PKCE was originally designed to protect the authorization code flow in mobile apps,
   * but its ability to prevent authorization code injection makes it useful for every type of OAuth client,
   * even web apps that use client authentication.
   *
   * See: https://auth0.com/docs/api/authentication#authorization-code-flow-with-pkce45
   *
   * @example
   * ```js
   * const auth0 = new AuthenticationApi({
   *    domain: 'my-domain.auth0.com',
   *    clientId: 'myClientId',
   *    clientSecret: 'myClientSecret'
   * });
   *
   * await auth0.oauth.authorizationCodeGrantWithPKCE({
   *   code: 'mycode',
   *   code_verifier: 'mycodeverifier'
   * });
   * ```
   */
  async authorizationCodeGrantWithPKCE(
    bodyParameters: AuthorizationCodeGrantWithPKCERequest,
    initOverrides?: InitOverride
  ): Promise<JSONApiResponse<TokenSet>> {
    validateRequiredRequestParams(bodyParameters, ['code', 'code_verifier']);

    return this.grant(
      'authorization_code',
      await this.addClientAuthentication(bodyParameters, false),
      initOverrides
    );
  }

  /**
   * This is the OAuth 2.0 grant that server processes use to access an API.
   *
   * Use this endpoint to directly request an Access Token by using the Client's credentials
   * (a Client ID and a Client Secret or a Client Assertion).
   *
   * See: https://auth0.com/docs/api/authentication#client-credentials-flow
   *
   * @example
   * ```js
   * const auth0 = new AuthenticationApi({
   *    domain: 'my-domain.auth0.com',
   *    clientId: 'myClientId',
   *    clientSecret: 'myClientSecret'
   * });
   *
   * await auth0.oauth.clientCredentialsGrant({ audience: 'myaudience' });
   * ```
   */
  async clientCredentialsGrant(
    bodyParameters: ClientCredentialsGrantRequest,
    initOverrides?: InitOverride
  ): Promise<JSONApiResponse<TokenSet>> {
    validateRequiredRequestParams(bodyParameters, ['audience']);

    return this.grant(
      'client_credentials',
      await this.addClientAuthentication(bodyParameters, true),
      initOverrides
    );
  }

  /**
   * This information is typically received from a highly trusted public client like a SPA*.
   * (<strong>*Note:</string> For single-page applications and native/mobile apps, we recommend using web flows instead.)
   *
   * See: https://auth0.com/docs/api/authentication#resource-owner-password
   *
   * @example
   * ```js
   * const auth0 = new AuthenticationApi({
   *    domain: 'my-domain.auth0.com',
   *    clientId: 'myClientId'
   *    clientSecret: 'myClientSecret'
   * });
   *
   * await auth0.oauth.clientCredentialsGrant({
   *     username: 'myusername@example.com',
   *     password: 'mypassword'
   *   },
   *   { headers: { 'auth0-forwarded-for': 'END.USER.IP.123' } }
   * );
   * ```
   *
   * Set the'auth0-forwarded-for' header to the end-user IP as a string value if you want
   * brute-force protection to work in server-side scenarios.
   *
   * See https://auth0.com/docs/get-started/authentication-and-authorization-flow/avoid-common-issues-with-resource-owner-password-flow-and-attack-protection
   *
   */
  async passwordGrant(
    bodyParameters: PasswordGrantRequest,
    initOverrides?: InitOverride
  ): Promise<JSONApiResponse<TokenSet>> {
    validateRequiredRequestParams(bodyParameters, ['username', 'password']);

    return this.grant(
      bodyParameters.realm ? 'http://auth0.com/oauth/grant-type/password-realm' : 'password',
      await this.addClientAuthentication(bodyParameters, false),
      initOverrides
    );
  }

  /**
   * Use this endpoint to refresh an Access Token using the Refresh Token you got during authorization.
   *
   * See: https://auth0.com/docs/api/authentication#refresh-token
   *
   * @example
   * ```js
   * const auth0 = new AuthenticationApi({
   *    domain: 'my-domain.auth0.com',
   *    clientId: 'myClientId'
   *    clientSecret: 'myClientSecret'
   * });
   *
   * await auth0.oauth.refreshTokenGrant({ refresh_token: 'myrefreshtoken' })
   * ```
   */
  async refreshTokenGrant(
    bodyParameters: RefreshTokenGrantRequest,
    initOverrides?: InitOverride
  ): Promise<JSONApiResponse<TokenSet>> {
    validateRequiredRequestParams(bodyParameters, ['refresh_token']);

    return this.grant(
      'refresh_token',
      await this.addClientAuthentication(bodyParameters, false),
      initOverrides
    );
  }
}
