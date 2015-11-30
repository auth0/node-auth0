var token = '{YOUR_API_JSON_WEB_TOKEN}';
var auth0 = require('..')({ token: token });

var metadata = {
  hobby: 'surf',
  theme: 'green'
};

auth0
  .users
  .updateUserMetadata({ id: 'google-oauth2|1234' }, metadata)
  .then(function(body){
    console.log('Body', body);
  })
  .catch(function(err){
    console.error(err);
  });
