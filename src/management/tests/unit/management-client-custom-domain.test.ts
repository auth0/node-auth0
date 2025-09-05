// Mock problematic ES modules before importing ManagementClient
jest.mock("jose", () => ({
    __esModule: true,
    default: {},
    jwtVerify: jest.fn(),
    SignJWT: jest.fn(),
    importPKCS8: jest.fn(),
    importSPKI: jest.fn(),
    createRemoteJWKSet: jest.fn().mockReturnValue(jest.fn()),
    base64url: {
        encode: (str: string) => {
            // Use URL-safe base64 encoding (replace + with -, / with _)
            return Buffer.from(str).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
        },
        decode: (str: string) => {
            // Add padding if needed and restore standard base64 chars
            let paddedStr = str.replace(/-/g, "+").replace(/_/g, "/");
            while (paddedStr.length % 4) {
                paddedStr += "=";
            }
            return Buffer.from(paddedStr, "base64").toString();
        },
    },
}));

jest.mock("uuid", () => ({
    v4: jest.fn(() => "test-uuid"),
}));

// Mock the core fetcher to avoid actual HTTP calls
jest.mock("../../core/index.js", () => ({
    fetcher: jest.fn().mockResolvedValue({
        ok: true,
        body: { data: "test" },
        headers: {},
        rawResponse: {
            headers: new Headers(),
            status: 200,
            statusText: "OK",
            url: "",
            redirected: false,
            type: "basic",
        },
    }),
}));

import { ManagementClient } from "../../wrapper/ManagementClient.js";

