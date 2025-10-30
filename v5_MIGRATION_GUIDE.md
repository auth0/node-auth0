# V5 Migration Guide

A guide to migrating the Auth0 TS SDK from `4.x` to `5.x`.

- [Overall changes](#overall-changes)
    - [Accepted Node versions](#accepted-node-versions)
    - [Authentication API](#authentication-api)
    - [Management API](#management-api)
- [Specific changes to the Management API](#specific-changes-to-the-management-api)
    - [Method name changes](#method-name-changes)
    - [Pagination and Response Changes](#pagination-and-response-changes)
        - [Accessing Response Data](#accessing-response-data)
        - [Migrating from V4 to V5 Pagination](#migrating-from-v4-to-v5-pagination)
        - [Non-Paginated Responses (Create, Update, etc.)](#non-paginated-responses-create-update-etc)
        - [Advanced Pagination](#advanced-pagination)
    - [Management namespace](#management-namespace)
        - [Type Name Changes](#type-name-changes)
    - [Unified error type](#unified-error-type)
    - [Import users takes a FileLike](#import-users-takes-a-filelike)

## Overall changes

### Accepted Node versions

This SDK is guaranteed to work with the following versions of Node: `"^20.19.0 || ^22.12.0 || ^24.0.0"`. (So any Node 20 version starting from 20.19.0; any Node 22 version starting from 22.12.0; and any Node 24 version.) Other non-production versions of Node may work, but are not directly supported.

### Authentication API

This major version change does not affect the Authentication API. Any code written for the Authentication API in the `4.x` version should work in the `5.x` version.

### Management API

V5 introduces significant improvements to the Management API SDK by migrating to [Fern](https://github.com/fern-api/fern) as our code generation tool. While the SDK was previously generated, v5 benefits from Fern's enhanced capabilities including better resource grouping, sub-client organization, and customization options. Additionally, v5 leverages a substantially improved and optimized OpenAPI specification that provides more accurate type definitions and better API structure representation. This combination introduces a number of benefits and changes to the SDK, which we'll outline below.

## Specific changes to the Management API

### Method name changes

V5 introduces a more consistent and intuitive API structure. We moved subresources into sub-clients and use consistent method naming: `list`, `create`, `update`, `delete`, `set`, `get`, and various actions like `test`, `deploy`, `reset`, etc.

Most method names are now in tighter lock-step with their respective endpoints (see the [Management API documentation](https://auth0.com/docs/api/management/v2) for information on all available endpoints). For instance, to get action versions, the v4 method `actions.getVersions()` becomes `actions.versions.list()` in v5:

```ts
import { ManagementClient } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

// v5: Subresources moved to sub-clients with consistent naming
const versions = await client.actions.versions.list("action_id");

// v4: Direct method on main resource
// const versions = await client.actions.getVersions("action_id");
```

In the common situation where there are two similar `GET` methods, one that "gets one" and another that "gets all" of a particular resource, the "gets all" method is consistently named `list()`, as in `client.users.list()` for the endpoint `GET /v2/users`.

<details>
  <summary>A complete list of method name changes:</summary>

The tables below show all method changes organized by category. Note these methods are typically found in the namespace of a `ManagementClient` instance.

## Unchanged Methods

| Before                                | After                                 |
| ------------------------------------- | ------------------------------------- |
| `actions.create()`                    | `actions.create()`                    |
| `actions.get()`                       | `actions.get()`                       |
| `actions.delete()`                    | `actions.delete()`                    |
| `actions.update()`                    | `actions.update()`                    |
| `actions.deploy()`                    | `actions.deploy()`                    |
| `actions.test()`                      | `actions.test()`                      |
| `clientGrants.create()`               | `clientGrants.create()`               |
| `clientGrants.delete()`               | `clientGrants.delete()`               |
| `clientGrants.update()`               | `clientGrants.update()`               |
| `clients.create()`                    | `clients.create()`                    |
| `clients.get()`                       | `clients.get()`                       |
| `clients.delete()`                    | `clients.delete()`                    |
| `clients.update()`                    | `clients.update()`                    |
| `connections.create()`                | `connections.create()`                |
| `connections.get()`                   | `connections.get()`                   |
| `connections.delete()`                | `connections.delete()`                |
| `connections.update()`                | `connections.update()`                |
| `connections.checkStatus()`           | `connections.checkStatus()`           |
| `customDomains.create()`              | `customDomains.create()`              |
| `customDomains.get()`                 | `customDomains.get()`                 |
| `customDomains.delete()`              | `customDomains.delete()`              |
| `customDomains.update()`              | `customDomains.update()`              |
| `customDomains.verify()`              | `customDomains.verify()`              |
| `deviceCredentials.createPublicKey()` | `deviceCredentials.createPublicKey()` |
| `deviceCredentials.delete()`          | `deviceCredentials.delete()`          |
| `emailTemplates.create()`             | `emailTemplates.create()`             |
| `emailTemplates.get()`                | `emailTemplates.get()`                |
| `emailTemplates.update()`             | `emailTemplates.update()`             |
| `flows.create()`                      | `flows.create()`                      |
| `flows.get()`                         | `flows.get()`                         |
| `flows.update()`                      | `flows.update()`                      |
| `flows.delete()`                      | `flows.delete()`                      |
| `forms.create()`                      | `forms.create()`                      |
| `forms.get()`                         | `forms.get()`                         |
| `forms.update()`                      | `forms.update()`                      |
| `forms.delete()`                      | `forms.delete()`                      |
| `hooks.create()`                      | `hooks.create()`                      |
| `hooks.get()`                         | `hooks.get()`                         |
| `hooks.delete()`                      | `hooks.delete()`                      |
| `hooks.update()`                      | `hooks.update()`                      |
| `jobs.get()`                          | `jobs.get()`                          |
| `logStreams.create()`                 | `logStreams.create()`                 |
| `logStreams.get()`                    | `logStreams.get()`                    |
| `logStreams.delete()`                 | `logStreams.delete()`                 |
| `logStreams.update()`                 | `logStreams.update()`                 |
| `logs.get()`                          | `logs.get()`                          |
| `organizations.create()`              | `organizations.create()`              |
| `organizations.getByName()`           | `organizations.getByName()`           |
| `organizations.get()`                 | `organizations.get()`                 |
| `organizations.delete()`              | `organizations.delete()`              |
| `organizations.update()`              | `organizations.update()`              |
| `refreshTokens.get()`                 | `refreshTokens.get()`                 |
| `refreshTokens.delete()`              | `refreshTokens.delete()`              |
| `resourceServers.create()`            | `resourceServers.create()`            |
| `resourceServers.get()`               | `resourceServers.get()`               |
| `resourceServers.delete()`            | `resourceServers.delete()`            |
| `resourceServers.update()`            | `resourceServers.update()`            |
| `roles.create()`                      | `roles.create()`                      |
| `roles.get()`                         | `roles.get()`                         |
| `roles.delete()`                      | `roles.delete()`                      |
| `roles.update()`                      | `roles.update()`                      |
| `rules.create()`                      | `rules.create()`                      |
| `rulesConfigs.delete()`               | `rulesConfigs.delete()`               |
| `rulesConfigs.set()`                  | `rulesConfigs.set()`                  |
| `rules.get()`                         | `rules.get()`                         |
| `rules.delete()`                      | `rules.delete()`                      |
| `rules.update()`                      | `rules.update()`                      |
| `selfServiceProfiles.create()`        | `selfServiceProfiles.create()`        |
| `selfServiceProfiles.get()`           | `selfServiceProfiles.get()`           |
| `selfServiceProfiles.delete()`        | `selfServiceProfiles.delete()`        |
| `selfServiceProfiles.update()`        | `selfServiceProfiles.update()`        |
| `stats.getActiveUsersCount()`         | `stats.getActiveUsersCount()`         |
| `stats.getDaily()`                    | `stats.getDaily()`                    |
| `sessions.get()`                      | `sessions.get()`                      |
| `sessions.delete()`                   | `sessions.delete()`                   |
| `tickets.verifyEmail()`               | `tickets.verifyEmail()`               |
| `tickets.changePassword()`            | `tickets.changePassword()`            |
| `userBlocks.delete()`                 | `userBlocks.delete()`                 |
| `users.create()`                      | `users.create()`                      |
| `users.get()`                         | `users.get()`                         |
| `users.delete()`                      | `users.delete()`                      |
| `users.update()`                      | `users.update()`                      |
| `users.regenerateRecoveryCode()`      | `users.regenerateRecoveryCode()`      |
| `tokenExchangeProfiles.delete()`      | `tokenExchangeProfiles.delete()`      |
| `tokenExchangeProfiles.update()`      | `tokenExchangeProfiles.update()`      |
| `tokenExchangeProfiles.get()`         | `tokenExchangeProfiles.get()`         |
| `tokenExchangeProfiles.create()`      | `tokenExchangeProfiles.create()`      |
| `networkAcls.delete()`                | `networkAcls.delete()`                |
| `networkAcls.get()`                   | `networkAcls.get()`                   |
| `networkAcls.create()`                | `networkAcls.create()`                |

## Changed - Sub-resource Moves

| Before                              | After                                           |
| ----------------------------------- | ----------------------------------------------- |
| `emails.get()`                      | `emails.provider.get()`                         |
| `emails.update()`                   | `emails.provider.update()`                      |
| `grants.deleteByUserId()`           | `userGrants.deleteByUserId()`                   |
| `grants.delete()`                   | `userGrants.delete()`                           |
| `keys.rotate()`                     | `keys.signing.rotate()`                         |
| `keys.get()`                        | `keys.signing.get()`                            |
| `keys.revoke()`                     | `keys.signing.revoke()`                         |
| `users.link()`                      | `users.identities.link()`                       |
| `users.invalidateRememberBrowser()` | `users.multifactor.invalidateRememberBrowser()` |
| `keys.createPublicWrappingKey()`    | `keys.encryption.createPublicWrappingKey()`     |

## Drastic Changes - Method Name Changes

| Before                                                     | After                                                     |
| ---------------------------------------------------------- | --------------------------------------------------------- |
| `actions.getAll()`                                         | `actions.list()`                                          |
| `actions.getVersions()`                                    | `actions.versions.list()`                                 |
| `actions.getVersion()`                                     | `actions.versions.get()`                                  |
| `actions.deployVersion()`                                  | `actions.versions.deploy()`                               |
| `actions.getExecution()`                                   | `actions.executions.get()`                                |
| `actions.getAllTriggers()`                                 | `actions.triggers.list()`                                 |
| `actions.getTriggerBindings()`                             | `actions.triggers.bindings.list()`                        |
| `actions.updateTriggerBindings()`                          | `actions.triggers.bindings.updateMany()`                  |
| `anomaly.checkIfIpIsBlocked()`                             | `anomaly.blocks.checkIp()`                                |
| `anomaly.deleteBlockedIp()`                                | `anomaly.blocks.unblockIp()`                              |
| `attackProtection.getBreachedPasswordDetectionConfig()`    | `attackProtection.breachedPasswordDetection.get()`        |
| `attackProtection.updateBreachedPasswordDetectionConfig()` | `attackProtection.breachedPasswordDetection.update()`     |
| `attackProtection.getBruteForceConfig()`                   | `attackProtection.bruteForceProtection.get()`             |
| `attackProtection.updateBruteForceConfig()`                | `attackProtection.bruteForceProtection.update()`          |
| `attackProtection.getSuspiciousIpThrottlingConfig()`       | `attackProtection.suspiciousIpThrottling.get()`           |
| `attackProtection.updateSuspiciousIpThrottlingConfig()`    | `attackProtection.suspiciousIpThrottling.update()`        |
| `branding.getSettings()`                                   | `branding.get()`                                          |
| `branding.updateSettings()`                                | `branding.update()`                                       |
| `branding.getUniversalLoginTemplate()`                     | `branding.templates.getUniversalLogin()`                  |
| `branding.deleteUniversalLoginTemplate()`                  | `branding.templates.deleteUniversalLogin()`               |
| `branding.setUniversalLoginTemplate()`                     | `branding.templates.updateUniversalLogin()`               |
| `branding.createTheme()`                                   | `branding.themes.create()`                                |
| `branding.getDefaultTheme()`                               | `branding.themes.getDefault()`                            |
| `branding.getTheme()`                                      | `branding.themes.get()`                                   |
| `branding.deleteTheme()`                                   | `branding.themes.delete()`                                |
| `branding.updateTheme()`                                   | `branding.themes.update()`                                |
| `clientGrants.getAll()`                                    | `clientGrants.list()`                                     |
| `clients.getAll()`                                         | `clients.list()`                                          |
| `clients.getCredentials()`                                 | `clients.credentials.list()`                              |
| `clients.createCredential()`                               | `clients.credentials.create()`                            |
| `clients.getCredential()`                                  | `clients.credentials.get()`                               |
| `clients.deleteCredential()`                               | `clients.credentials.delete()`                            |
| `clients.updateCredential()`                               | `clients.credentials.update()`                            |
| `clients.rotateClientSecret()`                             | `clients.rotateSecret()`                                  |
| `connections.getAll()`                                     | `connections.list()`                                      |
| `connections.deleteUserByEmail()`                          | `connections.users.deleteByEmail()`                       |
| `connections.getScimConfiguration()`                       | `connections.scimConfiguration.get()`                     |
| `connections.updateScimConfiguration()`                    | `connections.scimConfiguration.update()`                  |
| `connections.createScimConfiguration()`                    | `connections.scimConfiguration.create()`                  |
| `connections.deleteScimConfiguration()`                    | `connections.scimConfiguration.delete()`                  |
| `connections.getDefaultScimMapping()`                      | `connections.scimConfiguration.getDefaultMapping()`       |
| `connections.getScimTokens()`                              | `connections.scimConfiguration.tokens.get()`              |
| `connections.createScimToken()`                            | `connections.scimConfiguration.tokens.create()`           |
| `connections.deleteScimToken()`                            | `connections.scimConfiguration.tokens.delete()`           |
| `customDomains.getAll()`                                   | `customDomains.list()`                                    |
| `deviceCredentials.getAll()`                               | `deviceCredentials.list()`                                |
| `emailTemplates.put()`                                     | `emailTemplates.set()`                                    |
| `emails.configure()`                                       | `emails.provider.create()`                                |
| `flows.getAll()`                                           | `flows.list()`                                            |
| `flows.getAllExecutions()`                                 | `flows.executions.list()`                                 |
| `flows.getExecution()`                                     | `flows.executions.get()`                                  |
| `flows.deleteExecution()`                                  | `flows.executions.delete()`                               |
| `flows.getAllConnections()`                                | `flows.vault.connections.list()`                          |
| `flows.createConnection()`                                 | `flows.vault.connections.create()`                        |
| `flows.getConnection()`                                    | `flows.vault.connections.get()`                           |
| `flows.deleteConnection()`                                 | `flows.vault.connections.delete()`                        |
| `flows.updateConnection()`                                 | `flows.vault.connections.update()`                        |
| `branding.resetTemplate()`                                 | `branding.phone.templates.reset()`                        |
| `riskAssessments.getSettings()`                            | `riskAssessments.settings.get()`                          |
| `riskAssessments.updateSettings()`                         | `riskAssessments.settings.update()`                       |
| `riskAssessments.getNewDeviceSettings()`                   | `riskAssessments.settings.newDevice.get()`                |
| `riskAssessments.updateNewDeviceSettings()`                | `riskAssessments.settings.newDevice.update()`             |
| `forms.getAll()`                                           | `forms.list()`                                            |
| `grants.getAll()`                                          | `userGrants.list()`                                       |
| `guardian.createEnrollmentTicket()`                        | `guardian.enrollments.createTicket()`                     |
| `guardian.getGuardianEnrollment()`                         | `guardian.enrollments.get()`                              |
| `guardian.deleteGuardianEnrollment()`                      | `guardian.enrollments.delete()`                           |
| `guardian.getFactors()`                                    | `guardian.factors.list()`                                 |
| `guardian.getPhoneFactorMessageTypes()`                    | `guardian.factors.phone.getMessageTypes()`                |
| `guardian.updatePhoneFactorMessageTypes()`                 | `guardian.factors.phone.setMessageTypes()`                |
| `guardian.getPhoneFactorProviderTwilio()`                  | `guardian.factors.phone.getTwilioProvider()`              |
| `guardian.updatePhoneFactorProviderTwilio()`               | `guardian.factors.phone.setTwilioProvider()`              |
| `guardian.getPhoneFactorSelectedProvider()`                | `guardian.factors.phone.getSelectedProvider()`            |
| `guardian.updatePhoneFactorSelectedProvider()`             | `guardian.factors.phone.setProvider()`                    |
| `guardian.getPhoneFactorTemplates()`                       | `guardian.factors.phone.getTemplates()`                   |
| `guardian.setPhoneFactorTemplates()`                       | `guardian.factors.phone.setTemplates()`                   |
| `guardian.getPushNotificationProviderAPNS()`               | `guardian.factors.pushNotification.getApnsProvider()`     |
| `guardian.updatePushNotificationProviderAPNS()`            | `guardian.factors.pushNotification.setApnsProvider()`     |
| `guardian.setPushNotificationProviderAPNS()`               | `guardian.factors.pushNotification.setApnsProvider()`     |
| `guardian.updatePushNotificationProviderFCM()`             | `guardian.factors.pushNotification.setFcmProvider()`      |
| `guardian.setPushNotificationProviderFCM()`                | `guardian.factors.pushNotification.setFcmProvider()`      |
| `guardian.getPushNotificationProviderSNS()`                | `guardian.factors.pushNotification.getSnsProvider()`      |
| `guardian.updatePushNotificationProviderSNS()`             | `guardian.factors.pushNotification.updateSnsProvider()`   |
| `guardian.setPushNotificationProviderSNS()`                | `guardian.factors.pushNotification.setSnsProvider()`      |
| `guardian.getPushNotificationSelectedProvider()`           | `guardian.factors.pushNotification.getSelectedProvider()` |
| `guardian.setPushNotificationSelectedProvider()`           | `guardian.factors.pushNotification.setProvider()`         |
| `guardian.getSmsFactorProviderTwilio()`                    | `guardian.factors.sms.getTwilioProvider()`                |
| `guardian.setSmsFactorProviderTwilio()`                    | `guardian.factors.sms.setTwilioProvider()`                |
| `guardian.getSmsSelectedProvider()`                        | `guardian.factors.sms.getSelectedProvider()`              |
| `guardian.setSmsSelectedProvider()`                        | `guardian.factors.sms.setProvider()`                      |
| `guardian.getSmsFactorTemplates()`                         | `guardian.factors.sms.getTemplates()`                     |
| `guardian.setSmsFactorTemplates()`                         | `guardian.factors.sms.setTemplates()`                     |
| `guardian.updateFactor()`                                  | `guardian.factors.set()`                                  |
| `guardian.getPolicies()`                                   | `guardian.policies.list()`                                |
| `guardian.updatePolicies()`                                | `guardian.policies.set()`                                 |
| `hooks.getAll()`                                           | `hooks.list()`                                            |
| `hooks.getSecrets()`                                       | `hooks.secrets.get()`                                     |
| `hooks.deleteSecrets()`                                    | `hooks.secrets.delete()`                                  |
| `hooks.updateSecrets()`                                    | `hooks.secrets.update()`                                  |
| `hooks.addSecrets()`                                       | `hooks.secrets.create()`                                  |
| `jobs.exportUsers()`                                       | `jobs.usersExports.create()`                              |
| `jobs.importUsers()`                                       | `jobs.usersImports.create()`                              |
| `jobs.verifyEmail()`                                       | `jobs.verificationEmail.create()`                         |
| `jobs.getErrors()`                                         | `jobs.errors.get()`                                       |
| `keys.postEncryptionRekey()`                               | `keys.encryption.rekey()`                                 |
| `keys.getAll()`                                            | `keys.signing.list()`                                     |
| `logStreams.getAll()`                                      | `logStreams.list()`                                       |
| `logs.getAll()`                                            | `logs.list()`                                             |
| `organizations.getAll()`                                   | `organizations.list()`                                    |
| `organizations.getOrganizationClientGrants()`              | `organizations.clientGrants.list()`                       |
| `organizations.postOrganizationClientGrants()`             | `organizations.clientGrants.create()`                     |
| `organizations.deleteClientGrantsByGrantId()`              | `organizations.clientGrants.delete()`                     |
| `organizations.getEnabledConnections()`                    | `organizations.enabledConnections.list()`                 |
| `organizations.addEnabledConnection()`                     | `organizations.enabledConnections.add()`                  |
| `organizations.getEnabledConnection()`                     | `organizations.enabledConnections.get()`                  |
| `organizations.deleteEnabledConnection()`                  | `organizations.enabledConnections.delete()`               |
| `organizations.updateEnabledConnection()`                  | `organizations.enabledConnections.update()`               |
| `organizations.getInvitations()`                           | `organizations.invitations.list()`                        |
| `organizations.createInvitation()`                         | `organizations.invitations.create()`                      |
| `organizations.getInvitation()`                            | `organizations.invitations.get()`                         |
| `organizations.deleteInvitation()`                         | `organizations.invitations.delete()`                      |
| `organizations.getMembers()`                               | `organizations.members.list()`                            |
| `organizations.deleteMembers()`                            | `organizations.members.delete()`                          |
| `organizations.addMembers()`                               | `organizations.members.create()`                          |
| `organizations.getMemberRoles()`                           | `organizations.members.roles.list()`                      |
| `organizations.deleteMemberRoles()`                        | `organizations.members.roles.delete()`                    |
| `organizations.addMemberRoles()`                           | `organizations.members.roles.assign()`                    |
| `prompts.get()`                                            | `prompts.getSettings()`                                   |
| `prompts.update()`                                         | `prompts.updateSettings()`                                |
| `prompts.getCustomTextByLanguage()`                        | `prompts.customText.get()`                                |
| `prompts.updateCustomTextByLanguage()`                     | `prompts.customText.set()`                                |
| `prompts.getPartials()`                                    | `prompts.partials.get()`                                  |
| `prompts.updatePartials()`                                 | `prompts.partials.set()`                                  |
| `resourceServers.getAll()`                                 | `resourceServers.list()`                                  |
| `roles.getAll()`                                           | `roles.list()`                                            |
| `roles.getPermissions()`                                   | `roles.permissions.list()`                                |
| `roles.deletePermissions()`                                | `roles.permissions.delete()`                              |
| `roles.addPermissions()`                                   | `roles.permissions.add()`                                 |
| `roles.getUsers()`                                         | `roles.users.list()`                                      |
| `roles.assignUsers()`                                      | `roles.users.assign()`                                    |
| `rules.getAll()`                                           | `rules.list()`                                            |
| `rulesConfigs.getAll()`                                    | `rulesConfigs.list()`                                     |
| `selfServiceProfiles.getAll()`                             | `selfServiceProfiles.list()`                              |
| `selfServiceProfiles.createSsoTicket()`                    | `selfServiceProfiles.ssoTicket.create()`                  |
| `selfServiceProfiles.getCustomText()`                      | `selfServiceProfiles.customText.list()`                   |
| `selfServiceProfiles.updateCustomText()`                   | `selfServiceProfiles.customText.set()`                    |
| `selfServiceProfiles.revokeSsoTicket()`                    | `selfServiceProfiles.ssoTicket.revoke()`                  |
| `tenants.getSettings()`                                    | `tenants.settings.get()`                                  |
| `tenants.updateSettings()`                                 | `tenants.settings.update()`                               |
| `userBlocks.getAll()`                                      | `userBlocks.listByIdentifier()`                           |
| `userBlocks.deleteAll()`                                   | `userBlocks.deleteByIdentifier()`                         |
| `userBlocks.get()`                                         | `userBlocks.list()`                                       |
| `users.getAll()`                                           | `users.list()`                                            |
| `usersByEmail.getByEmail()`                                | `users.listUsersByEmail()`                                |
| `users.getAuthenticationMethods()`                         | `users.authenticationMethods.list()`                      |
| `users.createAuthenticationMethod()`                       | `users.authenticationMethods.create()`                    |
| `users.updateAuthenticationMethods()`                      | `users.authenticationMethods.set()`                       |
| `users.deleteAuthenticationMethods()`                      | `users.authenticationMethods.deleteAll()`                 |
| `users.getAuthenticationMethod()`                          | `users.authenticationMethods.get()`                       |
| `users.deleteAuthenticationMethod()`                       | `users.authenticationMethods.delete()`                    |
| `users.updateAuthenticationMethod()`                       | `users.authenticationMethods.update()`                    |
| `users.deleteAllAuthenticators()`                          | `users.authenticators.deleteAll()`                        |
| `users.getEnrollments()`                                   | `users.enrollments.get()`                                 |
| `users.unlink()`                                           | `users.identities.delete()`                               |
| `users.getLogs()`                                          | `users.logs.list()`                                       |
| `users.clearRiskAssessors()`                               | `users.riskAssessments.clear()`                           |
| `users.deleteMultifactorProvider()`                        | `users.multifactor.deleteProvider()`                      |
| `users.getUserOrganizations()`                             | `users.organizations.list()`                              |
| `users.getPermissions()`                                   | `users.permissions.list()`                                |
| `users.deletePermissions()`                                | `users.permissions.delete()`                              |
| `users.assignPermissions()`                                | `users.permissions.create()`                              |
| `users.getRoles()`                                         | `users.roles.list()`                                      |
| `users.deleteRoles()`                                      | `users.roles.delete()`                                    |
| `users.assignRoles()`                                      | `users.roles.assign()`                                    |
| `users.getRefreshTokens()`                                 | `users.refreshToken.list()`                               |
| `users.deleteRefreshTokens()`                              | `users.refreshToken.delete()`                             |
| `users.getSessions()`                                      | `users.sessions.list()`                                   |
| `users.deleteSessions()`                                   | `users.sessions.delete()`                                 |
| `prompts.getRendering()`                                   | `prompts.rendering.get()`                                 |
| `prompts.updateRendering()`                                | `prompts.rendering.update()`                              |
| `tokenExchangeProfiles.getAll()`                           | `tokenExchangeProfiles.list()`                            |
| `branding.configurePhoneProvider()`                        | `branding.phone.providers.create()`                       |
| `branding.getAllPhoneProviders()`                          | `branding.phone.providers.list()`                         |
| `branding.updatePhoneProvider()`                           | `branding.phone.providers.update()`                       |
| `branding.deletePhoneProvider()`                           | `branding.phone.providers.delete()`                       |
| `branding.getPhoneProvider()`                              | `branding.phone.providers.get()`                          |
| `keys.getAllEncryptionKeys()`                              | `keys.encryption.list()`                                  |
| `keys.createEncryptionKey()`                               | `keys.encryption.create()`                                |
| `keys.getEncryptionKey()`                                  | `keys.encryption.get()`                                   |
| `keys.deleteEncryptionKey()`                               | `keys.encryption.delete()`                                |
| `keys.importEncryptionKey()`                               | `keys.encryption.import()`                                |
| `users.getAllTokensets()`                                  | `users.federatedConnectionsTokensets.list()`              |
| `users.deleteTokenset()`                                   | `users.federatedConnectionsTokensets.delete()`            |
| `networkAcls.update()`                                     | `networkAcls.set()`                                       |
| `networkAcls.getAll()`                                     | `networkAcls.list()`                                      |
| `prompts.getAllRenderingSettings()`                        | `prompts.rendering.list()`                                |
| `connections.getEnabledClients()`                          | `connections.clients.get()`                               |
| `connections.updateEnabledClients()`                       | `connections.clients.update()`                            |
| `clients.getEnabledConnections()`                          | `clients.connections.get()`                               |
| `connections.getKeys()`                                    | `connections.keys.get()`                                  |
| `connections.rotateKeys()`                                 | `connections.keys.rotate()`                               |
| `branding.getAllPhoneTemplates()`                          | `branding.phone.templates.list()`                         |
| `branding.createPhoneTemplate()`                           | `branding.phone.templates.create()`                       |
| `branding.getPhoneTemplate()`                              | `branding.phone.templates.get()`                          |
| `branding.updatePhoneTemplate()`                           | `branding.phone.templates.update()`                       |
| `branding.deletePhoneTemplate()`                           | `branding.phone.templates.delete()`                       |

## New Methods in v5

| Before                    | After                                                   |
| ------------------------- | ------------------------------------------------------- |
| `No method existed in v4` | `branding.phone.providers.test()`                       |
| `No method existed in v4` | `branding.phone.templates.reset()`                      |
| `No method existed in v4` | `branding.phone.templates.test()`                       |
| `No method existed in v4` | `clientGrants.organizations.list()`                     |
| `No method existed in v4` | `customDomains.test()`                                  |
| `No method existed in v4` | `emails.provider.delete()`                              |
| `No method existed in v4` | `eventStreams.list()`                                   |
| `No method existed in v4` | `eventStreams.create()`                                 |
| `No method existed in v4` | `eventStreams.get()`                                    |
| `No method existed in v4` | `eventStreams.delete()`                                 |
| `No method existed in v4` | `eventStreams.update()`                                 |
| `No method existed in v4` | `eventStreams.deliveries.list()`                        |
| `No method existed in v4` | `eventStreams.deliveries.getHistory()`                  |
| `No method existed in v4` | `eventStreams.redeliveries.create()`                    |
| `No method existed in v4` | `eventStreams.redeliveries.createById()`                |
| `No method existed in v4` | `eventStreams.getStats()`                               |
| `No method existed in v4` | `eventStreams.test()`                                   |
| `No method existed in v4` | `guardian.factors.duo.settings.get()`                   |
| `No method existed in v4` | `guardian.factors.duo.settings.update()`                |
| `No method existed in v4` | `guardian.factors.duo.settings.set()`                   |
| `No method existed in v4` | `guardian.factors.pushNotification.setFcmv1Provider()`  |
| `No method existed in v4` | `guardian.factors.pushNotification.setFcmv1Provider()`  |
| `No method existed in v4` | `keys.customSigning.get()`                              |
| `No method existed in v4` | `keys.customSigning.delete()`                           |
| `No method existed in v4` | `keys.customSigning.set()`                              |
| `No method existed in v4` | `networkAcls.update()`                                  |
| `No method existed in v4` | `sessions.revoke()`                                     |
| `No method existed in v4` | `users.revokeAccess()`                                  |
| `No method existed in v4` | `verifiableCredentials.verification.templates.list()`   |
| `No method existed in v4` | `verifiableCredentials.verification.templates.create()` |
| `No method existed in v4` | `verifiableCredentials.verification.templates.get()`    |
| `No method existed in v4` | `verifiableCredentials.verification.templates.delete()` |
| `No method existed in v4` | `verifiableCredentials.verification.templates.update()` |

## Removed Methods from v4

| Before                | After                  |
| --------------------- | ---------------------- |
| `blacklists.getAll()` | `Missing method in v5` |
| `blacklists.add()`    | `Missing method in v5` |

</details>

### Pagination

All iterable responses, such as those returned by `*.list()` methods, are auto-paginated. This means that code can directly iterate over them without the need for manual pagination logic.

#### Migrating from V4 to V5 Pagination

Here's a representative example of v4 pagination code:

```ts
// V4: Manual pagination
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

// Preferred hasNextPage()-based iteration:
let page = await client.actions.list();
while (page.hasNextPage()) {
    console.log(page);
    page = await page.getNextPage();
}

// Alternatively, you can directly for-await over the items:
const response = await client.actions.list();
for await (const item of response) {
    console.log(item);
}
```

### Getting the full response and headers

Getting the full response (including headers) differs depending on whether the endpoint is paginated.

#### Non-Paginated Responses (Create, Update, etc.)

**Important:** V5 no longer returns a `data` property by default for endpoints that do not return a paginated response (e.g., `create`, `update`). To retrieve the same `data` property and be able to access headers, you can use `.withRawResponse()` to access headers and the full response:

```ts
// V5: Direct data access (no .data wrapper)
const newClient = await client.clients.create({
    name: "New Client",
    app_type: "regular_web",
    // other client properties
});
console.log(`Client ID: ${newClient.client_id}, Name: ${newClient.name}`);

// V5: Using withRawResponse() to access headers and response metadata
const clientWithResponse = await client.clients
    .create({
        name: "New Client with Raw Response",
        app_type: "regular_web",
        // other client properties
    })
    .withRawResponse();
console.log(`Client ID: ${clientWithResponse.data.client_id}, Name: ${clientWithResponse.data.name}`);
// Access headers: clientWithResponse.headers
// Access status: clientWithResponse.status

// V4: Always had .data wrapper
// const client2 = await legacyClient.clients.create({
//     name: "New Legacy Client",
//     app_type: "regular_web",
// });
// console.log(`Legacy Client ID: ${client2.data.client_id}, Name: ${client2.data.name}`);
```

#### Paginated Responses (list, etc.)

Paginated responses have a `.data` attribute for accessing the full response and headers just as they did in v4:

```ts
import { ManagementClient } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

// V5: Pagination over full responses with .data property
let page = await client.clients.list({ per_page: 5, page: 1 });
while (page.hasNextPage()) {
    console.log(`Full response data: ${page.data}`);
    page = await page.getNextPage();
}

// V4: For-loop iteration over .data property
// const clients = await legacyClient.clients.getAll({ per_page: 5, page: 1 });
// for (const client of clients.data) {
//     console.log(...);
// }
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

#### Type Name Changes

**Important:** Type names have changed drastically in v5, but the structure should remain unchanged for the most part. In v4, type names were auto-generated and often didn't have proper naming according to their actual purpose. V5 introduces properly named types that are more intuitive and follow consistent naming conventions.

If you're using TypeScript types in your code, you'll need to update the type names when migrating from v4 to v5. The new type names are more descriptive and follow a consistent pattern that aligns with the API structure.

```ts
// V5: Properly named types
import { Management } from "auth0";

// Clear, descriptive type names
const createRequest: Management.CreateClientRequestContent = {
    name: "My Application",
    app_type: "regular_web",
};

const updateRequest: Management.UpdateUserRequestContent = {
    user_metadata: { role: "admin" },
};

// V4: Auto-generated type names (examples)
// const createRequest: CreateClient = { ... }
// const updateRequest: UserUpdate = { ... }
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
    users: fs.createReadStream("./myusers.json"),
    connection_id: "con_123",
});
```

In v4, this method accepted a `Blob`:

```ts
// Either all at once...
await client.jobs.importUsers({
    users: new Blob([fs.readFileSync("./myusers.json")], { type: "application/json" }),
    connection_id: "con_123",
});

// or using fetch-blob.
import { fileFrom } from "fetch-blob/from.js";

await client.jobs.importUsers({
    users: await fileFrom("./myusers.json", "application/json"),
    connection_id: "con_123",
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
    users: fs.createReadStream("./myusers.json"),
    connection_id: "con_123",
});

// ...or as a Blob...
await client.jobs.usersImports.create({
    users: new Blob([fs.readFileSync("./myusers.json")], { type: "application/json" }),
    connection_id: "con_123",
});

// ...or as a Blob read using fetch-blob.
await client.jobs.usersImports.create({
    users: await fileFrom("./myusers.json", "application/json"),
    connection_id: "con_123",
});
```
