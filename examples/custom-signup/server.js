var Auth0 = require('auth0');
var dotenv    = require('dotenv');
var express   = require('express');
var extend = require('xtend');
var app       = express();

dotenv.load();

app.use(express.logger());

app.use('/', express.static(__dirname + '/'));

var api = new Auth0({
  domain:       process.env.AUTH0_DOMAIN || 'contoso.auth0.com',
  clientID:     process.env.AUTH0_CLIENT_ID || 'CDxL8sxaPMzl37bcQcVfS0JzdqWXFsmt',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || 'SopWFEkN1du8b82UhYJ6zmAOr-eO7CGbNepAPZSpvfW16e37xbhOO2Kdfi1Sc-Re'
});

var CONNECTION = 'Username-Password-Authentication';

app.configure(function () {
  app.use(express.bodyParser());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
});

app.post('/signup', function (req, res) {
  var data = extend(req.body, {connection: CONNECTION, email_verified: false});

  api.createUser(data, function (err) {
    if (err) {
      console.log('Error creating user: ' + err);
      res.send(500, err);
      return;
    }

    res.send(200, {status: 'ok'});
  });
});

app.listen(3001);
console.log('listening on port http://localhost:3001');
