var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var OrganizationsManager = require(SRC_DIR + '/management/OrganizationsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('OrganizationsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.organizations = new OrganizationsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = [
      'getByID',
      'getByName',
      'getAll',
      'create',
      'update',
      'delete',
      'getEnabledConnections',
      'getEnabledConnection',
      'addEnabledConnection',
      'updateEnabledConnection',
      'removeEnabledConnection',
      'getMembers',
      'addMembers',
      'removeMembers',
      'getMemberRoles',
      'addMemberRoles',
      'removeMemberRoles',
      'getInvitations',
      'getInvitation',
      'createInvitation',
      'deleteInvitation'
    ];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.organizations[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(OrganizationsManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = OrganizationsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = OrganizationsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/organizations')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations')
        .reply(500);

      this.organizations.getAll().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/organizations')
        .reply(200, data);

      this.organizations.getAll().then(function(credentials) {
        expect(credentials).to.be.an.instanceOf(Array);

        expect(credentials.length).to.equal(data.length);

        expect(credentials[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/organizations', function(done) {
      var request = this.request;

      this.organizations.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.getAll().then(function() {
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
        .get('/organizations')
        .query(params)
        .reply(200);

      this.organizations.getAll(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getByID', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123456',
        name: 'organizations',
        display_name: 'My organization'
      };

      this.request = nock(API_URL)
        .get('/organizations/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { id: this.data.id };

      this.organizations.getByID(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .getByID({ id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/:id', function(done) {
      var request = this.request;

      this.organizations.getByID({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + this.data.id)
        .reply(500);

      this.organizations.getByID({ id: this.data.id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + this.data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.getByID({ id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getByName', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123456',
        name: 'organizations',
        display_name: 'My organization'
      };

      this.request = nock(API_URL)
        .get('/organizations/name/' + this.data.name)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { name: this.data.name };

      this.organizations.getByName(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .getByName({ name: this.data.name })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/name/:name', function(done) {
      var request = this.request;

      this.organizations.getByName({ name: this.data.name }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + this.data.name)
        .reply(500);

      this.organizations.getByName({ name: this.data.name }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/name/' + this.data.name)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.getByName({ name: this.data.name }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    var data = {
      id: 'org_123',
      name: 'org_name',
      display_name: 'My Organization'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/organizations')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.create(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations')
        .reply(500);

      this.organizations.create(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations', function(done) {
      var request = this.request;

      this.organizations.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations', data)
        .reply(200);

      this.organizations.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      this.data = { id: 'org_123' };

      this.request = nock(API_URL)
        .patch('/organizations/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.organizations.update({ id: 'org_123' }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .update({ id: 'org_123' }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/organizations/org_123', function(done) {
      var request = this.request;

      this.organizations.update({ id: 'org_123' }, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/organizations/' + this.data.id, this.data)
        .reply(200);

      this.organizations.update({ id: 'org_123' }, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/organizations/' + this.data.id)
        .reply(500);

      this.organizations.update({ id: this.data.id }, this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', function() {
    var id = 'rol_ID';

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/organizations/' + id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.delete({ id: id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.organizations.delete({ id: id }).then(done.bind(null, null));
    });

    it('should perform a delete request to /organizations/' + id, function(done) {
      var request = this.request;

      this.organizations.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/organizations/' + id)
        .reply(500);

      this.organizations.delete({ id: id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/organizations/' + id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  //// Connections
  describe('#getEnabledConnections', function() {
    var data = {
      id: 'org_id'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/organizations/' + data.id + '/enabled_connections')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.getEnabledConnections(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.organizations.getEnabledConnections(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_id/enabled_connections', function(done) {
      var request = this.request;

      this.organizations.getEnabledConnections(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/enabled_connections')
        .reply(500);

      this.organizations.getEnabledConnections(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/enabled_connections')
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.getEnabledConnections(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getEnabledConnection', function() {
    var data = {
      id: 'org_id',
      connection_id: 'conn_id'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/organizations/' + data.id + '/enabled_connections/' + data.connection_id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.getEnabledConnection(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.organizations.getEnabledConnection(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/rol_ID/enabled_connections/con_id', function(done) {
      var request = this.request;

      this.organizations.getEnabledConnection(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/enabled_connections/' + data.connection_id)
        .reply(500);

      this.organizations.getEnabledConnection(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/enabled_connections/' + data.connection_id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.getEnabledConnection(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addEnabledConnection', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123'
      };
      this.body = { connection_id: '123', assign_membership_on_login: false };

      this.request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/enabled_connections')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.addEnabledConnection(this.data, {}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .addEnabledConnection(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/enabled_connections')
        .reply(500);

      this.organizations.addEnabledConnection(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/enabled_connections', function(done) {
      var request = this.request;

      this.organizations.addEnabledConnection(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.addEnabledConnection({ id: null }, {}, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not a string', function() {
      var _this = this;
      expect(function() {
        _this.organizations.addEnabledConnection({ id: 123 }, {}, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/enabled_connections', this.body)
        .reply(200);

      this.organizations.addEnabledConnection(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/enabled_connections')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.addEnabledConnection(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateEnabledConnection', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123',
        connection_id: '123'
      };
      this.body = { assign_membership_on_login: false };

      this.request = nock(API_URL)
        .patch('/organizations/' + this.data.id + '/enabled_connections/' + this.data.connection_id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.updateEnabledConnection(this.data, this.body, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .updateEnabledConnection(this.data, this.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/organizations/' + this.data.id + '/enabled_connections/' + this.data.connection_id)
        .reply(500);

      this.organizations.updateEnabledConnection(this.data, this.body).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/organizations/org_id/enabled_connections/conn_id', function(done) {
      var request = this.request;

      this.organizations.updateEnabledConnection(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.updateEnabledConnection({ id: null }, {}, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not a string', function() {
      var _this = this;
      expect(function() {
        _this.organizations.updateEnabledConnection({ id: 123 }, {}, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return error when connection_id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.updateEnabledConnection(
          { id: 'org_123', connection_id: null },
          {},
          function() {}
        );
      }).to.throw('The connection ID passed in params cannot be null or undefined');
    });

    it('should return error when connection_id is not a string', function() {
      var _this = this;
      expect(function() {
        _this.organizations.updateEnabledConnection(
          { id: 'org_123', connection_id: 123 },
          {},
          function() {}
        );
      }).to.throw('The connection ID has to be a string');
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch(
          '/organizations/' + this.data.id + '/enabled_connections/' + this.data.connection_id,
          this.body
        )
        .reply(200);

      this.organizations.updateEnabledConnection(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/organizations/' + this.data.id + '/enabled_connections/' + this.data.connection_id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.updateEnabledConnection(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeEnabledConnection', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123',
        connection_id: '123'
      };

      this.request = nock(API_URL)
        .delete(
          '/organizations/' + this.data.id + '/enabled_connections/' + this.data.connection_id,
          {}
        )
        .reply(200);
    });

    it('should validate empty organizationId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeEnabledConnection({ id: null }, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should validate empty connectionId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeEnabledConnection({ id: _this.data.id }, function() {});
      }).to.throw('The connection ID passed in params cannot be null or undefined');
    });

    it('should validate non-string organizationId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeEnabledConnection({ id: 123 }, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should validate non-string connectionId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeEnabledConnection(
          { id: _this.data.id, connection_id: 123 },
          function() {}
        );
      }).to.throw('The connection ID has to be a string');
    });

    it('should accept a callback', function(done) {
      this.organizations.removeEnabledConnection(this.data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .removeEnabledConnection(this.data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete(
          '/organizations/' + this.data.id + '/enabled_connections/' + this.data.connection_id
        )
        .reply(500);

      this.organizations.removeEnabledConnection(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/enabled_connections/connection_id', function(done) {
      var request = this.request;

      this.organizations.removeEnabledConnection(this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete(
          '/organizations/' + this.data.id + '/enabled_connections/' + this.data.connection_id
        )
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.removeEnabledConnection(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  //// Members
  describe('#getMembers', function() {
    var data = {
      id: 'org_id'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/organizations/' + data.id + '/members')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.getMembers(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.organizations.getMembers(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_ID/members', function(done) {
      var request = this.request;

      this.organizations.getMembers(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/members')
        .reply(500);

      this.organizations.getMembers(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/members')
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.getMembers(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addMembers', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123'
      };
      this.body = ['user_id'];

      this.request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/members', {})
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.addMembers(this.data, {}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .addMembers(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/members')
        .reply(500);

      this.organizations.addMembers(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/members', function(done) {
      var request = this.request;

      this.organizations.addMembers(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.addMembers({ id: null }, {}, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.addMembers({ id: 123 }, {}, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/members', this.body)
        .reply(200);

      this.organizations.addMembers(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/members')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.addMembers(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeMembers', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123'
      };

      this.body = ['user_id'];

      this.request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/members', {})
        .reply(200);
    });

    it('should validate empty organizationId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeMembers({ id: null }, this.body, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should validate non-string organizationId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeMembers({ id: 123 }, _this.body, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .removeMembers(this.data, this.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/members')
        .reply(500);

      this.organizations.removeMembers(this.data, this.body).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/members', function(done) {
      var request = this.request;

      var request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/members', this.body)
        .reply(200);

      this.organizations.removeMembers(this.data, this.body, function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/members', this.body)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.removeMembers(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  //// Roles
  describe('#getMemberRoles', function() {
    var data = {
      id: 'org_id',
      user_id: 'user_123'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/organizations/' + data.id + '/members/' + data.user_id + '/roles')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.getMemberRoles(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.organizations.getMemberRoles(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_ID/members/user_id/roles', function(done) {
      var request = this.request;

      this.organizations.getMemberRoles(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/members/' + data.user_id + '/roles')
        .reply(500);

      this.organizations.getMemberRoles(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/members/' + data.user_id + '/roles')
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.getMemberRoles(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addMemberRoles', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123',
        user_id: 'user_id'
      };
      this.body = { roles: ['user_id'] };

      this.request = nock(API_URL)
        .post(
          '/organizations/' + this.data.id + '/members/' + this.data.user_id + '/roles',
          this.body
        )
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.addMemberRoles(this.data, this.body, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .addMemberRoles(this.data, this.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/members/' + this.data.user_id + '/roles')
        .reply(500);

      this.organizations.addMemberRoles(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/members/user_id/roles', function(done) {
      var request = this.request;

      this.organizations.addMemberRoles(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.addMemberRoles({ id: null }, {}, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.addMemberRoles({ id: 123 }, {}, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.addMemberRoles({ id: 'org_123', user_id: null }, {}, function() {});
      }).to.throw('The user ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.addMemberRoles({ id: 'org_123', user_id: 123 }, {}, function() {});
      }).to.throw('The user ID has to be a string');
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post(
          '/organizations/' + this.data.id + '/members/' + this.data.user_id + '/roles',
          this.body
        )
        .reply(200);

      this.organizations.addMemberRoles(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/members/' + this.data.user_id + '/roles')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.addMemberRoles(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeMemberRoles', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123',
        user_id: 'user_123'
      };

      this.body = { roles: ['user_id'] };

      this.request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/members/' + this.data.user_id + '/roles', {})
        .reply(200);
    });

    it('should validate empty organizationId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeMemberRoles({ id: null }, this.body, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should validate non-string organizationId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeMemberRoles({ id: 123 }, _this.body, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .removeMemberRoles(this.data, this.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/members/' + this.data.user_id + '/roles')
        .reply(500);

      this.organizations.removeMemberRoles(this.data, this.body).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeMemberRoles({ id: 'org_123', user_id: null }, {}, function() {});
      }).to.throw('The user ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.removeMemberRoles({ id: 'org_123', user_id: 123 }, {}, function() {});
      }).to.throw('The user ID has to be a string');
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/members/user_id/roles', function(done) {
      var request = this.request;

      var request = nock(API_URL)
        .delete(
          '/organizations/' + this.data.id + '/members/' + this.data.user_id + '/roles',
          this.body
        )
        .reply(200);

      this.organizations.removeMemberRoles(this.data, this.body, function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete(
          '/organizations/' + this.data.id + '/members/' + this.data.user_id + '/roles',
          this.body
        )
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.removeMemberRoles(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  //// Invites
  describe('#getInvitations', function() {
    var data = {
      id: 'org_id'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/organizations/' + data.id + '/invitations')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.getInvitations(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.organizations.getInvitations(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_ID/invitations', function(done) {
      var request = this.request;

      this.organizations.getInvitations(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/invitations')
        .reply(500);

      this.organizations.getInvitations(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/invitations')
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.getInvitations(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getInvitation', function() {
    var data = {
      id: 'org_id',
      invitation_id: 'inv_123'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/organizations/' + data.id + '/invitations/' + data.invitation_id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.getInvitation(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.organizations.getInvitation(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/rol_ID/invitations/inv_id', function(done) {
      var request = this.request;

      this.organizations.getInvitation(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/invitations/' + data.invitation_id)
        .reply(500);

      this.organizations.getInvitation(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.getInvitation({ id: null }, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.getInvitation({ id: 123 }, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.getInvitation({ id: 'org_123', invitation_id: null }, function() {});
      }).to.throw('The invitation ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.getInvitation({ id: 'org_123', invitation_id: 123 }, function() {});
      }).to.throw('The invitation ID has to be a string');
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/organizations/' + data.id + '/invitations/' + data.invitation_id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.getInvitation(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#createInvitation', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123'
      };
      this.body = {
        invitee: 'inv',
        client_id: 'cid'
      };

      this.request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/invitations', {})
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.organizations.createInvitation(this.data, {}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .createInvitation(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/invitations')
        .reply(500);

      this.organizations.createInvitation(this.data, {}).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/invitations', function(done) {
      var request = this.request;

      this.organizations.createInvitation(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.createInvitation({ id: null }, {}, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.createInvitation({ id: 123 }, {}, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/invitations', this.body)
        .reply(200);

      this.organizations.createInvitation(this.data, this.body).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/organizations/' + this.data.id + '/invitations')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.createInvitation(this.data, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#deleteInvitation', function() {
    beforeEach(function() {
      this.data = {
        id: 'org_123',
        invitation_id: 'inv_123'
      };

      this.request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/invitations/' + this.data.invitation_id, {})
        .reply(200);
    });

    it('should validate empty organizationId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.deleteInvitation({ id: null }, function() {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should validate non-string organizationId', function() {
      var _this = this;
      expect(function() {
        _this.organizations.deleteInvitation({ id: 123 }, function() {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return a promise if no callback is given', function(done) {
      this.organizations
        .removeMembers(this.data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/invitations/' + this.data.invitation_id, {})
        .reply(500);

      this.organizations.deleteInvitation(this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/invitations/inv_id', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/invitations/' + this.data.invitation_id, {})
        .reply(200);

      this.organizations.deleteInvitation(this.data, function(err) {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.deleteInvitation({ id: 'org_123', invitation_id: null }, function() {});
      }).to.throw('The invitation ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', function() {
      var _this = this;
      expect(function() {
        _this.organizations.deleteInvitation({ id: 'org_123', invitation_id: 123 }, function() {});
      }).to.throw('The invitation ID has to be a string');
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/organizations/' + this.data.id + '/invitations/' + this.data.invitation_id, {})
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.organizations.deleteInvitation(this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
