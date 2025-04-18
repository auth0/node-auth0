![Node.js client library for Auth0](https://cdn.auth0.com/website/sdks/banner/node-auth0-banner.png)

![Release](https://img.shields.io/npm/v/auth0)
[![Codecov](https://img.shields.io/codecov/c/github/auth0/node-auth0)](https://codecov.io/gh/auth0/node-auth0)
![Downloads](https://img.shields.io/npm/dw/auth0)
[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

📚 [Documentation](#documentation) - 🚀 [Getting Started](#getting-started) - 💻 [API Reference](#api-reference) - 💬 [Feedback](#feedback)

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
import { AuthenticationClient } from 'auth0';

const auth0 = new AuthenticationClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{OPTIONAL_CLIENT_ID}',
  clientSecret: '{OPTIONAL_CLIENT_SECRET}',
});
```

See [more examples](https://github.com/auth0/node-auth0/blob/master/EXAMPLES.md#authentication-client).

#### Management API Client

The Auth0 Management API is meant to be used by back-end servers or trusted parties performing administrative tasks. Generally speaking, anything that can be done through the Auth0 dashboard (and more) can also be done through this API.

Initialize your client class with a client ID, client secret and a domain.

```js
import { ManagementClient } from 'auth0';

var management = new ManagementClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});
```

Or, initialize your client class with an API v2 token and a domain.

```js
import { ManagementClient } from 'auth0';

var management = new ManagementClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  token: '{YOUR_API_V2_TOKEN}',
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
