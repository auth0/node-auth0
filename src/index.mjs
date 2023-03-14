import { createRequire } from 'module';
const require = createRequire(import.meta.url);
/**
 * Simple facade for consuming a REST API endpoint.
 *
 * @external RestClient
 * {@link https://github.com/ngonzalvez/rest-facade}
 */
export const ManagementClient = require('./management');
export const AuthenticationClient = require('./auth');
export default { ManagementClient, AuthenticationClient }
