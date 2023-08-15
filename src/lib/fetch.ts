import { FetchAPI } from './models.js';

/**
 * @private
 */
export const fetch = (...args: Parameters<FetchAPI>) => globalThis.fetch(...args);

/**
 * @private
 */
export const getFormDataCls = async () => globalThis.FormData;

/**
 * @private
 */
export const getBlobCls = async () => globalThis.Blob;
