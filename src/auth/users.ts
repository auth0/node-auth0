import { ResponseError } from '../lib/errors.js';
import { ClientOptions, InitOverride, JSONApiResponse } from '../lib/models.js';
import { BaseAPI } from '../lib/runtime.js';
import { AuthApiError, AuthApiErrorResponse, parseError } from './base-auth-api.js';
import type { Response } from 'node-fetch';

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

export class Users extends BaseAPI {
  constructor(options: { domain: string } & ClientOptions) {
    super({ ...options, baseUrl: `https://${options.domain}`, parseError });
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
   * const userInfo = await auth0.users.getUserInfo(accessToken);
   */
  async getUserInfo(
    accessToken: string,
    initOverrides?: InitOverride
  ): Promise<JSONApiResponse<UserInfoResponse>> {
    const response = await this.request(
      {
        path: `/userinfo`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      initOverrides
    );

    return JSONApiResponse.fromResponse<UserInfoResponse>(response);
  }
}
