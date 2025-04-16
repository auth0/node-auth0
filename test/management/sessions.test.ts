import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { SessionsManager, ManagementClient } from '../../src/index.js';

describe('SessionsManager', () => {
  let sessions: SessionsManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    sessions = client.sessions;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new SessionsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new SessionsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#get', () => {
    let request: nock.Scope;
    const id = '1';

    beforeEach(() => {
      request = nock(API_URL).get(`/sessions/${id}`).reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      sessions.get({ id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/sessions/${id}`).reply(500);

      sessions.get({ id: id }).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = { id: '1' };
      nock(API_URL).get(`/sessions/${id}`).reply(200, data);

      sessions.get({ id: id }).then((session) => {
        expect(session.data.id).toBe(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/sessions', (done) => {
      sessions.get({ id: id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/sessions/${id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      sessions.get({ id: id }).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';

    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/sessions/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      sessions.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /sessions/${id}`, (done) => {
      sessions.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/sessions/${id}`).reply(500, {});

      sessions.delete({ id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/sessions/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      sessions.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
  describe('#revoke', () => {
    const id = '6';

    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post(`/sessions/${id}/revoke`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      sessions.revoke({ id }).then(done.bind(null, null));
    });

    it(`should perform a revoke request to /sessions/${id}/revoke`, (done) => {
      sessions.revoke({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post(`/sessions/${id}/revoke`).reply(500, {});

      sessions.revoke({ id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/sessions/${id}/revoke`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      sessions.revoke({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
