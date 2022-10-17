# Examples

## Automatic Management API Token Retrieval

To **automatically** obtain a Management API token via the ManagementClient, you can specify the parameters `clientId`, `clientSecret` (use a Non Interactive Client) and optionally `scope`.
Behind the scenes the Client Credentials Grant is used to obtain the `access_token` and is by default cached for the duration of the returned `expires_in` value.

```js
var ManagementClient = require('auth0').ManagementClient;
var auth0 = new ManagementClient({
  domain: '{YOUR_ACCOUNT}.auth0.com',
  clientId: '{YOUR_NON_INTERACTIVE_CLIENT_ID}',
  clientSecret: '{YOUR_NON_INTERACTIVE_CLIENT_SECRET}',
  scope: 'read:users update:users',
});
```

> Make sure your `clientId` is allowed to request tokens from Management API in [Auth0 Dashboard](https://manage.auth0.com/#/apis)

### Obtaining Management API Token from Node.js backend

To obtain a Management API token from your node backend, you can use Client Credentials Grant using your registered Auth0 Non Interactive Clients

```js
var AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
  domain: '{YOUR_ACCOUNT}.auth0.com',
  clientId: '{CLIENT_ID}',
  clientSecret: '{CLIENT_SECRET}',
});

auth0.clientCredentialsGrant(
  {
    audience: 'https://{YOUR_ACCOUNT}.auth0.com/api/v2/',
    scope: '{MANAGEMENT_API_SCOPES}',
  },
  function (err, response) {
    if (err) {
      // Handle error.
    }
    console.log(response.access_token);
  }
);
```

### Promises and callback support

All methods can be used with promises or callbacks, when a callback argument is provided no promise will be returned.

```js
// Using callbacks.
management.getUsers(function (err, users) {
  if (err) {
    // handle error.
  }
  console.log(users);
});

// Using promises.
management
  .getUsers()
  .then(function (users) {
    console.log(users);
  })
  .catch(function (err) {
    // Handle error.
  });
```
