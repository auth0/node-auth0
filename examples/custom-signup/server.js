var Auth0 = require('auth0');
var dotenv    = require('dotenv');
var express   = require('express');
var extend = require('xtend');
var app       = express();

dotenv.load();

app.use(express.logger());

app.use('/', express.static(__dirname + '/'));

var api = new Auth0({
  domain:       process.env.AUTH0_DOMAIN,
  clientID:     process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET
});

var CONNECTION = 'Username-Password-Authentication';

app.use(express.bodyParser());

app.use('/signup', function (req, res) {
  var data = extend(req.body, {connection: CONNECTION, email_verified: false});

  api.createUser(data, function (err) {
    if (err) {
      console.log('Error creating user: ' + err);
      res.send(500, err);
      return;
    }

    res.send(200, {status: 'ok'});
    return;
  });
});

app.listen(1337);
console.log('listening on port http://localhost:1337');
