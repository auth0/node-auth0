import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import fetch, { RequestInfo as NFRequestInfo, RequestInit as NFRequestInit } from 'node-fetch';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  ClientsManager,
  Configuration,
  RequiredError,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

chai.use(chaiAsPromised);
const { expect } = chai;

let clients: ClientsManager;

describe('ClientsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: this.token,
    });

    clients = client.clients;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('instance', () => {
    const methods = ['getAll', 'get', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect(clients[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ClientsManager(
          new Configuration({
            fetchApi: (url: RequestInfo, init: RequestInit) => {
              return fetch(
                url as NFRequestInfo,
                init as NFRequestInit
              ) as unknown as Promise<Response>;
            },
            middleware: [],
          } as any)
        );
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ClientsManager(
          new Configuration({
            baseUrl: '',
            fetchApi: (url: RequestInfo, init: RequestInit) => {
              return fetch(
                url as NFRequestInfo,
                init as NFRequestInit
              ) as unknown as Promise<Response>;
            },
            middleware: [],
          })
        );
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL)
        .get('/clients')
        .reply(200, [{ client_id: '123' }]);
    });

    it('should return a promise if no callback is given', (done) => {
      clients.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/clients').reply(500);

      clients.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = [{ client_id: '1' }];
      nock(API_URL).get('/clients').reply(200, data);

      clients.getAll().then((clients) => {
        expect(clients.data).to.be.an.instanceOf(Array);

        expect(clients.data.length).to.equal(data.length);

        expect(clients.data[0].client_id).to.equal(data[0].client_id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/clients', function (done) {
      const { request } = this;

      clients.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const data = [{ client_id: '1' }];
      const request = nock(API_URL)
        .get('/clients')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200, data);

      clients.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const data = [{ client_id: '1' }];
      const request = nock(API_URL)
        .get('/clients')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200, data);

      clients.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#create', () => {
    const data = { name: 'Test client' };

    beforeEach(function () {
      this.request = nock(API_URL).post('/clients').reply(201, data);
    });

    it('should return a promise if no callback is given', (done) => {
      clients.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients', function (done) {
      const { request } = this;

      clients.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/clients')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(201, data);

      clients.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new client data in the request body', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).post('/clients', data).reply(201, data);

      clients.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', () => {
    beforeEach(function () {
      this.data = {
        id: 5,
        name: 'John Doe',
        email: 'john@doe.com',
      };

      this.request = nock(API_URL).get(`/clients/${this.data.id}`).reply(201, this.data);
    });

    it('should return a promise if no callback is given', function (done) {
      clients.get({ id: this.data.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients/5', function (done) {
      const { request } = this;

      clients.get({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    beforeEach(function () {
      this.data = { id: 5 };

      this.request = nock(API_URL).patch(`/clients/${this.data.id}`).reply(200, this.data);
    });

    it('should return a promise if no callback is given', (done) => {
      clients.update({ id: '5' }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/clients/5', function (done) {
      const { request } = this;

      clients.update({ id: '5' }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/clients/${this.data.id}`, this.data)
        .reply(200, this.data);

      clients.update({ id: '5' }, this.data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/clients/${id}`).reply(200);
    });

    it('should accept a callback', (done) => {
      clients.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', (done) => {
      clients.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /clients/${id}`, function (done) {
      const { request } = this;

      clients.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#rotateSecret', () => {
    const id = '5';

    beforeEach(function () {
      this.request = nock(API_URL)
        .post(`/clients/${id}/rotate-secret`)
        .reply(200, { client_id: '123' });
    });

    it('should return a promise if no callback is given', (done) => {
      clients
        .rotateClientSecret({ id }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients/5/rotate-secret', function (done) {
      const { request } = this;

      clients.rotateClientSecret({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return an error when client_id is not sent', async () => {
      expect(clients.rotateClientSecret({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should include the new data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/clients/${id}/rotate-secret`)
        .reply(200, { client_id: '123' });

      clients.rotateClientSecret({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post(`/clients/${id}/rotate-secret`).reply(500);

      clients.rotateClientSecret({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });
});
