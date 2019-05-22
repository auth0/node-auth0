var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var RolesManager = require(SRC_DIR + '/management/RolesManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('RolesManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.roles = new RolesManager({
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
      'getPermissions',
      'addPermissions',
      'removePermissions',
      'getUsers',
      'assignUsers'
    ];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.roles[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(RolesManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = RolesManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = RolesManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/roles')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.roles.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.roles
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/roles')
        .reply(500);

      this.roles.getAll().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/roles')
        .reply(200, data);

      this.roles.getAll().then(function(credentials) {
        expect(credentials).to.be.an.instanceOf(Array);

        expect(credentials.length).to.equal(data.length);

        expect(credentials[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/roles', function(done) {
      var request = this.request;

      this.roles.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/roles')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.roles.getAll().then(function() {
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
        .get('/roles')
        .query(params)
        .reply(200);

      this.roles.getAll(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.data = {
        id: 'rol_ID',
        name: 'My role',
        description: 'This is my role'
      };

      this.request = nock(API_URL)
        .get('/roles/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { id: this.data.id };

      this.roles.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.roles
        .get({ id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/roles/rol_ID', function(done) {
      var request = this.request;

      this.roles.get({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/roles/' + this.data.id)
        .reply(500);

      this.roles.get({ id: this.data.id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/roles/' + this.data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.roles.get({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    var data = {
      id: 'rol_ID',
      name: 'My role',
      description: 'This is my role'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/roles')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.roles.create(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.roles
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles')
        .reply(500);

      this.roles.create(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles', function(done) {
      var request = this.request;

      this.roles.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles', data)
        .reply(200);

      this.roles.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.roles.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      this.data = { id: 'rol_ID' };

      this.request = nock(API_URL)
        .patch('/roles/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.roles.update({ id: 'rol_ID' }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.roles
        .update({ id: 'rol_ID' }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/roles/rol_ID', function(done) {
      var request = this.request;

      this.roles.update({ id: 'rol_ID' }, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/roles/' + this.data.id, this.data)
        .reply(200);

      this.roles.update({ id: 'rol_ID' }, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/roles/' + this.data.id)
        .reply(500);

      this.roles.update({ id: this.data.id }, this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', function() {
    var id = 'rol_ID';

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/roles/' + id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.roles.delete({ id: id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.roles.delete({ id: id }).then(done.bind(null, null));
    });

    it('should perform a delete request to /roles/' + id, function(done) {
      var request = this.request;

      this.roles.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/roles/' + id)
        .reply(500);

      this.roles.delete({ id: id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/roles/' + id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.roles.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getPermissions', function() {
    var data = {
      id: 'role_id'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/roles/' + data.id + '/permissions')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.roles.getPermissions(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.roles.getPermissions(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/roles/rol_ID/permissions', function(done) {
      var request = this.request;

      this.roles.getPermissions(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/roles/' + data.id + '/permissions')
        .reply(500);

      this.roles.getPermissions(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/roles/' + data.id + '/permissions')
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.roles.getPermissions(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addPermissions', function() {
    beforeEach(function() {
      this.data = {
        id: 'rol_ID'
      };
      this.body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      this.request = nock(API_URL)
        .post('/roles/' + this.data.id + '/permissions')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.roles.addPermissions(this.data, {}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.roles
        .addPermissions(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles/' + this.data.id + '/permissions')
        .reply(500);

      this.roles.addPermissions(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles/rol_ID/permissions', function(done) {
      var request = this.request;

      this.roles.addPermissions(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles/' + this.data.id + '/permissions', this.body)
        .reply(200);

      this.roles.addPermissions(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles/' + this.data.id + '/permissions')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.roles.addPermissions(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removePermissions', function() {
    beforeEach(function() {
      this.data = {
        id: 'rol_ID'
      };
      this.body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      this.request = nock(API_URL)
        .delete('/roles/' + this.data.id + '/permissions', {})
        .reply(200);
    });

    it('should validate empty roleId', function() {
      var _this = this;
      expect(function() {
        _this.roles.removePermissions({ id: null }, _this.body, function() {});
      }).to.throw('The roleId passed in params cannot be null or undefined');
    });

    it('should validate non-string roleId', function() {
      var _this = this;
      expect(function() {
        _this.roles.removePermissions({ id: 123 }, _this.body, function() {});
      }).to.throw('The role Id has to be a string');
    });

    it('should accept a callback', function(done) {
      this.roles.removePermissions(this.data, {}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.roles
        .removePermissions(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles/' + this.data.id + '/permissions')
        .reply(500);

      this.roles.removePermissions(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/roles/rol_ID/permissions', function(done) {
      var request = this.request;

      this.roles.removePermissions(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/roles/' + this.data.id + '/permissions', this.body)
        .reply(200);

      this.roles.removePermissions(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/roles/' + this.data.id + '/permissions')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.roles.removePermissions(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getUsers', function() {
    var data = {
      id: 'role_id'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/roles/' + data.id + '/users')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.roles.getUsers(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.roles.getUsers(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/roles/rol_Id/users', function(done) {
      var request = this.request;

      this.roles.getUsers(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/roles/' + data.id + '/users')
        .reply(500);

      this.roles.getUsers(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/roles/' + data.id + '/users')
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.roles.getUsers(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#assignUsers', function() {
    beforeEach(function() {
      this.data = {
        id: 'rol_ID'
      };
      this.body = { users: ['userID1'] };

      this.request = nock(API_URL)
        .post('/roles/' + this.data.id + '/users')
        .reply(200);
    });

    it('should validate empty roleId', function() {
      var _this = this;
      expect(function() {
        _this.roles.assignUsers({ id: null }, _this.body, function() {});
      }).to.throw('The roleId passed in params cannot be null or undefined');
    });

    it('should validate non-string roleId', function() {
      var _this = this;
      expect(function() {
        _this.roles.assignUsers({ id: 123 }, _this.body, function() {});
      }).to.throw('The role Id has to be a string');
    });

    it('should accept a callback', function(done) {
      this.roles.assignUsers(this.data, {}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.roles
        .assignUsers(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles/' + this.data.id + '/users')
        .reply(500);

      this.roles.assignUsers(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles/rol_ID/users', function(done) {
      var request = this.request;

      this.roles.assignUsers(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles/' + this.data.id + '/users', this.body)
        .reply(200);

      this.roles.assignUsers(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/roles/' + this.data.id + '/users')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.roles.assignUsers(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
