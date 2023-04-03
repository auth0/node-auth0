/**
 * Simple facade for consuming a REST API endpoint.
 *
 * @external RestClient
 * {@link https://github.com/ngonzalvez/rest-facade}
 */

import { ManagementClient as _ManagementClient } from './management';
import { AuthenticationClient as _AuthenticationClient } from './auth';

export const ManagementClient = _ManagementClient;
export const AuthenticationClient = _AuthenticationClient;

export default { ManagementClient, AuthenticationClient };
