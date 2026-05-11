import { TimeoutError } from "./errors.js";

const MAX_REQUEST_RETRY_JITTER = 250;
const MAX_REQUEST_RETRY_DELAY = 10000;
const DEFAULT_NUMBER_RETRIES = 3;
const MAX_NUMBER_RETRIES = 10;
const BASE_DELAY = 500;

// Transient network errors that are safe to retry — failures that can self-heal
// without any config change (socket reset, broken pipe, aborted connection).
// Deliberately excludes ENOTFOUND, ECONNREFUSED, cert errors — those won't self-heal.
const RETRYABLE_ERROR_CODES = new Set(["ECONNRESET", "EPIPE", "ECONNABORTED"]);

function isRetryableNetworkError(e: unknown): boolean {
    if (typeof e !== "object" || e === null) return false;
    const code = (e as NodeJS.ErrnoException).code ?? "";
    return RETRYABLE_ERROR_CODES.has(code);
}

function calculateWait(nrOfTries: number): number {
    let wait = BASE_DELAY * Math.pow(2, nrOfTries - 1);
    wait = getRandomInt(wait + 1, wait + MAX_REQUEST_RETRY_JITTER);
    return Math.min(wait, MAX_REQUEST_RETRY_DELAY);
}

/**
 * @private
 * Function that returns a random int between a configurable min and max.
 * @param min The min value
 * @param max  The max value
 * @returns {number} The random generated value
 */
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

/**
 * @private
 * Function that returns a promise which resolves after a configurable amount of milliseconds
 * @param delay value to be used for the delay
 * @returns {Promise} A delayed promise
 */
async function pause(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Configure the retry logic for http calls.
 * By default, this retries any request that returns a 429 3 times.
 */
export interface RetryConfiguration {
    /**
     * Configure the usage of retries.
     * Defaults to true on the Management Client and false on the Authentication Client.
     */
    enabled?: boolean;
    /**
     * Configure the max amount of retries the SDK should do.
     * Defaults to 5.
     */
    maxRetries?: number;
    /**
     * HTTP Status Codes on which the SDK should trigger retries.
     * Note: transient network errors (ECONNRESET, EPIPE, ECONNABORTED) are always retried
     * up to maxRetries regardless of this setting. Use `enabled: false` to disable all retries.
     * Defaults to [429].
     */
    retryWhen?: number[];
}

/**
 * @private
 * Function that retries the provided action callback for a configurable amount of time, defaults to 3.
 */
export function retry(action: () => Promise<Response>, { maxRetries, retryWhen }: RetryConfiguration) {
    const nrOfTriesToAttempt = Math.min(MAX_NUMBER_RETRIES, maxRetries ?? DEFAULT_NUMBER_RETRIES);
    let nrOfTries = 0;

    const retryAndWait = async (): Promise<Response> => {
        let result: Response;

        try {
            result = await action();
        } catch (e: unknown) {
            if (e instanceof TimeoutError) {
                throw e;
            }
            if (isRetryableNetworkError(e) && nrOfTries < nrOfTriesToAttempt) {
                nrOfTries++;
                await pause(calculateWait(nrOfTries));
                return retryAndWait();
            }
            throw e;
        }

        if ((retryWhen || [429]).includes(result.status) && nrOfTries < nrOfTriesToAttempt) {
            nrOfTries++;
            await pause(calculateWait(nrOfTries));

            result = await retryAndWait();
        }

        return result;
    };

    return retryAndWait();
}
