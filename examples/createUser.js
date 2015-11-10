var token = '{YOUR_API_JSON_WEB_TOKEN}';
var domain = '{YOUR_DOMAIN}';
var connection = '{YOUR_CONNECTION}';

var userData = {
  email: '{YOUR_EMAIL}',
  password: '{YOUR_PASSWORD}',
  user_metadata: {
    color: 'green'
  }
}

var auth0 = require('..')({
  token: token,
  domain: domain,
  connection: connection
});

auth0.users.createUser(userData)
  .then(function(body){
    console.log('Body', body);
  }).catch(function(err){
    console.error(err);
  });
