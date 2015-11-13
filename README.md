

# node-auth0 [![Coverage Status](https://coveralls.io/repos/sophilabs/node-auth0/badge.svg?branch=v2&service=github)](https://coveralls.io/github/sophilabs/node-auth0?branch=v2) [![Build Status](https://travis-ci.org/sophilabs/node-auth0.svg?branch=v2)](https://travis-ci.org/sophilabs/node-auth0)

Node.js client library for the [Auth0](https://auth0.com) platform.

## Installation

	npm install auth0@2.0.0-alpha.5

## Usage

Initialize your client class with an API v2 token (you can generate one [here](https://auth0.com/docs/apiv2)).

~~~js
var token = '{YOUR_API_V2_TOKEN}';
var auth0 = require('auth0')({
  token: token
});
~~~

By default the code assumes your account is running in the US West region. If you are running in Europe you can specify:

~~~js
var token = '{YOUR_API_V2_TOKEN}';
var auth0 = require('auth0')({
  token: token,
  region: 'eu'
});
~~~

Alternatively you can just set the domain:

~~~js
var token = '{YOUR_API_V2_TOKEN}';
var auth0 = require('auth0')({
  token: token,
  domain: 'login.eu.auth0.com'
});
~~~

## Promises and Callbacks
Be aware that all methods can be used with Promises or callbacks. However, when a callback is provided, no Promise will be returned.

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


## Connections
[Connections](https://auth0.com/docs/api/v2#!/Connections/get_connections) represent the relationships between Auth0 and each one of the Identity Providers.

### Get all connections
~~~js
// Using auth0 instance.
auth0.getConnections(function (err, connections) {
  console.log(connections.length);
});


// Using the connections manager directly.
auth0.connections.getAll(function (err, connections) {
  console.log(connections.length);
});
~~~

### Create a connection

~~~js
// Using auth0 instance.
auth0.createConnection(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Conection created.
});


// Using the connections manager directly.
auth0.connections.create(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Conection created.
});
~~~

### Get a connection

~~~js
// Using auth0 instance.
auth0.getConnection({ id: CONNECTION_ID }, function (err, connection) {
  if (err) {
    // Handle error.
  }
  
  console.log(connection);
});


// Using the connections manager directly.
auth0.connections.get({ id: CONNECTION_ID }, function (err, connection) {
  if (err) {
    // Handle error.
  }
  
  console.log(connection);
});
~~~

### Delete a connection

~~~js
// Using auth0 instance.
auth0.deleteConnection({ id: CONNECTION_ID }, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Conection deleted.
});


// Using the connections manager directly.
auth0.connections.delete({ id: CONNECTION_ID }, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Conection deleted.
});
~~~

### Update a connection

~~~js
var data = { name: 'newConnectionName' };
var params = { id: CONNECTION_ID };


// Using auth0 instance.
auth0.updateConnection(params, data, function (err, connection) {
  if (err) {
    // Handle error.
  }
  
  console.log(connection.name);  // 'newConnectionName'
});


// Using the connections manager directly.
auth0.connections.update(params, data, function (err, connection) {
  if (err) {
    // Handle error.
  }
  
  console.log(connection.name);  // 'newConnectionName'
});
~~~


## Authentication

This library can be used to access Auth0's [API v2](https://auth0.com/docs/apiv2). To authenticate users use the [passport strategy](https://github.com/auth0/passport-auth0).

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
