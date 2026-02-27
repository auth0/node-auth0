import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import type { RawResponse } from "../../../../../src/management/core/fetcher/RawResponse";
import type { APIResponse } from "../../../../../src/management/core/fetcher/APIResponse";
import type { Fetcher } from "../../../../../src/management/core/fetcher/Fetcher";

// Mock the fetcher at the core level
const mockFetcher = jest.fn<(args: Fetcher.Args) => Promise<APIResponse<unknown, Fetcher.Error>>>();

jest.mock("../../../core/index.js", () => {
    const actual = jest.requireActual("../../../core/index.js") as any;
    return {
        ...actual,
        fetcher: mockFetcher,
    };
});

import { UsersImportsClient } from "../../../../../src/management/api/resources/jobs/resources/usersImports/client/Client";
import { BadRequestError } from "../../../../../src/management/api/errors/BadRequestError";
import { UnauthorizedError } from "../../../../../src/management/api/errors/UnauthorizedError";
import { ForbiddenError } from "../../../../../src/management/api/errors/ForbiddenError";
import { ContentTooLargeError } from "../../../../../src/management/api/errors/ContentTooLargeError";
import { TooManyRequestsError } from "../../../../../src/management/api/errors/TooManyRequestsError";
import { InternalServerError } from "../../../../../src/management/api/errors/InternalServerError";
import { ManagementError } from "../../../../../src/management/errors/ManagementError";
import { ManagementTimeoutError } from "../../../../../src/management/errors/ManagementTimeoutError";

function createMockRawResponse(overrides?: Partial<RawResponse>): RawResponse {
    return {
        headers: new Headers(),
        redirected: false,
        status: 200,
        statusText: "OK",
        type: "basic" as ResponseType,
        url: "https://test.auth0.com/jobs/users-imports",
        ...overrides,
    };
}

