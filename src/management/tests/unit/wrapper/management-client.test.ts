import { ManagementClient } from "../../../wrapper/ManagementClient.js";

describe("ManagementClient with custom fetcher", () => {
    const mockConfig = {
        domain: "test-tenant.auth0.com",
        token: "test-token",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should correctly pass the arguments", async () => {
        const mockCustomFetcher = jest.fn().mockResolvedValue({
            ok: true,
            json: () => ({ actions: [{ id: "action_1" }] }),
            headers: {},
        });

        const client = new ManagementClient({
            ...mockConfig,
            fetcher: async (url, init, context) => {
                return mockCustomFetcher(url, init, context);
            },
        });

        const response = await client.actions.list();

        expect(mockCustomFetcher).toHaveBeenNthCalledWith(
            1,
            "https://test-tenant.auth0.com/api/v2/actions/actions",
            {
                method: "GET",
                headers: expect.objectContaining({ Authorization: "Bearer test-token" }),
            },
            // TODO: This should not be undefined once this is correctly implemented
            { scope: undefined },
        );

        expect(response.data.length).toBe(1);
        expect(response.data[0].id).toBe("action_1");
    });
});
