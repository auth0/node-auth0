import { generateClientInfo } from "../../utils.js";
import { ClientOptions } from "../models.js";
import { base64url } from "jose";

/**
 * Generates the Auth0-Client telemetry header value.
 * @private
 */
export class Auth0ClientTelemetry {
    clientInfo: { name: string; [key: string]: unknown };

    constructor(options: ClientOptions) {
        this.clientInfo = options.clientInfo || generateClientInfo();
    }

    /**
     * Get the Auth0-Client header value for telemetry.
     */
    getAuth0ClientHeader(): string | undefined {
        if ("string" === typeof this.clientInfo.name && this.clientInfo.name.length > 0) {
            return base64url.encode(JSON.stringify(this.clientInfo));
        }
        return undefined;
    }
}
