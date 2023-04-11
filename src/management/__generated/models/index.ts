/**
 *
 * @export
 * @interface Client
 */
export interface Client {
  /**
   * ID of this client.
   * @type {string}
   */
  client_id?: string;
  /**
   * Name of the tenant this client belongs to.
   * @type {string}
   */
  tenant?: string;
  /**
   * Name of this client (min length: 1 character, does not allow `<` or `>`).
   * @type {string}
   */
  name?: string;
  /**
   * Free text description of this client (max length: 140 characters).
   * @type {string}
   */
  description?: string;
  /**
   * Whether this is your global 'All Applications' client representing legacy tenant settings (true) or a regular client (false).
   * @type {boolean}
   */
  global?: boolean;
  /**
   * Client secret (which you must not make public).
   * @type {string}
   */
  client_secret?: string;
  /**
   * Type of client used to determine which settings are applicable. Can be `spa`, `native`, `non_interactive`, or `regular_web`.
   * @type {string}
   */
  app_type?: string;
  /**
   * URL of the logo to display for this client. Recommended size is 150x150 pixels.
   * @type {string}
   */
  logo_uri?: string;
  /**
   * Whether this client a first party client (true) or not (false).
   * @type {boolean}
   */
  is_first_party?: boolean;
  /**
   * Whether this client conforms to <a href='https://auth0.com/docs/api-auth/tutorials/adoption'>strict OIDC specifications</a> (true) or uses legacy features (false).
   * @type {boolean}
   */
  oidc_conformant?: boolean;
  /**
   * Comma-separated list of URLs whitelisted for Auth0 to use as a callback to the client after authentication.
   * @type {Array<string>}
   */
  callbacks?: Array<string>;
  /**
   * Comma-separated list of URLs allowed to make requests from JavaScript to Auth0 API (typically used with CORS). By default, all your callback URLs will be allowed. This field allows you to enter other origins if necessary. You can also use wildcards at the subdomain level (e.g., https://*.contoso.com). Query strings and hash information are not taken into account when validating these URLs.
   * @type {Array<string>}
   */
  allowed_origins?: Array<string>;
  /**
   * Comma-separated list of allowed origins for use with <a href='https://auth0.com/docs/cross-origin-authentication'>Cross-Origin Authentication</a>, <a href='https://auth0.com/docs/flows/concepts/device-auth'>Device Flow</a>, and <a href='https://auth0.com/docs/protocols/oauth2#how-response-mode-works'>web message response mode</a>.
   * @type {Array<string>}
   */
  web_origins?: Array<string>;
  /**
   * List of audiences/realms for SAML protocol. Used by the wsfed addon.
   * @type {Array<string>}
   */
  client_aliases?: Array<string>;
  /**
   * List of allow clients and API ids that are allowed to make delegation requests. Empty means all all your clients are allowed.
   * @type {Array<string>}
   */
  allowed_clients?: Array<string>;
  /**
   * Comma-separated list of URLs that are valid to redirect to after logout from Auth0. Wildcards are allowed for subdomains.
   * @type {Array<string>}
   */
  allowed_logout_urls?: Array<string>;
  /**
   * @type {ClientOidcBackchannelLogout}
   */
  oidc_backchannel_logout?: ClientOidcBackchannelLogout;
  /**
   * List of grant types supported for this application. Can include `authorization_code`, `implicit`, `refresh_token`, `client_credentials`, `password`, `http://auth0.com/oauth/grant-type/password-realm`, `http://auth0.com/oauth/grant-type/mfa-oob`, `http://auth0.com/oauth/grant-type/mfa-otp`, `http://auth0.com/oauth/grant-type/mfa-recovery-code`, and `urn:ietf:params:oauth:grant-type:device_code`.
   * @type {Array<string>}
   */
  grant_types?: Array<string>;
  /**
   * @type {ClientJwtConfiguration}
   */
  jwt_configuration?: ClientJwtConfiguration;
  /**
   * Signing certificates associated with this client.
   * @type {Array<ClientSigningKeysInner>}
   */
  signing_keys?: Array<ClientSigningKeysInner>;
  /**
   * @type {ClientEncryptionKey}
   */
  encryption_key?: ClientEncryptionKey | null;
  /**
   * Applies only to SSO clients and determines whether Auth0 will handle Single Sign On (true) or whether the Identity Provider will (false).
   * @type {boolean}
   */
  sso?: boolean;
  /**
   * Whether Single Sign On is disabled (true) or enabled (true). Defaults to true.
   * @type {boolean}
   */
  sso_disabled?: boolean;
  /**
   * URL of the location in your site where the cross origin verification takes place for the cross-origin auth flow when performing Auth in your own domain instead of Auth0 hosted login page.
   * @type {string}
   */
  cross_origin_loc?: string;
  /**
   * Whether a custom login page is to be used (true) or the default provided login page (false).
   * @type {boolean}
   */
  custom_login_page_on?: boolean;
  /**
   * The content (HTML, CSS, JS) of the custom login page.
   * @type {string}
   */
  custom_login_page?: string;
  /**
   * The content (HTML, CSS, JS) of the custom login page. (Used on Previews)
   * @type {string}
   */
  custom_login_page_preview?: string;
  /**
   * HTML form template to be used for WS-Federation.
   * @type {string}
   */
  form_template?: string;
  /**
   * @type {ClientAddons}
   */
  addons?: ClientAddons;
  /**
   * Defines the requested authentication method for the token endpoint. Can be `none` (public client without a client secret), `client_secret_post` (client uses HTTP POST parameters), or `client_secret_basic` (client uses HTTP Basic).
   * @type {string}
   */
  token_endpoint_auth_method?: ClientTokenEndpointAuthMethodEnum;
  /**
   * Metadata associated with the client, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.  Field names (max 255 chars) are alphanumeric and may only include the following special characters:  :,-+=_*?"/\()><@	[Tab] [Space]
   * @type {{ [key: string]: any; }}
   */
  client_metadata?: { [key: string]: any };
  /**
   * @type {ClientMobile}
   */
  mobile?: ClientMobile;
  /**
   * Initiate login uri, must be https
   * @type {string}
   */
  initiate_login_uri?: string;
  /**
   * @type {ClientNativeSocialLogin}
   */
  native_social_login?: ClientNativeSocialLogin | null;
  /**
   * @type {ClientRefreshToken}
   */
  refresh_token?: ClientRefreshToken | null;
  /**
   * Defines how to proceed during an authentication transaction with regards an organization. Can be `deny` (default), `allow` or `require`.
   * @type {string}
   */
  organization_usage?: ClientOrganizationUsageEnum;
  /**
   * Defines how to proceed during an authentication transaction when `client.organization_usage: 'require'`. Can be `no_prompt` (default) or `pre_login_prompt`.
   * @type {string}
   */
  organization_require_behavior?: ClientOrganizationRequireBehaviorEnum;
}

/**
 * @export
 */
export const ClientTokenEndpointAuthMethodEnum = {
  none: 'none',
  client_secret_post: 'client_secret_post',
  client_secret_basic: 'client_secret_basic',
} as const;
export type ClientTokenEndpointAuthMethodEnum =
  typeof ClientTokenEndpointAuthMethodEnum[keyof typeof ClientTokenEndpointAuthMethodEnum];

/**
 * @export
 */
export const ClientOrganizationUsageEnum = {
  deny: 'deny',
  allow: 'allow',
  require: 'require',
} as const;
export type ClientOrganizationUsageEnum =
  typeof ClientOrganizationUsageEnum[keyof typeof ClientOrganizationUsageEnum];

/**
 * @export
 */
export const ClientOrganizationRequireBehaviorEnum = {
  no_prompt: 'no_prompt',
  pre_login_prompt: 'pre_login_prompt',
  post_login_prompt: 'post_login_prompt',
} as const;
export type ClientOrganizationRequireBehaviorEnum =
  typeof ClientOrganizationRequireBehaviorEnum[keyof typeof ClientOrganizationRequireBehaviorEnum];

/**
 * Addons enabled for this client and their associated configurations.
 * @export
 * @interface ClientAddons
 */
export interface ClientAddons {
  /**
   * @type {ClientAddonsAws}
   */
  aws?: ClientAddonsAws;
  /**
   * @type {ClientAddonsAzureBlob}
   */
  azure_blob?: ClientAddonsAzureBlob;
  /**
   * @type {ClientAddonsAzureSb}
   */
  azure_sb?: ClientAddonsAzureSb;
  /**
   * @type {ClientAddonsRms}
   */
  rms?: ClientAddonsRms;
  /**
   * @type {ClientAddonsMscrm}
   */
  mscrm?: ClientAddonsMscrm;
  /**
   * @type {ClientAddonsSlack}
   */
  slack?: ClientAddonsSlack;
  /**
   * @type {ClientAddonsSentry}
   */
  sentry?: ClientAddonsSentry;
  /**
   * Box SSO indicator (no configuration settings needed for Box SSO).
   * @type {{ [key: string]: any; }}
   */
  box?: { [key: string]: any };
  /**
   * CloudBees SSO indicator (no configuration settings needed for CloudBees SSO).
   * @type {{ [key: string]: any; }}
   */
  cloudbees?: { [key: string]: any };
  /**
   * Concur SSO indicator (no configuration settings needed for Concur SSO).
   * @type {{ [key: string]: any; }}
   */
  concur?: { [key: string]: any };
  /**
   * Dropbox SSO indicator (no configuration settings needed for Dropbox SSO).
   * @type {{ [key: string]: any; }}
   */
  dropbox?: { [key: string]: any };
  /**
   * @type {ClientAddonsEchosign}
   */
  echosign?: ClientAddonsEchosign;
  /**
   * @type {ClientAddonsEgnyte}
   */
  egnyte?: ClientAddonsEgnyte;
  /**
   * @type {ClientAddonsFirebase}
   */
  firebase?: ClientAddonsFirebase;
  /**
   * @type {ClientAddonsNewrelic}
   */
  newrelic?: ClientAddonsNewrelic;
  /**
   * @type {ClientAddonsOffice365}
   */
  office365?: ClientAddonsOffice365;
  /**
   * @type {ClientAddonsSalesforce}
   */
  salesforce?: ClientAddonsSalesforce;
  /**
   * @type {ClientAddonsSalesforceApi}
   */
  salesforce_api?: ClientAddonsSalesforceApi;
  /**
   * @type {ClientAddonsSalesforceSandboxApi}
   */
  salesforce_sandbox_api?: ClientAddonsSalesforceSandboxApi;
  /**
   * @type {ClientAddonsSamlp}
   */
  samlp?: ClientAddonsSamlp;
  /**
   * @type {ClientAddonsLayer}
   */
  layer?: ClientAddonsLayer;
  /**
   * @type {ClientAddonsSapApi}
   */
  sap_api?: ClientAddonsSapApi;
  /**
   * @type {ClientAddonsSharepoint}
   */
  sharepoint?: ClientAddonsSharepoint;
  /**
   * @type {ClientAddonsSpringcm}
   */
  springcm?: ClientAddonsSpringcm;
  /**
   * @type {ClientAddonsWams}
   */
  wams?: ClientAddonsWams;
  /**
   * WS-Fed (WIF) addon indicator. Actual configuration is stored in `callback` and `client_aliases` properties on the client.
   * @type {{ [key: string]: any; }}
   */
  wsfed?: { [key: string]: any };
  /**
   * @type {ClientAddonsZendesk}
   */
  zendesk?: ClientAddonsZendesk;
  /**
   * @type {ClientAddonsZoom}
   */
  zoom?: ClientAddonsZoom;
  /**
   * @type {ClientAddonsSsoIntegration}
   */
  sso_integration?: ClientAddonsSsoIntegration;
}
/**
 * AWS addon configuration.
 * @export
 * @interface ClientAddonsAws
 */
export interface ClientAddonsAws {
  /**
   * AWS principal ARN, e.g. `arn:aws:iam::010616021751:saml-provider/idpname`
   * @type {string}
   */
  principal?: string;
  /**
   * AWS role ARN, e.g. `arn:aws:iam::010616021751:role/foo`
   * @type {string}
   */
  role?: string;
  /**
   * AWS token lifetime in seconds
   * @type {number}
   */
  lifetime_in_seconds?: number;
}
/**
 * Azure Blob Storage addon configuration.
 * @export
 * @interface ClientAddonsAzureBlob
 */
export interface ClientAddonsAzureBlob {
  /**
   * Your Azure storage account name. Usually first segment in your Azure storage URL. e.g. `https://acme-org.blob.core.windows.net` would be the account name `acme-org`.
   * @type {string}
   */
  accountName?: string;
  /**
   * Access key associated with this storage account.
   * @type {string}
   */
  storageAccessKey?: string;
  /**
   * Container to request a token for. e.g. `my-container`.
   * @type {string}
   */
  containerName?: string;
  /**
   * Entity to request a token for. e.g. `my-blob`. If blank the computed SAS will apply to the entire storage container.
   * @type {string}
   */
  blobName?: string;
  /**
   * Expiration in minutes for the generated token (default of 5 minutes).
   * @type {number}
   */
  expiration?: number;
  /**
   * Shared access policy identifier defined in your storage account resource.
   * @type {string}
   */
  signedIdentifier?: string;
  /**
   * Indicates if the issued token has permission to read the content, properties, metadata and block list. Use the blob as the source of a copy operation.
   * @type {boolean}
   */
  blob_read?: boolean;
  /**
   * Indicates if the issued token has permission to create or write content, properties, metadata, or block list. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation within the same account.
   * @type {boolean}
   */
  blob_write?: boolean;
  /**
   * Indicates if the issued token has permission to delete the blob.
   * @type {boolean}
   */
  blob_delete?: boolean;
  /**
   * Indicates if the issued token has permission to read the content, properties, metadata or block list of any blob in the container. Use any blob in the container as the source of a copy operation
   * @type {boolean}
   */
  container_read?: boolean;
  /**
   * Indicates that for any blob in the container if the issued token has permission to create or write content, properties, metadata, or block list. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation within the same account.
   * @type {boolean}
   */
  container_write?: boolean;
  /**
   * Indicates if issued token has permission to delete any blob in the container.
   * @type {boolean}
   */
  container_delete?: boolean;
  /**
   * Indicates if the issued token has permission to list blobs in the container.
   * @type {boolean}
   */
  container_list?: boolean;
}
/**
 * Azure Storage Bus addon configuration.
 * @export
 * @interface ClientAddonsAzureSb
 */
export interface ClientAddonsAzureSb {
  /**
   * Your Azure Service Bus namespace. Usually the first segment of your Service Bus URL (e.g. `https://acme-org.servicebus.windows.net` would be `acme-org`).
   * @type {string}
   */
  namespace?: string;
  /**
   * Your shared access policy name defined in your Service Bus entity.
   * @type {string}
   */
  sasKeyName?: string;
  /**
   * Primary Key associated with your shared access policy.
   * @type {string}
   */
  sasKey?: string;
  /**
   * Entity you want to request a token for. e.g. `my-queue`.'
   * @type {string}
   */
  entityPath?: string;
  /**
   * Optional expiration in minutes for the generated token. Defaults to 5 minutes.
   * @type {number}
   */
  expiration?: number;
}
/**
 * Adobe EchoSign SSO configuration.
 * @export
 * @interface ClientAddonsEchosign
 */
export interface ClientAddonsEchosign {
  /**
   * Your custom domain found in your EchoSign URL. e.g. `https://acme-org.echosign.com` would be `acme-org`.
   * @type {string}
   */
  domain?: string;
}
/**
 * Egnyte SSO configuration.
 * @export
 * @interface ClientAddonsEgnyte
 */
export interface ClientAddonsEgnyte {
  /**
   * Your custom domain found in your Egnyte URL. e.g. `https://acme-org.egnyte.com` would be `acme-org`.
   * @type {string}
   */
  domain?: string;
}
/**
 * Google Firebase addon configuration.
 * @export
 * @interface ClientAddonsFirebase
 */
export interface ClientAddonsFirebase {
  /**
   * Google Firebase Secret. (SDK 2 only).
   * @type {string}
   */
  secret?: string;
  /**
   * Optional ID of the private key to obtain kid header in the issued token (SDK v3+ tokens only).
   * @type {string}
   */
  private_key_id?: string;
  /**
   * Private Key for signing the token (SDK v3+ tokens only).
   * @type {string}
   */
  private_key?: string;
  /**
   * ID of the Service Account you have created (shown as `client_email` in the generated JSON file, SDK v3+ tokens only).
   * @type {string}
   */
  client_email?: string;
  /**
   * Optional expiration in seconds for the generated token. Defaults to 3600 seconds (SDK v3+ tokens only).
   * @type {number}
   */
  lifetime_in_seconds?: number;
}
/**
 * Layer addon configuration.
 * @export
 * @interface ClientAddonsLayer
 */
export interface ClientAddonsLayer {
  /**
   * Provider ID of your Layer account
   * @type {string}
   */
  providerId: string;
  /**
   * Authentication Key identifier used to sign the Layer token.
   * @type {string}
   */
  keyId: string;
  /**
   * Private key for signing the Layer token.
   * @type {string}
   */
  privateKey: string;
  /**
   * Name of the property used as the unique user id in Layer. If not specified `user_id` is used.
   * @type {string}
   */
  principal?: string;
  /**
   * Optional expiration in minutes for the generated token. Defaults to 5 minutes.
   * @type {number}
   */
  expiration?: number;
}
/**
 * Microsoft Dynamics CRM SSO configuration.
 * @export
 * @interface ClientAddonsMscrm
 */
export interface ClientAddonsMscrm {
  /**
   * Microsoft Dynamics CRM application URL.
   * @type {string}
   */
  url: string;
}
/**
 * New Relic SSO configuration.
 * @export
 * @interface ClientAddonsNewrelic
 */
export interface ClientAddonsNewrelic {
  /**
   * Your New Relic Account ID found in your New Relic URL after the `/accounts/` path. e.g. `https://rpm.newrelic.com/accounts/123456/query` would be `123456`.
   * @type {string}
   */
  account?: string;
}
/**
 * Microsoft Office 365 SSO configuration.
 * @export
 * @interface ClientAddonsOffice365
 */
export interface ClientAddonsOffice365 {
  /**
   * Your Office 365 domain name. e.g. `acme-org.com`.
   * @type {string}
   */
  domain?: string;
  /**
   * Optional Auth0 database connection for testing an already-configured Office 365 tenant.
   * @type {string}
   */
  connection?: string;
}
/**
 * Active Directory Rights Management Service SSO configuration.
 * @export
 * @interface ClientAddonsRms
 */
export interface ClientAddonsRms {
  /**
   * URL of your Rights Management Server. It can be internal or external, but users will have to be able to reach it.
   * @type {string}
   */
  url: string;
}
/**
 * Salesforce SSO configuration.
 * @export
 * @interface ClientAddonsSalesforce
 */
export interface ClientAddonsSalesforce {
  /**
   * Arbitrary logical URL that identifies the Saleforce resource. e.g. `https://acme-org.com`.
   * @type {string}
   */
  entity_id?: string;
}
/**
 * Salesforce API addon configuration.
 * @export
 * @interface ClientAddonsSalesforceApi
 */
export interface ClientAddonsSalesforceApi {
  /**
   * Consumer Key assigned by Salesforce to the Connected App.
   * @type {string}
   */
  clientid?: string;
  /**
   * Name of the property in the user object that maps to a Salesforce username. e.g. `email`.
   * @type {string}
   */
  principal?: string;
  /**
   * Community name.
   * @type {string}
   */
  communityName?: string;
  /**
   * Community url section.
   * @type {string}
   */
  community_url_section?: string;
}
/**
 * Salesforce Sandbox addon configuration.
 * @export
 * @interface ClientAddonsSalesforceSandboxApi
 */
export interface ClientAddonsSalesforceSandboxApi {
  /**
   * Consumer Key assigned by Salesforce to the Connected App.
   * @type {string}
   */
  clientid?: string;
  /**
   * Name of the property in the user object that maps to a Salesforce username. e.g. `email`.
   * @type {string}
   */
  principal?: string;
  /**
   * Community name.
   * @type {string}
   */
  communityName?: string;
  /**
   * Community url section.
   * @type {string}
   */
  community_url_section?: string;
}
/**
 * SAML2 addon indicator (no configuration settings needed for SAML2 addon).
 * @export
 * @interface ClientAddonsSamlp
 */
export interface ClientAddonsSamlp {
  /**
   * @type {{ [key: string]: any; }}
   */
  mappings?: { [key: string]: any };
  /**
   * @type {string}
   */
  audience?: string;
  /**
   * @type {string}
   */
  recipient?: string;
  /**
   * @type {boolean}
   */
  createUpnClaim?: boolean;
  /**
   * @type {boolean}
   */
  mapUnknownClaimsAsIs?: boolean;
  /**
   * @type {boolean}
   */
  passthroughClaimsWithNoMapping?: boolean;
  /**
   * @type {boolean}
   */
  mapIdentities?: boolean;
  /**
   * @type {string}
   */
  signatureAlgorithm?: string;
  /**
   * @type {string}
   */
  digestAlgorithm?: string;
  /**
   * @type {string}
   */
  issuer?: string;
  /**
   * @type {string}
   */
  destination?: string;
  /**
   * @type {number}
   */
  lifetimeInSeconds?: number;
  /**
   * @type {boolean}
   */
  signResponse?: boolean;
  /**
   * @type {string}
   */
  nameIdentifierFormat?: string;
  /**
   * @type {Array<string>}
   */
  nameIdentifierProbes?: Array<string>;
  /**
   * @type {string}
   */
  authnContextClassRef?: string;
}
/**
 * SAP API addon configuration.
 * @export
 * @interface ClientAddonsSapApi
 */
export interface ClientAddonsSapApi {
  /**
   * If activated in the OAuth 2.0 client configuration (transaction SOAUTH2) the SAML attribute client_id must be set and equal the client_id form parameter of the access token request.
   * @type {string}
   */
  clientid?: string;
  /**
   * Name of the property in the user object that maps to a SAP username. e.g. `email`.
   * @type {string}
   */
  usernameAttribute?: string;
  /**
   * Your SAP OData server OAuth2 token endpoint URL.
   * @type {string}
   */
  tokenEndpointUrl?: string;
  /**
   * Requested scope for SAP APIs.
   * @type {string}
   */
  scope?: string;
  /**
   * Service account password to use to authenticate API calls to the token endpoint.
   * @type {string}
   */
  servicePassword?: string;
  /**
   * NameID element of the Subject which can be used to express the user's identity. Defaults to `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified`.
   * @type {string}
   */
  nameIdentifierFormat?: string;
}
/**
 * Sentry SSO configuration.
 * @export
 * @interface ClientAddonsSentry
 */
export interface ClientAddonsSentry {
  /**
   * Generated slug for your Sentry organization. Found in your Sentry URL. e.g. `https://sentry.acme.com/acme-org/` would be `acme-org`.
   * @type {string}
   */
  org_slug?: string;
  /**
   * URL prefix only if running Sentry Community Edition, otherwise leave should be blank.
   * @type {string}
   */
  base_url?: string;
}
/**
 * SharePoint SSO configuration.
 * @export
 * @interface ClientAddonsSharepoint
 */
export interface ClientAddonsSharepoint {
  /**
   * Internal SharePoint application URL.
   * @type {string}
   */
  url?: string;
  /**
   * @type {ClientAddonsSharepointExternalUrl}
   */
  external_url?: ClientAddonsSharepointExternalUrl;
}
/**
 * @type ClientAddonsSharepointExternalUrl
 * External SharePoint application URLs if exposed to the Internet.
 * @export
 */
export type ClientAddonsSharepointExternalUrl = Array<string> | string;
/**
 * Slack team or workspace name usually first segment in your Slack URL. e.g. `https://acme-org.slack.com` would be `acme-org`.
 * @export
 * @interface ClientAddonsSlack
 */
export interface ClientAddonsSlack {
  /**
   * Slack team name.
   * @type {string}
   */
  team: string;
}
/**
 * SpringCM SSO configuration.
 * @export
 * @interface ClientAddonsSpringcm
 */
export interface ClientAddonsSpringcm {
  /**
   * SpringCM ACS URL, e.g. `https://na11.springcm.com/atlas/sso/SSOEndpoint.ashx`.
   * @type {string}
   */
  acsurl?: string;
}
/**
 *
 * @export
 * @interface ClientAddonsSsoIntegration
 */
export interface ClientAddonsSsoIntegration {
  /**
   * SSO integration name
   * @type {string}
   */
  name?: string;
  /**
   * SSO integration version installed
   * @type {string}
   */
  version?: string;
}
/**
 * Windows Azure Mobile Services addon configuration.
 * @export
 * @interface ClientAddonsWams
 */
export interface ClientAddonsWams {
  /**
   * Your master key for Windows Azure Mobile Services.
   * @type {string}
   */
  masterkey?: string;
}
/**
 * Zendesk SSO configuration.
 * @export
 * @interface ClientAddonsZendesk
 */
export interface ClientAddonsZendesk {
  /**
   * Zendesk account name usually first segment in your Zendesk URL. e.g. `https://acme-org.zendesk.com` would be `acme-org`.
   * @type {string}
   */
  accountName?: string;
}
/**
 * Zoom SSO configuration.
 * @export
 * @interface ClientAddonsZoom
 */
export interface ClientAddonsZoom {
  /**
   * Zoom account name usually first segment of your Zoom URL, e.g. `https://acme-org.zoom.us` would be `acme-org`.
   * @type {string}
   */
  account?: string;
}
/**
 *
 * @export
 * @interface ClientCreate
 */
export interface ClientCreate {
  /**
   * Name of this client (min length: 1 character, does not allow `<` or `>`).
   * @type {string}
   */
  name: string;
  /**
   * Free text description of this client (max length: 140 characters).
   * @type {string}
   */
  description?: string;
  /**
   * URL of the logo to display for this client. Recommended size is 150x150 pixels.
   * @type {string}
   */
  logo_uri?: string;
  /**
   * Comma-separated list of URLs whitelisted for Auth0 to use as a callback to the client after authentication.
   * @type {Array<string>}
   */
  callbacks?: Array<string>;
  /**
   * @type {ClientCreateOidcBackchannelLogout}
   */
  oidc_backchannel_logout?: ClientCreateOidcBackchannelLogout;
  /**
   * Comma-separated list of URLs allowed to make requests from JavaScript to Auth0 API (typically used with CORS). By default, all your callback URLs will be allowed. This field allows you to enter other origins if necessary. You can also use wildcards at the subdomain level (e.g., https://*.contoso.com). Query strings and hash information are not taken into account when validating these URLs.
   * @type {Array<string>}
   */
  allowed_origins?: Array<string>;
  /**
   * Comma-separated list of allowed origins for use with <a href='https://auth0.com/docs/cross-origin-authentication'>Cross-Origin Authentication</a>, <a href='https://auth0.com/docs/flows/concepts/device-auth'>Device Flow</a>, and <a href='https://auth0.com/docs/protocols/oauth2#how-response-mode-works'>web message response mode</a>.
   * @type {Array<string>}
   */
  web_origins?: Array<string>;
  /**
   * List of audiences/realms for SAML protocol. Used by the wsfed addon.
   * @type {Array<string>}
   */
  client_aliases?: Array<string>;
  /**
   * List of allow clients and API ids that are allowed to make delegation requests. Empty means all all your clients are allowed.
   * @type {Array<string>}
   */
  allowed_clients?: Array<string>;
  /**
   * Comma-separated list of URLs that are valid to redirect to after logout from Auth0. Wildcards are allowed for subdomains.
   * @type {Array<string>}
   */
  allowed_logout_urls?: Array<string>;
  /**
   * List of grant types supported for this application. Can include `authorization_code`, `implicit`, `refresh_token`, `client_credentials`, `password`, `http://auth0.com/oauth/grant-type/password-realm`, `http://auth0.com/oauth/grant-type/mfa-oob`, `http://auth0.com/oauth/grant-type/mfa-otp`, `http://auth0.com/oauth/grant-type/mfa-recovery-code`, and `urn:ietf:params:oauth:grant-type:device_code`.
   * @type {Array<string>}
   */
  grant_types?: Array<string>;
  /**
   * Defines the requested authentication method for the token endpoint. Can be `none` (public client without a client secret), `client_secret_post` (client uses HTTP POST parameters), or `client_secret_basic` (client uses HTTP Basic).
   * @type {string}
   */
  token_endpoint_auth_method?: ClientCreateTokenEndpointAuthMethodEnum;
  /**
   * Type of client used to determine which settings are applicable. Can be `spa`, `native`, `non_interactive`, or `regular_web`.
   * @type {string}
   */
  app_type?: ClientCreateAppTypeEnum;
  /**
   * Whether this client a first party client or not
   * @type {boolean}
   */
  is_first_party?: boolean;
  /**
   * Whether this client conforms to <a href='https://auth0.com/docs/api-auth/tutorials/adoption'>strict OIDC specifications</a> (true) or uses legacy features (false).
   * @type {boolean}
   */
  oidc_conformant?: boolean;
  /**
   * @type {ClientCreateJwtConfiguration}
   */
  jwt_configuration?: ClientCreateJwtConfiguration;
  /**
   * @type {ClientCreateEncryptionKey}
   */
  encryption_key?: ClientCreateEncryptionKey;
  /**
   * Applies only to SSO clients and determines whether Auth0 will handle Single Sign On (true) or whether the Identity Provider will (false).
   * @type {boolean}
   */
  sso?: boolean;
  /**
   * Whether this client can be used to make cross-origin authentication requests (true) or it is not allowed to make such requests (false).
   * @type {boolean}
   */
  cross_origin_auth?: boolean;
  /**
   * URL of the location in your site where the cross origin verification takes place for the cross-origin auth flow when performing Auth in your own domain instead of Auth0 hosted login page.
   * @type {string}
   */
  cross_origin_loc?: string;
  /**
   * <code>true</code> to disable Single Sign On, <code>false</code> otherwise (default: <code>false</code>)
   * @type {boolean}
   */
  sso_disabled?: boolean;
  /**
   * <code>true</code> if the custom login page is to be used, <code>false</code> otherwise. Defaults to <code>true</code>
   * @type {boolean}
   */
  custom_login_page_on?: boolean;
  /**
   * The content (HTML, CSS, JS) of the custom login page.
   * @type {string}
   */
  custom_login_page?: string;
  /**
   * The content (HTML, CSS, JS) of the custom login page. (Used on Previews)
   * @type {string}
   */
  custom_login_page_preview?: string;
  /**
   * HTML form template to be used for WS-Federation.
   * @type {string}
   */
  form_template?: string;
  /**
   * @type {ClientAddons}
   */
  addons?: ClientAddons;
  /**
   * Metadata associated with the client, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.  Field names (max 255 chars) are alphanumeric and may only include the following special characters:  :,-+=_*?"/\()><@	[Tab] [Space]
   * @type {{ [key: string]: any; }}
   */
  client_metadata?: { [key: string]: any };
  /**
   * @type {ClientCreateMobile}
   */
  mobile?: ClientCreateMobile;
  /**
   * Initiate login uri, must be https
   * @type {string}
   */
  initiate_login_uri?: string;
  /**
   * @type {ClientNativeSocialLogin}
   */
  native_social_login?: ClientNativeSocialLogin | null;
  /**
   * @type {ClientRefreshToken}
   */
  refresh_token?: ClientRefreshToken | null;
  /**
   * Defines how to proceed during an authentication transaction with regards an organization. Can be `deny` (default), `allow` or `require`.
   * @type {string}
   */
  organization_usage?: ClientCreateOrganizationUsageEnum;
  /**
   * Defines how to proceed during an authentication transaction when `client.organization_usage: 'require'`. Can be `no_prompt` (default) or `pre_login_prompt`.
   * @type {string}
   */
  organization_require_behavior?: ClientCreateOrganizationRequireBehaviorEnum;
}

/**
 * @export
 */
export const ClientCreateTokenEndpointAuthMethodEnum = {
  none: 'none',
  client_secret_post: 'client_secret_post',
  client_secret_basic: 'client_secret_basic',
} as const;
export type ClientCreateTokenEndpointAuthMethodEnum =
  typeof ClientCreateTokenEndpointAuthMethodEnum[keyof typeof ClientCreateTokenEndpointAuthMethodEnum];

/**
 * @export
 */
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
} as const;
export type ClientCreateAppTypeEnum =
  typeof ClientCreateAppTypeEnum[keyof typeof ClientCreateAppTypeEnum];

/**
 * @export
 */
export const ClientCreateOrganizationUsageEnum = {
  deny: 'deny',
  allow: 'allow',
  require: 'require',
} as const;
export type ClientCreateOrganizationUsageEnum =
  typeof ClientCreateOrganizationUsageEnum[keyof typeof ClientCreateOrganizationUsageEnum];

/**
 * @export
 */
export const ClientCreateOrganizationRequireBehaviorEnum = {
  no_prompt: 'no_prompt',
  pre_login_prompt: 'pre_login_prompt',
  post_login_prompt: 'post_login_prompt',
} as const;
export type ClientCreateOrganizationRequireBehaviorEnum =
  typeof ClientCreateOrganizationRequireBehaviorEnum[keyof typeof ClientCreateOrganizationRequireBehaviorEnum];

/**
 * Encryption used for WsFed responses with this client.
 * @export
 * @interface ClientCreateEncryptionKey
 */
export interface ClientCreateEncryptionKey {
  /**
   * Encryption Public RSA Key.
   * @type {string}
   */
  pub?: string;
  /**
   * Encryption certificate for public key in X.590 (.CER) format.
   * @type {string}
   */
  cert?: string;
  /**
   * Encryption certificate name for this certificate in the format `/CN={domain}`.
   * @type {string}
   */
  subject?: string;
}
/**
 * Configuration related to JWTs for the client.
 * @export
 * @interface ClientCreateJwtConfiguration
 */
