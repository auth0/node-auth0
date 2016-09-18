var Hapi = require('hapi');
var dotenv = require('dotenv');
var server = new Hapi.Server();

dotenv.load();

server.connection({ port: 8000 });

server.register(require('hapi-auth-jwt'), function (err) {

  if (err) {
    throw err;
  }

  server.auth.strategy('token', 'jwt', {
    key: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    verifyOptions: {
      algorithms: [ 'HS256' ],
      audience: process.env.AUTH0_CLIENT_ID
    }
  });

  server.route({
    method: 'GET',
    path: '/private',
    config: { auth: 'token' },
    handler: function(request, reply) {
      reply({
        message: 'This is a private endpoint - a token is required.',
        credentials: request.auth.credentials
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/public',
    config: { auth: false },
    handler: function(request, reply) {
      reply({
        message: 'This is a public endpoint - no token required.'
      });
    }
  });


  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server started at:', server.info.uri);
  });
});
