[![Coverage Status](https://coveralls.io/repos/github/auth0/node-auth0/badge.svg?branch=master)](https://coveralls.io/github/auth0/node-auth0?branch=master) [![Build Status](https://travis-ci.org/auth0/node-auth0.svg)](https://travis-ci.org/auth0/node-auth0)

Node.js client library for the [Auth0](https://auth0.com) platform.

# Installation

~~~
  npm install auth0
~~~

## Documentation
For more information on how to use this library you must build the docs. You can do so by running: `npm run docs-build`.

The *docs-build* script will generate all the documentation in HTML format under the `docs` folder. Open `docs/index.html` in any web browser to see the documentation.

## Management API Client
The Auth0 Management API is meant to be used by back-end servers or trusted parties performing administrative tasks. Generally speaking, anything that can be done through the Auth0 dashboard (and more) can also be done through this API.


Initialize your client class with an API v2 token (you can generate one [here](https://auth0.com/docs/apiv2)) and a domain.

~~~js
var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
  token: '{YOUR_API_V2_TOKEN}',
  domain: '{YOUR_ACCOUNT}.auth0.com'
});
~~~

Note: When using at browser you should use `telemetry: false`.

## Authentication API Client
This client must be used to access Auth0's [Authentication API](https://auth0.com/docs/auth-api).

The **AuthenticationClient** constructor takes an *optional* client ID, if specified it will be used as default value for all endpoints that accept a client ID.

~~~js
var AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
  domain: '{YOUR_ACCOUNT}.auth0.com',
  clientId: '{OPTIONAL_CLIENT_ID}'
});
~~~

## Promises and callbacks

Be aware that all methods can be used with promises or callbacks. However, when a callback is provided no promise will be returned.

~~~js
// Using callbacks.
auth0.getUsers(function (err, users) {
  if (err) {
    // handle error.
  }
  console.log(users);
});


// Using promises.
auth0
  .getUsers()
  .then(function (users) {
    console.log(users);
  })
  .catch(function (err) {
    // Handle error.
  });
~~~


## Examples

Check out the [examples](examples/) folder.

## Documentation

For more information about [auth0](http://auth0.com) contact our [documentation page](http://docs.auth0.com/).

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click "Try Auth0 for Free".
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
