# V6 Migration Guide

A guide to migrating the Auth0 Node.js SDK from `5.x` to `6.x`.

- [Overall changes](#overall-changes)
- [Breaking changes](#breaking-changes)
    - [ConnectionAttributeIdentifier replaced with identifier-specific types](#connectionattributeidentifier-replaced-with-identifier-specific-types)
    - [PhoneProviderProtectionBackoffStrategyEnum value change](#phoneproviderprotectionbackoffstrategyenum-value-change)

## Overall changes

V6 is a focused release that addresses type correctness for database connection attribute identifiers and aligns the phone provider backoff strategy enum with the updated API. There are no changes to the Authentication API — any code written for the Authentication API in `5.x` will continue to work in `6.x`.

## Breaking changes

### ConnectionAttributeIdentifier replaced with identifier-specific types

In v5, all three attribute identifiers (email, phone number, and username) shared a single `ConnectionAttributeIdentifier` type for their `identifier` field. This was incorrect — each identifier type supports different values for `default_method`.

In v6, `ConnectionAttributeIdentifier` has been removed and replaced with three separate types:

| Attribute      | Old type                        | New type                      | `default_method` values       |
| -------------- | ------------------------------- | ----------------------------- | ----------------------------- |
| `email`        | `ConnectionAttributeIdentifier` | `EmailAttributeIdentifier`    | `"password"` \| `"email_otp"` |
| `phone_number` | `ConnectionAttributeIdentifier` | `PhoneAttributeIdentifier`    | `"password"` \| `"phone_otp"` |
| `username`     | `ConnectionAttributeIdentifier` | `UsernameAttributeIdentifier` | _(no `default_method`)_       |

**Before (v5):**

```ts
import { Management } from "auth0";

const identifier: Management.ConnectionAttributeIdentifier = {
    active: true,
    default_method: "email_otp",
};
```

**After (v6):**

```ts
import { Management } from "auth0";

// For email attribute
const emailIdentifier: Management.EmailAttributeIdentifier = {
    active: true,
    default_method: "email_otp",
};

// For phone_number attribute
const phoneIdentifier: Management.PhoneAttributeIdentifier = {
    active: true,
    default_method: "phone_otp",
};

// For username attribute (no default_method)
const usernameIdentifier: Management.UsernameAttributeIdentifier = {
    active: true,
};
```

If you were using `ConnectionAttributeIdentifier` as a type annotation in your own code, update it to the appropriate identifier-specific type based on which attribute it applies to.

---

### PhoneProviderProtectionBackoffStrategyEnum value change

The `PhoneProviderProtectionBackoffStrategyEnum` enum has been updated to reflect a change in the Auth0 API. The `None` variant has been renamed to `Default`, and its string value has changed from `"none"` to `"default"`.

**Before (v5):**

```ts
import { Management } from "auth0";

const strategy = Management.PhoneProviderProtectionBackoffStrategyEnum.None; // "none"
```

**After (v6):**

```ts
import { Management } from "auth0";

const strategy = Management.PhoneProviderProtectionBackoffStrategyEnum.Default; // "default"
```

If you were passing this value directly as a string `"none"`, update it to `"default"` to match the updated API.
