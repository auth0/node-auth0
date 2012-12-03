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
strategy.getConnections(function (err, connections){
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
      "email": true,
      "profile": true,
      "contacts": false,
      "blogger": false,
      "calendar": false,
      "gmail": false,
      "google_plus": false,
      "orkut": false,
      "picasa_web": false,
      "tasks": false,
      "youtube": false,
      "adsense_management": false,
      "google_affiliate_network": false,
      "analytics": false,
      "google_books": false,
      "google_cloud_storage": false,
      "content_api_for_shopping": false,
      "chrome_web_store": false,
      "document_list": false,
      "google_drive": false,
      "google_drive_files": false,
      "latitude_best": false,
      "latitude_city": false,
      "moderator": false,
      "sites": false,
      "spreadsheets": false,
      "url_shortener": false,
      "webmaster_tools": false
    },
    "status": 0
  };

strategy.createConnection(myNewConnection, function (err) {
  //.....
});
~~~

### getConnection(id, callback)

~~~js
strategy.getConnection(function (err, connection){
  //.....
});
~~~