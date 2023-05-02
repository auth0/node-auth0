import { InitOverride, VoidApiResponse, validateRequiredRequestParams } from '../runtime';
import { BaseAuthAPI } from './BaseAuthApi';

export interface SendEmailLinkRequest {
  /**
   * The user's email address
   */
  email: string;
  /**
   * Use `link` to send a link or `code` to send a verification code.
   * If omitted, a `link` will be sent.
   */
  send?: 'link';
  /**
   * Append or override the link parameters (like `scope`, `redirect_uri`, `protocol`, `response_type`),
   * when you send a link using email.
   */
  authParams?: Record<string, unknown>;
}

export interface SendEmailCodeRequest {
  /**
   * The user's email address
   */
  email: string;
  /**
   * Use `link` to send a link or `code` to send a verification code.
   * If omitted, a `link` will be sent.
   */
  send?: 'code';
}

export type SendEmailRequest = SendEmailLinkRequest | SendEmailCodeRequest;

export interface SendSmsRequest {
  phone_number: string;
}

/**
 * Handles passwordless flows using Email and SMS.
 */
export class Passwordless extends BaseAuthAPI {
  /**
   * Start passwordless flow sending an email.
   *
   * @example <caption>
   *   Given the user `email` address, it will send an email with:
   *
   *   <ul>
   *     <li>A link (default, `send:"link"`). You can then authenticate with this
   *       user opening the link and he will be automatically logged in to the
   *       application. Optionally, you can append/override parameters to the link
   *       (like `scope`, `redirect_uri`, `protocol`, `response_type`, etc.) using
   *       `authParams` object.
   *     </li>
   *     <li>
   *       A verification code (`send:"code"`). You can then authenticate with
   *       this user using the `/oauth/ro` endpoint specifying `email` as
   *       `username` and `code` as `password`.
   *     </li>
   *   </ul>
   *
   *   Find more information in the
   *   <a href="https://auth0.com/docs/auth-api#!#post--with_email">API Docs</a>
   * </caption>
   *
   * var data = {
   *   email: '{EMAIL}',
   *   send: 'link',
   *   authParams: {} // Optional auth params.
   * };
   *
   * auth0.passwordless.sendEmail(data);
   */
  async sendEmail(
    bodyParameters: SendEmailRequest,
    initOverrides?: InitOverride
  ): Promise<VoidApiResponse> {
    validateRequiredRequestParams(bodyParameters, ['email']);

    const response = await this.request(
      {
        path: '/passwordless/start',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: (await this.addClientAuthentication(
          { client_id: this.clientId, connection: 'email', ...bodyParameters },
          false
        )) as Record<string, string>,
      },
      initOverrides
    );

    return VoidApiResponse.fromResponse(response);
  }

  /**
   * Start passwordless flow sending an SMS.
   *
   * @example <caption>
   *   Given the user `phone_number`, it will send a SMS message with a
   *   verification code. You can then authenticate with this user using the
   *   `/oauth/ro` endpoint specifying `phone_number` as `username` and `code` as
   *   `password`:
   * </caption>
   *
   * const data = {
   *   phone_number: '{PHONE}'
   * };
   *
   * auth0.passwordless.sendSMS(data);
   */
  async sendSMS(
    bodyParameters: SendSmsRequest,
    initOverrides?: InitOverride
  ): Promise<VoidApiResponse> {
    validateRequiredRequestParams(bodyParameters, ['phone_number']);

    const response = await this.request(
      {
        path: '/passwordless/start',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: (await this.addClientAuthentication(
          { client_id: this.clientId, connection: 'sms', ...bodyParameters },
          false
        )) as Record<string, string>,
      },
      initOverrides
    );

    return VoidApiResponse.fromResponse(response);
  }
}
