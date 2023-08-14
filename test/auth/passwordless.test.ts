import nock from 'nock';
import { beforeAll, afterAll } from '@jest/globals';
import { Passwordless, LoginWithEmailRequest, LoginWithSMSRequest } from '../../src/index.js';
import { withIdToken } from '../utils/index.js';

const { back: nockBack } = nock;

const DOMAIN = 'test-domain.auth0.com';
const CLIENT_ID = 'test-client-id';
const EMAIL = 'test-email@example.com';
const PHONE_NUMBER = '01234';
const CLIENT_SECRET = 'test-client-secret';

nockBack.setMode('lockdown');

const baseUrl = `https://${DOMAIN}/`;

const opts = {
  domain: DOMAIN,
  baseUrl,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  idTokenSigningAlg: 'HS256',
};

describe('Passwordless', () => {
  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('auth/fixtures/passwordless.json', {
      before: await withIdToken({
        domain: DOMAIN,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      }),
    }));
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

  describe('#loginWithEmail', () => {
    it('should require email', async () => {
      const passwordless = new Passwordless(opts);
      await expect(
        passwordless.loginWithEmail({ code: 'foo' } as LoginWithEmailRequest)
      ).rejects.toThrow('Required parameter requestParameters.email was null or undefined.');
    });

    it('should login with code from email', async () => {
      const passwordless = new Passwordless(opts);
      const response = await passwordless.loginWithEmail({
        email: 'test-email@example.com',
        code: 'test-code',
      });

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        access_token: 'my-access-token',
        expires_in: 86400,
        token_type: 'Bearer',
        id_token: expect.any(String),
        scope: 'openid profile email address phone',
      });
    });
  });

  describe('#loginWithSMS', () => {
    it('should require phone_number', async () => {
      const passwordless = new Passwordless(opts);
      await expect(
        passwordless.loginWithSMS({ code: 'foo' } as LoginWithSMSRequest)
      ).rejects.toThrow('Required parameter requestParameters.phone_number was null or undefined.');
    });

    it('should login with code from SMS', async () => {
      const passwordless = new Passwordless({ ...opts, clientSecret: 'test-client-secret' });
      const response = await passwordless.loginWithSMS({
        phone_number: 'test-phone-number',
        code: 'test-code',
      });

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        access_token: 'my-access-token',
        expires_in: 86400,
        token_type: 'Bearer',
        id_token: expect.any(String),
        scope: 'openid profile email address phone',
      });
    });
  });
});
