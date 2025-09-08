import { ManagementClient as FernClient } from "../Client.js";
import * as core from "../core/index.js";
import { TokenProvider } from "./token-provider.js";
import { Auth0ClientTelemetry } from "../../lib/middleware/auth0-client-telemetry.js";
import { withCustomDomainHeader } from "../request-options.js";

/**
 * All supported configuration options for the ManagementClient.
 *
 * @group Management API
 */
type ManagementClientConfig =
    | ManagementClient.ManagementClientOptionsWithToken
    | ManagementClient.ManagementClientOptionsWithClientCredentials;

export declare namespace ManagementClient {
    /**
     * Base configuration options for the Management Client.
     * Extends the Fern client options but excludes token and environment
     * as these are handled by our wrapper.
     *
     * @group Management API
     * @public
     */
    export interface ManagementClientOptions extends Omit<FernClient.Options, "token" | "environment" | "fetcher"> {
        /** Auth0 domain (e.g., 'your-tenant.auth0.com') */
        domain: string;
        /**
         * API audience. Defaults to https://{domain}/api/v2/
         * @defaultValue `https://{domain}/api/v2/`
         */
        audience?: string;
        /**
         * Enable/disable telemetry. Defaults to true
         * @defaultValue true
         */
        telemetry?: boolean;
        /** Custom client information for telemetry */
        clientInfo?: { name: string; [key: string]: unknown };
        /**
         * Custom domain Header to use for whitelisted requests.
         * When provided, the Auth0-Custom-Domain header will be added automatically to supported endpoints.
         * This works seamlessly with custom fetchers - both the custom domain logic and your custom fetcher will be applied.
         */
        withCustomDomainHeader?: string;
    }

    /**
     * Configuration for token-based authentication.
     * Use this when you already have a valid Management API token.
     *
     * @group Management API
     * @public
     *
     * @example Basic token configuration
     * ```typescript
     * const client = new ManagementClient({
     *   domain: 'your-tenant.auth0.com',
     *   token: 'your-static-token'
     * });
     * ```
     *
     * @example Dynamic token with supplier function
     * ```typescript
     * const client = new ManagementClient({
     *   domain: 'your-tenant.auth0.com',
     *   token: () => getAccessToken() // Function that returns a token
     * });
     * ```
     */
    export interface ManagementClientOptionsWithToken extends ManagementClientOptions {
        /** A function that returns the access token */
        token: core.Supplier<string>;
    }

    /**
     * Configuration for client credentials authentication using client secret.
     * Use this for server-to-server authentication with a client secret.
     *
     * @group Management API
     * @public
     *
     * @example Using client secret
     * ```typescript
     * const client = new ManagementClient({
     *   domain: 'your-tenant.auth0.com',
     *   clientId: 'your-client-id',
     *   clientSecret: 'your-client-secret'
     * });
     * ```
     */
    export interface ManagementClientOptionsWithClientSecret extends ManagementClientOptions {
        /** Auth0 application client ID */
        clientId: string;
        /** Auth0 application client secret */
        clientSecret: string;
        /** Enable mTLS for token endpoint calls */
        useMTLS?: boolean;
    }

    /**
     * Configuration for client credentials authentication using JWT assertion.
     * Use this for server-to-server authentication with a private key.
     *
     * @group Management API
     * @public
     *
     * @example Using client assertion
     * ```typescript
     * const client = new ManagementClient({
     *   domain: 'your-tenant.auth0.com',
     *   clientId: 'your-client-id',
     *   clientAssertionSigningKey: 'your-private-key'
     * });
     * ```
     */
    export interface ManagementClientOptionsWithClientAssertion extends ManagementClientOptions {
        /** Auth0 application client ID */
        clientId: string;
        /** Private key for signing the client assertion JWT */
        clientAssertionSigningKey: string;
        /** Algorithm for signing the client assertion. Defaults to RS256 */
        clientAssertionSigningAlg?: string;
        /** Enable mTLS for token endpoint calls */
        useMTLS?: boolean;
    }

    /**
     * Union type for client credentials authentication options.
     * Supports both client secret and client assertion methods.
     *
     * @group Management API
     */
    export type ManagementClientOptionsWithClientCredentials =
        | ManagementClientOptionsWithClientSecret
        | ManagementClientOptionsWithClientAssertion;
}

