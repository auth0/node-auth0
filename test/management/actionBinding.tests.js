var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var ActionBindingsManager = require(SRC_DIR + '/management/ActionBindingsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('ActionBindingsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.actionTriggerBindings = new ActionBindingsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['get', 'getAll', 'create', 'update', 'delete'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.actionTriggerBindings[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(ActionBindingsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = ActionBindingsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = ActionBindingsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    const params = { trigger_id: 'post-login' };
    const actionTriggerBindingsURL = '/actions/triggers/' + params.trigger_id + '/bindings';

    beforeEach(function() {
      this.request = nock(API_URL)
        .get(actionTriggerBindingsURL)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.actionTriggerBindings.getAll(params, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionTriggerBindings
        .getAll(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get(actionTriggerBindingsURL)
        .reply(500);

      this.actionTriggerBindings.getAll(params).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get(actionTriggerBindingsURL)
        .reply(200, data);

      this.actionTriggerBindings.getAll(params).then(function(credentials) {
        expect(credentials).to.be.an.instanceOf(Array);

        expect(credentials.length).to.equal(data.length);

        expect(credentials[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request', function(done) {
      var request = this.request;

      this.actionTriggerBindings.getAll(params).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get(actionTriggerBindingsURL)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionTriggerBindings.getAll(params).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function(done) {
      nock.cleanAll();

      var params = {
        include_fields: true,
        fields: 'test'
      };
      var request = nock(API_URL)
        .get(actionTriggerBindingsURL)
        .query(params)
        .reply(200);

      this.actionTriggerBindings.getAll({ ...params, trigger_id: 'post-login' }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', function() {
    const params = { trigger_id: 'post-login', binding_id: 'binding-id-1' };
    const actionTriggerBindingsURL =
      '/actions/triggers/' + params.trigger_id + '/bindings/' + params.binding_id;

    beforeEach(function() {
      this.data = {
        id: params.binding_id,
        trigger_id: params.trigger_id,
        action: {
          id: '92312885-c121-4d79-a222-54f9a5b68611',
          name: 'my-action-16',
          supported_triggers: [
            {
              id: 'post-login',
              version: 'v1'
            }
          ],
          required_configuration: [],
          required_secrets: [],
          created_at: '2020-07-29T19:57:13.257251904Z',
          updated_at: '2020-07-29T19:57:13.257251904Z'
        },
        created_at: '2020-07-30T18:34:43.450717161Z',
        updated_at: '2020-07-30T18:34:43.450717161Z',
        display_name: 'display name 2'
      };

      this.request = nock(API_URL)
        .get(actionTriggerBindingsURL)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.actionTriggerBindings.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionTriggerBindings
        .get(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request', function(done) {
      var request = this.request;

      this.actionTriggerBindings.get(params).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get(actionTriggerBindingsURL)
        .reply(500);

      this.actionTriggerBindings.get(params).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get(actionTriggerBindingsURL)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionTriggerBindings.get(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    const params = { trigger_id: 'post-login' };
    const actionTriggerBindingsURL = '/actions/triggers/' + params.trigger_id + '/bindings';
    const data = {
      action_id: '92312885-c121-4d79-a222-54f9a5b68611',
      display_name: 'My new binding 2',
      secrets: [],
      configuration: [],
      metadata: {}
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post(actionTriggerBindingsURL)
        .reply(201);
    });

    it('should accept a callback', function(done) {
      this.actionTriggerBindings.create(params, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionTriggerBindings
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(actionTriggerBindingsURL)
        .reply(500);

      this.actionTriggerBindings.create(params, data).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request', function(done) {
      var request = this.request;

      this.actionTriggerBindings.create(params, data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(actionTriggerBindingsURL, data)
        .reply(200);

      this.actionTriggerBindings.create(params, data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(actionTriggerBindingsURL)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionTriggerBindings.create(params, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    const params = { trigger_id: 'post-login', binding_id: 'binding-id-1' };
    const actionTriggerBindingsURL =
      '/actions/triggers/' + params.trigger_id + '/bindings/' + params.binding_id;
    const data = { display_name: 'My new binding UPDATED' };

    beforeEach(function() {
      this.request = nock(API_URL)
        .patch(actionTriggerBindingsURL, data)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.actionTriggerBindings.update(params, data, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionTriggerBindings
        .update(params, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request', function(done) {
      var request = this.request;

      this.actionTriggerBindings.update(params, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch(actionTriggerBindingsURL, data)
        .reply(200);

      this.actionTriggerBindings.update(params, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch(actionTriggerBindingsURL)
        .reply(500);

      this.actionTriggerBindings.update(params, data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', function() {
    const params = { trigger_id: 'post-login', binding_id: 'binding-id-1' };
    const actionTriggerBindingsURL =
      '/actions/triggers/' + params.trigger_id + '/bindings/' + params.binding_id;

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete(actionTriggerBindingsURL)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.actionTriggerBindings.delete(params, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.actionTriggerBindings.delete(params).then(done.bind(null, null));
    });

    it('should perform a delete request', function(done) {
      var request = this.request;

      this.actionTriggerBindings.delete(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete(actionTriggerBindingsURL)
        .reply(500);

      this.actionTriggerBindings.delete(params).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete(actionTriggerBindingsURL)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionTriggerBindings.delete(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
