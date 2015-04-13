# node-auth0 ![build status](https://travis-ci.org/auth0/node-auth0.svg?branch=v2)

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

### User's metadata
You can store data about a user that does not come from the user's identity provider. This is known as "metadata". There are two types of metadata: `user_metadata` and `app_metadata`. You can find out more [here](https://auth0.com/docs/apiv2Changes#8).

#### app_metadata
To update the value of a property or create it if it does not exist:
~~~js
var user_id = '...'
auth0.users.updateAppMetadata(user_id, {
  roles: ['reader']
}).then(function(user){
  // assert.equal(user.app_metadata.roles.length, 1);
  // assert.equal(user.app_metadata.roles[0], 'reader');
}).catch(function(err){
  // handle error if any
});
~~~

To delete a property:
~~~js
var user_id = '...'
auth0.users.updateAppMetadata(user_id, {
  roles: null
}, function(err, user){
  // assert.equal(typeof user.app_metadata.roles, 'undefined');
});
~~~

>Note that you can use either callbacks or promises.

#### user_metadata
To update the value of a property or create it if it does not exist:
~~~js
var user_id = '...'
auth0.users.updateUserMetadata(user_id,{
  hobby: 'surf'
}).then(function(user){
  // assert.equal(user.user_metadata.hobby, 'surf');
}).catch(function(err){
  // handle error if any
});
~~~

To delete a property:
~~~js
var user_id = '...'
auth0.users.updateUserMetadata(user_id,{
  hobby: null
}, function(err, user){
  // assert.equal(typeof user.user_metadata.hobby, 'undefined');
});
~~~

>Note that you can use either callbacks or promises.

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
