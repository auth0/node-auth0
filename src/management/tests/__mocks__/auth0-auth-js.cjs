/**
 * Lightweight CJS stub for @auth0/auth0-auth-js
 *
 * Used by unit/wire Jest projects to avoid ESM openid-client dependency.
 * The real token-acquisition behavior is fully tested in token-provider.test.ts
 * which uses its own jest.mock() of @auth0/auth0-auth-js.
 *
 * This stub provides the minimum API surface for ManagementClient construction
 * and wire tests that acquire tokens.
 */

class AuthClient {
    constructor(options) {
        this.options = options;
    }

    async getTokenByClientCredentials({ audience }) {
        // Return a fake token for wire tests
        return {
            accessToken: "mock-access-token-from-stub",
            expiresAt: Math.floor(Date.now() / 1000) + 3600, // +1 hour in Unix seconds
            tokenType: "Bearer",
        };
    }
}

class TokenByClientCredentialsError extends Error {
    constructor(error, errorDescription, statusCode) {
        super(errorDescription);
        this.name = "TokenByClientCredentialsError";
        this.error = error;
        this.errorDescription = errorDescription;
        this.statusCode = statusCode;
    }
}

class RateLimitError extends Error {
    constructor(message, retryAfter) {
        super(message);
        this.name = "RateLimitError";
        this.retryAfter = retryAfter;
    }
}

class NetworkError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = "NetworkError";
        this.cause = cause;
    }
}

module.exports = {
    AuthClient,
    TokenByClientCredentialsError,
    RateLimitError,
    NetworkError,
};
