import pkg from '../package.json' assert { type: 'json' };

/**
 * @private
 */
export const generateClientInfo = () => ({
  name: 'node-auth0',
  version: pkg.version,
  env: {
    node: process.version.replace('v', ''),
  },
});
