# Authentication Migration Guide

A guide to migrating your authentication code off the `auth0` package (node-auth0) to the modern Auth0 server SDKs: [`@auth0/auth0-auth-js`](https://github.com/auth0/auth0-auth-js) for stateless token grants, and [`@auth0/auth0-server-js`](https://github.com/auth0/auth0-server-js) for server-managed sessions.

This guide covers **only the Authentication API layer** — `AuthenticationClient`, its sub-clients, and `UserInfoClient`. The Management API (`ManagementClient`) is **not** part of this migration and stays on the `auth0` package. It is normal and correct for a file to keep importing `auth0` for management while importing `@auth0/auth0-auth-js` for authentication.

- [Overview](#overview)
    - [Who this is for](#who-this-is-for)
    - [Scope](#scope)
- [Choosing your target SDK](#choosing-your-target-sdk)
    - [Decision table](#decision-table)
    - [Signals](#signals)
    - [Mixing both](#mixing-both)
- [Prerequisites](#prerequisites)
    - [Node.js version](#nodejs-version)
    - [SDK versions](#sdk-versions)
    - [The RequestOptions / fullResponse caveat](#the-requestoptions--fullresponse-caveat)
- [Installation and constructor mapping](#installation-and-constructor-mapping)
    - [Imports](#imports)
    - [AuthClient options](#authclient-options)
    - [ServerClient options](#serverclient-options)
    - [Global config to per-request options](#global-config-to-per-request-options)
- [API mapping](#api-mapping)
    - [oauth](#authenticationclientoauth--authclient-methods)
    - [database](#authenticationclientdatabase--authclientdatabase)
    - [passwordless](#authenticationclientpasswordless--split)
    - [backchannel (CIBA)](#authenticationclientbackchannel-ciba)
    - [tokenExchange](#authenticationclienttokenexchange-rfc-8693)
    - [UserInfoClient](#userinfoclient)
    - [Quick lookup table](#quick-lookup-table)
- [Cross-cutting breaking changes](#cross-cutting-breaking-changes)
    - [Return shape](#1-return-shape)
    - [Casing](#2-casing)
    - [Token expiry](#3-token-expiry)
    - [Error model](#4-error-model)
- [Session apps: wiring the auth0-server-js session layer](#session-apps-wiring-the-auth0-server-js-session-layer)
    - [Mental model](#mental-model)
    - [Store setup](#store-setup)
    - [The redirect-login lifecycle](#the-redirect-login-lifecycle)
    - [Non-redirect logins that establish a session](#non-redirect-logins-that-establish-a-session)
    - [Backchannel logout](#backchannel-logout)
- [Verification checklist](#verification-checklist)
- [FAQ and gotchas](#faq-and-gotchas)

## Overview

node-auth0's `AuthenticationClient` is a **stateless HTTP client**. Every method is a single call to an Auth0 Authentication API endpoint that returns a response object. It has no notion of a logged-in user, no session, no cookie, no token store, and no automatic refresh. Anything stateful in a node-auth0 app — persisting tokens, deciding when to refresh, tracking the login across requests — was written by you *around* node-auth0.

The modern stack splits those two concerns into two packages:

- **`@auth0/auth0-auth-js`** is the stateless token layer. It is the direct successor to `AuthenticationClient`: the same "one method equals one API call equals one result" model, with modern ergonomics (camelCase, typed errors, direct return values, per-request options).
- **`@auth0/auth0-server-js`** is a stateful session layer built on top of auth0-auth-js. It owns the login redirect flow, a pluggable state/transaction store, cookie handling, automatic token refresh, and logout. It is the successor to the *session code you hand-rolled*, not to `AuthenticationClient` itself.

### Who this is for

You are running a Node.js backend that imports the `auth0` package and calls `AuthenticationClient` (or `UserInfoClient`) to perform token grants, database signup, passwordless, CIBA, token exchange, or userinfo lookups. You want to move that code to the current first-party server SDKs. This is a surgical rewrite of the authentication layer: routes, controllers, business logic, data access, and framework wiring stay as they are. You touch the smallest possible surface — the files that import and call node-auth0's Authentication API.

### Scope

**In scope:**

- `AuthenticationClient` and its sub-clients: `.oauth`, `.database`, `.passwordless`, `.backchannel`, `.tokenExchange`
- `UserInfoClient`
- The auth error types (`AuthApiError`) and token-validation types (`IDTokenValidateOptions`, `IdTokenValidatorError`)

**Out of scope — do not touch:**

- `ManagementClient` (Management API v2). It is **not** being migrated and stays on the `auth0` package.
- Application routes, view/controller logic, database code, and any non-auth use of the `auth0` package.

> If a file uses `ManagementClient`, leave that code alone. Only rewrite the `AuthenticationClient` / `UserInfoClient` parts.

## Choosing your target SDK

The routing question is: **do you want to keep owning your session, or hand that responsibility to the SDK?**

### Decision table

| If your code… | Migrate to | Why |
| --- | --- | --- |
| Only performs token grants / DB signup / passwordless / userinfo and manages its own session (or is an M2M / service-to-service backend) | **`@auth0/auth0-auth-js`** | Direct, near 1:1 replacement for `AuthenticationClient`. Same stateless model. |
| Wants the SDK to own the login redirect flow, session storage, cookies, token refresh, and logout (a server-rendered web app) | **`@auth0/auth0-server-js`** | Adds a session layer node-auth0 never had. This is a rewrite of the session handling, not a method-for-method port. |

**Default recommendation:** start with **`@auth0/auth0-auth-js`** for a faithful parity migration. Choose **`@auth0/auth0-server-js`** only when you currently hand-roll session/cookie/refresh logic around node-auth0 and would benefit from the SDK owning it.

### Signals

Signals that point to **auth0-auth-js**:

- Predominant use is `clientCredentialsGrant` (M2M). There is no user, so there is no session to own.
- The app already has a session framework it is happy with and only calls node-auth0 for token grants.
- The app is an API, worker, or CLI, not a browser-facing web server.
- You want the smallest, most mechanical, lowest-risk migration.

Signals that point to **auth0-server-js**:

- The app performs a browser redirect login and reads `req.session.user` (or equivalent) on later requests.
- You wrote refresh-on-expiry logic, a token cache, or logout-with-revocation by hand.
- You use `express-openid-connect` today and want a first-party, framework-agnostic replacement.
- You are on a server framework (Express, Fastify, Hono, Next.js) and want the SDK to manage cookies.

### Mixing both

A single app can use both: auth0-server-js for the user-facing login/session, and auth0-auth-js directly for a separate M2M `clientCredentialsGrant` to call another API. `ServerClient` even exposes the underlying `AuthClient` via `serverClient.authClient` for occasional low-level needs. Do not force everything onto one package.

## Prerequisites

### Node.js version

Both target SDKs require **Node.js 20 LTS or newer**. Verify the project's runtime before installing.

### SDK versions

- `@auth0/auth0-auth-js` >= `1.12.1`
- `@auth0/auth0-server-js` >= `1.12.1`

Both are published on npm — `@auth0/auth0-auth-js@1.12.1` and `@auth0/auth0-server-js@1.12.1` are the current `latest`. Plain token-grant migrations work against the published `1.12.1`.

### The RequestOptions / fullResponse caveat

The per-request options surface (`signal`, `headers`, per-call `customFetch` in `RequestOptions`) and the `fullResponse` envelope landed **after** the `1.12.1` npm release and are **not in the published tarball yet**. If your migration depends on those APIs, install from the local-tarball / pre-release path until the next release cuts. A plain token-grant migration that does not read HTTP response metadata on success needs none of this and works against `1.12.1` as published.

This guide flags each place where `RequestOptions` or `fullResponse` applies, so you can tell which parts need the pre-release path.

## Installation and constructor mapping

Add the target package:

```bash
# auth-js target (stateless token grants)
npm install @auth0/auth0-auth-js

# server-js target (server-managed sessions) — pulls in auth0-auth-js transitively
npm install @auth0/auth0-server-js
```

Keep the `auth0` package installed if the app still uses `ManagementClient`.

### Imports

```ts
// before
import { AuthenticationClient, UserInfoClient, AuthApiError } from "auth0";

// after — auth-js target
import { AuthClient, TokenByCodeError, isMfaRequiredError } from "@auth0/auth0-auth-js";

// after — server-js target
import { ServerClient } from "@auth0/auth0-server-js";
```

> Keep the `auth0` import if the file also uses `ManagementClient`. It is correct for a file to import both `auth0` (for `ManagementClient`) and `@auth0/auth0-auth-js` (for authentication). Only remove the `auth0` import from files where it was used *solely* for `AuthenticationClient` / `UserInfoClient`.

### AuthClient options

The constructor options mostly carry over with camelCase names. A few are renamed or dropped.

**Before (node-auth0):**

```ts
new AuthenticationClient({
    domain: "tenant.us.auth0.com",
    clientId: "...",
    clientSecret: "...", // OR clientAssertionSigningKey
    clientAssertionSigningKey: "...",
    clientAssertionSigningAlg: "RS256",
    idTokenSigningAlg: "RS256", // for manual id_token validation
    clockTolerance: 60, // seconds, for validation
    useMTLS: false,
    telemetry: true,
    headers: { "X-Custom": "..." }, // sent on every request
    timeoutDuration: 10000, // ms
    retry: {
        /* ... */
    },
    agent: undiciDispatcher,
    fetch: customFetch,
    middleware: [
        /* ... */
    ],
});
```

**After (auth0-auth-js):**

```ts
import { AuthClient } from "@auth0/auth0-auth-js";

new AuthClient({
    domain: "tenant.us.auth0.com", // same (no scheme)
    clientId: "...", // same
    clientSecret: "...", // same
    clientAssertionSigningKey: "...", // same (string | CryptoKey)
    clientAssertionSigningAlg: "RS256", // same
    authorizationParams: {
        // NEW: default scope/audience/redirect_uri for URL builders
        scope: "openid profile email",
        audience: "https://api.example.com",
        redirect_uri: "https://app.example.com/callback",
    },
    useMtls: false, // RENAMED from useMTLS (lowercase tls)
    customFetch: fetch, // RENAMED from fetch
    telemetry: {
        /* ... */
    }, // structured TelemetryConfig
    discoveryCache: { ttl, maxEntries }, // NEW: OIDC discovery / JWKS cache
});
```

Option-by-option:

| node-auth0 | auth0-auth-js | Notes |
| --- | --- | --- |
| `domain` | `domain` | Unchanged. No `https://` scheme. |
| `clientId` | `clientId` | Unchanged. |
| `clientSecret` | `clientSecret` | Unchanged. |
| `clientAssertionSigningKey` | `clientAssertionSigningKey` | Unchanged. Now also accepts a `CryptoKey`. |
| `clientAssertionSigningAlg` | `clientAssertionSigningAlg` | Unchanged. |
| `useMTLS` | `useMtls` | Renamed (casing). |
| `fetch` | `customFetch` | Renamed. |
| `telemetry: boolean` | `telemetry: TelemetryConfig` | Now a structured object. |
| `headers` (global) | per-call `RequestOptions.headers` | Moved to per-request options; set per call site rather than globally. |
| `timeoutDuration` | per-call `RequestOptions.signal` | Use an `AbortSignal.timeout(ms)` on the call. |
| `retry` | configure via `customFetch` | Wrap your fetch with retry if needed. |
| `agent` | configure via `customFetch` | Set the dispatcher inside your custom fetch. |
| `middleware` | `customFetch` | Compose behavior in the fetch wrapper. |
| `idTokenSigningAlg` | (internal) | ID-token validation is internal; read `TokenResponse.claims`. |
| `clockTolerance` | (internal) | Handled internally during validation. |

### ServerClient options

`ServerClient` wraps an `AuthClient` and adds the session machinery. It shares the auth options and **adds required stores**:

```ts
import { ServerClient } from "@auth0/auth0-server-js";

new ServerClient({
    domain: "tenant.us.auth0.com", // string, or a DomainResolver for multi-tenant
    clientId: "...",
    clientSecret: "...", // or clientAssertionSigningKey / mTLS
    authorizationParams: {
        scope: "openid profile email offline_access", // offline_access → refresh tokens
        audience: "https://api.example.com",
        redirect_uri: "https://app.example.com/callback",
    },
    transactionStore, // REQUIRED — holds the in-flight login (state, PKCE verifier)
    stateStore, // REQUIRED — holds the established session (user + tokens)
    stateIdentifier: "__a0_session", // cookie/store key (default)
    transactionIdentifier: "__a0_tx", // cookie/store key (default)
    customFetch: fetch,
    useMtls: false,
    telemetry: {
        /* ... */
    },
});
```

The `transactionStore` and `stateStore` have **no node-auth0 counterpart** — they are the session substrate. See [Store setup](#store-setup) for how to construct them.

### Global config to per-request options

node-auth0's global constructor options for `headers`, `timeoutDuration`, `agent`, `retry`, and `middleware` have no direct constructor equivalents in auth0-auth-js. Instead, the new SDK's methods accept a trailing `RequestOptions` parameter (part of the [post-1.12.1 caveat](#the-requestoptions--fullresponse-caveat)):

```ts
import type { RequestOptions } from "@auth0/auth0-server-js"; // or '@auth0/auth0-auth-js'

const tokens = await authClient.getTokenByClientCredentials(
    { audience: "https://api.example.com" },
    {
        headers: { "X-Custom": "value" },
        signal: AbortSignal.timeout(5000), // timeout in ms
    } satisfies RequestOptions,
);
```

`@auth0/auth0-server-js` re-exports `RequestOptions`, `ApiResponse`, and `FullResponseOption` from `@auth0/auth0-auth-js`, so you can import any of them from either package.

**Arity rule:** MFA methods (`authClient.mfa.*`) take `requestOptions` as the 2nd argument; store-first methods (session-owning methods on `serverClient`) take it as the 3rd argument after the store context; cache hits ignore it entirely.

Common patterns:

- **Global headers:** apply via `RequestOptions.headers` on each call that needs it, or wrap `customFetch` once to inject it everywhere.
- **Timeout:** replace `timeoutDuration: 10000` with `signal: AbortSignal.timeout(10000)` on the call.
- **Agent (Node.js dispatcher):** wrap `customFetch` to inject the agent into the underlying HTTP transport.
- **Retry / middleware:** compose behavior in a `customFetch` wrapper passed either at construction or per request.

## API mapping

This is the complete method-by-method mapping, organized by node-auth0 sub-client so you can migrate one call site at a time. Unless a row explicitly routes to `@auth0/auth0-server-js`, the replacement lives on the `@auth0/auth0-auth-js` `AuthClient` (or one of its sub-clients: `authClient.database`, `authClient.passwordless`, `authClient.mfa`, `authClient.passkey`).

Before you touch any method, internalize the three structural changes that apply to *every* row — return shape, casing, and `expires_in` → `expiresAt` — plus the error-model change. Those are documented in [Cross-cutting breaking changes](#cross-cutting-breaking-changes). This section shows the method/parameter mapping; that one shows the field-level and error-level mapping. You need both.

Naming conventions used throughout:

| node-auth0 | new SDKs |
| --- | --- |
| Params and response fields use the snake_case wire shape: `client_id`, `refresh_token`, `access_token`, `expires_in`, `phone_number` | camelCase: `clientId`, `refreshToken`, `accessToken`, `expiresAt`, `phoneNumber` |
| Methods take a `bodyParameters` object (+ optional `initOverrides`) | Methods take a single `options` object (+ optional trailing `RequestOptions` for per-call `signal`, `headers`, `customFetch`) |
| Every method returns a `JSONApiResponse<T>` / `VoidApiResponse` / `TextApiResponse` wrapper | Methods return the domain object directly (`TokenResponse`, `SignUpResult`, `string`, `void`) |

### `AuthenticationClient.oauth.*` → `AuthClient` methods

node-auth0's OAuth sub-client is the largest surface. All of these move onto the `AuthClient` instance directly (not a sub-client).

#### `oauth.authorizationCodeGrant` → `getTokenByCode`

The single most important semantic change in the whole migration. In node-auth0 you pass the raw authorization `code` (and `redirect_uri`) that you extracted from the callback query string yourself. In auth0-auth-js you pass the **entire callback `URL`**; the SDK extracts `code` and validates `state` for you, and `redirect_uri` comes from the `AuthClient` config / `authorizationParams`.

**Before (node-auth0):**

```ts
import { AuthenticationClient } from "auth0";

const auth0 = new AuthenticationClient({ domain, clientId, clientSecret });

// You parsed `code` out of the callback URL yourself.
const resp = await auth0.oauth.authorizationCodeGrant({
    code,
    redirect_uri: "https://app.example.com/callback",
});
const accessToken = resp.data.access_token;
const expiresIn = resp.data.expires_in; // relative seconds
const reqId = resp.headers.get("x-request-id"); // metadata on success
```

**After (auth0-auth-js):**

```ts
import { AuthClient } from "@auth0/auth0-auth-js";

const authClient = new AuthClient({ domain, clientId, clientSecret });

// `callbackUrl` is a URL object for the full incoming request URL,
// e.g. new URL(req.url, `https://${req.headers.host}`)
const tokens = await authClient.getTokenByCode(callbackUrl, {
    // options; e.g. codeVerifier (PKCE) or organization
});
const accessToken = tokens.accessToken;
const expiresAt = tokens.expiresAt; // absolute Unix seconds
```

> If your code manually parses `req.query.code`, that parsing is now the SDK's job. Delete it and hand the SDK the full URL — the SDK reads `code` and `state` from the URL and validates `state` against the value it persisted when it built the authorization URL. (`getTokenByCode` options are `codeVerifier` and `organization`; there is no `expectedState` parameter — that lives on `getTokenByMagicLinkCode`.) If the node-auth0 code read `resp.headers.get(...)` on success, see [Reading HTTP response metadata](#reading-http-response-metadata-fullresponse). Error-path metadata remains accessible on the typed error.

#### `oauth.authorizationCodeGrantWithPKCE` → `getTokenByCode` (with verifier)

PKCE is folded into the same method; supply the code verifier via options. Typically the verifier was produced earlier by `buildAuthorizationUrl` (below), which returns a `codeVerifier` for you to persist.

```ts
// before
const resp = await auth0.oauth.authorizationCodeGrantWithPKCE({
    code,
    code_verifier: verifier,
    redirect_uri: "https://app.example.com/callback",
});

// after
const tokens = await authClient.getTokenByCode(callbackUrl, {
    codeVerifier: verifier,
});
```

> If you build the authorization URL yourself today, prefer switching to `authClient.buildAuthorizationUrl()` (below) so the SDK generates and returns the `codeVerifier`, then persist it and pass it back to `getTokenByCode`.

#### `oauth.refreshTokenGrant` → `getTokenByRefreshToken`

```ts
// before
const resp = await auth0.oauth.refreshTokenGrant({ refresh_token: rt });
// after
const tokens = await authClient.getTokenByRefreshToken({ refreshToken: rt });
```

#### `oauth.passwordGrant` → `getTokenByPassword`

```ts
// before
const resp = await auth0.oauth.passwordGrant({
    username,
    password,
    realm: "Username-Password-Authentication",
    audience,
    scope,
});
// after
const tokens = await authClient.getTokenByPassword({
    username,
    password,
    realm: "Username-Password-Authentication",
    audience,
    scope,
});
```

#### `oauth.clientCredentialsGrant` → `getTokenByClientCredentials`

The canonical M2M grant. This is the most common reason to stay on auth0-auth-js rather than adopt server-js — there is no user session involved.

```ts
// before
const resp = await auth0.oauth.clientCredentialsGrant({ audience: "https://api.example.com" });
const token = resp.data.access_token;
// after
const tokens = await authClient.getTokenByClientCredentials({ audience: "https://api.example.com" });
const token = tokens.accessToken;
```

#### `oauth.revokeRefreshToken` → `revokeToken`

Renamed, and simplified return (was `VoidApiResponse`, now `void`).

```ts
// before
await auth0.oauth.revokeRefreshToken({ token: rt });
// after
await authClient.revokeToken({ token: rt });
```

> **Session apps:** if you are migrating to server-js and this revoke was part of logout, use `serverClient.revokeRefreshToken()` (by default it reads the refresh token from the session; you can also pass an explicit `{ token }` in its options) instead of the low-level `revokeToken`.

#### `oauth.tokenForConnection` → `exchangeToken` (Token Vault)

`getTokenForConnection` also exists on `AuthClient` but is **deprecated**; prefer `exchangeToken`.

```ts
// before
const resp = await auth0.oauth.tokenForConnection({
    connection: "google-oauth2",
    subject_token: refreshToken,
    subject_token_type: "urn:ietf:params:oauth:token-type:refresh_token",
    login_hint: userId,
});
// after (Token Vault exchange overload)
const tokens = await authClient.exchangeToken({
    connection: "google-oauth2",
    subjectToken: refreshToken,
    subjectTokenType: "urn:ietf:params:oauth:token-type:refresh_token",
    loginHint: userId,
});
```

#### `oauth.pushedAuthorization` (PAR) → `buildAuthorizationUrl({ pushedAuthorizationRequests: true })`

There is **no standalone PAR method** in the new SDK. Pushed Authorization is a flag on the authorization-URL builder. The SDK performs the PAR POST and returns an authorization URL that references the resulting `request_uri`.

```ts
// before — explicit PAR call returning { request_uri, expires_in }
const resp = await auth0.oauth.pushedAuthorization({
    response_type: "code",
    redirect_uri: "https://app.example.com/callback",
});
// build the /authorize URL yourself from resp.data.request_uri ...

// after — PAR is handled inside buildAuthorizationUrl
const { authorizationUrl, codeVerifier } = await authClient.buildAuthorizationUrl({
    pushedAuthorizationRequests: true,
    authorizationParams: { redirect_uri: "https://app.example.com/callback" },
});
// redirect the user to authorizationUrl; persist codeVerifier for the callback
```

> Requires the tenant to expose a `pushed_authorization_request_endpoint`. The SDK throws if PAR is requested but unsupported by tenant metadata.

#### There was no authorization-URL builder in node-auth0 — introduce one

node-auth0 left `/authorize` URL construction to the caller (or to `express-openid-connect`). The new SDK gives you `buildAuthorizationUrl()` and `buildLogoutUrl()`. When migrating a redirect login, replace hand-built `/authorize` and `/v2/logout` URLs with these:

```ts
const { authorizationUrl, codeVerifier } = await authClient.buildAuthorizationUrl({
    authorizationParams: { redirect_uri, scope: "openid profile email", audience },
});
// ... later, on logout:
const logoutUrl = await authClient.buildLogoutUrl({ returnTo: "https://app.example.com" });
```

### `AuthenticationClient.database.*` → `authClient.database.*`

Database connection operations move to the `authClient.database` sub-client. Names and required params are unchanged; only casing and return shape change.

#### `database.signUp` → `authClient.database.signUp`

```ts
// before
const resp = await auth0.database.signUp({
    email,
    password,
    connection: "Username-Password-Authentication",
    given_name: "Ada",
    family_name: "Lovelace",
    user_metadata: { plan: "free" },
});
const userId = resp.data.id;
// after
const result = await authClient.database.signUp({
    email,
    password,
    connection: "Username-Password-Authentication",
    givenName: "Ada",
    familyName: "Lovelace",
    userMetadata: { plan: "free" },
});
const userId = result.id;
```

> **ID normalization is preserved.** node-auth0 mapped the server's `_id | user_id | id` onto a single `id`. The new SDK does the same, so `result.id` is always present. Do not add your own `_id` fallback.

#### `database.changePassword` → `authClient.database.changePassword`

Note the return type: node-auth0 returned a `TextApiResponse` (read via `.data`); the new SDK returns the plain `string` directly.

```ts
// before
const resp = await auth0.database.changePassword({ email, connection: "Username-Password-Authentication" });
const message = resp.data; // plain-text confirmation
// after
const message = await authClient.database.changePassword({ email, connection: "Username-Password-Authentication" });
```

### `AuthenticationClient.passwordless.*` → split

node-auth0 lumped "start" (send the code/link) and "login" (redeem the code) onto one sub-client. The new SDK **splits** them: starting stays on `authClient.passwordless`; redeeming a code becomes a top-level grant method on `AuthClient`.

#### `passwordless.sendEmail` → `authClient.passwordless.sendEmail`

```ts
// before
await auth0.passwordless.sendEmail({ email, send: "code" });
// after
await authClient.passwordless.sendEmail({ email, send: "code" });
```

> **Default changed.** node-auth0 defaulted `send` to `'link'` (magic link). The new SDK defaults `send` to `'code'` (OTP). If you relied on the implicit default to send magic links, set `send: 'link'` explicitly.

#### `passwordless.sendSMS` → `authClient.passwordless.sendSms`

Note the casing change: `sendSMS` → `sendSms`, and `phone_number` → `phoneNumber`.

```ts
// before
await auth0.passwordless.sendSMS({ phone_number: "+15551234567" });
// after
await authClient.passwordless.sendSms({ phoneNumber: "+15551234567" });
```

#### `passwordless.loginWithEmail` → `getTokenByPasswordlessEmail`

Redeeming the OTP is now a **grant method on `AuthClient`**, not on the passwordless sub-client.

```ts
// before
const resp = await auth0.passwordless.loginWithEmail({ email, code, audience, scope });
const token = resp.data.access_token;
// after
const tokens = await authClient.getTokenByPasswordlessEmail({ email, code, audience, scope });
const token = tokens.accessToken;
```

#### `passwordless.loginWithSMS` → `getTokenByPasswordlessSms`

```ts
// before
const resp = await auth0.passwordless.loginWithSMS({ phone_number, code });
// after
const tokens = await authClient.getTokenByPasswordlessSms({ phoneNumber, code });
```

> **Session apps:** server-js exposes `startPasswordless` / `completePasswordless` / `completePasswordlessMagicLink`, which both send the code and establish a session. Use those instead of the two-step auth-js flow when the SDK owns the session.

### `AuthenticationClient.backchannel.*` (CIBA)

#### `backchannel.authorize` → `initiateBackchannelAuthentication`

```ts
// before
const resp = await auth0.backchannel.authorize({
    binding_message: "ABC123",
    scope: "openid",
    userId: "auth0|123",
});
const authReqId = resp.auth_req_id;
// after
const { authReqId, expiresIn, interval } = await authClient.initiateBackchannelAuthentication({
    bindingMessage: "ABC123",
    loginHint: { sub: "auth0|123" }, // login_hint is an object with `sub`, not a bare string
    authorizationParams: { scope: "openid" }, // scope goes here, NOT as a top-level key
});
```

#### `backchannel.backchannelGrant` → `backchannelAuthenticationGrant`

```ts
// before
const resp = await auth0.backchannel.backchannelGrant({ auth_req_id: authReqId });
// after
const tokens = await authClient.backchannelAuthenticationGrant({ authReqId });
```

> **One-shot convenience:** `authClient.backchannelAuthentication({ ... })` initiates *and* polls to completion, returning a `TokenResponse`. Use it if your code did the initiate-then-poll loop by hand.
>
> **Session apps:** server-js exposes `loginBackchannel(...)` which runs CIBA and establishes a session in one call.

### `AuthenticationClient.tokenExchange.*` (RFC 8693)

```ts
// before
const resp = await auth0.tokenExchange.exchangeToken({
    subject_token_type: "urn:example:custom",
    subject_token: token,
    audience: "https://api.example.com",
    scope: "read",
});
// after
const tokens = await authClient.exchangeToken({
    subjectTokenType: "urn:example:custom",
    subjectToken: token,
    audience: "https://api.example.com",
    scope: "read",
});
```

> `exchangeToken` is overloaded: a custom-exchange profile shape (`subjectTokenType` + `subjectToken` + `audience`) and a Token-Vault shape (`connection` present). Presence of `connection` routes to the vault path. The custom-exchange profile is the RFC 8693 replacement for `tokenExchange.exchangeToken`.
>
> **Session apps:** server-js exposes `loginWithCustomTokenExchange` (exchange → establish session) and `customTokenExchange` (exchange → return tokens, no session).

### `UserInfoClient`

The standalone `UserInfoClient` from node-auth0 does not exist in the new SDK. Choose the replacement based on what the app needs:

| Your intent | Replacement |
| --- | --- |
| Wanted user profile claims right after login | Read `TokenResponse.claims` from the grant result — the SDK already decodes the ID token. No extra `/userinfo` round-trip needed. **Preferred.** |
| Wanted a live `/userinfo` response for an arbitrary access token (auth-js, when PR #228 merges) | `await authClient.getUserInfo({ accessToken })` — direct method on `AuthClient`. |
| Wanted the profile in a server-rendered app with a session | `await serverClient.getUser()` returns the stored user claims from the session. |
| Genuinely needs a raw `/userinfo` fetch on older SDK versions | Call the `/userinfo` endpoint directly with `fetch`. The endpoint is in the tenant's server metadata (`getServerMetadata()`). |

**Before (node-auth0):**

```ts
import { UserInfoClient } from "auth0";
const userInfo = new UserInfoClient({ domain });
const resp = await userInfo.getUserInfo(accessToken);
const profile = resp.data; // { sub, name, email, ... }
```

**After — preferred, use the claims you already have:**

```ts
const tokens = await authClient.getTokenByCode(callbackUrl, {});
const profile = tokens.claims; // { sub, name, email, ... } decoded from the id_token
```

**After — direct method (auth0-auth-js, when PR #228 merges), when you only have an access token:**

```ts
// authClient.getUserInfo() lands when auth0-auth-js PR #228 merges.
// Takes an options object: { accessToken, expectedSubject? }
const profile = await authClient.getUserInfo({ accessToken });
// { sub, name, email, ... }
```

**After — raw fetch fallback (older SDK versions):**

```ts
const metadata = await authClient.getServerMetadata();
const resp = await fetch(metadata.userinfo_endpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
});
const profile = await resp.json();
```

> Prefer reading `claims` over any `/userinfo` call: it avoids a network round-trip and the claims are already validated by the SDK.

### Quick lookup table

| node-auth0 | new SDK equivalent | Layer |
| --- | --- | --- |
| `oauth.authorizationCodeGrant` | `authClient.getTokenByCode(url, opts)` | auth-js |
| `oauth.authorizationCodeGrantWithPKCE` | `authClient.getTokenByCode(url, { codeVerifier })` | auth-js |
| `oauth.refreshTokenGrant` | `authClient.getTokenByRefreshToken({ refreshToken })` | auth-js |
| `oauth.passwordGrant` | `authClient.getTokenByPassword({ ... })` | auth-js |
| `oauth.clientCredentialsGrant` | `authClient.getTokenByClientCredentials({ audience })` | auth-js |
| `oauth.revokeRefreshToken` | `authClient.revokeToken({ token })` / `serverClient.revokeRefreshToken()` | auth-js / server-js |
| `oauth.tokenForConnection` | `authClient.exchangeToken({ connection, ... })` | auth-js |
| `oauth.pushedAuthorization` | `authClient.buildAuthorizationUrl({ pushedAuthorizationRequests: true })` | auth-js |
| `database.signUp` | `authClient.database.signUp({ ... })` | auth-js |
| `database.changePassword` | `authClient.database.changePassword({ ... })` | auth-js |
| `passwordless.sendEmail` | `authClient.passwordless.sendEmail({ ... })` | auth-js |
| `passwordless.sendSMS` | `authClient.passwordless.sendSms({ phoneNumber })` | auth-js |
| `passwordless.loginWithEmail` | `authClient.getTokenByPasswordlessEmail({ ... })` | auth-js |
| `passwordless.loginWithSMS` | `authClient.getTokenByPasswordlessSms({ ... })` | auth-js |
| `backchannel.authorize` | `authClient.initiateBackchannelAuthentication({ ... })` | auth-js |
| `backchannel.backchannelGrant` | `authClient.backchannelAuthenticationGrant({ authReqId })` | auth-js |
| `tokenExchange.exchangeToken` | `authClient.exchangeToken({ subjectTokenType, subjectToken, audience })` | auth-js |
| `UserInfoClient.getUserInfo` | `TokenResponse.claims` (preferred) / `authClient.getUserInfo({ accessToken })` (auth-js, when PR #228 merges) / `serverClient.getUser()` / raw `/userinfo` fetch | auth-js / server-js |
| (no equivalent) — build `/authorize` URL | `authClient.buildAuthorizationUrl({ ... })` | auth-js |
| (no equivalent) — build `/v2/logout` URL | `authClient.buildLogoutUrl({ returnTo })` | auth-js |
| `ManagementClient.*` | **not migrated — stays on `auth0`** | — |

## Cross-cutting breaking changes

Every call-site rewrite above is subject to four changes that cut across all methods. They cause the overwhelming majority of migration defects, and three of the four are *silent* — the code compiles and often runs, but produces wrong behavior at runtime. Apply each one deliberately.

1. [Return shape: `JSONApiResponse<T>` → domain object](#1-return-shape)
2. [Casing: snake_case wire shape → camelCase](#2-casing)
3. [Token expiry: `expires_in` (relative) → `expiresAt` (absolute)](#3-token-expiry) — most dangerous
4. [Error model: `AuthApiError` → typed per-operation errors](#4-error-model)

### 1. Return shape

node-auth0 wraps most Authentication API results in a response envelope:

- `JSONApiResponse<T>` — has `.data` (the payload), `.status` (number), `.statusText`, `.headers` (a `Headers` object).
- `VoidApiResponse` — same envelope, `.data` is `undefined` (used by `sendEmail`, `revokeRefreshToken`, …).
- `TextApiResponse` — `.data` is a `string` (used by `database.changePassword`).

**Exception:** `backchannel.authorize`, `backchannel.backchannelGrant`, and `tokenExchange.exchangeToken` return domain objects directly (no `.data` wrapper) in node-auth0.

The new SDKs **drop the envelope** and return the domain object directly:

- Token grants return a `TokenResponse` instance.
- `database.signUp` returns a `SignUpResult` object.
- `database.changePassword` returns a `string`.
- `sendEmail` / `sendSms` / `revokeToken` return `void`.

HTTP metadata (status code, response headers such as `x-request-id`, `retry-after`, rate-limit headers) is available through the per-operation error objects on failure paths. On **success paths**, metadata is available via the opt-in `fullResponse` envelope (see below). It is no longer on the bare success value by default.

The rewrite — delete `.data` indirection on every success path:

```ts
// before
const resp = await auth0.oauth.clientCredentialsGrant({ audience });
const token = resp.data.access_token;
const status = resp.status;

// after
const tokens = await authClient.getTokenByClientCredentials({ audience });
const token = tokens.accessToken;
```

```ts
// before — changePassword returned TextApiResponse
const resp = await auth0.database.changePassword({ email, connection });
console.log(resp.data);

// after — returns the string directly
const message = await authClient.database.changePassword({ email, connection });
console.log(message);
```

> `changePassword` requires `connection` plus at least one of `email` or `username` — either identifier is accepted, not `email` alone.

#### Reading HTTP response metadata (fullResponse)

> The `fullResponse` envelope and per-request `RequestOptions` landed **after** the `1.12.1` npm release and are not in the published tarball yet. Use the [pre-release path](#the-requestoptions--fullresponse-caveat) if you depend on them.

When your node-auth0 code reads HTTP response metadata (status, headers) on a **success path**, migrate to the opt-in envelope rather than dropping the read. This is most common when you track rate limits, log request IDs, or check retry-after headers for dashboard telemetry.

```ts
// before (node-auth0): metadata on the success envelope
const resp = await auth0.oauth.clientCredentialsGrant({ audience });
const remaining = resp.headers.get("x-ratelimit-remaining");
const token = resp.data.access_token;

// after: opt in to the envelope, read the native Response
const { data, response } = await authClient.getTokenByClientCredentials({ audience, fullResponse: true });
const remaining = response.headers.get("x-ratelimit-remaining");
const token = data.accessToken;
```

The same opt-in covers the non-token Authentication API methods that node-auth0 wrapped in a `JSONApiResponse` / `TextApiResponse` / `VoidApiResponse`:

| Method | Bare return | `fullResponse: true` return |
| --- | --- | --- |
| `database.signUp` | `SignUpResult` | `ApiResponse<SignUpResult>` |
| `database.changePassword` | `string` | `ApiResponse<string>` |
| `passwordless.sendEmail` | `void` | `ApiResponse<void>` (`data` is `undefined`) |
| `passwordless.sendSms` | `void` | `ApiResponse<void>` (`data` is `undefined`) |

```ts
// before (node-auth0): read the request id off the signup envelope
const resp = await auth0.database.signUp({ email, password, connection });
const reqId = resp.headers.get("x-request-id");

// after: opt in to the envelope
const { data, response } = await authClient.database.signUp({ email, password, connection, fullResponse: true });
const reqId = response.headers.get("x-request-id");

// void-returning methods expose the Response with an undefined `data`
const { response: sendResp } = await authClient.passwordless.sendEmail({ email, fullResponse: true });
const rateLimit = sendResp.headers.get("x-ratelimit-remaining");
```

Caveats:

- Pass `fullResponse: true` as a literal, not a variable. Using spread — `{ ...opts, fullResponse: true }` — widens `true` to `boolean`, causing TypeScript overload resolution to fall back to the bare return type. Fix: pass `{ ...opts, fullResponse: true as const }` or include `fullResponse` as an inline literal in the options object.
- Performance: `@auth0/auth0-auth-js` does not cache tokens — every `AuthClient` grant method performs a live token-endpoint round-trip regardless of `fullResponse`, so the flag adds no extra network cost at this layer. (Token caching and reuse live in `@auth0/auth0-server-js`'s session store, not in the auth-js `AuthClient`.) The only in-memory cache in auth-js is for OIDC discovery / JWKS metadata, which is unrelated to `fullResponse`.
- Reserved headers: a caller `Authorization` header is ignored and the telemetry `Auth0-Client` header always wins; `RequestOptions.headers` cannot override them.
- Per-request `customFetch` replaces the base transport for that call but does not inherit mTLS; if you rely on mTLS the supplied fetch must itself be mTLS-capable.

Default to the bare return type. Reach for `fullResponse` only where you actually consumed response metadata on success — rate-limit dashboards, request-id logging for support investigations, or retry-after handling. `MissingCapturedResponseError` is an internal-bug sentinel; you do not normally catch it.

Gotchas:

- **Void methods.** Code that did `const r = await auth0.passwordless.sendEmail(...)` and then checked `r.status === 200` must drop that check — by default the method returns `void` and throws on failure. Rely on the thrown error instead (see [Error model](#4-error-model)).
- **Header reads.** Any code reading `resp.headers.get('x-ratelimit-remaining')` on a **success** path needs the opt-in `fullResponse` envelope. Error paths still surface metadata on the typed error. Search your code for `.headers` on response values.
- **Do not hand-roll a compatibility shim.** Resist reintroducing a custom `{ data, status }` shape to minimize downstream diff. Let the domain object flow through; the SDK's opt-in `fullResponse` envelope is the sanctioned channel when you genuinely need the HTTP Response.

### 2. Casing

node-auth0's public API exposes the **snake_case wire shape** verbatim, on both inputs and outputs. The new SDKs use **camelCase** for the public API and only translate to snake_case at the HTTP boundary internally.

Input parameters — field map:

| node-auth0 (snake_case) | new SDK (camelCase) |
| --- | --- |
| `client_id` | `clientId` |
| `client_secret` | `clientSecret` |
| `refresh_token` | `refreshToken` |
| `redirect_uri` | (via `authorizationParams.redirect_uri` on config / builder) |
| `code_verifier` | `codeVerifier` |
| `phone_number` | `phoneNumber` |
| `auth_req_id` | `authReqId` |
| `binding_message` | `bindingMessage` |
| `subject_token` / `subject_token_type` | `subjectToken` / `subjectTokenType` |
| `given_name` / `family_name` | `givenName` / `familyName` |
| `user_metadata` | `userMetadata` |
| `login_hint` | `loginHint` |

Output fields — `TokenResponse` field map:

| node-auth0 `TokenSet` (snake_case) | new SDK `TokenResponse` (camelCase) |
| --- | --- |
| `access_token` | `accessToken` |
| `refresh_token` | `refreshToken` |
| `id_token` | `idToken` |
| `token_type` | `tokenType` |
| `expires_in` (relative) | `expiresAt` (**absolute — see below**) |
| `scope` | `scope` |
| — (had to decode id_token yourself) | `claims` (already-decoded ID token claims) |
| `authorization_details` | `authorizationDetails` |

Rename fields on both the arguments you pass in and the fields you read out:

```ts
// before
const resp = await auth0.oauth.refreshTokenGrant({ refresh_token: rt });
const newRt = resp.data.refresh_token;
const idToken = resp.data.id_token;

// after
const tokens = await authClient.getTokenByRefreshToken({ refreshToken: rt });
const newRt = tokens.refreshToken;
const idToken = tokens.idToken;
```

> **Gotcha: keys that look renamed but are your data.** `user_metadata` → `userMetadata` is a rename of the *SDK's* parameter. The object *inside* it (e.g. `{ plan: 'free' }`) is passed through untouched. Do not rename your own metadata keys. The same applies to `authorization_details`.

### 3. Token expiry

**This is the highest-risk change in the migration. It is silent, it compiles, and it corrupts session lifetimes.**

- node-auth0 `TokenSet.expires_in` = the token's **lifetime in seconds relative to now** (e.g. `86400` for a 24-hour token). This is the raw OAuth `expires_in` from the wire.
- new SDK `TokenResponse.expiresAt` = an **absolute Unix timestamp in seconds** (e.g. `1786000000`) computed by the SDK as roughly `now + expires_in`.

Existing node-auth0 code almost always converts the relative value to an absolute deadline itself:

```ts
// before — very common node-auth0 pattern
const resp = await auth0.oauth.refreshTokenGrant({ refresh_token: rt });
const expiresAtMs = Date.now() + resp.data.expires_in * 1000; // stored deadline
```

If you mechanically rename `expires_in` → `expiresAt` and leave the arithmetic, you get:

```ts
// WRONG — double-counts "now"
const tokens = await authClient.getTokenByRefreshToken({ refreshToken: rt });
const expiresAtMs = Date.now() + tokens.expiresAt * 1000; // ~ now + (now + lifetime) → far future
```

The stored deadline lands decades in the future, so the token is treated as valid long after it has actually expired, producing 401s in production that the app never proactively refreshes.

The rewrite — `expiresAt` is *already* the deadline. Do not add `Date.now()`:

```ts
// after — correct
const tokens = await authClient.getTokenByRefreshToken({ refreshToken: rt });
const expiresAtMs = tokens.expiresAt * 1000; // absolute; convert s → ms only if you store ms
```

If downstream code genuinely needs the *relative* remaining lifetime (e.g. to set a cookie `Max-Age`), compute it from the absolute value:

```ts
const secondsRemaining = tokens.expiresAt - Math.floor(Date.now() / 1000);
```

To find every instance, grep your code for these patterns and inspect each by hand:

- `expires_in`
- `Date.now() +` near a token result
- `+ expires` / `* 1000` near a token result
- any stored field named `expiresAt`, `expires_at`, `expiry`, `tokenExpiry` fed from a grant

Every one of these is a candidate for the double-count bug.

> **Session apps get this for free.** If you migrate to server-js, the SDK owns expiry math inside `getAccessToken`. Delete your `Date.now() + expires_in * 1000` bookkeeping entirely.

### 4. Error model

node-auth0 throws a single error type for Authentication API failures:

```ts
class AuthApiError extends Error {
    name: "AuthApiError";
    error: string; // OAuth error code, e.g. 'invalid_grant'
    error_description: string;
    statusCode: number;
    body: string;
    headers: Headers;
}
```

The new SDKs throw **typed, per-operation error classes** — `TokenByCodeError`, `TokenByRefreshTokenError`, `TokenByClientCredentialsError`, `TokenByPasswordError`, `TokenExchangeError`, `TokenRevocationError`, `PasswordlessStartError`, `PasswordlessChallengeError`, `PasswordlessDbGetTokenError`, `MfaEnrollmentError`, and so on. Each carries a structured `.cause` (the underlying OAuth2 error) rather than flat `error` / `error_description` strings.

The rewrite — generic catch:

```ts
// before
try {
    await auth0.oauth.refreshTokenGrant({ refresh_token: rt });
} catch (e) {
    if (e instanceof AuthApiError && e.error === "invalid_grant") {
        // refresh token revoked/expired
    }
}

// after
import { TokenByRefreshTokenError } from "@auth0/auth0-auth-js";
try {
    await authClient.getTokenByRefreshToken({ refreshToken: rt });
} catch (e) {
    if (e instanceof TokenByRefreshTokenError && e.cause?.error === "invalid_grant") {
        // refresh token revoked/expired
    }
}
```

Import the specific error class for the operation you are calling. If you had one broad `catch (e instanceof AuthApiError)` around several different operations, either widen to catch each operation's error type or check the shared base behavior — but prefer the specific type per call site, since it documents which operation can fail.

#### MFA detection — use the type guard, not the string

A very common node-auth0 pattern is detecting `mfa_required` by string comparison to route the user into an MFA challenge:

```ts
// before
try {
    await auth0.oauth.passwordGrant({ username, password });
} catch (e) {
    if (e instanceof AuthApiError && e.error === "mfa_required") {
        // start MFA flow using e (mfa_token is in the body)
    }
}
```

The new SDK provides `isMfaRequiredError()`, a type guard that narrows the error and gives typed access to the MFA context (including the `mfa_token`). Use it instead of matching the string:

```ts
// after
import { isMfaRequiredError } from "@auth0/auth0-auth-js";
try {
    await authClient.getTokenByPassword({ username, password });
} catch (e) {
    if (isMfaRequiredError(e)) {
        // e is narrowed; drive the MFA challenge via authClient.mfa.*
    }
}
```

> After detecting `mfa_required`, the MFA enroll/challenge/verify flow that node-auth0 handled ad hoc now lives on `authClient.mfa.*` (`listAuthenticators`, `enrollAuthenticator`, `challengeAuthenticator`, `verify`, and `deleteAuthenticator`). In server-js, `serverClient.mfa.verify()` also persists the resulting tokens to the session.

#### ID-token validation types

node-auth0 exposed `IDTokenValidateOptions` and `IdTokenValidatorError` for callers doing manual ID-token validation. The new SDK validates ID tokens internally during grants and exposes the decoded, validated result as `TokenResponse.claims`. Replace manual validation:

- Options like `organization`, `nonce`, `maxAge` are passed to the grant call (e.g. `getTokenByCode`), and the SDK validates them and throws a typed error on mismatch — you no longer construct a validator or catch `IdTokenValidatorError` yourself.
- Read the validated claims from `TokenResponse.claims` instead of decoding the `id_token` string.

## Session apps: wiring the auth0-server-js session layer

Read this section only when routing to **`@auth0/auth0-server-js`** — when you want the SDK to own the login redirect flow, session storage, cookies, token refresh, and logout, instead of hand-rolling that around node-auth0.

**This is a rewrite of the session handling, not a method-for-method port.** node-auth0 had no session concept, so there is nothing to translate line-for-line. Instead you *replace* your existing session code (your `express-session` wiring, your token cache, your refresh-on-expiry logic, your logout handler) with the ServerClient lifecycle. You still touch only the auth/session code — routes, views, and business logic stay put.

### Mental model

A ServerClient login has three durable pieces:

1. **Transaction store** — short-lived. Holds the in-flight login: the OAuth `state` and the PKCE `code_verifier` between the moment you redirect the user to Auth0 and the moment they come back to your callback. Created at `startInteractiveLogin`, consumed at `completeInteractiveLogin`.
2. **State store** — long-lived. Holds the established session: the user claims plus the access / refresh / ID tokens and their absolute expiry. Read on every subsequent request via `getUser`, `getSession`, `getAccessToken`.
3. **Cookies** — how the two stores key themselves to the browser. With a *stateless* store the session data lives encrypted in the cookie itself; with a *stateful* store the cookie holds only an identifier and the data lives in your backend (Redis, DB, …).

node-auth0 exposed none of this; you built equivalents by hand. You are swapping your implementation for the SDK's.

### Store setup

`@auth0/auth0-server-js` ships store base classes and cookie-backed implementations:

- `CookieTransactionStore` — transaction store backed entirely by a cookie. Good default.
- `StatelessStateStore` — session lives encrypted in the cookie. No server-side storage; good for serverless / horizontally-scaled deployments with small sessions.
- `StatefulStateStore` — session lives server-side; the cookie holds an id. Use for large sessions or when you need server-side revocation.
- `AbstractTransactionStore` / `AbstractStateStore` — extend these to back a store with your own storage (Redis, Postgres, etc.). These are the exported base-class names.

All stores accept a `CookieHandler` so they can integrate with any framework's cookie API. The `storeOptions` generic (`TStoreOptions`) is how you thread per-request context (like the framework `req`/`res`) into store reads/writes — every ServerClient method takes an optional trailing `storeOptions` argument for exactly this.

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

### The redirect-login lifecycle

#### 1. Start login — replace the hand-built `/authorize` redirect

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
        { req, res }, // storeOptions — lets the transaction store write its cookie
    );
    res.redirect(authorizationUrl.href);
});
```

`startInteractiveLogin` generates `state` + PKCE, writes them to the transaction store, and returns the fully-formed authorization URL.

#### 2. Complete login — replace the manual code exchange

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

#### 3. Read the user / session on later requests

Replace `req.session.user` reads:

```ts
const user = await serverClient.getUser({ req, res }); // user claims, or undefined
const session = await serverClient.getSession({ req, res }); // full session data, or undefined
```

`getUser` / `getSession` return `undefined` when there is no session or it has expired (the store deletes expired sessions on read), so use that as your "not logged in" signal.

#### 4. Get an access token to call an API — refresh is automatic

Replace your manual "is the token expired? if so refresh" block:

```ts
const { accessToken } = await serverClient.getAccessToken({ req, res });
// If the stored access token is expired and a refresh token exists,
// the SDK refreshes and persists the new tokens transparently.
```

This is where the `expires_in` → `expiresAt` hazard disappears entirely: the SDK owns expiry math. For a downstream federated connection token (Token Vault), use `serverClient.getAccessTokenForConnection({ connection }, { req, res })`.

#### 5. Logout — replace manual revoke + session clear + `/v2/logout` redirect

```ts
// GET /logout
app.get("/logout", async (req, res) => {
    const logoutUrl = await serverClient.logout({ returnTo: "https://app.example.com" }, { req, res });
    res.redirect(logoutUrl.href);
});
```

`logout` clears the session from the state store and returns the Auth0 `/v2/logout` URL. If you also revoked the refresh token on logout (via `oauth.revokeRefreshToken`), call `serverClient.revokeRefreshToken({ req, res })` before redirecting — by default it reads the refresh token from the session, so you do not handle the raw token yourself (it also accepts an explicit `{ token }` if you need to revoke a specific one).

### Non-redirect logins that establish a session

If you used node-auth0 for a non-redirect login (password grant, passwordless, CIBA, custom token exchange) *and* want a server-js session out of it, use the ServerClient methods that both authenticate and write the session, rather than the low-level auth-js grants:

| Flow | ServerClient method |
| --- | --- |
| Backchannel / CIBA | `loginBackchannel({ ... }, storeOptions)` |
| Passwordless (send) | `startPasswordless({ connection, email \| phoneNumber, ... }, storeOptions)` |
| Passwordless (verify code → session) | `completePasswordless({ connection, email \| phoneNumber, verificationCode }, storeOptions)` |
| Passwordless magic link (callback → session) | `completePasswordlessMagicLink(url, storeOptions)` |
| Custom token exchange → session | `loginWithCustomTokenExchange({ ... }, storeOptions)` |
| MFA verify → session | `serverClient.mfa.verify({ ... }, storeOptions)` |

Each of these performs the underlying grant *and* persists the resulting tokens to the state store, so the user is logged in afterward — exactly the behavior you previously wrote by hand after a node-auth0 grant.

### Backchannel logout

If you implemented an Auth0 back-channel logout endpoint by hand (validating the logout token, then clearing your session store), replace it with:

```ts
// POST /backchannel-logout
app.post("/backchannel-logout", async (req, res) => {
    await serverClient.handleBackchannelLogout(req.body.logout_token, { req, res });
    res.sendStatus(204);
});
```

It validates the logout token and clears the corresponding session.

## Verification checklist

The migration is not complete until every check passes in a single pass. For every node-auth0 auth call you rewrote, confirm all four cross-cutting changes:

- [ ] **Return shape** — removed `.data` / `.status` / `.headers` access on the success path.
- [ ] **Casing** — renamed every snake_case field on input args and output reads to camelCase.
- [ ] **Expiry** — any code using the old `expires_in` now uses `expiresAt` as an *absolute* timestamp; no `Date.now() +` was left in front of it.
- [ ] **Errors** — `AuthApiError` catches replaced with the specific typed error (`.cause.error`); `mfa_required` string checks replaced with `isMfaRequiredError()`.

Then run the project gates and repeat the whole loop if any step fails:

- [ ] Grep for residue: unmigrated `from 'auth0'` auth imports, `.data.` reads on auth responses, and relative `expires_in` arithmetic.
- [ ] `tsc --noEmit` — catches structural mismatches and type errors.
- [ ] `npm test` (or the project's test command) — confirms behavior is preserved.
- [ ] Run the linter if the project has one configured.
- [ ] Confirm files that use `ManagementClient` still import and call it from `auth0` — that code must be untouched.

Do not declare the migration complete until the loop converges — all steps pass in a single iteration.

## FAQ and gotchas

**Do I have to migrate the Management API too?**
No. `ManagementClient` is out of scope and stays on the `auth0` package. A file importing both `auth0` (for management) and `@auth0/auth0-auth-js` (for authentication) is correct.

**auth0-auth-js or auth0-server-js — which do I pick?**
Default to auth0-auth-js for a faithful, low-risk parity migration. Pick auth0-server-js only when you want the SDK to own the login redirect flow, session storage, cookies, refresh, and logout. See [Choosing your target SDK](#choosing-your-target-sdk).

**My tokens suddenly look valid for decades. What happened?**
You almost certainly left `Date.now() +` in front of `expiresAt`. `expiresAt` is already an absolute Unix timestamp, not a relative lifetime. See [Token expiry](#3-token-expiry).

**Where did `resp.data` go?**
The new SDKs return the domain object directly. Read `tokens.accessToken`, not `resp.data.access_token`. If you truly need HTTP response metadata on a success path, opt into `fullResponse` — but note that flag is part of the [post-1.12.1 caveat](#the-requestoptions--fullresponse-caveat).

**My magic-link passwordless flow stopped sending links.**
The `send` default changed from `'link'` (node-auth0) to `'code'` (new SDK). Set `send: 'link'` explicitly if you want magic links.

**Where is `getUserInfo`?**
Prefer `TokenResponse.claims` — they are already decoded and validated, with no extra round-trip. `authClient.getUserInfo({ accessToken })` lands when auth0-auth-js PR #228 merges. In a session app, use `serverClient.getUser()`. As a last resort on older versions, fetch `metadata.userinfo_endpoint` directly. See [UserInfoClient](#userinfoclient).

**Can I still set a global `headers` / `timeout` / `agent` on the client?**
Not on the constructor. Move them to the per-call `RequestOptions` argument (`headers`, `signal: AbortSignal.timeout(ms)`) or wrap `customFetch`. `RequestOptions` is part of the [post-1.12.1 caveat](#the-requestoptions--fullresponse-caveat).

**How do I detect `mfa_required` now?**
Use the `isMfaRequiredError()` type guard, not a string comparison. It narrows the error and exposes the `mfa_token`. Drive the challenge via `authClient.mfa.*`. See [Error model](#4-error-model).
