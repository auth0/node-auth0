var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var CustomDomainsManager = require(SRC_DIR + '/management/CustomDomainsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('CustomDomainsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.customDomains = new CustomDomainsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['get', 'getAll', 'create', 'delete', 'verify'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.customDomains[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(CustomDomainsManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = CustomDomainsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = CustomDomainsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/custom-domains')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.customDomains.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.customDomains
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/custom-domains')
        .reply(500);

      this.customDomains.getAll().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ custom_domain_id: 'cd_0000000000000001' }];
      var request = nock(API_URL)
        .get('/custom-domains')
        .reply(200, data);

      this.customDomains.getAll().then(function(customDomains) {
        expect(customDomains).to.be.an.instanceOf(Array);

        expect(customDomains.length).to.equal(data.length);

        expect(customDomains[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/custom-domains', function(done) {
      var request = this.request;

      this.customDomains.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/custom-domains')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.customDomains.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.data = [
        {
          custom_domain_id: 'cd_0000000000000001',
          domain: 'login.mycompany.com',
          primary: false,
          status: 'ready',
          type: 'self_managed_certs',
          origin_domain_name: 'mycompany_cd_0000000000000001.edge.tenants.auth0.com',
          verification: {
            methods: ['object']
          }
        }
      ];

      this.request = nock(API_URL)
        .get('/custom-domains/' + this.data[0].custom_domain_id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { id: this.data[0].custom_domain_id };

      this.customDomains.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.customDomains
        .get({ id: this.data[0].custom_domain_id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/custom-domains/cd_0000000000000001', function(done) {
      var request = this.request;

      this.customDomains.get({ id: this.data[0].custom_domain_id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/custom-domains/' + this.data.id)
        .reply(500);

      this.customDomains.get({ id: this.data.id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/custom-domains/' + this.data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.customDomains.get({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    var data = {
      custom_domain_id: 'cd_0000000000000001',
      domain: 'login.mycompany.com',
      primary: false,
      status: 'ready',
      type: 'self_managed_certs',
      origin_domain_name: 'mycompany_cd_0000000000000001.edge.tenants.auth0.com',
      verification: {
        methods: ['object']
      }
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/custom-domains')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.customDomains.create(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.customDomains
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/custom-domains')
        .reply(500);

      this.customDomains.create(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/custom-domains', function(done) {
      var request = this.request;

      this.customDomains.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/custom-domains', data)
        .reply(200);

      this.customDomains.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/custom-domains')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.customDomains.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', function() {
    var id = 'cd_0000000000000001';

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/custom-domains/' + id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.customDomains.delete({ id: id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.customDomains.delete({ id: id }).then(done.bind(null, null));
    });

    it('should perform a delete request to /custom-domains/' + id, function(done) {
      var request = this.request;

      this.customDomains.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/custom-domains/' + id)
        .reply(500);

      this.customDomains.delete({ id: id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/custom-domains/' + id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.customDomains.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#verify', function() {
    beforeEach(function() {
      this.data = { id: 'cd_0000000000000001' };

      this.request = nock(API_URL)
        .post('/custom-domains/' + this.data.id + '/verify')
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.customDomains.verify({ id: this.data.id }, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.customDomains
        .verify({ id: this.data.id }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/custom-domains/cd_0000000000000001/verify', function(done) {
      var request = this.request;

      this.customDomains.verify({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/custom-domains/' + this.data.id + '/verify')
        .reply(200);

      this.customDomains.verify({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/custom-domains/' + this.data.id + '/verify')
        .reply(500);

      this.customDomains.verify({ id: this.data.id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });
  });
});
