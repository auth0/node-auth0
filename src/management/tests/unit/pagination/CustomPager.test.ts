import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { CustomPager, createCustomPager } from "../../../../../src/management/core/pagination/CustomPager";
import type { APIResponse } from "../../../../../src/management/core/fetcher/APIResponse";
import type { Fetcher } from "../../../../../src/management/core/fetcher/Fetcher";
import type { RawResponse } from "../../../../../src/management/core/fetcher/RawResponse";

interface TestItem {
    id: string;
    name: string;
}

interface TestResponse {
    items: TestItem[];
    total: number;
}

function createMockRawResponse(overrides?: Partial<RawResponse>): RawResponse {
    return {
        headers: new Headers(),
        redirected: false,
        status: 200,
        statusText: "OK",
        type: "basic" as ResponseType,
        url: "https://example.auth0.com/api/v2/test",
        ...overrides,
    };
}

function createMockRequest(page: number = 0): Fetcher.Args {
    return {
        url: `https://example.auth0.com/api/v2/test?page=${page}`,
        method: "GET",
    };
}

describe("CustomPager", () => {
    const mockRawResponse = createMockRawResponse();
    const mockItems: TestItem[] = [
        { id: "1", name: "item1" },
        { id: "2", name: "item2" },
    ];
    const mockResponse: TestResponse = { items: mockItems, total: 4 };
    let mockSendRequest: jest.Mock<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>;

    beforeEach(() => {
        mockSendRequest = jest.fn();
    });

    describe("constructor and properties", () => {
        it("should initialize with provided values", () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: true,
                hasPreviousPage: false,
                nextRequest: createMockRequest(1),
                sendRequest: mockSendRequest,
            });

            expect(pager.data).toEqual(mockItems);
            expect(pager.response).toEqual(mockResponse);
            expect(pager.rawResponse).toBe(mockRawResponse);
        });

        it("should initialize with both nextRequest and previousRequest", () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: true,
                hasPreviousPage: true,
                nextRequest: createMockRequest(2),
                previousRequest: createMockRequest(0),
                sendRequest: mockSendRequest,
            });

            expect(pager.hasNextPage()).toBe(true);
            expect(pager.hasPreviousPage()).toBe(true);
        });
    });

    describe("hasNextPage", () => {
        it("should return true when there is a next page", () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: true,
                hasPreviousPage: false,
                nextRequest: createMockRequest(1),
                sendRequest: mockSendRequest,
            });

            expect(pager.hasNextPage()).toBe(true);
        });

        it("should return false when there is no next page", () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: false,
                sendRequest: mockSendRequest,
            });

            expect(pager.hasNextPage()).toBe(false);
        });
    });

    describe("hasPreviousPage", () => {
        it("should return true when there is a previous page", () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: true,
                previousRequest: createMockRequest(0),
                sendRequest: mockSendRequest,
            });

            expect(pager.hasPreviousPage()).toBe(true);
        });

        it("should return false when there is no previous page", () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: false,
                sendRequest: mockSendRequest,
            });

            expect(pager.hasPreviousPage()).toBe(false);
        });
    });

    describe("getCurrentPage", () => {
        it("should return the current page data", () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: false,
                sendRequest: mockSendRequest,
            });

            expect(pager.getCurrentPage()).toEqual(mockItems);
            expect(pager.getCurrentPage()).toBe(pager.data);
        });

        it("should return empty array when no items", () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: { items: [], total: 0 },
                rawResponse: mockRawResponse,
                items: [],
                hasNextPage: false,
                hasPreviousPage: false,
                sendRequest: mockSendRequest,
            });

            expect(pager.getCurrentPage()).toEqual([]);
        });
    });

    describe("getNextPage", () => {
        it("should throw when hasNextPage is false", async () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: false,
                sendRequest: mockSendRequest,
            });

            await expect(pager.getNextPage()).rejects.toThrow("No next page available");
            expect(mockSendRequest).not.toHaveBeenCalled();
        });

        it("should throw when nextRequest is undefined", async () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: true,
                hasPreviousPage: false,
                sendRequest: mockSendRequest,
            });

            await expect(pager.getNextPage()).rejects.toThrow("No next page available");
            expect(mockSendRequest).not.toHaveBeenCalled();
        });

        it("should throw with HTTP status code on status-code error", async () => {
            const nextRequest = createMockRequest(1);
            mockSendRequest.mockResolvedValue({
                ok: false,
                error: { reason: "status-code", statusCode: 500, body: { error: "Internal Server Error" } },
                rawResponse: createMockRawResponse({ status: 500 }),
            });

            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: true,
                hasPreviousPage: false,
                nextRequest,
                sendRequest: mockSendRequest,
            });

            await expect(pager.getNextPage()).rejects.toThrow("Failed to fetch next page: HTTP 500");
        });

        it("should throw with reason string on timeout error", async () => {
            const nextRequest = createMockRequest(1);
            mockSendRequest.mockResolvedValue({
                ok: false,
                error: { reason: "timeout" },
                rawResponse: createMockRawResponse(),
            });

            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: true,
                hasPreviousPage: false,
                nextRequest,
                sendRequest: mockSendRequest,
            });

            await expect(pager.getNextPage()).rejects.toThrow("Failed to fetch next page: timeout");
        });

        it("should throw with reason string on unknown error", async () => {
            const nextRequest = createMockRequest(1);
            mockSendRequest.mockResolvedValue({
                ok: false,
                error: { reason: "unknown", errorMessage: "Something went wrong" },
                rawResponse: createMockRawResponse(),
            });

            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: true,
                hasPreviousPage: false,
                nextRequest,
                sendRequest: mockSendRequest,
            });

            await expect(pager.getNextPage()).rejects.toThrow("Failed to fetch next page: unknown");
        });

        it("should update state on successful fetch", async () => {
            const nextRequest = createMockRequest(1);
            const nextRawResponse = createMockRawResponse({ url: "https://example.auth0.com/api/v2/test?page=1" });
            const nextResponseBody: TestResponse = { items: [{ id: "3", name: "item3" }], total: 4 };

            mockSendRequest.mockResolvedValue({
                ok: true,
                body: nextResponseBody,
                rawResponse: nextRawResponse,
            });

            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: true,
                hasPreviousPage: false,
                nextRequest,
                sendRequest: mockSendRequest,
            });

            const result = await pager.getNextPage();

            expect(result).toBe(pager);
            expect(pager.response).toBe(nextResponseBody);
            expect(pager.rawResponse).toBe(nextRawResponse);
            // parse() placeholder returns empty items and hasNextPage=false
            expect(pager.data).toEqual([]);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(false);
            expect(mockSendRequest).toHaveBeenCalledWith(nextRequest);
        });
    });

    describe("getPreviousPage", () => {
        it("should throw when hasPreviousPage is false", async () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: false,
                sendRequest: mockSendRequest,
            });

            await expect(pager.getPreviousPage()).rejects.toThrow("No previous page available");
            expect(mockSendRequest).not.toHaveBeenCalled();
        });

        it("should throw when previousRequest is undefined", async () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: true,
                sendRequest: mockSendRequest,
            });

            await expect(pager.getPreviousPage()).rejects.toThrow("No previous page available");
            expect(mockSendRequest).not.toHaveBeenCalled();
        });

        it("should throw with HTTP status code on status-code error", async () => {
            const previousRequest = createMockRequest(0);
            mockSendRequest.mockResolvedValue({
                ok: false,
                error: { reason: "status-code", statusCode: 403, body: { error: "Forbidden" } },
                rawResponse: createMockRawResponse({ status: 403 }),
            });

            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: true,
                previousRequest,
                sendRequest: mockSendRequest,
            });

            await expect(pager.getPreviousPage()).rejects.toThrow("Failed to fetch previous page: HTTP 403");
        });

        it("should throw with reason string on non-json error", async () => {
            const previousRequest = createMockRequest(0);
            mockSendRequest.mockResolvedValue({
                ok: false,
                error: { reason: "non-json", statusCode: 200, rawBody: "<html>" },
                rawResponse: createMockRawResponse(),
            });

            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: true,
                previousRequest,
                sendRequest: mockSendRequest,
            });

            await expect(pager.getPreviousPage()).rejects.toThrow("Failed to fetch previous page: non-json");
        });

        it("should update state on successful fetch", async () => {
            const previousRequest = createMockRequest(0);
            const prevRawResponse = createMockRawResponse({ url: "https://example.auth0.com/api/v2/test?page=0" });
            const prevResponseBody: TestResponse = { items: [{ id: "0", name: "item0" }], total: 4 };

            mockSendRequest.mockResolvedValue({
                ok: true,
                body: prevResponseBody,
                rawResponse: prevRawResponse,
            });

            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: true,
                previousRequest,
                sendRequest: mockSendRequest,
            });

            const result = await pager.getPreviousPage();

            expect(result).toBe(pager);
            expect(pager.response).toBe(prevResponseBody);
            expect(pager.rawResponse).toBe(prevRawResponse);
            expect(pager.data).toEqual([]);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(false);
            expect(mockSendRequest).toHaveBeenCalledWith(previousRequest);
        });
    });

    describe("AsyncIterable (Symbol.asyncIterator)", () => {
        it("should iterate over items on the current page when no next page", async () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                items: mockItems,
                hasNextPage: false,
                hasPreviousPage: false,
                sendRequest: mockSendRequest,
            });

            const collected: TestItem[] = [];
            for await (const item of pager) {
                collected.push(item);
            }

            expect(collected).toEqual(mockItems);
            expect(mockSendRequest).not.toHaveBeenCalled();
        });

        it("should iterate across multiple pages", async () => {
            const page1Items: TestItem[] = [{ id: "1", name: "item1" }];
            const nextRequest = createMockRequest(1);

            mockSendRequest.mockResolvedValue({
                ok: true,
                body: { items: [], total: 1 },
                rawResponse: createMockRawResponse(),
            });

            const pager = new CustomPager<TestItem, TestResponse>({
                response: { items: page1Items, total: 2 },
                rawResponse: mockRawResponse,
                items: page1Items,
                hasNextPage: true,
                hasPreviousPage: false,
                nextRequest,
                sendRequest: mockSendRequest,
            });

            const collected: TestItem[] = [];
            for await (const item of pager) {
                collected.push(item);
            }

            // First page yields page1Items, then getNextPage called, parse() returns []
            expect(collected).toEqual(page1Items);
            expect(mockSendRequest).toHaveBeenCalledTimes(1);
        });

        it("should handle empty initial page", async () => {
            const pager = new CustomPager<TestItem, TestResponse>({
                response: { items: [], total: 0 },
                rawResponse: mockRawResponse,
                items: [],
                hasNextPage: false,
                hasPreviousPage: false,
                sendRequest: mockSendRequest,
            });

            const collected: TestItem[] = [];
            for await (const item of pager) {
                collected.push(item);
            }

            expect(collected).toEqual([]);
        });
    });
});

