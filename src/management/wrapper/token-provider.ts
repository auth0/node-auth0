import { AuthClient, type AuthClientOptions, TokenResponse } from "@auth0/auth0-auth-js";
import type { ManagementClient } from "./ManagementClient.js";
import { generateClientInfo } from "../../utils.js";

const LEEWAY = 10 * 1000; // 10s refresh-ahead in ms

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
            // After U7, options.fetch is accessible. Forward to customFetch.
            // Cast required: fetch is inherited from FernClient.Options via namespace indirection
            if ((options as any).fetch) {
                authClientOptions.customFetch = (options as any).fetch;
            }
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
        } else {
            // Default: node-auth0 identity
            const nodeAuth0Info = generateClientInfo();
            authClientOptions.telemetry = {
                enabled: true,
                name: nodeAuth0Info.name, // "node-auth0"
                version: nodeAuth0Info.version, // SDK_VERSION
            };
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
