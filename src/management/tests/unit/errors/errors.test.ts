import { describe, expect, it } from "@jest/globals";

import { ManagementError } from "../../../../../src/management/errors/ManagementError";
import { ManagementTimeoutError } from "../../../../../src/management/errors/ManagementTimeoutError";
import { handleNonStatusCodeError } from "../../../../../src/management/errors/handleNonStatusCodeError";
import type { RawResponse } from "../../../../../src/management/core/fetcher/RawResponse";
import type { Fetcher } from "../../../../../src/management/core/fetcher/Fetcher";

function createMockRawResponse(overrides?: Partial<RawResponse>): RawResponse {
    return {
        headers: new Headers(),
        redirected: false,
        status: 200,
        statusText: "OK",
        type: "basic" as ResponseType,
        url: "https://example.auth0.com",
        ...overrides,
    };
}

describe("ManagementError", () => {
    it("should construct with message only", () => {
        const error = new ManagementError({ message: "Something went wrong" });
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ManagementError);
        expect(error.message).toBe("Something went wrong");
        expect(error.name).toBe("ManagementError");
        expect(error.statusCode).toBeUndefined();
        expect(error.body).toBeUndefined();
        expect(error.rawResponse).toBeUndefined();
    });

    it("should construct with statusCode only", () => {
        const error = new ManagementError({ statusCode: 404 });
        expect(error.message).toBe("Status code: 404");
        expect(error.statusCode).toBe(404);
    });

    it("should construct with body only", () => {
        const body = { error: "not found" };
        const error = new ManagementError({ body });
        expect(error.message).toContain('"error": "not found"');
        expect(error.body).toBe(body);
    });

    it("should construct with all properties", () => {
        const rawResponse = createMockRawResponse({ status: 500 });
        const body = { detail: "internal error" };
        const error = new ManagementError({
            message: "Server error",
            statusCode: 500,
            body,
            rawResponse,
        });

        expect(error.message).toContain("Server error");
        expect(error.message).toContain("Status code: 500");
        expect(error.message).toContain('"detail": "internal error"');
        expect(error.statusCode).toBe(500);
        expect(error.body).toBe(body);
        expect(error.rawResponse).toBe(rawResponse);
    });

    it("should construct with empty options", () => {
        const error = new ManagementError({});
        expect(error.message).toBe("");
        expect(error.name).toBe("ManagementError");
    });

    it("should have correct prototype chain", () => {
        const error = new ManagementError({ message: "test" });
        expect(error instanceof ManagementError).toBe(true);
        expect(error instanceof Error).toBe(true);
    });
});

describe("ManagementTimeoutError", () => {
    it("should construct with message", () => {
        const error = new ManagementTimeoutError("Timeout exceeded when calling GET /users.");
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ManagementTimeoutError);
        expect(error.message).toBe("Timeout exceeded when calling GET /users.");
        expect(error.name).toBe("ManagementTimeoutError");
    });

    it("should have correct prototype chain", () => {
        const error = new ManagementTimeoutError("timeout");
        expect(error instanceof ManagementTimeoutError).toBe(true);
        expect(error instanceof Error).toBe(true);
    });
});

describe("handleNonStatusCodeError", () => {
    const mockRawResponse = createMockRawResponse();

    it("should throw ManagementError for non-json error", () => {
        const error: Fetcher.Error = {
            reason: "non-json",
            statusCode: 502,
            rawBody: "<html>Bad Gateway</html>",
        };

        expect(() => handleNonStatusCodeError(error, mockRawResponse, "GET", "/users")).toThrow(ManagementError);
        try {
            handleNonStatusCodeError(error, mockRawResponse, "GET", "/users");
        } catch (e: any) {
            expect(e.statusCode).toBe(502);
            expect(e.body).toBe("<html>Bad Gateway</html>");
            expect(e.rawResponse).toBe(mockRawResponse);
        }
    });

    it("should throw ManagementError for body-is-null error", () => {
        const error: Fetcher.Error = {
            reason: "body-is-null",
            statusCode: 204,
        };

        expect(() => handleNonStatusCodeError(error, mockRawResponse, "DELETE", "/users/123")).toThrow(ManagementError);
        try {
            handleNonStatusCodeError(error, mockRawResponse, "DELETE", "/users/123");
        } catch (e: any) {
            expect(e.statusCode).toBe(204);
            expect(e.rawResponse).toBe(mockRawResponse);
        }
    });

    it("should throw ManagementTimeoutError for timeout error", () => {
        const error: Fetcher.Error = {
            reason: "timeout",
        };

        expect(() => handleNonStatusCodeError(error, mockRawResponse, "POST", "/users")).toThrow(
            ManagementTimeoutError,
        );
        try {
            handleNonStatusCodeError(error, mockRawResponse, "POST", "/users");
        } catch (e: any) {
            expect(e.message).toBe("Timeout exceeded when calling POST /users.");
        }
    });

    it("should throw ManagementError for unknown error", () => {
        const error: Fetcher.Error = {
            reason: "unknown",
            errorMessage: "Network failure",
        };

        expect(() => handleNonStatusCodeError(error, mockRawResponse, "PUT", "/roles")).toThrow(ManagementError);
        try {
            handleNonStatusCodeError(error, mockRawResponse, "PUT", "/roles");
        } catch (e: any) {
            expect(e.message).toContain("Network failure");
        }
    });

    it("should throw ManagementError for unrecognized error reason", () => {
        const error = { reason: "something-else" } as any;

        expect(() => handleNonStatusCodeError(error, mockRawResponse, "GET", "/test")).toThrow(ManagementError);
        try {
            handleNonStatusCodeError(error, mockRawResponse, "GET", "/test");
        } catch (e: any) {
            expect(e.message).toContain("Unknown error");
        }
    });
});
