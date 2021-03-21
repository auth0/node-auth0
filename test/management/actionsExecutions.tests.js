var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var ActionExecutionsManager = require(SRC_DIR + '/management/ActionExecutionsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('ActionExecutionsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.actionExecutions = new ActionExecutionsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['get'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.actionExecutions[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(ActionExecutionsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = ActionExecutionsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = ActionExecutionsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.data = {
        id: '0d565aa1-d8ce-4802-83e7',
        name: 'Execution'
      };

      this.request = nock(API_URL)
        .get('/actions/executions/' + this.data.id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      var params = { execution_id: this.data.id };

      this.actionExecutions.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionExecutions
        .get({ execution_id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request', function(done) {
      var request = this.request;

      this.actionExecutions
        .get({ execution_id: this.data.id })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/executions/' + this.data.id)
        .reply(500);

      this.actionExecutions.get({ execution_id: this.data.id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/executions/' + this.data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionExecutions.get({ execution_id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
