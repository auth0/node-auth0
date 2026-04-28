import { TimeoutError } from "./errors.js";

const MAX_REQUEST_RETRY_JITTER = 250;
const MAX_REQUEST_RETRY_DELAY = 10000;
const DEFAULT_NUMBER_RETRIES = 3;
const MAX_NUMBER_RETRIES = 10;
const BASE_DELAY = 500;

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

function calculateWait(nrOfTries: number): number {
    let wait = BASE_DELAY * Math.pow(2, nrOfTries - 1);
    wait = getRandomInt(wait + 1, wait + MAX_REQUEST_RETRY_JITTER);
    return Math.min(wait, MAX_REQUEST_RETRY_DELAY);
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
     * Note: network-level errors (e.g. ECONNRESET) are always retried up to maxRetries,
     * regardless of this setting. Use `enabled: false` to disable all retries.
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
            // All other errors (e.g. ECONNRESET) are transient network failures worth retrying.
            if (!(e instanceof TimeoutError) && nrOfTries < nrOfTriesToAttempt) {
                nrOfTries++;
                await pause(calculateWait(nrOfTries));
                return retryAndWait();
            }
            // only reached when retries exhausted OR it's a TimeoutError
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
