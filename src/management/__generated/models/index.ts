/* tslint:disable */
/* eslint-disable */
/**
 *
 * @export
 * @interface Client
 */
export interface Client {
  /**
   * ID of this client.
   * @type {string}
   * @memberof Client
   */
  client_id?: string;
  /**
   * Name of the tenant this client belongs to.
   * @type {string}
   * @memberof Client
   */
  tenant?: string;
  /**
   * Name of this client (min length: 1 character, does not allow `<` or `>`).
   * @type {string}
   * @memberof Client
   */
  name?: string;
  /**
   * Free text description of this client (max length: 140 characters).
   * @type {string}
   * @memberof Client
   */
  description?: string;
  /**
   * Whether this is your global 'All Applications' client representing legacy tenant settings (true) or a regular client (false).
   * @type {boolean}
   * @memberof Client
   */
  global?: boolean;
  /**
   * Client secret (which you must not make public).
   * @type {string}
   * @memberof Client
   */
  client_secret?: string;
  /**
   * Type of client used to determine which settings are applicable. Can be `spa`, `native`, `non_interactive`, or `regular_web`.
   * @type {string}
   * @memberof Client
   */
  app_type?: string;
  /**
   * URL of the logo to display for this client. Recommended size is 150x150 pixels.
   * @type {string}
   * @memberof Client
   */
  logo_uri?: string;
  /**
   * Whether this client a first party client (true) or not (false).
   * @type {boolean}
   * @memberof Client
   */
  is_first_party?: boolean;
  /**
   * Whether this client conforms to <a href='https://auth0.com/docs/api-auth/tutorials/adoption'>strict OIDC specifications</a> (true) or uses legacy features (false).
   * @type {boolean}
   * @memberof Client
   */
  oidc_conformant?: boolean;
  /**
   * Comma-separated list of URLs whitelisted for Auth0 to use as a callback to the client after authentication.
   * @type {Array<string>}
   * @memberof Client
   */
  callbacks?: Array<string>;
  /**
   * Comma-separated list of URLs allowed to make requests from JavaScript to Auth0 API (typically used with CORS). By default, all your callback URLs will be allowed. This field allows you to enter other origins if necessary. You can also use wildcards at the subdomain level (e.g., https://*.contoso.com). Query strings and hash information are not taken into account when validating these URLs.
   * @type {Array<string>}
   * @memberof Client
   */
  allowed_origins?: Array<string>;
  /**
   * Comma-separated list of allowed origins for use with <a href='https://auth0.com/docs/cross-origin-authentication'>Cross-Origin Authentication</a>, <a href='https://auth0.com/docs/flows/concepts/device-auth'>Device Flow</a>, and <a href='https://auth0.com/docs/protocols/oauth2#how-response-mode-works'>web message response mode</a>.
   * @type {Array<string>}
   * @memberof Client
   */
  web_origins?: Array<string>;
  /**
   * List of audiences/realms for SAML protocol. Used by the wsfed addon.
   * @type {Array<string>}
   * @memberof Client
   */
  client_aliases?: Array<string>;
  /**
   * List of allow clients and API ids that are allowed to make delegation requests. Empty means all all your clients are allowed.
   * @type {Array<string>}
   * @memberof Client
   */
  allowed_clients?: Array<string>;
  /**
   * Comma-separated list of URLs that are valid to redirect to after logout from Auth0. Wildcards are allowed for subdomains.
   * @type {Array<string>}
   * @memberof Client
   */
  allowed_logout_urls?: Array<string>;
  /**
   *
   * @type {ClientOidcBackchannelLogout}
   * @memberof Client
   */
  oidc_backchannel_logout?: ClientOidcBackchannelLogout;
  /**
   * List of grant types supported for this application. Can include `authorization_code`, `implicit`, `refresh_token`, `client_credentials`, `password`, `http://auth0.com/oauth/grant-type/password-realm`, `http://auth0.com/oauth/grant-type/mfa-oob`, `http://auth0.com/oauth/grant-type/mfa-otp`, `http://auth0.com/oauth/grant-type/mfa-recovery-code`, and `urn:ietf:params:oauth:grant-type:device_code`.
   * @type {Array<string>}
   * @memberof Client
   */
  grant_types?: Array<string>;
  /**
   *
   * @type {ClientJwtConfiguration}
   * @memberof Client
   */
  jwt_configuration?: ClientJwtConfiguration;
  /**
   * Signing certificates associated with this client.
   * @type {Array<ClientSigningKeysInner>}
   * @memberof Client
   */
  signing_keys?: Array<ClientSigningKeysInner>;
  /**
   *
   * @type {ClientEncryptionKey}
   * @memberof Client
   */
  encryption_key?: ClientEncryptionKey | null;
  /**
   * Applies only to SSO clients and determines whether Auth0 will handle Single Sign On (true) or whether the Identity Provider will (false).
   * @type {boolean}
   * @memberof Client
   */
  sso?: boolean;
  /**
   * Whether Single Sign On is disabled (true) or enabled (true). Defaults to true.
   * @type {boolean}
   * @memberof Client
   */
  sso_disabled?: boolean;
  /**
   * URL of the location in your site where the cross origin verification takes place for the cross-origin auth flow when performing Auth in your own domain instead of Auth0 hosted login page.
   * @type {string}
   * @memberof Client
   */
  cross_origin_loc?: string;
  /**
   * Whether a custom login page is to be used (true) or the default provided login page (false).
   * @type {boolean}
   * @memberof Client
   */
  custom_login_page_on?: boolean;
  /**
   * The content (HTML, CSS, JS) of the custom login page.
   * @type {string}
   * @memberof Client
   */
  custom_login_page?: string;
  /**
   * The content (HTML, CSS, JS) of the custom login page. (Used on Previews)
   * @type {string}
   * @memberof Client
   */
  custom_login_page_preview?: string;
  /**
   * HTML form template to be used for WS-Federation.
   * @type {string}
   * @memberof Client
   */
  form_template?: string;
  /**
   *
   * @type {ClientAddons}
   * @memberof Client
   */
  addons?: ClientAddons;
  /**
   * Defines the requested authentication method for the token endpoint. Can be `none` (public client without a client secret), `client_secret_post` (client uses HTTP POST parameters), or `client_secret_basic` (client uses HTTP Basic).
   * @type {string}
   * @memberof Client
   */
  token_endpoint_auth_method?: ClientTokenEndpointAuthMethodEnum;
  /**
   * Metadata associated with the client, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.  Field names (max 255 chars) are alphanumeric and may only include the following special characters:  :,-+=_*?"/\()><@	[Tab] [Space]
   * @type {{ [key: string]: any; }}
   * @memberof Client
   */
  client_metadata?: { [key: string]: any };
  /**
   *
   * @type {ClientMobile}
   * @memberof Client
   */
  mobile?: ClientMobile;
  /**
   * Initiate login uri, must be https
   * @type {string}
   * @memberof Client
   */
  initiate_login_uri?: string;
  /**
   *
   * @type {ClientNativeSocialLogin}
   * @memberof Client
   */
  native_social_login?: ClientNativeSocialLogin | null;
  /**
   *
   * @type {ClientRefreshToken}
   * @memberof Client
   */
  refresh_token?: ClientRefreshToken | null;
  /**
   * Defines how to proceed during an authentication transaction with regards an organization. Can be `deny` (default), `allow` or `require`.
   * @type {string}
   * @memberof Client
   */
  organization_usage?: ClientOrganizationUsageEnum;
  /**
   * Defines how to proceed during an authentication transaction when `client.organization_usage: 'require'`. Can be `no_prompt` (default) or `pre_login_prompt`.
   * @type {string}
   * @memberof Client
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
   *
   * @type {ClientAddonsAws}
   * @memberof ClientAddons
   */
  aws?: ClientAddonsAws;
  /**
   *
   * @type {ClientAddonsAzureBlob}
   * @memberof ClientAddons
   */
  azure_blob?: ClientAddonsAzureBlob;
  /**
   *
   * @type {ClientAddonsAzureSb}
   * @memberof ClientAddons
   */
  azure_sb?: ClientAddonsAzureSb;
  /**
   *
   * @type {ClientAddonsRms}
   * @memberof ClientAddons
   */
  rms?: ClientAddonsRms;
  /**
   *
   * @type {ClientAddonsMscrm}
   * @memberof ClientAddons
   */
  mscrm?: ClientAddonsMscrm;
  /**
   *
   * @type {ClientAddonsSlack}
   * @memberof ClientAddons
   */
  slack?: ClientAddonsSlack;
  /**
   *
   * @type {ClientAddonsSentry}
   * @memberof ClientAddons
   */
  sentry?: ClientAddonsSentry;
  /**
   * Box SSO indicator (no configuration settings needed for Box SSO).
   * @type {{ [key: string]: any; }}
   * @memberof ClientAddons
   */
  box?: { [key: string]: any };
  /**
   * CloudBees SSO indicator (no configuration settings needed for CloudBees SSO).
   * @type {{ [key: string]: any; }}
   * @memberof ClientAddons
   */
  cloudbees?: { [key: string]: any };
  /**
   * Concur SSO indicator (no configuration settings needed for Concur SSO).
   * @type {{ [key: string]: any; }}
   * @memberof ClientAddons
   */
  concur?: { [key: string]: any };
  /**
   * Dropbox SSO indicator (no configuration settings needed for Dropbox SSO).
   * @type {{ [key: string]: any; }}
   * @memberof ClientAddons
   */
  dropbox?: { [key: string]: any };
  /**
   *
   * @type {ClientAddonsEchosign}
   * @memberof ClientAddons
   */
  echosign?: ClientAddonsEchosign;
  /**
   *
   * @type {ClientAddonsEgnyte}
   * @memberof ClientAddons
   */
  egnyte?: ClientAddonsEgnyte;
  /**
   *
   * @type {ClientAddonsFirebase}
   * @memberof ClientAddons
   */
  firebase?: ClientAddonsFirebase;
  /**
   *
   * @type {ClientAddonsNewrelic}
   * @memberof ClientAddons
   */
  newrelic?: ClientAddonsNewrelic;
  /**
   *
   * @type {ClientAddonsOffice365}
   * @memberof ClientAddons
   */
  office365?: ClientAddonsOffice365;
  /**
   *
   * @type {ClientAddonsSalesforce}
   * @memberof ClientAddons
   */
  salesforce?: ClientAddonsSalesforce;
  /**
   *
   * @type {ClientAddonsSalesforceApi}
   * @memberof ClientAddons
   */
  salesforce_api?: ClientAddonsSalesforceApi;
  /**
   *
   * @type {ClientAddonsSalesforceSandboxApi}
   * @memberof ClientAddons
   */
  salesforce_sandbox_api?: ClientAddonsSalesforceSandboxApi;
  /**
   *
   * @type {ClientAddonsSamlp}
   * @memberof ClientAddons
   */
  samlp?: ClientAddonsSamlp;
  /**
   *
   * @type {ClientAddonsLayer}
   * @memberof ClientAddons
   */
  layer?: ClientAddonsLayer;
  /**
   *
   * @type {ClientAddonsSapApi}
   * @memberof ClientAddons
   */
  sap_api?: ClientAddonsSapApi;
  /**
   *
   * @type {ClientAddonsSharepoint}
   * @memberof ClientAddons
   */
  sharepoint?: ClientAddonsSharepoint;
  /**
   *
   * @type {ClientAddonsSpringcm}
   * @memberof ClientAddons
   */
  springcm?: ClientAddonsSpringcm;
  /**
   *
   * @type {ClientAddonsWams}
   * @memberof ClientAddons
   */
  wams?: ClientAddonsWams;
  /**
   * WS-Fed (WIF) addon indicator. Actual configuration is stored in `callback` and `client_aliases` properties on the client.
   * @type {{ [key: string]: any; }}
   * @memberof ClientAddons
   */
  wsfed?: { [key: string]: any };
  /**
   *
   * @type {ClientAddonsZendesk}
   * @memberof ClientAddons
   */
  zendesk?: ClientAddonsZendesk;
  /**
   *
   * @type {ClientAddonsZoom}
   * @memberof ClientAddons
   */
  zoom?: ClientAddonsZoom;
  /**
   *
   * @type {ClientAddonsSsoIntegration}
   * @memberof ClientAddons
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
   * @memberof ClientAddonsAws
   */
  principal?: string;
  /**
   * AWS role ARN, e.g. `arn:aws:iam::010616021751:role/foo`
   * @type {string}
   * @memberof ClientAddonsAws
   */
  role?: string;
  /**
   * AWS token lifetime in seconds
   * @type {number}
   * @memberof ClientAddonsAws
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
   * @memberof ClientAddonsAzureBlob
   */
  accountName?: string;
  /**
   * Access key associated with this storage account.
   * @type {string}
   * @memberof ClientAddonsAzureBlob
   */
  storageAccessKey?: string;
  /**
   * Container to request a token for. e.g. `my-container`.
   * @type {string}
   * @memberof ClientAddonsAzureBlob
   */
  containerName?: string;
  /**
   * Entity to request a token for. e.g. `my-blob`. If blank the computed SAS will apply to the entire storage container.
   * @type {string}
   * @memberof ClientAddonsAzureBlob
   */
  blobName?: string;
  /**
   * Expiration in minutes for the generated token (default of 5 minutes).
   * @type {number}
   * @memberof ClientAddonsAzureBlob
   */
  expiration?: number;
  /**
   * Shared access policy identifier defined in your storage account resource.
   * @type {string}
   * @memberof ClientAddonsAzureBlob
   */
  signedIdentifier?: string;
  /**
   * Indicates if the issued token has permission to read the content, properties, metadata and block list. Use the blob as the source of a copy operation.
   * @type {boolean}
   * @memberof ClientAddonsAzureBlob
   */
  blob_read?: boolean;
  /**
   * Indicates if the issued token has permission to create or write content, properties, metadata, or block list. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation within the same account.
   * @type {boolean}
   * @memberof ClientAddonsAzureBlob
   */
  blob_write?: boolean;
  /**
   * Indicates if the issued token has permission to delete the blob.
   * @type {boolean}
   * @memberof ClientAddonsAzureBlob
   */
  blob_delete?: boolean;
  /**
   * Indicates if the issued token has permission to read the content, properties, metadata or block list of any blob in the container. Use any blob in the container as the source of a copy operation
   * @type {boolean}
   * @memberof ClientAddonsAzureBlob
   */
  container_read?: boolean;
  /**
   * Indicates that for any blob in the container if the issued token has permission to create or write content, properties, metadata, or block list. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation within the same account.
   * @type {boolean}
   * @memberof ClientAddonsAzureBlob
   */
  container_write?: boolean;
  /**
   * Indicates if issued token has permission to delete any blob in the container.
   * @type {boolean}
   * @memberof ClientAddonsAzureBlob
   */
  container_delete?: boolean;
  /**
   * Indicates if the issued token has permission to list blobs in the container.
   * @type {boolean}
   * @memberof ClientAddonsAzureBlob
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
   * @memberof ClientAddonsAzureSb
   */
  namespace?: string;
  /**
   * Your shared access policy name defined in your Service Bus entity.
   * @type {string}
   * @memberof ClientAddonsAzureSb
   */
  sasKeyName?: string;
  /**
   * Primary Key associated with your shared access policy.
   * @type {string}
   * @memberof ClientAddonsAzureSb
   */
  sasKey?: string;
  /**
   * Entity you want to request a token for. e.g. `my-queue`.'
   * @type {string}
   * @memberof ClientAddonsAzureSb
   */
  entityPath?: string;
  /**
   * Optional expiration in minutes for the generated token. Defaults to 5 minutes.
   * @type {number}
   * @memberof ClientAddonsAzureSb
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
   * @memberof ClientAddonsEchosign
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
   * @memberof ClientAddonsEgnyte
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
   * @memberof ClientAddonsFirebase
   */
  secret?: string;
  /**
   * Optional ID of the private key to obtain kid header in the issued token (SDK v3+ tokens only).
   * @type {string}
   * @memberof ClientAddonsFirebase
   */
  private_key_id?: string;
  /**
   * Private Key for signing the token (SDK v3+ tokens only).
   * @type {string}
   * @memberof ClientAddonsFirebase
   */
  private_key?: string;
  /**
   * ID of the Service Account you have created (shown as `client_email` in the generated JSON file, SDK v3+ tokens only).
   * @type {string}
   * @memberof ClientAddonsFirebase
   */
  client_email?: string;
  /**
   * Optional expiration in seconds for the generated token. Defaults to 3600 seconds (SDK v3+ tokens only).
   * @type {number}
   * @memberof ClientAddonsFirebase
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
   * @memberof ClientAddonsLayer
   */
  providerId: string;
  /**
   * Authentication Key identifier used to sign the Layer token.
   * @type {string}
   * @memberof ClientAddonsLayer
   */
  keyId: string;
  /**
   * Private key for signing the Layer token.
   * @type {string}
   * @memberof ClientAddonsLayer
   */
  privateKey: string;
  /**
   * Name of the property used as the unique user id in Layer. If not specified `user_id` is used.
   * @type {string}
   * @memberof ClientAddonsLayer
   */
  principal?: string;
  /**
   * Optional expiration in minutes for the generated token. Defaults to 5 minutes.
   * @type {number}
   * @memberof ClientAddonsLayer
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
   * @memberof ClientAddonsMscrm
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
   * @memberof ClientAddonsNewrelic
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
   * @memberof ClientAddonsOffice365
   */
  domain?: string;
  /**
   * Optional Auth0 database connection for testing an already-configured Office 365 tenant.
   * @type {string}
   * @memberof ClientAddonsOffice365
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
   * @memberof ClientAddonsRms
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
   * @memberof ClientAddonsSalesforce
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
   * @memberof ClientAddonsSalesforceApi
   */
  clientid?: string;
  /**
   * Name of the property in the user object that maps to a Salesforce username. e.g. `email`.
   * @type {string}
   * @memberof ClientAddonsSalesforceApi
   */
  principal?: string;
  /**
   * Community name.
   * @type {string}
   * @memberof ClientAddonsSalesforceApi
   */
  communityName?: string;
  /**
   * Community url section.
   * @type {string}
   * @memberof ClientAddonsSalesforceApi
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
   * @memberof ClientAddonsSalesforceSandboxApi
   */
  clientid?: string;
  /**
   * Name of the property in the user object that maps to a Salesforce username. e.g. `email`.
   * @type {string}
   * @memberof ClientAddonsSalesforceSandboxApi
   */
  principal?: string;
  /**
   * Community name.
   * @type {string}
   * @memberof ClientAddonsSalesforceSandboxApi
   */
  communityName?: string;
  /**
   * Community url section.
   * @type {string}
   * @memberof ClientAddonsSalesforceSandboxApi
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
   *
   * @type {{ [key: string]: any; }}
   * @memberof ClientAddonsSamlp
   */
  mappings?: { [key: string]: any };
  /**
   *
   * @type {string}
   * @memberof ClientAddonsSamlp
   */
  audience?: string;
  /**
   *
   * @type {string}
   * @memberof ClientAddonsSamlp
   */
  recipient?: string;
  /**
   *
   * @type {boolean}
   * @memberof ClientAddonsSamlp
   */
  createUpnClaim?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ClientAddonsSamlp
   */
  mapUnknownClaimsAsIs?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ClientAddonsSamlp
   */
  passthroughClaimsWithNoMapping?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ClientAddonsSamlp
   */
  mapIdentities?: boolean;
  /**
   *
   * @type {string}
   * @memberof ClientAddonsSamlp
   */
  signatureAlgorithm?: string;
  /**
   *
   * @type {string}
   * @memberof ClientAddonsSamlp
   */
  digestAlgorithm?: string;
  /**
   *
   * @type {string}
   * @memberof ClientAddonsSamlp
   */
  issuer?: string;
  /**
   *
   * @type {string}
   * @memberof ClientAddonsSamlp
   */
  destination?: string;
  /**
   *
   * @type {number}
   * @memberof ClientAddonsSamlp
   */
  lifetimeInSeconds?: number;
  /**
   *
   * @type {boolean}
   * @memberof ClientAddonsSamlp
   */
  signResponse?: boolean;
  /**
   *
   * @type {string}
   * @memberof ClientAddonsSamlp
   */
  nameIdentifierFormat?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientAddonsSamlp
   */
  nameIdentifierProbes?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof ClientAddonsSamlp
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
   * @memberof ClientAddonsSapApi
   */
  clientid?: string;
  /**
   * Name of the property in the user object that maps to a SAP username. e.g. `email`.
   * @type {string}
   * @memberof ClientAddonsSapApi
   */
  usernameAttribute?: string;
  /**
   * Your SAP OData server OAuth2 token endpoint URL.
   * @type {string}
   * @memberof ClientAddonsSapApi
   */
  tokenEndpointUrl?: string;
  /**
   * Requested scope for SAP APIs.
   * @type {string}
   * @memberof ClientAddonsSapApi
   */
  scope?: string;
  /**
   * Service account password to use to authenticate API calls to the token endpoint.
   * @type {string}
   * @memberof ClientAddonsSapApi
   */
  servicePassword?: string;
  /**
   * NameID element of the Subject which can be used to express the user's identity. Defaults to `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified`.
   * @type {string}
   * @memberof ClientAddonsSapApi
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
   * @memberof ClientAddonsSentry
   */
  org_slug?: string;
  /**
   * URL prefix only if running Sentry Community Edition, otherwise leave should be blank.
   * @type {string}
   * @memberof ClientAddonsSentry
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
   * @memberof ClientAddonsSharepoint
   */
  url?: string;
  /**
   *
   * @type {ClientAddonsSharepointExternalUrl}
   * @memberof ClientAddonsSharepoint
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
   * @memberof ClientAddonsSlack
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
   * @memberof ClientAddonsSpringcm
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
   * @memberof ClientAddonsSsoIntegration
   */
  name?: string;
  /**
   * SSO integration version installed
   * @type {string}
   * @memberof ClientAddonsSsoIntegration
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
   * @memberof ClientAddonsWams
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
   * @memberof ClientAddonsZendesk
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
   * @memberof ClientAddonsZoom
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
   * @memberof ClientCreate
   */
  name: string;
  /**
   * Free text description of this client (max length: 140 characters).
   * @type {string}
   * @memberof ClientCreate
   */
  description?: string;
  /**
   * URL of the logo to display for this client. Recommended size is 150x150 pixels.
   * @type {string}
   * @memberof ClientCreate
   */
  logo_uri?: string;
  /**
   * Comma-separated list of URLs whitelisted for Auth0 to use as a callback to the client after authentication.
   * @type {Array<string>}
   * @memberof ClientCreate
   */
  callbacks?: Array<string>;
  /**
   *
   * @type {ClientCreateOidcBackchannelLogout}
   * @memberof ClientCreate
   */
  oidc_backchannel_logout?: ClientCreateOidcBackchannelLogout;
  /**
   * Comma-separated list of URLs allowed to make requests from JavaScript to Auth0 API (typically used with CORS). By default, all your callback URLs will be allowed. This field allows you to enter other origins if necessary. You can also use wildcards at the subdomain level (e.g., https://*.contoso.com). Query strings and hash information are not taken into account when validating these URLs.
   * @type {Array<string>}
   * @memberof ClientCreate
   */
  allowed_origins?: Array<string>;
  /**
   * Comma-separated list of allowed origins for use with <a href='https://auth0.com/docs/cross-origin-authentication'>Cross-Origin Authentication</a>, <a href='https://auth0.com/docs/flows/concepts/device-auth'>Device Flow</a>, and <a href='https://auth0.com/docs/protocols/oauth2#how-response-mode-works'>web message response mode</a>.
   * @type {Array<string>}
   * @memberof ClientCreate
   */
  web_origins?: Array<string>;
  /**
   * List of audiences/realms for SAML protocol. Used by the wsfed addon.
   * @type {Array<string>}
   * @memberof ClientCreate
   */
  client_aliases?: Array<string>;
  /**
   * List of allow clients and API ids that are allowed to make delegation requests. Empty means all all your clients are allowed.
   * @type {Array<string>}
   * @memberof ClientCreate
   */
  allowed_clients?: Array<string>;
  /**
   * Comma-separated list of URLs that are valid to redirect to after logout from Auth0. Wildcards are allowed for subdomains.
   * @type {Array<string>}
   * @memberof ClientCreate
   */
  allowed_logout_urls?: Array<string>;
  /**
   * List of grant types supported for this application. Can include `authorization_code`, `implicit`, `refresh_token`, `client_credentials`, `password`, `http://auth0.com/oauth/grant-type/password-realm`, `http://auth0.com/oauth/grant-type/mfa-oob`, `http://auth0.com/oauth/grant-type/mfa-otp`, `http://auth0.com/oauth/grant-type/mfa-recovery-code`, and `urn:ietf:params:oauth:grant-type:device_code`.
   * @type {Array<string>}
   * @memberof ClientCreate
   */
  grant_types?: Array<string>;
  /**
   * Defines the requested authentication method for the token endpoint. Can be `none` (public client without a client secret), `client_secret_post` (client uses HTTP POST parameters), or `client_secret_basic` (client uses HTTP Basic).
   * @type {string}
   * @memberof ClientCreate
   */
  token_endpoint_auth_method?: ClientCreateTokenEndpointAuthMethodEnum;
  /**
   * Type of client used to determine which settings are applicable. Can be `spa`, `native`, `non_interactive`, or `regular_web`.
   * @type {string}
   * @memberof ClientCreate
   */
  app_type?: ClientCreateAppTypeEnum;
  /**
   * Whether this client a first party client or not
   * @type {boolean}
   * @memberof ClientCreate
   */
  is_first_party?: boolean;
  /**
   * Whether this client conforms to <a href='https://auth0.com/docs/api-auth/tutorials/adoption'>strict OIDC specifications</a> (true) or uses legacy features (false).
   * @type {boolean}
   * @memberof ClientCreate
   */
  oidc_conformant?: boolean;
  /**
   *
   * @type {ClientCreateJwtConfiguration}
   * @memberof ClientCreate
   */
  jwt_configuration?: ClientCreateJwtConfiguration;
  /**
   *
   * @type {ClientCreateEncryptionKey}
   * @memberof ClientCreate
   */
  encryption_key?: ClientCreateEncryptionKey;
  /**
   * Applies only to SSO clients and determines whether Auth0 will handle Single Sign On (true) or whether the Identity Provider will (false).
   * @type {boolean}
   * @memberof ClientCreate
   */
  sso?: boolean;
  /**
   * Whether this client can be used to make cross-origin authentication requests (true) or it is not allowed to make such requests (false).
   * @type {boolean}
   * @memberof ClientCreate
   */
  cross_origin_auth?: boolean;
  /**
   * URL of the location in your site where the cross origin verification takes place for the cross-origin auth flow when performing Auth in your own domain instead of Auth0 hosted login page.
   * @type {string}
   * @memberof ClientCreate
   */
  cross_origin_loc?: string;
  /**
   * <code>true</code> to disable Single Sign On, <code>false</code> otherwise (default: <code>false</code>)
   * @type {boolean}
   * @memberof ClientCreate
   */
  sso_disabled?: boolean;
  /**
   * <code>true</code> if the custom login page is to be used, <code>false</code> otherwise. Defaults to <code>true</code>
   * @type {boolean}
   * @memberof ClientCreate
   */
  custom_login_page_on?: boolean;
  /**
   * The content (HTML, CSS, JS) of the custom login page.
   * @type {string}
   * @memberof ClientCreate
   */
  custom_login_page?: string;
  /**
   * The content (HTML, CSS, JS) of the custom login page. (Used on Previews)
   * @type {string}
   * @memberof ClientCreate
   */
  custom_login_page_preview?: string;
  /**
   * HTML form template to be used for WS-Federation.
   * @type {string}
   * @memberof ClientCreate
   */
  form_template?: string;
  /**
   *
   * @type {ClientAddons}
   * @memberof ClientCreate
   */
  addons?: ClientAddons;
  /**
   * Metadata associated with the client, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.  Field names (max 255 chars) are alphanumeric and may only include the following special characters:  :,-+=_*?"/\()><@	[Tab] [Space]
   * @type {{ [key: string]: any; }}
   * @memberof ClientCreate
   */
  client_metadata?: { [key: string]: any };
  /**
   *
   * @type {ClientCreateMobile}
   * @memberof ClientCreate
   */
  mobile?: ClientCreateMobile;
  /**
   * Initiate login uri, must be https
   * @type {string}
   * @memberof ClientCreate
   */
  initiate_login_uri?: string;
  /**
   *
   * @type {ClientNativeSocialLogin}
   * @memberof ClientCreate
   */
  native_social_login?: ClientNativeSocialLogin | null;
  /**
   *
   * @type {ClientRefreshToken}
   * @memberof ClientCreate
   */
  refresh_token?: ClientRefreshToken | null;
  /**
   * Defines how to proceed during an authentication transaction with regards an organization. Can be `deny` (default), `allow` or `require`.
   * @type {string}
   * @memberof ClientCreate
   */
  organization_usage?: ClientCreateOrganizationUsageEnum;
  /**
   * Defines how to proceed during an authentication transaction when `client.organization_usage: 'require'`. Can be `no_prompt` (default) or `pre_login_prompt`.
   * @type {string}
   * @memberof ClientCreate
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
   * @memberof ClientCreateEncryptionKey
   */
  pub?: string;
  /**
   * Encryption certificate for public key in X.590 (.CER) format.
   * @type {string}
   * @memberof ClientCreateEncryptionKey
   */
  cert?: string;
  /**
   * Encryption certificate name for this certificate in the format `/CN={domain}`.
   * @type {string}
   * @memberof ClientCreateEncryptionKey
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
   * @memberof ClientCreateJwtConfiguration
   */
  lifetime_in_seconds?: number;
  /**
   * Configuration related to id token claims for the client.
   * @type {{ [key: string]: any; }}
   * @memberof ClientCreateJwtConfiguration
   */
  scopes?: { [key: string]: any };
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   * @memberof ClientCreateJwtConfiguration
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
   *
   * @type {ClientCreateMobileAndroid}
   * @memberof ClientCreateMobile
   */
  android?: ClientCreateMobileAndroid;
  /**
   *
   * @type {ClientCreateMobileIos}
   * @memberof ClientCreateMobile
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
   * @memberof ClientCreateMobileAndroid
   */
  app_package_name?: string;
  /**
   * SHA256 fingerprints of the app's signing certificate. Multiple fingerprints can be used to support different versions of your app, such as debug and production builds.
   * @type {Array<string>}
   * @memberof ClientCreateMobileAndroid
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
   * @memberof ClientCreateMobileIos
   */
  team_id?: string;
  /**
   * Assigned by the developer to the app as its unique identifier inside the store, usually is a reverse domain plus the app name: <code>com.you.MyApp</code>
   * @type {string}
   * @memberof ClientCreateMobileIos
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
   * @memberof ClientCreateOidcBackchannelLogout
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
   * @memberof ClientEncryptionKey
   */
  pub?: string;
  /**
   * Encryption certificate for public key in X.590 (.CER) format.
   * @type {string}
   * @memberof ClientEncryptionKey
   */
  cert?: string;
  /**
   * Encryption certificate name for this certificate in the format `/CN={domain}`.
   * @type {string}
   * @memberof ClientEncryptionKey
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
   * @memberof ClientGrant
   */
  id?: string;
  /**
   * ID of the client.
   * @type {string}
   * @memberof ClientGrant
   */
  client_id?: string;
  /**
   * Audience or API identifier of this client grant.
   * @type {string}
   * @memberof ClientGrant
   */
  audience?: string;
  /**
   * Scopes allowed for this client grant.
   * @type {Array<string>}
   * @memberof ClientGrant
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
   * @memberof ClientGrantCreate
   */
  client_id: string;
  /**
   * Audience or API identifier of this client grant.
   * @type {string}
   * @memberof ClientGrantCreate
   */
  audience: string;
  /**
   * Scopes allowed for this client grant.
   * @type {Array<string>}
   * @memberof ClientGrantCreate
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
   * @memberof ClientJwtConfiguration
   */
  lifetime_in_seconds?: number;
  /**
   * Whether the client secret is base64 encoded (true) or unencoded (false).
   * @type {boolean}
   * @memberof ClientJwtConfiguration
   */
  secret_encoded?: boolean;
  /**
   * Configuration related to id token claims for the client.
   * @type {{ [key: string]: any; }}
   * @memberof ClientJwtConfiguration
   */
  scopes?: { [key: string]: any };
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   * @memberof ClientJwtConfiguration
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
   *
   * @type {ClientMobileAndroid}
   * @memberof ClientMobile
   */
  android?: ClientMobileAndroid;
  /**
   *
   * @type {ClientMobileIos}
   * @memberof ClientMobile
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
   * @memberof ClientMobileAndroid
   */
  app_package_name?: string;
  /**
   * SHA256 fingerprints of the app's signing certificate. Multiple fingerprints can be used to support different versions of your app, such as debug and production builds.
   * @type {Array<string>}
   * @memberof ClientMobileAndroid
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
   * @memberof ClientMobileIos
   */
  team_id?: string;
  /**
   * Assigned by developer to the app as its unique identifier inside the store. Usually this is a reverse domain plus the app name, e.g. `com.you.MyApp`.
   * @type {string}
   * @memberof ClientMobileIos
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
   *
   * @type {ClientNativeSocialLoginApple}
   * @memberof ClientNativeSocialLogin
   */
  apple?: ClientNativeSocialLoginApple | null;
  /**
   *
   * @type {ClientNativeSocialLoginFacebook}
   * @memberof ClientNativeSocialLogin
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
   * @memberof ClientNativeSocialLoginApple
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
   * @memberof ClientNativeSocialLoginFacebook
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
   * @memberof ClientOidcBackchannelLogout
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
   * @memberof ClientRefreshToken
   */
  rotation_type: ClientRefreshTokenRotationTypeEnum;
  /**
   * Refresh token expiration types, one of: expiring, non-expiring
   * @type {string}
   * @memberof ClientRefreshToken
   */
  expiration_type: ClientRefreshTokenExpirationTypeEnum;
  /**
   * Period in seconds where the previous refresh token can be exchanged without triggering breach detection
   * @type {number}
   * @memberof ClientRefreshToken
   */
  leeway?: number;
  /**
   * Period (in seconds) for which refresh tokens will remain valid
   * @type {number}
   * @memberof ClientRefreshToken
   */
  token_lifetime?: number;
  /**
   * Prevents tokens from having a set lifetime when `true` (takes precedence over `token_lifetime` values)
   * @type {boolean}
   * @memberof ClientRefreshToken
   */
  infinite_token_lifetime?: boolean;
  /**
   * Period (in seconds) for which refresh tokens will remain valid without use
   * @type {number}
   * @memberof ClientRefreshToken
   */
  idle_token_lifetime?: number;
  /**
   * Prevents tokens from expiring without use when `true` (takes precedence over `idle_token_lifetime` values)
   * @type {boolean}
   * @memberof ClientRefreshToken
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
   * @memberof ClientSigningKeysInner
   */
  pkcs7?: string;
  /**
   * Signing certificate public key in X.590 (.CER) format.
   * @type {string}
   * @memberof ClientSigningKeysInner
   */
  cert?: string;
  /**
   * Subject name for this certificate in the format `/CN={domain}`.
   * @type {string}
   * @memberof ClientSigningKeysInner
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
   * @memberof ClientUpdate
   */
  name?: string;
  /**
   * Free text description of the purpose of the Client. (Max character length: <code>140</code>)
   * @type {string}
   * @memberof ClientUpdate
   */
  description?: string;
  /**
   * The secret used to sign tokens for the client
   * @type {string}
   * @memberof ClientUpdate
   */
  client_secret?: string;
  /**
   * The URL of the client logo (recommended size: 150x150)
   * @type {string}
   * @memberof ClientUpdate
   */
  logo_uri?: string;
  /**
   * A set of URLs that are valid to call back from Auth0 when authenticating users
   * @type {Array<string>}
   * @memberof ClientUpdate
   */
  callbacks?: Array<string>;
  /**
   *
   * @type {ClientUpdateOidcBackchannelLogout}
   * @memberof ClientUpdate
   */
  oidc_backchannel_logout?: ClientUpdateOidcBackchannelLogout | null;
  /**
   * A set of URLs that represents valid origins for CORS
   * @type {Array<string>}
   * @memberof ClientUpdate
   */
  allowed_origins?: Array<string>;
  /**
   * A set of URLs that represents valid web origins for use with web message response mode
   * @type {Array<string>}
   * @memberof ClientUpdate
   */
  web_origins?: Array<string>;
  /**
   * A set of grant types that the client is authorized to use
   * @type {Array<string>}
   * @memberof ClientUpdate
   */
  grant_types?: Array<string>;
  /**
   * List of audiences for SAML protocol
   * @type {Array<string>}
   * @memberof ClientUpdate
   */
  client_aliases?: Array<string>;
  /**
   * Ids of clients that will be allowed to perform delegation requests. Clients that will be allowed to make delegation request. By default, all your clients will be allowed. This field allows you to specify specific clients
   * @type {Array<string>}
   * @memberof ClientUpdate
   */
  allowed_clients?: Array<string>;
  /**
   * URLs that are valid to redirect to after logout from Auth0.
   * @type {Array<string>}
   * @memberof ClientUpdate
   */
  allowed_logout_urls?: Array<string>;
  /**
   *
   * @type {ClientUpdateJwtConfiguration}
   * @memberof ClientUpdate
   */
  jwt_configuration?: ClientUpdateJwtConfiguration | null;
  /**
   *
   * @type {ClientUpdateEncryptionKey}
   * @memberof ClientUpdate
   */
  encryption_key?: ClientUpdateEncryptionKey | null;
  /**
   * <code>true</code> to use Auth0 instead of the IdP to do Single Sign On, <code>false</code> otherwise (default: <code>false</code>)
   * @type {boolean}
   * @memberof ClientUpdate
   */
  sso?: boolean;
  /**
   * URL for the location in your site where the cross origin verification takes place for the cross-origin auth flow when performing Auth in your own domain instead of Auth0 hosted login page.
   * @type {string}
   * @memberof ClientUpdate
   */
  cross_origin_loc?: string | null;
  /**
   * <code>true</code> to disable Single Sign On, <code>false</code> otherwise (default: <code>false</code>)
   * @type {boolean}
   * @memberof ClientUpdate
   */
  sso_disabled?: boolean;
  /**
   * <code>true</code> if the custom login page is to be used, <code>false</code> otherwise.
   * @type {boolean}
   * @memberof ClientUpdate
   */
  custom_login_page_on?: boolean;
  /**
   * Defines the requested authentication method for the token endpoint. Possible values are 'none' (public client without a client secret), 'client_secret_post' (client uses HTTP POST parameters) or 'client_secret_basic' (client uses HTTP Basic)
   * @type {string}
   * @memberof ClientUpdate
   */
  token_endpoint_auth_method?: ClientUpdateTokenEndpointAuthMethodEnum;
  /**
   * The type of application this client represents
   * @type {string}
   * @memberof ClientUpdate
   */
  app_type?: ClientUpdateAppTypeEnum;
  /**
   * Whether this client a first party client or not
   * @type {boolean}
   * @memberof ClientUpdate
   */
  is_first_party?: boolean;
  /**
   * Whether this client will conform to strict OIDC specifications
   * @type {boolean}
   * @memberof ClientUpdate
   */
  oidc_conformant?: boolean;
  /**
   * The content (HTML, CSS, JS) of the custom login page
   * @type {string}
   * @memberof ClientUpdate
   */
  custom_login_page?: string;
  /**
   *
   * @type {string}
   * @memberof ClientUpdate
   */
  custom_login_page_preview?: string;
  /**
   * Form template for WS-Federation protocol
   * @type {string}
   * @memberof ClientUpdate
   */
  form_template?: string;
  /**
   *
   * @type {ClientUpdateAddons}
   * @memberof ClientUpdate
   */
  addons?: ClientUpdateAddons | null;
  /**
   * Metadata associated with the client, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.  Field names (max 255 chars) are alphanumeric and may only include the following special characters:  :,-+=_*?"/\()><@	[Tab] [Space]
   * @type {{ [key: string]: any; }}
   * @memberof ClientUpdate
   */
  client_metadata?: { [key: string]: any };
  /**
   *
   * @type {ClientUpdateMobile}
   * @memberof ClientUpdate
   */
  mobile?: ClientUpdateMobile | null;
  /**
   * Initiate login uri, must be https
   * @type {string}
   * @memberof ClientUpdate
   */
  initiate_login_uri?: string;
  /**
   *
   * @type {ClientNativeSocialLogin}
   * @memberof ClientUpdate
   */
  native_social_login?: ClientNativeSocialLogin | null;
  /**
   *
   * @type {ClientRefreshToken}
   * @memberof ClientUpdate
   */
  refresh_token?: ClientRefreshToken | null;
  /**
   * Defines how to proceed during an authentication transaction with regards an organization. Can be `deny` (default), `allow` or `require`.
   * @type {string}
   * @memberof ClientUpdate
   */
  organization_usage?: ClientUpdateOrganizationUsageEnum;
  /**
   * Defines how to proceed during an authentication transaction when `client.organization_usage: 'require'`. Can be `no_prompt` (default) or `pre_login_prompt`.
   * @type {string}
   * @memberof ClientUpdate
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
   *
   * @type {ClientAddonsAws}
   * @memberof ClientUpdateAddons
   */
  aws?: ClientAddonsAws;
  /**
   *
   * @type {ClientAddonsAzureBlob}
   * @memberof ClientUpdateAddons
   */
  azure_blob?: ClientAddonsAzureBlob;
  /**
   *
   * @type {ClientAddonsAzureSb}
   * @memberof ClientUpdateAddons
   */
  azure_sb?: ClientAddonsAzureSb;
  /**
   *
   * @type {ClientAddonsRms}
   * @memberof ClientUpdateAddons
   */
  rms?: ClientAddonsRms;
  /**
   *
   * @type {ClientAddonsMscrm}
   * @memberof ClientUpdateAddons
   */
  mscrm?: ClientAddonsMscrm;
  /**
   *
   * @type {ClientAddonsSlack}
   * @memberof ClientUpdateAddons
   */
  slack?: ClientAddonsSlack;
  /**
   *
   * @type {ClientAddonsSentry}
   * @memberof ClientUpdateAddons
   */
  sentry?: ClientAddonsSentry;
  /**
   * Box SSO indicator (no configuration settings needed for Box SSO).
   * @type {{ [key: string]: any; }}
   * @memberof ClientUpdateAddons
   */
  box?: { [key: string]: any };
  /**
   * CloudBees SSO indicator (no configuration settings needed for CloudBees SSO).
   * @type {{ [key: string]: any; }}
   * @memberof ClientUpdateAddons
   */
  cloudbees?: { [key: string]: any };
  /**
   * Concur SSO indicator (no configuration settings needed for Concur SSO).
   * @type {{ [key: string]: any; }}
   * @memberof ClientUpdateAddons
   */
  concur?: { [key: string]: any };
  /**
   * Dropbox SSO indicator (no configuration settings needed for Dropbox SSO).
   * @type {{ [key: string]: any; }}
   * @memberof ClientUpdateAddons
   */
  dropbox?: { [key: string]: any };
  /**
   *
   * @type {ClientAddonsEchosign}
   * @memberof ClientUpdateAddons
   */
  echosign?: ClientAddonsEchosign;
  /**
   *
   * @type {ClientAddonsEgnyte}
   * @memberof ClientUpdateAddons
   */
  egnyte?: ClientAddonsEgnyte;
  /**
   *
   * @type {ClientAddonsFirebase}
   * @memberof ClientUpdateAddons
   */
  firebase?: ClientAddonsFirebase;
  /**
   *
   * @type {ClientAddonsNewrelic}
   * @memberof ClientUpdateAddons
   */
  newrelic?: ClientAddonsNewrelic;
  /**
   *
   * @type {ClientAddonsOffice365}
   * @memberof ClientUpdateAddons
   */
  office365?: ClientAddonsOffice365;
  /**
   *
   * @type {ClientAddonsSalesforce}
   * @memberof ClientUpdateAddons
   */
  salesforce?: ClientAddonsSalesforce;
  /**
   *
   * @type {ClientAddonsSalesforceApi}
   * @memberof ClientUpdateAddons
   */
  salesforce_api?: ClientAddonsSalesforceApi;
  /**
   *
   * @type {ClientAddonsSalesforceSandboxApi}
   * @memberof ClientUpdateAddons
   */
  salesforce_sandbox_api?: ClientAddonsSalesforceSandboxApi;
  /**
   *
   * @type {ClientAddonsSamlp}
   * @memberof ClientUpdateAddons
   */
  samlp?: ClientAddonsSamlp;
  /**
   *
   * @type {ClientAddonsLayer}
   * @memberof ClientUpdateAddons
   */
  layer?: ClientAddonsLayer;
  /**
   *
   * @type {ClientAddonsSapApi}
   * @memberof ClientUpdateAddons
   */
  sap_api?: ClientAddonsSapApi;
  /**
   *
   * @type {ClientAddonsSharepoint}
   * @memberof ClientUpdateAddons
   */
  sharepoint?: ClientAddonsSharepoint;
  /**
   *
   * @type {ClientAddonsSpringcm}
   * @memberof ClientUpdateAddons
   */
  springcm?: ClientAddonsSpringcm;
  /**
   *
   * @type {ClientAddonsWams}
   * @memberof ClientUpdateAddons
   */
  wams?: ClientAddonsWams;
  /**
   * WS-Fed (WIF) addon indicator. Actual configuration is stored in `callback` and `client_aliases` properties on the client.
   * @type {{ [key: string]: any; }}
   * @memberof ClientUpdateAddons
   */
  wsfed?: { [key: string]: any };
  /**
   *
   * @type {ClientAddonsZendesk}
   * @memberof ClientUpdateAddons
   */
  zendesk?: ClientAddonsZendesk;
  /**
   *
   * @type {ClientAddonsZoom}
   * @memberof ClientUpdateAddons
   */
  zoom?: ClientAddonsZoom;
  /**
   *
   * @type {ClientAddonsSsoIntegration}
   * @memberof ClientUpdateAddons
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
   * @memberof ClientUpdateEncryptionKey
   */
  pub?: string;
  /**
   * Encryption certificate
   * @type {string}
   * @memberof ClientUpdateEncryptionKey
   */
  cert?: string;
  /**
   * Certificate subject
   * @type {string}
   * @memberof ClientUpdateEncryptionKey
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
   * @memberof ClientUpdateJwtConfiguration
   */
  lifetime_in_seconds?: number;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof ClientUpdateJwtConfiguration
   */
  scopes?: { [key: string]: any };
  /**
   * The algorithm used to sign the JsonWebToken
   * @type {string}
   * @memberof ClientUpdateJwtConfiguration
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
   *
   * @type {ClientUpdateMobileAndroid}
   * @memberof ClientUpdateMobile
   */
  android?: ClientUpdateMobileAndroid | null;
  /**
   *
   * @type {ClientUpdateMobileIos}
   * @memberof ClientUpdateMobile
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
   * @memberof ClientUpdateMobileAndroid
   */
  app_package_name?: string;
  /**
   * The SHA256 fingerprints of your app's signing certificate. Multiple fingerprints can be used to support different versions of your app, such as debug and production builds
   * @type {Array<string>}
   * @memberof ClientUpdateMobileAndroid
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
   * @memberof ClientUpdateMobileIos
   */
  team_id?: string;
  /**
   * Assigned by the developer to the app as its unique identifier inside the store, usually is a reverse domain plus the app name: <code>com.you.MyApp</code>
   * @type {string}
   * @memberof ClientUpdateMobileIos
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
   * @memberof ClientUpdateOidcBackchannelLogout
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
   * @memberof Connection
   */
  name?: string;
  /**
   * Connection name used in login screen
   * @type {string}
   * @memberof Connection
   */
  display_name?: string;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof Connection
   */
  options?: { [key: string]: any };
  /**
   * The connection's identifier
   * @type {string}
   * @memberof Connection
   */
  id?: string;
  /**
   * The type of the connection, related to the identity provider
   * @type {string}
   * @memberof Connection
   */
  strategy?: string;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm
   * @type {Array<string>}
   * @memberof Connection
   */
  realms?: Array<string>;
  /**
   * True if the connection is domain level
   * @type {boolean}
   * @memberof Connection
   */
  is_domain_connection?: boolean;
  /**
   * Metadata associated with the connection, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   * @memberof Connection
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
   * @memberof ConnectionCreate
   */
  name: string;
  /**
   * Connection name used in the new universal login experience
   * @type {string}
   * @memberof ConnectionCreate
   */
  display_name?: string;
  /**
   * The identity provider identifier for the connection
   * @type {string}
   * @memberof ConnectionCreate
   */
  strategy: ConnectionCreateStrategyEnum;
  /**
   *
   * @type {ConnectionCreateOptions}
   * @memberof ConnectionCreate
   */
  options?: ConnectionCreateOptions;
  /**
   * The identifiers of the clients for which the connection is to be enabled. If the array is empty or the property is not specified, no clients are enabled
   * @type {Array<string>}
   * @memberof ConnectionCreate
   */
  enabled_clients?: Array<string>;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreate
   */
  is_domain_connection?: boolean;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm
   * @type {Array<string>}
   * @memberof ConnectionCreate
   */
  realms?: Array<string>;
  /**
   * Metadata associated with the connection, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   * @memberof ConnectionCreate
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
   *
   * @type {ConnectionCreateOptionsValidation}
   * @memberof ConnectionCreateOptions
   */
  validation?: ConnectionCreateOptionsValidation | null;
  /**
   * An array of user fields that should not be stored in the Auth0 database (https://manage.local.dev.auth0.com/docs/security/data-security/denylist)
   * @type {Array<string>}
   * @memberof ConnectionCreateOptions
   */
  non_persistent_attrs?: Array<string>;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  enable_script_context?: boolean;
  /**
   * Set to true to use a legacy user store
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  enabledDatabaseCustomization?: boolean;
  /**
   * Enable this if you have a legacy user store and you want to gradually migrate those users to the Auth0 user store
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  import_mode?: boolean;
  /**
   *
   * @type {ConnectionCreateOptionsCustomScripts}
   * @memberof ConnectionCreateOptions
   */
  customScripts?: ConnectionCreateOptionsCustomScripts;
  /**
   * Password strength level
   * @type {string}
   * @memberof ConnectionCreateOptions
   */
  passwordPolicy?: ConnectionCreateOptionsPasswordPolicyEnum;
  /**
   *
   * @type {ConnectionCreateOptionsPasswordComplexityOptions}
   * @memberof ConnectionCreateOptions
   */
  password_complexity_options?: ConnectionCreateOptionsPasswordComplexityOptions | null;
  /**
   *
   * @type {ConnectionCreateOptionsPasswordHistory}
   * @memberof ConnectionCreateOptions
   */
  password_history?: ConnectionCreateOptionsPasswordHistory | null;
  /**
   *
   * @type {ConnectionCreateOptionsPasswordNoPersonalInfo}
   * @memberof ConnectionCreateOptions
   */
  password_no_personal_info?: ConnectionCreateOptionsPasswordNoPersonalInfo | null;
  /**
   *
   * @type {ConnectionCreateOptionsPasswordDictionary}
   * @memberof ConnectionCreateOptions
   */
  password_dictionary?: ConnectionCreateOptionsPasswordDictionary | null;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  api_enable_users?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  basic_profile?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  ext_admin?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  ext_is_suspended?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  ext_agreed_terms?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  ext_groups?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  ext_assigned_plans?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  ext_profile?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptions
   */
  disable_self_service_change_password?: boolean;
  /**
   * Options for adding parameters in the request to the upstream IdP
   * @type {{ [key: string]: any; }}
   * @memberof ConnectionCreateOptions
   */
  upstream_params?: { [key: string]: any } | null;
  /**
   * Determines whether the 'name', 'given_name', 'family_name', 'nickname', and 'picture' attributes can be independently updated when using an external IdP. Possible values are 'on_each_login' (default value, it configures the connection to automatically update the root attributes from the external IdP with each user login. When this setting is used, root attributes cannot be independently updated), 'on_first_login' (configures the connection to only set the root attributes on first login, allowing them to be independently updated thereafter)
   * @type {string}
   * @memberof ConnectionCreateOptions
   */
  set_user_root_attributes?: ConnectionCreateOptionsSetUserRootAttributesEnum;
  /**
   *
   * @type {ConnectionCreateOptionsGatewayAuthentication}
   * @memberof ConnectionCreateOptions
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
   *
   * @type {string}
   * @memberof ConnectionCreateOptionsCustomScripts
   */
  login?: string;
  /**
   *
   * @type {string}
   * @memberof ConnectionCreateOptionsCustomScripts
   */
  get_user?: string;
  /**
   *
   * @type {string}
   * @memberof ConnectionCreateOptionsCustomScripts
   */
  _delete?: string;
  /**
   *
   * @type {string}
   * @memberof ConnectionCreateOptionsCustomScripts
   */
  change_password?: string;
  /**
   *
   * @type {string}
   * @memberof ConnectionCreateOptionsCustomScripts
   */
  verify?: string;
  /**
   *
   * @type {string}
   * @memberof ConnectionCreateOptionsCustomScripts
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
   * @memberof ConnectionCreateOptionsGatewayAuthentication
   */
  method: string;
  /**
   * The subject to be added to the JWT payload.
   * @type {string}
   * @memberof ConnectionCreateOptionsGatewayAuthentication
   */
  subject?: string;
  /**
   * The audience to be added to the JWT payload.
   * @type {string}
   * @memberof ConnectionCreateOptionsGatewayAuthentication
   */
  audience: string;
  /**
   * The secret to be used for signing tokens.
   * @type {string}
   * @memberof ConnectionCreateOptionsGatewayAuthentication
   */
  secret: string;
  /**
   * Set to true if the provided secret is base64 encoded.
   * @type {boolean}
   * @memberof ConnectionCreateOptionsGatewayAuthentication
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
   * @memberof ConnectionCreateOptionsPasswordComplexityOptions
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
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptionsPasswordDictionary
   */
  enable: boolean;
  /**
   * Custom Password Dictionary. An array of up to 200 entries.
   * @type {Array<string>}
   * @memberof ConnectionCreateOptionsPasswordDictionary
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
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptionsPasswordHistory
   */
  enable: boolean;
  /**
   *
   * @type {number}
   * @memberof ConnectionCreateOptionsPasswordHistory
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
   *
   * @type {boolean}
   * @memberof ConnectionCreateOptionsPasswordNoPersonalInfo
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
   *
   * @type {ConnectionCreateOptionsValidationUsername}
   * @memberof ConnectionCreateOptionsValidation
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
   *
   * @type {number}
   * @memberof ConnectionCreateOptionsValidationUsername
   */
  min: number;
  /**
   *
   * @type {number}
   * @memberof ConnectionCreateOptionsValidationUsername
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
   * @memberof ConnectionUpdate
   */
  display_name?: string;
  /**
   *
   * @type {ConnectionUpdateOptions}
   * @memberof ConnectionUpdate
   */
  options?: ConnectionUpdateOptions | null;
  /**
   * The identifiers of the clients for which the connection is to be enabled. If the property is not specified, no clients are enabled. If the array is empty, the connection will be disabled for every client.
   * @type {Array<string>}
   * @memberof ConnectionUpdate
   */
  enabled_clients?: Array<string>;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdate
   */
  is_domain_connection?: boolean;
  /**
   * Defines the realms for which the connection will be used (ie: email domains). If the array is empty or the property is not specified, the connection name will be added as realm
   * @type {Array<string>}
   * @memberof ConnectionUpdate
   */
  realms?: Array<string>;
  /**
   * Metadata associated with the connection, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   * @memberof ConnectionUpdate
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
   *
   * @type {ConnectionCreateOptionsValidation}
   * @memberof ConnectionUpdateOptions
   */
  validation?: ConnectionCreateOptionsValidation | null;
  /**
   * An array of user fields that should not be stored in the Auth0 database (https://manage.local.dev.auth0.com/docs/security/data-security/denylist)
   * @type {Array<string>}
   * @memberof ConnectionUpdateOptions
   */
  non_persistent_attrs?: Array<string>;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  enable_script_context?: boolean;
  /**
   * Set to true to use a legacy user store
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  enabledDatabaseCustomization?: boolean;
  /**
   * Enable this if you have a legacy user store and you want to gradually migrate those users to the Auth0 user store
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  import_mode?: boolean;
  /**
   *
   * @type {ConnectionCreateOptionsCustomScripts}
   * @memberof ConnectionUpdateOptions
   */
  customScripts?: ConnectionCreateOptionsCustomScripts;
  /**
   * Password strength level
   * @type {string}
   * @memberof ConnectionUpdateOptions
   */
  passwordPolicy?: ConnectionUpdateOptionsPasswordPolicyEnum;
  /**
   *
   * @type {ConnectionCreateOptionsPasswordComplexityOptions}
   * @memberof ConnectionUpdateOptions
   */
  password_complexity_options?: ConnectionCreateOptionsPasswordComplexityOptions | null;
  /**
   *
   * @type {ConnectionCreateOptionsPasswordHistory}
   * @memberof ConnectionUpdateOptions
   */
  password_history?: ConnectionCreateOptionsPasswordHistory | null;
  /**
   *
   * @type {ConnectionCreateOptionsPasswordNoPersonalInfo}
   * @memberof ConnectionUpdateOptions
   */
  password_no_personal_info?: ConnectionCreateOptionsPasswordNoPersonalInfo | null;
  /**
   *
   * @type {ConnectionCreateOptionsPasswordDictionary}
   * @memberof ConnectionUpdateOptions
   */
  password_dictionary?: ConnectionCreateOptionsPasswordDictionary | null;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  api_enable_users?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  basic_profile?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  ext_admin?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  ext_is_suspended?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  ext_agreed_terms?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  ext_groups?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  ext_assigned_plans?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  ext_profile?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ConnectionUpdateOptions
   */
  disable_self_service_change_password?: boolean;
  /**
   * Options for adding parameters in the request to the upstream IdP
   * @type {{ [key: string]: any; }}
   * @memberof ConnectionUpdateOptions
   */
  upstream_params?: { [key: string]: any } | null;
  /**
   * Determines whether the 'name', 'given_name', 'family_name', 'nickname', and 'picture' attributes can be independently updated when using an external IdP. Possible values are 'on_each_login' (default value, it configures the connection to automatically update the root attributes from the external IdP with each user login. When this setting is used, root attributes cannot be independently updated), 'on_first_login' (configures the connection to only set the root attributes on first login, allowing them to be independently updated thereafter)
   * @type {string}
   * @memberof ConnectionUpdateOptions
   */
  set_user_root_attributes?: ConnectionUpdateOptionsSetUserRootAttributesEnum;
  /**
   *
   * @type {ConnectionCreateOptionsGatewayAuthentication}
   * @memberof ConnectionUpdateOptions
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
   * @memberof CustomDomain
   */
  custom_domain_id: string;
  /**
   * Domain name.
   * @type {string}
   * @memberof CustomDomain
   */
  domain: string;
  /**
   * Whether this is a primary domain (true) or not (false).
   * @type {boolean}
   * @memberof CustomDomain
   */
  primary: boolean;
  /**
   * Custom domain configuration status. Can be `disabled`, `pending`, `pending_verification`, or `ready`.
   * @type {string}
   * @memberof CustomDomain
   */
  status: CustomDomainStatusEnum;
  /**
   * Custom domain provisioning type. Can be `auth0_managed_certs` or `self_managed_certs`.
   * @type {string}
   * @memberof CustomDomain
   */
  type: CustomDomainTypeEnum;
  /**
   * Intermediate address.
   * @type {string}
   * @memberof CustomDomain
   */
  origin_domain_name?: string;
  /**
   *
   * @type {PostCustomDomains201ResponseVerification}
   * @memberof CustomDomain
   */
  verification?: PostCustomDomains201ResponseVerification;
  /**
   * The HTTP header to fetch the client's IP address
   * @type {string}
   * @memberof CustomDomain
   */
  custom_client_ip_header?: string | null;
  /**
   * The TLS version policy
   * @type {string}
   * @memberof CustomDomain
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
   * @memberof DeleteMembersRequest
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
   * @memberof DeleteOrganizationMemberRolesRequest
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
   * @memberof DeletePermissionsRequest
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
   * @memberof DeleteUserIdentityByUserId200ResponseInner
   */
  connection: string;
  /**
   * The unique identifier for the user for the identity.
   * @type {string}
   * @memberof DeleteUserIdentityByUserId200ResponseInner
   */
  user_id: string;
  /**
   * The type of identity provider.
   * @type {string}
   * @memberof DeleteUserIdentityByUserId200ResponseInner
   */
  provider: string;
  /**
   * <code>true</code> if the identity provider is a social provider, <code>false</code>s otherwise
   * @type {boolean}
   * @memberof DeleteUserIdentityByUserId200ResponseInner
   */
  isSocial?: boolean;
  /**
   * IDP access token returned only if scope read:user_idp_tokens is defined
   * @type {string}
   * @memberof DeleteUserIdentityByUserId200ResponseInner
   */
  access_token?: string;
  /**
   * IDP access token secret returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   * @memberof DeleteUserIdentityByUserId200ResponseInner
   */
  access_token_secret?: string;
  /**
   * IDP refresh token returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   * @memberof DeleteUserIdentityByUserId200ResponseInner
   */
  refresh_token?: string;
  /**
   *
   * @type {UserProfile}
   * @memberof DeleteUserIdentityByUserId200ResponseInner
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
   * @memberof DeleteUserRolesRequest
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
   * @memberof DeviceCredential
   */
  id?: string;
  /**
   * User agent for this device
   * @type {string}
   * @memberof DeviceCredential
   */
  device_name?: string;
  /**
   * Unique identifier for the device. NOTE: This field is generally not populated for refresh_tokens and rotating_refresh_tokens
   * @type {string}
   * @memberof DeviceCredential
   */
  device_id?: string;
  /**
   * Type of credential. Can be `public_key`, `refresh_token`, or `rotating_refresh_token`.
   * @type {string}
   * @memberof DeviceCredential
   */
  type?: DeviceCredentialTypeEnum;
  /**
   * user_id this credential is associated with.
   * @type {string}
   * @memberof DeviceCredential
   */
  user_id?: string;
  /**
   * client_id of the client (application) this credential is for.
   * @type {string}
   * @memberof DeviceCredential
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
   * @memberof DeviceCredentialCreate
   */
  device_name: string;
  /**
   * Type of credential. Must be `public_key`.
   * @type {string}
   * @memberof DeviceCredentialCreate
   */
  type: DeviceCredentialCreateTypeEnum;
  /**
   * Base64 encoded string containing the credential.
   * @type {string}
   * @memberof DeviceCredentialCreate
   */
  value: string;
  /**
   * Unique identifier for the device. Recommend using <a href="http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID">Android_ID</a> on Android and <a href="https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIDevice_Class/index.html#//apple_ref/occ/instp/UIDevice/identifierForVendor">identifierForVendor</a>.
   * @type {string}
   * @memberof DeviceCredentialCreate
   */
  device_id: string;
  /**
   * client_id of the client (application) this credential is for.
   * @type {string}
   * @memberof DeviceCredentialCreate
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
   * @memberof DraftUpdate
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
   * @memberof EmailProvider
   */
  name?: string;
  /**
   * Whether the provider is enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof EmailProvider
   */
  enabled?: boolean;
  /**
   * Email address to use as "from" when no other address specified.
   * @type {string}
   * @memberof EmailProvider
   */
  default_from_address?: string;
  /**
   *
   * @type {EmailProviderCredentials}
   * @memberof EmailProvider
   */
  credentials?: EmailProviderCredentials;
  /**
   * Specific provider setting
   * @type {{ [key: string]: any; }}
   * @memberof EmailProvider
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
   * @memberof EmailProviderCredentials
   */
  api_user?: string;
  /**
   * AWS or SparkPost region.
   * @type {string}
   * @memberof EmailProviderCredentials
   */
  region?: string;
  /**
   * SMTP host.
   * @type {string}
   * @memberof EmailProviderCredentials
   */
  smtp_host?: string;
  /**
   * SMTP port.
   * @type {number}
   * @memberof EmailProviderCredentials
   */
  smtp_port?: number;
  /**
   * SMTP username.
   * @type {string}
   * @memberof EmailProviderCredentials
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
   * @memberof EmailTemplateUpdate
   */
  template: EmailTemplateUpdateTemplateEnum;
  /**
   * Body of the email template.
   * @type {string}
   * @memberof EmailTemplateUpdate
   */
  body: string | null;
  /**
   * Senders `from` email address.
   * @type {string}
   * @memberof EmailTemplateUpdate
   */
  from: string | null;
  /**
   * URL to redirect the user to after a successful action.
   * @type {string}
   * @memberof EmailTemplateUpdate
   */
  resultUrl?: string | null;
  /**
   * Subject line of the email.
   * @type {string}
   * @memberof EmailTemplateUpdate
   */
  subject: string | null;
  /**
   * Syntax of the template body.
   * @type {string}
   * @memberof EmailTemplateUpdate
   */
  syntax: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   * @type {number}
   * @memberof EmailTemplateUpdate
   */
  urlLifetimeInSeconds?: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   * @type {boolean}
   * @memberof EmailTemplateUpdate
   */
  includeEmailInRedirect?: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof EmailTemplateUpdate
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
   * @memberof Enrollment
   */
  id: string;
  /**
   * Status of this enrollment. Can be `pending` or `confirmed`.
   * @type {string}
   * @memberof Enrollment
   */
  status?: EnrollmentStatusEnum;
  /**
   * Device name (only for push notification).
   * @type {string}
   * @memberof Enrollment
   */
  name?: string;
  /**
   * Device identifier. This is usually the phone identifier.
   * @type {string}
   * @memberof Enrollment
   */
  identifier?: string;
  /**
   * Phone number.
   * @type {string}
   * @memberof Enrollment
   */
  phone_number?: string;
  /**
   *
   * @type {EnrollmentEnrolledAt}
   * @memberof Enrollment
   */
  enrolled_at?: EnrollmentEnrolledAt;
  /**
   *
   * @type {EnrollmentLastAuth}
   * @memberof Enrollment
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
   * @memberof EnrollmentCreate
   */
  user_id: string;
  /**
   * alternate email to which the enrollment email will be sent. Optional - by default, the email will be sent to the user's default address
   * @type {string}
   * @memberof EnrollmentCreate
   */
  email?: string;
  /**
   * Send an email to the user to start the enrollment
   * @type {boolean}
   * @memberof EnrollmentCreate
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
   * @memberof Factor
   */
  enabled: boolean;
  /**
   * Whether trial limits have been exceeded.
   * @type {boolean}
   * @memberof Factor
   */
  trial_expired?: boolean;
  /**
   * Factor name. Can be `sms`, `push-notification`, `email`, `duo` `otp` `webauthn-roaming`, `webauthn-platform`, or `recovery-code`.
   * @type {string}
   * @memberof Factor
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
   * @memberof GetActionVersions200Response
   */
  total?: number;
  /**
   * Page index of the results being returned. First page is 0.
   * @type {number}
   * @memberof GetActionVersions200Response
   */
  page?: number;
  /**
   * Number of results per page. Paging is disabled if parameter not sent.
   * @type {number}
   * @memberof GetActionVersions200Response
   */
  per_page?: number;
  /**
   *
   * @type {Array<GetActionVersions200ResponseVersionsInner>}
   * @memberof GetActionVersions200Response
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
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  id?: string;
  /**
   * The id of the action to which this version belongs.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  action_id?: string;
  /**
   * The source code of this specific version of the action.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this specific version depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * Indicates if this speciic version is the currently one deployed.
   * @type {boolean}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  deployed?: boolean;
  /**
   * The Node runtime. For example: `node12`
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<GetActions200ResponseActionsInnerSecretsInner>}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  secrets?: Array<GetActions200ResponseActionsInnerSecretsInner>;
  /**
   * The build status of this specific version.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  status?: GetActionVersions200ResponseVersionsInnerStatusEnum;
  /**
   * The index of this version in list of versions for the action.
   * @type {number}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  number?: number;
  /**
   * Any errors that occurred while the version was being built.
   * @type {Array<GetActionVersions200ResponseVersionsInnerErrorsInner>}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  errors?: Array<GetActionVersions200ResponseVersionsInnerErrorsInner>;
  /**
   *
   * @type {GetActionVersions200ResponseVersionsInnerAction}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  action?: GetActionVersions200ResponseVersionsInnerAction;
  /**
   * The time when this version was built successfully.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  built_at?: string;
  /**
   * The time when this version was created.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  created_at?: string;
  /**
   * The time when a version was updated. Versions are never updated externally. Only Auth0 will update an action version as it is beiing built.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInner
   */
  updated_at?: string;
  /**
   * The list of triggers that this version supports. At this time, a version can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   * @memberof GetActionVersions200ResponseVersionsInner
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
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  id?: string;
  /**
   * The name of an action.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  name?: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  supported_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<GetActions200ResponseActionsInnerSecretsInner>}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  secrets?: Array<GetActions200ResponseActionsInnerSecretsInner>;
  /**
   * The version of the action that is currently deployed.
   * @type {{ [key: string]: any; }}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  deployed_version?: { [key: string]: any };
  /**
   * installed_integration_id is the fk reference to the InstalledIntegration entity.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  installed_integration_id?: string;
  /**
   *
   * @type {GetActions200ResponseActionsInnerIntegration}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  integration?: GetActions200ResponseActionsInnerIntegration;
  /**
   * The build status of this action.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  status?: GetActionVersions200ResponseVersionsInnerActionStatusEnum;
  /**
   * True if all of an Action's contents have been deployed.
   * @type {boolean}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  all_changes_deployed?: boolean;
  /**
   * The time when this action was built successfully.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  built_at?: string;
  /**
   * The time when this action was created.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
   */
  created_at?: string;
  /**
   * The time when this action was updated.
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerAction
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
   *
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerErrorsInner
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerErrorsInner
   */
  msg?: string;
  /**
   *
   * @type {string}
   * @memberof GetActionVersions200ResponseVersionsInnerErrorsInner
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
   * @memberof GetActions200Response
   */
  total?: number;
  /**
   * Page index of the results being returned. First page is 0.
   * @type {number}
   * @memberof GetActions200Response
   */
  page?: number;
  /**
   * Number of results per page.
   * @type {number}
   * @memberof GetActions200Response
   */
  per_page?: number;
  /**
   * The list of actions.
   * @type {Array<GetActions200ResponseActionsInner>}
   * @memberof GetActions200Response
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
   * @memberof GetActions200ResponseActionsInner
   */
  id?: string;
  /**
   * The name of an action.
   * @type {string}
   * @memberof GetActions200ResponseActionsInner
   */
  name?: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   * @memberof GetActions200ResponseActionsInner
   */
  supported_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   * @type {string}
   * @memberof GetActions200ResponseActionsInner
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   * @memberof GetActions200ResponseActionsInner
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   * @type {string}
   * @memberof GetActions200ResponseActionsInner
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<GetActions200ResponseActionsInnerSecretsInner>}
   * @memberof GetActions200ResponseActionsInner
   */
  secrets?: Array<GetActions200ResponseActionsInnerSecretsInner>;
  /**
   * The version of the action that is currently deployed.
   * @type {{ [key: string]: any; }}
   * @memberof GetActions200ResponseActionsInner
   */
  deployed_version?: { [key: string]: any };
  /**
   * installed_integration_id is the fk reference to the InstalledIntegration entity.
   * @type {string}
   * @memberof GetActions200ResponseActionsInner
   */
  installed_integration_id?: string;
  /**
   *
   * @type {GetActions200ResponseActionsInnerIntegration}
   * @memberof GetActions200ResponseActionsInner
   */
  integration?: GetActions200ResponseActionsInnerIntegration;
  /**
   * The build status of this action.
   * @type {string}
   * @memberof GetActions200ResponseActionsInner
   */
  status?: GetActions200ResponseActionsInnerStatusEnum;
  /**
   * True if all of an Action's contents have been deployed.
   * @type {boolean}
   * @memberof GetActions200ResponseActionsInner
   */
  all_changes_deployed?: boolean;
  /**
   * The time when this action was built successfully.
   * @type {string}
   * @memberof GetActions200ResponseActionsInner
   */
  built_at?: string;
  /**
   * The time when this action was created.
   * @type {string}
   * @memberof GetActions200ResponseActionsInner
   */
  created_at?: string;
  /**
   * The time when this action was updated.
   * @type {string}
   * @memberof GetActions200ResponseActionsInner
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
   * @memberof GetActions200ResponseActionsInnerDependenciesInner
   */
  name?: string;
  /**
   * description is the version of the npm module, e.g. 4.17.1
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerDependenciesInner
   */
  version?: string;
  /**
   * registry_url is an optional value used primarily for private npm registries.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerDependenciesInner
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
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  id?: string;
  /**
   * catalog_id refers to the ID in the marketplace catalog
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  catalog_id?: string;
  /**
   * url_slug refers to the url_slug in the marketplace catalog
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  url_slug?: string;
  /**
   * partner_id is the foreign key reference to the partner account this<br/>integration belongs to.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  partner_id?: string;
  /**
   * name is the integration name, which will be used for display purposes in<br/>the marketplace.<br/><br/>To start we're going to make sure the display name is at least 3<br/>characters. Can adjust this easily later.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  name?: string;
  /**
   * description adds more text for the integration name -- also relevant for<br/>the marketplace listing.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  description?: string;
  /**
   * short_description is the brief description of the integration, which is used for display purposes in cards
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  short_description?: string;
  /**
   *
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  logo?: string;
  /**
   * feature_type is the type of the integration.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  feature_type?: GetActions200ResponseActionsInnerIntegrationFeatureTypeEnum;
  /**
   *
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  terms_of_use_url?: string;
  /**
   *
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  privacy_policy_url?: string;
  /**
   *
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  public_support_link?: string;
  /**
   *
   * @type {GetActions200ResponseActionsInnerIntegrationCurrentRelease}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  current_release?: GetActions200ResponseActionsInnerIntegrationCurrentRelease;
  /**
   *
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
   */
  created_at?: string;
  /**
   *
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegration
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
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentRelease
   */
  id?: string;
  /**
   *
   * @type {GetActions200ResponseActionsInnerSupportedTriggersInner}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentRelease
   */
  trigger?: GetActions200ResponseActionsInnerSupportedTriggersInner;
  /**
   *
   * @type {GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentRelease
   */
  semver?: GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver;
  /**
   * required_secrets declares all the necessary secrets for an integration to<br/>work.
   * @type {Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner>}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentRelease
   */
  required_secrets?: Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner>;
  /**
   * required_configuration declares all the necessary configuration fields for an integration to work.
   * @type {Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner>}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentRelease
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
   *
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
   */
  type?: GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerTypeEnum;
  /**
   * The name of the parameter.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
   */
  name?: string;
  /**
   * The flag for if this parameter is required.
   * @type {boolean}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
   */
  required?: boolean;
  /**
   * The temp flag for if this parameter is required (experimental; for Labs use only).
   * @type {boolean}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
   */
  optional?: boolean;
  /**
   * The short label for this parameter.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
   */
  label?: string;
  /**
   * The lengthier description for this parameter.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
   */
  description?: string;
  /**
   * The default value for this parameter.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
   */
  default_value?: string;
  /**
   * Placeholder text for this parameter.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
   */
  placeholder?: string;
  /**
   * The allowable options for this param.
   * @type {Array<GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerOptionsInner>}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInner
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
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerOptionsInner
   */
  value?: string;
  /**
   * The display value of an option suitable for displaying in a UI.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseRequiredSecretsInnerOptionsInner
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
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver
   */
  major?: number;
  /**
   * Minior is the minior number of a semver
   * @type {number}
   * @memberof GetActions200ResponseActionsInnerIntegrationCurrentReleaseSemver
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
   * @memberof GetActions200ResponseActionsInnerSecretsInner
   */
  name?: string;
  /**
   * The time when the secret was last updated.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerSecretsInner
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
   * @memberof GetActions200ResponseActionsInnerSupportedTriggersInner
   */
  id: GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum;
  /**
   * The version of a trigger. v1, v2, etc.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerSupportedTriggersInner
   */
  version?: string;
  /**
   * status points to the trigger status.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerSupportedTriggersInner
   */
  status?: string;
  /**
   * runtimes supported by this trigger.
   * @type {Array<string>}
   * @memberof GetActions200ResponseActionsInnerSupportedTriggersInner
   */
  runtimes?: Array<string>;
  /**
   * Runtime that will be used when none is specified when creating an action.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerSupportedTriggersInner
   */
  default_runtime?: string;
  /**
   * compatible_triggers informs which other trigger supports the same event and api.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInner>}
   * @memberof GetActions200ResponseActionsInnerSupportedTriggersInner
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
   * @memberof GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInner
   */
  id: GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInnerIdEnum;
  /**
   * The version of a trigger. v1, v2, etc.
   * @type {string}
   * @memberof GetActions200ResponseActionsInnerSupportedTriggersInnerCompatibleTriggersInner
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
   *
   * @type {string}
   * @memberof GetApns200Response
   */
  bundle_id?: string | null;
  /**
   *
   * @type {boolean}
   * @memberof GetApns200Response
   */
  sandbox?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof GetApns200Response
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
   * @memberof GetAuthenticationMethods200ResponseOneOf
   */
  start?: number;
  /**
   * Maximum amount of records to return.
   * @type {number}
   * @memberof GetAuthenticationMethods200ResponseOneOf
   */
  limit?: number;
  /**
   * Total number of pageable records.
   * @type {number}
   * @memberof GetAuthenticationMethods200ResponseOneOf
   */
  total?: number;
  /**
   * The paginated authentication methods. Returned in this structure when include_totals is true.
   * @type {Array<GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner>}
   * @memberof GetAuthenticationMethods200ResponseOneOf
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
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  type: GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerTypeEnum;
  /**
   * The authentication method status
   * @type {boolean}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  confirmed?: boolean;
  /**
   * A human-readable label to identify the authentication method
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  name?: string;
  /**
   *
   * @type {Array<GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInner>}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  authentication_methods?: Array<GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInner>;
  /**
   * The authentication method preferred for phone authenticators.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  preferred_authentication_method?: string;
  /**
   * The ID of a linked authentication method. Linked authentication methods will be deleted together.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  link_id?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  phone_number?: string;
  /**
   * Applies to email and email-verification authentication methods only. The email address used to send verification messages.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  email?: string;
  /**
   * Applies to webauthn authentication methods only. The ID of the generated credential.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  key_id?: string;
  /**
   * Applies to webauthn authentication methods only. The public key.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  public_key?: string;
  /**
   * Authenticator creation date
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  created_at: string;
  /**
   * Enrollment date
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
   */
  enrolled_at?: string;
  /**
   * Last authentication
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInner
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
   *
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInner
   */
  type?: GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInnerTypeEnum;
  /**
   *
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfAuthenticatorsInnerAuthenticationMethodsInner
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
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  id: string;
  /**
   * Enrollment type
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  type: GetAuthenticationMethods200ResponseOneOfInnerTypeEnum;
  /**
   * Enrollment status
   * @type {boolean}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  confirmed?: boolean;
  /**
   * A human-readable label to identify the authenticator
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  name?: string;
  /**
   * Indicates the authenticator is linked to another authenticator
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  link_id?: string;
  /**
   * Applies to phone authenticators only. The destination phone number used to text and call.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  phone_number?: string;
  /**
   * Applies to email authenticators only. The email address used to send verification messages.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  email?: string;
  /**
   * Applies to webauthn authenticators only. The ID of the generated credential.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  key_id?: string;
  /**
   * Applies to webauthn authenticators only. The public key.
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  public_key?: string;
  /**
   * Authenticator creation date
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  created_at: string;
  /**
   * Enrollment date
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
   */
  enrolled_at?: string;
  /**
   * Last authentication
   * @type {string}
   * @memberof GetAuthenticationMethods200ResponseOneOfInner
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
   * @memberof GetBindings200Response
   */
  total?: number;
  /**
   * Page index of the results being returned. First page is 0.
   * @type {number}
   * @memberof GetBindings200Response
   */
  page?: number;
  /**
   * Number of results per page.
   * @type {number}
   * @memberof GetBindings200Response
   */
  per_page?: number;
  /**
   * The list of actions that are bound to this trigger in the order in which they will be executed.
   * @type {Array<GetBindings200ResponseBindingsInner>}
   * @memberof GetBindings200Response
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
   * @memberof GetBindings200ResponseBindingsInner
   */
  id?: string;
  /**
   * An actions extensibility point.
   * @type {string}
   * @memberof GetBindings200ResponseBindingsInner
   */
  trigger_id?: GetBindings200ResponseBindingsInnerTriggerIdEnum;
  /**
   * The name of the binding.
   * @type {string}
   * @memberof GetBindings200ResponseBindingsInner
   */
  display_name?: string;
  /**
   *
   * @type {GetActions200ResponseActionsInner}
   * @memberof GetBindings200ResponseBindingsInner
   */
  action?: GetActions200ResponseActionsInner;
  /**
   * The time when the binding was created.
   * @type {string}
   * @memberof GetBindings200ResponseBindingsInner
   */
  created_at?: string;
  /**
   * The time when the binding was updated.
   * @type {string}
   * @memberof GetBindings200ResponseBindingsInner
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
   *
   * @type {GetBranding200ResponseColors}
   * @memberof GetBranding200Response
   */
  colors?: GetBranding200ResponseColors;
  /**
   * URL for the favicon. Must use HTTPS.
   * @type {string}
   * @memberof GetBranding200Response
   */
  favicon_url?: string;
  /**
   * URL for the logo. Must use HTTPS.
   * @type {string}
   * @memberof GetBranding200Response
   */
  logo_url?: string;
  /**
   *
   * @type {GetBranding200ResponseFont}
   * @memberof GetBranding200Response
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
   * @memberof GetBranding200ResponseColors
   */
  primary?: string;
  /**
   *
   * @type {GetBranding200ResponseColorsPageBackground}
   * @memberof GetBranding200ResponseColors
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
   * @memberof GetBranding200ResponseFont
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
   *
   * @type {number}
   * @memberof GetClientGrants200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetClientGrants200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetClientGrants200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<ClientGrant>}
   * @memberof GetClientGrants200ResponseOneOf
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
   *
   * @type {number}
   * @memberof GetConnections200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetConnections200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetConnections200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<Connection>}
   * @memberof GetConnections200ResponseOneOf
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
   *
   * @type {number}
   * @memberof GetDeviceCredentials200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetDeviceCredentials200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetDeviceCredentials200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<DeviceCredential>}
   * @memberof GetDeviceCredentials200ResponseOneOf
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
   * @memberof GetEmailTemplatesByTemplateName200Response
   */
  template?: GetEmailTemplatesByTemplateName200ResponseTemplateEnum;
  /**
   * Body of the email template.
   * @type {string}
   * @memberof GetEmailTemplatesByTemplateName200Response
   */
  body?: string | null;
  /**
   * Senders `from` email address.
   * @type {string}
   * @memberof GetEmailTemplatesByTemplateName200Response
   */
  from?: string | null;
  /**
   * URL to redirect the user to after a successful action.
   * @type {string}
   * @memberof GetEmailTemplatesByTemplateName200Response
   */
  resultUrl?: string | null;
  /**
   * Subject line of the email.
   * @type {string}
   * @memberof GetEmailTemplatesByTemplateName200Response
   */
  subject?: string | null;
  /**
   * Syntax of the template body.
   * @type {string}
   * @memberof GetEmailTemplatesByTemplateName200Response
   */
  syntax?: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   * @type {number}
   * @memberof GetEmailTemplatesByTemplateName200Response
   */
  urlLifetimeInSeconds?: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   * @type {boolean}
   * @memberof GetEmailTemplatesByTemplateName200Response
   */
  includeEmailInRedirect?: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof GetEmailTemplatesByTemplateName200Response
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
   *
   * @type {number}
   * @memberof GetEnabledConnections200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetEnabledConnections200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetEnabledConnections200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<GetEnabledConnections200ResponseOneOfInner>}
   * @memberof GetEnabledConnections200ResponseOneOf
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
   * @memberof GetEnabledConnections200ResponseOneOfInner
   */
  connection_id?: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   * @type {boolean}
   * @memberof GetEnabledConnections200ResponseOneOfInner
   */
  assign_membership_on_login?: boolean;
  /**
   *
   * @type {GetEnabledConnections200ResponseOneOfInnerConnection}
   * @memberof GetEnabledConnections200ResponseOneOfInner
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
   * @memberof GetEnabledConnections200ResponseOneOfInnerConnection
   */
  name?: string;
  /**
   * The strategy of the enabled connection.
   * @type {string}
   * @memberof GetEnabledConnections200ResponseOneOfInnerConnection
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
   * @memberof GetErrors200ResponseOneOfInner
   */
  user?: { [key: string]: any };
  /**
   * Errors importing the user.
   * @type {Array<GetErrors200ResponseOneOfInnerErrorsInner>}
   * @memberof GetErrors200ResponseOneOfInner
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
   * @memberof GetErrors200ResponseOneOfInnerErrorsInner
   */
  code?: string;
  /**
   * Error message.
   * @type {string}
   * @memberof GetErrors200ResponseOneOfInnerErrorsInner
   */
  message?: string;
  /**
   * Error field.
   * @type {string}
   * @memberof GetErrors200ResponseOneOfInnerErrorsInner
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
   * @memberof GetExecution200Response
   */
  id?: string;
  /**
   * An actions extensibility point.
   * @type {string}
   * @memberof GetExecution200Response
   */
  trigger_id?: GetExecution200ResponseTriggerIdEnum;
  /**
   * The overall status of an execution.
   * @type {string}
   * @memberof GetExecution200Response
   */
  status?: GetExecution200ResponseStatusEnum;
  /**
   *
   * @type {Array<GetExecution200ResponseResultsInner>}
   * @memberof GetExecution200Response
   */
  results?: Array<GetExecution200ResponseResultsInner>;
  /**
   * The time that the execution was started.
   * @type {string}
   * @memberof GetExecution200Response
   */
  created_at?: string;
  /**
   * The time that the exeution finished executing.
   * @type {string}
   * @memberof GetExecution200Response
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
   * @memberof GetExecution200ResponseResultsInner
   */
  action_name?: string;
  /**
   *
   * @type {GetActionVersions200ResponseVersionsInnerErrorsInner}
   * @memberof GetExecution200ResponseResultsInner
   */
  error?: GetActionVersions200ResponseVersionsInnerErrorsInner;
  /**
   * The time when the action was started.
   * @type {string}
   * @memberof GetExecution200ResponseResultsInner
   */
  started_at?: string;
  /**
   * The time when the action finished executing.
   * @type {string}
   * @memberof GetExecution200ResponseResultsInner
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
   *
   * @type {number}
   * @memberof GetGrants200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetGrants200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetGrants200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<UserGrant>}
   * @memberof GetGrants200ResponseOneOf
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
   *
   * @type {number}
   * @memberof GetHooks200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetHooks200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetHooks200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<Hook>}
   * @memberof GetHooks200ResponseOneOf
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
   *
   * @type {number}
   * @memberof GetInvitations200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetInvitations200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {Array<GetInvitations200ResponseOneOfInner>}
   * @memberof GetInvitations200ResponseOneOf
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
   * @memberof GetInvitations200ResponseOneOfInner
   */
  id?: string;
  /**
   * Organization identifier
   * @type {string}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  organization_id?: string;
  /**
   *
   * @type {GetInvitations200ResponseOneOfInnerInviter}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  inviter?: GetInvitations200ResponseOneOfInnerInviter;
  /**
   *
   * @type {GetInvitations200ResponseOneOfInnerInvitee}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  invitee?: GetInvitations200ResponseOneOfInnerInvitee;
  /**
   * The invitation url to be send to the invitee.
   * @type {string}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  invitation_url?: string;
  /**
   * The ISO 8601 formatted timestamp representing the creation time of the invitation.
   * @type {string}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  created_at?: string;
  /**
   * The ISO 8601 formatted timestamp representing the expiration time of the invitation.
   * @type {string}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  expires_at?: string;
  /**
   * Auth0 client ID. Used to resolve the application's login initiation endpoint.
   * @type {string}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  client_id?: string;
  /**
   * The id of the connection to force invitee to authenticate with.
   * @type {string}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  connection_id?: string;
  /**
   *
   * @type {GetInvitations200ResponseOneOfInnerAppMetadata}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  app_metadata?: GetInvitations200ResponseOneOfInnerAppMetadata;
  /**
   * Data related to the user that does not affect the application's core functionality.
   * @type {{ [key: string]: any; }}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  user_metadata?: { [key: string]: any };
  /**
   * List of roles IDs to associated with the user.
   * @type {Array<string>}
   * @memberof GetInvitations200ResponseOneOfInner
   */
  roles?: Array<string>;
  /**
   * The id of the invitation ticket
   * @type {string}
   * @memberof GetInvitations200ResponseOneOfInner
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
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  clientID?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  globalClientID?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  global_client_id?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  email_verified?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  user_id?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  identities?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  lastIP?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  lastLogin?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  metadata?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  created_at?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  loginsCount?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  _id?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  email?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  blocked?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
   */
  __tenant?: any | null;
  /**
   *
   * @type {any}
   * @memberof GetInvitations200ResponseOneOfInnerAppMetadata
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
   * @memberof GetInvitations200ResponseOneOfInnerInvitee
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
   * @memberof GetInvitations200ResponseOneOfInnerInviter
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
   * @memberof GetLogStreams200ResponseInnerOneOf
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf
   */
  status?: GetLogStreams200ResponseInnerOneOfStatusEnum;
  /**
   *
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf
   */
  type?: GetLogStreams200ResponseInnerOneOfTypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof GetLogStreams200ResponseInnerOneOf
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOfSink}
   * @memberof GetLogStreams200ResponseInnerOneOf
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
   * @memberof GetLogStreams200ResponseInnerOneOf1
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf1
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf1
   */
  status?: GetLogStreams200ResponseInnerOneOf1StatusEnum;
  /**
   *
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf1
   */
  type?: GetLogStreams200ResponseInnerOneOf1TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof GetLogStreams200ResponseInnerOneOf1
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf1Sink}
   * @memberof GetLogStreams200ResponseInnerOneOf1
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
   * @memberof GetLogStreams200ResponseInnerOneOf1Sink
   */
  awsAccountId: string;
  /**
   * The region in which the EventBridge event source will be created
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf1Sink
   */
  awsRegion: GetLogStreams200ResponseInnerOneOf1SinkAwsRegionEnum;
  /**
   * AWS EventBridge partner event source
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf1Sink
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
   * @memberof GetLogStreams200ResponseInnerOneOf2
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf2
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf2
   */
  status?: GetLogStreams200ResponseInnerOneOf2StatusEnum;
  /**
   *
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf2
   */
  type?: GetLogStreams200ResponseInnerOneOf2TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof GetLogStreams200ResponseInnerOneOf2
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf2Sink}
   * @memberof GetLogStreams200ResponseInnerOneOf2
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
   * @memberof GetLogStreams200ResponseInnerOneOf2Sink
   */
  azureSubscriptionId: string;
  /**
   * Azure Region Name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf2Sink
   */
  azureRegion: GetLogStreams200ResponseInnerOneOf2SinkAzureRegionEnum;
  /**
   * Resource Group
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf2Sink
   */
  azureResourceGroup: string;
  /**
   * Partner Topic
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf2Sink
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
   * @memberof GetLogStreams200ResponseInnerOneOf3
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf3
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf3
   */
  status?: GetLogStreams200ResponseInnerOneOf3StatusEnum;
  /**
   *
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf3
   */
  type?: GetLogStreams200ResponseInnerOneOf3TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof GetLogStreams200ResponseInnerOneOf3
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf3Sink}
   * @memberof GetLogStreams200ResponseInnerOneOf3
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
   * @memberof GetLogStreams200ResponseInnerOneOf3Sink
   */
  datadogApiKey: string;
  /**
   * Datadog region
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf3Sink
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
   * @memberof GetLogStreams200ResponseInnerOneOf4
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf4
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf4
   */
  status?: GetLogStreams200ResponseInnerOneOf4StatusEnum;
  /**
   *
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf4
   */
  type?: GetLogStreams200ResponseInnerOneOf4TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof GetLogStreams200ResponseInnerOneOf4
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf4Sink}
   * @memberof GetLogStreams200ResponseInnerOneOf4
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
   * @memberof GetLogStreams200ResponseInnerOneOf4Sink
   */
  splunkDomain: string;
  /**
   * Port
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf4Sink
   */
  splunkPort: string;
  /**
   * Splunk token
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf4Sink
   */
  splunkToken: string;
  /**
   * Verify TLS certificate
   * @type {boolean}
   * @memberof GetLogStreams200ResponseInnerOneOf4Sink
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
   * @memberof GetLogStreams200ResponseInnerOneOf5
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf5
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf5
   */
  status?: GetLogStreams200ResponseInnerOneOf5StatusEnum;
  /**
   *
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf5
   */
  type?: GetLogStreams200ResponseInnerOneOf5TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof GetLogStreams200ResponseInnerOneOf5
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf5Sink}
   * @memberof GetLogStreams200ResponseInnerOneOf5
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
   * @memberof GetLogStreams200ResponseInnerOneOf5Sink
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
   * @memberof GetLogStreams200ResponseInnerOneOf6
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf6
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf6
   */
  status?: GetLogStreams200ResponseInnerOneOf6StatusEnum;
  /**
   *
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf6
   */
  type?: GetLogStreams200ResponseInnerOneOf6TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof GetLogStreams200ResponseInnerOneOf6
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf6Sink}
   * @memberof GetLogStreams200ResponseInnerOneOf6
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
   * @memberof GetLogStreams200ResponseInnerOneOf6Sink
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
   * @memberof GetLogStreams200ResponseInnerOneOf7
   */
  id?: string;
  /**
   * log stream name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf7
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf7
   */
  status?: GetLogStreams200ResponseInnerOneOf7StatusEnum;
  /**
   *
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf7
   */
  type?: GetLogStreams200ResponseInnerOneOf7TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof GetLogStreams200ResponseInnerOneOf7
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf7Sink}
   * @memberof GetLogStreams200ResponseInnerOneOf7
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
   * @memberof GetLogStreams200ResponseInnerOneOf7Sink
   */
  mixpanelRegion: GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum;
  /**
   * Mixpanel Project Id
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf7Sink
   */
  mixpanelProjectId: string;
  /**
   * Mixpanel Service Account Username
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf7Sink
   */
  mixpanelServiceAccountUsername: string;
  /**
   * Mixpanel Service Account Password
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOf7Sink
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
   * @memberof GetLogStreams200ResponseInnerOneOfFiltersInner
   */
  type?: GetLogStreams200ResponseInnerOneOfFiltersInnerTypeEnum;
  /**
   * Category group name
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOfFiltersInner
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
   * @memberof GetLogStreams200ResponseInnerOneOfSink
   */
  httpAuthorization?: string;
  /**
   * HTTP JSON format
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOfSink
   */
  httpContentFormat?: GetLogStreams200ResponseInnerOneOfSinkHttpContentFormatEnum;
  /**
   * HTTP Content-Type header
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOfSink
   */
  httpContentType?: string;
  /**
   * HTTP endpoint
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOfSink
   */
  httpEndpoint: string;
  /**
   * custom HTTP headers
   * @type {Array<GetLogStreams200ResponseInnerOneOfSinkHttpCustomHeadersInner>}
   * @memberof GetLogStreams200ResponseInnerOneOfSink
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
   * @memberof GetLogStreams200ResponseInnerOneOfSinkHttpCustomHeadersInner
   */
  header?: string;
  /**
   * HTTP header value
   * @type {string}
   * @memberof GetLogStreams200ResponseInnerOneOfSinkHttpCustomHeadersInner
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
   *
   * @type {number}
   * @memberof GetLogs200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetLogs200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetLogs200ResponseOneOf
   */
  length?: number;
  /**
   *
   * @type {number}
   * @memberof GetLogs200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<Log>}
   * @memberof GetLogs200ResponseOneOf
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
   *
   * @type {number}
   * @memberof GetMembers200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetMembers200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetMembers200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<GetMembers200ResponseOneOfInner>}
   * @memberof GetMembers200ResponseOneOf
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
   *
   * @type {string}
   * @memberof GetMembers200ResponseOneOf1
   */
  next?: string;
  /**
   *
   * @type {Array<GetMembers200ResponseOneOfInner>}
   * @memberof GetMembers200ResponseOneOf1
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
   * @memberof GetMembers200ResponseOneOfInner
   */
  user_id?: string;
  /**
   * URL to a picture for this user.
   * @type {string}
   * @memberof GetMembers200ResponseOneOfInner
   */
  picture?: string;
  /**
   * Name of this user.
   * @type {string}
   * @memberof GetMembers200ResponseOneOfInner
   */
  name?: string;
  /**
   * Email address of this user.
   * @type {string}
   * @memberof GetMembers200ResponseOneOfInner
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
   * @memberof GetMessageTypes200Response
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
   *
   * @type {number}
   * @memberof GetOrganizationMemberRoles200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetOrganizationMemberRoles200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetOrganizationMemberRoles200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<GetOrganizationMemberRoles200ResponseOneOfInner>}
   * @memberof GetOrganizationMemberRoles200ResponseOneOf
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
   * @memberof GetOrganizationMemberRoles200ResponseOneOfInner
   */
  id?: string;
  /**
   * Name of the role.
   * @type {string}
   * @memberof GetOrganizationMemberRoles200ResponseOneOfInner
   */
  name?: string;
  /**
   * Description of the role.
   * @type {string}
   * @memberof GetOrganizationMemberRoles200ResponseOneOfInner
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
   *
   * @type {number}
   * @memberof GetOrganizations200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetOrganizations200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetOrganizations200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<GetOrganizations200ResponseOneOfInner>}
   * @memberof GetOrganizations200ResponseOneOf
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
   *
   * @type {string}
   * @memberof GetOrganizations200ResponseOneOf1
   */
  next?: string;
  /**
   *
   * @type {Array<GetOrganizations200ResponseOneOfInner>}
   * @memberof GetOrganizations200ResponseOneOf1
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
   * @memberof GetOrganizations200ResponseOneOfInner
   */
  id?: string;
  /**
   * The name of this organization.
   * @type {string}
   * @memberof GetOrganizations200ResponseOneOfInner
   */
  name?: string;
  /**
   * Friendly name of this organization.
   * @type {string}
   * @memberof GetOrganizations200ResponseOneOfInner
   */
  display_name?: string;
  /**
   *
   * @type {GetOrganizations200ResponseOneOfInnerBranding}
   * @memberof GetOrganizations200ResponseOneOfInner
   */
  branding?: GetOrganizations200ResponseOneOfInnerBranding;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   * @memberof GetOrganizations200ResponseOneOfInner
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
   * @memberof GetOrganizations200ResponseOneOfInnerBranding
   */
  logo_url?: string;
  /**
   *
   * @type {GetOrganizations200ResponseOneOfInnerBrandingColors}
   * @memberof GetOrganizations200ResponseOneOfInnerBranding
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
   * @memberof GetOrganizations200ResponseOneOfInnerBrandingColors
   */
  primary: string;
  /**
   * HEX Color for background
   * @type {string}
   * @memberof GetOrganizations200ResponseOneOfInnerBrandingColors
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
   *
   * @type {number}
   * @memberof GetPermissions200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetPermissions200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetPermissions200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<GetPermissions200ResponseOneOfInner>}
   * @memberof GetPermissions200ResponseOneOf
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
   *
   * @type {any}
   * @memberof GetPermissions200ResponseOneOfInner
   */
  sources?: any | null;
  /**
   * Resource server (API) identifier that this permission is for.
   * @type {string}
   * @memberof GetPermissions200ResponseOneOfInner
   */
  resource_server_identifier?: string;
  /**
   * Name of this permission.
   * @type {string}
   * @memberof GetPermissions200ResponseOneOfInner
   */
  permission_name?: string;
  /**
   * Resource server (API) name this permission is for.
   * @type {string}
   * @memberof GetPermissions200ResponseOneOfInner
   */
  resource_server_name?: string;
  /**
   * Description of this permission.
   * @type {string}
   * @memberof GetPermissions200ResponseOneOfInner
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
   *
   * @type {string}
   * @memberof GetPhoneProviders200Response
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
   *
   * @type {string}
   * @memberof GetPnProviders200Response
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
   *
   * @type {number}
   * @memberof GetResourceServers200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetResourceServers200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetResourceServers200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<ResourceServer>}
   * @memberof GetResourceServers200ResponseOneOf
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
   *
   * @type {number}
   * @memberof GetRolePermission200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetRolePermission200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetRolePermission200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<Permission>}
   * @memberof GetRolePermission200ResponseOneOf
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
   *
   * @type {number}
   * @memberof GetRoleUser200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetRoleUser200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetRoleUser200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<GetMembers200ResponseOneOfInner>}
   * @memberof GetRoleUser200ResponseOneOf
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
   *
   * @type {string}
   * @memberof GetRoleUser200ResponseOneOf1
   */
  next?: string;
  /**
   *
   * @type {Array<GetMembers200ResponseOneOfInner>}
   * @memberof GetRoleUser200ResponseOneOf1
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
   *
   * @type {number}
   * @memberof GetRules200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetRules200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetRules200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<Rule>}
   * @memberof GetRules200ResponseOneOf
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
   * @memberof GetRulesConfigs200ResponseInner
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
   * @memberof GetSigningKeys200ResponseInner
   */
  kid: string;
  /**
   * The public certificate of the signing key
   * @type {string}
   * @memberof GetSigningKeys200ResponseInner
   */
  cert: string;
  /**
   * The public certificate of the signing key in pkcs7 format
   * @type {string}
   * @memberof GetSigningKeys200ResponseInner
   */
  pkcs7?: string;
  /**
   * True if the key is the the current key
   * @type {boolean}
   * @memberof GetSigningKeys200ResponseInner
   */
  current?: boolean;
  /**
   * True if the key is the the next key
   * @type {boolean}
   * @memberof GetSigningKeys200ResponseInner
   */
  next?: boolean;
  /**
   * True if the key is the the previous key
   * @type {boolean}
   * @memberof GetSigningKeys200ResponseInner
   */
  previous?: boolean;
  /**
   *
   * @type {GetSigningKeys200ResponseInnerCurrentSince}
   * @memberof GetSigningKeys200ResponseInner
   */
  current_since?: GetSigningKeys200ResponseInnerCurrentSince;
  /**
   *
   * @type {GetSigningKeys200ResponseInnerCurrentUntil}
   * @memberof GetSigningKeys200ResponseInner
   */
  current_until?: GetSigningKeys200ResponseInnerCurrentUntil;
  /**
   * The cert fingerprint
   * @type {string}
   * @memberof GetSigningKeys200ResponseInner
   */
  fingerprint: string;
  /**
   * The cert thumbprint
   * @type {string}
   * @memberof GetSigningKeys200ResponseInner
   */
  thumbprint: string;
  /**
   * True if the key is revoked
   * @type {boolean}
   * @memberof GetSigningKeys200ResponseInner
   */
  revoked?: boolean;
  /**
   *
   * @type {GetSigningKeys200ResponseInnerRevokedAt}
   * @memberof GetSigningKeys200ResponseInner
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
   *
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   * @memberof GetTriggers200Response
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
   * @memberof GetUniversalLogin200ResponseOneOf
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
   *
   * @type {number}
   * @memberof GetUsers200ResponseOneOf
   */
  start?: number;
  /**
   *
   * @type {number}
   * @memberof GetUsers200ResponseOneOf
   */
  limit?: number;
  /**
   *
   * @type {number}
   * @memberof GetUsers200ResponseOneOf
   */
  length?: number;
  /**
   *
   * @type {number}
   * @memberof GetUsers200ResponseOneOf
   */
  total?: number;
  /**
   *
   * @type {Array<GetUsers200ResponseOneOfInner>}
   * @memberof GetUsers200ResponseOneOf
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
   * @memberof GetUsers200ResponseOneOfInner
   */
  user_id?: string;
  /**
   * Email address of this user.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInner
   */
  email?: string;
  /**
   * Whether this email address is verified (true) or unverified (false).
   * @type {boolean}
   * @memberof GetUsers200ResponseOneOfInner
   */
  email_verified?: boolean;
  /**
   * Username of this user.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInner
   */
  username?: string;
  /**
   * Phone number for this user when using SMS connections. Follows the <a href="https://en.wikipedia.org/wiki/E.164">E.164 recommendation</a>.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInner
   */
  phone_number?: string;
  /**
   * Whether this phone number has been verified (true) or not (false).
   * @type {boolean}
   * @memberof GetUsers200ResponseOneOfInner
   */
  phone_verified?: boolean;
  /**
   *
   * @type {GetUsers200ResponseOneOfInnerCreatedAt}
   * @memberof GetUsers200ResponseOneOfInner
   */
  created_at?: GetUsers200ResponseOneOfInnerCreatedAt;
  /**
   *
   * @type {GetUsers200ResponseOneOfInnerUpdatedAt}
   * @memberof GetUsers200ResponseOneOfInner
   */
  updated_at?: GetUsers200ResponseOneOfInnerUpdatedAt;
  /**
   * Array of user identity objects when accounts are linked.
   * @type {Array<GetUsers200ResponseOneOfInnerIdentitiesInner>}
   * @memberof GetUsers200ResponseOneOfInner
   */
  identities?: Array<GetUsers200ResponseOneOfInnerIdentitiesInner>;
  /**
   * User metadata to which this user has read-only access.
   * @type {{ [key: string]: any; }}
   * @memberof GetUsers200ResponseOneOfInner
   */
  app_metadata?: { [key: string]: any };
  /**
   * User metadata to which this user has read/write access.
   * @type {{ [key: string]: any; }}
   * @memberof GetUsers200ResponseOneOfInner
   */
  user_metadata?: { [key: string]: any };
  /**
   * URL to picture, photo, or avatar of this user.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInner
   */
  picture?: string;
  /**
   * Name of this user.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInner
   */
  name?: string;
  /**
   * Preferred nickname or alias of this user.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInner
   */
  nickname?: string;
  /**
   * List of multi-factor authentication providers with which this user has enrolled.
   * @type {Array<string>}
   * @memberof GetUsers200ResponseOneOfInner
   */
  multifactor?: Array<string>;
  /**
   * Last IP address from which this user logged in.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInner
   */
  last_ip?: string;
  /**
   *
   * @type {GetUsers200ResponseOneOfInnerLastLogin}
   * @memberof GetUsers200ResponseOneOfInner
   */
  last_login?: GetUsers200ResponseOneOfInnerLastLogin;
  /**
   * Total number of logins this user has performed.
   * @type {number}
   * @memberof GetUsers200ResponseOneOfInner
   */
  logins_count?: number;
  /**
   * Whether this user was blocked by an administrator (true) or is not (false).
   * @type {boolean}
   * @memberof GetUsers200ResponseOneOfInner
   */
  blocked?: boolean;
  /**
   * Given name/first name/forename of this user.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInner
   */
  given_name?: string;
  /**
   * Family name/last name/surname of this user.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInner
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
   * @memberof GetUsers200ResponseOneOfInnerIdentitiesInner
   */
  connection?: string;
  /**
   * Unique identifier of the user user for this identity.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInnerIdentitiesInner
   */
  user_id?: string;
  /**
   * The type of identity provider
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInnerIdentitiesInner
   */
  provider?: string;
  /**
   * Whether this identity is from a social provider (true) or not (false).
   * @type {boolean}
   * @memberof GetUsers200ResponseOneOfInnerIdentitiesInner
   */
  isSocial?: boolean;
  /**
   * IDP access token returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInnerIdentitiesInner
   */
  access_token?: string;
  /**
   * IDP access token secret returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInnerIdentitiesInner
   */
  access_token_secret?: string;
  /**
   * IDP refresh token returned only if scope read:user_idp_tokens is defined.
   * @type {string}
   * @memberof GetUsers200ResponseOneOfInnerIdentitiesInner
   */
  refresh_token?: string;
  /**
   *
   * @type {UserProfile}
   * @memberof GetUsers200ResponseOneOfInnerIdentitiesInner
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
   * @memberof Hook
   */
  triggerId?: string;
  /**
   * ID of this hook.
   * @type {string}
   * @memberof Hook
   */
  id?: string;
  /**
   * Name of this hook.
   * @type {string}
   * @memberof Hook
   */
  name?: string;
  /**
   * Whether this hook will be executed (true) or ignored (false).
   * @type {boolean}
   * @memberof Hook
   */
  enabled?: boolean;
  /**
   * Code to be executed when this hook runs.
   * @type {string}
   * @memberof Hook
   */
  script?: string;
  /**
   * Dependencies of this hook used by webtask server.
   * @type {{ [key: string]: any; }}
   * @memberof Hook
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
   * @memberof HookCreate
   */
  name: string;
  /**
   * Code to be executed when this hook runs.
   * @type {string}
   * @memberof HookCreate
   */
  script: string;
  /**
   * Whether this hook will be executed (true) or ignored (false).
   * @type {boolean}
   * @memberof HookCreate
   */
  enabled?: boolean;
  /**
   * Dependencies of this hook used by webtask server.
   * @type {{ [key: string]: any; }}
   * @memberof HookCreate
   */
  dependencies?: { [key: string]: any };
  /**
   * Execution stage of this rule. Can be `credentials-exchange`, `pre-user-registration`, `post-user-registration`, `post-change-password`, or `send-phone-message`.
   * @type {string}
   * @memberof HookCreate
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
   * @memberof HookUpdate
   */
  name?: string;
  /**
   * Code to be executed when this hook runs.
   * @type {string}
   * @memberof HookUpdate
   */
  script?: string;
  /**
   * Whether this hook will be executed (true) or ignored (false).
   * @type {boolean}
   * @memberof HookUpdate
   */
  enabled?: boolean;
  /**
   * Dependencies of this hook used by webtask server.
   * @type {{ [key: string]: any; }}
   * @memberof HookUpdate
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
   * @memberof Job
   */
  status: string;
  /**
   * Type of job this is.
   * @type {string}
   * @memberof Job
   */
  type: string;
  /**
   * When this job was created.
   * @type {string}
   * @memberof Job
   */
  created_at?: string;
  /**
   * ID of this job.
   * @type {string}
   * @memberof Job
   */
  id: string;
  /**
   * connection_id of the connection from which users will be exported.
   * @type {string}
   * @memberof Job
   */
  connection_id?: string;
  /**
   * Format of the file. Must be `json` or `csv`.
   * @type {string}
   * @memberof Job
   */
  format?: JobFormatEnum;
  /**
   * Limit the number of records.
   * @type {number}
   * @memberof Job
   */
  limit?: number;
  /**
   * List of fields to be included in the CSV. Defaults to a predefined set of fields.
   * @type {Array<PostUsersExportsRequestFieldsInner>}
   * @memberof Job
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
   *
   * @type {LogDate}
   * @memberof Log
   */
  date?: LogDate;
  /**
   * Type of event.
   * @type {string}
   * @memberof Log
   */
  type?: string;
  /**
   * Description of this event.
   * @type {string}
   * @memberof Log
   */
  description?: string | null;
  /**
   * Name of the connection the event relates to.
   * @type {string}
   * @memberof Log
   */
  connection?: string;
  /**
   * ID of the connection the event relates to.
   * @type {string}
   * @memberof Log
   */
  connection_id?: string;
  /**
   * ID of the client (application).
   * @type {string}
   * @memberof Log
   */
  client_id?: string;
  /**
   * Name of the client (application).
   * @type {string}
   * @memberof Log
   */
  client_name?: string;
  /**
   * IP address of the log event source.
   * @type {string}
   * @memberof Log
   */
  ip?: string;
  /**
   * Hostname the event applies to.
   * @type {string}
   * @memberof Log
   */
  hostname?: string;
  /**
   * ID of the user involved in the event.
   * @type {string}
   * @memberof Log
   */
  user_id?: string;
  /**
   * Name of the user involved in the event.
   * @type {string}
   * @memberof Log
   */
  user_name?: string;
  /**
   * API audience the event applies to.
   * @type {string}
   * @memberof Log
   */
  audience?: string;
  /**
   * Scope permissions applied to the event.
   * @type {string}
   * @memberof Log
   */
  scope?: string;
  /**
   * Name of the strategy involved in the event.
   * @type {string}
   * @memberof Log
   */
  strategy?: string;
  /**
   * Type of strategy involved in the event.
   * @type {string}
   * @memberof Log
   */
  strategy_type?: string;
  /**
   * Unique ID of the event.
   * @type {string}
   * @memberof Log
   */
  log_id?: string;
  /**
   * Whether the client was a mobile device (true) or desktop/laptop/server (false).
   * @type {boolean}
   * @memberof Log
   */
  isMobile?: boolean;
  /**
   * Additional useful details about this event (structure is dependent upon event type).
   * @type {{ [key: string]: any; }}
   * @memberof Log
   */
  details?: { [key: string]: any };
  /**
   * User agent string from the client device that caused the event.
   * @type {string}
   * @memberof Log
   */
  user_agent?: string;
  /**
   *
   * @type {LogLocationInfo}
   * @memberof Log
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
   * @memberof LogLocationInfo
   */
  country_code?: string;
  /**
   * Three-letter <a href="https://www.iso.org/iso-3166-country-codes.html">Alpha-3 ISO 3166-1</a> country code.
   * @type {string}
   * @memberof LogLocationInfo
   */
  country_code3?: string;
  /**
   * Full country name in English.
   * @type {string}
   * @memberof LogLocationInfo
   */
  country_name?: string;
  /**
   * Full city name in English.
   * @type {string}
   * @memberof LogLocationInfo
   */
  city_name?: string;
  /**
   * Global latitude (horizontal) position.
   * @type {string}
   * @memberof LogLocationInfo
   */
  latitude?: string;
  /**
   * Global longitude (vertical) position.
   * @type {string}
   * @memberof LogLocationInfo
   */
  longitude?: string;
  /**
   * Time zone name as found in the <a href="https://www.iana.org/time-zones">tz database</a>.
   * @type {string}
   * @memberof LogLocationInfo
   */
  time_zone?: string;
  /**
   * Continent the country is located within. Can be `AF` (Africa), `AN` (Antarctica), `AS` (Asia), `EU` (Europe), `NA` (North America), `OC` (Oceania) or `SA` (South America).
   * @type {string}
   * @memberof LogLocationInfo
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
   * @memberof PatchActionRequest
   */
  name?: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   * @memberof PatchActionRequest
   */
  supported_triggers?: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   * @type {string}
   * @memberof PatchActionRequest
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   * @memberof PatchActionRequest
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   * @type {string}
   * @memberof PatchActionRequest
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<PostActionRequestSecretsInner>}
   * @memberof PatchActionRequest
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
   * @memberof PatchAuthenticationMethodsByAuthenticationMethodIdRequest
   */
  name?: string;
  /**
   * Base32 encoded secret for TOTP generation.
   * @type {string}
   * @memberof PatchAuthenticationMethodsByAuthenticationMethodIdRequest
   */
  totp_secret?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   * @type {string}
   * @memberof PatchAuthenticationMethodsByAuthenticationMethodIdRequest
   */
  email?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   * @memberof PatchAuthenticationMethodsByAuthenticationMethodIdRequest
   */
  phone_number?: string;
  /**
   * Preferred phone authentication method
   * @type {string}
   * @memberof PatchAuthenticationMethodsByAuthenticationMethodIdRequest
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
   *
   * @type {Array<GetBindings200ResponseBindingsInner>}
   * @memberof PatchBindings200Response
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
   * @memberof PatchBindingsRequest
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
   *
   * @type {PatchBindingsRequestBindingsInnerOneOfRef}
   * @memberof PatchBindingsRequestBindingsInnerOneOf
   */
  ref: PatchBindingsRequestBindingsInnerOneOfRef;
  /**
   * The name of the binding.
   * @type {string}
   * @memberof PatchBindingsRequestBindingsInnerOneOf
   */
  display_name?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<PostActionRequestSecretsInner>}
   * @memberof PatchBindingsRequestBindingsInnerOneOf
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
   * @memberof PatchBindingsRequestBindingsInnerOneOfRef
   */
  type?: PatchBindingsRequestBindingsInnerOneOfRefTypeEnum;
  /**
   * The id or name of an action that is being bound to a trigger.
   * @type {string}
   * @memberof PatchBindingsRequestBindingsInnerOneOfRef
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
   *
   * @type {PatchBrandingRequestColors}
   * @memberof PatchBrandingRequest
   */
  colors?: PatchBrandingRequestColors | null;
  /**
   * URL for the favicon. Must use HTTPS.
   * @type {string}
   * @memberof PatchBrandingRequest
   */
  favicon_url?: string | null;
  /**
   * URL for the logo. Must use HTTPS.
   * @type {string}
   * @memberof PatchBrandingRequest
   */
  logo_url?: string | null;
  /**
   *
   * @type {PatchBrandingRequestFont}
   * @memberof PatchBrandingRequest
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
   * @memberof PatchBrandingRequestColors
   */
  primary?: string | null;
  /**
   *
   * @type {GetBranding200ResponseColorsPageBackground}
   * @memberof PatchBrandingRequestColors
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
   * @memberof PatchBrandingRequestFont
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
   * @memberof PatchBreachedPasswordDetectionRequest
   */
  enabled?: boolean;
  /**
   * Action to take when a breached password is detected during a login.<br/>      Possible values: <code>block</code>, <code>user_notification</code>, <code>admin_notification</code>.
   * @type {Array<string>}
   * @memberof PatchBreachedPasswordDetectionRequest
   */
  shields?: Array<PatchBreachedPasswordDetectionRequestShieldsEnum>;
  /**
   * When "admin_notification" is enabled, determines how often email notifications are sent.<br/>        Possible values: <code>immediately</code>, <code>daily</code>, <code>weekly</code>, <code>monthly</code>.
   * @type {Array<string>}
   * @memberof PatchBreachedPasswordDetectionRequest
   */
  admin_notification_frequency?: Array<PatchBreachedPasswordDetectionRequestAdminNotificationFrequencyEnum>;
  /**
   * The subscription level for breached password detection methods. Use "enhanced" to enable Credential Guard.<br/>        Possible values: <code>standard</code>, <code>enhanced</code>.
   * @type {string}
   * @memberof PatchBreachedPasswordDetectionRequest
   */
  method?: PatchBreachedPasswordDetectionRequestMethodEnum;
  /**
   *
   * @type {PatchBreachedPasswordDetectionRequestStage}
   * @memberof PatchBreachedPasswordDetectionRequest
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
   *
   * @type {PatchBreachedPasswordDetectionRequestStagePreUserRegistration}
   * @memberof PatchBreachedPasswordDetectionRequestStage
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
   * @memberof PatchBreachedPasswordDetectionRequestStagePreUserRegistration
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
   * @memberof PatchBruteForceProtectionRequest
   */
  enabled?: boolean;
  /**
   * Action to take when a brute force protection threshold is violated.<br/>        Possible values: <code>block</code>, <code>user_notification</code>.
   * @type {Array<string>}
   * @memberof PatchBruteForceProtectionRequest
   */
  shields?: Array<PatchBruteForceProtectionRequestShieldsEnum>;
  /**
   * List of trusted IP addresses that will not have attack protection enforced against them.
   * @type {Array<PatchBruteForceProtectionRequestAllowlistInner>}
   * @memberof PatchBruteForceProtectionRequest
   */
  allowlist?: Array<PatchBruteForceProtectionRequestAllowlistInner>;
  /**
   * Account Lockout: Determines whether or not IP address is used when counting failed attempts.<br/>          Possible values: <code>count_per_identifier_and_ip</code>, <code>count_per_identifier</code>.
   * @type {string}
   * @memberof PatchBruteForceProtectionRequest
   */
  mode?: PatchBruteForceProtectionRequestModeEnum;
  /**
   * Maximum number of unsuccessful attempts.
   * @type {number}
   * @memberof PatchBruteForceProtectionRequest
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
   * @memberof PatchClientGrantsByIdRequest
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
   * @memberof PatchCustomDomainsByIdRequest
   */
  tls_policy?: PatchCustomDomainsByIdRequestTlsPolicyEnum;
  /**
   * The HTTP header to fetch the client's IP address
   * @type {string}
   * @memberof PatchCustomDomainsByIdRequest
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
   * @memberof PatchEnabledConnectionsByConnectionIdRequest
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
   * @memberof PatchLogStreamsByIdRequest
   */
  name?: string;
  /**
   * The status of the log stream. Possible values: `active`, `paused`, `suspended`
   * @type {string}
   * @memberof PatchLogStreamsByIdRequest
   */
  status?: PatchLogStreamsByIdRequestStatusEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof PatchLogStreamsByIdRequest
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {PatchLogStreamsByIdRequestSink}
   * @memberof PatchLogStreamsByIdRequest
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
   * @memberof PatchLogStreamsByIdRequestSinkOneOf
   */
  mixpanelRegion: PatchLogStreamsByIdRequestSinkOneOfMixpanelRegionEnum;
  /**
   * Mixpanel Project Id
   * @type {string}
   * @memberof PatchLogStreamsByIdRequestSinkOneOf
   */
  mixpanelProjectId: string;
  /**
   * Mixpanel Service Account Username
   * @type {string}
   * @memberof PatchLogStreamsByIdRequestSinkOneOf
   */
  mixpanelServiceAccountUsername: string;
  /**
   * Mixpanel Service Account Password
   * @type {string}
   * @memberof PatchLogStreamsByIdRequestSinkOneOf
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
   * @memberof PatchOrganizationsByIdRequest
   */
  display_name?: string;
  /**
   * The name of this organization.
   * @type {string}
   * @memberof PatchOrganizationsByIdRequest
   */
  name?: string;
  /**
   *
   * @type {PatchOrganizationsByIdRequestBranding}
   * @memberof PatchOrganizationsByIdRequest
   */
  branding?: PatchOrganizationsByIdRequestBranding | null;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   * @memberof PatchOrganizationsByIdRequest
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
   * @memberof PatchOrganizationsByIdRequestBranding
   */
  logo_url?: string;
  /**
   *
   * @type {GetOrganizations200ResponseOneOfInnerBrandingColors}
   * @memberof PatchOrganizationsByIdRequestBranding
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
   * @memberof PatchProviderRequest
   */
  name?: PatchProviderRequestNameEnum;
  /**
   * Whether the provider is enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof PatchProviderRequest
   */
  enabled?: boolean;
  /**
   * Email address to use as "from" when no other address specified.
   * @type {string}
   * @memberof PatchProviderRequest
   */
  default_from_address?: string;
  /**
   *
   * @type {PostProviderRequestCredentials}
   * @memberof PatchProviderRequest
   */
  credentials?: PostProviderRequestCredentials;
  /**
   * Specific provider setting
   * @type {{ [key: string]: any; }}
   * @memberof PatchProviderRequest
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
   * @memberof PatchSuspiciousIpThrottlingRequest
   */
  enabled?: boolean;
  /**
   * Action to take when a suspicious IP throttling threshold is violated.<br/>          Possible values: <code>block</code>, <code>admin_notification</code>.
   * @type {Array<string>}
   * @memberof PatchSuspiciousIpThrottlingRequest
   */
  shields?: Array<PatchSuspiciousIpThrottlingRequestShieldsEnum>;
  /**
   * List of trusted IP addresses that will not have attack protection enforced against them.
   * @type {Array<PatchBruteForceProtectionRequestAllowlistInner>}
   * @memberof PatchSuspiciousIpThrottlingRequest
   */
  allowlist?: Array<PatchBruteForceProtectionRequestAllowlistInner>;
  /**
   *
   * @type {PatchSuspiciousIpThrottlingRequestStage}
   * @memberof PatchSuspiciousIpThrottlingRequest
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
   *
   * @type {PatchSuspiciousIpThrottlingRequestStagePreLogin}
   * @memberof PatchSuspiciousIpThrottlingRequestStage
   */
  pre_login?: PatchSuspiciousIpThrottlingRequestStagePreLogin;
  /**
   *
   * @type {PatchSuspiciousIpThrottlingRequestStagePreUserRegistration}
   * @memberof PatchSuspiciousIpThrottlingRequestStage
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
   * @memberof PatchSuspiciousIpThrottlingRequestStagePreLogin
   */
  max_attempts?: number;
  /**
   * Interval of time, given in milliseconds, at which new attempts are granted.
   * @type {number}
   * @memberof PatchSuspiciousIpThrottlingRequestStagePreLogin
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
   * @memberof PatchSuspiciousIpThrottlingRequestStagePreUserRegistration
   */
  max_attempts?: number;
  /**
   * Interval of time, given in milliseconds, at which new attempts are granted.
   * @type {number}
   * @memberof PatchSuspiciousIpThrottlingRequestStagePreUserRegistration
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
   * @memberof Permission
   */
  resource_server_identifier?: string;
  /**
   * Name of this permission.
   * @type {string}
   * @memberof Permission
   */
  permission_name?: string;
  /**
   * Resource server (API) name this permission is for.
   * @type {string}
   * @memberof Permission
   */
  resource_server_name?: string;
  /**
   * Description of this permission.
   * @type {string}
   * @memberof Permission
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
   * @memberof PostActionRequest
   */
  name: string;
  /**
   * The list of triggers that this action supports. At this time, an action can only target a single trigger at a time.
   * @type {Array<GetActions200ResponseActionsInnerSupportedTriggersInner>}
   * @memberof PostActionRequest
   */
  supported_triggers: Array<GetActions200ResponseActionsInnerSupportedTriggersInner>;
  /**
   * The source code of the action.
   * @type {string}
   * @memberof PostActionRequest
   */
  code?: string;
  /**
   * The list of third party npm modules, and their versions, that this action depends on.
   * @type {Array<GetActions200ResponseActionsInnerDependenciesInner>}
   * @memberof PostActionRequest
   */
  dependencies?: Array<GetActions200ResponseActionsInnerDependenciesInner>;
  /**
   * The Node runtime. For example: `node12`, defaults to `node12`
   * @type {string}
   * @memberof PostActionRequest
   */
  runtime?: string;
  /**
   * The list of secrets that are included in an action or a version of an action.
   * @type {Array<PostActionRequestSecretsInner>}
   * @memberof PostActionRequest
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
   * @memberof PostActionRequestSecretsInner
   */
  name?: string;
  /**
   * The value of the particular secret, e.g. secret123. A secret's value can only be set upon creation. A secret's value will never be returned by the API.
   * @type {string}
   * @memberof PostActionRequestSecretsInner
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
   * @memberof PostAuthenticationMethods201Response
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
   */
  type: PostAuthenticationMethods201ResponseTypeEnum;
  /**
   * A human-readable label to identify the authentication method.
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
   */
  name?: string;
  /**
   * Base32 encoded secret for TOTP generation
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
   */
  totp_secret?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
   */
  email?: string;
  /**
   *
   * @type {Array<PostAuthenticationMethods201ResponseAuthenticationMethodsInner>}
   * @memberof PostAuthenticationMethods201Response
   */
  authentication_methods?: Array<PostAuthenticationMethods201ResponseAuthenticationMethodsInner>;
  /**
   * Preferred phone authentication method
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
   */
  preferred_authentication_method?: PostAuthenticationMethods201ResponsePreferredAuthenticationMethodEnum;
  /**
   * Applies to webauthn authenticators only. The id of the credential.
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
   */
  key_id?: string;
  /**
   * Applies to webauthn authenticators only. The public key.
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
   */
  public_key?: string;
  /**
   * Applies to webauthn authenticators only. The relying party identifier.
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
   */
  relying_party_identifier?: string;
  /**
   * Authentication method creation date
   * @type {string}
   * @memberof PostAuthenticationMethods201Response
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
   *
   * @type {string}
   * @memberof PostAuthenticationMethods201ResponseAuthenticationMethodsInner
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof PostAuthenticationMethods201ResponseAuthenticationMethodsInner
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
   *
   * @type {string}
   * @memberof PostAuthenticationMethodsRequest
   */
  type: PostAuthenticationMethodsRequestTypeEnum;
  /**
   * A human-readable label to identify the authentication method.
   * @type {string}
   * @memberof PostAuthenticationMethodsRequest
   */
  name?: string;
  /**
   * Base32 encoded secret for TOTP generation.
   * @type {string}
   * @memberof PostAuthenticationMethodsRequest
   */
  totp_secret?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   * @memberof PostAuthenticationMethodsRequest
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   * @type {string}
   * @memberof PostAuthenticationMethodsRequest
   */
  email?: string;
  /**
   * Preferred phone authentication method.
   * @type {string}
   * @memberof PostAuthenticationMethodsRequest
   */
  preferred_authentication_method?: PostAuthenticationMethodsRequestPreferredAuthenticationMethodEnum;
  /**
   * Applies to email webauthn authenticators only. The id of the credential.
   * @type {string}
   * @memberof PostAuthenticationMethodsRequest
   */
  key_id?: string;
  /**
   * Applies to email webauthn authenticators only. The public key.
   * @type {string}
   * @memberof PostAuthenticationMethodsRequest
   */
  public_key?: string;
  /**
   * Applies to email webauthn authenticators only. The relying party identifier.
   * @type {string}
   * @memberof PostAuthenticationMethodsRequest
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
   *
   * @type {PostBrandingThemeRequestBorders}
   * @memberof PostBrandingTheme200Response
   */
  borders: PostBrandingThemeRequestBorders;
  /**
   *
   * @type {PostBrandingThemeRequestColors}
   * @memberof PostBrandingTheme200Response
   */
  colors: PostBrandingThemeRequestColors;
  /**
   * Display Name
   * @type {string}
   * @memberof PostBrandingTheme200Response
   */
  displayName: string;
  /**
   *
   * @type {PostBrandingThemeRequestFonts}
   * @memberof PostBrandingTheme200Response
   */
  fonts: PostBrandingThemeRequestFonts;
  /**
   *
   * @type {PostBrandingThemeRequestPageBackground}
   * @memberof PostBrandingTheme200Response
   */
  page_background: PostBrandingThemeRequestPageBackground;
  /**
   * Theme Id
   * @type {string}
   * @memberof PostBrandingTheme200Response
   */
  themeId: string;
  /**
   *
   * @type {PostBrandingThemeRequestWidget}
   * @memberof PostBrandingTheme200Response
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
   *
   * @type {PostBrandingThemeRequestBorders}
   * @memberof PostBrandingThemeRequest
   */
  borders: PostBrandingThemeRequestBorders;
  /**
   *
   * @type {PostBrandingThemeRequestColors}
   * @memberof PostBrandingThemeRequest
   */
  colors: PostBrandingThemeRequestColors;
  /**
   * Display Name
   * @type {string}
   * @memberof PostBrandingThemeRequest
   */
  displayName?: string;
  /**
   *
   * @type {PostBrandingThemeRequestFonts}
   * @memberof PostBrandingThemeRequest
   */
  fonts: PostBrandingThemeRequestFonts;
  /**
   *
   * @type {PostBrandingThemeRequestPageBackground}
   * @memberof PostBrandingThemeRequest
   */
  page_background: PostBrandingThemeRequestPageBackground;
  /**
   *
   * @type {PostBrandingThemeRequestWidget}
   * @memberof PostBrandingThemeRequest
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
   * @memberof PostBrandingThemeRequestBorders
   */
  button_border_radius: number;
  /**
   * Button border weight
   * @type {number}
   * @memberof PostBrandingThemeRequestBorders
   */
  button_border_weight: number;
  /**
   * Buttons style
   * @type {string}
   * @memberof PostBrandingThemeRequestBorders
   */
  buttons_style: PostBrandingThemeRequestBordersButtonsStyleEnum;
  /**
   * Input border radius
   * @type {number}
   * @memberof PostBrandingThemeRequestBorders
   */
  input_border_radius: number;
  /**
   * Input border weight
   * @type {number}
   * @memberof PostBrandingThemeRequestBorders
   */
  input_border_weight: number;
  /**
   * Inputs style
   * @type {string}
   * @memberof PostBrandingThemeRequestBorders
   */
  inputs_style: PostBrandingThemeRequestBordersInputsStyleEnum;
  /**
   * Show widget shadow
   * @type {boolean}
   * @memberof PostBrandingThemeRequestBorders
   */
  show_widget_shadow: boolean;
  /**
   * Widget border weight
   * @type {number}
   * @memberof PostBrandingThemeRequestBorders
   */
  widget_border_weight: number;
  /**
   * Widget corner radius
   * @type {number}
   * @memberof PostBrandingThemeRequestBorders
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
   * @memberof PostBrandingThemeRequestColors
   */
  base_focus_color?: string;
  /**
   * Base Hover Color
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  base_hover_color?: string;
  /**
   * Body text
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  body_text: string;
  /**
   * Error
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  error: string;
  /**
   * Header
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  header: string;
  /**
   * Icons
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  icons: string;
  /**
   * Input background
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  input_background: string;
  /**
   * Input border
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  input_border: string;
  /**
   * Input filled text
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  input_filled_text: string;
  /**
   * Input labels & placeholders
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  input_labels_placeholders: string;
  /**
   * Links & focused components
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  links_focused_components: string;
  /**
   * Primary button
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  primary_button: string;
  /**
   * Primary button label
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  primary_button_label: string;
  /**
   * Secondary button border
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  secondary_button_border: string;
  /**
   * Secondary button label
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  secondary_button_label: string;
  /**
   * Success
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  success: string;
  /**
   * Widget background
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
   */
  widget_background: string;
  /**
   * Widget border
   * @type {string}
   * @memberof PostBrandingThemeRequestColors
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
   *
   * @type {PostBrandingThemeRequestFontsBodyText}
   * @memberof PostBrandingThemeRequestFonts
   */
  body_text: PostBrandingThemeRequestFontsBodyText;
  /**
   *
   * @type {PostBrandingThemeRequestFontsButtonsText}
   * @memberof PostBrandingThemeRequestFonts
   */
  buttons_text: PostBrandingThemeRequestFontsButtonsText;
  /**
   * Font URL
   * @type {string}
   * @memberof PostBrandingThemeRequestFonts
   */
  font_url: string;
  /**
   *
   * @type {PostBrandingThemeRequestFontsInputLabels}
   * @memberof PostBrandingThemeRequestFonts
   */
  input_labels: PostBrandingThemeRequestFontsInputLabels;
  /**
   *
   * @type {PostBrandingThemeRequestFontsLinks}
   * @memberof PostBrandingThemeRequestFonts
   */
  links: PostBrandingThemeRequestFontsLinks;
  /**
   * Links style
   * @type {string}
   * @memberof PostBrandingThemeRequestFonts
   */
  links_style: PostBrandingThemeRequestFontsLinksStyleEnum;
  /**
   * Reference text size
   * @type {number}
   * @memberof PostBrandingThemeRequestFonts
   */
  reference_text_size: number;
  /**
   *
   * @type {PostBrandingThemeRequestFontsSubtitle}
   * @memberof PostBrandingThemeRequestFonts
   */
  subtitle: PostBrandingThemeRequestFontsSubtitle;
  /**
   *
   * @type {PostBrandingThemeRequestFontsTitle}
   * @memberof PostBrandingThemeRequestFonts
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
   * @memberof PostBrandingThemeRequestFontsBodyText
   */
  bold: boolean;
  /**
   * Body text size
   * @type {number}
   * @memberof PostBrandingThemeRequestFontsBodyText
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
   * @memberof PostBrandingThemeRequestFontsButtonsText
   */
  bold: boolean;
  /**
   * Buttons text size
   * @type {number}
   * @memberof PostBrandingThemeRequestFontsButtonsText
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
   * @memberof PostBrandingThemeRequestFontsInputLabels
   */
  bold: boolean;
  /**
   * Input Labels size
   * @type {number}
   * @memberof PostBrandingThemeRequestFontsInputLabels
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
   * @memberof PostBrandingThemeRequestFontsLinks
   */
  bold: boolean;
  /**
   * Links size
   * @type {number}
   * @memberof PostBrandingThemeRequestFontsLinks
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
   * @memberof PostBrandingThemeRequestFontsSubtitle
   */
  bold: boolean;
  /**
   * Subtitle size
   * @type {number}
   * @memberof PostBrandingThemeRequestFontsSubtitle
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
   * @memberof PostBrandingThemeRequestFontsTitle
   */
  bold: boolean;
  /**
   * Title size
   * @type {number}
   * @memberof PostBrandingThemeRequestFontsTitle
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
   * @memberof PostBrandingThemeRequestPageBackground
   */
  background_color: string;
  /**
   * Background image url
   * @type {string}
   * @memberof PostBrandingThemeRequestPageBackground
   */
  background_image_url: string;
  /**
   * Page Layout
   * @type {string}
   * @memberof PostBrandingThemeRequestPageBackground
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
   * @memberof PostBrandingThemeRequestWidget
   */
  header_text_alignment: PostBrandingThemeRequestWidgetHeaderTextAlignmentEnum;
  /**
   * Logo height
   * @type {number}
   * @memberof PostBrandingThemeRequestWidget
   */
  logo_height: number;
  /**
   * Logo position
   * @type {string}
   * @memberof PostBrandingThemeRequestWidget
   */
  logo_position: PostBrandingThemeRequestWidgetLogoPositionEnum;
  /**
   * Logo url
   * @type {string}
   * @memberof PostBrandingThemeRequestWidget
   */
  logo_url: string;
  /**
   * Social buttons layout
   * @type {string}
   * @memberof PostBrandingThemeRequestWidget
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
   * @memberof PostCustomDomains201Response
   */
  custom_domain_id: string;
  /**
   * Domain name.
   * @type {string}
   * @memberof PostCustomDomains201Response
   */
  domain: string;
  /**
   * Whether this is a primary domain (true) or not (false).
   * @type {boolean}
   * @memberof PostCustomDomains201Response
   */
  primary: boolean;
  /**
   * Custom domain configuration status. Can be `disabled`, `pending`, `pending_verification`, or `ready`.
   * @type {string}
   * @memberof PostCustomDomains201Response
   */
  status: PostCustomDomains201ResponseStatusEnum;
  /**
   * Custom domain provisioning type. Can be `auth0_managed_certs` or `self_managed_certs`.
   * @type {string}
   * @memberof PostCustomDomains201Response
   */
  type: PostCustomDomains201ResponseTypeEnum;
  /**
   *
   * @type {PostCustomDomains201ResponseVerification}
   * @memberof PostCustomDomains201Response
   */
  verification: PostCustomDomains201ResponseVerification;
  /**
   * The HTTP header to fetch the client's IP address
   * @type {string}
   * @memberof PostCustomDomains201Response
   */
  custom_client_ip_header?: string | null;
  /**
   * The TLS version policy
   * @type {string}
   * @memberof PostCustomDomains201Response
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
   * @memberof PostCustomDomains201ResponseVerification
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
   * @memberof PostCustomDomains201ResponseVerificationMethodsInner
   */
  name: PostCustomDomains201ResponseVerificationMethodsInnerNameEnum;
  /**
   * Value used to verify the domain.
   * @type {string}
   * @memberof PostCustomDomains201ResponseVerificationMethodsInner
   */
  record: string;
  /**
   * The name of the txt record for verification
   * @type {string}
   * @memberof PostCustomDomains201ResponseVerificationMethodsInner
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
   * @memberof PostCustomDomainsRequest
   */
  domain: string;
  /**
   * Custom domain provisioning type. Must be `auth0_managed_certs` or `self_managed_certs`.
   * @type {string}
   * @memberof PostCustomDomainsRequest
   */
  type: PostCustomDomainsRequestTypeEnum;
  /**
   * Custom domain verification method. Must be `txt`.
   * @type {string}
   * @memberof PostCustomDomainsRequest
   */
  verification_method?: PostCustomDomainsRequestVerificationMethodEnum;
  /**
   * compatible includes TLS 1.0, 1.1, 1.2, and recommended only includes TLS 1.2
   * @type {string}
   * @memberof PostCustomDomainsRequest
   */
  tls_policy?: PostCustomDomainsRequestTlsPolicyEnum;
  /**
   * HTTP header to fetch client IP header. Ex: CF-Connecting-IP, X-Forwarded-For or True-Client-IP.
   * @type {string}
   * @memberof PostCustomDomainsRequest
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
   * @memberof PostDeviceCredentials201Response
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
   * @memberof PostEmailTemplatesRequest
   */
  template: PostEmailTemplatesRequestTemplateEnum;
  /**
   * Body of the email template.
   * @type {string}
   * @memberof PostEmailTemplatesRequest
   */
  body: string | null;
  /**
   * Senders `from` email address.
   * @type {string}
   * @memberof PostEmailTemplatesRequest
   */
  from: string | null;
  /**
   * URL to redirect the user to after a successful action.
   * @type {string}
   * @memberof PostEmailTemplatesRequest
   */
  resultUrl?: string | null;
  /**
   * Subject line of the email.
   * @type {string}
   * @memberof PostEmailTemplatesRequest
   */
  subject: string | null;
  /**
   * Syntax of the template body.
   * @type {string}
   * @memberof PostEmailTemplatesRequest
   */
  syntax: string | null;
  /**
   * Lifetime in seconds that the link within the email will be valid for.
   * @type {number}
   * @memberof PostEmailTemplatesRequest
   */
  urlLifetimeInSeconds?: number | null;
  /**
   * Whether the `reset_email` and `verify_email` templates should include the user's email address as the `email` parameter in the returnUrl (true) or whether no email address should be included in the redirect (false). Defaults to true.
   * @type {boolean}
   * @memberof PostEmailTemplatesRequest
   */
  includeEmailInRedirect?: boolean;
  /**
   * Whether the template is enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof PostEmailTemplatesRequest
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
   * @memberof PostEmailVerification201Response
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
   * @memberof PostEmailVerificationRequest
   */
  result_url?: string;
  /**
   * user_id of for whom the ticket should be created.
   * @type {string}
   * @memberof PostEmailVerificationRequest
   */
  user_id: string;
  /**
   * ID of the client. If provided for tenants using New Universal Login experience, the user will be prompted to redirect to the default login route of the corresponding application once the ticket is used. See <a target='' href='https://manage.local.dev.auth0.com/docs/universal-login/configure-default-login-routes#completing-the-password-reset-flow'>Configuring Default Login Routes</a> for more details.
   * @type {string}
   * @memberof PostEmailVerificationRequest
   */
  client_id?: string;
  /**
   * (Optional) Organization ID – the ID of the Organization. If provided, organization parameters will be made available to the email template and organization branding will be applied to the prompt. In addition, the redirect link in the prompt will include organization_id and organization_name query string parameters.
   * @type {string}
   * @memberof PostEmailVerificationRequest
   */
  organization_id?: string;
  /**
   * Number of seconds for which the ticket is valid before expiration. If unspecified or set to 0, this value defaults to 432000 seconds (5 days).
   * @type {number}
   * @memberof PostEmailVerificationRequest
   */
  ttl_sec?: number;
  /**
   * Whether to include the email address as part of the returnUrl in the reset_email (true), or not (false).
   * @type {boolean}
   * @memberof PostEmailVerificationRequest
   */
  includeEmailInRedirect?: boolean;
  /**
   *
   * @type {PostVerificationEmailRequestIdentity}
   * @memberof PostEmailVerificationRequest
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
   * @memberof PostEnabledConnectionsRequest
   */
  connection_id: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   * @type {boolean}
   * @memberof PostEnabledConnectionsRequest
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
   * @memberof PostIdentitiesRequest
   */
  provider?: PostIdentitiesRequestProviderEnum;
  /**
   * connection_id of the secondary user account being linked when more than one `auth0` database provider exists.
   * @type {string}
   * @memberof PostIdentitiesRequest
   */
  connection_id?: string;
  /**
   *
   * @type {PostIdentitiesRequestUserId}
   * @memberof PostIdentitiesRequest
   */
  user_id?: PostIdentitiesRequestUserId;
  /**
   * JWT for the secondary account being linked. If sending this parameter, `provider`, `user_id`, and `connection_id` must not be sent.
   * @type {string}
   * @memberof PostIdentitiesRequest
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
   *
   * @type {GetInvitations200ResponseOneOfInnerInviter}
   * @memberof PostInvitationsRequest
   */
  inviter: GetInvitations200ResponseOneOfInnerInviter;
  /**
   *
   * @type {GetInvitations200ResponseOneOfInnerInvitee}
   * @memberof PostInvitationsRequest
   */
  invitee: GetInvitations200ResponseOneOfInnerInvitee;
  /**
   * Auth0 client ID. Used to resolve the application's login initiation endpoint.
   * @type {string}
   * @memberof PostInvitationsRequest
   */
  client_id: string;
  /**
   * The id of the connection to force invitee to authenticate with.
   * @type {string}
   * @memberof PostInvitationsRequest
   */
  connection_id?: string;
  /**
   *
   * @type {GetInvitations200ResponseOneOfInnerAppMetadata}
   * @memberof PostInvitationsRequest
   */
  app_metadata?: GetInvitations200ResponseOneOfInnerAppMetadata;
  /**
   * Data related to the user that does not affect the application's core functionality.
   * @type {{ [key: string]: any; }}
   * @memberof PostInvitationsRequest
   */
  user_metadata?: { [key: string]: any };
  /**
   * Number of seconds for which the invitation is valid before expiration. If unspecified or set to 0, this value defaults to 604800 seconds (7 days). Max value: 2592000 seconds (30 days).
   * @type {number}
   * @memberof PostInvitationsRequest
   */
  ttl_sec?: number;
  /**
   * List of roles IDs to associated with the user.
   * @type {Array<string>}
   * @memberof PostInvitationsRequest
   */
  roles?: Array<string>;
  /**
   * Whether the user will receive an invitation email (true) or no email (false), true by default
   * @type {boolean}
   * @memberof PostInvitationsRequest
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
   * @memberof PostLogStreamsRequestOneOf
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf
   */
  type: PostLogStreamsRequestOneOfTypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof PostLogStreamsRequestOneOf
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOfSink}
   * @memberof PostLogStreamsRequestOneOf
   */
  sink: GetLogStreams200ResponseInnerOneOfSink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf
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
   * @memberof PostLogStreamsRequestOneOf1
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf1
   */
  type: PostLogStreamsRequestOneOf1TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof PostLogStreamsRequestOneOf1
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {PostLogStreamsRequestOneOf1Sink}
   * @memberof PostLogStreamsRequestOneOf1
   */
  sink: PostLogStreamsRequestOneOf1Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf1
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
   * @memberof PostLogStreamsRequestOneOf1Sink
   */
  awsAccountId: string;
  /**
   * The region in which the EventBridge event source will be created
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf1Sink
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
   * @memberof PostLogStreamsRequestOneOf2
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf2
   */
  type: PostLogStreamsRequestOneOf2TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof PostLogStreamsRequestOneOf2
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {PostLogStreamsRequestOneOf2Sink}
   * @memberof PostLogStreamsRequestOneOf2
   */
  sink: PostLogStreamsRequestOneOf2Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf2
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
   * @memberof PostLogStreamsRequestOneOf2Sink
   */
  azureSubscriptionId: string;
  /**
   * Azure Region Name
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf2Sink
   */
  azureRegion: PostLogStreamsRequestOneOf2SinkAzureRegionEnum;
  /**
   * Resource Group
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf2Sink
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
   * @memberof PostLogStreamsRequestOneOf3
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf3
   */
  type: PostLogStreamsRequestOneOf3TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof PostLogStreamsRequestOneOf3
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf3Sink}
   * @memberof PostLogStreamsRequestOneOf3
   */
  sink: GetLogStreams200ResponseInnerOneOf3Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf3
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
   * @memberof PostLogStreamsRequestOneOf4
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf4
   */
  type: PostLogStreamsRequestOneOf4TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof PostLogStreamsRequestOneOf4
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf4Sink}
   * @memberof PostLogStreamsRequestOneOf4
   */
  sink: GetLogStreams200ResponseInnerOneOf4Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf4
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
   * @memberof PostLogStreamsRequestOneOf5
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf5
   */
  type: PostLogStreamsRequestOneOf5TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof PostLogStreamsRequestOneOf5
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf5Sink}
   * @memberof PostLogStreamsRequestOneOf5
   */
  sink: GetLogStreams200ResponseInnerOneOf5Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf5
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
   * @memberof PostLogStreamsRequestOneOf6
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf6
   */
  type: PostLogStreamsRequestOneOf6TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof PostLogStreamsRequestOneOf6
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf6Sink}
   * @memberof PostLogStreamsRequestOneOf6
   */
  sink: GetLogStreams200ResponseInnerOneOf6Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf6
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
   * @memberof PostLogStreamsRequestOneOf7
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf7
   */
  type: PostLogStreamsRequestOneOf7TypeEnum;
  /**
   * Only logs events matching these filters will be delivered by the stream. If omitted or empty, all events will be delivered.
   * @type {Array<GetLogStreams200ResponseInnerOneOfFiltersInner>}
   * @memberof PostLogStreamsRequestOneOf7
   */
  filters?: Array<GetLogStreams200ResponseInnerOneOfFiltersInner>;
  /**
   *
   * @type {GetLogStreams200ResponseInnerOneOf7Sink}
   * @memberof PostLogStreamsRequestOneOf7
   */
  sink: GetLogStreams200ResponseInnerOneOf7Sink;
  /**
   * The optional datetime (ISO 8601) to start streaming logs from
   * @type {string}
   * @memberof PostLogStreamsRequestOneOf7
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
   * @memberof PostMembersRequest
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
   * @memberof PostOrganizationMemberRolesRequest
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
   * @memberof PostOrganizationsRequest
   */
  name: string;
  /**
   * Friendly name of this organization.
   * @type {string}
   * @memberof PostOrganizationsRequest
   */
  display_name?: string;
  /**
   *
   * @type {GetOrganizations200ResponseOneOfInnerBranding}
   * @memberof PostOrganizationsRequest
   */
  branding?: GetOrganizations200ResponseOneOfInnerBranding;
  /**
   * Metadata associated with the organization, in the form of an object with string values (max 255 chars).  Maximum of 10 metadata properties allowed.
   * @type {{ [key: string]: any; }}
   * @memberof PostOrganizationsRequest
   */
  metadata?: { [key: string]: any };
  /**
   * Connections that will be enabled for this organization. See POST enabled_connections endpoint for the object format. (Max of 10 connections allowed)
   * @type {Array<PostOrganizationsRequestEnabledConnectionsInner>}
   * @memberof PostOrganizationsRequest
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
   * @memberof PostOrganizationsRequestEnabledConnectionsInner
   */
  connection_id: string;
  /**
   * When true, all users that log in with this connection will be automatically granted membership in the organization. When false, users must be granted membership in the organization before logging in with this connection.
   * @type {boolean}
   * @memberof PostOrganizationsRequestEnabledConnectionsInner
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
   * @memberof PostPasswordChange201Response
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
   * @memberof PostPasswordChangeRequest
   */
  result_url?: string;
  /**
   * user_id of for whom the ticket should be created.
   * @type {string}
   * @memberof PostPasswordChangeRequest
   */
  user_id?: string;
  /**
   * ID of the client. If provided for tenants using New Universal Login experience, the user will be prompted to redirect to the default login route of the corresponding application once the ticket is used. See <a target='' href='https://manage.local.dev.auth0.com/docs/universal-login/configure-default-login-routes#completing-the-password-reset-flow'>Configuring Default Login Routes</a> for more details.
   * @type {string}
   * @memberof PostPasswordChangeRequest
   */
  client_id?: string;
  /**
   * (Optional) Organization ID – the ID of the Organization. If provided, organization parameters will be made available to the email template and organization branding will be applied to the prompt. In addition, the redirect link in the prompt will include organization_id and organization_name query string parameters.
   * @type {string}
   * @memberof PostPasswordChangeRequest
   */
  organization_id?: string;
  /**
   * ID of the connection. If provided, allows the user to be specified using email instead of user_id. If you set this value, you must also send the email parameter. You cannot send user_id when specifying a connection_id.
   * @type {string}
   * @memberof PostPasswordChangeRequest
   */
  connection_id?: string;
  /**
   * Email address of the user for whom the tickets should be created. Requires the connection_id parameter. Cannot be specified when using user_id.
   * @type {string}
   * @memberof PostPasswordChangeRequest
   */
  email?: string;
  /**
   * Number of seconds for which the ticket is valid before expiration. If unspecified or set to 0, this value defaults to 432000 seconds (5 days).
   * @type {number}
   * @memberof PostPasswordChangeRequest
   */
  ttl_sec?: number;
  /**
   * Whether to set the email_verified attribute to true (true) or whether it should not be updated (false).
   * @type {boolean}
   * @memberof PostPasswordChangeRequest
   */
  mark_email_as_verified?: boolean;
  /**
   * Whether to include the email address as part of the returnUrl in the reset_email (true), or not (false).
   * @type {boolean}
   * @memberof PostPasswordChangeRequest
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
   * @memberof PostPermissionsRequest
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
   * @memberof PostProviderRequest
   */
  name: PostProviderRequestNameEnum;
  /**
   * Whether the provider is enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof PostProviderRequest
   */
  enabled?: boolean;
  /**
   * Email address to use as "from" when no other address specified.
   * @type {string}
   * @memberof PostProviderRequest
   */
  default_from_address?: string;
  /**
   *
   * @type {PostProviderRequestCredentials}
   * @memberof PostProviderRequest
   */
  credentials: PostProviderRequestCredentials;
  /**
   * Specific provider setting
   * @type {{ [key: string]: any; }}
   * @memberof PostProviderRequest
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
   * @memberof PostRecoveryCodeRegeneration200Response
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
   * @memberof PostResourceServersRequest
   */
  name?: string;
  /**
   * Unique identifier for the API used as the audience parameter on authorization calls. Can not be changed once set.
   * @type {string}
   * @memberof PostResourceServersRequest
   */
  identifier: string;
  /**
   * List of permissions (scopes) that this API uses.
   * @type {Array<Scope>}
   * @memberof PostResourceServersRequest
   */
  scopes?: Array<Scope>;
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   * @memberof PostResourceServersRequest
   */
  signing_alg?: PostResourceServersRequestSigningAlgEnum;
  /**
   * Secret used to sign tokens when using symmetric algorithms (HS256).
   * @type {string}
   * @memberof PostResourceServersRequest
   */
  signing_secret?: string;
  /**
   * Whether refresh tokens can be issued for this API (true) or not (false).
   * @type {boolean}
   * @memberof PostResourceServersRequest
   */
  allow_offline_access?: boolean;
  /**
   * Expiration value (in seconds) for access tokens issued for this API from the token endpoint.
   * @type {number}
   * @memberof PostResourceServersRequest
   */
  token_lifetime?: number;
  /**
   * Dialect of issued access token. Can be `access_token` or `access_token_authz` (includes permissions). Values can be `access_token` or `access_token_authz` (includes permissions).
   * @type {string}
   * @memberof PostResourceServersRequest
   */
  token_dialect?: PostResourceServersRequestTokenDialectEnum;
  /**
   * Whether to skip user consent for applications flagged as first party (true) or not (false).
   * @type {boolean}
   * @memberof PostResourceServersRequest
   */
  skip_consent_for_verifiable_first_party_clients?: boolean;
  /**
   * Whether to enforce authorization policies (true) or to ignore them (false).
   * @type {boolean}
   * @memberof PostResourceServersRequest
   */
  enforce_policies?: boolean;
  /**
   *
   * @type {object}
   * @memberof PostResourceServersRequest
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
   * @memberof PostRolePermissionAssignmentRequest
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
   * @memberof PostRolePermissionAssignmentRequestPermissionsInner
   */
  resource_server_identifier: string;
  /**
   * Name of this permission.
   * @type {string}
   * @memberof PostRolePermissionAssignmentRequestPermissionsInner
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
   * @memberof PostRoleUsersRequest
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
   * @memberof PostSigningKeys201Response
   */
  cert: string;
  /**
   * Next key id
   * @type {string}
   * @memberof PostSigningKeys201Response
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
   * @memberof PostTestAction200Response
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
   * @memberof PostTestActionRequest
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
   * @memberof PostTicket200Response
   */
  ticket_id?: string;
  /**
   * The url you can use to start enrollment
   * @type {string}
   * @memberof PostTicket200Response
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
   * @memberof PostUserRolesRequest
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
   * @memberof PostUsersExportsRequest
   */
  connection_id?: string;
  /**
   * Format of the file. Must be `json` or `csv`.
   * @type {string}
   * @memberof PostUsersExportsRequest
   */
  format?: PostUsersExportsRequestFormatEnum;
  /**
   * Limit the number of records.
   * @type {number}
   * @memberof PostUsersExportsRequest
   */
  limit?: number;
  /**
   * List of fields to be included in the CSV. Defaults to a predefined set of fields.
   * @type {Array<PostUsersExportsRequestFieldsInner>}
   * @memberof PostUsersExportsRequest
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
   * @memberof PostUsersExportsRequestFieldsInner
   */
  name: string;
  /**
   * Title of the column in the exported CSV.
   * @type {string}
   * @memberof PostUsersExportsRequestFieldsInner
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
   * @memberof PostVerificationEmailRequest
   */
  user_id: string;
  /**
   * client_id of the client (application). If no value provided, the global Client ID will be used.
   * @type {string}
   * @memberof PostVerificationEmailRequest
   */
  client_id?: string;
  /**
   *
   * @type {PostVerificationEmailRequestIdentity}
   * @memberof PostVerificationEmailRequest
   */
  identity?: PostVerificationEmailRequestIdentity;
  /**
   * (Optional) Organization ID – the ID of the Organization. If provided, organization parameters will be made available to the email template and organization branding will be applied to the prompt. In addition, the redirect link in the prompt will include organization_id and organization_name query string parameters.
   * @type {string}
   * @memberof PostVerificationEmailRequest
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
   * @memberof PostVerificationEmailRequestIdentity
   */
  user_id: string;
  /**
   * Identity provider name of the identity (e.g. `google-oauth2`).
   * @type {string}
   * @memberof PostVerificationEmailRequestIdentity
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
   * @memberof PostVerify200Response
   */
  custom_domain_id: string;
  /**
   * Domain name.
   * @type {string}
   * @memberof PostVerify200Response
   */
  domain: string;
  /**
   * Whether this is a primary domain (true) or not (false).
   * @type {boolean}
   * @memberof PostVerify200Response
   */
  primary: boolean;
  /**
   * Custom domain configuration status. Can be `disabled`, `pending`, `pending_verification`, or `ready`.
   * @type {string}
   * @memberof PostVerify200Response
   */
  status: PostVerify200ResponseStatusEnum;
  /**
   * Custom domain provisioning type. Can be `auth0_managed_certs` or `self_managed_certs`.
   * @type {string}
   * @memberof PostVerify200Response
   */
  type: PostVerify200ResponseTypeEnum;
  /**
   * CNAME API key header.
   * @type {string}
   * @memberof PostVerify200Response
   */
  cname_api_key?: string;
  /**
   * Intermediate address.
   * @type {string}
   * @memberof PostVerify200Response
   */
  origin_domain_name?: string;
  /**
   *
   * @type {PostCustomDomains201ResponseVerification}
   * @memberof PostVerify200Response
   */
  verification?: PostCustomDomains201ResponseVerification;
  /**
   * The HTTP header to fetch the client's IP address
   * @type {string}
   * @memberof PostVerify200Response
   */
  custom_client_ip_header?: string | null;
  /**
   * The TLS version policy
   * @type {string}
   * @memberof PostVerify200Response
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
   * @memberof PromptsSettings
   */
  universal_login_experience?: PromptsSettingsUniversalLoginExperienceEnum;
  /**
   * Whether identifier first is enabled or not
   * @type {boolean}
   * @memberof PromptsSettings
   */
  identifier_first?: boolean;
  /**
   * Use WebAuthn with Device Biometrics as the first authentication factor
   * @type {boolean}
   * @memberof PromptsSettings
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
   * @memberof PromptsSettingsUpdate
   */
  universal_login_experience?: PromptsSettingsUpdateUniversalLoginExperienceEnum;
  /**
   * Whether identifier first is enabled or not
   * @type {boolean}
   * @memberof PromptsSettingsUpdate
   */
  identifier_first?: boolean | null;
  /**
   * Use WebAuthn with Device Biometrics as the first authentication factor
   * @type {boolean}
   * @memberof PromptsSettingsUpdate
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
   *
   * @type {boolean}
   * @memberof PutApns200Response
   */
  sandbox?: boolean;
  /**
   *
   * @type {string}
   * @memberof PutApns200Response
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
   *
   * @type {boolean}
   * @memberof PutApnsRequest
   */
  sandbox?: boolean;
  /**
   *
   * @type {string}
   * @memberof PutApnsRequest
   */
  bundle_id?: string | null;
  /**
   *
   * @type {string}
   * @memberof PutApnsRequest
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
   *
   * @type {string}
   * @memberof PutAuthenticationMethodsRequestInner
   */
  type: PutAuthenticationMethodsRequestInnerTypeEnum;
  /**
   * The preferred authentication method for phone authentication method.
   * @type {string}
   * @memberof PutAuthenticationMethodsRequestInner
   */
  preferred_authentication_method?: PutAuthenticationMethodsRequestInnerPreferredAuthenticationMethodEnum;
  /**
   * AA human-readable label to identify the authentication method.
   * @type {string}
   * @memberof PutAuthenticationMethodsRequestInner
   */
  name?: string;
  /**
   * Applies to phone authentication methods only. The destination phone number used to send verification codes via text and voice.
   * @type {string}
   * @memberof PutAuthenticationMethodsRequestInner
   */
  phone_number?: string;
  /**
   * Applies to email authentication methods only. The email address used to send verification messages.
   * @type {string}
   * @memberof PutAuthenticationMethodsRequestInner
   */
  email?: string;
  /**
   * Applies to totp authentication methods only. The base32 encoded secret for TOTP generation.
   * @type {string}
   * @memberof PutAuthenticationMethodsRequestInner
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
   * @memberof PutFactorsByName200Response
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
   * @memberof PutFactorsByNameRequest
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
   *
   * @type {string}
   * @memberof PutFcmRequest
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
   * @memberof PutMessageTypesRequest
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
   *
   * @type {string}
   * @memberof PutPhoneProvidersRequest
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
   *
   * @type {string}
   * @memberof PutPnProvidersRequest
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
   * @memberof PutRulesConfigsByKey200Response
   */
  key: string;
  /**
   * Value for a rules config variable.
   * @type {string}
   * @memberof PutRulesConfigsByKey200Response
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
   * @memberof PutRulesConfigsByKeyRequest
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
   * @memberof PutSigningKeys200Response
   */
  cert: string;
  /**
   * Revoked key id
   * @type {string}
   * @memberof PutSigningKeys200Response
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
   *
   * @type {string}
   * @memberof PutSnsRequest
   */
  aws_access_key_id?: string | null;
  /**
   *
   * @type {string}
   * @memberof PutSnsRequest
   */
  aws_secret_access_key?: string | null;
  /**
   *
   * @type {string}
   * @memberof PutSnsRequest
   */
  aws_region?: string | null;
  /**
   *
   * @type {string}
   * @memberof PutSnsRequest
   */
  sns_apns_platform_application_arn?: string | null;
  /**
   *
   * @type {string}
   * @memberof PutSnsRequest
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
   * @memberof PutTwilioRequest
   */
  from?: string | null;
  /**
   * Copilot SID
   * @type {string}
   * @memberof PutTwilioRequest
   */
  messaging_service_sid?: string | null;
  /**
   * Twilio Authentication token
   * @type {string}
   * @memberof PutTwilioRequest
   */
  auth_token?: string | null;
  /**
   * Twilio SID
   * @type {string}
   * @memberof PutTwilioRequest
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
   *
   * @type {string}
   * @memberof PutUniversalLoginRequestOneOf
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
   * @memberof ResourceServer
   */
  id?: string;
  /**
   * Friendly name for this resource server. Can not contain `<` or `>` characters.
   * @type {string}
   * @memberof ResourceServer
   */
  name?: string;
  /**
   * Whether this is an Auth0 system API (true) or a custom API (false).
   * @type {boolean}
   * @memberof ResourceServer
   */
  is_system?: boolean;
  /**
   * Unique identifier for the API used as the audience parameter on authorization calls. Can not be changed once set.
   * @type {string}
   * @memberof ResourceServer
   */
  identifier?: string;
  /**
   * List of permissions (scopes) that this API uses.
   * @type {Array<Scope>}
   * @memberof ResourceServer
   */
  scopes?: Array<Scope>;
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   * @memberof ResourceServer
   */
  signing_alg?: ResourceServerSigningAlgEnum;
  /**
   * Secret used to sign tokens when using symmetric algorithms (HS256).
   * @type {string}
   * @memberof ResourceServer
   */
  signing_secret?: string;
  /**
   * Whether refresh tokens can be issued for this API (true) or not (false).
   * @type {boolean}
   * @memberof ResourceServer
   */
  allow_offline_access?: boolean;
  /**
   * Whether to skip user consent for applications flagged as first party (true) or not (false).
   * @type {boolean}
   * @memberof ResourceServer
   */
  skip_consent_for_verifiable_first_party_clients?: boolean;
  /**
   * Expiration value (in seconds) for access tokens issued for this API from the token endpoint.
   * @type {number}
   * @memberof ResourceServer
   */
  token_lifetime?: number;
  /**
   * Expiration value (in seconds) for access tokens issued for this API via Implicit or Hybrid Flows. Cannot be greater than the `token_lifetime` value.
   * @type {number}
   * @memberof ResourceServer
   */
  token_lifetime_for_web?: number;
  /**
   * Whether authorization polices are enforced (true) or unenforced (false).
   * @type {boolean}
   * @memberof ResourceServer
   */
  enforce_policies?: boolean;
  /**
   * Dialect of access tokens that should be issued. Can be `access_token` or `access_token_authz` (includes permissions).
   * @type {string}
   * @memberof ResourceServer
   */
  token_dialect?: ResourceServerTokenDialectEnum;
  /**
   *
   * @type {object}
   * @memberof ResourceServer
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
   * @memberof ResourceServerUpdate
   */
  name?: string;
  /**
   * List of permissions (scopes) that this API uses.
   * @type {Array<Scope>}
   * @memberof ResourceServerUpdate
   */
  scopes?: Array<Scope>;
  /**
   * Algorithm used to sign JWTs. Can be `HS256` or `RS256`.
   * @type {string}
   * @memberof ResourceServerUpdate
   */
  signing_alg?: ResourceServerUpdateSigningAlgEnum;
  /**
   * Secret used to sign tokens when using symmetric algorithms (HS256).
   * @type {string}
   * @memberof ResourceServerUpdate
   */
  signing_secret?: string;
  /**
   * Whether to skip user consent for applications flagged as first party (true) or not (false).
   * @type {boolean}
   * @memberof ResourceServerUpdate
   */
  skip_consent_for_verifiable_first_party_clients?: boolean;
  /**
   * Whether refresh tokens can be issued for this API (true) or not (false).
   * @type {boolean}
   * @memberof ResourceServerUpdate
   */
  allow_offline_access?: boolean;
  /**
   * Expiration value (in seconds) for access tokens issued for this API from the token endpoint.
   * @type {number}
   * @memberof ResourceServerUpdate
   */
  token_lifetime?: number;
  /**
   * Dialect of issued access token. Can be `access_token` or `access_token_authz` (includes permissions).
   * @type {string}
   * @memberof ResourceServerUpdate
   */
  token_dialect?: ResourceServerUpdateTokenDialectEnum;
  /**
   * Whether authorization policies are enforced (true) or not enforced (false).
   * @type {boolean}
   * @memberof ResourceServerUpdate
   */
  enforce_policies?: boolean;
  /**
   *
   * @type {object}
   * @memberof ResourceServerUpdate
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
   * @memberof RoleCreate
   */
  name: string;
  /**
   * Description of the role.
   * @type {string}
   * @memberof RoleCreate
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
   * @memberof RoleUpdate
   */
  name?: string;
  /**
   * Description of this role.
   * @type {string}
   * @memberof RoleUpdate
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
   * @memberof Rule
   */
  name?: string;
  /**
   * ID of this rule.
   * @type {string}
   * @memberof Rule
   */
  id?: string;
  /**
   * Whether the rule is enabled (true), or disabled (false).
   * @type {boolean}
   * @memberof Rule
   */
  enabled?: boolean;
  /**
   * Code to be executed when this rule runs.
   * @type {string}
   * @memberof Rule
   */
  script?: string;
  /**
   * Order that this rule should execute in relative to other rules. Lower-valued rules execute first.
   * @type {number}
   * @memberof Rule
   */
  order?: number;
  /**
   * Execution stage of this rule. Can be `login_success`, `login_failure`, or `pre_authorize`.
   * @type {string}
   * @memberof Rule
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
   * @memberof RuleCreate
   */
  name: string;
  /**
   * Code to be executed when this rule runs.
   * @type {string}
   * @memberof RuleCreate
   */
  script: string;
  /**
   * Order that this rule should execute in relative to other rules. Lower-valued rules execute first.
   * @type {number}
   * @memberof RuleCreate
   */
  order?: number;
  /**
   * Whether the rule is enabled (true), or disabled (false).
   * @type {boolean}
   * @memberof RuleCreate
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
   * @memberof RuleUpdate
   */
  script?: string;
  /**
   * Name of this rule.
   * @type {string}
   * @memberof RuleUpdate
   */
  name?: string;
  /**
   * Order that this rule should execute in relative to other rules. Lower-valued rules execute first.
   * @type {number}
   * @memberof RuleUpdate
   */
  order?: number;
  /**
   * Whether the rule is enabled (true), or disabled (false).
   * @type {boolean}
   * @memberof RuleUpdate
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
   * @memberof Scope
   */
  value: string;
  /**
   * User-friendly description of this scope.
   * @type {string}
   * @memberof Scope
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
   *
   * @type {string}
   * @memberof SnsFactorProvider
   */
  aws_access_key_id?: string | null;
  /**
   *
   * @type {string}
   * @memberof SnsFactorProvider
   */
  aws_secret_access_key?: string | null;
  /**
   *
   * @type {string}
   * @memberof SnsFactorProvider
   */
  aws_region?: string | null;
  /**
   *
   * @type {string}
   * @memberof SnsFactorProvider
   */
  sns_apns_platform_application_arn?: string | null;
  /**
   *
   * @type {string}
   * @memberof SnsFactorProvider
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
   * @memberof StatsEntry
   */
  date?: string;
  /**
   * Number of logins on this date.
   * @type {number}
   * @memberof StatsEntry
   */
  logins?: number;
  /**
   * Number of signups on this date.
   * @type {number}
   * @memberof StatsEntry
   */
  signups?: number;
  /**
   * Number of breached-password detections on this date (subscription required).
   * @type {number}
   * @memberof StatsEntry
   */
  leaked_passwords?: number;
  /**
   * Date and time this stats entry was last updated in ISO 8601 format.
   * @type {string}
   * @memberof StatsEntry
   */
  updated_at?: string;
  /**
   * Approximate date and time the first event occurred in ISO 8601 format.
   * @type {string}
   * @memberof StatsEntry
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
   * @memberof TemplateMessages
   */
  enrollment_message: string;
  /**
   * Message sent to the user when they are prompted to verify their account.
   * @type {string}
   * @memberof TemplateMessages
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
   *
   * @type {TenantSettingsChangePassword}
   * @memberof TenantSettings
   */
  change_password?: TenantSettingsChangePassword | null;
  /**
   *
   * @type {TenantSettingsGuardianMfaPage}
   * @memberof TenantSettings
   */
  guardian_mfa_page?: TenantSettingsGuardianMfaPage | null;
  /**
   * Default audience for API authorization.
   * @type {string}
   * @memberof TenantSettings
   */
  default_audience?: string;
  /**
   * Name of connection used for password grants at the `/token`endpoint. The following connection types are supported: LDAP, AD, Database Connections, Passwordless, Windows Azure Active Directory, ADFS.
   * @type {string}
   * @memberof TenantSettings
   */
  default_directory?: string;
  /**
   *
   * @type {TenantSettingsErrorPage}
   * @memberof TenantSettings
   */
  error_page?: TenantSettingsErrorPage | null;
  /**
   *
   * @type {TenantSettingsDeviceFlow}
   * @memberof TenantSettings
   */
  device_flow?: TenantSettingsDeviceFlow | null;
  /**
   *
   * @type {TenantSettingsFlags}
   * @memberof TenantSettings
   */
  flags?: TenantSettingsFlags;
  /**
   * Friendly name for this tenant.
   * @type {string}
   * @memberof TenantSettings
   */
  friendly_name?: string;
  /**
   * URL of logo to be shown for this tenant (recommended size: 150x150)
   * @type {string}
   * @memberof TenantSettings
   */
  picture_url?: string;
  /**
   * End-user support email address.
   * @type {string}
   * @memberof TenantSettings
   */
  support_email?: string;
  /**
   * End-user support URL.
   * @type {string}
   * @memberof TenantSettings
   */
  support_url?: string;
  /**
   * URLs that are valid to redirect to after logout from Auth0.
   * @type {Array<string>}
   * @memberof TenantSettings
   */
  allowed_logout_urls?: Array<string>;
  /**
   * Number of hours a session will stay valid.
   * @type {number}
   * @memberof TenantSettings
   */
  session_lifetime?: number;
  /**
   * Number of hours for which a session can be inactive before the user must log in again.
   * @type {number}
   * @memberof TenantSettings
   */
  idle_session_lifetime?: number;
  /**
   * Selected sandbox version for the extensibility environment.
   * @type {string}
   * @memberof TenantSettings
   */
  sandbox_version?: string;
  /**
   * Available sandbox versions for the extensibility environment.
   * @type {Array<string>}
   * @memberof TenantSettings
   */
  sandbox_versions_available?: Array<string>;
  /**
   * The default absolute redirection uri, must be https
   * @type {string}
   * @memberof TenantSettings
   */
  default_redirection_uri?: string;
  /**
   * Supported locales for the user interface.
   * @type {Array<string>}
   * @memberof TenantSettings
   */
  enabled_locales?: Array<TenantSettingsEnabledLocalesEnum>;
  /**
   *
   * @type {TenantSettingsSessionCookie}
   * @memberof TenantSettings
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
   * @memberof TenantSettingsChangePassword
   */
  enabled?: boolean;
  /**
   * Custom change password HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> supported).
   * @type {string}
   * @memberof TenantSettingsChangePassword
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
   * @memberof TenantSettingsDeviceFlow
   */
  charset?: TenantSettingsDeviceFlowCharsetEnum;
  /**
   * Mask used to format a generated User Code into a friendly, readable format.
   * @type {string}
   * @memberof TenantSettingsDeviceFlow
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
   * @memberof TenantSettingsErrorPage
   */
  html?: string;
  /**
   * Whether to show the link to log as part of the default error page (true, default) or not to show the link (false).
   * @type {boolean}
   * @memberof TenantSettingsErrorPage
   */
  show_log_link?: boolean;
  /**
   * URL to redirect to when an error occurs instead of showing the default error page.
   * @type {string}
   * @memberof TenantSettingsErrorPage
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
   * @memberof TenantSettingsFlags
   */
  change_pwd_flow_v1?: boolean;
  /**
   * Whether the APIs section is enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  enable_apis_section?: boolean;
  /**
   * Whether the impersonation functionality has been disabled (true) or not (false). Read-only.
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  disable_impersonation?: boolean;
  /**
   * Whether all current connections should be enabled when a new client (application) is created (true, default) or not (false).
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  enable_client_connections?: boolean;
  /**
   * Whether advanced API Authorization scenarios are enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  enable_pipeline2?: boolean;
  /**
   * If enabled, clients are able to add legacy delegation grants.
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  allow_legacy_delegation_grant_types?: boolean;
  /**
   * If enabled, clients are able to add legacy RO grants.
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  allow_legacy_ro_grant_types?: boolean;
  /**
   * Whether the legacy `/tokeninfo` endpoint is enabled for your account (true) or unavailable (false).
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  allow_legacy_tokeninfo_endpoint?: boolean;
  /**
   * Whether ID tokens and the userinfo endpoint includes a complete user profile (true) or only OpenID Connect claims (false).
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  enable_legacy_profile?: boolean;
  /**
   * Whether ID tokens can be used to authorize some types of requests to API v2 (true) not not (false).
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  enable_idtoken_api2?: boolean;
  /**
   * Whether the public sign up process shows a user_exists error (true) or a generic error (false) if the user already exists.
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  enable_public_signup_user_exists_error?: boolean;
  /**
   * Whether users are prompted to confirm log in before SSO redirection (false) or are not prompted (true).
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  enable_sso?: boolean;
  /**
   * Whether the `enable_sso` setting can be changed (true) or not (false).
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  allow_changing_enable_sso?: boolean;
  /**
   * Whether classic Universal Login prompts include additional security headers to prevent clickjacking (true) or no safeguard (false).
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  disable_clickjack_protection_headers?: boolean;
  /**
   * Do not Publish Enterprise Connections Information with IdP domains on the lock configuration file.
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  no_disclose_enterprise_connections?: boolean;
  /**
   * Enforce client authentication for passwordless start.
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  enforce_client_authentication_on_passwordless_start?: boolean;
  /**
   * Enables the email verification flow during login for Azure AD and ADFS connections
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  enable_adfs_waad_email_verification?: boolean;
  /**
   * Delete underlying grant when a Refresh Token is revoked via the Authentication API.
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  revoke_refresh_token_grant?: boolean;
  /**
   * Enables beta access to log streaming changes
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  dashboard_log_streams_next?: boolean;
  /**
   * Enables new insights activity page view
   * @type {boolean}
   * @memberof TenantSettingsFlags
   */
  dashboard_insights_view?: boolean;
  /**
   * Disables SAML fields map fix for bad mappings with repeated attributes
   * @type {boolean}
   * @memberof TenantSettingsFlags
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
   * @memberof TenantSettingsGuardianMfaPage
   */
  enabled?: boolean;
  /**
   *  Custom Guardian HTML (<a href='https://github.com/Shopify/liquid/wiki/Liquid-for-Designers'>Liquid syntax</a> is supported).
   * @type {string}
   * @memberof TenantSettingsGuardianMfaPage
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
   * @memberof TenantSettingsSessionCookie
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
   *
   * @type {TenantSettingsChangePassword}
   * @memberof TenantSettingsUpdate
   */
  change_password?: TenantSettingsChangePassword | null;
  /**
   *
   * @type {TenantSettingsUpdateDeviceFlow}
   * @memberof TenantSettingsUpdate
   */
  device_flow?: TenantSettingsUpdateDeviceFlow | null;
  /**
   *
   * @type {TenantSettingsGuardianMfaPage}
   * @memberof TenantSettingsUpdate
   */
  guardian_mfa_page?: TenantSettingsGuardianMfaPage | null;
  /**
   * Default audience for API Authorization.
   * @type {string}
   * @memberof TenantSettingsUpdate
   */
  default_audience?: string;
  /**
   * Name of connection used for password grants at the `/token` endpoint. The following connection types are supported: LDAP, AD, Database Connections, Passwordless, Windows Azure Active Directory, ADFS.
   * @type {string}
   * @memberof TenantSettingsUpdate
   */
  default_directory?: string;
  /**
   *
   * @type {TenantSettingsErrorPage}
   * @memberof TenantSettingsUpdate
   */
  error_page?: TenantSettingsErrorPage | null;
  /**
   *
   * @type {TenantSettingsUpdateFlags}
   * @memberof TenantSettingsUpdate
   */
  flags?: TenantSettingsUpdateFlags;
  /**
   * Friendly name for this tenant.
   * @type {string}
   * @memberof TenantSettingsUpdate
   */
  friendly_name?: string;
  /**
   * URL of logo to be shown for this tenant (recommended size: 150x150)
   * @type {string}
   * @memberof TenantSettingsUpdate
   */
  picture_url?: string;
  /**
   * End-user support email.
   * @type {string}
   * @memberof TenantSettingsUpdate
   */
  support_email?: string;
  /**
   * End-user support url.
   * @type {string}
   * @memberof TenantSettingsUpdate
   */
  support_url?: string;
  /**
   * URLs that are valid to redirect to after logout from Auth0.
   * @type {Array<string>}
   * @memberof TenantSettingsUpdate
   */
  allowed_logout_urls?: Array<string>;
  /**
   * Number of hours a session will stay valid.
   * @type {number}
   * @memberof TenantSettingsUpdate
   */
  session_lifetime?: number;
  /**
   * Number of hours for which a session can be inactive before the user must log in again.
   * @type {number}
   * @memberof TenantSettingsUpdate
   */
  idle_session_lifetime?: number;
  /**
   * Selected sandbox version for the extensibility environment
   * @type {string}
   * @memberof TenantSettingsUpdate
   */
  sandbox_version?: string;
  /**
   * The default absolute redirection uri, must be https
   * @type {string}
   * @memberof TenantSettingsUpdate
   */
  default_redirection_uri?: string;
  /**
   * Supported locales for the user interface
   * @type {Array<string>}
   * @memberof TenantSettingsUpdate
   */
  enabled_locales?: Array<TenantSettingsUpdateEnabledLocalesEnum>;
  /**
   *
   * @type {TenantSettingsSessionCookie}
   * @memberof TenantSettingsUpdate
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
   * @memberof TenantSettingsUpdateDeviceFlow
   */
  charset?: TenantSettingsUpdateDeviceFlowCharsetEnum;
  /**
   * Mask used to format a generated User Code into a friendly, readable format.
   * @type {string}
   * @memberof TenantSettingsUpdateDeviceFlow
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
   * @memberof TenantSettingsUpdateFlags
   */
  change_pwd_flow_v1?: TenantSettingsUpdateFlagsChangePwdFlowV1Enum;
  /**
   * Whether all current connections should be enabled when a new client (application) is created (true, default) or not (false).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_client_connections?: boolean;
  /**
   * Whether the APIs section is enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_apis_section?: boolean;
  /**
   * Whether advanced API Authorization scenarios are enabled (true) or disabled (false).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_pipeline2?: boolean;
  /**
   *  Whether third-party developers can <a href='https://auth0.com/docs/api-auth/dynamic-client-registration'>dynamically register</a> applications for your APIs (true) or not (false). This flag enables dynamic client registration.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_dynamic_client_registration?: boolean;
  /**
   * Whether emails sent by Auth0 for change password, verification etc. should use your verified custom domain (true) or your auth0.com sub-domain (false).  Affects all emails, links, and URLs. Email will fail if the custom domain is not verified.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_custom_domain_in_emails?: boolean;
  /**
   * Whether the legacy `/tokeninfo` endpoint is enabled for your account (true) or unavailable (false).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  allow_legacy_tokeninfo_endpoint?: boolean;
  /**
   * Whether ID tokens and the userinfo endpoint includes a complete user profile (true) or only OpenID Connect claims (false).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_legacy_profile?: boolean;
  /**
   * Whether ID tokens can be used to authorize some types of requests to API v2 (true) not not (false).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_idtoken_api2?: boolean;
  /**
   * Whether the public sign up process shows a user_exists error (true) or a generic error (false) if the user already exists.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_public_signup_user_exists_error?: boolean;
  /**
   *  Whether the legacy delegation endpoint will be enabled for your account (true) or not available (false).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  allow_legacy_delegation_grant_types?: boolean;
  /**
   * Whether the legacy `auth/ro` endpoint (used with resource owner password and passwordless features) will be enabled for your account (true) or not available (false).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  allow_legacy_ro_grant_types?: boolean;
  /**
   * Whether users are prompted to confirm log in before SSO redirection (false) or are not prompted (true).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_sso?: boolean;
  /**
   * Whether classic Universal Login prompts include additional security headers to prevent clickjacking (true) or no safeguard (false).
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  disable_clickjack_protection_headers?: boolean;
  /**
   * Do not Publish Enterprise Connections Information with IdP domains on the lock configuration file.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  no_disclose_enterprise_connections?: boolean;
  /**
   * If true, SMS phone numbers will not be obfuscated in Management API GET calls.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  disable_management_api_sms_obfuscation?: boolean;
  /**
   * Enforce client authentication for passwordless start.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enforce_client_authentication_on_passwordless_start?: boolean;
  /**
   * Changes email_verified behavior for Azure AD/ADFS connections when enabled. Sets email_verified to false otherwise.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  trust_azure_adfs_email_verified_connection_property?: boolean;
  /**
   * Enables the email verification flow during login for Azure AD and ADFS connections.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  enable_adfs_waad_email_verification?: boolean;
  /**
   * Delete underlying grant when a Refresh Token is revoked via the Authentication API.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  revoke_refresh_token_grant?: boolean;
  /**
   * Enables beta access to log streaming changes.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  dashboard_log_streams_next?: boolean;
  /**
   * Enables new insights activity page view.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
   */
  dashboard_insights_view?: boolean;
  /**
   * Disables SAML fields map fix for bad mappings with repeated attributes.
   * @type {boolean}
   * @memberof TenantSettingsUpdateFlags
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
   * @memberof Token
   */
  aud?: string;
  /**
   * jti (unique ID within aud) of the blacklisted JWT.
   * @type {string}
   * @memberof Token
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
   * @memberof TwilioFactorProvider
   */
  from?: string | null;
  /**
   * Copilot SID
   * @type {string}
   * @memberof TwilioFactorProvider
   */
  messaging_service_sid?: string | null;
  /**
   * Twilio Authentication token
   * @type {string}
   * @memberof TwilioFactorProvider
   */
  auth_token?: string | null;
  /**
   * Twilio SID
   * @type {string}
   * @memberof TwilioFactorProvider
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
   * @memberof UserBlock
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
   * @memberof UserBlockBlockedForInner
   */
  identifier?: string;
  /**
   * IP Address
   * @type {string}
   * @memberof UserBlockBlockedForInner
   */
  ip?: string;
  /**
   * Connection identifier
   * @type {string}
   * @memberof UserBlockBlockedForInner
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
   * @memberof UserCreate
   */
  email?: string;
  /**
   * The user's phone number (following the E.164 recommendation), only valid for users from SMS connections.
   * @type {string}
   * @memberof UserCreate
   */
  phone_number?: string;
  /**
   * Data related to the user that does not affect the application's core functionality.
   * @type {{ [key: string]: any; }}
   * @memberof UserCreate
   */
  user_metadata?: { [key: string]: any };
  /**
   * Whether this user was blocked by an administrator (true) or not (false).
   * @type {boolean}
   * @memberof UserCreate
   */
  blocked?: boolean;
  /**
   * Whether this email address is verified (true) or unverified (false). User will receive a verification email after creation if `email_verified` is false or not specified
   * @type {boolean}
   * @memberof UserCreate
   */
  email_verified?: boolean;
  /**
   * Whether this phone number has been verified (true) or not (false).
   * @type {boolean}
   * @memberof UserCreate
   */
  phone_verified?: boolean;
  /**
   *
   * @type {GetInvitations200ResponseOneOfInnerAppMetadata}
   * @memberof UserCreate
   */
  app_metadata?: GetInvitations200ResponseOneOfInnerAppMetadata;
  /**
   * The user's given name(s).
   * @type {string}
   * @memberof UserCreate
   */
  given_name?: string;
  /**
   * The user's family name(s).
   * @type {string}
   * @memberof UserCreate
   */
  family_name?: string;
  /**
   * The user's full name.
   * @type {string}
   * @memberof UserCreate
   */
  name?: string;
  /**
   * The user's nickname.
   * @type {string}
   * @memberof UserCreate
   */
  nickname?: string;
  /**
   * A URI pointing to the user's picture.
   * @type {string}
   * @memberof UserCreate
   */
  picture?: string;
  /**
   * The external user's id provided by the identity provider.
   * @type {string}
   * @memberof UserCreate
   */
  user_id?: string;
  /**
   * Name of the connection this user should be created in.
   * @type {string}
   * @memberof UserCreate
   */
  connection: string;
  /**
   * Initial password for this user (mandatory only for auth0 connection strategy).
   * @type {string}
   * @memberof UserCreate
   */
  password?: string;
  /**
   * Whether the user will receive a verification email after creation (true) or no email (false). Overrides behavior of `email_verified` parameter.
   * @type {boolean}
   * @memberof UserCreate
   */
  verify_email?: boolean;
  /**
   * The user's username. Only valid if the connection requires a username.
   * @type {string}
   * @memberof UserCreate
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
   * @memberof UserEnrollment
   */
  id?: string;
  /**
   * Status of this enrollment. Can be `pending` or `confirmed`.
   * @type {string}
   * @memberof UserEnrollment
   */
  status?: UserEnrollmentStatusEnum;
  /**
   * Type of enrollment.
   * @type {string}
   * @memberof UserEnrollment
   */
  type?: string;
  /**
   * Name of enrollment (usually phone number).
   * @type {string}
   * @memberof UserEnrollment
   */
  name?: string;
  /**
   * Device identifier (usually phone identifier) of this enrollment.
   * @type {string}
   * @memberof UserEnrollment
   */
  identifier?: string;
  /**
   * Phone number for this enrollment.
   * @type {string}
   * @memberof UserEnrollment
   */
  phone_number?: string;
  /**
   * Authentication method for this enrollment. Can be `authenticator`, `guardian`, `sms`, `webauthn-roaming`, or `webauthn-platform`.
   * @type {string}
   * @memberof UserEnrollment
   */
  auth_method?: UserEnrollmentAuthMethodEnum;
  /**
   * Start date and time of this enrollment.
   * @type {string}
   * @memberof UserEnrollment
   */
  enrolled_at?: string;
  /**
   * Last authentication date and time of this enrollment.
   * @type {string}
   * @memberof UserEnrollment
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
   * @memberof UserGrant
   */
  id?: string;
  /**
   * ID of the client.
   * @type {string}
   * @memberof UserGrant
   */
  clientID?: string;
  /**
   * ID of the user.
   * @type {string}
   * @memberof UserGrant
   */
  user_id?: string;
  /**
   * Audience of the grant.
   * @type {string}
   * @memberof UserGrant
   */
  audience?: string;
  /**
   * Scopes included in this grant.
   * @type {Array<string>}
   * @memberof UserGrant
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
   * @memberof UserIdentity
   */
  connection: string;
  /**
   *
   * @type {UserIdentityUserId}
   * @memberof UserIdentity
   */
  user_id: UserIdentityUserId;
  /**
   * Type of identity provider.
   * @type {string}
   * @memberof UserIdentity
   */
  provider: string;
  /**
   *
   * @type {UserProfile}
   * @memberof UserIdentity
   */
  profileData?: UserProfile;
  /**
   * Whether the identity provider is a social provider (true) or not (false).
   * @type {boolean}
   * @memberof UserIdentity
   */
  isSocial?: boolean;
  /**
   * IDP access token returned if scope `read:user_idp_tokens` is defined.
   * @type {string}
   * @memberof UserIdentity
   */
  access_token?: string;
  /**
   * IDP access token secret returned only if `scope read:user_idp_tokens` is defined.
   * @type {string}
   * @memberof UserIdentity
   */
  access_token_secret?: string;
  /**
   * IDP refresh token returned only if scope `read:user_idp_tokens` is defined.
   * @type {string}
   * @memberof UserIdentity
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
   * @memberof UserProfile
   */
  email?: string;
  /**
   * Whether this email address is verified (true) or unverified (false).
   * @type {boolean}
   * @memberof UserProfile
   */
  email_verified?: boolean;
  /**
   * Name of this user.
   * @type {string}
   * @memberof UserProfile
   */
  name?: string;
  /**
   * Username of this user.
   * @type {string}
   * @memberof UserProfile
   */
  username?: string;
  /**
   * Given name/first name/forename of this user.
   * @type {string}
   * @memberof UserProfile
   */
  given_name?: string;
  /**
   * Phone number for this user.
   * @type {string}
   * @memberof UserProfile
   */
  phone_number?: string;
  /**
   * Whether this phone number is verified (true) or unverified (false).
   * @type {boolean}
   * @memberof UserProfile
   */
  phone_verified?: boolean;
  /**
   * Family name/last name/surname of this user.
   * @type {string}
   * @memberof UserProfile
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
   * @memberof UserUpdate
   */
  blocked?: boolean;
  /**
   * Whether this email address is verified (true) or unverified (false). If set to false the user will not receive a verification email unless `verify_email` is set to true.
   * @type {boolean}
   * @memberof UserUpdate
   */
  email_verified?: boolean;
  /**
   * Email address of this user.
   * @type {string}
   * @memberof UserUpdate
   */
  email?: string;
  /**
   * The user's phone number (following the E.164 recommendation), only valid for users from SMS connections.
   * @type {string}
   * @memberof UserUpdate
   */
  phone_number?: string;
  /**
   * Whether this phone number has been verified (true) or not (false).
   * @type {boolean}
   * @memberof UserUpdate
   */
  phone_verified?: boolean;
  /**
   * User metadata to which this user has read/write access.
   * @type {{ [key: string]: any; }}
   * @memberof UserUpdate
   */
  user_metadata?: { [key: string]: any } | null;
  /**
   *
   * @type {UserUpdateAppMetadata}
   * @memberof UserUpdate
   */
  app_metadata?: UserUpdateAppMetadata | null;
  /**
   * Given name/first name/forename of this user.
   * @type {string}
   * @memberof UserUpdate
   */
  given_name?: string | null;
  /**
   * Family name/last name/surname of this user.
   * @type {string}
   * @memberof UserUpdate
   */
  family_name?: string | null;
  /**
   * Name of this user.
   * @type {string}
   * @memberof UserUpdate
   */
  name?: string | null;
  /**
   * Preferred nickname or alias of this user.
   * @type {string}
   * @memberof UserUpdate
   */
  nickname?: string | null;
  /**
   * URL to picture, photo, or avatar of this user.
   * @type {string}
   * @memberof UserUpdate
   */
  picture?: string | null;
  /**
   * Whether this user will receive a verification email after creation (true) or no email (false). Overrides behavior of `email_verified` parameter.
   * @type {boolean}
   * @memberof UserUpdate
   */
  verify_email?: boolean;
  /**
   * Whether this user will receive a text after changing the phone number (true) or no text (false). Only valid when changing phone number.
   * @type {boolean}
   * @memberof UserUpdate
   */
  verify_phone_number?: boolean;
  /**
   * New password for this user (mandatory for non-SMS connections).
   * @type {string}
   * @memberof UserUpdate
   */
  password?: string;
  /**
   * ID of the connection this user should be created in.
   * @type {string}
   * @memberof UserUpdate
   */
  connection?: string;
  /**
   * Auth0 client ID. Only valid when updating email address.
   * @type {string}
   * @memberof UserUpdate
   */
  client_id?: string;
  /**
   * The user's username. Only valid if the connection requires a username.
   * @type {string}
   * @memberof UserUpdate
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
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  clientID?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  globalClientID?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  global_client_id?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  email_verified?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  user_id?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  identities?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  lastIP?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  lastLogin?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  metadata?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  created_at?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  loginsCount?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  _id?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  email?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  blocked?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  __tenant?: any | null;
  /**
   *
   * @type {any}
   * @memberof UserUpdateAppMetadata
   */
  updated_at?: any | null;
}
