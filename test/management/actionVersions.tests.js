var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var ActionVersionsManager = require(SRC_DIR + '/management/ActionVersionsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('ActionVersionsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.actionVersions = new ActionVersionsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['get', 'getAll', 'create', 'delete', 'upsertDraft', 'deploy', 'test'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.actionVersions[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(ActionVersionsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = ActionVersionsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = ActionVersionsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    const action_id = 'action-id-1';

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/actions/actions/' + action_id + '/versions')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.actionVersions.getAll({ action_id }, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionVersions
        .getAll({ action_id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/actions/' + action_id + '/versions')
        .reply(500);

      this.actionVersions.getAll({ action_id }).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/actions/actions/' + action_id + '/versions')
        .reply(200, data);

      this.actionVersions.getAll({ action_id }).then(function(versions) {
        expect(versions).to.be.an.instanceOf(Array);

        expect(versions.length).to.equal(data.length);

        expect(versions[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to actions/actions/action_id/versions', function(done) {
      var request = this.request;

      this.actionVersions.getAll({ action_id }).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/actions/' + action_id + '/versions')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionVersions.getAll({ action_id }).then(function() {
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
        .get('/actions/actions/' + action_id + '/versions')
        .query(params)
        .reply(200);

      this.actionVersions.getAll({ ...params, action_id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.data = {
        id: 'version-id-1',
        action: {
          id: 'action-id-1',
          name: 'my-action-14',
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
        },
        code:
          "module.exports = function(user, context, cb) { console.log(require('lodash/package.json').version); cb(null, user, context); }",
        dependencies: [
          {
            name: 'lodash',
            version: '4.17.19'
          }
        ],
        runtime: 'node12',
        status: 'built',
        created_at: '2020-07-31T16:30:15.890110176Z',
        updated_at: '2020-07-31T16:30:16.941142964Z',
        built_at: '2020-07-31T16:30:16.941087047Z'
      };

      this.request = nock(API_URL)
        .get('/actions/actions/' + this.data.action.id + '/versions/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { action_id: this.data.action.id, version_id: this.data.id };

      this.actionVersions.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionVersions
        .get({ action_id: this.data.action.id, version_id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request', function(done) {
      var request = this.request;

      this.actionVersions
        .get({ action_id: this.data.action.id, version_id: this.data.id })
        .then(function() {
          expect(request.isDone()).to.be.true;
          done();
        });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/actions/' + this.data.action.id + '/versions/' + this.data.id)
        .reply(500);

      this.actionVersions
        .get({ action_id: this.data.action.id, version_id: this.data.id })
        .catch(function(err) {
          expect(err).to.exist;

          done();
        });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/actions/actions/' + this.data.action.id + '/versions/' + this.data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionVersions
        .get({ action_id: this.data.action.id, version_id: this.data.id })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
    });
  });

  describe('#create', function() {
    const params = { action_id: 'action-id-1' };
    const data = {
      runtime: 'node12',
      code:
        "module.exports = function(user, context, cb) { console.log(require('lodash/package.json').version); cb(null, user, context); }",
      dependencies: [{ name: 'lodash', version: '4.17.19' }]
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/actions/actions/' + params.action_id + '/versions')
        .reply(201);
    });

    it('should accept a callback', function(done) {
      this.actionVersions.create(params, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionVersions
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/actions/actions/' + params.action_id + '/versions/')
        .reply(500);

      this.actionVersions.create(params, data).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request', function(done) {
      var request = this.request;

      this.actionVersions.create(params, data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/actions/actions/' + params.action_id + '/versions', data)
        .reply(200);

      this.actionVersions.create(params, data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/actions/actions/' + params.action_id + '/versions')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionVersions.create(params, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#test', function() {
    const params = { action_id: 'action-id-1', version_id: 'version-id-1' };
    const data = {
      payload: {
        user_info: 'userInfo'
      }
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post(
          '/actions/actions/' + params.action_id + '/versions/' + params.version_id + '/test',
          data
        )
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.actionVersions.test(params, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionVersions
        .test(params, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(
          '/actions/actions/' + params.action_id + '/versions/' + params.version_id + '/test',
          data
        )
        .reply(500);

      this.actionVersions.test(params, data).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request', function(done) {
      var request = this.request;

      this.actionVersions.test(params, data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(
          '/actions/actions/' + params.action_id + '/versions/' + params.version_id + '/test',
          data
        )
        .reply(200);

      this.actionVersions.test(params, data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(
          '/actions/actions/' + params.action_id + '/versions/' + params.version_id + '/test',
          data
        )
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionVersions.test(params, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#upsertDraft', function() {
    const params = { action_id: 'action-id-1', version_id: 'draft' };
    const data = {
      runtime: 'node12',
      code:
        "module.exports = function(user, context, cb) { console.log(require('lodash/package.json').version); cb(null, user, context); }",
      dependencies: [{ name: 'lodash', version: '4.17.19' }]
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .patch('/actions/actions/' + params.action_id + '/versions/draft')
        .reply(202);
    });

    it('should accept a callback', function(done) {
      this.actionVersions.upsertDraft(params, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionVersions
        .upsertDraft(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/actions/actions/' + params.action_id + '/versions/draft')
        .reply(500);

      this.actionVersions.upsertDraft(params, data).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a PATCH request', function(done) {
      var request = this.request;

      this.actionVersions.upsertDraft(params, data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/actions/actions/' + params.action_id + '/versions/draft', data)
        .reply(202);

      this.actionVersions.upsertDraft(params, data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/actions/actions/' + params.action_id + '/versions/draft')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(202);

      this.actionVersions.upsertDraft(params, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#deploy', function() {
    const params = { action_id: 'action-id-1', version_id: 'version-id-1' };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/actions/actions/' + params.action_id + '/versions/' + params.version_id + '/deploy')
        .reply(202);
    });

    it('should accept a callback', function(done) {
      this.actionVersions.deploy(params, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.actionVersions
        .deploy(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/actions/actions/' + params.action_id + '/versions/' + params.version_id + '/deploy')
        .reply(500);

      this.actionVersions.deploy(params).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request', function(done) {
      var request = this.request;

      this.actionVersions.deploy(params).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/actions/actions/' + params.action_id + '/versions/' + params.version_id + '/deploy')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionVersions.deploy(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', function() {
    const params = { action_id: 'action-id-1', version_id: 'version-id-1' };

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/actions/actions/' + params.action_id + '/versions/' + params.version_id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.actionVersions.delete(params, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.actionVersions.delete(params).then(done.bind(null, null));
    });

    it('should perform a delete request', function(done) {
      var request = this.request;

      this.actionVersions.delete(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/actions/actions/' + params.action_id + '/versions/' + params.version_id)
        .reply(500);

      this.actionVersions.delete(params).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/actions/actions/' + params.action_id + '/versions/' + params.version_id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.actionVersions.delete(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
