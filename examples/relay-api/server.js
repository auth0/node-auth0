var express       = require('express');
var graphqlHttp   = require('express-graphql');
var schema        = require('./schema/schema');
var jwt           = require('express-jwt');
var dotenv        = require('dotenv');

// The server is just a simple Express app
var app = express()

dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

// We respond to all GraphQL requests from `/graphql` using the
// `express-graphql` middleware, which we pass our schema to.
app.use('/graphql', authenticate, graphqlHttp({schema: schema}));

// The rest of the routes are just for serving static files
app.use('/relay', express.static('./node_modules/react-relay/dist'));
app.use('/', express.static('./public'))

app.listen(3000, function() { console.log('Listening on 3000...') });