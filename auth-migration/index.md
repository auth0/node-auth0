# Authentication Migration Guide

A guide to migrating your authentication code off the `auth0` package (node-auth0) to the modern Auth0 server SDKs: [`@auth0/auth0-auth-js`](https://github.com/auth0/auth0-auth-js) for stateless token grants, and [`@auth0/auth0-server-js`](https://github.com/auth0/auth0-server-js) for server-managed sessions.

This guide covers **only the Authentication API layer** — `AuthenticationClient`, its sub-clients, and `UserInfoClient`. The Management API (`ManagementClient`) is **not** part of this migration and stays on the `auth0` package. It is normal and correct for a file to keep importing `auth0` for management while importing `@auth0/auth0-auth-js` for authentication.

> **Migrating with an AI agent?** Point it at the Auth0 migration skill first. The skill lives in [`auth0/agent-skills`](https://github.com/auth0/agent-skills) as the `auth0` skill (migration intent: `migrate-node-auth0`). It encodes the target-SDK routing, the four cross-cutting breaking changes, the method-by-method mapping, and a build-until-green verify loop — so even a smaller model follows the exact rewrite rules instead of guessing. This document is the human-facing companion; the skill is the agent-facing one. They stay in sync.

## Contents

- [How to use this guide](#how-to-use-this-guide)
- [Optional: migrate only OIDC while staying on v6](#optional-migrate-only-oidc-while-staying-on-v6)
- [Overview](#overview)
    - [Who this is for](#who-this-is-for)
    - [Scope](#scope)
- [Choosing your target SDK](#choosing-your-target-sdk)
- [Prerequisites](#prerequisites)
- [Installation and constructor mapping](#installation-and-constructor-mapping)
- [OIDC token grants](#oidc-token-grants)
- [Cross-cutting breaking changes](#cross-cutting-breaking-changes)
    - [1. Return shape](#1-return-shape)
    - [2. Casing](#2-casing)
    - [3. Token expiry](#3-token-expiry)
    - [4. Error model](#4-error-model)
- [Verification checklist](#verification-checklist)
- Incremental pages:
    - [`authentication-flows.md`](./authentication-flows.md) — database, passwordless, CIBA, token exchange, `UserInfoClient`
    - [`server-side-sessions.md`](./server-side-sessions.md) — the `@auth0/auth0-server-js` session layer
    - [`troubleshooting.md`](./troubleshooting.md) — FAQ and gotchas

## How to use this guide

This is a reference, not a linear read. You do not have to work through it top to bottom — migrate only the flows your app actually uses, in whatever order suits you. Most apps finish after the P0 section below.

The work falls into three phases:

| Phase | What you do | Where |
| --- | --- | --- |
| **Before** — orient and set up | Pick your target SDK, check prerequisites, install the package, map constructor options. | [Choosing your target SDK](#choosing-your-target-sdk), [Prerequisites](#prerequisites), [Installation and constructor mapping](#installation-and-constructor-mapping) |
| **During** — rewrite call sites | Rewrite the OIDC token grants (P0, in this file), then the other flows and the session layer as needed. Apply the four cross-cutting breaking changes to every call site. | [OIDC token grants](#oidc-token-grants), [Cross-cutting breaking changes](#cross-cutting-breaking-changes), [`authentication-flows.md`](./authentication-flows.md), [`server-side-sessions.md`](./server-side-sessions.md) |
| **After** — verify | Run the build-until-green checklist; confirm no residue and that `ManagementClient` code is untouched. | [Verification checklist](#verification-checklist) |

Priority order, if you want one: **P0** (OIDC grants + cross-cutting changes — the whole job for most apps) → **P1** ([other flows](./authentication-flows.md), only the ones you use) → **P2** ([session apps](./server-side-sessions.md), only if you want the SDK to own sessions). Stuck? See [`troubleshooting.md`](./troubleshooting.md).

## Optional: migrate only OIDC while staying on v6

This is an optional, lower-commitment path — not the scope of this guide. The full guide covers every Authentication API flow; this section is for readers who want to migrate *only* their OIDC code and stop there.

You do not have to migrate everything at once, and you do not have to wait for v7. node-auth0 v6 still ships `AuthenticationClient` alongside `ManagementClient`, so you can move your OIDC login and token-grant code off `AuthenticationClient` to `@auth0/auth0-auth-js` **now**, incrementally, while the rest of the app keeps using `auth0` v6 unchanged.

A common and fully supported end state:

- OIDC / token-grant code → migrated to `@auth0/auth0-auth-js` (the P0 section below).
- Other auth flows you have not gotten to yet → still on `AuthenticationClient` from `auth0` v6.
- Management API → still on `ManagementClient` from `auth0` (never migrates).

Start with the P0 section. It is the OIDC migration on its own; finishing it is a complete, shippable step even if you migrate nothing else. Move on to [`authentication-flows.md`](./authentication-flows.md) and [`server-side-sessions.md`](./server-side-sessions.md) later, at your own pace. When you eventually upgrade to v7 (which removes the Authentication API from the main entrypoint — see the [v7 Migration Guide](../v7_MIGRATION_GUIDE.md)), the OIDC work is already done.

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
| Only performs token grants / DB signup / passwordless / userinfo and manages its own session (or is a machine-to-machine service backend) | **`@auth0/auth0-auth-js`** | Direct, near 1:1 replacement for `AuthenticationClient`. Same stateless model. |
| Wants the SDK to own the login redirect flow, session storage, cookies, token refresh, and logout (a server-rendered web app) | **`@auth0/auth0-server-js`** | Adds a session layer node-auth0 never had. This is a rewrite of the session handling, not a method-for-method port. |

**Default recommendation:** start with **`@auth0/auth0-auth-js`** for a faithful parity migration. Choose **`@auth0/auth0-server-js`** only when you currently hand-roll session/cookie/refresh logic around node-auth0 and would benefit from the SDK owning it.

### Signals

Signals that point to **auth0-auth-js**:

- Predominant use is `clientCredentialsGrant` (machine-to-machine). There is no user, so there is no session to own.
- The app already has a session framework it is happy with and only calls node-auth0 for token grants.
- The app is an API, worker, or CLI, not a browser-facing web server.
- You want the smallest, most mechanical, lowest-risk migration.

Signals that point to **auth0-server-js**:

- The app performs a browser redirect login and reads `req.session.user` (or equivalent) on later requests.
- You wrote refresh-on-expiry logic, a token cache, or logout-with-revocation by hand.
- You use `express-openid-connect` today and want a first-party, framework-agnostic replacement.
- You are on a server framework (Express, Fastify, Hono, Next.js) and want the SDK to manage cookies.

### Mixing both

A single app can use both: auth0-server-js for the user-facing login/session, and auth0-auth-js directly for a separate machine-to-machine `clientCredentialsGrant` to call another API. `ServerClient` even exposes the underlying `AuthClient` via `serverClient.authClient` for occasional low-level needs. Do not force everything onto one package.

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

`ServerClient` wraps an `AuthClient` and adds the session machinery. It shares the auth options and **adds required stores**. This constructor and the stores it needs are covered in [`server-side-sessions.md`](./server-side-sessions.md); reach for it only when you route to server-js.

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

## OIDC token grants

This is the core of the migration and, for most apps, the whole of it. These are the `AuthenticationClient.oauth.*` grants that drive OpenID Connect login and machine-to-machine token acquisition. All of them move onto the `AuthClient` instance directly (not a sub-client).

Before you touch any method, internalize the four [cross-cutting breaking changes](#cross-cutting-breaking-changes) — they apply to *every* rewrite here and on the incremental pages.

Naming conventions used throughout:

| node-auth0 | new SDKs |
| --- | --- |
| Params and response fields use the snake_case wire shape: `client_id`, `refresh_token`, `access_token`, `expires_in`, `phone_number` | camelCase: `clientId`, `refreshToken`, `accessToken`, `expiresAt`, `phoneNumber` |
| Methods take a `bodyParameters` object (+ optional `initOverrides`) | Methods take a single `options` object (+ optional trailing `RequestOptions` for per-call `signal`, `headers`, `customFetch`) |
| Every method returns a `JSONApiResponse<T>` / `VoidApiResponse` / `TextApiResponse` wrapper | Methods return the domain object directly (`TokenResponse`, `SignUpResult`, `string`, `void`) |

### `oauth.authorizationCodeGrant` → `getTokenByCode`

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

### `oauth.authorizationCodeGrantWithPKCE` → `getTokenByCode` (with verifier)

PKCE (Proof Key for Code Exchange) is folded into the same method; supply the code verifier via options. Typically the verifier was produced earlier by `buildAuthorizationUrl` (below), which returns a `codeVerifier` for you to persist.

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

### `oauth.refreshTokenGrant` → `getTokenByRefreshToken`

```ts
// before
const resp = await auth0.oauth.refreshTokenGrant({ refresh_token: rt });
// after
const tokens = await authClient.getTokenByRefreshToken({ refreshToken: rt });
```

### `oauth.passwordGrant` → `getTokenByPassword`

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

### `oauth.clientCredentialsGrant` → `getTokenByClientCredentials`

The canonical machine-to-machine grant. This is the most common reason to stay on auth0-auth-js rather than adopt server-js — there is no user session involved.

```ts
// before
const resp = await auth0.oauth.clientCredentialsGrant({ audience: "https://api.example.com" });
const token = resp.data.access_token;
// after
const tokens = await authClient.getTokenByClientCredentials({ audience: "https://api.example.com" });
const token = tokens.accessToken;
```

### `oauth.revokeRefreshToken` → `revokeToken`

Renamed, and simplified return (was `VoidApiResponse`, now `void`).

```ts
// before
await auth0.oauth.revokeRefreshToken({ token: rt });
// after
await authClient.revokeToken({ token: rt });
```

> **Session apps:** if you are migrating to server-js and this revoke was part of logout, use `serverClient.revokeRefreshToken()` (by default it reads the refresh token from the session; you can also pass an explicit `{ token }` in its options) instead of the low-level `revokeToken`.

### Build the authorization and logout URLs

node-auth0 left `/authorize` URL construction to the caller (or to `express-openid-connect`). The new SDK gives you `buildAuthorizationUrl()` and `buildLogoutUrl()`. When migrating a redirect login, replace hand-built `/authorize` and `/v2/logout` URLs with these:

```ts
const { authorizationUrl, codeVerifier } = await authClient.buildAuthorizationUrl({
    authorizationParams: { redirect_uri, scope: "openid profile email", audience },
});
// ... later, on logout:
const logoutUrl = await authClient.buildLogoutUrl({ returnTo: "https://app.example.com" });
```

> **Pushed Authorization Requests (PAR):** there is no standalone PAR method. Pass `pushedAuthorizationRequests: true` to `buildAuthorizationUrl` — the SDK performs the PAR POST and returns an authorization URL that references the resulting `request_uri`. Requires the tenant to expose a `pushed_authorization_request_endpoint`; the SDK throws if PAR is requested but unsupported. This replaces node-auth0's `oauth.pushedAuthorization`.

Once the OIDC grants are rewritten and the [cross-cutting breaking changes](#cross-cutting-breaking-changes) are applied, run the [verification checklist](#verification-checklist). If your app also uses database, passwordless, CIBA, token exchange, or `UserInfoClient`, continue with [`authentication-flows.md`](./authentication-flows.md). If you want the SDK to own sessions, see [`server-side-sessions.md`](./server-side-sessions.md).

## Cross-cutting breaking changes

Every call-site rewrite in this guide and on the incremental pages is subject to four changes that cut across all methods. They cause the overwhelming majority of migration defects, and three of the four are *silent* — the code compiles and often runs, but produces wrong behavior at runtime. Apply each one deliberately.

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
- Per-request `customFetch` replaces the base transport for that call but does not inherit mutual TLS (mTLS); if you rely on mTLS the supplied fetch must itself be mTLS-capable.

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

Multi-factor authentication (MFA). A very common node-auth0 pattern is detecting `mfa_required` by string comparison to route the user into an MFA challenge:

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

## Verification checklist

The migration is not complete until every check passes in a single pass. For every node-auth0 auth call you rewrote — here or on the incremental pages — confirm all four cross-cutting changes:

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

## Troubleshooting

Common questions and failure modes (tokens valid for decades, missing `resp.data`, magic-link default flip, `getUserInfo`, `mfa_required` detection, global config) live in [`troubleshooting.md`](./troubleshooting.md).
