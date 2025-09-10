import { ManagementClient } from "../../wrapper/ManagementClient.js";

describe("ManagementClient with Scope-Aware Supplier and Fetcher", () => {
    it("handle custom changes to demonstrate", async () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        const client = new ManagementClient({
            domain: "your-tenant.auth0.com",
            clientId: "your-client-id",
            clientSecret: "your-client-secret",
            token: (context) => {
                console.log(`Scope passed to token supplier: ${context?.scope?.join(", ")}`);
                return "your-static-token";
            },
            fetcher: async (args) => {
                console.log(`Scope passed to fetcher: ${args.scope?.join(", ")}`);
                const response = await fetch(args.url, {
                    method: args.method,
                    headers: args.headers as Record<string, string>,
                    body: args.body ? JSON.stringify(args.body) : undefined,
                });

                if (response.ok) {
                    return {
                        ok: true as const,
                        body: await response.json(),
                        headers: response.headers,
                        rawResponse: response,
                    };
                } else {
                    return {
                        ok: false as const,
                        error: {
                            reason: "status-code" as const,
                            statusCode: response.status,
                            body: await response.text(),
                        },
                        rawResponse: response,
                    };
                }
            },
        });

        try {
            await client.actions.versions.list("action123");
        } catch {}

        expect(consoleSpy).toHaveBeenNthCalledWith(1, "Scope passed to token supplier: read:actions_versions");
        expect(consoleSpy).toHaveBeenNthCalledWith(2, "Scope passed to fetcher: read:actions_versions");
    });
});
