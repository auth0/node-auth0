import { fetcher as coreFetcher } from "./core/index.js";
/**
 * Helper functions to create common request options for the Auth0 Management API.
 * These functions provide convenient ways to configure common request patterns.
 */

// Whitelisted path patterns for custom domain support
const WHITELISTED_PATTERNS = [
    "^/api/v2/jobs/verification-email$",
    "^/api/v2/tickets/email-verification$",
    "^/api/v2/tickets/password-change$",
    "^/api/v2/organizations/[^/]+/invitations$",
    "^/api/v2/users$",
    "^/api/v2/users/[^/]+$",
    "^/api/v2/guardian/enrollments/ticket$",
] as const;

// Function to compile the whitelisted patterns
function compileWhitelistedPathPatterns(): RegExp[] {
    return WHITELISTED_PATTERNS.map((pattern) => {
        try {
            return new RegExp(pattern);
        } catch (error) {
            console.warn(`[CustomDomainWhitelist] Invalid regex pattern: ${pattern}`, error);
            // Return a regex that never matches if pattern is invalid
            return /(?!)/;
        }
    });
}

// Pre-compiled regex for matching whitelisted paths
const compiledWhitelistedPathRegexes: RegExp[] = compileWhitelistedPathPatterns();

// Function to check if the path matches any whitelisted pattern
function isCustomDomainPathWhitelisted(path: string): boolean {
    if (!path || typeof path !== "string") {
        return false;
    }

    return compiledWhitelistedPathRegexes.some((regex) => {
        try {
            return regex.test(path);
        } catch (error) {
            console.warn(`[CustomDomainWhitelist] Error testing regex against path: ${path}`, error);
            return false;
        }
    });
}

// Type for client options that can accept a custom fetcher
interface ClientOptionsWithFetcher {
    fetcher?: (args: any) => Promise<any>;
    [key: string]: any;
}

// Type for the args parameter in the fetcher
interface FetcherArgs {
    url: string;
    method: string;
    headers?: Record<string, string>;
    [key: string]: any;
}

export interface RequestOptions {
    /** The maximum time to wait for a response in seconds. */
    timeoutInSeconds?: number;
    /** The number of times to retry the request. Defaults to 2. */
    maxRetries?: number;
    /** A hook to abort the request. */
    abortSignal?: AbortSignal;
    /** Additional headers to include in the request. */
    headers?: Record<string, string | (() => string | Promise<string>) | undefined>;
}

/**
 * Helper functions that can be used directly in object literals for a more concise syntax.
 * These functions return partial request options that can be spread into request options objects.
 */

/**
 * Configure requests to use a custom domain header.
 * Can be used directly in object literals with spread syntax.
 * Note: This applies the header to all requests. For automatic path-based filtering,
 * use withCustomDomainHeader in ManagementClient constructor options.
 *
 * @param domain - The custom domain to use (e.g., 'auth.example.com')
 * @returns Partial request options with the custom domain header
 *
 * @example
 * ```typescript
 * const reqOptions = {
 *     ...CustomDomainHeader('auth.example.com'),
 *     timeoutInSeconds: 30
 * };
 * await client.actions.list({}, reqOptions);
 * ```
 */
export function CustomDomainHeader(domain: string): Partial<RequestOptions> {
    return {
        headers: {
            "Auth0-Custom-Domain": domain,
        },
    };
}

/**
 * Configure requests with custom timeout settings.
 * Can be used directly in object literals with spread syntax.
 *
 * @param seconds - Timeout in seconds
 * @returns Partial request options with the specified timeout
 *
 * @example
 * ```typescript
 * const reqOptions = {
 *     ...withTimeout(30),
 *     maxRetries: 3
 * };
 * await client.actions.list({}, reqOptions);
 * ```
 */
export function withTimeout(seconds: number): Partial<RequestOptions> {
    return {
        timeoutInSeconds: seconds,
    };
}

