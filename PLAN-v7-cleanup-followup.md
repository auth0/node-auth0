# Plan: v7 auth-separation cleanup (follow-up PR)

Follow-up to PR #1390. Finishes what auth-separation started: removes code it
orphaned, documents surface it exposed. Must merge **before the v7 GA cut**
because Item A removes live public exports (breaking).

Scope decided on PR #1390 review threads. Item 1 (token-path domain validation)
is deliberately NOT in this PR (pre-existing gap + new breaking throw = its own
change). Migration-guide export list (Item D) is owed in PR #1390 itself, listed
here only for handoff.

---

## Item A — Remove dead exports (breaking, must be pre-GA)

Auth-separation orphaned these. Two sub-cases: delete-outright vs keep-class-drop-export.

> CORRECTION (review): `src/index.ts` re-exports `./lib/errors.js` and `./lib/models.js`
> **directly** (index.ts:2 and :3). `src/lib/index.ts` is a DEAD barrel, unused by the
> entrypoint. Ignore any "via lib/index.ts" chain below.

### A1. `ResponseError` — DELETE class

- Def: `src/lib/errors.ts:4-14`.
- Re-export: `src/index.ts:2` (`export * from "./lib/errors.js"`).
- Internal live usages: none.
- Tests importing it: none.
- Action: delete class from `errors.ts`. Export drops automatically (was `export *`).

### A2. `TimeoutError` — KEEP class, KEEP exported (DECIDED: lite-mode)

- Def: `src/lib/errors.ts:19-24`.
- **Still used internally**: `src/lib/retry.ts:1` import, `:93` `if (e instanceof TimeoutError) throw e`. retry.ts is live (BaseClient). Do NOT delete class.
- Tests: `token-provider.test.ts:438` only checks string `"TimeoutError"` (err.name), does not import the class. No break.
- **RESOLVED**: kept `TimeoutError` publicly exported. It is a real, still-thrown error type, so leaving
  it on the entrypoint is harmless and honest. The earlier idea of hiding it (named re-export) was
  dropped in lite execution to avoid barrel churn. A5 is therefore SKIPPED. No doc claims it was removed.

### A3. `FetchError` — DELETE class

- Def: `src/lib/errors.ts:29-37`.
- Internal live usages: none.
- **NO test break** (review correction): `tests/management/jobs.test.ts:14` imports `FetchError` from
  `"auth0-legacy"` (npm alias for `auth0@^4`, see package.json:1714), NOT the v7 package under test.
  Legacy compat test, unaffected by deleting v7's FetchError. Do NOT touch jobs.test.ts.
- Action: delete class only. No test changes.

### A4. `JSONApiResponse` — DELETE class

- Def: `src/lib/models.ts:81-93`.
- Re-export: `src/index.ts:3` (`export * from "./lib/models.js"`).
- Internal live usages: none (only self-refs in models.ts).
- models.ts NOT emptied — ~18 other live exports remain (BaseClient/retry/telemetry/Fern consumers).
- Tests: none.
- Action: delete class only.

### A5. Barrel export strategy (because of A2)

`errors.ts` now mixes public (delete-all-public-here means only RequiredError + internal TimeoutError remain) and internal (TimeoutError). `export *` re-exports everything.

