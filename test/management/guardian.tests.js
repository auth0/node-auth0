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
    var methods = [
      'getGuardianEnrollment',
      'deleteGuardianEnrollment',
      'getFactors',
      'getFactorProvider',
      'updateFactorProvider',
      'getFactorTemplates',
      'updateFactorTemplates',
      'updateFactor'
    ];

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

  describe('#createEnrollmentTicket', function() {
    var data = {
      user_id: '',
      email: '',
      send_mail: false
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/guardian/enrollments/ticket')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.guardian.createEnrollmentTicket(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.guardian
        .createEnrollmentTicket(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/guardian/enrollments/ticket')
        .reply(500);

      this.guardian.createEnrollmentTicket(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/guardian/enrollments/ticket', function(done) {
      var request = this.request;

      this.guardian.createEnrollmentTicket(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/guardian/enrollments/ticket', data)
        .reply(200);

      this.guardian.createEnrollmentTicket(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/guardian/enrollments/ticket')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.guardian.createEnrollmentTicket(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getFactors', function() {
    beforeEach(function() {
      this.data = [
        { name: 'sms', enabled: true, trial_expired: false },
        { name: 'push-notification', enabled: false, trial_expired: false },
        { name: 'otp', enabled: false, trial_expired: false },
        { name: 'email', enabled: false, trial_expired: false },
        { name: 'duo', enabled: false, trial_expired: false }
      ];

      this.request = nock(API_URL)
        .get('/guardian/factors')
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.guardian.getFactors(done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.guardian
        .getFactors()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/guardian/factors', function(done) {
      var request = this.request;

      this.guardian.getFactors().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/guardian/factors')
        .reply(500);

      this.guardian.getFactors().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/guardian/factors')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.guardian.getFactors().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getFactorProvider', function() {
    beforeEach(function() {
      this.params = { factor: 'sms', provider: 'twilio' };
      this.data = {
        from: '+1223323',
        messaging_service_sid: '5dEkAiHLPCuQ1uJj4qNXcAnERFAL6cpq',
        auth_token: 'zw5Ku6z2sxhd0ZVXto5SDHX6KPDByJPU',
        sid: 'wywA2BH4VqTpfywiDuyDAYZL3xQjoO40'
      };

      this.request = nock(API_URL)
        .get('/guardian/factors/' + this.params.factor + '/providers/' + this.params.provider)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.guardian.getFactorProvider(this.params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.guardian
        .getFactorProvider(this.params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/guardian/factors/sms/twilio', function(done) {
      var request = this.request;

      this.guardian.getFactorProvider(this.params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('guardian/factors/' + this.params.factor + '/providers/' + this.params.provider)
        .reply(500);

      this.guardian.getFactorProvider(this.params).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/guardian/factors/' + this.params.factor + '/providers/' + this.params.provider)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.guardian.getFactorProvider(this.params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateFactorProvider', function() {
    beforeEach(function() {
      this.params = { factor: 'sms', provider: 'twilio' };
      this.data = {
        from: '+1223323',
        messaging_service_sid: '5dEkAiHLPCuQ1uJj4qNXcAnERFAL6cpq',
        auth_token: 'zw5Ku6z2sxhd0ZVXto5SDHX6KPDByJPU',
        sid: 'wywA2BH4VqTpfywiDuyDAYZL3xQjoO40'
      };
    });

    it('should accept a callback', function(done) {
      this.guardian.updateFactorProvider({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.guardian
        .updateFactorProvider(this.params, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PUT request to /api/v2/guardian/factors/sms/providers/twilio', function(done) {
      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor + '/providers/' + this.params.provider)
        .reply(200, this.data);

      this.guardian.updateFactorProvider(this.params, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor + '/providers/' + this.params.provider)
        .reply(200);

      this.guardian.updateFactorProvider(this.params, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor + '/providers/' + this.params.provider)
        .reply(500);

      this.guardian.updateFactorProvider(this.params, this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor + '/providers/' + this.params.provider)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.guardian.updateFactorProvider(this.params, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getFactorTemplates', function() {
    beforeEach(function() {
      this.params = { factor: 'sms' };

      this.data = {
        enrollment_message:
          '{{code}} is your verification code for {{tenant.friendly_name}}. Please enter this code to verify your enrollment.',
        verification_message: '{{code}} is your verification code for {{tenant.friendly_name}}'
      };

      this.request = nock(API_URL)
        .get('/guardian/factors/sms/templates')
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.guardian.getFactorTemplates(this.params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.guardian
        .getFactorTemplates(this.params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/guardian/factors/sms/templates', function(done) {
      var request = this.request;

      this.guardian.getFactorTemplates(this.params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/guardian/factors/sms/templates')
        .reply(500);

      this.guardian.getFactorTemplates(this.params).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/guardian/factors/sms/templates')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.guardian.getFactorTemplates(this.params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateFactorTemplates', function() {
    beforeEach(function() {
      this.params = { factor: 'sms' };
      this.data = {
        enrollment_message:
          '{{code}} is your verification code for {{tenant.friendly_name}}. Please enter this code to verify your enrollment.',
        verification_message: '{{code}} is your verification code for {{tenant.friendly_name}}'
      };
    });

    it('should accept a callback', function(done) {
      this.guardian.updateFactorTemplates(this.params, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.guardian
        .updateFactorTemplates(this.params, this.data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PUT request to /api/v2/guardian/factors/sms/templates', function(done) {
      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor + '/templates')
        .reply(200, this.data);

      this.guardian.updateFactorTemplates(this.params, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor + '/templates')
        .reply(200);

      this.guardian.updateFactorTemplates(this.params, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor + '/templates')
        .reply(500);

      this.guardian.updateFactorTemplates(this.params, this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor + '/templates')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.guardian.updateFactorTemplates(this.params, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateFactor', function() {
    beforeEach(function() {
      this.params = { factor: 'sms' };
      this.data = {
        enabled: true
      };
    });

    it('should accept a callback', function(done) {
      this.guardian.updateFactor(this.params, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.guardian
        .updateFactor(this.params, this.data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PUT request to /api/v2/guardian/factors/sms', function(done) {
      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor)
        .reply(200, this.data);

      this.guardian.updateFactor(this.params, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor)
        .reply(200);

      this.guardian.updateFactor(this.params, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor)
        .reply(500);

      this.guardian.updateFactor(this.params, this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .put('/guardian/factors/' + this.params.factor)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.guardian.updateFactor(this.params, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
