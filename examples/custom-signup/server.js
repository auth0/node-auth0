var Auth0 = require('auth0').ManagementClient;
var dotenv    = require('dotenv');
var express   = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var extend = require('xtend');
var app       = express();

dotenv.load();

app.use(logger('combined'));

app.use('/', express.static(__dirname + '/'));

var api = new Auth0({
  domain:    process.env.AUTH0_DOMAIN,
  token:     process.env.AUTH0_TOKEN
});

var CONNECTION = 'Username-Password-Authentication';

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/signup', function (req, res) {
  var data = extend(req.body, {connection: CONNECTION, email_verified: false});
  api.createUser(data, function (err) {
    if (err) {
      console.log('Error creating user: ' + err);
      res.status(500).send(err);
      return;
    }

    res.status(200).send({status: 'ok'});
  });
});

app.listen(3001);
console.log('listening on port http://localhost:3001');
