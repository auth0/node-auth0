import nock from 'nock';
import { AnomalyManager, ManagementClient } from '../../src/index.js';
import { afterAll, beforeAll } from '@jest/globals';

const { back: nockBack } = nock;

describe('AnomalyManager', () => {
  let anomalyManager: AnomalyManager;

  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('management/fixtures/anomaly.json'));

    const client = new ManagementClient({
      domain: 'test-domain.auth0.com',
      token: 'TOKEN',
    });
    anomalyManager = client.anomaly;
  });

  afterAll(() => {
    nockDone();
  });

  it('should check for an un-blocked IP', async () => {
    await expect(anomalyManager.checkIfIpIsBlocked({ id: '127.0.0.1' })).resolves.toMatchObject({
      status: 200,
    });
  });

  it('should check for a blocked IP', async () => {
    await expect(anomalyManager.checkIfIpIsBlocked({ id: '127.0.0.2' })).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it('should delete a blocked IP', async () => {
    await expect(anomalyManager.deleteBlockedIp({ id: '127.0.0.2' })).resolves.toMatchObject({
      status: 204,
    });
  });
});
