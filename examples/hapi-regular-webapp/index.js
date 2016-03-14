'use strict';

require('dotenv-safe').load();
const Hapi = require('hapi');
const server = new Hapi.Server({ debug: { request: ['error'] } });
const Cookie = require('hapi-auth-cookie');
const Bell = require('bell');

server.connection({
    port: process.env.PORT
});

server.register(Cookie, (err) => {
    if (err) { throw err; }
    server.auth.strategy('session', 'cookie', {
        password: process.env.SESSION_COOKIE_PASSWORD,
        cookie: 'sid-auth0-sample',
        isSecure: process.env.NODE_ENV === 'production',
        clearInvalid: true
    });
});

server.register(Bell, (err) => {
   if (err) { throw err; }
   server.auth.strategy('auth0', 'bell', {
       provider: 'auth0',
       config: {
           domain: process.env.AUTH0_DOMAIN
       },
       ttl: process.env.SESSION_COOKIE_TTL,
       password: process.env.SESSION_COOKIE_PASSWORD,
       clientId: process.env.AUTH0_CLIENT_ID,
       clientSecret: process.env.AUTH0_CLIENT_SECRET,
       isSecure: process.env.NODE_ENV === 'production'
   });
});

server.route({
    method: 'GET',
    path: '/',
    config: {
        auth: {
            strategy: 'session',
            mode: 'optional'
        },
        handler: function (request, reply) {
            if (request.auth.isAuthenticated) {
                reply(`Successfully logged in! Here's the profile returned by Auth0: <pre>${JSON.stringify(request.auth.credentials.sid.raw, null, 2)}</pre> <a href="/logout">Click here to log out</a>`);
            } else {
                reply('Not logged in. <a href="/login">Click here to log in.</a>');
            }
        }
    }
});

server.route({
    method: 'GET',
    path: '/login',
    config: {
        auth: {
            strategy: 'auth0',
            mode: 'required'
        }
    },
    handler: function(request, reply) {
        // Stores entire Auth0 profile to a cookie, might be slow or cause issues
        // Consider storing only user ID and mapping it to a server-side cache
        request.cookieAuth.set({ sid: request.auth.credentials.profile });
        reply.redirect('/');
    }
});

server.route({
    method: 'GET',
    path: '/logout',
    handler: function (request, reply) {
        request.cookieAuth.clear();
        reply('You are now logged out from this web application. If you also want to log out from Auth0, take a look at <a href="auth0.com/docs/logout">https://auth0.com/docs/logout</a>.');
    }
});

server.start((err) => {
   if (err) { throw err; }
   console.log(`listening on port ${process.env.PORT}`);
});
