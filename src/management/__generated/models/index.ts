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
  native_social_login: any | null;
  /**
   */
  refresh_token: ClientRefreshToken | null;
  /**
   */
  default_organization: ClientDefaultOrganization | null;
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
  /**
   * Makes the use of Pushed Authorization Requests mandatory for this client
   *
   */
  require_pushed_authorization_requests: boolean;
  /**
   * Makes the use of Proof-of-Possession mandatory for this client
   *
   */
  require_proof_of_possession: boolean;
  /**
   */
  signed_request_object: ClientSignedRequestObject;
  /**
   * Defines the compliance level for this client, which may restrict it's capabilities
   *
   */
  compliance_level: ClientComplianceLevelEnum;
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

export const ClientComplianceLevelEnum = {
  none: 'none',
  fapi1_adv_pkj_par: 'fapi1_adv_pkj_par',
  fapi1_adv_mtls_par: 'fapi1_adv_mtls_par',
  null: 'null',
} as const;
export type ClientComplianceLevelEnum =
  (typeof ClientComplianceLevelEnum)[keyof typeof ClientComplianceLevelEnum];

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
  /**
   */
  tls_client_auth: ClientClientAuthenticationMethodsTlsClientAuth;
  /**
   */
  self_signed_tls_client_auth: ClientClientAuthenticationMethodsSelfSignedTlsClientAuth;
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
 * Defines `self_signed_tls_client_auth` client authentication method. If the property is defined, the client is configured to use mTLS authentication method utilizing self-signed certificate.
 */
export interface ClientClientAuthenticationMethodsSelfSignedTlsClientAuth {
  /**
   * A list of unique and previously created credential IDs enabled on the client for mTLS authentication utilizing self-signed certificate.
   *
   */
  credentials: Array<ClientClientAuthenticationMethodsPrivateKeyJwtCredentialsInner>;
}
/**
 * Defines `tls_client_auth` client authentication method. If the property is defined, the client is configured to use CA-based mTLS authentication method.
 */
