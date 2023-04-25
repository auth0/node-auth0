import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import nock, { Definition, RequestBodyMatcher } from 'nock';
import { jest, beforeAll, afterAll } from '@jest/globals';
import Database from '../../src/auth/Database';

const { back: nockBack } = nock;

nockBack.fixtures = `${path.dirname(fileURLToPath(import.meta.url))}/fixtures`;

const DOMAIN = 'test-domain.auth0.com';
const SCOPE = `https://${DOMAIN}`;
const ID = 'test-id';
const CLIENT_ID = 'test-client-id';
const EMAIL = 'test-email@example.com';
const PASSWORD = 'test-password';

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
};

const sanitizeFixture: any = (fixture: any, overrides = {}) => {
  const sanitized = {
    scope: SCOPE,
    _id: ID,
    client_id: CLIENT_ID,
    email: EMAIL,
    password: PASSWORD,
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

const getPassword = () => {
  if (process.env.RECORD) {
    return uuid();
  }
  return PASSWORD;
};

describe('Database', () => {
  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('database.json', {
      afterRecord(fixtures) {
        return fixtures.map((fixture) => sanitizeFixture(fixture));
      },
    }));
  });

  afterAll(() => {
    nockDone();
  });

  describe('#signUp', () => {
    it('should signup a user', async () => {
      const database = new Database(opts);
      const email = getEmail();
      const { data } = await database.signUp({
        email,
        password: getPassword(),
        connection: 'Username-Password-Authentication',
      });
      expect(data).toEqual({
        _id: ID,
        email_verified: false,
        email,
      });
    });

    it('should require connection', async () => {
      const database = new Database(opts);
      await expect(
        database.signUp({
          email: getEmail(),
          password: getPassword(),
        } as any)
      ).rejects.toThrow('Required parameter requestParameters.connection was null or undefined.');
    });
  });

  describe('#changePassword', () => {
    it('should send a change password email', async () => {
      const database = new Database(opts);

      const email = getEmail();
      await database.signUp({
        email,
        password: getPassword(),
        connection: 'Username-Password-Authentication',
      });
      const { data: txt } = await database.changePassword({
        email,
        connection: 'Username-Password-Authentication',
      });
      expect(txt).toBe("We've just sent you an email to reset your password.");
    });

    it('should require email', async () => {
      const database = new Database(opts);

      await expect(
        database.changePassword({
          connection: 'Username-Password-Authentication',
        } as any)
      ).rejects.toThrow('Required parameter requestParameters.email was null or undefined.');
    });
  });
});
