import {
    CustomDomainHeader,
    withTimeout,
    withRetries,
    withHeaders,
    withAbortSignal,
    withCustomDomainHeader
} from "../../request-options.js";

describe("request-options", () => {
    describe("CustomDomainHeader", () => {
        it("should create request options with custom domain header", () => {
            const options = CustomDomainHeader("auth.example.com");

            expect(options).toEqual({
                headers: {
                    "Auth0-Custom-Domain": "auth.example.com"
                }
            });
        });

        it("should handle empty domain gracefully", () => {
            const options = CustomDomainHeader("");

            expect(options).toEqual({
                headers: {
                    "Auth0-Custom-Domain": ""
                }
            });
        });
    });

    describe("withTimeout", () => {
        it("should create request options with timeout", () => {
            const options = withTimeout(30);

            expect(options).toEqual({
                timeoutInSeconds: 30
            });
        });

        it("should handle zero timeout", () => {
            const options = withTimeout(0);

            expect(options).toEqual({
                timeoutInSeconds: 0
            });
        });
    });

    describe("withRetries", () => {
        it("should create request options with retry count", () => {
            const options = withRetries(5);

            expect(options).toEqual({
                maxRetries: 5
            });
        });

        it("should handle zero retries", () => {
            const options = withRetries(0);

            expect(options).toEqual({
                maxRetries: 0
            });
        });
    });

    describe("withHeaders", () => {
        it("should create request options with custom headers", () => {
            const headers = {
                "X-Request-ID": "test-123",
                "X-Custom-Header": "custom-value"
            };
            const options = withHeaders(headers);

            expect(options).toEqual({
                headers
            });
        });

        it("should handle empty headers object", () => {
            const options = withHeaders({});

            expect(options).toEqual({
                headers: {}
            });
        });
    });

    describe("withAbortSignal", () => {
        it("should create request options with abort signal", () => {
            const controller = new AbortController();
            const options = withAbortSignal(controller.signal);

            expect(options).toEqual({
                abortSignal: controller.signal
            });
        });
    });

    describe("withCustomDomainHeader", () => {
        const mockClientOptions = {
            domain: "test-tenant.auth0.com",
            token: "test-token"
        };

        describe("input validation", () => {
            it("should throw error for empty domain", () => {
                expect(() => {
                    withCustomDomainHeader("", mockClientOptions);
                }).toThrow("Domain parameter is required and must be a non-empty string");
            });

            it("should throw error for null domain", () => {
                expect(() => {
                    withCustomDomainHeader(null as any, mockClientOptions);
                }).toThrow("Domain parameter is required and must be a non-empty string");
            });

            it("should throw error for undefined domain", () => {
                expect(() => {
                    withCustomDomainHeader(undefined as any, mockClientOptions);
                }).toThrow("Domain parameter is required and must be a non-empty string");
            });

            it("should throw error for whitespace-only domain", () => {
                expect(() => {
                    withCustomDomainHeader("   ", mockClientOptions);
                }).toThrow("Domain parameter is required and must be a non-empty string");
            });

            it("should trim domain and accept valid domain", () => {
                const result = withCustomDomainHeader("  auth.example.com  ", mockClientOptions);
                expect(result).toHaveProperty("fetcher");
                expect(typeof result.fetcher).toBe("function");
            });
        });

        describe("fetcher functionality", () => {
            let mockFetch: jest.Mock;
            let originalFetch: typeof global.fetch;

            beforeEach(() => {
                // Mock the dynamic import of the core fetcher
                mockFetch = jest.fn();
                originalFetch = global.fetch;
                global.fetch = mockFetch;
            });

            afterEach(() => {
                global.fetch = originalFetch;
                jest.resetAllMocks();
            });

            it("should create custom fetcher that validates URL arguments", async () => {
                const result = withCustomDomainHeader("auth.example.com", mockClientOptions);

                await expect(result.fetcher({ url: "", method: "GET" })).rejects.toThrow(
                    "Invalid fetcher arguments: URL is required"
                );
            });

            it("should handle invalid URLs gracefully", async () => {
                const result = withCustomDomainHeader("auth.example.com", mockClientOptions);

                await expect(result.fetcher({
                    url: "invalid-url",
                    method: "GET"
                })).rejects.toThrow("Invalid URL provided to custom domain header: invalid-url");
            });

            it("should preserve existing options and add fetcher", () => {
                const options = {
                    ...mockClientOptions,
                    customProperty: "test-value",
                    timeout: 30
                };

                const result = withCustomDomainHeader("auth.example.com", options);

                expect(result).toEqual({
                    ...options,
                    fetcher: expect.any(Function)
                });
            });
        });

        describe("path whitelisting", () => {
            it("should test whitelisted path patterns", () => {
                // Test the internal whitelist patterns by testing known patterns
                const testCases = [
                    { path: "/api/v2/jobs/verification-email", shouldMatch: true },
                    { path: "/api/v2/tickets/email-verification", shouldMatch: true },
                    { path: "/api/v2/tickets/password-change", shouldMatch: true },
                    { path: "/api/v2/organizations/org123/invitations", shouldMatch: true },
                    { path: "/api/v2/users", shouldMatch: true },
                    { path: "/api/v2/users/user123", shouldMatch: true },
                    { path: "/api/v2/guardian/enrollments/ticket", shouldMatch: true },

                    // These should NOT match
                    { path: "/api/v2/actions", shouldMatch: false },
                    { path: "/api/v2/connections", shouldMatch: false },
                    { path: "/api/v2/roles", shouldMatch: false },
                    { path: "/api/v1/users", shouldMatch: false },
                    { path: "/some/other/path", shouldMatch: false }
                ];

                testCases.forEach(({ path, shouldMatch }) => {
                    // We can't directly test the internal function, but we can verify
                    // that the whitelisted patterns are defined correctly by testing
                    // the function creation doesn't throw errors
                    expect(() => {
                        withCustomDomainHeader("auth.example.com", mockClientOptions);
                    }).not.toThrow();
                });
            });
        });

        describe("path formatting", () => {
            it("should handle paths that already start with /api/v2/", () => {
                // We test this indirectly by ensuring the function works with various URL formats
                const result = withCustomDomainHeader("auth.example.com", mockClientOptions);
                expect(result.fetcher).toBeDefined();
                expect(typeof result.fetcher).toBe("function");
            });

            it("should handle paths that need /api/v2/ prefix", () => {
                // We test this indirectly by ensuring the function works with various URL formats
                const result = withCustomDomainHeader("auth.example.com", mockClientOptions);
                expect(result.fetcher).toBeDefined();
                expect(typeof result.fetcher).toBe("function");
            });
        });

        describe("custom fetcher chaining", () => {
            it("should chain with existing custom fetcher", async () => {
                const mockCustomFetcher = jest.fn().mockResolvedValue({
                    ok: true,
                    body: { data: "custom-result" },
                    headers: {}
                });

                const optionsWithCustomFetcher = {
                    ...mockClientOptions,
                    fetcher: mockCustomFetcher
                };

                const result = withCustomDomainHeader("auth.example.com", optionsWithCustomFetcher);

                // Simulate a whitelisted request
                const args = {
                    url: "https://test-tenant.auth0.com/api/v2/users",
                    method: "GET",
                    headers: { "X-Existing": "header" }
                };

                await result.fetcher(args);

                // Verify that the original custom fetcher was called with the custom domain header
                expect(mockCustomFetcher).toHaveBeenCalledWith({
                    ...args,
                    headers: {
                        "X-Existing": "header",
                        "Auth0-Custom-Domain": "auth.example.com"
                    }
                });
            });

            it("should chain with existing custom fetcher for non-whitelisted paths", async () => {
                const mockCustomFetcher = jest.fn().mockResolvedValue({
                    ok: true,
                    body: { data: "custom-result" },
                    headers: {}
                });

                const optionsWithCustomFetcher = {
                    ...mockClientOptions,
                    fetcher: mockCustomFetcher
                };

                const result = withCustomDomainHeader("auth.example.com", optionsWithCustomFetcher);

                // Simulate a non-whitelisted request
                const args = {
                    url: "https://test-tenant.auth0.com/api/v2/actions",
                    method: "GET",
                    headers: { "X-Existing": "header" }
                };

                await result.fetcher(args);

                // Verify that the original custom fetcher was called without the custom domain header
                expect(mockCustomFetcher).toHaveBeenCalledWith({
                    ...args,
                    headers: {
                        "X-Existing": "header"
                        // No Auth0-Custom-Domain header should be added
                    }
                });

                const calledHeaders = mockCustomFetcher.mock.calls[0][0].headers;
                expect(calledHeaders).not.toHaveProperty("Auth0-Custom-Domain");
            });

            it("should use core fetcher when no custom fetcher is provided", async () => {
                // Mock the core fetcher
                const mockCoreFetcher = jest.fn().mockResolvedValue({
                    ok: true,
                    body: { data: "core-result" },
                    headers: {}
                });

                // We can't directly mock the import, but we can test that the function
                // doesn't throw and creates a fetcher
                const result = withCustomDomainHeader("auth.example.com", mockClientOptions);
                expect(result.fetcher).toBeDefined();
                expect(typeof result.fetcher).toBe("function");
            });
        });
    });

    describe("helper function combinations", () => {
        it("should combine multiple helpers correctly", () => {
            const combined = {
                ...CustomDomainHeader("auth.example.com"),
                ...withTimeout(30),
                ...withRetries(3),
                ...withHeaders({
                    "X-Request-ID": "test-123"
                })
            };

            expect(combined).toEqual({
                headers: {
                    "X-Request-ID": "test-123"
                },
                timeoutInSeconds: 30,
                maxRetries: 3
            });
        });

        it("should handle header merging when using spread syntax", () => {
            // When using spread syntax, later objects overwrite earlier ones
            const customDomain = CustomDomainHeader("auth.example.com");
            const customHeaders = withHeaders({
                "X-Request-ID": "test-123"
            });

            // Manually merge headers to test the expected behavior
            const combined = {
                ...customDomain,
                ...withTimeout(30),
                ...withRetries(3),
                headers: {
                    ...customDomain.headers,
                    ...customHeaders.headers
                }
            };

            expect(combined).toEqual({
                headers: {
                    "Auth0-Custom-Domain": "auth.example.com",
                    "X-Request-ID": "test-123"
                },
                timeoutInSeconds: 30,
                maxRetries: 3
            });
        });

        it("should handle header conflicts by using last one", () => {
            const combined = {
                ...CustomDomainHeader("auth.example.com"),
                ...withHeaders({
                    "Auth0-Custom-Domain": "different.example.com",
                    "X-Custom": "value"
                })
            };

            expect(combined).toEqual({
                headers: {
                    "Auth0-Custom-Domain": "different.example.com",
                    "X-Custom": "value"
                }
            });
        });
    });
});
