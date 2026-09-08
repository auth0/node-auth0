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
        const apiCall = myFetchMock.mock.calls.find(([u]) => !String(u).includes("/oauth/token"));
        expect(apiCall).toBeDefined();
        expect(String(apiCall![0])).toContain(DOMAIN);
    });
});
