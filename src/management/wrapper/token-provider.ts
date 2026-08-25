import { AuthClient, type AuthClientOptions, TokenResponse } from "@auth0/auth0-auth-js";
import type { ManagementClient } from "./ManagementClient.js";
import { generateClientInfo } from "../../utils.js";

const LEEWAY = 10 * 1000; // 10s refresh-ahead in ms

/**
 * TokenProvider handles Management API token acquisition by delegating to @auth0/auth0-auth-js.
 * It performs client credentials grant and caches the token until shortly before expiry.
 *
 * CRITICAL: @auth0/auth0-auth-js returns expiresAt as an absolute Unix timestamp in seconds.
 * This class converts it to milliseconds for comparison with Date.now().
 */
export class TokenProvider {
    private authClient: AuthClient;
    private expiresAt = 0; // Absolute timestamp in ms (Date.now() scale)
    private accessToken = "";
    private pending: Promise<TokenResponse> | undefined;

    constructor(options: ManagementClient.ManagementClientOptionsWithClientSecret & { audience: string });
    constructor(options: ManagementClient.ManagementClientOptionsWithClientAssertion & { audience: string });
    constructor(
        private readonly options: ManagementClient.ManagementClientOptionsWithClientCredentials & { audience: string },
    ) {
        // Map node-auth0 options → AuthClient options
        const authClientOptions: AuthClientOptions = {
            domain: options.domain,
            clientId: options.clientId,
        };

        // Client-secret branch
        if ("clientSecret" in options) {
            authClientOptions.clientSecret = options.clientSecret;
        }

        // Client-assertion branch
        if ("clientAssertionSigningKey" in options) {
            authClientOptions.clientAssertionSigningKey = options.clientAssertionSigningKey;
            if (options.clientAssertionSigningAlg) {
                authClientOptions.clientAssertionSigningAlg = options.clientAssertionSigningAlg;
            }
        }

        // mTLS: useMTLS (node-auth0) → useMtls (auth0-auth-js casing)
        // auth0-auth-js requires customFetch when useMtls=true
        // Forward node-auth0's fetch option (preserved by U7)
        if (options.useMTLS) {
            authClientOptions.useMtls = true;
            // options.fetch is typed on BaseClientOptions (not in the Omit list).
            // auth0-auth-js requires customFetch when useMtls=true — throw if absent.
            const { fetch: customFetch } = options as typeof options & { fetch?: typeof fetch };
            if (!customFetch) {
                throw new Error(
                    "ManagementClient: useMTLS requires a custom fetch implementation. " +
                        "Provide a `fetch` option configured with your mTLS client certificate.",
                );
            }
            authClientOptions.customFetch = customFetch;
        }

        // Telemetry: preserve node-auth0 identity
        if (options.telemetry === false) {
            authClientOptions.telemetry = { enabled: false };
        } else if (options.clientInfo) {
            // Forward custom clientInfo to auth0-auth-js
            // Note: clientInfo.version may be unknown-typed, coerce to string
            const nodeAuth0Info = generateClientInfo();
            authClientOptions.telemetry = {
                enabled: true,
                name: options.clientInfo.name,
                version: String(options.clientInfo.version ?? nodeAuth0Info.version),
            };
            // NOTE: auth0-auth-js TelemetryConfig does not support env fields.
            // The runtime fingerprint (env.node / env.cloudflare-workers) present in the
            // original node-auth0 Auth0-Client header is intentionally omitted here.
            // This is a known, accepted delta vs the pre-v7 token request telemetry shape.
        } else {
            // Default: advertise node-auth0 identity on the internal Management token request.
            // This preserves pre-v7 Auth0-Client header attribution. auth0-auth-js is an
            // implementation detail; callers and tenant analytics should see node-auth0.
            const nodeAuth0Info = generateClientInfo();
            authClientOptions.telemetry = {
                enabled: true,
                name: nodeAuth0Info.name, // "node-auth0"
                version: nodeAuth0Info.version, // SDK_VERSION
            };
            // NOTE: auth0-auth-js TelemetryConfig does not support env fields.
            // The runtime fingerprint (env.node / env.cloudflare-workers) present in the
            // original node-auth0 Auth0-Client header is intentionally omitted here.
            // This is a known, accepted delta vs the pre-v7 token request telemetry shape.
        }

        this.authClient = new AuthClient(authClientOptions);
    }

    public async getAccessToken(): Promise<string> {
        // Cache logic preserved: refresh within LEEWAY of expiry
        if (!this.accessToken || Date.now() > this.expiresAt - LEEWAY) {
            // In-flight dedup: share pending promise across concurrent calls
            this.pending =
                this.pending ||
                this.authClient.getTokenByClientCredentials({
                    audience: this.options.audience,
                });

            const tokenResponse = await this.pending.finally(() => {
                delete this.pending;
            });

            // CRITICAL: auth0-auth-js returns expiresAt in ABSOLUTE Unix seconds, NOT relative expires_in
            // expiresAt is absolute Unix timestamp in seconds - convert to milliseconds for Date.now() comparison
            this.expiresAt = tokenResponse.expiresAt * 1000;
            this.accessToken = tokenResponse.accessToken;
        }

        return this.accessToken;
    }
}
