# node-auth0

[![Build Status][circleci-image]][circleci-url]
[![NPM version][npm-image]][npm-url]
[![Coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauth0%2Fnode-auth0.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauth0%2Fnode-auth0?ref=badge_shield)

Node.js client library for the [Auth0](https://auth0.com) platform.

## Installation

```bash
npm install auth0
```

## Documentation

You can find this library documentation in this [page](https://auth0.github.io/node-auth0/).

For more information about [auth0](https://auth0.com) check our [documentation page](https://auth0.com/docs).

## Node version support

This SDK is tested on the latest Node versions 8, 10, 12 and 14.

## Authentication API Client

This client must be used to access Auth0's [Authentication API](https://auth0.com/docs/api/authentication).

The **AuthenticationClient** constructor takes an _optional_ client ID, if specified it will be used as default value for all endpoints that accept a client ID.

```js
var AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
  domain: '{YOUR_ACCOUNT}.auth0.com',
  clientId: '{OPTIONAL_CLIENT_ID}',
});
```

## Management API Client

The Auth0 Management API is meant to be used by back-end servers or trusted parties performing administrative tasks. Generally speaking, anything that can be done through the Auth0 dashboard (and more) can also be done through this API.

Initialize your client class with an API v2 token and a domain.

```js
var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
  token: '{YOUR_API_V2_TOKEN}',
  domain: '{YOUR_ACCOUNT}.auth0.com',
});
```

> Note: When using at browser you should use `telemetry: false`.

To obtain **automatically** a Management API token via the ManagementClient, you can specify the parameters `clientId`, `clientSecret` (use a Non Interactive Client) and optionally `scope`.
Behind the scenes the Client Credentials Grant is used to obtain the `access_token` and is by default cached for the duration of the returned `expires_in` value.

```js
var ManagementClient = require('auth0').ManagementClient;
var auth0 = new ManagementClient({
  domain: '{YOUR_ACCOUNT}.auth0.com',
  clientId: '{YOUR_NON_INTERACTIVE_CLIENT_ID}',
  clientSecret: '{YOUR_NON_INTERACTIVE_CLIENT_SECRET}',
  scope: 'read:users update:users',
});
```

> Make sure your ClientId is allowed to request tokens from Management API in [Auth0 Dashboard](https://manage.auth0.com/#/apis)

To obtain a Management API token from your node backend, you can use Client Credentials Grant using your registered Auth0 Non Interactive Clients

```js
var AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
  domain: '{YOUR_ACCOUNT}.auth0.com',
  clientId: '{CLIENT_ID}',
  clientSecret: '{CLIENT_SECRET}',
});

auth0.clientCredentialsGrant(
  {
    audience: 'https://{YOUR_ACCOUNT}.auth0.com/api/v2/',
    scope: '{MANAGEMENT_API_SCOPES}',
  },
  function (err, response) {
    if (err) {
      // Handle error.
    }
    console.log(response.access_token);
  }
);
```

Also you can request a token when the user authenticates using any of our client side SDKs, e.g. [auth0.js](https://github.com/auth0/auth0.js).

## Promises and callbacks

Be aware that all methods can be used with promises or callbacks. However, when a callback is provided no promise will be returned.

```js
// Using callbacks.
management.getUsers(function (err, users) {
  if (err) {
    // handle error.
  }
  console.log(users);
});

// Using promises.
management
  .getUsers()
  .then(function (users) {
    console.log(users);
  })
  .catch(function (err) {
    // Handle error.
  });
```

## Typescript

The types for this library are currently maintained by the community at [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/auth0). The team is planning taking ownership of this library as discussed in https://github.com/auth0/node-auth0/issues/572. After the team has taken ownership we will remove this net from the Readme.

## Troubleshooting

### Getting `Error: Can't resolve 'superagent-proxy'` when bundling with Webpack

We have a dependency on `rest-facade` which `require`s but doesn't include `superagent-proxy`. This SDK doesn't support proxies, so this dependency is not required. To workaround this you can add the following to your `webpack.config.js`:

```
resolve: {
  alias: {
    'superagent-proxy': false
  }
}
```

Or install `superagent-proxy` yourself.


## What is Auth0?

Auth0 helps you to:

- Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
- Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
- Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
- Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
- Analytics of how, when and where users are logging in.
- Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 Account

1.  Go to [Auth0](https://auth0.com) and click "Try Auth0 for Free".
2.  Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

<!-- Vaaaaarrrrsss -->

[npm-image]: https://img.shields.io/npm/v/auth0.svg?style=flat-square
[npm-url]: https://npmjs.org/package/auth0
[circleci-image]: https://img.shields.io/circleci/project/github/auth0/node-auth0.svg?branch=master&style=flat-square
[circleci-url]: https://circleci.com/gh/auth0/node-auth0
[codecov-image]: https://img.shields.io/codecov/c/github/auth0/node-auth0.svg?style=flat-square
[codecov-url]: https://codecov.io/github/auth0/node-auth0?branch=master
[license-image]: https://img.shields.io/npm/l/auth0.svg?style=flat-square
[license-url]: #license
[downloads-image]: https://img.shields.io/npm/dm/auth0.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/auth0

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauth0%2Fnode-auth0.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauth0%2Fnode-auth0?ref=badge_large)
