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

### getConnections(callback)

~~~js
client.getConnections(function (err, connections){
  //.....
});
~~~

### createConnection(callback)

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

### getConnection(name, callback)

~~~js
client.getConnection('my-connection', function (err, connection){
  //.....
});
~~~


### connection.getUsers (callback)

~~~js
client.getConnection('my-connection', function (err, connection){
  connection.getUsers(function (err, users) {
    //....
  });
});
~~~