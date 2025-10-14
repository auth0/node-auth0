# AGENTS.md

## Project Overview

The **Auth0 Node.js SDK v5** is a TypeScript-based SDK providing Auth0 Authentication and Management API clients. The codebase uses **Fern-generated code** for the Management API with custom wrappers, alongside hand-written Authentication API clients.

**Key Capabilities:**

- Authentication API client for login, token exchange, and user authentication flows
- Management API client for tenant administration and user management
- UserInfo API client for user profile retrieval
- Dual module system supporting both CommonJS and ESM
- TypeScript-first with comprehensive type definitions
- Legacy v4 compatibility layer for migration

## Setup Commands

```bash
# Install dependencies
yarn install

# Build both CommonJS and ESM distributions
yarn build

# Build only CommonJS
yarn build:cjs

# Build only ESM (includes .mjs renaming)
yarn build:esm

# Run all tests
yarn test

# Run specific test suites
yarn test:unit      # Unit tests (src/management/tests)
yarn test:browser   # Browser environment tests
yarn test:wire      # Integration tests with mock server

# Run linter
yarn lint

# Fix linting issues
yarn lint:fix

# Generate documentation
yarn docs

# Validate entire project (lint, format, build, test)
yarn validate
```

## Development Workflow

### Local Development Commands

Common operations for working with the SDK:

```bash
# Build and test after changes
yarn build && yarn test

# Run tests with coverage
yarn test:coverage

# Watch mode for development (use specific TypeScript configs)
tsc --project ./tsconfig.cjs.json --watch

# Test specific functionality
yarn test:unit -- --testNamePattern="ManagementClient"

# Run linter with auto-fix
yarn lint:fix

# Format code
yarn format
```

### Build Process

- Source TypeScript files live in `src/`
- Compiled output goes to `dist/cjs/` (CommonJS) and `dist/esm/` (ESM)
- ESM build automatically renames `.js` → `.mjs` and `.d.ts` → `.d.mts`
- Always run `yarn build` before testing SDK changes
- Use TypeScript project references for different build targets

### File Structure

```
src/                                    # TypeScript source
├── index.ts                           # Main SDK exports
├── utils.ts                           # Shared utilities
├── auth/                              # Authentication API client (hand-written)
│   ├── base-auth-api.ts              # Base authentication class
│   ├── client-authentication.ts       # Client credential flows
│   ├── database.ts                    # Database connection flows
│   ├── oauth.ts                       # OAuth flows
│   ├── passwordless.ts                # Passwordless authentication
│   └── id-token-validator.ts          # JWT validation
├── management/                        # Management API client
│   ├── Client.ts                      # Fern-generated client (READ-ONLY)
│   ├── api/                          # Fern-generated API definitions (READ-ONLY)
│   ├── wrapper/                      # Custom wrapper classes (SAFE TO EDIT)
│   │   └── ManagementClient.ts       # Main Management API wrapper
│   ├── request-options.ts            # Helper functions for API calls
│   └── tests/                        # Management API tests
├── userinfo/                          # UserInfo API client
├── lib/                              # Shared libraries and utilities
└── auth0/                            # Legacy compatibility exports
```

## Code Style & Conventions

### TypeScript Standards

- Use strict TypeScript configuration (see `tsconfig.base.json`)
- Define shared types in `src/lib/models.ts`
- Follow existing patterns for API client implementations
- Use proper async/await patterns, avoid callbacks
- Import with `.js` extensions (TypeScript will resolve to `.ts`)

### API Client Implementation Pattern

Every API client follows this structure:

```typescript
class ApiClient {
    constructor(options: ClientOptions) {
        // Initialize with domain, credentials, etc.
    }

    async methodName(params: MethodParams): Promise<Response> {
        // Implementation with proper error handling
    }
}
```

### Management API Wrapper Pattern

**CRITICAL**: Never edit Fern-generated files directly.

```typescript
// ❌ Don't edit: src/management/Client.ts (Fern-generated)
// ✅ Use: src/management/wrapper/ManagementClient.ts

export class ManagementClient {
    private _client: FernClient;

    constructor(options: ManagementClientOptions) {
        this._client = new FernClient(options);
        // Custom logic, token handling, telemetry
    }
}
```

