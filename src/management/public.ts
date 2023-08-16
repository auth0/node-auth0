import { ManagementClientOptionsWithToken } from './management-client-options.js';
import { DeviceCredentialsManager, UsersManager } from './__generated/index.js';
import { TelemetryMiddleware } from '../lib/middleware/telemetry-middleware.js';
import { parseError } from './errors.js';
import { pick } from '../utils.js';

/**
 * This contains all the things you can do on the Management API from a Public Client.
 *
 * See https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-tokens-for-single-page-applications
 */
export class PublicManagementClient {
  public users: Pick<
    UsersManager,
    'get' | 'getEnrollments' | 'link' | 'unlink' | 'update' | 'deleteMultifactorProvider'
  >;
  public deviceCredentials: Pick<DeviceCredentialsManager, 'createPublicKey' | 'delete'>;
  constructor(options: ManagementClientOptionsWithToken) {
    const opts = {
      ...options,
      baseUrl: `https://${options.domain}/api/v2`,
      middleware: [
        ...(options.middleware || []),
        ...(options.telemetry !== false ? [new TelemetryMiddleware(options)] : []),
      ],
      parseError,
    };
    this.users = pick(
      new UsersManager(opts),
      'get',
      'getEnrollments',
      'link',
      'unlink',
      'update',
      'deleteMultifactorProvider'
    );
    this.deviceCredentials = pick(new DeviceCredentialsManager(opts), 'createPublicKey', 'delete');
  }
}