/**
 * Auth0 Management API client wrapper.
 *
 * Provides a high-level interface to Auth0's Management API with automatic
 * token management, telemetry, and Auth0-specific configuration.
 *
 * @group Management API
 * @example Using client credentials (client secret)
 * ```typescript
 * const client = new ManagementClient({
 *   domain: 'your-tenant.auth0.com',
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret'
 * });
 * ```
 *
 * @example Using client credentials (client assertion)
 * ```typescript
 * const client = new ManagementClient({
 *   domain: 'your-tenant.auth0.com',
 *   clientId: 'your-client-id',
 *   clientAssertionSigningKey: 'your-private-key'
 * });
 * ```
 *
 * @example Using existing token
 * ```typescript
 * const client = new ManagementClient({
 *   domain: 'your-tenant.auth0.com',
 *   token: 'your-static-token'  // or () => getAccessToken()
 * });
 * ```
 *
 * @example Using custom domain header
 * ```typescript
 * const client = new ManagementClient({
 *   domain: 'your-tenant.auth0.com',
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   withCustomDomainHeader: 'auth.example.com'  // Auto-applies to whitelisted endpoints
 * });
 * ```
 *
 * @example Using custom fetcher with custom domain header (they work together)
 * ```typescript
 * const client = new ManagementClient({
 *   domain: 'your-tenant.auth0.com',
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   withCustomDomainHeader: 'auth.example.com',  // Custom domain header logic
 *   fetcher: async (args) => {
 *     console.log('Making request:', args.url);  // Custom logging
 *     return fetch(args.url, { ...args });       // Custom fetch implementation
 *   }
 * });
 * ```
 */
export class ManagementClient extends FernClient {
    /**
     * Creates a new Management API client instance.
     *
     * @param _options - Configuration options for the Management Client
     * @group Management API
     */
    constructor(_options: ManagementClientConfig) {
        const baseUrl = `https://${_options.domain}/api/v2`;
        const headers = createTelemetryHeaders(_options);
        const token = createTokenSupplier(_options);

        // Prepare the base client options
        let clientOptions: any = {
            ..._options,
            baseUrl,
            headers,
            token,
        };

        // Apply custom domain header configuration if provided
        if ("withCustomDomainHeader" in _options && _options.withCustomDomainHeader !== undefined) {
            clientOptions = withCustomDomainHeader(_options.withCustomDomainHeader, clientOptions);
        }

        super(clientOptions);
    }
}

/**
 * Type guard to determine if options use token-based authentication.
 *
 * @param _options - The management client configuration options
 * @returns True if the options contain a token property
 * @group Management API
 * @namespace ManagementClient.Utils
 * @private
 */
function isClientOptionsWithToken(
    _options: ManagementClientConfig,
): _options is ManagementClient.ManagementClientOptionsWithToken {
    return "token" in _options;
}

/**
 * Creates telemetry headers for the Management Client.
 * Adds the Auth0-Client header when telemetry is enabled.
 *
 * @param _options - The management client configuration options
 * @returns Headers object including telemetry information
 * @group Management API
 * @namespace ManagementClient.Utils
 * @private
 */
function createTelemetryHeaders(
    _options: ManagementClientConfig,
): Record<string, string | core.Supplier<string | undefined> | undefined> {
    const headers = { ...(_options.headers ?? {}) };

    if (_options.telemetry !== false) {
        const telemetry = new Auth0ClientTelemetry({
            clientInfo: _options.clientInfo,
        });

        const auth0ClientHeader = telemetry.getAuth0ClientHeader();
        if (auth0ClientHeader) {
            headers["Auth0-Client"] = auth0ClientHeader;
        }
    }

    return headers;
}

/**
 * Type guard to check if options contain client secret.
 *
 * @param _options - Client credentials configuration options
 * @returns True if the options contain a clientSecret property
 * @group Management API
 * @namespace ManagementClient.Utils
 * @private
 */
function hasClientSecret(
    _options: ManagementClient.ManagementClientOptionsWithClientCredentials,
): _options is ManagementClient.ManagementClientOptionsWithClientSecret {
    return "clientSecret" in _options;
}

/**
 * Creates a token supplier based on the authentication method.
 * Returns the provided token for token-based auth, or creates a TokenProvider
 * for client credentials (secret or assertion) authentication.
 *
 * @param _options - The management client configuration options
 * @returns A function that returns an access token
 * @group Management API
 * @namespace ManagementClient.Utils
 * @private
 */
function createTokenSupplier(_options: ManagementClientConfig): core.Supplier<string> {
    if (isClientOptionsWithToken(_options)) {
        return _options.token;
    }

    // Handle client credentials with proper type checking
    const baseOptions = {
        ..._options,
        audience: _options.audience ?? `https://${_options.domain}/api/v2/`,
        clientId: _options.clientId,
        useMTLS: _options.useMTLS,
    };

    if (hasClientSecret(_options)) {
        // Client secret authentication
        const tokenProviderOptions: ManagementClient.ManagementClientOptionsWithClientSecret & { audience: string } = {
            ...baseOptions,
            clientSecret: _options.clientSecret,
        };
        const tokenProvider = new TokenProvider(tokenProviderOptions);
        return () => tokenProvider.getAccessToken();
    } else {
        // Client assertion authentication
        const tokenProviderOptions: ManagementClient.ManagementClientOptionsWithClientAssertion & { audience: string } =
            {
                ...baseOptions,
                clientAssertionSigningKey: _options.clientAssertionSigningKey,
                clientAssertionSigningAlg: _options.clientAssertionSigningAlg,
            };
        const tokenProvider = new TokenProvider(tokenProviderOptions);
        return () => tokenProvider.getAccessToken();
    }
}
