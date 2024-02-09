/**
 *
 */
export interface ActionsDraftUpdate {
  /**
   * True if the draft of the action should be updated with the reverted version.
   *
   */
  update_draft?: boolean;
}
/**
 *
 */
export interface Client {
  [key: string]: any | any;
  /**
   * ID of this client.
   *
   */
  client_id: string;
  /**
   * Name of the tenant this client belongs to.
   *
   */
  tenant: string;
  /**
   * Name of this client (min length: 1 character, does not allow `<` or `>`).
   *
   */
  name: string;
  /**
   * Free text description of this client (max length: 140 characters).
   *
   */
  description: string;
  /**
   * Whether this is your global 'All Applications' client representing legacy tenant settings (true) or a regular client (false).
   *
   */
  global: boolean;
  /**
   * Client secret (which you must not make public).
   *
   */
  client_secret: string;
  /**
   * Type of client used to determine which settings are applicable. Can be `spa`, `native`, `non_interactive`, or `regular_web`.
   *
   */
  app_type: string;
  /**
   * URL of the logo to display for this client. Recommended size is 150x150 pixels.
   *
   */
  logo_uri: string;
  /**
   * Whether this client a first party client (true) or not (false).
   *
   */
  is_first_party: boolean;
  /**
   * Whether this client conforms to <a href='https://auth0.com/docs/api-auth/tutorials/adoption'>strict OIDC specifications</a> (true) or uses legacy features (false).
   *
   */
  oidc_conformant: boolean;
  /**
   * Comma-separated list of URLs whitelisted for Auth0 to use as a callback to the client after authentication.
   *
   */
  callbacks: Array<string>;
  /**
   * Comma-separated list of URLs allowed to make requests from JavaScript to Auth0 API (typically used with CORS). By default, all your callback URLs will be allowed. This field allows you to enter other origins if necessary. You can also use wildcards at the subdomain level (e.g., https://*.contoso.com). Query strings and hash information are not taken into account when validating these URLs.
   *
   */
  allowed_origins: Array<string>;
  /**
   * Comma-separated list of allowed origins for use with <a href='https://auth0.com/docs/cross-origin-authentication'>Cross-Origin Authentication</a>, <a href='https://auth0.com/docs/flows/concepts/device-auth'>Device Flow</a>, and <a href='https://auth0.com/docs/protocols/oauth2#how-response-mode-works'>web message response mode</a>.
   *
   */
  web_origins: Array<string>;
  /**
   * List of audiences/realms for SAML protocol. Used by the wsfed addon.
   *
   */
  client_aliases: Array<string>;
  /**
   * List of allow clients and API ids that are allowed to make delegation requests. Empty means all all your clients are allowed.
   *
   */
  allowed_clients: Array<string>;
  /**
   * Comma-separated list of URLs that are valid to redirect to after logout from Auth0. Wildcards are allowed for subdomains.
   *
   */
  allowed_logout_urls: Array<string>;
  /**
   */
  oidc_logout: ClientOidcLogout;
  /**
   * List of grant types supported for this application. Can include `authorization_code`, `implicit`, `refresh_token`, `client_credentials`, `password`, `http://auth0.com/oauth/grant-type/password-realm`, `http://auth0.com/oauth/grant-type/mfa-oob`, `http://auth0.com/oauth/grant-type/mfa-otp`, `http://auth0.com/oauth/grant-type/mfa-recovery-code`, and `urn:ietf:params:oauth:grant-type:device_code`.
   *
   */
  grant_types: Array<string>;
  /**
   */
  jwt_configuration: ClientJwtConfiguration;
  /**
   * Signing certificates associated with this client.
   *
   */
  signing_keys: Array<ClientSigningKeysInner>;
  /**
   */
  encryption_key: ClientEncryptionKey | null;
  /**
   * Applies only to SSO clients and determines whether Auth0 will handle Single Sign On (true) or whether the Identity Provider will (false).
   *
   */
  sso: boolean;
  /**
   * Whether Single Sign On is disabled (true) or enabled (true). Defaults to true.
   *
   */
  sso_disabled: boolean;
  /**
   * Whether this client can be used to make cross-origin authentication requests (true) or it is not allowed to make such requests (false).
   *
   */
  cross_origin_authentication: boolean;
  /**
   * URL of the location in your site where the cross origin verification takes place for the cross-origin auth flow when performing Auth in your own domain instead of Auth0 hosted login page.
   *
   */
  cross_origin_loc: string;
  /**
   * Whether a custom login page is to be used (true) or the default provided login page (false).
   *
   */
  custom_login_page_on: boolean;
  /**
   * The content (HTML, CSS, JS) of the custom login page.
   *
   */
  custom_login_page: string;
  /**
   * The content (HTML, CSS, JS) of the custom login page. (Used on Previews)
   *
   */
  custom_login_page_preview: string;
  /**
   * HTML form template to be used for WS-Federation.
   *
   */
  form_template: string;
  /**
   */
  addons: ClientAddons;
  /**
   * Defines the requested authentication method for the token endpoint. Can be `none` (public client without a client secret), `client_secret_post` (client uses HTTP POST parameters), or `client_secret_basic` (client uses HTTP Basic).
   *
   */
  token_endpoint_auth_method: ClientTokenEndpointAuthMethodEnum;
  /**
   * Metadata associated with the client, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.  Field names (max 255 chars) are alphanumeric and may only include the following special characters:  :,-+=_*?"/\()<>@	[Tab] [Space]
   *
   */
  client_metadata: { [key: string]: any };
  /**
   */
  mobile: ClientMobile;
  /**
   * Initiate login uri, must be https
   *
   */
  initiate_login_uri: string;
  /**
   */
  native_social_login: ClientNativeSocialLogin | null;
  /**
   */
  refresh_token: ClientRefreshToken | null;
  /**
   * Defines how to proceed during an authentication transaction with regards an organization. Can be `deny` (default), `allow` or `require`.
   *
   */
  organization_usage: ClientOrganizationUsageEnum;
  /**
   * Defines how to proceed during an authentication transaction when `client.organization_usage: 'require'`. Can be `no_prompt` (default), `pre_login_prompt` or `post_login_prompt`. `post_login_prompt` requires `oidc_conformant: true`.
   *
   */
  organization_require_behavior: ClientOrganizationRequireBehaviorEnum;
  /**
   */
  client_authentication_methods: ClientClientAuthenticationMethods | null;
}

export const ClientTokenEndpointAuthMethodEnum = {
  none: 'none',
  client_secret_post: 'client_secret_post',
  client_secret_basic: 'client_secret_basic',
} as const;
export type ClientTokenEndpointAuthMethodEnum =
  (typeof ClientTokenEndpointAuthMethodEnum)[keyof typeof ClientTokenEndpointAuthMethodEnum];

export const ClientOrganizationUsageEnum = {
  deny: 'deny',
  allow: 'allow',
  require: 'require',
} as const;
export type ClientOrganizationUsageEnum =
  (typeof ClientOrganizationUsageEnum)[keyof typeof ClientOrganizationUsageEnum];

export const ClientOrganizationRequireBehaviorEnum = {
  no_prompt: 'no_prompt',
  pre_login_prompt: 'pre_login_prompt',
  post_login_prompt: 'post_login_prompt',
} as const;
export type ClientOrganizationRequireBehaviorEnum =
  (typeof ClientOrganizationRequireBehaviorEnum)[keyof typeof ClientOrganizationRequireBehaviorEnum];

/**
 * Addons enabled for this client and their associated configurations.
 */
export interface ClientAddons {
  /**
   */
  aws: ClientAddonsAws;
  /**
   */
  azure_blob: ClientAddonsAzureBlob;
  /**
   */
  azure_sb: ClientAddonsAzureSb;
  /**
   */
  rms: ClientAddonsRms;
  /**
   */
  mscrm: ClientAddonsMscrm;
  /**
   */
  slack: ClientAddonsSlack;
  /**
   */
  sentry: ClientAddonsSentry;
  /**
   * Box SSO indicator (no configuration settings needed for Box SSO).
   *
   */
  box: { [key: string]: any };
  /**
   * CloudBees SSO indicator (no configuration settings needed for CloudBees SSO).
   *
   */
  cloudbees: { [key: string]: any };
  /**
   * Concur SSO indicator (no configuration settings needed for Concur SSO).
   *
   */
  concur: { [key: string]: any };
  /**
   * Dropbox SSO indicator (no configuration settings needed for Dropbox SSO).
   *
   */
  dropbox: { [key: string]: any };
  /**
   */
  echosign: ClientAddonsEchosign;
  /**
   */
  egnyte: ClientAddonsEgnyte;
  /**
   */
  firebase: ClientAddonsFirebase;
  /**
   */
  newrelic: ClientAddonsNewrelic;
  /**
   */
  office365: ClientAddonsOffice365;
  /**
   */
  salesforce: ClientAddonsSalesforce;
  /**
   */
  salesforce_api: ClientAddonsSalesforceApi;
  /**
   */
  salesforce_sandbox_api: ClientAddonsSalesforceSandboxApi;
  /**
   */
  samlp: ClientAddonsSamlp;
  /**
   */
  layer: ClientAddonsLayer;
  /**
   */
  sap_api: ClientAddonsSapApi;
  /**
   */
  sharepoint: ClientAddonsSharepoint;
  /**
   */
  springcm: ClientAddonsSpringcm;
  /**
   */
  wams: ClientAddonsWams;
  /**
   * WS-Fed (WIF) addon indicator. Actual configuration is stored in `callback` and `client_aliases` properties on the client.
   *
   */
  wsfed: { [key: string]: any };
  /**
   */
  zendesk: ClientAddonsZendesk;
  /**
   */
  zoom: ClientAddonsZoom;
  /**
   */
  sso_integration: ClientAddonsSsoIntegration;
  /**
   * Okta Access Gateway SSO configuration
   *
   */
  oag: object | null;
}
/**
 * AWS addon configuration.
 */
export interface ClientAddonsAws {
  [key: string]: any | any;
  /**
   * AWS principal ARN, e.g. `arn:aws:iam::010616021751:saml-provider/idpname`
   *
   */
  principal: string;
  /**
   * AWS role ARN, e.g. `arn:aws:iam::010616021751:role/foo`
   *
   */
  role: string;
  /**
   * AWS token lifetime in seconds
   *
   */
  lifetime_in_seconds: number;
}
/**
 * Azure Blob Storage addon configuration.
 */
export interface ClientAddonsAzureBlob {
  [key: string]: any | any;
  /**
   * Your Azure storage account name. Usually first segment in your Azure storage URL. e.g. `https://acme-org.blob.core.windows.net` would be the account name `acme-org`.
   *
   */
  accountName: string;
  /**
   * Access key associated with this storage account.
   *
   */
  storageAccessKey: string;
  /**
   * Container to request a token for. e.g. `my-container`.
   *
   */
  containerName: string;
  /**
   * Entity to request a token for. e.g. `my-blob`. If blank the computed SAS will apply to the entire storage container.
   *
   */
  blobName: string;
  /**
   * Expiration in minutes for the generated token (default of 5 minutes).
   *
   */
  expiration: number;
  /**
   * Shared access policy identifier defined in your storage account resource.
   *
   */
  signedIdentifier: string;
  /**
   * Indicates if the issued token has permission to read the content, properties, metadata and block list. Use the blob as the source of a copy operation.
   *
   */
  blob_read: boolean;
  /**
   * Indicates if the issued token has permission to create or write content, properties, metadata, or block list. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation within the same account.
   *
   */
  blob_write: boolean;
  /**
   * Indicates if the issued token has permission to delete the blob.
   *
   */
  blob_delete: boolean;
  /**
   * Indicates if the issued token has permission to read the content, properties, metadata or block list of any blob in the container. Use any blob in the container as the source of a copy operation
   *
   */
  container_read: boolean;
  /**
   * Indicates that for any blob in the container if the issued token has permission to create or write content, properties, metadata, or block list. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation within the same account.
   *
   */
  container_write: boolean;
  /**
   * Indicates if issued token has permission to delete any blob in the container.
   *
   */
  container_delete: boolean;
  /**
   * Indicates if the issued token has permission to list blobs in the container.
   *
   */
  container_list: boolean;
}
/**
 * Azure Storage Bus addon configuration.
 */
export interface ClientAddonsAzureSb {
  [key: string]: any | any;
  /**
   * Your Azure Service Bus namespace. Usually the first segment of your Service Bus URL (e.g. `https://acme-org.servicebus.windows.net` would be `acme-org`).
   *
   */
  namespace: string;
  /**
   * Your shared access policy name defined in your Service Bus entity.
   *
   */
  sasKeyName: string;
  /**
   * Primary Key associated with your shared access policy.
   *
   */
  sasKey: string;
  /**
   * Entity you want to request a token for. e.g. `my-queue`.'
   *
   */
  entityPath: string;
  /**
   * Optional expiration in minutes for the generated token. Defaults to 5 minutes.
   *
   */
  expiration: number;
}
/**
 * Adobe EchoSign SSO configuration.
 */
export interface ClientAddonsEchosign {
  [key: string]: any | any;
  /**
   * Your custom domain found in your EchoSign URL. e.g. `https://acme-org.echosign.com` would be `acme-org`.
   *
   */
  domain: string;
}
/**
 * Egnyte SSO configuration.
 */
export interface ClientAddonsEgnyte {
  [key: string]: any | any;
  /**
   * Your custom domain found in your Egnyte URL. e.g. `https://acme-org.egnyte.com` would be `acme-org`.
   *
   */
  domain: string;
}
/**
 * Google Firebase addon configuration.
 */
export interface ClientAddonsFirebase {
  [key: string]: any | any;
  /**
   * Google Firebase Secret. (SDK 2 only).
   *
   */
  secret: string;
  /**
   * Optional ID of the private key to obtain kid header in the issued token (SDK v3+ tokens only).
   *
   */
  private_key_id: string;
  /**
   * Private Key for signing the token (SDK v3+ tokens only).
   *
   */
  private_key: string;
  /**
   * ID of the Service Account you have created (shown as `client_email` in the generated JSON file, SDK v3+ tokens only).
   *
   */
  client_email: string;
  /**
   * Optional expiration in seconds for the generated token. Defaults to 3600 seconds (SDK v3+ tokens only).
   *
   */
  lifetime_in_seconds: number;
}
/**
 * Layer addon configuration.
 */
export interface ClientAddonsLayer {
  [key: string]: any | any;
  /**
   * Provider ID of your Layer account
   *
   */
  providerId: string;
  /**
   * Authentication Key identifier used to sign the Layer token.
   *
   */
  keyId: string;
  /**
   * Private key for signing the Layer token.
   *
   */
  privateKey: string;
  /**
   * Name of the property used as the unique user id in Layer. If not specified `user_id` is used.
   *
   */
  principal?: string;
  /**
   * Optional expiration in minutes for the generated token. Defaults to 5 minutes.
   *
   */
  expiration?: number;
}
/**
 * Microsoft Dynamics CRM SSO configuration.
 */
export interface ClientAddonsMscrm {
  [key: string]: any | any;
  /**
   * Microsoft Dynamics CRM application URL.
   *
   */
  url: string;
}
/**
 * New Relic SSO configuration.
 */
export interface ClientAddonsNewrelic {
  [key: string]: any | any;
  /**
   * Your New Relic Account ID found in your New Relic URL after the `/accounts/` path. e.g. `https://rpm.newrelic.com/accounts/123456/query` would be `123456`.
   *
   */
  account: string;
}
/**
 * Microsoft Office 365 SSO configuration.
 */
export interface ClientAddonsOffice365 {
  [key: string]: any | any;
  /**
   * Your Office 365 domain name. e.g. `acme-org.com`.
   *
   */
  domain: string;
  /**
   * Optional Auth0 database connection for testing an already-configured Office 365 tenant.
   *
   */
  connection: string;
}
/**
 * Active Directory Rights Management Service SSO configuration.
 */
export interface ClientAddonsRms {
  [key: string]: any | any;
  /**
   * URL of your Rights Management Server. It can be internal or external, but users will have to be able to reach it.
   *
   */
  url: string;
}
/**
 * Salesforce SSO configuration.
 */
export interface ClientAddonsSalesforce {
  [key: string]: any | any;
  /**
   * Arbitrary logical URL that identifies the Saleforce resource. e.g. `https://acme-org.com`.
   *
   */
  entity_id: string;
}
/**
 * Salesforce API addon configuration.
 */
export interface ClientAddonsSalesforceApi {
  [key: string]: any | any;
  /**
   * Consumer Key assigned by Salesforce to the Connected App.
   *
   */
  clientid: string;
  /**
   * Name of the property in the user object that maps to a Salesforce username. e.g. `email`.
   *
   */
  principal: string;
  /**
   * Community name.
   *
   */
  communityName: string;
  /**
   * Community url section.
   *
   */
  community_url_section: string;
}
/**
 * Salesforce Sandbox addon configuration.
 */
export interface ClientAddonsSalesforceSandboxApi {
  [key: string]: any | any;
  /**
   * Consumer Key assigned by Salesforce to the Connected App.
   *
   */
  clientid: string;
  /**
   * Name of the property in the user object that maps to a Salesforce username. e.g. `email`.
   *
   */
  principal: string;
  /**
   * Community name.
   *
   */
  communityName: string;
  /**
   * Community url section.
   *
   */
  community_url_section: string;
}
/**
 * SAML2 addon indicator (no configuration settings needed for SAML2 addon).
 */
export interface ClientAddonsSamlp {
  [key: string]: any | any;
  /**
   */
  mappings: { [key: string]: any };
  /**
   */
  audience: string;
  /**
   */
  recipient: string;
  /**
   */
  createUpnClaim: boolean;
  /**
   */
  mapUnknownClaimsAsIs: boolean;
  /**
   */
  passthroughClaimsWithNoMapping: boolean;
  /**
   */
  mapIdentities: boolean;
  /**
   */
  signatureAlgorithm: string;
  /**
   */
  digestAlgorithm: string;
  /**
   */
  issuer: string;
  /**
   */
  destination: string;
  /**
   */
  lifetimeInSeconds: number;
  /**
   */
  signResponse: boolean;
  /**
   */
  nameIdentifierFormat: string;
  /**
   */
  nameIdentifierProbes: Array<string>;
  /**
   */
  authnContextClassRef: string;
}
/**
 * SAP API addon configuration.
 */
export interface ClientAddonsSapApi {
  [key: string]: any | any;
  /**
   * If activated in the OAuth 2.0 client configuration (transaction SOAUTH2) the SAML attribute client_id must be set and equal the client_id form parameter of the access token request.
   *
   */
  clientid: string;
  /**
   * Name of the property in the user object that maps to a SAP username. e.g. `email`.
   *
   */
  usernameAttribute: string;
  /**
   * Your SAP OData server OAuth2 token endpoint URL.
   *
   */
  tokenEndpointUrl: string;
  /**
   * Requested scope for SAP APIs.
   *
   */
  scope: string;
  /**
   * Service account password to use to authenticate API calls to the token endpoint.
   *
   */
  servicePassword: string;
  /**
   * NameID element of the Subject which can be used to express the user's identity. Defaults to `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified`.
   *
   */
  nameIdentifierFormat: string;
}
/**
 * Sentry SSO configuration.
 */
export interface ClientAddonsSentry {
  [key: string]: any | any;
  /**
   * Generated slug for your Sentry organization. Found in your Sentry URL. e.g. `https://sentry.acme.com/acme-org/` would be `acme-org`.
   *
   */
  org_slug: string;
  /**
   * URL prefix only if running Sentry Community Edition, otherwise leave should be blank.
   *
   */
  base_url: string;
}
/**
 * SharePoint SSO configuration.
 */
export interface ClientAddonsSharepoint {
  [key: string]: any | any;
  /**
   * Internal SharePoint application URL.
   *
   */
  url: string;
  /**
   */
  external_url: ClientAddonsSharepointExternalUrl;
}
/**
 * External SharePoint application URLs if exposed to the Internet.
 */
export type ClientAddonsSharepointExternalUrl = Array<string> | string;
/**
 * Slack team or workspace name usually first segment in your Slack URL. e.g. `https://acme-org.slack.com` would be `acme-org`.
 */
export interface ClientAddonsSlack {
  [key: string]: any | any;
  /**
   * Slack team name.
   *
   */
  team: string;
}
/**
 * SpringCM SSO configuration.
 */
export interface ClientAddonsSpringcm {
  [key: string]: any | any;
  /**
   * SpringCM ACS URL, e.g. `https://na11.springcm.com/atlas/sso/SSOEndpoint.ashx`.
   *
   */
  acsurl: string;
}
/**
 *
 */
export interface ClientAddonsSsoIntegration {
  [key: string]: any | any;
  /**
   * SSO integration name
   *
   */
  name: string;
  /**
   * SSO integration version installed
   *
   */
  version: string;
}
/**
 * Windows Azure Mobile Services addon configuration.
 */
export interface ClientAddonsWams {
  [key: string]: any | any;
  /**
   * Your master key for Windows Azure Mobile Services.
   *
   */
  masterkey: string;
}
/**
 * Zendesk SSO configuration.
 */
export interface ClientAddonsZendesk {
  [key: string]: any | any;
  /**
   * Zendesk account name usually first segment in your Zendesk URL. e.g. `https://acme-org.zendesk.com` would be `acme-org`.
   *
   */
  accountName: string;
}
/**
 * Zoom SSO configuration.
 */
export interface ClientAddonsZoom {
  [key: string]: any | any;
  /**
   * Zoom account name usually first segment of your Zoom URL, e.g. `https://acme-org.zoom.us` would be `acme-org`.
   *
   */
  account: string;
}
/**
 * Defines client authentication methods.
 */
export interface ClientClientAuthenticationMethods {
  /**
   */
  private_key_jwt: ClientClientAuthenticationMethodsPrivateKeyJwt;
}
/**
 * Defines `private_key_jwt` client authentication method. If this property is defined, the client is enabled to use the Private Key JWT authentication method.
 */
export interface ClientClientAuthenticationMethodsPrivateKeyJwt {
  /**
   * A list of unique and previously created credential IDs enabled on the client for Private Key JWT authentication.
   *
   */
  credentials: Array<ClientClientAuthenticationMethodsPrivateKeyJwtCredentialsInner>;
}
/**
 *
 */
export interface ClientClientAuthenticationMethodsPrivateKeyJwtCredentialsInner {
  /**
   * Credential ID
   *
   */
  id: string;
}
/**
 *
 */
export interface ClientCreate {
  /**
   * Name of this client (min length: 1 character, does not allow `<` or `>`).
   *
   */
  name: string;
  /**
   * Free text description of this client (max length: 140 characters).
   *
   */
  description?: string;
  /**
   * URL of the logo to display for this client. Recommended size is 150x150 pixels.
   *
   */
  logo_uri?: string;
  /**
   * Comma-separated list of URLs whitelisted for Auth0 to use as a callback to the client after authentication.
   *
   */
  callbacks?: Array<string>;
  /**
   */
  oidc_logout?: ClientCreateOidcLogout;
  /**
   * Comma-separated list of URLs allowed to make requests from JavaScript to Auth0 API (typically used with CORS). By default, all your callback URLs will be allowed. This field allows you to enter other origins if necessary. You can also use wildcards at the subdomain level (e.g., https://*.contoso.com). Query strings and hash information are not taken into account when validating these URLs.
   *
   */
  allowed_origins?: Array<string>;
  /**
   * Comma-separated list of allowed origins for use with <a href='https://auth0.com/docs/cross-origin-authentication'>Cross-Origin Authentication</a>, <a href='https://auth0.com/docs/flows/concepts/device-auth'>Device Flow</a>, and <a href='https://auth0.com/docs/protocols/oauth2#how-response-mode-works'>web message response mode</a>.
   *
   */
  web_origins?: Array<string>;
  /**
   * List of audiences/realms for SAML protocol. Used by the wsfed addon.
   *
   */
  client_aliases?: Array<string>;
  /**
   * List of allow clients and API ids that are allowed to make delegation requests. Empty means all all your clients are allowed.
   *
   */
  allowed_clients?: Array<string>;
  /**
   * Comma-separated list of URLs that are valid to redirect to after logout from Auth0. Wildcards are allowed for subdomains.
   *
   */
  allowed_logout_urls?: Array<string>;
  /**
   * List of grant types supported for this application. Can include `authorization_code`, `implicit`, `refresh_token`, `client_credentials`, `password`, `http://auth0.com/oauth/grant-type/password-realm`, `http://auth0.com/oauth/grant-type/mfa-oob`, `http://auth0.com/oauth/grant-type/mfa-otp`, `http://auth0.com/oauth/grant-type/mfa-recovery-code`, and `urn:ietf:params:oauth:grant-type:device_code`.
   *
   */
  grant_types?: Array<string>;
  /**
   * Defines the requested authentication method for the token endpoint. Can be `none` (public client without a client secret), `client_secret_post` (client uses HTTP POST parameters), or `client_secret_basic` (client uses HTTP Basic).
   *
   */
  token_endpoint_auth_method?: ClientCreateTokenEndpointAuthMethodEnum;
  /**
   * Type of client used to determine which settings are applicable. Can be `spa`, `native`, `non_interactive`, or `regular_web`.
   *
   */
  app_type?: ClientCreateAppTypeEnum;
  /**
   * Whether this client a first party client or not
   *
   */
  is_first_party?: boolean;
  /**
   * Whether this client conforms to <a href='https://auth0.com/docs/api-auth/tutorials/adoption'>strict OIDC specifications</a> (true) or uses legacy features (false).
   *
   */
  oidc_conformant?: boolean;
  /**
   */
  jwt_configuration?: ClientCreateJwtConfiguration;
  /**
   */
  encryption_key?: ClientCreateEncryptionKey;
  /**
   * Applies only to SSO clients and determines whether Auth0 will handle Single Sign On (true) or whether the Identity Provider will (false).
   *
   */
  sso?: boolean;
  /**
   * Whether this client can be used to make cross-origin authentication requests (true) or it is not allowed to make such requests (false).
   *
   */
  cross_origin_authentication?: boolean;
  /**
   * URL of the location in your site where the cross origin verification takes place for the cross-origin auth flow when performing Auth in your own domain instead of Auth0 hosted login page.
   *
   */
  cross_origin_loc?: string;
  /**
   * <code>true</code> to disable Single Sign On, <code>false</code> otherwise (default: <code>false</code>)
   *
   */
  sso_disabled?: boolean;
  /**
   * <code>true</code> if the custom login page is to be used, <code>false</code> otherwise. Defaults to <code>true</code>
   *
   */
  custom_login_page_on?: boolean;
  /**
   * The content (HTML, CSS, JS) of the custom login page.
   *
   */
  custom_login_page?: string;
  /**
   * The content (HTML, CSS, JS) of the custom login page. (Used on Previews)
   *
   */
  custom_login_page_preview?: string;
  /**
   * HTML form template to be used for WS-Federation.
   *
   */
  form_template?: string;
  /**
   */
  addons?: ClientCreateAddons;
  /**
   * Metadata associated with the client, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.  Field names (max 255 chars) are alphanumeric and may only include the following special characters:  :,-+=_*?"/\()<>@	[Tab] [Space]
   *
   */
  client_metadata?: { [key: string]: any };
  /**
   */
  mobile?: ClientCreateMobile;
  /**
   * Initiate login uri, must be https
   *
   */
  initiate_login_uri?: string;
  /**
   */
  native_social_login?: ClientCreateNativeSocialLogin | null;
  /**
   */
  refresh_token?: ClientRefreshToken | null;
  /**
   * Defines how to proceed during an authentication transaction with regards an organization. Can be `deny` (default), `allow` or `require`.
   *
   */
  organization_usage?: ClientCreateOrganizationUsageEnum;
  /**
   * Defines how to proceed during an authentication transaction when `client.organization_usage: 'require'`. Can be `no_prompt` (default), `pre_login_prompt` or `post_login_prompt`. `post_login_prompt` requires `oidc_conformant: true`.
   *
   */
  organization_require_behavior?: ClientCreateOrganizationRequireBehaviorEnum;
  /**
   */
  client_authentication_methods?: ClientCreateClientAuthenticationMethods;
}

export const ClientCreateTokenEndpointAuthMethodEnum = {
  none: 'none',
  client_secret_post: 'client_secret_post',
  client_secret_basic: 'client_secret_basic',
} as const;
export type ClientCreateTokenEndpointAuthMethodEnum =
  (typeof ClientCreateTokenEndpointAuthMethodEnum)[keyof typeof ClientCreateTokenEndpointAuthMethodEnum];

export const ClientCreateAppTypeEnum = {
  native: 'native',
  spa: 'spa',
  regular_web: 'regular_web',
  non_interactive: 'non_interactive',
  rms: 'rms',
  box: 'box',
  cloudbees: 'cloudbees',
  concur: 'concur',
  dropbox: 'dropbox',
  mscrm: 'mscrm',
  echosign: 'echosign',
  egnyte: 'egnyte',
  newrelic: 'newrelic',
  office365: 'office365',
  salesforce: 'salesforce',
  sentry: 'sentry',
  sharepoint: 'sharepoint',
  slack: 'slack',
  springcm: 'springcm',
  zendesk: 'zendesk',
  zoom: 'zoom',
  sso_integration: 'sso_integration',
  oag: 'oag',
} as const;
export type ClientCreateAppTypeEnum =
  (typeof ClientCreateAppTypeEnum)[keyof typeof ClientCreateAppTypeEnum];

export const ClientCreateOrganizationUsageEnum = {
  deny: 'deny',
  allow: 'allow',
  require: 'require',
} as const;
export type ClientCreateOrganizationUsageEnum =
  (typeof ClientCreateOrganizationUsageEnum)[keyof typeof ClientCreateOrganizationUsageEnum];

export const ClientCreateOrganizationRequireBehaviorEnum = {
  no_prompt: 'no_prompt',
  pre_login_prompt: 'pre_login_prompt',
  post_login_prompt: 'post_login_prompt',
} as const;
export type ClientCreateOrganizationRequireBehaviorEnum =
  (typeof ClientCreateOrganizationRequireBehaviorEnum)[keyof typeof ClientCreateOrganizationRequireBehaviorEnum];

/**
 * Addons enabled for this client and their associated configurations.
 */
export interface ClientCreateAddons {
  /**
   */
  aws?: ClientCreateAddonsAws;
  /**
   */
  azure_blob?: ClientCreateAddonsAzureBlob;
  /**
   */
  azure_sb?: ClientCreateAddonsAzureSb;
  /**
   */
  rms?: ClientAddonsRms;
  /**
   */
  mscrm?: ClientAddonsMscrm;
  /**
   */
  slack?: ClientAddonsSlack;
  /**
   */
  sentry?: ClientCreateAddonsSentry;
  /**
   * Box SSO indicator (no configuration settings needed for Box SSO).
   *
   */
  box?: { [key: string]: any };
  /**
   * CloudBees SSO indicator (no configuration settings needed for CloudBees SSO).
   *
   */
  cloudbees?: { [key: string]: any };
  /**
   * Concur SSO indicator (no configuration settings needed for Concur SSO).
   *
   */
  concur?: { [key: string]: any };
  /**
   * Dropbox SSO indicator (no configuration settings needed for Dropbox SSO).
   *
   */
  dropbox?: { [key: string]: any };
  /**
   */
  echosign?: ClientCreateAddonsEchosign;
  /**
   */
  egnyte?: ClientCreateAddonsEgnyte;
  /**
   */
  firebase?: ClientCreateAddonsFirebase;
  /**
   */
  newrelic?: ClientCreateAddonsNewrelic;
  /**
   */
  office365?: ClientCreateAddonsOffice365;
  /**
   */
  salesforce?: ClientCreateAddonsSalesforce;
  /**
   */
  salesforce_api?: ClientCreateAddonsSalesforceApi;
  /**
   */
  salesforce_sandbox_api?: ClientCreateAddonsSalesforceSandboxApi;
  /**
   */
  samlp?: ClientCreateAddonsSamlp;
  /**
   */
  layer?: ClientAddonsLayer;
  /**
   */
  sap_api?: ClientCreateAddonsSapApi;
  /**
   */
  sharepoint?: ClientCreateAddonsSharepoint;
  /**
   */
  springcm?: ClientCreateAddonsSpringcm;
  /**
   */
  wams?: ClientCreateAddonsWams;
  /**
   * WS-Fed (WIF) addon indicator. Actual configuration is stored in `callback` and `client_aliases` properties on the client.
   *
   */
  wsfed?: { [key: string]: any };
  /**
   */
  zendesk?: ClientCreateAddonsZendesk;
  /**
   */
  zoom?: ClientCreateAddonsZoom;
  /**
   */
  sso_integration?: ClientCreateAddonsSsoIntegration;
  /**
   * Okta Access Gateway SSO configuration
   *
   */
  oag?: object | null;
}
/**
 * AWS addon configuration.
 */
export interface ClientCreateAddonsAws {
  [key: string]: any | any;
  /**
   * AWS principal ARN, e.g. `arn:aws:iam::010616021751:saml-provider/idpname`
   *
   */
  principal?: string;
  /**
   * AWS role ARN, e.g. `arn:aws:iam::010616021751:role/foo`
   *
   */
  role?: string;
  /**
   * AWS token lifetime in seconds
   *
   */
  lifetime_in_seconds?: number;
}
/**
 * Azure Blob Storage addon configuration.
 */
export interface ClientCreateAddonsAzureBlob {
  [key: string]: any | any;
  /**
   * Your Azure storage account name. Usually first segment in your Azure storage URL. e.g. `https://acme-org.blob.core.windows.net` would be the account name `acme-org`.
   *
   */
  accountName?: string;
  /**
   * Access key associated with this storage account.
   *
   */
  storageAccessKey?: string;
  /**
   * Container to request a token for. e.g. `my-container`.
   *
   */
  containerName?: string;
  /**
   * Entity to request a token for. e.g. `my-blob`. If blank the computed SAS will apply to the entire storage container.
   *
   */
  blobName?: string;
  /**
   * Expiration in minutes for the generated token (default of 5 minutes).
   *
   */
  expiration?: number;
  /**
   * Shared access policy identifier defined in your storage account resource.
   *
   */
  signedIdentifier?: string;
  /**
   * Indicates if the issued token has permission to read the content, properties, metadata and block list. Use the blob as the source of a copy operation.
   *
   */
  blob_read?: boolean;
  /**
   * Indicates if the issued token has permission to create or write content, properties, metadata, or block list. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation within the same account.
   *
   */
  blob_write?: boolean;
  /**
   * Indicates if the issued token has permission to delete the blob.
   *
   */
  blob_delete?: boolean;
  /**
   * Indicates if the issued token has permission to read the content, properties, metadata or block list of any blob in the container. Use any blob in the container as the source of a copy operation
   *
   */
  container_read?: boolean;
  /**
   * Indicates that for any blob in the container if the issued token has permission to create or write content, properties, metadata, or block list. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation within the same account.
   *
   */
  container_write?: boolean;
  /**
   * Indicates if issued token has permission to delete any blob in the container.
   *
   */
  container_delete?: boolean;
  /**
   * Indicates if the issued token has permission to list blobs in the container.
   *
   */
  container_list?: boolean;
}
/**
 * Azure Storage Bus addon configuration.
 */
export interface ClientCreateAddonsAzureSb {
  [key: string]: any | any;
  /**
   * Your Azure Service Bus namespace. Usually the first segment of your Service Bus URL (e.g. `https://acme-org.servicebus.windows.net` would be `acme-org`).
   *
   */
  namespace?: string;
  /**
   * Your shared access policy name defined in your Service Bus entity.
   *
   */
  sasKeyName?: string;
  /**
   * Primary Key associated with your shared access policy.
   *
   */
  sasKey?: string;
  /**
   * Entity you want to request a token for. e.g. `my-queue`.'
   *
   */
  entityPath?: string;
  /**
   * Optional expiration in minutes for the generated token. Defaults to 5 minutes.
   *
   */
  expiration?: number;
}
/**
 * Adobe EchoSign SSO configuration.
 */
export interface ClientCreateAddonsEchosign {
  [key: string]: any | any;
  /**
   * Your custom domain found in your EchoSign URL. e.g. `https://acme-org.echosign.com` would be `acme-org`.
   *
   */
  domain?: string;
}
/**
 * Egnyte SSO configuration.
 */
export interface ClientCreateAddonsEgnyte {
  [key: string]: any | any;
  /**
   * Your custom domain found in your Egnyte URL. e.g. `https://acme-org.egnyte.com` would be `acme-org`.
   *
   */
  domain?: string;
}
/**
 * Google Firebase addon configuration.
 */
export interface ClientCreateAddonsFirebase {
  [key: string]: any | any;
  /**
   * Google Firebase Secret. (SDK 2 only).
   *
   */
  secret?: string;
  /**
   * Optional ID of the private key to obtain kid header in the issued token (SDK v3+ tokens only).
   *
   */
  private_key_id?: string;
  /**
   * Private Key for signing the token (SDK v3+ tokens only).
   *
   */
  private_key?: string;
  /**
   * ID of the Service Account you have created (shown as `client_email` in the generated JSON file, SDK v3+ tokens only).
   *
   */
  client_email?: string;
  /**
   * Optional expiration in seconds for the generated token. Defaults to 3600 seconds (SDK v3+ tokens only).
   *
   */
  lifetime_in_seconds?: number;
}
/**
 * New Relic SSO configuration.
 */
export interface ClientCreateAddonsNewrelic {
  [key: string]: any | any;
  /**
   * Your New Relic Account ID found in your New Relic URL after the `/accounts/` path. e.g. `https://rpm.newrelic.com/accounts/123456/query` would be `123456`.
   *
   */
  account?: string;
}
/**
 * Microsoft Office 365 SSO configuration.
 */
export interface ClientCreateAddonsOffice365 {
  [key: string]: any | any;
  /**
   * Your Office 365 domain name. e.g. `acme-org.com`.
   *
   */
  domain?: string;
  /**
   * Optional Auth0 database connection for testing an already-configured Office 365 tenant.
   *
   */
  connection?: string;
}
/**
 * Salesforce SSO configuration.
 */
export interface ClientCreateAddonsSalesforce {
  [key: string]: any | any;
  /**
   * Arbitrary logical URL that identifies the Saleforce resource. e.g. `https://acme-org.com`.
   *
   */
  entity_id?: string;
}
/**
 * Salesforce API addon configuration.
 */
export interface ClientCreateAddonsSalesforceApi {
  [key: string]: any | any;
  /**
   * Consumer Key assigned by Salesforce to the Connected App.
   *
   */
  clientid?: string;
  /**
   * Name of the property in the user object that maps to a Salesforce username. e.g. `email`.
   *
   */
  principal?: string;
  /**
   * Community name.
   *
   */
  communityName?: string;
  /**
   * Community url section.
   *
   */
  community_url_section?: string;
}
/**
 * Salesforce Sandbox addon configuration.
 */
export interface ClientCreateAddonsSalesforceSandboxApi {
  [key: string]: any | any;
  /**
   * Consumer Key assigned by Salesforce to the Connected App.
   *
   */
  clientid?: string;
  /**
   * Name of the property in the user object that maps to a Salesforce username. e.g. `email`.
   *
   */
  principal?: string;
  /**
   * Community name.
   *
   */
  communityName?: string;
  /**
   * Community url section.
   *
   */
  community_url_section?: string;
}
/**
 * SAML2 addon indicator (no configuration settings needed for SAML2 addon).
 */
