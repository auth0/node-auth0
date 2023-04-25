import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import nock from 'nock';
import { beforeAll, afterAll } from '@jest/globals';
import Passwordless from '../../src/auth/Passwordless';

const { back: nockBack } = nock;

nockBack.fixtures = `${path.dirname(fileURLToPath(import.meta.url))}/fixtures`;

const DOMAIN = 'test-domain.auth0.com';
const CLIENT_ID = 'test-client-id';
const CLIENT_SECRET = 'test-client-secret';
const EMAIL = 'test-email@example.com';
const PHONE_NUMBER = '01234';

if (process.env.RECORD) {
  nockBack.setMode('update');
} else {
  nockBack.setMode('lockdown');
}

const baseUrl = `https://${DOMAIN}`;

const opts = {
  domain: process.env.TEST_DOMAIN || DOMAIN,
  baseUrl,
  clientId: process.env.TEST_CLIENT_ID || CLIENT_ID,
  clientSecret: process.env.TEST_CLIENT_SECRET || CLIENT_SECRET,
};

const sanitizeFixture: any = (fixture: any, overrides = {}) => {
  const sanitized = {
    client_id: CLIENT_ID,
    email: EMAIL,
    phone_number: PHONE_NUMBER,
    rawHeaders: [],
    ...(fixture?.body && { body: sanitizeFixture(fixture.body, overrides) }),
    ...(fixture?.response &&
      typeof fixture.response !== 'string' && {
        response: sanitizeFixture(fixture.response, overrides),
      }),
    ...overrides,
  };

  return Object.fromEntries(
    Object.entries(fixture).reduce((memo, [key, value]) => {
      return [...memo, [key, sanitized[key] || value]];
    }, [] as any)
  );
};

const getEmail = () => {
  if (process.env.RECORD) {
    return `${uuid()}@example.com`;
  }
  return EMAIL;
};

const getPhoneNumber = () => {
  if (process.env.RECORD) {
    return uuid();
  }
  return PHONE_NUMBER;
};

describe('Passwordless', () => {
  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('passwordless.json', {
      afterRecord(fixtures) {
        return fixtures.map((fixture) => sanitizeFixture(fixture));
      },
    }));
  });

  afterAll(() => {
    nockDone();
  });

  describe('#sendEmail', () => {
    it('should start passwordless using an email', async () => {
      const passwordless = new Passwordless(opts);
      const email = getEmail();
      const response = await passwordless.sendEmail({
        email,
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
      const phone_number = getPhoneNumber();
      const response = await passwordless.sendSMS({
        phone_number,
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