- Decision needed: to hide `TimeoutError` from the entrypoint, replace `export * from "./lib/errors.js"` at `src/index.ts:2` with an explicit named re-export (e.g. `export { RequiredError } from "./lib/errors.js"`). Verify what else errors.ts exports that IS meant to stay public (RequiredError — confirm it's intended public).
- Alternative (simpler, less clean): leave TimeoutError exported. It's harmless (real error type). If we accept keeping it exported, A2 becomes a no-op and A5 is skipped. **Flag for reviewer: hide TimeoutError or leave it?**

### A5-verify. After edits

- `tsc --noEmit` clean.
- Full unit + wire test run; fix jobs.test.ts.
- Grep entrypoint: confirm ResponseError/FetchError/JSONApiResponse no longer exported.

---

## Item B — `fetch` option test + README (no contract change)

`fetch` already public (flows through `Omit<FernClient.Options, "token"|"environment"|"fetcher"|"baseUrl">`; `fetch` not omitted). Direct effect of mTLS work. Pure test+doc, zero prod code.

### B1. Type flow (confirm, no change)

- `ManagementClient.ts:24-27` Omit line.
- `BaseClient.ts:24-25` `fetch?: typeof fetch`.

### B2. Test

- Add to `src/management/tests/unit/management-client-custom-domain.test.ts`.
- **Existing partial coverage (review)**: `:183 it("should handle mTLS configuration")` already
  constructs a client with `fetch: jest.fn()` but only asserts `instanceof` (construction, not behavior).
  New test must assert the supplied `fetch` is actually **invoked** on a Management API call — don't
  duplicate the construction assertion.
- Mirror Pattern 2 (mock `../../core/index.js` fetcher) OR spy globalThis.fetch and pass a custom `fetch` mock in options, assert the supplied fetch is invoked for a Management API call.
- New `it("should route Management requests through a supplied fetch option")`.

### B3. README

- Add `### Custom fetch (ManagementClient)` subsection near mTLS block (~README.md:424), documenting `fetch` option + `fetch` vs `fetcher` (fetcher is intentionally excluded/internal).

---

## Item C — Remove dead `pre()` from telemetry (internal-only, safe)

Auth-separation dismantled the middleware pipeline -> `pre()` unreachable. NOT public (Auth0ClientTelemetry never re-exported from index.ts / management/index.ts). `.fernignore` includes `src/lib` -> hand-edit safe, not clobbered on regen.

### C1. Edits — `src/lib/middleware/auth0-client-telemetry.ts`

- Delete `async pre?(context: RequestContext)...` method (whole block).
- Drop `implements Middleware` from class decl.
- Trim import: `import { Middleware, ClientOptions, FetchParams, RequestContext } from "../models.js";` -> `import { ClientOptions } from "../models.js";` (Middleware/FetchParams/RequestContext now unused).
- Keep: `generateClientInfo`, `base64url`, `getAuth0ClientHeader()`, constructor.
- Live consumer unaffected: `auth-helpers.ts:109-110` only calls `getAuth0ClientHeader()`.
- **NOTE (review)**: `Middleware`/`FetchParams`/`RequestContext` are STILL public (exported via
  `src/index.ts:3` -> `models.ts`, and referenced by `Configuration.middleware?: Middleware[]`).
  This cleanup only touches the telemetry file; it does NOT remove those types. Deciding whether the
  middleware machinery should also leave the public surface is a separate scope call — flag, don't bundle.

### C1-verify

- `tsc --noEmit` clean, unit tests pass, lint clean.

---

## Item D — Migration guide export list (OWED IN PR #1390, not this PR)

No v7 guide file; v7 migration content lives in README.md (~line 353). Listed clients/methods covered. **Missing** removed symbols (need a "Removed exports" table):
`IdTokenValidateOptions`, `IdTokenValidatorError`, `TokenSet`, `SUBJECT_TOKEN_TYPES`,
`TOKEN_FOR_CONNECTION_GRANT_TYPE`, `TOKEN_FOR_CONNECTION_REQUESTED_TOKEN_TYPE`,
`AuthenticationClientOptions`, `ResponseError`, `TimeoutError`, `FetchError`, `JSONApiResponse`.
Action (in #1390): add "Removed exports" table to README migration section, one line each with replacement/none.

---

## Sequencing / risk

- One PR = Items A + B + C. Independent files, no interdependency except A5 barrel decision.
- Risk: A2/A5 barrel change (TimeoutError visibility) + A3 test fix are the only non-trivial bits. Rest = deletions.
- Gate: merge before v7 GA (A is breaking). B/C non-breaking, could ship anytime but bundle for one clean cleanup.
- Item 1 (domain validation) + Item D tracked separately.

## Required steps not yet itemized (review)

- **CHANGELOG.md**: repo uses manual CHANGELOG (no `.changeset/`). Item A removes public exports =
  breaking -> add entry under new version section before GA cut.

## Open decisions for reviewer

1. A5: hide `TimeoutError` from entrypoint (named re-export) or leave it exported (skip A2/A5)?
    - If switching `src/index.ts:2` to named: errors.ts exports only 4 classes; after A1+A3 deletions,
      enumerate `export { RequiredError } from "./lib/errors.js"` (TimeoutError stays internal). Confirmed
      `RequiredError` is intended-public (used across many management tests + wrapper code).
2. Item C: leave `Middleware`/`FetchParams`/`RequestContext` public (they back `Configuration.middleware`),
   or remove the whole middleware surface too? (Separate breaking change if removed.)
3. Out-of-scope leads found: `VoidApiResponse` (models.ts:95) also appears dead; `src/lib/index.ts` is a
   dead barrel. Fold into this PR or leave.
