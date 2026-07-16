import { ManagementClient } from "../../wrapper/ManagementClient.js";

describe("ManagementClient custom fetch option", () => {
    // Regression for https://github.com/auth0/node-auth0/issues/1330
    // The wrapper used to `delete (_options as any).fetch`, which silently
    // dropped any caller-provided custom fetch implementation even though the
    // underlying `fetcherImpl` honours `fetchFn`. These tests verify the
    // wrapper now forwards `fetch` all the way through to the transport.
    it("should route requests through the provided custom fetch implementation", async () => {
        const calls: { url: string; init?: RequestInit }[] = [];
        const customFetch: typeof fetch = (async (input, init) => {
            const url = typeof input === "string" ? input : (input as URL | Request).toString();
            calls.push({ url, init });
            return new Response(JSON.stringify({ rules: [{ id: "rul_test", name: "Test Rule", enabled: true }] }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }) as typeof fetch;

        const client = new ManagementClient({
            domain: "tenant.auth0.com",
            token: "test-token",
            fetch: customFetch,
        });

        const page = await client.rules.list();

        // The custom fetch was actually used for the request...
        expect(calls.length).toBeGreaterThanOrEqual(1);
        expect(calls[0].url).toContain("tenant.auth0.com/api/v2/rules");
        // ...and the response it returned is what the client parsed and handed back.
        expect(page.data).toEqual([{ id: "rul_test", name: "Test Rule", enabled: true }]);
    });

    it("should not throw when the `fetch` option is omitted (defaults to global fetch)", () => {
        expect(
            () =>
                new ManagementClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                }),
        ).not.toThrow();
    });
});
