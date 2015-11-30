var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var DeviceCredentialsManager = require(SRC_DIR + '/management/DeviceCredentialsManager');
var ArgumentError = require(SRC_DIR + '/exceptions').ArgumentError;


describe('DeviceCredentialsManager', function () {
  before(function () {
    this.token = 'TOKEN';
    this.credentials = new DeviceCredentialsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });


  describe('instance', function () {
    var methods = ['createPublicKey', 'getAll', 'delete'];

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(this.credentials[method])
          .to.exist
          .to.be.an.instanceOf(Function);
      })
    });
  });


  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(DeviceCredentialsManager)
        .to.throw(ArgumentError, 'Must provide manager options');
    });


    it('should throw an error when no base URL is provided', function () {
      var client = DeviceCredentialsManager.bind(null, {});

      expect(client)
        .to.throw(ArgumentError, 'Must provide a base URL for the API');
    });


    it('should throw an error when the base URL is invalid', function () {
      var client = DeviceCredentialsManager.bind(null, { baseUrl: '' });

      expect(client)
        .to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });


  describe('#getAll', function () {
    beforeEach(function () {
      this.request = nock(API_URL)
        .get('/device-credentials')
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .credentials
        .getAll(function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .credentials
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/device-credentials')
        .reply(500);

      this
        .credentials
        .getAll()
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });


    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/device-credentials')
        .reply(200, data);

      this
        .credentials
        .getAll()
        .then(function (credentials) {
          expect(credentials)
            .to.be.an.instanceOf(Array);

          expect(credentials.length)
            .to.equal(data.length);

          expect(credentials[0].test)
            .to.equal(data[0].test);

          done();
        });
    });


    it('should perform a GET request to /api/v2/device-credentials', function (done) {
      var request = this.request;

      this
        .credentials
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/device-credentials')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .credentials
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });


    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      var params = {
        includeFields: true,
        fields: 'test'
      };
      var request = nock(API_URL)
        .get('/device-credentials')
        .query(params)
        .reply(200)

      this
        .credentials
        .getAll(params)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#createPublicKey', function () {
    var data = {
      'device_name': 'Sample device',
      type: 'public_key',
      'user_id': 'github|1234'
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .post('/device-credentials')
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .credentials
        .createPublicKey(data, function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .credentials
        .createPublicKey(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/device-credentials')
        .reply(500);

      this
        .credentials
        .createPublicKey(data)
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should perform a POST request to /api/v2/device-credentials', function (done) {
      var request = this.request;

      this
        .credentials
        .createPublicKey(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/device-credentials', data)
        .reply(200);

      this
        .credentials
        .createPublicKey(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/device-credentials')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .credentials
        .createPublicKey(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#delete', function () {
    var id = 5;

    beforeEach(function () {
      this.request = nock(API_URL)
        .delete('/device-credentials/' + id)
        .reply(200);
    });


    it('should accept a callback', function (done) {
      this
        .credentials
        .delete({ id: id }, done.bind(null, null));
    });


    it('should return a promise when no callback is given', function (done) {
      this
        .credentials
        .delete({ id: id })
        .then(done.bind(null, null));
    });


    it('should perform a delete request to /device-credentials/' + id, function (done) {
      var request = this.request;

      this
        .credentials
        .delete({ id: id })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/device-credentials/' + id)
        .reply(500);

      this
        .credentials
        .delete({ id: id })
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/device-credentials/' + id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .credentials
        .delete({ id: id })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });

});
