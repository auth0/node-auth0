var expect = require('chai').expect;
var nock = require('nock');
var Promise = require('bluebird');

var BASE_URL = 'https://tenant.auth0.com';
var CLIENT_ID = 'TEST_CLIENT_ID';
var ACCESS_TOKEN = 'TEST_ACCESS_TOKEN'

var ArgumentError = require('../../src/exceptions').ArgumentError;
var UsersManager = require('../../src/auth/UsersManager');


describe('UsersManager', function () {
  var options = {
    baseUrl: BASE_URL,
    clientId: CLIENT_ID,
    headers: {
      'Content-Type': 'application/json'
    },
    accessToken: ACCESS_TOKEN,
  };

  afterEach(function () {
    nock.cleanAll();
  });


  describe('#constructor', function () {
    it ('should require an options object', function () {
      expect(UsersManager)
        .to.throw(ArgumentError, 'Missing users manager options');
    });


    it ('should require a base URL', function () {
      expect(UsersManager.bind(null, {}))
        .to.throw(ArgumentError, 'baseUrl field is required');
    });
  });


  describe('instance', function () {
    var manager = new UsersManager(options);
    var methods = ['getInfo', 'impersonate'];

    methods.forEach(function (methodName) {
      it('should have a ' + methodName + ' method', function () {
        expect(manager[methodName])
          .to.exist
          .to.be.an.instanceOf(Function);
      });
    });
  });


  describe('#getInfo', function () {
    var manager = new UsersManager(options);
    var path = '/userinfo';

    beforeEach(function () {
      this.request = nock(BASE_URL)
        .get(path)
        .reply(200);
    });


    it('should require an access token', function () {
      var getInfo = manager.getInfo.bind(manager);

      expect(getInfo)
        .to.throw(ArgumentError, 'An access token is required');
    });


    it('should throw an error when the token is invalid', function () {
      var getInfo = manager.getInfo.bind(manager, '');

      expect(getInfo)
        .to.throw(ArgumentError, 'Invalid access token');
    });


    it('should not throw errors when the token is valid', function () {
      var getInfo = manager.getInfo.bind(manager, 'VALID_TOKEN');

      expect(getInfo)
        .to.not.throw(ArgumentError);
    });


    it('should accept a callback', function (done) {
      manager
        .getInfo('ACCESS_TOKEN', done.bind(null, null))
    });


    it('should not return a promise when a callback is provided', function () {
      var returnValue = manager.getInfo('ACCESS_TOKEN', function () {});

      expect(returnValue)
        .to.equal(undefined);
    });


    it('should return a promise when no callback is provided', function () {
      var returnValue = manager.getInfo('ACCESS_TOKEN');

      expect(returnValue)
        .to.be.an.instanceOf(Promise);
    });


    it('should perform a GET request to ' + path, function (done) {
      var request = this.request;

      manager
        .getInfo('ACCESS_TOKEN')
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should include the headers specified in the UsersManager options', function (done) {
      nock.cleanAll();

      var request = nock(BASE_URL)
        .get('/userinfo')
        .matchHeader('Content-Type', options.headers['Content-Type'])
        .reply(200);

      manager
        .getInfo('ACCESS_TOKEN')
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should send the access token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(BASE_URL)
        .get('/userinfo')
        .matchHeader('Authorization', 'Bearer ACCESS_TOKEN')
        .reply(200);

      manager
        .getInfo('ACCESS_TOKEN')
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });
  });


  describe('#impersonate', function () {
    var USER_ID = encodeURIComponent('github|12345');
    var manager = new UsersManager(options);
    var path = '/users/' + USER_ID + '/impersonate';

    beforeEach(function () {
      this.request = nock(BASE_URL)
        .post(path)
        .reply(200);
    });


    it('should require a user ID', function () {
      var impersonate = manager.impersonate.bind(manager);

      expect(impersonate)
        .to.throw(ArgumentError, 'You must specify a user ID');
    });


    it('should throw an error when the user ID is not valid', function () {
      var impersonate = manager.impersonate.bind(manager, '');

      expect(impersonate)
        .to.throw(ArgumentError, 'The user ID is not valid');
    });


    it('should require the impersonation settings object', function () {
      var impersonate = manager.impersonate.bind(manager, USER_ID);

      expect(impersonate)
        .to.throw(ArgumentError, 'Missing impersonation settings object');
    });


    it('should require an impersonator ID', function () {
      var impersonate = manager.impersonate.bind(manager, USER_ID, {});

      expect(impersonate)
        .to.throw(ArgumentError, 'impersonator_id field is required');
    });


    it('should require a protocol', function () {
      var settings = {
        impersonator_id: 'auth0|12345'
      };
      var impersonate = manager.impersonate.bind(manager, USER_ID, settings);

      expect(impersonate)
        .to.throw(ArgumentError, 'protocol field is required');
    });


    it('should accept a callback', function (done) {
      var settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2'
      };

      manager.impersonate(USER_ID, settings, done.bind(null, null));
    });


    it('should not return a promise when a callback is provided', function () {
      var settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2'
      };
      var returnValue = manager.impersonate(
        USER_ID,
        settings,
        function () {}
      );

      expect(returnValue)
        .to.equal(undefined);
    });


    it('should return a promise when no callback is provided', function () {
      var settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2'
      };
      var returnValue = manager.impersonate(USER_ID, settings);

      expect(returnValue)
        .to.be.an.instanceOf(Promise);
    });


    it('should perform a POST request to ' + path, function (done) {
      var request = this.request;
      var settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2'
      };

      manager
        .impersonate(USER_ID, settings)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        })
        .catch(done);
    });


    it('should use the default client ID', function (done) {
      nock.cleanAll();

      var settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2'
      };
      var request = nock(BASE_URL)
        .post(path, function (body) {
          return body.client_id === CLIENT_ID
        })
        .reply(200);

      manager
        .impersonate(USER_ID, settings)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should allow the user to override the client ID', function (done) {
      nock.cleanAll();

      var settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        client_id: 'OVERRIDEN_CLIENT_ID'
      };
      var request = nock(BASE_URL)
        .post(path, function (body) {
          return body.client_id === 'OVERRIDEN_CLIENT_ID'
        })
        .reply(200);

      manager
        .impersonate(USER_ID, settings)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should use the default headers', function (done) {
      nock.cleanAll();

      var settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
      };
      var request = nock(BASE_URL)
        .post(path)
        .matchHeader('Content-Type', options.headers['Content-Type'])
        .reply(200);

      manager
        .impersonate(USER_ID, settings)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should allow the user to add additional parameters', function (done) {
      nock.cleanAll();

      var settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        additionalParameters: {
          response_type: 'code'
        }
      };
      var request = nock(BASE_URL)
        .post(path, function (body) {
          return body.additionalParameters.response_type === 'code';
        })
        .reply(200);

      manager
        .impersonate(USER_ID, settings)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });

    });
  });

});
