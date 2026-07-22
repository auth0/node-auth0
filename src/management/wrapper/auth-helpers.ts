import * as core from "../core/index.js";
import type { ManagementClient } from "./ManagementClient.js";
import { TokenProvider } from "./token-provider.js";
import { Auth0ClientTelemetry } from "../../lib/middleware/auth0-client-telemetry.js";

/**
 * Headers accepted by the Management client and its sub-clients.
 *
 * @group Management API
 * @internal
 */
export type ManagementHeaders = Record<string, string | core.Supplier<string | null | undefined> | null | undefined>;

/**
 * The full set of authentication configurations accepted by the Management client, either a
 * static token or client credentials (client secret or client assertion).
 *
 * @group Management API
 * @internal
 */
export type ManagementAuthConfig =
    | ManagementClient.ManagementClientOptionsWithToken
    | ManagementClient.ManagementClientOptionsWithClientCredentials;

/**
 * Builds the Management API v2 base URL for a tenant domain.
 *
 * @group Management API
 * @internal
 */
export function buildManagementBaseUrl(domain: string): string {
    return `https://${domain}/api/v2`;
}

/**
 * Type guard that determines if options use static token authentication.
 *
 * @group Management API
 * @internal
 */
export function isClientOptionsWithToken(
    options: ManagementAuthConfig,
): options is ManagementClient.ManagementClientOptionsWithToken {
    return "token" in options;
}

/**
 * Type guard that narrows client credentials to the client-secret variant.
 *
 * @group Management API
 * @internal
 */
function hasClientSecret(
    options: ManagementClient.ManagementClientOptionsWithClientCredentials,
): options is ManagementClient.ManagementClientOptionsWithClientSecret {
    return "clientSecret" in options;
}

/**
 * Creates a token supplier from the provided options.
 *
 * Returns the supplied token as-is for token-based auth, or a self-refreshing
 * {@link TokenProvider}-backed supplier for client credentials (secret or assertion).
 *
 * @group Management API
 * @internal
 */
export function createTokenSupplier(options: ManagementAuthConfig): core.Supplier<string> {
    if (isClientOptionsWithToken(options)) {
        return options.token;
    }

    const audience = options.audience ?? `${buildManagementBaseUrl(options.domain)}/`;

    // The named type guard narrows the union so each branch matches one of TokenProvider's
    // overloaded constructors (client secret vs client assertion). Both branches forward the
    // full options object, which is what selects the signing method downstream.
    if (hasClientSecret(options)) {
        const tokenProviderOptions: ManagementClient.ManagementClientOptionsWithClientSecret & { audience: string } = {
            ...options,
            audience,
        };
        const tokenProvider = new TokenProvider(tokenProviderOptions);
        return () => tokenProvider.getAccessToken();
    } else {
        const tokenProviderOptions: ManagementClient.ManagementClientOptionsWithClientAssertion & {
            audience: string;
        } = {
            ...options,
            audience,
        };
        const tokenProvider = new TokenProvider(tokenProviderOptions);
        return () => tokenProvider.getAccessToken();
    }
}

/**
 * Builds the request headers for the Management client, including the `Auth0-Client` telemetry
 * header when telemetry is enabled. Respects `telemetry: false` and custom `clientInfo`, and
 * preserves any user-supplied headers.
 *
 * @group Management API
 * @internal
 */
export function createTelemetryHeaders(options: ManagementAuthConfig): ManagementHeaders {
    const headers: ManagementHeaders = { ...(options.headers ?? {}) };

    if (options.telemetry !== false) {
        const telemetry = new Auth0ClientTelemetry({ clientInfo: options.clientInfo });
        const auth0ClientHeader = telemetry.getAuth0ClientHeader();
        if (auth0ClientHeader) {
            headers["Auth0-Client"] = auth0ClientHeader;
        }
    }

    return headers;
}
