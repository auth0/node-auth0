import { jest } from "@jest/globals";

// Mock jose BEFORE imports
const mockImportPKCS8 = jest.fn<() => Promise<{ type: string }>>().mockResolvedValue({ type: "fake-key" });
const mockSign = jest.fn<() => Promise<string>>().mockResolvedValue("mock-client-assertion-jwt");

const MockSignJWT = jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setIssuer: jest.fn().mockReturnThis(),
    setSubject: jest.fn().mockReturnThis(),
    setAudience: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    setJti: jest.fn().mockReturnThis(),
    sign: mockSign,
}));

jest.mock("jose", () => ({
    importPKCS8: mockImportPKCS8,
    SignJWT: MockSignJWT,
    base64url: {
        encode: (input: Uint8Array | string) => {
            const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
            return Buffer.from(bytes).toString("base64url");
        },
    },
}));

// NOW import TokenProvider (after mock setup)
import { TokenProvider } from "../../wrapper/token-provider.js";
import { ManagementError } from "../../errors/ManagementError.js";

const DOMAIN = "test-domain.auth0.com";
const TOKEN_URL = `https://${DOMAIN}/oauth/token`;
const AUDIENCE = `https://${DOMAIN}/api/v2/`;

/** Build a minimal Response-like object that satisfies the TokenProvider fetch contract */
function makeOkResponse(body: { access_token: string; expires_in: number }) {
    return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => body,
        text: async () => JSON.stringify(body),
    } as unknown as Response;
}

function makeErrorResponse(status: number, errorCode: string, description: string) {
    const body = JSON.stringify({ error: errorCode, error_description: description });
    return {
        ok: false,
        status,
        statusText: description,
        json: async () => JSON.parse(body),
        text: async () => body,
    } as unknown as Response;
}

