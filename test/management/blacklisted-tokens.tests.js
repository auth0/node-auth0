var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var BlacklistedTokensManager = require(SRC_DIR + '/management/BlacklistedTokensManager');
var ArgumentError = require(SRC_DIR + '/exceptions').ArgumentError;


describe('BlacklistedTokensManager', function () {
  before(function () {
    this.token = 'TOKEN';
    this.blacklistedTokens = new BlacklistedTokensManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });


  describe('instance', function () {
    var methods = ['add', 'getAll'];

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(this.blacklistedTokens[method])
          .to.exist
          .to.be.an.instanceOf(Function);
      })
    });
  });


  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(BlacklistedTokensManager)
        .to.throw(ArgumentError, 'Must provide client options');
    });


    it('should throw an error when no base URL is provided', function () {
      var client = BlacklistedTokensManager.bind(null, {});

      expect(client)
        .to.throw(ArgumentError, 'Must provide a base URL for the API');
    });


    it('should throw an error when the base URL is invalid', function () {
      var client = BlacklistedTokensManager.bind(null, { baseUrl: '' });

      expect(client)
        .to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });


  describe('#getAll', function () {
    beforeEach(function () {
      this.request = nock(API_URL)
        .get('/blacklists/tokens')
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .blacklistedTokens
        .getAll(function () {
        done();
      });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .blacklistedTokens
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/blacklists/tokens')
        .reply(500);

      this
        .blacklistedTokens
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
        .get('/blacklists/tokens')
        .reply(200, data);

      this
        .blacklistedTokens
        .getAll()
        .then(function (blacklistedTokens) {
          expect(blacklistedTokens)
            .to.be.an.instanceOf(Array);

          expect(blacklistedTokens.length)
            .to.equal(data.length);

          expect(blacklistedTokens[0].test)
            .to.equal(data[0].test);

          done();
        });
    });


    it('should perform a GET request to /api/v2/blacklists/tokens', function (done) {
      var request = this.request;

      this
        .blacklistedTokens
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/blacklists/tokens')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .blacklistedTokens
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });


    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/blacklists/tokens')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200)

      this
        .blacklistedTokens
        .getAll({ include_fields: true, fields: 'test' })
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
  });


  describe('#add', function () {
    var tokenData = {
      aud: '',
      jti: ''
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .post('/blacklists/tokens')
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .blacklistedTokens
        .add(tokenData, function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .blacklistedTokens
        .add(tokenData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/blacklists/tokens')
        .reply(500);

      this
        .blacklistedTokens
        .add(tokenData)
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });


    it('should perform a POST request to /api/v2/blacklists/tokens', function (done) {
      var request = this.request;

      this
        .blacklistedTokens
        .add(tokenData)
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });


    it('should pass the token data in the body of the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/blacklists/tokens', tokenData)
        .reply(200);

      this
        .blacklistedTokens
        .add(tokenData)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/blacklists/tokens')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .blacklistedTokens
        .add(tokenData)
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
  });

});
