# Auth0 + Hapi API Seed
This seed project gives an example of how to set up Auth0 with a Hapi API. If you just want to create a regular NodeJS web app, please check [this other seed project](https://github.com/auth0/node-auth0/tree/master/examples/nodejs-regular-webapp)

# Running the example
In order to run the example, you need to have `npm` and NodeJS installed.

Run `npm install` to ensure local dependencies are available.

You also need to set the ClientSecret and ClientId for your Auth0 app as enviroment variables with the following names respectively: `AUTH0_CLIENT_SECRET` and `AUTH0_CLIENT_ID`.

For that, the following should have been already created for you; if not, just create a file named `.env` in the directory and set the values like the following, the app will just work:

````bash
# .env file
AUTH0_CLIENT_SECRET=myCoolSecret
AUTH0_CLIENT_ID=myCoolClientId
````

Once you've set the two environment variables, just run `node server.js`. The application will run on `localhost:8000`. 

Application have two endpoints: [localhost:8000/public](http://localhost:8000/public) and [localhost:8000/private](http://localhost:8000/private). Private endpoint require header `Authorization: Bearer <YOUR_JWT_TOKEN>`