### Request Options Pattern

Use helper functions from `src/management/request-options.ts`:

```typescript
import { withTimeout, withRetries, withHeaders, CustomDomainHeader } from "auth0";

const options = {
    ...withTimeout(30),
    ...withRetries(3),
    ...CustomDomainHeader("auth.example.com"),
};
```

### Error Handling

- **ManagementError** - For Management API errors
- **AuthApiError** - For Authentication API errors
- **IdTokenValidatorError** - For JWT validation errors
- Use `.withRawResponse()` for accessing raw HTTP response data
- Provide clear, actionable error messages

## Testing Instructions

### Running Tests

```bash
# All tests
yarn test

# Specific test projects
yarn test:unit      # Fast unit tests
yarn test:browser   # Browser compatibility tests
yarn test:wire      # Integration tests with mock server

# With coverage
yarn test:coverage
yarn test:coverage:unit

# Specific test files
yarn test -- src/management/tests/ManagementClient.test.ts

# Pattern matching
yarn test -- --testNamePattern="should authenticate user"
```

### Test Structure

- Tests mirror `src/` directory structure in corresponding `tests/` folders
- Use `.test.ts` extensions
- Unit tests use mocks/stubs for external dependencies
- Integration tests use MSW (Mock Service Worker) for HTTP mocking
- Browser tests validate cross-platform compatibility

### Writing Management API Tests

Pattern for testing Management API wrappers:

```typescript
import { ManagementClient } from "../wrapper/ManagementClient.js";

describe("ManagementClient", () => {
    let client: ManagementClient;

    beforeEach(() => {
        client = new ManagementClient({
            domain: "test.auth0.com",
            clientId: "test-client-id",
            clientSecret: "test-client-secret",
        });
    });

    it("should handle API calls correctly", async () => {
        // Test implementation
    });
});
```

### Writing Authentication API Tests

Pattern for testing Authentication API clients:

```typescript
import { AuthenticationClient } from "../index.js";
import nock from "nock";

describe("AuthenticationClient", () => {
    let auth0: AuthenticationClient;

    beforeEach(() => {
        auth0 = new AuthenticationClient({
            domain: "test.auth0.com",
            clientId: "test-client-id",
        });
    });

    afterEach(() => {
        nock.cleanAll();
    });
});
```

### Test Coverage Requirements

- Maintain minimum coverage thresholds (see `jest.config.mjs`)
- Add tests for any new API methods or features
- Test both success and error paths
- Test edge cases and validation logic

## Common Development Tasks

### Adding New Authentication API Methods

1. Add method to appropriate class in `src/auth/`
2. Follow existing patterns for parameter validation
3. Add proper TypeScript types
4. Write comprehensive tests
5. Update API reference documentation

### Extending Management API Wrapper

1. **Never edit** `src/management/Client.ts` or `src/management/api/` (Fern-generated)
2. Extend `src/management/wrapper/ManagementClient.ts`
3. Add custom methods with proper error handling
4. Use helper functions from `request-options.ts`
5. Add tests to `src/management/tests/`

### Working with Legacy Compatibility

- Legacy exports in `legacy/exports/` maintain v4 API compatibility
- Use `import { ... } from 'auth0/legacy'` for v4 imports
- See `v5_MIGRATION_GUIDE.md` for breaking changes
- Test both new and legacy APIs when making changes

### Module System Development

The SDK supports dual module systems:

```typescript
// CommonJS (default)
const { ManagementClient } = require("auth0");

// ESM
import { ManagementClient } from "auth0";

// Legacy v4 compatibility
import { ManagementClient } from "auth0/legacy";
```

## Pull Request Guidelines

### Before Committing

```bash
# Always run validation before commit
yarn validate
```

This runs: lint → format → build → test → package validation

### PR Checklist

- [ ] All tests pass locally (`yarn test`)
- [ ] Code builds successfully (`yarn build`)
- [ ] Linting passes (`yarn lint`)
- [ ] Code is formatted (`yarn format`)
- [ ] New code has corresponding tests
- [ ] TypeScript compiles without errors
- [ ] Updated API reference if adding public methods
- [ ] Added entry to `CHANGELOG.md` if user-facing change
- [ ] Tested with both CommonJS and ESM if applicable
- [ ] Verified backward compatibility

