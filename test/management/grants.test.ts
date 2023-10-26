import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { GrantsManager, ManagementClient, RequiredError } from '../../src/index.js';

describe('GrantsManager', () => {
  let grants: GrantsManager;
  const token = 'TOKEN';

  beforeAll(() => {
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
      it(`should have a ${method} method`, () => {
        expect((grants as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new GrantsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new GrantsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
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

    beforeEach(() => {
      request = nock(API_URL).get('/grants').reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      grants.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/grants').reply(500, {});

      grants.getAll().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      grants.getAll().then((grants) => {
        expect(grants.data).toBeInstanceOf(Array);

        expect(grants.data.length).toBe(response.length);

        expect(grants.data[0].id).toBe(response[0].id);
        expect(grants.data[0].clientID).toBe(response[0].clientID);
        expect(grants.data[0].user_id).toBe(response[0].user_id);
        expect(grants.data[0].audience).toBe(response[0].audience);
        expect(grants.data[0].scope?.[0]).toBe(response[0].scope[0]);

        done();
      });
    });

    it('should perform a GET request to /api/v2/grants', (done) => {
      grants.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/grants')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      grants.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/grants')
        .query({
          audience: '123',
        })
        .reply(200, []);

      grants.getAll({ audience: '123' }).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/grants/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      grants.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /grants/${id}`, (done) => {
      grants.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    describe('#deleteByUserId', () => {
      const user_id = '5';
      let request: nock.Scope;

      beforeEach(() => {
        request = nock(API_URL).delete(`/grants?user_id=${user_id}`).reply(200, {});
      });

      it('should return a promise when no callback is given', (done) => {
        grants.deleteByUserId({ user_id }).then(done.bind(null, null));
      });

      it(`should perform a DELETE request to /grants/${id}`, (done) => {
        grants.deleteByUserId({ user_id }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should return an error when client_id is not sent', async () => {
        await expect(grants.deleteByUserId({} as any)).rejects.toThrowError(RequiredError);
      });
    });
  });
});