/**
 * Configure requests with custom retry settings.
 * Can be used directly in object literals with spread syntax.
 *
 * @param retries - Number of retry attempts (0 to disable retries)
 * @returns Partial request options with the specified retry count
 *
 * @example
 * ```typescript
 * const reqOptions = {
 *     ...withRetries(5),
 *     timeoutInSeconds: 30
 * };
 * await client.actions.list({}, reqOptions);
 * ```
 */
export function withRetries(retries: number): Partial<RequestOptions> {
    return {
        maxRetries: retries,
    };
}

/**
 * Configure requests with custom headers.
 * Can be used directly in object literals with spread syntax.
 *
 * @param headers - Object containing header key-value pairs
 * @returns Partial request options with the specified headers
 *
 * @example
 * ```typescript
 * const reqOptions = {
 *     ...withHeaders({
 *         'X-Request-ID': 'unique-id-123',
 *         'X-Custom-Header': 'custom-value'
 *     }),
 *     timeoutInSeconds: 30
 * };
 * await client.actions.list({}, reqOptions);
 * ```
 */
export function withHeaders(headers: Record<string, string>): Partial<RequestOptions> {
    return {
        headers,
    };
}

/**
 * Configure requests with an abort signal for cancellation.
 * Can be used directly in object literals with spread syntax.
 *
 * @param signal - AbortSignal to control request cancellation
 * @returns Partial request options with the specified abort signal
 *
 * @example
 * ```typescript
 * const controller = new AbortController();
 * const reqOptions = {
 *     ...withAbortSignal(controller.signal),
 *     timeoutInSeconds: 30
 * };
 * const promise = client.actions.list({}, reqOptions);
 * ```
 */
export function withAbortSignal(signal: AbortSignal): Partial<RequestOptions> {
    return {
        abortSignal: signal,
    };
}

/**
 * INTERNAL: Configure a client with custom domain header that will be applied to whitelisted requests only.
 * This creates a custom fetcher that intercepts requests and applies the whitelist logic.
 *
 * This function is for INTERNAL use only and is automatically used by ManagementClient
 * when the withCustomDomainHeader option is provided in the constructor.
 *
 * Users should use the ergonomic API: `new ManagementClient({ ..., withCustomDomainHeader: 'domain' })`
 *
 * @internal
 * @param domain - The custom domain to use (e.g., 'auth.example.com')
 * @param options - The ManagementClient or resource client configuration options
 * @returns Modified options with custom fetcher that implements whitelist logic and chains with existing fetcher if present
 */
export function withCustomDomainHeader<T extends ClientOptionsWithFetcher>(
    domain: string,
    options: T,
): T & { fetcher: (args: FetcherArgs) => Promise<any> } {
    if (!domain || typeof domain !== "string" || domain.trim().length === 0) {
        throw new Error("Domain parameter is required and must be a non-empty string");
    }

    const trimmedDomain = domain.trim();
    // Preserve any existing custom fetcher from the options
    const originalFetcher = options.fetcher || coreFetcher;

    const customDomainFetcher = async (args: FetcherArgs): Promise<any> => {
        if (!args?.url) {
            throw new Error("Invalid fetcher arguments: URL is required");
        }

        // Parse URL and add custom domain header if path is whitelisted
        try {
            const url = new URL(args.url);
            const path = url.pathname;

            // Format path to ensure it starts with /api/v2/
            const formattedPath = path.startsWith("/api/v2/") ? path : `/api/v2${path}`;

            if (isCustomDomainPathWhitelisted(formattedPath)) {
                // Modify args to include the custom domain header
                args = {
                    ...args,
                    headers: {
                        ...args.headers,
                        "Auth0-Custom-Domain": trimmedDomain,
                    },
                };
            }
        } catch (error) {
            throw new Error(`Invalid URL provided to custom domain header: ${args.url}`);
        }

        // Chain with the original fetcher (either user-provided or core fetcher)
        return originalFetcher(args);
    };

    return {
        ...options,
        fetcher: customDomainFetcher,
    };
}
