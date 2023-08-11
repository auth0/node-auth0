# V3 Migration Guide

Guide to migrating from `2.x` to `3.x`

## Node 16 or newer is required

Node 16 LTS and newer LTS releases are supported.

## Callbacks are no longer supported

All methods no longer accept a callback and only return a Promise.

### Before

```js
management.users.getAll({}, function (err, users) {
  console.log(users.length);
});
```

### After

```js
const users = await management.users.getAll();
console.log(users.length);
```

## Top level methods have been removed

Previously, in many cases, there were 2 ways to call a method:

```js
const users = await management.getUsers();
```

Now the top level methods on the Management Client have been removed, so you must call the method on the applicable namespace.

```js
const usersAlso = await management.users.getAll();
```

| Before                                      | After                                        |
| ------------------------------------------- | -------------------------------------------- |
| `getConnections`                            | `connections.getAll`                         |
| `createConnection`                          | `connections.create`                         |
| `getConnection`                             | `connections.get`                            |
| `deleteConnection`                          | `connections.delete`                         |
| `updateConnection`                          | `connections.update`                         |
| `getClients`                                | `clients.getAll`                             |
| `getClient`                                 | `clients.get`                                |
| `createClient`                              | `clients.create`                             |
| `updateClient`                              | `clients.update`                             |
| `deleteClient`                              | `clients.delete`                             |
| `getClientGrants`                           | `clientGrants.getAll`                        |
| `createClientGrant`                         | `clientGrants.create`                        |
| `updateClientGrant`                         | `clientGrants.update`                        |
| `deleteClientGrant`                         | `clientGrants.delete`                        |
| `getGrants`                                 | `grants.getAll`                              |
| `deleteGrant`                               | `grants.delete`                              |
| `createDevicePublicKey`                     | `deviceCredentials.createPublicKey`          |
| `getDeviceCredentials`                      | `deviceCredentials.getAll`                   |
| `deleteDeviceCredential`                    | `deviceCredentials.delete`                   |
| `getRules`                                  | `rules.getAll`                               |
| `createRule`                                | `rules.create`                               |
| `getRule`                                   | `rules.get`                                  |
| `deleteRule`                                | `rules.delete`                               |
| `updateRule`                                | `rules.update`                               |
| `getUsers`                                  | `users.getAll`                               |
| `getUsersByEmail`                           | `users.getByEmail`                           |
| `getUser`                                   | `users.get`                                  |
| `deleteAllUsers`                            | `users.deleteAll`                            |
| `deleteUser`                                | `users.delete`                               |
| `createUser`                                | `users.create`                               |
| `updateUser`                                | `users.update`                               |
| `updateUserMetadata`                        | `users.updateUserMetadata`                   |
| `updateAppMetadata`                         | `users.updateAppMetadata`                    |
| `deleteUserMultifactor`                     | `users.deleteMultifactorProvider`            |
| `deleteUserMultifcator`                     | `users.deleteMultifactorProvider`            |
| `unlinkUsers`                               | `users.unlink`                               |
| `linkUsers`                                 | `users.link`                                 |
| `getUserLogs`                               | `users.logs`                                 |
| `getUserRoles`                              | `users.getRoles`                             |
| `assignRolestoUser`                         | `users.assignRoles`                          |
| `assignUsersToRole`                         | `roles.assignUsers`                          |
| `removeRolesFromUser`                       | `users.removeRoles`                          |
| `getUserPermissions`                        | `users.getPermissions`                       |
| `assignPermissionsToUser`                   | `users.assignPermissions`                    |
| `removePermissionsFromUser`                 | `users.removePermissions`                    |
| `getGuardianEnrollments`                    | `users.getGuardianEnrollments`               |
| `regenerateRecoveryCode`                    | `users.regenerateRecoveryCode`               |
| `invalidateRememberBrowser`                 | `users.invalidateRememberBrowser`            |
| `getUserBlocks`                             | `userBlocks.get`                             |
| `unblockUser`                               | `userBlocks.delete`                          |
| `getUserBlocksByIdentifier`                 | `userBlocks.getByIdentifier`                 |
| `unblockUserByIdentifier`                   | `userBlocks.deleteByIdentifier`              |
| `getGuardianEnrollment`                     | `guardian.getGuardianEnrollment`             |
| `deleteGuardianEnrollment`                  | `guardian.deleteGuardianEnrollment`          |
| `getBlacklistedTokens`                      | `blacklistedTokens.getAll`                   |
| `blacklistToken`                            | `blacklistedTokens.add`                      |
| `createEmailTemplate`                       | `emailTemplates.create`                      |
| `getEmailTemplate`                          | `emailTemplates.get`                         |
| `updateEmailTemplate`                       | `emailTemplates.update`                      |
| `getEmailProvider`                          | `emailProvider.get`                          |
| `configureEmailProvider`                    | `emailProvider.configure`                    |
| `deleteEmailProvider`                       | `emailProvider.delete`                       |
| `updateEmailProvider`                       | `emailProvider.update`                       |
| `getActiveUsersCount`                       | `stats.getActiveUsersCount`                  |
| `getDailyStats`                             | `stats.getDaily`                             |
| `getTenantSettings`                         | `tenant.getSettings`                         |
| `updateTenantSettings`                      | `tenant.updateSettings`                      |
| `getJob`                                    | `jobs.get`                                   |
| `importUsers`                               | `jobs.importUsers`                           |
| `importUsersJob`                            | `jobs.importUsersJob`                        |
| `exportUsers`                               | `jobs.exportUsers`                           |
| `getJobErrors`                              | `jobs.errors`                                |
| `sendEmailVerification`                     | `jobs.verifyEmail`                           |
| `createPasswordChangeTicket`                | `tickets.changePassword`                     |
| `createEmailVerificationTicket`             | `tickets.verifyEmail`                        |
| `getLog`                                    | `logs.get`                                   |
| `getLogs`                                   | `logs.getAll`                                |
| `getLogStreams`                             | `logStreams.getAll`                          |
| `createLogStream`                           | `logStreams.create`                          |
| `getLogStream`                              | `logStreams.get`                             |
| `deleteLogStream`                           | `logStreams.delete`                          |
| `updateLogStream`                           | `logStreams.update`                          |
| `createResourceServer`                      | `resourceServers.create`                     |
| `getResourceServers`                        | `resourceServers.getAll`                     |
| `getResourceServer`                         | `resourceServers.get`                        |
| `deleteResourceServer`                      | `resourceServers.delete`                     |
| `updateResourceServer`                      | `resourceServers.update`                     |
| `setRulesConfig`                            | `rulesConfigs.set`                           |
| `getRulesConfigs`                           | `rulesConfigs.getAll`                        |
| `deleteRulesConfig`                         | `rulesConfigs.delete`                        |
| `createCustomDomain`                        | `customDomains.create`                       |
| `getCustomDomains`                          | `customDomains.getAll`                       |
| `getCustomDomain`                           | `customDomains.get`                          |
| `verifyCustomDomain`                        | `customDomains.verify`                       |
| `deleteCustomDomain`                        | `customDomains.delete`                       |
| `createGuardianEnrollmentTicket`            | `guardian.createEnrollmentTicket`            |
| `getGuardianFactors`                        | `guardian.getFactors`                        |
| `getGuardianFactorSettings`                 | `guardian.getFactorSettings`                 |
| `getGuardianFactorProvider`                 | `guardian.getFactorProvider`                 |
| `updateGuardianFactorProvider`              | `guardian.updateFactorProvider`              |
| `updateGuardianFactorSettings`              | `guardian.updateFactorSettings`              |
| `getGuardianFactorTemplates`                | `guardian.getFactorTemplates`                |
| `updateGuardianFactorTemplates`             | `guardian.updateFactorTemplates`             |
| `updateGuardianFactor`                      | `guardian.updateFactor`                      |
| `getGuardianPolicies`                       | `guardian.getPolicies`                       |
| `updateGuardianPolicies`                    | `guardian.updatePolicies`                    |
| `getGuardianPhoneFactorSelectedProvider`    | `guardian.getPhoneFactorSelectedProvider`    |
| `updateGuardianPhoneFactorSelectedProvider` | `guardian.updatePhoneFactorSelectedProvider` |
| `getGuardianPhoneFactorMessageTypes`        | `guardian.getPhoneFactorMessageTypes`        |
| `updateGuardianPhoneFactorMessageTypes`     | `guardian.updatePhoneFactorMessageTypes`     |
| `getRoles`                                  | `roles.getAll`                               |
| `createRole`                                | `roles.create`                               |
| `getRole`                                   | `roles.get`                                  |
| `deleteRole`                                | `roles.delete`                               |
| `updateRole`                                | `roles.update`                               |
| `getPermissionsInRole`                      | `roles.getPermissions`                       |
| `addPermissionsInRole`                      | `roles.addPermissions`                       |
| `removePermissionsFromRole`                 | `roles.removePermissions`                    |
| `getUsersInRole`                            | `roles.getUsers`                             |
| `getHooks`                                  | `hooks.getAll`                               |
| `getHook`                                   | `hooks.get`                                  |
| `createHook`                                | `hooks.create`                               |
| `updateHook`                                | `hooks.update`                               |
| `deleteHook`                                | `hooks.delete`                               |
| `getHookSecrets`                            | `hooks.getSecrets`                           |
| `addHookSecrets`                            | `hooks.addSecrets`                           |
| `updateHookSecrets`                         | `hooks.updateSecrets`                        |
| `removeHookSecrets`                         | `hooks.removeSecrets`                        |
| `getAccessToken`                            | `tokenProvider.getAccessToken`               |
| `updateBrandingSettings`                    | `branding.updateSettings`                    |
| `getBrandingSettings`                       | `branding.getSettings`                       |
| `getBrandingUniversalLoginTemplate`         | `branding.getUniversalLoginTemplate`         |
| `setBrandingUniversalLoginTemplate`         | `branding.setUniversalLoginTemplate`         |
| `deleteBrandingUniversalLoginTemplate`      | `branding.deleteUniversalLoginTemplate`      |
| `updateMigrations`                          | `migrations.updateMigrations`                |
| `getMigrations`                             | `migrations.getMigrations`                   |
| `getPromptsSettings`                        | `prompts.getSettings`                        |
| `updatePromptsSettings`                     | `prompts.updateSettings`                     |
| `getCustomTextByLanguage`                   | `prompts.getCustomTextByLanguage`            |
| `updateCustomTextByLanguage`                | `prompts.updateCustomTextByLanguage`         |

