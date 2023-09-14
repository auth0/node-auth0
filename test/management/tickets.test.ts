import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { TicketsManager, ManagementClient } from '../../src/index.js';

describe('TicketsManager', () => {
  let tickets: TicketsManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    tickets = client.tickets;
  });

  describe('instance', () => {
    const methods = ['changePassword', 'verifyEmail'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((tickets as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new TicketsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new TicketsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#verifyEmail', () => {
    const data = {
      result_url: 'http://myapp.com/callback',
      user_id: '',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/tickets/email-verification').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      tickets.verifyEmail(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/tickets/email-verification').reply(500, {});

      tickets.verifyEmail(data).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a POST request to /api/v2tickets/email-verification', async () => {
      await tickets.verifyEmail(data);
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/tickets/email-verification')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await tickets.verifyEmail({ user_id: '123' });
      expect(request.isDone()).toBe(true);
    });

    it('should pass the parameters in the query-string', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/tickets/email-verification', {
          user_id: '123',
        })
        .reply(200, {});

      await tickets.verifyEmail({ user_id: '123' });
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#changePassword', () => {
    const data = {
      result_url: 'http://myapp.com/callback',
      user_id: '',
      new_password: 'secret',
      connection_id: 'con_0000000000000001',
      email: '',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/tickets/password-change').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      tickets.changePassword(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/tickets/email-verification').reply(500, {});

      tickets.changePassword(data).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a POST request to /api/v2tickets/email-verification', async () => {
      await tickets.changePassword(data);
      expect(request.isDone()).toBe(true);
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).post('/tickets/password-change', data).reply(200, {});

      await tickets.changePassword(data);
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/tickets/password-change')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await tickets.changePassword(data);
      expect(request.isDone()).toBe(true);
    });
  });
});