export interface ClientClientAuthenticationMethodsTlsClientAuth {
  /**
   * A list of unique and previously created credential IDs enabled on the client for CA-based mTLS authentication.
   *
   */
  credentials: Array<ClientClientAuthenticationMethodsPrivateKeyJwtCredentialsInner>;
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
  /**
   * Makes the use of Pushed Authorization Requests mandatory for this client
   *
   */
  require_pushed_authorization_requests?: boolean;
  /**
   */
  signed_request_object?: ClientCreateSignedRequestObject;
  /**
   * Makes the use of Proof-of-Possession mandatory for this client
   *
   */
  require_proof_of_possession?: boolean;
  /**
   * Defines the compliance level for this client, which may restrict it's capabilities
   *
   */
  compliance_level?: ClientCreateComplianceLevelEnum;
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

export const ClientCreateComplianceLevelEnum = {
  none: 'none',
  fapi1_adv_pkj_par: 'fapi1_adv_pkj_par',
  fapi1_adv_mtls_par: 'fapi1_adv_mtls_par',
  null: 'null',
} as const;
export type ClientCreateComplianceLevelEnum =
  (typeof ClientCreateComplianceLevelEnum)[keyof typeof ClientCreateComplianceLevelEnum];

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
  rms?: ClientCreateAddonsRms;
  /**
   */
  mscrm?: ClientCreateAddonsMscrm;
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
 * Microsoft Dynamics CRM SSO configuration.
 */
export interface ClientCreateAddonsMscrm {
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
 * Active Directory Rights Management Service SSO configuration.
 */
export interface ClientCreateAddonsRms {
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
  /**
   */
  tls_client_auth?: ClientCreateClientAuthenticationMethodsTlsClientAuth;
  /**
   */
  self_signed_tls_client_auth?: ClientCreateClientAuthenticationMethodsSelfSignedTlsClientAuth;
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
 * Defines `self_signed_tls_client_auth` client authentication method. If the property is defined, the client is configured to use mTLS authentication method utilizing self-signed certificate.
 */
export interface ClientCreateClientAuthenticationMethodsSelfSignedTlsClientAuth {
  /**
   * Fully defined credentials that will be enabled on the client for mTLS authentication utilizing self-signed certificate.
   *
   */
  credentials: Array<ClientCreateClientAuthenticationMethodsSelfSignedTlsClientAuthCredentialsInner>;
}
/**
 *
 */
export interface ClientCreateClientAuthenticationMethodsSelfSignedTlsClientAuthCredentialsInner {
  /**
   */
  credential_type: ClientCreateClientAuthenticationMethodsSelfSignedTlsClientAuthCredentialsInnerCredentialTypeEnum;
  /**
   */
  name?: string;
  /**
   * PEM-formatted X509 certificate. Must be JSON escaped.
   *
   */
  pem: string;
}

export const ClientCreateClientAuthenticationMethodsSelfSignedTlsClientAuthCredentialsInnerCredentialTypeEnum =
  {
    x509_cert: 'x509_cert',
  } as const;
export type ClientCreateClientAuthenticationMethodsSelfSignedTlsClientAuthCredentialsInnerCredentialTypeEnum =
  (typeof ClientCreateClientAuthenticationMethodsSelfSignedTlsClientAuthCredentialsInnerCredentialTypeEnum)[keyof typeof ClientCreateClientAuthenticationMethodsSelfSignedTlsClientAuthCredentialsInnerCredentialTypeEnum];

/**
 * Defines `tls_client_auth` client authentication method. If the property is defined, the client is configured to use CA-based mTLS authentication method.
 */
export interface ClientCreateClientAuthenticationMethodsTlsClientAuth {
  /**
   * Fully defined credentials that will be enabled on the client for CA-based mTLS authentication.
   *
   */
  credentials: Array<ClientCreateClientAuthenticationMethodsTlsClientAuthCredentialsInner>;
}
/**
 *
 */
export interface ClientCreateClientAuthenticationMethodsTlsClientAuthCredentialsInner {
  /**
   */
  credential_type?: ClientCreateClientAuthenticationMethodsTlsClientAuthCredentialsInnerCredentialTypeEnum;
  /**
   */
  name?: string;
  /**
   * Subject Distinguished Name. Mutually exclusive with `pem` property.
   *
   */
  subject_dn?: string;
  /**
   * PEM-formatted X509 certificate. Must be JSON escaped. Mutually exclusive with `subject_dn` property.
   *
   */
  pem?: string;
}

export const ClientCreateClientAuthenticationMethodsTlsClientAuthCredentialsInnerCredentialTypeEnum =
  {
    cert_subject_dn: 'cert_subject_dn',
  } as const;
export type ClientCreateClientAuthenticationMethodsTlsClientAuthCredentialsInnerCredentialTypeEnum =
  (typeof ClientCreateClientAuthenticationMethodsTlsClientAuthCredentialsInnerCredentialTypeEnum)[keyof typeof ClientCreateClientAuthenticationMethodsTlsClientAuthCredentialsInnerCredentialTypeEnum];

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
 * JWT-secured Authorization Requests (JAR) settings.
 */
export interface ClientCreateSignedRequestObject {
  /**
   * Indicates whether the JAR requests are mandatory
   *
   */
  required?: boolean;
  /**
   */
  credentials?: Array<ClientCreateClientAuthenticationMethodsPrivateKeyJwtCredentialsInner>;
}
/**
 * Defines the default Organization ID and flows
 */
export interface ClientDefaultOrganization {
  /**
   * The default Organization ID to be used
   *
   */
  organization_id: string;
  /**
   * The default Organization usage
   *
   */
  flows: Array<ClientDefaultOrganizationFlowsEnum>;
}

export const ClientDefaultOrganizationFlowsEnum = {
  client_credentials: 'client_credentials',
} as const;
export type ClientDefaultOrganizationFlowsEnum =
  (typeof ClientDefaultOrganizationFlowsEnum)[keyof typeof ClientDefaultOrganizationFlowsEnum];

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
  /**
   * Defines whether organizations can be used with client credentials exchanges for this grant.
   *
   */
  organization_usage: ClientGrantOrganizationUsageEnum;
  /**
   * If enabled, any organization can be used with this grant. If disabled (default), the grant must be explicitly assigned to the desired organizations.
   *
   */
  allow_any_organization: boolean;
}

export const ClientGrantOrganizationUsageEnum = {
  deny: 'deny',
  allow: 'allow',
  require: 'require',
} as const;
export type ClientGrantOrganizationUsageEnum =
  (typeof ClientGrantOrganizationUsageEnum)[keyof typeof ClientGrantOrganizationUsageEnum];

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
   * Defines whether organizations can be used with client credentials exchanges for this grant.
   *
   */
  organization_usage?: ClientGrantCreateOrganizationUsageEnum;
  /**
   * If enabled, any organization can be used with this grant. If disabled (default), the grant must be explicitly assigned to the desired organizations.
   *
   */
  allow_any_organization?: boolean;
  /**
   * Scopes allowed for this client grant.
   *
   */
  scope: Array<string>;
}

export const ClientGrantCreateOrganizationUsageEnum = {
  deny: 'deny',
  allow: 'allow',
  require: 'require',
} as const;
export type ClientGrantCreateOrganizationUsageEnum =
  (typeof ClientGrantCreateOrganizationUsageEnum)[keyof typeof ClientGrantCreateOrganizationUsageEnum];

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
 * Configuration for OIDC backchannel logout
 */
export interface ClientOidcLogout {
  [key: string]: any | any;
  /**
   * Comma-separated list of URLs that are valid to call back from Auth0 for OIDC backchannel logout. Currently only one URL is allowed.
   *
   */
  backchannel_logout_urls: Array<string>;
  /**
   */
  backchannel_logout_initiators: ClientOidcLogoutBackchannelLogoutInitiators;
}
/**
 * Configuration for OIDC backchannel logout initiators
 */
export interface ClientOidcLogoutBackchannelLogoutInitiators {
  [key: string]: any | any;
  /**
   * The `mode` property determines the configuration method for enabling initiators. `custom` enables only the initiators listed in the selected_initiators array, `all` enables all current and future initiators.
   *
   */
  mode: ClientOidcLogoutBackchannelLogoutInitiatorsModeEnum;
  /**
   */
  selected_initiators: Array<ClientOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum>;
}

export const ClientOidcLogoutBackchannelLogoutInitiatorsModeEnum = {
  custom: 'custom',
  all: 'all',
} as const;
export type ClientOidcLogoutBackchannelLogoutInitiatorsModeEnum =
  (typeof ClientOidcLogoutBackchannelLogoutInitiatorsModeEnum)[keyof typeof ClientOidcLogoutBackchannelLogoutInitiatorsModeEnum];

export const ClientOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum = {
  rp_logout: 'rp-logout',
  idp_logout: 'idp-logout',
  password_changed: 'password-changed',
  session_expired: 'session-expired',
  session_revoked: 'session-revoked',
  account_deleted: 'account-deleted',
  email_identifier_changed: 'email-identifier-changed',
  mfa_phone_unenrolled: 'mfa-phone-unenrolled',
  account_deactivated: 'account-deactivated',
} as const;
export type ClientOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum =
  (typeof ClientOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum)[keyof typeof ClientOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum];

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
  /**
   * A collection of policies governing multi-resource refresh token exchange (MRRT), defining how refresh tokens can be used across different resource servers
   *
   */
  policies?: Array<ClientRefreshTokenPoliciesInner>;
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
export interface ClientRefreshTokenPoliciesInner {
  /**
   * The identifier of the resource server to which the Multi Resource Refresh Token Policy applies
   *
   */
  audience: string;
  /**
   * The resource server permissions granted under the Multi Resource Refresh Token Policy, defining the context in which an access token can be used
   *
   */
  scope: Array<string>;
}
/**
 * JWT-secured Authorization Requests (JAR) settings.
 */
export interface ClientSignedRequestObject {
  /**
   * Indicates whether the JAR requests are mandatory
   *
   */
  required: boolean;
  /**
   */
  credentials: Array<ClientClientAuthenticationMethodsPrivateKeyJwtCredentialsInner>;
}
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
  native_social_login?: ClientUpdateNativeSocialLogin | null;
  /**
   */
  refresh_token?: ClientRefreshToken | null;
  /**
   */
  default_organization?: ClientDefaultOrganization | null;
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
  /**
   * Makes the use of Pushed Authorization Requests mandatory for this client
   *
   */
  require_pushed_authorization_requests?: boolean;
  /**
   * Makes the use of Proof-of-Possession mandatory for this client
   *
   */
  require_proof_of_possession?: boolean;
  /**
   */
  signed_request_object?: ClientUpdateSignedRequestObject | null;
  /**
   * Defines the compliance level for this client, which may restrict it's capabilities
   *
   */
  compliance_level?: ClientUpdateComplianceLevelEnum;
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

export const ClientUpdateComplianceLevelEnum = {
  none: 'none',
  fapi1_adv_pkj_par: 'fapi1_adv_pkj_par',
  fapi1_adv_mtls_par: 'fapi1_adv_mtls_par',
  null: 'null',
} as const;
export type ClientUpdateComplianceLevelEnum =
  (typeof ClientUpdateComplianceLevelEnum)[keyof typeof ClientUpdateComplianceLevelEnum];

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
  salesforce?: ClientUpdateAddonsSalesforce;
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
  sap_api?: ClientUpdateAddonsSapApi;
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
 * Salesforce SSO configuration.
 */
export interface ClientUpdateAddonsSalesforce {
  [key: string]: any | any;
  /**
   * Arbitrary logical URL that identifies the Saleforce resource. e.g. `https://acme-org.com`.
   *
   */
  entity_id?: string;
}
/**
 * SAP API addon configuration.
 */
export interface ClientUpdateAddonsSapApi {
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
 * Defines client authentication methods.
 */
export interface ClientUpdateClientAuthenticationMethods {
  /**
   */
  private_key_jwt?: ClientClientAuthenticationMethodsPrivateKeyJwt;
  /**
   */
  tls_client_auth?: ClientClientAuthenticationMethodsTlsClientAuth;
  /**
   */
  self_signed_tls_client_auth?: ClientClientAuthenticationMethodsSelfSignedTlsClientAuth;
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
 * Configure native social settings
 */
export interface ClientUpdateNativeSocialLogin {
  /**
   */
  apple?: ClientCreateNativeSocialLoginApple | null;
  /**
   */
  facebook?: ClientCreateNativeSocialLoginFacebook | null;
  /**
   */
  google?: ClientUpdateNativeSocialLoginGoogle | null;
}
/**
 * Native Social Login support for the google-oauth2 connection
 */
export interface ClientUpdateNativeSocialLoginGoogle {
  /**
   * Determine whether or not to allow signing in natively using a Google ID token
   *
   */
  enabled?: boolean;
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
  /**
   */
  backchannel_logout_initiators?: ClientUpdateOidcLogoutBackchannelLogoutInitiators;
}
/**
 * Configuration for OIDC backchannel logout initiators
 */
export interface ClientUpdateOidcLogoutBackchannelLogoutInitiators {
  [key: string]: any | any;
  /**
   * The `mode` property determines the configuration method for enabling initiators. `custom` enables only the initiators listed in the selected_initiators array, `all` enables all current and future initiators.
   *
   */
  mode: ClientUpdateOidcLogoutBackchannelLogoutInitiatorsModeEnum;
  /**
   */
  selected_initiators?: Array<ClientUpdateOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum>;
}

export const ClientUpdateOidcLogoutBackchannelLogoutInitiatorsModeEnum = {
  custom: 'custom',
  all: 'all',
} as const;
export type ClientUpdateOidcLogoutBackchannelLogoutInitiatorsModeEnum =
  (typeof ClientUpdateOidcLogoutBackchannelLogoutInitiatorsModeEnum)[keyof typeof ClientUpdateOidcLogoutBackchannelLogoutInitiatorsModeEnum];

export const ClientUpdateOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum = {
  rp_logout: 'rp-logout',
  idp_logout: 'idp-logout',
  password_changed: 'password-changed',
  session_expired: 'session-expired',
  session_revoked: 'session-revoked',
  account_deleted: 'account-deleted',
  email_identifier_changed: 'email-identifier-changed',
  mfa_phone_unenrolled: 'mfa-phone-unenrolled',
  account_deactivated: 'account-deactivated',
} as const;
export type ClientUpdateOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum =
  (typeof ClientUpdateOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum)[keyof typeof ClientUpdateOidcLogoutBackchannelLogoutInitiatorsSelectedInitiatorsEnum];

/**
 * JWT-secured Authorization Requests (JAR) settings.
 */
export interface ClientUpdateSignedRequestObject {
  /**
   * Indicates whether the JAR requests are mandatory
   *
   */
  required?: boolean;
  /**
   */
  credentials?: Array<ClientClientAuthenticationMethodsPrivateKeyJwtCredentialsInner>;
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
   * The ids of the clients for which the connection is enabled
   *
   */
  enabled_clients: Array<string>;
  /**
   * True if the connection is domain level
   *
   */
  is_domain_connection: boolean;
  /**
   * Enables showing a button for the connection in the login page (new experience only). If false, it will be usable only by HRD.
   *
   */
  show_as_button: boolean;
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
   * Enables showing a button for the connection in the login page (new experience only). If false, it will be usable only by HRD. (Defaults to <code>false</code>.)
   *
   */
  show_as_button?: boolean;
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
export interface ConnectionForList {
  /**
   * The name of the connection
   *
   */
  name?: string;
  /**
   * Connection name used in login screen
   *
   */
  display_name?: string;
  /**
   * In order to return options in the response, the `read:connections_options` scope must be present
   *
   */
  options?: { [key: string]: any };
  /**
   * The connection's identifier
   *
   */
  id?: string;
  /**
   * The type of the connection, related to the identity provider
   *
   */
  strategy?: string;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm.
   *
   */
  realms?: Array<string>;
  /**
   * True if the connection is domain level
   *
   */
  is_domain_connection?: boolean;
  /**
   * Enables showing a button for the connection in the login page (new experience only). If false, it will be usable only by HRD.
   *
   */
  show_as_button?: boolean;
  /**
   * Metadata associated with the connection in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   *
   */
  metadata?: { [key: string]: any };
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
   * Enables showing a button for the connection in the login page (new experience only). If false, it will be usable only by HRD. (Defaults to <code>false</code>.)
   *
   */
  show_as_button?: boolean;
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
 * Phone provider configuration schema
 */
export interface CreatePhoneProviderRequest {
  [key: string]: any | any;
  /**
   * Name of the phone notification provider
   *
   */
  name: CreatePhoneProviderRequestNameEnum;
  /**
   * Whether the provider is enabled (false) or disabled (true).
   *
   */
  disabled?: boolean;
  /**
   */
  configuration?: GetBrandingPhoneProviders200ResponseProvidersInnerConfiguration;
  /**
   */
  credentials: CreatePhoneProviderRequestCredentials;
}

export const CreatePhoneProviderRequestNameEnum = {
  twilio: 'twilio',
  custom: 'custom',
} as const;
export type CreatePhoneProviderRequestNameEnum =
  (typeof CreatePhoneProviderRequestNameEnum)[keyof typeof CreatePhoneProviderRequestNameEnum];

/**
 * Provider credentials required to use authenticate to the provider.
 */
export type CreatePhoneProviderRequestCredentials =
  | CreatePhoneProviderRequestCredentialsAnyOf
  | object;
/**
 *
 */
export interface CreatePhoneProviderRequestCredentialsAnyOf {
  /**
   */
  auth_token: string;
}
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
   * Name of the email provider. Can be `mailgun`, `mandrill`, `sendgrid`, `ses`, `sparkpost`, `smtp`, `azure_cs`, or `ms365`, or `custom`.
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
   * Name of the email provider. Can be `mailgun`, `mandrill`, `sendgrid`, `ses`, `sparkpost`, `smtp`, `azure_cs`, or `ms365`, or `custom`.
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
  custom: 'custom',
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
   * Name of the email provider. Can be `mailgun`, `mandrill`, `sendgrid`, `ses`, `sparkpost`, `smtp`, `azure_cs`, `ms365`, or `custom`.
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
  custom: 'custom',
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
 * An actions extensibility point. Acceptable values: <code>post-login, credentials-exchange, pre-user-registration, post-user-registration, post-change-password, send-phone-message, custom-email-provider, password-reset-post-challenge</code>
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
  custom_email_provider: 'custom-email-provider',
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
export interface GetBrandingPhoneProviders200Response {
  /**
   */
  providers: Array<GetBrandingPhoneProviders200ResponseProvidersInner>;
}
/**
 * Phone provider configuration schema
 */
export interface GetBrandingPhoneProviders200ResponseProvidersInner {
  /**
   */
  id?: string;
  /**
   * The name of the tenant
   *
   */
  tenant?: string;
  /**
   * Name of the phone notification provider
   *
   */
  name: GetBrandingPhoneProviders200ResponseProvidersInnerNameEnum;
  /**
   * This depicts the type of notifications this provider can receive.
   *
   */
  channel?: GetBrandingPhoneProviders200ResponseProvidersInnerChannelEnum;
  /**
   * Whether the provider is enabled (false) or disabled (true).
   *
   */
  disabled?: boolean;
  /**
   */
  configuration?: GetBrandingPhoneProviders200ResponseProvidersInnerConfiguration;
  /**
   * The provider's creation date and time in ISO 8601 format
   *
   */
  created_at?: string;
  /**
   * The date and time of the last update to the provider in ISO 8601 format
   *
   */
  updated_at?: string;
}

export const GetBrandingPhoneProviders200ResponseProvidersInnerNameEnum = {
  twilio: 'twilio',
  custom: 'custom',
} as const;
export type GetBrandingPhoneProviders200ResponseProvidersInnerNameEnum =
  (typeof GetBrandingPhoneProviders200ResponseProvidersInnerNameEnum)[keyof typeof GetBrandingPhoneProviders200ResponseProvidersInnerNameEnum];

export const GetBrandingPhoneProviders200ResponseProvidersInnerChannelEnum = {
  phone: 'phone',
} as const;
export type GetBrandingPhoneProviders200ResponseProvidersInnerChannelEnum =
  (typeof GetBrandingPhoneProviders200ResponseProvidersInnerChannelEnum)[keyof typeof GetBrandingPhoneProviders200ResponseProvidersInnerChannelEnum];

/**
 *
 */
export type GetBrandingPhoneProviders200ResponseProvidersInnerConfiguration =
  | GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf
  | GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf1;
/**
 *
 */
export interface GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf {
  /**
   */
  default_from?: string;
  /**
   */
  mssid?: string;
  /**
   */
  sid: string;
  /**
   */
  delivery_methods: Array<GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOfDeliveryMethodsEnum>;
}

export const GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOfDeliveryMethodsEnum =
  {
    text: 'text',
    voice: 'voice',
  } as const;
export type GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOfDeliveryMethodsEnum =
  (typeof GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOfDeliveryMethodsEnum)[keyof typeof GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOfDeliveryMethodsEnum];

/**
 *
 */
export interface GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf1 {
  /**
   */
  delivery_methods: Array<GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf1DeliveryMethodsEnum>;
}

export const GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf1DeliveryMethodsEnum =
  {
    text: 'text',
    voice: 'voice',
  } as const;
export type GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf1DeliveryMethodsEnum =
  (typeof GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf1DeliveryMethodsEnum)[keyof typeof GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf1DeliveryMethodsEnum];

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
  /**
   */
  'pre-change-password': GetBreachedPasswordDetection200ResponseStagePreChangePassword;
}
/**
 *
 */
export interface GetBreachedPasswordDetection200ResponseStagePreChangePassword {
  /**
   * Action to take when a breached password is detected during a password reset.
   *               Possible values: <code>block</code>, <code>admin_notification</code>.
   *
   */
  shields: Array<GetBreachedPasswordDetection200ResponseStagePreChangePasswordShieldsEnum>;
}

export const GetBreachedPasswordDetection200ResponseStagePreChangePasswordShieldsEnum = {
  block: 'block',
  admin_notification: 'admin_notification',
} as const;
export type GetBreachedPasswordDetection200ResponseStagePreChangePasswordShieldsEnum =
  (typeof GetBreachedPasswordDetection200ResponseStagePreChangePasswordShieldsEnum)[keyof typeof GetBreachedPasswordDetection200ResponseStagePreChangePasswordShieldsEnum];

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
export type GetClients200Response =
  | Array<Client>
  | GetClients200ResponseOneOf
  | GetClients200ResponseOneOf1;
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
export interface GetClients200ResponseOneOf1 {
  /**
   * Opaque identifier for use with the <i>from</i> query parameter for the next page of results.<br/>This identifier is valid for 24 hours.
   *
   */
  next: string;
  /**
   */
  clients: Array<Client>;
}
/**
 *
 */
export type GetConnections200Response = Array<ConnectionForList> | GetConnections200ResponseOneOf;
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
  connections: Array<ConnectionForList>;
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
   * The X509 certificate's Subject Distinguished Name
   *
   */
  subject_dn: string;
  /**
   * The X509 certificate's SHA256 thumbprint
   *
   */
  thumbprint_sha256: string;
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
export type GetCustomDomains200Response = Array<CustomDomain> | GetCustomDomains200ResponseOneOf;
/**
 *
 */
export interface GetCustomDomains200ResponseOneOf {
  /**
   */
  custom_domains: Array<CustomDomain>;
  /**
   * A cursor to be used as the "from" query parameter for the next page of results.
   *
   */
  next?: string;
}
/**
 *
 */
export interface GetDefaultMapping200Response {
  /**
   * The mapping between auth0 and SCIM
   *
   */
  mapping: Array<GetScimConfiguration200ResponseMappingInner>;
}
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
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
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
  reset_email_by_code: 'reset_email_by_code',
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
   * Determines whether a connection should be displayed on this organization’s login prompt. Only applicable for enterprise connections. Default: true.
   *
   */
  show_as_button: boolean;
  /**
   * Determines whether organization signup should be enabled for this organization connection. Only applicable for database connections. Default: false.
   *
   */
  is_signup_enabled: boolean;
  /**
   */
  connection: PostOrganizations201ResponseEnabledConnectionsInnerConnection;
}
/**
 *
 */
export type GetEncryptionKeys200Response =
  | Array<GetEncryptionKeys200ResponseOneOfInner>
  | GetEncryptionKeys200ResponseOneOf;
/**
 *
 */
export interface GetEncryptionKeys200ResponseOneOf {
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  start: number;
  /**
   * Number of results per page.
   *
   */
  limit: number;
  /**
   * Total amount of encryption keys.
   *
   */
  total: number;
  /**
   * Encryption keys.
   *
   */
  keys: Array<GetEncryptionKeys200ResponseOneOfInner>;
}
/**
 * Encryption key
 */
export interface GetEncryptionKeys200ResponseOneOfInner {
  /**
   * Key ID
   *
   */
  kid: string;
  /**
   * Key type
   *
   */
  type: GetEncryptionKeys200ResponseOneOfInnerTypeEnum;
  /**
   * Key state
   *
   */
  state: GetEncryptionKeys200ResponseOneOfInnerStateEnum;
  /**
   * Key creation timestamp
   *
   */
  created_at: string;
  /**
   * Key update timestamp
   *
   */
  updated_at: string;
  /**
   * ID of parent wrapping key
   *
   */
  parent_kid: string;
  /**
   * Public key in PEM format
   *
   */
  public_key?: string;
}

export const GetEncryptionKeys200ResponseOneOfInnerTypeEnum = {
  customer_provided_root_key: 'customer-provided-root-key',
  environment_root_key: 'environment-root-key',
  tenant_master_key: 'tenant-master-key',
  tenant_encryption_key: 'tenant-encryption-key',
} as const;
export type GetEncryptionKeys200ResponseOneOfInnerTypeEnum =
  (typeof GetEncryptionKeys200ResponseOneOfInnerTypeEnum)[keyof typeof GetEncryptionKeys200ResponseOneOfInnerTypeEnum];

export const GetEncryptionKeys200ResponseOneOfInnerStateEnum = {
  pre_activation: 'pre-activation',
  active: 'active',
  deactivated: 'deactivated',
  destroyed: 'destroyed',
} as const;
export type GetEncryptionKeys200ResponseOneOfInnerStateEnum =
  (typeof GetEncryptionKeys200ResponseOneOfInnerStateEnum)[keyof typeof GetEncryptionKeys200ResponseOneOfInnerStateEnum];

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
export interface GetFederatedConnectionsTokensets200ResponseInner {
  [key: string]: any | any;
  /**
   */
  id: string;
  /**
   */
  connection: string;
  /**
   */
  scope: string;
  /**
   */
  expires_at: string;
  /**
   */
  issued_at: string;
  /**
   */
  last_used_at: string;
}
/**
 *
 */
export type GetFlows200Response = Array<GetFlows200ResponseOneOfInner> | GetFlows200ResponseOneOf;
/**
 *
 */
export interface GetFlows200ResponseOneOf {
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
  flows: Array<GetFlows200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetFlows200ResponseOneOfInner {
  /**
   */
  id: string;
  /**
   */
  name: string;
  /**
   */
  created_at: string;
  /**
   */
  updated_at: string;
  /**
   */
  executed_at?: string;
}
/**
 *
 */
export type GetFlowsExecutions200Response =
  | Array<GetFlowsExecutions200ResponseOneOfInner>
  | GetFlowsExecutions200ResponseOneOf;
/**
 *
 */
export interface GetFlowsExecutions200ResponseOneOf {
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
  executions: Array<GetFlowsExecutions200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetFlowsExecutions200ResponseOneOfInner {
  /**
   * Flow execution identifier
   *
   */
  id: string;
  /**
   * Trace id
   *
   */
  trace_id: string;
  /**
   * Journey id
   *
   */
  journey_id?: string;
  /**
   * Execution status
   *
   */
  status: string;
  /**
   * The ISO 8601 formatted date when this flow execution was created.
   *
   */
  created_at: string;
  /**
   * The ISO 8601 formatted date when this flow execution was updated.
   *
   */
  updated_at: string;
  /**
   * The ISO 8601 formatted date when this flow execution started.
   *
   */
  started_at?: string;
  /**
   * The ISO 8601 formatted date when this flow execution ended.
   *
   */
  ended_at?: string;
}
/**
 *
 */
export interface GetFlowsExecutionsByExecutionId200Response {
  /**
   * Flow execution identifier
   *
   */
  id: string;
  /**
   * Trace id
   *
   */
  trace_id: string;
  /**
   * Journey id
   *
   */
  journey_id?: string;
  /**
   * Execution status
   *
   */
  status: string;
  /**
   * Flow execution debug.
   *
   */
  debug?: { [key: string]: any };
  /**
   * The ISO 8601 formatted date when this flow execution was created.
   *
   */
  created_at: string;
  /**
   * The ISO 8601 formatted date when this flow execution was updated.
   *
   */
  updated_at: string;
  /**
   * The ISO 8601 formatted date when this flow execution started.
   *
   */
  started_at?: string;
  /**
   * The ISO 8601 formatted date when this flow execution ended.
   *
   */
  ended_at?: string;
}
/**
 *
 */
export type GetFlowsVaultConnections200Response =
  | Array<GetFlowsVaultConnections200ResponseOneOfInner>
  | GetFlowsVaultConnections200ResponseOneOf;
/**
 *
 */
export interface GetFlowsVaultConnections200ResponseOneOf {
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
  connections: Array<GetFlowsVaultConnections200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetFlowsVaultConnections200ResponseOneOfInner {
  /**
   * Flows Vault Connection identifier.
   *
   */
  id: string;
  /**
   * Flows Vault Connection app identifier.
   *
   */
  app_id: string;
  /**
   * Flows Vault Connection name.
   *
   */
  name: string;
  /**
   * Flows Vault Connection custom account name.
   *
   */
  account_name?: string;
  /**
   * Whether the Flows Vault Connection is configured.
   *
   */
  ready: boolean;
  /**
   * The ISO 8601 formatted date when this Flows Vault Connection was created.
   *
   */
  created_at: string;
  /**
   * The ISO 8601 formatted date when this Flows Vault Connection was updated.
   *
   */
  updated_at: string;
  /**
   * The ISO 8601 formatted date when this Flows Vault Connection was refreshed.
   *
   */
  refreshed_at?: string;
  /**
   */
  fingerprint: string;
}
/**
 *
 */
export type GetForms200Response = Array<GetForms200ResponseOneOfInner> | GetForms200ResponseOneOf;
/**
 *
 */
export interface GetForms200ResponseOneOf {
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
  forms: Array<GetForms200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetForms200ResponseOneOfInner {
  /**
   */
  id: string;
  /**
   */
  name: string;
  /**
   */
  created_at: string;
  /**
   */
  updated_at: string;
  /**
   */
  embedded_at?: string;
  /**
   */
  submitted_at?: string;
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
export type GetNetworkAcls200Response =
  | Array<GetNetworkAclsById200Response>
  | GetNetworkAcls200ResponseOneOf;
/**
 *
 */
export interface GetNetworkAcls200ResponseOneOf {
  /**
   */
  network_acls: Array<GetNetworkAclsById200Response>;
  /**
   */
  start: number;
  /**
   */
  limit: number;
  /**
   */
  total: number;
}
/**
 *
 */
export interface GetNetworkAclsById200Response {
  [key: string]: any | any;
  /**
   */
  id: string;
  /**
   */
  description: string;
  /**
   */
  active: boolean;
  /**
   */
  priority: number;
  /**
   */
  rule: GetNetworkAclsById200ResponseRule;
  /**
   * The timestamp when the Network ACL Configuration was last updated
   *
   */
  created_at: string;
  /**
   * The timestamp when the Network ACL Configuration was last updated
   *
   */
  updated_at: string;
}
/**
 *
 */
export type GetNetworkAclsById200ResponseRule =
  | GetNetworkAclsById200ResponseRuleAnyOf
  | GetNetworkAclsById200ResponseRuleAnyOf1;
/**
 *
 */
export interface GetNetworkAclsById200ResponseRuleAnyOf {
  [key: string]: any | any;
  /**
   */
  action: GetNetworkAclsById200ResponseRuleAnyOfAction;
  /**
   */
  match: GetNetworkAclsById200ResponseRuleAnyOfMatch;
  /**
   */
  not_match?: GetNetworkAclsById200ResponseRuleAnyOfMatch;
  /**
   */
  scope: GetNetworkAclsById200ResponseRuleAnyOfScopeEnum;
}

export const GetNetworkAclsById200ResponseRuleAnyOfScopeEnum = {
  management: 'management',
  authentication: 'authentication',
  tenant: 'tenant',
} as const;
export type GetNetworkAclsById200ResponseRuleAnyOfScopeEnum =
  (typeof GetNetworkAclsById200ResponseRuleAnyOfScopeEnum)[keyof typeof GetNetworkAclsById200ResponseRuleAnyOfScopeEnum];

/**
 *
 */
export interface GetNetworkAclsById200ResponseRuleAnyOf1 {
  [key: string]: any | any;
  /**
   */
  action: GetNetworkAclsById200ResponseRuleAnyOfAction;
  /**
   */
  match?: GetNetworkAclsById200ResponseRuleAnyOfMatch;
  /**
   */
  not_match: GetNetworkAclsById200ResponseRuleAnyOfMatch;
  /**
   */
  scope: GetNetworkAclsById200ResponseRuleAnyOf1ScopeEnum;
}

export const GetNetworkAclsById200ResponseRuleAnyOf1ScopeEnum = {
  management: 'management',
  authentication: 'authentication',
  tenant: 'tenant',
} as const;
export type GetNetworkAclsById200ResponseRuleAnyOf1ScopeEnum =
  (typeof GetNetworkAclsById200ResponseRuleAnyOf1ScopeEnum)[keyof typeof GetNetworkAclsById200ResponseRuleAnyOf1ScopeEnum];

/**
 *
 */
export type GetNetworkAclsById200ResponseRuleAnyOfAction =
  | GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf
  | GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf1
  | GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf2
  | GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf3;
/**
 *
 */
export interface GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf {
  /**
   */
  block: GetNetworkAclsById200ResponseRuleAnyOfActionAnyOfBlockEnum;
}

export const GetNetworkAclsById200ResponseRuleAnyOfActionAnyOfBlockEnum = {
  true: true,
} as const;
export type GetNetworkAclsById200ResponseRuleAnyOfActionAnyOfBlockEnum =
  (typeof GetNetworkAclsById200ResponseRuleAnyOfActionAnyOfBlockEnum)[keyof typeof GetNetworkAclsById200ResponseRuleAnyOfActionAnyOfBlockEnum];

/**
 *
 */
export interface GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf1 {
  /**
   */
  allow: GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf1AllowEnum;
}

export const GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf1AllowEnum = {
  true: true,
} as const;
export type GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf1AllowEnum =
  (typeof GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf1AllowEnum)[keyof typeof GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf1AllowEnum];

/**
 *
 */
export interface GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf2 {
  /**
   */
  log: GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf2LogEnum;
}

export const GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf2LogEnum = {
  true: true,
} as const;
export type GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf2LogEnum =
  (typeof GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf2LogEnum)[keyof typeof GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf2LogEnum];

/**
 *
 */
export interface GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf3 {
  /**
   */
  redirect: GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf3RedirectEnum;
  /**
   */
  redirect_uri: string;
}

export const GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf3RedirectEnum = {
  true: true,
} as const;
export type GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf3RedirectEnum =
  (typeof GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf3RedirectEnum)[keyof typeof GetNetworkAclsById200ResponseRuleAnyOfActionAnyOf3RedirectEnum];

/**
 *
 */
export interface GetNetworkAclsById200ResponseRuleAnyOfMatch {
  /**
   * Anonymous Proxy as reported by GeoIP
   *
   */
  anonymous_proxy?: boolean;
  /**
   */
  asns?: Array<number>;
  /**
   */
  geo_country_codes?: Array<string>;
  /**
   */
  geo_subdivision_codes?: Array<string>;
  /**
   */
  ipv4_cidrs?: Array<GetNetworkAclsById200ResponseRuleAnyOfMatchIpv4CidrsInner>;
  /**
   */
  ipv6_cidrs?: Array<GetNetworkAclsById200ResponseRuleAnyOfMatchIpv6CidrsInner>;
  /**
   */
  ja3_fingerprints?: Array<string>;
  /**
   */
  ja4_fingerprints?: Array<string>;
  /**
   */
  user_agents?: Array<string>;
}
/**
 *
 */
export type GetNetworkAclsById200ResponseRuleAnyOfMatchIpv4CidrsInner = string;
/**
 *
 */
export type GetNetworkAclsById200ResponseRuleAnyOfMatchIpv6CidrsInner = string;
/**
 *
 */
export type GetOrganizationClientGrants200Response =
  | Array<GetOrganizationClientGrants200ResponseOneOfInner>
  | GetOrganizationClientGrants200ResponseOneOf;
/**
 *
 */
export interface GetOrganizationClientGrants200ResponseOneOf {
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
  client_grants: Array<GetOrganizationClientGrants200ResponseOneOfInner>;
}
/**
 *
 */
export interface GetOrganizationClientGrants200ResponseOneOfInner {
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
export interface GetRefreshToken200Response {
  [key: string]: any | any;
  /**
   * The ID of the refresh token
   *
   */
  id: string;
  /**
   * ID of the user which can be used when interacting with other APIs.
   *
   */
  user_id: string;
  /**
   */
  created_at: GetRefreshToken200ResponseCreatedAt | null;
  /**
   */
  idle_expires_at: GetRefreshToken200ResponseIdleExpiresAt | null;
  /**
   */
  expires_at: GetRefreshToken200ResponseExpiresAt | null;
  /**
   * ID of the client application granted with this refresh token
   *
   */
  client_id: string;
  /**
   * ID of the authenticated session used to obtain this refresh-token
   *
   */
  session_id: string | null;
  /**
   * True if the token is a rotating refresh token
   *
   */
  rotating: boolean;
  /**
   * A list of the resource server IDs associated to this refresh-token and their granted scopes
   *
   */
  resource_servers: Array<GetRefreshToken200ResponseResourceServersInner>;
}
/**
 *
 */
export type GetRefreshToken200ResponseCreatedAt = string | { [key: string]: any };
/**
 *
 */
export type GetRefreshToken200ResponseExpiresAt = string | { [key: string]: any };
/**
 *
 */
export type GetRefreshToken200ResponseIdleExpiresAt = string | { [key: string]: any };
/**
 *
 */
export interface GetRefreshToken200ResponseResourceServersInner {
  [key: string]: any | any;
  /**
   * Resource server ID
   *
   */
  audience: string;
  /**
   * List of scopes for the refresh token
   *
   */
  scopes: string;
}
/**
 *
 */
export interface GetRefreshTokensForUser200Response {
  [key: string]: any | any;
  /**
   */
  sessions: Array<GetRefreshTokensForUser200ResponseSessionsInner>;
}
/**
 *
 */
export interface GetRefreshTokensForUser200ResponseSessionsInner {
  [key: string]: any | any;
  /**
   * The ID of the refresh token
   *
   */
  id: string;
  /**
   * ID of the user which can be used when interacting with other APIs.
   *
   */
  user_id: string;
  /**
   */
  created_at: GetRefreshTokensForUser200ResponseSessionsInnerCreatedAt;
  /**
   */
  idle_expires_at: GetRefreshTokensForUser200ResponseSessionsInnerIdleExpiresAt;
  /**
   */
  expires_at: GetRefreshTokensForUser200ResponseSessionsInnerExpiresAt;
  /**
   * ID of the client application granted with this refresh token
   *
   */
  client_id: string;
  /**
   * ID of the authenticated session used to obtain this refresh-token
   *
   */
  session_id: string;
  /**
   * True if the token is a rotating refresh token
   *
   */
  rotating: boolean;
  /**
   * A list of the resource server IDs associated to this refresh-token and their granted scopes
   *
   */
  resource_servers: Array<GetRefreshToken200ResponseResourceServersInner>;
}
/**
 *
 */
export type GetRefreshTokensForUser200ResponseSessionsInnerCreatedAt =
  | string
  | { [key: string]: any };
/**
 *
 */
export type GetRefreshTokensForUser200ResponseSessionsInnerExpiresAt =
  | string
  | { [key: string]: any };
/**
 *
 */
export type GetRefreshTokensForUser200ResponseSessionsInnerIdleExpiresAt =
  | string
  | { [key: string]: any };
/**
 *
 */
export interface GetRendering200Response {
  [key: string]: any | any;
  /**
   * Tenant ID
   *
   */
  tenant: string;
  /**
   * Name of the prompt
   *
   */
  prompt: string;
  /**
   * Name of the screen
   *
   */
  screen: string;
  /**
   * Rendering mode
   *
   */
  rendering_mode: GetRendering200ResponseRenderingModeEnum;
  /**
   * Context values to make available
   *
   */
  context_configuration: Array<string>;
  /**
   * Override Universal Login default head tags
   *
   */
  default_head_tags_disabled: boolean;
  /**
   * An array of head tags
   *
   */
  head_tags: Array<GetRendering200ResponseHeadTagsInner>;
}

export const GetRendering200ResponseRenderingModeEnum = {
  advanced: 'advanced',
  standard: 'standard',
} as const;
export type GetRendering200ResponseRenderingModeEnum =
  (typeof GetRendering200ResponseRenderingModeEnum)[keyof typeof GetRendering200ResponseRenderingModeEnum];

/**
 *
 */
export interface GetRendering200ResponseHeadTagsInner {
  [key: string]: any | any;
  /**
   * Any HTML element valid for use in the head tag
   *
   */
  tag: string;
  /**
   */
  attributes: GetRendering200ResponseHeadTagsInnerAttributes;
  /**
   * Text/content within the opening and closing tags of the element.
   * See <a href="https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/configure-acul-screens">documentation</a> on using context variables
   *
   */
  content: string;
}
/**
 * Attributes of the HTML tag
 */
export interface GetRendering200ResponseHeadTagsInnerAttributes {
  [key: string]: any | any;
  /**
   */
  integrity: Array<string>;
}
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
export interface GetScimConfiguration200Response {
  /**
   * The connection's identifier
   *
   */
  connection_id: string;
  /**
   * The connection's identifier
   *
   */
  connection_name: string;
  /**
   * The connection's strategy
   *
   */
  strategy: string;
  /**
   * The tenant's name
   *
   */
  tenant_name: string;
  /**
   * User ID attribute for generating unique user ids
   *
   */
  user_id_attribute: string;
  /**
   * The mapping between auth0 and SCIM
   *
   */
  mapping: Array<GetScimConfiguration200ResponseMappingInner>;
  /**
   * The Date Time Scim Configuration was created
   *
   */
  created_at: string;
  /**
   * The Date Time Scim Configuration was last updated
   *
   */
  updated_on: string;
}
/**
 *
 */
export interface GetScimConfiguration200ResponseMappingInner {
  [key: string]: any | any;
  /**
   * The field location in the auth0 schema
   *
   */
  auth0: string;
  /**
   * The field location in the SCIM schema
   *
   */
  scim: string;
}
/**
 *
 */
export interface GetScimTokens200ResponseInner {
  [key: string]: any | any;
  /**
   * The token's identifier
   *
   */
  token_id: string;
  /**
   * The scopes of the scim token
   *
   */
  scopes: Array<string>;
  /**
   * The token's created at timestamp
   *
   */
  created_at: string;
  /**
   * The token's valid until timestamp
   *
   */
  valid_until: string;
  /**
   * The token's last used at timestamp
   *
   */
  last_used_at: string;
}
/**
 *
 */
export type GetSelfServiceProfiles200Response =
  | Array<SsProfile>
  | GetSelfServiceProfiles200ResponseOneOf;
/**
 *
 */
export interface GetSelfServiceProfiles200ResponseOneOf {
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
  self_service_profiles: Array<SsProfile>;
}
/**
 *
 */
export interface GetSession200Response {
  [key: string]: any | any;
  /**
   * The ID of the session
   *
   */
  id: string;
  /**
   * ID of the user which can be used when interacting with other APIs.
   *
   */
  user_id: string;
  /**
   */
  created_at: GetSession200ResponseCreatedAt | null;
  /**
   */
  updated_at: GetSession200ResponseUpdatedAt | null;
  /**
   */
  authenticated_at: GetSession200ResponseAuthenticatedAt | null;
  /**
   */
  idle_expires_at: GetSession200ResponseIdleExpiresAt | null;
  /**
   */
  expires_at: GetSession200ResponseExpiresAt | null;
  /**
   */
  device: GetSession200ResponseDevice;
  /**
   * List of client details for the session
   *
   */
  clients: Array<GetSession200ResponseClientsInner>;
  /**
   */
  authentication: GetSession200ResponseAuthentication;
}
/**
 *
 */
export type GetSession200ResponseAuthenticatedAt = string | { [key: string]: any };
/**
 * Details about authentication signals obtained during the login flow
 */
export interface GetSession200ResponseAuthentication {
  [key: string]: any | any;
  /**
   * Contains the authentication methods a user has completed during their session
   *
   */
  methods: Array<GetSession200ResponseAuthenticationMethodsInner>;
}
/**
 * Authentication signal details
 */
export interface GetSession200ResponseAuthenticationMethodsInner {
  [key: string]: any | any;
  /**
   * One of: "federated", "passkey", "pwd", "sms", "email", "mfa", "mock" or a custom method denoted by a URL
   *
   */
  name: string;
  /**
   */
  timestamp: GetSession200ResponseAuthenticationMethodsInnerTimestamp | null;
  /**
   * A specific MFA factor. Only present when "name" is set to "mfa"
   *
   */
  type$: string;
}
/**
 *
 */
export type GetSession200ResponseAuthenticationMethodsInnerTimestamp =
  | string
  | { [key: string]: any };
/**
 * Client details
 */
export interface GetSession200ResponseClientsInner {
  [key: string]: any | any;
  /**
   * ID of client for the session
   *
   */
  client_id: string;
}
/**
 *
 */
export type GetSession200ResponseCreatedAt = string | { [key: string]: any };
/**
 * Metadata related to the device used in the session
 */
export interface GetSession200ResponseDevice {
  [key: string]: any | any;
  /**
   * First IP address associated with this session
   *
   */
  initial_ip: string | null;
  /**
   * First autonomous system number associated with this session
   *
   */
  initial_asn: string;
  /**
   * Last user agent of the device from which this user logged in
   *
   */
  last_user_agent: string;
  /**
   * Last IP address from which this user logged in
   *
   */
  last_ip: string | null;
  /**
   * Last autonomous system number from which this user logged in
   *
   */
  last_asn: string;
}
/**
 *
 */
export type GetSession200ResponseExpiresAt = string | { [key: string]: any };
/**
 *
 */
export type GetSession200ResponseIdleExpiresAt = string | { [key: string]: any };
/**
 *
 */
export type GetSession200ResponseUpdatedAt = string | { [key: string]: any };
/**
 *
 */
export interface GetSessionsForUser200Response {
  [key: string]: any | any;
  /**
   */
  sessions: Array<GetSessionsForUser200ResponseSessionsInner>;
}
/**
 *
 */
export interface GetSessionsForUser200ResponseSessionsInner {
  [key: string]: any | any;
  /**
   * The ID of the session
   *
   */
  id: string;
  /**
   * ID of the user which can be used when interacting with other APIs.
   *
   */
  user_id: string;
  /**
   */
  created_at: GetSessionsForUser200ResponseSessionsInnerCreatedAt;
  /**
   */
  updated_at: GetSessionsForUser200ResponseSessionsInnerUpdatedAt;
  /**
   */
  authenticated_at: GetSessionsForUser200ResponseSessionsInnerAuthenticatedAt;
  /**
   */
  idle_expires_at: GetSessionsForUser200ResponseSessionsInnerIdleExpiresAt;
  /**
   */
  expires_at: GetSessionsForUser200ResponseSessionsInnerExpiresAt;
  /**
   */
  device: GetSessionsForUser200ResponseSessionsInnerDevice;
  /**
   * List of client details for the session
   *
   */
  clients: Array<GetSession200ResponseClientsInner>;
  /**
   */
  authentication: GetSessionsForUser200ResponseSessionsInnerAuthentication;
}
/**
 *
 */
export type GetSessionsForUser200ResponseSessionsInnerAuthenticatedAt =
  | string
  | { [key: string]: any };
/**
 * Details about authentication signals obtained during the login flow
 */
export interface GetSessionsForUser200ResponseSessionsInnerAuthentication {
  [key: string]: any | any;
  /**
   * Contains the authentication methods a user has completed during their session
   *
   */
  methods: Array<GetSessionsForUser200ResponseSessionsInnerAuthenticationMethodsInner>;
}
/**
 * Authentication signal details
 */
export interface GetSessionsForUser200ResponseSessionsInnerAuthenticationMethodsInner {
  [key: string]: any | any;
  /**
   * One of: "federated", "passkey", "pwd", "sms", "email", "mfa", "mock" or a custom method denoted by a URL
   *
   */
  name: string;
  /**
   */
  timestamp: GetSessionsForUser200ResponseSessionsInnerAuthenticationMethodsInnerTimestamp;
  /**
   * A specific MFA factor. Only present when "name" is set to "mfa"
   *
   */
  type$: string;
}
/**
 *
 */
export type GetSessionsForUser200ResponseSessionsInnerAuthenticationMethodsInnerTimestamp =
  | string
  | { [key: string]: any };
/**
 *
 */
export type GetSessionsForUser200ResponseSessionsInnerCreatedAt = string | { [key: string]: any };
/**
 * Metadata related to the device used in the session
 */
export interface GetSessionsForUser200ResponseSessionsInnerDevice {
  [key: string]: any | any;
  /**
   * First IP address associated with this session
   *
   */
  initial_ip: string;
  /**
   * First autonomous system number associated with this session
   *
   */
  initial_asn: string;
  /**
   * Last user agent of the device from which this user logged in
   *
   */
  last_user_agent: string;
  /**
   * Last IP address from which this user logged in
   *
   */
  last_ip: string;
  /**
   * Last autonomous system number from which this user logged in
   *
   */
  last_asn: string;
}
/**
 *
 */
export type GetSessionsForUser200ResponseSessionsInnerExpiresAt = string | { [key: string]: any };
/**
 *
 */
export type GetSessionsForUser200ResponseSessionsInnerIdleExpiresAt =
  | string
  | { [key: string]: any };
/**
 *
 */
export type GetSessionsForUser200ResponseSessionsInnerUpdatedAt = string | { [key: string]: any };
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
export interface GetTokenExchangeProfiles200Response {
  /**
   */
  pagination: { [key: string]: any };
  /**
   */
  token_exchange_profiles: Array<GetTokenExchangeProfilesById200Response>;
}
/**
 *
 */
export interface GetTokenExchangeProfilesById200Response {
  [key: string]: any | any;
  /**
   * The unique ID of the token exchange profile.
   *
   */
  id: string;
  /**
   * Friendly name of this profile.
   *
   */
  name: string;
  /**
   * Subject token type for this profile. When receiving a token exchange request on the Authentication API, the corresponding token exchange profile with a matching subject_token_type will be executed. This must be a URI.
   *
   */
  subject_token_type: string;
  /**
   * The ID of the Custom Token Exchange action to execute for this profile, in order to validate the subject_token. The action must use the custom-token-exchange trigger.
   *
   */
  action_id: string;
  /**
   * The type of the profile, which controls how the profile will be executed when receiving a token exchange request.
   *
   */
  type: GetTokenExchangeProfilesById200ResponseTypeEnum;
  /**
   * The time when this profile was created.
   *
   */
  created_at: string;
  /**
   * The time when this profile was updated.
   *
   */
  updated_at: string;
}

export const GetTokenExchangeProfilesById200ResponseTypeEnum = {
  custom_authentication: 'custom_authentication',
} as const;
export type GetTokenExchangeProfilesById200ResponseTypeEnum =
  (typeof GetTokenExchangeProfilesById200ResponseTypeEnum)[keyof typeof GetTokenExchangeProfilesById200ResponseTypeEnum];

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
  /**
   */
  'pre-change-password'?: PatchBreachedPasswordDetectionRequestStagePreChangePassword;
}
/**
 *
 */
export interface PatchBreachedPasswordDetectionRequestStagePreChangePassword {
  /**
   * Action to take when a breached password is detected during a password reset.
   *               Possible values: <code>block</code>, <code>admin_notification</code>.
   *
   */
  shields?: Array<PatchBreachedPasswordDetectionRequestStagePreChangePasswordShieldsEnum>;
}

export const PatchBreachedPasswordDetectionRequestStagePreChangePasswordShieldsEnum = {
  block: 'block',
  admin_notification: 'admin_notification',
} as const;
export type PatchBreachedPasswordDetectionRequestStagePreChangePasswordShieldsEnum =
  (typeof PatchBreachedPasswordDetectionRequestStagePreChangePasswordShieldsEnum)[keyof typeof PatchBreachedPasswordDetectionRequestStagePreChangePasswordShieldsEnum];

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
  /**
   * Controls how organizations may be used with this grant
   *
   */
  organization_usage?: PatchClientGrantsByIdRequestOrganizationUsageEnum;
  /**
   * Controls allowing any organization to be used with this grant
   *
   */
  allow_any_organization?: boolean | null;
}

export const PatchClientGrantsByIdRequestOrganizationUsageEnum = {
  deny: 'deny',
  allow: 'allow',
  require: 'require',
  null: 'null',
} as const;
export type PatchClientGrantsByIdRequestOrganizationUsageEnum =
  (typeof PatchClientGrantsByIdRequestOrganizationUsageEnum)[keyof typeof PatchClientGrantsByIdRequestOrganizationUsageEnum];

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
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
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
  reset_email_by_code: 'reset_email_by_code',
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
   * Determines whether organization signup should be enabled for this organization connection. Only applicable for database connections. Default: false.
   *
   */
  is_signup_enabled?: boolean;
  /**
   * Determines whether a connection should be displayed on this organization’s login prompt. Only applicable for enterprise connections. Default: true.
   *
   */
  show_as_button?: boolean;
}
/**
 *
 */
export interface PatchFlowsByIdRequest {
  /**
   */
  name?: string;
  /**
   */
  actions?: Array<any>;
}
/**
 *
 */
export interface PatchFlowsVaultConnectionsByIdRequest {
  /**
   * Flows Vault Connection name.
   *
   */
  name?: string;
  /**
   */
  setup?: PatchFlowsVaultConnectionsByIdRequestSetup;
}
/**
 * Flows Vault Connection configuration.
 */
export type PatchFlowsVaultConnectionsByIdRequestSetup =
  | PostFlowsVaultConnectionsRequestAnyOf11Setup
  | PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOf
  | PostFlowsVaultConnectionsRequestAnyOf15SetupAnyOf
  | PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf
  | PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1
  | PostFlowsVaultConnectionsRequestAnyOf18Setup
  | PostFlowsVaultConnectionsRequestAnyOf1Setup
  | PostFlowsVaultConnectionsRequestAnyOf2Setup
  | PostFlowsVaultConnectionsRequestAnyOf3Setup
  | PostFlowsVaultConnectionsRequestAnyOf4Setup
  | PostFlowsVaultConnectionsRequestAnyOf5Setup
  | PostFlowsVaultConnectionsRequestAnyOf7Setup
  | PostFlowsVaultConnectionsRequestAnyOf9Setup
  | PostFlowsVaultConnectionsRequestAnyOfSetup;
/**
 *
 */
export interface PatchFormsByIdRequest {
  /**
   */
  name?: string;
  /**
   */
  messages?: PostFormsRequestMessages;
  /**
   */
  languages?: PostFormsRequestLanguages;
  /**
   */
  translations?: { [key: string]: any };
  /**
   */
  nodes?: Array<PostFormsRequestNodesInner>;
  /**
   */
  start?: PostFormsRequestStart;
  /**
   */
  ending?: PostFormsRequestEnding;
  /**
   */
  style?: PostFormsRequestStyle;
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
export interface PatchRendering200Response {
  [key: string]: any | any;
  /**
   * Rendering mode
   *
   */
  rendering_mode: PatchRendering200ResponseRenderingModeEnum;
  /**
   * Context values to make available
   *
   */
  context_configuration: Array<string>;
  /**
   * Override Universal Login default head tags
   *
   */
  default_head_tags_disabled: boolean;
  /**
   * An array of head tags
   *
   */
  head_tags: Array<GetRendering200ResponseHeadTagsInner>;
}

export const PatchRendering200ResponseRenderingModeEnum = {
  advanced: 'advanced',
  standard: 'standard',
} as const;
export type PatchRendering200ResponseRenderingModeEnum =
  (typeof PatchRendering200ResponseRenderingModeEnum)[keyof typeof PatchRendering200ResponseRenderingModeEnum];

/**
 * Render settings for the given screen
 */
export interface PatchRenderingRequest {
  /**
   * Rendering mode
   *
   */
  rendering_mode?: PatchRenderingRequestRenderingModeEnum;
  /**
   * Context values to make available
   *
   */
  context_configuration?: Array<string>;
  /**
   * Override Universal Login default head tags
   *
   */
  default_head_tags_disabled?: boolean;
  /**
   * An array of head tags
   *
   */
  head_tags?: Array<PatchRenderingRequestHeadTagsInner>;
}

export const PatchRenderingRequestRenderingModeEnum = {
  advanced: 'advanced',
  standard: 'standard',
} as const;
export type PatchRenderingRequestRenderingModeEnum =
  (typeof PatchRenderingRequestRenderingModeEnum)[keyof typeof PatchRenderingRequestRenderingModeEnum];

/**
 *
 */
export interface PatchRenderingRequestHeadTagsInner {
  [key: string]: any | any;
  /**
   * Any HTML element valid for use in the head tag
   *
   */
  tag?: string;
  /**
   */
  attributes?: PatchRenderingRequestHeadTagsInnerAttributes;
  /**
   * Text/content within the opening and closing tags of the element
   * See <a href="https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/configure-acul-screens">documentation</a> on using context variables
   *
   */
  content?: string;
}
/**
 * Attributes of the HTML tag
 */
export interface PatchRenderingRequestHeadTagsInnerAttributes {
  [key: string]: any | any;
  /**
   */
  integrity?: Array<string>;
}
/**
 *
 */
export interface PatchScimConfigurationRequest {
  /**
   * User ID attribute for generating unique user ids
   *
   */
  user_id_attribute: string;
  /**
   * The mapping between auth0 and SCIM
   *
   */
  mapping: Array<PostScimConfigurationRequestMappingInner>;
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
export interface PatchTokenExchangeProfilesByIdRequest {
  /**
   * Friendly name of this profile.
   *
   */
  name?: string;
  /**
   * Subject token type for this profile. When receiving a token exchange request on the Authentication API, the corresponding token exchange profile with a matching subject_token_type will be executed. This must be a URI.
   *
   */
  subject_token_type?: string;
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
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
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
  reset_email_by_code: 'reset_email_by_code',
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
   * Determines whether organization signup should be enabled for this organization connection. Only applicable for database connections. Default: false.
   *
   */
  is_signup_enabled?: boolean;
  /**
   * Determines whether a connection should be displayed on this organization’s login prompt. Only applicable for enterprise connections. Default: true.
   *
   */
  show_as_button?: boolean;
}
/**
 *
 */
export interface PostEncryptionKeyRequest {
  [key: string]: any | any;
  /**
   * Base64 encoded ciphertext of key material wrapped by public wrapping key.
   *
   */
  wrapped_key: string;
}
/**
 *
 */
export interface PostEncryptionRequest {
  [key: string]: any | any;
  /**
   * Type of the encryption key to be created.
   *
   */
  type: PostEncryptionRequestTypeEnum;
}

export const PostEncryptionRequestTypeEnum = {
  customer_provided_root_key: 'customer-provided-root-key',
  tenant_encryption_key: 'tenant-encryption-key',
} as const;
export type PostEncryptionRequestTypeEnum =
  (typeof PostEncryptionRequestTypeEnum)[keyof typeof PostEncryptionRequestTypeEnum];

/**
 *
 */
export interface PostEncryptionWrappingKey201Response {
  [key: string]: any | any;
  /**
   * Public wrapping key in PEM format
   *
   */
  public_key: string;
  /**
   * Encryption algorithm that shall be used to wrap your key material
   *
   */
  algorithm: PostEncryptionWrappingKey201ResponseAlgorithmEnum;
}

export const PostEncryptionWrappingKey201ResponseAlgorithmEnum = {
  CKM_RSA_AES_KEY_WRAP: 'CKM_RSA_AES_KEY_WRAP',
} as const;
export type PostEncryptionWrappingKey201ResponseAlgorithmEnum =
  (typeof PostEncryptionWrappingKey201ResponseAlgorithmEnum)[keyof typeof PostEncryptionWrappingKey201ResponseAlgorithmEnum];

/**
 *
 */
export interface PostFlows201Response {
  /**
   */
  id: string;
  /**
   */
  name: string;
  /**
   */
  actions?: Array<any>;
  /**
   */
  created_at: string;
  /**
   */
  updated_at: string;
  /**
   */
  executed_at?: string;
}
/**
 *
 */
export interface PostFlowsRequest {
  /**
   */
  name: string;
  /**
   */
  actions?: Array<any>;
}
/**
 *
 */
export interface PostFlowsVaultConnections201Response {
  /**
   * Flows Vault Connection identifier.
   *
   */
  id: string;
  /**
   * Flows Vault Connection app identifier.
   *
   */
  app_id: string;
  /**
   * Flows Vault Connection environment.
   *
   */
  environment?: string;
  /**
   * Flows Vault Connection name.
   *
   */
  name: string;
  /**
   * Flows Vault Connection custom account name.
   *
   */
  account_name?: string;
  /**
   * Whether the Flows Vault Connection is configured.
   *
   */
  ready: boolean;
  /**
   * The ISO 8601 formatted date when this Flows Vault Connection was created.
   *
   */
  created_at: string;
  /**
   * The ISO 8601 formatted date when this Flows Vault Connection was updated.
   *
   */
  updated_at: string;
  /**
   * The ISO 8601 formatted date when this Flows Vault Connection was refreshed.
   *
   */
  refreshed_at?: string;
  /**
   */
  fingerprint: string;
}
/**
 *
 */
export type PostFlowsVaultConnectionsRequest =
  | PostFlowsVaultConnectionsRequestAnyOf
  | PostFlowsVaultConnectionsRequestAnyOf1
  | PostFlowsVaultConnectionsRequestAnyOf10
  | PostFlowsVaultConnectionsRequestAnyOf11
  | PostFlowsVaultConnectionsRequestAnyOf12
  | PostFlowsVaultConnectionsRequestAnyOf13
  | PostFlowsVaultConnectionsRequestAnyOf14
  | PostFlowsVaultConnectionsRequestAnyOf15
  | PostFlowsVaultConnectionsRequestAnyOf16
  | PostFlowsVaultConnectionsRequestAnyOf17
  | PostFlowsVaultConnectionsRequestAnyOf18
  | PostFlowsVaultConnectionsRequestAnyOf19
  | PostFlowsVaultConnectionsRequestAnyOf2
  | PostFlowsVaultConnectionsRequestAnyOf20
  | PostFlowsVaultConnectionsRequestAnyOf3
  | PostFlowsVaultConnectionsRequestAnyOf4
  | PostFlowsVaultConnectionsRequestAnyOf5
  | PostFlowsVaultConnectionsRequestAnyOf6
  | PostFlowsVaultConnectionsRequestAnyOf7
  | PostFlowsVaultConnectionsRequestAnyOf8
  | PostFlowsVaultConnectionsRequestAnyOf9;
/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOfAppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOfSetup;
}

export const PostFlowsVaultConnectionsRequestAnyOfAppIdEnum = {
  ACTIVECAMPAIGN: 'ACTIVECAMPAIGN',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOfAppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOfAppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOfAppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf1 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf1AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf1Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf1AppIdEnum = {
  AIRTABLE: 'AIRTABLE',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf1AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf1AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf1AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf10 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf10AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf10Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf10AppIdEnum = {
  MAILCHIMP: 'MAILCHIMP',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf10AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf10AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf10AppIdEnum];

/**
 *
 */
export type PostFlowsVaultConnectionsRequestAnyOf10Setup =
  | PostFlowsVaultConnectionsRequestAnyOf4Setup
  | PostFlowsVaultConnectionsRequestAnyOf5Setup;
/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf11 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf11AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf11Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf11AppIdEnum = {
  MAILJET: 'MAILJET',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf11AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf11AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf11AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf11Setup {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf11SetupTypeEnum;
  /**
   */
  api_key: string;
  /**
   */
  secret_key: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf11SetupTypeEnum = {
  API_KEY: 'API_KEY',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf11SetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf11SetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf11SetupTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf12 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf12AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf12Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf12AppIdEnum = {
  PIPEDRIVE: 'PIPEDRIVE',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf12AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf12AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf12AppIdEnum];

/**
 *
 */
export type PostFlowsVaultConnectionsRequestAnyOf12Setup =
  | PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOf
  | PostFlowsVaultConnectionsRequestAnyOf5Setup;
/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOf {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOfTypeEnum;
  /**
   */
  token: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOfTypeEnum = {
  TOKEN: 'TOKEN',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOfTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOfTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOfTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf13 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf13AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf5Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf13AppIdEnum = {
  SALESFORCE: 'SALESFORCE',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf13AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf13AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf13AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf14 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf14AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf1Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf14AppIdEnum = {
  SENDGRID: 'SENDGRID',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf14AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf14AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf14AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf15 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf15AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf15Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf15AppIdEnum = {
  SLACK: 'SLACK',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf15AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf15AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf15AppIdEnum];

/**
 *
 */
export type PostFlowsVaultConnectionsRequestAnyOf15Setup =
  | PostFlowsVaultConnectionsRequestAnyOf15SetupAnyOf
  | PostFlowsVaultConnectionsRequestAnyOf5Setup;
/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf15SetupAnyOf {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf15SetupAnyOfTypeEnum;
  /**
   */
  url: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf15SetupAnyOfTypeEnum = {
  WEBHOOK: 'WEBHOOK',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf15SetupAnyOfTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf15SetupAnyOfTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf15SetupAnyOfTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf16 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf16AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf16Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf16AppIdEnum = {
  STRIPE: 'STRIPE',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf16AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf16AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf16AppIdEnum];

/**
 *
 */
export type PostFlowsVaultConnectionsRequestAnyOf16Setup =
  | PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf
  | PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1;
/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOfTypeEnum;
  /**
   */
  private_key: string;
  /**
   */
  public_key: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOfTypeEnum = {
  KEY_PAIR: 'KEY_PAIR',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOfTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOfTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOfTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1 {
  [key: string]: any | any;
  /**
   */
  type?: PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1TypeEnum;
  /**
   */
  code?: string;
  /**
   */
  environment?: PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1EnvironmentEnum;
}

export const PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1TypeEnum = {
  OAUTH_CODE: 'OAUTH_CODE',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1TypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1TypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1TypeEnum];

export const PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1EnvironmentEnum = {
  live: 'live',
  test: 'test',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1EnvironmentEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1EnvironmentEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf16SetupAnyOf1EnvironmentEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf17 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf17AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOf;
}

export const PostFlowsVaultConnectionsRequestAnyOf17AppIdEnum = {
  TELEGRAM: 'TELEGRAM',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf17AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf17AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf17AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf18 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf18AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf18Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf18AppIdEnum = {
  TWILIO: 'TWILIO',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf18AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf18AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf18AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf18Setup {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf18SetupTypeEnum;
  /**
   */
  account_id: string;
  /**
   */
  api_key: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf18SetupTypeEnum = {
  API_KEY: 'API_KEY',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf18SetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf18SetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf18SetupTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf19 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf19AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf12SetupAnyOf;
}

export const PostFlowsVaultConnectionsRequestAnyOf19AppIdEnum = {
  WHATSAPP: 'WHATSAPP',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf19AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf19AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf19AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf1Setup {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf1SetupTypeEnum;
  /**
   */
  api_key: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf1SetupTypeEnum = {
  API_KEY: 'API_KEY',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf1SetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf1SetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf1SetupTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf2 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf2AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf2Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf2AppIdEnum = {
  AUTH0: 'AUTH0',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf2AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf2AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf2AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf20 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf20AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf15SetupAnyOf;
}

export const PostFlowsVaultConnectionsRequestAnyOf20AppIdEnum = {
  ZAPIER: 'ZAPIER',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf20AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf20AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf20AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf2Setup {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf2SetupTypeEnum;
  /**
   */
  client_id: string;
  /**
   */
  client_secret: string;
  /**
   */
  domain: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf2SetupTypeEnum = {
  OAUTH_APP: 'OAUTH_APP',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf2SetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf2SetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf2SetupTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf3 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf3AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf3Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf3AppIdEnum = {
  BIGQUERY: 'BIGQUERY',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf3AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf3AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf3AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf3Setup {
  /**
   */
  type?: PostFlowsVaultConnectionsRequestAnyOf3SetupTypeEnum;
  /**
   */
  project_id?: string;
  /**
   */
  private_key?: string;
  /**
   */
  client_email?: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf3SetupTypeEnum = {
  OAUTH_JWT: 'OAUTH_JWT',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf3SetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf3SetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf3SetupTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf4 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf4AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf4Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf4AppIdEnum = {
  CLEARBIT: 'CLEARBIT',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf4AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf4AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf4AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf4Setup {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf4SetupTypeEnum;
  /**
   */
  secret_key: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf4SetupTypeEnum = {
  API_KEY: 'API_KEY',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf4SetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf4SetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf4SetupTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf5 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf5AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf5Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf5AppIdEnum = {
  DOCUSIGN: 'DOCUSIGN',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf5AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf5AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf5AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf5Setup {
  [key: string]: any | any;
  /**
   */
  type?: PostFlowsVaultConnectionsRequestAnyOf5SetupTypeEnum;
  /**
   */
  code?: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf5SetupTypeEnum = {
  OAUTH_CODE: 'OAUTH_CODE',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf5SetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf5SetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf5SetupTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf6 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf6AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf5Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf6AppIdEnum = {
  GOOGLE_SHEETS: 'GOOGLE_SHEETS',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf6AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf6AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf6AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf7 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf7AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf7Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf7AppIdEnum = {
  HTTP: 'HTTP',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf7AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf7AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf7AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf7Setup {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf7SetupTypeEnum;
  /**
   */
  token: string;
}

export const PostFlowsVaultConnectionsRequestAnyOf7SetupTypeEnum = {
  BEARER: 'BEARER',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf7SetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf7SetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf7SetupTypeEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf8 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf8AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf8Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf8AppIdEnum = {
  HUBSPOT: 'HUBSPOT',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf8AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf8AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf8AppIdEnum];

/**
 *
 */
export type PostFlowsVaultConnectionsRequestAnyOf8Setup =
  | PostFlowsVaultConnectionsRequestAnyOf1Setup
  | PostFlowsVaultConnectionsRequestAnyOf5Setup;
/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf9 {
  [key: string]: any | any;
  /**
   */
  app_id?: PostFlowsVaultConnectionsRequestAnyOf9AppIdEnum;
  /**
   */
  setup?: PostFlowsVaultConnectionsRequestAnyOf9Setup;
}

export const PostFlowsVaultConnectionsRequestAnyOf9AppIdEnum = {
  JWT: 'JWT',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf9AppIdEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf9AppIdEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf9AppIdEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOf9Setup {
  [key: string]: any | any;
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOf9SetupTypeEnum;
  /**
   */
  algorithm: PostFlowsVaultConnectionsRequestAnyOf9SetupAlgorithmEnum;
}

export const PostFlowsVaultConnectionsRequestAnyOf9SetupTypeEnum = {
  JWT: 'JWT',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf9SetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf9SetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf9SetupTypeEnum];

export const PostFlowsVaultConnectionsRequestAnyOf9SetupAlgorithmEnum = {
  HS256: 'HS256',
  HS384: 'HS384',
  HS512: 'HS512',
  RS256: 'RS256',
  RS384: 'RS384',
  RS512: 'RS512',
  ES256: 'ES256',
  ES384: 'ES384',
  ES512: 'ES512',
  PS256: 'PS256',
  PS384: 'PS384',
  PS512: 'PS512',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOf9SetupAlgorithmEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOf9SetupAlgorithmEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOf9SetupAlgorithmEnum];

/**
 *
 */
export interface PostFlowsVaultConnectionsRequestAnyOfSetup {
  /**
   */
  type: PostFlowsVaultConnectionsRequestAnyOfSetupTypeEnum;
  /**
   */
  api_key: string;
  /**
   */
  base_url?: string;
}

export const PostFlowsVaultConnectionsRequestAnyOfSetupTypeEnum = {
  API_KEY: 'API_KEY',
} as const;
export type PostFlowsVaultConnectionsRequestAnyOfSetupTypeEnum =
  (typeof PostFlowsVaultConnectionsRequestAnyOfSetupTypeEnum)[keyof typeof PostFlowsVaultConnectionsRequestAnyOfSetupTypeEnum];

/**
 *
 */
export interface PostForms201Response {
  /**
   */
  id: string;
  /**
   */
  name: string;
  /**
   */
  messages?: PostFormsRequestMessages;
  /**
   */
  languages?: PostFormsRequestLanguages;
  /**
   */
  translations?: { [key: string]: any };
  /**
   */
  nodes?: Array<PostFormsRequestNodesInner>;
  /**
   */
  start?: PostFormsRequestStart;
  /**
   */
  ending?: PostFormsRequestEnding;
  /**
   */
  style?: PostFormsRequestStyle;
  /**
   */
  created_at: string;
  /**
   */
  updated_at: string;
  /**
   */
  embedded_at?: string;
  /**
   */
  submitted_at?: string;
}
/**
 *
 */
export interface PostFormsRequest {
  /**
   */
  name: string;
  /**
   */
  messages?: PostFormsRequestMessages;
  /**
   */
  languages?: PostFormsRequestLanguages;
  /**
   */
  translations?: { [key: string]: any };
  /**
   */
  nodes?: Array<PostFormsRequestNodesInner>;
  /**
   */
  start?: PostFormsRequestStart;
  /**
   */
  ending?: PostFormsRequestEnding;
  /**
   */
  style?: PostFormsRequestStyle;
}
/**
 *
 */
export interface PostFormsRequestEnding {
  /**
   */
  redirection?: PostFormsRequestEndingRedirection;
  /**
   */
  after_submit?: PostFormsRequestEndingAfterSubmit;
  /**
   */
  coordinates?: PostFormsRequestNodesInnerAnyOfCoordinates;
  /**
   */
  resume_flow?: PostFormsRequestEndingResumeFlowEnum;
}

export const PostFormsRequestEndingResumeFlowEnum = {
  true: true,
} as const;
export type PostFormsRequestEndingResumeFlowEnum =
  (typeof PostFormsRequestEndingResumeFlowEnum)[keyof typeof PostFormsRequestEndingResumeFlowEnum];

/**
 *
 */
export interface PostFormsRequestEndingAfterSubmit {
  /**
   */
  flow_id?: string;
}
/**
 *
 */
export interface PostFormsRequestEndingRedirection {
  /**
   */
  delay?: number;
  /**
   */
  target: string;
}
/**
 *
 */
export interface PostFormsRequestLanguages {
  /**
   */
  primary?: string;
  /**
   */
  _default?: string;
}
/**
 *
 */
export interface PostFormsRequestMessages {
  /**
   */
  errors?: { [key: string]: any };
  /**
   */
  custom?: { [key: string]: any };
}
/**
 *
 */
export type PostFormsRequestNodesInner =
  | PostFormsRequestNodesInnerAnyOf
  | PostFormsRequestNodesInnerAnyOf1
  | PostFormsRequestNodesInnerAnyOf2;
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf {
  /**
   */
  id: string;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOfTypeEnum;
  /**
   */
  coordinates?: PostFormsRequestNodesInnerAnyOfCoordinates;
  /**
   */
  alias?: string;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOfConfig;
}

export const PostFormsRequestNodesInnerAnyOfTypeEnum = {
  FLOW: 'FLOW',
} as const;
export type PostFormsRequestNodesInnerAnyOfTypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOfTypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOfTypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf1 {
  /**
   */
  id: string;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf1TypeEnum;
  /**
   */
  coordinates?: PostFormsRequestNodesInnerAnyOfCoordinates;
  /**
   */
  alias?: string;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf1Config;
}

export const PostFormsRequestNodesInnerAnyOf1TypeEnum = {
  ROUTER: 'ROUTER',
} as const;
export type PostFormsRequestNodesInnerAnyOf1TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf1TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf1TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf1Config {
  /**
   */
  rules?: Array<PostFormsRequestNodesInnerAnyOf1ConfigRulesInner>;
  /**
   */
  fallback?: PostFormsRequestNodesInnerAnyOfConfigNextNode;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf1ConfigRulesInner {
  /**
   */
  id: string;
  /**
   */
  alias?: string;
  /**
   */
  condition: any | null;
  /**
   */
  next_node?: PostFormsRequestNodesInnerAnyOfConfigNextNode;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2 {
  /**
   */
  id: string;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2TypeEnum;
  /**
   */
  coordinates?: PostFormsRequestNodesInnerAnyOfCoordinates;
  /**
   */
  alias?: string;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2Config;
}

export const PostFormsRequestNodesInnerAnyOf2TypeEnum = {
  STEP: 'STEP',
} as const;
export type PostFormsRequestNodesInnerAnyOf2TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2Config {
  /**
   */
  components?: Array<PostFormsRequestNodesInnerAnyOf2ConfigComponentsInner>;
  /**
   */
  next_node?: PostFormsRequestNodesInnerAnyOfConfigNextNode;
}
/**
 *
 */
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInner =
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2;
/**
 *
 */
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf =
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf5
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf6;
/**
 *
 */
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1 =
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf1;
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOfTypeEnum;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOfConfig;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOfTypeEnum = {
  GMAPS_ADDRESS: 'GMAPS_ADDRESS',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOfTypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOfTypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOfTypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf1 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf1TypeEnum;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf1Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf1TypeEnum = {
  RECAPTCHA: 'RECAPTCHA',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf1TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf1TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf1TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOf1Config {
  /**
   */
  site_key: string;
  /**
   */
  secret_key: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf1AnyOfConfig {
  /**
   */
  api_key: string;
}
/**
 *
 */
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2 =
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf1
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf12
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf14
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf15
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf2
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf3
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf4
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf5
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf8
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf9;
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOfTypeEnum;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOfConfig;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOfTypeEnum = {
  BOOLEAN: 'BOOLEAN',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOfTypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOfTypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOfTypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf1 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf1TypeEnum;
  /**
   */
  config?: { [key: string]: any };
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf1TypeEnum = {
  CARDS: 'CARDS',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf1TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf1TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf1TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10TypeEnum;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10TypeEnum = {
  PASSWORD: 'PASSWORD',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10Config {
  /**
   */
  hash?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10ConfigHashEnum;
  /**
   */
  placeholder?: string;
  /**
   */
  min_length?: number;
  /**
   */
  max_length?: number;
  /**
   */
  complexity?: boolean;
  /**
   */
  nist?: boolean;
  /**
   */
  strength_meter?: boolean;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10ConfigHashEnum = {
  NONE: 'NONE',
  MD5: 'MD5',
  SHA1: 'SHA1',
  SHA256: 'SHA256',
  SHA512: 'SHA512',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10ConfigHashEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10ConfigHashEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf10ConfigHashEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11TypeEnum;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11TypeEnum = {
  PAYMENT: 'PAYMENT',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11Config {
  /**
   */
  provider?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigProviderEnum;
  /**
   */
  charge: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigCharge;
  /**
   */
  credentials: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigCredentials;
  /**
   */
  customer?: { [key: string]: any };
  /**
   */
  fields?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigFields;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigProviderEnum =
  {
    STRIPE: 'STRIPE',
  } as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigProviderEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigProviderEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigProviderEnum];

/**
 *
 */
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigCharge =
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOf
  | PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOf1;
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOf {
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfTypeEnum;
  /**
   */
  one_off: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfOneOff;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfTypeEnum =
  {
    ONE_OFF: 'ONE_OFF',
  } as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfTypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfTypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfTypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOf1 {
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOf1TypeEnum;
  /**
   */
  subscription: { [key: string]: any };
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOf1TypeEnum =
  {
    SUBSCRIPTION: 'SUBSCRIPTION',
  } as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOf1TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOf1TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOf1TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfOneOff {
  [key: string]: any | any;
  /**
   */
  amount: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfOneOffAmount;
  /**
   */
  currency: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfOneOffCurrencyEnum;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfOneOffCurrencyEnum =
  {
    AUD: 'AUD',
    CAD: 'CAD',
    CHF: 'CHF',
    EUR: 'EUR',
    GBP: 'GBP',
    INR: 'INR',
    MXN: 'MXN',
    SEK: 'SEK',
    USD: 'USD',
  } as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfOneOffCurrencyEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfOneOffCurrencyEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfOneOffCurrencyEnum];

/**
 *
 */
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigChargeAnyOfOneOffAmount =
  number | string;
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigCredentials {
  /**
   */
  public_key: string;
  /**
   */
  private_key: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigFields {
  /**
   */
  card_number?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigFieldsCardNumber;
  /**
   */
  expiration_date?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigFieldsCardNumber;
  /**
   */
  security_code?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigFieldsCardNumber;
  /**
   */
  trustmarks?: boolean;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf11ConfigFieldsCardNumber {
  /**
   */
  label?: string;
  /**
   */
  placeholder?: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf12 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf12TypeEnum;
  /**
   */
  config?: object;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf12TypeEnum = {
  SOCIAL: 'SOCIAL',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf12TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf12TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf12TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13TypeEnum = {
  TEL: 'TEL',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13Config {}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf14 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf14TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf13Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf14TypeEnum = {
  TEXT: 'TEXT',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf14TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf14TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf14TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf15 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf15TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf15TypeEnum = {
  URL: 'URL',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf15TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf15TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf15TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf2 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf2TypeEnum;
  /**
   */
  config?: { [key: string]: any };
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf2TypeEnum = {
  CHOICE: 'CHOICE',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf2TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf2TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf2TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf3 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf3TypeEnum;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf3Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf3TypeEnum = {
  CUSTOM: 'CUSTOM',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf3TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf3TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf3TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf3Config {
  /**
   */
  schema: { [key: string]: any };
  /**
   */
  code: string;
  /**
   */
  css?: string;
  /**
   */
  params?: { [key: string]: any };
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf4 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf4TypeEnum;
  /**
   */
  config: { [key: string]: any };
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf4TypeEnum = {
  DATE: 'DATE',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf4TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf4TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf4TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf5 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf5TypeEnum;
  /**
   */
  config?: { [key: string]: any };
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf5TypeEnum = {
  DROPDOWN: 'DROPDOWN',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf5TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf5TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf5TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6TypeEnum = {
  EMAIL: 'EMAIL',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf6Config {
  /**
   */
  default_value?: string;
  /**
   */
  placeholder?: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7TypeEnum = {
  FILE: 'FILE',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7Config {
  /**
   */
  multiple?: boolean;
  /**
   */
  storage?: { [key: string]: any };
  /**
   */
  categories?: Array<PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7ConfigCategoriesEnum>;
  /**
   */
  extensions?: Array<string>;
  /**
   */
  maxSize?: number;
  /**
   */
  maxFiles?: number;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7ConfigCategoriesEnum =
  {
    AUDIO: 'AUDIO',
    VIDEO: 'VIDEO',
    IMAGE: 'IMAGE',
    DOCUMENT: 'DOCUMENT',
    ARCHIVE: 'ARCHIVE',
  } as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7ConfigCategoriesEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7ConfigCategoriesEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf7ConfigCategoriesEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf8 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf8TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf8Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf8TypeEnum = {
  LEGAL: 'LEGAL',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf8TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf8TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf8TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf8Config {
  /**
   */
  text?: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf9 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf9TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf9Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf9TypeEnum = {
  NUMBER: 'NUMBER',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf9TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf9TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf9TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOf9Config {
  /**
   */
  default_value?: number;
  /**
   */
  placeholder?: string;
  /**
   */
  min_value?: number;
  /**
   */
  max_value?: number;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOfConfig {
  /**
   */
  default_value?: boolean;
  /**
   */
  options?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOfConfigOptions;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOf2AnyOfConfigOptions {
  /**
   */
  _true?: string;
  /**
   */
  _false?: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOfTypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOfConfig;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOfTypeEnum = {
  DIVIDER: 'DIVIDER',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOfTypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOfTypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOfTypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1TypeEnum = {
  HTML: 'HTML',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1Config {
  /**
   */
  content?: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2TypeEnum = {
  IMAGE: 'IMAGE',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2Config {
  /**
   */
  src: string;
  /**
   */
  position?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2ConfigPositionEnum;
  /**
   */
  height?: number;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2ConfigPositionEnum = {
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2ConfigPositionEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2ConfigPositionEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf2ConfigPositionEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3TypeEnum;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3TypeEnum = {
  JUMP_BUTTON: 'JUMP_BUTTON',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3Config {
  /**
   */
  text: string;
  /**
   */
  next_node: PostFormsRequestNodesInnerAnyOfConfigNextNode;
  /**
   */
  style?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3ConfigStyle;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf3ConfigStyle {
  /**
   */
  background_color?: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4TypeEnum;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4TypeEnum = {
  NEXT_BUTTON: 'NEXT_BUTTON',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4Config {
  /**
   */
  text: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf5 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf5TypeEnum;
  /**
   */
  config: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf4Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf5TypeEnum = {
  PREVIOUS_BUTTON: 'PREVIOUS_BUTTON',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf5TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf5TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf5TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf6 {
  [key: string]: any | any;
  /**
   */
  type: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf6TypeEnum;
  /**
   */
  config?: PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf1Config;
}

export const PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf6TypeEnum = {
  RICH_TEXT: 'RICH_TEXT',
} as const;
export type PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf6TypeEnum =
  (typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf6TypeEnum)[keyof typeof PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOf6TypeEnum];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOf2ConfigComponentsInnerAnyOfAnyOfConfig {
  /**
   */
  text?: string;
}
/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOfConfig {
  /**
   */
  flow_id: string;
  /**
   */
  next_node?: PostFormsRequestNodesInnerAnyOfConfigNextNode;
}
/**
 *
 */
export type PostFormsRequestNodesInnerAnyOfConfigNextNode =
  | PostFormsRequestNodesInnerAnyOfConfigNextNodeAnyOf
  | string;

/**
 *
 */
export const PostFormsRequestNodesInnerAnyOfConfigNextNodeAnyOf = {
  ending: '$ending',
} as const;
export type PostFormsRequestNodesInnerAnyOfConfigNextNodeAnyOf =
  (typeof PostFormsRequestNodesInnerAnyOfConfigNextNodeAnyOf)[keyof typeof PostFormsRequestNodesInnerAnyOfConfigNextNodeAnyOf];

/**
 *
 */
export interface PostFormsRequestNodesInnerAnyOfCoordinates {
  /**
   */
  x: number;
  /**
   */
  y: number;
}
/**
 *
 */
export interface PostFormsRequestStart {
  /**
   */
  hidden_fields?: Array<PostFormsRequestStartHiddenFieldsInner>;
  /**
   */
  next_node?: PostFormsRequestNodesInnerAnyOfConfigNextNode;
  /**
   */
  coordinates?: PostFormsRequestNodesInnerAnyOfCoordinates;
}
/**
 *
 */
export interface PostFormsRequestStartHiddenFieldsInner {
  /**
   */
  key: string;
  /**
   */
  value?: string;
}
/**
 *
 */
export interface PostFormsRequestStyle {
  /**
   */
  css?: string;
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
export interface PostOrganizationClientGrantsRequest {
  /**
   * A Client Grant ID to add to the organization.
   *
   */
  grant_id: string;
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
   * Determines whether a connection should be displayed on this organization’s login prompt. Only applicable for enterprise connections. Default: true.
   *
   */
  show_as_button: boolean;
  /**
   * Determines whether organization signup should be enabled for this organization connection. Only applicable for database connections. Default: false.
   *
   */
  is_signup_enabled: boolean;
  /**
   */
  connection: PostOrganizations201ResponseEnabledConnectionsInnerConnection;
}
/**
 *
 */
export interface PostOrganizations201ResponseEnabledConnectionsInnerConnection {
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
   * Determines whether a connection should be displayed on this organization’s login prompt. Only applicable for enterprise connections. Default: true.
   *
   */
  show_as_button?: boolean;
  /**
   * Determines whether organization signup should be enabled for this organization connection. Only applicable for database connections. Default: false.
   *
   */
  is_signup_enabled?: boolean;
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
export interface PostScimConfigurationRequest {
  /**
   * User ID attribute for generating unique user ids
   *
   */
  user_id_attribute?: string;
  /**
   * The mapping between auth0 and SCIM
   *
   */
  mapping?: Array<PostScimConfigurationRequestMappingInner>;
}
/**
 *
 */
export interface PostScimConfigurationRequestMappingInner {
  [key: string]: any | any;
  /**
   * The field location in the auth0 schema
   *
   */
  auth0?: string;
  /**
   * The field location in the SCIM schema
   *
   */
  scim?: string;
}
/**
 *
 */
export interface PostScimToken201Response {
  /**
   * The token's identifier
   *
   */
  token_id: string;
  /**
   * The scim client's token
   *
   */
  token: string;
  /**
   * The scopes of the scim token
   *
   */
  scopes: Array<string>;
  /**
   * The token's created at timestamp
   *
   */
  created_at: string;
  /**
   * The token's valid until at timestamp
   *
   */
  valid_until: string;
}
/**
 * SCIM Token
 */
export interface PostScimTokenRequest {
  /**
   * The scopes of the scim token
   *
   */
  scopes?: Array<string>;
  /**
   * Lifetime of the token in seconds. Must be greater than 900
   *
   */
  token_lifetime?: number | null;
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
export interface PostSsoTicketRequest {
  /**
   * If provided, this will allow editing of the provided connection during the SSO Flow
   *
   */
  connection_id?: string;
  /**
   */
  connection_config?: PostSsoTicketRequestConnectionConfig;
  /**
   * List of client_ids that the connection will be enabled for.
   *
   */
  enabled_clients?: Array<string>;
  /**
   * List of organizations that the connection will be enabled for.
   *
   */
  enabled_organizations?: Array<PostSsoTicketRequestEnabledOrganizationsInner>;
  /**
   * Number of seconds for which the ticket is valid before expiration. If unspecified or set to 0, this value defaults to 432000 seconds (5 days).
   *
   */
  ttl_sec?: number;
  /**
   */
  domain_aliases_config?: PostSsoTicketRequestDomainAliasesConfig;
}
/**
 * If provided, this will create a new connection for the SSO flow with the given configuration
 */
export interface PostSsoTicketRequestConnectionConfig {
  /**
   * The name of the connection that will be created as a part of the SSO flow.
   *
   */
  name: string;
  /**
   * Connection name used in the new universal login experience
   *
   */
  display_name?: string;
  /**
   * <code>true</code> promotes to a domain-level connection so that third-party applications can use it. <code>false</code> does not promote the connection, so only first-party applications with the connection enabled can use it. (Defaults to <code>false</code>.)
   *
   */
  is_domain_connection?: boolean;
  /**
   * Enables showing a button for the connection in the login page (new experience only). If false, it will be usable only by HRD. (Defaults to <code>false</code>.)
   *
   */
  show_as_button?: boolean;
  /**
   * Metadata associated with the connection in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   *
   */
  metadata?: { [key: string]: any };
  /**
   */
  options?: PostSsoTicketRequestConnectionConfigOptions | null;
}
/**
 * The connection's options (depend on the connection strategy)
 */
export interface PostSsoTicketRequestConnectionConfigOptions {
  /**
   * URL for the icon. Must use HTTPS.
   *
   */
  icon_url?: string | null;
  /**
   * List of domain_aliases that can be authenticated in the Identity Provider
   *
   */
  domain_aliases?: Array<string>;
  /**
   */
  idpinitiated?: PostSsoTicketRequestConnectionConfigOptionsIdpinitiated | null;
}
/**
 * Allows IdP-initiated login
 */
export interface PostSsoTicketRequestConnectionConfigOptionsIdpinitiated {
  /**
   * Enables IdP-initiated login for this connection
   *
   */
  enabled?: boolean;
  /**
   * Default application <code>client_id</code> user is redirected to after validated SAML response
   *
   */
  client_id?: string;
  /**
   * The protocol used to connect to the the default application
   *
   */
  client_protocol?: PostSsoTicketRequestConnectionConfigOptionsIdpinitiatedClientProtocolEnum;
  /**
   * Query string options to customize the behaviour for OpenID Connect when <code>idpinitiated.client_protocol</code> is <code>oauth2</code>. Allowed parameters: <code>redirect_uri</code>, <code>scope</code>, <code>response_type</code>. For example, <code>redirect_uri=https://jwt.io&scope=openid email&response_type=token</code>
   *
   */
  client_authorizequery?: string;
}

export const PostSsoTicketRequestConnectionConfigOptionsIdpinitiatedClientProtocolEnum = {
  samlp: 'samlp',
  wsfed: 'wsfed',
  oauth2: 'oauth2',
} as const;
export type PostSsoTicketRequestConnectionConfigOptionsIdpinitiatedClientProtocolEnum =
  (typeof PostSsoTicketRequestConnectionConfigOptionsIdpinitiatedClientProtocolEnum)[keyof typeof PostSsoTicketRequestConnectionConfigOptionsIdpinitiatedClientProtocolEnum];

/**
 * Configuration for the setup of the connection’s domain_aliases in the self-service SSO flow.
 */
export interface PostSsoTicketRequestDomainAliasesConfig {
  /**
   * Whether the end user should complete the domain verification step. Possible values are 'none' (the step is not shown to the user), 'optional' (the user may add a domain alias in the domain verification step) or 'required' (the user must add a domain alias in order to enable the connection). Defaults to 'none'.
   *
   */
  domain_verification: PostSsoTicketRequestDomainAliasesConfigDomainVerificationEnum;
}

export const PostSsoTicketRequestDomainAliasesConfigDomainVerificationEnum = {
  none: 'none',
  optional: 'optional',
  required: 'required',
} as const;
export type PostSsoTicketRequestDomainAliasesConfigDomainVerificationEnum =
  (typeof PostSsoTicketRequestDomainAliasesConfigDomainVerificationEnum)[keyof typeof PostSsoTicketRequestDomainAliasesConfigDomainVerificationEnum];

/**
 *
 */
export interface PostSsoTicketRequestEnabledOrganizationsInner {
  /**
   * Organization identifier.
   *
   */
  organization_id: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   *
   */
  assign_membership_on_login?: boolean;
  /**
   * Determines whether a connection should be displayed on this organization’s login prompt. Only applicable for enterprise connections. Default: true.
   *
   */
  show_as_button?: boolean;
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
export interface PostTokenExchangeProfilesRequest {
  /**
   * Friendly name of this profile.
   *
   */
  name: string;
  /**
   * Subject token type for this profile. When receiving a token exchange request on the Authentication API, the corresponding token exchange profile with a matching subject_token_type will be executed. This must be a URI.
   *
   */
  subject_token_type: string;
  /**
   * The ID of the Custom Token Exchange action to execute for this profile, in order to validate the subject_token. The action must use the custom-token-exchange trigger.
   *
   */
  action_id: string;
  /**
   * The type of the profile, which controls how the profile will be executed when receiving a token exchange request.
   *
   */
  type: PostTokenExchangeProfilesRequestTypeEnum;
}

export const PostTokenExchangeProfilesRequestTypeEnum = {
  custom_authentication: 'custom_authentication',
} as const;
export type PostTokenExchangeProfilesRequestTypeEnum =
  (typeof PostTokenExchangeProfilesRequestTypeEnum)[keyof typeof PostTokenExchangeProfilesRequestTypeEnum];

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
export interface PutNetworkAclsByIdRequest {
  /**
   */
  description: string;
  /**
   * Indicates whether or not this access control list is actively being used
   *
   */
  active: boolean;
  /**
   * Indicates the order in which the ACL will be evaluated relative to other ACL rules.
   *
   */
  priority: number;
  /**
   */
  rule: PutNetworkAclsByIdRequestRule;
}
/**
 *
 */
export type PutNetworkAclsByIdRequestRule =
  | PutNetworkAclsByIdRequestRuleAnyOf
  | PutNetworkAclsByIdRequestRuleAnyOf1;
/**
 *
 */
export interface PutNetworkAclsByIdRequestRuleAnyOf {
  /**
   */
  action: GetNetworkAclsById200ResponseRuleAnyOfAction;
  /**
   */
  match: GetNetworkAclsById200ResponseRuleAnyOfMatch;
  /**
   */
  not_match?: GetNetworkAclsById200ResponseRuleAnyOfMatch;
  /**
   * Identifies the origin of the request as the Management API (management), Authentication API (authentication), or either (tenant)
   *
   */
  scope: PutNetworkAclsByIdRequestRuleAnyOfScopeEnum;
}

export const PutNetworkAclsByIdRequestRuleAnyOfScopeEnum = {
  management: 'management',
  authentication: 'authentication',
  tenant: 'tenant',
} as const;
export type PutNetworkAclsByIdRequestRuleAnyOfScopeEnum =
  (typeof PutNetworkAclsByIdRequestRuleAnyOfScopeEnum)[keyof typeof PutNetworkAclsByIdRequestRuleAnyOfScopeEnum];

/**
 *
 */
export interface PutNetworkAclsByIdRequestRuleAnyOf1 {
  /**
   */
  action: GetNetworkAclsById200ResponseRuleAnyOfAction;
  /**
   */
  not_match: GetNetworkAclsById200ResponseRuleAnyOfMatch;
  /**
   */
  match?: GetNetworkAclsById200ResponseRuleAnyOfMatch;
  /**
   * Scope defines the different scopes of network requests the rule can be applied to.
   *
   */
  scope: PutNetworkAclsByIdRequestRuleAnyOf1ScopeEnum;
}

export const PutNetworkAclsByIdRequestRuleAnyOf1ScopeEnum = {
  management: 'management',
  authentication: 'authentication',
  tenant: 'tenant',
} as const;
export type PutNetworkAclsByIdRequestRuleAnyOf1ScopeEnum =
  (typeof PutNetworkAclsByIdRequestRuleAnyOf1ScopeEnum)[keyof typeof PutNetworkAclsByIdRequestRuleAnyOf1ScopeEnum];

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
   * Dialect of access tokens that should be issued. `access_token` is a JWT containing standard Auth0 claims; `rfc9068_profile` is a JWT conforming to the IETF JWT Access Token Profile. `access_token_authz` and `rfc9068_profile_authz` additionally include RBAC permissions claims.
   *
   */
  token_dialect: ResourceServerTokenDialectEnum;
  /**
   */
  client: object;
  /**
   */
  token_encryption: ResourceServerTokenEncryption | null;
  /**
   */
  consent_policy: ResourceServerConsentPolicyEnum;
  /**
   */
  authorization_details: Array<any>;
  /**
   */
  proof_of_possession: ResourceServerProofOfPossession | null;
}

export const ResourceServerSigningAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
  PS256: 'PS256',
} as const;
export type ResourceServerSigningAlgEnum =
  (typeof ResourceServerSigningAlgEnum)[keyof typeof ResourceServerSigningAlgEnum];

export const ResourceServerTokenDialectEnum = {
  access_token: 'access_token',
  access_token_authz: 'access_token_authz',
  rfc9068_profile: 'rfc9068_profile',
  rfc9068_profile_authz: 'rfc9068_profile_authz',
} as const;
export type ResourceServerTokenDialectEnum =
  (typeof ResourceServerTokenDialectEnum)[keyof typeof ResourceServerTokenDialectEnum];

export const ResourceServerConsentPolicyEnum = {
  transactional_authorization_with_mfa: 'transactional-authorization-with-mfa',
  null: 'null',
} as const;
export type ResourceServerConsentPolicyEnum =
  (typeof ResourceServerConsentPolicyEnum)[keyof typeof ResourceServerConsentPolicyEnum];

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
   * Dialect of issued access token. `access_token` is a JWT containing standard Auth0 claims; `rfc9068_profile` is a JWT conforming to the IETF JWT Access Token Profile. `access_token_authz` and `rfc9068_profile_authz` additionally include RBAC permissions claims.
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
  /**
   */
  token_encryption?: ResourceServerTokenEncryption | null;
  /**
   */
  consent_policy?: ResourceServerCreateConsentPolicyEnum;
  /**
   */
  authorization_details?: Array<any>;
  /**
   */
  proof_of_possession?: ResourceServerProofOfPossession | null;
}

export const ResourceServerCreateSigningAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
  PS256: 'PS256',
} as const;
export type ResourceServerCreateSigningAlgEnum =
  (typeof ResourceServerCreateSigningAlgEnum)[keyof typeof ResourceServerCreateSigningAlgEnum];

export const ResourceServerCreateTokenDialectEnum = {
  access_token: 'access_token',
  access_token_authz: 'access_token_authz',
  rfc9068_profile: 'rfc9068_profile',
  rfc9068_profile_authz: 'rfc9068_profile_authz',
} as const;
export type ResourceServerCreateTokenDialectEnum =
  (typeof ResourceServerCreateTokenDialectEnum)[keyof typeof ResourceServerCreateTokenDialectEnum];

export const ResourceServerCreateConsentPolicyEnum = {
  transactional_authorization_with_mfa: 'transactional-authorization-with-mfa',
  null: 'null',
} as const;
export type ResourceServerCreateConsentPolicyEnum =
  (typeof ResourceServerCreateConsentPolicyEnum)[keyof typeof ResourceServerCreateConsentPolicyEnum];

/**
 * Proof-of-Possession configuration for access tokens
 */
export interface ResourceServerProofOfPossession {
  /**
   * Intended mechanism for Proof-of-Possession
   *
   */
  mechanism: ResourceServerProofOfPossessionMechanismEnum;
  /**
   * Whether the use of Proof-of-Possession is required for the resource server
   *
   */
  required: boolean;
}

export const ResourceServerProofOfPossessionMechanismEnum = {
  mtls: 'mtls',
} as const;
export type ResourceServerProofOfPossessionMechanismEnum =
  (typeof ResourceServerProofOfPossessionMechanismEnum)[keyof typeof ResourceServerProofOfPossessionMechanismEnum];

/**
 *
 */
export interface ResourceServerTokenEncryption {
  /**
   * Format of the encrypted JWT payload.
   *
   */
  format: ResourceServerTokenEncryptionFormatEnum;
  /**
   */
  encryption_key: ResourceServerTokenEncryptionEncryptionKey;
}

export const ResourceServerTokenEncryptionFormatEnum = {
  compact_nested_jwe: 'compact-nested-jwe',
} as const;
export type ResourceServerTokenEncryptionFormatEnum =
  (typeof ResourceServerTokenEncryptionFormatEnum)[keyof typeof ResourceServerTokenEncryptionFormatEnum];

/**
 *
 */
export interface ResourceServerTokenEncryptionEncryptionKey {
  /**
   * Name of the encryption key.
   *
   */
  name?: string;
  /**
   * Algorithm used to encrypt the token.
   *
   */
  alg: ResourceServerTokenEncryptionEncryptionKeyAlgEnum;
  /**
   * Key ID.
   *
   */
  kid?: string;
  /**
   * PEM-formatted public key. Must be JSON escaped.
   *
   */
  pem: string;
}

export const ResourceServerTokenEncryptionEncryptionKeyAlgEnum = {
  _256: 'RSA-OAEP-256',
  _384: 'RSA-OAEP-384',
  _512: 'RSA-OAEP-512',
} as const;
export type ResourceServerTokenEncryptionEncryptionKeyAlgEnum =
  (typeof ResourceServerTokenEncryptionEncryptionKeyAlgEnum)[keyof typeof ResourceServerTokenEncryptionEncryptionKeyAlgEnum];

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
   * Dialect of issued access token. `access_token` is a JWT containing standard Auth0 claims; `rfc9068_profile` is a JWT conforming to the IETF JWT Access Token Profile. `access_token_authz` and `rfc9068_profile_authz` additionally include RBAC permissions claims.
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
  /**
   */
  token_encryption?: ResourceServerTokenEncryption | null;
  /**
   */
  consent_policy?: ResourceServerUpdateConsentPolicyEnum;
  /**
   */
  authorization_details?: Array<any>;
  /**
   */
  proof_of_possession?: ResourceServerProofOfPossession | null;
}

export const ResourceServerUpdateSigningAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
  PS256: 'PS256',
} as const;
export type ResourceServerUpdateSigningAlgEnum =
  (typeof ResourceServerUpdateSigningAlgEnum)[keyof typeof ResourceServerUpdateSigningAlgEnum];

export const ResourceServerUpdateTokenDialectEnum = {
  access_token: 'access_token',
  access_token_authz: 'access_token_authz',
  rfc9068_profile: 'rfc9068_profile',
  rfc9068_profile_authz: 'rfc9068_profile_authz',
} as const;
export type ResourceServerUpdateTokenDialectEnum =
  (typeof ResourceServerUpdateTokenDialectEnum)[keyof typeof ResourceServerUpdateTokenDialectEnum];

export const ResourceServerUpdateConsentPolicyEnum = {
  transactional_authorization_with_mfa: 'transactional-authorization-with-mfa',
  null: 'null',
} as const;
export type ResourceServerUpdateConsentPolicyEnum =
  (typeof ResourceServerUpdateConsentPolicyEnum)[keyof typeof ResourceServerUpdateConsentPolicyEnum];

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
export interface SsProfile {
  /**
   * The unique ID of the self-service Profile.
   *
   */
  id: string;
  /**
   * The name of the self-service Profile.
   *
   */
  name: string;
  /**
   * The description of the self-service Profile.
   *
   */
  description: string;
  /**
   * List of attributes to be mapped that will be shown to the user during the SS-SSO flow.
   *
   */
  user_attributes: Array<SsProfileUserAttributesInner>;
  /**
   * The time when this self-service Profile was created.
   *
   */
  created_at: string;
  /**
   * The time when this self-service Profile was updated.
   *
   */
  updated_at: string;
  /**
   */
  branding: SsProfileBranding;
  /**
   * List of IdP strategies that will be shown to users during the Self-Service SSO flow. Possible values: [`oidc`, `samlp`, `waad`, `google-apps`, `adfs`, `okta`, `keycloak-samlp`, `pingfederate`]
   *
   */
  allowed_strategies: Array<SsProfileAllowedStrategiesEnum>;
}

export const SsProfileAllowedStrategiesEnum = {
  oidc: 'oidc',
  samlp: 'samlp',
  waad: 'waad',
  google_apps: 'google-apps',
  adfs: 'adfs',
  okta: 'okta',
  keycloak_samlp: 'keycloak-samlp',
  pingfederate: 'pingfederate',
} as const;
export type SsProfileAllowedStrategiesEnum =
  (typeof SsProfileAllowedStrategiesEnum)[keyof typeof SsProfileAllowedStrategiesEnum];

/**
 *
 */
export interface SsProfileBranding {
  [key: string]: any | any;
  /**
   */
  logo_url: string;
  /**
   */
  colors: SsProfileBrandingColors;
}
/**
 *
 */
export interface SsProfileBrandingColors {
  [key: string]: any | any;
  /**
   */
  primary: string;
}
/**
 *
 */
export interface SsProfileCreate {
  /**
   * The name of the self-service Profile.
   *
   */
  name: string;
  /**
   * The description of the self-service Profile.
   *
   */
  description?: string;
  /**
   * List of attributes to be mapped that will be shown to the user during the SS-SSO flow.
   *
   */
  user_attributes?: Array<SsProfileUserAttributesInner>;
  /**
   */
  branding?: SsProfileCreateBranding;
  /**
   * List of IdP strategies that will be shown to users during the Self-Service SSO flow. Possible values: [`oidc`, `samlp`, `waad`, `google-apps`, `adfs`, `okta`, `keycloak-samlp`, `pingfederate`]
   *
   */
  allowed_strategies?: Array<SsProfileCreateAllowedStrategiesEnum>;
}

export const SsProfileCreateAllowedStrategiesEnum = {
  oidc: 'oidc',
  samlp: 'samlp',
  waad: 'waad',
  google_apps: 'google-apps',
  adfs: 'adfs',
  okta: 'okta',
  keycloak_samlp: 'keycloak-samlp',
  pingfederate: 'pingfederate',
} as const;
export type SsProfileCreateAllowedStrategiesEnum =
  (typeof SsProfileCreateAllowedStrategiesEnum)[keyof typeof SsProfileCreateAllowedStrategiesEnum];

/**
 *
 */
export interface SsProfileCreateBranding {
  [key: string]: any | any;
  /**
   */
  logo_url?: string;
  /**
   */
  colors?: SsProfileBrandingColors;
}
/**
 *
 */
export interface SsProfileUpdate {
  /**
   * The name of the self-service Profile.
   *
   */
  name?: string;
  /**
   * The description of the self-service Profile.
   *
   */
  description?: string | null;
  /**
   * List of attributes to be mapped that will be shown to the user during the SS-SSO flow.
   *
   */
  user_attributes?: Array<SsProfileUserAttributesInner> | null;
  /**
   */
  branding?: SsProfileUpdateBranding | null;
  /**
   * List of IdP strategies that will be shown to users during the Self-Service SSO flow. Possible values: [`oidc`, `samlp`, `waad`, `google-apps`, `adfs`, `okta`, `keycloak-samlp`, `pingfederate`]
   *
   */
  allowed_strategies?: Array<SsProfileUpdateAllowedStrategiesEnum>;
}

export const SsProfileUpdateAllowedStrategiesEnum = {
  oidc: 'oidc',
  samlp: 'samlp',
  waad: 'waad',
  google_apps: 'google-apps',
  adfs: 'adfs',
  okta: 'okta',
  keycloak_samlp: 'keycloak-samlp',
  pingfederate: 'pingfederate',
} as const;
export type SsProfileUpdateAllowedStrategiesEnum =
  (typeof SsProfileUpdateAllowedStrategiesEnum)[keyof typeof SsProfileUpdateAllowedStrategiesEnum];

/**
 *
 */
export interface SsProfileUpdateBranding {
  [key: string]: any | any;
  /**
   */
  logo_url?: string;
  /**
   */
  colors?: SsProfileBrandingColors;
}
/**
 *
 */
export interface SsProfileUserAttributesInner {
  /**
   * Identifier of this attribute.
   *
   */
  name: string;
  /**
   * Description of this attribute.
   *
   */
  description: string;
  /**
   * Determines if this attribute is required
   *
   */
  is_optional: boolean;
}
/**
 *
 */
export interface SsoAccessTicketResponse {
  /**
   * The URL for the created ticket.
   *
   */
  ticket: string;
}
/**
 *
 */
export interface SsoTicketRequestJson {
  /**
   * If provided, this will allow editing of the provided connection during the SSO Flow
   *
   */
  connection_id?: string;
  /**
   */
  connection_config?: SsoTicketRequestJsonConnectionConfig;
  /**
   * List of client_ids that the connection will be enabled for.
   *
   */
  enabled_clients?: Array<string>;
  /**
   * List of organizations that the connection will be enabled for.
   *
   */
  enabled_organizations?: Array<SsoTicketRequestJsonEnabledOrganizationsInner>;
}
/**
 * If provided, this will create a new connection for the SSO flow with the given configuration
 */
export interface SsoTicketRequestJsonConnectionConfig {
  /**
   * The name of the connection that will be created as a part of the SSO flow.
   *
   */
  name: string;
}
/**
 *
 */
export interface SsoTicketRequestJsonEnabledOrganizationsInner {
  /**
   * Organization identifier
   *
   */
  organization_id: string;
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
  /**
   * Supported ACR values
   *
   */
  acr_values_supported: Array<string>;
  /**
   */
  mtls: TenantSettingsMtls | null;
  /**
   * Enables the use of Pushed Authorization Requests
   *
   */
  pushed_authorization_requests_supported: boolean;
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
  /**
   * Removes alg property from jwks .well-known endpoint
   *
   */
  remove_alg_from_jwks: boolean;
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
 * mTLS configuration.
 */
export interface TenantSettingsMtls {
  /**
   * If true, enables mTLS endpoint aliases
   *
   */
  enable_endpoint_aliases: boolean;
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
  /**
   * Supported ACR values
   *
   */
  acr_values_supported?: Array<string>;
  /**
   */
  mtls?: TenantSettingsUpdateMtls | null;
  /**
   * Enables the use of Pushed Authorization Requests
   *
   */
  pushed_authorization_requests_supported?: boolean | null;
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
  /**
   * Removes alg property from jwks .well-known endpoint
   *
   */
  remove_alg_from_jwks?: boolean;
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
 * mTLS configuration.
 */
export interface TenantSettingsUpdateMtls {
  /**
   * If true, enables mTLS endpoint aliases
   *
   */
  enable_endpoint_aliases?: boolean;
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
export interface UpdatePhoneProviderRequest {
  /**
   * Name of the phone notification provider
   *
   */
  name?: UpdatePhoneProviderRequestNameEnum;
  /**
   * Whether the provider is enabled (false) or disabled (true).
   *
   */
  disabled?: boolean;
  /**
   */
  credentials?: CreatePhoneProviderRequestCredentials;
  /**
   */
  configuration?: GetBrandingPhoneProviders200ResponseProvidersInnerConfiguration;
}

export const UpdatePhoneProviderRequestNameEnum = {
  twilio: 'twilio',
  custom: 'custom',
} as const;
export type UpdatePhoneProviderRequestNameEnum =
  (typeof UpdatePhoneProviderRequestNameEnum)[keyof typeof UpdatePhoneProviderRequestNameEnum];

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
   * An actions extensibility point. Acceptable values: <code>post-login, credentials-exchange, pre-user-registration, post-user-registration, post-change-password, send-phone-message, custom-email-provider, password-reset-post-challenge</code>
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
   * An actions extensibility point. Acceptable values: <code>post-login, credentials-exchange, pre-user-registration, post-user-registration, post-change-password, send-phone-message, custom-email-provider, password-reset-post-challenge</code>
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
export interface DeletePhoneProviderRequest {
  /**
   */
  id: string;
}
/**
 *
 */
export interface GetBrandingPhoneProvidersRequest {
  /**
   * Whether the provider is enabled (false) or disabled (true).
   *
   */
  disabled?: boolean;
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
export interface GetPhoneProviderRequest {
  /**
   */
  id: string;
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
export interface UpdatePhoneProviderOperationRequest {
  /**
   */
  id: string;
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
  /**
   * A comma separated list of client_ids used to filter the returned clients
   *
   */
  client_ids?: string;
  /**
   * Advanced Query in <a href="http://www.lucenetutorial.com/lucene-query-syntax.html">Lucene</a> syntax.<br /><b>Permitted Queries</b>:<br /><ul><li><i>client_grant.organization_id:{organization_id}</i></li><li><i>client_grant.allow_any_organization:true</i></li></ul><b>Additional Restrictions</b>:<br /><ul><li>Cannot be used in combination with other filters</li><li>Requires use of the <i>from</i> and <i>take</i> paging parameters (checkpoint paginatinon)</li><li>Reduced rate limits apply. See <a href="https://auth0.com/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy/rate-limit-configurations/enterprise-public">Rate Limit Configurations</a></li></ul><i><b>Note</b>: Recent updates may not be immediately reflected in query results</i>
   *
   */
  q?: string;
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
export interface DeleteScimConfigurationRequest {
  /**
   * The id of the connection to delete its SCIM configuration
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteTokensByTokenIdRequest {
  /**
   * The connection id that owns the SCIM token to delete
   *
   */
  id: string;
  /**
   * The id of the scim token to delete
   *
   */
  tokenId: string;
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
   * The amount of entries per page. Defaults to 100 if not provided
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
export interface GetDefaultMappingRequest {
  /**
   * The id of the connection to retrieve its default SCIM mapping
   *
   */
  id: string;
}
/**
 *
 */
export interface GetScimConfigurationRequest {
  /**
   * The id of the connection to retrieve its SCIM configuration
   *
   */
  id: string;
}
/**
 *
 */
export interface GetScimTokensRequest {
  /**
   * The id of the connection to retrieve its SCIM configuration
   *
   */
  id: string;
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
   * The id of the connection to update
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchScimConfigurationOperationRequest {
  /**
   * The id of the connection to update its SCIM configuration
   *
   */
  id: string;
}
/**
 *
 */
export interface PostScimConfigurationOperationRequest {
  /**
   * The id of the connection to create its SCIM configuration
   *
   */
  id: string;
}
/**
 *
 */
export interface PostScimTokenOperationRequest {
  /**
   * The id of the connection to create its SCIM token
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
export interface GetCustomDomainsRequest {
  /**
   * Number of results per page. Defaults to 50.
   *
   */
  take?: number;
  /**
   * Optional Id from which to start selection.
   *
   */
  from?: string;
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
  reset_email_by_code: 'reset_email_by_code',
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
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
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
  reset_email_by_code: 'reset_email_by_code',
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
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
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
  reset_email_by_code: 'reset_email_by_code',
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
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
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
export interface DeleteFlowsByIdRequest {
  /**
   * Flow id
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteFlowsExecutionsByExecutionIdRequest {
  /**
   * Flows id
   *
   */
  flow_id: string;
  /**
   * Flow execution identifier
   *
   */
  execution_id: string;
}
/**
 *
 */
export interface DeleteFlowsVaultConnectionsByIdRequest {
  /**
   * Vault connection id
   *
   */
  id: string;
}

/**
 *
 */
export const GetFlowsHydrateEnum = {
  form_count: 'form_count',
} as const;
export type GetFlowsHydrateEnum = (typeof GetFlowsHydrateEnum)[keyof typeof GetFlowsHydrateEnum];

/**
 *
 */
export interface GetFlowsRequest {
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
   * hydration param
   *
   */
  hydrate?: Array<GetFlowsHydrateEnum>;
  /**
   * flag to filter by sync/async flows
   *
   */
  synchronous?: boolean;
}

/**
 *
 */
export const GetFlowsByIdHydrateEnum = {
  form_count: 'form_count',
} as const;
export type GetFlowsByIdHydrateEnum =
  (typeof GetFlowsByIdHydrateEnum)[keyof typeof GetFlowsByIdHydrateEnum];

/**
 *
 */
export interface GetFlowsByIdRequest {
  /**
   * Flow identifier
   *
   */
  id: string;
  /**
   * hydration param
   *
   */
  hydrate?: Array<GetFlowsByIdHydrateEnum>;
}
/**
 *
 */
export interface GetFlowsExecutionsRequest {
  /**
   * Flow id
   *
   */
  flow_id: string;
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
}

/**
 *
 */
export const GetFlowsExecutionsByExecutionIdHydrateEnum = {
  debug: 'debug',
} as const;
export type GetFlowsExecutionsByExecutionIdHydrateEnum =
  (typeof GetFlowsExecutionsByExecutionIdHydrateEnum)[keyof typeof GetFlowsExecutionsByExecutionIdHydrateEnum];

/**
 *
 */
export interface GetFlowsExecutionsByExecutionIdRequest {
  /**
   * Flow id
   *
   */
  flow_id: string;
  /**
   * Flow execution id
   *
   */
  execution_id: string;
  /**
   * Hydration param
   *
   */
  hydrate?: Array<GetFlowsExecutionsByExecutionIdHydrateEnum>;
}
/**
 *
 */
export interface GetFlowsVaultConnectionsRequest {
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
export interface GetFlowsVaultConnectionsByIdRequest {
  /**
   * Flows Vault connection ID
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchFlowsByIdOperationRequest {
  /**
   * Flow identifier
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchFlowsVaultConnectionsByIdOperationRequest {
  /**
   * Flows Vault connection ID
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteFormsByIdRequest {
  /**
   * Form id
   *
   */
  id: string;
}

/**
 *
 */
export const GetFormsHydrateEnum = {
  flow_count: 'flow_count',
  links: 'links',
} as const;
export type GetFormsHydrateEnum = (typeof GetFormsHydrateEnum)[keyof typeof GetFormsHydrateEnum];

/**
 *
 */
export interface GetFormsRequest {
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
   * hydration param
   *
   */
  hydrate?: Array<GetFormsHydrateEnum>;
}

/**
 *
 */
export const GetFormsByIdHydrateEnum = {
  flow_count: 'flow_count',
  links: 'links',
} as const;
export type GetFormsByIdHydrateEnum =
  (typeof GetFormsByIdHydrateEnum)[keyof typeof GetFormsByIdHydrateEnum];

/**
 *
 */
export interface GetFormsByIdRequest {
  /**
   * Form identifier
   *
   */
  id: string;
  /**
   * hydration param
   *
   */
  hydrate?: Array<GetFormsByIdHydrateEnum>;
}
/**
 *
 */
export interface PatchFormsByIdOperationRequest {
  /**
   * Form identifier
   *
   */
  id: string;
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
export interface DeleteEncryptionKeyRequest {
  /**
   * Encryption key ID
   *
   */
  kid: string;
}
/**
 *
 */
export interface GetEncryptionKeyRequest {
  /**
   * Encryption key ID
   *
   */
  kid: string;
}
/**
 *
 */
export interface GetEncryptionKeysRequest {
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page. Default value is 50, maximum value is 100.
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
export interface PostEncryptionKeyOperationRequest {
  /**
   * Encryption key ID
   *
   */
  kid: string;
}
/**
 *
 */
export interface PostEncryptionWrappingKeyRequest {
  /**
   * Encryption key ID
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
export interface DeleteNetworkAclsByIdRequest {
  /**
   * The id of the ACL to delete
   *
   */
  id: string;
}
/**
 *
 */
export interface GetNetworkAclsRequest {
  /**
   * Use this field to request a specific page of the list results.
   *
   */
  page?: number;
  /**
   * The amount of results per page.
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
export interface GetNetworkAclsByIdRequest {
  /**
   * The id of the access control list to retrieve.
   *
   */
  id: string;
}
/**
 *
 */
export interface PutNetworkAclsByIdOperationRequest {
  /**
   * The id of the ACL to update.
   *
   */
  id: string;
}
/**
 *
 */
export interface DeleteClientGrantsByGrantIdRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * The Client Grant ID to remove from the organization
   *
   */
  grant_id: string;
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
export interface GetOrganizationClientGrantsRequest {
  /**
   * Organization identifier
   *
   */
  id: string;
  /**
   * Optional filter on audience of the client grant.
   *
   */
  audience?: string;
  /**
   * Optional filter on client_id of the client grant.
   *
   */
  client_id?: string;
  /**
   * A list of grant ids, which will filter the results.
   *
   */
  grant_ids?: Array<string>;
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
export interface PostOrganizationClientGrantsOperationRequest {
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
  email_identifier_challenge: 'email-identifier-challenge',
  reset_password: 'reset-password',
  custom_form: 'custom-form',
  consent: 'consent',
  customized_consent: 'customized-consent',
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
  captcha: 'captcha',
} as const;
export type GetCustomTextByLanguagePromptEnum =
  (typeof GetCustomTextByLanguagePromptEnum)[keyof typeof GetCustomTextByLanguagePromptEnum];

/**
 *
 */
export const GetCustomTextByLanguageLanguageEnum = {
  am: 'am',
  ar: 'ar',
  ar_EG: 'ar-EG',
  ar_SA: 'ar-SA',
  az: 'az',
  bg: 'bg',
  bn: 'bn',
  bs: 'bs',
  ca_ES: 'ca-ES',
  cnr: 'cnr',
  cs: 'cs',
  cy: 'cy',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  en_CA: 'en-CA',
  es: 'es',
  es_419: 'es-419',
  es_AR: 'es-AR',
  es_MX: 'es-MX',
  et: 'et',
  eu_ES: 'eu-ES',
  fa: 'fa',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
  gl_ES: 'gl-ES',
  gu: 'gu',
  he: 'he',
  hi: 'hi',
  hr: 'hr',
  hu: 'hu',
  hy: 'hy',
  id: 'id',
  is: 'is',
  it: 'it',
  ja: 'ja',
  ka: 'ka',
  kk: 'kk',
  kn: 'kn',
  ko: 'ko',
  lt: 'lt',
  lv: 'lv',
  mk: 'mk',
  ml: 'ml',
  mn: 'mn',
  mr: 'mr',
  ms: 'ms',
  my: 'my',
  nb: 'nb',
  nl: 'nl',
  nn: 'nn',
  no: 'no',
  pa: 'pa',
  pl: 'pl',
  pt: 'pt',
  pt_BR: 'pt-BR',
  pt_PT: 'pt-PT',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  so: 'so',
  sq: 'sq',
  sr: 'sr',
  sv: 'sv',
  sw: 'sw',
  ta: 'ta',
  te: 'te',
  th: 'th',
  tl: 'tl',
  tr: 'tr',
  uk: 'uk',
  ur: 'ur',
  vi: 'vi',
  zgh: 'zgh',
  zh_CN: 'zh-CN',
  zh_HK: 'zh-HK',
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
  login_passwordless: 'login-passwordless',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
  customized_consent: 'customized-consent',
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
export const GetRenderingPromptEnum = {
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
  email_identifier_challenge: 'email-identifier-challenge',
  reset_password: 'reset-password',
  custom_form: 'custom-form',
  consent: 'consent',
  customized_consent: 'customized-consent',
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
  captcha: 'captcha',
} as const;
export type GetRenderingPromptEnum =
  (typeof GetRenderingPromptEnum)[keyof typeof GetRenderingPromptEnum];

/**
 *
 */
export const GetRenderingScreenEnum = {
  login: 'login',
  login_id: 'login-id',
  login_password: 'login-password',
  login_passwordless_email_code: 'login-passwordless-email-code',
  login_passwordless_email_link: 'login-passwordless-email-link',
  login_passwordless_sms_otp: 'login-passwordless-sms-otp',
  login_email_verification: 'login-email-verification',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
  phone_identifier_enrollment: 'phone-identifier-enrollment',
  phone_identifier_challenge: 'phone-identifier-challenge',
  email_identifier_challenge: 'email-identifier-challenge',
  reset_password_request: 'reset-password-request',
  reset_password_email: 'reset-password-email',
  reset_password: 'reset-password',
  reset_password_success: 'reset-password-success',
  reset_password_error: 'reset-password-error',
  reset_password_mfa_email_challenge: 'reset-password-mfa-email-challenge',
  reset_password_mfa_otp_challenge: 'reset-password-mfa-otp-challenge',
  reset_password_mfa_phone_challenge: 'reset-password-mfa-phone-challenge',
  reset_password_mfa_push_challenge_push: 'reset-password-mfa-push-challenge-push',
  reset_password_mfa_recovery_code_challenge: 'reset-password-mfa-recovery-code-challenge',
  reset_password_mfa_sms_challenge: 'reset-password-mfa-sms-challenge',
  reset_password_mfa_voice_challenge: 'reset-password-mfa-voice-challenge',
  reset_password_mfa_webauthn_platform_challenge: 'reset-password-mfa-webauthn-platform-challenge',
  reset_password_mfa_webauthn_roaming_challenge: 'reset-password-mfa-webauthn-roaming-challenge',
  custom_form: 'custom-form',
  consent: 'consent',
  customized_consent: 'customized-consent',
  logout: 'logout',
  logout_complete: 'logout-complete',
  logout_aborted: 'logout-aborted',
  mfa_push_welcome: 'mfa-push-welcome',
  mfa_push_enrollment_qr: 'mfa-push-enrollment-qr',
  mfa_push_enrollment_code: 'mfa-push-enrollment-code',
  mfa_push_success: 'mfa-push-success',
  mfa_push_challenge_push: 'mfa-push-challenge-push',
  mfa_push_list: 'mfa-push-list',
  mfa_otp_enrollment_qr: 'mfa-otp-enrollment-qr',
  mfa_otp_enrollment_code: 'mfa-otp-enrollment-code',
  mfa_otp_challenge: 'mfa-otp-challenge',
  mfa_voice_enrollment: 'mfa-voice-enrollment',
  mfa_voice_challenge: 'mfa-voice-challenge',
  mfa_phone_challenge: 'mfa-phone-challenge',
  mfa_phone_enrollment: 'mfa-phone-enrollment',
  mfa_webauthn_platform_enrollment: 'mfa-webauthn-platform-enrollment',
  mfa_webauthn_roaming_enrollment: 'mfa-webauthn-roaming-enrollment',
  mfa_webauthn_platform_challenge: 'mfa-webauthn-platform-challenge',
  mfa_webauthn_roaming_challenge: 'mfa-webauthn-roaming-challenge',
  mfa_webauthn_change_key_nickname: 'mfa-webauthn-change-key-nickname',
  mfa_webauthn_enrollment_success: 'mfa-webauthn-enrollment-success',
  mfa_webauthn_error: 'mfa-webauthn-error',
  mfa_webauthn_not_available_error: 'mfa-webauthn-not-available-error',
  mfa_country_codes: 'mfa-country-codes',
  mfa_sms_enrollment: 'mfa-sms-enrollment',
  mfa_sms_challenge: 'mfa-sms-challenge',
  mfa_sms_list: 'mfa-sms-list',
  mfa_email_challenge: 'mfa-email-challenge',
  mfa_email_list: 'mfa-email-list',
  mfa_recovery_code_enrollment: 'mfa-recovery-code-enrollment',
  mfa_recovery_code_challenge: 'mfa-recovery-code-challenge',
  mfa_detect_browser_capabilities: 'mfa-detect-browser-capabilities',
  mfa_enroll_result: 'mfa-enroll-result',
  mfa_login_options: 'mfa-login-options',
  mfa_begin_enroll_options: 'mfa-begin-enroll-options',
  status: 'status',
  device_code_activation: 'device-code-activation',
  device_code_activation_allowed: 'device-code-activation-allowed',
  device_code_activation_denied: 'device-code-activation-denied',
  device_code_confirmation: 'device-code-confirmation',
  email_verification_result: 'email-verification-result',
  email_otp_challenge: 'email-otp-challenge',
  organization_selection: 'organization-selection',
  organization_picker: 'organization-picker',
  accept_invitation: 'accept-invitation',
  redeem_ticket: 'redeem-ticket',
  passkey_enrollment: 'passkey-enrollment',
  passkey_enrollment_local: 'passkey-enrollment-local',
  interstitial_captcha: 'interstitial-captcha',
} as const;
export type GetRenderingScreenEnum =
  (typeof GetRenderingScreenEnum)[keyof typeof GetRenderingScreenEnum];

/**
 *
 */
export interface GetRenderingRequest {
  /**
   * Name of the prompt
   *
   */
  prompt: GetRenderingPromptEnum;
  /**
   * Name of the screen
   *
   */
  screen: GetRenderingScreenEnum;
}

/**
 *
 */
export const PatchRenderingOperationPromptEnum = {
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
  email_identifier_challenge: 'email-identifier-challenge',
  reset_password: 'reset-password',
  custom_form: 'custom-form',
  consent: 'consent',
  customized_consent: 'customized-consent',
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
  captcha: 'captcha',
} as const;
export type PatchRenderingOperationPromptEnum =
  (typeof PatchRenderingOperationPromptEnum)[keyof typeof PatchRenderingOperationPromptEnum];

/**
 *
 */
export const PatchRenderingOperationScreenEnum = {
  login: 'login',
  login_id: 'login-id',
  login_password: 'login-password',
  login_passwordless_email_code: 'login-passwordless-email-code',
  login_passwordless_email_link: 'login-passwordless-email-link',
  login_passwordless_sms_otp: 'login-passwordless-sms-otp',
  login_email_verification: 'login-email-verification',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
  phone_identifier_enrollment: 'phone-identifier-enrollment',
  phone_identifier_challenge: 'phone-identifier-challenge',
  email_identifier_challenge: 'email-identifier-challenge',
  reset_password_request: 'reset-password-request',
  reset_password_email: 'reset-password-email',
  reset_password: 'reset-password',
  reset_password_success: 'reset-password-success',
  reset_password_error: 'reset-password-error',
  reset_password_mfa_email_challenge: 'reset-password-mfa-email-challenge',
  reset_password_mfa_otp_challenge: 'reset-password-mfa-otp-challenge',
  reset_password_mfa_phone_challenge: 'reset-password-mfa-phone-challenge',
  reset_password_mfa_push_challenge_push: 'reset-password-mfa-push-challenge-push',
  reset_password_mfa_recovery_code_challenge: 'reset-password-mfa-recovery-code-challenge',
  reset_password_mfa_sms_challenge: 'reset-password-mfa-sms-challenge',
  reset_password_mfa_voice_challenge: 'reset-password-mfa-voice-challenge',
  reset_password_mfa_webauthn_platform_challenge: 'reset-password-mfa-webauthn-platform-challenge',
  reset_password_mfa_webauthn_roaming_challenge: 'reset-password-mfa-webauthn-roaming-challenge',
  custom_form: 'custom-form',
  consent: 'consent',
  customized_consent: 'customized-consent',
  logout: 'logout',
  logout_complete: 'logout-complete',
  logout_aborted: 'logout-aborted',
  mfa_push_welcome: 'mfa-push-welcome',
  mfa_push_enrollment_qr: 'mfa-push-enrollment-qr',
  mfa_push_enrollment_code: 'mfa-push-enrollment-code',
  mfa_push_success: 'mfa-push-success',
  mfa_push_challenge_push: 'mfa-push-challenge-push',
  mfa_push_list: 'mfa-push-list',
  mfa_otp_enrollment_qr: 'mfa-otp-enrollment-qr',
  mfa_otp_enrollment_code: 'mfa-otp-enrollment-code',
  mfa_otp_challenge: 'mfa-otp-challenge',
  mfa_voice_enrollment: 'mfa-voice-enrollment',
  mfa_voice_challenge: 'mfa-voice-challenge',
  mfa_phone_challenge: 'mfa-phone-challenge',
  mfa_phone_enrollment: 'mfa-phone-enrollment',
  mfa_webauthn_platform_enrollment: 'mfa-webauthn-platform-enrollment',
  mfa_webauthn_roaming_enrollment: 'mfa-webauthn-roaming-enrollment',
  mfa_webauthn_platform_challenge: 'mfa-webauthn-platform-challenge',
  mfa_webauthn_roaming_challenge: 'mfa-webauthn-roaming-challenge',
  mfa_webauthn_change_key_nickname: 'mfa-webauthn-change-key-nickname',
  mfa_webauthn_enrollment_success: 'mfa-webauthn-enrollment-success',
  mfa_webauthn_error: 'mfa-webauthn-error',
  mfa_webauthn_not_available_error: 'mfa-webauthn-not-available-error',
  mfa_country_codes: 'mfa-country-codes',
  mfa_sms_enrollment: 'mfa-sms-enrollment',
  mfa_sms_challenge: 'mfa-sms-challenge',
  mfa_sms_list: 'mfa-sms-list',
  mfa_email_challenge: 'mfa-email-challenge',
  mfa_email_list: 'mfa-email-list',
  mfa_recovery_code_enrollment: 'mfa-recovery-code-enrollment',
  mfa_recovery_code_challenge: 'mfa-recovery-code-challenge',
  mfa_detect_browser_capabilities: 'mfa-detect-browser-capabilities',
  mfa_enroll_result: 'mfa-enroll-result',
  mfa_login_options: 'mfa-login-options',
  mfa_begin_enroll_options: 'mfa-begin-enroll-options',
  status: 'status',
  device_code_activation: 'device-code-activation',
  device_code_activation_allowed: 'device-code-activation-allowed',
  device_code_activation_denied: 'device-code-activation-denied',
  device_code_confirmation: 'device-code-confirmation',
  email_verification_result: 'email-verification-result',
  email_otp_challenge: 'email-otp-challenge',
  organization_selection: 'organization-selection',
  organization_picker: 'organization-picker',
  accept_invitation: 'accept-invitation',
  redeem_ticket: 'redeem-ticket',
  passkey_enrollment: 'passkey-enrollment',
  passkey_enrollment_local: 'passkey-enrollment-local',
  interstitial_captcha: 'interstitial-captcha',
} as const;
export type PatchRenderingOperationScreenEnum =
  (typeof PatchRenderingOperationScreenEnum)[keyof typeof PatchRenderingOperationScreenEnum];

/**
 *
 */
export interface PatchRenderingOperationRequest {
  /**
   * Name of the prompt
   *
   */
  prompt: PatchRenderingOperationPromptEnum;
  /**
   * Name of the screen
   *
   */
  screen: PatchRenderingOperationScreenEnum;
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
  email_identifier_challenge: 'email-identifier-challenge',
  reset_password: 'reset-password',
  custom_form: 'custom-form',
  consent: 'consent',
  customized_consent: 'customized-consent',
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
  captcha: 'captcha',
} as const;
export type PutCustomTextByLanguagePromptEnum =
  (typeof PutCustomTextByLanguagePromptEnum)[keyof typeof PutCustomTextByLanguagePromptEnum];

/**
 *
 */
export const PutCustomTextByLanguageLanguageEnum = {
  am: 'am',
  ar: 'ar',
  ar_EG: 'ar-EG',
  ar_SA: 'ar-SA',
  az: 'az',
  bg: 'bg',
  bn: 'bn',
  bs: 'bs',
  ca_ES: 'ca-ES',
  cnr: 'cnr',
  cs: 'cs',
  cy: 'cy',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  en_CA: 'en-CA',
  es: 'es',
  es_419: 'es-419',
  es_AR: 'es-AR',
  es_MX: 'es-MX',
  et: 'et',
  eu_ES: 'eu-ES',
  fa: 'fa',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
  gl_ES: 'gl-ES',
  gu: 'gu',
  he: 'he',
  hi: 'hi',
  hr: 'hr',
  hu: 'hu',
  hy: 'hy',
  id: 'id',
  is: 'is',
  it: 'it',
  ja: 'ja',
  ka: 'ka',
  kk: 'kk',
  kn: 'kn',
  ko: 'ko',
  lt: 'lt',
  lv: 'lv',
  mk: 'mk',
  ml: 'ml',
  mn: 'mn',
  mr: 'mr',
  ms: 'ms',
  my: 'my',
  nb: 'nb',
  nl: 'nl',
  nn: 'nn',
  no: 'no',
  pa: 'pa',
  pl: 'pl',
  pt: 'pt',
  pt_BR: 'pt-BR',
  pt_PT: 'pt-PT',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  so: 'so',
  sq: 'sq',
  sr: 'sr',
  sv: 'sv',
  sw: 'sw',
  ta: 'ta',
  te: 'te',
  th: 'th',
  tl: 'tl',
  tr: 'tr',
  uk: 'uk',
  ur: 'ur',
  vi: 'vi',
  zgh: 'zgh',
  zh_CN: 'zh-CN',
  zh_HK: 'zh-HK',
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
  login_passwordless: 'login-passwordless',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
  customized_consent: 'customized-consent',
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
export interface DeleteRefreshTokenRequest {
  /**
   * ID of the refresh token to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetRefreshTokenRequest {
  /**
   * ID refresh token to retrieve
   *
   */
  id: string;
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
   * A list of URI encoded identifiers to filter the results by. Consider URL limits when using this parameter, if the URL is too long, consider chunking the requests
   *
   */
  identifiers?: Array<string>;
  /**
   * Page index of the results to return. First page is 0.
   *
   */
  page?: number;
  /**
   * Number of results per page.
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
export interface DeleteSelfServiceProfilesByIdRequest {
  /**
   * The id of the self-service profile to delete
   *
   */
  id: string;
}

/**
 *
 */
export const GetSelfServiceProfileCustomTextLanguageEnum = {
  en: 'en',
} as const;
export type GetSelfServiceProfileCustomTextLanguageEnum =
  (typeof GetSelfServiceProfileCustomTextLanguageEnum)[keyof typeof GetSelfServiceProfileCustomTextLanguageEnum];

/**
 *
 */
export const GetSelfServiceProfileCustomTextPageEnum = {
  get_started: 'get-started',
} as const;
export type GetSelfServiceProfileCustomTextPageEnum =
  (typeof GetSelfServiceProfileCustomTextPageEnum)[keyof typeof GetSelfServiceProfileCustomTextPageEnum];

/**
 *
 */
export interface GetSelfServiceProfileCustomTextRequest {
  /**
   * The id of the self-service profile.
   *
   */
  id: string;
  /**
   * The language of the custom text.
   *
   */
  language: GetSelfServiceProfileCustomTextLanguageEnum;
  /**
   * The page where the custom text is shown.
   *
   */
  page: GetSelfServiceProfileCustomTextPageEnum;
}
/**
 *
 */
export interface GetSelfServiceProfilesRequest {
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
export interface GetSelfServiceProfilesByIdRequest {
  /**
   * The id of the self-service profile to retrieve
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchSelfServiceProfilesByIdRequest {
  /**
   * The id of the self-service profile to update
   *
   */
  id: string;
}
/**
 *
 */
export interface PostRevokeRequest {
  /**
   * The id of the self-service profile
   *
   */
  profileId: string;
  /**
   * The id of the ticket to revoke
   *
   */
  id: string;
}
/**
 *
 */
export interface PostSsoTicketOperationRequest {
  /**
   * The id of the self-service profile to retrieve
   *
   */
  id: string;
}

/**
 *
 */
export const PutSelfServiceProfileCustomTextLanguageEnum = {
  en: 'en',
} as const;
export type PutSelfServiceProfileCustomTextLanguageEnum =
  (typeof PutSelfServiceProfileCustomTextLanguageEnum)[keyof typeof PutSelfServiceProfileCustomTextLanguageEnum];

/**
 *
 */
export const PutSelfServiceProfileCustomTextPageEnum = {
  get_started: 'get-started',
} as const;
export type PutSelfServiceProfileCustomTextPageEnum =
  (typeof PutSelfServiceProfileCustomTextPageEnum)[keyof typeof PutSelfServiceProfileCustomTextPageEnum];

/**
 *
 */
export interface PutSelfServiceProfileCustomTextRequest {
  /**
   * The id of the self-service profile.
   *
   */
  id: string;
  /**
   * The language of the custom text.
   *
   */
  language: PutSelfServiceProfileCustomTextLanguageEnum;
  /**
   * The page where the custom text is shown.
   *
   */
  page: PutSelfServiceProfileCustomTextPageEnum;
}
/**
 *
 */
export interface DeleteSessionRequest {
  /**
   * ID of the session to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface RevokeSessionRequest {
  /**
   * ID of the session to revoke.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetSessionRequest {
  /**
   * ID of session to retrieve
   *
   */
  id: string;
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
export interface DeleteTokenExchangeProfilesByIdRequest {
  /**
   * ID of the Token Exchange Profile to delete.
   *
   */
  id: string;
}
/**
 *
 */
export interface GetTokenExchangeProfilesRequest {
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
export interface GetTokenExchangeProfilesByIdRequest {
  /**
   * ID of the Token Exchange Profile to retrieve.
   *
   */
  id: string;
}
/**
 *
 */
export interface PatchTokenExchangeProfilesByIdOperationRequest {
  /**
   * ID of the Token Exchange Profile to update.
   *
   */
  id: string;
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
export interface DeleteFederatedConnectionsTokensetsByTokensetIdRequest {
  /**
   * Id of the user that owns the tokenset
   *
   */
  id: string;
  /**
   * The tokenset id
   *
   */
  tokenset_id: string;
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
export interface DeleteRefreshTokensForUserRequest {
  /**
   * ID of the user to get remove refresh tokens for
   *
   */
  user_id: string;
}
/**
 *
 */
export interface DeleteSessionsForUserRequest {
  /**
   * ID of the user to get sessions for
   *
   */
  user_id: string;
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
export interface GetFederatedConnectionsTokensetsRequest {
  /**
   * User identifier
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
export interface GetRefreshTokensForUserRequest {
  /**
   * ID of the user to get refresh tokens for
   *
   */
  user_id: string;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional token ID from which to start selection (exclusive).
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
export interface GetSessionsForUserRequest {
  /**
   * ID of the user to get sessions for
   *
   */
  user_id: string;
  /**
   * Return results inside an object that contains the total result count (true) or as a direct array of results (false, default).
   *
   */
  include_totals?: boolean;
  /**
   * Optional session ID from which to start selection (exclusive).
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
