# node-auth0 custom signup

All that is needed to run this example is a web server.
Here's an easy way to do just that:

1. Install `node`
2. Set the ClientId, domain, callbackURL in the `custom-signup.js`. You also need to set the Domain and Token (which can be generated [here](https://auth0.com/docs/api/v2)) for your Auth0 app as environment variables in the `.env` file with the following names respectively: `AUTH0_DOMAIN`, `AUTH0_TOKEN`:
```
AUTH0_DOMAIN={your_domain}.auth0.com
AUTH0_TOKEN={token}
```
3. Run `npm install -g serve`
4. Run `serve` to start serving the front-end
5. Run `node server.js` to run the server
6. Browse to [`http://localhost:3000`](http://localhost:3000)
