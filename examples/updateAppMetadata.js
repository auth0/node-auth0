var token = '{YOUR_API_JSON_WEB_TOKEN}';
var auth0 = require('..')({ token: token });

var metadata = {
  rules: ['writer', 'reader'],
  plan: null
};

auth0
  .users
  .updateAppMetadata({ id: 'google-oauth2|1234' }, metadata)
  .then(function(body){
    console.log('Body', body);
  })
  .catch(function(err){
    console.error(err);
  });
