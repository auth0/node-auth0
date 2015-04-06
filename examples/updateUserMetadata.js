var token = '{YOUR_API_JSON_WEB_TOKEN}';
var auth0 = require('..')(token);

auth0.user('google-oauth2|1234').userMetadata.update({
  hobby: 'surf',
  theme: 'green'
}, function(err, body){
  if (err && !body) {
    return console.error(err);
  }
  console.log('Body', body);
});