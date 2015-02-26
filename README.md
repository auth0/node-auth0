Node.js client library for the [Auth0](https://auth0.com) platform.

## Installation

	npm install auth0

## Usage

Initialize your client class with the credentials in the [settings section](https://app.auth0.com/#/settings) of the dashboard.

~~~js
var Auth0 = require('auth0');

var api = new Auth0({
  domain:       'yourdomain.auth0.com',
  clientID:     'your-client-id',
  clientSecret: 'your-client-secret'
});
~~~

### api.getConnections(callback)

Return a list of all the connections in your application:

~~~js
api.getConnections(function (err, connections){
  //.....
});
~~~

Additionally there is a ```getSocialConnections``` and ```getEnterpriseConnections```.

### api.createConnection(callback)

Let's say one of your customers wants to use its own directory to authenticate to your app. You will have to create a **connection** in Auth0 for this customer and if you want to automate that for N customers, you will want to use the API. Typically, you will ask the customer domain name and depending on the directory you are connecting to, some metadata. Together with other information, like the attributes your app needs, a set of credentials, etc. you can call the API.

~~~js
var myNewConnection =  {
    //a friendly name to identify the connection
    'name': 'thesuperstore-connection',

    //this is the strategy: office365, google-apps, adfs
    'strategy': 'office365', 
    
    'options': {
      // depending on the strategy, you will need a set of credentials to authenticate 
      // your app against the directory (office365 and google apps use this)
      'tenant_domain': 'bigcompany.com or bicompany.onmicrosoft.com'
    };

api.createConnection(myNewConnection, function (err, connection) {
  //.....
});
~~~

Because this example uses Office 365, the returned connection object will have a ```provisioning_ticket_url``` field to which you have to redirect the client in order to complete the authorization process.

### api.getUser(userId, callback)

This method returns a single user, referenced by its ID.

~~~js
api.getUser("long-20-byte-id", function(err, user) {
  // user is a user! error might be an error!
});
~~~

### api.getUserBySearch(searchCriteria, callback)

This method returns an array of users and their full user objects, including metadata. Metadata cannot be searched on as of time of writing (2/26/15).

~~~js
api.getUserBySearch('email: "someuseremail@gmail.com"', function(err, users) {
  // returns an array of user objects if there is no error
});
~~~

### api.getUsers({[connection: connection], [per_page: 10]}, callback)

This method returns a list of users.

If ```connection``` name is passed on the options, it will search the users on the directory of the connection. Suppose it is a **Windows Azure Active Directory** connection it will fetch all the users from the directory. If the connection doesn't have a directory or it is a Social connection like **Google Auth 2** it will return all the users that have logged in to your application at least once.

The amount of items per page is optional (defaults to 100) and it is not supported for all directories, eg: connections using **Google Apps** ignores this argument and uses 100.

~~~js
api.getUsers({connection: 'a-waad-connection'}, function (err, result) {
  //result is an array with the user objects
});
~~~

The callback has the common signature for node.js method [err, result] where result is an array of users with an special hidden property called ```nextPageLink```. These links are safe to be shared since they will work for a short period of time and have an special signature that make them safe. 

Although you can do a simple GET to that link to fetch the next page, you can use the library as well:

~~~js
api.getUsers({connection: 'a-waad-connection'}, function (err, firstPageOfResults) {
  api.getUsers({page: firstPageOfResults.nextPageLink}, function (err, secondPageOfResults) {
  });
});
~~~


### api.getSocialUsers({[per_page: 10]}, callback)

The same than ```getUsers``` but this method returns users for all social connections, ie: not enterprise connections.


### api.impersonateUser(userId, options, callback)

Returns the impersonation link: 

~~~js
api.impersonateUser('github|123', {
  protocol: 'oauth2',
  impersonator_id: 'gonto',
  client_id: 'client',
  additionalParameters: {
    response_type: 'code'
  }
}, function (err, result){
  //.....
});
~~~

Check it on the [API Explorer](https://docs.auth0.com/auth-api#!#post--users--user_id--impersonate);

### api.getAccessToken(callback)

Retrieves an Access Token to make direct HTTP calls to Auth0 API.
```js

api.getAccessToken(function (err, token) {
  if (err) {
    console.log('Error fetching token: ' + err);
    return;
  }

  // Do something with token
  ...
});

```

### api.createUser(userData, callback)
Creates a new user. `userData` is an object that must contain the following mandatory fields:

 * email: User's email
 * password: User's password
 * connection: The name of the connection where to create the user.

Also, custom fields can be added with more information about the user.

```js
var newUser = {
  email:          'john@doe.com',
  password:       'somepass',
  connection:     'mydb',

  /* custom field */
  favoriteColor:  'red'
};
api.createUser(newUser, function (err, userInfo) {
  if (err) {
    console.log('Error creating user: ' + err);
    return;
  }

  console.log('User favorite color: ' + userInfo.favoriteColor);
});
```

### api.updateUserEmail(userId, newEmail, verify, callback)

This method updates the email field of an user identified by `userId`. When `verify` boolean flag is on it sends an email to the affected user to confirm the change.

```js
api.updateUserEmail("my-user-id", "john.new.email@foo.com", false, function (err, result) {
  if (err) {
    console.log('Error updating email: ', + err);
    return;
  }
  console.log(result);
});
```

### api.updateUserPassword(userId, newPassword, verify, callback)

This method updates the user password of an user identified by `userId`. When `verify` boolean flag is on it sends an email to the affected user to confirm the change.

```js
api.updateUserPassword("my-user-id", "johnthisisyournewpassword!shhh", false, function (err, result) {
  if (err) {
    console.log('Error updating password: ', + err);
    return;
  }
  console.log(result);
});
```

> Note: Result is not the password but a string with a success message.

### api.getUserMetadata(userId, callback)

This method retrieves the metadata for a user. `metadata` is an object that includes custom fields for the user referenced by `userId`.

~~~js
api.getUserMetadata("a-user-id", function(err, metadata) {
  // returns error if there was a problem, otherwise the user's metadata
});
~~~

### api.updateUserMetadata(userId, metadata, callback)

This method updates the metadata for a user. `metadata` is an object, and the fields in that object will be set on the user referenced by `userId`. **Note:** the entire `metadata` object is replaced with this method. To update select fields, use the `patchUserMetadata` method.

~~~js
api.updateUserMetadata("a-user-id", {my_special_data: {a: "b", c: "d"}}, function(err) {
  // if there was a problem, err will be non-null
});
~~~

### api.patchUserMetadata(userId, metadata, callback)

This method patches the metadata for a user. `metadata` is an object, and only the fields included in the patch will be updated for the user referenced by `userId`.

~~~js
api.patchUserMetadata("a-user-id", {my_special_data: {a: "e"}}, function(err) {
  // if there was a problem, err will be non-null
});
~~~

### api.deleteUser(userId, callback)

This method removes a user by ID. Be careful!

~~~js
api.deleteUser("i-dont-like-this-guy", function(err) {
  // yep, err will be truthy if there was a problem
});
~~~

### api.getConnection(name, callback)

~~~js
api.getConnection('my-connection', function (err, connection) {
  //.....
});
~~~

### api.getStrategies(callback)

~~~js
api.getStrategies(function (err, strategies) {
  //.....
});
~~~

### api.deleteTenant

~~~js
api.deleteTenant(name, function (err) {
  //.....
});
~~~

### api.createClient

~~~js
api.createClient(client, function (err, newClient) {
  //.....
});
~~~

### api.updateClient

~~~js
api.updateClient(client, function (err) {
  //.....
});
~~~

### api.deleteClient

~~~js
api.deleteClient(clientID, function (err) {
  //.....
});
~~~

### api.getClients

Returns a list of all the tenant's clients.

~~~js
api.getClients(function (err, clients) {
  //.....
});
~~~

### api.getClients

Returns client by clientID.

~~~js
api.getClients(clientID, function (err, client) {
  //.....
});
~~~

### api.getClientsByUserId

Returns a list of all the user's clients.

~~~js
api.getClientsByUserId(userId, function (err, clients) {
  //.....
});
~~~

### api.createRule

Creates a new transformation Rule

~~~js
var rule = {
  name: "A rule",
  status: true,
  script: "function(user, context, done) {}"
};

api.createRule(rule, function (err, rule) {
  //.....
});
~~~

### api.getRule

Returns a specific transformaion rule

~~~js
api.getRule(ruleName, function (err, rule) {
  //.....
});
~~~

### api.deleteRule

Returns a specific transformaion rule

~~~js
api.deleteRule(ruleName, function (err) {
  //.....
});
~~~

### api.updateRule

Updates an existing rule

~~~js
api.updateRule(rule, function (err, rule) {
  //.....
});
~~~

## Auth0

### Auth0.getUserInfo

Gets a profile using an user Access Token. For instance, an user access token is returned  (together with the id token) by the `/ro` end point.

```js

var options = {domain: 'my-domain.auth0.com', userAccessToken: 'XXXXXX'};

Auth0.getUserInfo(options, function (err, profile) {
  if (err) { throw err; }

  // Use user profile here
});
```


## Authentication

This library is useful to consume the rest api of auth0, in order to authenticate users you can use the [passport strategy](https://github.com/auth0/passport-auth0). 

## Complete example

A complete example of using this library [here](http://github.com/auth0/passport-auth0).


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
