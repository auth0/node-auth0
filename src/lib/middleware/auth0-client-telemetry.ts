import { generateClientInfo } from "../../utils.js";
import { Middleware, ClientOptions, FetchParams, RequestContext } from "../runtime.js";
import { base64url } from "jose";

/**
 * Handles Auth0 client telemetry functionality. Can be used both as middleware
 * for automatic header injection and as a standalone utility for manual telemetry header generation.
 * @private
 */
export class Auth0ClientTelemetry implements Middleware {
    clientInfo: { name: string; [key: string]: unknown };

    constructor(options: ClientOptions) {
        this.clientInfo = options.clientInfo || generateClientInfo();
    }

    /**
     * Get the Auth0-Client header value for telemetry.
     * This method can be used when you need to manually add telemetry headers
     * instead of using the middleware system.
     */
    getAuth0ClientHeader(): string | undefined {
        if ("string" === typeof this.clientInfo.name && this.clientInfo.name.length > 0) {
            return base64url.encode(JSON.stringify(this.clientInfo));
        }
        return undefined;
    }

    async pre?(context: RequestContext): Promise<FetchParams | void> {
        const headerValue = this.getAuth0ClientHeader();
        if (headerValue) {
            context.init.headers = {
                ...context.init.headers,
                "Auth0-Client": headerValue,
            };
        }

        return {
            url: context.url,
            init: context.init,
        };
    }
}
