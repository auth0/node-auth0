const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenants.auth0.com';

const UserBlocksManager = require(`../../src/management/UserBlocksManager`);
const { ArgumentError } = require('rest-facade');

describe('UserBlocksManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.userBlocks = new UserBlocksManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['get', 'delete', 'getByIdentifier', 'deleteByIdentifier'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.userBlocks[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new UserBlocksManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new UserBlocksManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new UserBlocksManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#get', () => {
    const id = 'USER_5';

    beforeEach(function () {
      this.request = nock(API_URL).get(`/user-blocks/${id}`).reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no id is provided', function () {
      const { userBlocks } = this;

      expect(() => {
        userBlocks.get({});
      }).to.throw(ArgumentError, 'You must provide an user id for the get method');
    });

    it('should accept a callback', function (done) {
      this.userBlocks.get({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.userBlocks.get({ id }).then(done.bind(null, null));
    });

    it(`should perform a get request to /user-blocks/${id}`, function (done) {
      const { request } = this;

      this.userBlocks
        .get({ id })
        .then(() => {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/user-blocks/${id}`).reply(500);

      this.userBlocks
        .get({ id })
        .catch((err) => {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/user-blocks/${id}`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.userBlocks
        .get({ id })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });

  describe('#delete', () => {
    const id = 'USER_5';

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/user-blocks/${id}`).reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no id is provided', function () {
      const { userBlocks } = this;

      expect(() => {
        userBlocks.delete({});
      }).to.throw(ArgumentError, 'You must provide an user id for the delete method');
    });

    it('should accept a callback', function (done) {
      this.userBlocks.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.userBlocks.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /user-blocks/${id}`, function (done) {
      const { request } = this;

      this.userBlocks
        .delete({ id })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/user-blocks/${id}`).reply(500);

      this.userBlocks
        .delete({ id })
        .catch((err) => {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/user-blocks/${id}`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.userBlocks
        .delete({ id })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });

  describe('#getByIdentifier', () => {
    const identifier = 'USER_5';

    beforeEach(function () {
      this.request = nock(API_URL).get('/user-blocks').query({ identifier }).reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no identifier is provided', function () {
      const { userBlocks } = this;

      expect(() => {
        userBlocks.getByIdentifier({});
      }).to.throw(
        ArgumentError,
        'You must provide an user identifier for the getByIdentifier method'
      );
    });

    it('should accept a callback', function (done) {
      this.userBlocks.getByIdentifier({ identifier }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.userBlocks.getByIdentifier({ identifier }).then(done.bind(null, null));
    });

    it('should perform a get request to /user-blocks', function (done) {
      const { request } = this;

      this.userBlocks
        .getByIdentifier({ identifier })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/user-blocks').query({ identifier }).reply(500);

      this.userBlocks
        .getByIdentifier({ identifier })
        .catch((err) => {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/user-blocks')
        .query({ identifier })
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.userBlocks
        .getByIdentifier({ identifier })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });

  describe('#deleteByIdentifier', () => {
    const identifier = 'USER_5';

    beforeEach(function () {
      this.request = nock(API_URL).delete('/user-blocks').query({ identifier }).reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw an error when no identifier is provided', function () {
      const { userBlocks } = this;

      expect(() => {
        userBlocks.deleteByIdentifier({});
      }).to.throw(
        ArgumentError,
        'You must provide an user identifier for the deleteByIdentifier method'
      );
    });

    it('should accept a callback', function (done) {
      this.userBlocks.deleteByIdentifier({ identifier }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.userBlocks.deleteByIdentifier({ identifier }).then(done.bind(null, null));
    });

    it('should perform a delete request to /user-blocks', function (done) {
      const { request } = this;

      this.userBlocks
        .deleteByIdentifier({ identifier })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete('/user-blocks').query({ identifier }).reply(500);

      this.userBlocks
        .deleteByIdentifier({ identifier })
        .catch((err) => {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete('/user-blocks')
        .query({ identifier })
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.userBlocks
        .deleteByIdentifier({ identifier })
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });
});
