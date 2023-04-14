import * as runtime from '../../runtime';
import type { InitOverride, ApiResponse } from '../../runtime';
import type { PromptsSettings, PromptsSettingsUpdate } from '../models';

const { BaseAPI } = runtime;

export interface GetCustomTextByLanguageRequest {
  /**
   * Name of the prompt.
   */
  prompt: GetCustomTextByLanguagePromptEnum;
  /**
   * Language to update.
   */
  language: GetCustomTextByLanguageLanguageEnum;
}

export interface PutCustomTextByLanguageRequest {
  /**
   * Name of the prompt.
   */
  prompt: PutCustomTextByLanguagePromptEnum;
  /**
   * Language to update.
   */
  language: PutCustomTextByLanguageLanguageEnum;
}

/**
 *
 */
export class PromptsManager extends BaseAPI {
  /**
   * Retrieve custom text for a specific prompt and language.
   * Get custom text for a prompt
   *
   * @throws {RequiredError}
   */
  async getCustomTextByLanguage(
    requestParameters: GetCustomTextByLanguageRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    runtime.validateRequiredRequestParams(requestParameters, ['prompt', 'language']);

    const response = await this.request(
      {
        path: `/prompts/{prompt}/custom-text/{language}`
          .replace('{prompt}', encodeURIComponent(String(requestParameters.prompt)))
          .replace('{language}', encodeURIComponent(String(requestParameters.language))),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * Retrieve prompts settings.
   * Get prompts settings
   *
   * @throws {RequiredError}
   */
  async get(initOverrides?: InitOverride): Promise<ApiResponse<PromptsSettings>> {
    const response = await this.request(
      {
        path: `/prompts`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update prompts settings.
   * Update prompts settings
   *
   * @throws {RequiredError}
   */
  async update(
    bodyParameters: PromptsSettingsUpdate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PromptsSettings>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/prompts`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Set custom text for a specific prompt. Existing texts will be overwritten.
   * Set custom text for a specific prompt
   *
   * @throws {RequiredError}
   */
  async updateCustomTextByLanguage(
    requestParameters: PutCustomTextByLanguageRequest,
    bodyParameters: { [key: string]: any },
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['prompt', 'language']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/prompts/{prompt}/custom-text/{language}`
          .replace('{prompt}', encodeURIComponent(String(requestParameters.prompt)))
          .replace('{language}', encodeURIComponent(String(requestParameters.language))),
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }
}

export const GetCustomTextByLanguagePromptEnum = {
  login: 'login',
  login_id: 'login-id',
  login_password: 'login-password',
  login_passwordless: 'login-passwordless',
  login_email_verification: 'login-email-verification',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
  reset_password: 'reset-password',
  consent: 'consent',
  logout: 'logout',
  mfa_push: 'mfa-push',
  mfa_otp: 'mfa-otp',
  mfa_voice: 'mfa-voice',
  mfa_phone: 'mfa-phone',
  mfa_webauthn: 'mfa-webauthn',
  mfa_sms: 'mfa-sms',
  mfa_email: 'mfa-email',
  mfa_recovery_code: 'mfa-recovery-code',
  mfa: 'mfa',
  status: 'status',
  device_flow: 'device-flow',
  email_verification: 'email-verification',
  email_otp_challenge: 'email-otp-challenge',
  organizations: 'organizations',
  invitation: 'invitation',
  common: 'common',
} as const;
export type GetCustomTextByLanguagePromptEnum =
  typeof GetCustomTextByLanguagePromptEnum[keyof typeof GetCustomTextByLanguagePromptEnum];

export const GetCustomTextByLanguageLanguageEnum = {
  ar: 'ar',
  bg: 'bg',
  bs: 'bs',
  cs: 'cs',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  es: 'es',
  et: 'et',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
  he: 'he',
  hi: 'hi',
  hr: 'hr',
  hu: 'hu',
  id: 'id',
  is: 'is',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  lt: 'lt',
  lv: 'lv',
  nb: 'nb',
  nl: 'nl',
  pl: 'pl',
  pt: 'pt',
  pt_BR: 'pt-BR',
  pt_PT: 'pt-PT',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  sr: 'sr',
  sv: 'sv',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
  vi: 'vi',
  zh_CN: 'zh-CN',
  zh_TW: 'zh-TW',
} as const;
export type GetCustomTextByLanguageLanguageEnum =
  typeof GetCustomTextByLanguageLanguageEnum[keyof typeof GetCustomTextByLanguageLanguageEnum];

export const PutCustomTextByLanguagePromptEnum = {
  login: 'login',
  login_id: 'login-id',
  login_password: 'login-password',
  login_passwordless: 'login-passwordless',
  login_email_verification: 'login-email-verification',
  signup: 'signup',
  signup_id: 'signup-id',
  signup_password: 'signup-password',
  reset_password: 'reset-password',
  consent: 'consent',
  logout: 'logout',
  mfa_push: 'mfa-push',
  mfa_otp: 'mfa-otp',
  mfa_voice: 'mfa-voice',
  mfa_phone: 'mfa-phone',
  mfa_webauthn: 'mfa-webauthn',
  mfa_sms: 'mfa-sms',
  mfa_email: 'mfa-email',
  mfa_recovery_code: 'mfa-recovery-code',
  mfa: 'mfa',
  status: 'status',
  device_flow: 'device-flow',
  email_verification: 'email-verification',
  email_otp_challenge: 'email-otp-challenge',
  organizations: 'organizations',
  invitation: 'invitation',
  common: 'common',
} as const;
export type PutCustomTextByLanguagePromptEnum =
  typeof PutCustomTextByLanguagePromptEnum[keyof typeof PutCustomTextByLanguagePromptEnum];

export const PutCustomTextByLanguageLanguageEnum = {
  ar: 'ar',
  bg: 'bg',
  bs: 'bs',
  cs: 'cs',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  es: 'es',
  et: 'et',
  fi: 'fi',
  fr: 'fr',
  fr_CA: 'fr-CA',
  fr_FR: 'fr-FR',
  he: 'he',
  hi: 'hi',
  hr: 'hr',
  hu: 'hu',
  id: 'id',
  is: 'is',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  lt: 'lt',
  lv: 'lv',
  nb: 'nb',
  nl: 'nl',
  pl: 'pl',
  pt: 'pt',
  pt_BR: 'pt-BR',
  pt_PT: 'pt-PT',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  sr: 'sr',
  sv: 'sv',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
  vi: 'vi',
  zh_CN: 'zh-CN',
  zh_TW: 'zh-TW',
} as const;
export type PutCustomTextByLanguageLanguageEnum =
  typeof PutCustomTextByLanguageLanguageEnum[keyof typeof PutCustomTextByLanguageLanguageEnum];
