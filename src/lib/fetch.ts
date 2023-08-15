import { FetchAPI } from './models.js';

/**
 * @private
 */
export const fetch = (...args: Parameters<FetchAPI>) =>
  (globalThis.fetch && globalThis.fetch(...args)) ||
  import('node-fetch').then(({ default: fetch }) => (fetch as FetchAPI)(...args));

/**
 * @private
 */
export const getFormDataCls = async () =>
  globalThis.FormData || import('node-fetch').then(({ FormData }) => FormData);

/**
 * @private
 */
export const getBlobCls = async () =>
  globalThis.Blob || import('node-fetch').then(({ Blob }) => Blob);
