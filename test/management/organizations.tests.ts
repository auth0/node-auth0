import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { OrganizationsManager } from '../../src/management/__generated/index';
import { RequiredError } from '../../src/lib/errors';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('OrganizationsManager', () => {
  let organizations: OrganizationsManager;

  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    organizations = client.organizations;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new OrganizationsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new OrganizationsManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/organizations').reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      organizations.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/organizations').reply(500, {});

      organizations.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = [{ name: 'org 1' }];
      nock(API_URL).get('/organizations').reply(200, data);

      organizations.getAll().then((result) => {
        expect(result.data).to.be.an.instanceOf(Array);

        expect(result.data.length).to.equal(data.length);

        expect(result.data[0].name).to.equal(data[0].name);

        done();
      });
    });

    it('should perform a GET request to /api/v2/organizations', function (done) {
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
        .reply(200, []);

      organizations.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const params = {
        page: 0,
        per_page: 5,
      };
      const request = nock(API_URL).get('/organizations').query(params).reply(200, []);

      organizations.getAll(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getByID', () => {
    const data = {
      id: 'org_123456',
      name: 'organizations',
      display_name: 'My organization',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/organizations/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      organizations.get({ id: data.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/:id', function (done) {
      organizations.get({ id: data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}`).reply(500, {});

      organizations.get({ id: data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${data.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.get({ id: data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getByName', () => {
    const data = {
      id: 'org_123456',
      name: 'organizations',
      display_name: 'My organization',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/organizations/name/${data.name}`).reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .getByName({ name: data.name })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/name/:name', function (done) {
      organizations.getByName({ name: data.name }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.name}`).reply(500, {});

      organizations.getByName({ name: data.name }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/name/${data.name}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.getByName({ name: data.name }).then(() => {
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

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/organizations').reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      organizations.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/organizations').reply(500, {});

      organizations.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations', function (done) {
      organizations.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).post('/organizations', data).reply(200, data);

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
        .reply(200, {});

      organizations.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const data = { id: 'org_123' };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).patch(`/organizations/${data.id}`).reply(200, data);
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
      organizations.update({ id: 'org_123' }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/organizations/${data.id}`, { name: 'test' })
        .reply(200, {});

      organizations.update({ id: 'org_123' }, { name: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/organizations/${data.id}`).reply(500, {});

      organizations.update({ id: data.id }, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 'rol_ID';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/organizations/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /organizations/${id}`, function (done) {
      organizations.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/organizations/${id}`).reply(500, {});

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
        .reply(200, {});

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

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/organizations/${data.id}/enabled_connections`).reply(200, []);
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getEnabledConnections(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_id/enabled_connections', function (done) {
      organizations.getEnabledConnections(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}/enabled_connections`).reply(500, {});

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
        .reply(200, []);

      organizations.getEnabledConnections(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getEnabledConnection', () => {
    const data = {
      id: 'org_id',
      connectionId: 'conn_id',
    };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .get(`/organizations/${data.id}/enabled_connections/${data.connectionId}`)
        .reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getEnabledConnection(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/rol_ID/enabled_connections/con_id', function (done) {
      organizations.getEnabledConnection(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL)
        .get(`/organizations/${data.id}/enabled_connections/${data.connectionId}`)
        .reply(500, {});

      organizations.getEnabledConnection(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${data.id}/enabled_connections/${data.connectionId}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.getEnabledConnection(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addEnabledConnection', () => {
    const data = {
      id: 'org_123',
    };

    const body = { connection_id: '123', assign_membership_on_login: false };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post(`/organizations/${data.id}/enabled_connections`).reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .addEnabledConnection(data, { connection_id: '' })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/organizations/${data.id}/enabled_connections`).reply(500, {});

      organizations.addEnabledConnection(data, { connection_id: '' }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/enabled_connections', function (done) {
      organizations.addEnabledConnection(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${data.id}/enabled_connections`, body)
        .reply(200, {});

      organizations.addEnabledConnection(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${data.id}/enabled_connections`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.addEnabledConnection(data, { connection_id: '' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateEnabledConnection', () => {
    const data = {
      id: 'org_123',
      connectionId: '123',
    };
    const body = { assign_membership_on_login: false };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .patch(`/organizations/${data.id}/enabled_connections/${data.connectionId}`)
        .reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .updateEnabledConnection(data, body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .patch(`/organizations/${data.id}/enabled_connections/${data.connectionId}`)
        .reply(500, {});

      organizations.updateEnabledConnection(data, body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/organizations/org_id/enabled_connections/conn_id', function (done) {
      organizations.updateEnabledConnection(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(organizations.updateEnabledConnection({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return error when connectionId is not sent', () => {
      expect(
        organizations.updateEnabledConnection({ id: 'test' } as any, {} as any)
      ).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.connectionId was null or undefined.`
      );
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/organizations/${data.id}/enabled_connections/${data.connectionId}`, body)
        .reply(200, {});

      organizations.updateEnabledConnection(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/organizations/${data.id}/enabled_connections/${data.connectionId}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.updateEnabledConnection(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#deleteEnabledConnection', () => {
    const data = {
      id: 'org_123',
      connectionId: '123',
    };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .delete(`/organizations/${data.id}/enabled_connections/${data.connectionId}`)
        .reply(200, {});
    });

    it('should validate empty organizationId', () => {
      expect(organizations.deleteEnabledConnection({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should validate empty connectionId', function () {
      expect(
        organizations.deleteEnabledConnection({ id: '123' } as any, {} as any)
      ).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.connectionId was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .deleteEnabledConnection(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .delete(`/organizations/${data.id}/enabled_connections/${data.connectionId}`)
        .reply(500, {});

      organizations.deleteEnabledConnection(data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/enabled_connections/connection_id', function (done) {
      organizations.deleteEnabledConnection(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${data.id}/enabled_connections/${data.connectionId}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.deleteEnabledConnection(data, {}).then(() => {
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

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/organizations/${data.id}/members`).reply(200, []);
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getMembers(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_ID/members', function (done) {
      organizations.getMembers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}/members`).reply(500, {});

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
        .reply(200, []);

      organizations.getMembers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addMembers', () => {
    const data = {
      id: 'org_123',
    };
    const body = { members: [] };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post(`/organizations/${data.id}/members`).reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .addMembers(data, { members: [] })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/organizations/${data.id}/members`).reply(500, {});

      organizations.addMembers(data, { members: [] }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/members', function (done) {
      organizations.addMembers(data, { members: [] }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(organizations.addMembers({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/organizations/${data.id}/members`, body).reply(200, {});

      organizations.addMembers(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${data.id}/members`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.addMembers(data, { members: [] }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeMembers', () => {
    const data = { id: 'org_123' };
    const body = { members: ['user_id'] };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/organizations/${data.id}/members`, {}).reply(200, {});
    });

    it('should validate empty organizationId', () => {
      expect(organizations.deleteMembers({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .deleteMembers(data, body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/organizations/${data.id}/members`).reply(500, {});

      organizations.deleteMembers(data, body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/members', function (done) {
      const request = nock(API_URL)
        .delete(`/organizations/${data.id}/members`, body)
        .reply(200, {});

      organizations.deleteMembers(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${data.id}/members`, body)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.deleteMembers(data, body).then(() => {
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

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .get(`/organizations/${data.id}/members/${data.user_id}/roles`)
        .reply(200, []);
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getMemberRoles(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_ID/members/user_id/roles', function (done) {
      organizations.getMemberRoles(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}/members/${data.user_id}/roles`).reply(500, {});

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
        .reply(200, []);

      organizations.getMemberRoles(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addMemberRoles', () => {
    const data = {
      id: 'org_123',
      user_id: 'user_id',
    };
    const body = { roles: ['user_id'] };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .post(`/organizations/${data.id}/members/${data.user_id}/roles`, body)
        .reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .addMemberRoles(data, body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/organizations/${data.id}/members/${data.user_id}/roles`).reply(500, {});

      organizations.addMemberRoles(data, { roles: [] }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/members/user_id/roles', function (done) {
      organizations.addMemberRoles(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(organizations.addMemberRoles({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return error when user_id is not sent', () => {
      expect(organizations.deleteMembers({ id: '123' }, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.user_id was null or undefined.`
      );
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${data.id}/members/${data.user_id}/roles`, body)
        .reply(200, {});

      organizations.addMemberRoles(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${data.id}/members/${data.user_id}/roles`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.addMemberRoles(data, { roles: [] }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#deleteMemberRoles', () => {
    const data = {
      id: 'org_123',
      user_id: 'user_123',
    };

    const body = { roles: ['user_id'] };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .delete(`/organizations/${data.id}/members/${data.user_id}/roles`, {})
        .reply(200, {});
    });

    it('should validate empty id', () => {
      expect(organizations.deleteMemberRoles({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .deleteMemberRoles(data, body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .delete(`/organizations/${data.id}/members/${data.user_id}/roles`)
        .reply(500, {});

      organizations.deleteMemberRoles(data, body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should return error when user_id is not sent', () => {
      expect(organizations.deleteMemberRoles({ id: 'org_1' } as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.user_id was null or undefined.`
      );
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/members/user_id/roles', function (done) {
      const request = nock(API_URL)
        .delete(`/organizations/${data.id}/members/${data.user_id}/roles`, body)
        .reply(200, {});

      organizations.deleteMemberRoles(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${data.id}/members/${data.user_id}/roles`, body)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.deleteMemberRoles(data, body).then(() => {
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

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/organizations/${data.id}/invitations`).reply(200, []);
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getInvitations(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/org_ID/invitations', function (done) {
      organizations.getInvitations(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/organizations/${data.id}/invitations`).reply(500, {});

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
        .reply(200, []);

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

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .get(`/organizations/${data.id}/invitations/${data.invitation_id}`)
        .reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      organizations.getInvitation(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/organizations/rol_ID/invitations/inv_id', function (done) {
      organizations.getInvitation(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL)
        .get(`/organizations/${data.id}/invitations/${data.invitation_id}`)
        .reply(500, {});

      organizations.getInvitation(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should return error when id is not sent', () => {
      expect(organizations.getInvitation({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return error when invitation_id is not sent', () => {
      expect(organizations.getInvitation({ id: '123' } as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.invitation_id was null or undefined.`
      );
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/organizations/${data.id}/invitations/${data.invitation_id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.getInvitation(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#createInvitation', () => {
    const data = {
      id: 'org_123',
    };
    const body = {
      invitee: 'inv',
      client_id: 'cid',
    };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post(`/organizations/${data.id}/invitations`).reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      organizations
        .createInvitation(data, {
          client_id: '123',
          invitee: { email: '12' },
          inviter: { name: '12' },
        })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/organizations/${data.id}/invitations`).reply(500, {});

      organizations
        .createInvitation(data, {
          client_id: '123',
          invitee: { email: '12' },
          inviter: { name: '12' },
        })
        .catch((err) => {
          expect(err).to.exist;

          done();
        });
    });

    it('should perform a POST request to /api/v2/organizations/org_id/invitations', function (done) {
      organizations
        .createInvitation(data, {
          client_id: '123',
          invitee: { email: '12' },
          inviter: { name: '12' },
        })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
    });

    it('should return error when id is not sent', () => {
      expect(organizations.createInvitation({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${data.id}/invitations`, {
          client_id: '123',
          invitee: { email: '12' },
          inviter: { name: '12' },
        })
        .reply(200, {});

      organizations
        .createInvitation(data, {
          client_id: '123',
          invitee: { email: '12' },
          inviter: { name: '12' },
        })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/organizations/${data.id}/invitations`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations
        .createInvitation(data, {
          client_id: '123',
          invitee: { email: '12' },
          inviter: { name: '12' },
        })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
    });
  });

  describe('#deleteInvitation', () => {
    const data = {
      id: 'org_123',
      invitation_id: 'inv_123',
    };
    let request: nock.Scope;
    beforeEach(function () {
      request = nock(API_URL)
        .delete(`/organizations/${data.id}/invitations/${data.invitation_id}`)
        .reply(200, {});
    });

    it('should validate empty id', () => {
      expect(organizations.deleteInvitation({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', function (done) {
      organizations.deleteInvitation(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .delete(`/organizations/${data.id}/invitations/${data.invitation_id}`, {})
        .reply(500, {});

      organizations.deleteInvitation(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/organizations/organization_id/invitations/inv_id', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${data.id}/invitations/${data.invitation_id}`)
        .reply(200, {});

      organizations.deleteInvitation(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should return error when invitation_id is not sent', () => {
      expect(
        organizations.deleteInvitation({ id: 'org_123' } as any, {} as any)
      ).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.invitation_id was null or undefined.`
      );
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/organizations/${data.id}/invitations/${data.invitation_id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      organizations.deleteInvitation(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
