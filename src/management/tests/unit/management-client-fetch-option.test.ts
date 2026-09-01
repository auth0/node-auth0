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
});
