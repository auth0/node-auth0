import chai from 'chai';
import nock from 'nock';
import fetch, { RequestInfo as NFRequestInfo, RequestInit as NFRequestInit } from 'node-fetch';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  ClientGrant,
  CustomDomainsManager,
  Configuration,
  PostCustomDomainsRequestTypeEnum,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('CustomDomainsManager', () => {
  let customDomains: CustomDomainsManager;

  before(function () {
    this.token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: this.token,
    });
    customDomains = client.customDomains;
  });

  describe('instance', () => {
    const methods = ['get', 'getAll', 'create', 'delete', 'verify'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(customDomains[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new CustomDomainsManager(
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
        new CustomDomainsManager(
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
      this.request = nock(API_URL).get('/custom-domains').reply(200, []);
    });

    it('should return a promise if no callback is given', function (done) {
      customDomains.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/custom-domains').reply(500);

      customDomains.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ custom_domain_id: 'cd_0000000000000001' }];
      nock(API_URL).get('/custom-domains').reply(200, data);

      customDomains.getAll().then((customDomains) => {
        expect(customDomains.data).to.be.an.instanceOf(Array);

        expect(customDomains.data.length).to.equal(data.length);

        expect(customDomains.data[0].custom_domain_id).to.equal(data[0].custom_domain_id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/custom-domains', function (done) {
      const { request } = this;

      customDomains.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/custom-domains')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200, []);

      customDomains.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#get', () => {
    let data;
    beforeEach(function () {
      data = [
        {
          custom_domain_id: 'cd_0000000000000001',
          domain: 'login.mycompany.com',
          primary: false,
          status: 'ready',
          type: 'self_managed_certs',
          origin_domain_name: 'mycompany_cd_0000000000000001.edge.tenants.auth0.com',
          verification: {
            methods: ['object'],
          },
        },
      ];

      this.request = nock(API_URL)
        .get(`/custom-domains/${data[0].custom_domain_id}`)
        .reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      customDomains
        .get({ id: data[0].custom_domain_id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/custom-domains/cd_0000000000000001', function (done) {
      const { request } = this;

      customDomains.get({ id: data[0].custom_domain_id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/custom-domains/${data[0].custom_domain_id}`).reply(500);

      customDomains.get({ id: data[0].custom_domain_id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/custom-domains/${data[0].custom_domain_id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200, data[0]);

      customDomains.get({ id: data[0].custom_domain_id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      custom_domain_id: 'cd_0000000000000001',
      domain: 'login.mycompany.com',
      primary: false,
      status: 'ready',
      type: PostCustomDomainsRequestTypeEnum.self_managed_certs,
      origin_domain_name: 'mycompany_cd_0000000000000001.edge.tenants.auth0.com',
      verification: {
        methods: ['object'],
      },
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/custom-domains').reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      customDomains.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/custom-domains').reply(500);

      customDomains.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/custom-domains', function (done) {
      const { request } = this;

      customDomains.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/custom-domains', data).reply(200, {});

      customDomains.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/custom-domains')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200, {});

      customDomains.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 'cd_0000000000000001';

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/custom-domains/${id}`).reply(200);
    });

    it('should return a promise when no callback is given', function (done) {
      customDomains.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /custom-domains/${id}`, function (done) {
      const { request } = this;

      customDomains.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/custom-domains/${id}`).reply(500);

      customDomains.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/custom-domains/${id}`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      customDomains.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#verify', () => {
    let data;
    beforeEach(function () {
      data = { id: 'cd_0000000000000001' };

      this.request = nock(API_URL).post(`/custom-domains/${data.id}/verify`).reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      customDomains
        .verify({ id: data.id }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/custom-domains/cd_0000000000000001/verify', function (done) {
      const { request } = this;

      customDomains.verify({ id: data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/custom-domains/${data.id}/verify`).reply(200, {});

      customDomains.verify({ id: data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/custom-domains/${data.id}/verify`).reply(500);

      customDomains.verify({ id: data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });
});
