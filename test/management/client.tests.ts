import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  Client,
  ClientCreate,
  ClientUpdate,
  ClientsManager,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';
import { RequiredError } from '../../src/lib/errors';

chai.use(chaiAsPromised);
const { expect } = chai;

let clients: ClientsManager;

describe('ClientsManager', () => {
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
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
        expect((clients as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ClientsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ClientsManager({
          baseUrl: '',
        } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;
    const response: Client[] = [
      {
        tenant: 'test_tenant',
        client_id: '123',
        name: 'test_name',
        description: 'test_description',
        global: false,
        client_secret: 'tes_secret',
        app_type: 'spa',
        logo_uri: 'test_logo_uri',
      },
    ];

    beforeEach(function () {
      request = nock(API_URL).get('/clients').reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/clients').reply(500, {});

      clients.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients.getAll().then((clients) => {
        expect(clients.data).to.be.an.instanceOf(Array);

        expect(clients.data.length).to.equal(response.length);

        expect(clients.data[0].tenant).to.equal(response[0].tenant);
        expect(clients.data[0].client_id).to.equal(response[0].client_id);
        expect(clients.data[0].name).to.equal(response[0].name);
        expect(clients.data[0].description).to.equal(response[0].description);
        expect(clients.data[0].global).to.equal(response[0].global);
        expect(clients.data[0].client_secret).to.equal(response[0].client_secret);
        expect(clients.data[0].app_type).to.equal(response[0].app_type);
        expect(clients.data[0].logo_uri).to.equal(response[0].logo_uri);

        done();
      });
    });

    it('should perform a GET request to /api/v2/clients', function (done) {
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
        .matchHeader('Authorization', `Bearer ${token}`)
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
    const data: ClientCreate = {
      name: 'test_name',
      description: 'test_description',
      app_type: 'spa',
      logo_uri: 'test_logo_uri',
    };
    const response: Client = {
      tenant: 'test_tenant',
      client_id: '123',
      name: data.name,
      description: data.description,
      global: false,
      client_secret: 'test_secret',
      app_type: data.app_type,
      logo_uri: data.logo_uri,
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/clients').reply(201, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients', function (done) {
      clients.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/clients')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(201, data);

      clients.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new client data in the request body', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/clients', data as any)
        .reply(201, data);

      clients.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients.create(data).then((client) => {
        expect(client.data.client_id).to.equal(response.client_id);
        expect(client.data.name).to.equal(response.name);
        expect(client.data.description).to.equal(response.description);
        expect(client.data.global).to.equal(response.global);
        expect(client.data.client_secret).to.equal(response.client_secret);
        expect(client.data.app_type).to.equal(response.app_type);
        expect(client.data.logo_uri).to.equal(response.logo_uri);

        done();
      });
    });
  });

  describe('#get', () => {
    const response: Client = {
      tenant: 'test_tenant',
      client_id: '123',
      name: 'test_name',
      description: 'test_description',
      global: false,
      client_secret: 'test_secret',
      app_type: 'spa',
      logo_uri: 'test_logo_uri',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/clients/${response.client_id}`).reply(201, response);
    });

    it('should return a promise if no callback is given', function (done) {
      clients
        .get({ id: response.client_id as string })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients/5', function (done) {
      clients.get({ id: response.client_id as string }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients.get({ id: response.client_id as string }).then((client) => {
        expect(client.data.client_id).to.equal(response.client_id);
        expect(client.data.name).to.equal(response.name);
        expect(client.data.description).to.equal(response.description);
        expect(client.data.global).to.equal(response.global);
        expect(client.data.client_secret).to.equal(response.client_secret);
        expect(client.data.app_type).to.equal(response.app_type);
        expect(client.data.logo_uri).to.equal(response.logo_uri);

        done();
      });
    });
  });

  describe('#update', () => {
    const data: ClientUpdate = {
      name: 'test_name',
      description: 'test_description',
      app_type: 'spa',
      logo_uri: 'test_logo_uri',
    };
    const response: Client = {
      tenant: 'test_tenant',
      client_id: '123',
      name: data.name,
      description: data.description,
      global: false,
      client_secret: 'test_secret',
      app_type: data.app_type,
      logo_uri: data.logo_uri,
    };

    let request: nock.Scope;
    beforeEach(function () {
      request = nock(API_URL).patch(`/clients/${response.client_id}`).reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients
        .update({ id: response.client_id as string }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/clients/5', function (done) {
      clients.update({ id: response.client_id as string }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/clients/${response.client_id as string}`, data as any)
        .reply(200, response);

      clients.update({ id: response.client_id as string }, data as any).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients.update({ id: response.client_id as string }, data as any).then((client) => {
        expect(client.data.client_id).to.equal(response.client_id);
        expect(client.data.name).to.equal(response.name);
        expect(client.data.description).to.equal(response.description);
        expect(client.data.global).to.equal(response.global);
        expect(client.data.client_secret).to.equal(response.client_secret);
        expect(client.data.app_type).to.equal(response.app_type);
        expect(client.data.logo_uri).to.equal(response.logo_uri);

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/clients/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      clients.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /clients/${id}`, function (done) {
      clients.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#rotateSecret', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post(`/clients/${id}/rotate-secret`).reply(200, { client_id: '123' });
    });

    it('should return a promise if no callback is given', (done) => {
      clients
        .rotateClientSecret({ id }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients/5/rotate-secret', function (done) {
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

      nock(API_URL).post(`/clients/${id}/rotate-secret`).reply(500, {});

      clients.rotateClientSecret({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });
});
