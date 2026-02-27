import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { BearerAuthProvider } from "../../../../../src/management/auth/BearerAuthProvider";
import { ManagementError } from "../../../../../src/management/errors/ManagementError";

describe("BearerAuthProvider", () => {
    describe("constructor", () => {
        it("should create an instance with a token string", () => {
            const provider = new BearerAuthProvider({ token: "test-token" });
            expect(provider).toBeInstanceOf(BearerAuthProvider);
        });
    });

    describe("canCreate", () => {
        it("should return true when token is provided", () => {
            expect(BearerAuthProvider.canCreate({ token: "test-token" })).toBe(true);
        });

        it("should return false when token is null", () => {
            expect(BearerAuthProvider.canCreate({ token: null as any })).toBe(false);
        });

        it("should return false when token is undefined", () => {
            expect(BearerAuthProvider.canCreate({} as any)).toBe(false);
        });

        it("should return false when options is empty", () => {
            expect(BearerAuthProvider.canCreate({})).toBe(false);
        });
    });

    describe("getAuthRequest", () => {
        it("should return Authorization header with Bearer token", async () => {
            const provider = new BearerAuthProvider({ token: "test-token-123" });
            const result = await provider.getAuthRequest();

            expect(result).toEqual({
                headers: { Authorization: "Bearer test-token-123" },
            });
        });

        it("should resolve token from a supplier function", async () => {
            const provider = new BearerAuthProvider({
                token: () => "dynamic-token",
            });
            const result = await provider.getAuthRequest();

            expect(result).toEqual({
                headers: { Authorization: "Bearer dynamic-token" },
            });
        });

        it("should resolve token from an async supplier function", async () => {
            const provider = new BearerAuthProvider({
                token: async () => "async-token",
            });
            const result = await provider.getAuthRequest();

            expect(result).toEqual({
                headers: { Authorization: "Bearer async-token" },
            });
        });

        it("should throw ManagementError when token resolves to null", async () => {
            const provider = new BearerAuthProvider({
                token: () => null as any,
            });

            await expect(provider.getAuthRequest()).rejects.toThrow(ManagementError);
            await expect(provider.getAuthRequest()).rejects.toThrow(BearerAuthProvider.AUTH_CONFIG_ERROR_MESSAGE);
        });

        it("should throw ManagementError when token resolves to undefined", async () => {
            const provider = new BearerAuthProvider({
                token: () => undefined as any,
            });

            await expect(provider.getAuthRequest()).rejects.toThrow(ManagementError);
        });

        it("should accept endpointMetadata parameter", async () => {
            const provider = new BearerAuthProvider({ token: "test-token" });
            const result = await provider.getAuthRequest({
                endpointMetadata: { security: [{ bearerAuth: [] }] },
            });

            expect(result.headers.Authorization).toBe("Bearer test-token");
        });

        it("should work with no arguments", async () => {
            const provider = new BearerAuthProvider({ token: "test-token" });
            const result = await provider.getAuthRequest();

            expect(result.headers.Authorization).toBe("Bearer test-token");
        });
    });

    describe("createInstance", () => {
        it("should return an AuthProvider instance", () => {
            const instance = BearerAuthProvider.createInstance({ token: "test-token" });
            expect(instance).toBeInstanceOf(BearerAuthProvider);
        });
    });

    describe("constants", () => {
        it("should expose AUTH_SCHEME", () => {
            expect(BearerAuthProvider.AUTH_SCHEME).toBe("bearerAuth");
        });

        it("should expose AUTH_CONFIG_ERROR_MESSAGE", () => {
            expect(BearerAuthProvider.AUTH_CONFIG_ERROR_MESSAGE).toContain("token");
        });
    });
});
