import nock from 'nock';
import { beforeAll, afterAll } from '@jest/globals';
import { Database, AuthApiError } from '../../src/index.js';

const { back: nockBack } = nock;

const EMAIL = 'test-email@example.com';
const DUPLICATE_EMAIL = 'test-email-duplicate@example.com';
const PASSWORD = 'test-password';

const opts = {
  domain: 'test-domain.auth0.com',
  clientId: 'test-client-id',
};

describe('Database', () => {
  let nockDone: () => void;

  beforeAll(async () => {
    ({ nockDone } = await nockBack('auth/fixtures/database.json'));
  });

  afterAll(() => {
    nockDone();
  });

  describe('#signUp', () => {
    it('should signup a user', async () => {
      const database = new Database(opts);
      const email = EMAIL;
      const { data } = await database.signUp({
        email,
        password: PASSWORD,
        connection: 'Username-Password-Authentication',
      });
      expect(data).toEqual({
        _id: 'test-id',
        email_verified: false,
        email,
      });
    });

    it('should require connection', async () => {
      const database = new Database(opts);
      await expect(
        database.signUp({
          email: EMAIL,
          password: PASSWORD,
        } as any)
      ).rejects.toThrow('Required parameter requestParameters.connection was null or undefined.');
    });

    it('should handle duplicate user error', async () => {
      const database = new Database(opts);
      const email = DUPLICATE_EMAIL;
      let error: AuthApiError | null = null;

      try {
        await database.signUp({
          email,
          password: PASSWORD,
          connection: 'Username-Password-Authentication',
        });
      } catch (e) {
        error = e as AuthApiError;
      }

      expect(error).toBeDefined();
      expect(error).toEqual(
        expect.objectContaining({
          error: 'invalid_signup',
          error_description: 'Invalid sign up',
        })
      );
    });
  });

  describe('#changePassword', () => {
    it('should send a change password email', async () => {
      const database = new Database(opts);

      const email = EMAIL;
      await database.signUp({
        email,
        password: PASSWORD,
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
