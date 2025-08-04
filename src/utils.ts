import { SDK_VERSION as version } from "./management/version.js";
import { RUNTIME } from "./management/core/index.js";

export const generateClientInfo = () => {
    const runtimeType = RUNTIME?.type ?? "unknown";
    const runtimeKey = runtimeType === "workerd" ? "cloudflare-workers" : runtimeType;
    const runtimeVersion = RUNTIME?.version ?? "unknown";

    return {
        name: "node-auth0",
        version,
        env: {
            [runtimeKey]: runtimeVersion,
        },
    };
};

/**
 * @private
 */
export const mtlsPrefix = "mtls";

type SyncGetter<T> = () => T;
type AsyncGetter<T> = () => Promise<T>;
/**
 * Resolves a value that can be a static value, a synchronous function, or an asynchronous function.
 *
 * @template T - The type of the value to be resolved.
 * @param {T | SyncGetter<T> | AsyncGetter<T>} value - The value to be resolved. It can be:
 *   - A static value of type T.
 *   - A synchronous function that returns a value of type T.
 *   - An asynchronous function that returns a Promise of type T.
 * @returns {Promise<T>} A promise that resolves to the value of type T.
 */
export const resolveValueToPromise = async <T>(value: T | SyncGetter<T> | AsyncGetter<T>): Promise<T> => {
    if (typeof value === "function") {
        const result = (value as SyncGetter<T> | AsyncGetter<T>)(); // Call the function
        return result instanceof Promise ? result : Promise.resolve(result); // Handle sync/async
    }
    return Promise.resolve(value); // Static value
};