export interface ClientCreateJwtConfiguration {
  /**
   * Number of seconds the JWT will be valid for (affects `exp` claim).
   * @type {number}
   */
  lifetime_in_seconds?: number;
  /**
   * Configuration related to id token claims for the client.
   * @type {{ [key: string]: any; }}
   */
  scopes?: { [key: string]: any };
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   */
  alg?: ClientCreateJwtConfigurationAlgEnum;
}

/**
 * @export
 */
export const ClientCreateJwtConfigurationAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
} as const;
export type ClientCreateJwtConfigurationAlgEnum =
  typeof ClientCreateJwtConfigurationAlgEnum[keyof typeof ClientCreateJwtConfigurationAlgEnum];

/**
 * Additional configuration for native mobile apps.
 * @export
 * @interface ClientCreateMobile
 */
export interface ClientCreateMobile {
  /**
   * @type {ClientCreateMobileAndroid}
   */
  android?: ClientCreateMobileAndroid;
  /**
   * @type {ClientCreateMobileIos}
   */
  ios?: ClientCreateMobileIos;
}
/**
 * Android native app configuration.
 * @export
 * @interface ClientCreateMobileAndroid
 */
export interface ClientCreateMobileAndroid {
  /**
   * App package name found in AndroidManifest.xml.
   * @type {string}
   */
  app_package_name?: string;
  /**
   * SHA256 fingerprints of the app's signing certificate. Multiple fingerprints can be used to support different versions of your app, such as debug and production builds.
   * @type {Array<string>}
   */
  sha256_cert_fingerprints?: Array<string>;
}
/**
 * Configuration related to iOS native apps
 * @export
 * @interface ClientCreateMobileIos
 */
export interface ClientCreateMobileIos {
  /**
   * Identifier assigned to the account that signs and upload the app to the store
   * @type {string}
   */
  team_id?: string;
  /**
   * Assigned by the developer to the app as its unique identifier inside the store, usually is a reverse domain plus the app name: <code>com.you.MyApp</code>
   * @type {string}
   */
  app_bundle_identifier?: string;
}
/**
 * Configuration for OIDC backchannel logout
 * @export
 * @interface ClientCreateOidcBackchannelLogout
 */
export interface ClientCreateOidcBackchannelLogout {
  /**
   * Comma-separated list of URLs that are valid to call back from Auth0 for OIDC backchannel logout. Currently only one URL is allowed.
   * @type {Array<string>}
   */
  backchannel_logout_urls: Array<string>;
}
/**
 * Encryption used for WsFed responses with this client.
 * @export
 * @interface ClientEncryptionKey
 */
export interface ClientEncryptionKey {
  /**
   * Encryption Public RSA Key.
   * @type {string}
   */
  pub?: string;
  /**
   * Encryption certificate for public key in X.590 (.CER) format.
   * @type {string}
   */
  cert?: string;
  /**
   * Encryption certificate name for this certificate in the format `/CN={domain}`.
   * @type {string}
   */
  subject?: string;
}
/**
 *
 * @export
 * @interface ClientGrant
 */
export interface ClientGrant {
  /**
   * ID of the client grant.
   * @type {string}
   */
  id?: string;
  /**
   * ID of the client.
   * @type {string}
   */
  client_id?: string;
  /**
   * Audience or API identifier of this client grant.
   * @type {string}
   */
  audience?: string;
  /**
   * Scopes allowed for this client grant.
   * @type {Array<string>}
   */
  scope?: Array<string>;
}
/**
 *
 * @export
 * @interface ClientGrantCreate
 */
export interface ClientGrantCreate {
  /**
   * ID of the client.
   * @type {string}
   */
  client_id: string;
  /**
   * Audience or API identifier of this client grant.
   * @type {string}
   */
  audience: string;
  /**
   * Scopes allowed for this client grant.
   * @type {Array<string>}
   */
  scope: Array<string>;
}
/**
 * Configuration related to JWTs for the client.
 * @export
 * @interface ClientJwtConfiguration
 */
export interface ClientJwtConfiguration {
  /**
   * Number of seconds the JWT will be valid for (affects `exp` claim).
   * @type {number}
   */
  lifetime_in_seconds?: number;
  /**
   * Whether the client secret is base64 encoded (true) or unencoded (false).
   * @type {boolean}
   */
  secret_encoded?: boolean;
  /**
   * Configuration related to id token claims for the client.
   * @type {{ [key: string]: any; }}
   */
  scopes?: { [key: string]: any };
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   */
  alg?: ClientJwtConfigurationAlgEnum;
}

/**
 * @export
 */
export const ClientJwtConfigurationAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
} as const;
export type ClientJwtConfigurationAlgEnum =
  typeof ClientJwtConfigurationAlgEnum[keyof typeof ClientJwtConfigurationAlgEnum];

/**
 * Additional configuration for native mobile apps.
 * @export
 * @interface ClientMobile
 */
export interface ClientMobile {
  /**
   * @type {ClientMobileAndroid}
   */
  android?: ClientMobileAndroid;
  /**
   * @type {ClientMobileIos}
   */
  ios?: ClientMobileIos;
}
/**
 * Android native app configuration.
 * @export
 * @interface ClientMobileAndroid
 */
export interface ClientMobileAndroid {
  /**
   * App package name found in AndroidManifest.xml.
   * @type {string}
   */
  app_package_name?: string;
  /**
   * SHA256 fingerprints of the app's signing certificate. Multiple fingerprints can be used to support different versions of your app, such as debug and production builds.
   * @type {Array<string>}
   */
  sha256_cert_fingerprints?: Array<string>;
}
/**
 * iOS native app configuration.
 * @export
 * @interface ClientMobileIos
 */
export interface ClientMobileIos {
  /**
   * Identifier assigned to the Apple account that signs and uploads the app to the store.
   * @type {string}
   */
  team_id?: string;
  /**
   * Assigned by developer to the app as its unique identifier inside the store. Usually this is a reverse domain plus the app name, e.g. `com.you.MyApp`.
   * @type {string}
   */
  app_bundle_identifier?: string;
}
/**
 * Configure native social settings
 * @export
 * @interface ClientNativeSocialLogin
 */
export interface ClientNativeSocialLogin {
  /**
   * @type {ClientNativeSocialLoginApple}
   */
  apple?: ClientNativeSocialLoginApple | null;
  /**
   * @type {ClientNativeSocialLoginFacebook}
   */
  facebook?: ClientNativeSocialLoginFacebook | null;
}
/**
 * Native Social Login support for the Apple connection
 * @export
 * @interface ClientNativeSocialLoginApple
 */
export interface ClientNativeSocialLoginApple {
  /**
   * Determine whether or not to allow signing in natively using an Apple authorization code
   * @type {boolean}
   */
  enabled?: boolean;
}
/**
 * Native Social Login support for the Facebook connection
 * @export
 * @interface ClientNativeSocialLoginFacebook
 */
export interface ClientNativeSocialLoginFacebook {
  /**
   * Determine whether or not to allow signing in natively using Facebook
   * @type {boolean}
   */
  enabled?: boolean;
}
/**
 * Configuration for OIDC backchannel logout
 * @export
 * @interface ClientOidcBackchannelLogout
 */
export interface ClientOidcBackchannelLogout {
  /**
   * Comma-separated list of URLs that are valid to call back from Auth0 for OIDC backchannel logout. Currently only one URL is allowed.
   * @type {Array<string>}
   */
  backchannel_logout_urls?: Array<string>;
}
/**
 * Refresh token configuration
 * @export
 * @interface ClientRefreshToken
 */
export interface ClientRefreshToken {
  /**
   * Refresh token rotation types, one of: rotating, non-rotating
   * @type {string}
   */
  rotation_type: ClientRefreshTokenRotationTypeEnum;
  /**
   * Refresh token expiration types, one of: expiring, non-expiring
   * @type {string}
   */
  expiration_type: ClientRefreshTokenExpirationTypeEnum;
  /**
   * Period in seconds where the previous refresh token can be exchanged without triggering breach detection
   * @type {number}
   */
  leeway?: number;
  /**
   * Period (in seconds) for which refresh tokens will remain valid
   * @type {number}
   */
  token_lifetime?: number;
  /**
   * Prevents tokens from having a set lifetime when `true` (takes precedence over `token_lifetime` values)
   * @type {boolean}
   */
  infinite_token_lifetime?: boolean;
  /**
   * Period (in seconds) for which refresh tokens will remain valid without use
   * @type {number}
   */
  idle_token_lifetime?: number;
  /**
   * Prevents tokens from expiring without use when `true` (takes precedence over `idle_token_lifetime` values)
   * @type {boolean}
   */
  infinite_idle_token_lifetime?: boolean;
}

/**
 * @export
 */
export const ClientRefreshTokenRotationTypeEnum = {
  rotating: 'rotating',
  non_rotating: 'non-rotating',
} as const;
export type ClientRefreshTokenRotationTypeEnum =
  typeof ClientRefreshTokenRotationTypeEnum[keyof typeof ClientRefreshTokenRotationTypeEnum];

/**
 * @export
 */
export const ClientRefreshTokenExpirationTypeEnum = {
  expiring: 'expiring',
  non_expiring: 'non-expiring',
} as const;
export type ClientRefreshTokenExpirationTypeEnum =
  typeof ClientRefreshTokenExpirationTypeEnum[keyof typeof ClientRefreshTokenExpirationTypeEnum];

/**
 *
 * @export
 * @interface ClientSigningKeysInner
 */
export interface ClientSigningKeysInner {
  [key: string]: any | any;
  /**
   * Signing certificate public key and chain in PKCS#7 (.P7B) format.
   * @type {string}
   */
  pkcs7?: string;
  /**
   * Signing certificate public key in X.590 (.CER) format.
   * @type {string}
   */
  cert?: string;
  /**
   * Subject name for this certificate in the format `/CN={domain}`.
   * @type {string}
   */
  subject?: string;
}
/**
 *
 * @export
 * @interface ClientUpdate
 */
export interface ClientUpdate {
  /**
   * The name of the client. Must contain at least one character. Does not allow '<' or '>'.
   * @type {string}
   */
  name?: string;
  /**
   * Free text description of the purpose of the Client. (Max character length: <code>140</code>)
   * @type {string}
   */
  description?: string;
  /**
   * The secret used to sign tokens for the client
   * @type {string}
   */
  client_secret?: string;
  /**
   * The URL of the client logo (recommended size: 150x150)
   * @type {string}
   */
  logo_uri?: string;
  /**
   * A set of URLs that are valid to call back from Auth0 when authenticating users
   * @type {Array<string>}
   */
  callbacks?: Array<string>;
  /**
   * @type {ClientUpdateOidcBackchannelLogout}
   */
  oidc_backchannel_logout?: ClientUpdateOidcBackchannelLogout | null;
  /**
   * A set of URLs that represents valid origins for CORS
   * @type {Array<string>}
   */
  allowed_origins?: Array<string>;
  /**
   * A set of URLs that represents valid web origins for use with web message response mode
   * @type {Array<string>}
   */
  web_origins?: Array<string>;
  /**
   * A set of grant types that the client is authorized to use
   * @type {Array<string>}
   */
  grant_types?: Array<string>;
  /**
   * List of audiences for SAML protocol
   * @type {Array<string>}
   */
  client_aliases?: Array<string>;
  /**
   * Ids of clients that will be allowed to perform delegation requests. Clients that will be allowed to make delegation request. By default, all your clients will be allowed. This field allows you to specify specific clients
   * @type {Array<string>}
   */
  allowed_clients?: Array<string>;
  /**
   * URLs that are valid to redirect to after logout from Auth0.
   * @type {Array<string>}
   */
  allowed_logout_urls?: Array<string>;
  /**
   * @type {ClientUpdateJwtConfiguration}
   */
  jwt_configuration?: ClientUpdateJwtConfiguration | null;
  /**
   * @type {ClientUpdateEncryptionKey}
   */
  encryption_key?: ClientUpdateEncryptionKey | null;
  /**
   * <code>true</code> to use Auth0 instead of the IdP to do Single Sign On, <code>false</code> otherwise (default: <code>false</code>)
   * @type {boolean}
   */
  sso?: boolean;
  /**
   * URL for the location in your site where the cross origin verification takes place for the cross-origin auth flow when performing Auth in your own domain instead of Auth0 hosted login page.
   * @type {string}
   */
  cross_origin_loc?: string | null;
  /**
   * <code>true</code> to disable Single Sign On, <code>false</code> otherwise (default: <code>false</code>)
   * @type {boolean}
   */
  sso_disabled?: boolean;
  /**
   * <code>true</code> if the custom login page is to be used, <code>false</code> otherwise.
   * @type {boolean}
   */
  custom_login_page_on?: boolean;
  /**
   * Defines the requested authentication method for the token endpoint. Possible values are 'none' (public client without a client secret), 'client_secret_post' (client uses HTTP POST parameters) or 'client_secret_basic' (client uses HTTP Basic)
   * @type {string}
   */
  token_endpoint_auth_method?: ClientUpdateTokenEndpointAuthMethodEnum;
  /**
   * The type of application this client represents
   * @type {string}
   */
  app_type?: ClientUpdateAppTypeEnum;
  /**
   * Whether this client a first party client or not
   * @type {boolean}
   */
  is_first_party?: boolean;
  /**
   * Whether this client will conform to strict OIDC specifications
   * @type {boolean}
   */
  oidc_conformant?: boolean;
  /**
   * The content (HTML, CSS, JS) of the custom login page
   * @type {string}
   */
  custom_login_page?: string;
  /**
   * @type {string}
   */
  custom_login_page_preview?: string;
  /**
   * Form template for WS-Federation protocol
   * @type {string}
   */
  form_template?: string;
  /**
   * @type {ClientUpdateAddons}
   */
  addons?: ClientUpdateAddons | null;
  /**
   * Metadata associated with the client, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.  Field names (max 255 chars) are alphanumeric and may only include the following special characters:  :,-+=_*?"/\()><@	[Tab] [Space]
   * @type {{ [key: string]: any; }}
   */
  client_metadata?: { [key: string]: any };
  /**
   * @type {ClientUpdateMobile}
   */
  mobile?: ClientUpdateMobile | null;
  /**
   * Initiate login uri, must be https
   * @type {string}
   */
  initiate_login_uri?: string;
  /**
   * @type {ClientNativeSocialLogin}
   */
  native_social_login?: ClientNativeSocialLogin | null;
  /**
   * @type {ClientRefreshToken}
   */
  refresh_token?: ClientRefreshToken | null;
  /**
   * Defines how to proceed during an authentication transaction with regards an organization. Can be `deny` (default), `allow` or `require`.
   * @type {string}
   */
  organization_usage?: ClientUpdateOrganizationUsageEnum;
  /**
   * Defines how to proceed during an authentication transaction when `client.organization_usage: 'require'`. Can be `no_prompt` (default) or `pre_login_prompt`.
   * @type {string}
   */
  organization_require_behavior?: ClientUpdateOrganizationRequireBehaviorEnum;
}

/**
 * @export
 */
export const ClientUpdateTokenEndpointAuthMethodEnum = {
  none: 'none',
  client_secret_post: 'client_secret_post',
  client_secret_basic: 'client_secret_basic',
  null: 'null',
} as const;
export type ClientUpdateTokenEndpointAuthMethodEnum =
  typeof ClientUpdateTokenEndpointAuthMethodEnum[keyof typeof ClientUpdateTokenEndpointAuthMethodEnum];

/**
 * @export
 */
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
} as const;
export type ClientUpdateAppTypeEnum =
  typeof ClientUpdateAppTypeEnum[keyof typeof ClientUpdateAppTypeEnum];

/**
 * @export
 */
export const ClientUpdateOrganizationUsageEnum = {
  deny: 'deny',
  allow: 'allow',
  require: 'require',
} as const;
export type ClientUpdateOrganizationUsageEnum =
  typeof ClientUpdateOrganizationUsageEnum[keyof typeof ClientUpdateOrganizationUsageEnum];

/**
 * @export
 */
export const ClientUpdateOrganizationRequireBehaviorEnum = {
  no_prompt: 'no_prompt',
  pre_login_prompt: 'pre_login_prompt',
  post_login_prompt: 'post_login_prompt',
} as const;
export type ClientUpdateOrganizationRequireBehaviorEnum =
  typeof ClientUpdateOrganizationRequireBehaviorEnum[keyof typeof ClientUpdateOrganizationRequireBehaviorEnum];

/**
 * Addons enabled for this client and their associated configurations.
 * @export
 * @interface ClientUpdateAddons
 */
export interface ClientUpdateAddons {
  /**
   * @type {ClientAddonsAws}
   */
  aws?: ClientAddonsAws;
  /**
   * @type {ClientAddonsAzureBlob}
   */
  azure_blob?: ClientAddonsAzureBlob;
  /**
   * @type {ClientAddonsAzureSb}
   */
  azure_sb?: ClientAddonsAzureSb;
  /**
   * @type {ClientAddonsRms}
   */
  rms?: ClientAddonsRms;
  /**
   * @type {ClientAddonsMscrm}
   */
  mscrm?: ClientAddonsMscrm;
  /**
   * @type {ClientAddonsSlack}
   */
  slack?: ClientAddonsSlack;
  /**
   * @type {ClientAddonsSentry}
   */
  sentry?: ClientAddonsSentry;
  /**
   * Box SSO indicator (no configuration settings needed for Box SSO).
   * @type {{ [key: string]: any; }}
   */
  box?: { [key: string]: any };
  /**
   * CloudBees SSO indicator (no configuration settings needed for CloudBees SSO).
   * @type {{ [key: string]: any; }}
   */
  cloudbees?: { [key: string]: any };
  /**
   * Concur SSO indicator (no configuration settings needed for Concur SSO).
   * @type {{ [key: string]: any; }}
   */
  concur?: { [key: string]: any };
  /**
   * Dropbox SSO indicator (no configuration settings needed for Dropbox SSO).
   * @type {{ [key: string]: any; }}
   */
  dropbox?: { [key: string]: any };
  /**
   * @type {ClientAddonsEchosign}
   */
  echosign?: ClientAddonsEchosign;
  /**
   * @type {ClientAddonsEgnyte}
   */
  egnyte?: ClientAddonsEgnyte;
  /**
   * @type {ClientAddonsFirebase}
   */
  firebase?: ClientAddonsFirebase;
  /**
   * @type {ClientAddonsNewrelic}
   */
  newrelic?: ClientAddonsNewrelic;
  /**
   * @type {ClientAddonsOffice365}
   */
  office365?: ClientAddonsOffice365;
  /**
   * @type {ClientAddonsSalesforce}
   */
  salesforce?: ClientAddonsSalesforce;
  /**
   * @type {ClientAddonsSalesforceApi}
   */
  salesforce_api?: ClientAddonsSalesforceApi;
  /**
   * @type {ClientAddonsSalesforceSandboxApi}
   */
  salesforce_sandbox_api?: ClientAddonsSalesforceSandboxApi;
  /**
   * @type {ClientAddonsSamlp}
   */
  samlp?: ClientAddonsSamlp;
  /**
   * @type {ClientAddonsLayer}
   */
  layer?: ClientAddonsLayer;
  /**
   * @type {ClientAddonsSapApi}
   */
  sap_api?: ClientAddonsSapApi;
  /**
   * @type {ClientAddonsSharepoint}
   */
  sharepoint?: ClientAddonsSharepoint;
  /**
   * @type {ClientAddonsSpringcm}
   */
  springcm?: ClientAddonsSpringcm;
  /**
   * @type {ClientAddonsWams}
   */
  wams?: ClientAddonsWams;
  /**
   * WS-Fed (WIF) addon indicator. Actual configuration is stored in `callback` and `client_aliases` properties on the client.
   * @type {{ [key: string]: any; }}
   */
  wsfed?: { [key: string]: any };
  /**
   * @type {ClientAddonsZendesk}
   */
  zendesk?: ClientAddonsZendesk;
  /**
   * @type {ClientAddonsZoom}
   */
  zoom?: ClientAddonsZoom;
  /**
   * @type {ClientAddonsSsoIntegration}
   */
  sso_integration?: ClientAddonsSsoIntegration;
}
/**
 * The client's encryption key
 * @export
 * @interface ClientUpdateEncryptionKey
 */
export interface ClientUpdateEncryptionKey {
  /**
   * Encryption public key
   * @type {string}
   */
  pub?: string;
  /**
   * Encryption certificate
   * @type {string}
   */
  cert?: string;
  /**
   * Certificate subject
   * @type {string}
   */
  subject?: string;
}
/**
 * An object that holds settings related to how JWTs are created
 * @export
 * @interface ClientUpdateJwtConfiguration
 */
export interface ClientUpdateJwtConfiguration {
  /**
   * The amount of time (in seconds) that the token will be valid after being issued
   * @type {number}
   */
  lifetime_in_seconds?: number;
  /**
   * @type {{ [key: string]: any; }}
   */
  scopes?: { [key: string]: any };
  /**
   * The algorithm used to sign the JsonWebToken
   * @type {string}
   */
  alg?: ClientUpdateJwtConfigurationAlgEnum;
}

/**
 * @export
 */
export const ClientUpdateJwtConfigurationAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
} as const;
export type ClientUpdateJwtConfigurationAlgEnum =
  typeof ClientUpdateJwtConfigurationAlgEnum[keyof typeof ClientUpdateJwtConfigurationAlgEnum];

/**
 * Configuration related to native mobile apps
 * @export
 * @interface ClientUpdateMobile
 */
export interface ClientUpdateMobile {
  /**
   * @type {ClientUpdateMobileAndroid}
   */
  android?: ClientUpdateMobileAndroid | null;
  /**
   * @type {ClientUpdateMobileIos}
   */
  ios?: ClientUpdateMobileIos | null;
}
/**
 * Configuration related to Android native apps
 * @export
 * @interface ClientUpdateMobileAndroid
 */
export interface ClientUpdateMobileAndroid {
  /**
   * Application package name found in <code>AndroidManifest.xml</code>
   * @type {string}
   */
  app_package_name?: string;
  /**
   * The SHA256 fingerprints of your app's signing certificate. Multiple fingerprints can be used to support different versions of your app, such as debug and production builds
   * @type {Array<string>}
   */
  sha256_cert_fingerprints?: Array<string>;
}
/**
 * Configuration related to iOS native apps
 * @export
 * @interface ClientUpdateMobileIos
 */
export interface ClientUpdateMobileIos {
  /**
   * Identifier assigned to the account that signs and upload the app to the store
   * @type {string}
   */
  team_id?: string;
  /**
   * Assigned by the developer to the app as its unique identifier inside the store, usually is a reverse domain plus the app name: <code>com.you.MyApp</code>
   * @type {string}
   */
  app_bundle_identifier?: string;
}
/**
 * Configuration for OIDC backchannel logout
 * @export
 * @interface ClientUpdateOidcBackchannelLogout
 */
export interface ClientUpdateOidcBackchannelLogout {
  /**
   * Comma-separated list of URLs that are valid to call back from Auth0 for OIDC backchannel logout. Currently only one URL is allowed.
   * @type {Array<string>}
   */
  backchannel_logout_urls?: Array<string>;
}
/**
 *
 * @export
 * @interface Connection
 */
export interface Connection {
  /**
   * The name of the connection
   * @type {string}
   */
  name?: string;
  /**
   * Connection name used in login screen
   * @type {string}
   */
  display_name?: string;
  /**
   * @type {{ [key: string]: any; }}
   */
  options?: { [key: string]: any };
  /**
   * The connection's identifier
   * @type {string}
   */
  id?: string;
  /**
   * The type of the connection, related to the identity provider
   * @type {string}
   */
  strategy?: string;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm
   * @type {Array<string>}
   */
  realms?: Array<string>;
  /**
   * True if the connection is domain level
   * @type {boolean}
   */
  is_domain_connection?: boolean;
  /**
   * Metadata associated with the connection, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   */
  metadata?: { [key: string]: any };
}
/**
 *
 * @export
 * @interface ConnectionCreate
 */
export interface ConnectionCreate {
  /**
   * The name of the connection. Must start and end with an alphanumeric character and can only contain alphanumeric characters and '-'. Max length 128
   * @type {string}
   */
  name: string;
  /**
   * Connection name used in the new universal login experience
   * @type {string}
   */
  display_name?: string;
  /**
   * The identity provider identifier for the connection
   * @type {string}
   */
  strategy: ConnectionCreateStrategyEnum;
  /**
   * @type {ConnectionCreateOptions}
   */
  options?: ConnectionCreateOptions;
  /**
   * The identifiers of the clients for which the connection is to be enabled. If the array is empty or the property is not specified, no clients are enabled
   * @type {Array<string>}
   */
  enabled_clients?: Array<string>;
  /**
   * @type {boolean}
   */
  is_domain_connection?: boolean;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm
   * @type {Array<string>}
   */
  realms?: Array<string>;
  /**
   * Metadata associated with the connection, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   */
  metadata?: { [key: string]: any };
}

/**
 * @export
 */
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
  typeof ConnectionCreateStrategyEnum[keyof typeof ConnectionCreateStrategyEnum];

/**
 * The connection's options (depend on the connection strategy)
 * @export
 * @interface ConnectionCreateOptions
 */
export interface ConnectionCreateOptions {
  [key: string]: any | any;
  /**
   * @type {ConnectionCreateOptionsValidation}
   */
  validation?: ConnectionCreateOptionsValidation | null;
  /**
   * An array of user fields that should not be stored in the Auth0 database (https://manage.local.dev.auth0.com/docs/security/data-security/denylist)
   * @type {Array<string>}
   */
  non_persistent_attrs?: Array<string>;
  /**
   * @type {boolean}
   */
  enable_script_context?: boolean;
  /**
   * Set to true to use a legacy user store
   * @type {boolean}
   */
  enabledDatabaseCustomization?: boolean;
  /**
   * Enable this if you have a legacy user store and you want to gradually migrate those users to the Auth0 user store
   * @type {boolean}
   */
  import_mode?: boolean;
  /**
   * @type {ConnectionCreateOptionsCustomScripts}
   */
  customScripts?: ConnectionCreateOptionsCustomScripts;
  /**
   * Password strength level
   * @type {string}
   */
  passwordPolicy?: ConnectionCreateOptionsPasswordPolicyEnum;
  /**
   * @type {ConnectionCreateOptionsPasswordComplexityOptions}
   */
  password_complexity_options?: ConnectionCreateOptionsPasswordComplexityOptions | null;
  /**
   * @type {ConnectionCreateOptionsPasswordHistory}
   */
  password_history?: ConnectionCreateOptionsPasswordHistory | null;
  /**
   * @type {ConnectionCreateOptionsPasswordNoPersonalInfo}
   */
  password_no_personal_info?: ConnectionCreateOptionsPasswordNoPersonalInfo | null;
  /**
   * @type {ConnectionCreateOptionsPasswordDictionary}
   */
  password_dictionary?: ConnectionCreateOptionsPasswordDictionary | null;
  /**
   * @type {boolean}
   */
  api_enable_users?: boolean;
  /**
   * @type {boolean}
   */
  basic_profile?: boolean;
  /**
   * @type {boolean}
   */
  ext_admin?: boolean;
  /**
   * @type {boolean}
   */
  ext_is_suspended?: boolean;
  /**
   * @type {boolean}
   */
  ext_agreed_terms?: boolean;
  /**
   * @type {boolean}
   */
  ext_groups?: boolean;
  /**
   * @type {boolean}
   */
  ext_assigned_plans?: boolean;
  /**
   * @type {boolean}
   */
  ext_profile?: boolean;
  /**
   * @type {boolean}
   */
  disable_self_service_change_password?: boolean;
  /**
   * Options for adding parameters in the request to the upstream IdP
   * @type {{ [key: string]: any; }}
   */
  upstream_params?: { [key: string]: any } | null;
  /**
   * Determines whether the 'name', 'given_name', 'family_name', 'nickname', and 'picture' attributes can be independently updated when using an external IdP. Possible values are 'on_each_login' (default value, it configures the connection to automatically update the root attributes from the external IdP with each user login. When this setting is used, root attributes cannot be independently updated), 'on_first_login' (configures the connection to only set the root attributes on first login, allowing them to be independently updated thereafter)
   * @type {string}
   */
  set_user_root_attributes?: ConnectionCreateOptionsSetUserRootAttributesEnum;
  /**
   * @type {ConnectionCreateOptionsGatewayAuthentication}
   */
  gateway_authentication?: ConnectionCreateOptionsGatewayAuthentication | null;
}

/**
 * @export
 */
export const ConnectionCreateOptionsPasswordPolicyEnum = {
  none: 'none',
  low: 'low',
  fair: 'fair',
  good: 'good',
  excellent: 'excellent',
  null: 'null',
} as const;
export type ConnectionCreateOptionsPasswordPolicyEnum =
  typeof ConnectionCreateOptionsPasswordPolicyEnum[keyof typeof ConnectionCreateOptionsPasswordPolicyEnum];

/**
 * @export
 */
export const ConnectionCreateOptionsSetUserRootAttributesEnum = {
  each_login: 'on_each_login',
  first_login: 'on_first_login',
} as const;
export type ConnectionCreateOptionsSetUserRootAttributesEnum =
  typeof ConnectionCreateOptionsSetUserRootAttributesEnum[keyof typeof ConnectionCreateOptionsSetUserRootAttributesEnum];

/**
 * A map of scripts used to integrate with a custom database.
 * @export
 * @interface ConnectionCreateOptionsCustomScripts
 */
export interface ConnectionCreateOptionsCustomScripts {
  /**
   * @type {string}
   */
  login?: string;
  /**
   * @type {string}
   */
  get_user?: string;
  /**
   * @type {string}
   */
  _delete?: string;
  /**
   * @type {string}
   */
  change_password?: string;
  /**
   * @type {string}
   */
  verify?: string;
  /**
   * @type {string}
   */
  create?: string;
}
/**
 * Token-based authentication settings to be applied when connection is using an sms strategy.
 * @export
 * @interface ConnectionCreateOptionsGatewayAuthentication
 */
export interface ConnectionCreateOptionsGatewayAuthentication {
  [key: string]: any | any;
  /**
   * The Authorization header type.
   * @type {string}
   */
  method: string;
  /**
   * The subject to be added to the JWT payload.
   * @type {string}
   */
  subject?: string;
  /**
   * The audience to be added to the JWT payload.
   * @type {string}
   */
  audience: string;
  /**
   * The secret to be used for signing tokens.
   * @type {string}
   */
  secret: string;
  /**
   * Set to true if the provided secret is base64 encoded.
   * @type {boolean}
   */
  secret_base64_encoded?: boolean;
}
/**
 * Password complexity options
 * @export
 * @interface ConnectionCreateOptionsPasswordComplexityOptions
 */
export interface ConnectionCreateOptionsPasswordComplexityOptions {
  /**
   * Minimum password length
   * @type {number}
   */
  min_length?: number;
}
/**
 * Options for password dictionary policy
 * @export
 * @interface ConnectionCreateOptionsPasswordDictionary
 */
export interface ConnectionCreateOptionsPasswordDictionary {
  /**
   * @type {boolean}
   */
  enable: boolean;
  /**
   * Custom Password Dictionary. An array of up to 200 entries.
   * @type {Array<string>}
   */
  dictionary?: Array<string>;
}
/**
 * Options for password history policy
 * @export
 * @interface ConnectionCreateOptionsPasswordHistory
 */
export interface ConnectionCreateOptionsPasswordHistory {
  /**
   * @type {boolean}
   */
  enable: boolean;
  /**
   * @type {number}
   */
  size?: number;
}
/**
 * Options for password expiration policy
 * @export
 * @interface ConnectionCreateOptionsPasswordNoPersonalInfo
 */
export interface ConnectionCreateOptionsPasswordNoPersonalInfo {
  /**
   * @type {boolean}
   */
  enable: boolean;
}
/**
 * Options for validation
 * @export
 * @interface ConnectionCreateOptionsValidation
 */
export interface ConnectionCreateOptionsValidation {
  /**
   * @type {ConnectionCreateOptionsValidationUsername}
   */
  username?: ConnectionCreateOptionsValidationUsername | null;
}
/**
 *
 * @export
 * @interface ConnectionCreateOptionsValidationUsername
 */
export interface ConnectionCreateOptionsValidationUsername {
  /**
   * @type {number}
   */
  min: number;
  /**
   * @type {number}
   */
  max: number;
}
/**
 *
 * @export
 * @interface ConnectionUpdate
 */
export interface ConnectionUpdate {
  /**
   * Connection name used in the new universal login experience
   * @type {string}
   */
  display_name?: string;
  /**
   * @type {ConnectionUpdateOptions}
   */
  options?: ConnectionUpdateOptions | null;
  /**
   * The identifiers of the clients for which the connection is to be enabled. If the property is not specified, no clients are enabled. If the array is empty, the connection will be disabled for every client.
   * @type {Array<string>}
   */
  enabled_clients?: Array<string>;
  /**
   * @type {boolean}
   */
  is_domain_connection?: boolean;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm
   * @type {Array<string>}
   */
  realms?: Array<string>;
  /**
   * Metadata associated with the connection, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   */
  metadata?: { [key: string]: any };
}
/**
 * The connection's options (depend on the connection strategy)
 * @export
 * @interface ConnectionUpdateOptions
 */
