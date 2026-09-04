/**
 * Error thrown when the request is aborted due to a timeout.
 */
export class TimeoutError extends Error {
    override name = "TimeoutError" as const;
    constructor() {
        super("The request was timed out.");
    }
}

/**
 * Error thrown when a required argument was not provided.
 */
export class RequiredError extends Error {
    override name = "RequiredError" as const;
    constructor(
        public field: string,
        msg?: string,
    ) {
        super(msg);
    }
}
