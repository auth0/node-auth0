const { expect } = require('chai');
const nock = require('nock');

const SRC_DIR = '../../src';
const API_URL = 'https://tenant.auth0.com';

const AttackProtectionManager = require(`${SRC_DIR}/management/AttackProtectionManager`);
const { ArgumentError } = require('rest-facade');

describe('AttackProtectionManager', () => {
  const bruteForcePath = '/attack-protection/brute-force-protection';
  const suspiciousIpPath = '/attack-protection/suspicious-ip-throttling';
  const breachedPasswordDetectionPath = '/attack-protection/breached-password-detection';

  before(function () {
    this.token = 'TOKEN';
    this.attackProtection = new AttackProtectionManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = [
      'getBruteForceConfig',
      'updateBruteForceConfig',
      'getSuspiciousIpThrottlingConfig',
      'updateSuspiciousIpThrottlingConfig',
      'getBreachedPasswordDetectionConfig',
      'updateBreachedPasswordDetectionConfig',
    ];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.attackProtection[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => new AttackProtectionManager()).to.throw(
        ArgumentError,
        'Must provide manager options'
      );
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => new AttackProtectionManager({})).to.throw(
        ArgumentError,
        'Must provide a base URL for the API'
      );
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => new AttackProtectionManager({ baseUrl: '' })).to.throw(
        ArgumentError,
        'The provided base URL is invalid'
      );
    });
  });

  describe('Brute Force Protection', () => {
    const data = {
      enabled: true,
      shields: ['user_notification', 'block'],
      mode: 'count_per_identifier_and_ip',
      allowlist: ['1.1.2.2'],
      max_attempts: 100,
    };

    describe('#getBruteForceConfig', () => {
      beforeEach(function () {
        this.request = nock(API_URL).get(bruteForcePath).reply(200, data);
      });

      it('should accept a callback', function (done) {
        this.attackProtection.getBruteForceConfig({}, () => {
          done();
        });
      });

      it('should return a promise if no callback is given', function (done) {
        this.attackProtection
          .getBruteForceConfig()
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(bruteForcePath).reply(500);

        this.attackProtection.getBruteForceConfig().catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        this.attackProtection.getBruteForceConfig().then((bruteForceConfig) => {
          expect(bruteForceConfig).to.deep.equal(data);

          done();
        });
      });

      it(`should perform a GET request to /api/v2${bruteForcePath}`, function (done) {
        const { request } = this;

        this.attackProtection.getBruteForceConfig().then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(bruteForcePath)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200);

        this.attackProtection.getBruteForceConfig().then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#updateBruteForceConfig', () => {
      beforeEach(function () {
        this.request = nock(API_URL).patch(bruteForcePath).reply(200, data);
      });

      it('should accept a callback', function (done) {
        this.attackProtection.updateBruteForceConfig({}, data, () => {
          done();
        });
      });

      it('should return a promise if no callback is given', function (done) {
        this.attackProtection
          .updateBruteForceConfig({}, data)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(bruteForcePath).reply(500);

        this.attackProtection.updateBruteForceConfig({}, data).catch((err) => {
          expect(err).to.exist.to.be.an.instanceOf(Error);

          done();
        });
      });

      it(`should perform a PATCH request to /api/v2${bruteForcePath}`, function (done) {
        const { request } = this;

        this.attackProtection.updateBruteForceConfig({}, {}).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the data in the body of the request', function (done) {
        const { request } = this;

        this.attackProtection.updateBruteForceConfig({}, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        this.attackProtection.updateBruteForceConfig({}, data).then((bruteForceConfig) => {
          expect(bruteForceConfig).to.deep.equal(data);

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(bruteForcePath)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200);

        this.attackProtection.updateBruteForceConfig({}, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });

  describe('Suspicious IP Throttling', () => {
    const data = {
      enabled: true,
      shields: ['admin_notification', 'block'],
      allowlist: ['1.1.1.0'],
      stage: {
        'pre-login': {
          max_attempts: 1,
          rate: 864000,
        },
        'pre-user-registration': {
          max_attempts: 1,
          rate: 864000,
        },
      },
    };

    describe('#getSuspiciousIpThrottlingConfig', () => {
      beforeEach(function () {
        this.request = nock(API_URL).get(suspiciousIpPath).reply(200, data);
      });

      it('should accept a callback', function (done) {
        this.attackProtection.getSuspiciousIpThrottlingConfig({}, () => {
          done();
        });
      });

      it('should return a promise if no callback is given', function (done) {
        this.attackProtection
          .getSuspiciousIpThrottlingConfig()
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(suspiciousIpPath).reply(500);

        this.attackProtection.getSuspiciousIpThrottlingConfig().catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        this.attackProtection
          .getSuspiciousIpThrottlingConfig()
          .then((suspiciousIpThrottlingConfig) => {
            expect(suspiciousIpThrottlingConfig).to.deep.equal(data);

            done();
          });
      });

      it(`should perform a GET request to /api/v2${suspiciousIpPath}`, function (done) {
        const { request } = this;

        this.attackProtection.getSuspiciousIpThrottlingConfig().then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(suspiciousIpPath)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200);

        this.attackProtection.getSuspiciousIpThrottlingConfig().then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#updateSuspiciousIpThrottlingConfig', () => {
      beforeEach(function () {
        this.request = nock(API_URL).patch(suspiciousIpPath).reply(200, data);
      });

      it('should accept a callback', function (done) {
        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, data, () => {
          done();
        });
      });

      it('should return a promise if no callback is given', function (done) {
        this.attackProtection
          .updateSuspiciousIpThrottlingConfig({}, data)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(suspiciousIpPath).reply(500);

        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, data).catch((err) => {
          expect(err).to.exist.to.be.an.instanceOf(Error);

          done();
        });
      });

      it(`should perform a PATCH request to /api/v2${suspiciousIpPath}`, function (done) {
        const { request } = this;

        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, {}).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the data in the body of the request', function (done) {
        const { request } = this;

        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        this.attackProtection
          .updateSuspiciousIpThrottlingConfig({}, data)
          .then((suspiciousIpThrottlingConfig) => {
            expect(suspiciousIpThrottlingConfig).to.deep.equal(data);

            done();
          });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(suspiciousIpPath)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200);

        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });

  describe('Breached Password Detection', () => {
    const data = {
      enabled: true,
      shields: ['block', 'user_notification', 'admin_notification'],
      admin_notification_frequency: ['immediately'],
    };

    describe('#getBreachedPasswordDetectionConfig', () => {
      beforeEach(function () {
        this.request = nock(API_URL).get(breachedPasswordDetectionPath).reply(200, data);
      });

      it('should accept a callback', function (done) {
        this.attackProtection.getBreachedPasswordDetectionConfig({}, () => {
          done();
        });
      });

      it('should return a promise if no callback is given', function (done) {
        this.attackProtection
          .getBreachedPasswordDetectionConfig()
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(breachedPasswordDetectionPath).reply(500);

        this.attackProtection.getBreachedPasswordDetectionConfig().catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        this.attackProtection
          .getBreachedPasswordDetectionConfig()
          .then((breachedPasswordDetectionConfig) => {
            expect(breachedPasswordDetectionConfig).to.deep.equal(data);

            done();
          });
      });

      it(`should perform a GET request to /api/v2${breachedPasswordDetectionPath}`, function (done) {
        const { request } = this;

        this.attackProtection.getBreachedPasswordDetectionConfig().then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(breachedPasswordDetectionPath)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200);

        this.attackProtection.getBreachedPasswordDetectionConfig().then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#updateBreachedPasswordDetectionConfig', () => {
      beforeEach(function () {
        this.request = nock(API_URL).patch(breachedPasswordDetectionPath).reply(200, data);
      });

      it('should accept a callback', function (done) {
        this.attackProtection.updateBreachedPasswordDetectionConfig({}, data, () => {
          done();
        });
      });

      it('should return a promise if no callback is given', function (done) {
        this.attackProtection
          .updateBreachedPasswordDetectionConfig({}, data)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(breachedPasswordDetectionPath).reply(500);

        this.attackProtection.updateBreachedPasswordDetectionConfig({}, data).catch((err) => {
          expect(err).to.exist.to.be.an.instanceOf(Error);

          done();
        });
      });

      it(`should perform a PATCH request to /api/v2${breachedPasswordDetectionPath}`, function (done) {
        const { request } = this;

        this.attackProtection.updateBreachedPasswordDetectionConfig({}, {}).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the data in the body of the request', function (done) {
        const { request } = this;

        this.attackProtection.updateBreachedPasswordDetectionConfig({}, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        this.attackProtection
          .updateBreachedPasswordDetectionConfig({}, data)
          .then((breachedPasswordDetectionConfig) => {
            expect(breachedPasswordDetectionConfig).to.deep.equal(data);

            done();
          });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(breachedPasswordDetectionPath)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200);

        this.attackProtection.updateBreachedPasswordDetectionConfig({}, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });
});
