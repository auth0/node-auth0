import { jest } from "@jest/globals";
import type { TokenResponse } from "@auth0/auth0-auth-js";

// Mock @auth0/auth0-auth-js module BEFORE imports
const mockGetTokenByClientCredentials = jest.fn<() => Promise<TokenResponse>>();
const MockAuthClient = jest.fn().mockImplementation(() => ({
    getTokenByClientCredentials: mockGetTokenByClientCredentials,
}));

class MockTokenByClientCredentialsError extends Error {
    constructor(
        public error: string,
        public errorDescription: string,
        public statusCode?: number,
    ) {
        super(errorDescription);
        this.name = "TokenByClientCredentialsError";
    }
}

jest.mock("@auth0/auth0-auth-js", () => ({
    AuthClient: MockAuthClient,
    TokenByClientCredentialsError: MockTokenByClientCredentialsError,
}));

// NOW import TokenProvider (after mock setup)
import { TokenProvider } from "../../wrapper/token-provider.js";

describe("TokenProvider (auth0-auth-js)", () => {
    const opts = {
        domain: "test-domain.auth0.com",
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        audience: "https://test-domain.auth0.com/api/v2/",
    };

    beforeEach(() => {
        mockGetTokenByClientCredentials.mockReset();
        MockAuthClient.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    describe("TC-2.1 — Token Acquired (Client-Secret)", () => {
        it("should get an access token with client-secret credentials", async () => {
            mockGetTokenByClientCredentials.mockResolvedValue({
                accessToken: "mock-access-token",
                expiresAt: Math.floor(Date.now() / 1000) + 86400, // Absolute Unix seconds, +1 day
                tokenType: "Bearer",
            });

            const tp = new TokenProvider(opts);
            const token = await tp.getAccessToken();

            expect(token).toBe("mock-access-token");
            expect(mockGetTokenByClientCredentials).toHaveBeenCalledTimes(1);
            expect(mockGetTokenByClientCredentials).toHaveBeenCalledWith({
                audience: opts.audience,
            });
            // Verify AuthClient constructed with correct credentials
            expect(MockAuthClient).toHaveBeenCalledWith(
                expect.objectContaining({
                    domain: opts.domain,
                    clientId: opts.clientId,
                    clientSecret: opts.clientSecret,
                }),
            );
        });
    });

    describe("TC-2.2 — Token Acquired (Client-Assertion)", () => {
        it("should get an access token with client-assertion credentials", async () => {
            const optsAssertion = {
                domain: "test-domain.auth0.com",
                clientId: "test-client-id",
                clientAssertionSigningKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...",
                clientAssertionSigningAlg: "RS256" as const,
                audience: "https://test-domain.auth0.com/api/v2/",
            };

            mockGetTokenByClientCredentials.mockResolvedValue({
                accessToken: "mock-assertion-token",
                expiresAt: Math.floor(Date.now() / 1000) + 3600,
                tokenType: "Bearer",
            });

            const tp = new TokenProvider(optsAssertion);
            const token = await tp.getAccessToken();

            expect(token).toBe("mock-assertion-token");
            // Verify AuthClient constructed with assertion credentials (no secret)
            expect(MockAuthClient).toHaveBeenCalledWith(
                expect.objectContaining({
                    domain: optsAssertion.domain,
                    clientId: optsAssertion.clientId,
                    clientAssertionSigningKey: optsAssertion.clientAssertionSigningKey,
                    clientAssertionSigningAlg: optsAssertion.clientAssertionSigningAlg,
                }),
            );
            expect(MockAuthClient).toHaveBeenCalledWith(
                expect.not.objectContaining({
                    clientSecret: expect.anything(),
                }),
            );
        });
    });

    describe("TC-2.3 — Cache Hit", () => {
        it("should return cached token on second call within validity", async () => {
            const expiresAt = Math.floor(Date.now() / 1000) + 3600; // +1 hour

            mockGetTokenByClientCredentials.mockResolvedValue({
                accessToken: "cached-token",
                expiresAt,
                tokenType: "Bearer",
            });

            const tp = new TokenProvider(opts);
            const token1 = await tp.getAccessToken();
            const token2 = await tp.getAccessToken();

            expect(token1).toBe("cached-token");
            expect(token2).toBe("cached-token");
            expect(mockGetTokenByClientCredentials).toHaveBeenCalledTimes(1); // single request
        });
    });

    describe("TC-2.4 — Leeway Refresh", () => {
        it("should refresh token when within 10s of expiry (leeway)", async () => {
            const originalDateNow = Date.now;
            let currentTime = 1000000000000; // Fixed start time in ms
            Date.now = jest.fn(() => currentTime);

            const expiresAtFirst = Math.floor(currentTime / 1000) + 3600; // +1 hour in Unix seconds

            mockGetTokenByClientCredentials
                .mockResolvedValueOnce({
                    accessToken: "token-1",
                    expiresAt: expiresAtFirst,
                    tokenType: "Bearer",
                })
                .mockResolvedValueOnce({
                    accessToken: "token-2",
                    expiresAt: Math.floor((currentTime + 3600 * 1000) / 1000) + 3600, // New expiry
                    tokenType: "Bearer",
                });

            const tp = new TokenProvider(opts);

            // First call
            const token1 = await tp.getAccessToken();
            expect(token1).toBe("token-1");

            // Advance time to 5s before expiry (within 10s LEEWAY)
            currentTime += (3600 - 5) * 1000; // Now: expiresAt - 5s in ms

            // Second call → should refresh (within LEEWAY)
            const token2 = await tp.getAccessToken();

            expect(token2).toBe("token-2");
            expect(mockGetTokenByClientCredentials).toHaveBeenCalledTimes(2); // refresh triggered

            // Verify boundary: expiresAt (Unix seconds) converted to ms correctly
            const timeAtSecondCall = currentTime / 1000; // Unix seconds
            const leewaySeconds = 10;
            expect(timeAtSecondCall).toBeGreaterThan(expiresAtFirst - leewaySeconds); // Within LEEWAY window

            Date.now = originalDateNow;
        });
    });

    describe("TC-2.5 — In-Flight Dedup", () => {
        it("should deduplicate concurrent calls to single request", async () => {
            mockGetTokenByClientCredentials.mockResolvedValue({
                accessToken: "shared-token",
                expiresAt: Math.floor(Date.now() / 1000) + 3600,
                tokenType: "Bearer",
            });

            const tp = new TokenProvider(opts);

            const [token1, token2, token3] = await Promise.all([
                tp.getAccessToken(),
                tp.getAccessToken(),
                tp.getAccessToken(),
            ]);

            expect(token1).toBe("shared-token");
            expect(token2).toBe("shared-token");
            expect(token3).toBe("shared-token");
            expect(mockGetTokenByClientCredentials).toHaveBeenCalledTimes(1); // single request for 3 concurrent calls
        });
    });

    describe("TC-2.6 — Error Path", () => {
        it("should propagate TokenByClientCredentialsError", async () => {
            mockGetTokenByClientCredentials.mockRejectedValue(
                new MockTokenByClientCredentialsError("invalid_client", "Client authentication failed", 401),
            );

            const tp = new TokenProvider(opts);

            await expect(tp.getAccessToken()).rejects.toThrow("Client authentication failed");
            expect(mockGetTokenByClientCredentials).toHaveBeenCalledTimes(1);
        });
    });

    describe("TC-2.7 — Error Not Cached", () => {
        it("should retry after failed request (no error caching)", async () => {
            mockGetTokenByClientCredentials.mockRejectedValueOnce(new Error("Network timeout")).mockResolvedValueOnce({
                accessToken: "retry-success-token",
                expiresAt: Math.floor(Date.now() / 1000) + 3600,
                tokenType: "Bearer",
            });

            const tp = new TokenProvider(opts);

            // First call fails
            await expect(tp.getAccessToken()).rejects.toThrow("Network timeout");

            // Second call succeeds
            const token = await tp.getAccessToken();

            expect(token).toBe("retry-success-token");
            expect(mockGetTokenByClientCredentials).toHaveBeenCalledTimes(2); // retry issued
        });
    });

    describe("TC-2.8 — Token Expired", () => {
        it("should refresh token after expiry", async () => {
            const originalDateNow = Date.now;
            let currentTime = 1000000000000;
            Date.now = jest.fn(() => currentTime);

            const expiresAtFirst = Math.floor(currentTime / 1000) + 86400; // +1 day

            mockGetTokenByClientCredentials
                .mockResolvedValueOnce({
                    accessToken: "token-1",
                    expiresAt: expiresAtFirst,
                    tokenType: "Bearer",
                })
                .mockResolvedValueOnce({
                    accessToken: "token-2",
                    expiresAt: Math.floor((currentTime + 86400 * 1000 + 20 * 1000) / 1000) + 86400,
                    tokenType: "Bearer",
                });

            const tp = new TokenProvider(opts);
            const token1 = await tp.getAccessToken();

            // Advance time by 1 day + 20s (beyond expiry + LEEWAY)
            currentTime += (86400 + 20) * 1000;

            const token2 = await tp.getAccessToken();

            expect(token1).toBe("token-1");
            expect(token2).toBe("token-2");
            expect(mockGetTokenByClientCredentials).toHaveBeenCalledTimes(2);

            Date.now = originalDateNow;
        });
    });
});
