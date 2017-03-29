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

## When to use auth0/node-auth0

auth0/node-auth0 is intended to be used from node.js typically running on a server application.

If you need a client-side Javascript library, see:
* [auth0/lock](https://github.com/auth0/lock) for quick and simple authentication
* [auth0/auth0.js](https://github.com/auth0/auth0.js) for authentication and [JWT](http://openid.net/specs/draft-jones-json-web-token-07.html) handling
* [auth0/jwt-decode](https://github.com/auth0/jwt-decode) for simple JWT decoding 

If you are using a client-side Javscript framework, see:
* [auth0/angular-jwt](https://github.com/auth0/angular-jwt) for using JWTs with [AngularJS](https://angularjs.org/) framework
* [auth0-angular2-jwt](https://github.com/auth0/angular2-jwt) for use with the [AngularJS](https://angularjs.org/) framework
* [auth0/auth0-angular2](https://github.com/auth0/auth0-angular2) for use with the [Angular 2](https://angular.io/)
* [auth0-ember-simple-auth](https://github.com/auth0/auth0-ember-simple-auth) for use with [Ember's Simple Auth](https://github.com/simplabs/ember-simple-auth) library
* [auth0/auth0-jquery](https://github.com/auth0/auth0-jquery) for examples using the [jQuery](https://jquery.com/) library
* [auth0/meteor-auth0](https://github.com/auth0/meteor-auth0) for use with the [Meteor](https://www.meteor.com/) framework
* [auth0/meteor-accounts-auth0](https://github.com/auth0/meteor-accounts-auth0) for use with Meteor Auth
* [auth0/auth0-react](https://github.com/auth0/auth0-react) for use with the [React](https://facebook.github.io/react/) library

For other server side libraries, see:
* [auth0/passport-auth0](https://github.com/auth0/passport-auth0) for using Auth0 with the [Passport](http://passportjs.org/) middle ware for node.js
* [auth0/socketio-jwt](https://github.com/auth0/socketio-jwt) for authenticating node.js socket.io connections with JWTs
* Other langages such as [Java](auth0/auth0-java), [.NET](https://github.com/auth0/auth0.net), [PHP](https://github.com/auth0/auth0-PHP), [Ruby](https://github.com/auth0/ruby-auth0), [PHP](https://github.com/auth0/auth0-PHP)

## Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click "Try Auth0 for Free".
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
