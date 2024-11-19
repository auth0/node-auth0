import {
  ManagementClient,
  SelfServiceProfilesManager,
  SsProfileCreate,
  SsProfileUpdate,
} from '../../src/index.js';
import { checkMethod, CheckMethodParams } from './tests.util.js';

const DOMAIN = `tenant.auth0.com`;
const token = 'TOKEN';

describe('selfServiceProfilesManager', () => {
  const flowsManager: SelfServiceProfilesManager = new ManagementClient({ domain: DOMAIN, token })
    .selfServiceProfiles;

  const dummyBody: SsProfileCreate = {
    name: 'profileName',
    description: 'description',
    allowed_strategies: ['oidc', 'samlp'],
    user_attributes: [{ name: 'name', description: 'description', is_optional: false }],
    branding: {
      logo_url: 'logoUrl',
      colors: { primary: 'primary', page_background: 'pageBackground' },
    },
  };

  // this is the test for the method flowsManager.create
  describe('create', () => {
    const operation = flowsManager.create(dummyBody);
    const uri = `/self-service-profiles`;
    const method = 'post';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.update
  describe('update', () => {
    const operation = flowsManager.update({ id: 'profile1' }, dummyBody);
    const uri = `/self-service-profiles/profile1`;
    const method = 'patch';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.delete
  describe('delete', () => {
    const operation = flowsManager.delete({ id: 'profile1' });
    const uri = `/self-service-profiles/profile1`;
    const method = 'delete';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.get
  describe('get', () => {
    const operation = flowsManager.get({ id: 'profile1' });
    const uri = `/self-service-profiles/profile1`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.getAll
  describe('getAll', () => {
    const operation = flowsManager.getAll();
    const uri = `/self-service-profiles`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.updateCustomText
  describe('updateCustomText', () => {
    const operation = flowsManager.updateCustomText(
      { id: 'profile1', language: 'en', page: 'get-started' },
      { custom_text: 'new custom text' }
    );
    const uri = `/self-service-profiles/profile1/custom-text/en/get-started`;
    const method = 'put';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.createSsoTicket
  describe('createSsoTicket', () => {
    const operation = flowsManager.createSsoTicket(
      { id: 'id1' },
      {
        connection_id: 'connection1',
        connection_config: {
          name: 'config1',
          display_name: 'config1',
          is_domain_connection: false,
          metadata: {},
          options: null,
        },
      }
    );
    const uri = `/self-service-profiles/id1/sso-ticket`;
    const method = 'post';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.revokeSsoTicket
  describe('revokeSsoTicket', () => {
    const operation = flowsManager.revokeSsoTicket({ profileId: 'profile1', id: 'id1' });
    const uri = `/self-service-profiles/profile1/sso-ticket/id1/revoke`;
    const method = 'post';

    checkMethod({ operation, uri, method, expectedResponse: {} });
  });
});
