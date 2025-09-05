import { InitOverride, JSONApiResponse, VoidApiResponse, validateRequiredRequestParams } from "../lib/runtime.js";
import { BaseAuthAPI, AuthenticationClientOptions, grant } from "./base-auth-api.js";
import { IDTokenValidateOptions, IDTokenValidator } from "./id-token-validator.js";
import { mtlsPrefix } from "../utils.js";

export interface TokenSet {
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
    id_token?: string;
    /**
     * The token type of the access token.
     */
    token_type: "Bearer";
    /**
     * The duration in secs that the access token is valid.
     */
    expires_in: number;
}

export interface GrantOptions {
    idTokenValidateOptions?: Pick<IDTokenValidateOptions, "organization">;
    initOverrides?: InitOverride;
}

export interface AuthorizationCodeGrantOptions {
    idTokenValidateOptions?: IDTokenValidateOptions;
    initOverrides?: InitOverride;
}

export interface ClientCredentials {
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
    client_assertion_type?: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
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

    /**
     * Allow for any custom property to be sent to Auth0
     */
    [key: string]: any;
}

export interface AuthorizationCodeGrantWithPKCERequest extends AuthorizationCodeGrantRequest {
    /**
     * Cryptographically random key that was used to generate the code_challenge passed to `/authorize`.
     */
    code_verifier: string;
}

/**
 * Represents a request for a client credentials grant in the OAuth 2.0 framework, specific to Auth0 implementation.
 *
 * @property audience - The unique identifier of the target API you want to access.
 * @property organization - The identifier of the organization for which the request is being made.
 */
export interface ClientCredentialsGrantRequest extends ClientCredentials {
    /**
     * The unique identifier of the target API you want to access.
     */
    audience: string;
    organization?: string;
}

export interface PushedAuthorizationRequest extends ClientCredentials {
    /**
     * URI to redirect to.
     */
    redirect_uri: string;

    /**
     * The response_type the client expects.
     */
    response_type: string;

    /**
     * The response_mode to use.
     */
    response_mode?: string;

    /**
     * The nonce.
     */
    nonce?: string;

    /**
     * State value to be passed back on successful authorization.
     */
    state?: string;

    /**
     * Name of the connection.
     */
    connection?: string;

    /**
     * Scopes to request. Multiple scopes must be separated by a space character.
     */
    scope?: string;

    /**
     * The unique identifier of the target API you want to access.
     */
    audience?: string;

    /**
     * The organization to log the user in to.
     */
    organization?: string;

    /**
     * The id of an invitation to accept.
     */
    invitation?: string;
    /**
     * A Base64-encoded SHA-256 hash of the {@link AuthorizationCodeGrantWithPKCERequest.code_verifier} used for the Authorization Code Flow with PKCE.
     */
    code_challenge?: string;

    /**
     * Allows JWT-Secured Authorization Request (JAR), when JAR & PAR request are used together. {@link https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow/authorization-code-flow-with-par-and-jar | Reference}
     */
    request?: string;

    /**
     * A JSON stringified array of objects. It can carry fine-grained authorization data in OAuth messages as part of Rich Authorization Requests (RAR) {@link https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow/authorization-code-flow-with-rar | Reference}
     */
    authorization_details?: string;

    /**
     * Allow for any custom property to be sent to Auth0
     */
    [key: string]: any;
}

export interface PushedAuthorizationResponse {
    /**
     * The request URI corresponding to the authorization request posted.
     * This URI is a single-use reference to the respective request data in the subsequent authorization request.
     */
    request_uri: string;

    /**
     * This URI is a single-use reference to the respective request data in the subsequent authorization request.
     */
    expires_in: number;
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

    /**
     * Allow for any custom property to be sent to Auth0
     */
    [key: string]: any;
}

