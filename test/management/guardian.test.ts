import nock, { Scope } from 'nock';
import {
  DeleteEnrollmentsByIdRequest,
  Enrollment,
  EnrollmentCreate,
  Factor,
  GetApns200Response,
  GetEnrollmentsByIdRequest,
  GetMessageTypes200Response,
  GetPhoneProviders200Response,
  GetPnProviders200Response,
  GuardianManager,
  PostTicket200Response,
  PutApns200Response,
  PutApnsRequest,
  PutFactorsByName200Response,
  PutFactorsByNameOperationRequest,
  PutFactorsByNameRequest,
  PutFcmRequest,
  PutSnsRequest,
  PutTwilioRequest,
  SnsFactorProvider,
  TemplateMessages,
  TwilioFactorProvider,
  ManagementClient,
  ManagementApiError,
} from '../../src/index.js';

const API_URL = 'https://tenant.auth0.com/api/v2';

describe('GuardianManager', () => {
  let token: string;
  let guardian: GuardianManager;

  beforeAll(() => {
    token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    guardian = client.guardian;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('instance', () => {
    const methods = [
      'deleteGuardianEnrollment',
      'getPushNotificationProviderAPNS',
      'getGuardianEnrollment',
      'getPhoneFactorTemplates',
      'getSmsFactorTemplates',
      'getFactors',
      'getPhoneFactorMessageTypes',
      'getPhoneFactorSelectedProvider',
      'getPhoneFactorProviderTwilio',
      'getPushNotificationSelectedProvider',
      'getPolicies',
      'getSmsSelectedProvider',
      'getSmsFactorProviderTwilio',
      'getPushNotificationProviderSNS',
      'updatePushNotificationProviderAPNS',
      'updatePushNotificationProviderFCM',
      'updatePushNotificationProviderSNS',
      'createEnrollmentTicket',
      'setPushNotificationProviderAPNS',
      'setPhoneFactorTemplates',
      'setSmsFactorTemplates',
      'updateFactor',
      'setPushNotificationProviderFCM',
      'updatePhoneFactorMessageTypes',
      'updatePhoneFactorSelectedProvider',
      'setPushNotificationSelectedProvider',
      'updatePolicies',
      'setSmsSelectedProvider',
      'setSmsFactorProviderTwilio',
      'setPushNotificationProviderSNS',
      'updatePhoneFactorProviderTwilio', // PutTwilioRequest
    ];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((guardian as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new GuardianManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new GuardianManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#deleteGuardianEnrollment', () => {
    const data: DeleteEnrollmentsByIdRequest = {
      id: 'dev_0000000000000001',
    };
    let request: Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/guardian/enrollments/${data.id}`).reply(200, {});
    });

    it('should perform a DELETE request to /guardian/enrollments/:id', async () => {
      await expect(guardian.deleteGuardianEnrollment(data)).resolves.toHaveProperty('status', 200);
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).delete(`/guardian/enrollments/${data.id}`).reply(500, {});

      await expect(guardian.deleteGuardianEnrollment(data)).rejects.toThrowError(
        ManagementApiError
      );
    });
  });

  describe('#getPushNotificationProviderAPNS', () => {
    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/push-notification/providers/apns').reply(500, {});

      await expect(guardian.getPushNotificationProviderAPNS()).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      const data: GetApns200Response = {
        bundle_id: 'foo',
        sandbox: true,
        enabled: false,
      };
      nock(API_URL).get('/guardian/factors/push-notification/providers/apns').reply(200, data);

      await expect(guardian.getPushNotificationProviderAPNS()).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#getGuardianEnrollment', () => {
    const params: GetEnrollmentsByIdRequest = {
      id: 'foo',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get(`/guardian/enrollments/${params.id}`).reply(500, {});

      await expect(guardian.getGuardianEnrollment(params)).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      const data: Enrollment = {
        id: 'dev_0000000000000001',
        status: 'pending',
        name: 'iPhone 7',
        identifier: '76dc-a90c-a88c-a90c-a88c-a88c-a90c',
        phone_number: '+1 999999999999',
        enrolled_at: '2016-07-12T17:56:26.804Z',
        last_auth: '2016-07-12T17:56:26.804Z',
      };
      nock(API_URL).get(`/guardian/enrollments/${params.id}`).reply(200, data);

      await expect(guardian.getGuardianEnrollment(params)).resolves.toHaveProperty('data', data);
    });
  });

  describe('#getPhoneFactorTemplates', () => {
    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/phone/templates').reply(500, {});

      await expect(guardian.getPhoneFactorTemplates()).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data: TemplateMessages = {
        enrollment_message: 'foo',
        verification_message: 'bar',
      };
      nock(API_URL).get('/guardian/factors/phone/templates').reply(200, data);

      await expect(guardian.getPhoneFactorTemplates()).resolves.toHaveProperty('data', data);
    });
  });

  describe('#getSmsFactorTemplates', () => {
    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/sms/templates').reply(500, {});

      await expect(guardian.getSmsFactorTemplates()).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data: TemplateMessages = {
        enrollment_message: 'foo',
        verification_message: 'bar',
      };
      nock(API_URL).get('/guardian/factors/sms/templates').reply(200, data);

      await expect(guardian.getSmsFactorTemplates()).resolves.toHaveProperty('data', data);
    });

    it('should not fail when no response returned', async () => {
      nock(API_URL).get('/guardian/factors/sms/templates').reply(204);

      await expect(guardian.getSmsFactorTemplates()).resolves.not.toThrow();
    });
  });

  describe('#getFactors', () => {
    const data: Factor[] = [
      { name: 'sms', enabled: true, trial_expired: false },
      { name: 'push-notification', enabled: false, trial_expired: false },
      { name: 'otp', enabled: false, trial_expired: false },
      { name: 'email', enabled: false, trial_expired: false },
      { name: 'duo', enabled: false, trial_expired: false },
    ];

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors').reply(500, {});

      await expect(guardian.getFactors()).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/factors').reply(200, data);

      await expect(guardian.getFactors()).resolves.toHaveProperty('data', data);
    });
  });

  describe('#getPhoneFactorMessageTypes', () => {
    const data: GetMessageTypes200Response = {
      message_types: ['sms', 'voice'],
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();
      nock(API_URL).get('/guardian/factors/phone/message-types').reply(500, {});

      await expect(guardian.getPhoneFactorMessageTypes()).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/factors/phone/message-types').reply(200, data);

      await expect(guardian.getPhoneFactorMessageTypes()).resolves.toHaveProperty('data', data);
    });
  });

  describe('#getPhoneFactorSelectedProvider', () => {
    const data: GetPhoneProviders200Response = {
      provider: 'twilio',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();
      nock(API_URL).get('/guardian/factors/phone/selected-provider').reply(500, {});

      await expect(guardian.getPhoneFactorSelectedProvider()).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/factors/phone/selected-provider').reply(200, data);

      await expect(guardian.getPhoneFactorSelectedProvider()).resolves.toHaveProperty('data', data);
    });
  });

  describe('#getPhoneFactorProviderTwilio', () => {
    const data: TwilioFactorProvider = {
      from: '+1223323',
      messaging_service_sid: '5dEkAiHLPCuQ1uJj4qNXcAnERFAL6cpq',
      auth_token: 'zw5Ku6z2sxhd0ZVXto5SDHX6KPDByJPU',
      sid: 'wywA2BH4VqTpfywiDuyDAYZL3xQjoO40',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();
      nock(API_URL).get('/guardian/factors/phone/providers/twilio').reply(500, {});

      await expect(guardian.getPhoneFactorProviderTwilio()).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/factors/phone/providers/twilio').reply(200, data);

      await expect(guardian.getPhoneFactorProviderTwilio()).resolves.toHaveProperty('data', data);
    });
  });

  describe('#getPushNotificationSelectedProvider', () => {
    const data: GetPnProviders200Response = {
      provider: 'sns',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();
      nock(API_URL).get('/guardian/factors/push-notification/selected-provider').reply(500, {});

      await expect(guardian.getPushNotificationSelectedProvider()).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/factors/push-notification/selected-provider').reply(200, data);

      await expect(guardian.getPushNotificationSelectedProvider()).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#getPolicies', () => {
    const data: string[] = ['foo', 'bar'];

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();
      nock(API_URL).get('/guardian/policies').reply(500, {});

      await expect(guardian.getPolicies()).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/policies').reply(200, data);

      await expect(guardian.getPolicies()).resolves.toHaveProperty('data', data);
    });
  });

  describe('#getSmsSelectedProvider', () => {
    const data: GetPhoneProviders200Response = { provider: 'auth0' };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/sms/selected-provider').reply(500, {});

      await expect(guardian.getSmsSelectedProvider()).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).get('/guardian/factors/sms/selected-provider').reply(200, data);

      await expect(guardian.getSmsSelectedProvider()).resolves.toHaveProperty('data', data);
    });
  });

  describe('#getSmsFactorProviderTwilio', () => {
    const data: TwilioFactorProvider = {
      from: '+1223323',
      messaging_service_sid: '5dEkAiHLPCuQ1uJj4qNXcAnERFAL6cpq',
      auth_token: 'zw5Ku6z2sxhd0ZVXto5SDHX6KPDByJPU',
      sid: 'wywA2BH4VqTpfywiDuyDAYZL3xQjoO40',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/sms/providers/twilio').reply(500, {});

      await expect(guardian.getSmsFactorProviderTwilio()).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).get('/guardian/factors/sms/providers/twilio').reply(200, data);

      await expect(guardian.getSmsFactorProviderTwilio()).resolves.toHaveProperty('data', data);
    });
  });

  describe('#getPushNotificationProviderSNS', () => {
    const data: SnsFactorProvider = {
      aws_access_key_id: 'foo',
      aws_secret_access_key: 'bar',
      aws_region: 'baz',
      sns_apns_platform_application_arn: 'qux',
      sns_gcm_platform_application_arn: 'quux',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/push-notification/providers/sns').reply(500, {});

      await expect(guardian.getPushNotificationProviderSNS()).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).get('/guardian/factors/push-notification/providers/sns').reply(200, data);

      await expect(guardian.getPushNotificationProviderSNS()).resolves.toHaveProperty('data', data);
    });
  });

  describe('#updatePushNotificationProviderAPNS', () => {
    const params: PutApnsRequest = {
      sandbox: true,
      bundle_id: 'foo',
      p12: 'foo',
    };
    const data: PutApns200Response = {
      sandbox: true,
      bundle_id: 'foo',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).patch('/guardian/factors/push-notification/providers/apns').reply(500, {});

      await expect(guardian.updatePushNotificationProviderAPNS(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).patch('/guardian/factors/push-notification/providers/apns').reply(200, data);

      await expect(guardian.updatePushNotificationProviderAPNS(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#updatePushNotificationProviderFCM', () => {
    const params: PutFcmRequest = {
      server_key: 'foo',
    };
    const data: Record<string, any> = {
      foo: true,
      bar: 'foo',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).patch('/guardian/factors/push-notification/providers/fcm').reply(500, {});

      await expect(guardian.updatePushNotificationProviderFCM(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).patch('/guardian/factors/push-notification/providers/fcm').reply(200, data);

      await expect(guardian.updatePushNotificationProviderFCM(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#updatePushNotificationProviderSNS', () => {
    const params: PutSnsRequest = {
      aws_access_key_id: 'foo',
      aws_secret_access_key: 'bar',
      aws_region: 'baz',
      sns_apns_platform_application_arn: 'qux',
      sns_gcm_platform_application_arn: 'quux',
    };
    const data: Record<string, any> = {
      foo: true,
      bar: 'foo',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).patch('/guardian/factors/push-notification/providers/sns').reply(500, {});

      await expect(guardian.updatePushNotificationProviderSNS(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).patch('/guardian/factors/push-notification/providers/sns').reply(200, data);

      await expect(guardian.updatePushNotificationProviderSNS(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#createEnrollmentTicket', () => {
    const params: EnrollmentCreate = {
      user_id: '',
      email: '',
      send_mail: false,
    };
    const data: PostTicket200Response = {
      ticket_id: 'foo',
      ticket_url: 'http://bar.com',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).post('/guardian/enrollments/ticket').reply(500, {});

      await expect(guardian.createEnrollmentTicket(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).post('/guardian/enrollments/ticket').reply(200, data);

      await expect(guardian.createEnrollmentTicket(params)).resolves.toHaveProperty('data', data);
    });
  });

  describe('#setPushNotificationProviderAPNS', () => {
    const params: PutApnsRequest = {
      sandbox: true,
      bundle_id: 'foo',
      p12: 'foo',
    };
    const data: PutApns200Response = {
      sandbox: true,
      bundle_id: 'foo',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/apns').reply(500, {});

      await expect(guardian.setPushNotificationProviderAPNS(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/apns').reply(200, data);

      await expect(guardian.setPushNotificationProviderAPNS(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#setPhoneFactorTemplates', () => {
    const params: TemplateMessages = {
      enrollment_message: 'foo',
      verification_message: 'bar',
    };
    const data: TemplateMessages = {
      enrollment_message: 'foo',
      verification_message: 'bar',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/templates').reply(500, {});

      await expect(guardian.setPhoneFactorTemplates(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/templates').reply(200, data);

      await expect(guardian.setPhoneFactorTemplates(params)).resolves.toHaveProperty('data', data);
    });
  });

  describe('#setSmsFactorTemplates', () => {
    const params: TemplateMessages = {
      enrollment_message: 'foo',
      verification_message: 'bar',
    };
    const data: TemplateMessages = {
      enrollment_message: 'foo',
      verification_message: 'bar',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/templates').reply(500, {});

      await expect(guardian.setSmsFactorTemplates(params)).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/templates').reply(200, data);

      await expect(guardian.setSmsFactorTemplates(params)).resolves.toHaveProperty('data', data);
    });
  });

  describe('#updateFactor', () => {
    const params: PutFactorsByNameOperationRequest = { name: 'sms' };
    const body: PutFactorsByNameRequest = { enabled: true };
    const data: PutFactorsByName200Response = { enabled: true };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put(`/guardian/factors/${params.name}`).reply(500, {});

      await expect(guardian.updateFactor(params, body)).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put(`/guardian/factors/${params.name}`).reply(200, data);

      await expect(guardian.updateFactor(params, body)).resolves.toHaveProperty('data', data);
    });
  });

  describe('#setPushNotificationProviderFCM', () => {
    const params: PutFcmRequest = { server_key: 'foo' };
    const data: PutFactorsByName200Response = { enabled: true };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/fcm').reply(500, {});

      await expect(guardian.setPushNotificationProviderFCM(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/fcm').reply(200, data);

      await expect(guardian.setPushNotificationProviderFCM(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#updatePhoneFactorMessageTypes', () => {
    const params: GetMessageTypes200Response = { message_types: ['sms', 'voice'] };
    const data: GetMessageTypes200Response = { message_types: ['sms', 'voice'] };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/message-types').reply(500, {});

      await expect(guardian.updatePhoneFactorMessageTypes(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/message-types').reply(200, data);

      await expect(guardian.updatePhoneFactorMessageTypes(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#updatePhoneFactorSelectedProvider', () => {
    const params: GetPhoneProviders200Response = { provider: 'twilio' };
    const data: GetPhoneProviders200Response = { provider: 'twilio' };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/selected-provider').reply(500, {});

      await expect(guardian.updatePhoneFactorSelectedProvider(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/selected-provider').reply(200, data);

      await expect(guardian.updatePhoneFactorSelectedProvider(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#setPushNotificationSelectedProvider', () => {
    const params: GetPnProviders200Response = { provider: 'guardian' };
    const data: GetPnProviders200Response = { provider: 'guardian' };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/selected-provider').reply(500, {});

      await expect(guardian.setPushNotificationSelectedProvider(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/selected-provider').reply(200, data);

      await expect(guardian.setPushNotificationSelectedProvider(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#updatePolicies', () => {
    const params: string[] = ['foo', 'bar'];
    const data: string[] = ['foo', 'bar'];

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/policies').reply(500, {});

      await expect(guardian.updatePolicies(params)).rejects.toThrowError(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/policies').reply(200, data);

      await expect(guardian.updatePolicies(params)).resolves.toHaveProperty('data', data);
    });
  });

  describe('#setSmsSelectedProvider', () => {
    const params: GetPhoneProviders200Response = { provider: 'auth0' };
    const data: GetPhoneProviders200Response = { provider: 'auth0' };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/selected-provider').reply(500, {});

      await expect(guardian.setSmsSelectedProvider(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/selected-provider').reply(200, data);

      await expect(guardian.setSmsSelectedProvider(params)).resolves.toHaveProperty('data', data);
    });
  });

  describe('#setSmsFactorProviderTwilio', () => {
    const params: PutTwilioRequest = {
      from: '+1223323',
      messaging_service_sid: '5dEkAiHLPCuQ1uJj4qNXcAnERFAL6cpq',
      auth_token: 'zw5Ku6z2sxhd0ZVXto5SDHX6KPDByJPU',
      sid: 'wywA2BH4VqTpfywiDuyDAYZL3xQjoO40',
    };
    const data: PutTwilioRequest = params;

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/providers/twilio').reply(500, {});

      await expect(guardian.setSmsFactorProviderTwilio(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/providers/twilio').reply(200, data);

      await expect(guardian.setSmsFactorProviderTwilio(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#setPushNotificationProviderSNS', () => {
    const params: PutSnsRequest = {
      aws_access_key_id: 'foo',
      aws_secret_access_key: 'bar',
      aws_region: 'baz',
      sns_apns_platform_application_arn: 'qux',
      sns_gcm_platform_application_arn: 'quux',
    };
    const data: PutSnsRequest = params;

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/sns').reply(500, {});

      await expect(guardian.setPushNotificationProviderSNS(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/sns').reply(200, data);

      await expect(guardian.setPushNotificationProviderSNS(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });

  describe('#updatePhoneFactorProviderTwilio', () => {
    const params: PutTwilioRequest = {
      from: '+1223323',
      messaging_service_sid: '5dEkAiHLPCuQ1uJj4qNXcAnERFAL6cpq',
      auth_token: 'zw5Ku6z2sxhd0ZVXto5SDHX6KPDByJPU',
      sid: 'wywA2BH4VqTpfywiDuyDAYZL3xQjoO40',
    };
    const data: PutTwilioRequest = params;

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/providers/twilio').reply(500, {});

      await expect(guardian.updatePhoneFactorProviderTwilio(params)).rejects.toThrowError(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/providers/twilio').reply(200, data);

      await expect(guardian.updatePhoneFactorProviderTwilio(params)).resolves.toHaveProperty(
        'data',
        data
      );
    });
  });
});
