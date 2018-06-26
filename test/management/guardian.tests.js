var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenants.auth0.com';

var GuardianManager = require(SRC_DIR + '/management/GuardianManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('GuardianManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.guardian = new GuardianManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['getGuardianEnrollment', 'deleteGuardianEnrollment'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.guardian[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(GuardianManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var manager = GuardianManager.bind(null, {});

      expect(manager).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var manager = GuardianManager.bind(null, { baseUrl: '' });

      expect(manager).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getGuardianEnrollment', function() {
    beforeEach(function() {
      this.data = {
        id: 'dev_0000000000000001'
      };
      this.params = { id: this.data.id };

      this.request = nock(API_URL)
        .get('/guardian/enrollments/' + this.data.id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.guardian.getGuardianEnrollment(this.params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.guardian
        .getGuardianEnrollment(this.params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/guardian/enrollment')
        .reply(500);

      this.guardian.getGuardianEnrollment(this.params).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = {
        id: 'dev_0000000000000001',
        status: 'pending',
        name: 'iPhone 7',
        identifier: '76dc-a90c-a88c-a90c-a88c-a88c-a90c',
        phone_number: '+1 999999999999',
        enrolled_at: '2016-07-12T17:56:26.804Z',
        last_auth: '2016-07-12T17:56:26.804Z'
      };
      var request = nock(API_URL)
        .get('/guardian/enrollments/' + data.id)
        .reply(200, data);

      this.guardian.getGuardianEnrollment(this.params).then(function(enrollment) {
        expect(enrollment).to.deep.equal(data);

        done();
      });
    });

    it('should perform a GET request to /api/v2/guardian/enrollments', function(done) {
      var request = this.request;

      var params = { id: this.data.id };
      this.guardian.getGuardianEnrollment(this.params).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/guardian/enrollments/' + this.data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.guardian.getGuardianEnrollment(this.params).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#deleteGuardianEnrollment', function() {
    beforeEach(function() {
      this.data = {
        id: 'dev_0000000000000001'
      };

      this.request = nock(API_URL)
        .delete('/guardian/enrollments/' + this.data.id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.guardian.deleteGuardianEnrollment(this.data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.guardian.deleteGuardianEnrollment(this.data).then(done.bind(null, null));
    });

    it('should perform a DELETE request to /guardian/enrollments/:id', function(done) {
      var request = this.request;

      this.guardian.deleteGuardianEnrollment(this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/guardian/enrollments/' + this.data.id)
        .reply(500);

      this.guardian.deleteGuardianEnrollment(this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/guardian/enrollments/' + this.data.id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.guardian.deleteGuardianEnrollment(this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
