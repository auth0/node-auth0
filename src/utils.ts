import { version } from './version';

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
