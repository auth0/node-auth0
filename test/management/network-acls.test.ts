import nock from 'nock';
import {
  NetworkAclsManager,
  ManagementClient,
  PutNetworkAclsByIdRequest,
} from '../../src/index.js';

const API_URL = 'https://tenant.auth0.com/api/v2';

describe('NetworkAclsManager', () => {
  let request: nock.Scope;
  const token = 'TOKEN';

  const client = new ManagementClient({
    domain: 'tenant.auth0.com',
    token: token,
  });

  const networkAcls: NetworkAclsManager = client.networkAcls;

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new NetworkAclsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new NetworkAclsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    beforeEach(() => {
      request = nock(API_URL).get('/network-acls').reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      networkAcls.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/network-acls').reply(500, {});

      networkAcls.getAll().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = [{ description: 'network-acl 1' }];
      nock(API_URL).get('/network-acls').reply(200, data);

      networkAcls.getAll().then((result) => {
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBe(data.length);
        expect(result.data[0].description).toBe(data[0].description);
        done();
      });
    });

    it('should perform a GET request to /api/v2/network-acls', (done) => {
      networkAcls.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/network-acls')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      networkAcls.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const params = {
        page: 0,
        per_page: 5,
      };
      const request = nock(API_URL).get('/network-acls').query(params).reply(200, []);

      networkAcls.getAll(params).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#create', () => {
    const data: PutNetworkAclsByIdRequest = {
      priority: 2,
      description: 'Test ACL',
      active: true,
      rule: {
        action: {
          log: true,
        },
        match: {
          anonymous_proxy: true,
        },
        scope: 'authentication',
      },
    };

    beforeEach(() => {
      request = nock(API_URL).post('/network-acls').reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      networkAcls.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/network-acls').reply(500, {});

      networkAcls.create(data).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a POST request to /api/v2/network-acls', (done) => {
      networkAcls.create(data).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/network-acls', data as any)
        .reply(201, data);

      networkAcls.create(data).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#update', () => {
    const data = { id: 'acl_123' };

    const body: PutNetworkAclsByIdRequest = {
      priority: 3,
      description: 'Updated ACL',
      active: true,
      rule: {
        action: {
          block: true,
        },
        match: {
          anonymous_proxy: false,
        },
        scope: 'tenant',
      },
    };

    beforeEach(() => {
      request = nock(API_URL).put(`/network-acls/${data.id}`).reply(200, body);
    });

    it('should return a promise if no callback is given', (done) => {
      networkAcls
        .update(data, body as any)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).put(`/network-acls/${data.id}`).reply(500, {});

      networkAcls.update(data, body).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a PUT request to /api/v2/network-acls/:id', (done) => {
      networkAcls.update(data, body as any).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .put(`/network-acls/${data.id}`, body as any)
        .reply(200, body);

      networkAcls.update(data, body).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#delete', () => {
    const data = { id: 'acl_123' };

    beforeEach(() => {
      request = nock(API_URL).delete(`/network-acls/${data.id}`).reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      networkAcls.delete(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/network-acls/${data.id}`).reply(500, {});

      networkAcls.delete(data).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a DELETE request to /api/v2/network-acls/:id', (done) => {
      networkAcls.delete(data).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });
});
