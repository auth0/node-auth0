var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var ActionsManager = require(SRC_DIR + '/management/ActionsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('ActionsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.actions = new ActionsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['get', 'getAll', 'create', 'update', 'delete'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.actions[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(ActionsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = ActionsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = ActionsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/actions/actions')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.actions.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.actions
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/actions')
        .reply(500);

      this.actions.getAll().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/actions/actions')
        .reply(200, data);

      this.actions.getAll().then(function(credentials) {
        expect(credentials).to.be.an.instanceOf(Array);

        expect(credentials.length).to.equal(data.length);

        expect(credentials[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request', function(done) {
      var request = this.request;

      this.actions.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/actions')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actions.getAll().then(function() {
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
        .get('/actions/actions')
        .query(params)
        .reply(200);

      this.actions.getAll(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.data = {
        id: '0d565aa1-d8ce-4802-83e7-82e3d2040222',
        name: 'Test Action',
        supported_triggers: [
          {
            id: 'post-login',
            version: 'v1'
          }
        ],
        required_configuration: [],
        required_secrets: [],
        created_at: '2020-07-29T19:45:15.725999098Z',
        updated_at: '2020-07-29T19:45:15.725999098Z'
      };

      this.request = nock(API_URL)
        .get('/actions/actions/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { action_id: this.data.id };

      this.actions.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.actions
        .get({ action_id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request', function(done) {
      var request = this.request;

      this.actions.get({ action_id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/actions' + this.data.id)
        .reply(500);

      this.actions.get({ action_id: this.data.id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/actions/' + this.data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actions.get({ action_id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    var data = {
      name: 'my-action-13',
      supported_triggers: [
        {
          id: 'post-login',
          version: 'v1'
        }
      ]
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/actions/actions')
        .reply(201);
    });

    it('should accept a callback', function(done) {
      this.actions.create(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.actions
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/actions/actions/')
        .reply(500);

      this.actions.create(data).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request', function(done) {
      var request = this.request;

      this.actions.create(data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/actions/actions', data)
        .reply(200);

      this.actions.create(data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/actions/actions')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actions.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      this.data = { action_id: 'ACTION_ID' };

      this.request = nock(API_URL)
        .patch('/actions/actions/' + this.data.action_id, { name: 'my-new-action-name' })
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.actions.update(
        { action_id: 'ACTION_ID' },
        { name: 'my-new-action-name' },
        done.bind(null, null)
      );
    });

    it('should return a promise if no callback is given', function(done) {
      this.actions
        .update({ action_id: 'ACTION_ID' }, { name: 'my-new-action-name' })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request', function(done) {
      var request = this.request;

      this.actions
        .update({ action_id: 'ACTION_ID' }, { name: 'my-new-action-name' })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/actions/actions/' + this.data.action_id, { name: 'my-new-action-name' })
        .reply(200);

      this.actions
        .update({ action_id: 'ACTION_ID' }, { name: 'my-new-action-name' })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/actions/actions/' + this.data.id)
        .reply(500);

      this.actions
        .update({ action_id: this.data.id }, { name: 'my-new-action-name' })
        .catch(function(err) {
          expect(err).to.exist;

          done();
        });
    });
  });

  describe('#delete', function() {
    var action_id = 'action-id-1';

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/actions/actions/' + action_id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.actions.delete({ action_id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.actions.delete({ action_id }).then(done.bind(null, null));
    });

    it('should perform a delete request' + action_id, function(done) {
      var request = this.request;

      this.actions.delete({ action_id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/actions/actions/' + action_id)
        .reply(500);

      this.actions.delete({ action_id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/actions/actions/' + action_id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actions.delete({ action_id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
