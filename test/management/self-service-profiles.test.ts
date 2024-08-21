import nock from 'nock';

const DOMAIN = `tenant.auth0.com`;
const API_URL = `https://${DOMAIN}/api/v2`;

import {
  DeleteSelfServiceProfilesByIdRequest,
  GetSelfServiceProfilesByIdRequest,
  ManagementClient,
  PatchSelfServiceProfilesByIdRequest,
  PostSsoTicketRequest,
  SelfServiceProfilesManager,
  SsoAccessTicketResponse,
  SsoTicketRequestJson,
  SsProfile,
  SsProfileCreate,
  SsProfileList,
  SsProfileUpdate,
} from '../../src/index.js';

describe('SelfServiceProfilesManager', () => {
  let selfServiceProfileManager: SelfServiceProfilesManager;
  let nockedRequest: nock.Scope;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: DOMAIN,
      token: token,
    });
    selfServiceProfileManager = client.selfServiceProfiles;
  });

  describe('createSelfServiceProfiles', () => {
    const requestBody: SsProfileCreate | any = {
      user_attributes: [{ name: 'testAttribute', description: 'testAttribute', is_optional: true }],
      branding: { logo_url: 'https://example.com', colors: { primary: '#1c1c1c' } },
    };

    it('should return a promise if no callback is given', (done) => {
      selfServiceProfileManager
        .postSelfServiceProfiles(requestBody)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', () => {
      nock.cleanAll();

      nock(API_URL).post('/self-service-profiles').reply(500, {});

      return selfServiceProfileManager.postSelfServiceProfiles(requestBody).catch((err) => {
        expect(err).toBeDefined();
      });
    });

    // this test is for the method postSelfServiceProfiles, uses SsProfileCreate as body
    it('should return the created self-service profile', async () => {
      const nockedResponse: SsProfile = {
        id: 'testing_id_123',
        user_attributes: [
          { name: 'testAttribute', description: 'testAttribute', is_optional: true },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        branding: { logo_url: 'https://example.com', colors: { primary: '#1c1c1c' } },
      };

      // eslint-disable-next-line prettier/prettier
      nockedRequest = nock(API_URL)
        .post('/self-service-profiles', requestBody)
        .reply(200, nockedResponse);

      const createResult = await selfServiceProfileManager.postSelfServiceProfiles(requestBody);

      expect(createResult.data).toEqual(nockedResponse);
    });
  });

  describe('getSelfServiceProfiles', () => {
    it('should return a promise if no callback is given', (done) => {
      selfServiceProfileManager
        .getSelfServiceProfiles()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', () => {
      nock.cleanAll();

      nock(API_URL).get('/self-service-profiles').reply(500, {});

      return selfServiceProfileManager.getSelfServiceProfiles().catch((err) => {
        expect(err).toBeDefined();
      });
    });

    // this unit test is for the getSelfServiceProfiles() method
    it('should return the list of self-service profiles', async () => {
      const exampleData: SsProfile = {
        id: 'testing_id_123',
        user_attributes: [
          { name: 'testAttribute', description: 'testAttribute', is_optional: true },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        branding: { logo_url: 'https://example.com', colors: { primary: '#1c1c1c' } },
      };

      const nockedResponse: SsProfileList = [exampleData];

      // eslint-disable-next-line prettier/prettier
      nockedRequest = nock(API_URL).get('/self-service-profiles').reply(200, nockedResponse);

      const getResult = await selfServiceProfileManager.getSelfServiceProfiles();

      expect(getResult.data).toEqual(nockedResponse);
      expect(getResult.data.length).toBeGreaterThan(0);
    });
  });

  describe('getSelfServiceProfilesById', () => {
    const requestParameters: GetSelfServiceProfilesByIdRequest = {
      id: 'testing_id_123',
    };

    it('should return a promise if no callback is given', (done) => {
      selfServiceProfileManager
        .getSelfServiceProfilesById(requestParameters)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', () => {
      nock.cleanAll();

      nock(API_URL).get(`/self-service-profiles/${requestParameters.id}`).reply(500, {});

      return selfServiceProfileManager
        .getSelfServiceProfilesById(requestParameters)
        .catch((err) => {
          expect(err).toBeDefined();
        });
    });

    // this unit test is for the getSelfServiceProfileById() method
    it('should return one of self-service profile by id', async () => {
      const nockedResponse: SsProfile = {
        id: 'testing_id_123',
        user_attributes: [
          { name: 'testAttribute', description: 'testAttribute', is_optional: true },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        branding: { logo_url: 'https://example.com', colors: { primary: '#1c1c1c' } },
      };

      nock.cleanAll();
      // eslint-disable-next-line prettier/prettier
      nockedRequest = nock(API_URL)
        .get(`/self-service-profiles/${requestParameters.id}`)
        .reply(200, nockedResponse);

      const getResult = await selfServiceProfileManager.getSelfServiceProfilesById(
        requestParameters
      );
      expect(getResult.data).toEqual(nockedResponse);
    });
  });

  describe('deleteSelfServiceProfiles', () => {
    const requestParameters: DeleteSelfServiceProfilesByIdRequest = {
      id: 'testing_id_123',
    };

    it('should return a promise if no callback is given', (done) => {
      selfServiceProfileManager
        .deleteSelfServiceProfiles(requestParameters)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', () => {
      nock.cleanAll();

      nock(API_URL).get(`/self-service-profiles/${requestParameters.id}`).reply(500, {});

      return selfServiceProfileManager.deleteSelfServiceProfiles(requestParameters).catch((err) => {
        expect(err).toBeDefined();
      });
    });

    // this unit test is for the deleteSelfServiceProfiles() method
    it('should delete one of self-service profile by id', async () => {
      // eslint-disable-next-line prettier/prettier
      nockedRequest = nock(API_URL)
        .delete(`/self-service-profiles/${requestParameters.id}`)
        .reply(200);

      await selfServiceProfileManager.deleteSelfServiceProfiles(requestParameters);

      expect(nockedRequest.isDone()).toBe(true);
    });
  });

  describe('patchSelfServiceProfiles', () => {
    const requestParameters: PatchSelfServiceProfilesByIdRequest = {
      id: 'testing_id_123',
    };
    const requestBody: SsProfileUpdate = {
      user_attributes: [
        { name: 'modifiedTestAttribute', description: 'modifiedTestAttribute', is_optional: true },
      ],
      branding: { logo_url: 'https://example.com', colors: { primary: '#ff00ff' } },
    };

    it('should return a promise if no callback is given', (done) => {
      selfServiceProfileManager
        .patchSelfServiceProfiles(requestParameters, requestBody)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', () => {
      nock.cleanAll();

      nock(API_URL).patch(`/self-service-profiles/${requestParameters.id}`).reply(500, {});

      return selfServiceProfileManager
        .patchSelfServiceProfiles(requestParameters, requestBody)
        .catch((err) => {
          expect(err).toBeDefined();
        });
    });

    // this unit test is for the patchSelfServiceProfiles() method
    it('should update one of self-service profile by id', async () => {
      const nockedResponse: SsProfile = {
        id: requestParameters.id,
        user_attributes: [
          {
            name: 'modifiedTestAttribute',
            description: 'modifiedTestAttribute',
            is_optional: true,
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        branding: { logo_url: 'https://example.com', colors: { primary: '#ff00ff' } },
      };

      // eslint-disable-next-line prettier/prettier
      nockedRequest = nock(API_URL)
        .patch(`/self-service-profiles/${requestParameters.id}`)
        .reply(200, nockedResponse);

      const patchResult = await selfServiceProfileManager.patchSelfServiceProfiles(
        requestParameters,
        requestBody
      );

      expect(patchResult.data).toEqual(nockedResponse);
    });
  });

  describe('postSsoTicket', () => {
    const requestParameters: PostSsoTicketRequest = {
      id: 'testing_id_123',
    };
    const requestBody: SsoTicketRequestJson = {
      connection_id: 'connection_id',
      connection_config: { name: 'test_connection_config' },
      enabled_clients: ['client1'],
      enabled_organizations: [{ organization_id: requestParameters.id }],
    };

    it('should return a promise if no callback is given', (done) => {
      selfServiceProfileManager
        .postSsoTicket(requestParameters, requestBody)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', () => {
      nock.cleanAll();

      nock(API_URL)
        .post(`/self-service-profiles/${requestParameters.id}/sso-ticket`)
        .reply(500, {});

      return selfServiceProfileManager
        .postSsoTicket(requestParameters, requestBody)
        .catch((err) => {
          expect(err).toBeDefined();
        });
    });

    // this unit test is for the postSsoTicket() method
    it('should set sso ticket for one sso profile', async () => {
      const nockedResponse: SsoAccessTicketResponse = {
        ticket: 'https://example.com/ticket',
      };

      // eslint-disable-next-line prettier/prettier
      nockedRequest = nock(API_URL)
        .post(`/self-service-profiles/${requestParameters.id}/sso-ticket`)
        .reply(200, nockedResponse);

      const result = await selfServiceProfileManager.postSsoTicket(requestParameters, requestBody);

      expect(result.data).toEqual(nockedResponse);
    });
  });
});
