import * as runtime from '../../runtime';
import type { InitOverride, InitOverrideFunction, ApiResponse } from '../../../../../src/runtime';
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
  PutMessageTypesRequest,
  PutPhoneProvidersRequest,
  PutPnProvidersRequest,
  PutSnsRequest,
  PutTwilioRequest,
  SnsFactorProvider,
  TemplateMessages,
  TwilioFactorProvider,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteEnrollmentsByIdRequest {
  /**
   * ID of the enrollment to be deleted.
   * @type {string}
   */
  id: string;
}

export interface GetEnrollmentsByIdRequest {
  /**
   * ID of the enrollment to be retrieve.
   * @type {string}
   */
  id: string;
}

export interface PutFactorsByNameOperationRequest {
  /**
   * Factor name. Can be `sms`, `push-notification`, `email`, `duo` `otp` `webauthn-roaming`, `webauthn-platform`, or `recovery-code`.
   * @type {PutFactorsByNameOperationNameEnum}
   */
  name: PutFactorsByNameOperationNameEnum;
}

/**
 *
 */
export class GuardianManager extends BaseAPI {
  /**
   * Delete an enrollment to allow the user to enroll with multi-factor authentication again.
   * Delete a multi-factor authentication enrollment
   * @throws {RequiredError}
   */
  async deleteGuardianEnrollmentRaw(
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

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete an enrollment to allow the user to enroll with multi-factor authentication again.
   * Delete a multi-factor authentication enrollment
   */
  async deleteGuardianEnrollment(
    requestParameters: DeleteEnrollmentsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteGuardianEnrollmentRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve APNS push notification configuration
   * @throws {RequiredError}
   */
  async getPushNotificationProviderAPNSRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetApns200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/apns`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve APNS push notification configuration
   */
  async getPushNotificationProviderAPNS(initOverrides?: InitOverride): Promise<GetApns200Response> {
    const response = await this.getPushNotificationProviderAPNSRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve an enrollment (including its status and type).
   *
   * Note: Phone numbers are partially obfuscated.
   * Retrieve a multi-factor authentication enrollment
   * @throws {RequiredError}
   */
  async getGuardianEnrollmentRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve an enrollment (including its status and type).<br/><br/>Note: Phone numbers are partially obfuscated.
   * Retrieve a multi-factor authentication enrollment
   */
  async getGuardianEnrollment(
    requestParameters: GetEnrollmentsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<Enrollment> {
    const response = await this.getGuardianEnrollmentRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve phone enrollment and verification templates (subscription required).
   * Retrieve Enrollment and Verification Phone Templates
   * @throws {RequiredError}
   */
  async getPhoneFactorTemplatesRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TemplateMessages>> {
    const response = await this.request(
      {
        path: `/guardian/factors/phone/templates`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve phone enrollment and verification templates (subscription required).
   * Retrieve Enrollment and Verification Phone Templates
   */
  async getPhoneFactorTemplates(initOverrides?: InitOverride): Promise<TemplateMessages> {
    const response = await this.getPhoneFactorTemplatesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve SMS enrollment and verification templates (subscription required).
   *
   *     A new endpoint is available to retrieve enrollment and verification templates related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_templates'>phone templates</a>). It has the same payload as this one. Please use it instead.
   * Retrieve SMS Enrollment and Verification Templates
   * @throws {RequiredError}
   */
  async getSmsFactorTemplatesRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TemplateMessages>> {
    const response = await this.request(
      {
        path: `/guardian/factors/sms/templates`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve SMS enrollment and verification templates (subscription required). <br/><br/>    A new endpoint is available to retrieve enrollment and verification templates related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_templates\'>phone templates</a>). It has the same payload as this one. Please use it instead.
   * Retrieve SMS Enrollment and Verification Templates
   */
  async getSmsFactorTemplates(initOverrides?: InitOverride): Promise<TemplateMessages> {
    const response = await this.getSmsFactorTemplatesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve all <a href="https://auth0.com/docs/multifactor-authentication">multi-factor authentication</a> configurations.
   * Retrieve Factors and their Status
   * @throws {RequiredError}
   */
  async getFactorsRaw(initOverrides?: InitOverride): Promise<ApiResponse<Array<Factor>>> {
    const response = await this.request(
      {
        path: `/guardian/factors`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve all <a href=\"https://auth0.com/docs/multifactor-authentication\">multi-factor authentication</a> configurations.
   * Retrieve Factors and their Status
   */
  async getFactors(initOverrides?: InitOverride): Promise<Array<Factor>> {
    const response = await this.getFactorsRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the Enabled Phone Factors
   * @throws {RequiredError}
   */
  async getPhoneFactorMessageTypesRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetMessageTypes200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/phone/message-types`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve the Enabled Phone Factors
   */
  async getPhoneFactorMessageTypes(
    initOverrides?: InitOverride
  ): Promise<GetMessageTypes200Response> {
    const response = await this.getPhoneFactorMessageTypesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve phone configuration (one of auth0|twilio|phone-message-hook)
   * @throws {RequiredError}
   */
  async getPhoneFactorSelectedProviderRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPhoneProviders200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/phone/selected-provider`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve phone configuration (one of auth0|twilio|phone-message-hook)
   */
  async getPhoneFactorSelectedProvider(
    initOverrides?: InitOverride
  ): Promise<GetPhoneProviders200Response> {
    const response = await this.getPhoneFactorSelectedProviderRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the <a href="https://auth0.com/docs/multifactor-authentication/twilio-configuration">Twilio phone provider configuration</a> (subscription required).
   * Retrieve Twilio phone configuration
   * @throws {RequiredError}
   */
  async getPhoneFactorProviderTwilioRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TwilioFactorProvider>> {
    const response = await this.request(
      {
        path: `/guardian/factors/phone/providers/twilio`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve the <a href=\"https://auth0.com/docs/multifactor-authentication/twilio-configuration\">Twilio phone provider configuration</a> (subscription required).
   * Retrieve Twilio phone configuration
   */
  async getPhoneFactorProviderTwilio(initOverrides?: InitOverride): Promise<TwilioFactorProvider> {
    const response = await this.getPhoneFactorProviderTwilioRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve push notification provider
   * @throws {RequiredError}
   */
  async getPushNotificationSelectedProviderRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPnProviders200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/selected-provider`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve push notification provider
   */
  async getPushNotificationSelectedProvider(
    initOverrides?: InitOverride
  ): Promise<GetPnProviders200Response> {
    const response = await this.getPushNotificationSelectedProviderRaw(initOverrides);
    return await response.value();
  }

  /**
   * Gets the MFA policies for the tenant.
   *
   * The following policies are supported: <ul><li><code>all-applications</code> policy - will prompt with MFA for all logins.</li><li><code>confidence-score</code> policy - will prompt with MFA only for low confidence logins.</li></ul>
   * Use of the Adaptive MFA feature requires an add-on for the Enterprise plan. Please contact sales with any questions. For more information about Adaptive MFA, read our <a href="https://auth0.com/docs/mfa/adaptive-mfa">full documentation</a>.
   *
   * Get the Multi-factor Authentication policies
   * @throws {RequiredError}
   */
  async getPoliciesRaw(initOverrides?: InitOverride): Promise<ApiResponse<Array<string>>> {
    const response = await this.request(
      {
        path: `/guardian/policies`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Gets the MFA policies for the tenant.<br/><br/>The following policies are supported: <ul><li><code>all-applications</code> policy - will prompt with MFA for all logins.</li><li><code>confidence-score</code> policy - will prompt with MFA only for low confidence logins.</li></ul><br/>Use of the Adaptive MFA feature requires an add-on for the Enterprise plan. Please contact sales with any questions. For more information about Adaptive MFA, read our <a href=\"https://auth0.com/docs/mfa/adaptive-mfa\">full documentation</a>.<br/>
   * Get the Multi-factor Authentication policies
   */
  async getPolicies(initOverrides?: InitOverride): Promise<Array<string>> {
    const response = await this.getPoliciesRaw(initOverrides);
    return await response.value();
  }

  /**
   * A new endpoint is available to retrieve the configuration related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_selected_provider'>phone configuration</a>). It has the same payload as this one. Please use it instead.
   * Retrieve SMS configuration (one of auth0|twilio|phone-message-hook)
   * @throws {RequiredError}
   */
  async getSmsSelectedProviderRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetPhoneProviders200Response>> {
    const response = await this.request(
      {
        path: `/guardian/factors/sms/selected-provider`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * A new endpoint is available to retrieve the configuration related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_selected_provider\'>phone configuration</a>). It has the same payload as this one. Please use it instead.
   * Retrieve SMS configuration (one of auth0|twilio|phone-message-hook)
   */
  async getSmsSelectedProvider(
    initOverrides?: InitOverride
  ): Promise<GetPhoneProviders200Response> {
    const response = await this.getSmsSelectedProviderRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the <a href="https://auth0.com/docs/multifactor-authentication/twilio-configuration">Twilio SMS provider configuration</a> (subscription required).
   *
   *     A new endpoint is available to retrieve the Twilio configuration related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_twilio'>phone Twilio configuration</a>). It has the same payload as this one. Please use it instead.
   * Retrieve Twilio SMS configuration
   * @throws {RequiredError}
   */
  async getSmsFactorProviderTwilioRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<TwilioFactorProvider>> {
    const response = await this.request(
      {
        path: `/guardian/factors/sms/providers/twilio`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve the <a href=\"https://auth0.com/docs/multifactor-authentication/twilio-configuration\">Twilio SMS provider configuration</a> (subscription required).<br/><br/>    A new endpoint is available to retrieve the Twilio configuration related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_twilio\'>phone Twilio configuration</a>). It has the same payload as this one. Please use it instead.
   * Retrieve Twilio SMS configuration
   */
  async getSmsFactorProviderTwilio(initOverrides?: InitOverride): Promise<TwilioFactorProvider> {
    const response = await this.getSmsFactorProviderTwilioRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the <a href="https://auth0.com/docs/multifactor-authentication/developer/sns-configuration">AWS SNS push notification provider configuration</a> (subscription required).
   * Retrieve AWS SNS push notification configuration
   * @throws {RequiredError}
   */
  async getPushNotificationProviderSNSRaw(
    initOverrides?: InitOverride
  ): Promise<ApiResponse<SnsFactorProvider>> {
    const response = await this.request(
      {
        path: `/guardian/factors/push-notification/providers/sns`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve the <a href=\"https://auth0.com/docs/multifactor-authentication/developer/sns-configuration\">AWS SNS push notification provider configuration</a> (subscription required).
   * Retrieve AWS SNS push notification configuration
   */
  async getPushNotificationProviderSNS(initOverrides?: InitOverride): Promise<SnsFactorProvider> {
    const response = await this.getPushNotificationProviderSNSRaw(initOverrides);
    return await response.value();
  }

  /**
   * Updates APNs provider configuration
   * @throws {RequiredError}
   */
  async updatePushNotificationProviderAPNSRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Updates APNs provider configuration
   */
  async updatePushNotificationProviderAPNS(
    bodyParameters: PutApnsRequest,
    initOverrides?: InitOverride
  ): Promise<PutApns200Response> {
    const response = await this.updatePushNotificationProviderAPNSRaw(
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Updates FCM provider configuration
   * @throws {RequiredError}
   */
  async updatePushNotificationProviderFCMRaw(
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

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Updates FCM provider configuration
   */
  async updatePushNotificationProviderFCM(
    bodyParameters: PutFcmRequest,
    initOverrides?: InitOverride
  ): Promise<{ [key: string]: any }> {
    const response = await this.updatePushNotificationProviderFCMRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Configure the <a href="https://auth0.com/docs/multifactor-authentication/developer/sns-configuration">AWS SNS push notification provider configuration</a> (subscription required).
   * Update SNS configuration for push notifications
   * @throws {RequiredError}
   */
  async updatePushNotificationProviderSNSRaw(
    bodyParameters: PutSnsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutSnsRequest>> {
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Configure the <a href=\"https://auth0.com/docs/multifactor-authentication/developer/sns-configuration\">AWS SNS push notification provider configuration</a> (subscription required).
   * Update SNS configuration for push notifications
   */
  async updatePushNotificationProviderSNS(
    bodyParameters: PutSnsRequest,
    initOverrides?: InitOverride
  ): Promise<PutSnsRequest> {
    const response = await this.updatePushNotificationProviderSNSRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Generate an email with a link to start the multi-factor authentication enrollment process (subscription required).
   * Create a multi-factor authentication enrollment ticket
   * @throws {RequiredError}
   */
  async createEnrollmentTicketRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Generate an email with a link to start the multi-factor authentication enrollment process (subscription required).
   * Create a multi-factor authentication enrollment ticket
   */
  async createEnrollmentTicket(
    bodyParameters: EnrollmentCreate,
    initOverrides?: InitOverride
  ): Promise<PostTicket200Response> {
    const response = await this.createEnrollmentTicketRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Updates APNs provider configuration
   * @throws {RequiredError}
   */
  async setPushNotificationProviderAPNSRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Updates APNs provider configuration
   */
  async setPushNotificationProviderAPNS(
    bodyParameters: PutApnsRequest,
    initOverrides?: InitOverride
  ): Promise<PutApns200Response> {
    const response = await this.setPushNotificationProviderAPNSRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Customize the messages sent to complete phone enrollment and verification (subscription required).
   * Update Enrollment and Verification Phone Templates
   * @throws {RequiredError}
   */
  async setPhoneFactorTemplatesRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Customize the messages sent to complete phone enrollment and verification (subscription required).
   * Update Enrollment and Verification Phone Templates
   */
  async setPhoneFactorTemplates(
    bodyParameters: TemplateMessages,
    initOverrides?: InitOverride
  ): Promise<TemplateMessages> {
    const response = await this.setPhoneFactorTemplatesRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Customize the messages sent to complete SMS enrollment and verification (subscription required).
   *
   *     A new endpoint is available to update enrollment and verification templates related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_templates'>phone templates</a>). It has the same payload as this one. Please use it instead.
   * Update SMS Enrollment and Verification Templates
   * @throws {RequiredError}
   */
  async setSmsFactorTemplatesRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Customize the messages sent to complete SMS enrollment and verification (subscription required).<br/>    <br/>    A new endpoint is available to update enrollment and verification templates related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_templates\'>phone templates</a>). It has the same payload as this one. Please use it instead.
   * Update SMS Enrollment and Verification Templates
   */
  async setSmsFactorTemplates(
    bodyParameters: TemplateMessages,
    initOverrides?: InitOverride
  ): Promise<TemplateMessages> {
    const response = await this.setSmsFactorTemplatesRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update a multi-factor authentication factor (subscription required).
   * Update a Multi-factor Authentication Factor
   * @throws {RequiredError}
   */
  async updateFactorRaw(
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update a multi-factor authentication factor (subscription required).
   * Update a Multi-factor Authentication Factor
   */
  async updateFactor(
    requestParameters: PutFactorsByNameOperationRequest,
    bodyParameters: PutFactorsByNameRequest,
    initOverrides?: InitOverride
  ): Promise<PutFactorsByName200Response> {
    const response = await this.updateFactorRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Updates FCM provider configuration
   * @throws {RequiredError}
   */
  async setPushNotificationProviderFCMRaw(
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

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Updates FCM provider configuration
   */
  async setPushNotificationProviderFCM(
    bodyParameters: PutFcmRequest,
    initOverrides?: InitOverride
  ): Promise<{ [key: string]: any }> {
    const response = await this.setPushNotificationProviderFCMRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update enabled phone factors for multi-factor authentication
   * Update the Enabled Phone Factors
   * @throws {RequiredError}
   */
  async updatePhoneFactorMessageTypesRaw(
    bodyParameters: PutMessageTypesRequest,
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update enabled phone factors for multi-factor authentication
   * Update the Enabled Phone Factors
   */
  async updatePhoneFactorMessageTypes(
    bodyParameters: PutMessageTypesRequest,
    initOverrides?: InitOverride
  ): Promise<GetMessageTypes200Response> {
    const response = await this.updatePhoneFactorMessageTypesRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update phone configuration (one of auth0|twilio|phone-message-hook)
   * @throws {RequiredError}
   */
  async updatePhoneFactorSelectedProviderRaw(
    bodyParameters: PutPhoneProvidersRequest,
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update phone configuration (one of auth0|twilio|phone-message-hook)
   */
  async updatePhoneFactorSelectedProvider(
    bodyParameters: PutPhoneProvidersRequest,
    initOverrides?: InitOverride
  ): Promise<GetPhoneProviders200Response> {
    const response = await this.updatePhoneFactorSelectedProviderRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update Push Notification configuration (one of direct|sns|guardian)
   * @throws {RequiredError}
   */
  async setPushNotificationSelectedProviderRaw(
    bodyParameters: PutPnProvidersRequest,
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update Push Notification configuration (one of direct|sns|guardian)
   */
  async setPushNotificationSelectedProvider(
    bodyParameters: PutPnProvidersRequest,
    initOverrides?: InitOverride
  ): Promise<GetPnProviders200Response> {
    const response = await this.setPushNotificationSelectedProviderRaw(
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Sets the MFA policies for the tenant.
   *
   * The following policies are supported: <ul><li><code>all-applications</code> policy - will prompt with MFA for all logins.</li><li><code>confidence-score</code> policy - will prompt with MFA only for low confidence logins.</li></ul> Pass an empty array to remove all MFA policies.
   * Use of the Adaptive MFA feature requires an add-on for the Enterprise plan. Please contact sales with any questions. For more information about Adaptive MFA, read our <a href="https://auth0.com/docs/mfa/adaptive-mfa">full documentation</a>.
   *
   *
   * Set the Multi-factor Authentication policies
   * @throws {RequiredError}
   */
  async updatePoliciesRaw(
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

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Sets the MFA policies for the tenant.<br/><br/>The following policies are supported: <ul><li><code>all-applications</code> policy - will prompt with MFA for all logins.</li><li><code>confidence-score</code> policy - will prompt with MFA only for low confidence logins.</li></ul> Pass an empty array to remove all MFA policies.<br/>Use of the Adaptive MFA feature requires an add-on for the Enterprise plan. Please contact sales with any questions. For more information about Adaptive MFA, read our <a href=\"https://auth0.com/docs/mfa/adaptive-mfa\">full documentation</a>.<br/><br/>
   * Set the Multi-factor Authentication policies
   */
  async updatePolicies(
    bodyParameters: Array<string>,
    initOverrides?: InitOverride
  ): Promise<Array<string>> {
    const response = await this.updatePoliciesRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * A new endpoint is available to update the configuration related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_selected_provider'>phone configuration</a>). It has the same payload as this one. Please use it instead.
   * Update SMS configuration (one of auth0|twilio|phone-message-hook)
   * @throws {RequiredError}
   */
  async setSmsSelectedProviderRaw(
    bodyParameters: PutPhoneProvidersRequest,
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * A new endpoint is available to update the configuration related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_selected_provider\'>phone configuration</a>). It has the same payload as this one. Please use it instead.
   * Update SMS configuration (one of auth0|twilio|phone-message-hook)
   */
  async setSmsSelectedProvider(
    bodyParameters: PutPhoneProvidersRequest,
    initOverrides?: InitOverride
  ): Promise<GetPhoneProviders200Response> {
    const response = await this.setSmsSelectedProviderRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Configure the <a href="https://auth0.com/docs/multifactor-authentication/twilio-configuration">Twilio SMS provider configuration</a> (subscription required).
   *
   *     A new endpoint is available to update the Twilio configuration related to phone factors (<a href='https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_twilio'>phone Twilio configuration</a>). It has the same payload as this one. Please use it instead.
   * Update Twilio SMS configuration
   * @throws {RequiredError}
   */
  async setSmsFactorProviderTwilioRaw(
    bodyParameters: PutTwilioRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutTwilioRequest>> {
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Configure the <a href=\"https://auth0.com/docs/multifactor-authentication/twilio-configuration\">Twilio SMS provider configuration</a> (subscription required).<br/>    <br/>    A new endpoint is available to update the Twilio configuration related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_twilio\'>phone Twilio configuration</a>). It has the same payload as this one. Please use it instead.
   * Update Twilio SMS configuration
   */
  async setSmsFactorProviderTwilio(
    bodyParameters: PutTwilioRequest,
    initOverrides?: InitOverride
  ): Promise<PutTwilioRequest> {
    const response = await this.setSmsFactorProviderTwilioRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Configure the <a href="https://auth0.com/docs/multifactor-authentication/developer/sns-configuration">AWS SNS push notification provider configuration</a> (subscription required).
   * Update AWS SNS push notification configuration
   * @throws {RequiredError}
   */
  async setPushNotificationProviderSNSRaw(
    bodyParameters: PutSnsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutSnsRequest>> {
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Configure the <a href=\"https://auth0.com/docs/multifactor-authentication/developer/sns-configuration\">AWS SNS push notification provider configuration</a> (subscription required).
   * Update AWS SNS push notification configuration
   */
  async setPushNotificationProviderSNS(
    bodyParameters: PutSnsRequest,
    initOverrides?: InitOverride
  ): Promise<PutSnsRequest> {
    const response = await this.setPushNotificationProviderSNSRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Configure the <a href="https://auth0.com/docs/multifactor-authentication/twilio-configuration">Twilio phone provider configuration</a> (subscription required).
   * Update Twilio phone configuration
   * @throws {RequiredError}
   */
  async updatePhoneFactorProviderTwilioRaw(
    bodyParameters: PutTwilioRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PutTwilioRequest>> {
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

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Configure the <a href=\"https://auth0.com/docs/multifactor-authentication/twilio-configuration\">Twilio phone provider configuration</a> (subscription required).
   * Update Twilio phone configuration
   */
  async updatePhoneFactorProviderTwilio(
    bodyParameters: PutTwilioRequest,
    initOverrides?: InitOverride
  ): Promise<PutTwilioRequest> {
    const response = await this.updatePhoneFactorProviderTwilioRaw(bodyParameters, initOverrides);
    return await response.value();
  }
}

/**
 * @export
 */
export const PutFactorsByNameOperationNameEnum = {
  push_notification: 'push-notification',
  sms: 'sms',
  email: 'email',
  duo: 'duo',
  otp: 'otp',
  webauthn_roaming: 'webauthn-roaming',
  webauthn_platform: 'webauthn-platform',
  recovery_code: 'recovery-code',
} as const;
export type PutFactorsByNameOperationNameEnum =
  typeof PutFactorsByNameOperationNameEnum[keyof typeof PutFactorsByNameOperationNameEnum];
