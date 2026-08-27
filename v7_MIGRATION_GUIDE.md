# V7 Migration Guide

A guide to migrating the Auth0 Node.js SDK from `6.x` to `7.x`.

- [Overall changes](#overall-changes)
- [Breaking changes](#breaking-changes)
    - [Authentication API removed from the main entrypoint](#authentication-api-removed-from-the-main-entrypoint)
    - [Removed exports](#removed-exports)
    - [ManagementClient mTLS requires an explicit `fetch`](#managementclient-mtls-requires-an-explicit-fetch)
    - [mTLS and client assertion are mutually exclusive](#mtls-and-client-assertion-are-mutually-exclusive)
    - [`domain` must be a bare hostname](#domain-must-be-a-bare-hostname)
    - [Token acquisition failures throw `ManagementError`](#token-acquisition-failures-throw-managementerror)
    - [`uuid` dependency removed](#uuid-dependency-removed)
- [Migrating authentication code](#migrating-authentication-code)
- [Staying on the legacy entrypoint](#staying-on-the-legacy-entrypoint)

## Overall changes

V7 makes `node-auth0` a **Management-API-only SDK**. The Authentication API layer — `AuthenticationClient`, its sub-clients, and `UserInfoClient` — has been removed from the main entrypoint. `ManagementClient` continues to work exactly as before; it now acquires its internal token directly via the client credentials grant rather than through the removed authentication layer.

If your code only uses `ManagementClient`, the upgrade is small: address the Management-side breaking changes below (mTLS, domain validation, error type) and you are done. If your code uses `AuthenticationClient` or `UserInfoClient`, that code must move to a dedicated package — see [Migrating authentication code](#migrating-authentication-code).

## Breaking changes

### Authentication API removed from the main entrypoint

`AuthenticationClient` and `UserInfoClient` are no longer exported from the `auth0` main entrypoint. The stateless authentication layer now lives in [`@auth0/auth0-auth-js`](https://github.com/auth0/auth0-auth-js), and the server-managed session layer lives in [`@auth0/auth0-server-js`](https://github.com/auth0/auth0-server-js).

**Before (v6):**

```ts
import { AuthenticationClient, UserInfoClient } from "auth0";

const auth = new AuthenticationClient({ domain, clientId, clientSecret });
const tokens = await auth.oauth.clientCredentialsGrant({ audience });
```

**After (v7):**

```ts
import { AuthClient } from "@auth0/auth0-auth-js";

const auth = new AuthClient({ domain, clientId, clientSecret });
const tokens = await auth.getTokenByClientCredentials({ audience });
```

The complete method-by-method mapping, the four cross-cutting behavior changes (return shape, casing, token expiry, error model), and the session-app wiring are documented in the dedicated [Authentication Migration Guide](https://github.com/auth0/node-auth0/blob/master/AUTH_MIGRATION_GUIDE.md). This guide does not repeat that detail.

If you need the old clients unchanged as a stopgap, they still ship from the [legacy entrypoint](#staying-on-the-legacy-entrypoint).

### Removed exports

The following symbols were exported from the main entrypoint in v6 and are removed in v7. Each moves to `@auth0/auth0-auth-js`, or remains available from the `auth0/legacy` entrypoint at its v4.x shape.

| Removed export (v6)          | Replacement in v7                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `AuthenticationClient`       | `AuthClient` from `@auth0/auth0-auth-js`                                               |
| `UserInfoClient`             | `AuthClient.getUserInfo()` from `@auth0/auth0-auth-js`, or read `TokenResponse.claims` |
| `AuthApiError`               | Per-operation typed errors from `@auth0/auth0-auth-js` (`TokenByCodeError`, `TokenByRefreshTokenError`, …); use their `.cause` |
| `AuthenticationClientOptions`| `AuthClientOptions` from `@auth0/auth0-auth-js`                                        |
| `IDTokenValidateOptions`     | Validation is internal to the grant call; pass `organization` / `nonce` / `maxAge` to the grant and read `TokenResponse.claims` |
| `IdTokenValidatorError`      | Thrown internally by the grant as a typed error on claim mismatch                      |
| `TokenSet`                   | `TokenResponse` from `@auth0/auth0-auth-js` (camelCase fields; `expiresAt` is absolute) |
| `SUBJECT_TOKEN_TYPES`        | Pass the token-type URN string directly to `exchangeToken` in `@auth0/auth0-auth-js`   |
| `UserInfoResponse`           | Return type of `AuthClient.getUserInfo()` in `@auth0/auth0-auth-js`                    |
| `UserInfoError`              | Typed error from `AuthClient.getUserInfo()` in `@auth0/auth0-auth-js`                   |

`ManagementClient`, the `Management` namespace, and `ManagementError` are unchanged and still exported.

### ManagementClient mTLS requires an explicit `fetch`

A `ManagementClient` constructed with `useMTLS: true` must now supply an explicit `fetch` option carrying the client certificate. The client throws at construction if `useMTLS` is set without a `fetch`. Previously a missing fetch surfaced as silent `401`s at request time; failing at construction makes the misconfiguration obvious.

The token endpoint automatically uses the `mtls.{domain}` host when `useMTLS` is enabled.

```ts
// v7 — throws at construction if `fetch` is omitted
const mgmt = new ManagementClient({
    domain,
    clientId,
    clientSecret,
    useMTLS: true,
    fetch: mtlsCapableFetch, // now required
});
```

### mTLS and client assertion are mutually exclusive

`useMTLS: true` and `clientAssertionSigningKey` cannot be combined — they select incompatible token-endpoint authentication methods. Supplying both now throws at construction. `useMTLS` has been removed from the `ManagementClientOptionsWithClientAssertion` type.

### `domain` must be a bare hostname

`domain` must be a bare host such as `tenant.us.auth0.com`. A value containing a scheme, slashes, or a query string now throws at construction instead of producing malformed request URLs later.

```ts
// throws in v7
new ManagementClient({ domain: "https://tenant.us.auth0.com/", ... });
// correct
new ManagementClient({ domain: "tenant.us.auth0.com", ... });
```

### Token acquisition failures throw `ManagementError`

When the internal client-credentials token request fails, the client now throws a `ManagementError` (previously a plain `Error`). The error carries `statusCode` and a parsed `body` with the OAuth error details. A request that exceeds the 10-second timeout throws `ManagementError` with status `408`.

```ts
import { ManagementError } from "auth0";

try {
    await mgmt.users.getAll();
} catch (e) {
    if (e instanceof ManagementError) {
        console.error(e.statusCode, e.body);
    }
}
```

### `uuid` dependency removed

The `uuid` package is no longer a dependency. If your project imported `uuid` transitively through `auth0`, add it to your own `dependencies`.

## Migrating authentication code

If your app calls `AuthenticationClient` or `UserInfoClient`, follow the dedicated [Authentication Migration Guide](https://github.com/auth0/node-auth0/blob/master/AUTH_MIGRATION_GUIDE.md). It covers:

- Choosing between `@auth0/auth0-auth-js` (stateless token grants) and `@auth0/auth0-server-js` (server-managed sessions).
- The complete method-by-method API mapping for `.oauth`, `.database`, `.passwordless`, `.backchannel`, `.tokenExchange`, and `UserInfoClient`.
- The four cross-cutting behavior changes: return shape (envelope dropped), casing (snake_case → camelCase), token expiry (`expires_in` relative → `expiresAt` absolute — a silent, high-risk change), and the typed error model with `isMfaRequiredError()`.
- Wiring the `auth0-server-js` session lifecycle when you want the SDK to own login, cookies, refresh, and logout.

The Management API is explicitly out of scope in that guide — a file that keeps using `ManagementClient` from `auth0` while importing `@auth0/auth0-auth-js` for authentication is correct and expected.

## Staying on the legacy entrypoint

If you cannot migrate the authentication code immediately, the `auth0/legacy` entrypoint still ships `AuthenticationClient` and `UserInfoClient` at their v4.x configuration format and method signatures. This is a stopgap, not a destination — the legacy shapes differ from the current API and will not receive new features.

```ts
import { AuthenticationClient } from "auth0/legacy";
```

Plan the move to `@auth0/auth0-auth-js` / `@auth0/auth0-server-js` rather than treating the legacy entrypoint as permanent.