## Method name changes

Some method names have changed, full list

| Before                                  | After                                           |
| --------------------------------------- | ----------------------------------------------- |
| `actions.createVersion`                 | ??                                              |
| `blacklistedTokens.add`                 | `blacklists.add`                                |
| `blacklistedTokens.getAll`              | `blacklists.getAll`                             |
| `emailProvider.get`                     | `emails.get`                                    |
| `emailProvider.update`                  | `emails.update`                                 |
| `emailProvider.configure`               | `emails.configure`                              |
| `tenant.getSettings`                    | `tenants.getSettings`                           |
| `tenant.updateSettings`                 | `tenants.updateSettings`                        |
| `migrations.*`                          | ??                                              |
| `users.getByEmail`                      | `usersByEmailManager.getByEmail`                |
| `users.updateUserMetadata`              | `users.update`                                  |
| `users.updateAppMetadata`               | `users.update`                                  |
| `users.deleteAll`                       | `REMOVED`                                       |
| `users.logs`                            | `users.getLogs`                                 |
| `users.getGuardianEnrollments`          | `getEnrollments`                                |
| `users.removeRoles`                     | `users.deleteRoles`                             |
| `users.removePermissions`               | `users.deletePermissions`                       |
| `users.getAuthenticationMethodById`     | `users.getAuthenticationMethod`                 |
| `users.updateAuthenticationMethodById`  | `users.updateAuthenticationMethod`              |
| `users.deleteAuthenticationMethodById`  | `users.deleteAuthenticationMethod`              |
| `userBlocks.getByIdentifier`            | `userBlocks.get`                                |
| `userBlocks.deleteByIdentifier`         | `userBlocks.delete`                             |
| `guardian.getFactorSettings`            | ??                                              |
| `guardian.updateFactorSettings`         | ??                                              |
| `guardian.getFactorProvider`            | `guardian.get{name}FactorProvider{provider}`    |
| `guardian.updateFactorProvider`         | `guardian.update{name}FactorProvider{provider}` |
| `guardian.getFactorTemplates`           | `guardian.get{name}FactorTemplates`             |
| `guardian.updateFactorTemplates`        | `guardian.update{name}FactorTemplates`          |
| `jobs.importUsersJob`                   | `jobs.importUsers`                              |
| `jobs.errors`                           | `jobs.getErrors`                                |
| `roles.removePermissions`               | `deletePermissions`                             |
| `hooks.removeSecrets`                   | `hooks.deleteSecrets`                           |
| `prompts.updateSettings`                | `prompts.update`                                |
| `prompts.getSettings`                   | `prompts.get`                                   |
| `organizations.getByID`                 | `organizations.get`                             |
| `organizations.removeEnabledConnection` | `organizations.deleteEnabledConnection`         |
| `organizations.removeMembers`           | `organizations.deleteMembers`                   |
| `organizations.removeMemberRoles`       | `organizations.deleteMemberRoles`               |
