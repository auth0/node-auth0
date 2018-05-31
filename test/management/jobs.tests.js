var path = require('path');
var expect = require('chai').expect;
var nock = require('nock');
var extractParts = require('../utils').extractParts;
var fs = require('fs');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var JobsManager = require(SRC_DIR + '/management/JobsManager');
var ArgumentError = require('rest-facade').ArgumentError;

var token = 'TOKEN';

describe('JobsManager', function() {
  before(function() {
    this.id = 'testJob';
    this.jobs = new JobsManager({
      tokenProvider: {
        getAccessToken: function() {
          return Promise.resolve(token);
        }
      },
      headers: {},
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['verifyEmail', 'importUsers', 'get'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.jobs[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(JobsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = JobsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = JobsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/jobs/' + this.id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.jobs.get({ id: this.id }, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.jobs
        .get({ id: this.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/jobs/' + this.id)
        .reply(500);

      this.jobs.get({ id: this.id }).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/jobs/' + this.id)
        .reply(200, data);

      this.jobs.get({ id: this.id }).then(function(blacklistedTokens) {
        expect(blacklistedTokens).to.be.an.instanceOf(Array);

        expect(blacklistedTokens.length).to.equal(data.length);

        expect(blacklistedTokens[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/jobs', function(done) {
      var request = this.request;

      this.jobs.get({ id: this.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/jobs/' + this.id)
        .matchHeader('Authorization', 'Bearer ' + token)
        .reply(200);

      this.jobs.get({ id: this.id }).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/jobs/' + this.id)
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200);

      this.jobs.get({ id: this.id, include_fields: true, fields: 'test' }).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  const usersFilePath = path.join(__dirname, '../data/users.json');

  describe('#importUsers', function() {
    var data = {
      users: usersFilePath,
      connection_id: 'con_test'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/jobs/users-imports')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.jobs.importUsers(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.jobs
        .importUsers(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass request errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/jobs/users-imports')
        .replyWithError('printer on fire');

      this.jobs.importUsers(data).catch(function(err) {
        expect(err.message).to.equal('printer on fire');
        done();
      });
    });

    it('should pass HTTP errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/jobs/users-imports')
        .reply(500);

      this.jobs.importUsers(data).catch(function(err) {
        expect(err.message).to.equal(
          'cannot POST https://tenant.auth0.com/jobs/users-imports (500)'
        );
        done();
      });
    });

    it('should perform a POST request to /api/v2/jobs/users-imports', function(done) {
      var request = this.request;

      this.jobs.importUsers(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should be a multipart request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/jobs/users-imports')
        .matchHeader('Content-Type', function(header) {
          return header.indexOf('multipart/form-data') === 0;
        })
        .reply(200);

      this.jobs.importUsers(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should have two parts: connection_id and users file', function(done) {
      nock.cleanAll();
      var boundary = null;

      var request = nock(API_URL)
        .matchHeader('Content-Type', function(header) {
          boundary = '--' + header.match(/boundary=([^\n]*)/)[1];

          return true;
        })
        .post('/jobs/users-imports', function(body) {
          var parts = extractParts(body, boundary);

          // Validate the connection id.
          expect(parts.connection_id)
            .to.exist.to.be.a('string')
            .to.equal(data.connection_id);

          // Validate the content type of the users JSON.
          expect(parts.users)
            .to.exist.to.be.a('string')
            .to.contain('Content-Type: application/json');

          // Validate the content of the users JSON.
          const users = JSON.parse(parts.users.split('\r\n').slice(-1)[0]);
          expect(users.length).to.equal(2);
          expect(users[0].email).to.equal('jane.doe@contoso.com');

          return true;
        })
        .reply(200);

      this.jobs.importUsers(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/jobs/users-imports')
        .matchHeader('Authorization', 'Bearer ' + token)
        .reply(200);

      this.jobs.importUsers(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#importUsers with JSON data', function() {
    var data = {
      users_json: fs.readFileSync(usersFilePath, 'utf8'),
      connection_id: 'con_test'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/jobs/users-imports')
        .reply(200);
    });

    it('should correctly include user JSON', function(done) {
      nock.cleanAll();
      var boundary = null;

      var request = nock(API_URL)
        .matchHeader('Content-Type', function(header) {
          boundary = '--' + header.match(/boundary=([^\n]*)/)[1];

          return true;
        })
        .post('/jobs/users-imports', function(body) {
          var parts = extractParts(body, boundary);

          // Validate the content type of the users JSON.
          expect(parts.users)
            .to.exist.to.be.a('string')
            .to.contain('Content-Type: application/json');

          // Validate the content of the users JSON.
          const users = JSON.parse(parts.users.split('\r\n').slice(-1)[0]);
          expect(users.length).to.equal(2);
          expect(users[0].email).to.equal('jane.doe@contoso.com');

          return true;
        })
        .reply(200);

      this.jobs.importUsers(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#verifyEmail', function() {
    var data = {
      user_id: 'github|12345'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/jobs/verification-email')
        .reply(200, data);
    });

    it('should accept a callback', function(done) {
      this.jobs.verifyEmail(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.jobs
        .verifyEmail(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/jobs/verification-email')
        .reply(500);

      this.jobs.verifyEmail(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/jobs/verification-email', function(done) {
      var request = this.request;

      this.jobs.verifyEmail(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/jobs/verification-email', data)
        .reply(200);

      this.jobs.verifyEmail(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/jobs/verification-email')
        .matchHeader('Authorization', 'Bearer ' + token)
        .reply(200);

      this.jobs.verifyEmail(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
