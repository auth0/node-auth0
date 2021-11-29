const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const ConnectionsManager = require(`../../src/management/ConnectionsManager`);
const { ArgumentError } = require('rest-facade');

describe('ConnectionsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.connections = new ConnectionsManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['getAll', 'get', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.connections[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new ConnectionsManager();
      }).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ConnectionsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ConnectionsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/connections').reply(200);
    });

    it('should accept a callback', function (done) {
      this.connections.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.connections.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/connections').reply(500);

      this.connections.getAll().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/connections').reply(200, data);

      this.connections.getAll().then((connections) => {
        expect(connections).to.be.an.instanceOf(Array);

        expect(connections.length).to.equal(data.length);

        expect(connections[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/connections', function (done) {
      const { request } = this;

      this.connections.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/connections')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.connections.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/connections')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200);

      this.connections.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', () => {
    const params = { id: 5 };
    const data = {
      id: params.id,
      name: 'Test connection',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/connections/${data.id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.connections.get(params, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.connections.get(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/connections/${params.id}`).reply(500);

      this.connections.get().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/connections/${params.id}`).reply(200, data);

      this.connections.get(params).then((connection) => {
        expect(connection.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/connections/:id', function (done) {
      const { request } = this;

      this.connections.get(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/connections')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.connections.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/connections')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200);

      this.connections.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      name: 'Test connection',
      options: {},
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/connections').reply(200, data);
    });

    it('should accept a callback', function (done) {
      this.connections.create(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.connections.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/connections').reply(500);

      this.connections.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/connections', function (done) {
      const { request } = this;

      this.connections.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/connections', data).reply(200);

      this.connections.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/connections')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.connections.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const params = { id: 5 };
    const data = {
      id: 5,
      name: 'Test connection',
      options: {},
    };

    beforeEach(function () {
      this.request = nock(API_URL).patch(`/connections/${data.id}`).reply(200, data);
    });

    it('should accept a callback', function (done) {
      this.connections.update(params, data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.connections
        .update(params, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/connections/${data.id}`).reply(500);

      this.connections.update(params, data).catch((err) => {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/connections/:id', function (done) {
      const { request } = this;

      this.connections.update(params, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/connections/${data.id}`, data).reply(200);

      this.connections.update(params, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/connections/${data.id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.connections.update(params, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 5;

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/connections/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.connections.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.connections.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /connections/${id}`, function (done) {
      const { request } = this;

      this.connections.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/connections/${id}`).reply(500);

      this.connections.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/connections/${id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.connections.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#checkStatus', () => {
    const params = { id: 5 };
    const data = {
      id: params.id,
      name: 'Test connection',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/connections/${data.id}/status`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.connections.checkStatus(params, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.connections.checkStatus(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should report success', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/connections/${params.id}/status`).reply(200);

      this.connections.checkStatus(params).then((response) => {
        expect(response).to.exist;
        done();
      });
    });

    it('should report failure', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/connections/${params.id}/status`).reply(500);

      this.connections.checkStatus(params).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete user', () => {
    const id = 5;
    const email = 'user@domain.com';
    const endpoint = `/connections/${id}/users?email=${encodeURIComponent(email)}`;

    beforeEach(function () {
      this.request = nock(API_URL).delete(endpoint, {}).reply(200);
    });

    it('should accept a callback', function (done) {
      this.connections.deleteUserByEmail({ id, email }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.connections.deleteUserByEmail({ id, email }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to ${endpoint}`, function (done) {
      const { request } = this;

      this.connections.deleteUserByEmail({ id, email }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(endpoint, {}).reply(500);

      this.connections.deleteUserByEmail({ id, email }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should require a connection id', function () {
      expect(this.connections.deleteUserByEmail.bind(null, { email })).to.throw(
        ArgumentError,
        'The connection id cannot be null or undefined'
      );
    });

    it('should require an email', function () {
      expect(this.connections.deleteUserByEmail.bind(null, { id })).to.throw(
        ArgumentError,
        'You must provide an email for the deleteUserByEmail method'
      );
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(endpoint, {})
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.connections.deleteUserByEmail({ id, email }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
