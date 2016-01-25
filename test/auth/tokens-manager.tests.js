var expect = require('chai').expect;
var nock = require('nock');

var BASE_URL = 'https://tenant.auth0.com';

var Promise = require('bluebird');
var ArgumentError = require('../../src/exceptions/').ArgumentError;
var TokensManager = require('../../src/auth/TokensManager');


describe('TokensManager', function () {
  var validOptions = {
    baseUrl: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Test-Header': 'TEST'
    },
    clientId: 'CLIENT_ID'
  };

  afterEach(function () {
    nock.cleanAll();
  });


  describe('#constructor', function () {
    it('should require an options object', function () {
      expect(TokensManager)
        .to.throw(ArgumentError, 'Missing tokens manager options');
    });

    it('should require a base URL', function () {
      var manager = TokensManager.bind(null, {});

      expect(manager)
        .to.throw(ArgumentError, 'baseUrl field is required');
    });
  });


  describe('instance', function () {
    var methods = ['getInfo', 'getDelegationToken'];
    var manager = new TokensManager(validOptions);

    methods.forEach(function (methodName) {
      it('should have a ' + methodName + ' method', function () {
        expect(manager[methodName])
          .to.exist
          .to.be.an.instanceOf(Function);
      });
    });
  });


  describe('#getInfo', function () {
    var manager = new TokensManager(validOptions);
    var path = '/tokeninfo';

    beforeEach(function () {
      this.request = nock(BASE_URL)
        .post(path)
        .reply(200);
    });


    it('should require an ID token', function () {
      var getInfo = manager.getInfo.bind(manager);

      expect(getInfo)
        .to.throw(ArgumentError, 'An ID token is required');
    });


    it('should throw an error when the token is invalid', function () {
      var getInfo = manager.getInfo.bind(manager, '');

      expect(getInfo)
        .to.throw(ArgumentError, 'The ID token is not valid');
    });


    it('should not throw errors when the token is valid', function () {
      var getInfo = manager.getInfo.bind(manager, 'VALID_TOKEN');

      expect(getInfo)
        .to.not.throw(ArgumentError);
    });


    it('should accept a callback', function (done) {
      manager
        .getInfo('VALID_TOKEN', done.bind(null, null));
    });


    it('should return a promise when no callback is provided', function () {
      var returnValue = manager.getInfo('VALID_TOKEN');

      expect(returnValue)
        .to.be.an.instanceOf(Promise);
    });


    it('should not return a promise when a callback is provided', function () {
      var returnValue = manager.getInfo('VALID_TOKEN', function () {});

      expect(returnValue)
        .to.be.undefined;
    });


    it('should perform a POST request to ' + path, function (done) {
      var request = this.request;

      manager
        .getInfo('VALID_TOKEN')
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the headers specified in the instance options', function (done) {
      nock.cleanAll();

      var request = nock(BASE_URL)
        .post(path)
        .matchHeader('Content-Type', validOptions.headers['Content-Type'])
        .reply(200);

      manager
        .getInfo('VALID_TOKEN')
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should send the ID token in the body of the request', function (done) {
      nock.cleanAll();

      var request = nock(BASE_URL)
        .post(path, function (body) {
          return body.id_token === 'VALID_TOKEN';
        })
        .reply(200);

      manager
        .getInfo('VALID_TOKEN')
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#getDelegationToken', function () {
    var path = '/delegation';
    var manager = new TokensManager(validOptions);

    beforeEach(function () {
      this.request = nock(BASE_URL)
        .post(path)
        .reply(200);
    });


    it('should require a data object', function () {
      var getDelegationToken = manager.getDelegationToken.bind(manager);

      expect(getDelegationToken)
        .to.throw(ArgumentError, 'Missing token data object');
    });


    it('should require an ID token' ,function () {
      var data = {};
      var getDelegationToken = manager.getDelegationToken.bind(manager, data);

      expect(getDelegationToken)
        .to.throw(ArgumentError, 'id_token field is required');
    });


    it('should require a target client', function () {
      var data = { id_token: 'TEST_ID_TOKEN' };
      var getDelegationToken = manager.getDelegationToken.bind(manager, data);

      expect(getDelegationToken)
        .to.throw(ArgumentError, 'target field is required');
    });


    it('should require an API type', function () {
      var data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET'
      };
      var getDelegationToken = manager.getDelegationToken.bind(manager, data);

      expect(getDelegationToken)
        .to.throw(ArgumentError, 'api_type field is required');
    });


    it('should require an grant type', function () {
      var data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws'
      };
      var getDelegationToken = manager.getDelegationToken.bind(manager, data);

      expect(getDelegationToken)
        .to.throw(ArgumentError, 'grant_type field is required');
    });


    it('should accept a callback', function (done) {
      var data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE'
      };

      manager.getDelegationToken(data, done.bind(null, null));
    });


    it('should return a promise when no callback is given', function () {
      var data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE'
      };
      var returnValue = manager.getDelegationToken(data);

      expect(returnValue)
        .to.be.an.instanceOf(Promise);
    });


    it('should not return a promise when a callback is given', function () {
      var data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE'
      };
      var returnValue = manager.getDelegationToken(
        data,
        function () {}
      );

      expect(returnValue)
        .to.equal(undefined);
    });


    it('should perform a POST request to ' + path, function () {

    });

    it('should include the data in the body of the request', function (done) {
      nock.cleanAll();

      var data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE'
      };

      var request = nock(BASE_URL)
        .post(path, function (body) {
          for (var property in data) {
            if (body[property] !== data[property]) {
              return false;
            }
          }

          return true;
        })
        .reply();

      manager
        .getDelegationToken(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should use the instance client ID if none specified', function (done) {
      nock.cleanAll();

      var data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE'
      };

      var request = nock(BASE_URL)
        .post(path, function (body) {
          return body.client_id === validOptions.clientId;
        })
        .reply();

      manager
        .getDelegationToken(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should let the user override the default client ID', function (done) {
      nock.cleanAll();

      var data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE',
        client_id: 'OVERRIDEN_CLIENT_ID'
      };

      var request = nock(BASE_URL)
        .post(path, function (body) {
          return body.client_id === data.client_id;
        })
        .reply();

      manager
        .getDelegationToken(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the headers specified in the instance options', function (done) {
      nock.cleanAll();

      var data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE'
      };

      var request = nock(BASE_URL)
        .post(path)
        .matchHeader('Test-Header', validOptions.headers['Test-Header'])
        .reply(200);

      manager
        .getDelegationToken(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });

});
