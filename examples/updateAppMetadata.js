var token = '{YOUR_API_JSON_WEB_TOKEN}';
var auth0 = require('..')(token);

auth0.user('google-oauth2|1234').appMetadata.update({
  rules: ['writer', 'reader'],
  plan: null
}, function(err, body){
  if (err && !body) {
    return console.error(err);
  }
  console.log('Body', body);
});