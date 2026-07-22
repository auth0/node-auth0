import * as core from "../core/index.js";
import type { ManagementClient } from "./ManagementClient.js";
import { withCustomDomainHeader } from "../request-options.js";
import {
    buildManagementBaseUrl,
    createTelemetryHeaders,
    createTokenSupplier,
    type ManagementHeaders,
} from "./auth-helpers.js";

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
 * Ready-to-spread options for any Management sub-client constructor.
 *
 * These mirror the options that the full {@link ManagementClient} passes to its sub-clients,
 * so individually imported clients share the same base URL, self-refreshing token, telemetry
 * headers, and request behaviour.
 *
 * @group Management API
 * @public
 */
export interface ManagementAuthClientOptions {
    /** The Management API v2 base URL for the tenant. */
    baseUrl: string;
    /** A supplier that returns a valid access token, fetching or refreshing it when needed. */
    token: core.Supplier<string>;
    /** Headers to send with every request, including the `Auth0-Client` telemetry header when enabled. */
    headers?: ManagementHeaders;
    /** The default maximum time to wait for a response in seconds. */
    timeoutInSeconds?: number;
    /** The default number of times to retry a request. */
    maxRetries?: number;
    /** Logging configuration for the client. */
    logging?: core.logging.LogConfig | core.logging.Logger;
    /** Custom fetcher, set automatically when a custom domain header is configured. */
    fetcher?: (args: any) => Promise<any>;
}

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
    clientOptions: ManagementAuthClientOptions;
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
 * The returned {@link ManagementAuth.clientOptions} carry the same telemetry headers, request
 * timeouts, retry counts, logging, and custom domain behaviour that the full `ManagementClient`
 * applies, so individually imported sub-clients behave consistently.
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
 *
 * @example Custom domain header (applied to whitelisted endpoints)
 * ```ts
 * const auth = createManagementAuth({
 *     domain: "your-tenant.auth0.com",
 *     clientId: "your-client-id",
 *     clientSecret: "your-client-secret",
 *     withCustomDomainHeader: "auth.example.com",
 * });
 * ```
 */
export function createManagementAuth(options: ManagementAuthOptions): ManagementAuth {
    const baseUrl = buildManagementBaseUrl(options.domain);

    const tokenSupplier = createTokenSupplier(options);
    const getToken = () => core.Supplier.get(tokenSupplier);

    const headers = createTelemetryHeaders(options);

    let clientOptions: ManagementAuthClientOptions = {
        baseUrl,
        token: getToken,
        ...(Object.keys(headers).length > 0 ? { headers } : {}),
        ...(options.timeoutInSeconds !== undefined ? { timeoutInSeconds: options.timeoutInSeconds } : {}),
        ...(options.maxRetries !== undefined ? { maxRetries: options.maxRetries } : {}),
        ...(options.logging !== undefined ? { logging: options.logging } : {}),
    };

    // Apply custom domain header configuration if provided, matching the full ManagementClient.
    if ("withCustomDomainHeader" in options && options.withCustomDomainHeader !== undefined) {
        clientOptions = withCustomDomainHeader(options.withCustomDomainHeader, clientOptions);
    }

    return {
        baseUrl,
        getToken,
        clientOptions,
    };
}
