/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
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

export interface DeleteEnrollmentsByIdRequest {
  id: string;
}

export interface GetEnrollmentsByIdRequest {
  id: string;
}

export interface PutFactorsByNameOperationRequest {
  name: PutFactorsByNameOperationNameEnum;
}

/**
 *
 */
export class GuardianManager extends runtime.BaseAPI {
  /**
   * Delete an enrollment to allow the user to enroll with multi-factor authentication again.
   * Delete a multi-factor authentication enrollment
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async deleteGuardianEnrollmentRaw(
    requestParameters: DeleteEnrollmentsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deleteGuardianEnrollment.'
      );
    }

    const response = await this.request(
      {
        path: `/guardian/enrollments/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteGuardianEnrollmentRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve APNS push notification configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getPushNotificationProviderAPNSRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetApns200Response>> {
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
  async getPushNotificationProviderAPNS(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetApns200Response> {
    const response = await this.getPushNotificationProviderAPNSRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve an enrollment (including its status and type).<br/><br/>Note: Phone numbers are partially obfuscated.
   * Retrieve a multi-factor authentication enrollment
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getGuardianEnrollmentRaw(
    requestParameters: GetEnrollmentsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Enrollment>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getGuardianEnrollment.'
      );
    }

    const response = await this.request(
      {
        path: `/guardian/enrollments/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Enrollment> {
    const response = await this.getGuardianEnrollmentRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve phone enrollment and verification templates (subscription required).
   * Retrieve Enrollment and Verification Phone Templates
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getPhoneFactorTemplatesRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TemplateMessages>> {
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
  async getPhoneFactorTemplates(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TemplateMessages> {
    const response = await this.getPhoneFactorTemplatesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve SMS enrollment and verification templates (subscription required). <br/><br/>    A new endpoint is available to retrieve enrollment and verification templates related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_templates\'>phone templates</a>). It has the same payload as this one. Please use it instead.
   * Retrieve SMS Enrollment and Verification Templates
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getSmsFactorTemplatesRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TemplateMessages>> {
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
  async getSmsFactorTemplates(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TemplateMessages> {
    const response = await this.getSmsFactorTemplatesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve all <a href=\"https://auth0.com/docs/multifactor-authentication\">multi-factor authentication</a> configurations.
   * Retrieve Factors and their Status
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getFactorsRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<Factor>>> {
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
  async getFactors(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<Factor>> {
    const response = await this.getFactorsRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the Enabled Phone Factors
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getPhoneFactorMessageTypesRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetMessageTypes200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetMessageTypes200Response> {
    const response = await this.getPhoneFactorMessageTypesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve phone configuration (one of auth0|twilio|phone-message-hook)
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getPhoneFactorSelectedProviderRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetPhoneProviders200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetPhoneProviders200Response> {
    const response = await this.getPhoneFactorSelectedProviderRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the <a href=\"https://auth0.com/docs/multifactor-authentication/twilio-configuration\">Twilio phone provider configuration</a> (subscription required).
   * Retrieve Twilio phone configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getPhoneFactorProviderTwilioRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TwilioFactorProvider>> {
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
  async getPhoneFactorProviderTwilio(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TwilioFactorProvider> {
    const response = await this.getPhoneFactorProviderTwilioRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve push notification provider
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getPushNotificationSelectedProviderRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetPnProviders200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetPnProviders200Response> {
    const response = await this.getPushNotificationSelectedProviderRaw(initOverrides);
    return await response.value();
  }

  /**
   * Gets the MFA policies for the tenant.<br/><br/>The following policies are supported: <ul><li><code>all-applications</code> policy - will prompt with MFA for all logins.</li><li><code>confidence-score</code> policy - will prompt with MFA only for low confidence logins.</li></ul><br/>Use of the Adaptive MFA feature requires an add-on for the Enterprise plan. Please contact sales with any questions. For more information about Adaptive MFA, read our <a href=\"https://auth0.com/docs/mfa/adaptive-mfa\">full documentation</a>.<br/>
   * Get the Multi-factor Authentication policies
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getPoliciesRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<string>>> {
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
  async getPolicies(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<string>> {
    const response = await this.getPoliciesRaw(initOverrides);
    return await response.value();
  }

  /**
   * A new endpoint is available to retrieve the configuration related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_selected_provider\'>phone configuration</a>). It has the same payload as this one. Please use it instead.
   * Retrieve SMS configuration (one of auth0|twilio|phone-message-hook)
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getSmsSelectedProviderRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetPhoneProviders200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetPhoneProviders200Response> {
    const response = await this.getSmsSelectedProviderRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the <a href=\"https://auth0.com/docs/multifactor-authentication/twilio-configuration\">Twilio SMS provider configuration</a> (subscription required).<br/><br/>    A new endpoint is available to retrieve the Twilio configuration related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/get_twilio\'>phone Twilio configuration</a>). It has the same payload as this one. Please use it instead.
   * Retrieve Twilio SMS configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getSmsFactorProviderTwilioRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TwilioFactorProvider>> {
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
  async getSmsFactorProviderTwilio(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TwilioFactorProvider> {
    const response = await this.getSmsFactorProviderTwilioRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the <a href=\"https://auth0.com/docs/multifactor-authentication/developer/sns-configuration\">AWS SNS push notification provider configuration</a> (subscription required).
   * Retrieve AWS SNS push notification configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async getPushNotificationProviderSNSRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<SnsFactorProvider>> {
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
  async getPushNotificationProviderSNS(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<SnsFactorProvider> {
    const response = await this.getPushNotificationProviderSNSRaw(initOverrides);
    return await response.value();
  }

  /**
   * Updates APNs provider configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async updatePushNotificationProviderAPNSRaw(
    bodyParameters: PutApnsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PutApns200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
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
   * @memberof GuardianManager
   */
  async updatePushNotificationProviderFCMRaw(
    bodyParameters: PutFcmRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<{ [key: string]: any }>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<{ [key: string]: any }> {
    const response = await this.updatePushNotificationProviderFCMRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Configure the <a href=\"https://auth0.com/docs/multifactor-authentication/developer/sns-configuration\">AWS SNS push notification provider configuration</a> (subscription required).
   * Update SNS configuration for push notifications
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async updatePushNotificationProviderSNSRaw(
    bodyParameters: PutSnsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PutSnsRequest>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PutSnsRequest> {
    const response = await this.updatePushNotificationProviderSNSRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Generate an email with a link to start the multi-factor authentication enrollment process (subscription required).
   * Create a multi-factor authentication enrollment ticket
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async createEnrollmentTicketRaw(
    bodyParameters: EnrollmentCreate,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostTicket200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostTicket200Response> {
    const response = await this.createEnrollmentTicketRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Updates APNs provider configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async setPushNotificationProviderAPNSRaw(
    bodyParameters: PutApnsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PutApns200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PutApns200Response> {
    const response = await this.setPushNotificationProviderAPNSRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Customize the messages sent to complete phone enrollment and verification (subscription required).
   * Update Enrollment and Verification Phone Templates
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async setPhoneFactorTemplatesRaw(
    bodyParameters: TemplateMessages,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TemplateMessages>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TemplateMessages> {
    const response = await this.setPhoneFactorTemplatesRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Customize the messages sent to complete SMS enrollment and verification (subscription required).<br/>    <br/>    A new endpoint is available to update enrollment and verification templates related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_templates\'>phone templates</a>). It has the same payload as this one. Please use it instead.
   * Update SMS Enrollment and Verification Templates
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async setSmsFactorTemplatesRaw(
    bodyParameters: TemplateMessages,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TemplateMessages>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TemplateMessages> {
    const response = await this.setSmsFactorTemplatesRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update a multi-factor authentication factor (subscription required).
   * Update a Multi-factor Authentication Factor
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async updateFactorRaw(
    requestParameters: PutFactorsByNameOperationRequest,
    bodyParameters: PutFactorsByNameRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PutFactorsByName200Response>> {
    if (requestParameters.name === null || requestParameters.name === undefined) {
      throw new runtime.RequiredError(
        'name',
        'Required parameter requestParameters.name was null or undefined when calling updateFactor.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/guardian/factors/{name}`.replace(
          `{${'name'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PutFactorsByName200Response> {
    const response = await this.updateFactorRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Updates FCM provider configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async setPushNotificationProviderFCMRaw(
    bodyParameters: PutFcmRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<{ [key: string]: any }>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<{ [key: string]: any }> {
    const response = await this.setPushNotificationProviderFCMRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update enabled phone factors for multi-factor authentication
   * Update the Enabled Phone Factors
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async updatePhoneFactorMessageTypesRaw(
    bodyParameters: PutMessageTypesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetMessageTypes200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetMessageTypes200Response> {
    const response = await this.updatePhoneFactorMessageTypesRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update phone configuration (one of auth0|twilio|phone-message-hook)
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async updatePhoneFactorSelectedProviderRaw(
    bodyParameters: PutPhoneProvidersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetPhoneProviders200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetPhoneProviders200Response> {
    const response = await this.updatePhoneFactorSelectedProviderRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update Push Notification configuration (one of direct|sns|guardian)
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async setPushNotificationSelectedProviderRaw(
    bodyParameters: PutPnProvidersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetPnProviders200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetPnProviders200Response> {
    const response = await this.setPushNotificationSelectedProviderRaw(
      bodyParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Sets the MFA policies for the tenant.<br/><br/>The following policies are supported: <ul><li><code>all-applications</code> policy - will prompt with MFA for all logins.</li><li><code>confidence-score</code> policy - will prompt with MFA only for low confidence logins.</li></ul> Pass an empty array to remove all MFA policies.<br/>Use of the Adaptive MFA feature requires an add-on for the Enterprise plan. Please contact sales with any questions. For more information about Adaptive MFA, read our <a href=\"https://auth0.com/docs/mfa/adaptive-mfa\">full documentation</a>.<br/><br/>
   * Set the Multi-factor Authentication policies
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async updatePoliciesRaw(
    bodyParameters: Array<string>,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<string>>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<string>> {
    const response = await this.updatePoliciesRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * A new endpoint is available to update the configuration related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_selected_provider\'>phone configuration</a>). It has the same payload as this one. Please use it instead.
   * Update SMS configuration (one of auth0|twilio|phone-message-hook)
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async setSmsSelectedProviderRaw(
    bodyParameters: PutPhoneProvidersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<GetPhoneProviders200Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<GetPhoneProviders200Response> {
    const response = await this.setSmsSelectedProviderRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Configure the <a href=\"https://auth0.com/docs/multifactor-authentication/twilio-configuration\">Twilio SMS provider configuration</a> (subscription required).<br/>    <br/>    A new endpoint is available to update the Twilio configuration related to phone factors (<a href=\'https://manage.local.dev.auth0.com/docs/api/management/v2/#!/Guardian/put_twilio\'>phone Twilio configuration</a>). It has the same payload as this one. Please use it instead.
   * Update Twilio SMS configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async setSmsFactorProviderTwilioRaw(
    bodyParameters: PutTwilioRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PutTwilioRequest>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PutTwilioRequest> {
    const response = await this.setSmsFactorProviderTwilioRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Configure the <a href=\"https://auth0.com/docs/multifactor-authentication/developer/sns-configuration\">AWS SNS push notification provider configuration</a> (subscription required).
   * Update AWS SNS push notification configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async setPushNotificationProviderSNSRaw(
    bodyParameters: PutSnsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PutSnsRequest>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PutSnsRequest> {
    const response = await this.setPushNotificationProviderSNSRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Configure the <a href=\"https://auth0.com/docs/multifactor-authentication/twilio-configuration\">Twilio phone provider configuration</a> (subscription required).
   * Update Twilio phone configuration
   * @throws {RequiredError}
   * @memberof GuardianManager
   */
  async updatePhoneFactorProviderTwilioRaw(
    bodyParameters: PutTwilioRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PutTwilioRequest>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
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