export interface RevokeRefreshTokenRequest extends ClientCredentials {
    /**
     * The Refresh Token you want to revoke.
     */
    token: string;
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
 * Options to exchange a federated connection token.
 */
export interface TokenForConnectionRequest {
    /**
     * The subject token to exchange for an access token for a connection.
     */
    subject_token: string;
    /**
     * The target social provider connection (e.g., "google-oauth2").
     */
    connection: string;
    /**
     * An optional subject token type parameter to pass to the authorization server. If not provided, it defaults to `urn:ietf:params:oauth:token-type:refresh_token`.
     */
    subject_token_type?: SUBJECT_TOKEN_TYPES;
    /**
     * Optional login hint
     */
    login_hint?: string;
}

export interface TokenForConnectionResponse {
    access_token: string;
    scope?: string;
    expires_at: number; // the time at which the access token expires in seconds since epoch
    connection: string;
    [key: string]: unknown;
}

export enum SUBJECT_TOKEN_TYPES {
    /**
     * Constant representing the subject type for a refresh token.
     * This is used in OAuth 2.0 token exchange to specify that the token being exchanged is a refresh token.
     *
     * @see {@link https://tools.ietf.org/html/rfc8693#section-3.1 RFC 8693 Section 3.1}
     */
    REFRESH_TOKEN = "urn:ietf:params:oauth:token-type:refresh_token",

