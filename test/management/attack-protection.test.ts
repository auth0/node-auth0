import nock, { Scope } from 'nock';

import {
  AttackProtectionManager,
  PatchBreachedPasswordDetectionRequest,
  PatchBruteForceProtectionRequest,
  PatchSuspiciousIpThrottlingRequest,
  ManagementClient,
} from '../../src/index.js';

const API_URL = 'https://tenant.auth0.com';

describe('AttackProtectionManager', () => {
  const bruteForcePath = '/api/v2/attack-protection/brute-force-protection';
  const suspiciousIpPath = '/api/v2/attack-protection/suspicious-ip-throttling';
  const breachedPasswordDetectionPath = '/api/v2/attack-protection/breached-password-detection';
  let attackProtection: AttackProtectionManager;
  let token: string;

  beforeAll(() => {
    token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    attackProtection = client.attackProtection;
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
      it(`should have a ${method} method`, () => {
        expect((attackProtection as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => new AttackProtectionManager({} as any)).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => new AttackProtectionManager({ baseUrl: '' } as any)).toThrowError(Error);
    });
  });

  describe('Brute Force Protection', () => {
    const data: PatchBruteForceProtectionRequest = {
      enabled: true,
      shields: ['block', 'user_notification'],
      mode: 'count_per_identifier_and_ip',
      allowlist: ['1.1.2.2'],
      max_attempts: 100,
    };

    describe('#getBruteForceConfig', () => {
      let request: Scope;

      beforeEach(() => {
        request = nock(API_URL).get(bruteForcePath).reply(200, data);
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(bruteForcePath).reply(500, {});

        attackProtection.getBruteForceConfig().catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        attackProtection.getBruteForceConfig().then((bruteForceConfig) => {
          expect(bruteForceConfig.data).toMatchObject(data);

          done();
        });
      });

      it(`should perform a GET request to /api/v2${bruteForcePath}`, (done) => {
        attackProtection.getBruteForceConfig().then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(bruteForcePath)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        attackProtection.getBruteForceConfig().then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });

    describe('#updateBruteForceConfig', () => {
      let request: Scope;

      beforeEach(() => {
        request = nock(API_URL).patch(bruteForcePath).reply(200, data);
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).patch(bruteForcePath).reply(500, {});

        attackProtection.updateBruteForceConfig(data).catch((err) => {
          expect(err).toBeInstanceOf(Error);

          done();
        });
      });

      it(`should perform a PATCH request to /api/v2${bruteForcePath}`, (done) => {
        attackProtection.updateBruteForceConfig({}).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass the data in the body of the request', (done) => {
        attackProtection.updateBruteForceConfig(data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        attackProtection.updateBruteForceConfig(data).then((bruteForceConfig) => {
          expect(bruteForceConfig.data).toMatchObject(data);

          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(bruteForcePath)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        attackProtection.updateBruteForceConfig(data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });
  });

  describe('Suspicious IP Throttling', () => {
    const data: PatchSuspiciousIpThrottlingRequest = {
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
      let request: Scope;

      beforeEach(() => {
        request = nock(API_URL).get(suspiciousIpPath).reply(200, data);
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(suspiciousIpPath).reply(500, {});

        attackProtection.getSuspiciousIpThrottlingConfig().catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        attackProtection.getSuspiciousIpThrottlingConfig().then((suspiciousIpThrottlingConfig) => {
          expect(suspiciousIpThrottlingConfig.data).toMatchObject(data);

          done();
        });
      });

      it(`should perform a GET request to /api/v2${suspiciousIpPath}`, (done) => {
        attackProtection.getSuspiciousIpThrottlingConfig().then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(suspiciousIpPath)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        attackProtection.getSuspiciousIpThrottlingConfig().then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });

    describe('#updateSuspiciousIpThrottlingConfig', () => {
      let request: Scope;

      beforeEach(() => {
        request = nock(API_URL).patch(suspiciousIpPath).reply(200, data);
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).patch(suspiciousIpPath).reply(500, {});

        attackProtection.updateSuspiciousIpThrottlingConfig(data).catch((err) => {
          expect(err).toBeInstanceOf(Error);

          done();
        });
      });

      it(`should perform a PATCH request to /api/v2${suspiciousIpPath}`, (done) => {
        attackProtection.updateSuspiciousIpThrottlingConfig({}).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass the data in the body of the request', (done) => {
        attackProtection.updateSuspiciousIpThrottlingConfig(data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        attackProtection
          .updateSuspiciousIpThrottlingConfig(data)
          .then((suspiciousIpThrottlingConfig) => {
            expect(suspiciousIpThrottlingConfig.data).toMatchObject(data);

            done();
          });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(suspiciousIpPath)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        attackProtection.updateSuspiciousIpThrottlingConfig(data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });
  });

  describe('Breached Password Detection', () => {
    const data: PatchBreachedPasswordDetectionRequest = {
      enabled: true,
      shields: ['block', 'user_notification', 'admin_notification'],
      admin_notification_frequency: ['immediately'],
    };

    describe('#getBreachedPasswordDetectionConfig', () => {
      let request: Scope;

      beforeEach(() => {
        request = nock(API_URL).get(breachedPasswordDetectionPath).reply(200, data);
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(breachedPasswordDetectionPath).reply(500, {});

        attackProtection.getBreachedPasswordDetectionConfig().catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        attackProtection
          .getBreachedPasswordDetectionConfig()
          .then((breachedPasswordDetectionConfig) => {
            expect(breachedPasswordDetectionConfig.data).toMatchObject(data);

            done();
          });
      });

      it(`should perform a GET request to /api/v2${breachedPasswordDetectionPath}`, (done) => {
        attackProtection.getBreachedPasswordDetectionConfig().then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(breachedPasswordDetectionPath)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        attackProtection.getBreachedPasswordDetectionConfig().then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });

    describe('#updateBreachedPasswordDetectionConfig', () => {
      let request: Scope;

      beforeEach(() => {
        request = nock(API_URL).patch(breachedPasswordDetectionPath).reply(200, data);
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).patch(breachedPasswordDetectionPath).reply(500, {});

        attackProtection.updateBreachedPasswordDetectionConfig(data).catch((err) => {
          expect(err).toBeInstanceOf(Error);

          done();
        });
      });

      it(`should perform a PATCH request to /api/v2${breachedPasswordDetectionPath}`, (done) => {
        attackProtection.updateBreachedPasswordDetectionConfig({}, {}).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass the data in the body of the request', (done) => {
        attackProtection.updateBreachedPasswordDetectionConfig({}, data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        attackProtection
          .updateBreachedPasswordDetectionConfig({}, data)
          .then((breachedPasswordDetectionConfig) => {
            expect(breachedPasswordDetectionConfig.data).toMatchObject(data);

            done();
          });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(breachedPasswordDetectionPath)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        attackProtection.updateBreachedPasswordDetectionConfig({}, data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });
  });
});
