import nock from 'nock';
import { KeysManager, ManagementClient } from '../../src/index.js';
import { afterAll, beforeAll } from '@jest/globals';

const { back: nockBack } = nock;

describe('AnomalyManager', () => {
  let keysManager: KeysManager;

  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('management/fixtures/keys.json'));

    const client = new ManagementClient({
      domain: 'test-domain.auth0.com',
      token: 'TOKEN',
    });
    keysManager = client.keys;
  });

  afterAll(() => {
    nockDone();
  });

  it('should get a list of keys', async () => {
    await expect(keysManager.getAll()).resolves.toMatchObject({
      data: expect.arrayContaining([expect.objectContaining({ kid: 'my-kid' })]),
    });
  });

  it('should get a key', async () => {
    await expect(keysManager.get({ kid: 'my-kid' })).resolves.toMatchObject({
      data: expect.objectContaining({ kid: 'my-kid' }),
    });
  });

  it('should rotate the tenant signing key', async () => {
    await expect(keysManager.rotate()).resolves.toMatchObject({
      status: 200,
    });
  });

  it('should revoke a key', async () => {
    await expect(keysManager.revoke({ kid: 'my-kid' })).resolves.toMatchObject({
      status: 200,
    });
  });

  it('should rekey the tenant key heirarchy', async () => {
    await expect(keysManager.postEncryptionRekey()).resolves.toMatchObject({
      status: 200,
    });
  });
});
