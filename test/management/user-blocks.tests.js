var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenants.auth0.com';

var UserBlocksManager = require(SRC_DIR + '/management/UserBlocksManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('UserBlocksManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.userBlocks = new UserBlocksManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['get', 'delete', 'getByIdentifier', 'deleteByIdentifier'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.userBlocks[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(UserBlocksManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var manager = UserBlocksManager.bind(null, {});

      expect(manager).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var manager = UserBlocksManager.bind(null, { baseUrl: '' });

      expect(manager).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#get', function() {
    var id = 'USER_5';

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/user-blocks/' + id)
        .reply(200);
    });

    afterEach(function() {
      nock.cleanAll();
    });

    it('should throw an error when no id is provided', function() {
      var userBlocks = this.userBlocks;

      expect(function() {
        userBlocks.get({});
      }).to.throw(ArgumentError, 'You must provide an user id for the get method');
    });

    it('should accept a callback', function(done) {
      this.userBlocks.get({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.userBlocks.get({ id }).then(done.bind(null, null));
    });

    it('should perform a get request to /user-blocks/' + id, function(done) {
      var request = this.request;

      this.userBlocks
        .get({ id })
        .then(function() {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      nock(API_URL)
        .get('/user-blocks/' + id)
        .reply(500);

      this.userBlocks
        .get({ id })
        .catch(function(err) {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/user-blocks/' + id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.userBlocks
        .get({ id })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });

  describe('#delete', function() {
    var id = 'USER_5';

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/user-blocks/' + id)
        .reply(200);
    });

    afterEach(function() {
      nock.cleanAll();
    });

    it('should throw an error when no id is provided', function() {
      var userBlocks = this.userBlocks;

      expect(function() {
        userBlocks.delete({});
      }).to.throw(ArgumentError, 'You must provide an user id for the delete method');
    });

    it('should accept a callback', function(done) {
      this.userBlocks.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.userBlocks.delete({ id }).then(done.bind(null, null));
    });

    it('should perform a delete request to /user-blocks/' + id, function(done) {
      var request = this.request;

      this.userBlocks
        .delete({ id })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      nock(API_URL)
        .delete('/user-blocks/' + id)
        .reply(500);

      this.userBlocks
        .delete({ id })
        .catch(function(err) {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/user-blocks/' + id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.userBlocks
        .delete({ id })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });

  describe('#getByIdentifier', function() {
    var identifier = 'USER_5';

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/user-blocks')
        .query({ identifier })
        .reply(200);
    });

    afterEach(function() {
      nock.cleanAll();
    });

    it('should throw an error when no identifier is provided', function() {
      var userBlocks = this.userBlocks;

      expect(function() {
        userBlocks.getByIdentifier({});
      }).to.throw(
        ArgumentError,
        'You must provide an user identifier for the getByIdentifier method'
      );
    });

    it('should accept a callback', function(done) {
      this.userBlocks.getByIdentifier({ identifier }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.userBlocks.getByIdentifier({ identifier }).then(done.bind(null, null));
    });

    it('should perform a get request to /user-blocks', function(done) {
      var request = this.request;

      this.userBlocks
        .getByIdentifier({ identifier })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      nock(API_URL)
        .get('/user-blocks')
        .query({ identifier })
        .reply(500);

      this.userBlocks
        .getByIdentifier({ identifier })
        .catch(function(err) {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/user-blocks')
        .query({ identifier })
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.userBlocks
        .getByIdentifier({ identifier })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });

  describe('#deleteByIdentifier', function() {
    var identifier = 'USER_5';

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/user-blocks')
        .query({ identifier })
        .reply(200);
    });

    afterEach(function() {
      nock.cleanAll();
    });

    it('should throw an error when no identifier is provided', function() {
      var userBlocks = this.userBlocks;

      expect(function() {
        userBlocks.deleteByIdentifier({});
      }).to.throw(
        ArgumentError,
        'You must provide an user identifier for the deleteByIdentifier method'
      );
    });

    it('should accept a callback', function(done) {
      this.userBlocks.deleteByIdentifier({ identifier }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.userBlocks.deleteByIdentifier({ identifier }).then(done.bind(null, null));
    });

    it('should perform a delete request to /user-blocks', function(done) {
      var request = this.request;

      this.userBlocks
        .deleteByIdentifier({ identifier })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      nock(API_URL)
        .delete('/user-blocks')
        .query({ identifier })
        .reply(500);

      this.userBlocks
        .deleteByIdentifier({ identifier })
        .catch(function(err) {
          expect(err).to.exist;

          done();
        })
        .catch(done);
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/user-blocks')
        .query({ identifier })
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.userBlocks
        .deleteByIdentifier({ identifier })
        .then(function() {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });
});
