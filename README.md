
# node-auth0 [![Coverage Status](https://coveralls.io/repos/sophilabs/node-auth0/badge.svg?branch=v2&service=github)](https://coveralls.io/github/sophilabs/node-auth0?branch=v2) [![Build Status](https://travis-ci.org/sophilabs/node-auth0.svg?branch=v2)](https://travis-ci.org/sophilabs/node-auth0)

Node.js client library for the [Auth0](https://auth0.com) platform.

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

## Clients
[Clients](https://auth0.com/docs/api/v2#!/Clients) represent applications. You can learn more about this in the [Applications](https://auth0.com/docs/applications) section of the documentation.

### Get all clients
~~~js
// Using auth0 instance.
auth0.getClients(function (err, clients) {
  console.log(clients.length);
});


// Using the clients manager directly.
auth0.clients.getAll(function (err, clients) {
  console.log(clients.length);
});
~~~

### Create a client

~~~js
// Using auth0 instance.
auth0.createClient(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Client created.
});


// Using the clients manager directly.
auth0.clients.create(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Client created.
});
~~~

### Get a client

~~~js
// Using auth0 instance.
auth0.getClient({ client_id: CLIENT_ID }, function (err, client) {
  if (err) {
    // Handle error.
  }
  
  console.log(client);
});


// Using the clients manager directly.
auth0.clients.get({ client_id: CLIENT_ID }, function (err, client) {
  if (err) {
    // Handle error.
  }
  
  console.log(client);
});
~~~

### Delete a client

~~~js
// Using auth0 instance.
auth0.deleteClient({ client_id: CLIENT_ID }, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Client deleted.
});


// Using the clients manager directly.
auth0.clients.delete({ client_id: CLIENT_ID }, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Client deleted.
});
~~~

### Update a client

~~~js
var data = { name: 'newClientName' };
var params = { client_id: CLIENT_ID };


// Using auth0 instance.
auth0.updateClient(params, data, function (err, client) {
  if (err) {
    // Handle error.
  }
  
  console.log(client.name);  // 'newClientName'
});


// Using the clients manager directly.
auth0.clients.update(params, data, function (err, client) {
  if (err) {
    // Handle error.
  }
  
  console.log(client.name);  // 'newClientName'
});
~~~

## Connections
[Connections](https://auth0.com/docs/api/v2#!/Connections) represent the relationships between Auth0 and each one of the Identity Providers.

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


## Device Credentials
Managing of [Device Credentials](https://auth0.com/docs/api/v2#!/Device_Credentials/get_device_credentials) with Auth0 SDK.

### List device credentials
~~~js
// Using auth0 instance.
auth0.getDeviceCredentials(function (err, credentials) {
  console.log(credentials.length);
});


// Using the device credentials manager directly.
auth0.deviceCredentials.getAll(function (err, credentials) {
  console.log(credentials.length);
});
~~~

### Create device public key

~~~js
// Using auth0 instance.
auth0.createConnection(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Credential created.
});


// Using the device credentials manager directly.
auth0.deviceCredentials.create(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Credential created.
});
~~~

### Delete a device credential

~~~js
var params = { id: CREDENTIAL_ID };

// Using auth0 instance.
auth0.deleteDeviceCredential(params, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Credential deleted.
});


// Using the credentials manager directly.
auth0.deviceCredentials.delete(params, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Credential deleted.
});
~~~


## Rules
[Rules](https://auth0.com/docs/api/v2#!/Rules) are code snippets written in JavaScript that are executed as part of the authentication pipeline in Auth0. Learn more about them in the [Rules](https://auth0.com/docs/rules) section of the documentation.

### Get all rules
~~~js
// Using auth0 instance.
auth0.getRules(function (err, rules) {
  console.log(rules.length);
});


// Using the rules manager directly.
auth0.rules.getAll(function (err, rules) {
  console.log(rules.length);
});
~~~

### Create a rule

~~~js
// Using auth0 instance.
auth0.createRule(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Rule created.
});


// Using the rules manager directly.
auth0.rules.create(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Rule created.
});
~~~

### Get a rule

~~~js
// Using auth0 instance.
auth0.getRule({ id: RULE_ID }, function (err, rule) {
  if (err) {
    // Handle error.
  }
  
  console.log(rule);
});


