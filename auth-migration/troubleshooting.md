# Troubleshooting: FAQ and gotchas

Common questions and failure modes when migrating off the `auth0` package's Authentication API. This page is part of the [Authentication Migration Guide](./index.md); it assumes the terms defined there.

> **Migrating with an AI agent?** Point it at the Auth0 migration skill (the `auth0` skill in [`auth0/agent-skills`](https://github.com/auth0/agent-skills), migration intent `migrate-node-auth0`).

**Do I have to migrate everything at once?**
No. The OIDC / token-grant work is a complete, shippable step on its own. You can stay on `auth0` v6 and migrate only OIDC, leaving other auth flows on `AuthenticationClient` for now. See [Optional: migrate only OIDC while staying on v6](./index.md#optional-migrate-only-oidc-while-staying-on-v6).

**Do I have to migrate the Management API too?**
No. `ManagementClient` is out of scope and stays on the `auth0` package. A file importing both `auth0` (for management) and `@auth0/auth0-auth-js` (for authentication) is correct.

**auth0-auth-js or auth0-server-js: which do I pick?**
Default to auth0-auth-js for a faithful, low-risk parity migration. Pick auth0-server-js only when you want the SDK to own the login redirect flow, session storage, cookies, refresh, and logout. See [Choosing your target SDK](./index.md#choosing-your-target-sdk).

**My tokens suddenly look valid for decades. What happened?**
You almost certainly left `Date.now() +` in front of `expiresAt`. `expiresAt` is already an absolute Unix timestamp, not a relative lifetime. See [Token expiry](./index.md#3-token-expiry).

**Where did `resp.data` go?**
The new SDKs return the domain object directly. Read `tokens.accessToken`, not `resp.data.access_token`. If you truly need HTTP response metadata on a success path, opt into `fullResponse`, but note that flag is part of the [post-1.12.1 caveat](./index.md#the-requestoptions--fullresponse-caveat).

**My magic-link passwordless flow stopped sending links.**
The `send` default changed from `'link'` (node-auth0) to `'code'` (new SDK). Set `send: 'link'` explicitly if you want magic links. See [Passwordless](./authentication-flows.md#passwordless).

**Where is `getUserInfo`?**
Prefer `TokenResponse.claims`; they are already decoded and validated, with no extra round-trip. `authClient.getUserInfo({ accessToken })` lands when auth0-auth-js PR #228 merges. In a session app, use `serverClient.getUser()`. See [UserInfoClient](./authentication-flows.md#userinfoclient).

**Can I still set a global `headers` / `timeout` / `agent` on the client?**
Not on the constructor. Move them to the per-call `RequestOptions` argument (`headers`, `signal: AbortSignal.timeout(ms)`) or wrap `customFetch`. `RequestOptions` is part of the [post-1.12.1 caveat](./index.md#the-requestoptions--fullresponse-caveat).

**How do I detect `mfa_required` now?**
Use the `isMfaRequiredError()` type guard, not a string comparison. It narrows the error and exposes the `mfa_token`. Drive the challenge via `authClient.mfa.*`. See [Error model](./index.md#4-error-model).
