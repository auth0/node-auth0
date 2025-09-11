![Node.js client library for Auth0](https://cdn.auth0.com/website/sdks/banner/node-auth0-banner.png)

![Release](https://img.shields.io/npm/v/auth0)
[![Codecov](https://img.shields.io/codecov/c/github/auth0/node-auth0)](https://codecov.io/gh/auth0/node-auth0)
![Downloads](https://img.shields.io/npm/dw/auth0)
[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-Built%20with%20Fern-brightgreen)](https://buildwithfern.com?utm_source=github&utm_medium=github&utm_campaign=readme&utm_source=https%3A%2F%2Fgithub.com%2Fauth0%2Fnode-auth0)

📚 [Documentation](#documentation) - 🚀 [Getting Started](#getting-started) - 💻 [API Reference](#api-reference) - 💬 [Feedback](#feedback)

## Documentation

- [Docs Site](https://auth0.com/docs) - explore our docs site and learn more about Auth0
- [API Reference](https://github.com/auth0/node-auth0/blob/master/reference.md) - full reference for this library

## Getting Started

### Requirements

This library supports the following tooling versions:

- Node.js: `^20.19.0 || ^22.12.0 || ^24.0.0`

### Installation

Using [npm](https://npmjs.org) in your project directory run the following command:

```bash
npm install auth0
```

### Configure the SDK

#### Authentication API Client

This client can be used to access Auth0's [Authentication API](https://auth0.com/docs/api/authentication).

```js
import { AuthenticationClient } from "auth0";

const auth0 = new AuthenticationClient({
    domain: "{YOUR_TENANT_AND REGION}.auth0.com",
    clientId: "{YOUR_CLIENT_ID}",
    clientSecret: "{OPTIONAL_CLIENT_SECRET}",
});
```

#### Management API Client

The Auth0 Management API is meant to be used by back-end servers or trusted parties performing administrative tasks. Generally speaking, anything that can be done through the Auth0 dashboard (and more) can also be done through this API.

Initialize your client class with a domain and token:

```js
import { ManagementClient } from "auth0";

const management = new ManagementClient({
    domain: "{YOUR_TENANT_AND REGION}.auth0.com",
    token: "{YOUR_API_V2_TOKEN}",
});
```

Or use client credentials:

```js
import { ManagementClient } from "auth0";

const management = new ManagementClient({
    domain: "{YOUR_TENANT_AND REGION}.auth0.com",
    clientId: "{YOUR_CLIENT_ID}",
    clientSecret: "{YOUR_CLIENT_SECRET}",
    withCustomDomainHeader: "auth.example.com", // Optional: Auto-applies to whitelisted endpoints
});
```

#### UserInfo API Client

This client can be used to retrieve user profile information.

```js
import { UserInfoClient } from "auth0";

const userInfo = new UserInfoClient({
    domain: "{YOUR_TENANT_AND REGION}.auth0.com",
});

// Get user info with an access token
const userProfile = await userInfo.getUserInfo(accessToken);
```

## Legacy Usage

If you are migrating from the legacy `node-auth0` package (v4.x) or need to maintain compatibility with legacy code, you can use the legacy export which provides the `node-auth0` v4.x API interface.

### Installing Legacy Version

The legacy version (`node-auth0` v4.x) is available through the `/legacy` export path:

```js
// Import the legacy version (node-auth0 v4.x API)
import { ManagementClient, AuthenticationClient } from "auth0/legacy";

// Or using CommonJS
const { ManagementClient, AuthenticationClient } = require("auth0/legacy");
```

### Legacy Configuration

The legacy API uses the `node-auth0` v4.x configuration format and method signatures, which are different from the current v5 API:

#### Legacy Management Client

```js
import { ManagementClient } from "auth0/legacy";

const management = new ManagementClient({
    domain: "{YOUR_TENANT_AND REGION}.auth0.com",
    clientId: "{YOUR_CLIENT_ID}",
    clientSecret: "{YOUR_CLIENT_SECRET}",
    scope: "read:users update:users",
});

// Legacy API methods use promise-based patterns (node-auth0 v4.x style)
management.users
    .getAll()
    .then((users) => console.log(users))
    .catch((err) => console.error(err));

// Or with async/await
try {
    const users = await management.users.getAll();
    console.log(users);
} catch (err) {
    console.error(err);
}
```

#### Legacy Authentication Client

```js
import { AuthenticationClient } from "auth0/legacy";

const auth0 = new AuthenticationClient({
    domain: "{YOUR_TENANT_AND REGION}.auth0.com",
    clientId: "{YOUR_CLIENT_ID}",
    clientSecret: "{YOUR_CLIENT_SECRET}",
});

// Legacy authentication methods (node-auth0 v4.x style)
auth0.oauth
    .passwordGrant({
        username: "user@example.com",
        password: "password",
        audience: "https://api.example.com",
    })
    .then((userData) => {
        console.log(userData);
    })
    .catch((err) => {
        console.error("Authentication error:", err);
    });

// Or with async/await
try {
    const userData = await auth0.oauth.passwordGrant({
        username: "user@example.com",
        password: "password",
        audience: "https://api.example.com",
    });
    console.log(userData);
} catch (err) {
    console.error("Authentication error:", err);
}
```

### Migration from Legacy (node-auth0 v4) to v5

When migrating from `node-auth0` v4.x to the current v5 SDK, note the following key differences:

1. **Method Names**: Many method names have changed to be more descriptive
2. **Type Safety**: Enhanced TypeScript support with better type definitions
3. **Error Handling**: Unified error handling with specific error types
4. **Configuration**: Simplified configuration options

#### Example Migration

**Legacy (node-auth0 v4.x) code:**

```js
const { ManagementClient } = require("auth0/legacy");

const management = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    scope: "read:users",
});

// With promises
management.users
    .getAll({ search_engine: "v3" })
    .then((users) => {
        console.log(users);
    })
    .catch((err) => {
        console.error(err);
    });

// Or with async/await
try {
    const users = await management.users.getAll({ search_engine: "v3" });
    console.log(users);
} catch (err) {
    console.error(err);
}
```

**v5 equivalent:**

```js
import { ManagementClient } from "auth0";

const management = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

// With promises
management.users
    .list({
        searchEngine: "v3",
    })
    .then((users) => {
        console.log(users);
    })
    .catch((error) => {
        console.error(error);
    });

// Or with async/await
try {
    const users = await management.users.list({
        searchEngine: "v3",
    });
    console.log(users);
} catch (error) {
    console.error(error);
}
```

## Request and Response Types

The SDK exports all request and response types as TypeScript interfaces. You can import them directly:

```typescript
import { ManagementClient, Management, ManagementError } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    token: "YOUR_TOKEN",
});

// Use the request type
const listParams: Management.ListActionsRequestParameters = {
    triggerId: "post-login",
    actionName: "my-action",
};

const actions = await client.actions.list(listParams);
```

## API Reference

### Generated Documentation

- [Full Reference](./reference.md) - complete API reference guide

### Key Classes

- **ManagementClient** - for Auth0 Management API operations
- **AuthenticationClient** - for Auth0 Authentication API operations
- **UserInfoClient** - for retrieving user profile information

## Exception Handling

When the API returns a non-success status code (4xx or 5xx response), a subclass of the following error
will be thrown.

```typescript
import { ManagementError } from "auth0";

try {
    await client.actions.create({
        name: "my-action",
        supported_triggers: [{ id: "post-login" }],
        code: "exports.onExecutePostLogin = async (event, api) => { console.log('Hello World'); };",
    });
} catch (err) {
    if (err instanceof ManagementError) {
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.body);
        console.log(err.rawResponse);
    }
}
```

## Pagination

Some list endpoints are paginated. The SDK provides an iterator so that you can simply loop over the items:

```typescript
import { ManagementClient } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    token: "YOUR_TOKEN",
});

const response = await client.actions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.actions.list();
while (page.hasNextPage()) {
    page = await page.getNextPage();
}
```

## Advanced

### Additional Headers

If you would like to send additional headers as part of the request, use the `headers` request option.

```typescript
const response = await client.actions.create(
    {
        name: "my-action",
        supported_triggers: [{ id: "post-login" }],
    },
    {
        headers: {
            "X-Custom-Header": "custom value",
        },
    },
);
```

### Request Helpers

The SDK provides convenient helper functions for common request configuration patterns:

```typescript
import { ManagementClient, CustomDomainHeader, withTimeout, withRetries, withHeaders, withAbortSignal } from "auth0";

const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    token: "YOUR_TOKEN",
});

// Example 1: Use custom domain header for specific requests
const reqOptions = {
    ...CustomDomainHeader("auth.example.com"),
    timeoutInSeconds: 30,
};
await client.actions.list({}, reqOptions);

// Example 2: Combine multiple options
const reqOptions = {
    ...withTimeout(30),
    ...withRetries(3),
    ...withHeaders({
        "X-Request-ID": crypto.randomUUID(),
        "X-Operation-Source": "admin-dashboard",
    }),
};
await client.actions.list({}, reqOptions);

// Example 3: For automatic custom domain header on whitelisted endpoints
const client = new ManagementClient({
    domain: "your-tenant.auth0.com",
    token: "YOUR_TOKEN",
    withCustomDomainHeader: "auth.example.com", // Auto-applies to whitelisted endpoints
});

// Example 4: Request cancellation
const controller = new AbortController();
const reqOptions = {
    ...withAbortSignal(controller.signal),
    ...withTimeout(30),
};
const promise = client.actions.list({}, reqOptions);

// Cancel after 10 seconds
setTimeout(() => controller.abort(), 10000);
```

Available helper functions:

- `CustomDomainHeader(domain)` - Configure custom domain header for specific requests
- `withTimeout(seconds)` - Set request timeout
- `withRetries(count)` - Configure retry attempts
- `withHeaders(headers)` - Add custom headers
- `withAbortSignal(signal)` - Enable request cancellation

To apply the custom domain header globally across your application, use the withCustomDomainHeader option when initializing the ManagementClient. This will automatically inject the header for all whitelisted endpoints.

### Retries

The SDK is instrumented with automatic retries with exponential backoff. A request will be retried as long
as the request is deemed retryable and the number of retry attempts has not grown larger than the configured
retry limit (default: 2).

A request is deemed retryable when any of the following HTTP status codes is returned:

- [408](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408) (Timeout)
- [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (Too Many Requests)
- [5XX](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) (Internal Server Errors)

Use the `maxRetries` request option to configure this behavior.

```typescript
const response = await client.actions.create(
    {
        name: "my-action",
        supported_triggers: [{ id: "post-login" }],
    },
    {
        maxRetries: 0, // override maxRetries at the request level
    },
);
```

### Timeouts

The SDK defaults to a 60 second timeout. Use the `timeoutInSeconds` option to configure this behavior.

```typescript
const response = await client.actions.create(
    {
        name: "my-action",
        supported_triggers: [{ id: "post-login" }],
    },
    {
        timeoutInSeconds: 30, // override timeout to 30s
    },
);
```

### Aborting Requests

The SDK allows users to abort requests at any point by passing in an abort signal.

```typescript
const controller = new AbortController();
const response = await client.actions.create(
    {
        name: "my-action",
        supported_triggers: [{ id: "post-login" }],
    },
    {
        abortSignal: controller.signal,
    },
);
controller.abort(); // aborts the request
```

### Access Raw Response Data

The SDK provides access to raw response data, including headers, through the `.withRawResponse()` method.
The `.withRawResponse()` method returns a promise that results to an object with a `data` and a `rawResponse` property.

```typescript
const { data, rawResponse } = await client.actions
    .create({
        name: "my-action",
        supported_triggers: [{ id: "post-login" }],
    })
    .withRawResponse();

console.log(data);
console.log(rawResponse.headers);
```

### Runtime Compatibility

The SDK defaults to `node-fetch` but will use the global fetch client if present. The SDK works in the following
runtimes:

- Node.js 20.19.0+, 22.12.0+, 24+
- Vercel
- Cloudflare Workers
- Deno v1.25+
- Bun 1.0+
- React Native

## Feedback

### Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [Auth0's general contribution guidelines](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md)
- [Auth0's code of conduct guidelines](https://github.com/auth0/open-source-template/blob/master/CODE-OF-CONDUCT.md)

While we value open-source contributions to this SDK, this library is generated programmatically.
Additions made directly to this library would have to be moved over to our generation code,
otherwise they would be overwritten upon the next generated release. Feel free to open a PR as
a proof of concept, but know that we will not be able to merge it as-is. We suggest opening
an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!

### Raise an issue

To provide feedback or report a bug, please [raise an issue on our issue tracker](https://github.com/auth0/node-auth0/issues).

### Vulnerability Reporting

Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## What is Auth0?

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_dark_mode.png" width="150">
    <source media="(prefers-color-scheme: light)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
    <img alt="Auth0 Logo" src="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
  </picture>
</p>
<p align="center">
  Auth0 is an easy to implement, adaptable authentication and authorization platform. To learn more checkout <a href="https://auth0.com/why-auth0">Why Auth0?</a>
</p>
<p align="center">
  This project is licensed under the MIT license. See the <a href="./LICENSE"> LICENSE</a> file for more info.
</p>
