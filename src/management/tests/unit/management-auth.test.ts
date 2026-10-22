jest.mock("jose", () => ({
    __esModule: true,
    default: {},
    SignJWT: jest.fn(),
    importPKCS8: jest.fn(),
    base64url: {
        encode: (input: string | Uint8Array) =>
            Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, ""),
    },
}));

import { createManagementAuth } from "../../wrapper/management-auth.js";
import { UsersClient } from "../../api/resources/users/client/Client.js";

describe("createManagementAuth", () => {
    const createMockFetch = () =>
        jest.fn(
            async () =>
                new Response(JSON.stringify([]), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }),
        );

    beforeEach(() => {
        jest.spyOn(globalThis, "fetch").mockRejectedValue(new Error("global fetch must not be used"));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("forwards a custom fetch to the client options", () => {
        const mockFetch = createMockFetch() as unknown as typeof fetch;

        const auth = createManagementAuth({
            domain: "test-tenant.auth0.com",
            token: "test-token",
            fetch: mockFetch,
        });

        expect(auth.clientOptions.fetch).toBe(mockFetch);
    });

    it("uses the custom fetch for sub-client requests", async () => {
        const mockFetch = createMockFetch();

        const auth = createManagementAuth({
            domain: "test-tenant.auth0.com",
            token: "test-token",
            fetch: mockFetch as unknown as typeof fetch,
        });
        const users = new UsersClient(auth.clientOptions);

        await users.list({ per_page: 1 });

        expect(mockFetch).toHaveBeenCalledTimes(1);
        const [url] = mockFetch.mock.calls[0] as unknown as [string];
        expect(url).toContain("https://test-tenant.auth0.com/api/v2/users");
    });

    it("uses the custom fetch with a custom domain header", async () => {
        const mockFetch = createMockFetch();

        const auth = createManagementAuth({
            domain: "test-tenant.auth0.com",
            token: "test-token",
            fetch: mockFetch as unknown as typeof fetch,
            withCustomDomainHeader: "auth.example.com",
        });
        const users = new UsersClient(auth.clientOptions);

        await users.list({ per_page: 1 });

        expect(mockFetch).toHaveBeenCalledTimes(1);
        const [, init] = mockFetch.mock.calls[0] as unknown as [string, RequestInit];
        expect(new Headers(init.headers).get("Auth0-Custom-Domain")).toBe("auth.example.com");
    });

    it("leaves fetch unset when not provided", () => {
        const auth = createManagementAuth({
            domain: "test-tenant.auth0.com",
            token: "test-token",
        });

        expect(auth.clientOptions).not.toHaveProperty("fetch");
    });
});