export interface ClientCreateAddonsSamlp {
  [key: string]: any | any;
  /**
   */
  mappings?: { [key: string]: any };
  /**
   */
  audience?: string;
  /**
   */
  recipient?: string;
  /**
   */
  createUpnClaim?: boolean;
  /**
   */
  mapUnknownClaimsAsIs?: boolean;
  /**
   */
  passthroughClaimsWithNoMapping?: boolean;
  /**
   */
  mapIdentities?: boolean;
  /**
   */
  signatureAlgorithm?: string;
  /**
   */
  digestAlgorithm?: string;
  /**
   */
  issuer?: string;
  /**
   */
  destination?: string;
  /**
   */
  lifetimeInSeconds?: number;
  /**
   */
  signResponse?: boolean;
  /**
   */
  nameIdentifierFormat?: string;
  /**
   */
  nameIdentifierProbes?: Array<string>;
  /**
   */
  authnContextClassRef?: string;
}
/**
 * SAP API addon configuration.
 */
export interface ClientCreateAddonsSapApi {
  [key: string]: any | any;
  /**
   * If activated in the OAuth 2.0 client configuration (transaction SOAUTH2) the SAML attribute client_id must be set and equal the client_id form parameter of the access token request.
   *
   */
  clientid?: string;
  /**
   * Name of the property in the user object that maps to a SAP username. e.g. `email`.
   *
   */
  usernameAttribute?: string;
  /**
   * Your SAP OData server OAuth2 token endpoint URL.
   *
   */
  tokenEndpointUrl?: string;
  /**
   * Requested scope for SAP APIs.
   *
   */
  scope?: string;
  /**
   * Service account password to use to authenticate API calls to the token endpoint.
   *
   */
  servicePassword?: string;
  /**
   * NameID element of the Subject which can be used to express the user's identity. Defaults to `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified`.
   *
   */
  nameIdentifierFormat?: string;
}
/**
 * Sentry SSO configuration.
 */
export interface ClientCreateAddonsSentry {
  [key: string]: any | any;
  /**
   * Generated slug for your Sentry organization. Found in your Sentry URL. e.g. `https://sentry.acme.com/acme-org/` would be `acme-org`.
   *
   */
  org_slug?: string;
  /**
   * URL prefix only if running Sentry Community Edition, otherwise leave should be blank.
   *
   */
  base_url?: string;
}
/**
 * SharePoint SSO configuration.
 */
export interface ClientCreateAddonsSharepoint {
  [key: string]: any | any;
  /**
   * Internal SharePoint application URL.
   *
   */
  url?: string;
  /**
   */
  external_url?: ClientAddonsSharepointExternalUrl;
}
/**
 * SpringCM SSO configuration.
 */
export interface ClientCreateAddonsSpringcm {
  [key: string]: any | any;
  /**
   * SpringCM ACS URL, e.g. `https://na11.springcm.com/atlas/sso/SSOEndpoint.ashx`.
   *
   */
  acsurl?: string;
}
/**
 *
 */
export interface ClientCreateAddonsSsoIntegration {
  [key: string]: any | any;
  /**
   * SSO integration name
   *
   */
  name?: string;
  /**
   * SSO integration version installed
   *
   */
  version?: string;
}
/**
 * Windows Azure Mobile Services addon configuration.
 */
export interface ClientCreateAddonsWams {
  [key: string]: any | any;
  /**
   * Your master key for Windows Azure Mobile Services.
   *
   */
  masterkey?: string;
}
/**
 * Zendesk SSO configuration.
 */
export interface ClientCreateAddonsZendesk {
  [key: string]: any | any;
  /**
   * Zendesk account name usually first segment in your Zendesk URL. e.g. `https://acme-org.zendesk.com` would be `acme-org`.
   *
   */
  accountName?: string;
}
/**
 * Zoom SSO configuration.
 */
export interface ClientCreateAddonsZoom {
  [key: string]: any | any;
  /**
   * Zoom account name usually first segment of your Zoom URL, e.g. `https://acme-org.zoom.us` would be `acme-org`.
   *
   */
  account?: string;
}
/**
 * Defines client authentication methods.
 */
export interface ClientCreateClientAuthenticationMethods {
  /**
   */
  private_key_jwt?: ClientCreateClientAuthenticationMethodsPrivateKeyJwt;
}
/**
 * Defines `private_key_jwt` client authentication method. If this property is defined, the client is enabled to use the Private Key JWT authentication method.
 */
export interface ClientCreateClientAuthenticationMethodsPrivateKeyJwt {
  /**
   * Fully defined credentials that will be enabled on the client for Private Key JWT authentication.
   *
   */
  credentials: Array<ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInner>;
}
/**
 *
 */
export interface ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInner {
  /**
   * Credential type. Supported types: public_key.
   *
   */
  credential_type: ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerCredentialTypeEnum;
  /**
   * Friendly name for a credential.
   *
   */
  name?: string;
  /**
   * PEM-formatted public key (SPKI and PKCS1) or X509 certificate. Must be JSON escaped.
   *
   */
  pem: string;
  /**
   * Algorithm which will be used with the credential. Can be one of RS256, RS384, PS256. If not specified, RS256 will be used.
   *
   */
  alg?: ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerAlgEnum;
  /**
   * Parse expiry from x509 certificate. If true, attempts to parse the expiry date from the provided PEM.
   *
   */
  parse_expiry_from_cert?: boolean;
  /**
   * The ISO 8601 formatted date representing the expiration of the credential. If not specified (not recommended), the credential never expires.
   *
   */
  expires_at?: string;
}

export const ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerCredentialTypeEnum =
  {
    public_key: 'public_key',
  } as const;
export type ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerCredentialTypeEnum =
  (typeof ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerCredentialTypeEnum)[keyof typeof ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerCredentialTypeEnum];

export const ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerAlgEnum = {
  RS256: 'RS256',
  RS384: 'RS384',
  PS256: 'PS256',
} as const;
export type ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerAlgEnum =
  (typeof ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerAlgEnum)[keyof typeof ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInnerAlgEnum];

/**
 * Encryption used for WsFed responses with this client.
 */
export interface ClientCreateEncryptionKey {
  /**
   * Encryption Public RSA Key.
   *
   */
  pub?: string;
  /**
   * Encryption certificate for public key in X.590 (.CER) format.
   *
   */
  cert?: string;
  /**
   * Encryption certificate name for this certificate in the format `/CN={domain}`.
   *
   */
  subject?: string;
}
/**
 * Configuration related to JWTs for the client.
 */
export interface ClientCreateJwtConfiguration {
  /**
   * Number of seconds the JWT will be valid for (affects `exp` claim).
   *
   */
  lifetime_in_seconds?: number;
  /**
   * Configuration related to id token claims for the client.
   *
   */
  scopes?: { [key: string]: any };
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`. `PS256` available via addon.
   *
   */
  alg?: ClientCreateJwtConfigurationAlgEnum;
}

export const ClientCreateJwtConfigurationAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
  PS256: 'PS256',
} as const;
export type ClientCreateJwtConfigurationAlgEnum =
  (typeof ClientCreateJwtConfigurationAlgEnum)[keyof typeof ClientCreateJwtConfigurationAlgEnum];

/**
 * Additional configuration for native mobile apps.
 */
export interface ClientCreateMobile {
  /**
   */
  android?: ClientCreateMobileAndroid;
  /**
   */
  ios?: ClientCreateMobileIos;
}
/**
 * Android native app configuration.
 */
export interface ClientCreateMobileAndroid {
  /**
   * App package name found in AndroidManifest.xml.
   *
   */
  app_package_name?: string;
  /**
   * SHA256 fingerprints of the app's signing certificate. Multiple fingerprints can be used to support different versions of your app, such as debug and production builds.
   *
   */
  sha256_cert_fingerprints?: Array<string>;
}
/**
 * Configuration related to iOS native apps
 */
export interface ClientCreateMobileIos {
  /**
   * Identifier assigned to the account that signs and upload the app to the store
   *
   */
  team_id?: string;
  /**
   * Assigned by the developer to the app as its unique identifier inside the store, usually is a reverse domain plus the app name: <code>com.you.MyApp</code>
   *
   */
  app_bundle_identifier?: string;
}
/**
 * Configure native social settings
 */
export interface ClientCreateNativeSocialLogin {
  /**
   */
  apple?: ClientCreateNativeSocialLoginApple | null;
  /**
   */
  facebook?: ClientCreateNativeSocialLoginFacebook | null;
}
/**
 * Native Social Login support for the Apple connection
 */
export interface ClientCreateNativeSocialLoginApple {
  /**
   * Determine whether or not to allow signing in natively using an Apple authorization code
   *
   */
  enabled?: boolean;
}
/**
 * Native Social Login support for the Facebook connection
 */
export interface ClientCreateNativeSocialLoginFacebook {
  /**
   * Determine whether or not to allow signing in natively using Facebook
   *
   */
  enabled?: boolean;
}
/**
 * Configuration for OIDC backchannel logout
 */
export interface ClientCreateOidcLogout {
  /**
   * Comma-separated list of URLs that are valid to call back from Auth0 for OIDC backchannel logout. Currently only one URL is allowed.
   *
   */
  backchannel_logout_urls: Array<string>;
}
/**
 * Encryption used for WsFed responses with this client.
 */
export interface ClientEncryptionKey {
  [key: string]: any | any;
  /**
   * Encryption Public RSA Key.
   *
   */
  pub: string;
  /**
   * Encryption certificate for public key in X.590 (.CER) format.
   *
   */
  cert: string;
  /**
   * Encryption certificate name for this certificate in the format `/CN={domain}`.
   *
   */
  subject: string;
}
/**
 *
 */
export interface ClientGrant {
  /**
   * ID of the client grant.
   *
   */
  id: string;
  /**
   * ID of the client.
   *
   */
  client_id: string;
  /**
   * The audience (API identifier) of this client grant.
   *
   */
  audience: string;
  /**
   * Scopes allowed for this client grant.
   *
   */
  scope: Array<string>;
}
/**
 *
 */
export interface ClientGrantCreate {
  /**
   * ID of the client.
   *
   */
  client_id: string;
  /**
   * The audience (API identifier) of this client grant
   *
   */
  audience: string;
  /**
   * Scopes allowed for this client grant.
   *
   */
  scope: Array<string>;
}
/**
 * Configuration related to JWTs for the client.
 */
export interface ClientJwtConfiguration {
  [key: string]: any | any;
  /**
   * Number of seconds the JWT will be valid for (affects `exp` claim).
   *
   */
  lifetime_in_seconds: number;
  /**
   * Whether the client secret is base64 encoded (true) or unencoded (false).
   *
   */
  secret_encoded: boolean;
  /**
   * Configuration related to id token claims for the client.
   *
   */
  scopes: { [key: string]: any };
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`. `PS256` available via addon.
   *
   */
  alg: ClientJwtConfigurationAlgEnum;
}

export const ClientJwtConfigurationAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
  PS256: 'PS256',
} as const;
export type ClientJwtConfigurationAlgEnum =
  (typeof ClientJwtConfigurationAlgEnum)[keyof typeof ClientJwtConfigurationAlgEnum];

/**
 * Additional configuration for native mobile apps.
 */
export interface ClientMobile {
  [key: string]: any | any;
  /**
   */
  android: ClientMobileAndroid;
  /**
   */
  ios: ClientMobileIos;
}
/**
 * Android native app configuration.
 */
export interface ClientMobileAndroid {
  [key: string]: any | any;
  /**
   * App package name found in AndroidManifest.xml.
   *
   */
  app_package_name: string;
  /**
   * SHA256 fingerprints of the app's signing certificate. Multiple fingerprints can be used to support different versions of your app, such as debug and production builds.
   *
   */
  sha256_cert_fingerprints: Array<string>;
}
/**
 * iOS native app configuration.
 */
export interface ClientMobileIos {
  [key: string]: any | any;
  /**
   * Identifier assigned to the Apple account that signs and uploads the app to the store.
   *
   */
  team_id: string;
  /**
   * Assigned by developer to the app as its unique identifier inside the store. Usually this is a reverse domain plus the app name, e.g. `com.you.MyApp`.
   *
   */
  app_bundle_identifier: string;
}
/**
 * Configure native social settings
 */
export interface ClientNativeSocialLogin {
  /**
   */
  apple: ClientNativeSocialLoginApple | null;
  /**
   */
  facebook: ClientNativeSocialLoginFacebook | null;
}
/**
 * Native Social Login support for the Apple connection
 */
export interface ClientNativeSocialLoginApple {
  /**
   * Determine whether or not to allow signing in natively using an Apple authorization code
   *
   */
  enabled: boolean;
}
/**
 * Native Social Login support for the Facebook connection
 */
export interface ClientNativeSocialLoginFacebook {
  /**
   * Determine whether or not to allow signing in natively using Facebook
   *
   */
  enabled: boolean;
}
/**
 * Configuration for OIDC backchannel logout
 */
export interface ClientOidcLogout {
  [key: string]: any | any;
  /**
   * Comma-separated list of URLs that are valid to call back from Auth0 for OIDC backchannel logout. Currently only one URL is allowed.
   *
   */
  backchannel_logout_urls: Array<string>;
}
/**
 * Refresh token configuration
 */
export interface ClientRefreshToken {
  /**
   * Refresh token rotation types, one of: rotating, non-rotating
   *
   */
  rotation_type: ClientRefreshTokenRotationTypeEnum;
  /**
   * Refresh token expiration types, one of: expiring, non-expiring
   *
   */
  expiration_type: ClientRefreshTokenExpirationTypeEnum;
  /**
   * Period in seconds where the previous refresh token can be exchanged without triggering breach detection
   *
   */
  leeway?: number;
  /**
   * Period (in seconds) for which refresh tokens will remain valid
   *
   */
  token_lifetime?: number;
  /**
   * Prevents tokens from having a set lifetime when `true` (takes precedence over `token_lifetime` values)
   *
   */
  infinite_token_lifetime?: boolean;
  /**
   * Period (in seconds) for which refresh tokens will remain valid without use
   *
   */
  idle_token_lifetime?: number;
  /**
   * Prevents tokens from expiring without use when `true` (takes precedence over `idle_token_lifetime` values)
   *
   */
  infinite_idle_token_lifetime?: boolean;
}

export const ClientRefreshTokenRotationTypeEnum = {
  rotating: 'rotating',
  non_rotating: 'non-rotating',
} as const;
export type ClientRefreshTokenRotationTypeEnum =
  (typeof ClientRefreshTokenRotationTypeEnum)[keyof typeof ClientRefreshTokenRotationTypeEnum];

export const ClientRefreshTokenExpirationTypeEnum = {
  expiring: 'expiring',
  non_expiring: 'non-expiring',
} as const;
export type ClientRefreshTokenExpirationTypeEnum =
  (typeof ClientRefreshTokenExpirationTypeEnum)[keyof typeof ClientRefreshTokenExpirationTypeEnum];

/**
 *
 */
export interface ClientSigningKeysInner {
  [key: string]: any | any;
  /**
   * Signing certificate public key and chain in PKCS#7 (.P7B) format.
   *
   */
  pkcs7: string;
  /**
   * Signing certificate public key in X.590 (.CER) format.
   *
   */
  cert: string;
  /**
   * Subject name for this certificate in the format `/CN={domain}`.
   *
   */
  subject: string;
}
/**
 *
 */
export interface ClientUpdate {
  /**
   * The name of the client. Must contain at least one character. Does not allow '<' or '>'.
   *
   */
  name?: string;
  /**
   * Free text description of the purpose of the Client. (Max character length: <code>140</code>)
   *
   */
  description?: string;
  /**
   * The secret used to sign tokens for the client
   *
   */
  client_secret?: string;
  /**
   * The URL of the client logo (recommended size: 150x150)
   *
   */
  logo_uri?: string;
  /**
   * A set of URLs that are valid to call back from Auth0 when authenticating users
   *
   */
  callbacks?: Array<string>;
  /**
   */
  oidc_logout?: ClientUpdateOidcLogout | null;
  /**
   * A set of URLs that represents valid origins for CORS
   *
   */
  allowed_origins?: Array<string>;
  /**
   * A set of URLs that represents valid web origins for use with web message response mode
   *
   */
  web_origins?: Array<string>;
  /**
   * A set of grant types that the client is authorized to use
   *
   */
  grant_types?: Array<string>;
  /**
   * List of audiences for SAML protocol
   *
   */
  client_aliases?: Array<string>;
  /**
   * Ids of clients that will be allowed to perform delegation requests. Clients that will be allowed to make delegation request. By default, all your clients will be allowed. This field allows you to specify specific clients
   *
   */
  allowed_clients?: Array<string>;
  /**
   * URLs that are valid to redirect to after logout from Auth0.
   *
   */
  allowed_logout_urls?: Array<string>;
  /**
   */
  jwt_configuration?: ClientUpdateJwtConfiguration | null;
  /**
   */
  encryption_key?: ClientUpdateEncryptionKey | null;
  /**
   * <code>true</code> to use Auth0 instead of the IdP to do Single Sign On, <code>false</code> otherwise (default: <code>false</code>)
   *
   */
  sso?: boolean;
  /**
   * <code>true</code> if this client can be used to make cross-origin authentication requests, <code>false</code> otherwise if cross origin is disabled
   *
   */
  cross_origin_authentication?: boolean;
  /**
   * URL for the location in your site where the cross origin verification takes place for the cross-origin auth flow when performing Auth in your own domain instead of Auth0 hosted login page.
   *
   */
  cross_origin_loc?: string | null;
  /**
   * <code>true</code> to disable Single Sign On, <code>false</code> otherwise (default: <code>false</code>)
   *
   */
  sso_disabled?: boolean;
  /**
   * <code>true</code> if the custom login page is to be used, <code>false</code> otherwise.
   *
   */
  custom_login_page_on?: boolean;
  /**
   * Defines the requested authentication method for the token endpoint. Possible values are 'none' (public client without a client secret), 'client_secret_post' (client uses HTTP POST parameters) or 'client_secret_basic' (client uses HTTP Basic)
   *
   */
  token_endpoint_auth_method?: ClientUpdateTokenEndpointAuthMethodEnum;
  /**
   * The type of application this client represents
   *
   */
  app_type?: ClientUpdateAppTypeEnum;
  /**
   * Whether this client a first party client or not
   *
   */
  is_first_party?: boolean;
  /**
   * Whether this client will conform to strict OIDC specifications
   *
   */
  oidc_conformant?: boolean;
  /**
   * The content (HTML, CSS, JS) of the custom login page
   *
   */
  custom_login_page?: string;
  /**
   */
  custom_login_page_preview?: string;
  /**
   * Form template for WS-Federation protocol
   *
   */
  form_template?: string;
  /**
   */
  addons?: ClientUpdateAddons | null;
  /**
   * Metadata associated with the client, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.  Field names (max 255 chars) are alphanumeric and may only include the following special characters:  :,-+=_*?"/\()<>@	[Tab] [Space]
   *
   */
  client_metadata?: { [key: string]: any };
  /**
   */
  mobile?: ClientUpdateMobile | null;
  /**
   * Initiate login uri, must be https
   *
   */
  initiate_login_uri?: string;
  /**
   */
  native_social_login?: ClientCreateNativeSocialLogin | null;
  /**
   */
  refresh_token?: ClientRefreshToken | null;
  /**
   * Defines how to proceed during an authentication transaction with regards an organization. Can be `deny` (default), `allow` or `require`.
   *
   */
  organization_usage?: ClientUpdateOrganizationUsageEnum;
  /**
   * Defines how to proceed during an authentication transaction when `client.organization_usage: 'require'`. Can be `no_prompt` (default), `pre_login_prompt` or `post_login_prompt`. `post_login_prompt` requires `oidc_conformant: true`.
   *
   */
  organization_require_behavior?: ClientUpdateOrganizationRequireBehaviorEnum;
  /**
   */
  client_authentication_methods?: ClientUpdateClientAuthenticationMethods | null;
}

export const ClientUpdateTokenEndpointAuthMethodEnum = {
  none: 'none',
  client_secret_post: 'client_secret_post',
  client_secret_basic: 'client_secret_basic',
  null: 'null',
} as const;
export type ClientUpdateTokenEndpointAuthMethodEnum =
  (typeof ClientUpdateTokenEndpointAuthMethodEnum)[keyof typeof ClientUpdateTokenEndpointAuthMethodEnum];

export const ClientUpdateAppTypeEnum = {
  native: 'native',
  spa: 'spa',
  regular_web: 'regular_web',
  non_interactive: 'non_interactive',
  rms: 'rms',
  box: 'box',
  cloudbees: 'cloudbees',
  concur: 'concur',
  dropbox: 'dropbox',
  mscrm: 'mscrm',
  echosign: 'echosign',
  egnyte: 'egnyte',
  newrelic: 'newrelic',
  office365: 'office365',
  salesforce: 'salesforce',
  sentry: 'sentry',
  sharepoint: 'sharepoint',
  slack: 'slack',
  springcm: 'springcm',
  zendesk: 'zendesk',
  zoom: 'zoom',
  sso_integration: 'sso_integration',
  oag: 'oag',
} as const;
export type ClientUpdateAppTypeEnum =
  (typeof ClientUpdateAppTypeEnum)[keyof typeof ClientUpdateAppTypeEnum];

export const ClientUpdateOrganizationUsageEnum = {
  deny: 'deny',
  allow: 'allow',
  require: 'require',
} as const;
export type ClientUpdateOrganizationUsageEnum =
  (typeof ClientUpdateOrganizationUsageEnum)[keyof typeof ClientUpdateOrganizationUsageEnum];

export const ClientUpdateOrganizationRequireBehaviorEnum = {
  no_prompt: 'no_prompt',
  pre_login_prompt: 'pre_login_prompt',
  post_login_prompt: 'post_login_prompt',
} as const;
export type ClientUpdateOrganizationRequireBehaviorEnum =
  (typeof ClientUpdateOrganizationRequireBehaviorEnum)[keyof typeof ClientUpdateOrganizationRequireBehaviorEnum];

/**
 * Addons enabled for this client and their associated configurations.
 */
export interface ClientUpdateAddons {
  /**
   */
  aws?: ClientCreateAddonsAws;
  /**
   */
  azure_blob?: ClientCreateAddonsAzureBlob;
  /**
   */
  azure_sb?: ClientCreateAddonsAzureSb;
  /**
   */
  rms?: ClientAddonsRms;
  /**
   */
  mscrm?: ClientAddonsMscrm;
  /**
   */
  slack?: ClientAddonsSlack;
  /**
   */
  sentry?: ClientCreateAddonsSentry;
  /**
   * Box SSO indicator (no configuration settings needed for Box SSO).
   *
   */
  box?: { [key: string]: any };
  /**
   * CloudBees SSO indicator (no configuration settings needed for CloudBees SSO).
   *
   */
  cloudbees?: { [key: string]: any };
  /**
   * Concur SSO indicator (no configuration settings needed for Concur SSO).
   *
   */
  concur?: { [key: string]: any };
  /**
   * Dropbox SSO indicator (no configuration settings needed for Dropbox SSO).
   *
   */
  dropbox?: { [key: string]: any };
  /**
   */
  echosign?: ClientCreateAddonsEchosign;
  /**
   */
  egnyte?: ClientCreateAddonsEgnyte;
  /**
   */
  firebase?: ClientCreateAddonsFirebase;
  /**
   */
  newrelic?: ClientCreateAddonsNewrelic;
  /**
   */
  office365?: ClientCreateAddonsOffice365;
  /**
   */
  salesforce?: ClientCreateAddonsSalesforce;
  /**
   */
  salesforce_api?: ClientCreateAddonsSalesforceApi;
  /**
   */
  salesforce_sandbox_api?: ClientCreateAddonsSalesforceSandboxApi;
  /**
   */
  samlp?: ClientCreateAddonsSamlp;
  /**
   */
  layer?: ClientAddonsLayer;
  /**
   */
  sap_api?: ClientCreateAddonsSapApi;
  /**
   */
  sharepoint?: ClientCreateAddonsSharepoint;
  /**
   */
  springcm?: ClientCreateAddonsSpringcm;
  /**
   */
  wams?: ClientCreateAddonsWams;
  /**
   * WS-Fed (WIF) addon indicator. Actual configuration is stored in `callback` and `client_aliases` properties on the client.
   *
   */
  wsfed?: { [key: string]: any };
  /**
   */
  zendesk?: ClientCreateAddonsZendesk;
  /**
   */
  zoom?: ClientCreateAddonsZoom;
  /**
   */
  sso_integration?: ClientCreateAddonsSsoIntegration;
  /**
   * Okta Access Gateway SSO configuration
   *
   */
  oag?: object | null;
}
/**
 * Defines client authentication methods.
 */
export interface ClientUpdateClientAuthenticationMethods {
  /**
   */
  private_key_jwt?: ClientClientAuthenticationMethodsPrivateKeyJwt;
}
/**
 * The client's encryption key
 */
export interface ClientUpdateEncryptionKey {
  /**
   * Encryption public key
   *
   */
  pub?: string;
  /**
   * Encryption certificate
   *
   */
  cert?: string;
  /**
   * Certificate subject
   *
   */
  subject?: string;
}
/**
 * An object that holds settings related to how JWTs are created
 */
