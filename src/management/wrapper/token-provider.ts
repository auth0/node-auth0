import { base64url, importPKCS8, SignJWT } from "jose";
import type { ManagementClient } from "./ManagementClient.js";
import { generateClientInfo } from "../../utils.js";
import { ManagementError } from "../errors/ManagementError.js";

const LEEWAY = 10 * 1000; // 10s refresh-ahead in ms

interface TokenResult {
    accessToken: string;
    expiresAt: number; // absolute ms (Date.now() scale)
}

export class TokenProvider {
    private expiresAt = 0;
    private accessToken = "";
    private pending: Promise<TokenResult> | undefined;

    constructor(options: ManagementClient.ManagementClientOptionsWithClientSecret & { audience: string });
    constructor(options: ManagementClient.ManagementClientOptionsWithClientAssertion & { audience: string });
    constructor(
        private readonly options: ManagementClient.ManagementClientOptionsWithClientCredentials & { audience: string },
    ) {
        // Validate domain: must be a bare hostname, no slashes or query strings.
        if (/[/?#]/.test(options.domain)) {
            throw new Error(
                `ManagementClient: invalid domain "${options.domain}". Provide a bare hostname, e.g. "tenant.auth0.com".`,
            );
        }

        if (options.useMTLS) {
            const { fetch: customFetch } = options as typeof options & { fetch?: typeof fetch };
            if (!customFetch) {
                throw new Error(
                    "ManagementClient: useMTLS requires a custom fetch implementation. " +
                        "Provide a `fetch` option configured with your mTLS client certificate.",
                );
            }
            // mTLS (RFC 8705) is a transport-layer concern independent of the client authentication
            // method. It combines with both `clientSecret` and `clientAssertionSigningKey`: the TLS
            // client certificate yields a certificate-bound token regardless of how the client
            // authenticates. v6 supported this, so no auth-method restriction is imposed here.
        }
    }

    public async getAccessToken(): Promise<string> {
        if (!this.accessToken || Date.now() > this.expiresAt - LEEWAY) {
            this.pending = this.pending || this.fetchToken();
            const result = await this.pending.finally(() => {
                delete this.pending;
            });
            this.expiresAt = result.expiresAt;
            this.accessToken = result.accessToken;
        }
        return this.accessToken;
    }

    private async fetchToken(): Promise<TokenResult> {
        const { domain, clientId, audience } = this.options;
        const tokenUrl = this.options.useMTLS ? `https://mtls.${domain}/oauth/token` : `https://${domain}/oauth/token`;

        const body = new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            audience,
        });

        if ("clientSecret" in this.options) {
            body.set("client_secret", this.options.clientSecret);
        } else if ("clientAssertionSigningKey" in this.options) {
            const assertion = await this.buildClientAssertion(domain, clientId);
            body.set("client_assertion", assertion);
            body.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer");
        }

        // Build request headers. Start with user-supplied plain-string headers so they can be
        // overridden by SDK-controlled values (Content-Type, Auth0-Client) set below.
        // Supplier-function headers (Fern's Supplier<string | null | undefined> type) are skipped —
        // they require async resolution and are not supported on the token endpoint path.
        const userHeaders = this.options.headers ?? {};
        const headers: Record<string, string> = {};
        for (const [key, value] of Object.entries(userHeaders)) {
            if (typeof value === "string") {
                headers[key.toLowerCase()] = value;
            }
        }
        headers["content-type"] = "application/x-www-form-urlencoded";
        const telemetryHeader = this.buildTelemetryHeader();
        if (telemetryHeader) {
            headers["auth0-client"] = telemetryHeader;
        }

        // Use custom fetch for mTLS, else global fetch.
        // `fetch` is defined on BaseClientOptions (src/management/BaseClient.ts) which is Fern-generated.
        // If that file is regenerated, verify `fetch?: typeof fetch` is still present — token acquisition
        // for mTLS depends on it being forwarded here.
        const { fetch: customFetch } = this.options as typeof this.options & { fetch?: typeof fetch };
        const fetcher = customFetch ?? fetch;

        let response: Response;
        try {
            response = await fetcher(tokenUrl, {
                method: "POST",
                headers,
                body: body.toString(),
                signal: AbortSignal.timeout(10_000),
            });
        } catch (err: unknown) {
            // Built-in fetch aborts with a "TimeoutError"; node-fetch (used on the mTLS path with a
            // custom fetch) aborts with an "AbortError". Match both so a token-request timeout maps
            // to a 408 regardless of the underlying fetch implementation.
            if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
                throw new ManagementError({
                    message: "ManagementClient: token request timed out",
                    statusCode: 408,
                });
            }
            throw err;
        }

        if (!response.ok) {
            // Read the body exactly once. `response.json()` followed by `response.text()` throws
            // "Body has already been read", which would swallow non-JSON error payloads (e.g. proxy
            // or WAF 502s). Read text, then attempt to parse it as JSON.
            const raw = await response.text().catch(() => "");
            let errorBody: unknown;
            try {
                errorBody = raw ? JSON.parse(raw) : response.statusText;
            } catch {
                errorBody = raw || response.statusText;
            }
            throw new ManagementError({
                message: "ManagementClient: token request failed",
                statusCode: response.status,
                body: errorBody,
            });
        }

        const json = (await response.json()) as { access_token: string; expires_in: number };
        return {
            accessToken: json.access_token,
            expiresAt: Date.now() + json.expires_in * 1000,
        };
    }

    private async buildClientAssertion(domain: string, clientId: string): Promise<string> {
        const { clientAssertionSigningKey, clientAssertionSigningAlg = "RS256" } = this
            .options as ManagementClient.ManagementClientOptionsWithClientAssertion & { audience: string };

        const key =
            typeof clientAssertionSigningKey === "string"
                ? await importPKCS8(clientAssertionSigningKey, clientAssertionSigningAlg)
                : clientAssertionSigningKey;

        const now = Math.floor(Date.now() / 1000);
        return new SignJWT({})
            .setProtectedHeader({ alg: clientAssertionSigningAlg })
            .setIssuedAt(now)
            .setIssuer(clientId)
            .setSubject(clientId)
            .setAudience(`https://${domain}/`)
            .setExpirationTime(now + 180) // 3 min lifetime
            .setJti(crypto.randomUUID())
            .sign(key);
    }

    private buildTelemetryHeader(): string | null {
        const opts = this.options as typeof this.options & {
            telemetry?: boolean;
            clientInfo?: { name: string; version?: unknown };
        };
        if (opts.telemetry === false) return null;

        const nodeAuth0Info = generateClientInfo();
        const info = opts.clientInfo
            ? { name: opts.clientInfo.name, version: String(opts.clientInfo.version ?? nodeAuth0Info.version) }
            : { name: nodeAuth0Info.name, version: nodeAuth0Info.version };

        // NOTE: auth0-auth-js TelemetryConfig does not support env fields.
        // The runtime fingerprint (env.node / env.cloudflare-workers) present in the
        // original node-auth0 Auth0-Client header is intentionally omitted here.
        // This is a known, accepted delta vs the pre-v7 token request telemetry shape.
        // Use jose's base64url encoder for runtime portability (Buffer is Node-only).
        return base64url.encode(new TextEncoder().encode(JSON.stringify(info)));
    }
}
