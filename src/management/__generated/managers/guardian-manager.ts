import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  Enrollment,
  EnrollmentCreate,
  Factor,
  GetApns200Response,
  GetMessageTypes200Response,
  GetPhoneProviders200Response,
  GetPnProviders200Response,
  PostTicket200Response,
  PutApns200Response,
  PutApnsRequest,
  PutFactorsByName200Response,
  PutFactorsByNameRequest,
  PutFcmRequest,
  PutSns200Response,
  PutSnsRequest,
  PutTwilioRequest,
  SmsTwilioFactorProvider,
  SnsFactorProvider,
  TemplateMessages,
  TwilioFactorProvider,
  DeleteEnrollmentsByIdRequest,
  GetEnrollmentsByIdRequest,
  PutFactorsByNameOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class GuardianManager extends BaseAPI {
  /**
   * Remove a specific multi-factor authentication (MFA) enrollment from a user's account. This allows the user to re-enroll with MFA. For more information, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/reset-user-mfa">Reset User Multi-Factor Authentication and Recovery Codes</a>.
   * Delete a multi-factor authentication enrollment
   *
   * @throws {RequiredError}
   */
  async deleteGuardianEnrollment(
    requestParameters: DeleteEnrollmentsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/guardian/enrollments/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve configuration details for the multi-factor authentication APNS provider associated with your tenant.
   * Get APNS push notification configuration
   *
   * @throws {RequiredError}
   */
  async getPushNotificationProviderAPNS(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetApns200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/apns`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details, such as status and type, for a specific multi-factor authentication enrollment registered to a user account.
   * Retrieve a multi-factor authentication enrollment
   *
   * @throws {RequiredError}
   */
  async getGuardianEnrollment(
    requestParameters: GetEnrollmentsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Enrollment>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/guardian/enrollments/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details of the multi-factor authentication enrollment and verification templates for phone-type factors available in your tenant.
   * Retrieve Enrollment and Verification Phone Templates
   *
   * @throws {RequiredError}
   */
  async getPhoneFactorTemplates(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TemplateMessages>> {
    const response = await this.request(
      {
        path: `/guardian/factors/phone/templates`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/get-factor-phone-templates">Retrieve enrollment and verification phone templates</a> endpoint instead.
   *
   *     <b>Previous function</b>: Retrieve details of SMS enrollment and verification templates configured for your tenant.
   * Get SMS enrollment and verification templates
   *
   * @throws {RequiredError}
   */
  async getSmsFactorTemplates(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TemplateMessages | void>> {
    const response = await this.request(
      {
        path: `/guardian/factors/sms/templates`,
        method: 'GET',
      },
      initOverrides
    );

    return response.status === 204
      ? runtime.VoidApiResponse.fromResponse(response)
      : runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details of all <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors">multi-factor authentication factors</a> associated with your tenant.
   * Retrieve Factors and their StatuGet multi-factor authentication details
   *
   * @throws {RequiredError}
   */
  async getFactors(initOverrides?: InitOverride): Promise<ApiResponse<Array<Factor>>> {
    const response = await this.request(
      {
        path: `/guardian/factors`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve list of <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-voice-notifications-mfa">phone-type MFA factors</a> (i.e., sms and voice) that are enabled for your tenant.
   * Retrieve the Enabled Phone Factors
   *
   * @throws {RequiredError}
   */
  async getPhoneFactorMessageTypes(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetMessageTypes200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/phone/message-types`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details of the multi-factor authentication phone provider configured for your tenant.
   * Get phone provider configuration
   *
   * @throws {RequiredError}
   */
  async getPhoneFactorSelectedProvider(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPhoneProviders200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/phone/selected-provider`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve configuration details for a Twilio phone provider that has been set up in your tenant. To learn more, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-voice-notifications-mfa">Configure SMS and Voice Notifications for MFA</a>.
   * Get Twilio configuration
   *
   * @throws {RequiredError}
   */
  async getPhoneFactorProviderTwilio(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TwilioFactorProvider>> {
    const response = await this.request(
      {
        path: `/guardian/factors/phone/providers/twilio`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Modify the push notification provider configured for your tenant. For more information, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-push-notifications-for-mfa">Configure Push Notifications for MFA</a>.
   * Retrieve push notification provider
   *
   * @throws {RequiredError}
   */
  async getPushNotificationSelectedProvider(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPnProviders200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/selected-provider`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve the <a href="https://auth0.com/docs/secure/multi-factor-authentication/enable-mfa">multi-factor authentication (MFA) policies</a> configured for your tenant.
   *
   * The following policies are supported:
   * <ul>
   * <li><code>all-applications</code> policy prompts with MFA for all logins.</li>
   * <li><code>confidence-score</code> policy prompts with MFA only for low confidence logins.</li>
   * </ul>
   *
   * <b>Note</b>: The <code>confidence-score</code> policy is part of the <a href="https://auth0.com/docs/secure/multi-factor-authentication/adaptive-mfa">Adaptive MFA feature</a>. Adaptive MFA requires an add-on for the Enterprise plan; review <a href="https://auth0.com/pricing">Auth0 Pricing</a> for more details.
   *
   * Get multi-factor authentication policies
   *
   * @throws {RequiredError}
   */
  async getPolicies(initOverrides?: InitOverride): Promise<ApiResponse<Array<string>>> {
    const response = await this.request(
      {
        path: `/guardian/policies`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/get-phone-providers">Retrieve phone configuration</a> endpoint instead.
   *
   *     <b>Previous functionality</b>: Retrieve details for the multi-factor authentication SMS provider configured for your tenant.
   * Get SMS configuration
   *
   * @throws {RequiredError}
   */
  async getSmsSelectedProvider(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPhoneProviders200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/sms/selected-provider`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve the <a href="https://auth0.com/docs/multifactor-authentication/twilio-configuration">Twilio SMS provider configuration</a> (subscription required).
   *
   *     A new endpoint is available to retrieve the Twilio configuration related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_twilio'>phone Twilio configuration</a>). It has the same payload as this one. Please use it instead.
   * Retrieve Twilio SMS configuration
   *
   * @throws {RequiredError}
   */
  async getSmsFactorProviderTwilio(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SmsTwilioFactorProvider>> {
    const response = await this.request(
      {
        path: `/guardian/factors/sms/providers/twilio`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve configuration details for an AWS SNS push notification provider that has been enabled for MFA. To learn more, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-push-notifications-for-mfa">Configure Push Notifications for MFA</a>.
   * Get AWS SNS configuration
   *
   * @throws {RequiredError}
   */
  async getPushNotificationProviderSNS(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SnsFactorProvider>> {
    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/sns`,
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Modify configuration details of the multi-factor authentication APNS provider associated with your tenant.
   * Update APNs provider configuration
   *
   * @throws {RequiredError}
   */
  async updatePushNotificationProviderAPNS(
    bodyParameters: PutApnsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutApns200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/apns`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Modify configuration details of the multi-factor authentication FCM provider associated with your tenant.
   * Updates FCM configuration
   *
   * @throws {RequiredError}
   */
  async updatePushNotificationProviderFCM(
    bodyParameters: PutFcmRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/fcm`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * Configure the <a href="https://auth0.com/docs/multifactor-authentication/developer/sns-configuration">AWS SNS push notification provider configuration</a> (subscription required).
   * Update AWS SNS configuration
   *
   * @throws {RequiredError}
   */
  async updatePushNotificationProviderSNS(
    bodyParameters: PutSnsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutSns200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/sns`,
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Create a <a href="https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian/create-custom-enrollment-tickets">multi-factor authentication (MFA) enrollment ticket</a>, and optionally send an email with the created ticket, to a given user.
   *
   * Create a multi-factor authentication enrollment ticket
   *
   * @throws {RequiredError}
   */
  async createEnrollmentTicket(
    bodyParameters: EnrollmentCreate,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostTicket200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/enrollments/ticket`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Overwrite all configuration details of the multi-factor authentication APNS provider associated with your tenant.
   * Update APNS configuration
   *
   * @throws {RequiredError}
   */
  async setPushNotificationProviderAPNS(
    bodyParameters: PutApnsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutApns200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/apns`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Customize the messages sent to complete phone enrollment and verification (subscription required).
   * Update Enrollment and Verification Phone Templates
   *
   * @throws {RequiredError}
   */
  async setPhoneFactorTemplates(
    bodyParameters: TemplateMessages,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TemplateMessages>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/phone/templates`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/put-factor-phone-templates">Update enrollment and verification phone templates</a> endpoint instead.
   *
   *     <b>Previous functionality</b>: Customize the messages sent to complete SMS enrollment and verification.
   * Update SMS enrollment and verification templates
   *
   * @throws {RequiredError}
   */
  async setSmsFactorTemplates(
    bodyParameters: TemplateMessages,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TemplateMessages>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/sms/templates`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update the status (i.e., enabled or disabled) of a specific multi-factor authentication factor.
   * Update multi-factor authentication type
   *
   * @throws {RequiredError}
   */
  async updateFactor(
    requestParameters: PutFactorsByNameOperationRequest,
    bodyParameters: PutFactorsByNameRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutFactorsByName200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['name']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/{name}`.replace(
          '{name}',
          encodeURIComponent(String(requestParameters.name))
        ),
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Overwrite all configuration details of the multi-factor authentication FCM provider associated with your tenant.
   * Updates FCM configuration
   *
   * @throws {RequiredError}
   */
  async setPushNotificationProviderFCM(
    bodyParameters: PutFcmRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<{ [key: string]: any }>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/fcm`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * Replace the list of <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-voice-notifications-mfa">phone-type MFA factors</a> (i.e., sms and voice) that are enabled for your tenant.
   * Update the Enabled Phone Factors
   *
   * @throws {RequiredError}
   */
  async updatePhoneFactorMessageTypes(
    bodyParameters: GetMessageTypes200Response,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetMessageTypes200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/phone/message-types`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update phone provider configuration
   *
   * @throws {RequiredError}
   */
  async updatePhoneFactorSelectedProvider(
    bodyParameters: GetPhoneProviders200Response,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPhoneProviders200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/phone/selected-provider`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Modify the push notification provider configured for your tenant. For more information, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-push-notifications-for-mfa">Configure Push Notifications for MFA</a>.
   * Update Push Notification configuration
   *
   * @throws {RequiredError}
   */
  async setPushNotificationSelectedProvider(
    bodyParameters: GetPnProviders200Response,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPnProviders200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/selected-provider`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Set <a href="https://auth0.com/docs/secure/multi-factor-authentication/enable-mfa">multi-factor authentication (MFA) policies</a> for your tenant.
   *
   * The following policies are supported:
   * <ul>
   * <li><code>all-applications</code> policy prompts with MFA for all logins.</li>
   * <li><code>confidence-score</code> policy prompts with MFA only for low confidence logins.</li>
   * </ul>
   *
   * <b>Note</b>: The <code>confidence-score</code> policy is part of the <a href="https://auth0.com/docs/secure/multi-factor-authentication/adaptive-mfa">Adaptive MFA feature</a>. Adaptive MFA requires an add-on for the Enterprise plan; review <a href="https://auth0.com/pricing">Auth0 Pricing</a> for more details.
   *
   * Update multi-factor authentication policies
   *
   * @throws {RequiredError}
   */
  async updatePolicies(
    bodyParameters: Array<string>,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<Array<string>>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/policies`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse<any>(response);
  }

  /**
   * This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/put-phone-providers">Update phone configuration</a> endpoint instead.
   *
   *     <b>Previous functionality</b>: Update the multi-factor authentication SMS provider configuration in your tenant.
   * Update SMS configuration
   *
   * @throws {RequiredError}
   */
  async setSmsSelectedProvider(
    bodyParameters: GetPhoneProviders200Response,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPhoneProviders200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/sms/selected-provider`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/put-twilio">Update Twilio phone configuration</a> endpoint.
   *
   *     <b>Previous functionality</b>: Update the Twilio SMS provider configuration.
   * Update Twilio SMS configuration
   *
   * @throws {RequiredError}
   */
  async setSmsFactorProviderTwilio(
    bodyParameters: PutTwilioRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SmsTwilioFactorProvider>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/sms/providers/twilio`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Configure the <a href="https://auth0.com/docs/multifactor-authentication/developer/sns-configuration">AWS SNS push notification provider configuration</a> (subscription required).
   * Update AWS SNS configuration
   *
   * @throws {RequiredError}
   */
  async setPushNotificationProviderSNS(
    bodyParameters: PutSnsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutSns200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/sns`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update the configuration of a Twilio phone provider that has been set up in your tenant. To learn more, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-voice-notifications-mfa">Configure SMS and Voice Notifications for MFA</a>.
   * Update Twilio configuration
   *
   * @throws {RequiredError}
   */
  async updatePhoneFactorProviderTwilio(
    bodyParameters: PutTwilioRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TwilioFactorProvider>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/phone/providers/twilio`,
        method: 'PUT',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