export interface ClientUpdateJwtConfiguration {
  /**
   * The amount of time (in seconds) that the token will be valid after being issued
   *
   */
  lifetime_in_seconds?: number;
  /**
   */
  scopes?: { [key: string]: any };
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`. `PS256` available via addon.
   *
   */
  alg?: ClientUpdateJwtConfigurationAlgEnum;
}

export const ClientUpdateJwtConfigurationAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
  PS256: 'PS256',
} as const;
export type ClientUpdateJwtConfigurationAlgEnum =
  (typeof ClientUpdateJwtConfigurationAlgEnum)[keyof typeof ClientUpdateJwtConfigurationAlgEnum];

/**
 * Configuration related to native mobile apps
 */
export interface ClientUpdateMobile {
  /**
   */
  android?: ClientUpdateMobileAndroid | null;
  /**
   */
  ios?: ClientUpdateMobileIos | null;
}
/**
 * Configuration related to Android native apps
 */
export interface ClientUpdateMobileAndroid {
  /**
   * Application package name found in <code>AndroidManifest.xml</code>
   *
   */
  app_package_name?: string;
  /**
   * The SHA256 fingerprints of your app's signing certificate. Multiple fingerprints can be used to support different versions of your app, such as debug and production builds
   *
   */
  sha256_cert_fingerprints?: Array<string>;
}
/**
 * Configuration related to iOS native apps
 */
export interface ClientUpdateMobileIos {
  /**
   * Identifier assigned to the account that signs and upload the app to the store
   *
   */
  team_id?: string;
  /**
   * Assigned by the developer to the app as its unique identifier inside the store, usually is a reverse domain plus the app name: <code>com.you.MyApp</code>
   *
   */
  app_bundle_identifier?: string;
}
/**
 * Configuration for OIDC backchannel logout
 */
export interface ClientUpdateOidcLogout {
  /**
   * Comma-separated list of URLs that are valid to call back from Auth0 for OIDC backchannel logout. Currently only one URL is allowed.
   *
   */
  backchannel_logout_urls?: Array<string>;
}
/**
 *
 */
export interface Connection {
  /**
   * The name of the connection
   *
   */
  name: string;
  /**
   * Connection name used in login screen
   *
   */
  display_name: string;
  /**
   */
  options: { [key: string]: any };
  /**
   * The connection's identifier
   *
   */
  id: string;
  /**
   * The type of the connection, related to the identity provider
   *
   */
  strategy: string;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm.
   *
   */
  realms: Array<string>;
  /**
   * True if the connection is domain level
   *
   */
  is_domain_connection: boolean;
  /**
   * Metadata associated with the connection in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   *
   */
  metadata: { [key: string]: any };
}
/**
 *
 */
export interface ConnectionCreate {
  /**
   * The name of the connection. Must start and end with an alphanumeric character and can only contain alphanumeric characters and '-'. Max length 128
   *
   */
  name: string;
  /**
   * Connection name used in the new universal login experience
   *
   */
  display_name?: string;
  /**
   * The identity provider identifier for the connection
   *
   */
  strategy: ConnectionCreateStrategyEnum;
  /**
   */
  options?: ConnectionCreateOptions;
  /**
   * The identifiers of the clients for which the connection is to be enabled. If the array is empty or the property is not specified, no clients are enabled
   *
   */
  enabled_clients?: Array<string>;
  /**
   */
  is_domain_connection?: boolean;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm.
   *
   */
  realms?: Array<string>;
  /**
   * Metadata associated with the connection in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   *
   */
  metadata?: { [key: string]: any };
}

export const ConnectionCreateStrategyEnum = {
  ad: 'ad',
  adfs: 'adfs',
  amazon: 'amazon',
  apple: 'apple',
  dropbox: 'dropbox',
  bitbucket: 'bitbucket',
  aol: 'aol',
  auth0_oidc: 'auth0-oidc',
  auth0: 'auth0',
  baidu: 'baidu',
  bitly: 'bitly',
  box: 'box',
  custom: 'custom',
  daccount: 'daccount',
  dwolla: 'dwolla',
  email: 'email',
  evernote_sandbox: 'evernote-sandbox',
  evernote: 'evernote',
  exact: 'exact',
  facebook: 'facebook',
  fitbit: 'fitbit',
  flickr: 'flickr',
  github: 'github',
  google_apps: 'google-apps',
  google_oauth2: 'google-oauth2',
  instagram: 'instagram',
  ip: 'ip',
  line: 'line',
  linkedin: 'linkedin',
  miicard: 'miicard',
  oauth1: 'oauth1',
  oauth2: 'oauth2',
  office365: 'office365',
  oidc: 'oidc',
  okta: 'okta',
  paypal: 'paypal',
  paypal_sandbox: 'paypal-sandbox',
  pingfederate: 'pingfederate',
  planningcenter: 'planningcenter',
  renren: 'renren',
  salesforce_community: 'salesforce-community',
  salesforce_sandbox: 'salesforce-sandbox',
  salesforce: 'salesforce',
  samlp: 'samlp',
  sharepoint: 'sharepoint',
  shopify: 'shopify',
  sms: 'sms',
  soundcloud: 'soundcloud',
  thecity_sandbox: 'thecity-sandbox',
  thecity: 'thecity',
  thirtysevensignals: 'thirtysevensignals',
  twitter: 'twitter',
  untappd: 'untappd',
  vkontakte: 'vkontakte',
  waad: 'waad',
  weibo: 'weibo',
  windowslive: 'windowslive',
  wordpress: 'wordpress',
  yahoo: 'yahoo',
  yammer: 'yammer',
  yandex: 'yandex',
} as const;
export type ConnectionCreateStrategyEnum =
  (typeof ConnectionCreateStrategyEnum)[keyof typeof ConnectionCreateStrategyEnum];

/**
 * The connection's options (depend on the connection strategy)
 */
export interface ConnectionCreateOptions {
  [key: string]: any | any;
  /**
   */
  validation?: ConnectionCreateOptionsValidation | null;
  /**
   * An array of user fields that should not be stored in the Auth0 database (https://manage.local.dev.auth0.com/docs/security/data-security/denylist)
   *
   */
  non_persistent_attrs?: Array<string>;
  /**
   */
  enable_script_context?: boolean;
  /**
   * Set to true to use a legacy user store
   *
   */
  enabledDatabaseCustomization?: boolean;
  /**
   * Enable this if you have a legacy user store and you want to gradually migrate those users to the Auth0 user store
   *
   */
  import_mode?: boolean;
  /**
   */
  customScripts?: ConnectionCreateOptionsCustomScripts;
  /**
   */
  authentication_methods?: ConnectionCreateOptionsAuthenticationMethods | null;
  /**
   */
  passkey_options?: ConnectionCreateOptionsPasskeyOptions | null;
  /**
   * Password strength level
   *
   */
  passwordPolicy?: ConnectionCreateOptionsPasswordPolicyEnum;
  /**
   */
  password_complexity_options?: ConnectionCreateOptionsPasswordComplexityOptions | null;
  /**
   */
  password_history?: ConnectionCreateOptionsPasswordHistory | null;
  /**
   */
  password_no_personal_info?: ConnectionCreateOptionsPasswordNoPersonalInfo | null;
  /**
   */
  password_dictionary?: ConnectionCreateOptionsPasswordDictionary | null;
  /**
   */
  api_enable_users?: boolean;
  /**
   */
  basic_profile?: boolean;
  /**
   */
  ext_admin?: boolean;
  /**
   */
  ext_is_suspended?: boolean;
  /**
   */
  ext_agreed_terms?: boolean;
  /**
   */
  ext_groups?: boolean;
  /**
   */
  ext_assigned_plans?: boolean;
  /**
   */
  ext_profile?: boolean;
  /**
   */
  disable_self_service_change_password?: boolean;
  /**
   * Options for adding parameters in the request to the upstream IdP
   *
   */
  upstream_params?: { [key: string]: any } | null;
  /**
   * Determines whether the 'name', 'given_name', 'family_name', 'nickname', and 'picture' attributes can be independently updated when using an external IdP. Possible values are 'on_each_login' (default value, it configures the connection to automatically update the root attributes from the external IdP with each user login. When this setting is used, root attributes cannot be independently updated), 'on_first_login' (configures the connection to only set the root attributes on first login, allowing them to be independently updated thereafter)
   *
   */
  set_user_root_attributes?: ConnectionCreateOptionsSetUserRootAttributesEnum;
  /**
   */
  gateway_authentication?: ConnectionCreateOptionsGatewayAuthentication | null;
}

export const ConnectionCreateOptionsPasswordPolicyEnum = {
  none: 'none',
  low: 'low',
  fair: 'fair',
  good: 'good',
  excellent: 'excellent',
  null: 'null',
} as const;
export type ConnectionCreateOptionsPasswordPolicyEnum =
  (typeof ConnectionCreateOptionsPasswordPolicyEnum)[keyof typeof ConnectionCreateOptionsPasswordPolicyEnum];

export const ConnectionCreateOptionsSetUserRootAttributesEnum = {
  each_login: 'on_each_login',
  first_login: 'on_first_login',
} as const;
export type ConnectionCreateOptionsSetUserRootAttributesEnum =
  (typeof ConnectionCreateOptionsSetUserRootAttributesEnum)[keyof typeof ConnectionCreateOptionsSetUserRootAttributesEnum];

/**
 * Options for enabling authentication methods.
 */
export interface ConnectionCreateOptionsAuthenticationMethods {
  /**
   */
  password?: ConnectionCreateOptionsAuthenticationMethodsPassword;
  /**
   */
  passkey?: ConnectionCreateOptionsAuthenticationMethodsPasskey;
}
/**
 * Passkey authentication enablement
 */
export interface ConnectionCreateOptionsAuthenticationMethodsPasskey {
  /**
   * Determines whether passkeys are enabled
   *
   */
  enabled?: boolean;
}
/**
 * Password authentication enablement
 */
export interface ConnectionCreateOptionsAuthenticationMethodsPassword {
  /**
   * Determines whether passwords are enabled
   *
   */
  enabled?: boolean;
}
/**
 * A map of scripts used to integrate with a custom database.
 */
export interface ConnectionCreateOptionsCustomScripts {
  [key: string]: any | any;
  /**
   */
  login?: string;
  /**
   */
  get_user?: string;
  /**
   */
  _delete?: string;
  /**
   */
  change_password?: string;
  /**
   */
  verify?: string;
  /**
   */
  create?: string;
}
/**
 * Token-based authentication settings to be applied when connection is using an sms strategy.
 */
export interface ConnectionCreateOptionsGatewayAuthentication {
  [key: string]: any | any;
  /**
   * The Authorization header type.
   *
   */
  method: string;
  /**
   * The subject to be added to the JWT payload.
   *
   */
  subject?: string;
  /**
   * The audience to be added to the JWT payload.
   *
   */
  audience: string;
  /**
   * The secret to be used for signing tokens.
   *
   */
  secret: string;
  /**
   * Set to true if the provided secret is base64 encoded.
   *
   */
  secret_base64_encoded?: boolean;
}
/**
 * Options for the passkey authentication method
 */
export interface ConnectionCreateOptionsPasskeyOptions {
  /**
   * Controls the UI used to challenge the user for their passkey.
   *
   */
  challenge_ui?: ConnectionCreateOptionsPasskeyOptionsChallengeUiEnum;
  /**
   * Enables or disables progressive enrollment of passkeys for the connection.
   *
   */
  progressive_enrollment_enabled?: boolean;
  /**
   * Enables or disables enrollment prompt for local passkey when user authenticates using a cross-device passkey for the connection.
   *
   */
  local_enrollment_enabled?: boolean;
}

export const ConnectionCreateOptionsPasskeyOptionsChallengeUiEnum = {
  both: 'both',
  autofill: 'autofill',
  button: 'button',
} as const;
export type ConnectionCreateOptionsPasskeyOptionsChallengeUiEnum =
  (typeof ConnectionCreateOptionsPasskeyOptionsChallengeUiEnum)[keyof typeof ConnectionCreateOptionsPasskeyOptionsChallengeUiEnum];

/**
 * Password complexity options
 */
export interface ConnectionCreateOptionsPasswordComplexityOptions {
  /**
   * Minimum password length
   *
   */
  min_length?: number;
}
/**
 * Options for password dictionary policy
 */
export interface ConnectionCreateOptionsPasswordDictionary {
  /**
   */
  enable: boolean;
  /**
   * Custom Password Dictionary. An array of up to 200 entries.
   *
   */
  dictionary?: Array<string>;
}
/**
 * Options for password history policy
 */
export interface ConnectionCreateOptionsPasswordHistory {
  /**
   */
  enable: boolean;
  /**
   */
  size?: number;
}
/**
 * Options for password expiration policy
 */
export interface ConnectionCreateOptionsPasswordNoPersonalInfo {
  /**
   */
  enable: boolean;
}
/**
 * Options for validation
 */
export interface ConnectionCreateOptionsValidation {
  /**
   */
  username?: ConnectionCreateOptionsValidationUsername | null;
}
/**
 *
 */
export interface ConnectionCreateOptionsValidationUsername {
  /**
   */
  min: number;
  /**
   */
  max: number;
}
/**
 *
 */
export interface ConnectionUpdate {
  /**
   * The connection name used in the new universal login experience. If display_name is not included in the request, the field will be overwritten with the name value.
   *
   */
  display_name?: string;
  /**
   */
  options?: ConnectionUpdateOptions | null;
  /**
   * The identifiers of the clients for which the connection is to be enabled. If the property is not specified, no clients are enabled. If the array is empty, the connection will be disabled for every client.
   *
   */
  enabled_clients?: Array<string>;
  /**
   */
  is_domain_connection?: boolean;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm.
   *
   */
  realms?: Array<string>;
  /**
   * Metadata associated with the connection in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   *
   */
  metadata?: { [key: string]: any };
}
/**
 * The connection's options (depend on the connection strategy)
 */
export interface ConnectionUpdateOptions {
  [key: string]: any | any;
  /**
   */
  validation?: ConnectionCreateOptionsValidation | null;
  /**
   * An array of user fields that should not be stored in the Auth0 database (https://manage.local.dev.auth0.com/docs/security/data-security/denylist)
   *
   */
  non_persistent_attrs?: Array<string>;
  /**
   */
  enable_script_context?: boolean;
  /**
   * Set to true to use a legacy user store
   *
   */
  enabledDatabaseCustomization?: boolean;
  /**
   * Enable this if you have a legacy user store and you want to gradually migrate those users to the Auth0 user store
   *
   */
  import_mode?: boolean;
  /**
   */
  customScripts?: ConnectionCreateOptionsCustomScripts;
  /**
   */
  authentication_methods?: ConnectionCreateOptionsAuthenticationMethods | null;
  /**
   */
  passkey_options?: ConnectionCreateOptionsPasskeyOptions | null;
  /**
   * Password strength level
   *
   */
  passwordPolicy?: ConnectionUpdateOptionsPasswordPolicyEnum;
  /**
   */
  password_complexity_options?: ConnectionCreateOptionsPasswordComplexityOptions | null;
  /**
   */
  password_history?: ConnectionCreateOptionsPasswordHistory | null;
  /**
   */
  password_no_personal_info?: ConnectionCreateOptionsPasswordNoPersonalInfo | null;
  /**
   */
  password_dictionary?: ConnectionCreateOptionsPasswordDictionary | null;
  /**
   */
  api_enable_users?: boolean;
  /**
   */
  basic_profile?: boolean;
  /**
   */
  ext_admin?: boolean;
  /**
   */
  ext_is_suspended?: boolean;
  /**
   */
  ext_agreed_terms?: boolean;
  /**
   */
  ext_groups?: boolean;
  /**
   */
  ext_assigned_plans?: boolean;
  /**
   */
  ext_profile?: boolean;
  /**
   */
  disable_self_service_change_password?: boolean;
  /**
   * Options for adding parameters in the request to the upstream IdP
   *
   */
  upstream_params?: { [key: string]: any } | null;
  /**
   * Determines whether the 'name', 'given_name', 'family_name', 'nickname', and 'picture' attributes can be independently updated when using an external IdP. Possible values are 'on_each_login' (default value, it configures the connection to automatically update the root attributes from the external IdP with each user login. When this setting is used, root attributes cannot be independently updated), 'on_first_login' (configures the connection to only set the root attributes on first login, allowing them to be independently updated thereafter)
   *
   */
  set_user_root_attributes?: ConnectionUpdateOptionsSetUserRootAttributesEnum;
  /**
   */
  gateway_authentication?: ConnectionCreateOptionsGatewayAuthentication | null;
}

export const ConnectionUpdateOptionsPasswordPolicyEnum = {
  none: 'none',
  low: 'low',
  fair: 'fair',
  good: 'good',
  excellent: 'excellent',
  null: 'null',
} as const;
export type ConnectionUpdateOptionsPasswordPolicyEnum =
  (typeof ConnectionUpdateOptionsPasswordPolicyEnum)[keyof typeof ConnectionUpdateOptionsPasswordPolicyEnum];

export const ConnectionUpdateOptionsSetUserRootAttributesEnum = {
  each_login: 'on_each_login',
  first_login: 'on_first_login',
} as const;
export type ConnectionUpdateOptionsSetUserRootAttributesEnum =
  (typeof ConnectionUpdateOptionsSetUserRootAttributesEnum)[keyof typeof ConnectionUpdateOptionsSetUserRootAttributesEnum];

/**
 *
 */
export interface CustomDomain {
  /**
   * ID of the custom domain.
   *
   */
  custom_domain_id: string;
  /**
   * Domain name.
   *
   */
  domain: string;
  /**
   * Whether this is a primary domain (true) or not (false).
   *
   */
  primary: boolean;
  /**
   * Custom domain configuration status. Can be `disabled`, `pending`, `pending_verification`, or `ready`.
   *
   */
  status: CustomDomainStatusEnum;
  /**
   * Custom domain provisioning type. Can be `auth0_managed_certs` or `self_managed_certs`.
   *
   */
  type: CustomDomainTypeEnum;
  /**
   * Intermediate address.
   *
   */
  origin_domain_name?: string;
  /**
   */
  verification?: PostCustomDomains201ResponseVerification;
  /**
   * The HTTP header to fetch the client's IP address
   *
   */
  custom_client_ip_header?: string | null;
  /**
   * The TLS version policy
   *
   */
  tls_policy?: string;
}

export const CustomDomainStatusEnum = {
  disabled: 'disabled',
  pending: 'pending',
  pending_verification: 'pending_verification',
  ready: 'ready',
} as const;
export type CustomDomainStatusEnum =
  (typeof CustomDomainStatusEnum)[keyof typeof CustomDomainStatusEnum];

export const CustomDomainTypeEnum = {
  auth0_managed_certs: 'auth0_managed_certs',
  self_managed_certs: 'self_managed_certs',
} as const;
export type CustomDomainTypeEnum = (typeof CustomDomainTypeEnum)[keyof typeof CustomDomainTypeEnum];

/**
 *
 */
export interface DeleteMembersRequest {
  [key: string]: any | any;
  /**
   * List of user IDs to remove from the organization.
   *
   */
  members: Array<string>;
}
/**
 *
 */
export interface DeleteOrganizationMemberRolesRequest {
  /**
   * List of roles IDs associated with the organization member to remove.
   *
   */
  roles: Array<string>;
}
/**
 *
 */
export interface DeletePermissionsRequest {
  /**
   * List of permissions to remove from this user.
   *
   */
  permissions: Array<PostRolePermissionAssignmentRequestPermissionsInner>;
}
/**
 *
 */
export interface DeleteUserIdentityByUserId200ResponseInner {
  /**
   * The name of the connection for the identity.
   *
   */
  connection: string;
  /**
   * The unique identifier for the user for the identity.
   *
   */
  user_id: string;
  /**
   * The type of identity provider.
   *
   */
  provider: string;
  /**
   * <code>true</code> if the identity provider is a social provider, <code>false</code>s otherwise
   *
   */
  isSocial?: boolean;
  /**
   * IDP access token returned only if scope read:user_idp_tokens is defined
   *
   */
  access_token?: string;
  /**
   * IDP access token secret returned only if scope read:user_idp_tokens is defined.
   *
   */
  access_token_secret?: string;
  /**
   * IDP refresh token returned only if scope read:user_idp_tokens is defined.
   *
   */
  refresh_token?: string;
  /**
   */
  profileData?: UserProfile;
}
/**
 *
 */
export interface DeleteUserRolesRequest {
  /**
   * List of roles IDs to remove from the user.
   *
   */
  roles: Array<string>;
}
/**
 *
 */
export interface DeviceCredential {
  /**
   * ID of this device.
   *
   */
  id?: string;
  /**
   * User agent for this device
   *
   */
  device_name?: string;
  /**
   * Unique identifier for the device. NOTE: This field is generally not populated for refresh_tokens and rotating_refresh_tokens
   *
   */
  device_id?: string;
  /**
   * Type of credential. Can be `public_key`, `refresh_token`, or `rotating_refresh_token`.
   *
   */
  type?: DeviceCredentialTypeEnum;
  /**
   * user_id this credential is associated with.
   *
   */
  user_id?: string;
  /**
   * client_id of the client (application) this credential is for.
   *
   */
  client_id?: string;
}

export const DeviceCredentialTypeEnum = {
  public_key: 'public_key',
  refresh_token: 'refresh_token',
  rotating_refresh_token: 'rotating_refresh_token',
} as const;
export type DeviceCredentialTypeEnum =
  (typeof DeviceCredentialTypeEnum)[keyof typeof DeviceCredentialTypeEnum];

/**
 *
 */
export interface DeviceCredentialCreate {
  [key: string]: any | any;
  /**
   * Name for this device easily recognized by owner.
   *
   */
  device_name: string;
  /**
   * Type of credential. Must be `public_key`.
   *
   */
  type: DeviceCredentialCreateTypeEnum;
  /**
   * Base64 encoded string containing the credential.
   *
   */
  value: string;
  /**
   * Unique identifier for the device. Recommend using <a href="http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID">Android_ID</a> on Android and <a href="https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIDevice_Class/index.html#//apple_ref/occ/instp/UIDevice/identifierForVendor">identifierForVendor</a>.
   *
   */
  device_id: string;
  /**
   * client_id of the client (application) this credential is for.
   *
   */
  client_id?: string;
}

export const DeviceCredentialCreateTypeEnum = {
  public_key: 'public_key',
} as const;
export type DeviceCredentialCreateTypeEnum =
  (typeof DeviceCredentialCreateTypeEnum)[keyof typeof DeviceCredentialCreateTypeEnum];

/**
 *
 */
export interface EmailProvider {
  /**
   * Name of the email provider. Can be `mailgun`, `mandrill`, `sendgrid`, `ses`, `sparkpost`, `smtp`, `azure_cs`, or `ms365`.
   *
   */
  name: string;
  /**
   * Whether the provider is enabled (true) or disabled (false).
   *
   */
  enabled: boolean;
  /**
   * Email address to use as "from" when no other address specified.
   *
   */
  default_from_address: string;
  /**
   */
  credentials: EmailProviderCredentials;
  /**
   * Specific provider setting
   *
   */
  settings: { [key: string]: any };
}
/**
 *
 */
export interface EmailProviderCreate {
  /**
   * Name of the email provider. Can be `mailgun`, `mandrill`, `sendgrid`, `ses`, `sparkpost`, `smtp`, `azure_cs`, or `ms365`.
   *
   */
  name: EmailProviderCreateNameEnum;
  /**
   * Whether the provider is enabled (true) or disabled (false).
   *
   */
  enabled?: boolean;
  /**
   * Email address to use as "from" when no other address specified.
   *
   */
  default_from_address?: string;
  /**
   */
  credentials: EmailProviderUpdateCredentials;
  /**
   * Specific provider setting
   *
   */
  settings?: { [key: string]: any } | null;
}

export const EmailProviderCreateNameEnum = {
  mailgun: 'mailgun',
  mandrill: 'mandrill',
  sendgrid: 'sendgrid',
  ses: 'ses',
  sparkpost: 'sparkpost',
  smtp: 'smtp',
  azure_cs: 'azure_cs',
  ms365: 'ms365',
} as const;
export type EmailProviderCreateNameEnum =
  (typeof EmailProviderCreateNameEnum)[keyof typeof EmailProviderCreateNameEnum];

/**
 * Credentials required to use the provider.
 */
export interface EmailProviderCredentials {
  /**
   * API User.
   *
   */
  api_user: string;
  /**
   * AWS or SparkPost region.
   *
   */
  region: string;
  /**
   * SMTP host.
   *
   */
  smtp_host: string;
  /**
   * SMTP port.
   *
   */
  smtp_port: number;
  /**
   * SMTP username.
   *
   */
  smtp_user: string;
}
/**
 *
 */
export interface EmailProviderUpdate {
  /**
   * Name of the email provider. Can be `mailgun`, `mandrill`, `sendgrid`, `ses`, `sparkpost`, `smtp`, `azure_cs`, or `ms365`.
   *
   */
  name?: EmailProviderUpdateNameEnum;
  /**
   * Whether the provider is enabled (true) or disabled (false).
   *
   */
  enabled?: boolean;
  /**
   * Email address to use as "from" when no other address specified.
   *
   */
  default_from_address?: string;
  /**
   */
  credentials?: EmailProviderUpdateCredentials;
  /**
   * Specific provider setting
   *
   */
  settings?: { [key: string]: any } | null;
}

export const EmailProviderUpdateNameEnum = {
  mailgun: 'mailgun',
  mandrill: 'mandrill',
  sendgrid: 'sendgrid',
  ses: 'ses',
  sparkpost: 'sparkpost',
  smtp: 'smtp',
  azure_cs: 'azure_cs',
  ms365: 'ms365',
} as const;
export type EmailProviderUpdateNameEnum =
  (typeof EmailProviderUpdateNameEnum)[keyof typeof EmailProviderUpdateNameEnum];

/**
 * Credentials required to use the provider.
 */
export type EmailProviderUpdateCredentials = any;
/**
 *
 */
export interface EmailTemplateUpdate {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   *
   */
  template: EmailTemplateUpdateTemplateEnum;
  /**
   * Body of the email template.
   *
   */
  body: string | null;
  /**
   * Senders `from` email address.
   *
   */
  from: string | null;
  /**
   * URL to redirect the user to after a successful action.
   *
   */
  resultUrl?: string | null;
  /**
   * Subject line of the email.
   *
   */
  subject: string | null;
  /**
   * Syntax of the template body.
   *
   */
  syntax: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   *
   */
  urlLifetimeInSeconds?: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   *
   */
  includeEmailInRedirect?: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   *
   */
  enabled: boolean | null;
}

export const EmailTemplateUpdateTemplateEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type EmailTemplateUpdateTemplateEnum =
  (typeof EmailTemplateUpdateTemplateEnum)[keyof typeof EmailTemplateUpdateTemplateEnum];

/**
 *
 */
export interface Enrollment {
  /**
   * ID for this enrollment.
   *
   */
  id: string;
  /**
   * Status of this enrollment. Can be `pending` or `confirmed`.
   *
   */
  status?: EnrollmentStatusEnum;
  /**
   * Device name (only for push notification).
   *
   */
  name?: string;
  /**
   * Device identifier. This is usually the phone identifier.
   *
   */
  identifier?: string;
  /**
   * Phone number.
   *
   */
  phone_number?: string;
  /**
   */
  enrolled_at?: EnrollmentEnrolledAt;
  /**
   */
  last_auth?: EnrollmentLastAuth;
}

export const EnrollmentStatusEnum = {
  pending: 'pending',
  confirmed: 'confirmed',
} as const;
export type EnrollmentStatusEnum = (typeof EnrollmentStatusEnum)[keyof typeof EnrollmentStatusEnum];

/**
 *
 */
export interface EnrollmentCreate {
  /**
   * user_id for the enrollment ticket
   *
   */
  user_id: string;
  /**
   * alternate email to which the enrollment email will be sent. Optional - by default, the email will be sent to the user's default address
   *
   */
  email?: string;
  /**
   * Send an email to the user to start the enrollment
   *
   */
  send_mail?: boolean;
}
/**
 *
 */
export type EnrollmentEnrolledAt = string;
/**
 *
 */
export type EnrollmentLastAuth = string;
/**
 *
 */
export interface Factor {
  /**
   * Whether this factor is enabled (true) or disabled (false).
   *
   */
  enabled: boolean;
  /**
   * Whether trial limits have been exceeded.
   *
   */
  trial_expired?: boolean;
  /**
   * Factor name. Can be `sms`, `push-notification`, `email`, `duo` `otp` `webauthn-roaming`, `webauthn-platform`, or `recovery-code`.
   *
   */
  name?: FactorNameEnum;
}

export const FactorNameEnum = {
  push_notification: 'push-notification',
  sms: 'sms',
  email: 'email',
  duo: 'duo',
  otp: 'otp',
  webauthn_roaming: 'webauthn-roaming',
  webauthn_platform: 'webauthn-platform',
  recovery_code: 'recovery-code',
} as const;
export type FactorNameEnum = (typeof FactorNameEnum)[keyof typeof FactorNameEnum];

/**
 *
 */
export interface GetActionVersions200Response {
  /**
   * The total result count.
   *
   */
  total: number;
  /**
   * Page index of the results being returned. First page is 0.
   *
   */
  page: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page: number;
  /**
   */
  versions: Array<GetActionVersions200ResponseVersionsInner>;
}
/**
 *
 */
export interface GetActionVersions200ResponseVersionsInner {
  /**
   * The unique id of an action version.
   *
   */
  id: string;
  /**
   * The id of the action to which this version belongs.
   *
   */
  action_id: string;
  /**
   * The source code of this specific version of the action.
   *
   */
  code: string;
  /**
   * The list of third party npm modules, and their versions, that this specific version depends on.
   *
   */
  dependencies: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * Indicates if this speciic version is the currently one deployed.
   *
   */
  deployed: boolean;
  /**
   * The Node runtime. For example: `node12`
   *
   */
  runtime: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   *
   */
  secrets: Array<GetActions200ResponseActionsInnerSecretsInner>;
  /**
   * The build status of this specific version.
   *
   */
  status: GetActionVersions200ResponseVersionsInnerStatusEnum;
  /**
   * The index of this version in list of versions for the action.
   *
   */
  number: number;
  /**
   * Any errors that occurred while the version was being built.
   *
   */
  errors: Array<GetActionVersions200ResponseVersionsInnerErrorsInner>;
  /**
   * The action to which this verison belongs.
   *
   */
  action: any | null;
  /**
   * The time when this version was built successfully.
   *
   */
  built_at: string;
  /**
   * The time when this version was created.
   *
   */
  created_at: string;
  /**
   * The time when a version was updated. Versions are never updated externally. Only Auth0 will update an action version as it is beiing built.
   *
   */
  updated_at: string;
  /**
   * The list of triggers that this version supports. At this time, a version can only target a single trigger at a time.
   *
   */
  supported_triggers: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
}

export const GetActionVersions200ResponseVersionsInnerStatusEnum = {
  pending: 'pending',
  building: 'building',
  packaged: 'packaged',
  built: 'built',
  retrying: 'retrying',
  failed: 'failed',
} as const;
export type GetActionVersions200ResponseVersionsInnerStatusEnum =
  (typeof GetActionVersions200ResponseVersionsInnerStatusEnum)[keyof typeof GetActionVersions200ResponseVersionsInnerStatusEnum];

/**
 * Error is a generic error with a human readable id which should be easily referenced in support tickets.
 */
export interface GetActionVersions200ResponseVersionsInnerErrorsInner {
  /**
   */
  id: string;
  /**
   */
  msg: string;
  /**
   */
  url: string;
}
/**
 *
 */
export interface GetActions200Response {
  /**
   * The total result count.
   *
   */
  total: number;
  /**
   * Page index of the results being returned. First page is 0.
   *
   */
  page: number;
  /**
   * Number of results per page.
   *
   */
  per_page: number;
  /**
   * The list of actions.
   *
   */
  actions: Array<GetActions200ResponseActionsInner>;
}
/**
 *
 */
export interface GetActions200ResponseActionsInner {
  /**
   * The unique ID of the action.
   *
   */
  id: string;
  /**
   * The name of an action.
   *
   */
  name: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   *
   */
  supported_triggers: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   *
   */
  code: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   *
   */
  dependencies: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   *
   */
  runtime: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   *
   */
  secrets: Array<GetActions200ResponseActionsInnerSecretsInner>;
  /**
   * The version of the action that is currently deployed.
   *
   */
  deployed_version: { [key: string]: any };
  /**
   * installed_integration_id is the fk reference to the InstalledIntegration entity.
   *
   */
  installed_integration_id: string;
  /**
   */
  integration: GetActions200ResponseActionsInnerIntegration;
  /**
   * The build status of this action.
   *
   */
  status: GetActions200ResponseActionsInnerStatusEnum;
  /**
   * True if all of an Action's contents have been deployed.
   *
   */
  all_changes_deployed: boolean;
  /**
   * The time when this action was built successfully.
   *
   */
  built_at: string;
  /**
   * The time when this action was created.
   *
   */
  created_at: string;
  /**
   * The time when this action was updated.
   *
   */
  updated_at: string;
}

export const GetActions200ResponseActionsInnerStatusEnum = {
  pending: 'pending',
  building: 'building',
  packaged: 'packaged',
  built: 'built',
  retrying: 'retrying',
  failed: 'failed',
} as const;
export type GetActions200ResponseActionsInnerStatusEnum =
  (typeof GetActions200ResponseActionsInnerStatusEnum)[keyof typeof GetActions200ResponseActionsInnerStatusEnum];

/**
 * Dependency is an npm module. These values are used to produce an immutable artifact, which manifests as a layer_id.
 */
export interface GetActions200ResponseActionsInnerDependenciesInner {
  /**
   * name is the name of the npm module, e.g. lodash
   *
   */
  name: string;
  /**
   * description is the version of the npm module, e.g. 4.17.1
   *
   */
  version: string;
  /**
   * registry_url is an optional value used primarily for private npm registries.
   *
   */
  registry_url: string;
}
/**
 * Integration defines a self contained functioning unit which partners
 * publish. A partner may create one or many of these integrations.
 */
export interface GetActions200ResponseActionsInnerIntegration {
  /**
   * id is a system generated GUID. This same ID is designed to be federated in
   * all the applicable localities.
   *
   */
  id: string;
  /**
   * catalog_id refers to the ID in the marketplace catalog
   *
   */
  catalog_id: string;
  /**
   * url_slug refers to the url_slug in the marketplace catalog
   *
   */
  url_slug: string;
  /**
   * partner_id is the foreign key reference to the partner account this
   * integration belongs to.
   *
   */
  partner_id: string;
  /**
   * name is the integration name, which will be used for display purposes in
   * the marketplace.
   *
   * To start we're going to make sure the display name is at least 3
   * characters. Can adjust this easily later.
   *
   */
  name: string;
  /**
   * description adds more text for the integration name -- also relevant for
   * the marketplace listing.
   *
   */
  description: string;
  /**
   * short_description is the brief description of the integration, which is used for display purposes in cards
   *
   */
  short_description: string;
  /**
   */
  logo: string;
  /**
   * feature_type is the type of the integration.
   *
   */
  feature_type: GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum;
  /**
   */
  terms_of_use_url: string;
  /**
   */
  privacy_policy_url: string;
  /**
   */
  public_support_link: string;
  /**
   */
  current_release: GetActions200ResponseActionsInnerIntegrationCurrentRelease;
  /**
   */
  created_at: string;
  /**
   */
  updated_at: string;
}

export const GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum = {
  unspecified: 'unspecified',
  action: 'action',
  social_connection: 'social_connection',
  log_stream: 'log_stream',
  sso_integration: 'sso_integration',
  sms_provider: 'sms_provider',
} as const;
export type GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum =
  (typeof GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum)[keyof typeof GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum];

/**
 *
 */
export interface GetActions200ResponseActionsInnerIntegrationCurrentRelease {
  [key: string]: any | any;
  /**
   * The id of the associated IntegrationRelease
   *
   */
  id: string;
  /**
   */
  trigger: GetActions200ResponseActionsInnerSupportedTriggersInner;
  /**
   */
  semver: GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver;
  /**
   * required_secrets declares all the necessary secrets for an integration to
   * work.
   *
   */
  required_secrets: Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner>;
  /**
   * required_configuration declares all the necessary configuration fields for an integration to work.
   *
   */
  required_configuration: Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner>;
}
/**
 * Param are form input values, primarily utilized when specifying secrets and
 * configuration values for actions.
 *
 * These are especially important for partner integrations -- but can be
 * exposed to tenant admins as well if they want to parameterize their custom
 * actions.
 */
export interface GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner {
  /**
   */
  type: GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum;
  /**
   * The name of the parameter.
   *
   */
  name: string;
  /**
   * The flag for if this parameter is required.
   *
   */
  required: boolean;
  /**
   * The temp flag for if this parameter is required (experimental; for Labs use only).
   *
   */
  optional: boolean;
  /**
   * The short label for this parameter.
   *
   */
  label: string;
  /**
   * The lengthier description for this parameter.
   *
   */
  description: string;
  /**
   * The default value for this parameter.
   *
   */
  default_value: string;
  /**
   * Placeholder text for this parameter.
   *
   */
  placeholder: string;
  /**
   * The allowable options for this param.
   *
   */
  options: Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerOptionsInner>;
}

export const GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum =
  {
    UNSPECIFIED: 'UNSPECIFIED',
    STRING: 'STRING',
  } as const;
export type GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum =
  (typeof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum)[keyof typeof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum];

/**
 *
 */
export interface GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerOptionsInner {
  /**
   * The value of an option that will be used within the application.
   *
   */
  value: string;
  /**
   * The display value of an option suitable for displaying in a UI.
   *
   */
  label: string;
}
/**
 * Semver denotes the major.minor version of an integration release
 */
export interface GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver {
  /**
   * Major is the major number of a semver
   *
   */
  major: number;
  /**
   * Minior is the minior number of a semver
   *
   */
  minor: number;
}
/**
 *
 */
export interface GetActions200ResponseActionsInnerSecretsInner {
  [key: string]: any | any;
  /**
   * The name of the particular secret, e.g. API_KEY.
   *
   */
  name: string;
  /**
   * The time when the secret was last updated.
   *
   */
  updated_at: string;
}
/**
 *
 */
export interface GetActions200ResponseActionsInnerSupportedTriggersInner {
  /**
   */
  id: GetActions200ResponseActionsInnerSupportedTriggersInnerId;
  /**
   * The version of a trigger. v1, v2, etc.
   *
   */
  version?: string;
  /**
   * status points to the trigger status.
   *
   */
  status?: string;
  /**
   * runtimes supported by this trigger.
   *
   */
  runtimes?: Array<string>;
  /**
   * Runtime that will be used when none is specified when creating an action.
   *
   */
  default_runtime?: string;
  /**
   * compatible_triggers informs which other trigger supports the same event and api.
   *
   */
  compatible_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInner>;
}
/**
 *
 */
export interface GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInner {
  [key: string]: any | any;
  /**
   */
  id: GetActions200ResponseActionsInnerSupportedTriggersInnerId;
  /**
   * The version of a trigger. v1, v2, etc.
   *
   */
  version: string;
}
/**
 * An actions extensibility point. Acceptable values: <code>post-login, credentials-exchange, pre-user-registration, post-user-registration, post-change-password, send-phone-message, password-reset-post-challenge</code>
 */
export type GetActions200ResponseActionsInnerSupportedTriggersInnerId =
  GetActions200ResponseActionsInnerSupportedTriggersInnerIdAnyOf;

/**
 *
 */
export const GetActions200ResponseActionsInnerSupportedTriggersInnerIdAnyOf = {
  post_login: 'post-login',
  credentials_exchange: 'credentials-exchange',
  pre_user_registration: 'pre-user-registration',
  post_user_registration: 'post-user-registration',
  post_change_password: 'post-change-password',
  send_phone_message: 'send-phone-message',
  iga_approval: 'iga-approval',
  iga_certification: 'iga-certification',
  iga_fulfillment_assignment: 'iga-fulfillment-assignment',
  iga_fulfillment_execution: 'iga-fulfillment-execution',
  password_reset_post_challenge: 'password-reset-post-challenge',
} as const;
export type GetActions200ResponseActionsInnerSupportedTriggersInnerIdAnyOf =
  (typeof GetActions200ResponseActionsInnerSupportedTriggersInnerIdAnyOf)[keyof typeof GetActions200ResponseActionsInnerSupportedTriggersInnerIdAnyOf];

/**
 *
 */
export interface GetApns200Response {
  /**
   */
  bundle_id: string | null;
  /**
   */
  sandbox: boolean;
  /**
   */
  enabled: boolean;
}
/**
 *
 */
export type GetAuthenticationMethods200Response =
  | Array<GetAuthenticationMethods200ResponseOneOfInner>
  | GetAuthenticationMethods200ResponseOneOf;
/**
 *
 */
export interface GetAuthenticationMethods200ResponseOneOf {
  /**
   * Index of the starting record. Derived from the page and per_page parameters.
   *
   */
  start: number;
  /**
   * Maximum amount of records to return.
   *
   */
  limit: number;
  /**
   * Total number of pageable records.
   *
   */
  total: number;
  /**
   * The paginated authentication methods. Returned in this structure when include_totals is true.
   *
   */
  authenticators: Array<GetAuthenticationMethods200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetAuthenticationMethods200ResponseOneOfInner {
  /**
   * The ID of the authentication method (auto generated)
   *
   */
  id: string;
  /**
   */
  type: GetAuthenticationMethods200ResponseOneOfInnerTypeEnum;
  /**
   * The authentication method status
   *
   */
  confirmed?: boolean;
  /**
   * A human-readable label to identify the authentication method
   *
   */
  name?: string;
  /**
   */
  authentication_methods?: Array<GetAuthenticationMethods200ResponseOneOfInnerAuthenticationMethodsInner>;
  /**
   * The authentication method preferred for phone authenticators.
   *
   */
  preferred_authentication_method?: GetAuthenticationMethods200ResponseOneOfInnerPreferredAuthenticationMethodEnum;
  /**
   * The ID of a linked authentication method. Linked authentication methods will be deleted together.
   *
   */
  link_id?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   *
   */
  phone_number?: string;
  /**
   * Applies to email and email-verification authentication methods only. The email address used to send verification messages.
   *
   */
  email?: string;
  /**
   * Applies to webauthn authentication methods only. The ID of the generated credential.
   *
   */
  key_id?: string;
  /**
   * Applies to webauthn authentication methods only. The public key.
   *
   */
  public_key?: string;
  /**
   * Authenticator creation date
   *
   */
  created_at: string;
  /**
   * Enrollment date
   *
   */
  enrolled_at?: string;
  /**
   * Last authentication
   *
   */
  last_auth_at?: string;
  /**
   * Applies to passkeys only. The kind of device the credential is stored on as defined by backup eligibility. "single_device" credentials cannot be backed up and synced to another device, "multi_device" credentials can be backed up if enabled by the end-user.
   *
   */
  credential_device_type?: string;
  /**
   * Applies to passkeys only. Whether the credential was backed up.
   *
   */
  credential_backed_up?: boolean;
  /**
   * Applies to passkeys only. The ID of the user identity linked with the authentication method.
   *
   */
  identity_user_id?: string;
  /**
   * Applies to passkeys only. The user-agent of the browser used to create the passkey.
   *
   */
  user_agent?: string;
}

export const GetAuthenticationMethods200ResponseOneOfInnerTypeEnum = {
  recovery_code: 'recovery-code',
  totp: 'totp',
  push: 'push',
  phone: 'phone',
  email: 'email',
  email_verification: 'email-verification',
  webauthn_roaming: 'webauthn-roaming',
  webauthn_platform: 'webauthn-platform',
  guardian: 'guardian',
  passkey: 'passkey',
} as const;
export type GetAuthenticationMethods200ResponseOneOfInnerTypeEnum =
  (typeof GetAuthenticationMethods200ResponseOneOfInnerTypeEnum)[keyof typeof GetAuthenticationMethods200ResponseOneOfInnerTypeEnum];

export const GetAuthenticationMethods200ResponseOneOfInnerPreferredAuthenticationMethodEnum = {
  sms: 'sms',
  voice: 'voice',
} as const;
export type GetAuthenticationMethods200ResponseOneOfInnerPreferredAuthenticationMethodEnum =
  (typeof GetAuthenticationMethods200ResponseOneOfInnerPreferredAuthenticationMethodEnum)[keyof typeof GetAuthenticationMethods200ResponseOneOfInnerPreferredAuthenticationMethodEnum];

/**
 *
 */
export interface GetAuthenticationMethods200ResponseOneOfInnerAuthenticationMethodsInner {
  [key: string]: any | any;
  /**
   */
  type?: GetAuthenticationMethods200ResponseOneOfInnerAuthenticationMethodsInnerTypeEnum;
  /**
   */
  id?: string;
}

export const GetAuthenticationMethods200ResponseOneOfInnerAuthenticationMethodsInnerTypeEnum = {
  totp: 'totp',
  push: 'push',
  sms: 'sms',
  voice: 'voice',
} as const;
export type GetAuthenticationMethods200ResponseOneOfInnerAuthenticationMethodsInnerTypeEnum =
  (typeof GetAuthenticationMethods200ResponseOneOfInnerAuthenticationMethodsInnerTypeEnum)[keyof typeof GetAuthenticationMethods200ResponseOneOfInnerAuthenticationMethodsInnerTypeEnum];

/**
 *
 */
export interface GetBindings200Response {
  /**
   * The total result count.
   *
   */
  total: number;
  /**
   * Page index of the results being returned. First page is 0.
   *
   */
  page: number;
  /**
   * Number of results per page.
   *
   */
  per_page: number;
  /**
   * The list of actions that are bound to this trigger in the order in which they will be executed.
   *
   */
  bindings: Array<GetBindings200ResponseBindingsInner>;
}
/**
 * Binding is the associative entity joining a trigger, and an action together.
 */
export interface GetBindings200ResponseBindingsInner {
  /**
   * The unique ID of this binding.
   *
   */
  id: string;
  /**
   */
  trigger_id: GetActions200ResponseActionsInnerSupportedTriggersInnerId;
  /**
   * The name of the binding.
   *
   */
  display_name: string;
  /**
   */
  action: GetActions200ResponseActionsInner;
  /**
   * The time when the binding was created.
   *
   */
  created_at: string;
  /**
   * The time when the binding was updated.
   *
   */
  updated_at: string;
}
/**
 *
 */
export interface GetBranding200Response {
  [key: string]: any | any;
  /**
   */
  colors: GetBranding200ResponseColors;
  /**
   * URL for the favicon. Must use HTTPS.
   *
   */
  favicon_url: string;
  /**
   * URL for the logo. Must use HTTPS.
   *
   */
  logo_url: string;
  /**
   */
  font: GetBranding200ResponseFont;
}
/**
 * Custom color settings.
 */
export interface GetBranding200ResponseColors {
  /**
   * Accent color.
   *
   */
  primary: string;
  /**
   */
  page_background: GetBranding200ResponseColorsPageBackground;
}
/**
 * Page Background Color or Gradient.
 * Property contains either <code>null</code> to unset, a solid color as a string value <code>#FFFFFF</code>, or a gradient as an object.
 *
 * <pre><code>
 * {
 *   type: 'linear-gradient',
 *   start: '#FFFFFF',
 *   end: '#000000',
 *   angle_deg: 35
 * }
 * </code></pre>
 */
export type GetBranding200ResponseColorsPageBackground = string | { [key: string]: any };
/**
 * Custom font settings.
 */
export interface GetBranding200ResponseFont {
  /**
   * URL for the custom font. The URL must point to a font file and not a stylesheet. Must use HTTPS.
   *
   */
  url: string;
}
/**
 *
 */
export interface GetBreachedPasswordDetection200Response {
  [key: string]: any | any;
  /**
   * Whether or not breached password detection is active.
   *
   */
  enabled: boolean;
  /**
   * Action to take when a breached password is detected during a login.
   *       Possible values: <code>block</code>, <code>user_notification</code>, <code>admin_notification</code>.
   *
   */
  shields: Array<GetBreachedPasswordDetection200ResponseShieldsEnum>;
  /**
   * When "admin_notification" is enabled, determines how often email notifications are sent.
   *         Possible values: <code>immediately</code>, <code>daily</code>, <code>weekly</code>, <code>monthly</code>.
   *
   */
  admin_notification_frequency: Array<GetBreachedPasswordDetection200ResponseAdminNotificationFrequencyEnum>;
  /**
   * The subscription level for breached password detection methods. Use "enhanced" to enable Credential Guard.
   *         Possible values: <code>standard</code>, <code>enhanced</code>.
   *
   */
  method: GetBreachedPasswordDetection200ResponseMethodEnum;
  /**
   */
  stage: GetBreachedPasswordDetection200ResponseStage;
}

export const GetBreachedPasswordDetection200ResponseShieldsEnum = {
  block: 'block',
  user_notification: 'user_notification',
  admin_notification: 'admin_notification',
} as const;
export type GetBreachedPasswordDetection200ResponseShieldsEnum =
  (typeof GetBreachedPasswordDetection200ResponseShieldsEnum)[keyof typeof GetBreachedPasswordDetection200ResponseShieldsEnum];

export const GetBreachedPasswordDetection200ResponseAdminNotificationFrequencyEnum = {
  immediately: 'immediately',
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
} as const;
export type GetBreachedPasswordDetection200ResponseAdminNotificationFrequencyEnum =
  (typeof GetBreachedPasswordDetection200ResponseAdminNotificationFrequencyEnum)[keyof typeof GetBreachedPasswordDetection200ResponseAdminNotificationFrequencyEnum];

export const GetBreachedPasswordDetection200ResponseMethodEnum = {
  standard: 'standard',
  enhanced: 'enhanced',
} as const;
export type GetBreachedPasswordDetection200ResponseMethodEnum =
  (typeof GetBreachedPasswordDetection200ResponseMethodEnum)[keyof typeof GetBreachedPasswordDetection200ResponseMethodEnum];

/**
 *
 */
export interface GetBreachedPasswordDetection200ResponseStage {
  /**
   */
  'pre-user-registration': GetBreachedPasswordDetection200ResponseStagePreUserRegistration;
}
/**
 *
 */
export interface GetBreachedPasswordDetection200ResponseStagePreUserRegistration {
  /**
   * Action to take when a breached password is detected during a signup.
   *               Possible values: <code>block</code>, <code>admin_notification</code>.
   *
   */
  shields: Array<GetBreachedPasswordDetection200ResponseStagePreUserRegistrationShieldsEnum>;
}

export const GetBreachedPasswordDetection200ResponseStagePreUserRegistrationShieldsEnum = {
  block: 'block',
  admin_notification: 'admin_notification',
} as const;
export type GetBreachedPasswordDetection200ResponseStagePreUserRegistrationShieldsEnum =
  (typeof GetBreachedPasswordDetection200ResponseStagePreUserRegistrationShieldsEnum)[keyof typeof GetBreachedPasswordDetection200ResponseStagePreUserRegistrationShieldsEnum];

/**
 *
 */
export interface GetBruteForceProtection200Response {
  [key: string]: any | any;
  /**
   * Whether or not brute force attack protections are active.
   *
   */
  enabled: boolean;
  /**
   * Action to take when a brute force protection threshold is violated.
   *         Possible values: <code>block</code>, <code>user_notification</code>.
   *
   */
  shields: Array<GetBruteForceProtection200ResponseShieldsEnum>;
  /**
   * List of trusted IP addresses that will not have attack protection enforced against them.
   *
   */
  allowlist: Array<GetBruteForceProtection200ResponseAllowlistInner>;
  /**
   * Account Lockout: Determines whether or not IP address is used when counting failed attempts.
   *           Possible values: <code>count_per_identifier_and_ip</code>, <code>count_per_identifier</code>.
   *
   */
  mode: GetBruteForceProtection200ResponseModeEnum;
  /**
   * Maximum number of unsuccessful attempts.
   *
   */
  max_attempts: number;
}

export const GetBruteForceProtection200ResponseShieldsEnum = {
  block: 'block',
  user_notification: 'user_notification',
} as const;
export type GetBruteForceProtection200ResponseShieldsEnum =
  (typeof GetBruteForceProtection200ResponseShieldsEnum)[keyof typeof GetBruteForceProtection200ResponseShieldsEnum];

export const GetBruteForceProtection200ResponseModeEnum = {
  identifier_and_ip: 'count_per_identifier_and_ip',
  identifier: 'count_per_identifier',
} as const;
export type GetBruteForceProtection200ResponseModeEnum =
  (typeof GetBruteForceProtection200ResponseModeEnum)[keyof typeof GetBruteForceProtection200ResponseModeEnum];

/**
 *
 */
export type GetBruteForceProtection200ResponseAllowlistInner = any;
/**
 *
 */
export type GetClientGrants200Response = Array<ClientGrant> | GetClientGrants200ResponseOneOf;
/**
 *
 */
export interface GetClientGrants200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  client_grants: Array<ClientGrant>;
}
/**
 *
 */
export type GetClients200Response = Array<Client> | GetClients200ResponseOneOf;
/**
 *
 */
export interface GetClients200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  clients: Array<Client>;
}
/**
 *
 */
export type GetConnections200Response = Array<Connection> | GetConnections200ResponseOneOf;
/**
 *
 */
export interface GetConnections200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  connections: Array<Connection>;
}
/**
 *
 */
export interface GetCredentials200ResponseInner {
  [key: string]: any | any;
  /**
   * ID of the credential. Generated on creation.
   *
   */
  id: string;
  /**
   * The name given to the credential by the user.
   *
   */
  name: string;
  /**
   * The key identifier of the credential, generated on creation.
   *
   */
  kid: string;
  /**
   * Algorithm which will be used with the credential. Supported algorithms: RS256,RS384,PS256
   *
   */
  alg: GetCredentials200ResponseInnerAlgEnum;
  /**
   * The type of credential. Supported types: public_key.
   *
   */
  credential_type: string;
  /**
   * The ISO 8601 formatted date the credential was created.
   *
   */
  created_at: string;
  /**
   * The ISO 8601 formatted date the credential was updated.
   *
   */
  updated_at: string;
  /**
   * The ISO 8601 formatted date representing the expiration of the credential.
   *
   */
  expires_at: string;
}

export const GetCredentials200ResponseInnerAlgEnum = {
  RS256: 'RS256',
  RS384: 'RS384',
  PS256: 'PS256',
} as const;
export type GetCredentials200ResponseInnerAlgEnum =
  (typeof GetCredentials200ResponseInnerAlgEnum)[keyof typeof GetCredentials200ResponseInnerAlgEnum];

/**
 *
 */
export type GetDeviceCredentials200Response =
  | Array<DeviceCredential>
  | GetDeviceCredentials200ResponseOneOf;
/**
 *
 */
export interface GetDeviceCredentials200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  device_credentials: Array<DeviceCredential>;
}
/**
 *
 */
export interface GetEmailTemplatesByTemplateName200Response {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   *
   */
  template: GetEmailTemplatesByTemplateName200ResponseTemplateEnum;
  /**
   * Body of the email template.
   *
   */
  body: string | null;
  /**
   * Senders `from` email address.
   *
   */
  from: string | null;
  /**
   * URL to redirect the user to after a successful action.
   *
   */
  resultUrl: string | null;
  /**
   * Subject line of the email.
   *
   */
  subject: string | null;
  /**
   * Syntax of the template body.
   *
   */
  syntax: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   *
   */
  urlLifetimeInSeconds: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   *
   */
  includeEmailInRedirect: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   *
   */
  enabled: boolean | null;
}

export const GetEmailTemplatesByTemplateName200ResponseTemplateEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type GetEmailTemplatesByTemplateName200ResponseTemplateEnum =
  (typeof GetEmailTemplatesByTemplateName200ResponseTemplateEnum)[keyof typeof GetEmailTemplatesByTemplateName200ResponseTemplateEnum];

/**
 *
 */
export type GetEnabledConnections200Response =
  | Array<GetEnabledConnections200ResponseOneOfInner>
  | GetEnabledConnections200ResponseOneOf;
/**
 *
 */
export interface GetEnabledConnections200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  enabled_connections: Array<GetEnabledConnections200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetEnabledConnections200ResponseOneOfInner {
  /**
   * ID of the connection.
   *
   */
  connection_id: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   *
   */
  assign_membership_on_login: boolean;
  /**
   * Enables showing a button for the connection in the organization login page. If false, it will be usable only by HRD.
   *
   */
  show_as_button: boolean;
  /**
   */
  connection: GetEnabledConnections200ResponseOneOfInnerConnection;
}
/**
 *
 */
export interface GetEnabledConnections200ResponseOneOfInnerConnection {
  [key: string]: any | any;
  /**
   * The name of the enabled connection.
   *
   */
  name: string;
  /**
   * The strategy of the enabled connection.
   *
   */
  strategy: string;
}
/**
 *
 */
export type GetErrors200Response = Array<GetErrors200ResponseOneOfInner> | Job;
/**
 *
 */
export interface GetErrors200ResponseOneOfInner {
  /**
   * User, as provided in the import file
   *
   */
  user: { [key: string]: any };
  /**
   * Errors importing the user.
   *
   */
  errors: Array<GetErrors200ResponseOneOfInnerErrorsInner>;
}
/**
 *
 */
export interface GetErrors200ResponseOneOfInnerErrorsInner {
  [key: string]: any | any;
  /**
   * Error code.
   *
   */
  code: string;
  /**
   * Error message.
   *
   */
  message: string;
  /**
   * Error field.
   *
   */
  path: string;
}
/**
 * The result of a specific execution of a trigger.
 */
export interface GetExecution200Response {
  /**
   * ID identifies this specific execution simulation. These IDs would resemble real executions in production.
   *
   */
  id: string;
  /**
   */
  trigger_id: GetActions200ResponseActionsInnerSupportedTriggersInnerId;
  /**
   * The overall status of an execution.
   *
   */
  status: GetExecution200ResponseStatusEnum;
  /**
   */
  results: Array<GetExecution200ResponseResultsInner>;
  /**
   * The time that the execution was started.
   *
   */
  created_at: string;
  /**
   * The time that the exeution finished executing.
   *
   */
  updated_at: string;
}

export const GetExecution200ResponseStatusEnum = {
  unspecified: 'unspecified',
  pending: 'pending',
  final: 'final',
  partial: 'partial',
  canceled: 'canceled',
  suspended: 'suspended',
} as const;
export type GetExecution200ResponseStatusEnum =
  (typeof GetExecution200ResponseStatusEnum)[keyof typeof GetExecution200ResponseStatusEnum];

/**
 * Captures the results of a single action being executed.
 */
export interface GetExecution200ResponseResultsInner {
  /**
   * The name of the action that was executed.
   *
   */
  action_name: string;
  /**
   */
  error: GetActionVersions200ResponseVersionsInnerErrorsInner;
  /**
   * The time when the action was started.
   *
   */
  started_at: string;
  /**
   * The time when the action finished executing.
   *
   */
  ended_at: string;
}
/**
 *
 */
export type GetGrants200Response = Array<UserGrant> | GetGrants200ResponseOneOf;
/**
 *
 */
export interface GetGrants200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  grants: Array<UserGrant>;
}
/**
 *
 */
export type GetHooks200Response = Array<Hook> | GetHooks200ResponseOneOf;
/**
 *
 */
export interface GetHooks200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  hooks: Array<Hook>;
}
/**
 *
 */
export type GetInvitations200Response =
  | Array<GetInvitations200ResponseOneOfInner>
  | GetInvitations200ResponseOneOf;
/**
 *
 */
export interface GetInvitations200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  invitations: Array<GetInvitations200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetInvitations200ResponseOneOfInner {
  /**
   * The id of the user invitation.
   *
   */
  id: string;
  /**
   * Organization identifier
   *
   */
  organization_id: string;
  /**
   */
  inviter: GetInvitations200ResponseOneOfInnerInviter;
  /**
   */
  invitee: GetInvitations200ResponseOneOfInnerInvitee;
  /**
   * The invitation url to be send to the invitee.
   *
   */
  invitation_url: string;
  /**
   * The ISO 8601 formatted timestamp representing the creation time of the invitation.
   *
   */
  created_at: string;
  /**
   * The ISO 8601 formatted timestamp representing the expiration time of the invitation.
   *
   */
  expires_at: string;
  /**
   * Auth0 client ID. Used to resolve the application's login initiation endpoint.
   *
   */
  client_id: string;
  /**
   * The id of the connection to force invitee to authenticate with.
   *
   */
  connection_id: string;
  /**
   */
  app_metadata: GetInvitations200ResponseOneOfInnerAppMetadata;
  /**
   * Data related to the user that does not affect the application's core functionality.
   *
   */
  user_metadata: { [key: string]: any };
  /**
   * List of roles IDs to associated with the user.
   *
   */
  roles: Array<string>;
  /**
   * The id of the invitation ticket
   *
   */
  ticket_id: string;
}
/**
 * Data related to the user that does affect the application's core functionality.
 */
export interface GetInvitations200ResponseOneOfInnerAppMetadata {
  [key: string]: any | any;
  /**
   */
  clientID: any | null;
  /**
   */
  globalClientID: any | null;
  /**
   */
  global_client_id: any | null;
  /**
   */
  email_verified: any | null;
  /**
   */
  user_id: any | null;
  /**
   */
  identities: any | null;
  /**
   */
  lastIP: any | null;
  /**
   */
  lastLogin: any | null;
  /**
   */
  metadata: any | null;
  /**
   */
  created_at: any | null;
  /**
   */
  loginsCount: any | null;
  /**
   */
  _id: any | null;
  /**
   */
  email: any | null;
  /**
   */
  blocked: any | null;
  /**
   */
  __tenant: any | null;
  /**
   */
  updated_at: any | null;
}
/**
 *
 */
export interface GetInvitations200ResponseOneOfInnerInvitee {
  /**
   * The invitee's email.
   *
   */
  email: string;
}
/**
 *
 */
export interface GetInvitations200ResponseOneOfInnerInviter {
  /**
   * The inviter's name.
   *
   */
  name: string;
}
/**
 *
 */
export type GetLogStreams200ResponseInner =
  | GetLogStreams200ResponseInnerOneOf
  | GetLogStreams200ResponseInnerOneOf1
  | GetLogStreams200ResponseInnerOneOf2
  | GetLogStreams200ResponseInnerOneOf3
  | GetLogStreams200ResponseInnerOneOf4
  | GetLogStreams200ResponseInnerOneOf5
  | GetLogStreams200ResponseInnerOneOf6
  | GetLogStreams200ResponseInnerOneOf7;
/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf {
  [key: string]: any | any;
  /**
   * The id of the log stream
   *
   */
  id: string;
  /**
   * log stream name
   *
   */
  name: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   *
   */
  status: GetLogStreams200ResponseInnerOneOfStatusEnum;
  /**
   */
  type: GetLogStreams200ResponseInnerOneOfTypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOfSink;
}

export const GetLogStreams200ResponseInnerOneOfStatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOfStatusEnum =
  (typeof GetLogStreams200ResponseInnerOneOfStatusEnum)[keyof typeof GetLogStreams200ResponseInnerOneOfStatusEnum];

export const GetLogStreams200ResponseInnerOneOfTypeEnum = {
  http: 'http',
} as const;
export type GetLogStreams200ResponseInnerOneOfTypeEnum =
  (typeof GetLogStreams200ResponseInnerOneOfTypeEnum)[keyof typeof GetLogStreams200ResponseInnerOneOfTypeEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf1 {
  [key: string]: any | any;
  /**
   * The id of the log stream
   *
   */
  id: string;
  /**
   * log stream name
   *
   */
  name: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   *
   */
  status: GetLogStreams200ResponseInnerOneOf1StatusEnum;
  /**
   */
  type: GetLogStreams200ResponseInnerOneOf1TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf1Sink;
}

export const GetLogStreams200ResponseInnerOneOf1StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf1StatusEnum =
  (typeof GetLogStreams200ResponseInnerOneOf1StatusEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf1StatusEnum];

export const GetLogStreams200ResponseInnerOneOf1TypeEnum = {
  eventbridge: 'eventbridge',
} as const;
export type GetLogStreams200ResponseInnerOneOf1TypeEnum =
  (typeof GetLogStreams200ResponseInnerOneOf1TypeEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf1TypeEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf1Sink {
  /**
   * AWS account ID
   *
   */
  awsAccountId: string;
  /**
   * The region in which the EventBridge event source will be created
   *
   */
  awsRegion: GetLogStreams200ResponseInnerOneOf1SinkAwsRegionEnum;
  /**
   * AWS EventBridge partner event source
   *
   */
  awsPartnerEventSource?: string;
}

export const GetLogStreams200ResponseInnerOneOf1SinkAwsRegionEnum = {
  ap_east_1: 'ap-east-1',
  ap_northeast_1: 'ap-northeast-1',
  ap_northeast_2: 'ap-northeast-2',
  ap_northeast_3: 'ap-northeast-3',
  ap_south_1: 'ap-south-1',
  ap_southeast_1: 'ap-southeast-1',
  ap_southeast_2: 'ap-southeast-2',
  ca_central_1: 'ca-central-1',
  cn_north_1: 'cn-north-1',
  cn_northwest_1: 'cn-northwest-1',
  eu_central_1: 'eu-central-1',
  eu_north_1: 'eu-north-1',
  eu_west_1: 'eu-west-1',
  eu_west_2: 'eu-west-2',
  eu_west_3: 'eu-west-3',
  me_south_1: 'me-south-1',
  sa_east_1: 'sa-east-1',
  us_gov_east_1: 'us-gov-east-1',
  us_gov_west_1: 'us-gov-west-1',
  us_east_1: 'us-east-1',
  us_east_2: 'us-east-2',
  us_west_1: 'us-west-1',
  us_west_2: 'us-west-2',
} as const;
export type GetLogStreams200ResponseInnerOneOf1SinkAwsRegionEnum =
  (typeof GetLogStreams200ResponseInnerOneOf1SinkAwsRegionEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf1SinkAwsRegionEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf2 {
  [key: string]: any | any;
  /**
   * The id of the log stream
   *
   */
  id: string;
  /**
   * log stream name
   *
   */
  name: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   *
   */
  status: GetLogStreams200ResponseInnerOneOf2StatusEnum;
  /**
   */
  type: GetLogStreams200ResponseInnerOneOf2TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf2Sink;
}

export const GetLogStreams200ResponseInnerOneOf2StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf2StatusEnum =
  (typeof GetLogStreams200ResponseInnerOneOf2StatusEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf2StatusEnum];

export const GetLogStreams200ResponseInnerOneOf2TypeEnum = {
  eventgrid: 'eventgrid',
} as const;
export type GetLogStreams200ResponseInnerOneOf2TypeEnum =
  (typeof GetLogStreams200ResponseInnerOneOf2TypeEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf2TypeEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf2Sink {
  /**
   * Subscription ID
   *
   */
  azureSubscriptionId: string;
  /**
   * Azure Region Name
   *
   */
  azureRegion: GetLogStreams200ResponseInnerOneOf2SinkAzureRegionEnum;
  /**
   * Resource Group
   *
   */
  azureResourceGroup: string;
  /**
   * Partner Topic
   *
   */
  azurePartnerTopic?: string;
}

export const GetLogStreams200ResponseInnerOneOf2SinkAzureRegionEnum = {
  australiacentral: 'australiacentral',
  australiaeast: 'australiaeast',
  australiasoutheast: 'australiasoutheast',
  brazilsouth: 'brazilsouth',
  canadacentral: 'canadacentral',
  canadaeast: 'canadaeast',
  centralindia: 'centralindia',
  centralus: 'centralus',
  eastasia: 'eastasia',
  eastus: 'eastus',
  eastus2: 'eastus2',
  francecentral: 'francecentral',
  germanywestcentral: 'germanywestcentral',
  japaneast: 'japaneast',
  japanwest: 'japanwest',
  koreacentral: 'koreacentral',
  koreasouth: 'koreasouth',
  northcentralus: 'northcentralus',
  northeurope: 'northeurope',
  norwayeast: 'norwayeast',
  southafricanorth: 'southafricanorth',
  southcentralus: 'southcentralus',
  southeastasia: 'southeastasia',
  southindia: 'southindia',
  switzerlandnorth: 'switzerlandnorth',
  uaenorth: 'uaenorth',
  uksouth: 'uksouth',
  ukwest: 'ukwest',
  westcentralus: 'westcentralus',
  westeurope: 'westeurope',
  westindia: 'westindia',
  westus: 'westus',
  westus2: 'westus2',
} as const;
export type GetLogStreams200ResponseInnerOneOf2SinkAzureRegionEnum =
  (typeof GetLogStreams200ResponseInnerOneOf2SinkAzureRegionEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf2SinkAzureRegionEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf3 {
  [key: string]: any | any;
  /**
   * The id of the log stream
   *
   */
  id: string;
  /**
   * log stream name
   *
   */
  name: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   *
   */
  status: GetLogStreams200ResponseInnerOneOf3StatusEnum;
  /**
   */
  type: GetLogStreams200ResponseInnerOneOf3TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf3Sink;
}

export const GetLogStreams200ResponseInnerOneOf3StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf3StatusEnum =
  (typeof GetLogStreams200ResponseInnerOneOf3StatusEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf3StatusEnum];

export const GetLogStreams200ResponseInnerOneOf3TypeEnum = {
  datadog: 'datadog',
} as const;
export type GetLogStreams200ResponseInnerOneOf3TypeEnum =
  (typeof GetLogStreams200ResponseInnerOneOf3TypeEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf3TypeEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf3Sink {
  /**
   * Datadog API Key
   *
   */
  datadogApiKey: string;
  /**
   * Datadog region
   *
   */
  datadogRegion: GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum;
}

export const GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum = {
  us: 'us',
  eu: 'eu',
  us3: 'us3',
  us5: 'us5',
} as const;
export type GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum =
  (typeof GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf4 {
  [key: string]: any | any;
  /**
   * The id of the log stream
   *
   */
  id: string;
  /**
   * log stream name
   *
   */
  name: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   *
   */
  status: GetLogStreams200ResponseInnerOneOf4StatusEnum;
  /**
   */
  type: GetLogStreams200ResponseInnerOneOf4TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf4Sink;
}

export const GetLogStreams200ResponseInnerOneOf4StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf4StatusEnum =
  (typeof GetLogStreams200ResponseInnerOneOf4StatusEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf4StatusEnum];

export const GetLogStreams200ResponseInnerOneOf4TypeEnum = {
  splunk: 'splunk',
} as const;
export type GetLogStreams200ResponseInnerOneOf4TypeEnum =
  (typeof GetLogStreams200ResponseInnerOneOf4TypeEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf4TypeEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf4Sink {
  /**
   * Splunk URL Endpoint
   *
   */
  splunkDomain: string;
  /**
   * Port
   *
   */
  splunkPort: string;
  /**
   * Splunk token
   *
   */
  splunkToken: string;
  /**
   * Verify TLS certificate
   *
   */
  splunkSecure: boolean;
}
/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf5 {
  [key: string]: any | any;
  /**
   * The id of the log stream
   *
   */
  id: string;
  /**
   * log stream name
   *
   */
  name: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   *
   */
  status: GetLogStreams200ResponseInnerOneOf5StatusEnum;
  /**
   */
  type: GetLogStreams200ResponseInnerOneOf5TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf5Sink;
}

export const GetLogStreams200ResponseInnerOneOf5StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf5StatusEnum =
  (typeof GetLogStreams200ResponseInnerOneOf5StatusEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf5StatusEnum];

export const GetLogStreams200ResponseInnerOneOf5TypeEnum = {
  sumo: 'sumo',
} as const;
export type GetLogStreams200ResponseInnerOneOf5TypeEnum =
  (typeof GetLogStreams200ResponseInnerOneOf5TypeEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf5TypeEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf5Sink {
  /**
   * HTTP Source Address
   *
   */
  sumoSourceAddress: string;
}
/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf6 {
  [key: string]: any | any;
  /**
   * The id of the log stream
   *
   */
  id: string;
  /**
   * log stream name
   *
   */
  name: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   *
   */
  status: GetLogStreams200ResponseInnerOneOf6StatusEnum;
  /**
   */
  type: GetLogStreams200ResponseInnerOneOf6TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf6Sink;
}

export const GetLogStreams200ResponseInnerOneOf6StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf6StatusEnum =
  (typeof GetLogStreams200ResponseInnerOneOf6StatusEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf6StatusEnum];

export const GetLogStreams200ResponseInnerOneOf6TypeEnum = {
  segment: 'segment',
} as const;
export type GetLogStreams200ResponseInnerOneOf6TypeEnum =
  (typeof GetLogStreams200ResponseInnerOneOf6TypeEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf6TypeEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf6Sink {
  /**
   * Segment write key
   *
   */
  segmentWriteKey: string;
}
/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf7 {
  [key: string]: any | any;
  /**
   * The id of the log stream
   *
   */
  id: string;
  /**
   * log stream name
   *
   */
  name: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   *
   */
  status: GetLogStreams200ResponseInnerOneOf7StatusEnum;
  /**
   */
  type: GetLogStreams200ResponseInnerOneOf7TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf7Sink;
}

export const GetLogStreams200ResponseInnerOneOf7StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf7StatusEnum =
  (typeof GetLogStreams200ResponseInnerOneOf7StatusEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf7StatusEnum];

export const GetLogStreams200ResponseInnerOneOf7TypeEnum = {
  mixpanel: 'mixpanel',
} as const;
export type GetLogStreams200ResponseInnerOneOf7TypeEnum =
  (typeof GetLogStreams200ResponseInnerOneOf7TypeEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf7TypeEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOf7Sink {
  /**
   * Mixpanel Region
   *
   */
  mixpanelRegion: GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum;
  /**
   * Mixpanel Project Id
   *
   */
  mixpanelProjectId: string;
  /**
   * Mixpanel Service Account Username
   *
   */
  mixpanelServiceAccountUsername: string;
  /**
   * Mixpanel Service Account Password
   *
   */
  mixpanelServiceAccountPassword: string;
}

export const GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum = {
  us: 'us',
  eu: 'eu',
} as const;
export type GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum =
  (typeof GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum)[keyof typeof GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOfFiltersInner {
  [key: string]: any | any;
  /**
   * Filter type. Currently `category` is the only valid type.
   *
   */
  type: GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum;
  /**
   * Category group name
   *
   */
  name: GetLogStreams200ResponseInnerOneOfFiltersInnerNameEnum;
}

export const GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum = {
  category: 'category',
} as const;
export type GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum =
  (typeof GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum)[keyof typeof GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum];

export const GetLogStreams200ResponseInnerOneOfFiltersInnerNameEnum = {
  auth_ancillary_fail: 'auth.ancillary.fail',
  auth_ancillary_success: 'auth.ancillary.success',
  auth_login_fail: 'auth.login.fail',
  auth_login_notification: 'auth.login.notification',
  auth_login_success: 'auth.login.success',
  auth_logout_fail: 'auth.logout.fail',
  auth_logout_success: 'auth.logout.success',
  auth_signup_fail: 'auth.signup.fail',
  auth_signup_success: 'auth.signup.success',
  auth_silent_auth_fail: 'auth.silent_auth.fail',
  auth_silent_auth_success: 'auth.silent_auth.success',
  auth_token_exchange_fail: 'auth.token_exchange.fail',
  auth_token_exchange_success: 'auth.token_exchange.success',
  management_fail: 'management.fail',
  management_success: 'management.success',
  system_notification: 'system.notification',
  user_fail: 'user.fail',
  user_notification: 'user.notification',
  user_success: 'user.success',
  other: 'other',
} as const;
export type GetLogStreams200ResponseInnerOneOfFiltersInnerNameEnum =
  (typeof GetLogStreams200ResponseInnerOneOfFiltersInnerNameEnum)[keyof typeof GetLogStreams200ResponseInnerOneOfFiltersInnerNameEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOfSink {
  /**
   * HTTP Authorization header
   *
   */
  httpAuthorization?: string;
  /**
   * HTTP JSON format
   *
   */
  httpContentFormat?: GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum;
  /**
   * HTTP Content-Type header
   *
   */
  httpContentType?: string;
  /**
   * HTTP endpoint
   *
   */
  httpEndpoint: string;
  /**
   * custom HTTP headers
   *
   */
  httpCustomHeaders?: Array<GetLogStreams200ResponseInnerOneOfSinkHttpCustomHeadersInner>;
}

export const GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum = {
  JSONARRAY: 'JSONARRAY',
  JSONLINES: 'JSONLINES',
  JSONOBJECT: 'JSONOBJECT',
} as const;
export type GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum =
  (typeof GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum)[keyof typeof GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum];

/**
 *
 */
export interface GetLogStreams200ResponseInnerOneOfSinkHttpCustomHeadersInner {
  [key: string]: any | any;
  /**
   * HTTP header name
   *
   */
  header?: string;
  /**
   * HTTP header value
   *
   */
  value?: string;
}
/**
 *
 */
export type GetLogs200Response = Array<Log> | GetLogs200ResponseOneOf;
/**
 *
 */
export interface GetLogs200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  length: number;
  /**
   */
  total: number;
  /**
   */
  logs: Array<Log>;
}
/**
 *
 */
export type GetMembers200Response =
  | Array<GetMembers200ResponseOneOfInner>
  | GetMembers200ResponseOneOf
  | GetMembers200ResponseOneOf1;
/**
 *
 */
export interface GetMembers200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  members: Array<GetMembers200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetMembers200ResponseOneOf1 {
  [key: string]: any | any;
  /**
   */
  next: string;
  /**
   */
  members: Array<GetMembers200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetMembers200ResponseOneOfInner {
  /**
   * ID of this user.
   *
   */
  user_id: string;
  /**
   * URL to a picture for this user.
   *
   */
  picture: string;
  /**
   * Name of this user.
   *
   */
  name: string;
  /**
   * Email address of this user.
   *
   */
  email: string;
  /**
   */
  roles: Array<GetMembers200ResponseOneOfInnerRolesInner>;
}
/**
 *
 */
export interface GetMembers200ResponseOneOfInnerRolesInner {
  /**
   * ID for this role.
   *
   */
  id: string;
  /**
   * Name of this role.
   *
   */
  name: string;
}
/**
 *
 */
export interface GetMessageTypes200Response {
  /**
   * The list of phone factors to enable on the tenant. Can include `sms` and `voice`.
   *
   */
  message_types: Array<GetMessageTypes200ResponseMessageTypesEnum>;
}

export const GetMessageTypes200ResponseMessageTypesEnum = {
  sms: 'sms',
  voice: 'voice',
} as const;
export type GetMessageTypes200ResponseMessageTypesEnum =
  (typeof GetMessageTypes200ResponseMessageTypesEnum)[keyof typeof GetMessageTypes200ResponseMessageTypesEnum];

/**
 *
 */
export type GetOrganizationMemberRoles200Response =
  | Array<GetOrganizationMemberRoles200ResponseOneOfInner>
  | GetOrganizationMemberRoles200ResponseOneOf;
/**
 *
 */
export interface GetOrganizationMemberRoles200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  roles: Array<GetOrganizationMemberRoles200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetOrganizationMemberRoles200ResponseOneOfInner {
  /**
   * ID for this role.
   *
   */
  id: string;
  /**
   * Name of this role.
   *
   */
  name: string;
  /**
   * Description of this role.
   *
   */
  description: string;
}
/**
 *
 */
export type GetOrganizations200Response =
  | Array<GetOrganizations200ResponseOneOfInner>
  | GetOrganizations200ResponseOneOf
  | GetOrganizations200ResponseOneOf1;
/**
 *
 */
export interface GetOrganizations200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  organizations: Array<GetOrganizations200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetOrganizations200ResponseOneOf1 {
  /**
   */
  next: string;
  /**
   */
  organizations: Array<GetOrganizations200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetOrganizations200ResponseOneOfInner {
  [key: string]: any | any;
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * The name of this organization.
   *
   */
  name: string;
  /**
   * Friendly name of this organization.
   *
   */
  display_name: string;
  /**
   */
  branding: GetOrganizations200ResponseOneOfInnerBranding;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   *
   */
  metadata: { [key: string]: any };
}
/**
 * Theme defines how to style the login pages
 */
export interface GetOrganizations200ResponseOneOfInnerBranding {
  /**
   * URL of logo to display on login page
   *
   */
  logo_url: string;
  /**
   */
  colors: GetOrganizations200ResponseOneOfInnerBrandingColors;
}
/**
 * Color scheme used to customize the login pages
 */
export interface GetOrganizations200ResponseOneOfInnerBrandingColors {
  /**
   * HEX Color for primary elements
   *
   */
  primary: string;
  /**
   * HEX Color for background
   *
   */
  page_background: string;
}
/**
 *
 */
export type GetPermissions200Response =
  | Array<GetPermissions200ResponseOneOfInner>
  | GetPermissions200ResponseOneOf;
/**
 *
 */
export interface GetPermissions200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  permissions: Array<GetPermissions200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetPermissions200ResponseOneOfInner {
  /**
   */
  sources: any | null;
  /**
   * Resource server (API) identifier that this permission is for.
   *
   */
  resource_server_identifier: string;
  /**
   * Name of this permission.
   *
   */
  permission_name: string;
  /**
   * Resource server (API) name this permission is for.
   *
   */
  resource_server_name: string;
  /**
   * Description of this permission.
   *
   */
  description: string;
}
/**
 *
 */
export interface GetPhoneProviders200Response {
  /**
   */
  provider: GetPhoneProviders200ResponseProviderEnum;
}

export const GetPhoneProviders200ResponseProviderEnum = {
  auth0: 'auth0',
  twilio: 'twilio',
  phone_message_hook: 'phone-message-hook',
} as const;
export type GetPhoneProviders200ResponseProviderEnum =
  (typeof GetPhoneProviders200ResponseProviderEnum)[keyof typeof GetPhoneProviders200ResponseProviderEnum];

/**
 *
 */
export interface GetPnProviders200Response {
  /**
   */
  provider: GetPnProviders200ResponseProviderEnum;
}

export const GetPnProviders200ResponseProviderEnum = {
  guardian: 'guardian',
  sns: 'sns',
  direct: 'direct',
} as const;
export type GetPnProviders200ResponseProviderEnum =
  (typeof GetPnProviders200ResponseProviderEnum)[keyof typeof GetPnProviders200ResponseProviderEnum];

/**
 *
 */
export type GetResourceServers200Response =
  | Array<ResourceServer>
  | GetResourceServers200ResponseOneOf;
/**
 *
 */
export interface GetResourceServers200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  resource_servers: Array<ResourceServer>;
}
/**
 *
 */
export type GetRolePermission200Response = Array<Permission> | GetRolePermission200ResponseOneOf;
/**
 *
 */
export interface GetRolePermission200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  permissions: Array<Permission>;
}
/**
 *
 */
export type GetRoleUser200Response =
  | Array<GetRoleUser200ResponseOneOfInner>
  | GetRoleUser200ResponseOneOf
  | GetRoleUser200ResponseOneOf1;
/**
 *
 */
export interface GetRoleUser200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  users: Array<GetRoleUser200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetRoleUser200ResponseOneOf1 {
  /**
   */
  next: string;
  /**
   */
  users: Array<GetRoleUser200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetRoleUser200ResponseOneOfInner {
  /**
   * ID of this user.
   *
   */
  user_id: string;
  /**
   * URL to a picture for this user.
   *
   */
  picture: string;
  /**
   * Name of this user.
   *
   */
  name: string;
  /**
   * Email address of this user.
   *
   */
  email: string;
}
/**
 *
 */
export type GetRules200Response = Array<Rule> | GetRules200ResponseOneOf;
/**
 *
 */
export interface GetRules200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
  /**
   */
  rules: Array<Rule>;
}
/**
 *
 */
export interface GetRulesConfigs200ResponseInner {
  [key: string]: any | any;
  /**
   * Key for a rules config variable.
   *
   */
  key: string;
}
/**
 *
 */
export interface GetSigningKeys200ResponseInner {
  /**
   * The key id of the signing key
   *
   */
  kid: string;
  /**
   * The public certificate of the signing key
   *
   */
  cert: string;
  /**
   * The public certificate of the signing key in pkcs7 format
   *
   */
  pkcs7?: string;
  /**
   * True if the key is the the current key
   *
   */
  current?: boolean;
  /**
   * True if the key is the the next key
   *
   */
  next?: boolean;
  /**
   * True if the key is the the previous key
   *
   */
  previous?: boolean;
  /**
   */
  current_since?: GetSigningKeys200ResponseInnerCurrentSince;
  /**
   */
  current_until?: GetSigningKeys200ResponseInnerCurrentUntil;
  /**
   * The cert fingerprint
   *
   */
  fingerprint: string;
  /**
   * The cert thumbprint
   *
   */
  thumbprint: string;
  /**
   * True if the key is revoked
   *
   */
  revoked?: boolean;
  /**
   */
  revoked_at?: GetSigningKeys200ResponseInnerRevokedAt;
}
/**
 *
 */
export type GetSigningKeys200ResponseInnerCurrentSince = string | { [key: string]: any };
/**
 *
 */
export type GetSigningKeys200ResponseInnerCurrentUntil = string | { [key: string]: any };
/**
 *
 */
export type GetSigningKeys200ResponseInnerRevokedAt = string | { [key: string]: any };
/**
 *
 */
export interface GetSuspiciousIpThrottling200Response {
  [key: string]: any | any;
  /**
   * Whether or not suspicious IP throttling attack protections are active.
   *
   */
  enabled: boolean;
  /**
   * Action to take when a suspicious IP throttling threshold is violated.
   *           Possible values: <code>block</code>, <code>admin_notification</code>.
   *
   */
  shields: Array<GetSuspiciousIpThrottling200ResponseShieldsEnum>;
  /**
   * List of trusted IP addresses that will not have attack protection enforced against them.
   *
   */
  allowlist: Array<GetBruteForceProtection200ResponseAllowlistInner>;
  /**
   */
  stage: GetSuspiciousIpThrottling200ResponseStage;
}

export const GetSuspiciousIpThrottling200ResponseShieldsEnum = {
  block: 'block',
  admin_notification: 'admin_notification',
} as const;
export type GetSuspiciousIpThrottling200ResponseShieldsEnum =
  (typeof GetSuspiciousIpThrottling200ResponseShieldsEnum)[keyof typeof GetSuspiciousIpThrottling200ResponseShieldsEnum];

/**
 * Holds per-stage configuration options (max_attempts and rate).
 */
export interface GetSuspiciousIpThrottling200ResponseStage {
  /**
   */
  'pre-login': GetSuspiciousIpThrottling200ResponseStagePreLogin;
  /**
   */
  'pre-user-registration': GetSuspiciousIpThrottling200ResponseStagePreUserRegistration;
}
/**
 * Configuration options that apply before every login attempt.
 */
export interface GetSuspiciousIpThrottling200ResponseStagePreLogin {
  /**
   * Total number of attempts allowed per day.
   *
   */
  max_attempts: number;
  /**
   * Interval of time, given in milliseconds, at which new attempts are granted.
   *
   */
  rate: number;
}
/**
 * Configuration options that apply before every user registration attempt.
 */
export interface GetSuspiciousIpThrottling200ResponseStagePreUserRegistration {
  /**
   * Total number of attempts allowed.
   *
   */
  max_attempts: number;
  /**
   * Interval of time, given in milliseconds, at which new attempts are granted.
   *
   */
  rate: number;
}
/**
 *
 */
export interface GetTriggers200Response {
  /**
   */
  triggers: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
}
/**
 *
 */
export type GetUniversalLogin200Response = GetUniversalLogin200ResponseOneOf | string;
/**
 *
 */
export interface GetUniversalLogin200ResponseOneOf {
  /**
   * The custom page template for the New Universal Login Experience
   *
   */
  body: string;
}
/**
 *
 */
export type GetUserOrganizations200Response =
  | Array<GetOrganizations200ResponseOneOfInner>
  | GetOrganizations200ResponseOneOf;
/**
 *
 */
export type GetUsers200Response = Array<GetUsers200ResponseOneOfInner> | GetUsers200ResponseOneOf;
/**
 *
 */
export interface GetUsers200ResponseOneOf {
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  length: number;
  /**
   */
  total: number;
  /**
   */
  users: Array<GetUsers200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetUsers200ResponseOneOfInner {
  [key: string]: any | any;
  /**
   * ID of the user which can be used when interacting with other APIs.
   *
   */
  user_id: string;
  /**
   * Email address of this user.
   *
   */
  email: string;
  /**
   * Whether this email address is verified (true) or unverified (false).
   *
   */
  email_verified: boolean;
  /**
   * Username of this user.
   *
   */
  username: string;
  /**
   * Phone number for this user when using SMS connections. Follows the <a href="https://en.wikipedia.org/wiki/E.164">E.164 recommendation</a>.
   *
   */
  phone_number: string;
  /**
   * Whether this phone number has been verified (true) or not (false).
   *
   */
  phone_verified: boolean;
  /**
   */
  created_at: GetUsers200ResponseOneOfInnerCreatedAt;
  /**
   */
  updated_at: GetUsers200ResponseOneOfInnerUpdatedAt;
  /**
   * Array of user identity objects when accounts are linked.
   *
   */
  identities: Array<GetUsers200ResponseOneOfInnerIdentitiesInner>;
  /**
   */
  app_metadata: GetUsers200ResponseOneOfInnerAppMetadata;
  /**
   * User metadata to which this user has read/write access.
   *
   */
  user_metadata: { [key: string]: any };
  /**
   * URL to picture, photo, or avatar of this user.
   *
   */
  picture: string;
  /**
   * Name of this user.
   *
   */
  name: string;
  /**
   * Preferred nickname or alias of this user.
   *
   */
  nickname: string;
  /**
   * List of multi-factor authentication providers with which this user has enrolled.
   *
   */
  multifactor: Array<string>;
  /**
   * Last IP address from which this user logged in.
   *
   */
  last_ip: string;
  /**
   */
  last_login: GetUsers200ResponseOneOfInnerLastLogin;
  /**
   * Total number of logins this user has performed.
   *
   */
  logins_count: number;
  /**
   * Whether this user was blocked by an administrator (true) or is not (false).
   *
   */
  blocked: boolean;
  /**
   * Given name/first name/forename of this user.
   *
   */
  given_name: string;
  /**
   * Family name/last name/surname of this user.
   *
   */
  family_name: string;
}
/**
 * User metadata to which this user has read-only access.
 */
export interface GetUsers200ResponseOneOfInnerAppMetadata {
  [key: string]: any | any;
  /**
   */
  clientID: any | null;
  /**
   */
  globalClientID: any | null;
  /**
   */
  global_client_id: any | null;
  /**
   */
  email_verified: any | null;
  /**
   */
  user_id: any | null;
  /**
   */
  identities: any | null;
  /**
   */
  lastIP: any | null;
  /**
   */
  lastLogin: any | null;
  /**
   */
  metadata: any | null;
  /**
   */
  created_at: any | null;
  /**
   */
  loginsCount: any | null;
  /**
   */
  _id: any | null;
  /**
   */
  email: any | null;
  /**
   */
  blocked: any | null;
  /**
   */
  __tenant: any | null;
  /**
   */
  updated_at: any | null;
}
/**
 *
 */
export type GetUsers200ResponseOneOfInnerCreatedAt = string | { [key: string]: any };
/**
 *
 */
export interface GetUsers200ResponseOneOfInnerIdentitiesInner {
  /**
   * Name of the connection containing this identity.
   *
   */
  connection: string;
  /**
   * Unique identifier of the user user for this identity.
   *
   */
  user_id: string;
  /**
   * The type of identity provider
   *
   */
  provider: string;
  /**
   * Whether this identity is from a social provider (true) or not (false).
   *
   */
  isSocial: boolean;
  /**
   * IDP access token returned only if scope read:user_idp_tokens is defined.
   *
   */
  access_token: string;
  /**
   * IDP access token secret returned only if scope read:user_idp_tokens is defined.
   *
   */
  access_token_secret: string;
  /**
   * IDP refresh token returned only if scope read:user_idp_tokens is defined.
   *
   */
  refresh_token: string;
  /**
   */
  profileData: UserProfile;
}
/**
 *
 */
export type GetUsers200ResponseOneOfInnerLastLogin = string | { [key: string]: any };
/**
 *
 */
export type GetUsers200ResponseOneOfInnerUpdatedAt = string | { [key: string]: any };
/**
 *
 */
export interface Hook {
  /**
   * Trigger ID
   *
   */
  triggerId: string;
  /**
   * ID of this hook.
   *
   */
  id: string;
  /**
   * Name of this hook.
   *
   */
  name: string;
  /**
   * Whether this hook will be executed (true) or ignored (false).
   *
   */
  enabled: boolean;
  /**
   * Code to be executed when this hook runs.
   *
   */
  script: string;
  /**
   * Dependencies of this hook used by webtask server.
   *
   */
  dependencies: { [key: string]: any };
}
/**
 *
 */
export interface HookCreate {
  /**
   * Name of this hook.
   *
   */
  name: string;
  /**
   * Code to be executed when this hook runs.
   *
   */
  script: string;
  /**
   * Whether this hook will be executed (true) or ignored (false).
   *
   */
  enabled?: boolean;
  /**
   * Dependencies of this hook used by webtask server.
   *
   */
  dependencies?: { [key: string]: any };
  /**
   * Execution stage of this rule. Can be `credentials-exchange`, `pre-user-registration`, `post-user-registration`, `post-change-password`, or `send-phone-message`.
   *
   */
  triggerId: HookCreateTriggerIdEnum;
}

export const HookCreateTriggerIdEnum = {
  credentials_exchange: 'credentials-exchange',
  pre_user_registration: 'pre-user-registration',
  post_user_registration: 'post-user-registration',
  post_change_password: 'post-change-password',
  send_phone_message: 'send-phone-message',
} as const;
export type HookCreateTriggerIdEnum =
  (typeof HookCreateTriggerIdEnum)[keyof typeof HookCreateTriggerIdEnum];

/**
 *
 */
export interface HookUpdate {
  /**
   * Name of this hook.
   *
   */
  name?: string;
  /**
   * Code to be executed when this hook runs.
   *
   */
  script?: string;
  /**
   * Whether this hook will be executed (true) or ignored (false).
   *
   */
  enabled?: boolean;
  /**
   * Dependencies of this hook used by webtask server.
   *
   */
  dependencies?: { [key: string]: any };
}
/**
 *
 */
export interface Job {
  [key: string]: any | any;
  /**
   * Status of this job.
   *
   */
  status: string;
  /**
   * Type of job this is.
   *
   */
  type: string;
  /**
   * When this job was created.
   *
   */
  created_at?: string;
  /**
   * ID of this job.
   *
   */
  id: string;
  /**
   * connection_id of the connection from which users will be exported.
   *
   */
  connection_id?: string;
  /**
   * Format of the file. Must be `json` or `csv`.
   *
   */
  format?: JobFormatEnum;
  /**
   * Limit the number of records.
   *
   */
  limit?: number;
  /**
   * List of fields to be included in the CSV. Defaults to a predefined set of fields.
   *
   */
  fields?: Array<PostUsersExportsRequestFieldsInner>;
}

export const JobFormatEnum = {
  json: 'json',
  csv: 'csv',
} as const;
export type JobFormatEnum = (typeof JobFormatEnum)[keyof typeof JobFormatEnum];

/**
 *
 */
export interface Log {
  [key: string]: any | any;
  /**
   */
  date: LogDate;
  /**
   * Type of event.
   *
   */
  type: string;
  /**
   * Description of this event.
   *
   */
  description: string | null;
  /**
   * Name of the connection the event relates to.
   *
   */
  connection: string;
  /**
   * ID of the connection the event relates to.
   *
   */
  connection_id: string;
  /**
   * ID of the client (application).
   *
   */
  client_id: string;
  /**
   * Name of the client (application).
   *
   */
  client_name: string;
  /**
   * IP address of the log event source.
   *
   */
  ip: string;
  /**
   * Hostname the event applies to.
   *
   */
  hostname: string;
  /**
   * ID of the user involved in the event.
   *
   */
  user_id: string;
  /**
   * Name of the user involved in the event.
   *
   */
  user_name: string;
  /**
   * API audience the event applies to.
   *
   */
  audience: string;
  /**
   * Scope permissions applied to the event.
   *
   */
  scope: string;
  /**
   * Name of the strategy involved in the event.
   *
   */
  strategy: string;
  /**
   * Type of strategy involved in the event.
   *
   */
  strategy_type: string;
  /**
   * Unique ID of the event.
   *
   */
  log_id: string;
  /**
   * Whether the client was a mobile device (true) or desktop/laptop/server (false).
   *
   */
  isMobile: boolean;
  /**
   * Additional useful details about this event (structure is dependent upon event type).
   *
   */
  details: { [key: string]: any };
  /**
   * User agent string from the client device that caused the event.
   *
   */
  user_agent: string;
  /**
   */
  location_info: LogLocationInfo;
}
/**
 *
 */
export type LogDate = string | { [key: string]: any };
/**
 * Information about the location that triggered this event based on the `ip`.
 */
export interface LogLocationInfo {
  [key: string]: any | any;
  /**
   * Two-letter <a href="https://www.iso.org/iso-3166-country-codes.html">Alpha-2 ISO 3166-1</a> country code.
   *
   */
  country_code: string;
  /**
   * Three-letter <a href="https://www.iso.org/iso-3166-country-codes.html">Alpha-3 ISO 3166-1</a> country code.
   *
   */
  country_code3: string;
  /**
   * Full country name in English.
   *
   */
  country_name: string;
  /**
   * Full city name in English.
   *
   */
  city_name: string;
  /**
   * Global latitude (horizontal) position.
   *
   */
  latitude: string;
  /**
   * Global longitude (vertical) position.
   *
   */
  longitude: string;
  /**
   * Time zone name as found in the <a href="https://www.iana.org/time-zones">tz database</a>.
   *
   */
  time_zone: string;
  /**
   * Continent the country is located within. Can be `AF` (Africa), `AN` (Antarctica), `AS` (Asia), `EU` (Europe), `NA` (North America), `OC` (Oceania) or `SA` (South America).
   *
   */
  continent_code: string;
}
/**
 *
 */
export interface PatchActionRequest {
  /**
   * The name of an action.
   *
   */
  name?: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   *
   */
  supported_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   *
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   *
   */
  dependencies?: Array<PostActionRequestDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   *
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   *
   */
  secrets?: Array<PostActionRequestSecretsInner>;
}
/**
 *
 */
export interface PatchAuthenticationMethodsByAuthenticationMethodIdRequest {
  /**
   * A human-readable label to identify the authentication method.
   *
   */
  name?: string;
  /**
   * Preferred phone authentication method
   *
   */
  preferred_authentication_method?: PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum;
}

export const PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum =
  {
    voice: 'voice',
    sms: 'sms',
  } as const;
export type PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum =
  (typeof PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum)[keyof typeof PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum];

/**
 *
 */
export interface PatchBindings200Response {
  /**
   */
  bindings: Array<GetBindings200ResponseBindingsInner>;
}
/**
 *
 */
export interface PatchBindingsRequest {
  /**
   * The actions that will be bound to this trigger. The order in which they are included will be the order in which they are executed.
   *
   */
  bindings?: Array<PatchBindingsRequestBindingsInner>;
}
/**
 *
 */
export type PatchBindingsRequestBindingsInner = PatchBindingsRequestBindingsInnerOneOf;
/**
 *
 */
export interface PatchBindingsRequestBindingsInnerOneOf {
  /**
   */
  ref: PatchBindingsRequestBindingsInnerOneOfRef;
  /**
   * The name of the binding.
   *
   */
  display_name?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   *
   */
  secrets?: Array<PostActionRequestSecretsInner>;
}
/**
 * A reference to an action. An action can be referred to by ID or by Name.
 */
export interface PatchBindingsRequestBindingsInnerOneOfRef {
  [key: string]: any | any;
  /**
   * How the action is being referred to: `action_id` or `action_name`.
   *
   */
  type?: PatchBindingsRequestBindingsInnerOneOfRefTypeEnum;
  /**
   * The id or name of an action that is being bound to a trigger.
   *
   */
  value?: string;
}

export const PatchBindingsRequestBindingsInnerOneOfRefTypeEnum = {
  binding_id: 'binding_id',
  action_id: 'action_id',
  action_name: 'action_name',
} as const;
export type PatchBindingsRequestBindingsInnerOneOfRefTypeEnum =
  (typeof PatchBindingsRequestBindingsInnerOneOfRefTypeEnum)[keyof typeof PatchBindingsRequestBindingsInnerOneOfRefTypeEnum];

/**
 * Branding settings
 */
export interface PatchBrandingRequest {
  /**
   */
  colors?: PatchBrandingRequestColors | null;
  /**
   * URL for the favicon. Must use HTTPS.
   *
   */
  favicon_url?: string | null;
  /**
   * URL for the logo. Must use HTTPS.
   *
   */
  logo_url?: string | null;
  /**
   */
  font?: PatchBrandingRequestFont | null;
}
/**
 * Custom color settings.
 */
export interface PatchBrandingRequestColors {
  /**
   * Accent color.
   *
   */
  primary?: string | null;
  /**
   */
  page_background?: GetBranding200ResponseColorsPageBackground;
}
/**
 * Custom font settings.
 */
export interface PatchBrandingRequestFont {
  /**
   * URL for the custom font. The URL must point to a font file and not a stylesheet. Must use HTTPS.
   *
   */
  url?: string | null;
}
/**
 *
 */
export interface PatchBreachedPasswordDetectionRequest {
  /**
   * Whether or not breached password detection is active.
   *
   */
  enabled?: boolean;
  /**
   * Action to take when a breached password is detected during a login.
   *       Possible values: <code>block</code>, <code>user_notification</code>, <code>admin_notification</code>.
   *
   */
  shields?: Array<PatchBreachedPasswordDetectionRequestShieldsEnum>;
  /**
   * When "admin_notification" is enabled, determines how often email notifications are sent.
   *         Possible values: <code>immediately</code>, <code>daily</code>, <code>weekly</code>, <code>monthly</code>.
   *
   */
  admin_notification_frequency?: Array<PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum>;
  /**
   * The subscription level for breached password detection methods. Use "enhanced" to enable Credential Guard.
   *         Possible values: <code>standard</code>, <code>enhanced</code>.
   *
   */
  method?: PatchBreachedPasswordDetectionRequestMethodEnum;
  /**
   */
  stage?: PatchBreachedPasswordDetectionRequestStage;
}

export const PatchBreachedPasswordDetectionRequestShieldsEnum = {
  block: 'block',
  user_notification: 'user_notification',
  admin_notification: 'admin_notification',
} as const;
export type PatchBreachedPasswordDetectionRequestShieldsEnum =
  (typeof PatchBreachedPasswordDetectionRequestShieldsEnum)[keyof typeof PatchBreachedPasswordDetectionRequestShieldsEnum];

export const PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum = {
  immediately: 'immediately',
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
} as const;
export type PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum =
  (typeof PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum)[keyof typeof PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum];

export const PatchBreachedPasswordDetectionRequestMethodEnum = {
  standard: 'standard',
  enhanced: 'enhanced',
} as const;
export type PatchBreachedPasswordDetectionRequestMethodEnum =
  (typeof PatchBreachedPasswordDetectionRequestMethodEnum)[keyof typeof PatchBreachedPasswordDetectionRequestMethodEnum];

/**
 *
 */
export interface PatchBreachedPasswordDetectionRequestStage {
  /**
   */
  'pre-user-registration'?: PatchBreachedPasswordDetectionRequestStagePreUserRegistration;
}
/**
 *
 */
export interface PatchBreachedPasswordDetectionRequestStagePreUserRegistration {
  /**
   * Action to take when a breached password is detected during a signup.
   *               Possible values: <code>block</code>, <code>admin_notification</code>.
   *
   */
  shields?: Array<PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum>;
}

export const PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum = {
  block: 'block',
  admin_notification: 'admin_notification',
} as const;
export type PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum =
  (typeof PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum)[keyof typeof PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum];

/**
 *
 */
export interface PatchBruteForceProtectionRequest {
  /**
   * Whether or not brute force attack protections are active.
   *
   */
  enabled?: boolean;
  /**
   * Action to take when a brute force protection threshold is violated.
   *         Possible values: <code>block</code>, <code>user_notification</code>.
   *
   */
  shields?: Array<PatchBruteForceProtectionRequestShieldsEnum>;
  /**
   * List of trusted IP addresses that will not have attack protection enforced against them.
   *
   */
  allowlist?: Array<GetBruteForceProtection200ResponseAllowlistInner>;
  /**
   * Account Lockout: Determines whether or not IP address is used when counting failed attempts.
   *           Possible values: <code>count_per_identifier_and_ip</code>, <code>count_per_identifier</code>.
   *
   */
  mode?: PatchBruteForceProtectionRequestModeEnum;
  /**
   * Maximum number of unsuccessful attempts.
   *
   */
  max_attempts?: number;
}

export const PatchBruteForceProtectionRequestShieldsEnum = {
  block: 'block',
  user_notification: 'user_notification',
} as const;
export type PatchBruteForceProtectionRequestShieldsEnum =
  (typeof PatchBruteForceProtectionRequestShieldsEnum)[keyof typeof PatchBruteForceProtectionRequestShieldsEnum];

export const PatchBruteForceProtectionRequestModeEnum = {
  identifier_and_ip: 'count_per_identifier_and_ip',
  identifier: 'count_per_identifier',
} as const;
export type PatchBruteForceProtectionRequestModeEnum =
  (typeof PatchBruteForceProtectionRequestModeEnum)[keyof typeof PatchBruteForceProtectionRequestModeEnum];

/**
 *
 */
export interface PatchClientGrantsByIdRequest {
  /**
   * Scopes allowed for this client grant.
   *
   */
  scope?: Array<string>;
}
/**
 *
 */
export interface PatchCredentialsByCredentialIdRequest {
  /**
   * The ISO 8601 formatted date representing the expiration of the credential.
   *
   */
  expires_at?: string | null;
}
/**
 *
 */
export interface PatchCustomDomainsByIdRequest {
  /**
   * compatible includes TLS 1.0, 1.1, 1.2, and recommended only includes TLS 1.2
   *
   */
  tls_policy?: PatchCustomDomainsByIdRequestTlsPolicyEnum;
  /**
   * The HTTP header to fetch the client's IP address
   *
   */
  custom_client_ip_header?: PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum;
}

export const PatchCustomDomainsByIdRequestTlsPolicyEnum = {
  recommended: 'recommended',
  compatible: 'compatible',
} as const;
export type PatchCustomDomainsByIdRequestTlsPolicyEnum =
  (typeof PatchCustomDomainsByIdRequestTlsPolicyEnum)[keyof typeof PatchCustomDomainsByIdRequestTlsPolicyEnum];

export const PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum = {
  true_client_ip: 'true-client-ip',
  cf_connecting_ip: 'cf-connecting-ip',
  x_forwarded_for: 'x-forwarded-for',
  x_azure_clientip: 'x-azure-clientip',
  empty: '',
} as const;
export type PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum =
  (typeof PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum)[keyof typeof PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum];

/**
 *
 */
export interface PatchEmailTemplatesByTemplateNameRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   *
   */
  template?: PatchEmailTemplatesByTemplateNameRequestTemplateEnum;
  /**
   * Body of the email template.
   *
   */
  body?: string | null;
  /**
   * Senders `from` email address.
   *
   */
  from?: string | null;
  /**
   * URL to redirect the user to after a successful action.
   *
   */
  resultUrl?: string | null;
  /**
   * Subject line of the email.
   *
   */
  subject?: string | null;
  /**
   * Syntax of the template body.
   *
   */
  syntax?: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   *
   */
  urlLifetimeInSeconds?: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   *
   */
  includeEmailInRedirect?: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   *
   */
  enabled?: boolean | null;
}

export const PatchEmailTemplatesByTemplateNameRequestTemplateEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type PatchEmailTemplatesByTemplateNameRequestTemplateEnum =
  (typeof PatchEmailTemplatesByTemplateNameRequestTemplateEnum)[keyof typeof PatchEmailTemplatesByTemplateNameRequestTemplateEnum];

/**
 *
 */
export interface PatchEnabledConnectionsByConnectionIdRequest {
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   *
   */
  assign_membership_on_login?: boolean;
  /**
   * Enables showing a button for the connection in the organization login page. If false, it will be usable only by HRD.
   *
   */
  show_as_button?: boolean;
}
/**
 *
 */
export interface PatchLogStreamsByIdRequest {
  /**
   * log stream name
   *
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   *
   */
  status?: PatchLogStreamsByIdRequestStatusEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters?: Array<PostLogStreamsRequestOneOfFiltersInner>;
  /**
   */
  sink?: PatchLogStreamsByIdRequestSink;
}

export const PatchLogStreamsByIdRequestStatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type PatchLogStreamsByIdRequestStatusEnum =
  (typeof PatchLogStreamsByIdRequestStatusEnum)[keyof typeof PatchLogStreamsByIdRequestStatusEnum];

/**
 *
 */
export type PatchLogStreamsByIdRequestSink =
  | GetLogStreams200ResponseInnerOneOf5Sink
  | GetLogStreams200ResponseInnerOneOfSink
  | PatchLogStreamsByIdRequestSinkOneOf
  | PatchLogStreamsByIdRequestSinkOneOf1
  | PatchLogStreamsByIdRequestSinkOneOf2
  | PatchLogStreamsByIdRequestSinkOneOf3;
/**
 *
 */
export interface PatchLogStreamsByIdRequestSinkOneOf {
  /**
   * Datadog API Key
   *
   */
  datadogApiKey?: string;
  /**
   * Datadog region
   *
   */
  datadogRegion: PatchLogStreamsByIdRequestSinkOneOfDatadogRegionEnum;
}

export const PatchLogStreamsByIdRequestSinkOneOfDatadogRegionEnum = {
  us: 'us',
  eu: 'eu',
  us3: 'us3',
  us5: 'us5',
} as const;
export type PatchLogStreamsByIdRequestSinkOneOfDatadogRegionEnum =
  (typeof PatchLogStreamsByIdRequestSinkOneOfDatadogRegionEnum)[keyof typeof PatchLogStreamsByIdRequestSinkOneOfDatadogRegionEnum];

/**
 *
 */
export interface PatchLogStreamsByIdRequestSinkOneOf1 {
  /**
   * Splunk URL Endpoint
   *
   */
  splunkDomain: string;
  /**
   * Port
   *
   */
  splunkPort: string;
  /**
   * Splunk token
   *
   */
  splunkToken?: string;
  /**
   * Verify TLS certificate
   *
   */
  splunkSecure: boolean;
}
/**
 *
 */
export interface PatchLogStreamsByIdRequestSinkOneOf2 {
  /**
   * Segment write key
   *
   */
  segmentWriteKey?: string;
}
/**
 *
 */
export interface PatchLogStreamsByIdRequestSinkOneOf3 {
  /**
   * Mixpanel Region
   *
   */
  mixpanelRegion: PatchLogStreamsByIdRequestSinkOneOf3MixpanelRegionEnum;
  /**
   * Mixpanel Project Id
   *
   */
  mixpanelProjectId: string;
  /**
   * Mixpanel Service Account Username
   *
   */
  mixpanelServiceAccountUsername: string;
  /**
   * Mixpanel Service Account Password
   *
   */
  mixpanelServiceAccountPassword?: string;
}

export const PatchLogStreamsByIdRequestSinkOneOf3MixpanelRegionEnum = {
  us: 'us',
  eu: 'eu',
} as const;
export type PatchLogStreamsByIdRequestSinkOneOf3MixpanelRegionEnum =
  (typeof PatchLogStreamsByIdRequestSinkOneOf3MixpanelRegionEnum)[keyof typeof PatchLogStreamsByIdRequestSinkOneOf3MixpanelRegionEnum];

/**
 *
 */
export interface PatchOrganizationsByIdRequest {
  /**
   * Friendly name of this organization.
   *
   */
  display_name?: string;
  /**
   * The name of this organization.
   *
   */
  name?: string;
  /**
   */
  branding?: PatchOrganizationsByIdRequestBranding | null;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   *
   */
  metadata?: { [key: string]: any } | null;
}
/**
 * Theme defines how to style the login pages
 */
export interface PatchOrganizationsByIdRequestBranding {
  /**
   * URL of logo to display on login page
   *
   */
  logo_url?: string;
  /**
   */
  colors?: GetOrganizations200ResponseOneOfInnerBrandingColors;
}
/**
 *
 */
export interface PatchSuspiciousIpThrottlingRequest {
  /**
   * Whether or not suspicious IP throttling attack protections are active.
   *
   */
  enabled?: boolean;
  /**
   * Action to take when a suspicious IP throttling threshold is violated.
   *           Possible values: <code>block</code>, <code>admin_notification</code>.
   *
   */
  shields?: Array<PatchSuspiciousIpThrottlingRequestShieldsEnum>;
  /**
   * List of trusted IP addresses that will not have attack protection enforced against them.
   *
   */
  allowlist?: Array<GetBruteForceProtection200ResponseAllowlistInner>;
  /**
   */
  stage?: PatchSuspiciousIpThrottlingRequestStage;
}

export const PatchSuspiciousIpThrottlingRequestShieldsEnum = {
  block: 'block',
  admin_notification: 'admin_notification',
} as const;
export type PatchSuspiciousIpThrottlingRequestShieldsEnum =
  (typeof PatchSuspiciousIpThrottlingRequestShieldsEnum)[keyof typeof PatchSuspiciousIpThrottlingRequestShieldsEnum];

/**
 * Holds per-stage configuration options (max_attempts and rate).
 */
export interface PatchSuspiciousIpThrottlingRequestStage {
  /**
   */
  'pre-login'?: PatchSuspiciousIpThrottlingRequestStagePreLogin;
  /**
   */
  'pre-user-registration'?: PatchSuspiciousIpThrottlingRequestStagePreUserRegistration;
}
/**
 * Configuration options that apply before every login attempt.
 */
export interface PatchSuspiciousIpThrottlingRequestStagePreLogin {
  /**
   * Total number of attempts allowed per day.
   *
   */
  max_attempts?: number;
  /**
   * Interval of time, given in milliseconds, at which new attempts are granted.
   *
   */
  rate?: number;
}
/**
 * Configuration options that apply before every user registration attempt.
 */
export interface PatchSuspiciousIpThrottlingRequestStagePreUserRegistration {
  /**
   * Total number of attempts allowed.
   *
   */
  max_attempts?: number;
  /**
   * Interval of time, given in milliseconds, at which new attempts are granted.
   *
   */
  rate?: number;
}
/**
 *
 */
export interface Permission {
  /**
   * Resource server (API) identifier that this permission is for.
   *
   */
  resource_server_identifier?: string;
  /**
   * Name of this permission.
   *
   */
  permission_name?: string;
  /**
   * Resource server (API) name this permission is for.
   *
   */
  resource_server_name?: string;
  /**
   * Description of this permission.
   *
   */
  description?: string;
}
/**
 *
 */
export interface PostActionRequest {
  /**
   * The name of an action.
   *
   */
  name: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   *
   */
  supported_triggers: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   *
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   *
   */
  dependencies?: Array<PostActionRequestDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   *
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   *
   */
  secrets?: Array<PostActionRequestSecretsInner>;
}
/**
 * Dependency is an npm module. These values are used to produce an immutable artifact, which manifests as a layer_id.
 */
export interface PostActionRequestDependenciesInner {
  /**
   * name is the name of the npm module, e.g. lodash
   *
   */
  name?: string;
  /**
   * description is the version of the npm module, e.g. 4.17.1
   *
   */
  version?: string;
  /**
   * registry_url is an optional value used primarily for private npm registries.
   *
   */
  registry_url?: string;
}
/**
 *
 */
export interface PostActionRequestSecretsInner {
  [key: string]: any | any;
  /**
   * The name of the particular secret, e.g. API_KEY.
   *
   */
  name?: string;
  /**
   * The value of the particular secret, e.g. secret123. A secret's value can only be set upon creation. A secret's value will never be returned by the API.
   *
   */
  value?: string;
}
/**
 * The successfully created authentication method.
 */
export interface PostAuthenticationMethods201Response {
  /**
   * The ID of the newly created authentication method (automatically generated by the application)
   *
   */
  id?: string;
  /**
   */
  type: PostAuthenticationMethods201ResponseTypeEnum;
  /**
   * A human-readable label to identify the authentication method.
   *
   */
  name?: string;
  /**
   * Base32 encoded secret for TOTP generation
   *
   */
  totp_secret?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   *
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   *
   */
  email?: string;
  /**
   */
  authentication_methods?: Array<PutAuthenticationMethods200ResponseInnerAuthenticationMethodsInner>;
  /**
   * Preferred phone authentication method
   *
   */
  preferred_authentication_method?: PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum;
  /**
   * Applies to webauthn authenticators only. The id of the credential.
   *
   */
  key_id?: string;
  /**
   * Applies to webauthn authenticators only. The public key.
   *
   */
  public_key?: string;
  /**
   * Applies to webauthn authenticators only. The relying party identifier.
   *
   */
  relying_party_identifier?: string;
  /**
   * Authentication method creation date
   *
   */
  created_at?: string;
}

export const PostAuthenticationMethods201ResponseTypeEnum = {
  phone: 'phone',
  email: 'email',
  totp: 'totp',
  webauthn_roaming: 'webauthn-roaming',
} as const;
export type PostAuthenticationMethods201ResponseTypeEnum =
  (typeof PostAuthenticationMethods201ResponseTypeEnum)[keyof typeof PostAuthenticationMethods201ResponseTypeEnum];

export const PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum = {
  voice: 'voice',
  sms: 'sms',
} as const;
export type PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum =
  (typeof PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum)[keyof typeof PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum];

/**
 *
 */
export interface PostAuthenticationMethodsRequest {
  /**
   */
  type: PostAuthenticationMethodsRequestTypeEnum;
  /**
   * A human-readable label to identify the authentication method.
   *
   */
  name?: string;
  /**
   * Base32 encoded secret for TOTP generation.
   *
   */
  totp_secret?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   *
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   *
   */
  email?: string;
  /**
   * Preferred phone authentication method.
   *
   */
  preferred_authentication_method?: PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum;
  /**
   * Applies to email webauthn authenticators only. The id of the credential.
   *
   */
  key_id?: string;
  /**
   * Applies to email webauthn authenticators only. The public key.
   *
   */
  public_key?: string;
  /**
   * Applies to email webauthn authenticators only. The relying party identifier.
   *
   */
  relying_party_identifier?: string;
}

export const PostAuthenticationMethodsRequestTypeEnum = {
  phone: 'phone',
  email: 'email',
  totp: 'totp',
  webauthn_roaming: 'webauthn-roaming',
} as const;
export type PostAuthenticationMethodsRequestTypeEnum =
  (typeof PostAuthenticationMethodsRequestTypeEnum)[keyof typeof PostAuthenticationMethodsRequestTypeEnum];

export const PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum = {
  voice: 'voice',
  sms: 'sms',
} as const;
export type PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum =
  (typeof PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum)[keyof typeof PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum];

/**
 *
 */
export interface PostBrandingTheme200Response {
  /**
   */
  borders: PostBrandingThemeRequestBorders;
  /**
   */
  colors: PostBrandingThemeRequestColors;
  /**
   * Display Name
   *
   */
  displayName: string;
  /**
   */
  fonts: PostBrandingThemeRequestFonts;
  /**
   */
  page_background: PostBrandingThemeRequestPageBackground;
  /**
   * Theme Id
   *
   */
  themeId: string;
  /**
   */
  widget: PostBrandingThemeRequestWidget;
}
/**
 * Branding theme
 */
export interface PostBrandingThemeRequest {
  /**
   */
  borders: PostBrandingThemeRequestBorders;
  /**
   */
  colors: PostBrandingThemeRequestColors;
  /**
   * Display Name
   *
   */
  displayName?: string;
  /**
   */
  fonts: PostBrandingThemeRequestFonts;
  /**
   */
  page_background: PostBrandingThemeRequestPageBackground;
  /**
   */
  widget: PostBrandingThemeRequestWidget;
}
/**
 *
 */
export interface PostBrandingThemeRequestBorders {
  /**
   * Button border radius
   *
   */
  button_border_radius: number;
  /**
   * Button border weight
   *
   */
  button_border_weight: number;
  /**
   * Buttons style
   *
   */
  buttons_style: PostBrandingThemeRequestBordersButtonsStyleEnum;
  /**
   * Input border radius
   *
   */
  input_border_radius: number;
  /**
   * Input border weight
   *
   */
  input_border_weight: number;
  /**
   * Inputs style
   *
   */
  inputs_style: PostBrandingThemeRequestBordersInputsStyleEnum;
  /**
   * Show widget shadow
   *
   */
  show_widget_shadow: boolean;
  /**
   * Widget border weight
   *
   */
  widget_border_weight: number;
  /**
   * Widget corner radius
   *
   */
  widget_corner_radius: number;
}

export const PostBrandingThemeRequestBordersButtonsStyleEnum = {
  pill: 'pill',
  rounded: 'rounded',
  sharp: 'sharp',
} as const;
export type PostBrandingThemeRequestBordersButtonsStyleEnum =
  (typeof PostBrandingThemeRequestBordersButtonsStyleEnum)[keyof typeof PostBrandingThemeRequestBordersButtonsStyleEnum];

export const PostBrandingThemeRequestBordersInputsStyleEnum = {
  pill: 'pill',
  rounded: 'rounded',
  sharp: 'sharp',
} as const;
export type PostBrandingThemeRequestBordersInputsStyleEnum =
  (typeof PostBrandingThemeRequestBordersInputsStyleEnum)[keyof typeof PostBrandingThemeRequestBordersInputsStyleEnum];

/**
 *
 */
export interface PostBrandingThemeRequestColors {
  /**
   * Base Focus Color
   *
   */
  base_focus_color?: string;
  /**
   * Base Hover Color
   *
   */
  base_hover_color?: string;
  /**
   * Body text
   *
   */
  body_text: string;
  /**
   * Error
   *
   */
  error: string;
  /**
   * Header
   *
   */
  header: string;
  /**
   * Icons
   *
   */
  icons: string;
  /**
   * Input background
   *
   */
  input_background: string;
  /**
   * Input border
   *
   */
  input_border: string;
  /**
   * Input filled text
   *
   */
  input_filled_text: string;
  /**
   * Input labels & placeholders
   *
   */
  input_labels_placeholders: string;
  /**
   * Links & focused components
   *
   */
  links_focused_components: string;
  /**
   * Primary button
   *
   */
  primary_button: string;
  /**
   * Primary button label
   *
   */
  primary_button_label: string;
  /**
   * Secondary button border
   *
   */
  secondary_button_border: string;
  /**
   * Secondary button label
   *
   */
  secondary_button_label: string;
  /**
   * Success
   *
   */
  success: string;
  /**
   * Widget background
   *
   */
  widget_background: string;
  /**
   * Widget border
   *
   */
  widget_border: string;
}
/**
 *
 */
export interface PostBrandingThemeRequestFonts {
  /**
   */
  body_text: PostBrandingThemeRequestFontsBodyText;
  /**
   */
  buttons_text: PostBrandingThemeRequestFontsButtonsText;
  /**
   * Font URL
   *
   */
  font_url: string;
  /**
   */
  input_labels: PostBrandingThemeRequestFontsInputLabels;
  /**
   */
  links: PostBrandingThemeRequestFontsLinks;
  /**
   * Links style
   *
   */
  links_style: PostBrandingThemeRequestFontsLinksStyleEnum;
  /**
   * Reference text size
   *
   */
  reference_text_size: number;
  /**
   */
  subtitle: PostBrandingThemeRequestFontsSubtitle;
  /**
   */
  title: PostBrandingThemeRequestFontsTitle;
}

export const PostBrandingThemeRequestFontsLinksStyleEnum = {
  normal: 'normal',
  underlined: 'underlined',
} as const;
export type PostBrandingThemeRequestFontsLinksStyleEnum =
  (typeof PostBrandingThemeRequestFontsLinksStyleEnum)[keyof typeof PostBrandingThemeRequestFontsLinksStyleEnum];

/**
 * Body text
 */
export interface PostBrandingThemeRequestFontsBodyText {
  /**
   * Body text bold
   *
   */
  bold: boolean;
  /**
   * Body text size
   *
   */
  size: number;
}
/**
 * Buttons text
 */
export interface PostBrandingThemeRequestFontsButtonsText {
  /**
   * Buttons text bold
   *
   */
  bold: boolean;
  /**
   * Buttons text size
   *
   */
  size: number;
}
/**
 * Input Labels
 */
export interface PostBrandingThemeRequestFontsInputLabels {
  /**
   * Input Labels bold
   *
   */
  bold: boolean;
  /**
   * Input Labels size
   *
   */
  size: number;
}
/**
 * Links
 */
export interface PostBrandingThemeRequestFontsLinks {
  /**
   * Links bold
   *
   */
  bold: boolean;
  /**
   * Links size
   *
   */
  size: number;
}
/**
 * Subtitle
 */
export interface PostBrandingThemeRequestFontsSubtitle {
  /**
   * Subtitle bold
   *
   */
  bold: boolean;
  /**
   * Subtitle size
   *
   */
  size: number;
}
/**
 * Title
 */
export interface PostBrandingThemeRequestFontsTitle {
  /**
   * Title bold
   *
   */
  bold: boolean;
  /**
   * Title size
   *
   */
  size: number;
}
/**
 *
 */
export interface PostBrandingThemeRequestPageBackground {
  /**
   * Background color
   *
   */
  background_color: string;
  /**
   * Background image url
   *
   */
  background_image_url: string;
  /**
   * Page Layout
   *
   */
  page_layout: PostBrandingThemeRequestPageBackgroundPageLayoutEnum;
}

export const PostBrandingThemeRequestPageBackgroundPageLayoutEnum = {
  center: 'center',
  left: 'left',
  right: 'right',
} as const;
export type PostBrandingThemeRequestPageBackgroundPageLayoutEnum =
  (typeof PostBrandingThemeRequestPageBackgroundPageLayoutEnum)[keyof typeof PostBrandingThemeRequestPageBackgroundPageLayoutEnum];

/**
 *
 */
export interface PostBrandingThemeRequestWidget {
  /**
   * Header text alignment
   *
   */
  header_text_alignment: PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum;
  /**
   * Logo height
   *
   */
  logo_height: number;
  /**
   * Logo position
   *
   */
  logo_position: PostBrandingThemeRequestWidgetLogoPositionEnum;
  /**
   * Logo url
   *
   */
  logo_url: string;
  /**
   * Social buttons layout
   *
   */
  social_buttons_layout: PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum;
}

export const PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum = {
  center: 'center',
  left: 'left',
  right: 'right',
} as const;
export type PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum =
  (typeof PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum)[keyof typeof PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum];

export const PostBrandingThemeRequestWidgetLogoPositionEnum = {
  center: 'center',
  left: 'left',
  none: 'none',
  right: 'right',
} as const;
export type PostBrandingThemeRequestWidgetLogoPositionEnum =
  (typeof PostBrandingThemeRequestWidgetLogoPositionEnum)[keyof typeof PostBrandingThemeRequestWidgetLogoPositionEnum];

export const PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum = {
  bottom: 'bottom',
  top: 'top',
} as const;
export type PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum =
  (typeof PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum)[keyof typeof PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum];

/**
 *
 */
export interface PostCredentialsRequest {
  [key: string]: any | any;
  /**
   * Credential type. Supported types: public_key, cert_subject_dn or x509_cert
   *
   */
  credential_type: PostCredentialsRequestCredentialTypeEnum;
  /**
   * Friendly name for a credential.
   *
   */
  name?: string;
}

export const PostCredentialsRequestCredentialTypeEnum = {
  public_key: 'public_key',
  cert_subject_dn: 'cert_subject_dn',
  x509_cert: 'x509_cert',
} as const;
export type PostCredentialsRequestCredentialTypeEnum =
  (typeof PostCredentialsRequestCredentialTypeEnum)[keyof typeof PostCredentialsRequestCredentialTypeEnum];

/**
 *
 */
export interface PostCustomDomains201Response {
  /**
   * ID of the custom domain.
   *
   */
  custom_domain_id: string;
  /**
   * Domain name.
   *
   */
  domain: string;
  /**
   * Whether this is a primary domain (true) or not (false).
   *
   */
  primary: boolean;
  /**
   * Custom domain configuration status. Can be `disabled`, `pending`, `pending_verification`, or `ready`.
   *
   */
  status: PostCustomDomains201ResponseStatusEnum;
  /**
   * Custom domain provisioning type. Can be `auth0_managed_certs` or `self_managed_certs`.
   *
   */
  type: PostCustomDomains201ResponseTypeEnum;
  /**
   */
  verification: PostCustomDomains201ResponseVerification;
  /**
   * The HTTP header to fetch the client's IP address
   *
   */
  custom_client_ip_header?: string | null;
  /**
   * The TLS version policy
   *
   */
  tls_policy?: string;
}

export const PostCustomDomains201ResponseStatusEnum = {
  disabled: 'disabled',
  pending: 'pending',
  pending_verification: 'pending_verification',
  ready: 'ready',
} as const;
export type PostCustomDomains201ResponseStatusEnum =
  (typeof PostCustomDomains201ResponseStatusEnum)[keyof typeof PostCustomDomains201ResponseStatusEnum];

export const PostCustomDomains201ResponseTypeEnum = {
  auth0_managed_certs: 'auth0_managed_certs',
  self_managed_certs: 'self_managed_certs',
} as const;
export type PostCustomDomains201ResponseTypeEnum =
  (typeof PostCustomDomains201ResponseTypeEnum)[keyof typeof PostCustomDomains201ResponseTypeEnum];

/**
 * Domain verification settings.
 */
export interface PostCustomDomains201ResponseVerification {
  /**
   * Domain verification methods.
   *
   */
  methods?: Array<PostCustomDomains201ResponseVerificationMethodsInner>;
}
/**
 *
 */
export interface PostCustomDomains201ResponseVerificationMethodsInner {
  /**
   * Domain verification method.
   *
   */
  name: PostCustomDomains201ResponseVerificationMethodsInnerNameEnum;
  /**
   * Value used to verify the domain.
   *
   */
  record: string;
  /**
   * The name of the txt record for verification
   *
   */
  domain?: string;
}

export const PostCustomDomains201ResponseVerificationMethodsInnerNameEnum = {
  cname: 'cname',
  txt: 'txt',
} as const;
export type PostCustomDomains201ResponseVerificationMethodsInnerNameEnum =
  (typeof PostCustomDomains201ResponseVerificationMethodsInnerNameEnum)[keyof typeof PostCustomDomains201ResponseVerificationMethodsInnerNameEnum];

/**
 *
 */
export interface PostCustomDomainsRequest {
  /**
   * Domain name.
   *
   */
  domain: string;
  /**
   * Custom domain provisioning type. Must be `auth0_managed_certs` or `self_managed_certs`.
   *
   */
  type: PostCustomDomainsRequestTypeEnum;
  /**
   * Custom domain verification method. Must be `txt`.
   *
   */
  verification_method?: PostCustomDomainsRequestVerificationMethodEnum;
  /**
   * compatible includes TLS 1.0, 1.1, 1.2, and recommended only includes TLS 1.2
   *
   */
  tls_policy?: PostCustomDomainsRequestTlsPolicyEnum;
  /**
   * HTTP header to fetch client IP header. Ex: CF-Connecting-IP, X-Forwarded-For or True-Client-IP.
   *
   */
  custom_client_ip_header?: PostCustomDomainsRequestCustomClientIpHeaderEnum;
}

export const PostCustomDomainsRequestTypeEnum = {
  auth0_managed_certs: 'auth0_managed_certs',
  self_managed_certs: 'self_managed_certs',
} as const;
export type PostCustomDomainsRequestTypeEnum =
  (typeof PostCustomDomainsRequestTypeEnum)[keyof typeof PostCustomDomainsRequestTypeEnum];

export const PostCustomDomainsRequestVerificationMethodEnum = {
  txt: 'txt',
} as const;
export type PostCustomDomainsRequestVerificationMethodEnum =
  (typeof PostCustomDomainsRequestVerificationMethodEnum)[keyof typeof PostCustomDomainsRequestVerificationMethodEnum];

export const PostCustomDomainsRequestTlsPolicyEnum = {
  recommended: 'recommended',
  compatible: 'compatible',
} as const;
export type PostCustomDomainsRequestTlsPolicyEnum =
  (typeof PostCustomDomainsRequestTlsPolicyEnum)[keyof typeof PostCustomDomainsRequestTlsPolicyEnum];

export const PostCustomDomainsRequestCustomClientIpHeaderEnum = {
  true_client_ip: 'true-client-ip',
  cf_connecting_ip: 'cf-connecting-ip',
  x_forwarded_for: 'x-forwarded-for',
  x_azure_clientip: 'x-azure-clientip',
  null: 'null',
} as const;
export type PostCustomDomainsRequestCustomClientIpHeaderEnum =
  (typeof PostCustomDomainsRequestCustomClientIpHeaderEnum)[keyof typeof PostCustomDomainsRequestCustomClientIpHeaderEnum];

/**
 *
 */
export type PostDeployDraftVersionRequest = ActionsDraftUpdate;
/**
 *
 */
export interface PostDeviceCredentials201Response {
  [key: string]: any | any;
  /**
   * The credential's identifier
   *
   */
  id: string;
}
/**
 *
 */
export interface PostEmailTemplatesRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   *
   */
  template: PostEmailTemplatesRequestTemplateEnum;
  /**
   * Body of the email template.
   *
   */
  body: string | null;
  /**
   * Senders `from` email address.
   *
   */
  from: string | null;
  /**
   * URL to redirect the user to after a successful action.
   *
   */
  resultUrl?: string | null;
  /**
   * Subject line of the email.
   *
   */
  subject: string | null;
  /**
   * Syntax of the template body.
   *
   */
  syntax: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   *
   */
  urlLifetimeInSeconds?: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   *
   */
  includeEmailInRedirect?: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   *
   */
  enabled: boolean | null;
}

export const PostEmailTemplatesRequestTemplateEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type PostEmailTemplatesRequestTemplateEnum =
  (typeof PostEmailTemplatesRequestTemplateEnum)[keyof typeof PostEmailTemplatesRequestTemplateEnum];

/**
 *
 */
export interface PostEmailVerification201Response {
  [key: string]: any | any;
  /**
   * URL representing the ticket.
   *
   */
  ticket: string;
}
/**
 *
 */
export interface PostEmailVerificationRequest {
  /**
   * URL the user will be redirected to in the classic Universal Login experience once the ticket is used.
   *
   */
  result_url?: string;
  /**
   * user_id of for whom the ticket should be created.
   *
   */
  user_id: string;
  /**
   * ID of the client. If provided for tenants using New Universal Login experience, the user will be prompted to redirect to the default login route of the corresponding application once the ticket is used. See <a target='' href='https://manage.local.dev.auth0.com/docs/universal-login/configure-default-login-routes#completing-the-password-reset-flow'>Configuring Default Login Routes</a> for more details.
   *
   */
  client_id?: string;
  /**
   * (Optional) Organization ID – the ID of the Organization. If provided, organization parameters will be made available to the email template and organization branding will be applied to the prompt. In addition, the redirect link in the prompt will include organization_id and organization_name query string parameters.
   *
   */
  organization_id?: string;
  /**
   * Number of seconds for which the ticket is valid before expiration. If unspecified or set to 0, this value defaults to 432000 seconds (5 days).
   *
   */
  ttl_sec?: number;
  /**
   * Whether to include the email address as part of the returnUrl in the reset_email (true), or not (false).
   *
   */
  includeEmailInRedirect?: boolean;
  /**
   */
  identity?: PostVerificationEmailRequestIdentity;
}
/**
 *
 */
export interface PostEnabledConnectionsRequest {
  /**
   * Single connection ID to add to the organization.
   *
   */
  connection_id: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   *
   */
  assign_membership_on_login?: boolean;
  /**
   * Enables showing a button for the connection in the organization login page. If false, it will be usable only by HRD.
   *
   */
  show_as_button?: boolean;
}
/**
 *
 */
export interface PostIdentitiesRequest {
  /**
   * Identity provider of the secondary user account being linked.
   *
   */
  provider?: PostIdentitiesRequestProviderEnum;
  /**
   * connection_id of the secondary user account being linked when more than one `auth0` database provider exists.
   *
   */
  connection_id?: string;
  /**
   */
  user_id?: PostIdentitiesRequestUserId;
  /**
   * JWT for the secondary account being linked. If sending this parameter, `provider`, `user_id`, and `connection_id` must not be sent.
   *
   */
  link_with?: string;
}

export const PostIdentitiesRequestProviderEnum = {
  ad: 'ad',
  adfs: 'adfs',
  amazon: 'amazon',
  apple: 'apple',
  dropbox: 'dropbox',
  bitbucket: 'bitbucket',
  aol: 'aol',
  auth0_oidc: 'auth0-oidc',
  auth0: 'auth0',
  baidu: 'baidu',
  bitly: 'bitly',
  box: 'box',
  custom: 'custom',
  daccount: 'daccount',
  dwolla: 'dwolla',
  email: 'email',
  evernote_sandbox: 'evernote-sandbox',
  evernote: 'evernote',
  exact: 'exact',
  facebook: 'facebook',
  fitbit: 'fitbit',
  flickr: 'flickr',
  github: 'github',
  google_apps: 'google-apps',
  google_oauth2: 'google-oauth2',
  instagram: 'instagram',
  ip: 'ip',
  line: 'line',
  linkedin: 'linkedin',
  miicard: 'miicard',
  oauth1: 'oauth1',
  oauth2: 'oauth2',
  office365: 'office365',
  oidc: 'oidc',
  okta: 'okta',
  paypal: 'paypal',
  paypal_sandbox: 'paypal-sandbox',
  pingfederate: 'pingfederate',
  planningcenter: 'planningcenter',
  renren: 'renren',
  salesforce_community: 'salesforce-community',
  salesforce_sandbox: 'salesforce-sandbox',
  salesforce: 'salesforce',
  samlp: 'samlp',
  sharepoint: 'sharepoint',
  shopify: 'shopify',
  sms: 'sms',
  soundcloud: 'soundcloud',
  thecity_sandbox: 'thecity-sandbox',
  thecity: 'thecity',
  thirtysevensignals: 'thirtysevensignals',
  twitter: 'twitter',
  untappd: 'untappd',
  vkontakte: 'vkontakte',
  waad: 'waad',
  weibo: 'weibo',
  windowslive: 'windowslive',
  wordpress: 'wordpress',
  yahoo: 'yahoo',
  yammer: 'yammer',
  yandex: 'yandex',
} as const;
export type PostIdentitiesRequestProviderEnum =
  (typeof PostIdentitiesRequestProviderEnum)[keyof typeof PostIdentitiesRequestProviderEnum];

/**
 * user_id of the secondary user account being linked.
 */
export type PostIdentitiesRequestUserId = number | string;
/**
 *
 */
export interface PostInvitationsRequest {
  /**
   */
  inviter: GetInvitations200ResponseOneOfInnerInviter;
  /**
   */
  invitee: GetInvitations200ResponseOneOfInnerInvitee;
  /**
   * Auth0 client ID. Used to resolve the application's login initiation endpoint.
   *
   */
  client_id: string;
  /**
   * The id of the connection to force invitee to authenticate with.
   *
   */
  connection_id?: string;
  /**
   */
  app_metadata?: PostInvitationsRequestAppMetadata;
  /**
   * Data related to the user that does not affect the application's core functionality.
   *
   */
  user_metadata?: { [key: string]: any };
  /**
   * Number of seconds for which the invitation is valid before expiration. If unspecified or set to 0, this value defaults to 604800 seconds (7 days). Max value: 2592000 seconds (30 days).
   *
   */
  ttl_sec?: number;
  /**
   * List of roles IDs to associated with the user.
   *
   */
  roles?: Array<string>;
  /**
   * Whether the user will receive an invitation email (true) or no email (false), true by default
   *
   */
  send_invitation_email?: boolean;
}
/**
 * Data related to the user that does affect the application's core functionality.
 */
export interface PostInvitationsRequestAppMetadata {
  [key: string]: any | any;
  /**
   */
  clientID?: any | null;
  /**
   */
  globalClientID?: any | null;
  /**
   */
  global_client_id?: any | null;
  /**
   */
  email_verified?: any | null;
  /**
   */
  user_id?: any | null;
  /**
   */
  identities?: any | null;
  /**
   */
  lastIP?: any | null;
  /**
   */
  lastLogin?: any | null;
  /**
   */
  metadata?: any | null;
  /**
   */
  created_at?: any | null;
  /**
   */
  loginsCount?: any | null;
  /**
   */
  _id?: any | null;
  /**
   */
  email?: any | null;
  /**
   */
  blocked?: any | null;
  /**
   */
  __tenant?: any | null;
  /**
   */
  updated_at?: any | null;
}
/**
 *
 */
export type PostLogStreamsRequest =
  | PostLogStreamsRequestOneOf
  | PostLogStreamsRequestOneOf1
  | PostLogStreamsRequestOneOf2
  | PostLogStreamsRequestOneOf3
  | PostLogStreamsRequestOneOf4
  | PostLogStreamsRequestOneOf5
  | PostLogStreamsRequestOneOf6
  | PostLogStreamsRequestOneOf7;
/**
 *
 */
export interface PostLogStreamsRequestOneOf {
  /**
   * log stream name
   *
   */
  name?: string;
  /**
   */
  type: PostLogStreamsRequestOneOfTypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters?: Array<PostLogStreamsRequestOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOfSink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   *
   */
  startFrom?: string;
}

export const PostLogStreamsRequestOneOfTypeEnum = {
  http: 'http',
} as const;
export type PostLogStreamsRequestOneOfTypeEnum =
  (typeof PostLogStreamsRequestOneOfTypeEnum)[keyof typeof PostLogStreamsRequestOneOfTypeEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOf1 {
  /**
   * log stream name
   *
   */
  name?: string;
  /**
   */
  type: PostLogStreamsRequestOneOf1TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters?: Array<PostLogStreamsRequestOneOfFiltersInner>;
  /**
   */
  sink: PostLogStreamsRequestOneOf1Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   *
   */
  startFrom?: string;
}

export const PostLogStreamsRequestOneOf1TypeEnum = {
  eventbridge: 'eventbridge',
} as const;
export type PostLogStreamsRequestOneOf1TypeEnum =
  (typeof PostLogStreamsRequestOneOf1TypeEnum)[keyof typeof PostLogStreamsRequestOneOf1TypeEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOf1Sink {
  /**
   * AWS account ID
   *
   */
  awsAccountId: string;
  /**
   * The region in which the EventBridge event source will be created
   *
   */
  awsRegion: PostLogStreamsRequestOneOf1SinkAwsRegionEnum;
}

export const PostLogStreamsRequestOneOf1SinkAwsRegionEnum = {
  ap_east_1: 'ap-east-1',
  ap_northeast_1: 'ap-northeast-1',
  ap_northeast_2: 'ap-northeast-2',
  ap_northeast_3: 'ap-northeast-3',
  ap_south_1: 'ap-south-1',
  ap_southeast_1: 'ap-southeast-1',
  ap_southeast_2: 'ap-southeast-2',
  ca_central_1: 'ca-central-1',
  cn_north_1: 'cn-north-1',
  cn_northwest_1: 'cn-northwest-1',
  eu_central_1: 'eu-central-1',
  eu_north_1: 'eu-north-1',
  eu_west_1: 'eu-west-1',
  eu_west_2: 'eu-west-2',
  eu_west_3: 'eu-west-3',
  me_south_1: 'me-south-1',
  sa_east_1: 'sa-east-1',
  us_gov_east_1: 'us-gov-east-1',
  us_gov_west_1: 'us-gov-west-1',
  us_east_1: 'us-east-1',
  us_east_2: 'us-east-2',
  us_west_1: 'us-west-1',
  us_west_2: 'us-west-2',
} as const;
export type PostLogStreamsRequestOneOf1SinkAwsRegionEnum =
  (typeof PostLogStreamsRequestOneOf1SinkAwsRegionEnum)[keyof typeof PostLogStreamsRequestOneOf1SinkAwsRegionEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOf2 {
  /**
   * log stream name
   *
   */
  name?: string;
  /**
   */
  type: PostLogStreamsRequestOneOf2TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters?: Array<PostLogStreamsRequestOneOfFiltersInner>;
  /**
   */
  sink: PostLogStreamsRequestOneOf2Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   *
   */
  startFrom?: string;
}

export const PostLogStreamsRequestOneOf2TypeEnum = {
  eventgrid: 'eventgrid',
} as const;
export type PostLogStreamsRequestOneOf2TypeEnum =
  (typeof PostLogStreamsRequestOneOf2TypeEnum)[keyof typeof PostLogStreamsRequestOneOf2TypeEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOf2Sink {
  /**
   * Subscription ID
   *
   */
  azureSubscriptionId: string;
  /**
   * Azure Region Name
   *
   */
  azureRegion: PostLogStreamsRequestOneOf2SinkAzureRegionEnum;
  /**
   * Resource Group
   *
   */
  azureResourceGroup: string;
}

export const PostLogStreamsRequestOneOf2SinkAzureRegionEnum = {
  australiacentral: 'australiacentral',
  australiaeast: 'australiaeast',
  australiasoutheast: 'australiasoutheast',
  brazilsouth: 'brazilsouth',
  canadacentral: 'canadacentral',
  canadaeast: 'canadaeast',
  centralindia: 'centralindia',
  centralus: 'centralus',
  eastasia: 'eastasia',
  eastus: 'eastus',
  eastus2: 'eastus2',
  francecentral: 'francecentral',
  germanywestcentral: 'germanywestcentral',
  japaneast: 'japaneast',
  japanwest: 'japanwest',
  koreacentral: 'koreacentral',
  koreasouth: 'koreasouth',
  northcentralus: 'northcentralus',
  northeurope: 'northeurope',
  norwayeast: 'norwayeast',
  southafricanorth: 'southafricanorth',
  southcentralus: 'southcentralus',
  southeastasia: 'southeastasia',
  southindia: 'southindia',
  switzerlandnorth: 'switzerlandnorth',
  uaenorth: 'uaenorth',
  uksouth: 'uksouth',
  ukwest: 'ukwest',
  westcentralus: 'westcentralus',
  westeurope: 'westeurope',
  westindia: 'westindia',
  westus: 'westus',
  westus2: 'westus2',
} as const;
export type PostLogStreamsRequestOneOf2SinkAzureRegionEnum =
  (typeof PostLogStreamsRequestOneOf2SinkAzureRegionEnum)[keyof typeof PostLogStreamsRequestOneOf2SinkAzureRegionEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOf3 {
  /**
   * log stream name
   *
   */
  name?: string;
  /**
   */
  type: PostLogStreamsRequestOneOf3TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters?: Array<PostLogStreamsRequestOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf3Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   *
   */
  startFrom?: string;
}

export const PostLogStreamsRequestOneOf3TypeEnum = {
  datadog: 'datadog',
} as const;
export type PostLogStreamsRequestOneOf3TypeEnum =
  (typeof PostLogStreamsRequestOneOf3TypeEnum)[keyof typeof PostLogStreamsRequestOneOf3TypeEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOf4 {
  /**
   * log stream name
   *
   */
  name?: string;
  /**
   */
  type: PostLogStreamsRequestOneOf4TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters?: Array<PostLogStreamsRequestOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf4Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   *
   */
  startFrom?: string;
}

export const PostLogStreamsRequestOneOf4TypeEnum = {
  splunk: 'splunk',
} as const;
export type PostLogStreamsRequestOneOf4TypeEnum =
  (typeof PostLogStreamsRequestOneOf4TypeEnum)[keyof typeof PostLogStreamsRequestOneOf4TypeEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOf5 {
  /**
   * log stream name
   *
   */
  name?: string;
  /**
   */
  type: PostLogStreamsRequestOneOf5TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters?: Array<PostLogStreamsRequestOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf5Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   *
   */
  startFrom?: string;
}

export const PostLogStreamsRequestOneOf5TypeEnum = {
  sumo: 'sumo',
} as const;
export type PostLogStreamsRequestOneOf5TypeEnum =
  (typeof PostLogStreamsRequestOneOf5TypeEnum)[keyof typeof PostLogStreamsRequestOneOf5TypeEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOf6 {
  /**
   * log stream name
   *
   */
  name?: string;
  /**
   */
  type: PostLogStreamsRequestOneOf6TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters?: Array<PostLogStreamsRequestOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf6Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   *
   */
  startFrom?: string;
}

export const PostLogStreamsRequestOneOf6TypeEnum = {
  segment: 'segment',
} as const;
export type PostLogStreamsRequestOneOf6TypeEnum =
  (typeof PostLogStreamsRequestOneOf6TypeEnum)[keyof typeof PostLogStreamsRequestOneOf6TypeEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOf7 {
  /**
   * log stream name
   *
   */
  name?: string;
  /**
   */
  type: PostLogStreamsRequestOneOf7TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   *
   */
  filters?: Array<PostLogStreamsRequestOneOfFiltersInner>;
  /**
   */
  sink: GetLogStreams200ResponseInnerOneOf7Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   *
   */
  startFrom?: string;
}

export const PostLogStreamsRequestOneOf7TypeEnum = {
  mixpanel: 'mixpanel',
} as const;
export type PostLogStreamsRequestOneOf7TypeEnum =
  (typeof PostLogStreamsRequestOneOf7TypeEnum)[keyof typeof PostLogStreamsRequestOneOf7TypeEnum];

/**
 *
 */
export interface PostLogStreamsRequestOneOfFiltersInner {
  [key: string]: any | any;
  /**
   * Filter type. Currently `category` is the only valid type.
   *
   */
  type?: PostLogStreamsRequestOneOfFiltersInnerTypeEnum;
  /**
   * Category group name
   *
   */
  name?: PostLogStreamsRequestOneOfFiltersInnerNameEnum;
}

export const PostLogStreamsRequestOneOfFiltersInnerTypeEnum = {
  category: 'category',
} as const;
export type PostLogStreamsRequestOneOfFiltersInnerTypeEnum =
  (typeof PostLogStreamsRequestOneOfFiltersInnerTypeEnum)[keyof typeof PostLogStreamsRequestOneOfFiltersInnerTypeEnum];

export const PostLogStreamsRequestOneOfFiltersInnerNameEnum = {
  auth_ancillary_fail: 'auth.ancillary.fail',
  auth_ancillary_success: 'auth.ancillary.success',
  auth_login_fail: 'auth.login.fail',
  auth_login_notification: 'auth.login.notification',
  auth_login_success: 'auth.login.success',
  auth_logout_fail: 'auth.logout.fail',
  auth_logout_success: 'auth.logout.success',
  auth_signup_fail: 'auth.signup.fail',
  auth_signup_success: 'auth.signup.success',
  auth_silent_auth_fail: 'auth.silent_auth.fail',
  auth_silent_auth_success: 'auth.silent_auth.success',
  auth_token_exchange_fail: 'auth.token_exchange.fail',
  auth_token_exchange_success: 'auth.token_exchange.success',
  management_fail: 'management.fail',
  management_success: 'management.success',
  system_notification: 'system.notification',
  user_fail: 'user.fail',
  user_notification: 'user.notification',
  user_success: 'user.success',
  other: 'other',
} as const;
export type PostLogStreamsRequestOneOfFiltersInnerNameEnum =
  (typeof PostLogStreamsRequestOneOfFiltersInnerNameEnum)[keyof typeof PostLogStreamsRequestOneOfFiltersInnerNameEnum];

/**
 *
 */
export interface PostMembersRequest {
  [key: string]: any | any;
  /**
   * List of user IDs to add to the organization as members.
   *
   */
  members: Array<string>;
}
/**
 *
 */
export interface PostOrganizationMemberRolesRequest {
  /**
   * List of roles IDs to associated with the user.
   *
   */
  roles: Array<string>;
}
/**
 *
 */
export interface PostOrganizations201Response {
  [key: string]: any | any;
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * The name of this organization.
   *
   */
  name: string;
  /**
   * Friendly name of this organization.
   *
   */
  display_name: string;
  /**
   */
  branding: GetOrganizations200ResponseOneOfInnerBranding;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   *
   */
  metadata: { [key: string]: any };
  /**
   */
  enabled_connections: Array<PostOrganizations201ResponseEnabledConnectionsInner>;
}
/**
 *
 */
export interface PostOrganizations201ResponseEnabledConnectionsInner {
  [key: string]: any | any;
  /**
   * ID of the connection.
   *
   */
  connection_id: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   *
   */
  assign_membership_on_login: boolean;
  /**
   * Enables showing a button for the connection in the organization login page. If false, it will be usable only by HRD.
   *
   */
  show_as_button: boolean;
}
/**
 *
 */
export interface PostOrganizationsRequest {
  /**
   * The name of this organization.
   *
   */
  name: string;
  /**
   * Friendly name of this organization.
   *
   */
  display_name?: string;
  /**
   */
  branding?: PostOrganizationsRequestBranding;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   *
   */
  metadata?: { [key: string]: any };
  /**
   * Connections that will be enabled for this organization. See POST enabled_connections endpoint for the object format. (Max of 10 connections allowed)
   *
   */
  enabled_connections?: Array<PostOrganizationsRequestEnabledConnectionsInner>;
}
/**
 * Theme defines how to style the login pages
 */
export interface PostOrganizationsRequestBranding {
  /**
   * URL of logo to display on login page
   *
   */
  logo_url?: string;
  /**
   */
  colors?: GetOrganizations200ResponseOneOfInnerBrandingColors;
}
/**
 * Connection to be added to the organization.
 */
export interface PostOrganizationsRequestEnabledConnectionsInner {
  /**
   * ID of the connection.
   *
   */
  connection_id: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   *
   */
  assign_membership_on_login?: boolean;
  /**
   * Enables showing a button for the connection in the organization login page. If false, it will be usable only by HRD.
   *
   */
  show_as_button?: boolean;
}
/**
 *
 */
export interface PostPasswordChange201Response {
  [key: string]: any | any;
  /**
   * URL representing the ticket.
   *
   */
  ticket: string;
}
/**
 *
 */
export interface PostPasswordChangeRequest {
  /**
   * URL the user will be redirected to in the classic Universal Login experience once the ticket is used.
   *
   */
  result_url?: string;
  /**
   * user_id of for whom the ticket should be created.
   *
   */
  user_id?: string;
  /**
   * ID of the client. If provided for tenants using New Universal Login experience, the user will be prompted to redirect to the default login route of the corresponding application once the ticket is used. See <a target='' href='https://manage.local.dev.auth0.com/docs/universal-login/configure-default-login-routes#completing-the-password-reset-flow'>Configuring Default Login Routes</a> for more details.
   *
   */
  client_id?: string;
  /**
   * (Optional) Organization ID – the ID of the Organization. If provided, organization parameters will be made available to the email template and organization branding will be applied to the prompt. In addition, the redirect link in the prompt will include organization_id and organization_name query string parameters.
   *
   */
  organization_id?: string;
  /**
   * ID of the connection. If provided, allows the user to be specified using email instead of user_id. If you set this value, you must also send the email parameter. You cannot send user_id when specifying a connection_id.
   *
   */
  connection_id?: string;
  /**
   * Email address of the user for whom the tickets should be created. Requires the connection_id parameter. Cannot be specified when using user_id.
   *
   */
  email?: string;
  /**
   * Number of seconds for which the ticket is valid before expiration. If unspecified or set to 0, this value defaults to 432000 seconds (5 days).
   *
   */
  ttl_sec?: number;
  /**
   * Whether to set the email_verified attribute to true (true) or whether it should not be updated (false).
   *
   */
  mark_email_as_verified?: boolean;
  /**
   * Whether to include the email address as part of the returnUrl in the reset_email (true), or not (false).
   *
   */
  includeEmailInRedirect?: boolean;
}
/**
 *
 */
export interface PostPermissionsRequest {
  /**
   * List of permissions to add to this user.
   *
   */
  permissions: Array<PostRolePermissionAssignmentRequestPermissionsInner>;
}
/**
 *
 */
export interface PostRecoveryCodeRegeneration200Response {
  [key: string]: any | any;
  /**
   * New account recovery code.
   *
   */
  recovery_code: string;
}
/**
 *
 */
export interface PostRolePermissionAssignmentRequest {
  /**
   * array of resource_server_identifier, permission_name pairs.
   *
   */
  permissions: Array<PostRolePermissionAssignmentRequestPermissionsInner>;
}
/**
 *
 */
export interface PostRolePermissionAssignmentRequestPermissionsInner {
  /**
   * Resource server (API) identifier that this permission is for.
   *
   */
  resource_server_identifier: string;
  /**
   * Name of this permission.
   *
   */
  permission_name: string;
}
/**
 *
 */
export interface PostRoleUsersRequest {
  /**
   * user_id's of the users to assign the role to.
   *
   */
  users: Array<string>;
}
/**
 *
 */
export interface PostSigningKeys201Response {
  [key: string]: any | any;
  /**
   * Next key certificate
   *
   */
  cert: string;
  /**
   * Next key id
   *
   */
  kid: string;
}
/**
 *
 */
export interface PostTestAction200Response {
  /**
   * The resulting payload after an action was executed.
   *
   */
  payload: { [key: string]: any };
}
/**
 *
 */
export interface PostTestActionRequest {
  /**
   * The payload for the action.
   *
   */
  payload: { [key: string]: any };
}
/**
 *
 */
export interface PostTicket200Response {
  [key: string]: any | any;
  /**
   * The ticket_id used to identify the enrollment
   *
   */
  ticket_id: string;
  /**
   * The url you can use to start enrollment
   *
   */
  ticket_url: string;
}
/**
 *
 */
export interface PostUserRolesRequest {
  /**
   * List of roles IDs to associated with the user.
   *
   */
  roles: Array<string>;
}
/**
 *
 */
export interface PostUsersExportsRequest {
  /**
   * connection_id of the connection from which users will be exported.
   *
   */
  connection_id?: string;
  /**
   * Format of the file. Must be `json` or `csv`.
   *
   */
  format?: PostUsersExportsRequestFormatEnum;
  /**
   * Limit the number of records.
   *
   */
  limit?: number;
  /**
   * List of fields to be included in the CSV. Defaults to a predefined set of fields.
   *
   */
  fields?: Array<PostUsersExportsRequestFieldsInner>;
}

export const PostUsersExportsRequestFormatEnum = {
  json: 'json',
  csv: 'csv',
} as const;
export type PostUsersExportsRequestFormatEnum =
  (typeof PostUsersExportsRequestFormatEnum)[keyof typeof PostUsersExportsRequestFormatEnum];

/**
 *
 */
export interface PostUsersExportsRequestFieldsInner {
  /**
   * Name of the field in the profile.
   *
   */
  name: string;
  /**
   * Title of the column in the exported CSV.
   *
   */
  export_as?: string;
}
/**
 *
 */
export interface PostVerificationEmailRequest {
  /**
   * user_id of the user to send the verification email to.
   *
   */
  user_id: string;
  /**
   * client_id of the client (application). If no value provided, the global Client ID will be used.
   *
   */
  client_id?: string;
  /**
   */
  identity?: PostVerificationEmailRequestIdentity;
  /**
   * (Optional) Organization ID – the ID of the Organization. If provided, organization parameters will be made available to the email template and organization branding will be applied to the prompt. In addition, the redirect link in the prompt will include organization_id and organization_name query string parameters.
   *
   */
  organization_id?: string;
}
/**
 * This must be provided to verify primary social, enterprise and passwordless email identities. Also, is needed to verify secondary identities.
 */
export interface PostVerificationEmailRequestIdentity {
  /**
   * user_id of the identity to be verified.
   *
   */
  user_id: string;
  /**
   * Identity provider name of the identity (e.g. `google-oauth2`).
   *
   */
  provider: PostVerificationEmailRequestIdentityProviderEnum;
}

export const PostVerificationEmailRequestIdentityProviderEnum = {
  ad: 'ad',
  adfs: 'adfs',
  amazon: 'amazon',
  apple: 'apple',
  dropbox: 'dropbox',
  bitbucket: 'bitbucket',
  aol: 'aol',
  auth0_oidc: 'auth0-oidc',
  auth0: 'auth0',
  baidu: 'baidu',
  bitly: 'bitly',
  box: 'box',
  custom: 'custom',
  daccount: 'daccount',
  dwolla: 'dwolla',
  email: 'email',
  evernote_sandbox: 'evernote-sandbox',
  evernote: 'evernote',
  exact: 'exact',
  facebook: 'facebook',
  fitbit: 'fitbit',
  flickr: 'flickr',
  github: 'github',
  google_apps: 'google-apps',
  google_oauth2: 'google-oauth2',
  instagram: 'instagram',
  ip: 'ip',
  line: 'line',
  linkedin: 'linkedin',
  miicard: 'miicard',
  oauth1: 'oauth1',
  oauth2: 'oauth2',
  office365: 'office365',
  oidc: 'oidc',
  okta: 'okta',
  paypal: 'paypal',
  paypal_sandbox: 'paypal-sandbox',
  pingfederate: 'pingfederate',
  planningcenter: 'planningcenter',
  renren: 'renren',
  salesforce_community: 'salesforce-community',
  salesforce_sandbox: 'salesforce-sandbox',
  salesforce: 'salesforce',
  samlp: 'samlp',
  sharepoint: 'sharepoint',
  shopify: 'shopify',
  sms: 'sms',
  soundcloud: 'soundcloud',
  thecity_sandbox: 'thecity-sandbox',
  thecity: 'thecity',
  thirtysevensignals: 'thirtysevensignals',
  twitter: 'twitter',
  untappd: 'untappd',
  vkontakte: 'vkontakte',
  waad: 'waad',
  weibo: 'weibo',
  windowslive: 'windowslive',
  wordpress: 'wordpress',
  yahoo: 'yahoo',
  yammer: 'yammer',
  yandex: 'yandex',
} as const;
export type PostVerificationEmailRequestIdentityProviderEnum =
  (typeof PostVerificationEmailRequestIdentityProviderEnum)[keyof typeof PostVerificationEmailRequestIdentityProviderEnum];

/**
 *
 */
export interface PostVerify200Response {
  /**
   * ID of the custom domain.
   *
   */
  custom_domain_id: string;
  /**
   * Domain name.
   *
   */
  domain: string;
  /**
   * Whether this is a primary domain (true) or not (false).
   *
   */
  primary: boolean;
  /**
   * Custom domain configuration status. Can be `disabled`, `pending`, `pending_verification`, or `ready`.
   *
   */
  status: PostVerify200ResponseStatusEnum;
  /**
   * Custom domain provisioning type. Can be `auth0_managed_certs` or `self_managed_certs`.
   *
   */
  type: PostVerify200ResponseTypeEnum;
  /**
   * CNAME API key header.
   *
   */
  cname_api_key?: string;
  /**
   * Intermediate address.
   *
   */
  origin_domain_name?: string;
  /**
   */
  verification?: PostCustomDomains201ResponseVerification;
  /**
   * The HTTP header to fetch the client's IP address
   *
   */
  custom_client_ip_header?: string | null;
  /**
   * The TLS version policy
   *
   */
  tls_policy?: string;
}

export const PostVerify200ResponseStatusEnum = {
  disabled: 'disabled',
  pending: 'pending',
  pending_verification: 'pending_verification',
  ready: 'ready',
} as const;
export type PostVerify200ResponseStatusEnum =
  (typeof PostVerify200ResponseStatusEnum)[keyof typeof PostVerify200ResponseStatusEnum];

export const PostVerify200ResponseTypeEnum = {
  auth0_managed_certs: 'auth0_managed_certs',
  self_managed_certs: 'self_managed_certs',
} as const;
export type PostVerify200ResponseTypeEnum =
  (typeof PostVerify200ResponseTypeEnum)[keyof typeof PostVerify200ResponseTypeEnum];

/**
 *
 */
export interface PromptsSettings {
  [key: string]: any | any;
  /**
   * Which login experience to use. Can be `new` or `classic`.
   *
   */
  universal_login_experience: PromptsSettingsUniversalLoginExperienceEnum;
  /**
   * Whether identifier first is enabled or not
   *
   */
  identifier_first: boolean;
  /**
   * Use WebAuthn with Device Biometrics as the first authentication factor
   *
   */
  webauthn_platform_first_factor: boolean;
}

export const PromptsSettingsUniversalLoginExperienceEnum = {
  new: 'new',
  classic: 'classic',
} as const;
export type PromptsSettingsUniversalLoginExperienceEnum =
  (typeof PromptsSettingsUniversalLoginExperienceEnum)[keyof typeof PromptsSettingsUniversalLoginExperienceEnum];

/**
 * Prompts settings
 */
export interface PromptsSettingsUpdate {
  /**
   * Which login experience to use. Can be `new` or `classic`.
   *
   */
  universal_login_experience?: PromptsSettingsUpdateUniversalLoginExperienceEnum;
  /**
   * Whether identifier first is enabled or not
   *
   */
  identifier_first?: boolean | null;
  /**
   * Use WebAuthn with Device Biometrics as the first authentication factor
   *
   */
  webauthn_platform_first_factor?: boolean | null;
}

export const PromptsSettingsUpdateUniversalLoginExperienceEnum = {
  new: 'new',
  classic: 'classic',
} as const;
export type PromptsSettingsUpdateUniversalLoginExperienceEnum =
  (typeof PromptsSettingsUpdateUniversalLoginExperienceEnum)[keyof typeof PromptsSettingsUpdateUniversalLoginExperienceEnum];

/**
 *
 */
export interface PutApns200Response {
  /**
   */
  sandbox: boolean;
  /**
   */
  bundle_id: string | null;
}
/**
 *
 */
export interface PutApnsRequest {
  /**
   */
  sandbox?: boolean;
  /**
   */
  bundle_id?: string | null;
  /**
   */
  p12?: string | null;
}
/**
 * The successfully created authentication method.
 */
export interface PutAuthenticationMethods200ResponseInner {
  [key: string]: any | any;
  /**
   * The ID of the newly created authentication method (automatically generated by the application)
   *
   */
  id?: string;
  /**
   */
  type: PutAuthenticationMethods200ResponseInnerTypeEnum;
  /**
   * A human-readable label to identify the authentication method.
   *
   */
  name?: string;
  /**
   * Base32 encoded secret for TOTP generation
   *
   */
  totp_secret?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   *
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   *
   */
  email?: string;
  /**
   */
  authentication_methods?: Array<PutAuthenticationMethods200ResponseInnerAuthenticationMethodsInner>;
  /**
   * Preferred phone authentication method
   *
   */
  preferred_authentication_method?: PutAuthenticationMethods200ResponseInnerPreferredAuthenticationMethodEnum;
  /**
   * Applies to webauthn authenticators only. The id of the credential.
   *
   */
  key_id?: string;
  /**
   * Applies to webauthn authenticators only. The public key.
   *
   */
  public_key?: string;
  /**
   * Applies to webauthn authenticators only. The relying party identifier.
   *
   */
  relying_party_identifier?: string;
  /**
   * Authentication method creation date
   *
   */
  created_at?: string;
}

export const PutAuthenticationMethods200ResponseInnerTypeEnum = {
  phone: 'phone',
  email: 'email',
  totp: 'totp',
  webauthn_roaming: 'webauthn-roaming',
} as const;
export type PutAuthenticationMethods200ResponseInnerTypeEnum =
  (typeof PutAuthenticationMethods200ResponseInnerTypeEnum)[keyof typeof PutAuthenticationMethods200ResponseInnerTypeEnum];

export const PutAuthenticationMethods200ResponseInnerPreferredAuthenticationMethodEnum = {
  voice: 'voice',
  sms: 'sms',
} as const;
export type PutAuthenticationMethods200ResponseInnerPreferredAuthenticationMethodEnum =
  (typeof PutAuthenticationMethods200ResponseInnerPreferredAuthenticationMethodEnum)[keyof typeof PutAuthenticationMethods200ResponseInnerPreferredAuthenticationMethodEnum];

/**
 *
 */
export interface PutAuthenticationMethods200ResponseInnerAuthenticationMethodsInner {
  [key: string]: any | any;
  /**
   */
  id?: string;
  /**
   */
  type?: PutAuthenticationMethods200ResponseInnerAuthenticationMethodsInnerTypeEnum;
}

export const PutAuthenticationMethods200ResponseInnerAuthenticationMethodsInnerTypeEnum = {
  totp: 'totp',
  push: 'push',
  sms: 'sms',
  voice: 'voice',
} as const;
export type PutAuthenticationMethods200ResponseInnerAuthenticationMethodsInnerTypeEnum =
  (typeof PutAuthenticationMethods200ResponseInnerAuthenticationMethodsInnerTypeEnum)[keyof typeof PutAuthenticationMethods200ResponseInnerAuthenticationMethodsInnerTypeEnum];

/**
 *
 */
export interface PutAuthenticationMethodsRequestInner {
  /**
   */
  type: PutAuthenticationMethodsRequestInnerTypeEnum;
  /**
   * The preferred authentication method for phone authentication method.
   *
   */
  preferred_authentication_method?: PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum;
  /**
   * AA human-readable label to identify the authentication method.
   *
   */
  name?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   *
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   *
   */
  email?: string;
  /**
   * Applies to totp authentication methods only. The base32 encoded secret for TOTP generation.
   *
   */
  totp_secret?: string;
}

export const PutAuthenticationMethodsRequestInnerTypeEnum = {
  phone: 'phone',
  email: 'email',
  totp: 'totp',
} as const;
export type PutAuthenticationMethodsRequestInnerTypeEnum =
  (typeof PutAuthenticationMethodsRequestInnerTypeEnum)[keyof typeof PutAuthenticationMethodsRequestInnerTypeEnum];

export const PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum = {
  voice: 'voice',
  sms: 'sms',
} as const;
export type PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum =
  (typeof PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum)[keyof typeof PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum];

/**
 *
 */
export interface PutFactorsByName200Response {
  /**
   * Whether this factor is enabled (true) or disabled (false).
   *
   */
  enabled: boolean;
}
/**
 *
 */
export interface PutFactorsByNameRequest {
  /**
   * Whether this factor is enabled (true) or disabled (false).
   *
   */
  enabled: boolean;
}
/**
 *
 */
export interface PutFcmRequest {
  /**
   */
  server_key?: string | null;
}
/**
 *
 */
export interface PutRulesConfigsByKey200Response {
  [key: string]: any | any;
  /**
   * Key for a rules config variable.
   *
   */
  key: string;
  /**
   * Value for a rules config variable.
   *
   */
  value: string;
}
/**
 *
 */
export interface PutRulesConfigsByKeyRequest {
  /**
   * Value for a rules config variable.
   *
   */
  value: string;
}
/**
 *
 */
export interface PutSigningKeys200Response {
  [key: string]: any | any;
  /**
   * Revoked key certificate
   *
   */
  cert: string;
  /**
   * Revoked key id
   *
   */
  kid: string;
}
/**
 *
 */
export interface PutSns200Response {
  /**
   */
  aws_access_key_id: string | null;
  /**
   */
  aws_secret_access_key: string | null;
  /**
   */
  aws_region: string | null;
  /**
   */
  sns_apns_platform_application_arn: string | null;
  /**
   */
  sns_gcm_platform_application_arn: string | null;
}
/**
 *
 */
export interface PutSnsRequest {
  /**
   */
  aws_access_key_id?: string | null;
  /**
   */
  aws_secret_access_key?: string | null;
  /**
   */
  aws_region?: string | null;
  /**
   */
  sns_apns_platform_application_arn?: string | null;
  /**
   */
  sns_gcm_platform_application_arn?: string | null;
}
/**
 *
 */
export interface PutTwilioRequest {
  /**
   * From number
   *
   */
  from?: string | null;
  /**
   * Copilot SID
   *
   */
  messaging_service_sid?: string | null;
  /**
   * Twilio Authentication token
   *
   */
  auth_token?: string | null;
  /**
   * Twilio SID
   *
   */
  sid?: string | null;
}
/**
 *
 */
export type PutUniversalLoginRequest = PutUniversalLoginRequestOneOf | string;
/**
 *
 */
export interface PutUniversalLoginRequestOneOf {
  /**
   */
  template: string;
}
/**
 *
 */
export interface ResourceServer {
  /**
   * ID of the API (resource server).
   *
   */
  id: string;
  /**
   * Friendly name for this resource server. Can not contain `<` or `>` characters.
   *
   */
  name: string;
  /**
   * Whether this is an Auth0 system API (true) or a custom API (false).
   *
   */
  is_system: boolean;
  /**
   * Unique identifier for the API used as the audience parameter on authorization calls. Can not be changed once set.
   *
   */
  identifier: string;
  /**
   * List of permissions (scopes) that this API uses.
   *
   */
  scopes: Array<Scope>;
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`. `PS256` available via addon.
   *
   */
  signing_alg: ResourceServerSigningAlgEnum;
  /**
   * Secret used to sign tokens when using symmetric algorithms (HS256).
   *
   */
  signing_secret: string;
  /**
   * Whether refresh tokens can be issued for this API (true) or not (false).
   *
   */
  allow_offline_access: boolean;
  /**
   * Whether to skip user consent for applications flagged as first party (true) or not (false).
   *
   */
  skip_consent_for_verifiable_first_party_clients: boolean;
  /**
   * Expiration value (in seconds) for access tokens issued for this API from the token endpoint.
   *
   */
  token_lifetime: number;
  /**
   * Expiration value (in seconds) for access tokens issued for this API via Implicit or Hybrid Flows. Cannot be greater than the `token_lifetime` value.
   *
   */
  token_lifetime_for_web: number;
  /**
   * Whether authorization polices are enforced (true) or unenforced (false).
   *
   */
  enforce_policies: boolean;
  /**
   * Dialect of access tokens that should be issued. Can be `access_token` or `access_token_authz` (includes permissions).
   *
   */
  token_dialect: ResourceServerTokenDialectEnum;
  /**
   */
  client: object;
}

