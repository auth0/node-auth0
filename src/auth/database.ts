import { InitOverride, JSONApiResponse, TextApiResponse } from '../lib/models.js';
import { validateRequiredRequestParams } from '../lib/runtime.js';
import { BaseAuthAPI } from './base-auth-api.js';

export interface SignUpRequest {
  /**
   * The client_id of your client.
   * Use if you want to override the class's `clientId`
   */
  client_id?: string;
  /**
   * The user's email address.
   */
  email: string;
  /**
   * The user's desired password.
   */
  password: string;
  /**
   * The name of the database configured to your client.
   */
  connection: string;
  /**
   * The user's username. Only valid if the connection requires a username.
   */
  username?: string;
  /**
   * The user's given name(s).
   */
  given_name?: string;
  /**
   * The user's family name(s).
   */
  family_name?: string;
  /**
   * The user's full name.
   */
  name?: string;
  /**
   *The user's nickname.
   */
  nickname?: string;
  /**
   * A URI pointing to the user's picture.
   */
  picture?: string;
  /**
   * The user metadata to be associated with the user. If set, the field must be an object containing no more than ten properties. Property names can have a maximum of 100 characters, and property values must be strings of no more than 500 characters.
   */
  user_metadata?: { [key: string]: unknown };
}

export interface SignUpResponse {
  /**
   * Email address of the new user.
   */
  email: string;
  /**
   * Indicates whether the email has been verified or not.
   */
  email_verified: boolean;
  /**
   * The server can return `_id`, `id` or `user_id` depending on various factors.
   * For convenience we expose it here as just `id`.
   */
  id: string;
  /**
   * Username of this user.
   */
  username?: string;
  /**
   * The user's given name(s).
   */
  given_name?: string;
  /**
   * The user's family name(s).
   */
  family_name?: string;
  /**
   * The user's full name.
   */
  name?: string;
  /**
   *The user's nickname.
   */
  nickname?: string;
  /**
   * A URI pointing to the user's picture.
   */
  picture?: string;
  /**
   * The user metadata to be associated with the user. If set, the field must be an object containing no more than ten properties. Property names can have a maximum of 100 characters, and property values must be strings of no more than 500 characters.
   */
  user_metadata?: { [key: string]: unknown };
}

export interface ChangePasswordRequest {
  /**
   * The client_id of your client.
   * Use if you want to override the class's `clientId`
   */
  client_id?: string;
  /**
   * The user's email address.
   */
  email: string;
  /**
   * The name of the database configured to your client.
   */
  connection: string;
  /**
   * The organization_id of the Organization associated with the user.
   */
  organization?: string;
}

/**
 * Sign-up and change-password for Database & Active Directory authentication services.
 */
export class Database extends BaseAuthAPI {
  /**
   * Given a user's credentials, and a connection, this endpoint will create a new user using active authentication.
   *
   * This endpoint only works for database connections.
   *
   * See: https://auth0.com/docs/api/authentication#signup
   *
   * @example
   * ```js
   * var data = {
   *   email: '{EMAIL}',
   *   password: '{PASSWORD}',
   *   connection: 'Username-Password-Authentication'
   * };
   *
   * await auth0.database.signUp(data);
   * ```
   */
  async signUp(
    bodyParameters: SignUpRequest,
    initOverrides?: InitOverride
  ): Promise<JSONApiResponse<SignUpResponse>> {
    // TODO: call this `validateRequiredParams` so we can use with bodyParameters in the auth api
    validateRequiredRequestParams(bodyParameters, ['email', 'password', 'connection']);

    const response = await this.request(
      {
        path: '/dbconnections/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { client_id: this.clientId, ...bodyParameters },
      },
      initOverrides
    );

    return JSONApiResponse.fromResponse(response);
  }

  /**
   * Given a user's email address and a connection, Auth0 will send a change password email.
   *
   * This endpoint only works for database connections.
   *
   * See: https://auth0.com/docs/api/authentication#change-password
   *
   * @example
   * ```js
   * var data = {
   *   email: '{EMAIL}',
   *   connection: 'Username-Password-Authentication'
   * };
   *
   * await auth0.database.changePassword(data);
   * ```
   */
  async changePassword(
    bodyParameters: ChangePasswordRequest,
    initOverrides?: InitOverride
  ): Promise<TextApiResponse> {
    validateRequiredRequestParams(bodyParameters, ['email', 'connection']);
    const response = await this.request(
      {
        path: '/dbconnections/change_password',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { client_id: this.clientId, ...bodyParameters },
      },
      initOverrides
    );

    return TextApiResponse.fromResponse(response);
  }
}
