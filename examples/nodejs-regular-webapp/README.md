# Auth0 + NodeJS API Seed
This is the seed project you need to use if you're going to create regular NodeJS Webapp. If you want to create a NodeJS API to use with your SPA or mobile app, please check [this other seed project](https://github.com/auth0/node-auth0/tree/master/examples/nodejs-api)

This example is deployed at Heroku at http://auth0-nodejs-webapp-sample.herokuapp.com/

#Running the example
In order to run the example you need to have npm and nodejs installed.

You also need to set the ClientSecret, ClientId and Domain for your Auth0 app as enviroment variables with the following names respectively: `AUTH0_CLIENT_SECRET`, `AUTH0_CLIENT_ID` and `AUTH0_DOMAIN`.

For that, if you just create a file named `.env` in the directory and set the values like the following, the app will just work:

````bash
# .env file
AUTH0_CLIENT_SECRET=myCoolSecret
AUTH0_CLIENT_ID=myCoolClientId
AUTH0_DOMAIN=myCoolDomain
````

Once you've set those 3 enviroment variables, just run `node server.js` and try calling [http://localhost:3000/](http://localhost:3000/)
