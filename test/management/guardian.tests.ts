import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock, { Scope, cleanAll } from 'nock';
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
  PutMessageTypesRequest,
  PutPhoneProvidersRequest,
  PutPnProvidersRequest,
  PutSnsRequest,
  PutTwilioRequest,
  SnsFactorProvider,
  TemplateMessages,
  TwilioFactorProvider,
} from '../../src/management/__generated/index';
import { ManagementApiError, ManagementClient } from '../../src/management';

const API_URL = 'https://tenant.auth0.com/api/v2';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('GuardianManager', () => {
  let token: string;
  let guardian: GuardianManager;

  before(function () {
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
      it(`should have a ${method} method`, function () {
        expect((guardian as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new GuardianManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new GuardianManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#deleteGuardianEnrollment', () => {
    const data: DeleteEnrollmentsByIdRequest = {
      id: 'dev_0000000000000001',
    };
    let request: Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/guardian/enrollments/${data.id}`).reply(200);
    });

    it('should perform a DELETE request to /guardian/enrollments/:id', async () => {
      await expect(guardian.deleteGuardianEnrollment(data)).to.eventually.have.property(
        'status',
        200
      );
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).delete(`/guardian/enrollments/${data.id}`).reply(500, {});

      await expect(guardian.deleteGuardianEnrollment(data)).to.be.rejectedWith(ManagementApiError);
    });
  });

  describe('#getPushNotificationProviderAPNS', () => {
    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/push-notification/providers/apns').reply(500, {});

      await expect(guardian.getPushNotificationProviderAPNS()).to.be.rejectedWith(
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

      await expect(guardian.getPushNotificationProviderAPNS()).to.eventually.have.deep.property(
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

      await expect(guardian.getGuardianEnrollment(params)).to.be.rejectedWith(ManagementApiError);
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

      await expect(guardian.getGuardianEnrollment(params)).to.eventually.have.deep.property(
        'data',
        data
      );
    });
  });

  describe('#getPhoneFactorTemplates', () => {
    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/phone/templates').reply(500, {});

      await expect(guardian.getPhoneFactorTemplates()).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data: TemplateMessages = {
        enrollment_message: 'foo',
        verification_message: 'bar',
      };
      nock(API_URL).get('/guardian/factors/phone/templates').reply(200, data);

      await expect(guardian.getPhoneFactorTemplates()).to.eventually.have.deep.property(
        'data',
        data
      );
    });
  });

  describe('#getSmsFactorTemplates', () => {
    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/sms/templates').reply(500, {});

      await expect(guardian.getSmsFactorTemplates()).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data: TemplateMessages = {
        enrollment_message: 'foo',
        verification_message: 'bar',
      };
      nock(API_URL).get('/guardian/factors/sms/templates').reply(200, data);

      await expect(guardian.getSmsFactorTemplates()).to.eventually.have.deep.property('data', data);
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

      await expect(guardian.getFactors()).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const request = nock(API_URL).get('/guardian/factors').reply(200, data);

      await expect(guardian.getFactors()).to.eventually.have.deep.property('data', data);
    });
  });

  describe('#getPhoneFactorMessageTypes', () => {
    const data: GetMessageTypes200Response = {
      message_types: ['sms', 'voice'],
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();
      nock(API_URL).get('/guardian/factors/phone/message-types').reply(500, {});

      await expect(guardian.getPhoneFactorMessageTypes()).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/factors/phone/message-types').reply(200, data);

      await expect(guardian.getPhoneFactorMessageTypes()).to.eventually.have.deep.property(
        'data',
        data
      );
    });
  });

  describe('#getPhoneFactorSelectedProvider', () => {
    const data: GetPhoneProviders200Response = {
      provider: 'twilio',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();
      nock(API_URL).get('/guardian/factors/phone/selected-provider').reply(500, {});

      await expect(guardian.getPhoneFactorSelectedProvider()).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/factors/phone/selected-provider').reply(200, data);

      await expect(guardian.getPhoneFactorSelectedProvider()).to.eventually.have.deep.property(
        'data',
        data
      );
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

      await expect(guardian.getPhoneFactorProviderTwilio()).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/factors/phone/providers/twilio').reply(200, data);

      await expect(guardian.getPhoneFactorProviderTwilio()).to.eventually.have.deep.property(
        'data',
        data
      );
    });
  });

  describe('#getPushNotificationSelectedProvider', () => {
    const data: GetPnProviders200Response = {
      provider: 'sns',
    };

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();
      nock(API_URL).get('/guardian/factors/push-notification/selected-provider').reply(500, {});

      await expect(guardian.getPushNotificationSelectedProvider()).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/factors/push-notification/selected-provider').reply(200, data);

      await expect(guardian.getPushNotificationSelectedProvider()).to.eventually.have.deep.property(
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

      await expect(guardian.getPolicies()).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/guardian/policies').reply(200, data);

      await expect(guardian.getPolicies()).to.eventually.have.deep.property('data', data);
    });
  });

  describe('#getSmsSelectedProvider', () => {
    const data: GetPhoneProviders200Response = { provider: 'auth0' };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/guardian/factors/sms/selected-provider').reply(500, {});

      await expect(guardian.getSmsSelectedProvider()).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).get('/guardian/factors/sms/selected-provider').reply(200, data);

      await expect(guardian.getSmsSelectedProvider()).to.eventually.have.deep.property(
        'data',
        data
      );
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

      await expect(guardian.getSmsFactorProviderTwilio()).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).get('/guardian/factors/sms/providers/twilio').reply(200, data);

      await expect(guardian.getSmsFactorProviderTwilio()).to.eventually.have.deep.property(
        'data',
        data
      );
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

      await expect(guardian.getPushNotificationProviderSNS()).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).get('/guardian/factors/push-notification/providers/sns').reply(200, data);

      await expect(guardian.getPushNotificationProviderSNS()).to.eventually.have.deep.property(
        'data',
        data
      );
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

      await expect(guardian.updatePushNotificationProviderAPNS(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).patch('/guardian/factors/push-notification/providers/apns').reply(200, data);

      await expect(
        guardian.updatePushNotificationProviderAPNS(params)
      ).to.eventually.have.deep.property('data', data);
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

      await expect(guardian.updatePushNotificationProviderFCM(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).patch('/guardian/factors/push-notification/providers/fcm').reply(200, data);

      await expect(
        guardian.updatePushNotificationProviderFCM(params)
      ).to.eventually.have.deep.property('data', data);
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

      await expect(guardian.updatePushNotificationProviderSNS(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).patch('/guardian/factors/push-notification/providers/sns').reply(200, data);

      await expect(
        guardian.updatePushNotificationProviderSNS(params)
      ).to.eventually.have.deep.property('data', data);
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

      await expect(guardian.createEnrollmentTicket(params)).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).post('/guardian/enrollments/ticket').reply(200, data);

      await expect(guardian.createEnrollmentTicket(params)).to.eventually.have.deep.property(
        'data',
        data
      );
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

      await expect(guardian.setPushNotificationProviderAPNS(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/apns').reply(200, data);

      await expect(
        guardian.setPushNotificationProviderAPNS(params)
      ).to.eventually.have.deep.property('data', data);
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

      await expect(guardian.setPhoneFactorTemplates(params)).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/templates').reply(200, data);

      await expect(guardian.setPhoneFactorTemplates(params)).to.eventually.have.deep.property(
        'data',
        data
      );
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

      await expect(guardian.setSmsFactorTemplates(params)).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/templates').reply(200, data);

      await expect(guardian.setSmsFactorTemplates(params)).to.eventually.have.deep.property(
        'data',
        data
      );
    });
  });

  describe('#updateFactor', () => {
    const params: PutFactorsByNameOperationRequest = { name: 'sms' };
    const body: PutFactorsByNameRequest = { enabled: true };
    const data: PutFactorsByName200Response = { enabled: true };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put(`/guardian/factors/${params.name}`).reply(500, {});

      await expect(guardian.updateFactor(params, body)).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put(`/guardian/factors/${params.name}`).reply(200, data);

      await expect(guardian.updateFactor(params, body)).to.eventually.have.deep.property(
        'data',
        data
      );
    });
  });

  describe('#setPushNotificationProviderFCM', () => {
    const params: PutFcmRequest = { server_key: 'foo' };
    const data: PutFactorsByName200Response = { enabled: true };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/fcm').reply(500, {});

      await expect(guardian.setPushNotificationProviderFCM(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/fcm').reply(200, data);

      await expect(
        guardian.setPushNotificationProviderFCM(params)
      ).to.eventually.have.deep.property('data', data);
    });
  });

  describe('#updatePhoneFactorMessageTypes', () => {
    const params: PutMessageTypesRequest = { message_types: ['sms', 'voice'] };
    const data: GetMessageTypes200Response = { message_types: ['sms', 'voice'] };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/message-types').reply(500, {});

      await expect(guardian.updatePhoneFactorMessageTypes(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/message-types').reply(200, data);

      await expect(guardian.updatePhoneFactorMessageTypes(params)).to.eventually.have.deep.property(
        'data',
        data
      );
    });
  });

  describe('#updatePhoneFactorSelectedProvider', () => {
    const params: PutPhoneProvidersRequest = { provider: 'twilio' };
    const data: GetPhoneProviders200Response = { provider: 'twilio' };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/selected-provider').reply(500, {});

      await expect(guardian.updatePhoneFactorSelectedProvider(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/selected-provider').reply(200, data);

      await expect(
        guardian.updatePhoneFactorSelectedProvider(params)
      ).to.eventually.have.deep.property('data', data);
    });
  });

  describe('#setPushNotificationSelectedProvider', () => {
    const params: PutPnProvidersRequest = { provider: 'guardian' };
    const data: GetPnProviders200Response = { provider: 'guardian' };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/selected-provider').reply(500, {});

      await expect(guardian.setPushNotificationSelectedProvider(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/selected-provider').reply(200, data);

      await expect(
        guardian.setPushNotificationSelectedProvider(params)
      ).to.eventually.have.deep.property('data', data);
    });
  });

  describe('#updatePolicies', () => {
    const params: string[] = ['foo', 'bar'];
    const data: string[] = ['foo', 'bar'];

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/policies').reply(500, {});

      await expect(guardian.updatePolicies(params)).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/policies').reply(200, data);

      await expect(guardian.updatePolicies(params)).to.eventually.have.deep.property('data', data);
    });
  });

  describe('#setSmsSelectedProvider', () => {
    const params: PutPhoneProvidersRequest = { provider: 'auth0' };
    const data: GetPhoneProviders200Response = { provider: 'auth0' };

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/selected-provider').reply(500, {});

      await expect(guardian.setSmsSelectedProvider(params)).to.be.rejectedWith(ManagementApiError);
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/selected-provider').reply(200, data);

      await expect(guardian.setSmsSelectedProvider(params)).to.eventually.have.deep.property(
        'data',
        data
      );
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

      await expect(guardian.setSmsFactorProviderTwilio(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/sms/providers/twilio').reply(200, data);

      await expect(guardian.setSmsFactorProviderTwilio(params)).to.eventually.have.deep.property(
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

      await expect(guardian.setPushNotificationProviderSNS(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/push-notification/providers/sns').reply(200, data);

      await expect(
        guardian.setPushNotificationProviderSNS(params)
      ).to.eventually.have.deep.property('data', data);
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

      await expect(guardian.updatePhoneFactorProviderTwilio(params)).to.be.rejectedWith(
        ManagementApiError
      );
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).put('/guardian/factors/phone/providers/twilio').reply(200, data);

      await expect(
        guardian.updatePhoneFactorProviderTwilio(params)
      ).to.eventually.have.deep.property('data', data);
    });
  });
});
