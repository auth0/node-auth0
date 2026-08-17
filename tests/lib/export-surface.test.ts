import { describe, it, expect } from "@jest/globals";
import * as auth0 from "../../src/index.js";

describe("Export Surface (v7.0.0)", () => {
    it("should NOT export AuthenticationClient", () => {
        expect((auth0 as any).AuthenticationClient).toBeUndefined();
    });

    it("should NOT export UserInfoClient", () => {
        expect((auth0 as any).UserInfoClient).toBeUndefined();
    });

    it("should export ManagementClient", () => {
        expect(auth0.ManagementClient).toBeDefined();
        expect(typeof auth0.ManagementClient).toBe("function");
    });

    it("should export Management (Fern client)", () => {
        expect((auth0 as any).Management).toBeDefined();
    });
});
