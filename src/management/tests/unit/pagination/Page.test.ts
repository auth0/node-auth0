import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { Page } from "../../../../../src/management/core/pagination/Page";
import { HttpResponsePromise } from "../../../../../src/management/core/fetcher/HttpResponsePromise";
import type { RawResponse } from "../../../../../src/management/core/fetcher/RawResponse";

interface TestItem {
    id: string;
}

interface TestResponse {
    items: TestItem[];
    nextToken?: string;
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

describe("Page", () => {
    const mockRawResponse = createMockRawResponse();
    const mockItems: TestItem[] = [{ id: "1" }, { id: "2" }];
    const mockResponse: TestResponse = { items: mockItems, nextToken: "abc" };

    let mockGetItems: jest.Mock<(response: TestResponse) => TestItem[]>;
    let mockHasNextPage: jest.Mock<(response: TestResponse) => boolean>;
    let mockLoadPage: jest.Mock<(response: TestResponse) => HttpResponsePromise<TestResponse>>;

    beforeEach(() => {
        mockGetItems = jest.fn((r: TestResponse) => r.items);
        mockHasNextPage = jest.fn((r: TestResponse) => r.nextToken != null);
        mockLoadPage = jest.fn();
    });

    describe("constructor", () => {
        it("should initialize with provided values", () => {
            const page = new Page<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                hasNextPage: mockHasNextPage,
                getItems: mockGetItems,
                loadPage: mockLoadPage,
            });

            expect(page.data).toEqual(mockItems);
            expect(page.response).toBe(mockResponse);
            expect(page.rawResponse).toBe(mockRawResponse);
            expect(mockGetItems).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe("hasNextPage", () => {
        it("should return true when callback returns true", () => {
            const page = new Page<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                hasNextPage: mockHasNextPage,
                getItems: mockGetItems,
                loadPage: mockLoadPage,
            });

            expect(page.hasNextPage()).toBe(true);
            expect(mockHasNextPage).toHaveBeenCalledWith(mockResponse);
        });

        it("should return false when callback returns false", () => {
            const responseNoNext: TestResponse = { items: mockItems };
            const page = new Page<TestItem, TestResponse>({
                response: responseNoNext,
                rawResponse: mockRawResponse,
                hasNextPage: mockHasNextPage,
                getItems: mockGetItems,
                loadPage: mockLoadPage,
            });

            expect(page.hasNextPage()).toBe(false);
        });
    });

    describe("getNextPage", () => {
        it("should fetch next page and update state", async () => {
            const nextItems: TestItem[] = [{ id: "3" }, { id: "4" }];
            const nextResponse: TestResponse = { items: nextItems };
            const nextRawResponse = createMockRawResponse({ url: "https://example.auth0.com/api/v2/test?page=1" });

            mockLoadPage.mockReturnValue(
                HttpResponsePromise.fromResult({
                    data: nextResponse,
                    rawResponse: nextRawResponse,
                }),
            );

            const page = new Page<TestItem, TestResponse>({
                response: mockResponse,
                rawResponse: mockRawResponse,
                hasNextPage: mockHasNextPage,
                getItems: mockGetItems,
                loadPage: mockLoadPage,
            });

            const result = await page.getNextPage();

            expect(result).toBe(page);
            expect(page.response).toBe(nextResponse);
            expect(page.rawResponse).toBe(nextRawResponse);
            expect(page.data).toEqual(nextItems);
            expect(mockLoadPage).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe("AsyncIterable (Symbol.asyncIterator)", () => {
        it("should iterate over items on a single page", async () => {
            const responseNoNext: TestResponse = { items: mockItems };
            const page = new Page<TestItem, TestResponse>({
                response: responseNoNext,
                rawResponse: mockRawResponse,
                hasNextPage: mockHasNextPage,
                getItems: mockGetItems,
                loadPage: mockLoadPage,
            });

            const collected: TestItem[] = [];
            for await (const item of page) {
                collected.push(item);
            }

            expect(collected).toEqual(mockItems);
            expect(mockLoadPage).not.toHaveBeenCalled();
        });

        it("should iterate across multiple pages", async () => {
            const page1Items: TestItem[] = [{ id: "1" }];
            const page1Response: TestResponse = { items: page1Items, nextToken: "tok" };
            const page2Items: TestItem[] = [{ id: "2" }];
            const page2Response: TestResponse = { items: page2Items };

            // hasNextPage returns true for first response, false for second
            const hasNext = jest.fn<(r: TestResponse) => boolean>().mockImplementation((r) => r.nextToken != null);
            const getItems = jest.fn<(r: TestResponse) => TestItem[]>().mockImplementation((r) => r.items);

            mockLoadPage.mockReturnValue(
                HttpResponsePromise.fromResult({
                    data: page2Response,
                    rawResponse: createMockRawResponse(),
                }),
            );

            const page = new Page<TestItem, TestResponse>({
                response: page1Response,
                rawResponse: mockRawResponse,
                hasNextPage: hasNext,
                getItems: getItems,
                loadPage: mockLoadPage,
            });

            const collected: TestItem[] = [];
            for await (const item of page) {
                collected.push(item);
            }

            expect(collected).toEqual([...page1Items, ...page2Items]);
            expect(mockLoadPage).toHaveBeenCalledTimes(1);
        });

        it("should handle empty page", async () => {
            const emptyResponse: TestResponse = { items: [] };
            const page = new Page<TestItem, TestResponse>({
                response: emptyResponse,
                rawResponse: mockRawResponse,
                hasNextPage: mockHasNextPage,
                getItems: mockGetItems,
                loadPage: mockLoadPage,
            });

            const collected: TestItem[] = [];
            for await (const item of page) {
                collected.push(item);
            }

            expect(collected).toEqual([]);
        });
    });
});