export interface ConnectionUpdateOptions {
  [key: string]: any | any;
  /**
   * @type {ConnectionCreateOptionsValidation}
   */
  validation?: ConnectionCreateOptionsValidation | null;
  /**
   * An array of user fields that should not be stored in the Auth0 database (https://manage.local.dev.auth0.com/docs/security/data-security/denylist)
   * @type {Array<string>}
   */
  non_persistent_attrs?: Array<string>;
  /**
   * @type {boolean}
   */
  enable_script_context?: boolean;
  /**
   * Set to true to use a legacy user store
   * @type {boolean}
   */
  enabledDatabaseCustomization?: boolean;
  /**
   * Enable this if you have a legacy user store and you want to gradually migrate those users to the Auth0 user store
   * @type {boolean}
   */
  import_mode?: boolean;
  /**
   * @type {ConnectionCreateOptionsCustomScripts}
   */
  customScripts?: ConnectionCreateOptionsCustomScripts;
  /**
   * Password strength level
   * @type {string}
   */
  passwordPolicy?: ConnectionUpdateOptionsPasswordPolicyEnum;
  /**
   * @type {ConnectionCreateOptionsPasswordComplexityOptions}
   */
  password_complexity_options?: ConnectionCreateOptionsPasswordComplexityOptions | null;
  /**
   * @type {ConnectionCreateOptionsPasswordHistory}
   */
  password_history?: ConnectionCreateOptionsPasswordHistory | null;
  /**
   * @type {ConnectionCreateOptionsPasswordNoPersonalInfo}
   */
  password_no_personal_info?: ConnectionCreateOptionsPasswordNoPersonalInfo | null;
  /**
   * @type {ConnectionCreateOptionsPasswordDictionary}
   */
  password_dictionary?: ConnectionCreateOptionsPasswordDictionary | null;
  /**
   * @type {boolean}
   */
  api_enable_users?: boolean;
  /**
   * @type {boolean}
   */
  basic_profile?: boolean;
  /**
   * @type {boolean}
   */
  ext_admin?: boolean;
  /**
   * @type {boolean}
   */
  ext_is_suspended?: boolean;
  /**
   * @type {boolean}
   */
  ext_agreed_terms?: boolean;
  /**
   * @type {boolean}
   */
  ext_groups?: boolean;
  /**
   * @type {boolean}
   */
  ext_assigned_plans?: boolean;
  /**
   * @type {boolean}
   */
  ext_profile?: boolean;
  /**
   * @type {boolean}
   */
  disable_self_service_change_password?: boolean;
  /**
   * Options for adding parameters in the request to the upstream IdP
   * @type {{ [key: string]: any; }}
   */
  upstream_params?: { [key: string]: any } | null;
  /**
   * Determines whether the 'name', 'given_name', 'family_name', 'nickname', and 'picture' attributes can be independently updated when using an external IdP. Possible values are 'on_each_login' (default value, it configures the connection to automatically update the root attributes from the external IdP with each user login. When this setting is used, root attributes cannot be independently updated), 'on_first_login' (configures the connection to only set the root attributes on first login, allowing them to be independently updated thereafter)
   * @type {string}
   */
  set_user_root_attributes?: ConnectionUpdateOptionsSetUserRootAttributesEnum;
  /**
   * @type {ConnectionCreateOptionsGatewayAuthentication}
   */
  gateway_authentication?: ConnectionCreateOptionsGatewayAuthentication | null;
}

/**
 * @export
 */
export const ConnectionUpdateOptionsPasswordPolicyEnum = {
  none: 'none',
  low: 'low',
  fair: 'fair',
  good: 'good',
  excellent: 'excellent',
  null: 'null',
} as const;
export type ConnectionUpdateOptionsPasswordPolicyEnum =
  typeof ConnectionUpdateOptionsPasswordPolicyEnum[keyof typeof ConnectionUpdateOptionsPasswordPolicyEnum];

/**
 * @export
 */
export const ConnectionUpdateOptionsSetUserRootAttributesEnum = {
  each_login: 'on_each_login',
  first_login: 'on_first_login',
} as const;
export type ConnectionUpdateOptionsSetUserRootAttributesEnum =
  typeof ConnectionUpdateOptionsSetUserRootAttributesEnum[keyof typeof ConnectionUpdateOptionsSetUserRootAttributesEnum];

/**
 *
 * @export
 * @interface CustomDomain
 */
export interface CustomDomain {
  /**
   * ID of the custom domain.
   * @type {string}
   */
  custom_domain_id: string;
  /**
   * Domain name.
   * @type {string}
   */
  domain: string;
  /**
   * Whether this is a primary domain (true) or not (false).
   * @type {boolean}
   */
  primary: boolean;
  /**
   * Custom domain configuration status. Can be `disabled`, `pending`, `pending_verification`, or `ready`.
   * @type {string}
   */
  status: CustomDomainStatusEnum;
  /**
   * Custom domain provisioning type. Can be `auth0_managed_certs` or `self_managed_certs`.
   * @type {string}
   */
  type: CustomDomainTypeEnum;
  /**
   * Intermediate address.
   * @type {string}
   */
  origin_domain_name?: string;
  /**
   * @type {PostCustomDomains201ResponseVerification}
   */
  verification?: PostCustomDomains201ResponseVerification;
  /**
   * The HTTP header to fetch the client's IP address
   * @type {string}
   */
  custom_client_ip_header?: string | null;
  /**
   * The TLS version policy
   * @type {string}
   */
  tls_policy?: string;
}

/**
 * @export
 */
export const CustomDomainStatusEnum = {
  disabled: 'disabled',
  pending: 'pending',
  pending_verification: 'pending_verification',
  ready: 'ready',
} as const;
export type CustomDomainStatusEnum =
  typeof CustomDomainStatusEnum[keyof typeof CustomDomainStatusEnum];

/**
 * @export
 */
export const CustomDomainTypeEnum = {
  auth0_managed_certs: 'auth0_managed_certs',
  self_managed_certs: 'self_managed_certs',
} as const;
export type CustomDomainTypeEnum = typeof CustomDomainTypeEnum[keyof typeof CustomDomainTypeEnum];

/**
 *
 * @export
 * @interface DeleteMembersRequest
 */
export interface DeleteMembersRequest {
  /**
   * List of user IDs to remove from the organization.
   * @type {Array<string>}
   */
  members: Array<string>;
}
/**
 *
 * @export
 * @interface DeleteOrganizationMemberRolesRequest
 */
export interface DeleteOrganizationMemberRolesRequest {
  /**
   * List of roles IDs associated with the organization member to remove.
   * @type {Array<string>}
   */
  roles: Array<string>;
}
/**
 *
 * @export
 * @interface DeletePermissionsRequest
 */
export interface DeletePermissionsRequest {
  /**
   * List of permissions to remove from this user.
   * @type {Array<PostRolePermissionAssignmentRequestPermissionsInner>}
   */
  permissions: Array<PostRolePermissionAssignmentRequestPermissionsInner>;
}
/**
 *
 * @export
 * @interface DeleteUserIdentityByUserId200ResponseInner
 */
export interface DeleteUserIdentityByUserId200ResponseInner {
  /**
   * The name of the connection for the identity.
   * @type {string}
   */
  connection: string;
  /**
   * The unique identifier for the user for the identity.
   * @type {string}
   */
  user_id: string;
  /**
   * The type of identity provider.
   * @type {string}
   */
  provider: string;
  /**
   * <code>true</code> if the identity provider is a social provider, <code>false</code>s otherwise
   * @type {boolean}
   */
  isSocial?: boolean;
  /**
   * IDP access token returned only if scope read:user_idp_tokens is defined
   * @type {string}
   */
  access_token?: string;
  /**
   * IDP access token secret returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   */
  access_token_secret?: string;
  /**
   * IDP refresh token returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   */
  refresh_token?: string;
  /**
   * @type {UserProfile}
   */
  profileData?: UserProfile;
}
/**
 *
 * @export
 * @interface DeleteUserRolesRequest
 */
export interface DeleteUserRolesRequest {
  /**
   * List of roles IDs to remove from the user.
   * @type {Array<string>}
   */
  roles: Array<string>;
}
/**
 *
 * @export
 * @interface DeviceCredential
 */
export interface DeviceCredential {
  /**
   * ID of this device.
   * @type {string}
   */
  id?: string;
  /**
   * User agent for this device
   * @type {string}
   */
  device_name?: string;
  /**
   * Unique identifier for the device. NOTE: This field is generally not populated for refresh_tokens and rotating_refresh_tokens
   * @type {string}
   */
  device_id?: string;
  /**
   * Type of credential. Can be `public_key`, `refresh_token`, or `rotating_refresh_token`.
   * @type {string}
   */
  type?: DeviceCredentialTypeEnum;
  /**
   * user_id this credential is associated with.
   * @type {string}
   */
  user_id?: string;
  /**
   * client_id of the client (application) this credential is for.
   * @type {string}
   */
  client_id?: string;
}

/**
 * @export
 */
export const DeviceCredentialTypeEnum = {
  public_key: 'public_key',
  refresh_token: 'refresh_token',
  rotating_refresh_token: 'rotating_refresh_token',
} as const;
export type DeviceCredentialTypeEnum =
  typeof DeviceCredentialTypeEnum[keyof typeof DeviceCredentialTypeEnum];

/**
 *
 * @export
 * @interface DeviceCredentialCreate
 */
export interface DeviceCredentialCreate {
  /**
   * Name for this device easily recognized by owner.
   * @type {string}
   */
  device_name: string;
  /**
   * Type of credential. Must be `public_key`.
   * @type {string}
   */
  type: DeviceCredentialCreateTypeEnum;
  /**
   * Base64 encoded string containing the credential.
   * @type {string}
   */
  value: string;
  /**
   * Unique identifier for the device. Recommend using <a href="http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID">Android_ID</a> on Android and <a href="https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIDevice_Class/index.html#//apple_ref/occ/instp/UIDevice/identifierForVendor">identifierForVendor</a>.
   * @type {string}
   */
  device_id: string;
  /**
   * client_id of the client (application) this credential is for.
   * @type {string}
   */
  client_id?: string;
}

/**
 * @export
 */
export const DeviceCredentialCreateTypeEnum = {
  public_key: 'public_key',
} as const;
export type DeviceCredentialCreateTypeEnum =
  typeof DeviceCredentialCreateTypeEnum[keyof typeof DeviceCredentialCreateTypeEnum];

/**
 *
 * @export
 * @interface DraftUpdate
 */
export interface DraftUpdate {
  /**
   * True if the draft of the action should be updated with the reverted version.
   * @type {boolean}
   */
  update_draft?: boolean;
}
/**
 *
 * @export
 * @interface EmailProvider
 */
export interface EmailProvider {
  /**
   * Name of the email provider. Can be `mailgun`, `mandrill`, `sendgrid`, `ses`, `sparkpost`, or `smtp`.
   * @type {string}
   */
  name?: string;
  /**
   * Whether the provider is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Email address to use as "from" when no other address specified.
   * @type {string}
   */
  default_from_address?: string;
  /**
   * @type {EmailProviderCredentials}
   */
  credentials?: EmailProviderCredentials;
  /**
   * Specific provider setting
   * @type {{ [key: string]: any; }}
   */
  settings?: { [key: string]: any };
}
/**
 * Credentials required to use the provider.
 * @export
 * @interface EmailProviderCredentials
 */
export interface EmailProviderCredentials {
  /**
   * API User.
   * @type {string}
   */
  api_user?: string;
  /**
   * AWS or SparkPost region.
   * @type {string}
   */
  region?: string;
  /**
   * SMTP host.
   * @type {string}
   */
  smtp_host?: string;
  /**
   * SMTP port.
   * @type {number}
   */
  smtp_port?: number;
  /**
   * SMTP username.
   * @type {string}
   */
  smtp_user?: string;
}
/**
 *
 * @export
 * @interface EmailTemplateUpdate
 */
export interface EmailTemplateUpdate {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   * @type {string}
   */
  template: EmailTemplateUpdateTemplateEnum;
  /**
   * Body of the email template.
   * @type {string}
   */
  body: string | null;
  /**
   * Senders `from` email address.
   * @type {string}
   */
  from: string | null;
  /**
   * URL to redirect the user to after a successful action.
   * @type {string}
   */
  resultUrl?: string | null;
  /**
   * Subject line of the email.
   * @type {string}
   */
  subject: string | null;
  /**
   * Syntax of the template body.
   * @type {string}
   */
  syntax: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   * @type {number}
   */
  urlLifetimeInSeconds?: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   * @type {boolean}
   */
  includeEmailInRedirect?: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled: boolean | null;
}

/**
 * @export
 */
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
  typeof EmailTemplateUpdateTemplateEnum[keyof typeof EmailTemplateUpdateTemplateEnum];

/**
 *
 * @export
 * @interface Enrollment
 */
export interface Enrollment {
  /**
   * ID for this enrollment.
   * @type {string}
   */
  id: string;
  /**
   * Status of this enrollment. Can be `pending` or `confirmed`.
   * @type {string}
   */
  status?: EnrollmentStatusEnum;
  /**
   * Device name (only for push notification).
   * @type {string}
   */
  name?: string;
  /**
   * Device identifier. This is usually the phone identifier.
   * @type {string}
   */
  identifier?: string;
  /**
   * Phone number.
   * @type {string}
   */
  phone_number?: string;
  /**
   * @type {EnrollmentEnrolledAt}
   */
  enrolled_at?: EnrollmentEnrolledAt;
  /**
   * @type {EnrollmentLastAuth}
   */
  last_auth?: EnrollmentLastAuth;
}

/**
 * @export
 */
export const EnrollmentStatusEnum = {
  pending: 'pending',
  confirmed: 'confirmed',
} as const;
export type EnrollmentStatusEnum = typeof EnrollmentStatusEnum[keyof typeof EnrollmentStatusEnum];

/**
 *
 * @export
 * @interface EnrollmentCreate
 */
export interface EnrollmentCreate {
  /**
   * user_id for the enrollment ticket
   * @type {string}
   */
  user_id: string;
  /**
   * alternate email to which the enrollment email will be sent. Optional - by default, the email will be sent to the user's default address
   * @type {string}
   */
  email?: string;
  /**
   * Send an email to the user to start the enrollment
   * @type {boolean}
   */
  send_mail?: boolean;
}
/**
 * @type EnrollmentEnrolledAt
 *
 * @export
 */
export type EnrollmentEnrolledAt = string;
/**
 * @type EnrollmentLastAuth
 *
 * @export
 */
export type EnrollmentLastAuth = string;
/**
 *
 * @export
 * @interface Factor
 */
export interface Factor {
  /**
   * Whether this factor is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled: boolean;
  /**
   * Whether trial limits have been exceeded.
   * @type {boolean}
   */
  trial_expired?: boolean;
  /**
   * Factor name. Can be `sms`, `push-notification`, `email`, `duo` `otp` `webauthn-roaming`, `webauthn-platform`, or `recovery-code`.
   * @type {string}
   */
  name?: FactorNameEnum;
}

/**
 * @export
 */
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
export type FactorNameEnum = typeof FactorNameEnum[keyof typeof FactorNameEnum];

/**
 *
 * @export
 * @interface GetActionVersions200Response
 */
export interface GetActionVersions200Response {
  /**
   * The total result count.
   * @type {number}
   */
  total?: number;
  /**
   * Page index of the results being returned. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   * @type {number}
   */
  per_page?: number;
  /**
   * @type {Array<GetActionVersions200ResponseVersionsInner>}
   */
  versions?: Array<GetActionVersions200ResponseVersionsInner>;
}
/**
 *
 * @export
 * @interface GetActionVersions200ResponseVersionsInner
 */
export interface GetActionVersions200ResponseVersionsInner {
  /**
   * The unique id of an action version.
   * @type {string}
   */
  id?: string;
  /**
   * The id of the action to which this version belongs.
   * @type {string}
   */
  action_id?: string;
  /**
   * The source code of this specific version of the action.
   * @type {string}
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this specific version depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * Indicates if this speciic version is the currently one deployed.
   * @type {boolean}
   */
  deployed?: boolean;
  /**
   * The Node runtime. For example: `node12`
   * @type {string}
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<GetActions200ResponseActionsInnerSecretsInner>}
   */
  secrets?: Array<GetActions200ResponseActionsInnerSecretsInner>;
  /**
   * The build status of this specific version.
   * @type {string}
   */
  status?: GetActionVersions200ResponseVersionsInnerStatusEnum;
  /**
   * The index of this version in list of versions for the action.
   * @type {number}
   */
  number?: number;
  /**
   * Any errors that occurred while the version was being built.
   * @type {Array<GetActionVersions200ResponseVersionsInnerErrorsInner>}
   */
  errors?: Array<GetActionVersions200ResponseVersionsInnerErrorsInner>;
  /**
   * @type {GetActionVersions200ResponseVersionsInnerAction}
   */
  action?: GetActionVersions200ResponseVersionsInnerAction;
  /**
   * The time when this version was built successfully.
   * @type {string}
   */
  built_at?: string;
  /**
   * The time when this version was created.
   * @type {string}
   */
  created_at?: string;
  /**
   * The time when a version was updated. Versions are never updated externally. Only Auth0 will update an action version as it is beiing built.
   * @type {string}
   */
  updated_at?: string;
  /**
   * The list of triggers that this version supports. At this time, a version can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   */
  supported_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
}

/**
 * @export
 */
export const GetActionVersions200ResponseVersionsInnerStatusEnum = {
  pending: 'pending',
  building: 'building',
  packaged: 'packaged',
  built: 'built',
  retrying: 'retrying',
  failed: 'failed',
} as const;
export type GetActionVersions200ResponseVersionsInnerStatusEnum =
  typeof GetActionVersions200ResponseVersionsInnerStatusEnum[keyof typeof GetActionVersions200ResponseVersionsInnerStatusEnum];

/**
 * The action to which this verison belongs.
 * @export
 * @interface GetActionVersions200ResponseVersionsInnerAction
 */
export interface GetActionVersions200ResponseVersionsInnerAction {
  /**
   * The unique ID of the action.
   * @type {string}
   */
  id?: string;
  /**
   * The name of an action.
   * @type {string}
   */
  name?: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   */
  supported_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   * @type {string}
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   * @type {string}
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<GetActions200ResponseActionsInnerSecretsInner>}
   */
  secrets?: Array<GetActions200ResponseActionsInnerSecretsInner>;
  /**
   * The version of the action that is currently deployed.
   * @type {{ [key: string]: any; }}
   */
  deployed_version?: { [key: string]: any };
  /**
   * installed_integration_id is the fk reference to the InstalledIntegration entity.
   * @type {string}
   */
  installed_integration_id?: string;
  /**
   * @type {GetActions200ResponseActionsInnerIntegration}
   */
  integration?: GetActions200ResponseActionsInnerIntegration;
  /**
   * The build status of this action.
   * @type {string}
   */
  status?: GetActionVersions200ResponseVersionsInnerActionStatusEnum;
  /**
   * True if all of an Action's contents have been deployed.
   * @type {boolean}
   */
  all_changes_deployed?: boolean;
  /**
   * The time when this action was built successfully.
   * @type {string}
   */
  built_at?: string;
  /**
   * The time when this action was created.
   * @type {string}
   */
  created_at?: string;
  /**
   * The time when this action was updated.
   * @type {string}
   */
  updated_at?: string;
}

/**
 * @export
 */
export const GetActionVersions200ResponseVersionsInnerActionStatusEnum = {
  pending: 'pending',
  building: 'building',
  packaged: 'packaged',
  built: 'built',
  retrying: 'retrying',
  failed: 'failed',
} as const;
export type GetActionVersions200ResponseVersionsInnerActionStatusEnum =
  typeof GetActionVersions200ResponseVersionsInnerActionStatusEnum[keyof typeof GetActionVersions200ResponseVersionsInnerActionStatusEnum];

/**
 * Error is a generic error with a human readable id which should be easily referenced in support tickets.
 * @export
 * @interface GetActionVersions200ResponseVersionsInnerErrorsInner
 */
export interface GetActionVersions200ResponseVersionsInnerErrorsInner {
  /**
   * @type {string}
   */
  id?: string;
  /**
   * @type {string}
   */
  msg?: string;
  /**
   * @type {string}
   */
  url?: string;
}
/**
 *
 * @export
 * @interface GetActions200Response
 */
export interface GetActions200Response {
  /**
   * The total result count.
   * @type {number}
   */
  total?: number;
  /**
   * Page index of the results being returned. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page.
   * @type {number}
   */
  per_page?: number;
  /**
   * The list of actions.
   * @type {Array<GetActions200ResponseActionsInner>}
   */
  actions?: Array<GetActions200ResponseActionsInner>;
}
/**
 *
 * @export
 * @interface GetActions200ResponseActionsInner
 */
export interface GetActions200ResponseActionsInner {
  /**
   * The unique ID of the action.
   * @type {string}
   */
  id?: string;
  /**
   * The name of an action.
   * @type {string}
   */
  name?: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   */
  supported_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   * @type {string}
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   * @type {string}
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<GetActions200ResponseActionsInnerSecretsInner>}
   */
  secrets?: Array<GetActions200ResponseActionsInnerSecretsInner>;
  /**
   * The version of the action that is currently deployed.
   * @type {{ [key: string]: any; }}
   */
  deployed_version?: { [key: string]: any };
  /**
   * installed_integration_id is the fk reference to the InstalledIntegration entity.
   * @type {string}
   */
  installed_integration_id?: string;
  /**
   * @type {GetActions200ResponseActionsInnerIntegration}
   */
  integration?: GetActions200ResponseActionsInnerIntegration;
  /**
   * The build status of this action.
   * @type {string}
   */
  status?: GetActions200ResponseActionsInnerStatusEnum;
  /**
   * True if all of an Action's contents have been deployed.
   * @type {boolean}
   */
  all_changes_deployed?: boolean;
  /**
   * The time when this action was built successfully.
   * @type {string}
   */
  built_at?: string;
  /**
   * The time when this action was created.
   * @type {string}
   */
  created_at?: string;
  /**
   * The time when this action was updated.
   * @type {string}
   */
  updated_at?: string;
}

/**
 * @export
 */
export const GetActions200ResponseActionsInnerStatusEnum = {
  pending: 'pending',
  building: 'building',
  packaged: 'packaged',
  built: 'built',
  retrying: 'retrying',
  failed: 'failed',
} as const;
export type GetActions200ResponseActionsInnerStatusEnum =
  typeof GetActions200ResponseActionsInnerStatusEnum[keyof typeof GetActions200ResponseActionsInnerStatusEnum];

/**
 * Dependency is an npm module. These values are used to produce an immutable artifact, which manifests as a layer_id.
 * @export
 * @interface GetActions200ResponseActionsInnerDependenciesInner
 */
export interface GetActions200ResponseActionsInnerDependenciesInner {
  /**
   * name is the name of the npm module, e.g. lodash
   * @type {string}
   */
  name?: string;
  /**
   * description is the version of the npm module, e.g. 4.17.1
   * @type {string}
   */
  version?: string;
  /**
   * registry_url is an optional value used primarily for private npm registries.
   * @type {string}
   */
  registry_url?: string;
}
/**
 * Integration defines a self contained functioning unit which partners<br/>publish. A partner may create one or many of these integrations.
 * @export
 * @interface GetActions200ResponseActionsInnerIntegration
 */
export interface GetActions200ResponseActionsInnerIntegration {
  /**
   * id is a system generated GUID. This same ID is designed to be federated in<br/>all the applicable localities.
   * @type {string}
   */
  id?: string;
  /**
   * catalog_id refers to the ID in the marketplace catalog
   * @type {string}
   */
  catalog_id?: string;
  /**
   * url_slug refers to the url_slug in the marketplace catalog
   * @type {string}
   */
  url_slug?: string;
  /**
   * partner_id is the foreign key reference to the partner account this<br/>integration belongs to.
   * @type {string}
   */
  partner_id?: string;
  /**
   * name is the integration name, which will be used for display purposes in<br/>the marketplace.<br/><br/>To start we're going to make sure the display name is at least 3<br/>characters. Can adjust this easily later.
   * @type {string}
   */
  name?: string;
  /**
   * description adds more text for the integration name -- also relevant for<br/>the marketplace listing.
   * @type {string}
   */
  description?: string;
  /**
   * short_description is the brief description of the integration, which is used for display purposes in cards
   * @type {string}
   */
  short_description?: string;
  /**
   * @type {string}
   */
  logo?: string;
  /**
   * feature_type is the type of the integration.
   * @type {string}
   */
  feature_type?: GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum;
  /**
   * @type {string}
   */
  terms_of_use_url?: string;
  /**
   * @type {string}
   */
  privacy_policy_url?: string;
  /**
   * @type {string}
   */
  public_support_link?: string;
  /**
   * @type {GetActions200ResponseActionsInnerIntegrationCurrentRelease}
   */
  current_release?: GetActions200ResponseActionsInnerIntegrationCurrentRelease;
  /**
   * @type {string}
   */
  created_at?: string;
  /**
   * @type {string}
   */
  updated_at?: string;
}

/**
 * @export
 */
export const GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum = {
  unspecified: 'unspecified',
  action: 'action',
  social_connection: 'social_connection',
  log_stream: 'log_stream',
  sso_integration: 'sso_integration',
  sms_provider: 'sms_provider',
} as const;
export type GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum =
  typeof GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum[keyof typeof GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum];

/**
 *
 * @export
 * @interface GetActions200ResponseActionsInnerIntegrationCurrentRelease
 */
export interface GetActions200ResponseActionsInnerIntegrationCurrentRelease {
  /**
   * The id of the associated IntegrationRelease
   * @type {string}
   */
  id?: string;
  /**
   * @type {GetActions200ResponseActionsInnerSupportedTriggersInner}
   */
  trigger?: GetActions200ResponseActionsInnerSupportedTriggersInner;
  /**
   * @type {GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver}
   */
  semver?: GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver;
  /**
   * required_secrets declares all the necessary secrets for an integration to<br/>work.
   * @type {Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner>}
   */
  required_secrets?: Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner>;
  /**
   * required_configuration declares all the necessary configuration fields for an integration to work.
   * @type {Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner>}
   */
  required_configuration?: Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner>;
}
/**
 * Param are form input values, primarily utilized when specifying secrets and<br/>configuration values for actions.<br/><br/>These are especially important for partner integrations -- but can be<br/>exposed to tenant admins as well if they want to parameterize their custom<br/>actions.
 * @export
 * @interface GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
 */
export interface GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner {
  /**
   * @type {string}
   */
  type?: GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum;
  /**
   * The name of the parameter.
   * @type {string}
   */
  name?: string;
  /**
   * The flag for if this parameter is required.
   * @type {boolean}
   */
  required?: boolean;
  /**
   * The temp flag for if this parameter is required (experimental; for Labs use only).
   * @type {boolean}
   */
  optional?: boolean;
  /**
   * The short label for this parameter.
   * @type {string}
   */
  label?: string;
  /**
   * The lengthier description for this parameter.
   * @type {string}
   */
  description?: string;
  /**
   * The default value for this parameter.
   * @type {string}
   */
  default_value?: string;
  /**
   * Placeholder text for this parameter.
   * @type {string}
   */
  placeholder?: string;
  /**
   * The allowable options for this param.
   * @type {Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerOptionsInner>}
   */
  options?: Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerOptionsInner>;
}

/**
 * @export
 */
export const GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum =
  {
    UNSPECIFIED: 'UNSPECIFIED',
    STRING: 'STRING',
  } as const;
export type GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum =
  typeof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum[keyof typeof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum];

/**
 *
 * @export
 * @interface GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerOptionsInner
 */
export interface GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerOptionsInner {
  /**
   * The value of an option that will be used within the application.
   * @type {string}
   */
  value?: string;
  /**
   * The display value of an option suitable for displaying in a UI.
   * @type {string}
   */
  label?: string;
}
/**
 * Semver denotes the major.minor version of an integration release
 * @export
 * @interface GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver
 */
export interface GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver {
  /**
   * Major is the major number of a semver
   * @type {number}
   */
  major?: number;
  /**
   * Minior is the minior number of a semver
   * @type {number}
   */
  minor?: number;
}
/**
 *
 * @export
 * @interface GetActions200ResponseActionsInnerSecretsInner
 */
export interface GetActions200ResponseActionsInnerSecretsInner {
  /**
   * The name of the particular secret, e.g. API_KEY.
   * @type {string}
   */
  name?: string;
  /**
   * The time when the secret was last updated.
   * @type {string}
   */
  updated_at?: string;
}
/**
 *
 * @export
 * @interface GetActions200ResponseActionsInnerSupportedTriggersInner
 */
export interface GetActions200ResponseActionsInnerSupportedTriggersInner {
  /**
   * An actions extensibility point.
   * @type {string}
   */
  id: GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum;
  /**
   * The version of a trigger. v1, v2, etc.
   * @type {string}
   */
  version?: string;
  /**
   * status points to the trigger status.
   * @type {string}
   */
  status?: string;
  /**
   * runtimes supported by this trigger.
   * @type {Array<string>}
   */
  runtimes?: Array<string>;
  /**
   * Runtime that will be used when none is specified when creating an action.
   * @type {string}
   */
  default_runtime?: string;
  /**
   * compatible_triggers informs which other trigger supports the same event and api.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInner>}
   */
  compatible_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInner>;
}

/**
 * @export
 */
export const GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum = {
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
} as const;
export type GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum =
  typeof GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum[keyof typeof GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum];

/**
 *
 * @export
 * @interface GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInner
 */
export interface GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInner {
  /**
   * An actions extensibility point.
   * @type {string}
   */
  id: GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInnerIdEnum;
  /**
   * The version of a trigger. v1, v2, etc.
   * @type {string}
   */
  version: string;
}

/**
 * @export
 */
export const GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInnerIdEnum =
  {
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
  } as const;
export type GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInnerIdEnum =
  typeof GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInnerIdEnum[keyof typeof GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInnerIdEnum];

/**
 *
 * @export
 * @interface GetApns200Response
 */
export interface GetApns200Response {
  /**
   * @type {string}
   */
  bundle_id?: string | null;
  /**
   * @type {boolean}
   */
  sandbox?: boolean;
  /**
   * @type {boolean}
   */
  enabled?: boolean;
}
/**
 * @type GetAuthenticationMethods200Response
 *
 * @export
 */
export type GetAuthenticationMethods200Response =
  | Array<GetAuthenticationMethods200ResponseOneOfInner>
  | GetAuthenticationMethods200ResponseOneOf;
/**
 *
 * @export
 * @interface GetAuthenticationMethods200ResponseOneOf
 */
export interface GetAuthenticationMethods200ResponseOneOf {
  /**
   * Index of the starting record. Derived from the page and per_page parameters.
   * @type {number}
   */
  start?: number;
  /**
   * Maximum amount of records to return.
   * @type {number}
   */
  limit?: number;
  /**
   * Total number of pageable records.
   * @type {number}
   */
  total?: number;
  /**
   * The paginated authentication methods. Returned in this structure when include_totals is true.
   * @type {Array<GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner>}
   */
  authenticators?: Array<GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner>;
}
/**
 *
 * @export
 * @interface GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
 */
export interface GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner {
  /**
   * The ID of the authentication method (auto generated)
   * @type {string}
   */
  id: string;
  /**
   * @type {string}
   */
  type: GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerTypeEnum;
  /**
   * The authentication method status
   * @type {boolean}
   */
  confirmed?: boolean;
  /**
   * A human-readable label to identify the authentication method
   * @type {string}
   */
  name?: string;
  /**
   * @type {Array<GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInner>}
   */
  authentication_methods?: Array<GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInner>;
  /**
   * The authentication method preferred for phone authenticators.
   * @type {string}
   */
  preferred_authentication_method?: string;
  /**
   * The ID of a linked authentication method. Linked authentication methods will be deleted together.
   * @type {string}
   */
  link_id?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Applies to email and email-verification authentication methods only. The email address used to send verification messages.
   * @type {string}
   */
  email?: string;
  /**
   * Applies to webauthn authentication methods only. The ID of the generated credential.
   * @type {string}
   */
  key_id?: string;
  /**
   * Applies to webauthn authentication methods only. The public key.
   * @type {string}
   */
  public_key?: string;
  /**
   * Authenticator creation date
   * @type {string}
   */
  created_at: string;
  /**
   * Enrollment date
   * @type {string}
   */
  enrolled_at?: string;
  /**
   * Last authentication
   * @type {string}
   */
  last_auth_at?: string;
}

/**
 * @export
 */
export const GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerTypeEnum = {
  recovery_code: 'recovery-code',
  totp: 'totp',
  push: 'push',
  phone: 'phone',
  email: 'email',
  email_verification: 'email-verification',
  webauthn_roaming: 'webauthn-roaming',
  webauthn_platform: 'webauthn-platform',
  guardian: 'guardian',
} as const;
export type GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerTypeEnum =
  typeof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerTypeEnum[keyof typeof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerTypeEnum];

/**
 *
 * @export
 * @interface GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInner
 */
export interface GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInner {
  /**
   * @type {string}
   */
  type?: GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInnerTypeEnum;
  /**
   * @type {string}
   */
  id?: string;
}

/**
 * @export
 */
export const GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInnerTypeEnum =
  {
    totp: 'totp',
    push: 'push',
    sms: 'sms',
    voice: 'voice',
  } as const;
export type GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInnerTypeEnum =
  typeof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInnerTypeEnum[keyof typeof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInnerTypeEnum];

/**
 *
 * @export
 * @interface GetAuthenticationMethods200ResponseOneOfInner
 */
