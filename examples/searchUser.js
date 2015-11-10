var token = '{YOUR_API_JSON_WEB_TOKEN}';
var domain = '{YOUR_DOMAIN}';

var searchParams = {
  q: 'email:"{YOUR_EMAIL_ADDRESS}"'
}

var auth0 = require('..')({
  token: token,
  domain: domain
});

auth0.users.searchUser(searchParams)
  .then(function(body){
    console.log('Body', body);
  }).catch(function(err){
    console.error(err);
  });
