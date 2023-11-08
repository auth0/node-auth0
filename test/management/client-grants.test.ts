import nock from 'nock';
import { afterAll, beforeAll } from '@jest/globals';
import { ClientGrantsManager, ManagementClient } from '../../src/index.js';

const { back: nockBack } = nock;

describe('ClientGrantsManager', () => {
  let clientGrantsManager: ClientGrantsManager;

  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('management/fixtures/client-grants.json'));

    const client = new ManagementClient({
      domain: 'test-domain.auth0.com',
      token: 'TOKEN',
    });
    clientGrantsManager = client.clientGrants;
  });

  afterAll(() => {
    nockDone();
  });

  it('should create a client grant', async () => {
    await expect(
      clientGrantsManager.create({
        client_id: 'test-client-id',
        audience: 'test-aud',
        scope: ['read:foo', 'write:foo'],
      })
    ).resolves.toMatchObject({
      status: 201,
    });
  });

  it('should get client grants by client id', async () => {
    await expect(
      clientGrantsManager.getAll({ client_id: 'test-client-id' })
    ).resolves.toMatchObject({
      status: 200,
    });
  });

  it('should get client grants by client id and allow_any_organization', async () => {
    await expect(
      clientGrantsManager.getAll({ client_id: 'test-client-id', allow_any_organization: true })
    ).resolves.toMatchObject({
      status: 200,
    });
  });

  it('should update a client grant', async () => {
    await expect(
      clientGrantsManager.update({ id: 'test-client-grant' }, { scope: ['read:foo', 'read:bar'] })
    ).resolves.toMatchObject({
      status: 200,
    });
  });

  it('should delete a client grant', async () => {
    await expect(clientGrantsManager.delete({ id: 'test-client-grant' })).resolves.toMatchObject({
      status: 204,
    });
  });

  it('should get an organization by client grant', async () => {
    await expect(
      clientGrantsManager.getOrganizations({ id: 'test-client-grant' })
    ).resolves.toMatchObject({
      status: 200,
    });
  });
});