export const ResourceServerSigningAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
  PS256: 'PS256',
} as const;
export type ResourceServerSigningAlgEnum =
  (typeof ResourceServerSigningAlgEnum)[keyof typeof ResourceServerSigningAlgEnum];

export const ResourceServerTokenDialectEnum = {
  token: 'access_token',
  token_authz: 'access_token_authz',
} as const;
export type ResourceServerTokenDialectEnum =
  (typeof ResourceServerTokenDialectEnum)[keyof typeof ResourceServerTokenDialectEnum];

/**
 *
 */
export interface ResourceServerCreate {
  /**
   * Friendly name for this resource server. Can not contain `<` or `>` characters.
   *
   */
  name?: string;
  /**
   * Unique identifier for the API used as the audience parameter on authorization calls. Can not be changed once set.
   *
   */
  identifier: string;
  /**
   * List of permissions (scopes) that this API uses.
   *
   */
  scopes?: Array<Scope>;
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`. `PS256` available via addon.
   *
   */
  signing_alg?: ResourceServerCreateSigningAlgEnum;
  /**
   * Secret used to sign tokens when using symmetric algorithms (HS256).
   *
   */
  signing_secret?: string;
  /**
   * Whether refresh tokens can be issued for this API (true) or not (false).
   *
   */
  allow_offline_access?: boolean;
  /**
   * Expiration value (in seconds) for access tokens issued for this API from the token endpoint.
   *
   */
  token_lifetime?: number;
  /**
   * Dialect of issued access token. Can be `access_token` or `access_token_authz` (includes permissions). Values can be `access_token` or `access_token_authz` (includes permissions).
   *
   */
  token_dialect?: ResourceServerCreateTokenDialectEnum;
  /**
   * Whether to skip user consent for applications flagged as first party (true) or not (false).
   *
   */
  skip_consent_for_verifiable_first_party_clients?: boolean;
  /**
   * Whether to enforce authorization policies (true) or to ignore them (false).
   *
   */
  enforce_policies?: boolean;
  /**
   */
  client?: object;
}

export const ResourceServerCreateSigningAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
  PS256: 'PS256',
} as const;
export type ResourceServerCreateSigningAlgEnum =
  (typeof ResourceServerCreateSigningAlgEnum)[keyof typeof ResourceServerCreateSigningAlgEnum];

export const ResourceServerCreateTokenDialectEnum = {
  token: 'access_token',
  token_authz: 'access_token_authz',
} as const;
export type ResourceServerCreateTokenDialectEnum =
  (typeof ResourceServerCreateTokenDialectEnum)[keyof typeof ResourceServerCreateTokenDialectEnum];

/**
 *
 */
export interface ResourceServerUpdate {
  /**
   * Friendly name for this resource server. Can not contain `<` or `>` characters.
   *
   */
  name?: string;
  /**
   * List of permissions (scopes) that this API uses.
   *
   */
  scopes?: Array<Scope>;
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`. `PS256` available via addon.
   *
   */
  signing_alg?: ResourceServerUpdateSigningAlgEnum;
  /**
   * Secret used to sign tokens when using symmetric algorithms (HS256).
   *
   */
  signing_secret?: string;
  /**
   * Whether to skip user consent for applications flagged as first party (true) or not (false).
   *
   */
  skip_consent_for_verifiable_first_party_clients?: boolean;
  /**
   * Whether refresh tokens can be issued for this API (true) or not (false).
   *
   */
  allow_offline_access?: boolean;
  /**
   * Expiration value (in seconds) for access tokens issued for this API from the token endpoint.
   *
   */
  token_lifetime?: number;
  /**
   * Dialect of issued access token. Can be `access_token` or `access_token_authz` (includes permissions).
   *
   */
  token_dialect?: ResourceServerUpdateTokenDialectEnum;
  /**
   * Whether authorization policies are enforced (true) or not enforced (false).
   *
   */
  enforce_policies?: boolean;
  /**
   */
  client?: object;
}

export const ResourceServerUpdateSigningAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
  PS256: 'PS256',
} as const;
export type ResourceServerUpdateSigningAlgEnum =
  (typeof ResourceServerUpdateSigningAlgEnum)[keyof typeof ResourceServerUpdateSigningAlgEnum];

export const ResourceServerUpdateTokenDialectEnum = {
  token: 'access_token',
  token_authz: 'access_token_authz',
} as const;
export type ResourceServerUpdateTokenDialectEnum =
  (typeof ResourceServerUpdateTokenDialectEnum)[keyof typeof ResourceServerUpdateTokenDialectEnum];

/**
 *
 */
export interface RoleCreate {
  /**
   * Name of the role.
   *
   */
  name: string;
  /**
   * Description of the role.
   *
   */
  description?: string;
}
/**
 *
 */
export interface RoleUpdate {
  /**
   * Name of this role.
   *
   */
  name?: string;
  /**
   * Description of this role.
   *
   */
  description?: string;
}
/**
 *
 */
export interface Rule {
  /**
   * Name of this rule.
   *
   */
  name: string;
  /**
   * ID of this rule.
   *
   */
  id: string;
  /**
   * Whether the rule is enabled (true), or disabled (false).
   *
   */
  enabled: boolean;
  /**
   * Code to be executed when this rule runs.
   *
   */
  script: string;
  /**
   * Order that this rule should execute in relative to other rules. Lower-valued rules execute first.
   *
   */
  order: number;
  /**
   * Execution stage of this rule. Can be `login_success`, `login_failure`, or `pre_authorize`.
   *
   */
  stage: string;
}
/**
 *
 */
