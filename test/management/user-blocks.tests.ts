import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { RequiredError, UserBlocksManager } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('UserBlocksManager', () => {
  let userBlocks: UserBlocksManager;
  const token = 'TOKEN';

  before(function () {
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
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new UserBlocksManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#get', () => {
    const id = 'USER_5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/user-blocks/${id}`).reply(200, []);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no id is provided', function () {
      expect(userBlocks.get({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise when no callback is given', function () {
      expect(userBlocks.get({ id })).instanceOf(Promise);
    });

    it(`should perform a get request to /user-blocks/${id}`, async function () {
      await userBlocks.get({ id });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/user-blocks/${id}`).reply(500);

      userBlocks
        .get({ id })
        .catch((err) => {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/user-blocks/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      await userBlocks.get({ id });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#delete', () => {
    const id = 'USER_5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/user-blocks/${id}`).reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no id is provided', function () {
      expect(userBlocks.delete({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should accept a callback', function (done) {
      userBlocks.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function () {
      expect(userBlocks.delete({ id })).instanceOf(Promise);
    });

    it(`should perform a delete request to /user-blocks/${id}`, async function () {
      await userBlocks.delete({ id });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/user-blocks/${id}`).reply(500);

      userBlocks
        .delete({ id })
        .catch((err) => {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/user-blocks/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await userBlocks.delete({ id });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getAll', () => {
    const identifier = 'USER_5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/user-blocks').query({ identifier }).reply(200, []);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no identifier is provided', function () {
      expect(userBlocks.getAll({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.identifier was null or undefined.`
      );
    });

    it('should return a promise when no callback is given', function () {
      expect(userBlocks.getAll({ identifier })).instanceOf(Promise);
    });

    it('should perform a get request to /user-blocks', async function () {
      await userBlocks.getAll({ identifier });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/user-blocks').query({ identifier }).reply(500);

      userBlocks
        .getAll({ identifier })
        .catch((err) => {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/user-blocks')
        .query({ identifier })
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      await userBlocks.getAll({ identifier });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#deleteByIdentifier', () => {
    const identifier = 'USER_5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete('/user-blocks').query({ identifier }).reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no identifier is provided', function () {
      expect(userBlocks.deleteAll({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.identifier was null or undefined.`
      );
    });

    it('should return a promise when no callback is given', function () {
      expect(userBlocks.deleteAll({ identifier })).instanceOf(Promise);
    });

    it('should perform a delete request to /user-blocks', async function () {
      await userBlocks.deleteAll({ identifier });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete('/user-blocks').query({ identifier }).reply(500);

      userBlocks
        .deleteAll({ identifier })
        .catch((err) => {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete('/user-blocks')
        .query({ identifier })
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await userBlocks.deleteAll({ identifier });
      expect(request.isDone()).to.be.true;
    });
  });
});