export interface GetAuthenticationMethods200ResponseOneOfInner {
  [key: string]: any | any;
  /**
   * Enrollment generated id
   * @type {string}
   */
  id: string;
  /**
   * Enrollment type
   * @type {string}
   */
  type: GetAuthenticationMethods200ResponseOneOfInnerTypeEnum;
  /**
   * Enrollment status
   * @type {boolean}
   */
  confirmed?: boolean;
  /**
   * A human-readable label to identify the authenticator
   * @type {string}
   */
  name?: string;
  /**
   * Indicates the authenticator is linked to another authenticator
   * @type {string}
   */
  link_id?: string;
  /**
   * Applies to phone authenticators only. The destination phone number used to text and call.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Applies to email authenticators only. The email address used to send verification messages.
   * @type {string}
   */
  email?: string;
  /**
   * Applies to webauthn authenticators only. The ID of the generated credential.
   * @type {string}
   */
  key_id?: string;
  /**
   * Applies to webauthn authenticators only. The public key.
   * @type {string}
   */
  public_key?: string;
  /**
   * Authenticator creation date
   * @type {string}
   */
  created_at: string;
  /**
   * Enrollment date
   * @type {string}
   */
  enrolled_at?: string;
  /**
   * Last authentication
   * @type {string}
   */
  last_auth_at?: string;
}

/**
 * @export
 */
export const GetAuthenticationMethods200ResponseOneOfInnerTypeEnum = {
  recovery_code: 'recovery-code',
  totp: 'totp',
  push: 'push',
  guardian: 'guardian',
  sms: 'sms',
  phone: 'phone',
  email: 'email',
  webauthn_roaming: 'webauthn-roaming',
  webauthn_platform: 'webauthn-platform',
} as const;
export type GetAuthenticationMethods200ResponseOneOfInnerTypeEnum =
  typeof GetAuthenticationMethods200ResponseOneOfInnerTypeEnum[keyof typeof GetAuthenticationMethods200ResponseOneOfInnerTypeEnum];

/**
 *
 * @export
 * @interface GetBindings200Response
 */
export interface GetBindings200Response {
  /**
   * The total result count.
   * @type {number}
   */
  total?: number;
  /**
   * Page index of the results being returned. First page is 0.
   * @type {number}
   */
  page?: number;
  /**
   * Number of results per page.
   * @type {number}
   */
  per_page?: number;
  /**
   * The list of actions that are bound to this trigger in the order in which they will be executed.
   * @type {Array<GetBindings200ResponseBindingsInner>}
   */
  bindings?: Array<GetBindings200ResponseBindingsInner>;
}
/**
 * Binding is the associative entity joining a trigger, and an action together.
 * @export
 * @interface GetBindings200ResponseBindingsInner
 */
export interface GetBindings200ResponseBindingsInner {
  /**
   * The unique ID of this binding.
   * @type {string}
   */
  id?: string;
  /**
   * An actions extensibility point.
   * @type {string}
   */
  trigger_id?: GetBindings200ResponseBindingsInnerTriggerIdEnum;
  /**
   * The name of the binding.
   * @type {string}
   */
  display_name?: string;
  /**
   * @type {GetActions200ResponseActionsInner}
   */
  action?: GetActions200ResponseActionsInner;
  /**
   * The time when the binding was created.
   * @type {string}
   */
  created_at?: string;
  /**
   * The time when the binding was updated.
   * @type {string}
   */
  updated_at?: string;
}

/**
 * @export
 */
export const GetBindings200ResponseBindingsInnerTriggerIdEnum = {
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
} as const;
export type GetBindings200ResponseBindingsInnerTriggerIdEnum =
  typeof GetBindings200ResponseBindingsInnerTriggerIdEnum[keyof typeof GetBindings200ResponseBindingsInnerTriggerIdEnum];

/**
 *
 * @export
 * @interface GetBranding200Response
 */
export interface GetBranding200Response {
  /**
   * @type {GetBranding200ResponseColors}
   */
  colors?: GetBranding200ResponseColors;
  /**
   * URL for the favicon. Must use HTTPS.
   * @type {string}
   */
  favicon_url?: string;
  /**
   * URL for the logo. Must use HTTPS.
   * @type {string}
   */
  logo_url?: string;
  /**
   * @type {GetBranding200ResponseFont}
   */
  font?: GetBranding200ResponseFont;
}
/**
 * Custom color settings.
 * @export
 * @interface GetBranding200ResponseColors
 */
export interface GetBranding200ResponseColors {
  /**
   * Accent color.
   * @type {string}
   */
  primary?: string;
  /**
   * @type {GetBranding200ResponseColorsPageBackground}
   */
  page_background?: GetBranding200ResponseColorsPageBackground;
}
/**
 * @type GetBranding200ResponseColorsPageBackground
 * Page Background Color or Gradient.<br/>Property contains either <code>null</code> to unset, a solid color as a string value <code>#FFFFFF</code>, or a gradient as an object.<br/><br/><code><br/>{<br/>  type: 'linear-gradient',<br/>  start: '#FFFFFF',<br/>  end: '#000000',<br/>  angle_deg: 35<br/>}<br/></code><br/>
 * @export
 */
export type GetBranding200ResponseColorsPageBackground = string | { [key: string]: any };
/**
 * Custom font settings.
 * @export
 * @interface GetBranding200ResponseFont
 */
export interface GetBranding200ResponseFont {
  /**
   * URL for the custom font. The URL must point to a font file and not a stylesheet. Must use HTTPS.
   * @type {string}
   */
  url?: string;
}
/**
 * @type GetClientGrants200Response
 *
 * @export
 */
export type GetClientGrants200Response = Array<ClientGrant> | GetClientGrants200ResponseOneOf;
/**
 *
 * @export
 * @interface GetClientGrants200ResponseOneOf
 */
export interface GetClientGrants200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<ClientGrant>}
   */
  client_grants?: Array<ClientGrant>;
}
/**
 * @type GetConnections200Response
 *
 * @export
 */
export type GetConnections200Response = Array<Connection> | GetConnections200ResponseOneOf;
/**
 *
 * @export
 * @interface GetConnections200ResponseOneOf
 */
export interface GetConnections200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<Connection>}
   */
  connections?: Array<Connection>;
}
/**
 * @type GetDeviceCredentials200Response
 *
 * @export
 */
export type GetDeviceCredentials200Response =
  | Array<DeviceCredential>
  | GetDeviceCredentials200ResponseOneOf;
/**
 *
 * @export
 * @interface GetDeviceCredentials200ResponseOneOf
 */
export interface GetDeviceCredentials200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<DeviceCredential>}
   */
  device_credentials?: Array<DeviceCredential>;
}
/**
 *
 * @export
 * @interface GetEmailTemplatesByTemplateName200Response
 */
export interface GetEmailTemplatesByTemplateName200Response {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   * @type {string}
   */
  template?: GetEmailTemplatesByTemplateName200ResponseTemplateEnum;
  /**
   * Body of the email template.
   * @type {string}
   */
  body?: string | null;
  /**
   * Senders `from` email address.
   * @type {string}
   */
  from?: string | null;
  /**
   * URL to redirect the user to after a successful action.
   * @type {string}
   */
  resultUrl?: string | null;
  /**
   * Subject line of the email.
   * @type {string}
   */
  subject?: string | null;
  /**
   * Syntax of the template body.
   * @type {string}
   */
  syntax?: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   * @type {number}
   */
  urlLifetimeInSeconds?: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   * @type {boolean}
   */
  includeEmailInRedirect?: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled?: boolean | null;
}

/**
 * @export
 */
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
  typeof GetEmailTemplatesByTemplateName200ResponseTemplateEnum[keyof typeof GetEmailTemplatesByTemplateName200ResponseTemplateEnum];

/**
 * @type GetEnabledConnections200Response
 *
 * @export
 */
export type GetEnabledConnections200Response =
  | Array<GetEnabledConnections200ResponseOneOfInner>
  | GetEnabledConnections200ResponseOneOf;
/**
 *
 * @export
 * @interface GetEnabledConnections200ResponseOneOf
 */
export interface GetEnabledConnections200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<GetEnabledConnections200ResponseOneOfInner>}
   */
  enabled_connections?: Array<GetEnabledConnections200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetEnabledConnections200ResponseOneOfInner
 */
export interface GetEnabledConnections200ResponseOneOfInner {
  /**
   * ID of the connection.
   * @type {string}
   */
  connection_id?: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   * @type {boolean}
   */
  assign_membership_on_login?: boolean;
  /**
   * @type {GetEnabledConnections200ResponseOneOfInnerConnection}
   */
  connection?: GetEnabledConnections200ResponseOneOfInnerConnection;
}
/**
 *
 * @export
 * @interface GetEnabledConnections200ResponseOneOfInnerConnection
 */
export interface GetEnabledConnections200ResponseOneOfInnerConnection {
  /**
   * The name of the enabled connection.
   * @type {string}
   */
  name?: string;
  /**
   * The strategy of the enabled connection.
   * @type {string}
   */
  strategy?: string;
}
/**
 * @type GetErrors200Response
 *
 * @export
 */
export type GetErrors200Response = Array<GetErrors200ResponseOneOfInner> | Job;
/**
 *
 * @export
 * @interface GetErrors200ResponseOneOfInner
 */
export interface GetErrors200ResponseOneOfInner {
  /**
   * User, as provided in the import file
   * @type {{ [key: string]: any; }}
   */
  user?: { [key: string]: any };
  /**
   * Errors importing the user.
   * @type {Array<GetErrors200ResponseOneOfInnerErrorsInner>}
   */
  errors?: Array<GetErrors200ResponseOneOfInnerErrorsInner>;
}
/**
 *
 * @export
 * @interface GetErrors200ResponseOneOfInnerErrorsInner
 */
export interface GetErrors200ResponseOneOfInnerErrorsInner {
  /**
   * Error code.
   * @type {string}
   */
  code?: string;
  /**
   * Error message.
   * @type {string}
   */
  message?: string;
  /**
   * Error field.
   * @type {string}
   */
  path?: string;
}
/**
 * The result of a specific execution of a trigger.
 * @export
 * @interface GetExecution200Response
 */
export interface GetExecution200Response {
  /**
   * ID identifies this specific execution simulation. These IDs would resemble real executions in production.
   * @type {string}
   */
  id?: string;
  /**
   * An actions extensibility point.
   * @type {string}
   */
  trigger_id?: GetExecution200ResponseTriggerIdEnum;
  /**
   * The overall status of an execution.
   * @type {string}
   */
  status?: GetExecution200ResponseStatusEnum;
  /**
   * @type {Array<GetExecution200ResponseResultsInner>}
   */
  results?: Array<GetExecution200ResponseResultsInner>;
  /**
   * The time that the execution was started.
   * @type {string}
   */
  created_at?: string;
  /**
   * The time that the exeution finished executing.
   * @type {string}
   */
  updated_at?: string;
}

/**
 * @export
 */
export const GetExecution200ResponseTriggerIdEnum = {
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
} as const;
export type GetExecution200ResponseTriggerIdEnum =
  typeof GetExecution200ResponseTriggerIdEnum[keyof typeof GetExecution200ResponseTriggerIdEnum];

/**
 * @export
 */
export const GetExecution200ResponseStatusEnum = {
  unspecified: 'unspecified',
  pending: 'pending',
  final: 'final',
  partial: 'partial',
  canceled: 'canceled',
  suspended: 'suspended',
} as const;
export type GetExecution200ResponseStatusEnum =
  typeof GetExecution200ResponseStatusEnum[keyof typeof GetExecution200ResponseStatusEnum];

/**
 * Captures the results of a single action being executed.
 * @export
 * @interface GetExecution200ResponseResultsInner
 */
export interface GetExecution200ResponseResultsInner {
  /**
   * The name of the action that was executed.
   * @type {string}
   */
  action_name?: string;
  /**
   * @type {GetActionVersions200ResponseVersionsInnerErrorsInner}
   */
  error?: GetActionVersions200ResponseVersionsInnerErrorsInner;
  /**
   * The time when the action was started.
   * @type {string}
   */
  started_at?: string;
  /**
   * The time when the action finished executing.
   * @type {string}
   */
  ended_at?: string;
}
/**
 * @type GetGrants200Response
 *
 * @export
 */
export type GetGrants200Response = Array<UserGrant> | GetGrants200ResponseOneOf;
/**
 *
 * @export
 * @interface GetGrants200ResponseOneOf
 */
export interface GetGrants200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<UserGrant>}
   */
  grants?: Array<UserGrant>;
}
/**
 * @type GetHooks200Response
 *
 * @export
 */
export type GetHooks200Response = Array<Hook> | GetHooks200ResponseOneOf;
/**
 *
 * @export
 * @interface GetHooks200ResponseOneOf
 */
export interface GetHooks200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<Hook>}
   */
  hooks?: Array<Hook>;
}
/**
 * @type GetInvitations200Response
 *
 * @export
 */
export type GetInvitations200Response =
  | Array<GetInvitations200ResponseOneOfInner>
  | GetInvitations200ResponseOneOf;
/**
 *
 * @export
 * @interface GetInvitations200ResponseOneOf
 */
export interface GetInvitations200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {Array<GetInvitations200ResponseOneOfInner>}
   */
  invitations?: Array<GetInvitations200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetInvitations200ResponseOneOfInner
 */
export interface GetInvitations200ResponseOneOfInner {
  /**
   * The id of the user invitation.
   * @type {string}
   */
  id?: string;
  /**
   * Organization identifier
   * @type {string}
   */
  organization_id?: string;
  /**
   * @type {GetInvitations200ResponseOneOfInnerInviter}
   */
  inviter?: GetInvitations200ResponseOneOfInnerInviter;
  /**
   * @type {GetInvitations200ResponseOneOfInnerInvitee}
   */
  invitee?: GetInvitations200ResponseOneOfInnerInvitee;
  /**
   * The invitation url to be send to the invitee.
   * @type {string}
   */
  invitation_url?: string;
  /**
   * The ISO 8601 formatted timestamp representing the creation time of the invitation.
   * @type {string}
   */
  created_at?: string;
  /**
   * The ISO 8601 formatted timestamp representing the expiration time of the invitation.
   * @type {string}
   */
  expires_at?: string;
  /**
   * Auth0 client ID. Used to resolve the application's login initiation endpoint.
   * @type {string}
   */
  client_id?: string;
  /**
   * The id of the connection to force invitee to authenticate with.
   * @type {string}
   */
  connection_id?: string;
  /**
   * @type {GetInvitations200ResponseOneOfInnerAppMetadata}
   */
  app_metadata?: GetInvitations200ResponseOneOfInnerAppMetadata;
  /**
   * Data related to the user that does not affect the application's core functionality.
   * @type {{ [key: string]: any; }}
   */
  user_metadata?: { [key: string]: any };
  /**
   * List of roles IDs to associated with the user.
   * @type {Array<string>}
   */
  roles?: Array<string>;
  /**
   * The id of the invitation ticket
   * @type {string}
   */
  ticket_id?: string;
}
/**
 * Data related to the user that does affect the application's core functionality.
 * @export
 * @interface GetInvitations200ResponseOneOfInnerAppMetadata
 */
export interface GetInvitations200ResponseOneOfInnerAppMetadata {
  /**
   * @type {any}
   */
  clientID?: any | null;
  /**
   * @type {any}
   */
  globalClientID?: any | null;
  /**
   * @type {any}
   */
  global_client_id?: any | null;
  /**
   * @type {any}
   */
  email_verified?: any | null;
  /**
   * @type {any}
   */
  user_id?: any | null;
  /**
   * @type {any}
   */
  identities?: any | null;
  /**
   * @type {any}
   */
  lastIP?: any | null;
  /**
   * @type {any}
   */
  lastLogin?: any | null;
  /**
   * @type {any}
   */
  metadata?: any | null;
  /**
   * @type {any}
   */
  created_at?: any | null;
  /**
   * @type {any}
   */
  loginsCount?: any | null;
  /**
   * @type {any}
   */
  _id?: any | null;
  /**
   * @type {any}
   */
  email?: any | null;
  /**
   * @type {any}
   */
  blocked?: any | null;
  /**
   * @type {any}
   */
  __tenant?: any | null;
  /**
   * @type {any}
   */
  updated_at?: any | null;
}
/**
 *
 * @export
 * @interface GetInvitations200ResponseOneOfInnerInvitee
 */
export interface GetInvitations200ResponseOneOfInnerInvitee {
  /**
   * The invitee's email.
   * @type {string}
   */
  email: string;
}
/**
 *
 * @export
 * @interface GetInvitations200ResponseOneOfInnerInviter
 */
export interface GetInvitations200ResponseOneOfInnerInviter {
  /**
   * The inviter's name.
   * @type {string}
   */
  name: string;
}
/**
 * @type GetLogStreams200ResponseInner
 *
 * @export
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
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf
 */
