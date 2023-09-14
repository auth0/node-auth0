import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { LogsManager, ManagementClient } from '../../src/index.js';

describe('LogsManager', () => {
  let logs: LogsManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    logs = client.logs;
  });

  describe('instance', () => {
    const methods = ['getAll', 'get'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((logs as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new LogsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new LogsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/logs').reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      logs.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/logs').reply(500, {});

      logs.getAll().catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = [{ audience: '123' }];
      nock(API_URL).get('/logs').reply(200, data);

      logs.getAll().then((logs) => {
        expect(logs.data).toBeInstanceOf(Array);

        expect(logs.data.length).toBe(data.length);

        expect(logs.data[0].audience).toBe(data[0].audience);

        done();
      });
    });

    it('should perform a GET request to /api/v2/logs', (done) => {
      logs.getAll().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/logs')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      logs.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/logs')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200, []);

      logs.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#get', () => {
    const params = { id: '5' };
    const data = {
      id: params.id,
      name: 'Test log',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get(`/logs/${data.id}`).reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      logs.get(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/logs/${params.id}`).reply(500, {});

      logs.get(params).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/logs/${params.id}`).reply(200, data);

      logs.get(params).then((log) => {
        expect(log.data.id).toBe(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/logs/:id', (done) => {
      logs.get(params).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/logs')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      logs.getAll().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/logs')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200, {});

      logs.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
