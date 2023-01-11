const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const ResourceServersManager = require(`../../src/management/ResourceServersManager`);
const { ArgumentError } = require('rest-facade');

describe('ResourceServersManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.resourceServers = new ResourceServersManager({
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      baseUrl: API_URL,
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('instance', () => {
    const methods = ['get', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.resourceServers[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new ResourceServersManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ResourceServersManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ResourceServersManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/resource-servers').reply(200);
    });

    it('should accept a callback', function (done) {
      this.resourceServers.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.resourceServers.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/resource-servers').reply(500);

      this.resourceServers.getAll().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/resource-servers').reply(200, data);

      this.resourceServers.getAll().then((resourceServers) => {
        expect(resourceServers).to.be.an.instanceOf(Array);

        expect(resourceServers.length).to.equal(data.length);

        expect(resourceServers[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/resource-servers', function (done) {
      const { request } = this;

      this.resourceServers.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/resource-servers')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.resourceServers.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#get', () => {
    const params = { id: 5 };
    const data = {
      id: params.id,
      name: 'Test Resource Server',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/resource-servers/${data.id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.resourceServers.get(params, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.resourceServers.get(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/resource-servers/${params.id}`).reply(500);

      this.resourceServers.get().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/resource-servers/${params.id}`).reply(200, data);

      this.resourceServers.get(params).then((connection) => {
        expect(connection.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/resource-servers/:id', function (done) {
      const { request } = this;

      this.resourceServers.get(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/resource-servers')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.resourceServers.get().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      name: 'Acme Backend API',
      options: {},
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/resource-servers').reply(200, data);
    });

    it('should accept a callback', function (done) {
      this.resourceServers.create(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.resourceServers.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/resource-servers').reply(500);

      this.resourceServers.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/resource-servers', function (done) {
      const { request } = this;

      this.resourceServers.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/resource-servers', data).reply(200);

      this.resourceServers.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/resource-servers')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.resourceServers.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const params = { id: 5 };
    const data = {
      id: 5,
      name: 'Acme Backend API',
      options: {},
    };

    beforeEach(function () {
      this.request = nock(API_URL).patch(`/resource-servers/${data.id}`).reply(200, data);
    });

    it('should accept a callback', function (done) {
      this.resourceServers.update(params, data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.resourceServers
        .update(params, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/resource-servers/${data.id}`).reply(500);

      this.resourceServers.update(params, data).catch((err) => {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/resource-servers/:id', function (done) {
      const { request } = this;

      this.resourceServers.update(params, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/resource-servers/${data.id}`, data).reply(200);

      this.resourceServers.update(params, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/resource-servers/${data.id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.resourceServers.update(params, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 5;

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/resource-servers/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.resourceServers.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.resourceServers.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /resource-servers/${id}`, function (done) {
      const { request } = this;

      this.resourceServers.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/resource-servers/${id}`).reply(500);

      this.resourceServers.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/resource-servers/${id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.resourceServers.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