export interface GetLogStreams200ResponseInnerOneOf {
  /**
   * The id of the log stream
   * @type {string}
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   */
  status?: GetLogStreams200ResponseInnerOneOfStatusEnum;
  /**
   * @type {string}
   */
  type?: GetLogStreams200ResponseInnerOneOfTypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOfSink}
   */
  sink?: GetLogStreams200ResponseInnerOneOfSink;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOfStatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOfStatusEnum =
  typeof GetLogStreams200ResponseInnerOneOfStatusEnum[keyof typeof GetLogStreams200ResponseInnerOneOfStatusEnum];

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOfTypeEnum = {
  http: 'http',
} as const;
export type GetLogStreams200ResponseInnerOneOfTypeEnum =
  typeof GetLogStreams200ResponseInnerOneOfTypeEnum[keyof typeof GetLogStreams200ResponseInnerOneOfTypeEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf1
 */
export interface GetLogStreams200ResponseInnerOneOf1 {
  /**
   * The id of the log stream
   * @type {string}
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   */
  status?: GetLogStreams200ResponseInnerOneOf1StatusEnum;
  /**
   * @type {string}
   */
  type?: GetLogStreams200ResponseInnerOneOf1TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf1Sink}
   */
  sink?: GetLogStreams200ResponseInnerOneOf1Sink;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf1StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf1StatusEnum =
  typeof GetLogStreams200ResponseInnerOneOf1StatusEnum[keyof typeof GetLogStreams200ResponseInnerOneOf1StatusEnum];

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf1TypeEnum = {
  eventbridge: 'eventbridge',
} as const;
export type GetLogStreams200ResponseInnerOneOf1TypeEnum =
  typeof GetLogStreams200ResponseInnerOneOf1TypeEnum[keyof typeof GetLogStreams200ResponseInnerOneOf1TypeEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf1Sink
 */
export interface GetLogStreams200ResponseInnerOneOf1Sink {
  /**
   * AWS account ID
   * @type {string}
   */
  awsAccountId: string;
  /**
   * The region in which the EventBridge event source will be created
   * @type {string}
   */
  awsRegion: GetLogStreams200ResponseInnerOneOf1SinkAwsRegionEnum;
  /**
   * AWS EventBridge partner event source
   * @type {string}
   */
  awsPartnerEventSource?: string;
}

/**
 * @export
 */
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
  typeof GetLogStreams200ResponseInnerOneOf1SinkAwsRegionEnum[keyof typeof GetLogStreams200ResponseInnerOneOf1SinkAwsRegionEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf2
 */
export interface GetLogStreams200ResponseInnerOneOf2 {
  /**
   * The id of the log stream
   * @type {string}
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   */
  status?: GetLogStreams200ResponseInnerOneOf2StatusEnum;
  /**
   * @type {string}
   */
  type?: GetLogStreams200ResponseInnerOneOf2TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf2Sink}
   */
  sink?: GetLogStreams200ResponseInnerOneOf2Sink;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf2StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf2StatusEnum =
  typeof GetLogStreams200ResponseInnerOneOf2StatusEnum[keyof typeof GetLogStreams200ResponseInnerOneOf2StatusEnum];

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf2TypeEnum = {
  eventgrid: 'eventgrid',
} as const;
export type GetLogStreams200ResponseInnerOneOf2TypeEnum =
  typeof GetLogStreams200ResponseInnerOneOf2TypeEnum[keyof typeof GetLogStreams200ResponseInnerOneOf2TypeEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf2Sink
 */
export interface GetLogStreams200ResponseInnerOneOf2Sink {
  /**
   * Subscription ID
   * @type {string}
   */
  azureSubscriptionId: string;
  /**
   * Azure Region Name
   * @type {string}
   */
  azureRegion: GetLogStreams200ResponseInnerOneOf2SinkAzureRegionEnum;
  /**
   * Resource Group
   * @type {string}
   */
  azureResourceGroup: string;
  /**
   * Partner Topic
   * @type {string}
   */
  azurePartnerTopic?: string;
}

/**
 * @export
 */
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
  typeof GetLogStreams200ResponseInnerOneOf2SinkAzureRegionEnum[keyof typeof GetLogStreams200ResponseInnerOneOf2SinkAzureRegionEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf3
 */
export interface GetLogStreams200ResponseInnerOneOf3 {
  /**
   * The id of the log stream
   * @type {string}
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   */
  status?: GetLogStreams200ResponseInnerOneOf3StatusEnum;
  /**
   * @type {string}
   */
  type?: GetLogStreams200ResponseInnerOneOf3TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf3Sink}
   */
  sink?: GetLogStreams200ResponseInnerOneOf3Sink;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf3StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf3StatusEnum =
  typeof GetLogStreams200ResponseInnerOneOf3StatusEnum[keyof typeof GetLogStreams200ResponseInnerOneOf3StatusEnum];

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf3TypeEnum = {
  datadog: 'datadog',
} as const;
export type GetLogStreams200ResponseInnerOneOf3TypeEnum =
  typeof GetLogStreams200ResponseInnerOneOf3TypeEnum[keyof typeof GetLogStreams200ResponseInnerOneOf3TypeEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf3Sink
 */
export interface GetLogStreams200ResponseInnerOneOf3Sink {
  /**
   * Datadog API Key
   * @type {string}
   */
  datadogApiKey: string;
  /**
   * Datadog region
   * @type {string}
   */
  datadogRegion: GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum = {
  us: 'us',
  eu: 'eu',
  us3: 'us3',
  us5: 'us5',
} as const;
export type GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum =
  typeof GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum[keyof typeof GetLogStreams200ResponseInnerOneOf3SinkDatadogRegionEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf4
 */
export interface GetLogStreams200ResponseInnerOneOf4 {
  /**
   * The id of the log stream
   * @type {string}
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   */
  status?: GetLogStreams200ResponseInnerOneOf4StatusEnum;
  /**
   * @type {string}
   */
  type?: GetLogStreams200ResponseInnerOneOf4TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf4Sink}
   */
  sink?: GetLogStreams200ResponseInnerOneOf4Sink;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf4StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf4StatusEnum =
  typeof GetLogStreams200ResponseInnerOneOf4StatusEnum[keyof typeof GetLogStreams200ResponseInnerOneOf4StatusEnum];

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf4TypeEnum = {
  splunk: 'splunk',
} as const;
export type GetLogStreams200ResponseInnerOneOf4TypeEnum =
  typeof GetLogStreams200ResponseInnerOneOf4TypeEnum[keyof typeof GetLogStreams200ResponseInnerOneOf4TypeEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf4Sink
 */
export interface GetLogStreams200ResponseInnerOneOf4Sink {
  /**
   * Splunk URL Endpoint
   * @type {string}
   */
  splunkDomain: string;
  /**
   * Port
   * @type {string}
   */
  splunkPort: string;
  /**
   * Splunk token
   * @type {string}
   */
  splunkToken: string;
  /**
   * Verify TLS certificate
   * @type {boolean}
   */
  splunkSecure: boolean;
}
/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf5
 */
export interface GetLogStreams200ResponseInnerOneOf5 {
  /**
   * The id of the log stream
   * @type {string}
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   */
  status?: GetLogStreams200ResponseInnerOneOf5StatusEnum;
  /**
   * @type {string}
   */
  type?: GetLogStreams200ResponseInnerOneOf5TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf5Sink}
   */
  sink?: GetLogStreams200ResponseInnerOneOf5Sink;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf5StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf5StatusEnum =
  typeof GetLogStreams200ResponseInnerOneOf5StatusEnum[keyof typeof GetLogStreams200ResponseInnerOneOf5StatusEnum];

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf5TypeEnum = {
  sumo: 'sumo',
} as const;
export type GetLogStreams200ResponseInnerOneOf5TypeEnum =
  typeof GetLogStreams200ResponseInnerOneOf5TypeEnum[keyof typeof GetLogStreams200ResponseInnerOneOf5TypeEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf5Sink
 */
export interface GetLogStreams200ResponseInnerOneOf5Sink {
  /**
   * HTTP Source Address
   * @type {string}
   */
  sumoSourceAddress: string;
}
/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf6
 */
export interface GetLogStreams200ResponseInnerOneOf6 {
  /**
   * The id of the log stream
   * @type {string}
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   */
  status?: GetLogStreams200ResponseInnerOneOf6StatusEnum;
  /**
   * @type {string}
   */
  type?: GetLogStreams200ResponseInnerOneOf6TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf6Sink}
   */
  sink?: GetLogStreams200ResponseInnerOneOf6Sink;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf6StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf6StatusEnum =
  typeof GetLogStreams200ResponseInnerOneOf6StatusEnum[keyof typeof GetLogStreams200ResponseInnerOneOf6StatusEnum];

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf6TypeEnum = {
  segment: 'segment',
} as const;
export type GetLogStreams200ResponseInnerOneOf6TypeEnum =
  typeof GetLogStreams200ResponseInnerOneOf6TypeEnum[keyof typeof GetLogStreams200ResponseInnerOneOf6TypeEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf6Sink
 */
export interface GetLogStreams200ResponseInnerOneOf6Sink {
  /**
   * Segment write key
   * @type {string}
   */
  segmentWriteKey: string;
}
/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf7
 */
export interface GetLogStreams200ResponseInnerOneOf7 {
  /**
   * The id of the log stream
   * @type {string}
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   */
  status?: GetLogStreams200ResponseInnerOneOf7StatusEnum;
  /**
   * @type {string}
   */
  type?: GetLogStreams200ResponseInnerOneOf7TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf7Sink}
   */
  sink?: GetLogStreams200ResponseInnerOneOf7Sink;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf7StatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type GetLogStreams200ResponseInnerOneOf7StatusEnum =
  typeof GetLogStreams200ResponseInnerOneOf7StatusEnum[keyof typeof GetLogStreams200ResponseInnerOneOf7StatusEnum];

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf7TypeEnum = {
  mixpanel: 'mixpanel',
} as const;
export type GetLogStreams200ResponseInnerOneOf7TypeEnum =
  typeof GetLogStreams200ResponseInnerOneOf7TypeEnum[keyof typeof GetLogStreams200ResponseInnerOneOf7TypeEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOf7Sink
 */
export interface GetLogStreams200ResponseInnerOneOf7Sink {
  /**
   * Mixpanel Region
   * @type {string}
   */
  mixpanelRegion: GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum;
  /**
   * Mixpanel Project Id
   * @type {string}
   */
  mixpanelProjectId: string;
  /**
   * Mixpanel Service Account Username
   * @type {string}
   */
  mixpanelServiceAccountUsername: string;
  /**
   * Mixpanel Service Account Password
   * @type {string}
   */
  mixpanelServiceAccountPassword: string;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum = {
  us: 'us',
  eu: 'eu',
} as const;
export type GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum =
  typeof GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum[keyof typeof GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOfFiltersInner
 */
export interface GetLogStreams200ResponseInnerOneOfFiltersInner {
  /**
   * Filter type. Currently `category` is the only valid type.
   * @type {string}
   */
  type?: GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum;
  /**
   * Category group name
   * @type {string}
   */
  name?: GetLogStreams200ResponseInnerOneOfFiltersInnerNameEnum;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum = {
  category: 'category',
} as const;
export type GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum =
  typeof GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum[keyof typeof GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum];

/**
 * @export
 */
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
  typeof GetLogStreams200ResponseInnerOneOfFiltersInnerNameEnum[keyof typeof GetLogStreams200ResponseInnerOneOfFiltersInnerNameEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOfSink
 */
export interface GetLogStreams200ResponseInnerOneOfSink {
  /**
   * HTTP Authorization header
   * @type {string}
   */
  httpAuthorization?: string;
  /**
   * HTTP JSON format
   * @type {string}
   */
  httpContentFormat?: GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum;
  /**
   * HTTP Content-Type header
   * @type {string}
   */
  httpContentType?: string;
  /**
   * HTTP endpoint
   * @type {string}
   */
  httpEndpoint: string;
  /**
   * custom HTTP headers
   * @type {Array<GetLogStreams200ResponseInnerOneOfSinkHttpCustomHeadersInner>}
   */
  httpCustomHeaders?: Array<GetLogStreams200ResponseInnerOneOfSinkHttpCustomHeadersInner>;
}

/**
 * @export
 */
export const GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum = {
  JSONARRAY: 'JSONARRAY',
  JSONLINES: 'JSONLINES',
  JSONOBJECT: 'JSONOBJECT',
} as const;
export type GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum =
  typeof GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum[keyof typeof GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum];

/**
 *
 * @export
 * @interface GetLogStreams200ResponseInnerOneOfSinkHttpCustomHeadersInner
 */
export interface GetLogStreams200ResponseInnerOneOfSinkHttpCustomHeadersInner {
  /**
   * HTTP header name
   * @type {string}
   */
  header?: string;
  /**
   * HTTP header value
   * @type {string}
   */
  value?: string;
}
/**
 * @type GetLogs200Response
 *
 * @export
 */
export type GetLogs200Response = Array<Log> | GetLogs200ResponseOneOf;
/**
 *
 * @export
 * @interface GetLogs200ResponseOneOf
 */
export interface GetLogs200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  length?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<Log>}
   */
  logs?: Array<Log>;
}
/**
 * @type GetMembers200Response
 *
 * @export
 */
export type GetMembers200Response =
  | Array<GetMembers200ResponseOneOfInner>
  | GetMembers200ResponseOneOf
  | GetMembers200ResponseOneOf1;
/**
 *
 * @export
 * @interface GetMembers200ResponseOneOf
 */
export interface GetMembers200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<GetMembers200ResponseOneOfInner>}
   */
  members?: Array<GetMembers200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetMembers200ResponseOneOf1
 */
export interface GetMembers200ResponseOneOf1 {
  /**
   * @type {string}
   */
  next?: string;
  /**
   * @type {Array<GetMembers200ResponseOneOfInner>}
   */
  members?: Array<GetMembers200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetMembers200ResponseOneOfInner
 */
export interface GetMembers200ResponseOneOfInner {
  /**
   * ID of this user.
   * @type {string}
   */
  user_id?: string;
  /**
   * URL to a picture for this user.
   * @type {string}
   */
  picture?: string;
  /**
   * Name of this user.
   * @type {string}
   */
  name?: string;
  /**
   * Email address of this user.
   * @type {string}
   */
  email?: string;
}
/**
 *
 * @export
 * @interface GetMessageTypes200Response
 */
export interface GetMessageTypes200Response {
  /**
   * The list of phone factors to enable on the tenant. Can include `sms` and `voice`.
   * @type {Array<string>}
   */
  message_types?: Array<GetMessageTypes200ResponseMessageTypesEnum>;
}

/**
 * @export
 */
export const GetMessageTypes200ResponseMessageTypesEnum = {
  sms: 'sms',
  voice: 'voice',
} as const;
export type GetMessageTypes200ResponseMessageTypesEnum =
  typeof GetMessageTypes200ResponseMessageTypesEnum[keyof typeof GetMessageTypes200ResponseMessageTypesEnum];

/**
 * @type GetOrganizationMemberRoles200Response
 *
 * @export
 */
export type GetOrganizationMemberRoles200Response =
  | Array<GetOrganizationMemberRoles200ResponseOneOfInner>
  | GetOrganizationMemberRoles200ResponseOneOf;
/**
 *
 * @export
 * @interface GetOrganizationMemberRoles200ResponseOneOf
 */
export interface GetOrganizationMemberRoles200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<GetOrganizationMemberRoles200ResponseOneOfInner>}
   */
  roles?: Array<GetOrganizationMemberRoles200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetOrganizationMemberRoles200ResponseOneOfInner
 */
export interface GetOrganizationMemberRoles200ResponseOneOfInner {
  /**
   * ID for this role.
   * @type {string}
   */
  id?: string;
  /**
   * Name of the role.
   * @type {string}
   */
  name?: string;
  /**
   * Description of the role.
   * @type {string}
   */
  description?: string;
}
/**
 * @type GetOrganizations200Response
 *
 * @export
 */
export type GetOrganizations200Response =
  | Array<GetOrganizations200ResponseOneOfInner>
  | GetOrganizations200ResponseOneOf
  | GetOrganizations200ResponseOneOf1;
/**
 *
 * @export
 * @interface GetOrganizations200ResponseOneOf
 */
export interface GetOrganizations200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<GetOrganizations200ResponseOneOfInner>}
   */
  organizations?: Array<GetOrganizations200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetOrganizations200ResponseOneOf1
 */
export interface GetOrganizations200ResponseOneOf1 {
  /**
   * @type {string}
   */
  next?: string;
  /**
   * @type {Array<GetOrganizations200ResponseOneOfInner>}
   */
  organizations?: Array<GetOrganizations200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetOrganizations200ResponseOneOfInner
 */
export interface GetOrganizations200ResponseOneOfInner {
  /**
   * Organization identifier
   * @type {string}
   */
  id?: string;
  /**
   * The name of this organization.
   * @type {string}
   */
  name?: string;
  /**
   * Friendly name of this organization.
   * @type {string}
   */
  display_name?: string;
  /**
   * @type {GetOrganizations200ResponseOneOfInnerBranding}
   */
  branding?: GetOrganizations200ResponseOneOfInnerBranding;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   */
  metadata?: { [key: string]: any };
}
/**
 * Theme defines how to style the login pages
 * @export
 * @interface GetOrganizations200ResponseOneOfInnerBranding
 */
export interface GetOrganizations200ResponseOneOfInnerBranding {
  /**
   * URL of logo to display on login page
   * @type {string}
   */
  logo_url?: string;
  /**
   * @type {GetOrganizations200ResponseOneOfInnerBrandingColors}
   */
  colors?: GetOrganizations200ResponseOneOfInnerBrandingColors;
}
/**
 * Color scheme used to customize the login pages
 * @export
 * @interface GetOrganizations200ResponseOneOfInnerBrandingColors
 */
export interface GetOrganizations200ResponseOneOfInnerBrandingColors {
  /**
   * HEX Color for primary elements
   * @type {string}
   */
  primary: string;
  /**
   * HEX Color for background
   * @type {string}
   */
  page_background: string;
}
/**
 * @type GetPermissions200Response
 *
 * @export
 */
export type GetPermissions200Response =
  | Array<GetPermissions200ResponseOneOfInner>
  | GetPermissions200ResponseOneOf;
/**
 *
 * @export
 * @interface GetPermissions200ResponseOneOf
 */
export interface GetPermissions200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<GetPermissions200ResponseOneOfInner>}
   */
  permissions?: Array<GetPermissions200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetPermissions200ResponseOneOfInner
 */
export interface GetPermissions200ResponseOneOfInner {
  /**
   * @type {any}
   */
  sources?: any | null;
  /**
   * Resource server (API) identifier that this permission is for.
   * @type {string}
   */
  resource_server_identifier?: string;
  /**
   * Name of this permission.
   * @type {string}
   */
  permission_name?: string;
  /**
   * Resource server (API) name this permission is for.
   * @type {string}
   */
  resource_server_name?: string;
  /**
   * Description of this permission.
   * @type {string}
   */
  description?: string;
}
/**
 *
 * @export
 * @interface GetPhoneProviders200Response
 */
export interface GetPhoneProviders200Response {
  /**
   * @type {string}
   */
  provider?: GetPhoneProviders200ResponseProviderEnum;
}

/**
 * @export
 */
export const GetPhoneProviders200ResponseProviderEnum = {
  auth0: 'auth0',
  twilio: 'twilio',
  phone_message_hook: 'phone-message-hook',
} as const;
export type GetPhoneProviders200ResponseProviderEnum =
  typeof GetPhoneProviders200ResponseProviderEnum[keyof typeof GetPhoneProviders200ResponseProviderEnum];

/**
 *
 * @export
 * @interface GetPnProviders200Response
 */
export interface GetPnProviders200Response {
  /**
   * @type {string}
   */
  provider?: GetPnProviders200ResponseProviderEnum;
}

/**
 * @export
 */
export const GetPnProviders200ResponseProviderEnum = {
  guardian: 'guardian',
  sns: 'sns',
  direct: 'direct',
} as const;
export type GetPnProviders200ResponseProviderEnum =
  typeof GetPnProviders200ResponseProviderEnum[keyof typeof GetPnProviders200ResponseProviderEnum];

/**
 * @type GetResourceServers200Response
 *
 * @export
 */
export type GetResourceServers200Response =
  | Array<ResourceServer>
  | GetResourceServers200ResponseOneOf;
/**
 *
 * @export
 * @interface GetResourceServers200ResponseOneOf
 */
export interface GetResourceServers200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<ResourceServer>}
   */
  resource_servers?: Array<ResourceServer>;
}
/**
 * @type GetRolePermission200Response
 *
 * @export
 */
export type GetRolePermission200Response = Array<Permission> | GetRolePermission200ResponseOneOf;
/**
 *
 * @export
 * @interface GetRolePermission200ResponseOneOf
 */
export interface GetRolePermission200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<Permission>}
   */
  permissions?: Array<Permission>;
}
/**
 * @type GetRoleUser200Response
 *
 * @export
 */
export type GetRoleUser200Response =
  | Array<GetMembers200ResponseOneOfInner>
  | GetRoleUser200ResponseOneOf
  | GetRoleUser200ResponseOneOf1;
/**
 *
 * @export
 * @interface GetRoleUser200ResponseOneOf
 */
export interface GetRoleUser200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<GetMembers200ResponseOneOfInner>}
   */
  users?: Array<GetMembers200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetRoleUser200ResponseOneOf1
 */
export interface GetRoleUser200ResponseOneOf1 {
  /**
   * @type {string}
   */
  next?: string;
  /**
   * @type {Array<GetMembers200ResponseOneOfInner>}
   */
  users?: Array<GetMembers200ResponseOneOfInner>;
}
/**
 * @type GetRules200Response
 *
 * @export
 */
export type GetRules200Response = Array<Rule> | GetRules200ResponseOneOf;
/**
 *
 * @export
 * @interface GetRules200ResponseOneOf
 */
export interface GetRules200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<Rule>}
   */
  rules?: Array<Rule>;
}
/**
 *
 * @export
 * @interface GetRulesConfigs200ResponseInner
 */
export interface GetRulesConfigs200ResponseInner {
  /**
   * Key for a rules config variable.
   * @type {string}
   */
  key?: string;
}
/**
 *
 * @export
 * @interface GetSigningKeys200ResponseInner
 */
export interface GetSigningKeys200ResponseInner {
  /**
   * The key id of the signing key
   * @type {string}
   */
  kid: string;
  /**
   * The public certificate of the signing key
   * @type {string}
   */
  cert: string;
  /**
   * The public certificate of the signing key in pkcs7 format
   * @type {string}
   */
  pkcs7?: string;
  /**
   * True if the key is the the current key
   * @type {boolean}
   */
  current?: boolean;
  /**
   * True if the key is the the next key
   * @type {boolean}
   */
  next?: boolean;
  /**
   * True if the key is the the previous key
   * @type {boolean}
   */
  previous?: boolean;
  /**
   * @type {GetSigningKeys200ResponseInnerCurrentSince}
   */
  current_since?: GetSigningKeys200ResponseInnerCurrentSince;
  /**
   * @type {GetSigningKeys200ResponseInnerCurrentUntil}
   */
  current_until?: GetSigningKeys200ResponseInnerCurrentUntil;
  /**
   * The cert fingerprint
   * @type {string}
   */
  fingerprint: string;
  /**
   * The cert thumbprint
   * @type {string}
   */
  thumbprint: string;
  /**
   * True if the key is revoked
   * @type {boolean}
   */
  revoked?: boolean;
  /**
   * @type {GetSigningKeys200ResponseInnerRevokedAt}
   */
  revoked_at?: GetSigningKeys200ResponseInnerRevokedAt;
}
/**
 * @type GetSigningKeys200ResponseInnerCurrentSince
 *
 * @export
 */
export type GetSigningKeys200ResponseInnerCurrentSince = string | { [key: string]: any };
/**
 * @type GetSigningKeys200ResponseInnerCurrentUntil
 *
 * @export
 */
export type GetSigningKeys200ResponseInnerCurrentUntil = string | { [key: string]: any };
/**
 * @type GetSigningKeys200ResponseInnerRevokedAt
 *
 * @export
 */
export type GetSigningKeys200ResponseInnerRevokedAt = string | { [key: string]: any };
/**
 *
 * @export
 * @interface GetTriggers200Response
 */
export interface GetTriggers200Response {
  /**
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   */
  triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
}
/**
 * @type GetUniversalLogin200Response
 *
 * @export
 */
export type GetUniversalLogin200Response = GetUniversalLogin200ResponseOneOf | string;
/**
 *
 * @export
 * @interface GetUniversalLogin200ResponseOneOf
 */
export interface GetUniversalLogin200ResponseOneOf {
  /**
   * The custom page template for the New Universal Login Experience
   * @type {string}
   */
  body?: string;
}
/**
 * @type GetUserOrganizations200Response
 *
 * @export
 */
export type GetUserOrganizations200Response =
  | Array<GetOrganizations200ResponseOneOfInner>
  | GetOrganizations200ResponseOneOf;
/**
 * @type GetUsers200Response
 *
 * @export
 */
export type GetUsers200Response = Array<GetUsers200ResponseOneOfInner> | GetUsers200ResponseOneOf;
/**
 *
 * @export
 * @interface GetUsers200ResponseOneOf
 */
export interface GetUsers200ResponseOneOf {
  /**
   * @type {number}
   */
  start?: number;
  /**
   * @type {number}
   */
  limit?: number;
  /**
   * @type {number}
   */
  length?: number;
  /**
   * @type {number}
   */
  total?: number;
  /**
   * @type {Array<GetUsers200ResponseOneOfInner>}
   */
  users?: Array<GetUsers200ResponseOneOfInner>;
}
/**
 *
 * @export
 * @interface GetUsers200ResponseOneOfInner
 */
export interface GetUsers200ResponseOneOfInner {
  [key: string]: any | any;
  /**
   * ID of the user which can be used when interacting with other APIs.
   * @type {string}
   */
  user_id?: string;
  /**
   * Email address of this user.
   * @type {string}
   */
  email?: string;
  /**
   * Whether this email address is verified (true) or unverified (false).
   * @type {boolean}
   */
  email_verified?: boolean;
  /**
   * Username of this user.
   * @type {string}
   */
  username?: string;
  /**
   * Phone number for this user when using SMS connections. Follows the <a href="https://en.wikipedia.org/wiki/E.164">E.164 recommendation</a>.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Whether this phone number has been verified (true) or not (false).
   * @type {boolean}
   */
  phone_verified?: boolean;
  /**
   * @type {GetUsers200ResponseOneOfInnerCreatedAt}
   */
  created_at?: GetUsers200ResponseOneOfInnerCreatedAt;
  /**
   * @type {GetUsers200ResponseOneOfInnerUpdatedAt}
   */
  updated_at?: GetUsers200ResponseOneOfInnerUpdatedAt;
  /**
   * Array of user identity objects when accounts are linked.
   * @type {Array<GetUsers200ResponseOneOfInnerIdentitiesInner>}
   */
  identities?: Array<GetUsers200ResponseOneOfInnerIdentitiesInner>;
  /**
   * User metadata to which this user has read-only access.
   * @type {{ [key: string]: any; }}
   */
  app_metadata?: { [key: string]: any };
  /**
   * User metadata to which this user has read/write access.
   * @type {{ [key: string]: any; }}
   */
  user_metadata?: { [key: string]: any };
  /**
   * URL to picture, photo, or avatar of this user.
   * @type {string}
   */
  picture?: string;
  /**
   * Name of this user.
   * @type {string}
   */
  name?: string;
  /**
   * Preferred nickname or alias of this user.
   * @type {string}
   */
  nickname?: string;
  /**
   * List of multi-factor authentication providers with which this user has enrolled.
   * @type {Array<string>}
   */
  multifactor?: Array<string>;
  /**
   * Last IP address from which this user logged in.
   * @type {string}
   */
  last_ip?: string;
  /**
   * @type {GetUsers200ResponseOneOfInnerLastLogin}
   */
  last_login?: GetUsers200ResponseOneOfInnerLastLogin;
  /**
   * Total number of logins this user has performed.
   * @type {number}
   */
  logins_count?: number;
  /**
   * Whether this user was blocked by an administrator (true) or is not (false).
   * @type {boolean}
   */
  blocked?: boolean;
  /**
   * Given name/first name/forename of this user.
   * @type {string}
   */
  given_name?: string;
  /**
   * Family name/last name/surname of this user.
   * @type {string}
   */
  family_name?: string;
}
/**
 * @type GetUsers200ResponseOneOfInnerCreatedAt
 *
 * @export
 */
export type GetUsers200ResponseOneOfInnerCreatedAt = string | { [key: string]: any };
/**
 *
 * @export
 * @interface GetUsers200ResponseOneOfInnerIdentitiesInner
 */
export interface GetUsers200ResponseOneOfInnerIdentitiesInner {
  /**
   * Name of the connection containing this identity.
   * @type {string}
   */
  connection?: string;
  /**
   * Unique identifier of the user user for this identity.
   * @type {string}
   */
  user_id?: string;
  /**
   * The type of identity provider
   * @type {string}
   */
  provider?: string;
  /**
   * Whether this identity is from a social provider (true) or not (false).
   * @type {boolean}
   */
  isSocial?: boolean;
  /**
   * IDP access token returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   */
  access_token?: string;
  /**
   * IDP access token secret returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   */
  access_token_secret?: string;
  /**
   * IDP refresh token returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   */
  refresh_token?: string;
  /**
   * @type {UserProfile}
   */
  profileData?: UserProfile;
}
/**
 * @type GetUsers200ResponseOneOfInnerLastLogin
 *
 * @export
 */
export type GetUsers200ResponseOneOfInnerLastLogin = string | { [key: string]: any };
/**
 * @type GetUsers200ResponseOneOfInnerUpdatedAt
 *
 * @export
 */
export type GetUsers200ResponseOneOfInnerUpdatedAt = string | { [key: string]: any };
/**
 *
 * @export
 * @interface Hook
 */
export interface Hook {
  /**
   * Trigger ID
   * @type {string}
   */
  triggerId?: string;
  /**
   * ID of this hook.
   * @type {string}
   */
  id?: string;
  /**
   * Name of this hook.
   * @type {string}
   */
  name?: string;
  /**
   * Whether this hook will be executed (true) or ignored (false).
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Code to be executed when this hook runs.
   * @type {string}
   */
  script?: string;
  /**
   * Dependencies of this hook used by webtask server.
   * @type {{ [key: string]: any; }}
   */
  dependencies?: { [key: string]: any };
}
/**
 *
 * @export
 * @interface HookCreate
 */
export interface HookCreate {
  /**
   * Name of this hook.
   * @type {string}
   */
  name: string;
  /**
   * Code to be executed when this hook runs.
   * @type {string}
   */
  script: string;
  /**
   * Whether this hook will be executed (true) or ignored (false).
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Dependencies of this hook used by webtask server.
   * @type {{ [key: string]: any; }}
   */
  dependencies?: { [key: string]: any };
  /**
   * Execution stage of this rule. Can be `credentials-exchange`, `pre-user-registration`, `post-user-registration`, `post-change-password`, or `send-phone-message`.
   * @type {string}
   */
  triggerId: HookCreateTriggerIdEnum;
}

/**
 * @export
 */
export const HookCreateTriggerIdEnum = {
  credentials_exchange: 'credentials-exchange',
  pre_user_registration: 'pre-user-registration',
  post_user_registration: 'post-user-registration',
  post_change_password: 'post-change-password',
  send_phone_message: 'send-phone-message',
} as const;
export type HookCreateTriggerIdEnum =
  typeof HookCreateTriggerIdEnum[keyof typeof HookCreateTriggerIdEnum];

/**
 *
 * @export
 * @interface HookUpdate
 */
export interface HookUpdate {
  /**
   * Name of this hook.
   * @type {string}
   */
  name?: string;
  /**
   * Code to be executed when this hook runs.
   * @type {string}
   */
  script?: string;
  /**
   * Whether this hook will be executed (true) or ignored (false).
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Dependencies of this hook used by webtask server.
   * @type {{ [key: string]: any; }}
   */
  dependencies?: { [key: string]: any };
}
/**
 *
 * @export
 * @interface Job
 */
export interface Job {
  /**
   * Status of this job.
   * @type {string}
   */
  status: string;
  /**
   * Type of job this is.
   * @type {string}
   */
  type: string;
  /**
   * When this job was created.
   * @type {string}
   */
  created_at?: string;
  /**
   * ID of this job.
   * @type {string}
   */
  id: string;
  /**
   * connection_id of the connection from which users will be exported.
   * @type {string}
   */
  connection_id?: string;
  /**
   * Format of the file. Must be `json` or `csv`.
   * @type {string}
   */
  format?: JobFormatEnum;
  /**
   * Limit the number of records.
   * @type {number}
   */
  limit?: number;
  /**
   * List of fields to be included in the CSV. Defaults to a predefined set of fields.
   * @type {Array<PostUsersExportsRequestFieldsInner>}
   */
  fields?: Array<PostUsersExportsRequestFieldsInner>;
}

/**
 * @export
 */
export const JobFormatEnum = {
  json: 'json',
  csv: 'csv',
} as const;
export type JobFormatEnum = typeof JobFormatEnum[keyof typeof JobFormatEnum];

/**
 *
 * @export
 * @interface Log
 */
export interface Log {
  [key: string]: any | any;
  /**
   * @type {LogDate}
   */
  date?: LogDate;
  /**
   * Type of event.
   * @type {string}
   */
  type?: string;
  /**
   * Description of this event.
   * @type {string}
   */
  description?: string | null;
  /**
   * Name of the connection the event relates to.
   * @type {string}
   */
  connection?: string;
  /**
   * ID of the connection the event relates to.
   * @type {string}
   */
  connection_id?: string;
  /**
   * ID of the client (application).
   * @type {string}
   */
  client_id?: string;
  /**
   * Name of the client (application).
   * @type {string}
   */
  client_name?: string;
  /**
   * IP address of the log event source.
   * @type {string}
   */
  ip?: string;
  /**
   * Hostname the event applies to.
   * @type {string}
   */
  hostname?: string;
  /**
   * ID of the user involved in the event.
   * @type {string}
   */
  user_id?: string;
  /**
   * Name of the user involved in the event.
   * @type {string}
   */
  user_name?: string;
  /**
   * API audience the event applies to.
   * @type {string}
   */
  audience?: string;
  /**
   * Scope permissions applied to the event.
   * @type {string}
   */
  scope?: string;
  /**
   * Name of the strategy involved in the event.
   * @type {string}
   */
  strategy?: string;
  /**
   * Type of strategy involved in the event.
   * @type {string}
   */
  strategy_type?: string;
  /**
   * Unique ID of the event.
   * @type {string}
   */
  log_id?: string;
  /**
   * Whether the client was a mobile device (true) or desktop/laptop/server (false).
   * @type {boolean}
   */
  isMobile?: boolean;
  /**
   * Additional useful details about this event (structure is dependent upon event type).
   * @type {{ [key: string]: any; }}
   */
  details?: { [key: string]: any };
  /**
   * User agent string from the client device that caused the event.
   * @type {string}
   */
  user_agent?: string;
  /**
   * @type {LogLocationInfo}
   */
  location_info?: LogLocationInfo;
}
/**
 * @type LogDate
 *
 * @export
 */
export type LogDate = string | { [key: string]: any };
/**
 * Information about the location that triggered this event based on the `ip`.
 * @export
 * @interface LogLocationInfo
 */
export interface LogLocationInfo {
  /**
   * Two-letter <a href="https://www.iso.org/iso-3166-country-codes.html">Alpha-2 ISO 3166-1</a> country code.
   * @type {string}
   */
  country_code?: string;
  /**
   * Three-letter <a href="https://www.iso.org/iso-3166-country-codes.html">Alpha-3 ISO 3166-1</a> country code.
   * @type {string}
   */
  country_code3?: string;
  /**
   * Full country name in English.
   * @type {string}
   */
  country_name?: string;
  /**
   * Full city name in English.
   * @type {string}
   */
  city_name?: string;
  /**
   * Global latitude (horizontal) position.
   * @type {string}
   */
  latitude?: string;
  /**
   * Global longitude (vertical) position.
   * @type {string}
   */
  longitude?: string;
  /**
   * Time zone name as found in the <a href="https://www.iana.org/time-zones">tz database</a>.
   * @type {string}
   */
  time_zone?: string;
  /**
   * Continent the country is located within. Can be `AF` (Africa), `AN` (Antarctica), `AS` (Asia), `EU` (Europe), `NA` (North America), `OC` (Oceania) or `SA` (South America).
   * @type {string}
   */
  continent_code?: string;
}
/**
 *
 * @export
 * @interface PatchActionRequest
 */
export interface PatchActionRequest {
  /**
   * The name of an action.
   * @type {string}
   */
  name?: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   */
  supported_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   * @type {string}
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   * @type {string}
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<PostActionRequestSecretsInner>}
   */
  secrets?: Array<PostActionRequestSecretsInner>;
}
/**
 *
 * @export
 * @interface PatchAuthenticationMethodsByAuthenticationMethodIdRequest
 */
export interface PatchAuthenticationMethodsByAuthenticationMethodIdRequest {
  /**
   * A human-readable label to identify the authentication method.
   * @type {string}
   */
  name?: string;
  /**
   * Base32 encoded secret for TOTP generation.
   * @type {string}
   */
  totp_secret?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   * @type {string}
   */
  email?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Preferred phone authentication method
   * @type {string}
   */
  preferred_authentication_method?: PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum;
}

/**
 * @export
 */
export const PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum =
  {
    voice: 'voice',
    sms: 'sms',
  } as const;
export type PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum =
  typeof PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum[keyof typeof PatchAuthenticationMethodsByAuthenticationMethodIdRequestPreferredAuthenticationMethodEnum];

/**
 *
 * @export
 * @interface PatchBindings200Response
 */
export interface PatchBindings200Response {
  /**
   * @type {Array<GetBindings200ResponseBindingsInner>}
   */
  bindings?: Array<GetBindings200ResponseBindingsInner>;
}
/**
 *
 * @export
 * @interface PatchBindingsRequest
 */
export interface PatchBindingsRequest {
  /**
   * The actions that will be bound to this trigger. The order in which they are included will be the order in which they are executed.
   * @type {Array<PatchBindingsRequestBindingsInner>}
   */
  bindings?: Array<PatchBindingsRequestBindingsInner>;
}
/**
 * @type PatchBindingsRequestBindingsInner
 *
 * @export
 */
export type PatchBindingsRequestBindingsInner = PatchBindingsRequestBindingsInnerOneOf;
/**
 *
 * @export
 * @interface PatchBindingsRequestBindingsInnerOneOf
 */
export interface PatchBindingsRequestBindingsInnerOneOf {
  /**
   * @type {PatchBindingsRequestBindingsInnerOneOfRef}
   */
  ref: PatchBindingsRequestBindingsInnerOneOfRef;
  /**
   * The name of the binding.
   * @type {string}
   */
  display_name?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<PostActionRequestSecretsInner>}
   */
  secrets?: Array<PostActionRequestSecretsInner>;
}
/**
 * A reference to an action. An action can be referred to by ID or by Name.
 * @export
 * @interface PatchBindingsRequestBindingsInnerOneOfRef
 */
export interface PatchBindingsRequestBindingsInnerOneOfRef {
  /**
   * How the action is being referred to: `action_id` or `action_name`.
   * @type {string}
   */
  type?: PatchBindingsRequestBindingsInnerOneOfRefTypeEnum;
  /**
   * The id or name of an action that is being bound to a trigger.
   * @type {string}
   */
  value?: string;
}

/**
 * @export
 */
export const PatchBindingsRequestBindingsInnerOneOfRefTypeEnum = {
  binding_id: 'binding_id',
  action_id: 'action_id',
  action_name: 'action_name',
} as const;
export type PatchBindingsRequestBindingsInnerOneOfRefTypeEnum =
  typeof PatchBindingsRequestBindingsInnerOneOfRefTypeEnum[keyof typeof PatchBindingsRequestBindingsInnerOneOfRefTypeEnum];

/**
 * Branding settings
 * @export
 * @interface PatchBrandingRequest
 */
export interface PatchBrandingRequest {
  /**
   * @type {PatchBrandingRequestColors}
   */
  colors?: PatchBrandingRequestColors | null;
  /**
   * URL for the favicon. Must use HTTPS.
   * @type {string}
   */
  favicon_url?: string | null;
  /**
   * URL for the logo. Must use HTTPS.
   * @type {string}
   */
  logo_url?: string | null;
  /**
   * @type {PatchBrandingRequestFont}
   */
  font?: PatchBrandingRequestFont | null;
}
/**
 * Custom color settings.
 * @export
 * @interface PatchBrandingRequestColors
 */
export interface PatchBrandingRequestColors {
  /**
   * Accent color.
   * @type {string}
   */
  primary?: string | null;
  /**
   * @type {GetBranding200ResponseColorsPageBackground}
   */
  page_background?: GetBranding200ResponseColorsPageBackground;
}
/**
 * Custom font settings.
 * @export
 * @interface PatchBrandingRequestFont
 */
export interface PatchBrandingRequestFont {
  /**
   * URL for the custom font. The URL must point to a font file and not a stylesheet. Must use HTTPS.
   * @type {string}
   */
  url?: string | null;
}
/**
 *
 * @export
 * @interface PatchBreachedPasswordDetectionRequest
 */
export interface PatchBreachedPasswordDetectionRequest {
  /**
   * Whether or not breached password detection is active.
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Action to take when a breached password is detected during a login.<br/>      Possible values: <code>block</code>, <code>user_notification</code>, <code>admin_notification</code>.
   * @type {Array<string>}
   */
  shields?: Array<PatchBreachedPasswordDetectionRequestShieldsEnum>;
  /**
   * When "admin_notification" is enabled, determines how often email notifications are sent.<br/>        Possible values: <code>immediately</code>, <code>daily</code>, <code>weekly</code>, <code>monthly</code>.
   * @type {Array<string>}
   */
  admin_notification_frequency?: Array<PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum>;
  /**
   * The subscription level for breached password detection methods. Use "enhanced" to enable Credential Guard.<br/>        Possible values: <code>standard</code>, <code>enhanced</code>.
   * @type {string}
   */
  method?: PatchBreachedPasswordDetectionRequestMethodEnum;
  /**
   * @type {PatchBreachedPasswordDetectionRequestStage}
   */
  stage?: PatchBreachedPasswordDetectionRequestStage;
}

/**
 * @export
 */
export const PatchBreachedPasswordDetectionRequestShieldsEnum = {
  block: 'block',
  user_notification: 'user_notification',
  admin_notification: 'admin_notification',
} as const;
export type PatchBreachedPasswordDetectionRequestShieldsEnum =
  typeof PatchBreachedPasswordDetectionRequestShieldsEnum[keyof typeof PatchBreachedPasswordDetectionRequestShieldsEnum];

/**
 * @export
 */
export const PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum = {
  immediately: 'immediately',
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
} as const;
export type PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum =
  typeof PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum[keyof typeof PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum];

/**
 * @export
 */
export const PatchBreachedPasswordDetectionRequestMethodEnum = {
  standard: 'standard',
  enhanced: 'enhanced',
} as const;
export type PatchBreachedPasswordDetectionRequestMethodEnum =
  typeof PatchBreachedPasswordDetectionRequestMethodEnum[keyof typeof PatchBreachedPasswordDetectionRequestMethodEnum];

/**
 *
 * @export
 * @interface PatchBreachedPasswordDetectionRequestStage
 */
export interface PatchBreachedPasswordDetectionRequestStage {
  /**
   * @type {PatchBreachedPasswordDetectionRequestStagePreUserRegistration}
   */
  pre_user_registration?: PatchBreachedPasswordDetectionRequestStagePreUserRegistration;
}
/**
 *
 * @export
 * @interface PatchBreachedPasswordDetectionRequestStagePreUserRegistration
 */
export interface PatchBreachedPasswordDetectionRequestStagePreUserRegistration {
  /**
   * Action to take when a breached password is detected during a signup.<br/>              Possible values: <code>block</code>, <code>admin_notification</code>.
   * @type {Array<string>}
   */
  shields?: Array<PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum>;
}

/**
 * @export
 */
export const PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum = {
  block: 'block',
  admin_notification: 'admin_notification',
} as const;
export type PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum =
  typeof PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum[keyof typeof PatchBreachedPasswordDetectionRequestStagePreUserRegistrationShieldsEnum];

/**
 *
 * @export
 * @interface PatchBruteForceProtectionRequest
 */
export interface PatchBruteForceProtectionRequest {
  /**
   * Whether or not brute force attack protections are active.
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Action to take when a brute force protection threshold is violated.<br/>        Possible values: <code>block</code>, <code>user_notification</code>.
   * @type {Array<string>}
   */
  shields?: Array<PatchBruteForceProtectionRequestShieldsEnum>;
  /**
   * List of trusted IP addresses that will not have attack protection enforced against them.
   * @type {Array<PatchBruteForceProtectionRequestAllowlistInner>}
   */
  allowlist?: Array<PatchBruteForceProtectionRequestAllowlistInner>;
  /**
   * Account Lockout: Determines whether or not IP address is used when counting failed attempts.<br/>          Possible values: <code>count_per_identifier_and_ip</code>, <code>count_per_identifier</code>.
   * @type {string}
   */
  mode?: PatchBruteForceProtectionRequestModeEnum;
  /**
   * Maximum number of unsuccessful attempts.
   * @type {number}
   */
  max_attempts?: number;
}

/**
 * @export
 */
export const PatchBruteForceProtectionRequestShieldsEnum = {
  block: 'block',
  user_notification: 'user_notification',
} as const;
export type PatchBruteForceProtectionRequestShieldsEnum =
  typeof PatchBruteForceProtectionRequestShieldsEnum[keyof typeof PatchBruteForceProtectionRequestShieldsEnum];

/**
 * @export
 */
export const PatchBruteForceProtectionRequestModeEnum = {
  identifier_and_ip: 'count_per_identifier_and_ip',
  identifier: 'count_per_identifier',
} as const;
export type PatchBruteForceProtectionRequestModeEnum =
  typeof PatchBruteForceProtectionRequestModeEnum[keyof typeof PatchBruteForceProtectionRequestModeEnum];

/**
 *
 * @export
 * @interface PatchBruteForceProtectionRequestAllowlistInner
 */
export interface PatchBruteForceProtectionRequestAllowlistInner {}
/**
 *
 * @export
 * @interface PatchClientGrantsByIdRequest
 */
export interface PatchClientGrantsByIdRequest {
  /**
   * Scopes allowed for this client grant.
   * @type {Array<string>}
   */
  scope?: Array<string>;
}
/**
 *
 * @export
 * @interface PatchCustomDomainsByIdRequest
 */
export interface PatchCustomDomainsByIdRequest {
  /**
   * compatible includes TLS 1.0, 1.1, 1.2, and recommended only includes TLS 1.2
   * @type {string}
   */
  tls_policy?: PatchCustomDomainsByIdRequestTlsPolicyEnum;
  /**
   * The HTTP header to fetch the client's IP address
   * @type {string}
   */
  custom_client_ip_header?: PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum;
}

/**
 * @export
 */
export const PatchCustomDomainsByIdRequestTlsPolicyEnum = {
  recommended: 'recommended',
  compatible: 'compatible',
} as const;
export type PatchCustomDomainsByIdRequestTlsPolicyEnum =
  typeof PatchCustomDomainsByIdRequestTlsPolicyEnum[keyof typeof PatchCustomDomainsByIdRequestTlsPolicyEnum];

/**
 * @export
 */
export const PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum = {
  true_client_ip: 'true-client-ip',
  cf_connecting_ip: 'cf-connecting-ip',
  x_forwarded_for: 'x-forwarded-for',
  empty: '',
} as const;
export type PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum =
  typeof PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum[keyof typeof PatchCustomDomainsByIdRequestCustomClientIpHeaderEnum];

/**
 *
 * @export
 * @interface PatchEnabledConnectionsByConnectionIdRequest
 */
export interface PatchEnabledConnectionsByConnectionIdRequest {
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   * @type {boolean}
   */
  assign_membership_on_login: boolean;
}
/**
 *
 * @export
 * @interface PatchLogStreamsByIdRequest
 */
export interface PatchLogStreamsByIdRequest {
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   */
  status?: PatchLogStreamsByIdRequestStatusEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {PatchLogStreamsByIdRequestSink}
   */
  sink?: PatchLogStreamsByIdRequestSink;
}

/**
 * @export
 */
export const PatchLogStreamsByIdRequestStatusEnum = {
  active: 'active',
  paused: 'paused',
  suspended: 'suspended',
} as const;
export type PatchLogStreamsByIdRequestStatusEnum =
  typeof PatchLogStreamsByIdRequestStatusEnum[keyof typeof PatchLogStreamsByIdRequestStatusEnum];

/**
 * @type PatchLogStreamsByIdRequestSink
 *
 * @export
 */
export type PatchLogStreamsByIdRequestSink =
  | GetLogStreams200ResponseInnerOneOf3Sink
  | GetLogStreams200ResponseInnerOneOf4Sink
  | GetLogStreams200ResponseInnerOneOf5Sink
  | GetLogStreams200ResponseInnerOneOf6Sink
  | GetLogStreams200ResponseInnerOneOfSink
  | PatchLogStreamsByIdRequestSinkOneOf;
/**
 *
 * @export
 * @interface PatchLogStreamsByIdRequestSinkOneOf
 */
export interface PatchLogStreamsByIdRequestSinkOneOf {
  /**
   * Mixpanel Region
   * @type {string}
   */
  mixpanelRegion: PatchLogStreamsByIdRequestSinkOneOfMixpanelRegionEnum;
  /**
   * Mixpanel Project Id
   * @type {string}
   */
  mixpanelProjectId: string;
  /**
   * Mixpanel Service Account Username
   * @type {string}
   */
  mixpanelServiceAccountUsername: string;
  /**
   * Mixpanel Service Account Password
   * @type {string}
   */
  mixpanelServiceAccountPassword?: string;
}

/**
 * @export
 */
export const PatchLogStreamsByIdRequestSinkOneOfMixpanelRegionEnum = {
  us: 'us',
  eu: 'eu',
} as const;
export type PatchLogStreamsByIdRequestSinkOneOfMixpanelRegionEnum =
  typeof PatchLogStreamsByIdRequestSinkOneOfMixpanelRegionEnum[keyof typeof PatchLogStreamsByIdRequestSinkOneOfMixpanelRegionEnum];

/**
 *
 * @export
 * @interface PatchOrganizationsByIdRequest
 */
export interface PatchOrganizationsByIdRequest {
  /**
   * Friendly name of this organization.
   * @type {string}
   */
  display_name?: string;
  /**
   * The name of this organization.
   * @type {string}
   */
  name?: string;
  /**
   * @type {PatchOrganizationsByIdRequestBranding}
   */
  branding?: PatchOrganizationsByIdRequestBranding | null;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   */
  metadata?: { [key: string]: any } | null;
}
/**
 * Theme defines how to style the login pages
 * @export
 * @interface PatchOrganizationsByIdRequestBranding
 */
export interface PatchOrganizationsByIdRequestBranding {
  /**
   * URL of logo to display on login page
   * @type {string}
   */
  logo_url?: string;
  /**
   * @type {GetOrganizations200ResponseOneOfInnerBrandingColors}
   */
  colors?: GetOrganizations200ResponseOneOfInnerBrandingColors;
}
/**
 *
 * @export
 * @interface PatchProviderRequest
 */
export interface PatchProviderRequest {
  /**
   * Name of the email provider. Can be `mailgun`, `mandrill`, `sendgrid`, `ses`, `sparkpost`, or `smtp`.
   * @type {string}
   */
  name?: PatchProviderRequestNameEnum;
  /**
   * Whether the provider is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Email address to use as "from" when no other address specified.
   * @type {string}
   */
  default_from_address?: string;
  /**
   * @type {PostProviderRequestCredentials}
   */
  credentials?: PostProviderRequestCredentials;
  /**
   * Specific provider setting
   * @type {{ [key: string]: any; }}
   */
  settings?: { [key: string]: any } | null;
}

/**
 * @export
 */
export const PatchProviderRequestNameEnum = {
  mailgun: 'mailgun',
  mandrill: 'mandrill',
  sendgrid: 'sendgrid',
  ses: 'ses',
  sparkpost: 'sparkpost',
  smtp: 'smtp',
} as const;
export type PatchProviderRequestNameEnum =
  typeof PatchProviderRequestNameEnum[keyof typeof PatchProviderRequestNameEnum];

/**
 *
 * @export
 * @interface PatchSuspiciousIpThrottlingRequest
 */
export interface PatchSuspiciousIpThrottlingRequest {
  /**
   * Whether or not suspicious IP throttling attack protections are active.
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Action to take when a suspicious IP throttling threshold is violated.<br/>          Possible values: <code>block</code>, <code>admin_notification</code>.
   * @type {Array<string>}
   */
  shields?: Array<PatchSuspiciousIpThrottlingRequestShieldsEnum>;
  /**
   * List of trusted IP addresses that will not have attack protection enforced against them.
   * @type {Array<PatchBruteForceProtectionRequestAllowlistInner>}
   */
  allowlist?: Array<PatchBruteForceProtectionRequestAllowlistInner>;
  /**
   * @type {PatchSuspiciousIpThrottlingRequestStage}
   */
  stage?: PatchSuspiciousIpThrottlingRequestStage;
}

/**
 * @export
 */
export const PatchSuspiciousIpThrottlingRequestShieldsEnum = {
  block: 'block',
  admin_notification: 'admin_notification',
} as const;
export type PatchSuspiciousIpThrottlingRequestShieldsEnum =
  typeof PatchSuspiciousIpThrottlingRequestShieldsEnum[keyof typeof PatchSuspiciousIpThrottlingRequestShieldsEnum];

/**
 * Holds per-stage configuration options (max_attempts and rate).
 * @export
 * @interface PatchSuspiciousIpThrottlingRequestStage
 */
export interface PatchSuspiciousIpThrottlingRequestStage {
  /**
   * @type {PatchSuspiciousIpThrottlingRequestStagePreLogin}
   */
  pre_login?: PatchSuspiciousIpThrottlingRequestStagePreLogin;
  /**
   * @type {PatchSuspiciousIpThrottlingRequestStagePreUserRegistration}
   */
  pre_user_registration?: PatchSuspiciousIpThrottlingRequestStagePreUserRegistration;
}
/**
 * Configuration options that apply before every login attempt.
 * @export
 * @interface PatchSuspiciousIpThrottlingRequestStagePreLogin
 */
export interface PatchSuspiciousIpThrottlingRequestStagePreLogin {
  /**
   * Total number of attempts allowed per day.
   * @type {number}
   */
  max_attempts?: number;
  /**
   * Interval of time, given in milliseconds, at which new attempts are granted.
   * @type {number}
   */
  rate?: number;
}
/**
 * Configuration options that apply before every user registration attempt.
 * @export
 * @interface PatchSuspiciousIpThrottlingRequestStagePreUserRegistration
 */
export interface PatchSuspiciousIpThrottlingRequestStagePreUserRegistration {
  /**
   * Total number of attempts allowed.
   * @type {number}
   */
  max_attempts?: number;
  /**
   * Interval of time, given in milliseconds, at which new attempts are granted.
   * @type {number}
   */
  rate?: number;
}
/**
 *
 * @export
 * @interface Permission
 */
export interface Permission {
  /**
   * Resource server (API) identifier that this permission is for.
   * @type {string}
   */
  resource_server_identifier?: string;
  /**
   * Name of this permission.
   * @type {string}
   */
  permission_name?: string;
  /**
   * Resource server (API) name this permission is for.
   * @type {string}
   */
  resource_server_name?: string;
  /**
   * Description of this permission.
   * @type {string}
   */
  description?: string;
}
/**
 *
 * @export
 * @interface PostActionRequest
 */
export interface PostActionRequest {
  /**
   * The name of an action.
   * @type {string}
   */
  name: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   */
  supported_triggers: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   * @type {string}
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   * @type {string}
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<PostActionRequestSecretsInner>}
   */
  secrets?: Array<PostActionRequestSecretsInner>;
}
/**
 *
 * @export
 * @interface PostActionRequestSecretsInner
 */
export interface PostActionRequestSecretsInner {
  /**
   * The name of the particular secret, e.g. API_KEY.
   * @type {string}
   */
  name?: string;
  /**
   * The value of the particular secret, e.g. secret123. A secret's value can only be set upon creation. A secret's value will never be returned by the API.
   * @type {string}
   */
  value?: string;
}
/**
 * The successfully created authentication method.
 * @export
 * @interface PostAuthenticationMethods201Response
 */
export interface PostAuthenticationMethods201Response {
  /**
   * The ID of the newly created authentication method (automatically generated by the application)
   * @type {string}
   */
  id?: string;
  /**
   * @type {string}
   */
  type: PostAuthenticationMethods201ResponseTypeEnum;
  /**
   * A human-readable label to identify the authentication method.
   * @type {string}
   */
  name?: string;
  /**
   * Base32 encoded secret for TOTP generation
   * @type {string}
   */
  totp_secret?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   * @type {string}
   */
  email?: string;
  /**
   * @type {Array<PostAuthenticationMethods201ResponseAuthenticationMethodsInner>}
   */
  authentication_methods?: Array<PostAuthenticationMethods201ResponseAuthenticationMethodsInner>;
  /**
   * Preferred phone authentication method
   * @type {string}
   */
  preferred_authentication_method?: PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum;
  /**
   * Applies to webauthn authenticators only. The id of the credential.
   * @type {string}
   */
  key_id?: string;
  /**
   * Applies to webauthn authenticators only. The public key.
   * @type {string}
   */
  public_key?: string;
  /**
   * Applies to webauthn authenticators only. The relying party identifier.
   * @type {string}
   */
  relying_party_identifier?: string;
  /**
   * Authentication method creation date
   * @type {string}
   */
  created_at?: string;
}

/**
 * @export
 */
export const PostAuthenticationMethods201ResponseTypeEnum = {
  phone: 'phone',
  email: 'email',
  totp: 'totp',
  webauthn_roaming: 'webauthn-roaming',
} as const;
export type PostAuthenticationMethods201ResponseTypeEnum =
  typeof PostAuthenticationMethods201ResponseTypeEnum[keyof typeof PostAuthenticationMethods201ResponseTypeEnum];

/**
 * @export
 */
export const PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum = {
  voice: 'voice',
  sms: 'sms',
} as const;
export type PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum =
  typeof PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum[keyof typeof PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum];

/**
 *
 * @export
 * @interface PostAuthenticationMethods201ResponseAuthenticationMethodsInner
 */
export interface PostAuthenticationMethods201ResponseAuthenticationMethodsInner {
  /**
   * @type {string}
   */
  id?: string;
  /**
   * @type {string}
   */
  type?: PostAuthenticationMethods201ResponseAuthenticationMethodsInnerTypeEnum;
}

/**
 * @export
 */
export const PostAuthenticationMethods201ResponseAuthenticationMethodsInnerTypeEnum = {
  totp: 'totp',
  push: 'push',
  sms: 'sms',
  voice: 'voice',
} as const;
export type PostAuthenticationMethods201ResponseAuthenticationMethodsInnerTypeEnum =
  typeof PostAuthenticationMethods201ResponseAuthenticationMethodsInnerTypeEnum[keyof typeof PostAuthenticationMethods201ResponseAuthenticationMethodsInnerTypeEnum];

/**
 *
 * @export
 * @interface PostAuthenticationMethodsRequest
 */
export interface PostAuthenticationMethodsRequest {
  /**
   * @type {string}
   */
  type: PostAuthenticationMethodsRequestTypeEnum;
  /**
   * A human-readable label to identify the authentication method.
   * @type {string}
   */
  name?: string;
  /**
   * Base32 encoded secret for TOTP generation.
   * @type {string}
   */
  totp_secret?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   * @type {string}
   */
  email?: string;
  /**
   * Preferred phone authentication method.
   * @type {string}
   */
  preferred_authentication_method?: PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum;
  /**
   * Applies to email webauthn authenticators only. The id of the credential.
   * @type {string}
   */
  key_id?: string;
  /**
   * Applies to email webauthn authenticators only. The public key.
   * @type {string}
   */
  public_key?: string;
  /**
   * Applies to email webauthn authenticators only. The relying party identifier.
   * @type {string}
   */
  relying_party_identifier?: string;
}

/**
 * @export
 */
export const PostAuthenticationMethodsRequestTypeEnum = {
  phone: 'phone',
  email: 'email',
  totp: 'totp',
  webauthn_roaming: 'webauthn-roaming',
} as const;
export type PostAuthenticationMethodsRequestTypeEnum =
  typeof PostAuthenticationMethodsRequestTypeEnum[keyof typeof PostAuthenticationMethodsRequestTypeEnum];

/**
 * @export
 */
export const PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum = {
  voice: 'voice',
  sms: 'sms',
} as const;
export type PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum =
  typeof PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum[keyof typeof PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum];

/**
 *
 * @export
 * @interface PostBrandingTheme200Response
 */
export interface PostBrandingTheme200Response {
  /**
   * @type {PostBrandingThemeRequestBorders}
   */
  borders: PostBrandingThemeRequestBorders;
  /**
   * @type {PostBrandingThemeRequestColors}
   */
  colors: PostBrandingThemeRequestColors;
  /**
   * Display Name
   * @type {string}
   */
  displayName: string;
  /**
   * @type {PostBrandingThemeRequestFonts}
   */
  fonts: PostBrandingThemeRequestFonts;
  /**
   * @type {PostBrandingThemeRequestPageBackground}
   */
  page_background: PostBrandingThemeRequestPageBackground;
  /**
   * Theme Id
   * @type {string}
   */
  themeId: string;
  /**
   * @type {PostBrandingThemeRequestWidget}
   */
  widget: PostBrandingThemeRequestWidget;
}
/**
 * Branding theme
 * @export
 * @interface PostBrandingThemeRequest
 */
export interface PostBrandingThemeRequest {
  /**
   * @type {PostBrandingThemeRequestBorders}
   */
  borders: PostBrandingThemeRequestBorders;
  /**
   * @type {PostBrandingThemeRequestColors}
   */
  colors: PostBrandingThemeRequestColors;
  /**
   * Display Name
   * @type {string}
   */
  displayName?: string;
  /**
   * @type {PostBrandingThemeRequestFonts}
   */
  fonts: PostBrandingThemeRequestFonts;
  /**
   * @type {PostBrandingThemeRequestPageBackground}
   */
  page_background: PostBrandingThemeRequestPageBackground;
  /**
   * @type {PostBrandingThemeRequestWidget}
   */
  widget: PostBrandingThemeRequestWidget;
}
/**
 *
 * @export
 * @interface PostBrandingThemeRequestBorders
 */
export interface PostBrandingThemeRequestBorders {
  /**
   * Button border radius
   * @type {number}
   */
  button_border_radius: number;
  /**
   * Button border weight
   * @type {number}
   */
  button_border_weight: number;
  /**
   * Buttons style
   * @type {string}
   */
  buttons_style: PostBrandingThemeRequestBordersButtonsStyleEnum;
  /**
   * Input border radius
   * @type {number}
   */
  input_border_radius: number;
  /**
   * Input border weight
   * @type {number}
   */
  input_border_weight: number;
  /**
   * Inputs style
   * @type {string}
   */
  inputs_style: PostBrandingThemeRequestBordersInputsStyleEnum;
  /**
   * Show widget shadow
   * @type {boolean}
   */
  show_widget_shadow: boolean;
  /**
   * Widget border weight
   * @type {number}
   */
  widget_border_weight: number;
  /**
   * Widget corner radius
   * @type {number}
   */
  widget_corner_radius: number;
}

/**
 * @export
 */
export const PostBrandingThemeRequestBordersButtonsStyleEnum = {
  pill: 'pill',
  rounded: 'rounded',
  sharp: 'sharp',
} as const;
export type PostBrandingThemeRequestBordersButtonsStyleEnum =
  typeof PostBrandingThemeRequestBordersButtonsStyleEnum[keyof typeof PostBrandingThemeRequestBordersButtonsStyleEnum];

/**
 * @export
 */
export const PostBrandingThemeRequestBordersInputsStyleEnum = {
  pill: 'pill',
  rounded: 'rounded',
  sharp: 'sharp',
} as const;
export type PostBrandingThemeRequestBordersInputsStyleEnum =
  typeof PostBrandingThemeRequestBordersInputsStyleEnum[keyof typeof PostBrandingThemeRequestBordersInputsStyleEnum];

/**
 *
 * @export
 * @interface PostBrandingThemeRequestColors
 */
export interface PostBrandingThemeRequestColors {
  /**
   * Base Focus Color
   * @type {string}
   */
  base_focus_color?: string;
  /**
   * Base Hover Color
   * @type {string}
   */
  base_hover_color?: string;
  /**
   * Body text
   * @type {string}
   */
  body_text: string;
  /**
   * Error
   * @type {string}
   */
  error: string;
  /**
   * Header
   * @type {string}
   */
  header: string;
  /**
   * Icons
   * @type {string}
   */
  icons: string;
  /**
   * Input background
   * @type {string}
   */
  input_background: string;
  /**
   * Input border
   * @type {string}
   */
  input_border: string;
  /**
   * Input filled text
   * @type {string}
   */
  input_filled_text: string;
  /**
   * Input labels & placeholders
   * @type {string}
   */
  input_labels_placeholders: string;
  /**
   * Links & focused components
   * @type {string}
   */
  links_focused_components: string;
  /**
   * Primary button
   * @type {string}
   */
  primary_button: string;
  /**
   * Primary button label
   * @type {string}
   */
  primary_button_label: string;
  /**
   * Secondary button border
   * @type {string}
   */
  secondary_button_border: string;
  /**
   * Secondary button label
   * @type {string}
   */
  secondary_button_label: string;
  /**
   * Success
   * @type {string}
   */
  success: string;
  /**
   * Widget background
   * @type {string}
   */
  widget_background: string;
  /**
   * Widget border
   * @type {string}
   */
  widget_border: string;
}
/**
 *
 * @export
 * @interface PostBrandingThemeRequestFonts
 */
export interface PostBrandingThemeRequestFonts {
  /**
   * @type {PostBrandingThemeRequestFontsBodyText}
   */
  body_text: PostBrandingThemeRequestFontsBodyText;
  /**
   * @type {PostBrandingThemeRequestFontsButtonsText}
   */
  buttons_text: PostBrandingThemeRequestFontsButtonsText;
  /**
   * Font URL
   * @type {string}
   */
  font_url: string;
  /**
   * @type {PostBrandingThemeRequestFontsInputLabels}
   */
  input_labels: PostBrandingThemeRequestFontsInputLabels;
  /**
   * @type {PostBrandingThemeRequestFontsLinks}
   */
  links: PostBrandingThemeRequestFontsLinks;
  /**
   * Links style
   * @type {string}
   */
  links_style: PostBrandingThemeRequestFontsLinksStyleEnum;
  /**
   * Reference text size
   * @type {number}
   */
  reference_text_size: number;
  /**
   * @type {PostBrandingThemeRequestFontsSubtitle}
   */
  subtitle: PostBrandingThemeRequestFontsSubtitle;
  /**
   * @type {PostBrandingThemeRequestFontsTitle}
   */
  title: PostBrandingThemeRequestFontsTitle;
}

/**
 * @export
 */
export const PostBrandingThemeRequestFontsLinksStyleEnum = {
  normal: 'normal',
  underlined: 'underlined',
} as const;
export type PostBrandingThemeRequestFontsLinksStyleEnum =
  typeof PostBrandingThemeRequestFontsLinksStyleEnum[keyof typeof PostBrandingThemeRequestFontsLinksStyleEnum];

/**
 * Body text
 * @export
 * @interface PostBrandingThemeRequestFontsBodyText
 */
export interface PostBrandingThemeRequestFontsBodyText {
  /**
   * Body text bold
   * @type {boolean}
   */
  bold: boolean;
  /**
   * Body text size
   * @type {number}
   */
  size: number;
}
/**
 * Buttons text
 * @export
 * @interface PostBrandingThemeRequestFontsButtonsText
 */
export interface PostBrandingThemeRequestFontsButtonsText {
  /**
   * Buttons text bold
   * @type {boolean}
   */
  bold: boolean;
  /**
   * Buttons text size
   * @type {number}
   */
  size: number;
}
/**
 * Input Labels
 * @export
 * @interface PostBrandingThemeRequestFontsInputLabels
 */
export interface PostBrandingThemeRequestFontsInputLabels {
  /**
   * Input Labels bold
   * @type {boolean}
   */
  bold: boolean;
  /**
   * Input Labels size
   * @type {number}
   */
  size: number;
}
/**
 * Links
 * @export
 * @interface PostBrandingThemeRequestFontsLinks
 */
export interface PostBrandingThemeRequestFontsLinks {
  /**
   * Links bold
   * @type {boolean}
   */
  bold: boolean;
  /**
   * Links size
   * @type {number}
   */
  size: number;
}
/**
 * Subtitle
 * @export
 * @interface PostBrandingThemeRequestFontsSubtitle
 */
export interface PostBrandingThemeRequestFontsSubtitle {
  /**
   * Subtitle bold
   * @type {boolean}
   */
  bold: boolean;
  /**
   * Subtitle size
   * @type {number}
   */
  size: number;
}
/**
 * Title
 * @export
 * @interface PostBrandingThemeRequestFontsTitle
 */
export interface PostBrandingThemeRequestFontsTitle {
  /**
   * Title bold
   * @type {boolean}
   */
  bold: boolean;
  /**
   * Title size
   * @type {number}
   */
  size: number;
}
/**
 *
 * @export
 * @interface PostBrandingThemeRequestPageBackground
 */
export interface PostBrandingThemeRequestPageBackground {
  /**
   * Background color
   * @type {string}
   */
  background_color: string;
  /**
   * Background image url
   * @type {string}
   */
  background_image_url: string;
  /**
   * Page Layout
   * @type {string}
   */
  page_layout: PostBrandingThemeRequestPageBackgroundPageLayoutEnum;
}

/**
 * @export
 */
export const PostBrandingThemeRequestPageBackgroundPageLayoutEnum = {
  center: 'center',
  left: 'left',
  right: 'right',
} as const;
export type PostBrandingThemeRequestPageBackgroundPageLayoutEnum =
  typeof PostBrandingThemeRequestPageBackgroundPageLayoutEnum[keyof typeof PostBrandingThemeRequestPageBackgroundPageLayoutEnum];

/**
 *
 * @export
 * @interface PostBrandingThemeRequestWidget
 */
export interface PostBrandingThemeRequestWidget {
  /**
   * Header text alignment
   * @type {string}
   */
  header_text_alignment: PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum;
  /**
   * Logo height
   * @type {number}
   */
  logo_height: number;
  /**
   * Logo position
   * @type {string}
   */
  logo_position: PostBrandingThemeRequestWidgetLogoPositionEnum;
  /**
   * Logo url
   * @type {string}
   */
  logo_url: string;
  /**
   * Social buttons layout
   * @type {string}
   */
  social_buttons_layout: PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum;
}

/**
 * @export
 */
export const PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum = {
  center: 'center',
  left: 'left',
  right: 'right',
} as const;
export type PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum =
  typeof PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum[keyof typeof PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum];

/**
 * @export
 */
export const PostBrandingThemeRequestWidgetLogoPositionEnum = {
  center: 'center',
  left: 'left',
  none: 'none',
  right: 'right',
} as const;
export type PostBrandingThemeRequestWidgetLogoPositionEnum =
  typeof PostBrandingThemeRequestWidgetLogoPositionEnum[keyof typeof PostBrandingThemeRequestWidgetLogoPositionEnum];

/**
 * @export
 */
export const PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum = {
  bottom: 'bottom',
  top: 'top',
} as const;
export type PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum =
  typeof PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum[keyof typeof PostBrandingThemeRequestWidgetSocialButtonsLayoutEnum];

/**
 *
 * @export
 * @interface PostCustomDomains201Response
 */
export interface PostCustomDomains201Response {
  /**
   * ID of the custom domain.
   * @type {string}
   */
  custom_domain_id: string;
  /**
   * Domain name.
   * @type {string}
   */
  domain: string;
  /**
   * Whether this is a primary domain (true) or not (false).
   * @type {boolean}
   */
  primary: boolean;
  /**
   * Custom domain configuration status. Can be `disabled`, `pending`, `pending_verification`, or `ready`.
   * @type {string}
   */
  status: PostCustomDomains201ResponseStatusEnum;
  /**
   * Custom domain provisioning type. Can be `auth0_managed_certs` or `self_managed_certs`.
   * @type {string}
   */
  type: PostCustomDomains201ResponseTypeEnum;
  /**
   * @type {PostCustomDomains201ResponseVerification}
   */
  verification: PostCustomDomains201ResponseVerification;
  /**
   * The HTTP header to fetch the client's IP address
   * @type {string}
   */
  custom_client_ip_header?: string | null;
  /**
   * The TLS version policy
   * @type {string}
   */
  tls_policy?: string;
}

/**
 * @export
 */
export const PostCustomDomains201ResponseStatusEnum = {
  disabled: 'disabled',
  pending: 'pending',
  pending_verification: 'pending_verification',
  ready: 'ready',
} as const;
export type PostCustomDomains201ResponseStatusEnum =
  typeof PostCustomDomains201ResponseStatusEnum[keyof typeof PostCustomDomains201ResponseStatusEnum];

/**
 * @export
 */
export const PostCustomDomains201ResponseTypeEnum = {
  auth0_managed_certs: 'auth0_managed_certs',
  self_managed_certs: 'self_managed_certs',
} as const;
export type PostCustomDomains201ResponseTypeEnum =
  typeof PostCustomDomains201ResponseTypeEnum[keyof typeof PostCustomDomains201ResponseTypeEnum];

/**
 * Domain verification settings.
 * @export
 * @interface PostCustomDomains201ResponseVerification
 */
export interface PostCustomDomains201ResponseVerification {
  /**
   * Domain verification methods.
   * @type {Array<PostCustomDomains201ResponseVerificationMethodsInner>}
   */
  methods?: Array<PostCustomDomains201ResponseVerificationMethodsInner>;
}
/**
 *
 * @export
 * @interface PostCustomDomains201ResponseVerificationMethodsInner
 */
export interface PostCustomDomains201ResponseVerificationMethodsInner {
  /**
   * Domain verification method.
   * @type {string}
   */
  name: PostCustomDomains201ResponseVerificationMethodsInnerNameEnum;
  /**
   * Value used to verify the domain.
   * @type {string}
   */
  record: string;
  /**
   * The name of the txt record for verification
   * @type {string}
   */
  domain?: string;
}

/**
 * @export
 */
export const PostCustomDomains201ResponseVerificationMethodsInnerNameEnum = {
  cname: 'cname',
  txt: 'txt',
} as const;
export type PostCustomDomains201ResponseVerificationMethodsInnerNameEnum =
  typeof PostCustomDomains201ResponseVerificationMethodsInnerNameEnum[keyof typeof PostCustomDomains201ResponseVerificationMethodsInnerNameEnum];

/**
 *
 * @export
 * @interface PostCustomDomainsRequest
 */
export interface PostCustomDomainsRequest {
  /**
   * Domain name.
   * @type {string}
   */
  domain: string;
  /**
   * Custom domain provisioning type. Must be `auth0_managed_certs` or `self_managed_certs`.
   * @type {string}
   */
  type: PostCustomDomainsRequestTypeEnum;
  /**
   * Custom domain verification method. Must be `txt`.
   * @type {string}
   */
  verification_method?: PostCustomDomainsRequestVerificationMethodEnum;
  /**
   * compatible includes TLS 1.0, 1.1, 1.2, and recommended only includes TLS 1.2
   * @type {string}
   */
  tls_policy?: PostCustomDomainsRequestTlsPolicyEnum;
  /**
   * HTTP header to fetch client IP header. Ex: CF-Connecting-IP, X-Forwarded-For or True-Client-IP.
   * @type {string}
   */
  custom_client_ip_header?: PostCustomDomainsRequestCustomClientIpHeaderEnum;
}

/**
 * @export
 */
export const PostCustomDomainsRequestTypeEnum = {
  auth0_managed_certs: 'auth0_managed_certs',
  self_managed_certs: 'self_managed_certs',
} as const;
export type PostCustomDomainsRequestTypeEnum =
  typeof PostCustomDomainsRequestTypeEnum[keyof typeof PostCustomDomainsRequestTypeEnum];

/**
 * @export
 */
export const PostCustomDomainsRequestVerificationMethodEnum = {
  txt: 'txt',
} as const;
export type PostCustomDomainsRequestVerificationMethodEnum =
  typeof PostCustomDomainsRequestVerificationMethodEnum[keyof typeof PostCustomDomainsRequestVerificationMethodEnum];

/**
 * @export
 */
export const PostCustomDomainsRequestTlsPolicyEnum = {
  recommended: 'recommended',
  compatible: 'compatible',
} as const;
export type PostCustomDomainsRequestTlsPolicyEnum =
  typeof PostCustomDomainsRequestTlsPolicyEnum[keyof typeof PostCustomDomainsRequestTlsPolicyEnum];

/**
 * @export
 */
export const PostCustomDomainsRequestCustomClientIpHeaderEnum = {
  true_client_ip: 'true-client-ip',
  cf_connecting_ip: 'cf-connecting-ip',
  x_forwarded_for: 'x-forwarded-for',
  null: 'null',
} as const;
export type PostCustomDomainsRequestCustomClientIpHeaderEnum =
  typeof PostCustomDomainsRequestCustomClientIpHeaderEnum[keyof typeof PostCustomDomainsRequestCustomClientIpHeaderEnum];

/**
 * @type PostDeployDraftVersionRequest
 *
 * @export
 */
export type PostDeployDraftVersionRequest = DraftUpdate;
/**
 *
 * @export
 * @interface PostDeviceCredentials201Response
 */
export interface PostDeviceCredentials201Response {
  /**
   * The credential's identifier
   * @type {string}
   */
  id: string;
}
/**
 *
 * @export
 * @interface PostEmailTemplatesRequest
 */
export interface PostEmailTemplatesRequest {
  /**
   * Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).
   * @type {string}
   */
  template: PostEmailTemplatesRequestTemplateEnum;
  /**
   * Body of the email template.
   * @type {string}
   */
  body: string | null;
  /**
   * Senders `from` email address.
   * @type {string}
   */
  from: string | null;
  /**
   * URL to redirect the user to after a successful action.
   * @type {string}
   */
  resultUrl?: string | null;
  /**
   * Subject line of the email.
   * @type {string}
   */
  subject: string | null;
  /**
   * Syntax of the template body.
   * @type {string}
   */
  syntax: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   * @type {number}
   */
  urlLifetimeInSeconds?: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   * @type {boolean}
   */
  includeEmailInRedirect?: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled: boolean | null;
}

/**
 * @export
 */
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
  typeof PostEmailTemplatesRequestTemplateEnum[keyof typeof PostEmailTemplatesRequestTemplateEnum];

/**
 *
 * @export
 * @interface PostEmailVerification201Response
 */
export interface PostEmailVerification201Response {
  /**
   * URL representing the ticket.
   * @type {string}
   */
  ticket: string;
}
/**
 *
 * @export
 * @interface PostEmailVerificationRequest
 */
export interface PostEmailVerificationRequest {
  /**
   * URL the user will be redirected to in the classic Universal Login experience once the ticket is used.
   * @type {string}
   */
  result_url?: string;
  /**
   * user_id of for whom the ticket should be created.
   * @type {string}
   */
  user_id: string;
  /**
   * ID of the client. If provided for tenants using New Universal Login experience, the user will be prompted to redirect to the default login route of the corresponding application once the ticket is used. See <a target='' href='https://manage.local.dev.auth0.com/docs/universal-login/configure-default-login-routes#completing-the-password-reset-flow'>Configuring Default Login Routes</a> for more details.
   * @type {string}
   */
  client_id?: string;
  /**
   * (Optional) Organization ID – the ID of the Organization. If provided, organization parameters will be made available to the email template and organization branding will be applied to the prompt. In addition, the redirect link in the prompt will include organization_id and organization_name query string parameters.
   * @type {string}
   */
  organization_id?: string;
  /**
   * Number of seconds for which the ticket is valid before expiration. If unspecified or set to 0, this value defaults to 432000 seconds (5 days).
   * @type {number}
   */
  ttl_sec?: number;
  /**
   * Whether to include the email address as part of the returnUrl in the reset_email (true), or not (false).
   * @type {boolean}
   */
  includeEmailInRedirect?: boolean;
  /**
   * @type {PostVerificationEmailRequestIdentity}
   */
  identity?: PostVerificationEmailRequestIdentity;
}
/**
 *
 * @export
 * @interface PostEnabledConnectionsRequest
 */
export interface PostEnabledConnectionsRequest {
  /**
   * Single connection ID to add to the organization.
   * @type {string}
   */
  connection_id: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   * @type {boolean}
   */
  assign_membership_on_login?: boolean;
}
/**
 *
 * @export
 * @interface PostIdentitiesRequest
 */
export interface PostIdentitiesRequest {
  /**
   * Identity provider of the secondary user account being linked.
   * @type {string}
   */
  provider?: PostIdentitiesRequestProviderEnum;
  /**
   * connection_id of the secondary user account being linked when more than one `auth0` database provider exists.
   * @type {string}
   */
  connection_id?: string;
  /**
   * @type {PostIdentitiesRequestUserId}
   */
  user_id?: PostIdentitiesRequestUserId;
  /**
   * JWT for the secondary account being linked. If sending this parameter, `provider`, `user_id`, and `connection_id` must not be sent.
   * @type {string}
   */
  link_with?: string;
}

/**
 * @export
 */
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
  typeof PostIdentitiesRequestProviderEnum[keyof typeof PostIdentitiesRequestProviderEnum];

/**
 * @type PostIdentitiesRequestUserId
 * user_id of the secondary user account being linked.
 * @export
 */
export type PostIdentitiesRequestUserId = number | string;
/**
 *
 * @export
 * @interface PostInvitationsRequest
 */
export interface PostInvitationsRequest {
  /**
   * @type {GetInvitations200ResponseOneOfInnerInviter}
   */
  inviter: GetInvitations200ResponseOneOfInnerInviter;
  /**
   * @type {GetInvitations200ResponseOneOfInnerInvitee}
   */
  invitee: GetInvitations200ResponseOneOfInnerInvitee;
  /**
   * Auth0 client ID. Used to resolve the application's login initiation endpoint.
   * @type {string}
   */
  client_id: string;
  /**
   * The id of the connection to force invitee to authenticate with.
   * @type {string}
   */
  connection_id?: string;
  /**
   * @type {GetInvitations200ResponseOneOfInnerAppMetadata}
   */
  app_metadata?: GetInvitations200ResponseOneOfInnerAppMetadata;
  /**
   * Data related to the user that does not affect the application's core functionality.
   * @type {{ [key: string]: any; }}
   */
  user_metadata?: { [key: string]: any };
  /**
   * Number of seconds for which the invitation is valid before expiration. If unspecified or set to 0, this value defaults to 604800 seconds (7 days). Max value: 2592000 seconds (30 days).
   * @type {number}
   */
  ttl_sec?: number;
  /**
   * List of roles IDs to associated with the user.
   * @type {Array<string>}
   */
  roles?: Array<string>;
  /**
   * Whether the user will receive an invitation email (true) or no email (false), true by default
   * @type {boolean}
   */
  send_invitation_email?: boolean;
}
/**
 * @type PostLogStreamsRequest
 *
 * @export
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
 * @export
 * @interface PostLogStreamsRequestOneOf
 */
export interface PostLogStreamsRequestOneOf {
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * @type {string}
   */
  type: PostLogStreamsRequestOneOfTypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOfSink}
   */
  sink: GetLogStreams200ResponseInnerOneOfSink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   */
  startFrom?: string;
}

/**
 * @export
 */
export const PostLogStreamsRequestOneOfTypeEnum = {
  http: 'http',
} as const;
export type PostLogStreamsRequestOneOfTypeEnum =
  typeof PostLogStreamsRequestOneOfTypeEnum[keyof typeof PostLogStreamsRequestOneOfTypeEnum];

/**
 *
 * @export
 * @interface PostLogStreamsRequestOneOf1
 */
export interface PostLogStreamsRequestOneOf1 {
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * @type {string}
   */
  type: PostLogStreamsRequestOneOf1TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {PostLogStreamsRequestOneOf1Sink}
   */
  sink: PostLogStreamsRequestOneOf1Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   */
  startFrom?: string;
}

/**
 * @export
 */
export const PostLogStreamsRequestOneOf1TypeEnum = {
  eventbridge: 'eventbridge',
} as const;
export type PostLogStreamsRequestOneOf1TypeEnum =
  typeof PostLogStreamsRequestOneOf1TypeEnum[keyof typeof PostLogStreamsRequestOneOf1TypeEnum];

/**
 *
 * @export
 * @interface PostLogStreamsRequestOneOf1Sink
 */
export interface PostLogStreamsRequestOneOf1Sink {
  /**
   * AWS account ID
   * @type {string}
   */
  awsAccountId: string;
  /**
   * The region in which the EventBridge event source will be created
   * @type {string}
   */
  awsRegion: PostLogStreamsRequestOneOf1SinkAwsRegionEnum;
}

/**
 * @export
 */
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
  typeof PostLogStreamsRequestOneOf1SinkAwsRegionEnum[keyof typeof PostLogStreamsRequestOneOf1SinkAwsRegionEnum];

/**
 *
 * @export
 * @interface PostLogStreamsRequestOneOf2
 */
export interface PostLogStreamsRequestOneOf2 {
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * @type {string}
   */
  type: PostLogStreamsRequestOneOf2TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {PostLogStreamsRequestOneOf2Sink}
   */
  sink: PostLogStreamsRequestOneOf2Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   */
  startFrom?: string;
}

/**
 * @export
 */
export const PostLogStreamsRequestOneOf2TypeEnum = {
  eventgrid: 'eventgrid',
} as const;
export type PostLogStreamsRequestOneOf2TypeEnum =
  typeof PostLogStreamsRequestOneOf2TypeEnum[keyof typeof PostLogStreamsRequestOneOf2TypeEnum];

/**
 *
 * @export
 * @interface PostLogStreamsRequestOneOf2Sink
 */
export interface PostLogStreamsRequestOneOf2Sink {
  /**
   * Subscription ID
   * @type {string}
   */
  azureSubscriptionId: string;
  /**
   * Azure Region Name
   * @type {string}
   */
  azureRegion: PostLogStreamsRequestOneOf2SinkAzureRegionEnum;
  /**
   * Resource Group
   * @type {string}
   */
  azureResourceGroup: string;
}

/**
 * @export
 */
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
  typeof PostLogStreamsRequestOneOf2SinkAzureRegionEnum[keyof typeof PostLogStreamsRequestOneOf2SinkAzureRegionEnum];

/**
 *
 * @export
 * @interface PostLogStreamsRequestOneOf3
 */
export interface PostLogStreamsRequestOneOf3 {
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * @type {string}
   */
  type: PostLogStreamsRequestOneOf3TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf3Sink}
   */
  sink: GetLogStreams200ResponseInnerOneOf3Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   */
  startFrom?: string;
}

