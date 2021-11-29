const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const CustomDomainsManager = require(`../../src/management/CustomDomainsManager`);
const { ArgumentError } = require('rest-facade');

describe('CustomDomainsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.customDomains = new CustomDomainsManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['get', 'getAll', 'create', 'delete', 'verify'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.customDomains[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new CustomDomainsManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new CustomDomainsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new CustomDomainsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/custom-domains').reply(200);
    });

    it('should accept a callback', function (done) {
      this.customDomains.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.customDomains.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/custom-domains').reply(500);

      this.customDomains.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ custom_domain_id: 'cd_0000000000000001' }];
      nock(API_URL).get('/custom-domains').reply(200, data);

      this.customDomains.getAll().then((customDomains) => {
        expect(customDomains).to.be.an.instanceOf(Array);

        expect(customDomains.length).to.equal(data.length);

        expect(customDomains[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/custom-domains', function (done) {
      const { request } = this;

      this.customDomains.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/custom-domains')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.customDomains.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#get', () => {
    beforeEach(function () {
      this.data = [
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
        .get(`/custom-domains/${this.data[0].custom_domain_id}`)
        .reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      const params = { id: this.data[0].custom_domain_id };

      this.customDomains.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.customDomains
        .get({ id: this.data[0].custom_domain_id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/custom-domains/cd_0000000000000001', function (done) {
      const { request } = this;

      this.customDomains.get({ id: this.data[0].custom_domain_id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/custom-domains/${this.data.id}`).reply(500);

      this.customDomains.get({ id: this.data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/custom-domains/${this.data.id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.customDomains.get({ id: this.data.id }).then(() => {
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
      type: 'self_managed_certs',
      origin_domain_name: 'mycompany_cd_0000000000000001.edge.tenants.auth0.com',
      verification: {
        methods: ['object'],
      },
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/custom-domains').reply(200);
    });

    it('should accept a callback', function (done) {
      this.customDomains.create(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.customDomains.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/custom-domains').reply(500);

      this.customDomains.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/custom-domains', function (done) {
      const { request } = this;

      this.customDomains.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/custom-domains', data).reply(200);

      this.customDomains.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/custom-domains')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.customDomains.create(data).then(() => {
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

    it('should accept a callback', function (done) {
      this.customDomains.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.customDomains.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /custom-domains/${id}`, function (done) {
      const { request } = this;

      this.customDomains.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/custom-domains/${id}`).reply(500);

      this.customDomains.delete({ id }).catch((err) => {
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

      this.customDomains.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#verify', () => {
    beforeEach(function () {
      this.data = { id: 'cd_0000000000000001' };

      this.request = nock(API_URL)
        .post(`/custom-domains/${this.data.id}/verify`)
        .reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      this.customDomains.verify({ id: this.data.id }, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.customDomains
        .verify({ id: this.data.id }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/custom-domains/cd_0000000000000001/verify', function (done) {
      const { request } = this;

      this.customDomains.verify({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/custom-domains/${this.data.id}/verify`).reply(200);

      this.customDomains.verify({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/custom-domains/${this.data.id}/verify`).reply(500);

      this.customDomains.verify({ id: this.data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });
});
