import { Backchannel, IBackchannel } from "./backchannel.js";
import { AuthenticationClientOptions } from "./base-auth-api.js";
import { Database } from "./database.js";
import { OAuth } from "./oauth.js";
import { Passwordless } from "./passwordless.js";
import { CustomTokenExchange, ICustomTokenExchange } from "./tokenExchange.js";

export * from "./database.js";
export * from "./oauth.js";
export * from "./passwordless.js";
export { IDTokenValidateOptions, IdTokenValidatorError } from "./id-token-validator.js";
export { AuthApiError, AuthenticationClientOptions } from "./base-auth-api.js";

/**
 * Auth0 Authentication API Client
 * 
 * Provides access to Auth0's authentication endpoints for login, signup,
 * passwordless authentication, and token exchange operations.
 * 
 * @group Authentication API
 * 
 * @example Basic setup
 * ```typescript
 * import { AuthenticationClient } from 'auth0';
 * 
 * const auth0 = new AuthenticationClient({
 *   domain: 'your-tenant.auth0.com',
 *   clientId: 'your-client-id'
 * });
 * ```
 * 
 * @example OAuth login
 * ```typescript
 * // Exchange authorization code for tokens
 * const tokenSet = await auth0.oauth.authorizationCodeGrant({
 *   code: 'auth-code',
 *   redirect_uri: 'https://app.example.com/callback'
 * });
 * ```
 * 
 * @example Database operations
 * ```typescript
 * // Create user
 * const user = await auth0.database.signUp({
 *   connection: 'Username-Password-Authentication',
 *   username: 'john@example.com',
 *   password: 'secure-password123'
 * });
 * ```
 */
export class AuthenticationClient {
    /** Database connection operations (signup, change password) */
    database: Database;
    /** OAuth 2.0 and OIDC operations (authorization, token exchange) */
    oauth: OAuth;
    /** Passwordless authentication (email/SMS) */
    passwordless: Passwordless;
    /** Back-channel authentication (CIBA) */
    backchannel: IBackchannel;
    /** Custom token exchange operations */
    tokenExchange: ICustomTokenExchange;

    /**
     * Create a new Authentication API client
     * @param options - Configuration options for the client
     */
    constructor(options: AuthenticationClientOptions) {
        this.database = new Database(options);
        this.oauth = new OAuth(options);
        this.passwordless = new Passwordless(options);
        this.backchannel = new Backchannel(options);
        this.tokenExchange = new CustomTokenExchange(options);
    }
}
