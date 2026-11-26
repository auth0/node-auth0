# Migrating session apps to `@auth0/auth0-server-js`

This page is part of the [Authentication Migration Guide](./index.md). Read it only when you are routing to **`@auth0/auth0-server-js`**: when you want the SDK to own the login redirect flow, session storage, cookies, token refresh, and logout, instead of hand-rolling that around node-auth0. If you only need stateless token grants, stay on the main guide and [`authentication-flows.md`](./authentication-flows.md); you do not need this page.

> **Migrating with an AI agent?** Point it at the Auth0 migration skill (the `auth0` skill in [`auth0/agent-skills`](https://github.com/auth0/agent-skills), migration intent `migrate-node-auth0`). It walks the session lifecycle step by step.

**This is a rewrite of the session handling, not a method-for-method port.** node-auth0 had no session concept, so there is nothing to translate line-for-line. Instead you *replace* your existing session code (your `express-session` wiring, your token cache, your refresh-on-expiry logic, your logout handler) with the ServerClient lifecycle. You still touch only the auth/session code; routes, views, and business logic stay put.

- [Mental model](#mental-model)
- [Store setup](#store-setup)
- [The redirect-login lifecycle](#the-redirect-login-lifecycle)
- [Logins without a browser redirect](#logins-without-a-browser-redirect)
- [Backchannel logout](#backchannel-logout)

## Mental model

A ServerClient login has three durable pieces:

1. **Transaction store**: short-lived. Holds the in-flight login: the OAuth `state` and the PKCE (Proof Key for Code Exchange) `code_verifier` between the moment you redirect the user to Auth0 and the moment they come back to your callback. Created at `startInteractiveLogin`, consumed at `completeInteractiveLogin`.
2. **State store**: long-lived. Holds the established session: the user claims plus the access / refresh / ID tokens and their absolute expiry. Read on every subsequent request via `getUser`, `getSession`, `getAccessToken`.
3. **Cookies**: how the two stores key themselves to the browser. With a *stateless* store the session data lives encrypted in the cookie itself; with a *stateful* store the cookie holds only an identifier and the data lives in your backend (Redis, database, and so on).

node-auth0 exposed none of this; you built equivalents by hand. You are swapping your implementation for the SDK's.

## Store setup

`@auth0/auth0-server-js` ships store base classes and cookie-backed implementations:

- `CookieTransactionStore`: transaction store backed entirely by a cookie. Good default.
- `StatelessStateStore`: session lives encrypted in the cookie. No server-side storage; good for serverless or horizontally-scaled deployments with small sessions.
- `StatefulStateStore`: session lives server-side; the cookie holds an id. Use for large sessions or when you need server-side revocation.
- `AbstractTransactionStore` / `AbstractStateStore`: extend these to back a store with your own storage (Redis, Postgres, and so on). These are the exported base-class names.

All stores accept a `CookieHandler` so they can integrate with any framework's cookie API. The `storeOptions` generic (`TStoreOptions`) is how you thread per-request context (like the framework `req` / `res`) into store reads and writes; every ServerClient method takes an optional trailing `storeOptions` argument for exactly this.

```ts
import { ServerClient, CookieTransactionStore, StatelessStateStore } from "@auth0/auth0-server-js";

const serverClient = new ServerClient({
    domain: process.env.AUTH0_DOMAIN!,
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    authorizationParams: {
        redirect_uri: "https://app.example.com/callback",
        scope: "openid profile email offline_access", // offline_access ⇒ refresh token
        audience: "https://api.example.com",
    },
    transactionStore: new CookieTransactionStore(
        { secret: process.env.SESSION_SECRET! },
        cookieHandler, // CookieHandler<TStoreOptions> implementation
    ),
    stateStore: new StatelessStateStore(
        { secret: process.env.SESSION_SECRET! },
        cookieHandler, // CookieHandler<TStoreOptions> implementation
    ),
});
```

## The redirect-login lifecycle

### 1. Start login: replace the hand-built `/authorize` redirect

Whatever you did to send the user to Auth0 (a hand-constructed `/authorize` URL, or `express-openid-connect`'s `/login`) becomes:

```ts
// GET /login
app.get("/login", async (req, res) => {
    const authorizationUrl = await serverClient.startInteractiveLogin(
        {
            authorizationParams: {
                /* optional per-login overrides */
            },
            appState: { returnTo: req.query.returnTo || "/" }, // seed appState for round-trip
        },
        { req, res }, // storeOptions: lets the transaction store write its cookie
    );
    res.redirect(authorizationUrl.href);
});
```

`startInteractiveLogin` generates `state` and PKCE, writes them to the transaction store, and returns the fully-formed authorization URL.

### 2. Complete login: replace the manual code exchange

The callback handler that used to call `oauth.authorizationCodeGrant` (or `authorizationCodeGrantWithPKCE`) and then stuff tokens into the session becomes a single call:

```ts
// GET /callback
app.get("/callback", async (req, res) => {
    const callbackUrl = new URL(req.url, `https://${req.headers.host}`);
    const { appState } = await serverClient.completeInteractiveLogin(callbackUrl, { req, res });
    // Session is now established in the state store. Tokens are NOT your concern anymore.
    res.redirect(appState?.returnTo ?? "/");
});
```

`completeInteractiveLogin` validates `state`, exchanges the code, validates the ID token, writes the session (user + tokens + absolute expiry) to the state store, and clears the transaction.

### 3. Read the user or session on later requests

Replace `req.session.user` reads:

```ts
const user = await serverClient.getUser({ req, res }); // user claims, or undefined
const session = await serverClient.getSession({ req, res }); // full session data, or undefined
```

`getUser` / `getSession` return `undefined` when there is no session or it has expired (the store deletes expired sessions on read), so use that as your "not logged in" signal.

### 4. Get an access token to call an API: refresh is automatic

Replace your manual "is the token expired? if so refresh" block:

```ts
const { accessToken } = await serverClient.getAccessToken({ req, res });
// If the stored access token is expired and a refresh token exists,
// the SDK refreshes and persists the new tokens transparently.
```

This is where the `expires_in` → `expiresAt` hazard disappears entirely: the SDK owns expiry math. For a downstream federated connection token (Token Vault), use `serverClient.getAccessTokenForConnection({ connection }, { req, res })`.

### 5. Logout: replace manual revoke, session clear, and `/v2/logout` redirect

```ts
// GET /logout
app.get("/logout", async (req, res) => {
    const logoutUrl = await serverClient.logout({ returnTo: "https://app.example.com" }, { req, res });
    res.redirect(logoutUrl.href);
});
```

`logout` clears the session from the state store and returns the Auth0 `/v2/logout` URL. If you also revoked the refresh token on logout (via `oauth.revokeRefreshToken`), call `serverClient.revokeRefreshToken({ req, res })` before redirecting; by default it reads the refresh token from the session, so you do not handle the raw token yourself (it also accepts an explicit `{ token }` if you need to revoke a specific one).

## Logins without a browser redirect

Some logins do not use a browser redirect: the password grant, passwordless, CIBA, and custom token exchange. If you used node-auth0 for one of these *and* want a server-js session out of it, use the ServerClient methods that both authenticate and write the session, rather than the low-level auth-js grants:

| Flow | ServerClient method |
| --- | --- |
| Backchannel / CIBA | `loginBackchannel({ ... }, storeOptions)` |
| Passwordless (send) | `startPasswordless({ connection, email \| phoneNumber, ... }, storeOptions)` |
| Passwordless (verify code → session) | `completePasswordless({ connection, email \| phoneNumber, verificationCode }, storeOptions)` |
| Passwordless magic link (callback → session) | `completePasswordlessMagicLink(url, storeOptions)` |
| Custom token exchange → session | `loginWithCustomTokenExchange({ ... }, storeOptions)` |
| MFA verify → session | `serverClient.mfa.verify({ ... }, storeOptions)` |

Each of these performs the underlying grant *and* persists the resulting tokens to the state store, so the user is logged in afterward, exactly the behavior you previously wrote by hand after a node-auth0 grant.

## Backchannel logout

If you implemented an Auth0 back-channel logout endpoint by hand (validating the logout token, then clearing your session store), replace it with:

```ts
// POST /backchannel-logout
app.post("/backchannel-logout", async (req, res) => {
    await serverClient.handleBackchannelLogout(req.body.logout_token, { req, res });
    res.sendStatus(204);
});
```

It validates the logout token and clears the corresponding session.

When the session layer is wired, return to the [verification checklist](./index.md#verification-checklist) in the main guide.
