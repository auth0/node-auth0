# Migrating the other authentication flows

This is the incremental part of the [Authentication Migration Guide](../AUTH_MIGRATION_GUIDE.md). Start with the guide's P0 sections (OIDC token grants and the four cross-cutting breaking changes) before you touch anything here. Everything below builds on those changes, so apply them to every rewrite on this page too.

> **Migrating with an AI agent?** Point it at the Auth0 migration skill (the `auth0` skill in [`auth0/agent-skills`](https://github.com/auth0/agent-skills), migration intent `migrate-node-auth0`). It encodes these mappings and a verify loop so smaller models follow them exactly.

Migrate one flow at a time. Only the flows your app actually uses need attention; skip the rest.

- [Database connections](#database-connections)
- [Passwordless](#passwordless)
- [Backchannel authentication (CIBA)](#backchannel-authentication-ciba)
- [Token exchange (RFC 8693)](#token-exchange-rfc-8693)
- [UserInfoClient](#userinfoclient)
- [Quick lookup table](#quick-lookup-table)

Unless a row routes explicitly to `@auth0/auth0-server-js`, the replacement lives on the `@auth0/auth0-auth-js` `AuthClient` (or a sub-client: `authClient.database`, `authClient.passwordless`, `authClient.mfa`, `authClient.passkey`).

## Database connections

Database connection operations move to the `authClient.database` sub-client. Names and required parameters stay the same; only casing and return shape change.

### `database.signUp` → `authClient.database.signUp`

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

### `database.changePassword` → `authClient.database.changePassword`

node-auth0 returned a `TextApiResponse` (read via `.data`); the new SDK returns the plain `string` directly.

```ts
// before
const resp = await auth0.database.changePassword({ email, connection: "Username-Password-Authentication" });
const message = resp.data; // plain-text confirmation
// after
const message = await authClient.database.changePassword({ email, connection: "Username-Password-Authentication" });
```

> `changePassword` requires `connection` plus at least one of `email` or `username` — either identifier is accepted, not `email` alone.

## Passwordless

node-auth0 lumped "start" (send the code or link) and "login" (redeem the code) onto one sub-client. The new SDK splits them: starting stays on `authClient.passwordless`; redeeming a code becomes a top-level grant method on `AuthClient`.

### `passwordless.sendEmail` → `authClient.passwordless.sendEmail`

```ts
// before
await auth0.passwordless.sendEmail({ email, send: "code" });
// after
await authClient.passwordless.sendEmail({ email, send: "code" });
```

> **Default changed.** node-auth0 defaulted `send` to `'link'` (magic link). The new SDK defaults `send` to `'code'` (one-time password). If you relied on the implicit default to send magic links, set `send: 'link'` explicitly.

### `passwordless.sendSMS` → `authClient.passwordless.sendSms`

Note the casing change: `sendSMS` → `sendSms`, and `phone_number` → `phoneNumber`.

```ts
// before
await auth0.passwordless.sendSMS({ phone_number: "+15551234567" });
// after
await authClient.passwordless.sendSms({ phoneNumber: "+15551234567" });
```

### `passwordless.loginWithEmail` → `getTokenByPasswordlessEmail`

Redeeming the one-time password is now a grant method on `AuthClient`, not on the passwordless sub-client.

```ts
// before
const resp = await auth0.passwordless.loginWithEmail({ email, code, audience, scope });
const token = resp.data.access_token;
// after
const tokens = await authClient.getTokenByPasswordlessEmail({ email, code, audience, scope });
const token = tokens.accessToken;
```

### `passwordless.loginWithSMS` → `getTokenByPasswordlessSms`

```ts
// before
const resp = await auth0.passwordless.loginWithSMS({ phone_number, code });
// after
const tokens = await authClient.getTokenByPasswordlessSms({ phoneNumber, code });
```

> **Session apps:** `@auth0/auth0-server-js` exposes `startPasswordless` / `completePasswordless` / `completePasswordlessMagicLink`, which both send the code and establish a session. Use those instead of the two-step auth-js flow when the SDK owns the session. See [Migrating session apps](./sessions.md).

## Backchannel authentication (CIBA)

CIBA is Client-Initiated Backchannel Authentication.

### `backchannel.authorize` → `initiateBackchannelAuthentication`

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

### `backchannel.backchannelGrant` → `backchannelAuthenticationGrant`

```ts
// before
const resp = await auth0.backchannel.backchannelGrant({ auth_req_id: authReqId });
// after
const tokens = await authClient.backchannelAuthenticationGrant({ authReqId });
```

> **One-shot convenience:** `authClient.backchannelAuthentication({ ... })` initiates and polls to completion, returning a `TokenResponse`. Use it if your code did the initiate-then-poll loop by hand.
>
> **Session apps:** `@auth0/auth0-server-js` exposes `loginBackchannel(...)`, which runs CIBA and establishes a session in one call. See [Migrating session apps](./sessions.md).

## Token exchange (RFC 8693)

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

> `exchangeToken` is overloaded: a custom-exchange profile shape (`subjectTokenType` + `subjectToken` + `audience`) and a Token Vault shape (`connection` present). Presence of `connection` routes to the vault path. The custom-exchange profile is the RFC 8693 replacement for `tokenExchange.exchangeToken`.
>
> **Session apps:** `@auth0/auth0-server-js` exposes `loginWithCustomTokenExchange` (exchange, then establish a session) and `customTokenExchange` (exchange, then return tokens with no session).

## UserInfoClient

The standalone `UserInfoClient` from node-auth0 does not exist in the new SDK. Choose the replacement based on what the app needs:

| Your intent | Replacement |
| --- | --- |
| Wanted user profile claims right after login | Read `TokenResponse.claims` from the grant result — the SDK already decodes the ID token. No extra `/userinfo` round-trip needed. **Preferred.** |
| Wanted a live `/userinfo` response for an arbitrary access token (auth-js, when [PR #228](https://github.com/auth0/auth0-auth-js/pull/228) merges) | `await authClient.getUserInfo({ accessToken })` — direct method on `AuthClient`. |
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

**After — direct method (auth0-auth-js, when [PR #228](https://github.com/auth0/auth0-auth-js/pull/228) merges), when you only have an access token:**

```ts
// Takes an options object: { accessToken, expectedSubject? }
const profile = await authClient.getUserInfo({ accessToken });
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

## Quick lookup table

The complete node-auth0 → new SDK map, including the OIDC methods covered in the main guide.

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
| `UserInfoClient.getUserInfo` | `TokenResponse.claims` (preferred) / `authClient.getUserInfo({ accessToken })` (auth-js, when [PR #228](https://github.com/auth0/auth0-auth-js/pull/228) merges) / `serverClient.getUser()` / raw `/userinfo` fetch | auth-js / server-js |
| (no equivalent) — build `/authorize` URL | `authClient.buildAuthorizationUrl({ ... })` | auth-js |
| (no equivalent) — build `/v2/logout` URL | `authClient.buildLogoutUrl({ returnTo })` | auth-js |
| `ManagementClient.*` | **not migrated — stays on `auth0`** | — |

When you finish a flow, return to the [verification checklist](../AUTH_MIGRATION_GUIDE.md#verification-checklist) and confirm the four cross-cutting changes for every call site you touched.
