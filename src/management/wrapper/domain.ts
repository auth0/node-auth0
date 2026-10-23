/**
 * Characters that cannot appear in a bare hostname. Each one changes the host or path of the URLs
 * built from the domain: `/` and `\` start a path (URL parsers treat `\` like `/`), `?` and `#`
 * start a query string or fragment, `@` turns the text before it into credentials and sends the
 * request to the host after it, and whitespace is never part of a hostname.
 */
const INVALID_DOMAIN_CHARACTERS = /[\s/\\?#@]/;

/**
 * Validates that a domain is a bare hostname such as `tenant.auth0.com`, optionally with a port.
 *
 * Throws when the domain is missing, empty or whitespace-only, or contains a scheme, path, query
 * string, fragment, credentials, or whitespace. Both the Management API base URL and the token
 * endpoint are built from the domain, so it is validated at construction for every authentication
 * mode.
 *
 * @group Management API
 * @internal
 */
export function validateDomain(domain: unknown): asserts domain is string {
    if (typeof domain !== "string" || domain.length === 0 || INVALID_DOMAIN_CHARACTERS.test(domain)) {
        // JSON.stringify makes an empty value or stray whitespace visible in the message.
        const received = typeof domain === "string" ? JSON.stringify(domain) : String(domain);
        throw new Error(
            `ManagementClient: invalid domain ${received}. Provide a bare hostname, e.g. "tenant.auth0.com".`,
        );
    }
}