// Using the rules manager directly.
auth0.rules.get({ id: RULE_ID }, function (err, rule) {
  if (err) {
    // Handle error.
  }
  
  console.log(rule);
});
~~~

### Delete a rule

~~~js
// Using auth0 instance.
auth0.deleteRule({ id: RULE_ID }, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Rule deleted.
});


// Using the rules manager directly.
auth0.rules.delete({ id: RULE_ID }, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Rule deleted.
});
~~~

### Update a rule

~~~js
var data = { name: 'New name' };
var params = { id: RULE_ID };


// Using auth0 instance.
auth0.updateRule(params, data, function (err, rule) {
  if (err) {
    // Handle error.
  }
  
  console.log(rule.name);  // 'New name'
});


// Using the rules manager directly.
auth0.rules.update(params, data, function (err, rule) {
  if (err) {
    // Handle error.
  }
  
  console.log(rule.name);  // 'New name'
});
~~~

## Users
Performing CRUD operations on the [Users](https://auth0.com/docs/api/v2#!/Users) endpoint.

### List or search users
This method takes an optional object as first argument that may be used to specify pagination settings and the search query.

~~~js
// Pagination settings. 
var params = {
  per_page: 10,
  page: 2
};

// Using auth0 instance.
auth0.getUsers(params, function (err, users) {
  console.log(users.length);
});

// Using the users manager directly.
auth0.users.getAll(function (err, users) {
  console.log(users.length);
});
~~~

### Create a user

~~~js
// Using auth0 instance.
auth0.createUser(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // User created.
});


// Using the users manager directly.
auth0.users.create(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // User created.
});
~~~

### Get a user

~~~js

// Using auth0 instance.
auth0.getUser({ id: USER_ID }, function (err, user) {
  console.log(user);
});

// Using the users manager directly.
auth0.users.get({ id: USER_ID }, function (err, user) {
  console.log(user);
});
~~~



### Delete all users

~~~js
// Using auth0 instance.
auth0.deleteAllUsers(function (err) {
  if (err) {
    // Handle error.
  }
  
  // Users deleted
});


// Using the users manager directly.
auth0.users.deleteAll(function (err) {
  if (err) {
    // Handle error.
  }
  
  // Users deleted
});
~~~

### Delete a user

~~~js
// Using auth0 instance.
auth0.deleteUser({ id: USER_ID }, function (err) {
  if (err) {
    // Handle error.
  }
  
  // User deleted.
});


// Using the users manager directly.
auth0.users.delete({ id: USER_ID }, function (err) {
  if (err) {
    // Handle error.
  }
  
  // User deleted.
});
~~~

### Update a user

~~~js
var params = { id: USER_ID };

// Using auth0 instance.
auth0.updateUser(params, data, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Updated user.
  console.log(user);
});


// Using the users manager directly.
auth0.users.update(params, data, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Updated user.
  console.log(user);
});
~~~

### Update user metadata

~~~js
var params = { id: USER_ID };
var metadata = {
  address: '123th Node.js Street'
};

// Using auth0 instance.
auth0.updateUserMetadata(params, metadata, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Updated user.
  console.log(user);
});

// Using the users manager directly.
auth0.users.updateUserMetadata(params, metadata, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Updated user.
  console.log(user);
});
~~~


### Update app metadata

~~~js
var params = { id: USER_ID };
var metadata = {
  foo: 'bar'
};

// Using auth0 instance.
auth0.updateAppMetadata(params, metadata, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Updated user.
  console.log(user);
});

// Using the users manager directly.
auth0.users.updateAppMetadata(params, metadata, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Updated user.
  console.log(user);
});
~~~

### Link user accounts

~~~js
var params = { id: USER_ID };
var data = {
	user_id: 'OTHER_USER_ID',
	connection_id: 'CONNECTION_ID'
};

// Using auth0 instance.
auth0.linkUsers(params, data, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Users linked.
});

// Using the users manager directly.
auth0.users.link(params, data, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Users linked.
});
~~~

### Unlink user accounts

~~~js
var params = { id: USER_ID, provider: 'auht0', user_id: OTHER_USER_ID };

// Using auth0 instance.
auth0.unlinkUsers(params, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Users accounts unlinked.
});

// Using the users manager directly.
auth0.users.unlink(params, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Users accounts unlinked.
});
~~~


