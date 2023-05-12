import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  TicketsManager,
  PatchProviderRequestNameEnum,
  PostProviderRequestNameEnum,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('TicketsManager', () => {
  let tickets: TicketsManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    tickets = client.tickets;
  });

  describe('instance', () => {
    const methods = ['changePassword', 'verifyEmail'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect((tickets as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new TicketsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new TicketsManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#verifyEmail', () => {
    const data = {
      result_url: 'http://myapp.com/callback',
      user_id: '',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/tickets/email-verification').reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      tickets.verifyEmail(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/tickets/email-verification').reply(500);

      tickets.verifyEmail(data).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request to /api/v2tickets/email-verification', async function () {
      await tickets.verifyEmail(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/tickets/email-verification')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await tickets.verifyEmail({ user_id: '123' });
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/tickets/email-verification', {
          user_id: '123',
        })
        .reply(200, {});

      await tickets.verifyEmail({ user_id: '123' });
      expect(request.isDone()).to.be.true;
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

    beforeEach(function () {
      request = nock(API_URL).post('/tickets/password-change').reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      tickets.changePassword(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/tickets/email-verification').reply(500);

      tickets.changePassword(data).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request to /api/v2tickets/email-verification', async function () {
      await tickets.changePassword(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).post('/tickets/password-change', data).reply(200, {});

      await tickets.changePassword(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/tickets/password-change')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await tickets.changePassword(data);
      expect(request.isDone()).to.be.true;
    });
  });
});
