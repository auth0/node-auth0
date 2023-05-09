import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { GrantsManager } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('GrantsManager', () => {
  let grants: GrantsManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    grants = client.grants;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('instance', () => {
    const methods = ['getAll', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect((grants as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new GrantsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new GrantsManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;
    const response = [
      {
        id: 'grant_id',
        clientID: 'client_id',
        user_id: 'user_id',
        audience: 'audience',
        scope: ['scope1'],
      },
    ];

    beforeEach(function () {
      request = nock(API_URL).get('/grants').reply(200, response);
    });

    it('should return a promise if no callback is given', function (done) {
      grants.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/grants').reply(500);

      grants.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      grants.getAll().then((grants) => {
        expect(grants.data).to.be.an.instanceOf(Array);

        expect(grants.data.length).to.equal(response.length);

        expect(grants.data[0].id).to.equal(response[0].id);
        expect(grants.data[0].clientID).to.equal(response[0].clientID);
        expect(grants.data[0].user_id).to.equal(response[0].user_id);
        expect(grants.data[0].audience).to.equal(response[0].audience);
        expect(grants.data[0].scope?.[0]).to.equal(response[0].scope[0]);

        done();
      });
    });

    it('should perform a GET request to /api/v2/grants', function (done) {
      grants.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/grants')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      grants.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/grants')
        .query({
          audience: '123',
        })
        .reply(200, []);

      grants.getAll({ audience: '123' }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/grants/${id}`).reply(200);
    });

    it('should return a promise when no callback is given', function (done) {
      grants.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /grants/${id}`, function (done) {
      grants.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
