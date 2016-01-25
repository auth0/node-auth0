[![Coverage Status](https://coveralls.io/repos/sophilabs/node-auth0/badge.svg?branch=v2&service=github)](https://coveralls.io/github/sophilabs/node-auth0?branch=v2) [![Build Status](https://travis-ci.org/sophilabs/node-auth0.svg?branch=v2)](https://travis-ci.org/sophilabs/node-auth0)

Node.js client library for the [Auth0](https://auth0.com) platform.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
##Table of Contents

- [Installation](#installation)
- [Management API Client](#management-api-client)
  - [Usage](#usage)
  - [Clients](#clients)
    - [Get all clients](#get-all-clients)
    - [Create a client](#create-a-client)
    - [Get a client](#get-a-client)
    - [Delete a client](#delete-a-client)
    - [Update a client](#update-a-client)
  - [Connections](#connections)
    - [Get all connections](#get-all-connections)
    - [Create a connection](#create-a-connection)
    - [Get a connection](#get-a-connection)
    - [Delete a connection](#delete-a-connection)
    - [Update a connection](#update-a-connection)
  - [Device Credentials](#device-credentials)
    - [List device credentials](#list-device-credentials)
    - [Create device public key](#create-device-public-key)
    - [Delete a device credential](#delete-a-device-credential)
  - [Rules](#rules)
    - [Get all rules](#get-all-rules)
    - [Create a rule](#create-a-rule)
    - [Get a rule](#get-a-rule)
    - [Delete a rule](#delete-a-rule)
    - [Update a rule](#update-a-rule)
  - [Users](#users)
    - [List or search users](#list-or-search-users)
    - [Create a user](#create-a-user)
    - [Get a user](#get-a-user)
    - [Delete all users](#delete-all-users)
    - [Delete a user](#delete-a-user)
    - [Update a user](#update-a-user)
    - [Update user metadata](#update-user-metadata)
    - [Update app metadata](#update-app-metadata)
    - [Link user accounts](#link-user-accounts)
    - [Unlink user accounts](#unlink-user-accounts)
    - [Delete user multifactor provider](#delete-user-multifactor-provider)
  - [Blacklisted Tokens](#blacklisted-tokens)
    - [Get all blacklisted tokens](#get-all-blacklisted-tokens)
    - [Blacklist a token](#blacklist-a-token)
  - [Email Provider](#email-provider)
    - [Get the email provider](#get-the-email-provider)
    - [Configure the email provider](#configure-the-email-provider)
    - [Delete the email provider](#delete-the-email-provider)
    - [Update the email provider](#update-the-email-provider)
- [Authentication API Client](#authentication-api-client)
  - [Usage](#usage-1)
  - [Database & Active Directory](#database-&-active-directory)
    - [Sign in](#sign-in)
    - [Sign up](#sign-up)
    - [Change password](#change-password)
  - [Passwordless](#passwordless)
    - [Send email](#send-email)
    - [Send SMS](#send-sms)
    - [Login](#login)
  - [Users](#users-1)
    - [User info](#user-info)
    - [Impersonation](#impersonation)
  - [Tokens](#tokens)
    - [Token info](#token-info)
    - [Delegation Token](#delegation-token)
- [General](#general)
  - [Promises and Callbacks](#promises-and-callbacks)
  - [Examples](#examples)
  - [Documentation](#documentation)
  - [What is Auth0?](#what-is-auth0)
  - [Create a free Auth0 Account](#create-a-free-auth0-account)
  - [Issue Reporting](#issue-reporting)
  - [Author](#author)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

	npm install auth0@2.0.0-alpha.5

# Management API Client
The Auth0 Management API is meant to be used by back-end servers or trusted parties performing administrative tasks. Generally speaking, anything that can be done through the Auth0 dashboard (and more) can also be done through this API.

## Usage

Initialize your client class with an API v2 token (you can generate one [here](https://auth0.com/docs/apiv2)) and a domain.

~~~js
var ManagementClient = require('auth0').ManagementClient;
var auth0 = new ManagementClient({
  token: '{YOUR_API_V2_TOKEN}',
  domain: '{YOUR_ACCOUNT}.auth0.com'
});
~~~

# Authentication API Client

This client can be used to access Auth0's [Authentication API](https://auth0.com/docs/auth-api).

## Usage

The **AuthenticationClient** constructor takes an *optional* client ID, if specified it will be used as default value for all endpoints that accept a client ID.

~~~js
var AuthenticationClient = require('auth0'). AuthenticationClient;
var auth0 = new AuthenticationClient({
  domain: '{YOUR_ACCOUNT}.auth0.com',
  clientId: '{OPTIONAL_CLIENT_ID}'
});
~~~

# General

## Promises and Callbacks

Be aware that all methods can be used with Promises or callbacks. However, when a callback is provided no Promise will be returned.

~~~js
// Using callbacks.
auth0.getUsers(function (err, users) {
  if (err) {
    // Handle error.
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

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
