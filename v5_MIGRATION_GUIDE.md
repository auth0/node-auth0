# V5 Migration Guide

A guide to migrating the Auth0 TS SDK from `4.x` to `5.x`.

- [Overall changes](#overall-changes)
  - [Accepted Node versions](#accepted-node-versions)
  - [Authentication API](#authentication-api)
  - [Management API](#management-api)
- [Specific changes to the Management API](#specific-changes-to-the-management-api)
  - [Method name changes](#method-name-changes)
  - [Auto-pagination](#auto-pagination)
  - [Management namespace](#management-namespace)
  - [Unified error type](#unified-error-type)
  - [Import users takes a FileLike](#import-users-takes-a-filelike)

## Overall changes

### Accepted Node versions

This SDK is guaranteed to work with the following versions of Node: `"^20.19.0 || ^22.12.0 || ^24.0.0"`. (So any Node 20 version starting from 20.19.0; any Node 22 version starting from 22.12.0; and any Node 24 version.) Other non-production versions of Node may work, but are not directly supported.

### Authentication API

This major version change does not affect the Authentication API. Any code written for the Authentication API in the `4.x` version should work in the `5.x` version.

### Management API

Instead, v5 introduces a version of the Management API SDK created with [Fern](https://github.com/fern-api/fern). Fern generates its SDKs, including this one, directly from Auth0's OpenAPI specification; this procedural approach introduces a number of benefits and a number of changes to the SDK, which we'll outline below.

## Specific changes to the Management API

### Method name changes

Most method names are now in tighter lock-step with their respective endpoints (see the [Management API documentation](https://auth0.com/docs/api/management/v2) for information on all available endpoints). For instance, the method to delete a session, invoked through the endpoint `DELETE /v2/sessions/{id}`, can be called as `client.sessions.delete(id)`:

```ts
import { ManagementClient } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

await client.sessions.delete("id");
```

and the method to get details about a guardian's multi-factor-authentication phone provider, invoked through the endpoint `GET  /v2/guardian/factors/phone/selected-provider`, can be called as `client.guardian.factors.phone.getSelectedProvider()`:

```ts
import { ManagementClient } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

const selectedProvider = await client.guardian.factors.phone.getSelectedProvider();
```

In the common situation where there are two similar `GET` methods, one that "gets one" and another that "gets all" of a particular resource, the "gets all" method is typically found under the name `list()`, as in the respective method for the endpoint `GET /v2/users`: `client.users.list()`.

<details>
  <summary>A complete list of method name changes:</summary>

Methods marked :new: are new to v5; they did not exist in v4. Methods marked :x: have been removed as of v5. Note these methods are typically found in the namespace of a `ManagementClient` instance.

| Before | After |
|--------|-------|
| `actions.getAll()` | `actions.list()` |
| `actions.create()` | `actions.create()` |
| `actions.getVersions()` | `actions.versions.list()` |
| `actions.getVersion()` | `actions.versions.get()` |
| `actions.deployVersion()` | `actions.versions.deploy()` |
| `actions.get()` | `actions.get()` |
| `actions.delete()` | `actions.delete()` |
| `actions.update()` | `actions.update()` |
| `actions.deploy()` | `actions.deploy()` |
| `actions.test()` | `actions.test()` |
| `actions.getExecution()` | `actions.executions.get()` |
| `actions.getAllTriggers()` | `actions.triggers.list()` |
| `actions.getTriggerBindings()` | `actions.triggers.bindings.list()` |
| `actions.updateTriggerBindings()` | `actions.triggers.bindings.updateMany()` |
| `anomaly.checkIfIpIsBlocked()` | `anomaly.blocks.checkIp()` |
| `anomaly.deleteBlockedIp()` | `anomaly.blocks.unblockIp()` |
| `attackProtection.getBreachedPasswordDetectionConfig()` | `attackProtection.breachedPasswordDetection.get()` |
| `attackProtection.updateBreachedPasswordDetectionConfig()` | `attackProtection.breachedPasswordDetection.update()` |
| `attackProtection.getBruteForceConfig()` | `attackProtection.bruteForceProtection.get()` |
| `attackProtection.updateBruteForceConfig()` | `attackProtection.bruteForceProtection.update()` |
| `attackProtection.getSuspiciousIpThrottlingConfig()` | `attackProtection.suspiciousIpThrottling.get()` |
| `attackProtection.updateSuspiciousIpThrottlingConfig()` | `attackProtection.suspiciousIpThrottling.update()` |
| `blacklists.getAll()` | :x: Removed in v5 |
| `blacklists.add()` | :x: Removed in v5 |
| `branding.getSettings()` | `branding.get()` |
| `branding.updateSettings()` | `branding.update()` |
| `branding.getUniversalLoginTemplate()` | `branding.templates.getUniversalLogin()` |
| `branding.deleteUniversalLoginTemplate()` | `branding.templates.deleteUniversalLogin()` |
| `branding.setUniversalLoginTemplate()` | `branding.templates.updateUniversalLogin()` |
| `branding.createTheme()` | `branding.themes.create()` |
| `branding.getDefaultTheme()` | `branding.themes.getDefault()` |
| `branding.getTheme()` | `branding.themes.get()` |
| `branding.deleteTheme()` | `branding.themes.delete()` |
| `branding.updateTheme()` | `branding.themes.update()` |
| `clientGrants.getAll()` | `clientGrants.list()` |
| `clientGrants.create()` | `clientGrants.create()` |
| `clientGrants.delete()` | `clientGrants.delete()` |
| `clientGrants.update()` | `clientGrants.update()` |
| `clients.getAll()` | `clients.list()` |
| `clients.create()` | `clients.create()` |
| `clients.getCredentials()` | `clients.credentials.list()` |
| `clients.createCredential()` | `clients.credentials.create()` |
| `clients.getCredential()` | `clients.credentials.get()` |
| `clients.deleteCredential()` | `clients.credentials.delete()` |
| `clients.updateCredential()` | `clients.credentials.update()` |
| `clients.get()` | `clients.get()` |
| `clients.delete()` | `clients.delete()` |
| `clients.update()` | `clients.update()` |
| `clients.rotateClientSecret()` | `clients.rotateSecret()` |
| `connections.getAll()` | `connections.list()` |
| `connections.create()` | `connections.create()` |
| `connections.get()` | `connections.get()` |
| `connections.delete()` | `connections.delete()` |
| `connections.update()` | `connections.update()` |
| `connections.checkStatus()` | `connections.checkStatus()` |
| `connections.deleteUserByEmail()` | `connections.users.deleteByEmail()` |
| `connections.getScimConfiguration()` | `connections.scimConfiguration.get()` |
| `connections.updateScimConfiguration()` | `connections.scimConfiguration.update()` |
| `connections.createScimConfiguration()` | `connections.scimConfiguration.create()` |
| `connections.deleteScimConfiguration()` | `connections.scimConfiguration.delete()` |
| `connections.getDefaultScimMapping()` | `connections.scimConfiguration.getDefaultMapping()` |
| `connections.getScimTokens()` | `connections.scimConfiguration.tokens.get()` |
| `connections.createScimToken()` | `connections.scimConfiguration.tokens.create()` |
| `connections.deleteScimToken()` | `connections.scimConfiguration.tokens.delete()` |
| `customDomains.getAll()` | `customDomains.list()` |
| `customDomains.create()` | `customDomains.create()` |
| `customDomains.get()` | `customDomains.get()` |
| `customDomains.delete()` | `customDomains.delete()` |
| `customDomains.update()` | `customDomains.update()` |
| `customDomains.verify()` | `customDomains.verify()` |
| `deviceCredentials.getAll()` | `deviceCredentials.list()` |
| `deviceCredentials.createPublicKey()` | `deviceCredentials.createPublicKey()` |
| `deviceCredentials.delete()` | `deviceCredentials.delete()` |
| `emailTemplates.create()` | `emailTemplates.create()` |
| `emailTemplates.get()` | `emailTemplates.get()` |
| `emailTemplates.update()` | `emailTemplates.update()` |
| `emailTemplates.put()` | `emailTemplates.set()` |
| `emails.get()` | `emails.provider.get()` |
| `emails.update()` | `emails.provider.update()` |
| `emails.configure()` | `emails.provider.create()` |
| `flows.getAll()` | `flows.list()` |
| `flows.create()` | `flows.create()` |
| `flows.getAllConnections()` | :x: Removed in v5 |
| `flows.createConnection()` | :x: Removed in v5 |
| `flows.getConnection()` | :x: Removed in v5 |
| `flows.deleteConnection()` | :x: Removed in v5 |
| `flows.updateConnection()` | :x: Removed in v5 |
| `flows.getAllExecutions()` | `flows.executions.list()` |
| `flows.getExecution()` | `flows.executions.get()` |
| `flows.deleteExecution()` | `flows.executions.delete()` |
| `flows.get()` | `flows.get()` |
| `flows.update()` | `flows.update()` |
| `flows.delete()` | `flows.delete()` |
| `forms.getAll()` | `forms.list()` |
| `forms.create()` | `forms.create()` |
| `forms.get()` | `forms.get()` |
| `forms.update()` | `forms.update()` |
| `forms.delete()` | `forms.delete()` |
| `grants.getAll()` | `userGrants.list()` |
| `grants.deleteByUserId()` | `userGrants.deleteByUserId()` |
| `grants.delete()` | `userGrants.delete()` |
| `guardian.createEnrollmentTicket()` | `guardian.enrollments.createTicket()` |
| `guardian.getGuardianEnrollment()` | `guardian.enrollments.get()` |
| `guardian.deleteGuardianEnrollment()` | `guardian.enrollments.delete()` |
| `guardian.getFactors()` | `guardian.factors.list()` |
| `guardian.getPhoneFactorMessageTypes()` | `guardian.factors.phone.getMessageTypes()` |
| `guardian.updatePhoneFactorMessageTypes()` | `guardian.factors.phone.setMessageTypes()` |
| `guardian.getPhoneFactorProviderTwilio()` | `guardian.factors.phone.getTwilioProvider()` |
| `guardian.updatePhoneFactorProviderTwilio()` | `guardian.factors.phone.setTwilioProvider()` |
| `guardian.getPhoneFactorSelectedProvider()` | `guardian.factors.phone.getSelectedProvider()` |
| `guardian.updatePhoneFactorSelectedProvider()` | `guardian.factors.phone.setProvider()` |
| `guardian.getPhoneFactorTemplates()` | `guardian.factors.phone.getTemplates()` |
| `guardian.setPhoneFactorTemplates()` | `guardian.factors.phone.setTemplates()` |
| `guardian.getPushNotificationProviderAPNS()` | `guardian.factors.pushNotification.getApnsProvider()` |
| `guardian.updatePushNotificationProviderAPNS()` | `guardian.factors.pushNotification.setApnsProvider()` |
| `guardian.setPushNotificationProviderAPNS()` | `guardian.factors.pushNotification.setApnsProvider()` |
| `guardian.updatePushNotificationProviderFCM()` | `guardian.factors.pushNotification.setFcmProvider()` |
| `guardian.setPushNotificationProviderFCM()` | `guardian.factors.pushNotification.setFcmProvider()` |
| `guardian.getPushNotificationProviderSNS()` | `guardian.factors.pushNotification.getSnsProvider()` |
| `guardian.updatePushNotificationProviderSNS()` | `guardian.factors.pushNotification.updateSnsProvider()` |
| `guardian.setPushNotificationProviderSNS()` | `guardian.factors.pushNotification.setSnsProvider()` |
| `guardian.getPushNotificationSelectedProvider()` | `guardian.factors.pushNotification.getSelectedProvider()` |
| `guardian.setPushNotificationSelectedProvider()` | `guardian.factors.pushNotification.setProvider()` |
| `guardian.getSmsFactorProviderTwilio()` | `guardian.factors.sms.getTwilioProvider()` |
| `guardian.setSmsFactorProviderTwilio()` | `guardian.factors.sms.setTwilioProvider()` |
| `guardian.getSmsSelectedProvider()` | `guardian.factors.sms.getSelectedProvider()` |
| `guardian.setSmsSelectedProvider()` | `guardian.factors.sms.setProvider()` |
| `guardian.getSmsFactorTemplates()` | `guardian.factors.sms.getTemplates()` |
| `guardian.setSmsFactorTemplates()` | `guardian.factors.sms.setTemplates()` |
| `guardian.updateFactor()` | `guardian.factors.set()` |
| `guardian.getPolicies()` | `guardian.policies.list()` |
| `guardian.updatePolicies()` | `guardian.policies.set()` |
| `hooks.getAll()` | `hooks.list()` |
| `hooks.create()` | `hooks.create()` |
| `hooks.get()` | `hooks.get()` |
| `hooks.delete()` | `hooks.delete()` |
| `hooks.update()` | `hooks.update()` |
| `hooks.getSecrets()` | `hooks.secrets.get()` |
| `hooks.deleteSecrets()` | `hooks.secrets.delete()` |
| `hooks.updateSecrets()` | `hooks.secrets.update()` |
| `hooks.addSecrets()` | `hooks.secrets.create()` |
| `jobs.exportUsers()` | `jobs.usersExports.create()` |
| `jobs.importUsers()` | `jobs.usersImports.create()` |
| `jobs.verifyEmail()` | `jobs.verificationEmail.create()` |
| `jobs.get()` | `jobs.get()` |
| `jobs.getErrors()` | `jobs.errors.get()` |
| `keys.postEncryptionRekey()` | `keys.encryption.rekey()` |
| `keys.getAll()` | `keys.signing.list()` |
| `keys.rotate()` | `keys.signing.rotate()` |
| `keys.get()` | `keys.signing.get()` |
| `keys.revoke()` | `keys.signing.revoke()` |
| `logStreams.getAll()` | `logStreams.list()` |
| `logStreams.create()` | `logStreams.create()` |
| `logStreams.get()` | `logStreams.get()` |
| `logStreams.delete()` | `logStreams.delete()` |
| `logStreams.update()` | `logStreams.update()` |
| `logs.getAll()` | `logs.list()` |
| `logs.get()` | `logs.get()` |
| `organizations.getAll()` | `organizations.list()` |
| `organizations.create()` | `organizations.create()` |
| `organizations.getByName()` | `organizations.getByName()` |
| `organizations.get()` | `organizations.get()` |
| `organizations.delete()` | `organizations.delete()` |
| `organizations.update()` | `organizations.update()` |
| `organizations.getOrganizationClientGrants()` | `organizations.clientGrants.list()` |
| `organizations.postOrganizationClientGrants()` | `organizations.clientGrants.create()` |
| `organizations.deleteClientGrantsByGrantId()` | `organizations.clientGrants.delete()` |
| `organizations.getEnabledConnections()` | `organizations.enabledConnections.list()` |
| `organizations.addEnabledConnection()` | `organizations.enabledConnections.add()` |
| `organizations.getEnabledConnection()` | `organizations.enabledConnections.get()` |
| `organizations.deleteEnabledConnection()` | `organizations.enabledConnections.delete()` |
| `organizations.updateEnabledConnection()` | `organizations.enabledConnections.update()` |
| `organizations.getInvitations()` | `organizations.invitations.list()` |
| `organizations.createInvitation()` | `organizations.invitations.create()` |
| `organizations.getInvitation()` | `organizations.invitations.get()` |
| `organizations.deleteInvitation()` | `organizations.invitations.delete()` |
| `organizations.getMembers()` | `organizations.members.list()` |
| `organizations.deleteMembers()` | `organizations.members.delete()` |
| `organizations.addMembers()` | `organizations.members.create()` |
| `organizations.getMemberRoles()` | `organizations.members.roles.list()` |
| `organizations.deleteMemberRoles()` | `organizations.members.roles.delete()` |
| `organizations.addMemberRoles()` | `organizations.members.roles.assign()` |
| `prompts.get()` | `prompts.getSettings()` |
| `prompts.update()` | `prompts.updateSettings()` |
| `prompts.getCustomTextByLanguage()` | `prompts.customText.get()` |
| `prompts.updateCustomTextByLanguage()` | `prompts.customText.set()` |
| `prompts.getPartials()` | `prompts.partials.get()` |
| `prompts.updatePartials()` | `prompts.partials.set()` |
| `refreshTokens.get()` | `refreshTokens.get()` |
| `refreshTokens.delete()` | `refreshTokens.delete()` |
| `resourceServers.getAll()` | `resourceServers.list()` |
| `resourceServers.create()` | `resourceServers.create()` |
| `resourceServers.get()` | `resourceServers.get()` |
| `resourceServers.delete()` | `resourceServers.delete()` |
| `resourceServers.update()` | `resourceServers.update()` |
| `roles.getAll()` | `roles.list()` |
| `roles.create()` | `roles.create()` |
| `roles.get()` | `roles.get()` |
| `roles.delete()` | `roles.delete()` |
| `roles.update()` | `roles.update()` |
| `roles.getPermissions()` | `roles.permissions.list()` |
| `roles.deletePermissions()` | `roles.permissions.delete()` |
| `roles.addPermissions()` | `roles.permissions.add()` |
| `roles.getUsers()` | `roles.users.list()` |
| `roles.assignUsers()` | `roles.users.assign()` |
| `rules.getAll()` | `rules.list()` |
| `rules.create()` | `rules.create()` |
| `rulesConfigs.getAll()` | `rulesConfigs.list()` |
| `rulesConfigs.delete()` | `rulesConfigs.delete()` |
| `rulesConfigs.set()` | `rulesConfigs.set()` |
| `rules.get()` | `rules.get()` |
| `rules.delete()` | `rules.delete()` |
| `rules.update()` | `rules.update()` |
| `selfServiceProfiles.getAll()` | `selfServiceProfiles.list()` |
| `selfServiceProfiles.create()` | `selfServiceProfiles.create()` |
| `selfServiceProfiles.get()` | `selfServiceProfiles.get()` |
| `selfServiceProfiles.delete()` | `selfServiceProfiles.delete()` |
| `selfServiceProfiles.update()` | `selfServiceProfiles.update()` |
| `selfServiceProfiles.createSsoTicket()` | `selfServiceProfiles.ssoTicket.create()` |
| `selfServiceProfiles.getCustomText()` | `selfServiceProfiles.customText.list()` |
| `selfServiceProfiles.updateCustomText()` | `selfServiceProfiles.customText.set()` |
| `selfServiceProfiles.revokeSsoTicket()` | `selfServiceProfiles.ssoTicket.revoke()` |
| `stats.getActiveUsersCount()` | `stats.getActiveUsersCount()` |
| `stats.getDaily()` | `stats.getDaily()` |
| `sessions.get()` | `sessions.get()` |
| `sessions.delete()` | `sessions.delete()` |
| `tenants.getSettings()` | `tenants.settings.get()` |
| `tenants.updateSettings()` | `tenants.settings.update()` |
| `tickets.verifyEmail()` | `tickets.verifyEmail()` |
| `tickets.changePassword()` | `tickets.changePassword()` |
| `userBlocks.getAll()` | `userBlocks.listByIdentifier()` |
| `userBlocks.deleteAll()` | `userBlocks.deleteByIdentifier()` |
| `userBlocks.get()` | `userBlocks.list()` |
| `userBlocks.delete()` | `userBlocks.delete()` |
| `users.getAll()` | `users.list()` |
| `users.create()` | `users.create()` |
| `usersByEmail.getByEmail()` | `users.listUsersByEmail()` |
| `users.get()` | `users.get()` |
| `users.delete()` | `users.delete()` |
| `users.update()` | `users.update()` |
| `users.getAuthenticationMethods()` | `users.authenticationMethods.list()` |
| `users.createAuthenticationMethod()` | `users.authenticationMethods.create()` |
| `users.updateAuthenticationMethods()` | `users.authenticationMethods.set()` |
| `users.deleteAuthenticationMethods()` | `users.authenticationMethods.deleteAll()` |
| `users.getAuthenticationMethod()` | `users.authenticationMethods.get()` |
| `users.deleteAuthenticationMethod()` | `users.authenticationMethods.delete()` |
| `users.updateAuthenticationMethod()` | `users.authenticationMethods.update()` |
| `users.deleteAllAuthenticators()` | `users.authenticators.deleteAll()` |
| `users.getEnrollments()` | `users.enrollments.get()` |
| `users.link()` | `users.identities.link()` |
| `users.unlink()` | `users.identities.delete()` |
| `users.getLogs()` | `users.logs.list()` |
| `users.invalidateRememberBrowser()` | `users.multifactor.invalidateRememberBrowser()` |
| `users.deleteMultifactorProvider()` | `users.multifactor.deleteProvider()` |
| `users.getUserOrganizations()` | `users.organizations.list()` |
| `users.getPermissions()` | `users.permissions.list()` |
| `users.deletePermissions()` | `users.permissions.delete()` |
| `users.assignPermissions()` | `users.permissions.create()` |
| `users.regenerateRecoveryCode()` | `users.regenerateRecoveryCode()` |
| `users.getRoles()` | `users.roles.list()` |
| `users.deleteRoles()` | `users.roles.delete()` |
| `users.assignRoles()` | `users.roles.assign()` |
| `users.getRefreshTokens()` | `users.refreshToken.list()` |
| `users.deleteRefreshTokens()` | `users.refreshToken.delete()` |
| `users.getSessions()` | `users.sessions.list()` |
| `users.deleteSessions()` | `users.sessions.delete()` |
| `prompts.getRendering()` | `prompts.rendering.get()` |
| `prompts.updateRendering()` | `prompts.rendering.update()` |
| `tokenExchangeProfiles.delete()` | `tokenExchangeProfiles.delete()` |
| `tokenExchangeProfiles.update()` | `tokenExchangeProfiles.update()` |
| `tokenExchangeProfiles.get()` | `tokenExchangeProfiles.get()` |
| `tokenExchangeProfiles.create()` | `tokenExchangeProfiles.create()` |
| `tokenExchangeProfiles.getAll()` | `tokenExchangeProfiles.list()` |
| `branding.configurePhoneProvider()` | `branding.phone.providers.create()` |
| `branding.getAllPhoneProviders()` | `branding.phone.providers.list()` |
| `branding.updatePhoneProvider()` | `branding.phone.providers.update()` |
| `branding.deletePhoneProvider()` | `branding.phone.providers.delete()` |
| `branding.getPhoneProvider()` | `branding.phone.providers.get()` |
| `keys.getAllEncryptionKeys()` | `keys.encryption.list()` |
| `keys.createEncryptionKey()` | `keys.encryption.create()` |
| `keys.getEncryptionKey()` | `keys.encryption.get()` |
| `keys.deleteEncryptionKey()` | `keys.encryption.delete()` |
| `keys.importEncryptionKey()` | `keys.encryption.import()` |
| `keys.createPublicWrappingKey()` | `keys.encryption.createPublicWrappingKey()` |
| `users.getAllTokensets()` | `users.federatedConnectionsTokensets.list()` |
| `users.deleteTokenset()` | `users.federatedConnectionsTokensets.delete()` |
| `networkAcls.delete()` | `networkAcls.delete()` |
| `networkAcls.update()` | `networkAcls.set()` |
| `networkAcls.get()` | `networkAcls.get()` |
| `networkAcls.create()` | `networkAcls.create()` |
| `networkAcls.getAll()` | `networkAcls.list()` |
| `prompts.getAllRenderingSettings()` | `prompts.rendering.list()` |
| `connections.getEnabledClients()` | `connections.clients.get()` |
| `connections.updateEnabledClients()` | `connections.clients.update()` |
| `clients.getEnabledConnections()` | `clients.connections.get()` |
| `connections.getKeys()` | `connections.keys.get()` |
| `connections.rotateKeys()` | `connections.keys.rotate()` |
| `branding.getAllPhoneTemplates()` | `branding.phone.templates.list()` |
| `branding.createPhoneTemplate()` | `branding.phone.templates.create()` |
| `branding.getPhoneTemplate()` | `branding.phone.templates.get()` |
| `branding.updatePhoneTemplate()` | `branding.phone.templates.update()` |
| `branding.deletePhoneTemplate()` | `branding.phone.templates.delete()` |
| `branding.resetTemplate()` | :x: Removed in v5 |
| `riskAssessments.getSettings()` | :x: Removed in v5 |
| `riskAssessments.updateSettings()` | :x: Removed in v5 |
| `riskAssessments.getNewDeviceSettings()` | :x: Removed in v5 |
| `riskAssessments.updateNewDeviceSettings()` | :x: Removed in v5 |
| `users.clearRiskAssessors()` | :x: Removed in v5 |
| :new: No equivalent in v4 | `branding.phone.providers.test()` |
| :new: No equivalent in v4 | `branding.phone.templates.reset()` |
| :new: No equivalent in v4 | `branding.phone.templates.test()` |
| :new: No equivalent in v4 | `clientGrants.organizations.list()` |
| :new: No equivalent in v4 | `customDomains.test()` |
| :new: No equivalent in v4 | `emails.provider.delete()` |
| :new: No equivalent in v4 | `eventStreams.list()` |
| :new: No equivalent in v4 | `eventStreams.create()` |
| :new: No equivalent in v4 | `eventStreams.get()` |
| :new: No equivalent in v4 | `eventStreams.delete()` |
| :new: No equivalent in v4 | `eventStreams.update()` |
| :new: No equivalent in v4 | `eventStreams.deliveries.list()` |
| :new: No equivalent in v4 | `eventStreams.deliveries.getHistory()` |
| :new: No equivalent in v4 | `eventStreams.redeliveries.create()` |
| :new: No equivalent in v4 | `eventStreams.redeliveries.createById()` |
| :new: No equivalent in v4 | `eventStreams.getStats()` |
| :new: No equivalent in v4 | `eventStreams.test()` |
| :new: No equivalent in v4 | `guardian.factors.duo.settings.get()` |
| :new: No equivalent in v4 | `guardian.factors.duo.settings.update()` |
| :new: No equivalent in v4 | `guardian.factors.duo.settings.set()` |
| :new: No equivalent in v4 | `guardian.factors.pushNotification.setFcmv1Provider()` |
| :new: No equivalent in v4 | `guardian.factors.pushNotification.setFcmv1Provider()` |
| :new: No equivalent in v4 | `keys.customSigning.get()` |
| :new: No equivalent in v4 | `keys.customSigning.delete()` |
| :new: No equivalent in v4 | `keys.customSigning.set()` |
| :new: No equivalent in v4 | `networkAcls.update()` |
| :new: No equivalent in v4 | `sessions.revoke()` |
| :new: No equivalent in v4 | `users.revokeAccess()` |
| :new: No equivalent in v4 | `verifiableCredentials.verification.templates.list()` |
| :new: No equivalent in v4 | `verifiableCredentials.verification.templates.create()` |
| :new: No equivalent in v4 | `verifiableCredentials.verification.templates.get()` |
| :new: No equivalent in v4 | `verifiableCredentials.verification.templates.delete()` |
| :new: No equivalent in v4 | `verifiableCredentials.verification.templates.update()` |


</details>

### Auto-pagination

All iterable responses, such as those returned by `*.list()` methods, are auto-paginated. This means that code can directly iterate over them without the need for manual pagination logic. For instance, in v4, `client.actions.getAll()` would return a response of type `ApiResponse<GetActions200Response>` which would have to be manually paginated through:

```ts
import { ManagementClient } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

const allUsers = [];
let page = 0;
while (true) {
    const {
        data: { actions, total },
    } = await client.actions.getAll({
        page: page++,
    });
    allUsers.push(...actions);
    if (allUsers.length === total) {
        break;
    }
}
```

In v5, `client.actions.list()` returns a response of type `Page<Action>`, over which the following pagination code is valid:

```ts
import { ManagementClient } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

let page = await client.actions.list();
while (page.hasNextPage()) {
    page = await page.getNextPage();
    console.log(page);
}
```

### Management namespace

All types for requests or responses in the Management API belong to the `Management` namespace:

```ts
import { ManagementClient, Management } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

// Using the Management namespace import:
const user_id: string = "example_id";
const request: Management.UpdateUserRequestContent = {
    user_metadata: { email: `'this@example.com'` },
};

await client.users.update(user_id, request);
```

### Unified error type

All errors (4xx or 5xx response codes) are represented in the SDK as a subclass of the generalized `ManagementError` class, which encompasses all the different kinds of errors (`RequiredError`, `ResponseError`, `TimeoutError`, etc.) from v4:

```ts
import { ManagementClient, ManagementError } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

try {
    await client.userGrants.delete("user_that_does_not_exist");
} catch (err) {
    if (err instanceof ManagementError) {
        // attributes shared by all errors in this API
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.body);
        console.log(err.rawResponse);
    }
}
```

### Import users takes a FileLike

The method corresponding to the endpoint `POST /jobs/users-imports`, through which one can import users in bulk, is labeled `client.jobs.usersImports.create()` (in v3 and v4, it was `client.jobs.importUsers()`). In v3, this method accepted a readable stream as its `users` parameter:

```ts
await client.jobs.importUsers({
  users: fs.createReadStream('./myusers.json'),
  connection_id: 'con_123',
});
```

In v4, this method accepted a `Blob`:

```ts
// Either all at once...
await client.jobs.importUsers({
  users: new Blob([fs.readFileSync('./myusers.json')], { type: 'application/json' }),
  connection_id: 'con_123',
});

// or using fetch-blob.
import { fileFrom } from 'fetch-blob/from.js';

await client.jobs.importUsers({
  users: await fileFrom('./myusers.json', 'application/json'),
  connection_id: 'con_123',
});
```

In v5, this method accepts a `FileLike`, whose definition is copied below. The upshot of `FileLike` is increased flexibility; either the v3 or the v4 method may be used to import users in bulk.

```ts
type FileLike =
    | ArrayBuffer
    | ArrayBufferLike
    | ArrayBufferView
    | Uint8Array
    | import("buffer").Buffer
    | import("buffer").Blob
    | import("buffer").File
    | import("stream").Readable
    | import("stream/web").ReadableStream
    | globalThis.Blob
    | globalThis.File
    | ReadableStream;

// So, treat `users` as a readable stream...
await client.jobs.usersImports.create({
  users: fs.createReadStream('./myusers.json'),
  connection_id: 'con_123',
});

// ...or as a Blob...
await client.jobs.usersImports.create({
  users: new Blob([fs.readFileSync('./myusers.json')], { type: 'application/json' }),
  connection_id: 'con_123',
});

// ...or as a Blob read using fetch-blob.
await client.jobs.usersImports.create({
  users: await fileFrom('./myusers.json', 'application/json'),
  connection_id: 'con_123',
});
```
