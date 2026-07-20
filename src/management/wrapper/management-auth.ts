import * as core from "../core/index.js";
import { ManagementClient } from "./ManagementClient.js";
import { TokenProvider } from "./token-provider.js";

/**
 * Options for {@link createManagementAuth}.
 *
 * Provide either a static `token`, or client credentials (`clientId` plus either
 * `clientSecret` or `clientAssertionSigningKey`) to have a token fetched and refreshed
 * automatically.
 *
 * @group Management API
 * @public
 */
export type ManagementAuthOptions =
    | ManagementClient.ManagementClientOptionsWithToken
    | ManagementClient.ManagementClientOptionsWithClientCredentials;

/**
 * A reusable authentication context for the Management API.
 *
 * Spread {@link ManagementAuth.clientOptions} into any Management sub-client constructor so
 * every client shares the same base URL and self-refreshing token.
 *
 * @group Management API
 * @public
 */
export interface ManagementAuth {
    /** The Management API v2 base URL for the tenant, e.g. `https://tenant.auth0.com/api/v2`. */
    baseUrl: string;
    /** Returns a valid access token, fetching or refreshing it when needed. */
    getToken: () => Promise<string>;
    /** Ready-to-spread options for any Management sub-client constructor. */
    clientOptions: { baseUrl: string; token: core.Supplier<string> };
}

/**
 * Creates a shared authentication context for the Auth0 Management API without pulling in the
 * full {@link ManagementClient}. This is useful for size-constrained runtimes (for example
 * Cloudflare Workers) where you import individual sub-clients such as `auth0/clients` and
 * `auth0/users` and want to handle auth once.
 *
 * When client credentials are provided, tokens are obtained via the client credentials grant
 * and cached until shortly before they expire. When a static `token` is provided, it is used
 * as-is.
 *
 * @group Management API
 * @public
 *
 * @example Client credentials with individual sub-clients
 * ```ts
 * import { createManagementAuth } from "auth0/management";
 * import { ClientsClient } from "auth0/clients";
 * import { UsersClient } from "auth0/users";
 *
 * const auth = createManagementAuth({
 *     domain: "your-tenant.auth0.com",
 *     clientId: "your-client-id",
 *     clientSecret: "your-client-secret",
 * });
 *
 * const clients = new ClientsClient(auth.clientOptions);
 * const users = new UsersClient(auth.clientOptions);
 * ```
 *
 * @example Static token
 * ```ts
 * const auth = createManagementAuth({
 *     domain: "your-tenant.auth0.com",
 *     token: "your-api-v2-token",
 * });
 * ```
 */
export function createManagementAuth(options: ManagementAuthOptions): ManagementAuth {
    const baseUrl = `https://${options.domain}/api/v2`;

    let getToken: () => Promise<string>;

    if ("token" in options) {
        const staticToken = options.token;
        getToken = () => core.Supplier.get(staticToken);
    } else {
        const audience = options.audience ?? `https://${options.domain}/api/v2/`;
        // The branch narrows the union so it matches TokenProvider's overloaded constructor
        // (client secret vs client assertion); both paths behave the same at runtime.
        const tokenProvider =
            "clientSecret" in options
                ? new TokenProvider({ ...options, audience })
                : new TokenProvider({ ...options, audience });
        getToken = () => tokenProvider.getAccessToken();
    }

    return {
        baseUrl,
        getToken,
        clientOptions: { baseUrl, token: getToken },
    };
}
