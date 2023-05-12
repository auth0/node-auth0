import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  CustomDomain,
  CustomDomainsManager,
  PostCustomDomainsRequestTypeEnum,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('CustomDomainsManager', () => {
  let customDomains: CustomDomainsManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    customDomains = client.customDomains;
  });

  describe('instance', () => {
    const methods = ['get', 'getAll', 'create', 'delete', 'verify'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect((customDomains as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new CustomDomainsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new CustomDomainsManager({
          baseUrl: '',
        } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;
    const response: CustomDomain[] = [
      {
        custom_domain_id: 'test_domain',
        domain: 'Test Domain',
        primary: true,
        status: 'disabled',
        type: 'auth0_managed_certs',
        origin_domain_name: 'domain_name',
        verification: {
          methods: [
            {
              name: 'cname',
              record: 'test_record',
              domain: 'test_domain',
            },
          ],
        },
        custom_client_ip_header: 'test_header',
        tls_policy: 'policy',
      },
    ];

    beforeEach(function () {
      request = nock(API_URL).get('/custom-domains').reply(200, response);
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
      customDomains.getAll().then((customDomains) => {
        expect(customDomains.data).to.be.an.instanceOf(Array);
        expect(customDomains.data.length).to.equal(response.length);

        expect(customDomains.data[0].custom_domain_id).to.equal(response[0].custom_domain_id);
        expect(customDomains.data[0].domain).to.equal(response[0].domain);
        expect(customDomains.data[0].primary).to.equal(response[0].primary);
        expect(customDomains.data[0].status).to.equal(response[0].status);
        expect(customDomains.data[0].type).to.equal(response[0].type);
        expect(customDomains.data[0].origin_domain_name).to.equal(response[0].origin_domain_name);
        expect(customDomains.data[0].verification?.methods?.[0].name).to.equal(
          response[0].verification?.methods?.[0].name
        );
        expect(customDomains.data[0].verification?.methods?.[0].record).to.equal(
          response[0].verification?.methods?.[0].record
        );
        expect(customDomains.data[0].verification?.methods?.[0].domain).to.equal(
          response[0].verification?.methods?.[0].domain
        );
        expect(customDomains.data[0].custom_client_ip_header).to.equal(
          response[0].custom_client_ip_header
        );
        expect(customDomains.data[0].tls_policy).to.equal(response[0].tls_policy);

        done();
      });
    });

    it('should perform a GET request to /api/v2/custom-domains', function (done) {
      customDomains.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/custom-domains')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      customDomains.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#get', () => {
    const response: CustomDomain = {
      custom_domain_id: 'test_domain',
      domain: 'Test Domain',
      primary: true,
      status: 'disabled',
      type: 'auth0_managed_certs',
      origin_domain_name: 'domain_name',
      verification: {
        methods: [
          {
            name: 'cname',
            record: 'test_record',
            domain: 'test_domain',
          },
        ],
      },
      custom_client_ip_header: 'test_header',
      tls_policy: 'policy',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .get(`/custom-domains/${response.custom_domain_id}`)
        .reply(200, response);
    });

    it('should return a promise if no callback is given', function (done) {
      customDomains
        .get({ id: response.custom_domain_id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/custom-domains/cd_0000000000000001', function (done) {
      customDomains.get({ id: response.custom_domain_id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/custom-domains/${response.custom_domain_id}`).reply(500);

      customDomains.get({ id: response.custom_domain_id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      customDomains.get({ id: response.custom_domain_id }).then((customDomain) => {
        expect(customDomain.data.custom_domain_id).to.equal(response.custom_domain_id);
        expect(customDomain.data.domain).to.equal(response.domain);
        expect(customDomain.data.primary).to.equal(response.primary);
        expect(customDomain.data.status).to.equal(response.status);
        expect(customDomain.data.type).to.equal(response.type);
        expect(customDomain.data.origin_domain_name).to.equal(response.origin_domain_name);
        expect(customDomain.data.verification?.methods?.[0].name).to.equal(
          response.verification?.methods?.[0].name
        );
        expect(customDomain.data.verification?.methods?.[0].record).to.equal(
          response.verification?.methods?.[0].record
        );
        expect(customDomain.data.verification?.methods?.[0].domain).to.equal(
          response.verification?.methods?.[0].domain
        );
        expect(customDomain.data.custom_client_ip_header).to.equal(
          response.custom_client_ip_header
        );
        expect(customDomain.data.tls_policy).to.equal(response.tls_policy);

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/custom-domains/${response.custom_domain_id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      customDomains.get({ id: response.custom_domain_id }).then(() => {
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

    const response: CustomDomain = {
      custom_domain_id: 'test_domain',
      domain: 'Test Domain',
      primary: true,
      status: 'disabled',
      type: 'auth0_managed_certs',
      verification: {
        methods: [
          {
            name: 'cname',
            record: 'test_record',
            domain: 'test_domain',
          },
        ],
      },
      custom_client_ip_header: 'test_header',
      tls_policy: 'policy',
    };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/custom-domains').reply(200, response);
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
      customDomains.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      customDomains.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      customDomains.create(data).then((customDomain) => {
        expect(customDomain.data.custom_domain_id).to.equal(response.custom_domain_id);
        expect(customDomain.data.domain).to.equal(response.domain);
        expect(customDomain.data.primary).to.equal(response.primary);
        expect(customDomain.data.status).to.equal(response.status);
        expect(customDomain.data.type).to.equal(response.type);
        expect(customDomain.data.verification?.methods?.[0].name).to.equal(
          response.verification?.methods?.[0].name
        );
        expect(customDomain.data.verification?.methods?.[0].record).to.equal(
          response.verification?.methods?.[0].record
        );
        expect(customDomain.data.verification?.methods?.[0].domain).to.equal(
          response.verification?.methods?.[0].domain
        );
        expect(customDomain.data.custom_client_ip_header).to.equal(
          response.custom_client_ip_header
        );
        expect(customDomain.data.tls_policy).to.equal(response.tls_policy);

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/custom-domains')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      customDomains.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 'cd_0000000000000001';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/custom-domains/${id}`).reply(200);
    });

    it('should return a promise when no callback is given', function (done) {
      customDomains.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /custom-domains/${id}`, function (done) {
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
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      customDomains.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#verify', () => {
    const data = { id: 'cd_0000000000000001' };
    let request: nock.Scope;
    const response: CustomDomain = {
      custom_domain_id: 'test_domain',
      domain: 'Test Domain',
      primary: true,
      status: 'disabled',
      type: 'auth0_managed_certs',
      origin_domain_name: 'domain_name',
      verification: {
        methods: [
          {
            name: 'cname',
            record: 'test_record',
            domain: 'test_domain',
          },
        ],
      },
      custom_client_ip_header: 'test_header',
      tls_policy: 'policy',
    };

    beforeEach(function () {
      request = nock(API_URL).post(`/custom-domains/${data.id}/verify`).reply(200, response);
    });

    it('should return a promise if no callback is given', function (done) {
      customDomains
        .verify({ id: data.id }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/custom-domains/cd_0000000000000001/verify', function (done) {
      customDomains.verify({ id: data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      customDomains.verify({ id: data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      customDomains.verify({ id: data.id }).then((customDomain) => {
        expect(customDomain.data.custom_domain_id).to.equal(response.custom_domain_id);
        expect(customDomain.data.domain).to.equal(response.domain);
        expect(customDomain.data.primary).to.equal(response.primary);
        expect(customDomain.data.status).to.equal(response.status);
        expect(customDomain.data.type).to.equal(response.type);
        expect(customDomain.data.verification?.methods?.[0].name).to.equal(
          response.verification?.methods?.[0].name
        );
        expect(customDomain.data.verification?.methods?.[0].record).to.equal(
          response.verification?.methods?.[0].record
        );
        expect(customDomain.data.verification?.methods?.[0].domain).to.equal(
          response.verification?.methods?.[0].domain
        );
        expect(customDomain.data.custom_client_ip_header).to.equal(
          response.custom_client_ip_header
        );
        expect(customDomain.data.tls_policy).to.equal(response.tls_policy);

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
