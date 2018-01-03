var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var RulesConfigsManager = require(SRC_DIR + '/management/RulesConfigsManager');
var ArgumentError = require('rest-facade').ArgumentError;


describe('RulesConfigsManager', function () {
  before(function () {
    this.token = 'TOKEN';
    this.rulesConfigs = new RulesConfigsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function () {
    var methods = ['set', 'getAll', 'delete'];

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(this.rulesConfigs[method])
          .to.exist
          .to.be.an.instanceOf(Function);
      })
    });
  });

  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(RulesConfigsManager)
        .to.throw(ArgumentError, 'Must provide manager options');
    });


    it('should throw an error when no base URL is provided', function () {
      var client = RulesConfigsManager.bind(null, {});

      expect(client)
        .to.throw(ArgumentError, 'Must provide a base URL for the API');
    });


    it('should throw an error when the base URL is invalid', function () {
      var client = RulesConfigsManager.bind(null, { baseUrl: '' });

      expect(client)
        .to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function () {

    it('should accept a callback', function (done) {
      this
        .rulesConfigs
        .getAll(function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .rulesConfigs
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/rules-configs')
        .reply(500);

      this
        .rulesConfigs
        .getAll()
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });


    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      var data = [{ key: 'dbconnectionstring' }];
      var request = nock(API_URL)
        .get('/rules-configs')
        .reply(200, data);

      this
        .rulesConfigs
        .getAll()
        .then(function (rulesConfigs) {
          expect(rulesConfigs)
            .to.be.an.instanceOf(Array);

          expect(rulesConfigs.length)
            .to.equal(data.length);

          expect(rulesConfigs[0].key)
            .to.equal(data[0].key);

          done();
        });
    });


    it('should perform a GET request to rules-configs', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/rules-configs')
        .reply(200);

      this
        .rulesConfigs
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/rules-configs')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .rulesConfigs
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
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
        .get('/rules-configs')
        .query(params)
        .reply(200)

      this
        .rulesConfigs
        .getAll(params)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });

  describe('#set', function () {

    beforeEach(function () {
      this.data = { value: 'foobar' };
      this.params = { key: 'KEY' };
    });

    it('should accept a callback', function (done) {
      this
        .rulesConfigs
        .set(this.params, this.data, function () {
          done();
        });
    });

    it('should return a promise if no callback is given', function (done) {
      this
        .rulesConfigs
        .set(this.params, this.data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/rules-configs/' + this.params.key)
        .reply(500);

      this
        .rulesConfigs
        .set(this.params, this.data)
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });

    it('should perform a PUT request to /rules-configs/{KEY}', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/rules-configs/' + this.params.key, this.data)
        .reply(200);

      this
        .rulesConfigs
        .set(this.params, this.data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(function (err) {
          console.error(err);
          expect.fail();
          done();
        });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/rules-configs/' + this.params.key, this.data)
        .reply(200);

      this
        .rulesConfigs
        .set(this.params, this.data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/rules-configs/' + this.params.key, this.data)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .rulesConfigs
        .set(this.params, this.data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });

  describe('#delete', function () {
    var key = 'KEY';

    beforeEach(function () {
      this.request = nock(API_URL)
        .delete('/rules-configs/' + key)
        .reply(200);
    });


    it('should accept a callback', function (done) {
      this
        .rulesConfigs
        .delete({ key: key }, done.bind(null, null));
    });


    it('should return a promise when no callback is given', function (done) {
      this
        .rulesConfigs
        .delete({ key: key })
        .then(done.bind(null, null));
    });


    it('should perform a delete request to /rules-configs/' + key, function (done) {
      var request = this.request;
 
      this
        .rulesConfigs
        .delete({ key: key })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/rules-configs/' + key)
        .reply(500);

      this
        .rulesConfigs
        .delete({ key: key })
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/rules-configs/' + key)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .rulesConfigs
        .delete({ key: key })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });
});