export interface RuleCreate {
  /**
   * Name of this rule.
   *
   */
  name: string;
  /**
   * Code to be executed when this rule runs.
   *
   */
  script: string;
  /**
   * Order that this rule should execute in relative to other rules. Lower-valued rules execute first.
   *
   */
  order?: number;
  /**
   * Whether the rule is enabled (true), or disabled (false).
   *
   */
  enabled?: boolean;
}
/**
 *
 */
export interface RuleUpdate {
  /**
   * Code to be executed when this rule runs.
   *
   */
  script?: string;
  /**
   * Name of this rule.
   *
   */
  name?: string;
  /**
   * Order that this rule should execute in relative to other rules. Lower-valued rules execute first.
   *
   */
  order?: number;
  /**
   * Whether the rule is enabled (true), or disabled (false).
   *
   */
  enabled?: boolean;
}
/**
 *
 */
export interface Scope {
  /**
   * Value of this scope.
   *
   */
  value: string;
  /**
   * User-friendly description of this scope.
   *
   */
  description?: string;
}
/**
 *
 */
export interface SmsTwilioFactorProvider {
  /**
   * From number
   *
   */
  from: string | null;
  /**
   * Copilot SID
   *
   */
  messaging_service_sid: string | null;
  /**
   * Twilio Authentication token
   *
   */
  auth_token: string | null;
  /**
   * Twilio SID
   *
   */
  sid: string | null;
}
/**
 *
 */
