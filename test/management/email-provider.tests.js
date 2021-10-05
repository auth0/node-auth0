const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const EmailProviderManager = require(`../../src/management/EmailProviderManager`);
const { ArgumentError } = require('rest-facade');

describe('EmailProviderManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.emailProvider = new EmailProviderManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['configure', 'get', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.emailProvider[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new EmailProviderManager();
      }).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new EmailProviderManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new EmailProviderManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#get', () => {
    const data = {
      name: 'Test provider',
      options: {},
    };

    beforeEach(function () {
      this.request = nock(API_URL).get('/emails/provider').reply(200);
    });

    it('should accept a callback', function (done) {
      this.emailProvider.get(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.emailProvider.get().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/emails/provider').reply(500);

      this.emailProvider.get().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/emails/provider').reply(200, data);

      this.emailProvider.get().then((provider) => {
        expect(provider.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/emails/provider', function (done) {
      const { request } = this;

      this.emailProvider.get().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/emails/provider')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.emailProvider.get().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };

      const request = nock(API_URL).get('/emails/provider').query(params).reply(200);

      this.emailProvider.get(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#configure', () => {
    const data = {
      name: 'Test provider',
      credentials: {},
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/emails/provider').reply(200, data);
    });

    it('should accept a callback', function (done) {
      this.emailProvider.configure(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.emailProvider.configure(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/emails/provider').reply(500);

      this.emailProvider.configure(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/emails/provider', function (done) {
      const { request } = this;

      this.emailProvider.configure(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/emails/provider', data).reply(200);

      this.emailProvider.configure(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/emails/provider')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.emailProvider.configure(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const data = {
      name: 'Test provider',
      credentials: {},
    };

    beforeEach(function () {
      this.request = nock(API_URL).patch('/emails/provider').reply(200, data);
    });

    it('should accept a callback', function (done) {
      this.emailProvider.update({}, data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.emailProvider.update({}, data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/emails/provider/${data.id}`).reply(500);

      this.emailProvider.update({}, data).catch((err) => {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/emails/provider', function (done) {
      const { request } = this;

      this.emailProvider.update({}, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch('/emails/provider', data).reply(200);

      this.emailProvider.update({}, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/emails/provider')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.emailProvider.update({}, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    beforeEach(function () {
      this.request = nock(API_URL).delete('/emails/provider').reply(200);
    });

    it('should accept a callback', function (done) {
      this.emailProvider.delete({}, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.emailProvider.delete().then(done.bind(null, null));
    });

    it('should perform a DELETE request to /emails/provider', function (done) {
      const { request } = this;

      this.emailProvider.delete().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete('/emails/provider').reply(500);

      this.emailProvider.delete().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete('/emails/provider')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.emailProvider.delete().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
