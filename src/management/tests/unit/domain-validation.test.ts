import { ManagementClient } from "../../wrapper/ManagementClient.js";
import { createManagementAuth } from "../../wrapper/management-auth.js";
import { TokenProvider } from "../../wrapper/token-provider.js";
import { validateDomain } from "../../wrapper/domain.js";

const INVALID_DOMAIN_ERROR = /^ManagementClient: invalid domain /;

const VALID_DOMAINS = ["tenant.auth0.com", "tenant.us.auth0.com", "login.example.com", "localhost:8443"];

// None of these is a bare hostname.
const INVALID_DOMAINS: Array<[string, string]> = [
    ["that is empty", ""],
    ["that is whitespace-only", "   "],
    ["with a scheme", "https://tenant.auth0.com"],
    ["with a trailing slash", "tenant.auth0.com/"],
    ["with a path", "tenant.auth0.com/x"],
    ["with a backslash", "tenant.auth0.com\\x"],
    ["with a query string", "tenant.auth0.com?foo=bar"],
    ["with a fragment", "tenant.auth0.com#x"],
    ["with credentials", "tenant.auth0.com@evil.example"],
    ["with leading whitespace", " tenant.auth0.com"],
    ["with a trailing newline", "tenant.auth0.com\n"],
];

type AuthOptions =
    | Pick<ManagementClient.ManagementClientOptionsWithToken, "token">
    | Pick<ManagementClient.ManagementClientOptionsWithClientSecret, "clientId" | "clientSecret">
    | Pick<ManagementClient.ManagementClientOptionsWithClientAssertion, "clientId" | "clientAssertionSigningKey">;

const AUTH_MODES: Array<[string, AuthOptions]> = [
    ["a static token", { token: "test-token" }],
    ["a client secret", { clientId: "test-client-id", clientSecret: "test-client-secret" }],
    ["a client assertion", { clientId: "test-client-id", clientAssertionSigningKey: "test-private-key" }],
];

describe("domain validation", () => {
    describe("validateDomain", () => {
        it.each(VALID_DOMAINS)("accepts %j", (domain) => {
            expect(() => validateDomain(domain)).not.toThrow();
        });

        it.each(INVALID_DOMAINS)("rejects a domain %s", (_label, domain) => {
            expect(() => validateDomain(domain)).toThrow(INVALID_DOMAIN_ERROR);
        });

        it.each([undefined, null, 42])("rejects a non-string domain (%p)", (domain) => {
            expect(() => validateDomain(domain)).toThrow(INVALID_DOMAIN_ERROR);
        });

        it("names the rejected value in the error message", () => {
            expect(() => validateDomain("https://tenant.auth0.com")).toThrow(
                'ManagementClient: invalid domain "https://tenant.auth0.com". Provide a bare hostname, e.g. "tenant.auth0.com".',
            );
        });

        it("makes empty values and stray whitespace visible in the error message", () => {
            expect(() => validateDomain("")).toThrow('invalid domain "".');
            expect(() => validateDomain("tenant.auth0.com\n")).toThrow('invalid domain "tenant.auth0.com\\n".');
            expect(() => validateDomain(undefined)).toThrow("invalid domain undefined.");
        });
    });

    describe("ManagementClient", () => {
        describe.each(AUTH_MODES)("with %s", (_label, auth) => {
            it.each(INVALID_DOMAINS)("throws at construction for a domain %s", (_domainLabel, domain) => {
                expect(() => new ManagementClient({ domain, ...auth })).toThrow(INVALID_DOMAIN_ERROR);
            });

            it("accepts a bare hostname", () => {
                expect(new ManagementClient({ domain: "tenant.auth0.com", ...auth })).toBeInstanceOf(ManagementClient);
            });
        });

        it("rejects a path in the domain when using a static token", () => {
            // Previously only the client-credentials path validated the domain, so this built
            // https://tenant.auth0.com/x/api/v2 without complaint.
            expect(() => new ManagementClient({ domain: "tenant.auth0.com/x", token: "test-token" })).toThrow(
                'ManagementClient: invalid domain "tenant.auth0.com/x".',
            );
        });

        it("rejects a missing domain, such as an unset environment variable", () => {
            expect(() => new ManagementClient({ domain: undefined as unknown as string, token: "test-token" })).toThrow(
                "ManagementClient: invalid domain undefined.",
            );
        });
    });

    describe("createManagementAuth", () => {
        describe.each(AUTH_MODES)("with %s", (_label, auth) => {
            it.each(INVALID_DOMAINS)("throws for a domain %s", (_domainLabel, domain) => {
                expect(() => createManagementAuth({ domain, ...auth })).toThrow(INVALID_DOMAIN_ERROR);
            });

            it("builds the base URL from a bare hostname", () => {
                expect(createManagementAuth({ domain: "tenant.auth0.com", ...auth }).baseUrl).toBe(
                    "https://tenant.auth0.com/api/v2",
                );
            });
        });
    });

    describe("TokenProvider", () => {
        const options = {
            clientId: "test-client-id",
            clientSecret: "test-client-secret",
            audience: "https://tenant.auth0.com/api/v2/",
        };

        it.each(INVALID_DOMAINS)("throws at construction for a domain %s", (_label, domain) => {
            expect(() => new TokenProvider({ domain, ...options })).toThrow(INVALID_DOMAIN_ERROR);
        });

        it("accepts a bare hostname", () => {
            expect(new TokenProvider({ domain: "tenant.auth0.com", ...options })).toBeInstanceOf(TokenProvider);
        });
    });
});