describe("UsersImportsClient", () => {
    let client: UsersImportsClient;

    beforeEach(() => {
        jest.clearAllMocks();
        client = new UsersImportsClient({
            token: "test-token",
            baseUrl: "https://test.auth0.com/api/v2",
        });
    });

    describe("create", () => {
        const createRequest = () => ({
            users: Buffer.from(JSON.stringify([{ email: "test@example.com" }])),
            connection_id: "con_123",
        });

        it("should successfully create an import job", async () => {
            const responseBody = {
                status: "pending",
                type: "users_import",
                created_at: "2024-01-01T00:00:00.000Z",
                id: "job_123",
                connection_id: "con_123",
            };

            mockFetcher.mockResolvedValue({
                ok: true,
                body: responseBody,
                rawResponse: createMockRawResponse(),
            });

            const result = await client.create(createRequest());
            expect(result).toEqual(responseBody);
        });

        it("should pass optional upsert parameter", async () => {
            mockFetcher.mockResolvedValue({
                ok: true,
                body: { status: "pending", type: "users_import", created_at: "", id: "job_1", connection_id: "con_1" },
                rawResponse: createMockRawResponse(),
            });

            await client.create({
                ...createRequest(),
                upsert: true,
            });

            expect(mockFetcher).toHaveBeenCalled();
        });

        it("should pass optional external_id parameter", async () => {
            mockFetcher.mockResolvedValue({
                ok: true,
                body: { status: "pending", type: "users_import", created_at: "", id: "job_1", connection_id: "con_1" },
                rawResponse: createMockRawResponse(),
            });

            await client.create({
                ...createRequest(),
                external_id: "ext_123",
            });

            expect(mockFetcher).toHaveBeenCalled();
        });

        it("should pass optional send_completion_email parameter", async () => {
            mockFetcher.mockResolvedValue({
                ok: true,
                body: { status: "pending", type: "users_import", created_at: "", id: "job_1", connection_id: "con_1" },
                rawResponse: createMockRawResponse(),
            });

            await client.create({
                ...createRequest(),
                send_completion_email: false,
            });

            expect(mockFetcher).toHaveBeenCalled();
        });

        it("should pass all optional parameters together", async () => {
            mockFetcher.mockResolvedValue({
                ok: true,
                body: { status: "pending", type: "users_import", created_at: "", id: "job_1", connection_id: "con_1" },
                rawResponse: createMockRawResponse(),
            });

            await client.create({
                ...createRequest(),
                upsert: true,
                external_id: "ext_456",
                send_completion_email: true,
            });

            expect(mockFetcher).toHaveBeenCalled();
        });

        it("should throw BadRequestError on 400", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "status-code", statusCode: 400, body: { message: "Bad request" } },
                rawResponse: createMockRawResponse({ status: 400 }),
            });

            await expect(client.create(createRequest())).rejects.toThrow(BadRequestError);
        });

        it("should throw UnauthorizedError on 401", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "status-code", statusCode: 401, body: { message: "Unauthorized" } },
                rawResponse: createMockRawResponse({ status: 401 }),
            });

            await expect(client.create(createRequest())).rejects.toThrow(UnauthorizedError);
        });

        it("should throw ForbiddenError on 403", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "status-code", statusCode: 403, body: { message: "Forbidden" } },
                rawResponse: createMockRawResponse({ status: 403 }),
            });

            await expect(client.create(createRequest())).rejects.toThrow(ForbiddenError);
        });

        it("should throw ContentTooLargeError on 413", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "status-code", statusCode: 413, body: { message: "Content too large" } },
                rawResponse: createMockRawResponse({ status: 413 }),
            });

            await expect(client.create(createRequest())).rejects.toThrow(ContentTooLargeError);
        });

        it("should throw TooManyRequestsError on 429", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "status-code", statusCode: 429, body: { message: "Rate limited" } },
                rawResponse: createMockRawResponse({ status: 429 }),
            });

            await expect(client.create(createRequest())).rejects.toThrow(TooManyRequestsError);
        });

        it("should throw InternalServerError on 500", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "status-code", statusCode: 500, body: { message: "Internal error" } },
                rawResponse: createMockRawResponse({ status: 500 }),
            });

            await expect(client.create(createRequest())).rejects.toThrow(InternalServerError);
        });

        it("should throw ManagementError on unrecognized status code", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "status-code", statusCode: 422, body: { message: "Unprocessable" } },
                rawResponse: createMockRawResponse({ status: 422 }),
            });

            await expect(client.create(createRequest())).rejects.toThrow(ManagementError);
        });

        it("should throw ManagementError on non-json error", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "non-json", statusCode: 502, rawBody: "<html>Bad Gateway</html>" },
                rawResponse: createMockRawResponse({ status: 502 }),
            });

            await expect(client.create(createRequest())).rejects.toThrow(ManagementError);
        });

        it("should throw ManagementTimeoutError on timeout", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "timeout" },
                rawResponse: createMockRawResponse(),
            });

            await expect(client.create(createRequest())).rejects.toThrow(ManagementTimeoutError);
        });

        it("should throw ManagementError on unknown error", async () => {
            mockFetcher.mockResolvedValue({
                ok: false,
                error: { reason: "unknown", errorMessage: "Network failure" },
                rawResponse: createMockRawResponse(),
            });

            await expect(client.create(createRequest())).rejects.toThrow(ManagementError);
        });

        it("should support withRawResponse", async () => {
            const rawResponse = createMockRawResponse();
            const responseBody = {
                status: "pending",
                type: "users_import",
                created_at: "2024-01-01T00:00:00.000Z",
                id: "job_123",
                connection_id: "con_123",
            };

            mockFetcher.mockResolvedValue({
                ok: true,
                body: responseBody,
                rawResponse,
            });

            const result = await client.create(createRequest()).withRawResponse();
            expect(result.data).toEqual(responseBody);
            expect(result.rawResponse).toBe(rawResponse);
        });

        it("should respect requestOptions timeout", async () => {
            mockFetcher.mockResolvedValue({
                ok: true,
                body: { status: "pending", type: "users_import", created_at: "", id: "job_1", connection_id: "con_1" },
                rawResponse: createMockRawResponse(),
            });

            await client.create(createRequest(), { timeoutInSeconds: 120 });

            expect(mockFetcher).toHaveBeenCalledWith(
                expect.objectContaining({
                    timeoutMs: 120000,
                }),
            );
        });
    });
});
