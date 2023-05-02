import chai from 'chai';
import nock from 'nock';
import path from 'path';
import fs from 'fs';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  JobsManager,
  GetErrors200ResponseOneOfInner,
  PostUsersImportsData,
  FetchError,
} from '../../src/management/__generated/index';
import { ManagementClient, ManagementApiError } from '../../src/management';
import { Blob } from '../../src/runtime';
import { extractParts } from '../utils/extractParts';
import { fileURLToPath } from 'url';

const { expect } = chai;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('JobsManager', () => {
  let jobs: JobsManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    jobs = client.jobs;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new JobsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new JobsManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#get', () => {
    let request: nock.Scope;
    const id = '1';

    beforeEach(function () {
      request = nock(API_URL).get(`/jobs/${id}`).reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      jobs.get({ id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/jobs/${id}`).reply(500);

      jobs.get({ id: id }).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = { id: '1' };
      nock(API_URL).get(`/jobs/${id}`).reply(200, data);

      jobs.get({ id: id }).then((jobs) => {
        expect(jobs.data.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/jobs', function (done) {
      jobs.get({ id: id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/jobs/${id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      jobs.get({ id: id }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  // Error retrieval tests
  describe('#getErrors', () => {
    let request: nock.Scope;
    const id = '1';
    beforeEach(function () {
      request = nock(API_URL).get(`/jobs/${id}/errors`).reply(200, []);
    });

    it('should return a promise if no callback is given', function (done) {
      jobs.getErrors({ id: id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/jobs/${id}/errors`).reply(500);

      jobs.getErrors({ id: id }).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ user: { name: 'john' } }];
      nock(API_URL).get(`/jobs/${id}/errors`).reply(200, data);

      jobs.getErrors({ id: id }).then((jobErrors) => {
        expect(jobErrors.data).to.be.an.instanceOf(Array);

        const jobErrorsData = jobErrors.data as Array<GetErrors200ResponseOneOfInner>;

        expect(jobErrorsData.length).to.equal(data.length);

        expect(jobErrorsData[0].user!.name).to.equal(data[0].user.name);

        done();
      });
    });

    it('should perform a GET request to /api/v2/jobs/:id/errors', function (done) {
      jobs.getErrors({ id: id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/jobs/${id}/errors`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      jobs.getErrors({ id: id }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  const usersFilePath = path.join(__dirname, '../data/users.json');
  const usersFileData = fs.readFileSync(usersFilePath, 'utf-8');

  describe('#importUsers', () => {
    const data: PostUsersImportsData = {
      users: new Blob([usersFileData], {
        type: 'application/json',
      }),
      connection_id: 'con_test',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/jobs/users-imports').reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      jobs.importUsers(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should have the payload in response.data', function (done) {
      nock.cleanAll();
      const payload = {
        status: 'pending',
        type: 'users_import',
        created_at: '',
        id: 'job_0000000000000001',
        connection_id: 'con_0000000000000001',
        upsert: false,
        external_id: '',
        send_completion_email: true,
      };
      nock(API_URL).post('/jobs/users-imports').reply(200, payload);

      jobs
        .importUsers(data)
        .then((response) => {
          expect(response.data).to.deep.equal(payload);
          done();
        })
        .catch((err) => done(err));
    });

    it('should pass request errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/jobs/users-imports').replyWithError('printer on fire');

      jobs.importUsers(data).catch((err: unknown) => {
        // expect(err.message).to.equal('printer on fire');
        // TEMPORARY UNTILL FIXED ERROR HANDLING
        expect((err as FetchError).cause.message).to.include('printer on fire');
        done();
      });
    });

    it('should pass HTTP errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/jobs/users-imports').reply(500);

      jobs.importUsers(data).catch((err) => {
        expect((err as ManagementApiError).statusCode).to.equal(500);
        done();
      });
    });

    it('should pass rest-api json error messages to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/jobs/users-imports').reply(428, {
        statusCode: 428,
        error: 'Too Many Requests',
        errorCode: 'too_many_requests',
        message: 'There are 4 active import users jobs',
      });

      jobs.importUsers(data).catch((err) => {
        const responseError = err as ManagementApiError;
        expect(responseError.statusCode).to.equal(428);
        expect(responseError.message).to.equal('There are 4 active import users jobs');
        done();
      });
    });

    it('should perform a POST request to /api/v2/jobs/users-imports', function (done) {
      jobs.importUsers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should be a multipart request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/jobs/users-imports')
        .matchHeader('Content-Type', (header) => header.indexOf('multipart/form-data') === 0)
        .reply(200, {});

      jobs.importUsers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should have four parts: connection_id, users file, upsert and send_completion_email', function (done) {
      nock.cleanAll();
      let boundary: string | null = null;

      const request = nock(API_URL)
        .matchHeader('Content-Type', (header: string) => {
          boundary = `--${header.match(/boundary=([^\n]*)/)?.[1]}`;

          return true;
        })
        .post('/jobs/users-imports', function (this: any, body: any) {
          const parts = extractParts(body, boundary);

          // Validate the connection id.
          expect(parts.connection_id).to.exist.to.be.a('string').to.equal(data.connection_id);

          // Validate the upsert param - default is false
          expect(parts.upsert).to.exist.to.be.a('string').to.equal('false');

          // Validate the send_completion_email param - default is true
          expect(parts.send_completion_email).to.exist.to.be.a('string').to.equal('true');

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
        .reply(200, {});
      jobs.importUsers({ ...data, upsert: false, send_completion_email: true }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should set upsert parameter correctly', function (done) {
      nock.cleanAll();
      let boundary: string | null = null;

      const request = nock(API_URL)
        .matchHeader('Content-Type', (header) => {
          boundary = `--${header.match(/boundary=([^\n]*)/)?.[1]}`;

          return true;
        })
        .post('/jobs/users-imports', (body) => {
          const parts = extractParts(body, boundary);

          // Validate the upsert param
          expect(parts.upsert).to.exist.to.be.a('string').to.equal('true');

          return true;
        })
        .reply(200, {});

      jobs.importUsers(Object.assign({ upsert: true }, data)).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should set send_completion_email parameter correctly', function (done) {
      nock.cleanAll();
      let boundary: string | null = null;

      const request = nock(API_URL)
        .matchHeader('Content-Type', (header) => {
          boundary = `--${header.match(/boundary=([^\n]*)/)?.[1]}`;

          return true;
        })
        .post('/jobs/users-imports', (body) => {
          const parts = extractParts(body, boundary);

          // Validate the upsert param
          expect(parts.send_completion_email).to.exist.to.be.a('string').to.equal('false');

          return true;
        })
        .reply(200, {});

      jobs.importUsers(Object.assign({ send_completion_email: false }, data)).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/jobs/users-imports')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      jobs.importUsers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#importUsers with JSON data', () => {
    const data = {
      users: new Blob([usersFileData], {
        type: 'application/json',
      }),
      connection_id: 'con_test',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/jobs/users-imports').reply(200);
    });

    it('should correctly include user JSON', function (done) {
      nock.cleanAll();
      let boundary: string | null = null;

      const request = nock(API_URL)
        .matchHeader('Content-Type', (header) => {
          boundary = `--${header.match(/boundary=([^\n]*)/)?.[1]}`;

          return true;
        })
        .post('/jobs/users-imports', (body) => {
          const parts = extractParts(body, boundary);

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
        .reply(200, {});

      jobs.importUsers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#exportUsers', () => {
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/jobs/users-exports').reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      jobs.exportUsers({ format: 'csv' }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();
      nock(API_URL).post('/jobs/users-exports').reply(500);

      jobs.exportUsers({ format: 'csv' }).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = {
        type: 'users_export',
        status: 'pending',
        format: 'csv',
        created_at: '',
        id: 'job_0000000000000001',
      };
      nock(API_URL).post('/jobs/users-exports').reply(200, data);

      jobs.exportUsers({ format: 'csv' }).then((response) => {
        expect(response.data).to.be.an.instanceOf(Object);
        expect(response.data.status).to.equal('pending');
        done();
      });
    });

    it('should perform a POST request to /api/v2/jobs/users-exports', function (done) {
      jobs.exportUsers({ format: 'csv' }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();
      const request = nock(API_URL)
        .post('/jobs/users-exports')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      jobs.exportUsers({ format: 'csv' }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#verifyEmail', () => {
    const data = {
      user_id: 'github|12345',
    };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/jobs/verification-email').reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      jobs.verifyEmail(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/jobs/verification-email').reply(500);

      jobs.verifyEmail(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/jobs/verification-email', function (done) {
      jobs.verifyEmail(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/jobs/verification-email', data).reply(200, {});

      jobs.verifyEmail(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/jobs/verification-email')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      jobs.verifyEmail(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