export interface SnsFactorProvider {
  /**
   */
  aws_access_key_id: string | null;
  /**
   */
  aws_secret_access_key: string | null;
  /**
   */
  aws_region: string | null;
  /**
   */
  sns_apns_platform_application_arn: string | null;
  /**
   */
  sns_gcm_platform_application_arn: string | null;
}
/**
 *
 */
export interface StatsEntry {
  [key: string]: any | any;
  /**
   * Date these events occurred in ISO 8601 format.
   *
   */
  date?: string;
  /**
   * Number of logins on this date.
   *
   */
  logins?: number;
  /**
   * Number of signups on this date.
   *
   */
  signups?: number;
  /**
   * Number of breached-password detections on this date (subscription required).
   *
   */
  leaked_passwords?: number;
  /**
   * Date and time this stats entry was last updated in ISO 8601 format.
   *
   */
  updated_at?: string;
  /**
   * Approximate date and time the first event occurred in ISO 8601 format.
   *
   */
  created_at?: string;
}
/**
 *
 */
export interface TemplateMessages {
  /**
   * Message sent to the user when they are invited to enroll with a phone number.
   *
   */
  enrollment_message: string;
  /**
   * Message sent to the user when they are prompted to verify their account.
   *
   */
  verification_message: string;
}
/**
 *
 */
export interface TenantSettings {
  /**
   */
  change_password: TenantSettingsChangePassword | null;
  /**
   */
  guardian_mfa_page: TenantSettingsGuardianMfaPage | null;
  /**
   * Default audience for API authorization.
   *
   */
  default_audience: string;
  /**
   * Name of connection used for password grants at the `/token`endpoint. The following connection types are supported: LDAP, AD, Database Connections, Passwordless, Windows Azure Active Directory, ADFS.
   *
   */
  default_directory: string;
  /**
   */
  error_page: TenantSettingsErrorPage | null;
  /**
   */
  device_flow: TenantSettingsDeviceFlow | null;
  /**
   */
  flags: TenantSettingsFlags;
  /**
   * Friendly name for this tenant.
   *
   */
  friendly_name: string;
  /**
   * URL of logo to be shown for this tenant (recommended size: 150x150)
   *
   */
  picture_url: string;
  /**
   * End-user support email address.
   *
   */
  support_email: string;
  /**
   * End-user support URL.
   *
   */
  support_url: string;
  /**
   * URLs that are valid to redirect to after logout from Auth0.
   *
   */
  allowed_logout_urls: Array<string>;
  /**
   * Number of hours a session will stay valid.
   *
   */
  session_lifetime: number;
  /**
   * Number of hours for which a session can be inactive before the user must log in again.
   *
   */
  idle_session_lifetime: number;
  /**
   * Selected sandbox version for the extensibility environment.
   *
   */
  sandbox_version: string;
  /**
   * Available sandbox versions for the extensibility environment.
   *
   */
  sandbox_versions_available: Array<string>;
  /**
   * The default absolute redirection uri, must be https
   *
   */
  default_redirection_uri: string;
  /**
   * Supported locales for the user interface.
   *
   */
  enabled_locales: Array<TenantSettingsEnabledLocalesEnum>;
  /**
   */
  session_cookie: TenantSettingsSessionCookie | null;
  /**
   */
  sessions: TenantSettingsSessions | null;
  /**
   * Whether to accept an organization name instead of an ID on auth endpoints
   *
   */
  allow_organization_name_in_authentication_api: boolean;
  /**
   * Whether to enable flexible factors for MFA in the PostLogin action
   *
   */
  customize_mfa_in_postlogin_action: boolean;
}

export const TenantSettingsEnabledLocalesEnum = {
  ar: 'ar',
  bg: 'bg',
  bs: 'bs',
  ca_ES: 'ca-ES',
  cs: 'cs',
  cy: 'cy',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  es: 'es',
  et: 'et',
  eu_ES: 'eu-ES',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
  gl_ES: 'gl-ES',
  he: 'he',
  hi: 'hi',
  hr: 'hr',
  hu: 'hu',
  id: 'id',
  is: 'is',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  lt: 'lt',
  lv: 'lv',
  nb: 'nb',
  nl: 'nl',
  nn: 'nn',
  no: 'no',
  pl: 'pl',
  pt: 'pt',
  pt_BR: 'pt-BR',
  pt_PT: 'pt-PT',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  sr: 'sr',
  sv: 'sv',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
  vi: 'vi',
  zh_CN: 'zh-CN',
  zh_TW: 'zh-TW',
} as const;
export type TenantSettingsEnabledLocalesEnum =
  (typeof TenantSettingsEnabledLocalesEnum)[keyof typeof TenantSettingsEnabledLocalesEnum];

/**
 * Change Password page customization.
 */
export interface TenantSettingsChangePassword {
  /**
   * Whether to use the custom change password HTML (true) or the default Auth0 page (false). Default is to use the Auth0 page.
   *
   */
  enabled: boolean;
  /**
   * Custom change password HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> supported).
   *
   */
  html: string;
}
/**
 * Device Flow configuration
 */
export interface TenantSettingsDeviceFlow {
  /**
   * Character set used to generate a User Code. Can be `base20` or `digits`.
   *
   */
  charset: TenantSettingsDeviceFlowCharsetEnum;
  /**
   * Mask used to format a generated User Code into a friendly, readable format.
   *
   */
  mask: string;
}

export const TenantSettingsDeviceFlowCharsetEnum = {
  base20: 'base20',
  digits: 'digits',
} as const;
export type TenantSettingsDeviceFlowCharsetEnum =
  (typeof TenantSettingsDeviceFlowCharsetEnum)[keyof typeof TenantSettingsDeviceFlowCharsetEnum];

/**
 * Error page customization.
 */
export interface TenantSettingsErrorPage {
  /**
   * Custom Error HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> is supported).
   *
   */
  html: string;
  /**
   * Whether to show the link to log as part of the default error page (true, default) or not to show the link (false).
   *
   */
  show_log_link: boolean;
  /**
   * URL to redirect to when an error occurs instead of showing the default error page.
   *
   */
  url: string;
}
/**
 * Flags used to change the behavior of this tenant.
 */
export interface TenantSettingsFlags {
  /**
   * Whether to use the older v1 change password flow (true, not recommended except for backward compatibility) or the newer safer flow (false, recommended).
   *
   */
  change_pwd_flow_v1: boolean;
  /**
   * Whether the APIs section is enabled (true) or disabled (false).
   *
   */
  enable_apis_section: boolean;
  /**
   * Whether the impersonation functionality has been disabled (true) or not (false). Read-only.
   *
   */
  disable_impersonation: boolean;
  /**
   * Whether all current connections should be enabled when a new client (application) is created (true, default) or not (false).
   *
   */
  enable_client_connections: boolean;
  /**
   * Whether advanced API Authorization scenarios are enabled (true) or disabled (false).
   *
   */
  enable_pipeline2: boolean;
  /**
   * If enabled, clients are able to add legacy delegation grants.
   *
   */
  allow_legacy_delegation_grant_types: boolean;
  /**
   * If enabled, clients are able to add legacy RO grants.
   *
   */
  allow_legacy_ro_grant_types: boolean;
  /**
   * Whether the legacy `/tokeninfo` endpoint is enabled for your account (true) or unavailable (false).
   *
   */
  allow_legacy_tokeninfo_endpoint: boolean;
  /**
   * Whether ID tokens and the userinfo endpoint includes a complete user profile (true) or only OpenID Connect claims (false).
   *
   */
  enable_legacy_profile: boolean;
  /**
   * Whether ID tokens can be used to authorize some types of requests to API v2 (true) not not (false).
   *
   */
  enable_idtoken_api2: boolean;
  /**
   * Whether the public sign up process shows a user_exists error (true) or a generic error (false) if the user already exists.
   *
   */
  enable_public_signup_user_exists_error: boolean;
  /**
   * Whether users are prompted to confirm log in before SSO redirection (false) or are not prompted (true).
   *
   */
  enable_sso: boolean;
  /**
   * Whether the `enable_sso` setting can be changed (true) or not (false).
   *
   */
  allow_changing_enable_sso: boolean;
  /**
   * Whether classic Universal Login prompts include additional security headers to prevent clickjacking (true) or no safeguard (false).
   *
   */
  disable_clickjack_protection_headers: boolean;
  /**
   * Do not Publish Enterprise Connections Information with IdP domains on the lock configuration file.
   *
   */
  no_disclose_enterprise_connections: boolean;
  /**
   * Enforce client authentication for passwordless start.
   *
   */
  enforce_client_authentication_on_passwordless_start: boolean;
  /**
   * Enables the email verification flow during login for Azure AD and ADFS connections
   *
   */
  enable_adfs_waad_email_verification: boolean;
  /**
   * Delete underlying grant when a Refresh Token is revoked via the Authentication API.
   *
   */
  revoke_refresh_token_grant: boolean;
  /**
   * Enables beta access to log streaming changes
   *
   */
  dashboard_log_streams_next: boolean;
  /**
   * Enables new insights activity page view
   *
   */
  dashboard_insights_view: boolean;
  /**
   * Disables SAML fields map fix for bad mappings with repeated attributes
   *
   */
  disable_fields_map_fix: boolean;
  /**
   * Used to allow users to pick what factor to enroll of the available MFA factors.
   *
   */
  mfa_show_factor_list_on_enrollment: boolean;
}
/**
 * Guardian page customization.
 */
export interface TenantSettingsGuardianMfaPage {
  /**
   * Whether to use the custom Guardian HTML (true) or the default Auth0 page (false, default)
   *
   */
  enabled: boolean;
  /**
   *  Custom Guardian HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> is supported).
   *
   */
  html: string;
}
/**
 * Session cookie configuration
 */
export interface TenantSettingsSessionCookie {
  /**
   * Behavior of the session cookie
   *
   */
  mode: TenantSettingsSessionCookieModeEnum;
}

export const TenantSettingsSessionCookieModeEnum = {
  persistent: 'persistent',
  non_persistent: 'non-persistent',
} as const;
export type TenantSettingsSessionCookieModeEnum =
  (typeof TenantSettingsSessionCookieModeEnum)[keyof typeof TenantSettingsSessionCookieModeEnum];

/**
 * Sessions related settings for tenant
 */
export interface TenantSettingsSessions {
  /**
   * Whether to bypass prompting logic (false) when performing OIDC Logout
   *
   */
  oidc_logout_prompt_enabled: boolean;
}
/**
 *
 */
export interface TenantSettingsUpdate {
  /**
   */
  change_password?: TenantSettingsUpdateChangePassword | null;
  /**
   */
  device_flow?: TenantSettingsUpdateDeviceFlow | null;
  /**
   */
  guardian_mfa_page?: TenantSettingsUpdateGuardianMfaPage | null;
  /**
   * Default audience for API Authorization.
   *
   */
  default_audience?: string;
  /**
   * Name of connection used for password grants at the `/token` endpoint. The following connection types are supported: LDAP, AD, Database Connections, Passwordless, Windows Azure Active Directory, ADFS.
   *
   */
  default_directory?: string;
  /**
   */
  error_page?: TenantSettingsUpdateErrorPage | null;
  /**
   */
  flags?: TenantSettingsUpdateFlags;
  /**
   * Friendly name for this tenant.
   *
   */
  friendly_name?: string;
  /**
   * URL of logo to be shown for this tenant (recommended size: 150x150)
   *
   */
  picture_url?: string;
  /**
   * End-user support email.
   *
   */
  support_email?: string;
  /**
   * End-user support url.
   *
   */
  support_url?: string;
  /**
   * URLs that are valid to redirect to after logout from Auth0.
   *
   */
  allowed_logout_urls?: Array<string>;
  /**
   * Number of hours a session will stay valid.
   *
   */
  session_lifetime?: number;
  /**
   * Number of hours for which a session can be inactive before the user must log in again.
   *
   */
  idle_session_lifetime?: number;
  /**
   * Selected sandbox version for the extensibility environment
   *
   */
  sandbox_version?: string;
  /**
   * The default absolute redirection uri, must be https
   *
   */
  default_redirection_uri?: string;
  /**
   * Supported locales for the user interface
   *
   */
  enabled_locales?: Array<TenantSettingsUpdateEnabledLocalesEnum>;
  /**
   */
  session_cookie?: TenantSettingsSessionCookie | null;
  /**
   */
  sessions?: TenantSettingsUpdateSessions | null;
  /**
   * Whether to enable flexible factors for MFA in the PostLogin action
   *
   */
  customize_mfa_in_postlogin_action?: boolean | null;
  /**
   * Whether to accept an organization name instead of an ID on auth endpoints
   *
   */
  allow_organization_name_in_authentication_api?: boolean | null;
}

export const TenantSettingsUpdateEnabledLocalesEnum = {
  ar: 'ar',
  bg: 'bg',
  bs: 'bs',
  ca_ES: 'ca-ES',
  cs: 'cs',
  cy: 'cy',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  es: 'es',
  et: 'et',
  eu_ES: 'eu-ES',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
  gl_ES: 'gl-ES',
  he: 'he',
  hi: 'hi',
  hr: 'hr',
  hu: 'hu',
  id: 'id',
  is: 'is',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  lt: 'lt',
  lv: 'lv',
  nb: 'nb',
  nl: 'nl',
  nn: 'nn',
  no: 'no',
  pl: 'pl',
  pt: 'pt',
  pt_BR: 'pt-BR',
  pt_PT: 'pt-PT',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  sr: 'sr',
  sv: 'sv',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
  vi: 'vi',
  zh_CN: 'zh-CN',
  zh_TW: 'zh-TW',
} as const;
export type TenantSettingsUpdateEnabledLocalesEnum =
  (typeof TenantSettingsUpdateEnabledLocalesEnum)[keyof typeof TenantSettingsUpdateEnabledLocalesEnum];

/**
 * Change Password page customization.
 */
export interface TenantSettingsUpdateChangePassword {
  /**
   * Whether to use the custom change password HTML (true) or the default Auth0 page (false). Default is to use the Auth0 page.
   *
   */
  enabled?: boolean;
  /**
   * Custom change password HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> supported).
   *
   */
  html?: string;
}
/**
 * Device Flow configuration.
 */
export interface TenantSettingsUpdateDeviceFlow {
  /**
   * Character set used to generate a User Code. Can be `base20` or `digits`.
   *
   */
  charset?: TenantSettingsUpdateDeviceFlowCharsetEnum;
  /**
   * Mask used to format a generated User Code into a friendly, readable format.
   *
   */
  mask?: string;
}

export const TenantSettingsUpdateDeviceFlowCharsetEnum = {
  base20: 'base20',
  digits: 'digits',
} as const;
export type TenantSettingsUpdateDeviceFlowCharsetEnum =
  (typeof TenantSettingsUpdateDeviceFlowCharsetEnum)[keyof typeof TenantSettingsUpdateDeviceFlowCharsetEnum];

/**
 * Error page customization.
 */
export interface TenantSettingsUpdateErrorPage {
  /**
   * Custom Error HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> is supported).
   *
   */
  html?: string;
  /**
   * Whether to show the link to log as part of the default error page (true, default) or not to show the link (false).
   *
   */
  show_log_link?: boolean;
  /**
   * URL to redirect to when an error occurs instead of showing the default error page.
   *
   */
  url?: string;
}
/**
 * Flags used to change the behavior of this tenant.
 */
export interface TenantSettingsUpdateFlags {
  /**
   * Whether to use the older v1 change password flow (true, not recommended except for backward compatibility) or the newer safer flow (false, recommended).
   *
   */
  change_pwd_flow_v1?: TenantSettingsUpdateFlagsChangePwdFlowV1Enum;
  /**
   * Whether all current connections should be enabled when a new client (application) is created (true, default) or not (false).
   *
   */
  enable_client_connections?: boolean;
  /**
   * Whether the APIs section is enabled (true) or disabled (false).
   *
   */
  enable_apis_section?: boolean;
  /**
   * Whether advanced API Authorization scenarios are enabled (true) or disabled (false).
   *
   */
  enable_pipeline2?: boolean;
  /**
   *  Whether third-party developers can <a href='https://auth0.com/docs/api-auth/dynamic-client-registration'>dynamically register</a> applications for your APIs (true) or not (false). This flag enables dynamic client registration.
   *
   */
  enable_dynamic_client_registration?: boolean;
  /**
   * Whether emails sent by Auth0 for change password, verification etc. should use your verified custom domain (true) or your auth0.com sub-domain (false).  Affects all emails, links, and URLs. Email will fail if the custom domain is not verified.
   *
   */
  enable_custom_domain_in_emails?: boolean;
  /**
   * Whether the legacy `/tokeninfo` endpoint is enabled for your account (true) or unavailable (false).
   *
   */
  allow_legacy_tokeninfo_endpoint?: boolean;
  /**
   * Whether ID tokens and the userinfo endpoint includes a complete user profile (true) or only OpenID Connect claims (false).
   *
   */
  enable_legacy_profile?: boolean;
  /**
   * Whether ID tokens can be used to authorize some types of requests to API v2 (true) not not (false).
   *
   */
  enable_idtoken_api2?: boolean;
  /**
   * Whether the public sign up process shows a user_exists error (true) or a generic error (false) if the user already exists.
   *
   */
  enable_public_signup_user_exists_error?: boolean;
  /**
   *  Whether the legacy delegation endpoint will be enabled for your account (true) or not available (false).
   *
   */
  allow_legacy_delegation_grant_types?: boolean;
  /**
   * Whether the legacy `auth/ro` endpoint (used with resource owner password and passwordless features) will be enabled for your account (true) or not available (false).
   *
   */
  allow_legacy_ro_grant_types?: boolean;
  /**
   * Whether users are prompted to confirm log in before SSO redirection (false) or are not prompted (true).
   *
   */
  enable_sso?: boolean;
  /**
   * Whether classic Universal Login prompts include additional security headers to prevent clickjacking (true) or no safeguard (false).
   *
   */
  disable_clickjack_protection_headers?: boolean;
  /**
   * Do not Publish Enterprise Connections Information with IdP domains on the lock configuration file.
   *
   */
  no_disclose_enterprise_connections?: boolean;
  /**
   * If true, SMS phone numbers will not be obfuscated in Management API GET calls.
   *
   */
  disable_management_api_sms_obfuscation?: boolean;
  /**
   * Enforce client authentication for passwordless start.
   *
   */
  enforce_client_authentication_on_passwordless_start?: boolean;
  /**
   * Changes email_verified behavior for Azure AD/ADFS connections when enabled. Sets email_verified to false otherwise.
   *
   */
  trust_azure_adfs_email_verified_connection_property?: boolean;
  /**
   * Enables the email verification flow during login for Azure AD and ADFS connections.
   *
   */
  enable_adfs_waad_email_verification?: boolean;
  /**
   * Delete underlying grant when a Refresh Token is revoked via the Authentication API.
   *
   */
  revoke_refresh_token_grant?: boolean;
  /**
   * Enables beta access to log streaming changes.
   *
   */
  dashboard_log_streams_next?: boolean;
  /**
   * Enables new insights activity page view.
   *
   */
  dashboard_insights_view?: boolean;
  /**
   * Disables SAML fields map fix for bad mappings with repeated attributes.
   *
   */
  disable_fields_map_fix?: boolean;
  /**
   * Used to allow users to pick what factor to enroll of the available MFA factors.
   *
   */
  mfa_show_factor_list_on_enrollment?: boolean;
}

export const TenantSettingsUpdateFlagsChangePwdFlowV1Enum = {
  false: false,
} as const;
export type TenantSettingsUpdateFlagsChangePwdFlowV1Enum =
  (typeof TenantSettingsUpdateFlagsChangePwdFlowV1Enum)[keyof typeof TenantSettingsUpdateFlagsChangePwdFlowV1Enum];

/**
 * Guardian page customization.
 */
export interface TenantSettingsUpdateGuardianMfaPage {
  /**
   * Whether to use the custom Guardian HTML (true) or the default Auth0 page (false, default)
   *
   */
  enabled?: boolean;
  /**
   *  Custom Guardian HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> is supported).
   *
   */
  html?: string;
}
/**
 * Sessions related settings for tenant
 */
export interface TenantSettingsUpdateSessions {
  /**
   * Whether to bypass prompting logic (false) when performing OIDC Logout
   *
   */
  oidc_logout_prompt_enabled?: boolean;
}
/**
 *
 */
export interface Token {
  /**
   * JWT's aud claim (the client_id to which the JWT was issued).
   *
   */
  aud?: string;
  /**
   * jti (unique ID within aud) of the blacklisted JWT.
   *
   */
  jti: string;
}
/**
 *
 */
export interface TwilioFactorProvider {
  /**
   * From number
   *
   */
  from: string | null;
  /**
   * Copilot SID
   *
   */
  messaging_service_sid: string | null;
  /**
   * Twilio Authentication token
   *
   */
  auth_token: string | null;
  /**
   * Twilio SID
   *
   */
  sid: string | null;
}
/**
 *
 */
export interface UserBlock {
  /**
   * Array of identifier + IP address pairs.  IP address is optional, and may be omitted in certain circumstances (such as Account Lockout mode).
   *
   */
  blocked_for: Array<UserBlockBlockedForInner>;
}
/**
 *
 */
export interface UserBlockBlockedForInner {
  [key: string]: any | any;
  /**
   * Identifier (should be any of an `email`, `username`, or `phone_number`)
   *
   */
  identifier: string;
  /**
   * IP Address
   *
   */
  ip: string;
  /**
   * Connection identifier
   *
   */
  connection: string;
}
/**
 *
 */
export interface UserCreate {
  /**
   * The user's email.
   *
   */
  email?: string;
  /**
   * The user's phone number (following the E.164 recommendation), only valid for users from SMS connections.
   *
   */
  phone_number?: string;
  /**
   * Data related to the user that does not affect the application's core functionality.
   *
   */
  user_metadata?: { [key: string]: any };
  /**
   * Whether this user was blocked by an administrator (true) or not (false).
   *
   */
  blocked?: boolean;
  /**
   * Whether this email address is verified (true) or unverified (false). User will receive a verification email after creation if `email_verified` is false or not specified
   *
   */
  email_verified?: boolean;
  /**
   * Whether this phone number has been verified (true) or not (false).
   *
   */
  phone_verified?: boolean;
  /**
   */
  app_metadata?: PostInvitationsRequestAppMetadata;
  /**
   * The user's given name(s).
   *
   */
  given_name?: string;
  /**
   * The user's family name(s).
   *
   */
  family_name?: string;
  /**
   * The user's full name.
   *
   */
  name?: string;
  /**
   * The user's nickname.
   *
   */
  nickname?: string;
  /**
   * A URI pointing to the user's picture.
   *
   */
  picture?: string;
  /**
   * The external user's id provided by the identity provider.
   *
   */
  user_id?: string;
  /**
   * Name of the connection this user should be created in.
   *
   */
  connection: string;
  /**
   * Initial password for this user (mandatory only for auth0 connection strategy).
   *
   */
  password?: string;
  /**
   * Whether the user will receive a verification email after creation (true) or no email (false). Overrides behavior of `email_verified` parameter.
   *
   */
  verify_email?: boolean;
  /**
   * The user's username. Only valid if the connection requires a username.
   *
   */
  username?: string;
}
/**
 *
 */
export interface UserEnrollment {
  [key: string]: any | any;
  /**
   * ID of this enrollment.
   *
   */
  id?: string;
  /**
   * Status of this enrollment. Can be `pending` or `confirmed`.
   *
   */
  status?: UserEnrollmentStatusEnum;
  /**
   * Type of enrollment.
   *
   */
  type?: string;
  /**
   * Name of enrollment (usually phone number).
   *
   */
  name?: string;
  /**
   * Device identifier (usually phone identifier) of this enrollment.
   *
   */
  identifier?: string;
  /**
   * Phone number for this enrollment.
   *
   */
  phone_number?: string;
  /**
   * Authentication method for this enrollment. Can be `authenticator`, `guardian`, `sms`, `webauthn-roaming`, or `webauthn-platform`.
   *
   */
  auth_method?: UserEnrollmentAuthMethodEnum;
  /**
   * Start date and time of this enrollment.
   *
   */
  enrolled_at?: string;
  /**
   * Last authentication date and time of this enrollment.
   *
   */
  last_auth?: string;
}

export const UserEnrollmentStatusEnum = {
  pending: 'pending',
  confirmed: 'confirmed',
} as const;
export type UserEnrollmentStatusEnum =
  (typeof UserEnrollmentStatusEnum)[keyof typeof UserEnrollmentStatusEnum];

export const UserEnrollmentAuthMethodEnum = {
  authenticator: 'authenticator',
  guardian: 'guardian',
  sms: 'sms',
  webauthn_platform: 'webauthn-platform',
  webauthn_roaming: 'webauthn-roaming',
} as const;
export type UserEnrollmentAuthMethodEnum =
  (typeof UserEnrollmentAuthMethodEnum)[keyof typeof UserEnrollmentAuthMethodEnum];

/**
 *
 */
export interface UserGrant {
  /**
   * ID of the grant.
   *
   */
  id?: string;
  /**
   * ID of the client.
   *
   */
  clientID?: string;
  /**
   * ID of the user.
   *
   */
  user_id?: string;
  /**
   * Audience of the grant.
   *
   */
  audience?: string;
  /**
   * Scopes included in this grant.
   *
   */
  scope?: Array<string>;
}
/**
 *
 */
export interface UserIdentity {
  /**
   * Connection name of this identity.
   *
   */
  connection: string;
  /**
   */
  user_id: UserIdentityUserId;
  /**
   * Type of identity provider.
   *
   */
  provider: string;
  /**
   */
  profileData?: UserProfile;
  /**
   * Whether the identity provider is a social provider (true) or not (false).
   *
   */
  isSocial?: boolean;
  /**
   * IDP access token returned if scope `read:user_idp_tokens` is defined.
   *
   */
  access_token?: string;
  /**
   * IDP access token secret returned only if `scope read:user_idp_tokens` is defined.
   *
   */
  access_token_secret?: string;
  /**
   * IDP refresh token returned only if scope `read:user_idp_tokens` is defined.
   *
   */
  refresh_token?: string;
}
/**
 * user_id of this identity.
 */
export type UserIdentityUserId = number | string;
/**
 *
 */
export interface UserProfile {
  [key: string]: any | any;
  /**
   * Email address of this user.
   *
   */
  email?: string;
  /**
   * Whether this email address is verified (true) or unverified (false).
   *
   */
  email_verified?: boolean;
  /**
   * Name of this user.
   *
   */
  name?: string;
  /**
   * Username of this user.
   *
   */
  username?: string;
  /**
   * Given name/first name/forename of this user.
   *
   */
  given_name?: string;
  /**
   * Phone number for this user.
   *
   */
  phone_number?: string;
  /**
   * Whether this phone number is verified (true) or unverified (false).
   *
   */
  phone_verified?: boolean;
  /**
   * Family name/last name/surname of this user.
   *
   */
  family_name?: string;
}
/**
 *
 */
export interface UserUpdate {
  [key: string]: any | any;
  /**
   * Whether this user was blocked by an administrator (true) or not (false).
   *
   */
  blocked?: boolean;
  /**
   * Whether this email address is verified (true) or unverified (false). If set to false the user will not receive a verification email unless `verify_email` is set to true.
   *
   */
  email_verified?: boolean;
  /**
   * Email address of this user.
   *
   */
  email?: string;
  /**
   * The user's phone number (following the E.164 recommendation), only valid for users from SMS connections.
   *
   */
  phone_number?: string;
  /**
   * Whether this phone number has been verified (true) or not (false).
   *
   */
  phone_verified?: boolean;
  /**
   * User metadata to which this user has read/write access.
   *
   */
  user_metadata?: { [key: string]: any } | null;
  /**
   */
  app_metadata?: UserUpdateAppMetadata | null;
  /**
   * Given name/first name/forename of this user.
   *
   */
  given_name?: string | null;
  /**
   * Family name/last name/surname of this user.
   *
   */
  family_name?: string | null;
  /**
   * Name of this user.
   *
   */
  name?: string | null;
  /**
   * Preferred nickname or alias of this user.
   *
   */
  nickname?: string | null;
  /**
   * URL to picture, photo, or avatar of this user.
   *
   */
  picture?: string | null;
  /**
   * Whether this user will receive a verification email after creation (true) or no email (false). Overrides behavior of `email_verified` parameter.
   *
   */
  verify_email?: boolean;
  /**
   * Whether this user will receive a text after changing the phone number (true) or no text (false). Only valid when changing phone number.
   *
   */
  verify_phone_number?: boolean;
  /**
   * New password for this user (mandatory for non-SMS connections).
   *
   */
  password?: string;
  /**
   * ID of the connection this user should be created in.
   *
   */
  connection?: string;
  /**
   * Auth0 client ID. Only valid when updating email address.
   *
   */
  client_id?: string;
  /**
   * The user's username. Only valid if the connection requires a username.
   *
   */
  username?: string;
}
/**
 * User metadata to which this user has read-only access.
 */
export interface UserUpdateAppMetadata {
  [key: string]: any | any;
  /**
   */
  clientID?: any | null;
  /**
   */
  globalClientID?: any | null;
  /**
   */
  global_client_id?: any | null;
  /**
   */
  email_verified?: any | null;
  /**
   */
  user_id?: any | null;
  /**
   */
  identities?: any | null;
  /**
   */
  lastIP?: any | null;
  /**
   */
  lastLogin?: any | null;
  /**
   */
  metadata?: any | null;
  /**
   */
  created_at?: any | null;
  /**
   */
  loginsCount?: any | null;
  /**
   */
  _id?: any | null;
  /**
   */
  email?: any | null;
  /**
   */
  blocked?: any | null;
  /**
   */
  __tenant?: any | null;
  /**
   */
  updated_at?: any | null;
}
/**
 *
 */
export interface DeleteActionRequest {
  /**
   * The ID of the action to delete.
   *
   */
  id: string;
  /**
   * Force action deletion detaching bindings
   *
   */
  force?: boolean;
}
/**
 *
 */
