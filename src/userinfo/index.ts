import { ResponseError } from "../lib/errors.js";
import { Auth0ClientTelemetry } from "../lib/middleware/auth0-client-telemetry.js";
import { ClientOptions, InitOverride, JSONApiResponse } from "../lib/models.js";
import { BaseAPI } from "../lib/runtime.js";

/**
 * Response interface for the UserInfo endpoint
 * @group UserInfo API
 */
export interface UserInfoResponse {
    sub: string;
    name: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email: string;
    email_verified: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: string;
    address?: {
        country?: string;
    };
    updated_at: string;
    [key: string]: unknown;
}

interface UserInfoErrorResponse {
    error_description: string;
    error: string;
}

export class UserInfoError extends Error {
    override name = "UserInfoError" as const;
    constructor(
        public error: string,
        public error_description: string,
        public statusCode: number,
        public body: string,
        public headers: Headers,
    ) {
        super(error_description || error);
    }
}

export async function parseError(response: Response) {
    // Errors typically have a specific format:
    // {
    //    error: 'invalid_body',
    //    error_description: 'Bad Request',
    // }

    const body = await response.text();
    let data: UserInfoErrorResponse;

    try {
        data = JSON.parse(body) as UserInfoErrorResponse;
        return new UserInfoError(data.error, data.error_description, response.status, body, response.headers);
    } catch {
        return new ResponseError(response.status, body, response.headers, "Response returned an error code");
    }
}

/**
 * Auth0 UserInfo API Client
 *
 * Provides access to the UserInfo endpoint to retrieve user profile information
 * using an access token obtained during authentication.
 *
 * @group UserInfo API
 *
 * @example Basic usage
 * ```typescript
 * import { UserInfoClient } from 'auth0';
 *
 * const userInfoClient = new UserInfoClient({
 *   domain: 'your-tenant.auth0.com'
 * });
 *
 * const userInfo = await userInfoClient.getUserInfo(accessToken);
 * console.log(userInfo.data.sub, userInfo.data.email);
 * ```
 */
export class UserInfoClient extends BaseAPI {
    /**
     * Create a new UserInfo API client
     * @param options - Configuration options including domain and client settings
     */
    constructor(options: { domain: string } & ClientOptions) {
        super({
            ...options,
            baseUrl: `https://${options.domain}`,
            middleware: options.telemetry !== false ? [new Auth0ClientTelemetry(options)] : [],
            parseError,
        });
    }

    /**
   * Given an access token get the user profile linked to it.
   *
   * @example <caption>
   *   Get the user information based on the Auth0 access token (obtained during
   *   login). Find more information in the
   *   <a href="https://auth0.com/docs/auth-api#!#get--userinfo">API Docs</a>.
   * </caption>
   *
   * const userInfoClient = new UserInfoClient({
   *   domain: '...'
   * });

   * const userInfo = await userInfoClient.getUserInfo(accessToken);
   */
    async getUserInfo(accessToken: string, initOverrides?: InitOverride): Promise<JSONApiResponse<UserInfoResponse>> {
        const response = await this.request(
            {
                path: `/userinfo`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
            initOverrides,
        );

        return JSONApiResponse.fromResponse<UserInfoResponse>(response);
    }
}
