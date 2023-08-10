import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { RulesManager, ManagementClient } from '../../src/index.js';

describe('RulesManager', () => {
  let rules: RulesManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    rules = client.rules;
  });

  describe('instance', () => {
    const methods = ['get', 'getAll', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((rules as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new RulesManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new RulesManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/rules').reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      rules.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/rules').reply(500, {});

      rules.getAll().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data = [{ id: '123' }];
      nock(API_URL).get('/rules').reply(200, data);

      const credentials = await rules.getAll();
      expect(credentials.data).toBeInstanceOf(Array);

      expect(credentials.data.length).toBe(data.length);

      expect(credentials.data[0].id).toBe(data[0].id);
    });

    it('should perform a GET request to /api/v2/rules', async () => {
      await rules.getAll();
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/rules')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      await rules.getAll();
      expect(request.isDone()).toBe(true);
    });

    it('should pass the parameters in the query-string', async () => {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };
      const request = nock(API_URL).get('/rules').query(params).reply(200, []);

      await rules.getAll(params);
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#get', () => {
    const data = {
      id: '5',
      name: 'Test rule',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      stage: 'login_success',
    };
    let request: nock.Scope;
    beforeEach(() => {
      request = nock(API_URL).get(`/rules/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      rules.get({ id: data.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/rules/5', async () => {
      await rules.get({ id: data.id });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/rules/${data.id}`).reply(500, {});

      rules.get({ id: data.id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/rules/${data.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await rules.get({ id: data.id });
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#create', () => {
    const data = {
      id: 5,
      name: 'Test rule',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      stage: 'login_success',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/rules').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      rules.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/rules').reply(500, {});

      rules.create(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/rules', async () => {
      await rules.create(data);
      expect(request.isDone()).toBe(true);
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).post('/rules', data).reply(200, {});

      await rules.create(data);
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/rules')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await rules.create(data);
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#update', () => {
    const data = { id: '5' };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).patch(`/rules/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      rules.update({ id: '5' }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/rules/5', async () => {
      await rules.update({ id: '5' }, {});
      expect(request.isDone()).toBe(true);
    });

    it('should include the new data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/rules/${data.id}`, { name: 'new name' }).reply(200, {});

      await rules.update(data, { name: 'new name' });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/rules/${data.id}`).reply(500, {});

      rules.update({ id: data.id }, { name: 'new name' }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/rules/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      expect(rules.delete({ id }).then(() => done())).toBeInstanceOf(Promise);
    });

    it(`should perform a delete request to /rules/${id}`, async () => {
      await rules.delete({ id });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/rules/${id}`).reply(500, {});

      rules.delete({ id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/rules/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      await rules.delete({ id });
      expect(request.isDone()).toBe(true);
    });
  });
});
