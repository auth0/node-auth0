# Authentication Migration Guide

This guide lives in the [`auth-migration/`](./auth-migration/) directory.

**→ Start here: [`auth-migration/index.md`](./auth-migration/index.md)**: migrate your authentication code off the `auth0` package to [`@auth0/auth0-auth-js`](https://github.com/auth0/auth0-auth-js) (stateless token grants) or [`@auth0/auth0-server-js`](https://github.com/auth0/auth0-auth-js/tree/main/packages/auth0-server-js) (server-managed sessions).

The directory contains:

- [`auth-migration/index.md`](./auth-migration/index.md): the main guide covering OIDC token grants and the four cross-cutting breaking changes.
- [`auth-migration/authentication-flows.md`](./auth-migration/authentication-flows.md): database, passwordless, backchannel (CIBA), token exchange, and `UserInfoClient`.
- [`auth-migration/server-side-sessions.md`](./auth-migration/server-side-sessions.md): the `@auth0/auth0-server-js` session layer.
- [`auth-migration/troubleshooting.md`](./auth-migration/troubleshooting.md): FAQ and gotchas.

> **Migrating with an AI agent?** Point it at the Auth0 migration skill: the `auth0` skill in [`auth0/agent-skills`](https://github.com/auth0/agent-skills), migration intent `migrate-node-auth0`.