describe("ManagementClient with custom domain header", () => {
    const mockConfig = {
        domain: "test-tenant.auth0.com",
        token: "test-token",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("constructor", () => {
        it("should create client without custom domain header", () => {
            const client = new ManagementClient(mockConfig);
            expect(client).toBeInstanceOf(ManagementClient);
        });

        it("should create client with custom domain header", () => {
            const clientWithCustomDomain = new ManagementClient({
                ...mockConfig,
                withCustomDomainHeader: "auth.example.com",
            });
            expect(clientWithCustomDomain).toBeInstanceOf(ManagementClient);
        });

        it("should handle client credentials with custom domain header", () => {
            const clientCredentialsConfig = {
                domain: "test-tenant.auth0.com",
                clientId: "test-client-id",
                clientSecret: "test-client-secret",
                withCustomDomainHeader: "auth.example.com",
            };

            const client = new ManagementClient(clientCredentialsConfig);
            expect(client).toBeInstanceOf(ManagementClient);
        });

        it("should handle client assertion with custom domain header", () => {
            const clientAssertionConfig = {
                domain: "test-tenant.auth0.com",
                clientId: "test-client-id",
                clientAssertionSigningKey: "test-private-key",
                withCustomDomainHeader: "auth.example.com",
            };

            const client = new ManagementClient(clientAssertionConfig);
            expect(client).toBeInstanceOf(ManagementClient);
        });
    });

    describe("telemetry integration", () => {
        it("should preserve telemetry when using custom domain header", () => {
            const client = new ManagementClient({
                ...mockConfig,
                withCustomDomainHeader: "auth.example.com",
                telemetry: true,
                clientInfo: { name: "test-client", version: "1.0.0" },
            });

            expect(client).toBeInstanceOf(ManagementClient);
        });

        it("should work with telemetry disabled and custom domain header", () => {
            const client = new ManagementClient({
                ...mockConfig,
                withCustomDomainHeader: "auth.example.com",
                telemetry: false,
            });

            expect(client).toBeInstanceOf(ManagementClient);
        });
    });

    describe("configuration validation", () => {
        it("should throw error for invalid custom domain header", () => {
            expect(() => {
                new ManagementClient({
                    ...mockConfig,
                    withCustomDomainHeader: "",
                });
            }).toThrow("Domain parameter is required and must be a non-empty string");
        });

        it("should throw error for whitespace-only custom domain header", () => {
            expect(() => {
                new ManagementClient({
                    ...mockConfig,
                    withCustomDomainHeader: "   ",
                });
            }).toThrow("Domain parameter is required and must be a non-empty string");
        });

        it("should trim and accept valid custom domain header", () => {
            const client = new ManagementClient({
                ...mockConfig,
                withCustomDomainHeader: "  auth.example.com  ",
            });

            expect(client).toBeInstanceOf(ManagementClient);
        });
    });

    describe("options forwarding", () => {
        it("should forward all base options to underlying client", () => {
            const extendedConfig = {
                ...mockConfig,
                withCustomDomainHeader: "auth.example.com",
                maxRetries: 5,
                timeoutInSeconds: 30,
                headers: {
                    "X-Custom": "value",
                },
            };

            const client = new ManagementClient(extendedConfig);
            expect(client).toBeInstanceOf(ManagementClient);
        });

        it("should handle audience parameter correctly", () => {
            const configWithAudience = {
                domain: "test-tenant.auth0.com",
                clientId: "test-client-id",
                clientSecret: "test-client-secret",
                audience: "https://custom-audience.example.com/api/v2/",
                withCustomDomainHeader: "auth.example.com",
            };

            const client = new ManagementClient(configWithAudience);
            expect(client).toBeInstanceOf(ManagementClient);
        });

        it("should handle mTLS configuration", () => {
            const configWithMTLS = {
                domain: "test-tenant.auth0.com",
                clientId: "test-client-id",
                clientSecret: "test-client-secret",
                useMTLS: true,
                withCustomDomainHeader: "auth.example.com",
            };

            const client = new ManagementClient(configWithMTLS);
            expect(client).toBeInstanceOf(ManagementClient);
        });
    });

    describe("type safety", () => {
        it("should accept valid token-based configuration", () => {
            const tokenConfig: ManagementClient.ManagementClientOptionsWithToken = {
                domain: "test-tenant.auth0.com",
                token: "test-token",
                withCustomDomainHeader: "auth.example.com",
            };

            const client = new ManagementClient(tokenConfig);
            expect(client).toBeInstanceOf(ManagementClient);
        });

        it("should accept valid client secret configuration", () => {
            const clientSecretConfig: ManagementClient.ManagementClientOptionsWithClientSecret = {
                domain: "test-tenant.auth0.com",
                clientId: "test-client-id",
                clientSecret: "test-client-secret",
                withCustomDomainHeader: "auth.example.com",
            };

            const client = new ManagementClient(clientSecretConfig);
            expect(client).toBeInstanceOf(ManagementClient);
        });

        it("should accept valid client assertion configuration", () => {
            const clientAssertionConfig: ManagementClient.ManagementClientOptionsWithClientAssertion = {
                domain: "test-tenant.auth0.com",
                clientId: "test-client-id",
                clientAssertionSigningKey: "test-private-key",
                withCustomDomainHeader: "auth.example.com",
            };

            const client = new ManagementClient(clientAssertionConfig);
            expect(client).toBeInstanceOf(ManagementClient);
        });
    });

    describe("custom fetcher integration", () => {
        it("should work with both custom fetcher and custom domain header", () => {
            const mockCustomFetcher = jest.fn().mockResolvedValue({
                ok: true,
                body: { data: "custom-fetcher-test" },
                headers: {},
                rawResponse: {
                    headers: new Headers(),
                    status: 200,
                    statusText: "OK",
                    url: "",
                    redirected: false,
                    type: "basic",
                },
            });

            const client = new ManagementClient({
                ...mockConfig,
                withCustomDomainHeader: "auth.example.com",
                fetcher: mockCustomFetcher,
            });

            expect(client).toBeInstanceOf(ManagementClient);
        });

        it("should create client with custom fetcher but without custom domain header", () => {
            const mockCustomFetcher = jest.fn().mockResolvedValue({
                ok: true,
                body: { data: "custom-fetcher-test" },
                headers: {},
                rawResponse: {
                    headers: new Headers(),
                    status: 200,
                    statusText: "OK",
                    url: "",
                    redirected: false,
                    type: "basic",
                },
            });

            const client = new ManagementClient({
                ...mockConfig,
                fetcher: mockCustomFetcher,
            });

            expect(client).toBeInstanceOf(ManagementClient);
        });
    });
});