/**
 * @export
 */
export const PostLogStreamsRequestOneOf3TypeEnum = {
  datadog: 'datadog',
} as const;
export type PostLogStreamsRequestOneOf3TypeEnum =
  typeof PostLogStreamsRequestOneOf3TypeEnum[keyof typeof PostLogStreamsRequestOneOf3TypeEnum];

/**
 *
 * @export
 * @interface PostLogStreamsRequestOneOf4
 */
export interface PostLogStreamsRequestOneOf4 {
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * @type {string}
   */
  type: PostLogStreamsRequestOneOf4TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf4Sink}
   */
  sink: GetLogStreams200ResponseInnerOneOf4Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   */
  startFrom?: string;
}

/**
 * @export
 */
export const PostLogStreamsRequestOneOf4TypeEnum = {
  splunk: 'splunk',
} as const;
export type PostLogStreamsRequestOneOf4TypeEnum =
  typeof PostLogStreamsRequestOneOf4TypeEnum[keyof typeof PostLogStreamsRequestOneOf4TypeEnum];

/**
 *
 * @export
 * @interface PostLogStreamsRequestOneOf5
 */
export interface PostLogStreamsRequestOneOf5 {
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * @type {string}
   */
  type: PostLogStreamsRequestOneOf5TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf5Sink}
   */
  sink: GetLogStreams200ResponseInnerOneOf5Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   */
  startFrom?: string;
}

