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
   * Delete an enrollment to allow the user to enroll with multi-factor authentication again.
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
   * Retrieve APNS push notification configuration
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
   * Retrieve an enrollment (including its status and type).
   *
   * Note: Phone numbers are partially obfuscated.
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
   * Retrieve phone enrollment and verification templates (subscription required).
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
   * Retrieve SMS enrollment and verification templates (subscription required).
   *
   *     A new endpoint is available to retrieve enrollment and verification templates related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_templates'>phone templates</a>). It has the same payload as this one. Please use it instead.
   * Retrieve SMS Enrollment and Verification Templates
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
   * Retrieve all <a href="https://auth0.com/docs/multifactor-authentication">multi-factor authentication</a> configurations.
   * Retrieve Factors and their Status
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
   * Retrieve phone configuration (one of auth0|twilio|phone-message-hook)
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
   * Retrieve the <a href="https://auth0.com/docs/multifactor-authentication/twilio-configuration">Twilio phone provider configuration</a> (subscription required).
   * Retrieve Twilio phone configuration
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
   * Gets the MFA policies for the tenant.
   *
   * The following policies are supported: <ul><li><code>all-applications</code> policy - will prompt with MFA for all logins.</li><li><code>confidence-score</code> policy - will prompt with MFA only for low confidence logins.</li></ul>
   * Use of the Adaptive MFA feature requires an add-on for the Enterprise plan. Please contact sales with any questions. For more information about Adaptive MFA, read our <a href="https://auth0.com/docs/mfa/adaptive-mfa">full documentation</a>.
   *
   * Get the Multi-factor Authentication policies
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
   * A new endpoint is available to retrieve the configuration related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_selected_provider'>phone configuration</a>). It has the same payload as this one. Please use it instead.
   * Retrieve SMS configuration (one of auth0|twilio|phone-message-hook)
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
   * Retrieve the <a href="https://auth0.com/docs/multifactor-authentication/developer/sns-configuration">AWS SNS push notification provider configuration</a> (subscription required).
   * Retrieve AWS SNS push notification configuration
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
   * Updates APNs provider configuration
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
   * Updates FCM provider configuration
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
   * Update SNS configuration for push notifications
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
   * Generate an email with a link to start the multi-factor authentication enrollment process (subscription required).
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
   * Updates APNs provider configuration
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
   * Customize the messages sent to complete SMS enrollment and verification (subscription required).
   *
   *     A new endpoint is available to update enrollment and verification templates related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_templates'>phone templates</a>). It has the same payload as this one. Please use it instead.
   * Update SMS Enrollment and Verification Templates
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
   * Update a multi-factor authentication factor (subscription required).
   * Update a Multi-factor Authentication Factor
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
   * Updates FCM provider configuration
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
   * Update enabled phone factors for multi-factor authentication
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
   * Update phone configuration (one of auth0|twilio|phone-message-hook)
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
   * Update Push Notification configuration (one of direct|sns|guardian)
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
   * Sets the MFA policies for the tenant.
   *
   * The following policies are supported: <ul><li><code>all-applications</code> policy - will prompt with MFA for all logins.</li><li><code>confidence-score</code> policy - will prompt with MFA only for low confidence logins.</li></ul> Pass an empty array to remove all MFA policies.
   * Use of the Adaptive MFA feature requires an add-on for the Enterprise plan. Please contact sales with any questions. For more information about Adaptive MFA, read our <a href="https://auth0.com/docs/mfa/adaptive-mfa">full documentation</a>.
   *
   *
   * Set the Multi-factor Authentication policies
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
   * A new endpoint is available to update the configuration related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_selected_provider'>phone configuration</a>). It has the same payload as this one. Please use it instead.
   * Update SMS configuration (one of auth0|twilio|phone-message-hook)
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
   * Configure the <a href="https://auth0.com/docs/multifactor-authentication/twilio-configuration">Twilio SMS provider configuration</a> (subscription required).
   *
   *     A new endpoint is available to update the Twilio configuration related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_twilio'>phone Twilio configuration</a>). It has the same payload as this one. Please use it instead.
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
   * Update AWS SNS push notification configuration
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
   * Configure the <a href="https://auth0.com/docs/multifactor-authentication/twilio-configuration">Twilio phone provider configuration</a> (subscription required).
   * Update Twilio phone configuration
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
