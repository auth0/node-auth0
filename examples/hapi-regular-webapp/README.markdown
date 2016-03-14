# Auth0 + hapi

This seed project shows an example Node web application which is built with [hapi.js](http://hapijs.com/).
If you want to create a hapi.js API which uses JWT authentication instead, please check [this other seed project](https://github.com/auth0/node-auth0/tree/master/examples/nodejs-api)

# Running the example

Edit the `.env` file and add all the environment varaibles to it.
You can find your Auth0 domain, client ID and secret for your client in the [Auth0 dashboard](https://manage.auth0.com/#/applications).

Make sure to add `http://localhost:3000/login` to the Allowed Callback URLs of your Auth0 client.

```bash
# install dependencies
npm install

# start the application server
node index.js
```

# About this example

When a user successfully authenticates through Auth0, an encrypted cookie containing their entire user profile is set.
If the user profile is too large for a cookie, some browsers might not set it.
To prevent this and to reduce the size of the cookie, consider using a server-side cache and only storing the ID of the user in the cookie.
For more information about server-side caching, [please refer to the hapi.js documentation](http://hapijs.com/tutorials/caching#server-side-caching).

This example is maintained by @rolodato.
