import { describe, expect, it } from "@jest/globals";

import { mergeHeaders, mergeOnlyDefinedHeaders } from "../../../../../src/management/core/headers";

describe("mergeHeaders", () => {
    it("should merge multiple header objects", () => {
        const result = mergeHeaders({ "Content-Type": "application/json" }, { Authorization: "Bearer token" });

        expect(result).toEqual({
            "content-type": "application/json",
            authorization: "Bearer token",
        });
    });

    it("should handle case-insensitive merging", () => {
        const result = mergeHeaders({ "Content-Type": "text/plain" }, { "content-type": "application/json" });

        expect(result).toEqual({ "content-type": "application/json" });
    });

    it("should skip null and undefined header objects", () => {
        const result = mergeHeaders(null, { "X-Custom": "value" }, undefined);

        expect(result).toEqual({ "x-custom": "value" });
    });

    it("should delete header when value is null", () => {
        const result = mergeHeaders({ Authorization: "Bearer token", "X-Custom": "value" }, { Authorization: null });

        expect(result).not.toHaveProperty("authorization");
        expect(result).toEqual({ "x-custom": "value" });
    });

    it("should delete header when value is undefined", () => {
        const result = mergeHeaders({ Authorization: "Bearer token" }, { Authorization: undefined });

        expect(result).not.toHaveProperty("authorization");
    });

    it("should return empty object when no headers provided", () => {
        const result = mergeHeaders();
        expect(result).toEqual({});
    });

    it("should return empty object when all inputs are null", () => {
        const result = mergeHeaders(null, null, undefined);
        expect(result).toEqual({});
    });

    it("should handle later values overriding earlier ones", () => {
        const result = mergeHeaders({ "X-Version": "1" }, { "X-Version": "2" }, { "X-Version": "3" });

        expect(result).toEqual({ "x-version": "3" });
    });
});

describe("mergeOnlyDefinedHeaders", () => {
    it("should merge defined header values", () => {
        const result = mergeOnlyDefinedHeaders(
            { "Content-Type": "application/json" },
            { Authorization: "Bearer token" },
        );

        expect(result).toEqual({
            "content-type": "application/json",
            authorization: "Bearer token",
        });
    });

    it("should skip null values (not delete existing)", () => {
        const result = mergeOnlyDefinedHeaders(
            { Authorization: "Bearer token", "X-Custom": "value" },
            { Authorization: null },
        );

        // Unlike mergeHeaders, null values don't delete existing keys
        expect(result).toEqual({
            authorization: "Bearer token",
            "x-custom": "value",
        });
    });

    it("should skip undefined values", () => {
        const result = mergeOnlyDefinedHeaders({ "X-Custom": "value" }, { "X-Custom": undefined });

        expect(result).toEqual({ "x-custom": "value" });
    });

    it("should handle case-insensitive merging", () => {
        const result = mergeOnlyDefinedHeaders(
            { "CONTENT-TYPE": "text/plain" },
            { "content-type": "application/json" },
        );

        expect(result).toEqual({ "content-type": "application/json" });
    });

    it("should skip null and undefined header objects", () => {
        const result = mergeOnlyDefinedHeaders(null, { "X-Custom": "value" }, undefined);

        expect(result).toEqual({ "x-custom": "value" });
    });

    it("should return empty object when no headers provided", () => {
        const result = mergeOnlyDefinedHeaders();
        expect(result).toEqual({});
    });
});
