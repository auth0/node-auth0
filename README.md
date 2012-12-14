Node.js client library for the Auth0 platform.

## Instalation

	npm install auth0

## Usage

~~~js
var Auth0 = require('auth0');

var client = new Auth0({
  clientID:     'your-client-id',
  clientSecret: 'your-client-secret'
});
~~~

### client.getConnections(callback)

~~~js
client.getConnections(function (err, connections){
  //.....
});
~~~

### client.createConnection(callback)

~~~js
var myNewConnection =  {
    "name": "a-new-connection",
    "strategy": "google-oauth2",
    "client_id": "aaa",
    "options": {
      "client_secret": "aadsadsadsa",
      "sites": true,
      "spreadsheets": true,
      "url_shortener": true,
      "webmaster_tools": true
    }
  };

client.createConnection(myNewConnection, function (err) {
  //.....
});
~~~

### client.getUsers({[connection: connection], [limit: limit], [skip: skip]}, callback)

This method returns a list of users. It supports pagination and also you can filter by connection name.

Example return the first 50 users from all connections.

~~~js
client.getUsers({limit: 50, skip:0}, function (err, result) {
  //result.users is an array with the user objects
  //result.total total amount of users that this query can return
});
~~~


### client.getConnection(name, callback)

~~~js
client.getConnection('my-connection', function (err, connection){
  //.....
});
~~~


### connection.getUsers (callback)

The skip and limit parameters are optional.

~~~js
client.getConnection('my-connection', function (err, connection){
  connection.getUsers([{skip: x, limit: y}], function (err, users) {
    //....
  });
});
~~~