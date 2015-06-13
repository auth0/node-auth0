# Auth0 + NodeJS API Seed
This is the seed project you need to use if you're going to create a NodeJS API. You'll mostly use this API either for a SPA or a Mobile app. If you just want to create a Regular NodeJS WebApp, please check [this other seed project](https://github.com/auth0/node-auth0/tree/master/examples/nodejs-regular-webapp)

This example is deployed at Heroku at http://auth0-nodejsapi-sample.herokuapp.com/ping

#Running the example
In order to run the example you need to have npm and nodejs installed.

Run `npm install` to ensure local dependencies are available.

You also need to set the ClientSecret and ClientId for your Auth0 app as enviroment variables with the following names respectively: `AUTH0_CLIENT_SECRET` and `AUTH0_CLIENT_ID`.

For that, the following should have been already created for you; if not, just create a file named `.env` in the directory and set the values like the following, the app will just work:

````bash
# .env file
AUTH0_CLIENT_SECRET=myCoolSecret
AUTH0_CLIENT_ID=myCoolClientId
````

Once you've set those 2 enviroment variables, just run `node server.js` and try calling [http://localhost:3001/ping](http://localhost:3001/ping)
