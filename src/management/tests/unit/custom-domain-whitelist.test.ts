/**
 * Integration tests for custom domain header whitelist functionality.
 * These tests verify that the custom domain header is only applied to whitelisted endpoints.
 */

// Mock the core fetcher
jest.mock("../../core/index.js", () => ({
    fetcher: jest.fn()
}));

import { withCustomDomainHeader } from "../../request-options.js";

// Get the mocked function after the import
const { fetcher: mockCoreFetcher } = jest.requireMock("../../core/index.js");

describe("Custom Domain Header Whitelist Integration", () => {
    const testDomain = "auth.example.com";
    const mockClientOptions = {
        domain: "test-tenant.auth0.com",
        token: "test-token"
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockCoreFetcher.mockResolvedValue({
            ok: true,
            body: { data: "test" },
            headers: {},
            rawResponse: {
                headers: new Headers(),
                status: 200,
                statusText: "OK"
            }
        });
    });

    describe("whitelisted endpoints", () => {
        const whitelistedPaths = [
            "/api/v2/jobs/verification-email",
            "/api/v2/tickets/email-verification",
            "/api/v2/tickets/password-change",
            "/api/v2/organizations/org-123/invitations",
            "/api/v2/users",
            "/api/v2/users/user-123",
            "/api/v2/guardian/enrollments/ticket"
        ];

        whitelistedPaths.forEach((path) => {
            it(`should add custom domain header for whitelisted path: ${path}`, async () => {
                const result = withCustomDomainHeader(testDomain, mockClientOptions);
                const testUrl = `https://test-tenant.auth0.com${path}`;

                const requestArgs = {
                    url: testUrl,
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer test-token"
                    }
                };

                await result.fetcher(requestArgs);

                // Verify the core fetcher was called
                expect(mockCoreFetcher).toHaveBeenCalledTimes(1);

                // Verify the custom domain header was added
                const calledArgs = mockCoreFetcher.mock.calls[0][0];
                expect(calledArgs.headers).toHaveProperty("Auth0-Custom-Domain", testDomain);
                expect(calledArgs.headers).toHaveProperty("Authorization", "Bearer test-token");
            });
        });
    });

    describe("non-whitelisted endpoints", () => {
        const nonWhitelistedPaths = [
            "/api/v2/actions",
            "/api/v2/connections",
            "/api/v2/roles",
            "/api/v2/clients",
            "/api/v2/resource-servers",
            "/api/v2/logs",
            "/api/v1/users", // Different API version
            "/some/other/path"
        ];

        nonWhitelistedPaths.forEach((path) => {
            it(`should NOT add custom domain header for non-whitelisted path: ${path}`, async () => {
                const result = withCustomDomainHeader(testDomain, mockClientOptions);
                const testUrl = `https://test-tenant.auth0.com${path}`;

                const requestArgs = {
                    url: testUrl,
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer test-token"
                    }
                };

                await result.fetcher(requestArgs);

                // Verify the core fetcher was called
                expect(mockCoreFetcher).toHaveBeenCalledTimes(1);

                // Verify the custom domain header was NOT added
                const calledArgs = mockCoreFetcher.mock.calls[0][0];
                expect(calledArgs.headers).not.toHaveProperty("Auth0-Custom-Domain");
                expect(calledArgs.headers).toHaveProperty("Authorization", "Bearer test-token");
            });
        });
    });

    describe("path formatting", () => {
        it("should handle URLs with paths that already start with /api/v2/", async () => {
            const result = withCustomDomainHeader(testDomain, mockClientOptions);
            const testUrl = "https://test-tenant.auth0.com/api/v2/users";

            await result.fetcher({
                url: testUrl,
                method: "GET"
            });

            expect(mockCoreFetcher).toHaveBeenCalledTimes(1);
            const calledArgs = mockCoreFetcher.mock.calls[0][0];
            expect(calledArgs.headers).toHaveProperty("Auth0-Custom-Domain", testDomain);
        });

        it("should handle URLs with paths that need /api/v2/ prefix", async () => {
            const result = withCustomDomainHeader(testDomain, mockClientOptions);
            // Simulate a path that might come without the /api/v2/ prefix
            const testUrl = "https://test-tenant.auth0.com/users";

            await result.fetcher({
                url: testUrl,
                method: "GET"
            });

            expect(mockCoreFetcher).toHaveBeenCalledTimes(1);
            // The header should still not be added because "/users" doesn't match after formatting to "/api/v2/users"
            // Actually, let me correct this - "/api/v2/users" should match and get the header
            const calledArgs = mockCoreFetcher.mock.calls[0][0];
            expect(calledArgs.headers).toHaveProperty("Auth0-Custom-Domain", testDomain);
        });
    });

    describe("header preservation", () => {
        it("should preserve existing headers while adding custom domain header", async () => {
            const result = withCustomDomainHeader(testDomain, mockClientOptions);
            const testUrl = "https://test-tenant.auth0.com/api/v2/users";

            const requestArgs = {
                url: testUrl,
                method: "POST",
                headers: {
                    "Authorization": "Bearer test-token",
                    "Content-Type": "application/json",
                    "X-Custom-Header": "custom-value"
                }
            };

            await result.fetcher(requestArgs);

            expect(mockCoreFetcher).toHaveBeenCalledTimes(1);
            const calledArgs = mockCoreFetcher.mock.calls[0][0];

            // All original headers should be preserved
            expect(calledArgs.headers).toHaveProperty("Authorization", "Bearer test-token");
            expect(calledArgs.headers).toHaveProperty("Content-Type", "application/json");
            expect(calledArgs.headers).toHaveProperty("X-Custom-Header", "custom-value");

            // Custom domain header should be added
            expect(calledArgs.headers).toHaveProperty("Auth0-Custom-Domain", testDomain);
        });

        it("should handle requests with no existing headers", async () => {
            const result = withCustomDomainHeader(testDomain, mockClientOptions);
            const testUrl = "https://test-tenant.auth0.com/api/v2/users";

            await result.fetcher({
                url: testUrl,
                method: "GET"
            });

            expect(mockCoreFetcher).toHaveBeenCalledTimes(1);
            const calledArgs = mockCoreFetcher.mock.calls[0][0];
            expect(calledArgs.headers).toHaveProperty("Auth0-Custom-Domain", testDomain);
        });
    });

    describe("regex pattern matching", () => {
        it("should match organization invitations with various org IDs", async () => {
            const result = withCustomDomainHeader(testDomain, mockClientOptions);
            const testCases = [
                "org_123456789",
                "org-with-dashes",
                "org_with_underscores",
                "abc123xyz"
            ];

            for (const orgId of testCases) {
                jest.clearAllMocks();
                const testUrl = `https://test-tenant.auth0.com/api/v2/organizations/${orgId}/invitations`;

                await result.fetcher({
                    url: testUrl,
                    method: "GET"
                });

                expect(mockCoreFetcher).toHaveBeenCalledTimes(1);
                const calledArgs = mockCoreFetcher.mock.calls[0][0];
                expect(calledArgs.headers).toHaveProperty("Auth0-Custom-Domain", testDomain);
            }
        });

        it("should match user endpoints with various user IDs", async () => {
            const result = withCustomDomainHeader(testDomain, mockClientOptions);
            const testCases = [
                "auth0|123456789",
                "google-oauth2|123456789",
                "email|user@example.com",
                "user123"
            ];

            for (const userId of testCases) {
                jest.clearAllMocks();
                const testUrl = `https://test-tenant.auth0.com/api/v2/users/${encodeURIComponent(userId)}`;

                await result.fetcher({
                    url: testUrl,
                    method: "GET"
                });

                expect(mockCoreFetcher).toHaveBeenCalledTimes(1);
                const calledArgs = mockCoreFetcher.mock.calls[0][0];
                expect(calledArgs.headers).toHaveProperty("Auth0-Custom-Domain", testDomain);
            }
        });

        it("should NOT match partial paths", async () => {
            const result = withCustomDomainHeader(testDomain, mockClientOptions);
            const nonMatchingPaths = [
                "/api/v2/users/profile/extra", // Too many path segments
                "/api/v2/organizations", // Missing org ID and /invitations
                "/api/v2/jobs", // Missing /verification-email
                "/api/v2/tickets", // Missing specific ticket type
            ];

            for (const path of nonMatchingPaths) {
                jest.clearAllMocks();
                const testUrl = `https://test-tenant.auth0.com${path}`;

                await result.fetcher({
                    url: testUrl,
                    method: "GET"
                });

                expect(mockCoreFetcher).toHaveBeenCalledTimes(1);
                const calledArgs = mockCoreFetcher.mock.calls[0][0];

                // Headers might be undefined for non-whitelisted paths
                if (calledArgs.headers) {
                    expect(calledArgs.headers).not.toHaveProperty("Auth0-Custom-Domain");
                } else {
                    // If headers is undefined, that's also correct (no custom domain header was added)
                    expect(calledArgs.headers).toBeUndefined();
                }
            }
        });
    });

    describe("error handling", () => {
        it("should handle malformed URLs gracefully", async () => {
            const result = withCustomDomainHeader(testDomain, mockClientOptions);

            await expect(result.fetcher({
                url: "not-a-valid-url",
                method: "GET"
            })).rejects.toThrow("Invalid URL provided to custom domain header");
        });

        it("should still call core fetcher even for non-whitelisted paths", async () => {
            const result = withCustomDomainHeader(testDomain, mockClientOptions);
            const testUrl = "https://test-tenant.auth0.com/api/v2/actions";

            await result.fetcher({
                url: testUrl,
                method: "GET"
            });

            // Core fetcher should still be called, just without the custom domain header
            expect(mockCoreFetcher).toHaveBeenCalledTimes(1);
        });
    });
});
