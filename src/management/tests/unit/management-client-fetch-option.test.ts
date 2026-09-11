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
            return Buffer.from(str).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
        },
        decode: (str: string) => {
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

// NOTE: We do NOT mock ../../core/index.js here. We supply a custom `fetch`
// implementation directly in ManagementClient options so the real Fern fetcher
// pipeline runs but our mock function is used for the actual HTTP call.

import { ManagementClient } from "../../wrapper/ManagementClient.js";

const DOMAIN = "test-tenant.auth0.com";
const TOKEN = "test-token";

describe("ManagementClient custom fetch option", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("invokes the custom fetch function when making a Management API request", async () => {
        const myFetchMock = jest.fn().mockResolvedValue(
            new Response(JSON.stringify({ users: [], length: 0 }), {
                status: 200,
                headers: { "content-type": "application/json" },
            }),
        );

        const client = new ManagementClient({
            domain: DOMAIN,
            token: TOKEN,
            fetch: myFetchMock as unknown as typeof fetch,
        });

        // Call a simple GET endpoint — users.list() issues GET /api/v2/users
        await client.users.list();

        expect(myFetchMock).toHaveBeenCalled();
    });

    it("calls the custom fetch with a URL that contains the configured domain", async () => {
        const myFetchMock = jest.fn().mockResolvedValue(
            new Response(JSON.stringify({ users: [], length: 0 }), {
                status: 200,
                headers: { "content-type": "application/json" },
            }),
        );

        const client = new ManagementClient({
            domain: DOMAIN,
            token: TOKEN,
            fetch: myFetchMock as unknown as typeof fetch,
        });

        await client.users.list();

        // The first argument to the fetch call should be the URL string
        const [calledUrl] = myFetchMock.mock.calls[0] as [string, RequestInit];
        expect(calledUrl).toContain(DOMAIN);
    });

    it("uses the supplied mTLS fetch for Management API requests when useMTLS is set", async () => {
        // Client-credentials mode issues two calls through the supplied fetch:
        // (1) the token request to the oauth endpoint, (2) the api/v2 request.
        // Branch on URL so the token call gets a valid access_token and the
        // api/v2 call gets a users payload.
        const myFetchMock = jest.fn((url: string) => {
            if (String(url).includes("/oauth/token")) {
                return Promise.resolve(
                    new Response(JSON.stringify({ access_token: "mtls-token", expires_in: 3600 }), {
                        status: 200,
                        headers: { "content-type": "application/json" },
                    }),
                );
            }
            return Promise.resolve(
                new Response(JSON.stringify({ users: [], length: 0 }), {
                    status: 200,
                    headers: { "content-type": "application/json" },
                }),
            );
        });

        const client = new ManagementClient({
            domain: DOMAIN,
            clientId: "test-client-id",
            clientSecret: "test-client-secret",
            useMTLS: true,
            fetch: myFetchMock as unknown as typeof fetch,
        });

        await client.users.list();

        // The mTLS-capable fetch must actually be invoked for the api/v2 call,
        // otherwise the client certificate is never presented on the request.
        const apiCall = myFetchMock.mock.calls.find(([u]) => String(u).includes("/api/v2"));
        expect(apiCall).toBeDefined();
        expect(String(apiCall![0])).toContain(`${DOMAIN}/api/v2`);

        // The token request must go to the mtls. subdomain (RFC 8705 mTLS-bound token endpoint).
        const oauthCall = myFetchMock.mock.calls.find(([u]) => String(u).includes("/oauth/token"));
        expect(oauthCall).toBeDefined();
        expect(String(oauthCall![0])).toContain(`mtls.${DOMAIN}`);

        // The token returned by the mTLS exchange must be forwarded as the Authorization header
        // on the subsequent api/v2 call, proving end-to-end token propagation.
        // Fern passes a Headers instance (not a plain object) as the headers field.
        const [, apiInit] = apiCall as unknown as [string, RequestInit];
        const apiHeaders = apiInit.headers as unknown as Headers;
        expect(apiHeaders.get("Authorization")).toBe("Bearer mtls-token");
    });
});

describe("ManagementClient construction guard — useMTLS without fetch", () => {
    it("throws at construction when useMTLS is set without a custom fetch", () => {
        expect(
            () =>
                new ManagementClient({
                    domain: DOMAIN,
                    clientId: "test-client-id",
                    clientSecret: "test-client-secret",
                    useMTLS: true,
                    // fetch intentionally omitted — must throw before any network call
                }),
        ).toThrow("useMTLS requires a custom fetch implementation");
    });
});

describe("ManagementClient silently drops user-supplied fetcher option", () => {
    it("does not invoke a user-supplied fetcher and falls through to the custom fetch", async () => {
        const fetcherMock = jest.fn();
        const myFetchMock = jest.fn().mockResolvedValue(
            new Response(JSON.stringify({ users: [], length: 0 }), {
                status: 200,
                headers: { "content-type": "application/json" },
            }),
        );

        // fetcher is deleted by ManagementClient before being passed to Fern core to
        // prevent callers from bypassing SDK internals. Verify it is never invoked.
        const client = new ManagementClient({
            domain: DOMAIN,
            token: TOKEN,
            fetch: myFetchMock as unknown as typeof fetch,
            fetcher: fetcherMock,
        } as any);

        await client.users.list();

        expect(fetcherMock).not.toHaveBeenCalled();
        expect(myFetchMock).toHaveBeenCalled();
    });
});

describe("ManagementClient telemetry:false omits Auth0-Client on api/v2 requests", () => {
    it("does not send the Auth0-Client header on api/v2 calls when telemetry is disabled", async () => {
        const myFetchMock = jest.fn().mockResolvedValue(
            new Response(JSON.stringify({ users: [], length: 0 }), {
                status: 200,
                headers: { "content-type": "application/json" },
            }),
        );

        const client = new ManagementClient({
            domain: DOMAIN,
            token: TOKEN,
            telemetry: false,
            fetch: myFetchMock as unknown as typeof fetch,
        });

        await client.users.list();

        const [, init] = myFetchMock.mock.calls[0] as [string, RequestInit];
        // Fern passes a Headers instance; Headers.get() is case-insensitive per spec.
        const headers = init.headers as unknown as Headers;
        // createTelemetryHeaders skips the Auth0-Client header when telemetry === false.
        expect(headers.get("Auth0-Client")).toBeNull();
        expect(headers.get("auth0-client")).toBeNull();
    });
});