/**
 * @export
 */
export const PostLogStreamsRequestOneOf5TypeEnum = {
  sumo: 'sumo',
} as const;
export type PostLogStreamsRequestOneOf5TypeEnum =
  typeof PostLogStreamsRequestOneOf5TypeEnum[keyof typeof PostLogStreamsRequestOneOf5TypeEnum];

/**
 *
 * @export
 * @interface PostLogStreamsRequestOneOf6
 */
export interface PostLogStreamsRequestOneOf6 {
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * @type {string}
   */
  type: PostLogStreamsRequestOneOf6TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf6Sink}
   */
  sink: GetLogStreams200ResponseInnerOneOf6Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   */
  startFrom?: string;
}

/**
 * @export
 */
export const PostLogStreamsRequestOneOf6TypeEnum = {
  segment: 'segment',
} as const;
export type PostLogStreamsRequestOneOf6TypeEnum =
  typeof PostLogStreamsRequestOneOf6TypeEnum[keyof typeof PostLogStreamsRequestOneOf6TypeEnum];

/**
 *
 * @export
 * @interface PostLogStreamsRequestOneOf7
 */
export interface PostLogStreamsRequestOneOf7 {
  /**
   * log stream name
   * @type {string}
   */
  name?: string;
  /**
   * @type {string}
   */
  type: PostLogStreamsRequestOneOf7TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   * @type {GetLogStreams200ResponseInnerOneOf7Sink}
   */
  sink: GetLogStreams200ResponseInnerOneOf7Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   */
  startFrom?: string;
}

/**
 * @export
 */
export const PostLogStreamsRequestOneOf7TypeEnum = {
  mixpanel: 'mixpanel',
} as const;
export type PostLogStreamsRequestOneOf7TypeEnum =
  typeof PostLogStreamsRequestOneOf7TypeEnum[keyof typeof PostLogStreamsRequestOneOf7TypeEnum];

/**
 *
 * @export
 * @interface PostMembersRequest
 */
export interface PostMembersRequest {
  /**
   * List of user IDs to add to the organization as members.
   * @type {Array<any>}
   */
  members: Array<any>;
}
/**
 *
 * @export
 * @interface PostOrganizationMemberRolesRequest
 */
export interface PostOrganizationMemberRolesRequest {
  /**
   * List of roles IDs to associated with the user.
   * @type {Array<string>}
   */
  roles: Array<string>;
}
/**
 *
 * @export
 * @interface PostOrganizationsRequest
 */
export interface PostOrganizationsRequest {
  /**
   * The name of this organization.
   * @type {string}
   */
  name: string;
  /**
   * Friendly name of this organization.
   * @type {string}
   */
  display_name?: string;
  /**
   * @type {GetOrganizations200ResponseOneOfInnerBranding}
   */
  branding?: GetOrganizations200ResponseOneOfInnerBranding;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   */
  metadata?: { [key: string]: any };
  /**
   * Connections that will be enabled for this organization. See POST enabled_connections endpoint for the object format. (Max of 10 connections allowed)
   * @type {Array<PostOrganizationsRequestEnabledConnectionsInner>}
   */
  enabled_connections?: Array<PostOrganizationsRequestEnabledConnectionsInner>;
}
/**
 * Connection to be added to the organization.
 * @export
 * @interface PostOrganizationsRequestEnabledConnectionsInner
 */
export interface PostOrganizationsRequestEnabledConnectionsInner {
  /**
   * ID of the connection.
   * @type {string}
   */
  connection_id: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   * @type {boolean}
   */
  assign_membership_on_login?: boolean;
}
/**
 *
 * @export
 * @interface PostPasswordChange201Response
 */
export interface PostPasswordChange201Response {
  /**
   * URL representing the ticket.
   * @type {string}
   */
  ticket: string;
}
/**
 *
 * @export
 * @interface PostPasswordChangeRequest
 */
export interface PostPasswordChangeRequest {
  /**
   * URL the user will be redirected to in the classic Universal Login experience once the ticket is used.
   * @type {string}
   */
  result_url?: string;
  /**
   * user_id of for whom the ticket should be created.
   * @type {string}
   */
  user_id?: string;
  /**
   * ID of the client. If provided for tenants using New Universal Login experience, the user will be prompted to redirect to the default login route of the corresponding application once the ticket is used. See <a target='' href='https://manage.local.dev.auth0.com/docs/universal-login/configure-default-login-routes#completing-the-password-reset-flow'>Configuring Default Login Routes</a> for more details.
   * @type {string}
   */
  client_id?: string;
  /**
   * (Optional) Organization ID – the ID of the Organization. If provided, organization parameters will be made available to the email template and organization branding will be applied to the prompt. In addition, the redirect link in the prompt will include organization_id and organization_name query string parameters.
   * @type {string}
   */
  organization_id?: string;
  /**
   * ID of the connection. If provided, allows the user to be specified using email instead of user_id. If you set this value, you must also send the email parameter. You cannot send user_id when specifying a connection_id.
   * @type {string}
   */
  connection_id?: string;
  /**
   * Email address of the user for whom the tickets should be created. Requires the connection_id parameter. Cannot be specified when using user_id.
   * @type {string}
   */
  email?: string;
  /**
   * Number of seconds for which the ticket is valid before expiration. If unspecified or set to 0, this value defaults to 432000 seconds (5 days).
   * @type {number}
   */
  ttl_sec?: number;
  /**
   * Whether to set the email_verified attribute to true (true) or whether it should not be updated (false).
   * @type {boolean}
   */
  mark_email_as_verified?: boolean;
  /**
   * Whether to include the email address as part of the returnUrl in the reset_email (true), or not (false).
   * @type {boolean}
   */
  includeEmailInRedirect?: boolean;
}
/**
 *
 * @export
 * @interface PostPermissionsRequest
 */
export interface PostPermissionsRequest {
  /**
   * List of permissions to add to this user.
   * @type {Array<PostRolePermissionAssignmentRequestPermissionsInner>}
   */
  permissions: Array<PostRolePermissionAssignmentRequestPermissionsInner>;
}
/**
 *
 * @export
 * @interface PostProviderRequest
 */
export interface PostProviderRequest {
  /**
   * Name of the email provider. Can be `mailgun`, `mandrill`, `sendgrid`, `ses`, `sparkpost`, or `smtp`.
   * @type {string}
   */
  name: PostProviderRequestNameEnum;
  /**
   * Whether the provider is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Email address to use as "from" when no other address specified.
   * @type {string}
   */
  default_from_address?: string;
  /**
   * @type {PostProviderRequestCredentials}
   */
  credentials: PostProviderRequestCredentials;
  /**
   * Specific provider setting
   * @type {{ [key: string]: any; }}
   */
  settings?: { [key: string]: any } | null;
}

/**
 * @export
 */
export const PostProviderRequestNameEnum = {
  mailgun: 'mailgun',
  mandrill: 'mandrill',
  sendgrid: 'sendgrid',
  ses: 'ses',
  sparkpost: 'sparkpost',
  smtp: 'smtp',
} as const;
export type PostProviderRequestNameEnum =
  typeof PostProviderRequestNameEnum[keyof typeof PostProviderRequestNameEnum];

/**
 * Credentials required to use the provider.
 * @export
 * @interface PostProviderRequestCredentials
 */
export interface PostProviderRequestCredentials {}
/**
 *
 * @export
 * @interface PostRecoveryCodeRegeneration200Response
 */
export interface PostRecoveryCodeRegeneration200Response {
  /**
   * New account recovery code.
   * @type {string}
   */
  recovery_code?: string;
}
/**
 *
 * @export
 * @interface PostResourceServersRequest
 */
export interface PostResourceServersRequest {
  /**
   * Friendly name for this resource server. Can not contain `<` or `>` characters.
   * @type {string}
   */
  name?: string;
  /**
   * Unique identifier for the API used as the audience parameter on authorization calls. Can not be changed once set.
   * @type {string}
   */
  identifier: string;
  /**
   * List of permissions (scopes) that this API uses.
   * @type {Array<Scope>}
   */
  scopes?: Array<Scope>;
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   */
  signing_alg?: PostResourceServersRequestSigningAlgEnum;
  /**
   * Secret used to sign tokens when using symmetric algorithms (HS256).
   * @type {string}
   */
  signing_secret?: string;
  /**
   * Whether refresh tokens can be issued for this API (true) or not (false).
   * @type {boolean}
   */
  allow_offline_access?: boolean;
  /**
   * Expiration value (in seconds) for access tokens issued for this API from the token endpoint.
   * @type {number}
   */
  token_lifetime?: number;
  /**
   * Dialect of issued access token. Can be `access_token` or `access_token_authz` (includes permissions). Values can be `access_token` or `access_token_authz` (includes permissions).
   * @type {string}
   */
  token_dialect?: PostResourceServersRequestTokenDialectEnum;
  /**
   * Whether to skip user consent for applications flagged as first party (true) or not (false).
   * @type {boolean}
   */
  skip_consent_for_verifiable_first_party_clients?: boolean;
  /**
   * Whether to enforce authorization policies (true) or to ignore them (false).
   * @type {boolean}
   */
  enforce_policies?: boolean;
  /**
   * @type {object}
   */
  client?: object;
}

/**
 * @export
 */
export const PostResourceServersRequestSigningAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
} as const;
export type PostResourceServersRequestSigningAlgEnum =
  typeof PostResourceServersRequestSigningAlgEnum[keyof typeof PostResourceServersRequestSigningAlgEnum];

/**
 * @export
 */
export const PostResourceServersRequestTokenDialectEnum = {
  token: 'access_token',
  token_authz: 'access_token_authz',
} as const;
export type PostResourceServersRequestTokenDialectEnum =
  typeof PostResourceServersRequestTokenDialectEnum[keyof typeof PostResourceServersRequestTokenDialectEnum];

/**
 *
 * @export
 * @interface PostRolePermissionAssignmentRequest
 */
export interface PostRolePermissionAssignmentRequest {
  /**
   * array of resource_server_identifier, permission_name pairs.
   * @type {Array<PostRolePermissionAssignmentRequestPermissionsInner>}
   */
  permissions: Array<PostRolePermissionAssignmentRequestPermissionsInner>;
}
/**
 *
 * @export
 * @interface PostRolePermissionAssignmentRequestPermissionsInner
 */
export interface PostRolePermissionAssignmentRequestPermissionsInner {
  /**
   * Resource server (API) identifier that this permission is for.
   * @type {string}
   */
  resource_server_identifier: string;
  /**
   * Name of this permission.
   * @type {string}
   */
  permission_name: string;
}
/**
 *
 * @export
 * @interface PostRoleUsersRequest
 */
export interface PostRoleUsersRequest {
  /**
   * user_id's of the users to assign the role to.
   * @type {Array<string>}
   */
  users: Array<string>;
}
/**
 *
 * @export
 * @interface PostSigningKeys201Response
 */
export interface PostSigningKeys201Response {
  /**
   * Next key certificate
   * @type {string}
   */
  cert: string;
  /**
   * Next key id
   * @type {string}
   */
  kid: string;
}
/**
 *
 * @export
 * @interface PostTestAction200Response
 */
export interface PostTestAction200Response {
  /**
   * The resulting payload after an action was executed.
   * @type {{ [key: string]: any; }}
   */
  payload?: { [key: string]: any };
}
/**
 *
 * @export
 * @interface PostTestActionRequest
 */
export interface PostTestActionRequest {
  /**
   * The payload for the action.
   * @type {{ [key: string]: any; }}
   */
  payload: { [key: string]: any };
}
/**
 *
 * @export
 * @interface PostTicket200Response
 */
export interface PostTicket200Response {
  /**
   * The ticket_id used to identify the enrollment
   * @type {string}
   */
  ticket_id?: string;
  /**
   * The url you can use to start enrollment
   * @type {string}
   */
  ticket_url?: string;
}
/**
 *
 * @export
 * @interface PostUserRolesRequest
 */
export interface PostUserRolesRequest {
  /**
   * List of roles IDs to associated with the user.
   * @type {Array<string>}
   */
  roles: Array<string>;
}
/**
 *
 * @export
 * @interface PostUsersExportsRequest
 */
export interface PostUsersExportsRequest {
  /**
   * connection_id of the connection from which users will be exported.
   * @type {string}
   */
  connection_id?: string;
  /**
   * Format of the file. Must be `json` or `csv`.
   * @type {string}
   */
  format?: PostUsersExportsRequestFormatEnum;
  /**
   * Limit the number of records.
   * @type {number}
   */
  limit?: number;
  /**
   * List of fields to be included in the CSV. Defaults to a predefined set of fields.
   * @type {Array<PostUsersExportsRequestFieldsInner>}
   */
  fields?: Array<PostUsersExportsRequestFieldsInner>;
}

/**
 * @export
 */
export const PostUsersExportsRequestFormatEnum = {
  json: 'json',
  csv: 'csv',
} as const;
export type PostUsersExportsRequestFormatEnum =
  typeof PostUsersExportsRequestFormatEnum[keyof typeof PostUsersExportsRequestFormatEnum];

/**
 *
 * @export
 * @interface PostUsersExportsRequestFieldsInner
 */
export interface PostUsersExportsRequestFieldsInner {
  /**
   * Name of the field in the profile.
   * @type {string}
   */
  name: string;
  /**
   * Title of the column in the exported CSV.
   * @type {string}
   */
  export_as?: string;
}
/**
 *
 * @export
 * @interface PostVerificationEmailRequest
 */
export interface PostVerificationEmailRequest {
  /**
   * user_id of the user to send the verification email to.
   * @type {string}
   */
  user_id: string;
  /**
   * client_id of the client (application). If no value provided, the global Client ID will be used.
   * @type {string}
   */
  client_id?: string;
  /**
   * @type {PostVerificationEmailRequestIdentity}
   */
  identity?: PostVerificationEmailRequestIdentity;
  /**
   * (Optional) Organization ID – the ID of the Organization. If provided, organization parameters will be made available to the email template and organization branding will be applied to the prompt. In addition, the redirect link in the prompt will include organization_id and organization_name query string parameters.
   * @type {string}
   */
  organization_id?: string;
}
/**
 * This must be provided to verify primary social, enterprise and passwordless email identities. Also, is needed to verify secondary identities.
 * @export
 * @interface PostVerificationEmailRequestIdentity
 */
export interface PostVerificationEmailRequestIdentity {
  /**
   * user_id of the identity to be verified.
   * @type {string}
   */
  user_id: string;
  /**
   * Identity provider name of the identity (e.g. `google-oauth2`).
   * @type {string}
   */
  provider: PostVerificationEmailRequestIdentityProviderEnum;
}

/**
 * @export
 */
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
  typeof PostVerificationEmailRequestIdentityProviderEnum[keyof typeof PostVerificationEmailRequestIdentityProviderEnum];

/**
 *
 * @export
 * @interface PostVerify200Response
 */
export interface PostVerify200Response {
  /**
   * ID of the custom domain.
   * @type {string}
   */
  custom_domain_id: string;
  /**
   * Domain name.
   * @type {string}
   */
  domain: string;
  /**
   * Whether this is a primary domain (true) or not (false).
   * @type {boolean}
   */
  primary: boolean;
  /**
   * Custom domain configuration status. Can be `disabled`, `pending`, `pending_verification`, or `ready`.
   * @type {string}
   */
  status: PostVerify200ResponseStatusEnum;
  /**
   * Custom domain provisioning type. Can be `auth0_managed_certs` or `self_managed_certs`.
   * @type {string}
   */
  type: PostVerify200ResponseTypeEnum;
  /**
   * CNAME API key header.
   * @type {string}
   */
  cname_api_key?: string;
  /**
   * Intermediate address.
   * @type {string}
   */
  origin_domain_name?: string;
  /**
   * @type {PostCustomDomains201ResponseVerification}
   */
  verification?: PostCustomDomains201ResponseVerification;
  /**
   * The HTTP header to fetch the client's IP address
   * @type {string}
   */
  custom_client_ip_header?: string | null;
  /**
   * The TLS version policy
   * @type {string}
   */
  tls_policy?: string;
}

/**
 * @export
 */
export const PostVerify200ResponseStatusEnum = {
  disabled: 'disabled',
  pending: 'pending',
  pending_verification: 'pending_verification',
  ready: 'ready',
} as const;
export type PostVerify200ResponseStatusEnum =
  typeof PostVerify200ResponseStatusEnum[keyof typeof PostVerify200ResponseStatusEnum];

/**
 * @export
 */
export const PostVerify200ResponseTypeEnum = {
  auth0_managed_certs: 'auth0_managed_certs',
  self_managed_certs: 'self_managed_certs',
} as const;
export type PostVerify200ResponseTypeEnum =
  typeof PostVerify200ResponseTypeEnum[keyof typeof PostVerify200ResponseTypeEnum];

/**
 *
 * @export
 * @interface PromptsSettings
 */
export interface PromptsSettings {
  /**
   * Which login experience to use. Can be `new` or `classic`.
   * @type {string}
   */
  universal_login_experience?: PromptsSettingsUniversalLoginExperienceEnum;
  /**
   * Whether identifier first is enabled or not
   * @type {boolean}
   */
  identifier_first?: boolean;
  /**
   * Use WebAuthn with Device Biometrics as the first authentication factor
   * @type {boolean}
   */
  webauthn_platform_first_factor?: boolean;
}

/**
 * @export
 */
export const PromptsSettingsUniversalLoginExperienceEnum = {
  new: 'new',
  classic: 'classic',
} as const;
export type PromptsSettingsUniversalLoginExperienceEnum =
  typeof PromptsSettingsUniversalLoginExperienceEnum[keyof typeof PromptsSettingsUniversalLoginExperienceEnum];

/**
 * Prompts settings
 * @export
 * @interface PromptsSettingsUpdate
 */
export interface PromptsSettingsUpdate {
  /**
   * Which login experience to use. Can be `new` or `classic`.
   * @type {string}
   */
  universal_login_experience?: PromptsSettingsUpdateUniversalLoginExperienceEnum;
  /**
   * Whether identifier first is enabled or not
   * @type {boolean}
   */
  identifier_first?: boolean | null;
  /**
   * Use WebAuthn with Device Biometrics as the first authentication factor
   * @type {boolean}
   */
  webauthn_platform_first_factor?: boolean | null;
}

/**
 * @export
 */
export const PromptsSettingsUpdateUniversalLoginExperienceEnum = {
  new: 'new',
  classic: 'classic',
} as const;
export type PromptsSettingsUpdateUniversalLoginExperienceEnum =
  typeof PromptsSettingsUpdateUniversalLoginExperienceEnum[keyof typeof PromptsSettingsUpdateUniversalLoginExperienceEnum];

/**
 *
 * @export
 * @interface PutApns200Response
 */
export interface PutApns200Response {
  /**
   * @type {boolean}
   */
  sandbox?: boolean;
  /**
   * @type {string}
   */
  bundle_id?: string | null;
}
/**
 *
 * @export
 * @interface PutApnsRequest
 */
export interface PutApnsRequest {
  /**
   * @type {boolean}
   */
  sandbox?: boolean;
  /**
   * @type {string}
   */
  bundle_id?: string | null;
  /**
   * @type {string}
   */
  p12?: string | null;
}
/**
 *
 * @export
 * @interface PutAuthenticationMethodsRequestInner
 */
export interface PutAuthenticationMethodsRequestInner {
  /**
   * @type {string}
   */
  type: PutAuthenticationMethodsRequestInnerTypeEnum;
  /**
   * The preferred authentication method for phone authentication method.
   * @type {string}
   */
  preferred_authentication_method?: PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum;
  /**
   * AA human-readable label to identify the authentication method.
   * @type {string}
   */
  name?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   * @type {string}
   */
  email?: string;
  /**
   * Applies to totp authentication methods only. The base32 encoded secret for TOTP generation.
   * @type {string}
   */
  totp_secret?: string;
}

/**
 * @export
 */
export const PutAuthenticationMethodsRequestInnerTypeEnum = {
  phone: 'phone',
  email: 'email',
  totp: 'totp',
} as const;
export type PutAuthenticationMethodsRequestInnerTypeEnum =
  typeof PutAuthenticationMethodsRequestInnerTypeEnum[keyof typeof PutAuthenticationMethodsRequestInnerTypeEnum];

/**
 * @export
 */
export const PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum = {
  voice: 'voice',
  sms: 'sms',
} as const;
export type PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum =
  typeof PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum[keyof typeof PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum];

/**
 *
 * @export
 * @interface PutFactorsByName200Response
 */