describe("TokenProvider (raw fetch + jose)", () => {
    const opts = {
        domain: DOMAIN,
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        audience: AUDIENCE,
    };

    let fetchSpy: jest.MockedFunction<typeof fetch>;

    beforeEach(() => {
        fetchSpy = jest
            .spyOn(globalThis, "fetch")
            .mockImplementation(() =>
                Promise.reject(new Error("fetch not mocked for this test")),
            ) as unknown as jest.MockedFunction<typeof fetch>;
        mockImportPKCS8.mockClear();
        mockSign.mockClear();
        MockSignJWT.mockClear();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    describe("TC-2.1 — Token Acquired (Client-Secret)", () => {
        it("should get an access token with client-secret credentials", async () => {
            fetchSpy.mockResolvedValue(makeOkResponse({ access_token: "mock-access-token", expires_in: 86400 }));

            const tp = new TokenProvider(opts);
            const token = await tp.getAccessToken();

            expect(token).toBe("mock-access-token");
            expect(fetchSpy).toHaveBeenCalledTimes(1);
            expect(fetchSpy).toHaveBeenCalledWith(TOKEN_URL, expect.objectContaining({ method: "POST" }));

            // Verify body contains correct client_secret params
            const callBody = (fetchSpy.mock.calls[0][1] as RequestInit).body as string;
            const params = new URLSearchParams(callBody);
            expect(params.get("grant_type")).toBe("client_credentials");
            expect(params.get("client_id")).toBe(opts.clientId);
            expect(params.get("client_secret")).toBe(opts.clientSecret);
            expect(params.get("audience")).toBe(opts.audience);
        });
    });

    describe("TC-2.2 — Token Acquired (Client-Assertion)", () => {
        it("should get an access token with client-assertion credentials", async () => {
            const optsAssertion = {
                domain: DOMAIN,
                clientId: "test-client-id",
                clientAssertionSigningKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...",
                clientAssertionSigningAlg: "RS256" as const,
                audience: AUDIENCE,
            };

            fetchSpy.mockResolvedValue(makeOkResponse({ access_token: "mock-assertion-token", expires_in: 3600 }));

            const tp = new TokenProvider(optsAssertion);
            const token = await tp.getAccessToken();

            expect(token).toBe("mock-assertion-token");
            expect(mockImportPKCS8).toHaveBeenCalledWith(
                optsAssertion.clientAssertionSigningKey,
                optsAssertion.clientAssertionSigningAlg,
            );
            expect(MockSignJWT).toHaveBeenCalled();
            expect(mockSign).toHaveBeenCalled();

            const callBody = (fetchSpy.mock.calls[0][1] as RequestInit).body as string;
            const params = new URLSearchParams(callBody);
            expect(params.get("client_assertion")).toBe("mock-client-assertion-jwt");
            expect(params.get("client_assertion_type")).toBe("urn:ietf:params:oauth:client-assertion-type:jwt-bearer");
        });
    });

    describe("TC-2.3 — Cache Hit", () => {
        it("should return cached token on second call within validity", async () => {
            fetchSpy.mockResolvedValue(makeOkResponse({ access_token: "cached-token", expires_in: 3600 }));

            const tp = new TokenProvider(opts);
            const token1 = await tp.getAccessToken();
            const token2 = await tp.getAccessToken();

            expect(token1).toBe("cached-token");
            expect(token2).toBe("cached-token");
            expect(fetchSpy).toHaveBeenCalledTimes(1); // single request
        });
    });

    describe("TC-2.4 — Leeway Refresh", () => {
        it("should refresh token when within 10s of expiry (leeway)", async () => {
            const originalDateNow = Date.now;
            let currentTime = 1000000000000; // Fixed start time in ms
            Date.now = jest.fn(() => currentTime);

            // First response: expires in 3600s
            fetchSpy
                .mockResolvedValueOnce(makeOkResponse({ access_token: "token-1", expires_in: 3600 }))
                .mockResolvedValueOnce(makeOkResponse({ access_token: "token-2", expires_in: 3600 }));

            const tp = new TokenProvider(opts);

            // First call
            const token1 = await tp.getAccessToken();
            expect(token1).toBe("token-1");

            // Advance time to 5s before expiry (within 10s LEEWAY)
            // expiresAt = currentTime + 3600 * 1000; LEEWAY check: Date.now() > expiresAt - 10000
            currentTime += (3600 - 5) * 1000;

            const token2 = await tp.getAccessToken();
            expect(token2).toBe("token-2");
            expect(fetchSpy).toHaveBeenCalledTimes(2);

            Date.now = originalDateNow;
        });
    });

    describe("TC-2.5 — In-Flight Dedup", () => {
        it("should deduplicate concurrent calls to single request", async () => {
            fetchSpy.mockResolvedValue(makeOkResponse({ access_token: "shared-token", expires_in: 3600 }));

            const tp = new TokenProvider(opts);

            const [token1, token2, token3] = await Promise.all([
                tp.getAccessToken(),
                tp.getAccessToken(),
                tp.getAccessToken(),
            ]);

            expect(token1).toBe("shared-token");
            expect(token2).toBe("shared-token");
            expect(token3).toBe("shared-token");
            expect(fetchSpy).toHaveBeenCalledTimes(1); // single request for 3 concurrent calls
        });
    });

    describe("TC-2.6 — Error Path", () => {
        it("should throw ManagementError on non-2xx response", async () => {
            fetchSpy.mockResolvedValue(makeErrorResponse(401, "invalid_client", "Client authentication failed"));

            const tp = new TokenProvider(opts);

            const err = await tp.getAccessToken().catch((e) => e);
            expect(err).toBeInstanceOf(ManagementError);
            expect(err.statusCode).toBe(401);
            expect(fetchSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("TC-2.7 — Error Not Cached", () => {
        it("should retry after failed request (no error caching)", async () => {
            fetchSpy
                .mockResolvedValueOnce(makeErrorResponse(500, "server_error", "Internal Server Error"))
                .mockResolvedValueOnce(makeOkResponse({ access_token: "retry-success-token", expires_in: 3600 }));

            const tp = new TokenProvider(opts);

            // First call fails
            const err = await tp.getAccessToken().catch((e) => e);
            expect(err).toBeInstanceOf(ManagementError);
            expect(err.statusCode).toBe(500);

            // Second call succeeds
            const token = await tp.getAccessToken();

            expect(token).toBe("retry-success-token");
            expect(fetchSpy).toHaveBeenCalledTimes(2); // retry issued
        });
    });

    describe("TC-2.8 — Token Expired", () => {
        it("should refresh token after expiry", async () => {
            const originalDateNow = Date.now;
            let currentTime = 1000000000000;
            Date.now = jest.fn(() => currentTime);

            fetchSpy
                .mockResolvedValueOnce(makeOkResponse({ access_token: "token-1", expires_in: 86400 }))
                .mockResolvedValueOnce(makeOkResponse({ access_token: "token-2", expires_in: 86400 }));

            const tp = new TokenProvider(opts);
            const token1 = await tp.getAccessToken();

            // Advance time by 1 day + 20s (beyond expiry + LEEWAY)
            currentTime += (86400 + 20) * 1000;

            const token2 = await tp.getAccessToken();

            expect(token1).toBe("token-1");
            expect(token2).toBe("token-2");
            expect(fetchSpy).toHaveBeenCalledTimes(2);

            Date.now = originalDateNow;
        });
    });

    describe("TC-2.9 — mTLS: customFetch forwarded when fetch provided", () => {
        it("should call the custom fetch function when useMTLS=true and fetch is provided", async () => {
            const mockCustomFetch = jest
                .fn<typeof fetch>()
                .mockResolvedValue(makeOkResponse({ access_token: "mtls-token", expires_in: 3600 }));

            const mtlsOpts = {
                domain: DOMAIN,
                clientId: "test-client-id",
                clientSecret: "test-client-secret",
                audience: AUDIENCE,
                useMTLS: true,
                fetch: mockCustomFetch,
            };

            const tp = new TokenProvider(mtlsOpts as any);
            const token = await tp.getAccessToken();

            expect(token).toBe("mtls-token");
            // Custom fetch was called, not the global one
            expect(mockCustomFetch).toHaveBeenCalledTimes(1);
            expect(mockCustomFetch).toHaveBeenCalledWith(
                `https://mtls.${DOMAIN}/oauth/token`,
                expect.objectContaining({ method: "POST" }),
            );
            // Global fetch should NOT have been called
            expect(fetchSpy).not.toHaveBeenCalled();
        });
    });

    describe("TC-2.10 — mTLS: throw at construction when no fetch provided", () => {
        it("should throw a descriptive error at construction time when useMTLS=true and fetch is absent", () => {
            const mtlsOptsNoFetch = {
                domain: DOMAIN,
                clientId: "test-client-id",
                clientSecret: "test-client-secret",
                audience: AUDIENCE,
                useMTLS: true,
                // no fetch
            };

            expect(() => new TokenProvider(mtlsOptsNoFetch as any)).toThrow(
                "ManagementClient: useMTLS requires a custom fetch implementation.",
            );
            // Global fetch should NOT have been called (error thrown at construction)
            expect(fetchSpy).not.toHaveBeenCalled();
        });
    });

    describe("TC-2.11 — domain validation: throw at construction for invalid domain", () => {
        it("should throw when domain contains a slash", () => {
            expect(() => new TokenProvider({ ...opts, domain: "tenant.auth0.com/path" } as any)).toThrow(
                /invalid domain/,
            );
        });

        it("should throw when domain contains a query string", () => {
            expect(() => new TokenProvider({ ...opts, domain: "tenant.auth0.com?foo=bar" } as any)).toThrow(
                /invalid domain/,
            );
        });
    });

    describe("TC-2.12 — mTLS + clientAssertion: throw at construction (mutually exclusive)", () => {
        it("should throw when both useMTLS and clientAssertionSigningKey are provided", () => {
            const mockCustomFetch = jest.fn<typeof fetch>();
            expect(
                () =>
                    new TokenProvider({
                        domain: DOMAIN,
                        clientId: "test-client-id",
                        clientAssertionSigningKey: "-----BEGIN PRIVATE KEY-----\nfake",
                        audience: AUDIENCE,
                        useMTLS: true,
                        fetch: mockCustomFetch,
                    } as any),
            ).toThrow(/mutually exclusive/);
        });
    });

    describe("TC-2.13 — custom headers forwarded to token request", () => {
        it("should forward plain-string headers from options.headers to the token fetch", async () => {
            fetchSpy.mockResolvedValue(makeOkResponse({ access_token: "header-token", expires_in: 3600 }));

            const tp = new TokenProvider({
                ...opts,
                headers: {
                    "User-Agent": "my-app/1.0",
                    "X-Custom": "value",
                },
            } as any);
            await tp.getAccessToken();

            const callHeaders = (fetchSpy.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
            expect(callHeaders["user-agent"]).toBe("my-app/1.0");
            expect(callHeaders["x-custom"]).toBe("value");
            // SDK headers still present
            expect(callHeaders["content-type"]).toBe("application/x-www-form-urlencoded");
        });

        it("should silently skip supplier-function headers", async () => {
            fetchSpy.mockResolvedValue(makeOkResponse({ access_token: "header-token", expires_in: 3600 }));

            const tp = new TokenProvider({
                ...opts,
                headers: {
                    "User-Agent": "my-app/1.0",
                    "X-Supplier": () => "dynamic-value",
                },
            } as any);
            await tp.getAccessToken();

            const callHeaders = (fetchSpy.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
            expect(callHeaders["user-agent"]).toBe("my-app/1.0");
            expect(callHeaders["x-supplier"]).toBeUndefined();
        });

        it("SDK-controlled headers should override user-supplied headers with same name", async () => {
            fetchSpy.mockResolvedValue(makeOkResponse({ access_token: "header-token", expires_in: 3600 }));

            const tp = new TokenProvider({
                ...opts,
                headers: {
                    "Content-Type": "text/plain", // should be overridden
                },
            } as any);
            await tp.getAccessToken();

            const callHeaders = (fetchSpy.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
            expect(callHeaders["content-type"]).toBe("application/x-www-form-urlencoded");
        });
    });

    describe("TC-2.14 — header case normalization: lowercase user key overridden by SDK", () => {
        it("should normalize lowercase user header key and let SDK value win", async () => {
            fetchSpy.mockResolvedValue(makeOkResponse({ access_token: "norm-token", expires_in: 3600 }));

            const tp = new TokenProvider({
                ...opts,
                headers: { "content-type": "text/plain" }, // lowercase, SDK must win
            } as any);
            await tp.getAccessToken();

            const callHeaders = (fetchSpy.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
            const ctKeys = Object.keys(callHeaders).filter((k) => k.toLowerCase() === "content-type");
            expect(ctKeys).toHaveLength(1);
            expect(callHeaders[ctKeys[0]]).toBe("application/x-www-form-urlencoded");
        });
    });

    describe("TC-2.15 — typed error carries statusCode and OAuth error body", () => {
        it("should throw ManagementError with statusCode and body.error on 401", async () => {
            fetchSpy.mockResolvedValue(makeErrorResponse(401, "invalid_client", "Client authentication failed."));

            const tp = new TokenProvider(opts);
            const err = await tp.getAccessToken().catch((e) => e);

            expect(err).toBeInstanceOf(ManagementError);
            expect(err.statusCode).toBe(401);
            expect((err.body as { error: string }).error).toBe("invalid_client");
            expect((err.body as { error_description: string }).error_description).toBe("Client authentication failed.");
        });
    });

    describe("TC-2.16 — token request timeout throws ManagementError", () => {
        it("should throw ManagementError with statusCode 408 on AbortSignal timeout (TimeoutError)", async () => {
            const abortError = Object.assign(new Error("The operation was aborted."), {
                name: "TimeoutError",
            });
            fetchSpy.mockRejectedValue(abortError);

            const tp = new TokenProvider(opts);
            const err = await tp.getAccessToken().catch((e) => e);

            expect(err).toBeInstanceOf(ManagementError);
            expect(err.statusCode).toBe(408);
        });

        it("should throw ManagementError with statusCode 408 when the custom fetch aborts (AbortError)", async () => {
            // node-fetch (mTLS path) rejects with an AbortError, not a TimeoutError.
            const abortError = Object.assign(new Error("The operation was aborted."), {
                name: "AbortError",
            });
            fetchSpy.mockRejectedValue(abortError);

            const tp = new TokenProvider(opts);
            const err = await tp.getAccessToken().catch((e) => e);

            expect(err).toBeInstanceOf(ManagementError);
            expect(err.statusCode).toBe(408);
        });
    });

    describe("TC-2.17 — non-JSON error body preserved and message set", () => {
        it("should keep the raw text body when the error response is not JSON", async () => {
            const nonJson = {
                ok: false,
                status: 502,
                statusText: "Bad Gateway",
                json: async () => {
                    throw new Error("Unexpected token < in JSON");
                },
                text: async () => "<html><body>502 Bad Gateway</body></html>",
            } as unknown as Response;
            fetchSpy.mockResolvedValue(nonJson);

            const tp = new TokenProvider(opts);
            const err = await tp.getAccessToken().catch((e) => e);

            expect(err).toBeInstanceOf(ManagementError);
            expect(err.statusCode).toBe(502);
            expect(err.body).toBe("<html><body>502 Bad Gateway</body></html>");
            expect(err.message).toContain("token request failed");
        });
    });
});
