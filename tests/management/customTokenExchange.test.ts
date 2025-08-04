import {
  ManagementClient,
  TokenExchangeProfilesManager,
  PostTokenExchangeProfilesRequest,
  PatchTokenExchangeProfilesByIdRequest,
} from 'auth0-legacy';
import { checkMethod } from './tests.util.js';

const DOMAIN = `tenant.auth0.com`;
const token = 'TOKEN';

describe('tokenExchangeProfilesManager', () => {
  const tokenExchangeProfilesManager: TokenExchangeProfilesManager = new ManagementClient({
    domain: DOMAIN,
    token,
  }).tokenExchangeProfiles;

  const dummyCreateBody: PostTokenExchangeProfilesRequest = {
    name: 'profileName',
    subject_token_type: 'urn:acme:legacy-system-token',
    action_id: 'actionId',
    type: 'custom_authentication',
  };

  const dummyUpdateBody: PatchTokenExchangeProfilesByIdRequest = {
    name: 'profileName',
    subject_token_type: 'urn:acme:legacy-system-token1',
  };

  // this is the test for the method tokenExchangeProfilesManager.create
  describe('create', () => {
    const operation = tokenExchangeProfilesManager.create(dummyCreateBody);
    const uri = `/token-exchange-profiles`;
    const method = 'post';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method tokenExchangeProfilesManager.update
  describe('update', () => {
    const operation = tokenExchangeProfilesManager.update({ id: 'profile1' }, dummyUpdateBody);
    const uri = `/token-exchange-profiles/profile1`;
    const method = 'patch';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method tokenExchangeProfilesManager.delete
  describe('delete', () => {
    const operation = tokenExchangeProfilesManager.delete({ id: 'profile1' });
    const uri = `/token-exchange-profiles/profile1`;
    const method = 'delete';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method tokenExchangeProfilesManager.get
  describe('get', () => {
    const operation = tokenExchangeProfilesManager.get({ id: 'profile1' });
    const uri = `/token-exchange-profiles/profile1`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method tokenExchangeProfilesManager.getAll
  describe('getAll', () => {
    const operation = tokenExchangeProfilesManager.getAll();
    const uri = `/token-exchange-profiles`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });
});
