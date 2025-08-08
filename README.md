# Auth0 TypeScript Library

[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-Built%20with%20Fern-brightgreen)](https://buildwithfern.com?utm_source=github&utm_medium=github&utm_campaign=readme&utm_source=https%3A%2F%2Fgithub.com%2Fauth0%2Fnode-auth0)
[![npm shield](https://img.shields.io/npm/v/auth0)](https://www.npmjs.com/package/auth0)

The Auth0 TypeScript library provides convenient access to the Auth0 API from TypeScript.

## Documentation

- [Docs Site](https://auth0.com/docs) - explore our docs site and learn more about Auth0

## Getting Started

### Requirements

This library supports the following tooling versions:

- Node.js: `>=18`

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
    clientId: "{OPTIONAL_CLIENT_ID}",
    clientSecret: "{OPTIONAL_CLIENT_SECRET}",
});
```

See [more examples](https://github.com/auth0/node-auth0/blob/master/EXAMPLES.md#authentication-client).

#### Management API Client

The Auth0 Management API is meant to be used by back-end servers or trusted parties performing administrative tasks. Generally speaking, anything that can be done through the Auth0 dashboard (and more) can also be done through this API.

Initialize your client class with a client ID, client secret and a domain.

```js
import { ManagementClient } from "auth0";

var management = new ManagementClient({
    domain: "{YOUR_TENANT_AND REGION}.auth0.com",
    clientId: "{YOUR_CLIENT_ID}",
    clientSecret: "{YOUR_CLIENT_SECRET}",
});
```

Or, initialize your client class with an API v2 token and a domain.

```js
import { ManagementClient } from "auth0";

var management = new ManagementClient({
    domain: "{YOUR_TENANT_AND REGION}.auth0.com",
    token: "{YOUR_API_V2_TOKEN}",
});
```

See [more examples](https://github.com/auth0/node-auth0/blob/master/EXAMPLES.md#management-client).

## API Reference

- [AuthenticationClient](https://auth0.github.io/node-auth0/classes/auth.AuthenticationClient.html)
- [ManagementClient](https://auth0.github.io/node-auth0/classes/management.ManagementClient.html)
- [UserInfoClient](https://auth0.github.io/node-auth0/classes/userinfo.UserInfoClient.html)

## Feedback

### Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [Auth0's general contribution guidelines](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md)
- [Auth0's code of conduct guidelines](https://github.com/auth0/open-source-template/blob/master/CODE-OF-CONDUCT.md)

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
  This project is licensed under the MIT license. See the <a href="https://github.com/auth0/node-auth0/blob/master/LICENSE"> LICENSE</a> file for more info.
</p>

## Installation

```sh
npm i -s auth0
```

## Reference

A full reference for this library is available [here](https://github.com/auth0/node-auth0/blob/HEAD/./reference.md).

## Usage

Instantiate and use the client with the following:

```typescript
import { ManagementClient } from "auth0";

const client = new ManagementClient({ token: "YOUR_TOKEN" });
await client.actions.create({
    name: "name",
    supported_triggers: [
        {
            id: "id",
        },
    ],
});
```

## Request And Response Types

The SDK exports all request and response types as TypeScript interfaces. Simply import them with the
following namespace:

```typescript
import { Management } from "auth0";

const request: Management.ListActionsRequestParameters = {
    ...
};
```

## Exception Handling

When the API returns a non-success status code (4xx or 5xx response), a subclass of the following error
will be thrown.

```typescript
import { ManagementError } from "auth0";

try {
    await client.actions.create(...);
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

List endpoints are paginated. The SDK provides an iterator so that you can simply loop over the items:

```typescript
import { ManagementClient } from "auth0";

const client = new ManagementClient({ token: "YOUR_TOKEN" });
const response = await client.actions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.actions.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

## Advanced

### Additional Headers

If you would like to send additional headers as part of the request, use the `headers` request option.

```typescript
const response = await client.actions.create(..., {
    headers: {
        'X-Custom-Header': 'custom value'
    }
});
```

### Additional Query String Parameters

If you would like to send additional query string parameters as part of the request, use the `queryParams` request option.

```typescript
const response = await client.actions.create(..., {
    queryParams: {
        'customQueryParamKey': 'custom query param value'
    }
});
```

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
const response = await client.actions.create(..., {
    maxRetries: 0 // override maxRetries at the request level
});
```

### Timeouts

The SDK defaults to a 60 second timeout. Use the `timeoutInSeconds` option to configure this behavior.

```typescript
const response = await client.actions.create(..., {
    timeoutInSeconds: 30 // override timeout to 30s
});
```

### Aborting Requests

The SDK allows users to abort requests at any point by passing in an abort signal.

```typescript
const controller = new AbortController();
const response = await client.actions.create(..., {
    abortSignal: controller.signal
});
controller.abort(); // aborts the request
```

### Access Raw Response Data

The SDK provides access to raw response data, including headers, through the `.withRawResponse()` method.
The `.withRawResponse()` method returns a promise that results to an object with a `data` and a `rawResponse` property.

```typescript
const { data, rawResponse } = await client.actions.create(...).withRawResponse();

console.log(data);
console.log(rawResponse.headers['X-My-Header']);
```

### Runtime Compatibility

The SDK works in the following runtimes:

- Node.js 18+
- Vercel
- Cloudflare Workers
- Deno v1.25+
- Bun 1.0+
- React Native

### Customizing Fetch Client

The SDK provides a way for you to customize the underlying HTTP client / Fetch function. If you're running in an
unsupported environment, this provides a way for you to break glass and ensure the SDK works.

```typescript
import { ManagementClient } from "auth0";

const client = new ManagementClient({
    ...
    fetcher: // provide your implementation here
});
```

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically.
Additions made directly to this library would have to be moved over to our generation code,
otherwise they would be overwritten upon the next generated release. Feel free to open a PR as
a proof of concept, but know that we will not be able to merge it as-is. We suggest opening
an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!
