import { Response } from 'node-fetch';

const MAX_REQUEST_RETRY_JITTER = 250;
const MAX_REQUEST_RETRY_DELAY = 1000;
const MIN_REQUEST_RETRY_DELAY = 250;
const DEFAULT_NUMBER_RETRIES = 3;
const MAX_NUMBER_RETRIES = 10;
const BASE_DELAY = 250;

/**
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
 * @private
 * Function that retries the provided action callback for a configurable amount of time, defaults to 3.
 */
export function retry(action: () => Promise<Response>, { maxRetries }: { maxRetries?: number }) {
  const nrOfTriesToAttempt = Math.min(MAX_NUMBER_RETRIES, maxRetries ?? DEFAULT_NUMBER_RETRIES);
  let nrOfTries = 0;

  const retryAndWait = async () => {
    let result: Response;

    result = await action();

    if (result.status === 429 && nrOfTries < nrOfTriesToAttempt) {
      nrOfTries++;

      let wait = BASE_DELAY * Math.pow(2, nrOfTries - 1);
      wait = getRandomInt(wait + 1, wait + MAX_REQUEST_RETRY_JITTER);
      wait = Math.min(wait, MAX_REQUEST_RETRY_DELAY);
      wait = Math.max(wait, MIN_REQUEST_RETRY_DELAY);

      await pause(wait);

      result = await retryAndWait();
    }

    return result;
  };

  return retryAndWait();
}
