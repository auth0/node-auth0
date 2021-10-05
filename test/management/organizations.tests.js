const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const OrganizationsManager = require(`../../src/management/OrganizationsManager`);
const { ArgumentError } = require('rest-facade');

describe('OrganizationsManager', () => {
  /**
   * @type {OrganizationsManager}
   */
  let organizations;

  /**
   * @type {string}
   */
  let token;

  before(() => {
    token = 'TOKEN';
    organizations = new OrganizationsManager({
      headers: { authorization: `Bearer ${token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = [
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
      'deleteInvitation',
    ];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect(organizations[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new OrganizationsManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new OrganizationsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new OrganizationsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/organizations').reply(200);
    });

    it('should accept a callback', (done) => {
      organizations.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', (done) => {
      organizations.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/organizations').reply(500);

      organizations.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/organizations').reply(200, data);

      organizations.getAll().then((credentials) => {
        expect(credentials).to.be.an.instanceOf(Array);

        expect(credentials.length).to.equal(data.length);

        expect(credentials[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/organizations', function (done) {
      const { request } = this;

      organizations.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/organizations')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };
      const request = nock(API_URL).get('/organizations').query(params).reply(200);

      organizations.getAll(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getByID', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123456',
        name: 'organizations',
        display_name: 'My organization',
      };

      this.request = nock(API_URL).get(`/organizations/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      const params = { id: this.data.id };

      organizations.getByID(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .getByID({ id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/:id', function (done) {
      const { request } = this;

      organizations.getByID({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${this.data.id}`).reply(500);

      organizations.getByID({ id: this.data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${this.data.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.getByID({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getByName', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123456',
        name: 'organizations',
        display_name: 'My organization',
      };

      this.request = nock(API_URL)
        .get(`/organizations/name/${this.data.name}`)
        .reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      const params = { name: this.data.name };

      organizations.getByName(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .getByName({ name: this.data.name })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/name/:name', function (done) {
      const { request } = this;

      organizations.getByName({ name: this.data.name }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${this.data.name}`).reply(500);

      organizations.getByName({ name: this.data.name }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/name/${this.data.name}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.getByName({ name: this.data.name }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      id: 'org_123',
      name: 'org_name',
      display_name: 'My Organization',
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/organizations').reply(200);
    });

    it('should accept a callback', (done) => {
      organizations.create(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', (done) => {
      organizations.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/organizations').reply(500);

      organizations.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations', function (done) {
      const { request } = this;

      organizations.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).post('/organizations', data).reply(200);

      organizations.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/organizations')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    beforeEach(function () {
      this.data = { id: 'org_123' };

      this.request = nock(API_URL).patch(`/organizations/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', (done) => {
      organizations.update({ id: 'org_123' }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', (done) => {
      organizations
        .update({ id: 'org_123' }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/organizations/org_123', function (done) {
      const { request } = this;

      organizations.update({ id: 'org_123' }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/organizations/${this.data.id}`, this.data).reply(200);

      organizations.update({ id: 'org_123' }, this.data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/organizations/${this.data.id}`).reply(500);

      organizations.update({ id: this.data.id }, this.data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 'rol_ID';

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/organizations/${id}`).reply(200);
    });

    it('should accept a callback', (done) => {
      organizations.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /organizations/${id}`, function (done) {
      const { request } = this;

      organizations.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/organizations/${id}`).reply(500);

      organizations.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      organizations.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  //// Connections
  describe('#getEnabledConnections', () => {
    const data = {
      id: 'org_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/organizations/${data.id}/enabled_connections`).reply(200);
    });

    it('should accept a callback', (done) => {
      organizations.getEnabledConnections(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getEnabledConnections(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_id/enabled_connections', function (done) {
      const { request } = this;

      organizations.getEnabledConnections(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}/enabled_connections`).reply(500);

      organizations.getEnabledConnections(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${data.id}/enabled_connections`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      organizations.getEnabledConnections(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getEnabledConnection', () => {
    const data = {
      id: 'org_id',
      connection_id: 'conn_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .get(`/organizations/${data.id}/enabled_connections/${data.connection_id}`)
        .reply(200);
    });

    it('should accept a callback', (done) => {
      organizations.getEnabledConnection(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getEnabledConnection(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/rol_ID/enabled_connections/con_id', function (done) {
      const { request } = this;

      organizations.getEnabledConnection(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL)
        .get(`/organizations/${data.id}/enabled_connections/${data.connection_id}`)
        .reply(500);

      organizations.getEnabledConnection(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${data.id}/enabled_connections/${data.connection_id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      organizations.getEnabledConnection(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addEnabledConnection', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123',
      };
      this.body = { connection_id: '123', assign_membership_on_login: false };

      this.request = nock(API_URL)
        .post(`/organizations/${this.data.id}/enabled_connections`)
        .reply(200);
    });

    it('should accept a callback', function (done) {
      organizations.addEnabledConnection(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .addEnabledConnection(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/organizations/${this.data.id}/enabled_connections`).reply(500);

      organizations.addEnabledConnection(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/enabled_connections', function (done) {
      const { request } = this;

      organizations.addEnabledConnection(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.addEnabledConnection({ id: null }, {}, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not a string', () => {
      expect(() => {
        organizations.addEnabledConnection({ id: 123 }, {}, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${this.data.id}/enabled_connections`, this.body)
        .reply(200);

      organizations.addEnabledConnection(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${this.data.id}/enabled_connections`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.addEnabledConnection(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateEnabledConnection', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123',
        connection_id: '123',
      };
      this.body = { assign_membership_on_login: false };

      this.request = nock(API_URL)
        .patch(`/organizations/${this.data.id}/enabled_connections/${this.data.connection_id}`)
        .reply(200);
    });

    it('should accept a callback', function (done) {
      organizations.updateEnabledConnection(this.data, this.body, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .updateEnabledConnection(this.data, this.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .patch(`/organizations/${this.data.id}/enabled_connections/${this.data.connection_id}`)
        .reply(500);

      organizations.updateEnabledConnection(this.data, this.body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/organizations/org_id/enabled_connections/conn_id', function (done) {
      const { request } = this;

      organizations.updateEnabledConnection(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.updateEnabledConnection({ id: null }, {}, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not a string', () => {
      expect(() => {
        organizations.updateEnabledConnection({ id: 123 }, {}, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return error when connection_id is not sent', () => {
      expect(() => {
        organizations.updateEnabledConnection({ id: 'org_123', connection_id: null }, {}, () => {});
      }).to.throw('The connection ID passed in params cannot be null or undefined');
    });

    it('should return error when connection_id is not a string', () => {
      expect(() => {
        organizations.updateEnabledConnection({ id: 'org_123', connection_id: 123 }, {}, () => {});
      }).to.throw('The connection ID has to be a string');
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(
          `/organizations/${this.data.id}/enabled_connections/${this.data.connection_id}`,
          this.body
        )
        .reply(200);

      organizations.updateEnabledConnection(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/organizations/${this.data.id}/enabled_connections/${this.data.connection_id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.updateEnabledConnection(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeEnabledConnection', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123',
        connection_id: '123',
      };

      this.request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/enabled_connections/${this.data.connection_id}`, {})
        .reply(200);
    });

    it('should validate empty organizationId', () => {
      expect(() => {
        organizations.removeEnabledConnection({ id: null }, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should validate empty connectionId', function () {
      const _this = this;
      expect(() => {
        organizations.removeEnabledConnection({ id: _this.data.id }, () => {});
      }).to.throw('The connection ID passed in params cannot be null or undefined');
    });

    it('should validate non-string organizationId', () => {
      expect(() => {
        organizations.removeEnabledConnection({ id: 123 }, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should validate non-string connectionId', function () {
      const _this = this;
      expect(() => {
        organizations.removeEnabledConnection({ id: _this.data.id, connection_id: 123 }, () => {});
      }).to.throw('The connection ID has to be a string');
    });

    it('should accept a callback', function (done) {
      organizations.removeEnabledConnection(this.data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .removeEnabledConnection(this.data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .delete(`/organizations/${this.data.id}/enabled_connections/${this.data.connection_id}`)
        .reply(500);

      organizations.removeEnabledConnection(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/enabled_connections/connection_id', function (done) {
      const { request } = this;

      organizations.removeEnabledConnection(this.data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/enabled_connections/${this.data.connection_id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.removeEnabledConnection(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  //// Members
  describe('#getMembers', () => {
    const data = {
      id: 'org_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/organizations/${data.id}/members`).reply(200);
    });

    it('should accept a callback', (done) => {
      organizations.getMembers(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getMembers(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_ID/members', function (done) {
      const { request } = this;

      organizations.getMembers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}/members`).reply(500);

      organizations.getMembers(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${data.id}/members`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      organizations.getMembers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addMembers', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123',
      };
      this.body = ['user_id'];

      this.request = nock(API_URL).post(`/organizations/${this.data.id}/members`, {}).reply(200);
    });

    it('should accept a callback', function (done) {
      organizations.addMembers(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .addMembers(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/organizations/${this.data.id}/members`).reply(500);

      organizations.addMembers(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/members', function (done) {
      const { request } = this;

      organizations.addMembers(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.addMembers({ id: null }, {}, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.addMembers({ id: 123 }, {}, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${this.data.id}/members`, this.body)
        .reply(200);

      organizations.addMembers(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${this.data.id}/members`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.addMembers(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeMembers', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123',
      };

      this.body = ['user_id'];

      this.request = nock(API_URL).delete(`/organizations/${this.data.id}/members`, {}).reply(200);
    });

    it('should validate empty organizationId', () => {
      expect(function () {
        organizations.removeMembers({ id: null }, this.body, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should validate non-string organizationId', function () {
      const _this = this;
      expect(() => {
        organizations.removeMembers({ id: 123 }, _this.body, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .removeMembers(this.data, this.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/organizations/${this.data.id}/members`).reply(500);

      organizations.removeMembers(this.data, this.body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/members', function (done) {
      const request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/members`, this.body)
        .reply(200);

      organizations.removeMembers(this.data, this.body, () => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/members`, this.body)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.removeMembers(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  //// Roles
  describe('#getMemberRoles', () => {
    const data = {
      id: 'org_id',
      user_id: 'user_123',
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .get(`/organizations/${data.id}/members/${data.user_id}/roles`)
        .reply(200);
    });

    it('should accept a callback', (done) => {
      organizations.getMemberRoles(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getMemberRoles(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_ID/members/user_id/roles', function (done) {
      const { request } = this;

      organizations.getMemberRoles(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}/members/${data.user_id}/roles`).reply(500);

      organizations.getMemberRoles(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${data.id}/members/${data.user_id}/roles`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      organizations.getMemberRoles(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addMemberRoles', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123',
        user_id: 'user_id',
      };
      this.body = { roles: ['user_id'] };

      this.request = nock(API_URL)
        .post(`/organizations/${this.data.id}/members/${this.data.user_id}/roles`, this.body)
        .reply(200);
    });

    it('should accept a callback', function (done) {
      organizations.addMemberRoles(this.data, this.body, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .addMemberRoles(this.data, this.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .post(`/organizations/${this.data.id}/members/${this.data.user_id}/roles`)
        .reply(500);

      organizations.addMemberRoles(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/members/user_id/roles', function (done) {
      const { request } = this;

      organizations.addMemberRoles(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.addMemberRoles({ id: null }, {}, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.addMemberRoles({ id: 123 }, {}, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.addMemberRoles({ id: 'org_123', user_id: null }, {}, () => {});
      }).to.throw('The user ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.addMemberRoles({ id: 'org_123', user_id: 123 }, {}, () => {});
      }).to.throw('The user ID has to be a string');
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${this.data.id}/members/${this.data.user_id}/roles`, this.body)
        .reply(200);

      organizations.addMemberRoles(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${this.data.id}/members/${this.data.user_id}/roles`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.addMemberRoles(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeMemberRoles', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123',
        user_id: 'user_123',
      };

      this.body = { roles: ['user_id'] };

      this.request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/members/${this.data.user_id}/roles`, {})
        .reply(200);
    });

    it('should validate empty organizationId', () => {
      expect(function () {
        organizations.removeMemberRoles({ id: null }, this.body, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should validate non-string organizationId', function () {
      const _this = this;
      expect(() => {
        organizations.removeMemberRoles({ id: 123 }, _this.body, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .removeMemberRoles(this.data, this.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .delete(`/organizations/${this.data.id}/members/${this.data.user_id}/roles`)
        .reply(500);

      organizations.removeMemberRoles(this.data, this.body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.removeMemberRoles({ id: 'org_123', user_id: null }, {}, () => {});
      }).to.throw('The user ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.removeMemberRoles({ id: 'org_123', user_id: 123 }, {}, () => {});
      }).to.throw('The user ID has to be a string');
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/members/user_id/roles', function (done) {
      const request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/members/${this.data.user_id}/roles`, this.body)
        .reply(200);

      organizations.removeMemberRoles(this.data, this.body, () => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/members/${this.data.user_id}/roles`, this.body)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.removeMemberRoles(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  //// Invites
  describe('#getInvitations', () => {
    const data = {
      id: 'org_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/organizations/${data.id}/invitations`).reply(200);
    });

    it('should accept a callback', (done) => {
      organizations.getInvitations(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getInvitations(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_ID/invitations', function (done) {
      const { request } = this;

      organizations.getInvitations(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}/invitations`).reply(500);

      organizations.getInvitations(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${data.id}/invitations`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      organizations.getInvitations(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getInvitation', () => {
    const data = {
      id: 'org_id',
      invitation_id: 'inv_123',
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .get(`/organizations/${data.id}/invitations/${data.invitation_id}`)
        .reply(200);
    });

    it('should accept a callback', (done) => {
      organizations.getInvitation(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getInvitation(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/rol_ID/invitations/inv_id', function (done) {
      const { request } = this;

      organizations.getInvitation(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}/invitations/${data.invitation_id}`).reply(500);

      organizations.getInvitation(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.getInvitation({ id: null }, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.getInvitation({ id: 123 }, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.getInvitation({ id: 'org_123', invitation_id: null }, () => {});
      }).to.throw('The invitation ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.getInvitation({ id: 'org_123', invitation_id: 123 }, () => {});
      }).to.throw('The invitation ID has to be a string');
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${data.id}/invitations/${data.invitation_id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      organizations.getInvitation(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#createInvitation', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123',
      };
      this.body = {
        invitee: 'inv',
        client_id: 'cid',
      };

      this.request = nock(API_URL)
        .post(`/organizations/${this.data.id}/invitations`, {})
        .reply(200);
    });

    it('should accept a callback', function (done) {
      organizations.createInvitation(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .createInvitation(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/organizations/${this.data.id}/invitations`).reply(500);

      organizations.createInvitation(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/invitations', function (done) {
      const { request } = this;

      organizations.createInvitation(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.createInvitation({ id: null }, {}, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.createInvitation({ id: 123 }, {}, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${this.data.id}/invitations`, this.body)
        .reply(200);

      organizations.createInvitation(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${this.data.id}/invitations`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.createInvitation(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#deleteInvitation', () => {
    beforeEach(function () {
      this.data = {
        id: 'org_123',
        invitation_id: 'inv_123',
      };

      this.request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/invitations/${this.data.invitation_id}`, {})
        .reply(200);
    });

    it('should validate empty organizationId', () => {
      expect(() => {
        organizations.deleteInvitation({ id: null }, () => {});
      }).to.throw('The organization ID passed in params cannot be null or undefined');
    });

    it('should validate non-string organizationId', () => {
      expect(() => {
        organizations.deleteInvitation({ id: 123 }, () => {});
      }).to.throw('The organization ID has to be a string');
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .removeMembers(this.data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .delete(`/organizations/${this.data.id}/invitations/${this.data.invitation_id}`, {})
        .reply(500);

      organizations.deleteInvitation(this.data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/invitations/inv_id', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/invitations/${this.data.invitation_id}`, {})
        .reply(200);

      organizations.deleteInvitation(this.data, () => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.deleteInvitation({ id: 'org_123', invitation_id: null }, () => {});
      }).to.throw('The invitation ID passed in params cannot be null or undefined');
    });

    it('should return error when id is not sent', () => {
      expect(() => {
        organizations.deleteInvitation({ id: 'org_123', invitation_id: 123 }, () => {});
      }).to.throw('The invitation ID has to be a string');
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${this.data.id}/invitations/${this.data.invitation_id}`, {})
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      organizations.deleteInvitation(this.data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