describe("createCustomPager", () => {
    let mockSendRequest: jest.Mock<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>;
    const mockRawResponse = createMockRawResponse();

    beforeEach(() => {
        mockSendRequest = jest.fn();
    });

    it("should create a pager from a successful initial request", async () => {
        const initialRequest = createMockRequest(0);
        const responseBody: TestResponse = { items: [{ id: "1", name: "item1" }], total: 1 };

        mockSendRequest.mockResolvedValue({
            ok: true,
            body: responseBody,
            rawResponse: mockRawResponse,
        });

        const pager = await createCustomPager<TestItem, TestResponse>({
            sendRequest: mockSendRequest,
            initialHttpRequest: initialRequest,
            clientOptions: { logging: { level: "off" } } as any,
        });

        expect(pager).toBeInstanceOf(CustomPager);
        expect(pager.response).toBe(responseBody);
        expect(pager.rawResponse).toBe(mockRawResponse);
        expect(pager.data).toEqual([]);
        expect(pager.hasNextPage()).toBe(false);
        expect(pager.hasPreviousPage()).toBe(false);
    });

    it("should throw on status-code error", async () => {
        mockSendRequest.mockResolvedValue({
            ok: false,
            error: { reason: "status-code", statusCode: 401, body: { error: "Unauthorized" } },
            rawResponse: createMockRawResponse({ status: 401 }),
        });

        await expect(
            createCustomPager<TestItem, TestResponse>({
                sendRequest: mockSendRequest,
                initialHttpRequest: createMockRequest(0),
                clientOptions: { logging: { level: "off" } } as any,
            }),
        ).rejects.toThrow("Failed to fetch initial page: HTTP 401");
    });

    it("should throw on timeout error", async () => {
        mockSendRequest.mockResolvedValue({
            ok: false,
            error: { reason: "timeout" },
            rawResponse: createMockRawResponse(),
        });

        await expect(
            createCustomPager<TestItem, TestResponse>({
                sendRequest: mockSendRequest,
                initialHttpRequest: createMockRequest(0),
                clientOptions: { logging: { level: "off" } } as any,
            }),
        ).rejects.toThrow("Failed to fetch initial page: timeout");
    });

    it("should throw on unknown error", async () => {
        mockSendRequest.mockResolvedValue({
            ok: false,
            error: { reason: "unknown", errorMessage: "Network failure" },
            rawResponse: createMockRawResponse(),
        });

        await expect(
            createCustomPager<TestItem, TestResponse>({
                sendRequest: mockSendRequest,
                initialHttpRequest: createMockRequest(0),
                clientOptions: { logging: { level: "off" } } as any,
            }),
        ).rejects.toThrow("Failed to fetch initial page: unknown");
    });

    it("should throw on non-json error", async () => {
        mockSendRequest.mockResolvedValue({
            ok: false,
            error: { reason: "non-json", statusCode: 502, rawBody: "<html>Bad Gateway</html>" },
            rawResponse: createMockRawResponse({ status: 502 }),
        });

        await expect(
            createCustomPager<TestItem, TestResponse>({
                sendRequest: mockSendRequest,
                initialHttpRequest: createMockRequest(0),
                clientOptions: { logging: { level: "off" } } as any,
            }),
        ).rejects.toThrow("Failed to fetch initial page: non-json");
    });
});
