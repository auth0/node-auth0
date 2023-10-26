// These can be removed in the next major.
import {
  EmailProviderCreate,
  EmailProviderCreateNameEnum,
  EmailProviderUpdate,
  EmailProviderUpdateNameEnum,
  EmailProviderUpdateCredentials,
  Client as _Client,
  ClientCreate as _ClientCreate,
  ClientUpdate as _ClientUpdate,
  ClientCreateOidcLogout,
  ClientOidcLogout,
  ClientUpdateOidcLogout,
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

export interface Client extends _Client {
  /**
   * @deprecated Use {@link _Client.oidc_logout} instead.
   */
  oidc_backchannel_logout?: ClientOidcLogout;
}

export interface ClientCreate extends _ClientCreate {
  /**
   * @deprecated Use {@link _ClientCreate.oidc_logout} instead.
   */
  oidc_backchannel_logout?: ClientCreateOidcLogout;
}

export interface ClientUpdate extends _ClientUpdate {
  /**
   * @deprecated Use {@link _ClientUpdate.oidc_logout} instead.
   */
  oidc_backchannel_logout?: ClientUpdateOidcLogout;
}
