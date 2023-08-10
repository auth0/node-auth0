import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { UserBlocksManager, ManagementClient, RequiredError } from '../../src/index.js';

describe('UserBlocksManager', () => {
  let userBlocks: UserBlocksManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    userBlocks = client.userBlocks;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new UserBlocksManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new UserBlocksManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#get', () => {
    const id = 'USER_5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get(`/user-blocks/${id}`).reply(200, []);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no id is provided', async () => {
      await expect(userBlocks.get({} as any)).rejects.toThrowError(RequiredError);
    });

    it('should return a promise when no callback is given', (done) => {
      expect(userBlocks.get({ id }).then(() => done())).toBeInstanceOf(Promise);
    });

    it(`should perform a get request to /user-blocks/${id}`, async () => {
      await userBlocks.get({ id });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/user-blocks/${id}`).reply(500, {});

      userBlocks
        .get({ id })
        .catch((err) => {
          expect(err).toBeDefined();

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/user-blocks/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      await userBlocks.get({ id });
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#delete', () => {
    const id = 'USER_5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/user-blocks/${id}`).reply(200, {});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no id is provided', async () => {
      await expect(userBlocks.delete({} as any)).rejects.toThrowError(RequiredError);
    });

    it('should return a promise when no callback is given', (done) => {
      expect(userBlocks.delete({ id }).then(() => done())).toBeInstanceOf(Promise);
    });

    it(`should perform a delete request to /user-blocks/${id}`, async () => {
      await userBlocks.delete({ id });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/user-blocks/${id}`).reply(500, {});

      userBlocks
        .delete({ id })
        .catch((err) => {
          expect(err).toBeDefined();

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/user-blocks/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      await userBlocks.delete({ id });
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#getAll', () => {
    const identifier = 'USER_5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/user-blocks').query({ identifier }).reply(200, []);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no identifier is provided', async () => {
      await expect(userBlocks.getAll({} as any)).rejects.toThrowError(RequiredError);
    });

    it('should return a promise when no callback is given', (done) => {
      expect(userBlocks.getAll({ identifier }).then(() => done())).toBeInstanceOf(Promise);
    });

    it('should perform a get request to /user-blocks', async () => {
      await userBlocks.getAll({ identifier });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/user-blocks').query({ identifier }).reply(500, {});

      userBlocks
        .getAll({ identifier })
        .catch((err) => {
          expect(err).toBeDefined();

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/user-blocks')
        .query({ identifier })
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      await userBlocks.getAll({ identifier });
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#deleteByIdentifier', () => {
    const identifier = 'USER_5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete('/user-blocks').query({ identifier }).reply(200, {});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no identifier is provided', async () => {
      await expect(userBlocks.deleteAll({} as any)).rejects.toThrowError(RequiredError);
    });

    it('should return a promise when no callback is given', (done) => {
      expect(userBlocks.deleteAll({ identifier }).then(() => done())).toBeInstanceOf(Promise);
    });

    it('should perform a delete request to /user-blocks', async () => {
      await userBlocks.deleteAll({ identifier });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete('/user-blocks').query({ identifier }).reply(500, {});

      userBlocks
        .deleteAll({ identifier })
        .catch((err) => {
          expect(err).toBeDefined();

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete('/user-blocks')
        .query({ identifier })
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      await userBlocks.deleteAll({ identifier });
      expect(request.isDone()).toBe(true);
    });
  });
});
