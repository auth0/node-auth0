// These can be removed in the next major.
import {
  EmailProviderCreate,
  EmailProviderCreateNameEnum,
  EmailProviderUpdate,
  EmailProviderUpdateNameEnum,
  EmailProviderUpdateCredentials,
  ClientCreateOidcLogout,
  ClientOidcLogout,
  ClientUpdateOidcLogout,
  PostOrganizations201ResponseEnabledConnectionsInnerConnection,
} from './management/__generated/models/index.js';

/**
 * @deprecated Use {@link EmailProviderUpdate} instead.
 */
export type PatchProviderRequest = EmailProviderUpdate;
/**
 * @deprecated Use {@link EmailProviderUpdateNameEnum} instead.
 */
export const PatchProviderRequestNameEnum = EmailProviderUpdateNameEnum;
/**
 * @deprecated Use {@link EmailProviderCreate} instead.
 */
export type PostProviderRequest = EmailProviderCreate;
/**
 * @deprecated Use {@link EmailProviderCreateNameEnum} instead.
 */
export const PostProviderRequestNameEnum = EmailProviderCreateNameEnum;
/**
 * @deprecated Use {@link EmailProviderUpdateCredentials} instead.
 */
export type PostProviderRequestCredentials = EmailProviderUpdateCredentials;
/**
 * @deprecated Use {@link ClientCreateOidcLogout} instead.
 */
export type ClientCreateOidcBackchannelLogout = ClientCreateOidcLogout;
/**
 * @deprecated Use {@link ClientOidcLogout} instead.
 */
export type ClientOidcBackchannelLogout = ClientOidcLogout;
/**
 * @deprecated Use {@link ClientUpdateOidcLogout} instead.
 */
export type ClientUpdateOidcBackchannelLogout = ClientUpdateOidcLogout;
/**
 * @deprecated use {@link PostOrganizations201ResponseEnabledConnectionsInnerConnection} instead.
 */
// eslint-disable-next-line
export type GetEnabledConnections200ResponseOneOfInnerConnection =
  PostOrganizations201ResponseEnabledConnectionsInnerConnection;
