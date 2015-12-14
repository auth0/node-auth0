var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var EmailProviderManager = require(SRC_DIR + '/management/EmailProviderManager');
var ArgumentError = require(SRC_DIR + '/exceptions').ArgumentError;


describe('EmailProviderManager', function () {
  before(function () {
    this.token = 'TOKEN';
    this.emailProvider = new EmailProviderManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });


  describe('instance', function () {
    var methods = ['configure', 'get', 'update', 'delete'];

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(this.emailProvider[method])
          .to.exist
          .to.be.an.instanceOf(Function);
      })
    });
  });


  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(EmailProviderManager)
        .to.throw(ArgumentError, 'Must provide client options');
    });


    it('should throw an error when no base URL is provided', function () {
      var client = EmailProviderManager.bind(null, {});

      expect(client)
        .to.throw(ArgumentError, 'Must provide a base URL for the API');
    });


    it('should throw an error when the base URL is invalid', function () {
      var client = EmailProviderManager.bind(null, { baseUrl: '' });

      expect(client)
        .to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });


  describe('#get', function () {
    var data = {
      name: 'Test provider',
      options: {}
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .get('/emails/provider')
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .emailProvider
        .get(function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .emailProvider
        .get()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/emails/provider')
        .reply(500);

      this
        .emailProvider
        .get()
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/emails/provider')
        .reply(200, data);

      this
        .emailProvider
        .get()
        .then(function (provider) {
          expect(provider.id)
            .to.equal(data.id);

          done();
        });
    });


    it('should perform a GET request to /api/v2/emails/provider', function (done) {
      var request = this.request;

      this
        .emailProvider
        .get()
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/emails/provider')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .emailProvider
        .get()
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      var params = {
        include_fields: true,
        fields: 'test'
      };

      var request = nock(API_URL)
        .get('/emails/provider')
        .query(params)
        .reply(200)

      this
        .emailProvider
        .get(params)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#configure', function () {
    var data = {
      name: 'Test provider',
      credentials: {}
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .post('/emails/provider')
        .reply(200, data);
    })


    it('should accept a callback', function (done) {
      this
        .emailProvider
        .configure(data, function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .emailProvider
        .configure(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/emails/provider')
        .reply(500);

      this
        .emailProvider
        .configure(data)
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should perform a POST request to /api/v2/emails/provider', function (done) {
      var request = this.request;

      this
        .emailProvider
        .configure(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/emails/provider', data)
        .reply(200);

      this
        .emailProvider
        .configure(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/emails/provider')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .emailProvider
        .configure(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#update', function () {
    var data = {
      name: 'Test provider',
      credentials: {}
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .patch('/emails/provider')
        .reply(200, data);
    })


    it('should accept a callback', function (done) {
      this
        .emailProvider
        .update({}, data, function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .emailProvider
        .update({}, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/emails/provider/' + data.id)
        .reply(500);

      this
        .emailProvider
        .update({}, data)
        .catch(function (err) {
          expect(err)
            .to.exist
            .to.be.an.instanceOf(Error);

          done();
        });
    });


    it('should perform a PATCH request to /api/v2/emails/provider', function (done) {
      var request = this.request;

      this
        .emailProvider
        .update({}, data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/emails/provider', data)
        .reply(200);

      this
        .emailProvider
        .update({}, data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/emails/provider')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .emailProvider
        .update({}, data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#delete', function () {
    beforeEach(function () {
      this.request = nock(API_URL)
        .delete('/emails/provider')
        .reply(200);
    });


    it('should accept a callback', function (done) {
      this
        .emailProvider
        .delete({}, done.bind(null, null));
    });


    it('should return a promise when no callback is given', function (done) {
      this
        .emailProvider
        .delete()
        .then(done.bind(null, null));
    });


    it('should perform a DELETE request to /emails/provider', function (done) {
      var request = this.request;

      this
        .emailProvider
        .delete()
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/emails/provider')
        .reply(500);

      this
        .emailProvider
        .delete()
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/emails/provider')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .emailProvider
        .delete()
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });

});
