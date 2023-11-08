import nock from 'nock';

const { back: nockBack } = nock;

import { OrganizationsManager, ManagementClient } from '../../src/index.js';
import { afterAll, beforeAll } from '@jest/globals';

describe('OrganizationsManager', () => {
  let organizationsManager: OrganizationsManager;

  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('management/fixtures/organizations.json'));

    const client = new ManagementClient({
      domain: 'test-domain.auth0.com',
      token: 'TOKEN',
    });
    organizationsManager = client.organizations;
  });

  afterAll(() => {
    nockDone();
  });

  it('should create an organization', async () => {
    await expect(organizationsManager.create({ name: 'organization' })).resolves.toMatchObject({
      status: 201,
      data: expect.objectContaining({
        name: 'organization',
        id: 'test-org',
        display_name: 'organization',
      }),
    });
  });

  it('should update an organization', async () => {
    await expect(
      organizationsManager.update({ id: 'test-org' }, { name: 'organization-2' })
    ).resolves.toMatchObject({
      status: 200,
    });
  });

  it('should get an organization', async () => {
    await expect(organizationsManager.get({ id: 'test-org' })).resolves.toMatchObject({
      status: 200,
    });
  });

  it('should add a connection to an organization', async () => {
    await expect(
      organizationsManager.addEnabledConnection(
        { id: 'test-org' },
        { connection_id: 'test-conn', assign_membership_on_login: true }
      )
    ).resolves.toMatchObject({
      status: 201,
      data: expect.objectContaining({
        connection_id: 'test-conn',
        assign_membership_on_login: true,
      }),
    });
  });

  it('should update a connection on an organization', async () => {
    await expect(
      organizationsManager.updateEnabledConnection(
        { id: 'test-org', connectionId: 'test-conn' },
        { assign_membership_on_login: false }
      )
    ).resolves.toMatchObject({
      status: 200,
    });
  });

  it(`should get an organization's connections`, async () => {
    await expect(
      organizationsManager.getEnabledConnections({ id: 'test-org' })
    ).resolves.toMatchObject({
      status: 200,
    });
  });

  it(`should get an organization's connection by id`, async () => {
    await expect(
      organizationsManager.getEnabledConnection({ id: 'test-org', connectionId: 'test-conn' })
    ).resolves.toMatchObject({
      status: 200,
    });
  });

  it(`should add a member to an organization`, async () => {
    await expect(
      organizationsManager.addMembers({ id: 'test-org' }, { members: ['test-user'] })
    ).resolves.toMatchObject({
      status: 204,
    });
  });

  it(`should get an organization's members`, async () => {
    await expect(organizationsManager.getMembers({ id: 'test-org' })).resolves.toMatchObject({
      status: 200,
    });
  });

  it(`should add roles to a member`, async () => {
    await expect(
      organizationsManager.addMemberRoles(
        { id: 'test-org', user_id: 'test-user' },
        { roles: ['test-role'] }
      )
    ).resolves.toMatchObject({
      status: 204,
    });
  });

  it(`should get a member's roles`, async () => {
    await expect(
      organizationsManager.getMemberRoles({ id: 'test-org', user_id: 'test-user' })
    ).resolves.toMatchObject({
      status: 200,
    });
  });

  it(`should delete roles from a member`, async () => {
    await expect(
      organizationsManager.deleteMemberRoles(
        { id: 'test-org', user_id: 'test-user' },
        { roles: ['test-role'] }
      )
    ).resolves.toMatchObject({
      status: 204,
    });
  });

  it('should associate a client grant with an organization', async () => {
    await expect(
      organizationsManager.addClientGrant({ id: 'test-org' }, { grant_id: 'test-grant' })
    ).resolves.toMatchObject({
      status: 201,
      data: expect.objectContaining({
        grant_id: 'test-grant',
        client_id: 'test-client',
        audience: 'ClientGrantTests',
        scope: ['openid', 'profile'],
      }),
    });
  });

  it(`should get client grants for an organization`, async () => {
    await expect(organizationsManager.getClientGrants({ id: 'test-org' })).resolves.toMatchObject({
      status: 200,
    });
  });

  it(`should delete client grants for an organization`, async () => {
    await expect(
      organizationsManager.deleteClientGrant({ id: 'test-org', grant_id: 'test-grant' })
    ).resolves.toMatchObject({
      status: 204,
    });
  });

  it(`should delete a member`, async () => {
    await expect(
      organizationsManager.deleteMembers({ id: 'test-org' }, { members: ['test-user'] })
    ).resolves.toMatchObject({
      status: 204,
    });
  });

  it(`should delete an organization`, async () => {
    await expect(organizationsManager.delete({ id: 'test-org' })).resolves.toMatchObject({
      status: 204,
    });
  });
});