export interface GetActionRequest {
  /**
   * The ID of the action to retrieve.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetActionVersionRequest {
  /**
   * The ID of the action.
   *
   */
  actionId: string;
  /**
   * The ID of the action version.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetActionVersionsRequest {
  /**
   * The ID of the action.
   *
   */
  actionId: string;
  /**
   * Use this field to request a specific page of the list results.
   *
   */
  page?: number;
  /**
   * This field specify the maximum number of results to be returned by the server. 20 by default
   *
   */
  per_page?: number;
}
/**
 *
 */
export interface GetActionsRequest {
  /**
   * An actions extensibility point. Acceptable values: <code>post-login, credentials-exchange, pre-user-registration, post-user-registration, post-change-password, send-phone-message, password-reset-post-challenge</code>
   *
   */
  triggerId?: string;
  /**
   * The name of the action to retrieve.
   *
   */
  actionName?: string;
  /**
   * Optional filter to only retrieve actions that are deployed.
   *
   */
  deployed?: boolean;
  /**
   * Use this field to request a specific page of the list results.
   *
   */
  page?: number;
  /**
   * The maximum number of results to be returned by the server in single response. 20 by default
   *
   */
  per_page?: number;
  /**
   * Optional. When true, return only installed actions. When false, return only custom actions. Returns all actions by default.
   *
   */
  installed?: boolean;
}
/**
 *
 */
export interface GetBindingsRequest {
  /**
   * An actions extensibility point. Acceptable values: <code>post-login, credentials-exchange, pre-user-registration, post-user-registration, post-change-password, send-phone-message, password-reset-post-challenge</code>
   *
   */
  triggerId: string;
  /**
   * Use this field to request a specific page of the list results.
   *
   */
  page?: number;
  /**
   * The maximum number of results to be returned in a single request. 20 by default
   *
   */
  per_page?: number;
}
/**
 *
 */
export interface GetExecutionRequest {
  /**
   * The ID of the execution to retrieve.
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchActionOperationRequest {
  /**
   * The id of the action to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchBindingsOperationRequest {
  /**
   * An actions extensibility point. Acceptable values: <code>post-login, credentials-exchange, pre-user-registration, post-user-registration, post-change-password, send-phone-message, password-reset-post-challenge</code>
   *
   */
  triggerId: string;
}
/**
 *
 */
export interface PostDeployActionRequest {
  /**
   * The ID of an action.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostDeployDraftVersionOperationRequest {
  /**
   * The ID of an action version.
   *
   */
  id: string;
  /**
   * The ID of an action.
   *
   */
  actionId: string;
}
/**
 *
 */
export interface PostTestActionOperationRequest {
  /**
   * The id of the action to test.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteIpsByIdRequest {
  /**
   * IP address to unblock.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetIpsByIdRequest {
  /**
   * IP address to check.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetTokensRequest {
  /**
   * Optional filter on the JWT's aud claim (the client_id to which the JWT was issued).
   *
   */
  aud?: string;
}
/**
 *
 */
export interface DeleteBrandingThemeRequest {
  /**
   * The ID of the theme
   *
   */
  themeId: string;
}
/**
 *
 */
export interface GetBrandingThemeRequest {
  /**
   * The ID of the theme
   *
   */
  themeId: string;
}
/**
 *
 */
export interface PatchBrandingThemeRequest {
  /**
   * The ID of the theme
   *
   */
  themeId: string;
}
/**
 *
 */
export interface DeleteClientGrantsByIdRequest {
  /**
   * ID of the client grant to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetClientGrantsRequest {
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional filter on audience.
   *
   */
  audience?: string;
  /**
   * Optional filter on client_id.
   *
   */
  client_id?: string;
}
/**
 *
 */
export interface PatchClientGrantsByIdOperationRequest {
  /**
   * ID of the client grant to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteClientsByIdRequest {
  /**
   * ID of the client to delete.
   *
   */
  client_id: string;
}
/**
 *
 */
export interface DeleteCredentialsByCredentialIdRequest {
  /**
   * ID of the client.
   *
   */
  client_id: string;
  /**
   * ID of the credential to delete.
   *
   */
  credential_id: string;
}
/**
 *
 */
export interface GetClientsRequest {
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Default value is 50, maximum value is 100
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional filter on the global client parameter.
   *
   */
  is_global?: boolean;
  /**
   * Optional filter on whether or not a client is a first-party client.
   *
   */
  is_first_party?: boolean;
  /**
   * Optional filter by a comma-separated list of application types.
   *
   */
  app_type?: string;
}
/**
 *
 */
export interface GetClientsByIdRequest {
  /**
   * ID of the client to retrieve.
   *
   */
  client_id: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface GetCredentialsRequest {
  /**
   * ID of the client.
   *
   */
  client_id: string;
}
/**
 *
 */
export interface GetCredentialsByCredentialIdRequest {
  /**
   * ID of the client.
   *
   */
  client_id: string;
  /**
   * ID of the credential.
   *
   */
  credential_id: string;
}
/**
 *
 */
export interface PatchClientsByIdRequest {
  /**
   * ID of the client to update.
   *
   */
  client_id: string;
}
/**
 *
 */
export interface PatchCredentialsByCredentialIdOperationRequest {
  /**
   * ID of the client.
   *
   */
  client_id: string;
  /**
   * ID of the credential.
   *
   */
  credential_id: string;
}
/**
 *
 */
export interface PostCredentialsOperationRequest {
  /**
   * ID of the client.
   *
   */
  client_id: string;
}
/**
 *
 */
export interface PostRotateSecretRequest {
  /**
   * ID of the client that will rotate secrets.
   *
   */
  client_id: string;
}
/**
 *
 */
export interface DeleteConnectionsByIdRequest {
  /**
   * The id of the connection to delete
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteUsersByEmailRequest {
  /**
   * The id of the connection (currently only database connections are supported)
   *
   */
  id: string;
  /**
   * The email of the user to delete
   *
   */
  email: string;
}

/**
 *
 */
export const GetConnectionsStrategyEnum = {
  ad: 'ad',
  adfs: 'adfs',
  amazon: 'amazon',
  apple: 'apple',
  dropbox: 'dropbox',
  bitbucket: 'bitbucket',
  aol: 'aol',
  auth0_oidc: 'auth0-oidc',
  auth0: 'auth0',
  baidu: 'baidu',
  bitly: 'bitly',
  box: 'box',
  custom: 'custom',
  daccount: 'daccount',
  dwolla: 'dwolla',
  email: 'email',
  evernote_sandbox: 'evernote-sandbox',
  evernote: 'evernote',
  exact: 'exact',
  facebook: 'facebook',
  fitbit: 'fitbit',
  flickr: 'flickr',
  github: 'github',
  google_apps: 'google-apps',
  google_oauth2: 'google-oauth2',
  instagram: 'instagram',
  ip: 'ip',
  line: 'line',
  linkedin: 'linkedin',
  miicard: 'miicard',
  oauth1: 'oauth1',
  oauth2: 'oauth2',
  office365: 'office365',
  oidc: 'oidc',
  okta: 'okta',
  paypal: 'paypal',
  paypal_sandbox: 'paypal-sandbox',
  pingfederate: 'pingfederate',
  planningcenter: 'planningcenter',
  renren: 'renren',
  salesforce_community: 'salesforce-community',
  salesforce_sandbox: 'salesforce-sandbox',
  salesforce: 'salesforce',
  samlp: 'samlp',
  sharepoint: 'sharepoint',
  shopify: 'shopify',
  sms: 'sms',
  soundcloud: 'soundcloud',
  thecity_sandbox: 'thecity-sandbox',
  thecity: 'thecity',
  thirtysevensignals: 'thirtysevensignals',
  twitter: 'twitter',
  untappd: 'untappd',
  vkontakte: 'vkontakte',
  waad: 'waad',
  weibo: 'weibo',
  windowslive: 'windowslive',
  wordpress: 'wordpress',
  yahoo: 'yahoo',
  yammer: 'yammer',
  yandex: 'yandex',
  auth0_adldap: 'auth0-adldap',
} as const;
export type GetConnectionsStrategyEnum =
  (typeof GetConnectionsStrategyEnum)[keyof typeof GetConnectionsStrategyEnum];

/**
 *
 */
export interface GetConnectionsRequest {
  /**
   * The amount of entries per page. Default: no paging is used, all connections are returned
   *
   */
  per_page?: number;
  /**
   * The page number. Zero based
   *
   */
  page?: number;
  /**
   * true if a query summary must be included in the result, false otherwise. Not returned when using checkpoint pagination. Default <code>false</code>.
   *
   */
  include_totals?: boolean;
  /**
   * Optional Id from which to start selection.
   *
   */
  from?: string;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  take?: number;
  /**
   * Provide strategies to only retrieve connections with such strategies
   *
   */
  strategy?: Array<GetConnectionsStrategyEnum>;
  /**
   * Provide the name of the connection to retrieve
   *
   */
  name?: string;
  /**
   * A comma separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve all fields
   *
   */
  fields?: string;
  /**
   * <code>true</code> if the fields specified are to be included in the result, <code>false</code> otherwise (defaults to <code>true</code>)
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface GetConnectionsByIdRequest {
  /**
   * The id of the connection to retrieve
   *
   */
  id: string;
  /**
   * A comma separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve all fields
   *
   */
  fields?: string;
  /**
   * <code>true</code> if the fields specified are to be included in the result, <code>false</code> otherwise (defaults to <code>true</code>)
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface GetStatusRequest {
  /**
   * ID of the connection to check
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchConnectionsByIdRequest {
  /**
   * The id of the connection to retrieve
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteCustomDomainsByIdRequest {
  /**
   * ID of the custom domain to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetCustomDomainsByIdRequest {
  /**
   * ID of the custom domain to retrieve.
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchCustomDomainsByIdOperationRequest {
  /**
   * The id of the custom domain to update
   *
   */
  id: string;
}
/**
 *
 */
export interface PostVerifyRequest {
  /**
   * ID of the custom domain to verify.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteDeviceCredentialsByIdRequest {
  /**
   * ID of the credential to delete.
   *
   */
  id: string;
}

/**
 *
 */
export const GetDeviceCredentialsTypeEnum = {
  public_key: 'public_key',
  refresh_token: 'refresh_token',
  rotating_refresh_token: 'rotating_refresh_token',
} as const;
export type GetDeviceCredentialsTypeEnum =
  (typeof GetDeviceCredentialsTypeEnum)[keyof typeof GetDeviceCredentialsTypeEnum];

/**
 *
 */
export interface GetDeviceCredentialsRequest {
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page.  There is a maximum of 1000 results allowed from this endpoint.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
  /**
   * user_id of the devices to retrieve.
   *
   */
  user_id?: string;
  /**
   * client_id of the devices to retrieve.
   *
   */
  client_id?: string;
  /**
   * Type of credentials to retrieve. Must be `public_key`, `refresh_token` or `rotating_refresh_token`. The property will default to `refresh_token` when paging is requested
   *
   */
  type?: GetDeviceCredentialsTypeEnum;
}

/**
 *
 */
export const GetEmailTemplatesByTemplateNameTemplateNameEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type GetEmailTemplatesByTemplateNameTemplateNameEnum =
  (typeof GetEmailTemplatesByTemplateNameTemplateNameEnum)[keyof typeof GetEmailTemplatesByTemplateNameTemplateNameEnum];

/**
 *
 */
export interface GetEmailTemplatesByTemplateNameRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   *
   */
  templateName: GetEmailTemplatesByTemplateNameTemplateNameEnum;
}

/**
 *
 */
export const PatchEmailTemplatesByTemplateNameOperationTemplateNameEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type PatchEmailTemplatesByTemplateNameOperationTemplateNameEnum =
  (typeof PatchEmailTemplatesByTemplateNameOperationTemplateNameEnum)[keyof typeof PatchEmailTemplatesByTemplateNameOperationTemplateNameEnum];

/**
 *
 */
export interface PatchEmailTemplatesByTemplateNameOperationRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   *
   */
  templateName: PatchEmailTemplatesByTemplateNameOperationTemplateNameEnum;
}

/**
 *
 */
export const PutEmailTemplatesByTemplateNameTemplateNameEnum = {
  verify_email: 'verify_email',
  verify_email_by_code: 'verify_email_by_code',
  reset_email: 'reset_email',
  welcome_email: 'welcome_email',
  blocked_account: 'blocked_account',
  stolen_credentials: 'stolen_credentials',
  enrollment_email: 'enrollment_email',
  mfa_oob_code: 'mfa_oob_code',
  user_invitation: 'user_invitation',
  change_password: 'change_password',
  password_reset: 'password_reset',
} as const;
export type PutEmailTemplatesByTemplateNameTemplateNameEnum =
  (typeof PutEmailTemplatesByTemplateNameTemplateNameEnum)[keyof typeof PutEmailTemplatesByTemplateNameTemplateNameEnum];

/**
 *
 */
export interface PutEmailTemplatesByTemplateNameRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   *
   */
  templateName: PutEmailTemplatesByTemplateNameTemplateNameEnum;
}
/**
 *
 */
export interface GetProviderRequest {
  /**
   * Comma-separated list of fields to include or exclude (dependent upon include_fields) from the result. Leave empty to retrieve `name` and `enabled`. Additional fields available include `credentials`, `default_from_address`, and `settings`.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface DeleteGrantsByIdRequest {
  /**
   * ID of the grant to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteGrantsByUserIdRequest {
  /**
   * user_id of the grant to delete.
   *
   */
  user_id: string;
}
/**
 *
 */
export interface GetGrantsRequest {
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * user_id of the grants to retrieve.
   *
   */
  user_id?: string;
  /**
   * client_id of the grants to retrieve.
   *
   */
  client_id?: string;
  /**
   * audience of the grants to retrieve.
   *
   */
  audience?: string;
}
/**
 *
 */
export interface DeleteEnrollmentsByIdRequest {
  /**
   * ID of the enrollment to be deleted.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetEnrollmentsByIdRequest {
  /**
   * ID of the enrollment to be retrieve.
   *
   */
  id: string;
}

/**
 *
 */
export const PutFactorsByNameOperationNameEnum = {
  push_notification: 'push-notification',
  sms: 'sms',
  email: 'email',
  duo: 'duo',
  otp: 'otp',
  webauthn_roaming: 'webauthn-roaming',
  webauthn_platform: 'webauthn-platform',
  recovery_code: 'recovery-code',
} as const;
export type PutFactorsByNameOperationNameEnum =
  (typeof PutFactorsByNameOperationNameEnum)[keyof typeof PutFactorsByNameOperationNameEnum];

/**
 *
 */
export interface PutFactorsByNameOperationRequest {
  /**
   * Factor name. Can be `sms`, `push-notification`, `email`, `duo` `otp` `webauthn-roaming`, `webauthn-platform`, or `recovery-code`.
   *
   */
  name: PutFactorsByNameOperationNameEnum;
}
/**
 *
 */
export interface DeleteHooksByIdRequest {
  /**
   * ID of the hook to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteSecretsRequest {
  /**
   * ID of the hook whose secrets to delete.
   *
   */
  id: string;
}

/**
 *
 */
export const GetHooksTriggerIdEnum = {
  credentials_exchange: 'credentials-exchange',
  pre_user_registration: 'pre-user-registration',
  post_user_registration: 'post-user-registration',
  post_change_password: 'post-change-password',
  send_phone_message: 'send-phone-message',
} as const;
export type GetHooksTriggerIdEnum =
  (typeof GetHooksTriggerIdEnum)[keyof typeof GetHooksTriggerIdEnum];

/**
 *
 */
export interface GetHooksRequest {
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional filter on whether a hook is enabled (true) or disabled (false).
   *
   */
  enabled?: boolean;
  /**
   * Comma-separated list of fields to include in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Retrieves hooks that match the trigger
   *
   */
  triggerId?: GetHooksTriggerIdEnum;
}
/**
 *
 */
export interface GetHooksByIdRequest {
  /**
   * ID of the hook to retrieve.
   *
   */
  id: string;
  /**
   * Comma-separated list of fields to include in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
}
/**
 *
 */
export interface GetSecretsRequest {
  /**
   * ID of the hook to retrieve secrets from.
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchHooksByIdRequest {
  /**
   * ID of the hook to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchSecretsRequest {
  /**
   * ID of the hook whose secrets to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostSecretsRequest {
  /**
   * The id of the hook to retrieve
   *
   */
  id: string;
}
/**
 *
 */
export interface GetErrorsRequest {
  /**
   * ID of the job.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetJobsByIdRequest {
  /**
   * ID of the job.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostUsersImportsData {
  /**
   */
  users: Blob;
  /**
   * connection_id of the connection to which users will be imported.
   *
   */
  connection_id: string;
  /**
   * Whether to update users if they already exist (true) or to ignore them (false).
   *
   */
  upsert?: boolean;
  /**
   * Customer-defined ID.
   *
   */
  external_id?: string;
  /**
   * Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
   *
   */
  send_completion_email?: boolean;
}
/**
 *
 */
export interface GetSigningKeyRequest {
  /**
   * Key id of the key to retrieve
   *
   */
  kid: string;
}
/**
 *
 */
export interface PutSigningKeysRequest {
  /**
   * Key id of the key to revoke
   *
   */
  kid: string;
}
/**
 *
 */
export interface DeleteLogStreamsByIdRequest {
  /**
   * The id of the log stream to delete
   *
   */
  id: string;
}
/**
 *
 */
export interface GetLogStreamsByIdRequest {
  /**
   * The id of the log stream to get
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchLogStreamsByIdOperationRequest {
  /**
   * The id of the log stream to get
   *
   */
  id: string;
}
/**
 *
 */
export interface GetLogsRequest {
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   *  Number of results per page. Paging is disabled if parameter not sent. Default: <code>50</code>. Max value: <code>100</code>
   *
   */
  per_page?: number;
  /**
   * Field to use for sorting appended with <code>:1</code>  for ascending and <code>:-1</code> for descending. e.g. <code>date:-1</code>
   *
   */
  sort?: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for <code>include_fields</code>) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (<code>true</code>) or excluded (<code>false</code>)
   *
   */
  include_fields?: boolean;
  /**
   * Return results as an array when false (default). Return results inside an object that also contains a total result count when true.
   *
   */
  include_totals?: boolean;
  /**
   * Log Event Id from which to start selection from.
   *
   */
  from?: string;
  /**
   * Number of entries to retrieve when using the <code>from</code> parameter. Default <code>50</code>, max <code>100</code>
   *
   */
  take?: number;
  /**
   * Query in <a target='_new' href ='http://www.lucenetutorial.com/lucene-query-syntax.html'>Lucene query string syntax</a>.
   *
   */
  q?: string;
}
/**
 *
 */
export interface GetLogsByIdRequest {
  /**
   * log_id of the log to retrieve.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteEnabledConnectionsByConnectionIdRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * Connection identifier
   *
   */
  connectionId: string;
}
/**
 *
 */
export interface DeleteInvitationsByInvitationIdRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * The id of the user invitation.
   *
   */
  invitation_id: string;
}
/**
 *
 */
export interface DeleteMembersOperationRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteOrganizationMemberRolesOperationRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * User ID of the organization member to remove roles from.
   *
   */
  user_id: string;
}
/**
 *
 */
export interface DeleteOrganizationsByIdRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
}
/**
 *
 */
export interface GetEnabledConnectionsRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
}
/**
 *
 */
export interface GetEnabledConnectionsByConnectionIdRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * Connection identifier
   *
   */
  connectionId: string;
}
/**
 *
 */
export interface GetInvitationsRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  per_page?: number;
  /**
   * When true, return results inside an object that also contains the start and limit.  When false (default), a direct array of results is returned.  We do not yet support returning the total invitations count.
   *
   */
  include_totals?: boolean;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   *
   */
  include_fields?: boolean;
  /**
   * Field to sort by. Use field:order where order is 1 for ascending and -1 for descending Defaults to created_at:-1.
   *
   */
  sort?: string;
}
/**
 *
 */
export interface GetInvitationsByInvitationIdRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * The id of the user invitation.
   *
   */
  invitation_id: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface GetMembersRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional Id from which to start selection.
   *
   */
  from?: string;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  take?: number;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface GetNameByNameRequest {
  /**
   * name of the organization to retrieve.
   *
   */
  name: string;
}
/**
 *
 */
export interface GetOrganizationMemberRolesRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * ID of the user to associate roles with.
   *
   */
  user_id: string;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
}
/**
 *
 */
export interface GetOrganizationsRequest {
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional Id from which to start selection.
   *
   */
  from?: string;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  take?: number;
  /**
   * Field to sort by. Use <code>field:order</code> where order is <code>1</code> for ascending and <code>-1</code> for descending. e.g. <code>created_at:1</code>. We currently support sorting by the following fields: <code>name</code>, <code>display_name</code> and <code>created_at</code>.
   *
   */
  sort?: string;
}
/**
 *
 */
export interface GetOrganizationsByIdRequest {
  /**
   * ID of the organization to retrieve.
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchEnabledConnectionsByConnectionIdOperationRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * Connection identifier
   *
   */
  connectionId: string;
}
/**
 *
 */
export interface PatchOrganizationsByIdOperationRequest {
  /**
   * ID of the organization to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostEnabledConnectionsOperationRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
}
/**
 *
 */
export interface PostInvitationsOperationRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
}
/**
 *
 */
export interface PostMembersOperationRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
}
/**
 *
 */
export interface PostOrganizationMemberRolesOperationRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * ID of the user to associate roles with.
   *
   */
  user_id: string;
}

/**
 *
 */
export const GetCustomTextByLanguagePromptEnum = {
  login: 'login',
  login_id: 'login-id',
  login_password: 'login-password',
  login_passwordless: 'login-passwordless',
  login_email_verification: 'login-email-verification',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
  phone_identifier_enrollment: 'phone-identifier-enrollment',
  phone_identifier_challenge: 'phone-identifier-challenge',
  reset_password: 'reset-password',
  consent: 'consent',
  logout: 'logout',
  mfa_push: 'mfa-push',
  mfa_otp: 'mfa-otp',
  mfa_voice: 'mfa-voice',
  mfa_phone: 'mfa-phone',
  mfa_webauthn: 'mfa-webauthn',
  mfa_sms: 'mfa-sms',
  mfa_email: 'mfa-email',
  mfa_recovery_code: 'mfa-recovery-code',
  mfa: 'mfa',
  status: 'status',
  device_flow: 'device-flow',
  email_verification: 'email-verification',
  email_otp_challenge: 'email-otp-challenge',
  organizations: 'organizations',
  invitation: 'invitation',
  common: 'common',
  passkeys: 'passkeys',
} as const;
export type GetCustomTextByLanguagePromptEnum =
  (typeof GetCustomTextByLanguagePromptEnum)[keyof typeof GetCustomTextByLanguagePromptEnum];

/**
 *
 */
export const GetCustomTextByLanguageLanguageEnum = {
  ar: 'ar',
  bg: 'bg',
  bs: 'bs',
  ca_ES: 'ca-ES',
  cs: 'cs',
  cy: 'cy',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  es: 'es',
  et: 'et',
  eu_ES: 'eu-ES',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
  gl_ES: 'gl-ES',
  he: 'he',
  hi: 'hi',
  hr: 'hr',
  hu: 'hu',
  id: 'id',
  is: 'is',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  lt: 'lt',
  lv: 'lv',
  nb: 'nb',
  nl: 'nl',
  nn: 'nn',
  no: 'no',
  pl: 'pl',
  pt: 'pt',
  pt_BR: 'pt-BR',
  pt_PT: 'pt-PT',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  sr: 'sr',
  sv: 'sv',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
  vi: 'vi',
  zh_CN: 'zh-CN',
  zh_TW: 'zh-TW',
} as const;
export type GetCustomTextByLanguageLanguageEnum =
  (typeof GetCustomTextByLanguageLanguageEnum)[keyof typeof GetCustomTextByLanguageLanguageEnum];

/**
 *
 */
export interface GetCustomTextByLanguageRequest {
  /**
   * Name of the prompt.
   *
   */
  prompt: GetCustomTextByLanguagePromptEnum;
  /**
   * Language to update.
   *
   */
  language: GetCustomTextByLanguageLanguageEnum;
}

/**
 *
 */
export const GetPartialsPromptEnum = {
  login: 'login',
  login_id: 'login-id',
  login_password: 'login-password',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
} as const;
export type GetPartialsPromptEnum =
  (typeof GetPartialsPromptEnum)[keyof typeof GetPartialsPromptEnum];

/**
 *
 */
export interface GetPartialsRequest {
  /**
   * Name of the prompt.
   *
   */
  prompt: GetPartialsPromptEnum;
}

/**
 *
 */
export const PutCustomTextByLanguagePromptEnum = {
  login: 'login',
  login_id: 'login-id',
  login_password: 'login-password',
  login_passwordless: 'login-passwordless',
  login_email_verification: 'login-email-verification',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
  phone_identifier_enrollment: 'phone-identifier-enrollment',
  phone_identifier_challenge: 'phone-identifier-challenge',
  reset_password: 'reset-password',
  consent: 'consent',
  logout: 'logout',
  mfa_push: 'mfa-push',
  mfa_otp: 'mfa-otp',
  mfa_voice: 'mfa-voice',
  mfa_phone: 'mfa-phone',
  mfa_webauthn: 'mfa-webauthn',
  mfa_sms: 'mfa-sms',
  mfa_email: 'mfa-email',
  mfa_recovery_code: 'mfa-recovery-code',
  mfa: 'mfa',
  status: 'status',
  device_flow: 'device-flow',
  email_verification: 'email-verification',
  email_otp_challenge: 'email-otp-challenge',
  organizations: 'organizations',
  invitation: 'invitation',
  common: 'common',
  passkeys: 'passkeys',
} as const;
export type PutCustomTextByLanguagePromptEnum =
  (typeof PutCustomTextByLanguagePromptEnum)[keyof typeof PutCustomTextByLanguagePromptEnum];

/**
 *
 */
export const PutCustomTextByLanguageLanguageEnum = {
  ar: 'ar',
  bg: 'bg',
  bs: 'bs',
  ca_ES: 'ca-ES',
  cs: 'cs',
  cy: 'cy',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  es: 'es',
  et: 'et',
  eu_ES: 'eu-ES',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
  gl_ES: 'gl-ES',
  he: 'he',
  hi: 'hi',
  hr: 'hr',
  hu: 'hu',
  id: 'id',
  is: 'is',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  lt: 'lt',
  lv: 'lv',
  nb: 'nb',
  nl: 'nl',
  nn: 'nn',
  no: 'no',
  pl: 'pl',
  pt: 'pt',
  pt_BR: 'pt-BR',
  pt_PT: 'pt-PT',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  sr: 'sr',
  sv: 'sv',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
  vi: 'vi',
  zh_CN: 'zh-CN',
  zh_TW: 'zh-TW',
} as const;
export type PutCustomTextByLanguageLanguageEnum =
  (typeof PutCustomTextByLanguageLanguageEnum)[keyof typeof PutCustomTextByLanguageLanguageEnum];

/**
 *
 */
export interface PutCustomTextByLanguageRequest {
  /**
   * Name of the prompt.
   *
   */
  prompt: PutCustomTextByLanguagePromptEnum;
  /**
   * Language to update.
   *
   */
  language: PutCustomTextByLanguageLanguageEnum;
}
/**
 *
 */
export const PutPartialsPromptEnum = {
  login: 'login',
  login_id: 'login-id',
  login_password: 'login-password',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
} as const;
export type PutPartialsPromptEnum =
  (typeof PutPartialsPromptEnum)[keyof typeof PutPartialsPromptEnum];

/**
 *
 */
export interface PutPartialsRequest {
  /**
   * Name of the prompt.
   *
   */
  prompt: PutPartialsPromptEnum;
}
/**
 *
 */
export interface DeleteResourceServersByIdRequest {
  /**
   * ID or the audience of the resource server to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetResourceServersRequest {
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface GetResourceServersByIdRequest {
  /**
   * ID or audience of the resource server to retrieve.
   *
   */
  id: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface PatchResourceServersByIdRequest {
  /**
   * ID or audience of the resource server to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteRolePermissionAssignmentRequest {
  /**
   * ID of the role to remove permissions from.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteRolesByIdRequest {
  /**
   * ID of the role to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetRolePermissionRequest {
  /**
   * ID of the role to list granted permissions.
   *
   */
  id: string;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
}
/**
 *
 */
export interface GetRoleUserRequest {
  /**
   * ID of the role to retrieve a list of users associated with.
   *
   */
  id: string;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional Id from which to start selection.
   *
   */
  from?: string;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  take?: number;
}
/**
 *
 */
export interface GetRolesRequest {
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional filter on name (case-insensitive).
   *
   */
  name_filter?: string;
}
/**
 *
 */
export interface GetRolesByIdRequest {
  /**
   * ID of the role to retrieve.
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchRolesByIdRequest {
  /**
   * ID of the role to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostRolePermissionAssignmentOperationRequest {
  /**
   * ID of the role to add permissions to.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostRoleUsersOperationRequest {
  /**
   * ID of the role to assign users to.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteRulesByIdRequest {
  /**
   * ID of the rule to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetRulesRequest {
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional filter on whether a rule is enabled (true) or disabled (false).
   *
   */
  enabled?: boolean;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface GetRulesByIdRequest {
  /**
   * ID of the rule to retrieve.
   *
   */
  id: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface PatchRulesByIdRequest {
  /**
   * ID of the rule to retrieve.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteRulesConfigsByKeyRequest {
  /**
   * Key of the rules config variable to delete.
   *
   */
  key: string;
}
/**
 *
 */
export interface PutRulesConfigsByKeyOperationRequest {
  /**
   * Key of the rules config variable to set (max length: 127 characters).
   *
   */
  key: string;
}
/**
 *
 */
export interface GetDailyRequest {
  /**
   * Optional first day of the date range (inclusive) in YYYYMMDD format.
   *
   */
  from?: string;
  /**
   * Optional last day of the date range (inclusive) in YYYYMMDD format.
   *
   */
  to?: string;
}
/**
 *
 */
export interface TenantSettingsRouteRequest {
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface DeleteUserBlocksRequest {
  /**
   * Should be any of a username, phone number, or email.
   *
   */
  identifier: string;
}
/**
 *
 */
export interface DeleteUserBlocksByIdRequest {
  /**
   * The user_id of the user to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetUserBlocksRequest {
  /**
   * Should be any of a username, phone number, or email.
   *
   */
  identifier: string;
  /**
   *
   *           If true and Brute Force Protection is enabled and configured to block logins, will return a list of blocked IP addresses.
   *           If true and Brute Force Protection is disabled, will return an empty list.
   *
   *
   */
  consider_brute_force_enablement?: boolean;
}
/**
 *
 */
export interface GetUserBlocksByIdRequest {
  /**
   * user_id of the user blocks to retrieve.
   *
   */
  id: string;
  /**
   *
   *           If true and Brute Force Protection is enabled and configured to block logins, will return a list of blocked IP addresses.
   *           If true and Brute Force Protection is disabled, will return an empty list.
   *
   *
   */
  consider_brute_force_enablement?: boolean;
}
/**
 *
 */
export interface DeleteAuthenticationMethodsRequest {
  /**
   * The ID of the user in question.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteAuthenticationMethodsByAuthenticationMethodIdRequest {
  /**
   * The ID of the user in question.
   *
   */
  id: string;
  /**
   * The ID of the authentication method to delete.
   *
   */
  authentication_method_id: string;
}
/**
 *
 */
export interface DeleteAuthenticatorsRequest {
  /**
   * ID of the user to delete.
   *
   */
  id: string;
}

/**
 *
 */
export const DeleteMultifactorByProviderProviderEnum = {
  duo: 'duo',
  google_authenticator: 'google-authenticator',
} as const;
export type DeleteMultifactorByProviderProviderEnum =
  (typeof DeleteMultifactorByProviderProviderEnum)[keyof typeof DeleteMultifactorByProviderProviderEnum];

/**
 *
 */
export interface DeleteMultifactorByProviderRequest {
  /**
   * ID of the user to remove a multifactor configuration from.
   *
   */
  id: string;
  /**
   * The multi-factor provider. Supported values 'duo' or 'google-authenticator'
   *
   */
  provider: DeleteMultifactorByProviderProviderEnum;
}
/**
 *
 */
export interface DeletePermissionsOperationRequest {
  /**
   * ID of the user to remove permissions from.
   *
   */
  id: string;
}

/**
 *
 */
export const DeleteUserIdentityByUserIdProviderEnum = {
  ad: 'ad',
  adfs: 'adfs',
  amazon: 'amazon',
  apple: 'apple',
  dropbox: 'dropbox',
  bitbucket: 'bitbucket',
  aol: 'aol',
  auth0_oidc: 'auth0-oidc',
  auth0: 'auth0',
  baidu: 'baidu',
  bitly: 'bitly',
  box: 'box',
  custom: 'custom',
  daccount: 'daccount',
  dwolla: 'dwolla',
  email: 'email',
  evernote_sandbox: 'evernote-sandbox',
  evernote: 'evernote',
  exact: 'exact',
  facebook: 'facebook',
  fitbit: 'fitbit',
  flickr: 'flickr',
  github: 'github',
  google_apps: 'google-apps',
  google_oauth2: 'google-oauth2',
  instagram: 'instagram',
  ip: 'ip',
  line: 'line',
  linkedin: 'linkedin',
  miicard: 'miicard',
  oauth1: 'oauth1',
  oauth2: 'oauth2',
  office365: 'office365',
  oidc: 'oidc',
  okta: 'okta',
  paypal: 'paypal',
  paypal_sandbox: 'paypal-sandbox',
  pingfederate: 'pingfederate',
  planningcenter: 'planningcenter',
  renren: 'renren',
  salesforce_community: 'salesforce-community',
  salesforce_sandbox: 'salesforce-sandbox',
  salesforce: 'salesforce',
  samlp: 'samlp',
  sharepoint: 'sharepoint',
  shopify: 'shopify',
  sms: 'sms',
  soundcloud: 'soundcloud',
  thecity_sandbox: 'thecity-sandbox',
  thecity: 'thecity',
  thirtysevensignals: 'thirtysevensignals',
  twitter: 'twitter',
  untappd: 'untappd',
  vkontakte: 'vkontakte',
  waad: 'waad',
  weibo: 'weibo',
  windowslive: 'windowslive',
  wordpress: 'wordpress',
  yahoo: 'yahoo',
  yammer: 'yammer',
  yandex: 'yandex',
} as const;
export type DeleteUserIdentityByUserIdProviderEnum =
  (typeof DeleteUserIdentityByUserIdProviderEnum)[keyof typeof DeleteUserIdentityByUserIdProviderEnum];

/**
 *
 */
export interface DeleteUserIdentityByUserIdRequest {
  /**
   * ID of the primary user account.
   *
   */
  id: string;
  /**
   * Identity provider name of the secondary linked account (e.g. `google-oauth2`).
   *
   */
  provider: DeleteUserIdentityByUserIdProviderEnum;
  /**
   * ID of the secondary linked account (e.g. `123456789081523216417` part after the `|` in `google-oauth2|123456789081523216417`).
   *
   */
  user_id: string;
}
/**
 *
 */
export interface DeleteUserRolesOperationRequest {
  /**
   * ID of the user to remove roles from.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteUsersByIdRequest {
  /**
   * ID of the user to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetAuthenticationMethodsRequest {
  /**
   * The ID of the user in question.
   *
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0. Default is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Default is 50.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
}
/**
 *
 */
export interface GetAuthenticationMethodsByAuthenticationMethodIdRequest {
  /**
   * The ID of the user in question.
   *
   */
  id: string;
  /**
   * The ID of the authentication methods in question.
   *
   */
  authentication_method_id: string;
}
/**
 *
 */
export interface GetEnrollmentsRequest {
  /**
   * ID of the user to list enrollments for.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetLogsByUserRequest {
  /**
   * ID of the user of the logs to retrieve
   *
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page?: number;
  /**
   * Field to sort by. Use `fieldname:1` for ascending order and `fieldname:-1` for descending.
   *
   */
  sort?: string;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
}
/**
 *
 */
export interface GetPermissionsRequest {
  /**
   * ID of the user to retrieve the permissions for.
   *
   */
  id: string;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
}
/**
 *
 */
export interface GetUserOrganizationsRequest {
  /**
   * ID of the user to retrieve the organizations for.
   *
   */
  id: string;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
}
/**
 *
 */
export interface GetUserRolesRequest {
  /**
   * ID of the user to list roles for.
   *
   */
  id: string;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page?: number;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
}

/**
 *
 */
export const GetUsersSearchEngineEnum = {
  v1: 'v1',
  v2: 'v2',
  v3: 'v3',
} as const;
export type GetUsersSearchEngineEnum =
  (typeof GetUsersSearchEngineEnum)[keyof typeof GetUsersSearchEngineEnum];

/**
 *
 */
export interface GetUsersRequest {
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   *
   */
  per_page?: number;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Field to sort by. Use <code>field:order</code> where order is <code>1</code> for ascending and <code>-1</code> for descending. e.g. <code>created_at:1</code>
   *
   */
  sort?: string;
  /**
   * Connection filter. Only applies when using <code>search_engine=v1</code>. To filter by connection with <code>search_engine=v2|v3</code>, use <code>q=identities.connection:"connection_name"</code>
   *
   */
  connection?: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
  /**
   * Query in <a target='_new' href ='http://www.lucenetutorial.com/lucene-query-syntax.html'>Lucene query string syntax</a>. Some query types cannot be used on metadata fields, for details see <a href='https://manage.local.dev.auth0.com/docs/users/search/v3/query-syntax#searchable-fields'>Searchable Fields</a>.
   *
   */
  q?: string;
  /**
   * The version of the search engine
   *
   */
  search_engine?: GetUsersSearchEngineEnum;
}
/**
 *
 */
export interface GetUsersByIdRequest {
  /**
   * ID of the user to retrieve.
   *
   */
  id: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false).
   *
   */
  include_fields?: boolean;
}
/**
 *
 */
export interface PatchAuthenticationMethodsByAuthenticationMethodIdOperationRequest {
  /**
   * The ID of the user in question.
   *
   */
  id: string;
  /**
   * The ID of the authentication method to update.
   *
   */
  authentication_method_id: string;
}
/**
 *
 */
export interface PatchUsersByIdRequest {
  /**
   * ID of the user to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostAuthenticationMethodsOperationRequest {
  /**
   * The ID of the user to whom the new authentication method will be assigned.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostIdentitiesOperationRequest {
  /**
   * ID of the primary user account to link a second user account to.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostInvalidateRememberBrowserRequest {
  /**
   * ID of the user to invalidate all remembered browsers and authentication factors for.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostPermissionsOperationRequest {
  /**
   * ID of the user to assign permissions to.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostRecoveryCodeRegenerationRequest {
  /**
   * ID of the user to regenerate a multi-factor authentication recovery code for.
   *
   */
  id: string;
}
/**
 *
 */
export interface PostUserRolesOperationRequest {
  /**
   * ID of the user to associate roles with.
   *
   */
  id: string;
}
/**
 *
 */
export interface PutAuthenticationMethodsRequest {
  /**
   * The ID of the user in question.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetUsersByEmailRequest {
  /**
   * Email address to search for (case-sensitive).
   *
   */
  email: string;
  /**
   * Comma-separated list of fields to include or exclude (based on value provided for include_fields) in the result. Leave empty to retrieve all fields.
   *
   */
  fields?: string;
  /**
   * Whether specified fields are to be included (true) or excluded (false). Defaults to true.
   *
   */
  include_fields?: boolean;
}
