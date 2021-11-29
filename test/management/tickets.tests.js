const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenants.auth0.com';

const TicketsManager = require(`../../src/management/TicketsManager`);
const { ArgumentError } = require('rest-facade');

describe('TicketsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.tickets = new TicketsManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['changePassword', 'verifyEmail'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.tickets[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new TicketsManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new TicketsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new TicketsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#verifyEmail', () => {
    const data = {
      result_url: 'http://myapp.com/callback',
      user_id: '',
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/tickets/email-verification').reply(200);
    });

    it('should accept a callback', function (done) {
      this.tickets.verifyEmail(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.tickets.verifyEmail(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('tickets/email-verification').reply(500);

      this.tickets.verifyEmail(data).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request to /api/v2tickets/email-verification', async function () {
      const { request } = this;

      await this.tickets.verifyEmail(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/tickets/email-verification')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.tickets.verifyEmail({});
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/tickets/email-verification', {
          include_fields: true,
          fields: 'test',
        })
        .reply(200);

      await this.tickets.verifyEmail({ include_fields: true, fields: 'test' });
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

    beforeEach(function () {
      this.request = nock(API_URL).post('/tickets/password-change').reply(200);
    });

    it('should accept a callback', function (done) {
      this.tickets.changePassword(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.tickets.changePassword(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/tickets/email-verification').reply(500);

      this.tickets.changePassword(data).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request to /api/v2tickets/email-verification', async function () {
      const { request } = this;

      await this.tickets.changePassword(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).post('/tickets/password-change', data).reply(200);

      await this.tickets.changePassword(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/tickets/password-change')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.tickets.changePassword(data);
      expect(request.isDone()).to.be.true;
    });
  });
});
