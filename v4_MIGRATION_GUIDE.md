# V4 Migration Guide

Guide to migrating from `3.x` to `4.x`

- [General](#general)
  - [Node 18 or newer is required](#node-18-or-newer-is-required)
  - [Callbacks are no longer supported](#callbacks-are-no-longer-supported)
  - [Response change](#response-change)
- [Authentication API](#authentication-api)
  - [Options](#options)
  - [Legacy endpoints have been removed](#legacy-endpoints-have-been-removed)
  - [Top level methods have been removed](#top-level-methods-have-been-removed)
  - [Method name changes](#method-name-changes)
- [Management API](#management-api)
  - [Options](#options-1)
  - [Top level methods have been removed](#top-level-methods-have-been-removed-1)
  - [Method name changes](#method-name-changes-1)
  - [Parameter changes](#parameter-changes)

## General

### Node 18 or newer is required

Node 18 LTS and newer LTS releases are supported.

### Callbacks are no longer supported

All methods no longer accept a callback and only return a Promise. The last argument is now an object to override the `fetch` request.

#### Before

```js
management.users.getAll({}, function (err, users) {
  console.log(users.length);
});
```

#### After

```js
const users = await management.users.getAll();
console.log(users.length);
```

### Response change

The SDK now returns an object which includes the data and other information about the response.

#### Before

```js
const user = await management.users.get({ id: 'user-id' });
```

#### After

```js
const { data: user } = await management.users.get({ id: 'user-id' });
```

## Authentication API

### Options

The following configuration options have changed:

- `scope` - You should use the `scope` option for the specific grant.
- `proxy` - You should now provide an [HttpsAgent](https://nodejs.org/api/https.html#class-httpsagent) as the `agent` config.
- `supportedAlgorithms` - This has been replaced with `idTokenSigningAlg` which defaults to `RS256` (If your ID Tokens are signed with `HS256` you should provide this as the configuration option)

### Legacy endpoints have been removed

The following endpoints are deprecated and have been removed:

- `oauth.socialSignIn`- We recommend that you open the browser to do social authentication instead, [more info](https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html)
- `oauth.signIn`- You should use `oauth.passwordGrant` instead.
- `tokens.getInfo` - You should use `UserInfoClient.getUserInfo` instead.
- `tokens.getDelegationToken` and `getDelegationToken` - See https://auth0.com/docs/authenticate/login/oidc-conformant-authentication/oidc-adoption-delegation
- `users.impersonate` - See https://community.auth0.com/t/auth0-user-impersonation/81821/2

### Top level methods have been removed

Previously, in many cases, there were 2 ways to call a method:

```js
await auth.clientCredentialsGrant({ audience: 'my-api' });
```

Now the top level methods on the Authentication Client have been removed, so you must call the method on the applicable namespace.

```js
await auth.oauth.clientCredentialsGrant({ audience: 'my-api' });
```

<details>
  <summary>Full list</summary>

| Before                       | After                          |
| ---------------------------- | ------------------------------ |
| `requestMagicLink`           | `passwordless.sendEmail`       |
| `requestEmailCode`           | `passwordless.sendEmail`       |
| `verifyEmailCode`            | `passwordless.loginWithEmail`  |
| `requestSMSCode`             | `passwordless.sendSMS`         |
| `verifySMSCode`              | `passwordless.loginWithSMS`    |
| `changePassword`             | `database.changePassword`      |
| `requestChangePasswordEmail` | `database.changePassword`      |
| `getProfile`                 | `UserInfoClient.getUserInfo`   |
| `clientCredentialsGrant`     | `oauth.clientCredentialsGrant` |
| `passwordGrant`              | `oauth.passwordGrant`          |
| `refreshToken`               | `oauth.refreshTokenGrant`      |

</details>

### Method name changes

Some method names have been changed to better align with the documentation.

| Before                                | After                                                         |
| ------------------------------------- | ------------------------------------------------------------- |
| `oauth.refreshToken`                  | `oauth.refreshTokenGrant`                                     |
| `database.requestChangePasswordEmail` | `database.changePassword`                                     |
| `passwordless.signIn`                 | `passwordless.loginWithEmail`<br/>`passwordless.loginWithSMS` |
| `users.getInfo`                       | `UserInfoClient.getUserInfo`                                  |

## Management API

### Options

The following configuration options have changed:

- `scope` - The Management Client uses the Client Credentials grant which gets all the scopes granted to the application. So this is redundant and has been removed.
- `tokenProvider.enableCache` - Each instance of the Management Client has its own cache, if you want a new cache you want to instantiate a new Management Client.
- `tokenProvider.cacheTTLInSeconds` - Each instance of the Management Client only stores a single access token, so this functionality has been removed.
- `proxy` - You should now provide an [HttpsAgent](https://nodejs.org/api/https.html#class-httpsagent) as the `agent` config.
- `includeResponseHeaders` - This has been removed, all return types include the response headers by default.

### Top level methods have been removed

Previously, in many cases, there were 2 ways to call a method:

```js
const users = await management.getUsers();
```

Now the top level methods on the Management Client have been removed, so you must call the method on the applicable namespace.

```js
const usersAlso = await management.users.getAll();
```

<details>
  <summary>Full list</summary>

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
| `getUsersByEmail`                           | `usersByEmail.getByEmail`                    |
| `getUser`                                   | `users.get`                                  |
| `deleteAllUsers`                            | `users.deleteAll`                            |
| `deleteUser`                                | `users.delete`                               |
| `createUser`                                | `users.create`                               |
| `updateUser`                                | `users.update`                               |
| `updateUserMetadata`                        | `REMOVED`                                    |
| `updateAppMetadata`                         | `REMOVED`                                    |
| `deleteUserMultifactor`                     | `users.deleteMultifactorProvider`            |
| `deleteUserMultifcator`                     | `users.deleteMultifactorProvider`            |
| `unlinkUsers`                               | `users.unlink`                               |
| `linkUsers`                                 | `users.link`                                 |
| `getUserLogs`                               | `users.getLogs`                                 |
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
| `getEmailProvider`                          | `emails.get`                                 |
| `configureEmailProvider`                    | `emails.configure`                           |
| `deleteEmailProvider`                       | DELETED                                      |
| `updateEmailProvider`                       | `emails.update`                              |
| `getActiveUsersCount`                       | `stats.getActiveUsersCount`                  |
| `getDailyStats`                             | `stats.getDaily`                             |
| `getTenantSettings`                         | `tenants.getSettings`                         |
| `updateTenantSettings`                      | `tenants.updateSettings`                      |
| `getJob`                                    | `jobs.get`                                   |
| `importUsers`                               | `jobs.importUsers`                           |
| `importUsersJob`                            | `jobs.importUsers`                           |
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
| `getAccessToken`                            | `oauth.clientCredentialsGrant` (on `AuthenticationClient`) |
| `updateBrandingSettings`                    | `branding.updateSettings`                    |
| `getBrandingSettings`                       | `branding.getSettings`                       |
| `getBrandingUniversalLoginTemplate`         | `branding.getUniversalLoginTemplate`         |
| `setBrandingUniversalLoginTemplate`         | `branding.setUniversalLoginTemplate`         |
| `deleteBrandingUniversalLoginTemplate`      | `branding.deleteUniversalLoginTemplate`      |
| `updateMigrations`                          | `migrations.updateMigrations`                |
| `getMigrations`                             | `migrations.getMigrations`                   |
| `getPromptsSettings`                        | `prompts.get`                        |
| `updatePromptsSettings`                     | `prompts.update`                     |
| `getCustomTextByLanguage`                   | `prompts.getCustomTextByLanguage`            |
| `updateCustomTextByLanguage`                | `prompts.updateCustomTextByLanguage`         |

</details>

### Method name changes

Some method names have been changed to better align with the documentation.

#### Before

```js
await users.removeRoles({ id: 'user' }, { roles: ['read:users'] });
```

#### Before

```js
await users.deleteRoles({ id: 'user' }, { roles: ['read:users'] });
```

<details>
  <summary>full list</summary>

| Before                                  | After                                           |
| --------------------------------------- | ----------------------------------------------- |
| `blacklistedTokens.add`                 | `blacklists.add`                                |
| `blacklistedTokens.getAll`              | `blacklists.getAll`                             |
| `clientCredentials.create`              | `clients.createCredential`                      |
| `clientCredentials.getAll`              | `clients.getredentials`                         |
| `clientCredentials.get`                 | `clients.getCredential`                         |
| `clientCredentials.delete`              | `clients.deleteCredential`                      |
| `emailProvider.get`                     | `emails.get`                                    |
| `emailProvider.update`                  | `emails.update`                                 |
| `emailProvider.configure`               | `emails.configure`                              |
| `tenant.getSettings`                    | `tenants.getSettings`                           |
| `tenant.updateSettings`                 | `tenants.updateSettings`                        |
| `users.getByEmail`                      | `usersByEmail.getByEmail`                       |
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

</details>

### Import users now takes a Blob

#### Before

```js
await management.jobs.importUsers({
  users: fs.createReadStream('./myusers.json'),
  connection_id: 'con_123',
});
```

#### After

```js
await management.jobs.importUsers({
  users: new Blob([fs.readFileSync('./myusers.json')], { type: 'application/json' }),
  connection_id: 'con_123',
});
```

If you don't want to read the whole file into memory, you can use a library like [fetch-blob](https://github.com/node-fetch/fetch-blob).

```js
import { fileFrom } from 'fetch-blob/from.js';

await management.jobs.importUsers({
  users: await fileFrom('./myusers.json', 'application/json'),
  connection_id: 'con_123',
});
```

### Parameter changes

The `fields` parameter, used to include or exclude fields from a response, now takes only a string.

#### Before

```js
await management.connections.getAll({
  fields: ['name', 'strategy'],
});
```

#### After

```js
await management.connections.getAll({
  fields: 'name,strategy',
});
```
