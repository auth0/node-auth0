import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum,
  LogStreamsManager,
  PostLogStreamsRequestOneOf7,
  ManagementClient,
} from '../../src/index.js';

describe('LogStreamsManager', () => {
  let logStreams: LogStreamsManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    logStreams = client.logStreams;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new LogStreamsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new LogStreamsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/log-streams').reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      logStreams.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/log-streams').reply(500, {});

      logStreams.getAll().catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = [{ id: '123' }];
      nock(API_URL).get('/log-streams').reply(200, data);

      logStreams.getAll().then((logStreams) => {
        expect(logStreams.data).toBeInstanceOf(Array);

        expect(logStreams.data.length).toBe(data.length);

        expect(logStreams.data[0].id).toBe(data[0].id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/log-streams', (done) => {
      logStreams.getAll().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/log-streams')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      logStreams.getAll().then(() => {
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
      request = nock(API_URL).get(`/log-streams/${data.id}`).reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      logStreams.get(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/log-streams/${params.id}`).reply(500, {});

      logStreams.get(params).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/log-streams/${params.id}`).reply(200, data);

      logStreams.get(params).then((log) => {
        expect(log.data.id).toBe(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/log-streams/:id', (done) => {
      logStreams.get(params).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/log-streams')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      logStreams.getAll().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#create', () => {
    const data: PostLogStreamsRequestOneOf7 = {
      name: 'Test log stream',
      sink: {
        mixpanelProjectId: '1',
        mixpanelRegion: GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum.us,
        mixpanelServiceAccountPassword: '',
        mixpanelServiceAccountUsername: '',
      },
      type: 'mixpanel',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/log-streams').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      logStreams.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/log-streams').reply(500, {});

      logStreams.create(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/log-streams', (done) => {
      logStreams.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/log-streams', data as any)
        .reply(200, {});

      logStreams.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/log-streams')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      logStreams.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#update', () => {
    const data = { id: '5' };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).patch(`/log-streams/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      logStreams.update({ id: '5' }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/log-streams/5', (done) => {
      logStreams.update({ id: '5' }, {}).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the new data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/log-streams/${data.id}`, { name: 'test' })
        .reply(200, {});

      logStreams.update({ id: '5' }, { name: 'test' }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/log-streams/${data.id}`).reply(500, {});

      logStreams.update({ id: data.id }, {}).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';

    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/log-streams/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      logStreams.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /log-streams/${id}`, (done) => {
      logStreams.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/log-streams/${id}`).reply(500, {});

      logStreams.delete({ id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/log-streams/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      logStreams.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
