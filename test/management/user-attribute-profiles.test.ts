import {
  ManagementClient,
  UserAttributeProfilesManager,
  GetUserAttributeProfilesByIdRequest,
  CreateUserAttributeProfileRequestContent,
  UpdateUserAttributeProfileRequestContent,
  DeleteUserAttributeProfilesByIdRequest,
  GetUserAttributeProfileTemplateRequest,
} from '../../src/index.js';

import { checkMethod } from './tests.util.js';

const DOMAIN = `tenant.auth0.com`;
const token = 'TOKEN';

describe('UserAttributeProfilesManager', () => {
  const userAttributeProfilesManager: UserAttributeProfilesManager = new ManagementClient({
    domain: DOMAIN,
    token,
  }).userAttributeProfiles;

  // this is the test for the method userAttributeProfilesManager.getAll
  describe('getAll', () => {
    const operation = userAttributeProfilesManager.getAll();
    const uri = `/user-attribute-profiles`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method userAttributeProfilesManager.get
  describe('get', () => {
    const requestParameters: GetUserAttributeProfilesByIdRequest = {
      id: 'id',
    };
    const operation = userAttributeProfilesManager.get(requestParameters);
    const uri = `/user-attribute-profiles/id`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method userAttributeProfilesManager.update
  describe('update', () => {
    const requestParameters: GetUserAttributeProfilesByIdRequest = {
      id: 'id',
    };
    const updatePayload: UpdateUserAttributeProfileRequestContent = {
      user_id: {
        scim_mapping: 'customMappingValue',
        saml_mapping: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
        oidc_mapping: 'sub',
      },
    };
    const operation = userAttributeProfilesManager.update(requestParameters, updatePayload);
    const uri = `/user-attribute-profiles/id`;
    const method = 'patch';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method userAttributeProfilesManager.create
  describe('create', () => {
    const createPayload: CreateUserAttributeProfileRequestContent = {
      name: 'Test',
      user_attributes: {
        username: {
          description: 'This is just a test',
          label: 'testUser',
          profile_required: false,
          auth0_mapping: 'testUser',
          oidc_mapping: 'preferred_username',
        },
      },
    };
    const operation = userAttributeProfilesManager.create(createPayload);
    const uri = `/user-attribute-profiles`;
    const method = 'post';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method userAttributeProfilesManager.delete
  describe('delete', () => {
    const requestParameters: DeleteUserAttributeProfilesByIdRequest = {
      id: 'id',
    };
    const operation = userAttributeProfilesManager.delete(requestParameters);
    const uri = `/user-attribute-profiles/id`;
    const method = 'delete';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method userAttributeProfilesManager.getAllTemplates
  describe('getAllTemplates', () => {
    const operation = userAttributeProfilesManager.getAllTemplates();
    const uri = `/user-attribute-profiles/templates`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method userAttributeProfilesManager.getTemplate
  describe('getTemplate', () => {
    const requestParameters: GetUserAttributeProfileTemplateRequest = {
      id: 'id',
    };
    const operation = userAttributeProfilesManager.getTemplate(requestParameters);
    const uri = `/user-attribute-profiles/templates/id`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });
});
