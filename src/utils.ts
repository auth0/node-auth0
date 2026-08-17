import { SDK_VERSION as version } from "./management/version.js";
import { RUNTIME } from "./management/core/index.js";

export const generateClientInfo = () => {
    const runtimeType = RUNTIME?.type ?? "unknown";
    const runtimeKey = runtimeType === "workerd" ? "cloudflare-workers" : runtimeType;
    const runtimeVersion = RUNTIME?.version ?? "unknown";

    return {
        name: "node-auth0",
        version,
        env: {
            [runtimeKey]: runtimeVersion,
        },
    };
};