### Commit Message Format

Follow conventional commits style:

- `feat: add support for new Management API endpoint`
- `fix: resolve token refresh issue in Authentication client`
- `docs: update Management API examples`
- `test: add coverage for passwordless authentication`
- `refactor: simplify error handling in base client`

## Security Considerations

### API Credentials

- Never commit Auth0 credentials, client secrets, or tokens
- Use environment variables for sensitive configuration
- Example configs use placeholder values
- Test configurations should use dedicated development tenants

### Validation & Safety

- All inputs validated before API calls
- Proper sanitization of user-provided data
- JWT validation follows security best practices
- Rate limiting and retry logic implemented

### Testing with Real Auth0 Tenants

- Use dedicated development/testing tenants only
- Never run tests against production tenants
- Store credentials in environment variables
- Clean up test resources after test runs

## Debugging Tips

### Enable Debug Logging

```bash
# Set environment variable for verbose logging
export DEBUG=auth0:*
yarn test
```

### Common Issues

- **Build errors**: Check TypeScript configuration and import paths
- **Fern generation conflicts**: Never edit auto-generated files
- **Module resolution**: Ensure `.js` extensions in imports
- **Test failures**: Check mock server setup in wire tests
- **Type errors**: Verify all imports resolve correctly

### Useful Commands

```bash
# Check compiled output structure
ls -la dist/cjs/ dist/esm/

# Validate package exports
yarn lint:package

# Run specific test suite with verbose output
yarn test:unit --verbose

# Check TypeScript compilation
tsc --noEmit --project ./tsconfig.base.json

# Analyze bundle size
du -sh dist/
```

## Architecture Notes

### Request Flow

1. **SDK Entry** (`src/index.ts`) → Export all public APIs
2. **Client Initialization** → Authentication or Management client
3. **Method Call** → Route to appropriate API handler
4. **Request Processing** → Add authentication, headers, retries
5. **HTTP Client** → Make actual API call to Auth0
6. **Response Processing** → Parse response, handle errors
7. **Return Result** → Typed response to consumer

### Fern Integration

- Management API uses Fern-generated code for type safety
- Generated files are **read-only** - never edit directly
- Custom logic goes in wrapper classes
- Fern handles OpenAPI spec changes automatically

### Module Architecture

```
auth0 (main export)
├── ManagementClient (tenant administration)
├── AuthenticationClient (user authentication)
├── UserInfoClient (user profile data)
└── Legacy exports (v4 compatibility)
```

## Additional Resources

- **Migration Guide**: `v5_MIGRATION_GUIDE.md`
- **API Reference**: `reference.md`
- **Full Documentation**: [auth0.com/docs](https://auth0.com/docs)
- **TypeScript Docs**: Generated in `docs/` directory
- **Examples**: See README.md for usage examples

## Quick Reference

### Key Configuration Options

```typescript
// Authentication Client
const auth0 = new AuthenticationClient({
    domain: "your-tenant.auth0.com",
    clientId: "your-client-id",
    clientSecret: "your-client-secret", // Optional
});

// Management Client
const management = new ManagementClient({
    domain: "your-tenant.auth0.com",
    clientId: "your-client-id",
    clientSecret: "your-client-secret",
    scope: "read:users create:users", // Optional
});
```

### Key Files to Know

- `src/index.ts` - Main SDK exports
- `src/management/wrapper/ManagementClient.ts` - Management API wrapper
- `src/auth/` - All Authentication API clients
- `src/management/request-options.ts` - Request configuration helpers
- `src/lib/models.ts` - Shared TypeScript types
- `jest.config.mjs` - Test configuration with multiple projects
- Files marked "auto-generated by Fern" - **READ-ONLY**

### Environment Variables for Testing

```bash
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your-test-client-id
AUTH0_CLIENT_SECRET=your-test-client-secret
AUTH0_M2M_TOKEN=your-machine-to-machine-token
```