### Delete user multifactor provider

~~~js
var params = { id: USER_ID, provider: MULTIFACTOR_PROVIDER };

// Using auth0 instance.
auth0.deleteUserMultifcator(params, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Users accounts unlinked.
});

// Using the users manager directly.
auth0.users.deleteMultifactorProvider(params, function (err, user) {
  if (err) {
    // Handle error.
  }
  
  // Users accounts unlinked.
});
~~~



## Blacklisted Tokens
Managing [Blacklisted tokens](https://auth0.com/docs/api/v2#!/Blacklists) with the SDK.

### Get all blacklisted tokens
~~~js
// Using auth0 instance.
auth0.getBlacklistedTokens(function (err, tokens) {
  console.log(tokens.length);
});


// Using the blacklisted tokens manager directly.
auth0.blacklistedTokens.getAll(function (err, tokens) {
  console.log(tokens.length);
});
~~~

### Blacklist a token

~~~js
var token = {
 aud: 'aud',
 jti: 'jti'
};

// Using auth0 instance.
auth0.blacklistToken(token, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Token blacklisted.
});


// Using the blacklisted tokens manager directly.
auth0.blacklistedTokens.add(token, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Token blacklisted.
});
~~~

## Email Provider
Configuring the [Email Provider](https://auth0.com/docs/api/v2#!/Emails).

### Get the email provider
~~~js
// Using auth0 instance.
auth0.getEmailProvider(function (err, provider) {
  console.log(provider.length);
});


// Using the email provider manager directly.
auth0.emailProvider.get(function (err, provider) {
  console.log(provider);
});
~~~

### Configure the email provider

~~~js
// Using auth0 instance.
auth0.configureEmailProvider(data, function (err) {
  if (err) {
    // Handle error.
  }

  // Email provider configured.
});


// Using the email provider manager directly.
auth0.emailProvider.configure(data, function (err) {
  if (err) {
    // Handle error.
  }
  
  // Email provider configured.
});
~~~

### Delete the email provider

~~~js
// Using auth0 instance.
auth0.deleteEmailProvider(function (err) {
  if (err) {
    // Handle error.
  }
  
  // Email provider deleted.
});


// Using the email provider manager directly.
auth0.emailProvider.delete(function (err) {
  if (err) {
    // Handle error.
  }
  
  // Email provider configured.
});
~~~

### Update the email provider

~~~js
// Using auth0 instance.
auth0.updateEmailProvider(data, function (err, provider) {
  if (err) {
    // Handle error.
  }
  
  // Updated email provider.
  console.log(provider);
});


// Using the email provider manager directly.
auth0.emailProvider.update(function (err, provider) {
  if (err) {
    // Handle error.
  }
  
  // Updated email provider.
  console.log(provider);
});
~~~

# Authentication API Client

This client can be used to access Auth0's [Authentication API](https://auth0.com/docs/auth-api).

## Usage

Initialize your client class with an API v2 token (you can generate one [here](https://auth0.com/docs/apiv2)) and a domain. The **AuthenticationClient** constructor takes an *optional* client ID, if specified it will be used as default value for all endpoints that accept a client ID.

~~~js
var AuthenticationClient = require('auth0'). AuthenticationClient;
var auth0 = new AuthenticationClient({
  domain: '{YOUR_ACCOUNT}.auth0.com',
  clientId: '{OPTIONAL_CLIENT_ID}'
});
~~~

## Database & Active Directory

### Sign in
Given the user credentials and the connection specified, it will do the authentication on the provider and return a JSON with the `access_token` and `id_token`. Find more information about the structure of the data object in the [API docs](https://auth0.com/docs/auth-api#!#post--oauth-ro).

~~~js
var data = {
  username: '{USERNAME}',
  password: '{PASSWORD}',
  connection: 'Username-Password-Authentication' // Optional field.
};

auth0.database.signIn(data, function (err, userData) {
  if (err) {
    // Handle error.
  }
  
  console.log(userData);
});
~~~

### Sign up
Given the user credentials, the connection specified and (optionally) the client ID, it will create a new user. Find more information in the [API Docs](https://auth0.com/docs/auth-api#!#post--dbconnections-signup).

~~~js
var data = {
  username: '{USERNAME}',
  password: '{PASSWORD}',
  connection: 'Username-Password-Authentication' // Optional field.
};

auth0.database.signUp(data, function (err, userData) {
  if (err) {
    // Handle error.
  }
  
  console.log(userData);
});
~~~

### Change password
Given the user email, the connection specified and the new password to use, Auth0 will send a forgot password email. Once the user clicks on the confirm password change link, the new password specified in this POST will be set to this user. Find more information in the [API Docs](https://auth0.com/docs/auth-api#!#post--dbconnections-change_password).

~~~js
var data = {
  email: '{EMAIL}',
  password: '{PASSWORD}',
  connection: 'Username-Password-Authentication'
};

auth0.database.changePassword(data, function (err, message) {
  if (err) {
    // Handle error.
  }
  
  console.log(message);
});
~~~

## Passwordless

### Send email
Given the user `email` address, it will send an email with:

- A link (default, `send:"link"`). You can then authenticate with this user opening the link and he will be automatically logged in to the application. Optionally, you can append/override parameters to the link (like `scope`, `redirect_uri`, `protocol`, `response_type`, etc.) using `authParams` object.
- A verification code (`send:"code"`). You can then authenticate with this user using the `/oauth/ro` endpoint specifying `email` as `username` and `code` as `password`.

Find more information in the [API Docs](https://auth0.com/docs/auth-api#!#post--with_email).

~~~js

var data = {
  email: '{EMAIL}',
  send: 'link',
  authParams: {} // Optional auth params.
};

auth0.passwordless.sendEmail(data, function (err) {
  if (err) {
    // Handle error.
  }
});
~~~

### Send SMS
Given the user `phone_number`, it will send a SMS message with a verification code. You can then authenticate with this user using the `/oauth/ro` endpoint specifying `phone_number` as `username` and `code` as `password`:

~~~js

var data = {
  phone_number: '{PHONE}'
};

auth0.passwordless.sendSMS(data, function (err) {
  if (err) {
    // Handle error.
  }
});
~~~

### Login
Given the user credentials (`phone_number` and `code`), it will do the authentication on the provider and return a JSON with the `access_token` and `id_token`.

~~~js
var data = {
  username: '{PHONE_NUMBER}',
  password: '{VERIFICATION_CODE}'
};

auth0.passwordless.signIn(data, function (err) {
  if (err) {
    // Handle error.
  }
});
~~~

The user data object has the following structure.

~~~js
{
  id_token: String,
  access_token: String,
  token_type: String
}
~~~

## Users

### User info
Get the user information based on the Auth0 access token (obtained during login). Find more information in the [API Docs](https://auth0.com/docs/auth-api#!#get--userinfo).

~~~js
auth0.users.getInfo(accessToken, function (err, userInfo) {
  if (err) {
    // Handle error.
  }
  
  console.log(userInfo);
});
~~~

### Impersonation
Gets a link that can be used once to log in as a specific user. Useful for troubleshooting. Find more information in the [API Docs](https://auth0.com/docs/auth-api#!#post--users--user_id--impersonate).

~~~js
var settings = {
  impersonator_id: '{IMPERSONATOR_ID}',
  protocol: 'oauth2',
  additionalParameters: {}  // Optional aditional params.
};

auth0.users.impersonate(userId, settings, function (err, link) {
  if (err) {
    // Handle error.
  }
  
  console.log(link);
});
~~~

## Tokens

### Token info
Validates a JSON Web Token (signature and expiration) and returns the user information associated with the user id (sub property) of the token. Find more information in the [API Docs](https://auth0.com/docs/auth-api#!#post--tokeninfo).

~~~js
auth0.tokens.getInfo(token, function (err, tokenInfo) {
  if (err) {
    // Handle error.
  }
  
  console.log(tokenInfo);
});
~~~

### Delegation Token
Given an existing token, this endpoint will generate a new token signed with the target client secret. This is used to flow the identity of the user from the application to an API or across different APIs that are protected with different secrets. Find more information in the [API Docs](https://auth0.com/docs/auth-api#!#post--delegation).

~~~js
var data = {
  id_token: '{ID_TOKEN}',
  api_type: 'app',
  target: '{TARGET}',
  grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer'
};

auth0.tokens.getDelegationToken(data, function (err, token) {
  if (err) {
    // Handle error.
  }
  
  console.log(token);
});
~~~

# Promises and Callbacks

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