    /**
     * Constant representing the subject type for a access token.
     * This is used in OAuth 2.0 token exchange to specify that the token being exchanged is an access token.
     *
     * @see {@link https://tools.ietf.org/html/rfc8693#section-3.1 RFC 8693 Section 3.1}
     */
    ACCESS_TOKEN = "urn:ietf:params:oauth:token-type:access_token",
}

export const TOKEN_FOR_CONNECTION_GRANT_TYPE =
    "urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token";

/**
 * @deprecated Use {@link SUBJECT_TOKEN_TYPES.REFRESH_TOKEN} instead.
 */
export const TOKEN_FOR_CONNECTION_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:refresh_token";
export const TOKEN_FOR_CONNECTION_REQUESTED_TOKEN_TYPE =
    "http://auth0.com/oauth/token-type/federated-connection-access-token";

export const TOKEN_URL = "/oauth/token";

/**
 *  OAuth 2.0 flows.
 */
export class OAuth extends BaseAuthAPI {
    readonly idTokenValidator: IDTokenValidator;
    constructor(options: AuthenticationClientOptions) {
        super({
            ...options,
            domain: options.useMTLS ? `${mtlsPrefix}.${options.domain}` : options.domain,
        });
        this.idTokenValidator = new IDTokenValidator(options);
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
        options: AuthorizationCodeGrantOptions = {},
    ): Promise<JSONApiResponse<TokenSet>> {
        validateRequiredRequestParams(bodyParameters, ["code"]);

        return grant(
            "authorization_code",
            await this.addClientAuthentication(bodyParameters),
            options,
            this.clientId,
            this.idTokenValidator,
            this.request.bind(this),
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
        options: AuthorizationCodeGrantOptions = {},
    ): Promise<JSONApiResponse<TokenSet>> {
        validateRequiredRequestParams(bodyParameters, ["code", "code_verifier"]);

        return grant(
            "authorization_code",
            await this.addClientAuthentication(bodyParameters),
            options,
            this.clientId,
            this.idTokenValidator,
            this.request.bind(this),
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
        options: { initOverrides?: InitOverride } = {},
    ): Promise<JSONApiResponse<TokenSet>> {
        validateRequiredRequestParams(bodyParameters, ["audience"]);

        return grant(
            "client_credentials",
            await this.addClientAuthentication(bodyParameters),
            options,
            this.clientId,
            this.idTokenValidator,
            this.request.bind(this),
        );
    }

    /**
     * This is the OAuth 2.0 extension that allows to initiate an OAuth flow from the backchannel instead of by building a URL.
     *
     *
     * See: https://www.rfc-editor.org/rfc/rfc9126.html
     *
     * @example
     * ```js
     * const auth0 = new AuthenticationApi({
     *    domain: 'my-domain.auth0.com',
     *    clientId: 'myClientId',
     *    clientSecret: 'myClientSecret'
     * });
     *
     * await auth0.oauth.pushedAuthorization({ response_type: 'id_token', redirect_uri: 'http://localhost' });
     * ```
     */
    async pushedAuthorization(
        bodyParameters: PushedAuthorizationRequest,
        options: { initOverrides?: InitOverride } = {},
    ): Promise<JSONApiResponse<PushedAuthorizationResponse>> {
        validateRequiredRequestParams(bodyParameters, ["client_id", "response_type", "redirect_uri"]);

        const bodyParametersWithClientAuthentication = await this.addClientAuthentication(bodyParameters);

        const response = await this.request(
            {
                path: "/oauth/par",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: this.clientId,
                    ...bodyParametersWithClientAuthentication,
                }),
            },
            options.initOverrides,
        );

        return JSONApiResponse.fromResponse(response);
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
     * await auth0.oauth.passwordGrant({
     *     username: 'myusername@example.com',
     *     password: 'mypassword'
     *   },
     *   { initOverrides: { headers: { 'auth0-forwarded-for': 'END.USER.IP.123' } } }
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
        options: GrantOptions = {},
    ): Promise<JSONApiResponse<TokenSet>> {
        validateRequiredRequestParams(bodyParameters, ["username", "password"]);

        return grant(
            bodyParameters.realm ? "http://auth0.com/oauth/grant-type/password-realm" : "password",
            await this.addClientAuthentication(bodyParameters),
            options,
            this.clientId,
            this.idTokenValidator,
            this.request.bind(this),
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
        options: GrantOptions = {},
    ): Promise<JSONApiResponse<TokenSet>> {
        validateRequiredRequestParams(bodyParameters, ["refresh_token"]);

        return grant(
            "refresh_token",
            await this.addClientAuthentication(bodyParameters),
            options,
            this.clientId,
            this.idTokenValidator,
            this.request.bind(this),
        );
    }

    /**
     * Use this endpoint to invalidate a Refresh Token if it has been compromised.
     *
     * The behaviour of this endpoint depends on the state of the <a href="https://auth0.com/docs/secure/tokens/refresh-tokens/revoke-refresh-tokens#refresh-tokens-and-grants">Refresh Token Revocation Deletes Grant</a> toggle.
     * If this toggle is enabled, then each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant.
     * This means that all Refresh Tokens that have been issued for the same user, application, and audience will be revoked.
     * If this toggle is disabled, then only the refresh token is revoked, while the grant is left intact.
     *
     * See: https://auth0.com/docs/api/authentication#revoke-refresh-token
     *
     * @example
     * ```js
     * const auth0 = new AuthenticationApi({
     *    domain: 'my-domain.auth0.com',
     *    clientId: 'myClientId'
     *    clientSecret: 'myClientSecret'
     * });
     *
     * await auth0.oauth.revokeRefreshToken({ token: 'myrefreshtoken' })
     * ```
     */
    async revokeRefreshToken(
        bodyParameters: RevokeRefreshTokenRequest,
        options: { initOverrides?: InitOverride } = {},
    ): Promise<VoidApiResponse> {
        validateRequiredRequestParams(bodyParameters, ["token"]);

        const response = await this.request(
            {
                path: "/oauth/revoke",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: await this.addClientAuthentication({ client_id: this.clientId, ...bodyParameters }),
            },
            options.initOverrides,
        );

        return VoidApiResponse.fromResponse(response);
    }

    /**
     * Exchanges a subject token for an access token for the connection.
     *
     * The request body includes:
     * - client_id (and client_secret/client_assertion via addClientAuthentication)
     * - grant_type set to `urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token`
     * - subject_token: the token to exchange
     * - subject_token_type: the type of token being exchanged. Defaults to refresh tokens (`urn:ietf:params:oauth:token-type:refresh_token`).
     * - requested_token_type (`http://auth0.com/oauth/token-type/federated-connection-access-token`) indicating that a federated connection access token is desired
     * - connection name and an optional `login_hint` if provided
     *
     * @param bodyParameters - The options to retrieve a token for a connection.
     * @returns A promise with the token response data.
     * @throws An error if the exchange fails.
     */
    public async tokenForConnection(
        bodyParameters: TokenForConnectionRequest,
        options: { initOverrides?: InitOverride } = {},
    ): Promise<JSONApiResponse<TokenSet>> {
        validateRequiredRequestParams(bodyParameters, ["connection", "subject_token"]);

        const body: Record<string, string> = {
            subject_token_type: SUBJECT_TOKEN_TYPES.REFRESH_TOKEN,
            ...bodyParameters,
            grant_type: TOKEN_FOR_CONNECTION_GRANT_TYPE,
            requested_token_type: TOKEN_FOR_CONNECTION_REQUESTED_TOKEN_TYPE,
        };

        await this.addClientAuthentication(body);

        const response = await this.request(
            {
                path: TOKEN_URL,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(body),
            },
            options.initOverrides,
        );

        return JSONApiResponse.fromResponse(response);
    }
}
