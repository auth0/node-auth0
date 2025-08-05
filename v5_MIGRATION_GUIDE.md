# V5 Migration Guide

A guide to migrating the Auth0 TS SDK from `4.x` to `5.x`.

- [Overall changes](#overall-changes)
  - [Node 20 or greater is required](#node-20-or-greater-is-required)
  - [Authentication API](#authentication-api)
  - [Management API](#management-api)
- [Specific changes to the Management API](#specific-changes-to-the-management-api)
  - [Method name changes](#method-name-changes)
  - [Auto-pagination](#auto-pagination)
  - [Interface imports](#interface-imports)
  - [Unified error type](#unified-error-type)

## Overall changes

### Node 20 or greater is required

Node LTS versions `>= 20` are supported.

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
  <summary>A non-exhaustive list of method name changes:</summary>

Note these methods are typically found in the namespace of a `ManagementClient` instance.

| Before                                      | After                                          |
| ------------------------------------------- | ---------------------------------------------- |
| `connections.getAll`                        | `connections.list`                             |
| `clients.getAll`                            | `clients.list`                                 |
| `clientGrants.getAll`                       | `clientGrants.list`                            |
| `grants.getAll`                             | `userGrants.list`                              |
| `deviceCredentials.getAll`                  | `deviceCredentials.list`                       |
| `rules.getAll`                              | `rules.list`                                   |
| `users.getAll`                              | `users.list`                                   |
| `grants`                                    | `userGrants`                                   |
| `usersByEmail.getByEmail`                   | `users.listUsersByEmail`                       |
| `users.deleteMultifactorProvider`           | `users.multifactor.deleteProvider`             |
| `users.invalidateRememberBrowser`           | `users.multifactor.invalidateRememberBrowser`  |
| `users.unlink`                              | `users.identities.delete`                      |
| `users.link`                                | `users.identities.link`                        |
| `users.getLogs`                             | `users.logs.list`                              |
| `users.getRoles`                            | `users.roles.list`                             |
| `users.assignRoles`                         | `users.roles.assign`                           |
| `roles.assignUsers`                         | `roles.users.assign`                           |
| `users.removeRoles`                         | `users.roles.delete`                           |
| `users.getPermissions`                      | `users.permissions.list`                       |
| `users.assignPermissions`                   | `users.permissions.create`                     |
| `users.removePermissions`                   | `users.permissions.delete`                     |
| `userBlocks.get`                            | `userBlocks.list`                              |
| `userBlocks.getByIdentifier`                | `userBlocks.listByIdentifier`                  |
| `guardian.getGuardianEnrollment`            | `guardian.enrollments.get`                     |
| `guardian.deleteGuardianEnrollment`         | `guardian.enrollments.delete`                  |
| `emails.get`                                | `emails.provider.get`                          |
| `emails.configure`                          | `emails.provider.create`                       |
| `tenants.getSettings`                       | `tenants.settings.get`                         |
| `tenants.updateSettings`                    | `tenants.settings.update`                      |
| `jobs.importUsers`                          | `jobs.usersImports.create`                     |
| `jobs.exportUsers`                          | `jobs.usersExports.create`                     |
| `jobs.errors`                               | `jobs.errors.get`                              |
| `jobs.verifyEmail`                          | `jobs.verificationEmail.create`                |
| `guardian.createEnrollmentTicket`           | `guardian.enrollments.createTicket`            |
| `guardian.getFactors`                       | `guardian.factors.list`                        |
| `guardian.getFactorProvider`                | `REMOVED`                                      |
| `guardian.updateFactorProvider`             | `guardian.factors.phone.setProvider`           |
| `guardian.getFactorTemplates`               | `guardian.factors.phone.getTemplates`          |
| `roles.getPermissions`                      | `roles.permissions.list`                       |
| `roles.addPermissions`                      | `roles.permissions.add`                        |
| `roles.removePermissions`                   | `roles.permissions.delete`                     |
| `hooks.getSecrets`                          | `hooks.secrets.get`                            |
| `hooks.addSecrets`                          | `hooks.secrets.create`                         |
| `hooks.updateSecrets`                       | `hooks.secrets.update`                         |
| `hooks.removeSecrets`                       | `hooks.secrets.delete`                         |
| `branding.updateSettings`                   | `branding.update`                              |
| `branding.getSettings`                      | `branding.get`                                 |
| `branding.getUniversalLoginTemplate`        | `branding.templates.getUniversalLogin`         |
| `branding.setUniversalLoginTemplate`        | `branding.templates.updateUniversalLogin`      |
| `branding.deleteUniversalLoginTemplate`     | `branding.templates.deleteUniversalLogin`      |
| `prompts.getCustomTextByLanguage`           | `prompts.customText.get`                       |
| `prompts.updateCustomTextByLanguage`        | `prompts.customText.set`                       |

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

In v5, `client.actions.list()` returns a response of type `Page<Action>`, over which the following code is valid:

```ts
import { ManagementClient } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

// Either for-loop directly over the response...
const response = await client.actions.list();
for await (const action of response) {
    console.log(action);
}

// or iterate page-by-page.
let page = await client.actions.list();
while (page.hasNextPage()) {
    page = await page.getNextPage();
}
```

### Interface imports

All types for requests or responses can be directly imported from the `auth0` package for convenience:

```ts
import { ManagementClient, UpdateUserRequestContent } from "auth0";

const management = new ManagementClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});

// Using the direct UpdateUserRequestContent import:
const user_id: string = "example_id";
const request: UpdateUserRequestContent = {
    user_metadata: { email: `'this@example.com'` },
};

await client.users.update(user_id, request);
```

### Unified error type

All errors (4xx or 5xx response codes) are represented in the SDK as a subclass of the generalized `ManagementError` class, which encompasses all the different kinds of errors (`RequiredError`, `ResponseError`, `TimeoutError`, etc.) from v4:

```ts
import { ManagementClient, ManagementError } from "./src";

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
