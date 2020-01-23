var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var HookManager = require(SRC_DIR + '/management/HooksManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('HookManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.hooks = new HookManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = [
      'get',
      'getAll',
      'create',
      'update',
      'delete',
      'getSecrets',
      'addSecrets',
      'updateSecrets',
      'removeSecrets'
    ];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.hooks[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(HookManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = HookManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = HookManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/hooks')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.hooks.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.hooks
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/hooks')
        .reply(500);

      this.hooks.getAll().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/hooks')
        .reply(200, data);

      this.hooks.getAll().then(function(credentials) {
        expect(credentials).to.be.an.instanceOf(Array);

        expect(credentials.length).to.equal(data.length);

        expect(credentials[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/hooks', function(done) {
      var request = this.request;

      this.hooks.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/hooks')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.hooks.getAll().then(function() {
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
        .get('/hooks')
        .query(params)
        .reply(200);

      this.hooks.getAll(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.data = {
        id: 5,
        name: 'Test hook',
        enabled: true,
        script: "function (user, contest, callback) { console.log('Test'); }",
        stage: 'login_success'
      };

      this.request = nock(API_URL)
        .get('/hooks/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { id: this.data.id };

      this.hooks.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.hooks
        .get({ id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/hooks/5', function(done) {
      var request = this.request;

      this.hooks.get({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/hooks/' + this.data.id)
        .reply(500);

      this.hooks.get({ id: this.data.id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/hooks/' + this.data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.hooks.get({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    var data = {
      id: 5,
      name: 'Test hook',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      stage: 'login_success'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/hooks')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.hooks.create(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.hooks
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/hooks')
        .reply(500);

      this.hooks.create(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/hooks', function(done) {
      var request = this.request;

      this.hooks.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/hooks', data)
        .reply(200);

      this.hooks.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/hooks')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.hooks.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      this.data = { id: 5 };

      this.request = nock(API_URL)
        .patch('/hooks/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.hooks.update({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.hooks
        .update({ id: 5 }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/hooks/5', function(done) {
      var request = this.request;

      this.hooks.update({ id: 5 }, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/hooks/' + this.data.id, this.data)
        .reply(200);

      this.hooks.update({ id: 5 }, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/hooks/' + this.data.id)
        .reply(500);

      this.hooks.update({ id: this.data.id }, this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', function() {
    var id = 5;

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/hooks/' + id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.hooks.delete({ id: id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.hooks.delete({ id: id }).then(done.bind(null, null));
    });

    it('should perform a delete request to /hooks/' + id, function(done) {
      var request = this.request;

      this.hooks.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/hooks/' + id)
        .reply(500);

      this.hooks.delete({ id: id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/hooks/' + id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.hooks.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getSecrets', function() {
    var data = {
      id: 'hook_id'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/hooks/' + data.id + '/secrets')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.hooks.getSecrets(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.hooks.getSecrets(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/hooks/hook_id/secrets', function(done) {
      var request = this.request;

      this.hooks.getSecrets(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/hooks/' + data.id + '/secrets')
        .reply(500);

      this.hooks.getSecrets(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/hooks/' + data.id + '/secrets')
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.hooks.getSecrets(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addSecrets', function() {
    beforeEach(function() {
      this.data = {
        id: 'hook_id'
      };
      this.body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      this.request = nock(API_URL)
        .post('/hooks/' + this.data.id + '/secrets')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.hooks.addSecrets(this.data, {}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.hooks
        .addSecrets(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/hooks/' + this.data.id + '/secrets')
        .reply(500);

      this.hooks.addSecrets(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/hooks/hook_id/secrets', function(done) {
      var request = this.request;

      this.hooks.addSecrets(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/hooks/' + this.data.id + '/secrets', this.body)
        .reply(200);

      this.hooks.addSecrets(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/hooks/' + this.data.id + '/secrets')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.hooks.addSecrets(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateSecrets', function() {
    beforeEach(function() {
      this.data = {
        id: 'hook_id'
      };
      this.body = { DB_PASSWORD: 'abcd1234', APITOKEN: 'foosecret' };

      this.request = nock(API_URL)
        .patch('/hooks/' + this.data.id + '/secrets')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.hooks.updateSecrets(this.data, {}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.hooks
        .updateSecrets(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/hooks/' + this.data.id + '/secrets')
        .reply(500);

      this.hooks.updateSecrets(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/hooks/hook_id/secrets', function(done) {
      var request = this.request;

      this.hooks.updateSecrets(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/hooks/' + this.data.id + '/secrets', this.body)
        .reply(200);

      this.hooks.updateSecrets(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/hooks/' + this.data.id + '/secrets')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.hooks.updateSecrets(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeSecrets', function() {
    beforeEach(function() {
      this.data = {
        id: 'hook_id'
      };
      this.body = { DB_PASSWORD: 'abcd1234', APITOKEN: 'foosecret' };

      this.request = nock(API_URL)
        .delete('/hooks/' + this.data.id + '/secrets', {})
        .reply(200);
    });

    it('should validate empty hookId', function() {
      var _this = this;
      expect(function() {
        _this.hooks.removeSecrets({ id: null }, _this.body, function() {});
      }).to.throw('The id passed in params cannot be null or undefined');
    });

    it('should validate non-string hookId', function() {
      var _this = this;
      expect(function() {
        _this.hooks.removeSecrets({ id: 123 }, _this.body, function() {});
      }).to.throw('The hook Id has to be a string');
    });

    it('should accept a callback', function(done) {
      this.hooks.removeSecrets(this.data, {}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.hooks
        .removeSecrets(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/hooks/' + this.data.id + '/secrets')
        .reply(500);

      this.hooks.removeSecrets(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/hooks/hook_id/secrets', function(done) {
      var request = this.request;

      this.hooks.removeSecrets(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/hooks/' + this.data.id + '/secrets', this.body)
        .reply(200);

      this.hooks.removeSecrets(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/hooks/' + this.data.id + '/secrets')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.hooks.removeSecrets(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