export interface PutFactorsByName200Response {
  /**
   * Whether this factor is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled: boolean;
}
/**
 *
 * @export
 * @interface PutFactorsByNameRequest
 */
export interface PutFactorsByNameRequest {
  /**
   * Whether this factor is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enabled: boolean;
}
/**
 *
 * @export
 * @interface PutFcmRequest
 */
export interface PutFcmRequest {
  /**
   * @type {string}
   */
  server_key?: string | null;
}
/**
 *
 * @export
 * @interface PutMessageTypesRequest
 */
export interface PutMessageTypesRequest {
  /**
   * The list of phone factors to enable on the tenant. Can include `sms` and `voice`.
   * @type {Array<string>}
   */
  message_types: Array<PutMessageTypesRequestMessageTypesEnum>;
}

/**
 * @export
 */
export const PutMessageTypesRequestMessageTypesEnum = {
  sms: 'sms',
  voice: 'voice',
} as const;
export type PutMessageTypesRequestMessageTypesEnum =
  typeof PutMessageTypesRequestMessageTypesEnum[keyof typeof PutMessageTypesRequestMessageTypesEnum];

/**
 *
 * @export
 * @interface PutPhoneProvidersRequest
 */
export interface PutPhoneProvidersRequest {
  /**
   * @type {string}
   */
  provider: PutPhoneProvidersRequestProviderEnum;
}

/**
 * @export
 */
export const PutPhoneProvidersRequestProviderEnum = {
  auth0: 'auth0',
  twilio: 'twilio',
  phone_message_hook: 'phone-message-hook',
} as const;
export type PutPhoneProvidersRequestProviderEnum =
  typeof PutPhoneProvidersRequestProviderEnum[keyof typeof PutPhoneProvidersRequestProviderEnum];

/**
 *
 * @export
 * @interface PutPnProvidersRequest
 */
export interface PutPnProvidersRequest {
  /**
   * @type {string}
   */
  provider: PutPnProvidersRequestProviderEnum;
}

/**
 * @export
 */
export const PutPnProvidersRequestProviderEnum = {
  guardian: 'guardian',
  sns: 'sns',
  direct: 'direct',
} as const;
export type PutPnProvidersRequestProviderEnum =
  typeof PutPnProvidersRequestProviderEnum[keyof typeof PutPnProvidersRequestProviderEnum];

/**
 *
 * @export
 * @interface PutRulesConfigsByKey200Response
 */
export interface PutRulesConfigsByKey200Response {
  /**
   * Key for a rules config variable.
   * @type {string}
   */
  key: string;
  /**
   * Value for a rules config variable.
   * @type {string}
   */
  value: string;
}
/**
 *
 * @export
 * @interface PutRulesConfigsByKeyRequest
 */
export interface PutRulesConfigsByKeyRequest {
  /**
   * Value for a rules config variable.
   * @type {string}
   */
  value: string;
}
/**
 *
 * @export
 * @interface PutSigningKeys200Response
 */
export interface PutSigningKeys200Response {
  /**
   * Revoked key certificate
   * @type {string}
   */
  cert: string;
  /**
   * Revoked key id
   * @type {string}
   */
  kid: string;
}
/**
 *
 * @export
 * @interface PutSnsRequest
 */
export interface PutSnsRequest {
  /**
   * @type {string}
   */
  aws_access_key_id?: string | null;
  /**
   * @type {string}
   */
  aws_secret_access_key?: string | null;
  /**
   * @type {string}
   */
  aws_region?: string | null;
  /**
   * @type {string}
   */
  sns_apns_platform_application_arn?: string | null;
  /**
   * @type {string}
   */
  sns_gcm_platform_application_arn?: string | null;
}
/**
 *
 * @export
 * @interface PutTwilioRequest
 */
export interface PutTwilioRequest {
  /**
   * From number
   * @type {string}
   */
  from?: string | null;
  /**
   * Copilot SID
   * @type {string}
   */
  messaging_service_sid?: string | null;
  /**
   * Twilio Authentication token
   * @type {string}
   */
  auth_token?: string | null;
  /**
   * Twilio SID
   * @type {string}
   */
  sid?: string | null;
}
/**
 * @type PutUniversalLoginRequest
 *
 * @export
 */
export type PutUniversalLoginRequest = PutUniversalLoginRequestOneOf | string;
/**
 *
 * @export
 * @interface PutUniversalLoginRequestOneOf
 */
export interface PutUniversalLoginRequestOneOf {
  /**
   * @type {string}
   */
  template: string;
}
/**
 *
 * @export
 * @interface ResourceServer
 */
export interface ResourceServer {
  /**
   * ID of the API (resource server).
   * @type {string}
   */
  id?: string;
  /**
   * Friendly name for this resource server. Can not contain `<` or `>` characters.
   * @type {string}
   */
  name?: string;
  /**
   * Whether this is an Auth0 system API (true) or a custom API (false).
   * @type {boolean}
   */
  is_system?: boolean;
  /**
   * Unique identifier for the API used as the audience parameter on authorization calls. Can not be changed once set.
   * @type {string}
   */
  identifier?: string;
  /**
   * List of permissions (scopes) that this API uses.
   * @type {Array<Scope>}
   */
  scopes?: Array<Scope>;
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   */
  signing_alg?: ResourceServerSigningAlgEnum;
  /**
   * Secret used to sign tokens when using symmetric algorithms (HS256).
   * @type {string}
   */
  signing_secret?: string;
  /**
   * Whether refresh tokens can be issued for this API (true) or not (false).
   * @type {boolean}
   */
  allow_offline_access?: boolean;
  /**
   * Whether to skip user consent for applications flagged as first party (true) or not (false).
   * @type {boolean}
   */
  skip_consent_for_verifiable_first_party_clients?: boolean;
  /**
   * Expiration value (in seconds) for access tokens issued for this API from the token endpoint.
   * @type {number}
   */
  token_lifetime?: number;
  /**
   * Expiration value (in seconds) for access tokens issued for this API via Implicit or Hybrid Flows. Cannot be greater than the `token_lifetime` value.
   * @type {number}
   */
  token_lifetime_for_web?: number;
  /**
   * Whether authorization polices are enforced (true) or unenforced (false).
   * @type {boolean}
   */
  enforce_policies?: boolean;
  /**
   * Dialect of access tokens that should be issued. Can be `access_token` or `access_token_authz` (includes permissions).
   * @type {string}
   */
  token_dialect?: ResourceServerTokenDialectEnum;
  /**
   * @type {object}
   */
  client?: object;
}

/**
 * @export
 */
export const ResourceServerSigningAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
} as const;
export type ResourceServerSigningAlgEnum =
  typeof ResourceServerSigningAlgEnum[keyof typeof ResourceServerSigningAlgEnum];

/**
 * @export
 */
export const ResourceServerTokenDialectEnum = {
  token: 'access_token',
  token_authz: 'access_token_authz',
} as const;
export type ResourceServerTokenDialectEnum =
  typeof ResourceServerTokenDialectEnum[keyof typeof ResourceServerTokenDialectEnum];

/**
 *
 * @export
 * @interface ResourceServerUpdate
 */
export interface ResourceServerUpdate {
  /**
   * Friendly name for this resource server. Can not contain `<` or `>` characters.
   * @type {string}
   */
  name?: string;
  /**
   * List of permissions (scopes) that this API uses.
   * @type {Array<Scope>}
   */
  scopes?: Array<Scope>;
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   */
  signing_alg?: ResourceServerUpdateSigningAlgEnum;
  /**
   * Secret used to sign tokens when using symmetric algorithms (HS256).
   * @type {string}
   */
  signing_secret?: string;
  /**
   * Whether to skip user consent for applications flagged as first party (true) or not (false).
   * @type {boolean}
   */
  skip_consent_for_verifiable_first_party_clients?: boolean;
  /**
   * Whether refresh tokens can be issued for this API (true) or not (false).
   * @type {boolean}
   */
  allow_offline_access?: boolean;
  /**
   * Expiration value (in seconds) for access tokens issued for this API from the token endpoint.
   * @type {number}
   */
  token_lifetime?: number;
  /**
   * Dialect of issued access token. Can be `access_token` or `access_token_authz` (includes permissions).
   * @type {string}
   */
  token_dialect?: ResourceServerUpdateTokenDialectEnum;
  /**
   * Whether authorization policies are enforced (true) or not enforced (false).
   * @type {boolean}
   */
  enforce_policies?: boolean;
  /**
   * @type {object}
   */
  client?: object;
}

/**
 * @export
 */
export const ResourceServerUpdateSigningAlgEnum = {
  HS256: 'HS256',
  RS256: 'RS256',
} as const;
export type ResourceServerUpdateSigningAlgEnum =
  typeof ResourceServerUpdateSigningAlgEnum[keyof typeof ResourceServerUpdateSigningAlgEnum];

/**
 * @export
 */
export const ResourceServerUpdateTokenDialectEnum = {
  token: 'access_token',
  token_authz: 'access_token_authz',
} as const;
export type ResourceServerUpdateTokenDialectEnum =
  typeof ResourceServerUpdateTokenDialectEnum[keyof typeof ResourceServerUpdateTokenDialectEnum];

/**
 *
 * @export
 * @interface RoleCreate
 */
export interface RoleCreate {
  /**
   * Name of the role.
   * @type {string}
   */
  name: string;
  /**
   * Description of the role.
   * @type {string}
   */
  description?: string;
}
/**
 *
 * @export
 * @interface RoleUpdate
 */
export interface RoleUpdate {
  /**
   * Name of this role.
   * @type {string}
   */
  name?: string;
  /**
   * Description of this role.
   * @type {string}
   */
  description?: string;
}
/**
 *
 * @export
 * @interface Rule
 */
export interface Rule {
  /**
   * Name of this rule.
   * @type {string}
   */
  name?: string;
  /**
   * ID of this rule.
   * @type {string}
   */
  id?: string;
  /**
   * Whether the rule is enabled (true), or disabled (false).
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Code to be executed when this rule runs.
   * @type {string}
   */
  script?: string;
  /**
   * Order that this rule should execute in relative to other rules. Lower-valued rules execute first.
   * @type {number}
   */
  order?: number;
  /**
   * Execution stage of this rule. Can be `login_success`, `login_failure`, or `pre_authorize`.
   * @type {string}
   */
  stage?: string;
}
/**
 *
 * @export
 * @interface RuleCreate
 */
export interface RuleCreate {
  /**
   * Name of this rule.
   * @type {string}
   */
  name: string;
  /**
   * Code to be executed when this rule runs.
   * @type {string}
   */
  script: string;
  /**
   * Order that this rule should execute in relative to other rules. Lower-valued rules execute first.
   * @type {number}
   */
  order?: number;
  /**
   * Whether the rule is enabled (true), or disabled (false).
   * @type {boolean}
   */
  enabled?: boolean;
}
/**
 *
 * @export
 * @interface RuleUpdate
 */
export interface RuleUpdate {
  /**
   * Code to be executed when this rule runs.
   * @type {string}
   */
  script?: string;
  /**
   * Name of this rule.
   * @type {string}
   */
  name?: string;
  /**
   * Order that this rule should execute in relative to other rules. Lower-valued rules execute first.
   * @type {number}
   */
  order?: number;
  /**
   * Whether the rule is enabled (true), or disabled (false).
   * @type {boolean}
   */
  enabled?: boolean;
}
/**
 *
 * @export
 * @interface Scope
 */
export interface Scope {
  /**
   * Value of this scope.
   * @type {string}
   */
  value: string;
  /**
   * User-friendly description of this scope.
   * @type {string}
   */
  description?: string;
}
/**
 *
 * @export
 * @interface SnsFactorProvider
 */
export interface SnsFactorProvider {
  /**
   * @type {string}
   */
  aws_access_key_id?: string | null;
  /**
   * @type {string}
   */
  aws_secret_access_key?: string | null;
  /**
   * @type {string}
   */
  aws_region?: string | null;
  /**
   * @type {string}
   */
  sns_apns_platform_application_arn?: string | null;
  /**
   * @type {string}
   */
  sns_gcm_platform_application_arn?: string | null;
}
/**
 *
 * @export
 * @interface StatsEntry
 */
export interface StatsEntry {
  /**
   * Date these events occurred in ISO 8601 format.
   * @type {string}
   */
  date?: string;
  /**
   * Number of logins on this date.
   * @type {number}
   */
  logins?: number;
  /**
   * Number of signups on this date.
   * @type {number}
   */
  signups?: number;
  /**
   * Number of breached-password detections on this date (subscription required).
   * @type {number}
   */
  leaked_passwords?: number;
  /**
   * Date and time this stats entry was last updated in ISO 8601 format.
   * @type {string}
   */
  updated_at?: string;
  /**
   * Approximate date and time the first event occurred in ISO 8601 format.
   * @type {string}
   */
  created_at?: string;
}
/**
 *
 * @export
 * @interface TemplateMessages
 */
export interface TemplateMessages {
  /**
   * Message sent to the user when they are invited to enroll with a phone number.
   * @type {string}
   */
  enrollment_message: string;
  /**
   * Message sent to the user when they are prompted to verify their account.
   * @type {string}
   */
  verification_message: string;
}
/**
 *
 * @export
 * @interface TenantSettings
 */
export interface TenantSettings {
  /**
   * @type {TenantSettingsChangePassword}
   */
  change_password?: TenantSettingsChangePassword | null;
  /**
   * @type {TenantSettingsGuardianMfaPage}
   */
  guardian_mfa_page?: TenantSettingsGuardianMfaPage | null;
  /**
   * Default audience for API authorization.
   * @type {string}
   */
  default_audience?: string;
  /**
   * Name of connection used for password grants at the `/token`endpoint. The following connection types are supported: LDAP, AD, Database Connections, Passwordless, Windows Azure Active Directory, ADFS.
   * @type {string}
   */
  default_directory?: string;
  /**
   * @type {TenantSettingsErrorPage}
   */
  error_page?: TenantSettingsErrorPage | null;
  /**
   * @type {TenantSettingsDeviceFlow}
   */
  device_flow?: TenantSettingsDeviceFlow | null;
  /**
   * @type {TenantSettingsFlags}
   */
  flags?: TenantSettingsFlags;
  /**
   * Friendly name for this tenant.
   * @type {string}
   */
  friendly_name?: string;
  /**
   * URL of logo to be shown for this tenant (recommended size: 150x150)
   * @type {string}
   */
  picture_url?: string;
  /**
   * End-user support email address.
   * @type {string}
   */
  support_email?: string;
  /**
   * End-user support URL.
   * @type {string}
   */
  support_url?: string;
  /**
   * URLs that are valid to redirect to after logout from Auth0.
   * @type {Array<string>}
   */
  allowed_logout_urls?: Array<string>;
  /**
   * Number of hours a session will stay valid.
   * @type {number}
   */
  session_lifetime?: number;
  /**
   * Number of hours for which a session can be inactive before the user must log in again.
   * @type {number}
   */
  idle_session_lifetime?: number;
  /**
   * Selected sandbox version for the extensibility environment.
   * @type {string}
   */
  sandbox_version?: string;
  /**
   * Available sandbox versions for the extensibility environment.
   * @type {Array<string>}
   */
  sandbox_versions_available?: Array<string>;
  /**
   * The default absolute redirection uri, must be https
   * @type {string}
   */
  default_redirection_uri?: string;
  /**
   * Supported locales for the user interface.
   * @type {Array<string>}
   */
  enabled_locales?: Array<TenantSettingsEnabledLocalesEnum>;
  /**
   * @type {TenantSettingsSessionCookie}
   */
  session_cookie?: TenantSettingsSessionCookie | null;
}

/**
 * @export
 */
export const TenantSettingsEnabledLocalesEnum = {
  ar: 'ar',
  bg: 'bg',
  bs: 'bs',
  cs: 'cs',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  es: 'es',
  et: 'et',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
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
  typeof TenantSettingsEnabledLocalesEnum[keyof typeof TenantSettingsEnabledLocalesEnum];

/**
 * Change Password page customization.
 * @export
 * @interface TenantSettingsChangePassword
 */
export interface TenantSettingsChangePassword {
  /**
   * Whether to use the custom change password HTML (true) or the default Auth0 page (false). Default is to use the Auth0 page.
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   * Custom change password HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> supported).
   * @type {string}
   */
  html?: string;
}
/**
 * Device Flow configuration
 * @export
 * @interface TenantSettingsDeviceFlow
 */
export interface TenantSettingsDeviceFlow {
  /**
   * Character set used to generate a User Code. Can be `base20` or `digits`.
   * @type {string}
   */
  charset?: TenantSettingsDeviceFlowCharsetEnum;
  /**
   * Mask used to format a generated User Code into a friendly, readable format.
   * @type {string}
   */
  mask?: string;
}

/**
 * @export
 */
export const TenantSettingsDeviceFlowCharsetEnum = {
  base20: 'base20',
  digits: 'digits',
} as const;
export type TenantSettingsDeviceFlowCharsetEnum =
  typeof TenantSettingsDeviceFlowCharsetEnum[keyof typeof TenantSettingsDeviceFlowCharsetEnum];

/**
 * Error page customization.
 * @export
 * @interface TenantSettingsErrorPage
 */
export interface TenantSettingsErrorPage {
  /**
   * Custom Error HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> is supported).
   * @type {string}
   */
  html?: string;
  /**
   * Whether to show the link to log as part of the default error page (true, default) or not to show the link (false).
   * @type {boolean}
   */
  show_log_link?: boolean;
  /**
   * URL to redirect to when an error occurs instead of showing the default error page.
   * @type {string}
   */
  url?: string;
}
/**
 * Flags used to change the behavior of this tenant.
 * @export
 * @interface TenantSettingsFlags
 */
export interface TenantSettingsFlags {
  /**
   * Whether to use the older v1 change password flow (true, not recommended except for backward compatibility) or the newer safer flow (false, recommended).
   * @type {boolean}
   */
  change_pwd_flow_v1?: boolean;
  /**
   * Whether the APIs section is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enable_apis_section?: boolean;
  /**
   * Whether the impersonation functionality has been disabled (true) or not (false). Read-only.
   * @type {boolean}
   */
  disable_impersonation?: boolean;
  /**
   * Whether all current connections should be enabled when a new client (application) is created (true, default) or not (false).
   * @type {boolean}
   */
  enable_client_connections?: boolean;
  /**
   * Whether advanced API Authorization scenarios are enabled (true) or disabled (false).
   * @type {boolean}
   */
  enable_pipeline2?: boolean;
  /**
   * If enabled, clients are able to add legacy delegation grants.
   * @type {boolean}
   */
  allow_legacy_delegation_grant_types?: boolean;
  /**
   * If enabled, clients are able to add legacy RO grants.
   * @type {boolean}
   */
  allow_legacy_ro_grant_types?: boolean;
  /**
   * Whether the legacy `/tokeninfo` endpoint is enabled for your account (true) or unavailable (false).
   * @type {boolean}
   */
  allow_legacy_tokeninfo_endpoint?: boolean;
  /**
   * Whether ID tokens and the userinfo endpoint includes a complete user profile (true) or only OpenID Connect claims (false).
   * @type {boolean}
   */
  enable_legacy_profile?: boolean;
  /**
   * Whether ID tokens can be used to authorize some types of requests to API v2 (true) not not (false).
   * @type {boolean}
   */
  enable_idtoken_api2?: boolean;
  /**
   * Whether the public sign up process shows a user_exists error (true) or a generic error (false) if the user already exists.
   * @type {boolean}
   */
  enable_public_signup_user_exists_error?: boolean;
  /**
   * Whether users are prompted to confirm log in before SSO redirection (false) or are not prompted (true).
   * @type {boolean}
   */
  enable_sso?: boolean;
  /**
   * Whether the `enable_sso` setting can be changed (true) or not (false).
   * @type {boolean}
   */
  allow_changing_enable_sso?: boolean;
  /**
   * Whether classic Universal Login prompts include additional security headers to prevent clickjacking (true) or no safeguard (false).
   * @type {boolean}
   */
  disable_clickjack_protection_headers?: boolean;
  /**
   * Do not Publish Enterprise Connections Information with IdP domains on the lock configuration file.
   * @type {boolean}
   */
  no_disclose_enterprise_connections?: boolean;
  /**
   * Enforce client authentication for passwordless start.
   * @type {boolean}
   */
  enforce_client_authentication_on_passwordless_start?: boolean;
  /**
   * Enables the email verification flow during login for Azure AD and ADFS connections
   * @type {boolean}
   */
  enable_adfs_waad_email_verification?: boolean;
  /**
   * Delete underlying grant when a Refresh Token is revoked via the Authentication API.
   * @type {boolean}
   */
  revoke_refresh_token_grant?: boolean;
  /**
   * Enables beta access to log streaming changes
   * @type {boolean}
   */
  dashboard_log_streams_next?: boolean;
  /**
   * Enables new insights activity page view
   * @type {boolean}
   */
  dashboard_insights_view?: boolean;
  /**
   * Disables SAML fields map fix for bad mappings with repeated attributes
   * @type {boolean}
   */
  disable_fields_map_fix?: boolean;
}
/**
 * Guardian page customization.
 * @export
 * @interface TenantSettingsGuardianMfaPage
 */
export interface TenantSettingsGuardianMfaPage {
  /**
   * Whether to use the custom Guardian HTML (true) or the default Auth0 page (false, default)
   * @type {boolean}
   */
  enabled?: boolean;
  /**
   *  Custom Guardian HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> is supported).
   * @type {string}
   */
  html?: string;
}
/**
 * Session cookie configuration
 * @export
 * @interface TenantSettingsSessionCookie
 */
export interface TenantSettingsSessionCookie {
  /**
   * Behavior of the session cookie
   * @type {string}
   */
  mode: TenantSettingsSessionCookieModeEnum;
}

/**
 * @export
 */
export const TenantSettingsSessionCookieModeEnum = {
  persistent: 'persistent',
  non_persistent: 'non-persistent',
} as const;
export type TenantSettingsSessionCookieModeEnum =
  typeof TenantSettingsSessionCookieModeEnum[keyof typeof TenantSettingsSessionCookieModeEnum];

/**
 *
 * @export
 * @interface TenantSettingsUpdate
 */
export interface TenantSettingsUpdate {
  /**
   * @type {TenantSettingsChangePassword}
   */
  change_password?: TenantSettingsChangePassword | null;
  /**
   * @type {TenantSettingsUpdateDeviceFlow}
   */
  device_flow?: TenantSettingsUpdateDeviceFlow | null;
  /**
   * @type {TenantSettingsGuardianMfaPage}
   */
  guardian_mfa_page?: TenantSettingsGuardianMfaPage | null;
  /**
   * Default audience for API Authorization.
   * @type {string}
   */
  default_audience?: string;
  /**
   * Name of connection used for password grants at the `/token` endpoint. The following connection types are supported: LDAP, AD, Database Connections, Passwordless, Windows Azure Active Directory, ADFS.
   * @type {string}
   */
  default_directory?: string;
  /**
   * @type {TenantSettingsErrorPage}
   */
  error_page?: TenantSettingsErrorPage | null;
  /**
   * @type {TenantSettingsUpdateFlags}
   */
  flags?: TenantSettingsUpdateFlags;
  /**
   * Friendly name for this tenant.
   * @type {string}
   */
  friendly_name?: string;
  /**
   * URL of logo to be shown for this tenant (recommended size: 150x150)
   * @type {string}
   */
  picture_url?: string;
  /**
   * End-user support email.
   * @type {string}
   */
  support_email?: string;
  /**
   * End-user support url.
   * @type {string}
   */
  support_url?: string;
  /**
   * URLs that are valid to redirect to after logout from Auth0.
   * @type {Array<string>}
   */
  allowed_logout_urls?: Array<string>;
  /**
   * Number of hours a session will stay valid.
   * @type {number}
   */
  session_lifetime?: number;
  /**
   * Number of hours for which a session can be inactive before the user must log in again.
   * @type {number}
   */
  idle_session_lifetime?: number;
  /**
   * Selected sandbox version for the extensibility environment
   * @type {string}
   */
  sandbox_version?: string;
  /**
   * The default absolute redirection uri, must be https
   * @type {string}
   */
  default_redirection_uri?: string;
  /**
   * Supported locales for the user interface
   * @type {Array<string>}
   */
  enabled_locales?: Array<TenantSettingsUpdateEnabledLocalesEnum>;
  /**
   * @type {TenantSettingsSessionCookie}
   */
  session_cookie?: TenantSettingsSessionCookie | null;
}

/**
 * @export
 */
export const TenantSettingsUpdateEnabledLocalesEnum = {
  ar: 'ar',
  bg: 'bg',
  bs: 'bs',
  cs: 'cs',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  es: 'es',
  et: 'et',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
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
  typeof TenantSettingsUpdateEnabledLocalesEnum[keyof typeof TenantSettingsUpdateEnabledLocalesEnum];

/**
 * Device Flow configuration.
 * @export
 * @interface TenantSettingsUpdateDeviceFlow
 */
export interface TenantSettingsUpdateDeviceFlow {
  /**
   * Character set used to generate a User Code. Can be `base20` or `digits`.
   * @type {string}
   */
  charset?: TenantSettingsUpdateDeviceFlowCharsetEnum;
  /**
   * Mask used to format a generated User Code into a friendly, readable format.
   * @type {string}
   */
  mask?: string;
}

/**
 * @export
 */
export const TenantSettingsUpdateDeviceFlowCharsetEnum = {
  base20: 'base20',
  digits: 'digits',
} as const;
export type TenantSettingsUpdateDeviceFlowCharsetEnum =
  typeof TenantSettingsUpdateDeviceFlowCharsetEnum[keyof typeof TenantSettingsUpdateDeviceFlowCharsetEnum];

/**
 * Flags used to change the behavior of this tenant.
 * @export
 * @interface TenantSettingsUpdateFlags
 */
export interface TenantSettingsUpdateFlags {
  /**
   * Whether to use the older v1 change password flow (true, not recommended except for backward compatibility) or the newer safer flow (false, recommended).
   * @type {boolean}
   */
  change_pwd_flow_v1?: TenantSettingsUpdateFlagsChangePwdFlowV1Enum;
  /**
   * Whether all current connections should be enabled when a new client (application) is created (true, default) or not (false).
   * @type {boolean}
   */
  enable_client_connections?: boolean;
  /**
   * Whether the APIs section is enabled (true) or disabled (false).
   * @type {boolean}
   */
  enable_apis_section?: boolean;
  /**
   * Whether advanced API Authorization scenarios are enabled (true) or disabled (false).
   * @type {boolean}
   */
  enable_pipeline2?: boolean;
  /**
   *  Whether third-party developers can <a href='https://auth0.com/docs/api-auth/dynamic-client-registration'>dynamically register</a> applications for your APIs (true) or not (false). This flag enables dynamic client registration.
   * @type {boolean}
   */
  enable_dynamic_client_registration?: boolean;
  /**
   * Whether emails sent by Auth0 for change password, verification etc. should use your verified custom domain (true) or your auth0.com sub-domain (false).  Affects all emails, links, and URLs. Email will fail if the custom domain is not verified.
   * @type {boolean}
   */
  enable_custom_domain_in_emails?: boolean;
  /**
   * Whether the legacy `/tokeninfo` endpoint is enabled for your account (true) or unavailable (false).
   * @type {boolean}
   */
  allow_legacy_tokeninfo_endpoint?: boolean;
  /**
   * Whether ID tokens and the userinfo endpoint includes a complete user profile (true) or only OpenID Connect claims (false).
   * @type {boolean}
   */
  enable_legacy_profile?: boolean;
  /**
   * Whether ID tokens can be used to authorize some types of requests to API v2 (true) not not (false).
   * @type {boolean}
   */
  enable_idtoken_api2?: boolean;
  /**
   * Whether the public sign up process shows a user_exists error (true) or a generic error (false) if the user already exists.
   * @type {boolean}
   */
  enable_public_signup_user_exists_error?: boolean;
  /**
   *  Whether the legacy delegation endpoint will be enabled for your account (true) or not available (false).
   * @type {boolean}
   */
  allow_legacy_delegation_grant_types?: boolean;
  /**
   * Whether the legacy `auth/ro` endpoint (used with resource owner password and passwordless features) will be enabled for your account (true) or not available (false).
   * @type {boolean}
   */
  allow_legacy_ro_grant_types?: boolean;
  /**
   * Whether users are prompted to confirm log in before SSO redirection (false) or are not prompted (true).
   * @type {boolean}
   */
  enable_sso?: boolean;
  /**
   * Whether classic Universal Login prompts include additional security headers to prevent clickjacking (true) or no safeguard (false).
   * @type {boolean}
   */
  disable_clickjack_protection_headers?: boolean;
  /**
   * Do not Publish Enterprise Connections Information with IdP domains on the lock configuration file.
   * @type {boolean}
   */
  no_disclose_enterprise_connections?: boolean;
  /**
   * If true, SMS phone numbers will not be obfuscated in Management API GET calls.
   * @type {boolean}
   */
  disable_management_api_sms_obfuscation?: boolean;
  /**
   * Enforce client authentication for passwordless start.
   * @type {boolean}
   */
  enforce_client_authentication_on_passwordless_start?: boolean;
  /**
   * Changes email_verified behavior for Azure AD/ADFS connections when enabled. Sets email_verified to false otherwise.
   * @type {boolean}
   */
  trust_azure_adfs_email_verified_connection_property?: boolean;
  /**
   * Enables the email verification flow during login for Azure AD and ADFS connections.
   * @type {boolean}
   */
  enable_adfs_waad_email_verification?: boolean;
  /**
   * Delete underlying grant when a Refresh Token is revoked via the Authentication API.
   * @type {boolean}
   */
  revoke_refresh_token_grant?: boolean;
  /**
   * Enables beta access to log streaming changes.
   * @type {boolean}
   */
  dashboard_log_streams_next?: boolean;
  /**
   * Enables new insights activity page view.
   * @type {boolean}
   */
  dashboard_insights_view?: boolean;
  /**
   * Disables SAML fields map fix for bad mappings with repeated attributes.
   * @type {boolean}
   */
  disable_fields_map_fix?: boolean;
}

/**
 * @export
 */
export const TenantSettingsUpdateFlagsChangePwdFlowV1Enum = {
  false: false,
} as const;
export type TenantSettingsUpdateFlagsChangePwdFlowV1Enum =
  typeof TenantSettingsUpdateFlagsChangePwdFlowV1Enum[keyof typeof TenantSettingsUpdateFlagsChangePwdFlowV1Enum];

/**
 *
 * @export
 * @interface Token
 */
export interface Token {
  /**
   * JWT's aud claim (the client_id to which the JWT was issued).
   * @type {string}
   */
  aud?: string;
  /**
   * jti (unique ID within aud) of the blacklisted JWT.
   * @type {string}
   */
  jti: string;
}
/**
 *
 * @export
 * @interface TwilioFactorProvider
 */
export interface TwilioFactorProvider {
  /**
   * From number
   * @type {string}
   */
  from?: string | null;
  /**
   * Copilot SID
   * @type {string}
   */
  messaging_service_sid?: string | null;
  /**
   * Twilio Authentication token
   * @type {string}
   */
  auth_token?: string | null;
  /**
   * Twilio SID
   * @type {string}
   */
  sid?: string | null;
}
/**
 *
 * @export
 * @interface UserBlock
 */
export interface UserBlock {
  /**
   * Array of identifier + IP address pairs.  IP address is optional, and may be omitted in certain circumstances (such as Account Lockout mode).
   * @type {Array<UserBlockBlockedForInner>}
   */
  blocked_for?: Array<UserBlockBlockedForInner>;
}
/**
 *
 * @export
 * @interface UserBlockBlockedForInner
 */
export interface UserBlockBlockedForInner {
  /**
   * Identifier (should be any of an `email`, `username`, or `phone_number`)
   * @type {string}
   */
  identifier?: string;
  /**
   * IP Address
   * @type {string}
   */
  ip?: string;
  /**
   * Connection identifier
   * @type {string}
   */
  connection?: string;
}
/**
 *
 * @export
 * @interface UserCreate
 */
export interface UserCreate {
  /**
   * The user's email.
   * @type {string}
   */
  email?: string;
  /**
   * The user's phone number (following the E.164 recommendation), only valid for users from SMS connections.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Data related to the user that does not affect the application's core functionality.
   * @type {{ [key: string]: any; }}
   */
  user_metadata?: { [key: string]: any };
  /**
   * Whether this user was blocked by an administrator (true) or not (false).
   * @type {boolean}
   */
  blocked?: boolean;
  /**
   * Whether this email address is verified (true) or unverified (false). User will receive a verification email after creation if `email_verified` is false or not specified
   * @type {boolean}
   */
  email_verified?: boolean;
  /**
   * Whether this phone number has been verified (true) or not (false).
   * @type {boolean}
   */
  phone_verified?: boolean;
  /**
   * @type {GetInvitations200ResponseOneOfInnerAppMetadata}
   */
  app_metadata?: GetInvitations200ResponseOneOfInnerAppMetadata;
  /**
   * The user's given name(s).
   * @type {string}
   */
  given_name?: string;
  /**
   * The user's family name(s).
   * @type {string}
   */
  family_name?: string;
  /**
   * The user's full name.
   * @type {string}
   */
  name?: string;
  /**
   * The user's nickname.
   * @type {string}
   */
  nickname?: string;
  /**
   * A URI pointing to the user's picture.
   * @type {string}
   */
  picture?: string;
  /**
   * The external user's id provided by the identity provider.
   * @type {string}
   */
  user_id?: string;
  /**
   * Name of the connection this user should be created in.
   * @type {string}
   */
  connection: string;
  /**
   * Initial password for this user (mandatory only for auth0 connection strategy).
   * @type {string}
   */
  password?: string;
  /**
   * Whether the user will receive a verification email after creation (true) or no email (false). Overrides behavior of `email_verified` parameter.
   * @type {boolean}
   */
  verify_email?: boolean;
  /**
   * The user's username. Only valid if the connection requires a username.
   * @type {string}
   */
  username?: string;
}
/**
 *
 * @export
 * @interface UserEnrollment
 */
export interface UserEnrollment {
  /**
   * ID of this enrollment.
   * @type {string}
   */
  id?: string;
  /**
   * Status of this enrollment. Can be `pending` or `confirmed`.
   * @type {string}
   */
  status?: UserEnrollmentStatusEnum;
  /**
   * Type of enrollment.
   * @type {string}
   */
  type?: string;
  /**
   * Name of enrollment (usually phone number).
   * @type {string}
   */
  name?: string;
  /**
   * Device identifier (usually phone identifier) of this enrollment.
   * @type {string}
   */
  identifier?: string;
  /**
   * Phone number for this enrollment.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Authentication method for this enrollment. Can be `authenticator`, `guardian`, `sms`, `webauthn-roaming`, or `webauthn-platform`.
   * @type {string}
   */
  auth_method?: UserEnrollmentAuthMethodEnum;
  /**
   * Start date and time of this enrollment.
   * @type {string}
   */
  enrolled_at?: string;
  /**
   * Last authentication date and time of this enrollment.
   * @type {string}
   */
  last_auth?: string;
}

/**
 * @export
 */
export const UserEnrollmentStatusEnum = {
  pending: 'pending',
  confirmed: 'confirmed',
} as const;
export type UserEnrollmentStatusEnum =
  typeof UserEnrollmentStatusEnum[keyof typeof UserEnrollmentStatusEnum];

/**
 * @export
 */
export const UserEnrollmentAuthMethodEnum = {
  authenticator: 'authenticator',
  guardian: 'guardian',
  sms: 'sms',
  webauthn_platform: 'webauthn-platform',
  webauthn_roaming: 'webauthn-roaming',
} as const;
export type UserEnrollmentAuthMethodEnum =
  typeof UserEnrollmentAuthMethodEnum[keyof typeof UserEnrollmentAuthMethodEnum];

/**
 *
 * @export
 * @interface UserGrant
 */
export interface UserGrant {
  /**
   * ID of the grant.
   * @type {string}
   */
  id?: string;
  /**
   * ID of the client.
   * @type {string}
   */
  clientID?: string;
  /**
   * ID of the user.
   * @type {string}
   */
  user_id?: string;
  /**
   * Audience of the grant.
   * @type {string}
   */
  audience?: string;
  /**
   * Scopes included in this grant.
   * @type {Array<string>}
   */
  scope?: Array<string>;
}
/**
 *
 * @export
 * @interface UserIdentity
 */
export interface UserIdentity {
  /**
   * Connection name of this identity.
   * @type {string}
   */
  connection: string;
  /**
   * @type {UserIdentityUserId}
   */
  user_id: UserIdentityUserId;
  /**
   * Type of identity provider.
   * @type {string}
   */
  provider: string;
  /**
   * @type {UserProfile}
   */
  profileData?: UserProfile;
  /**
   * Whether the identity provider is a social provider (true) or not (false).
   * @type {boolean}
   */
  isSocial?: boolean;
  /**
   * IDP access token returned if scope `read:user_idp_tokens` is defined.
   * @type {string}
   */
  access_token?: string;
  /**
   * IDP access token secret returned only if `scope read:user_idp_tokens` is defined.
   * @type {string}
   */
  access_token_secret?: string;
  /**
   * IDP refresh token returned only if scope `read:user_idp_tokens` is defined.
   * @type {string}
   */
  refresh_token?: string;
}
/**
 * @type UserIdentityUserId
 * user_id of this identity.
 * @export
 */
export type UserIdentityUserId = number | string;
/**
 *
 * @export
 * @interface UserProfile
 */
export interface UserProfile {
  [key: string]: any | any;
  /**
   * Email address of this user.
   * @type {string}
   */
  email?: string;
  /**
   * Whether this email address is verified (true) or unverified (false).
   * @type {boolean}
   */
  email_verified?: boolean;
  /**
   * Name of this user.
   * @type {string}
   */
  name?: string;
  /**
   * Username of this user.
   * @type {string}
   */
  username?: string;
  /**
   * Given name/first name/forename of this user.
   * @type {string}
   */
  given_name?: string;
  /**
   * Phone number for this user.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Whether this phone number is verified (true) or unverified (false).
   * @type {boolean}
   */
  phone_verified?: boolean;
  /**
   * Family name/last name/surname of this user.
   * @type {string}
   */
  family_name?: string;
}
/**
 *
 * @export
 * @interface UserUpdate
 */
export interface UserUpdate {
  [key: string]: any | any;
  /**
   * Whether this user was blocked by an administrator (true) or not (false).
   * @type {boolean}
   */
  blocked?: boolean;
  /**
   * Whether this email address is verified (true) or unverified (false). If set to false the user will not receive a verification email unless `verify_email` is set to true.
   * @type {boolean}
   */
  email_verified?: boolean;
  /**
   * Email address of this user.
   * @type {string}
   */
  email?: string;
  /**
   * The user's phone number (following the E.164 recommendation), only valid for users from SMS connections.
   * @type {string}
   */
  phone_number?: string;
  /**
   * Whether this phone number has been verified (true) or not (false).
   * @type {boolean}
   */
  phone_verified?: boolean;
  /**
   * User metadata to which this user has read/write access.
   * @type {{ [key: string]: any; }}
   */
  user_metadata?: { [key: string]: any } | null;
  /**
   * @type {UserUpdateAppMetadata}
   */
  app_metadata?: UserUpdateAppMetadata | null;
  /**
   * Given name/first name/forename of this user.
   * @type {string}
   */
  given_name?: string | null;
  /**
   * Family name/last name/surname of this user.
   * @type {string}
   */
  family_name?: string | null;
  /**
   * Name of this user.
   * @type {string}
   */
  name?: string | null;
  /**
   * Preferred nickname or alias of this user.
   * @type {string}
   */
  nickname?: string | null;
  /**
   * URL to picture, photo, or avatar of this user.
   * @type {string}
   */
  picture?: string | null;
  /**
   * Whether this user will receive a verification email after creation (true) or no email (false). Overrides behavior of `email_verified` parameter.
   * @type {boolean}
   */
  verify_email?: boolean;
  /**
   * Whether this user will receive a text after changing the phone number (true) or no text (false). Only valid when changing phone number.
   * @type {boolean}
   */
  verify_phone_number?: boolean;
  /**
   * New password for this user (mandatory for non-SMS connections).
   * @type {string}
   */
  password?: string;
  /**
   * ID of the connection this user should be created in.
   * @type {string}
   */
  connection?: string;
  /**
   * Auth0 client ID. Only valid when updating email address.
   * @type {string}
   */
  client_id?: string;
  /**
   * The user's username. Only valid if the connection requires a username.
   * @type {string}
   */
  username?: string;
}
/**
 * User metadata to which this user has read-only access.
 * @export
 * @interface UserUpdateAppMetadata
 */
export interface UserUpdateAppMetadata {
  /**
   * @type {any}
   */
  clientID?: any | null;
  /**
   * @type {any}
   */
  globalClientID?: any | null;
  /**
   * @type {any}
   */
  global_client_id?: any | null;
  /**
   * @type {any}
   */
  email_verified?: any | null;
  /**
   * @type {any}
   */
  user_id?: any | null;
  /**
   * @type {any}
   */
  identities?: any | null;
  /**
   * @type {any}
   */
  lastIP?: any | null;
  /**
   * @type {any}
   */
  lastLogin?: any | null;
  /**
   * @type {any}
   */
  metadata?: any | null;
  /**
   * @type {any}
   */
  created_at?: any | null;
  /**
   * @type {any}
   */
  loginsCount?: any | null;
  /**
   * @type {any}
   */
  _id?: any | null;
  /**
   * @type {any}
   */
  email?: any | null;
  /**
   * @type {any}
   */
  blocked?: any | null;
  /**
   * @type {any}
   */
  __tenant?: any | null;
  /**
   * @type {any}
   */
  updated_at?: any | null;
}
