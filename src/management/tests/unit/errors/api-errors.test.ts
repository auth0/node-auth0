import { describe, expect, it } from "@jest/globals";

import { BadRequestError } from "../../../../../src/management/api/errors/BadRequestError";
import { ConflictError } from "../../../../../src/management/api/errors/ConflictError";
import { ContentTooLargeError } from "../../../../../src/management/api/errors/ContentTooLargeError";
import { ForbiddenError } from "../../../../../src/management/api/errors/ForbiddenError";
import { InternalServerError } from "../../../../../src/management/api/errors/InternalServerError";
import { NotFoundError } from "../../../../../src/management/api/errors/NotFoundError";
import { PaymentRequiredError } from "../../../../../src/management/api/errors/PaymentRequiredError";
import { PreconditionFailedError } from "../../../../../src/management/api/errors/PreconditionFailedError";
import { ServiceUnavailableError } from "../../../../../src/management/api/errors/ServiceUnavailableError";
import { TooManyRequestsError } from "../../../../../src/management/api/errors/TooManyRequestsError";
import { UnauthorizedError } from "../../../../../src/management/api/errors/UnauthorizedError";
import { ManagementError } from "../../../../../src/management/errors/ManagementError";
import type { RawResponse } from "../../../../../src/management/core/fetcher/RawResponse";

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

const errorClasses = [
    { ErrorClass: BadRequestError, name: "BadRequestError", statusCode: 400 },
    { ErrorClass: UnauthorizedError, name: "UnauthorizedError", statusCode: 401 },
    { ErrorClass: PaymentRequiredError, name: "PaymentRequiredError", statusCode: 402 },
    { ErrorClass: ForbiddenError, name: "ForbiddenError", statusCode: 403 },
    { ErrorClass: NotFoundError, name: "NotFoundError", statusCode: 404 },
    { ErrorClass: ConflictError, name: "ConflictError", statusCode: 409 },
    { ErrorClass: PreconditionFailedError, name: "PreconditionFailedError", statusCode: 412 },
    { ErrorClass: ContentTooLargeError, name: "ContentTooLargeError", statusCode: 413 },
    { ErrorClass: TooManyRequestsError, name: "TooManyRequestsError", statusCode: 429 },
    { ErrorClass: InternalServerError, name: "InternalServerError", statusCode: 500 },
    { ErrorClass: ServiceUnavailableError, name: "ServiceUnavailableError", statusCode: 503 },
];

describe("API Error Classes", () => {
    for (const { ErrorClass, name, statusCode } of errorClasses) {
        describe(name, () => {
            it("should construct with body and rawResponse", () => {
                const body = { message: "error detail" };
                const rawResponse = createMockRawResponse({ status: statusCode });
                const error = new ErrorClass(body, rawResponse);

                expect(error).toBeInstanceOf(ManagementError);
                expect(error).toBeInstanceOf(Error);
                expect(error.name).toBe(name);
                expect(error.statusCode).toBe(statusCode);
                expect(error.body).toEqual(body);
                expect(error.rawResponse).toBe(rawResponse);
                expect(error.message).toContain(name);
            });

            it("should construct without body and rawResponse", () => {
                const error = new ErrorClass();
                expect(error).toBeInstanceOf(ManagementError);
                expect(error.name).toBe(name);
                expect(error.statusCode).toBe(statusCode);
            });

            it("should have correct prototype chain", () => {
                const error = new ErrorClass();
                expect(error instanceof ErrorClass).toBe(true);
                expect(error instanceof ManagementError).toBe(true);
                expect(error instanceof Error).toBe(true);
            });
        });
    }
});
