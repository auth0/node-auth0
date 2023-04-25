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

/**
 *  OAuth 2.0 flows.
 */
export default class OAuth extends BaseAuthAPI {
  /**
   * This is the flow that regular web apps use to access an API.
   *
   * Use this endpoint to exchange an Authorization Code for a Token.
   *
   * See: https://auth0.com/docs/api/authentication#authorization-code-flow44
   *
   * @example
   * ```js
   * const auth0 = new AuthenitcationApi({
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
    const response = await this.request(
      {
        path: '/oauth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(
          (await this.addClientAuthentication(
            { ...bodyParameters, grant_type: 'authorization_code' },
            true
          )) as Record<string, string>
        ),
      },
      initOverrides
    );

    return JSONApiResponse.fromResponse(response);
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
   * const auth0 = new AuthenitcationApi({
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
    const response = await this.request(
      {
        path: '/oauth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(
          (await this.addClientAuthentication(
            { ...bodyParameters, grant_type: 'authorization_code' },
            false
          )) as Record<string, string>
        ),
      },
      initOverrides
    );

    return JSONApiResponse.fromResponse(response);
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
   * const auth0 = new AuthenitcationApi({
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
    const response = await this.request(
      {
        path: '/oauth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(
          (await this.addClientAuthentication(
            { ...bodyParameters, grant_type: 'client_credentials' },
            true
          )) as Record<string, string>
        ),
      },
      initOverrides
    );

    return JSONApiResponse.fromResponse(response);
  }
}
