var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenants.auth0.com';

var UsersManager = require(SRC_DIR + '/management/UsersManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('UsersManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.users = new UsersManager({
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
      'deleteAll',
      'unlink',
      'link',
      'logs',
      'deleteMultifactorProvider',
      'updateUserMetadata',
      'updateAppMetadata',
      'getGuardianEnrollments'
    ];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.users[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(UsersManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var manager = UsersManager.bind(null, {});

      expect(manager).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var manager = UsersManager.bind(null, { baseUrl: '' });

      expect(manager).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/users')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.users.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.users
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/users')
        .reply(500);

      this.users.getAll().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/users')
        .reply(200, data);

      this.users.getAll().then(function(users) {
        expect(users).to.be.an.instanceOf(Array);

        expect(users.length).to.equal(data.length);

        expect(users[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/users', function(done) {
      var request = this.request;

      this.users.getAll().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/users')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.getAll().then(function() {
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
        .get('/users')
        .query(params)
        .reply(200);

      this.users.getAll(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getByEmail', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/users-by-email')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.users.getByEmail('someone@example.com', function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.users
        .getByEmail()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/users-by-email')
        .reply(500);

      this.users.getByEmail().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/users-by-email')
        .reply(200, data);

      this.users.getByEmail().then(function(users) {
        expect(users).to.be.an.instanceOf(Array);

        expect(users.length).to.equal(data.length);

        expect(users[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/users-by-email', function(done) {
      var request = this.request;

      this.users.getByEmail().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/users-by-email')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.getByEmail().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass an email in as a query string', function(done) {
      nock.cleanAll();

      var params = {
        email: 'email@example.com'
      };
      var request = nock(API_URL)
        .get('/users-by-email')
        .query(params)
        .reply(200);

      this.users.getByEmail(params.email).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.data = {
        id: 5,
        name: 'Test rule',
        enabled: true,
        script: "function (user, contest, callback) { console.log('Test'); }",
        stage: 'login_success'
      };

      this.request = nock(API_URL)
        .get('/users/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { id: this.data.id };

      this.users.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.users
        .get({ id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/users/5', function(done) {
      var request = this.request;

      this.users.get({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/users/' + this.data.id)
        .reply(500);

      this.users.get({ id: this.data.id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/users/' + this.data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.get({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    var data = {
      id: 5,
      name: 'Test rule',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      stage: 'login_success'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/users')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.users.create(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.users
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/users')
        .reply(500);

      this.users.create(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/users', function(done) {
      var request = this.request;

      this.users.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/users', data)
        .reply(200);

      this.users.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/users')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      this.data = { id: 5 };

      this.request = nock(API_URL)
        .patch('/users/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.users.update({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.users
        .update({ id: 5 }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/users/5', function(done) {
      var request = this.request;

      this.users.update({ id: 5 }, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/users/' + this.data.id, this.data)
        .reply(200);

      this.users.update({ id: 5 }, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/users/' + this.data.id)
        .reply(500);

      this.users.update({ id: this.data.id }, this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', function() {
    var id = 'USER_5';

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/users/' + id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.users.delete({ id: id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.users.delete({ id: id }).then(done.bind(null, null));
    });

    it('should perform a delete request to /users/' + id, function(done) {
      var request = this.request;

      this.users.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/users/' + id)
        .reply(500);

      this.users.delete({ id: id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/users/' + id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#link', function() {
    var userId = 'USER_ID';
    var data = {
      provider: 'twitter',
      user_id: '191919191919191'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/users/' + userId + '/identities')
        .reply(200);
    });

    it('should validate empty userId', function() {
      var _this = this;
      expect(function() {
        _this.users.link(null, data, function() {});
      }).to.throw('The userId cannot be null or undefined');
    });

    it('should validate non-string userId', function() {
      var _this = this;
      expect(function() {
        _this.users.link(123, data, function() {});
      }).to.throw('The userId has to be a string');
    });

    it('should accept a callback', function(done) {
      this.users.link(userId, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.users
        .link(userId, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/users/' + userId + '/identities')
        .reply(500);

      this.users.link(userId, data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/users', function(done) {
      var request = this.request;

      this.users.link(userId, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/users/' + userId + '/identities', data)
        .reply(200);

      this.users.link(userId, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/users/' + userId + '/identities')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.link(userId, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#unlink', function() {
    var data = {
      id: 'u1',
      user_id: 'u2',
      provider: 'auth0'
    };
    var url = '/users/' + data.id + '/identities/' + data.provider + '/' + data.user_id;

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete(url)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.users.unlink(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.users.unlink(data).then(done.bind(null, null));
    });

    it('should perform a DELETE request to ' + url, function(done) {
      var request = this.request;

      this.users.unlink(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete(url)
        .reply(500);

      this.users.unlink(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete(url)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.unlink(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#deleteMultifactorProvider', function() {
    var data = {
      id: 'u1',
      provider: 'auth0'
    };
    var url = '/users/' + data.id + '/multifactor/' + data.provider;

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete(url)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.users.deleteMultifactorProvider(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.users.deleteMultifactorProvider(data).then(done.bind(null, null));
    });

    it('should perform a DELETE request to ' + url, function(done) {
      var request = this.request;

      this.users.deleteMultifactorProvider(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete(url)
        .reply(500);

      this.users.deleteMultifactorProvider(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete(url)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.deleteMultifactorProvider(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateUserMetadata', function() {
    beforeEach(function() {
      this.data = {
        id: 5,
        foo: 'bar',
        test: 'data'
      };

      this.request = nock(API_URL)
        .patch('/users/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.users.updateUserMetadata({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.users
        .updateUserMetadata({ id: 5 }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/users/5', function(done) {
      var request = this.request;

      this.users.updateUserMetadata({ id: 5 }, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the metadata in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/users/' + this.data.id, {
          user_metadata: this.data
        })
        .reply(200);

      this.users
        .updateUserMetadata({ id: 5 }, this.data)
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/users/' + this.data.id)
        .reply(500);

      this.users.updateUserMetadata({ id: this.data.id }, this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#logs', function() {
    var data = {
      id: 'user_id'
    };
    var url = '/users/' + data.id + '/logs';

    beforeEach(function() {
      this.request = nock(API_URL)
        .get(url)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.users.logs(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.users.logs(data).then(done.bind(null, null));
    });

    it('should perform a GET request to ' + url, function(done) {
      var request = this.request;

      this.users.logs(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get(url)
        .reply(500);

      this.users.logs(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get(url)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.logs(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var response = [{ test: true }];
      var request = nock(API_URL)
        .get(url)
        .reply(200, response);

      this.users.logs(data).then(function(logs) {
        expect(logs).to.be.an.instanceOf(Array);

        expect(logs.length).to.equal(response.length);

        expect(logs[0].test).to.equal(response[0].test);

        done();
      });
    });

    it('should pass the parameters in the query-string', function(done) {
      nock.cleanAll();

      var params = {
        page: 0,
        per_page: 30
      };
      var request = nock(API_URL)
        .get(url)
        .query(params)
        .reply(200);

      data.page = params.page;
      data.per_page = params.per_page;

      this.users.logs(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getGuardianEnrollments', function() {
    var data = {
      id: 5
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/users/' + data.id + '/enrollments')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.users.getGuardianEnrollments(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.users.getGuardianEnrollments(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/users/5/enrollments', function(done) {
      var request = this.request;

      this.users.getGuardianEnrollments(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/users/' + data.id + '/enrollments')
        .reply(500);

      this.users.getGuardianEnrollments(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/users/' + data.id + '/enrollments')
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.users.getGuardianEnrollments(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
