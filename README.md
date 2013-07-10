Node.js client library for the Auth0 platform.

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


## Authentication

This library is useful to consume the rest api of auth0, in order to authenticate users you can use the [passport strategy](https://github.com/qraftlabs/passport-auth0). 

## Complete example

A complete example of using this library [here](http://github.com/auth0/passport-auth0).


## Documentation

For more information about [auth0](http://auth0..com) contact our [documentation page](http://docs.auth0.com/).

## License

This client library is MIT licensed.
