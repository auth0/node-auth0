var token = '{YOUR_API_JSON_WEB_TOKEN}';
var auth0 = require('..')({ token: token });

auth0.users.updateAppMetadata('google-oauth2|1234', {
  rules: ['writer', 'reader'],
  plan: null
}).then(function(body){
  console.log('Body', body);
}).catch(function(err){
  console.error(err);
});