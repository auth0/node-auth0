var token = '{YOUR_API_JSON_WEB_TOKEN}';
var auth0 = require('..')({ token: token });

auth0.user('google-oauth2|1234').userMetadata.update({
  hobby: 'surf',
  theme: 'green'
}).then(function(body){
  console.log('Body', body);
}).catch(function(err){
  console.error(err);
});