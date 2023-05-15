import { ManagementClient as _ManagementClient } from './management';
import { AuthenticationClient as _AuthenticationClient } from './auth';

export const ManagementClient = _ManagementClient;
export const AuthenticationClient = _AuthenticationClient;

export default { ManagementClient, AuthenticationClient };
