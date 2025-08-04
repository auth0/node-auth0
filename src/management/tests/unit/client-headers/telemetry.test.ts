import { ManagementClient } from "../../../wrapper/ManagementClient.js";

// Mock jose with minimal implementation needed for telemetry testing
jest.mock("jose", () => ({
    SignJWT: jest.fn().mockImplementation(() => ({
        setProtectedHeader: jest.fn().mockReturnThis(),
        setIssuedAt: jest.fn().mockReturnThis(),
        setSubject: jest.fn().mockReturnThis(),
        setJti: jest.fn().mockReturnThis(),
        setIssuer: jest.fn().mockReturnThis(),
        setAudience: jest.fn().mockReturnThis(),
        setExpirationTime: jest.fn().mockReturnThis(),
        sign: jest.fn().mockResolvedValue("mocked-jwt"),
    })),
    createRemoteJWKSet: jest.fn().mockReturnValue(jest.fn()),
    base64url: {
        encode: (str: string) => {
            // Use URL-safe base64 encoding (replace + with -, / with _)
            return Buffer.from(str)
                .toString("base64")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=/g, "");
        },
        decode: (str: string) => {
            // Add padding if needed and restore standard base64 chars
            let paddedStr = str.replace(/-/g, "+").replace(/_/g, "/");
            while (paddedStr.length % 4) {
                paddedStr += "=";
            }
            return new Uint8Array(Buffer.from(paddedStr, "base64"));
        },
    },
}));

describe("ManagementClient Telemetry Header", () => {
    it("should set the Auth0-Client header with custom telemetry info", () => {
        const clientInfo = { name: "my-custom-sdk", version: "2.0.0", env: "testing" };
        const client = new ManagementClient({
            clientId: "id",
            clientSecret: "secret",
            domain: "example.com",
            telemetry: true,
            clientInfo,
        });
        const headers = (client as any)._options?.headers;
        expect(headers).toBeDefined();
        expect(headers["Auth0-Client"]).toBeDefined();
        
        // Decode the Auth0-Client header manually for testing
        const auth0ClientHeader = headers["Auth0-Client"];
        let paddedStr = auth0ClientHeader.replace(/-/g, "+").replace(/_/g, "/");
        while (paddedStr.length % 4) {
            paddedStr += "=";
        }
        const decoded = Buffer.from(paddedStr, "base64").toString();
        expect(JSON.parse(decoded)).toEqual(clientInfo);
    });

    it("should not set the Auth0-Client header if telemetry is false", () => {
        const client = new ManagementClient({
            clientId: "id",
            clientSecret: "secret",
            domain: "example.com",
            telemetry: false,
        });
        const headers = (client as any)._options?.headers;
        expect(headers).toBeDefined();
        expect(headers["Auth0-Client"]).toBeUndefined();
    });
});
