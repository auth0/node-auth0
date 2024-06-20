# Examples

- [Authentication Client](#authentication-client)
  - [Signup a user](#signup-a-user)
  - [Use a client assertion](#use-a-client-assertion)
  - [Use Refresh Tokens](#use-refresh-tokens)
  - [Complete the Authorization Code flow with PKCE](#complete-the-authorization-code-flow-with-pkce)
  - [Login with Passwordless](#login-with-passwordless)
  - [mTLS request](#mtls-request)
- [Management Client](#management-client)
  - [Paginate through a list of users](#paginate-through-a-list-of-users)
  - [Paginate through a list of logs using checkpoint pagination](#paginate-through-a-list-of-logs-using-checkpoint-pagination)
  - [Import users from a JSON file](#import-users-from-a-json-file)
  - [Update a user's user_metadata](#update-a-users-user_metadata)
- [Customizing the request](#customizing-the-request)
  - [Passing custom options to fetch](#passing-custom-options-to-fetch)
  - [Overriding `fetch`](#overriding-fetch)

## Authentication Client

### Signup a user

```js
import { AuthenticationClient } from 'auth0';

const auth = new AuthenticationClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});
const { data: user } = await auth.database.signUp({
  email: '{USER_EMAIL}',
  password: '{USER_PASSWORD}',
  connection: 'Username-Password-Authentication',
});
```

### Use a client assertion

```js
import { AuthenticationClient } from 'auth0';

const clientAssertionSigningKey = `-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----`;

const auth = new AuthenticationClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientAssertionSigningKey,
});

const { data: tokens } = await auth.oauth.clientCredentialsGrant({
  audience: 'you-api',
});
```

### Use Refresh Tokens

```js
import { AuthenticationClient } from 'auth0';

const auth = new AuthenticationClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});

// Get a new access token
const {
  data: { access_token },
} = await auth.oauth.refreshTokenGrant({
  refresh_token: refreshToken,
});

// Revoke a refresh token
await auth.oauth.revokeRefreshToken({
  token: refreshToken,
});
```

### Complete the Authorization Code flow with PKCE

```js
import { AuthenticationClient } from 'auth0';

const auth = new AuthenticationClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});
const { data: tokens } = await auth.oauth.authorizationCodeGrantWithPKCE(
  {
    code_verifier: '{key used to generate the code_challenge passed to /authorize}',
    code: '{code from authorization response}',
    redirect_uri: '{application redirect uri}',
  },
  {
    idTokenValidateOptions: {
      nonce: '{random string passed to /authorize to check against the nonce claim}',
      maxAge: '{number of seconds to check against the auth_time claim}',
      organization: '{organization name or ID to check against the org_id or org_name claim}',
    },
  }
);
```

> Note: We recommend one of our [Regular Web Application SDK Libraries](https://auth0.com/docs/libraries#webapp) for this.

### Login with Passwordless

```js
import { AuthenticationClient } from 'auth0';

const auth = new AuthenticationClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});

// Or you can `sendSMS`
await auth.passwordless.sendEmail({
  email: '{user email}',
  send: 'code',
});

const { data: tokens } = await auth.passwordless.loginWithEmail({
  email: '{user email}',
  code: '{code from email}',
});
```

### mTLS request

Refer mTLS documentation for more info - [Link](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authenticate-with-mtls)

```js
import { AuthenticationClient } from 'auth0';
const { Agent } = require('undici');

const auth = new AuthenticationClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  agent: new Agent({
    connect: { cert: 'your_cert', key: 'your_key' },
  }),
  useMTLS: true,
});

const { data: tokens } = await auth.oauth.clientCredentialsGrant({
  audience: 'you-api',
});
```

## Management Client

### Paginate through a list of users

```js
import { ManagementClient } from 'auth0';

const management = new ManagementClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});

const allUsers = [];
let page = 0;
while (true) {
  const {
    data: { users, total },
  } = await management.users.getAll({
    include_totals: true,
    page: page++,
  });
  allUsers.push(...users);
  if (allUsers.length === total) {
    break;
  }
}
```

> Note: The maximum number of users you can get with this endpoint is 1000. For more, use `users.exportUsers`.

### Paginate through a list of logs using checkpoint pagination

```js
import { ManagementClient } from 'auth0';

const management = new ManagementClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});

const allLogs = [];
let from = '';
while (true) {
  const { data: logs } = await management.logs.getAll({ from });
  if (!logs.length) {
    break;
  }
  allLogs.push(...logs);
  ({ log_id: from } = logs[logs.length - 1]);
}
```

### Import users from a JSON file

```js
import { ManagementClient } from 'auth0';
import { fileFrom } from 'fetch-blob/from.js';

const management = new ManagementClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});

const {
  data: { job: id },
} = await management.jobs.importUsers({
  users: await fileFrom('./users.json', 'application/json'),
  connection_id: 'con_{your connection id}',
});

let done = false;
while (!done) {
  const {
    data: {
      job: { status },
    },
  } = await management.jobs.get({ id });
  if (status === 'completed') {
    done = true;
  } else if (status === 'failed') {
    const { data: errors } = await management.jobs.getErrors({ id });
    throw new Error(errors);
  } else {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}
```

### Update a user's user_metadata

```js
import { ManagementClient } from 'auth0';

const management = new ManagementClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
});

await management.users.update({ id: '{user id}' }, { user_metadata: { foo: 'bar' } });
```

## Customizing the request

### Passing custom options to fetch

```js
import https from 'https';
import { ManagementClient } from 'auth0';

const management = new ManagementClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
  headers: { 'foo': 'applied to all requests' },
  agent: new https.Agent({ ... }),
  timeoutDuration: 5000
});

await management.users.get({ id: '{user id}' }, { headers: { 'bar': 'applied to this request' } });
```

### Overriding `fetch`

```js
import { ManagementClient } from 'auth0';
import { myFetch } from './fetch';

const management = new ManagementClient({
  domain: '{YOUR_TENANT_AND REGION}.auth0.com',
  clientId: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
  async fetch(url, init) {
    log('before', url, init.method);
    const res = await myFetch(url, init);
    log('after', url, init.method, res.status);
    return res;
  },
});

await management.users.get({ id: '{user id}' });
```
