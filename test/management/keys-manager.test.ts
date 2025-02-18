import {
  KeysManager,
  ManagementClient,
  DeleteEncryptionKeyRequest,
  PostEncryptionRequest,
  GetSigningKeyRequest,
  PutSigningKeysRequest,
  GetEncryptionKeyRequest,
  PostEncryptionRequestTypeEnum,
  PostEncryptionKeyOperationRequest,
  PostEncryptionKeyRequest,
  PostEncryptionWrappingKeyRequest,
} from '../../src/index.js';

import { checkMethod } from './tests.util.js';

const DOMAIN = `tenant.auth0.com`;
const token = 'TOKEN';

describe('KeysManager', () => {
  const flowsManager: KeysManager = new ManagementClient({ domain: DOMAIN, token }).keys;

  // this is the test for the method flowsManager.getAll
  describe('getAll', () => {
    const operation = flowsManager.getAll();
    const uri = `/keys/signing`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.get
  describe('get', () => {
    const requestParameters: GetSigningKeyRequest = {
      kid: 'kid',
    };
    const operation = flowsManager.get(requestParameters);
    const uri = `/keys/signing/kid`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.rotate
  describe('rotate', () => {
    const operation = flowsManager.rotate();
    const uri = `/keys/signing/rotate`;
    const method = 'post';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.revole
  describe('revoke', () => {
    const requestBody: PutSigningKeysRequest = {
      kid: 'kid',
    };
    const operation = flowsManager.revoke(requestBody);
    const uri = `/keys/signing/kid/revoke`;
    const method = 'put';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.revoke
  describe('postEncryptionRekey', () => {
    const operation = flowsManager.postEncryptionRekey();
    const uri = `/keys/encryption/rekey`;
    const method = 'post';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.deleteEncryptionKey
  describe('deleteEncryptionKey', () => {
    const requestParameters: DeleteEncryptionKeyRequest = {
      kid: 'kid',
    };
    const operation = flowsManager.deleteEncryptionKey(requestParameters);
    const uri = `/keys/encryption/kid`;
    const method = 'delete';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.getEncryptionKey
  describe('getEncryptionKey', () => {
    const requestParameters: GetEncryptionKeyRequest = {
      kid: 'kid',
    };
    const operation = flowsManager.getEncryptionKey(requestParameters);
    const uri = `/keys/encryption/kid`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.getAllEncryptionKeys
  describe('getAllEncryptionKeys', () => {
    const operation = flowsManager.getAllEncryptionKeys();
    const uri = `/keys/encryption`;
    const method = 'get';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.createEncryptionKey
  describe('createEncryptionKey', () => {
    const requestBody: PostEncryptionRequest = {
      type: 'customer-provided-root-key' as PostEncryptionRequestTypeEnum,
    };

    const operation = flowsManager.createEncryptionKey(requestBody);
    const uri = `/keys/encryption`;
    const method = 'post';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.importEncryptionKey
  describe('importEncryptionKey', () => {
    const requestBody: PostEncryptionKeyRequest = {
      wrapped_key: 'wrapped-key',
    };

    const requestParameters: PostEncryptionKeyOperationRequest = {
      kid: 'kid',
    };
    const operation = flowsManager.importEncryptionKey(requestParameters, requestBody);
    const uri = `/keys/encryption/kid`;
    const method = 'post';

    checkMethod({ operation, uri, method });
  });

  // this is the test for the method flowsManager.createPublicWrappingKey
  describe('createPublicWrappingKey', () => {
    const requestParameters: PostEncryptionWrappingKeyRequest = {
      kid: 'kid',
    };
    const operation = flowsManager.createPublicWrappingKey(requestParameters);
    const uri = `/keys/encryption/kid/wrapping-key`;
    const method = 'post';

    checkMethod({ operation, uri, method });
  });
});
