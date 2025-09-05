import nock from "nock";
import { jest } from "@jest/globals";
import { TokenProvider } from "../../src/management/wrapper/token-provider.js";
import { FetchAPI } from "../../src/lib/models.js";

const opts = {
    domain: "test-domain.auth0.com",
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    audience: "my-api",
};

const url = `https://${opts.domain}`;

describe("TokenProvider", () => {
    const spy = jest.fn().mockReturnValue({
        access_token: "my-access-token",
        expires_in: 86400,
        token_type: "Bearer",
    });

    beforeEach(() => {
        nock(url)
            .persist()
            .post(
                "/oauth/token",
                `client_id=${opts.clientId}&audience=${opts.audience}&client_secret=${opts.clientSecret}&grant_type=client_credentials`,
            )
            .reply(200, spy);
    });

    afterEach(() => {
        nock.cleanAll();
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it("should get an access token", async () => {
        const tp = new TokenProvider(opts);
        expect(await tp.getAccessToken()).toBe("my-access-token");
        expect(spy).toHaveBeenCalled();
    });

    it("should get a cached access token", async () => {
        const tp = new TokenProvider(opts);
        expect(await tp.getAccessToken()).toBe("my-access-token");
        expect(await tp.getAccessToken()).toBe("my-access-token");
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should get a new access token if token expires", async () => {
        // Mock Date.now to control time
        const originalDateNow = Date.now;
        let currentTime = 1000000000000; // Starting timestamp
        Date.now = jest.fn(() => currentTime);

        try {
            const tp = new TokenProvider(opts);

            // First call should fetch a new token
            expect(await tp.getAccessToken()).toBe("my-access-token");
            expect(spy).toHaveBeenCalledTimes(1);

            // Advance time by 2 days (more than the 86400 seconds expiry + 10 second leeway)
            currentTime += (86400 + 20) * 1000;

            // Second call should fetch a new token because it's expired
            expect(await tp.getAccessToken()).toBe("my-access-token");
            expect(spy).toHaveBeenCalledTimes(2);
        } finally {
            // Restore original Date.now
            Date.now = originalDateNow;
        }
    });

    it("should get a new access token if token expires in leeway", async () => {
        // Mock Date.now to control time
        const originalDateNow = Date.now;
        let currentTime = 1000000000000; // Starting timestamp
        Date.now = jest.fn(() => currentTime);

        try {
            const tp = new TokenProvider(opts);

            // First call should fetch a new token
            expect(await tp.getAccessToken()).toBe("my-access-token");
            expect(spy).toHaveBeenCalledTimes(1);

            // Advance time to within the leeway window (86400 - 5 seconds from expiry)
            // This should trigger a refresh because it's within the 10 second LEEWAY
            currentTime += (86400 - 5) * 1000;

            // Second call should fetch a new token because we're in the leeway window
            expect(await tp.getAccessToken()).toBe("my-access-token");
            expect(spy).toHaveBeenCalledTimes(2);
        } finally {
            // Restore original Date.now
            Date.now = originalDateNow;
        }
    });

    it("should not cache failed requests", async () => {
        const domain = "fail.auth0.com";
        const url = `https://${domain}`;
        const tp = new TokenProvider({ ...opts, domain });

        nock(url).post("/oauth/token").reply(500, {});
        nock(url).post("/oauth/token").reply(200, spy);

        await expect(tp.getAccessToken()).rejects.toThrowError();
        expect(await tp.getAccessToken()).toBe("my-access-token");
    });

    it("should cache concurrent requests", async () => {
        const tp = new TokenProvider(opts);
        expect(await Promise.all([tp.getAccessToken(), tp.getAccessToken(), tp.getAccessToken()])).toEqual([
            "my-access-token",
            "my-access-token",
            "my-access-token",
        ]);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it.skip("should use a custom fetch", async () => {
        const customFetch = jest
            .fn<FetchAPI>()
            .mockImplementation((url: URL | RequestInfo, init?: RequestInit) => fetch(url, init));

        const tp = new TokenProvider({
            ...opts,
            fetcher: customFetch as any,
        });
        expect(await tp.getAccessToken()).toBe("my-access-token");
        expect(customFetch).toHaveBeenCalled();
    });
});
