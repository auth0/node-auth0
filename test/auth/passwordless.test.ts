import path from 'path';
import { fileURLToPath } from 'url';
import nock from 'nock';
import { beforeAll, afterAll } from '@jest/globals';
import Passwordless from '../../src/auth/Passwordless';

const { back: nockBack } = nock;

const DOMAIN = 'test-domain.auth0.com';
const CLIENT_ID = 'test-client-id';
const EMAIL = 'test-email@example.com';
const PHONE_NUMBER = '01234';

nockBack.setMode('lockdown');

const baseUrl = `https://${DOMAIN}`;

const opts = {
  domain: process.env.TEST_DOMAIN || DOMAIN,
  baseUrl,
  clientId: process.env.TEST_CLIENT_ID || CLIENT_ID,
};

describe('Passwordless', () => {
  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('auth/fixtures/passwordless.json'));
  });

  afterAll(() => {
    nockDone();
  });

  describe('#sendEmail', () => {
    it('should start passwordless using an email', async () => {
      const passwordless = new Passwordless(opts);
      const response = await passwordless.sendEmail({
        email: EMAIL,
      });

      expect(response.status).toBe(200);
    });

    it('should require email', async () => {
      const passwordless = new Passwordless(opts);
      await expect(passwordless.sendEmail({} as any)).rejects.toThrow(
        'Required parameter requestParameters.email was null or undefined.'
      );
    });
  });

  describe('#sendSMS', () => {
    it('should start passwordless using an SMS', async () => {
      const passwordless = new Passwordless(opts);
      const response = await passwordless.sendSMS({
        phone_number: PHONE_NUMBER,
      });

      expect(response.status).toBe(200);
    });

    it('should require phone_number', async () => {
      const passwordless = new Passwordless(opts);
      await expect(passwordless.sendEmail({} as any)).rejects.toThrow(
        'Required parameter requestParameters.email was null or undefined.'
      );
    });
  });
});
