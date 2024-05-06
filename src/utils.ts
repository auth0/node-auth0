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
export const mtlsPrefix = 'mtls';
