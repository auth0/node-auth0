import { version } from './version.js';

/**
 * @private
 */
export const generateClientInfo = () => ({
  name: 'node-auth0',
  version: version,
  env: {
    node: process.version.replace('v', ''),
  },
});

/**
 * @private
 */
export const pick = <T, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> =>
  Object.assign({}, ...keys.map((key) => ({ [key]: (object[key] as Function).bind(object) })));
