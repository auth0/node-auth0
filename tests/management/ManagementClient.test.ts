import { ManagementClient } from "../../src/management/index.js";

describe("ManagementClient (wrapper)", () => {
    describe("custom fetch option", () => {
        // Regression for https://github.com/auth0/node-auth0/issues/1330
        // The wrapper used to `delete (_options as any).fetch`, which silently
        // dropped any caller-provided custom fetch implementation even though
        // the underlying `fetcherImpl` honours `fetchFn`. Verify the wrapper
        // now forwards `fetch` all the way through.
        it("should invoke the provided custom fetch implementation", async () => {
            const calls: { url: string; init?: RequestInit }[] = [];
            const customFetch: typeof fetch = (async (input, init) => {
                const url = typeof input === "string" ? input : (input as URL | Request).toString();
                calls.push({ url, init });
                return new Response(JSON.stringify([{ id: "rul_test", name: "Test Rule" }]), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                });
            }) as typeof fetch;

            const client = new ManagementClient({
                domain: "tenant.auth0.com",
                token: "test-token",
                fetch: customFetch,
            });

            await client.rules.list().catch(() => {
                // Iterator parsing may not match the mocked payload shape; the
                // assertion below only cares that the custom fetch was invoked.
            });

            expect(calls.length).toBeGreaterThanOrEqual(1);
            expect(calls[0].url).toContain("tenant.auth0.com/api/v2/rules");
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
});
