import nock from 'nock';
import path from 'path';
import fs from 'fs';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  JobsManager,
  GetErrors200ResponseOneOfInner,
  PostUsersImportsData,
  ManagementClient,
  ManagementApiError,
  FetchError,
} from '../../src/index.js';
import { extractParts } from '../utils/index.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('JobsManager', () => {
  let jobs: JobsManager;
  const token = 'TOKEN';

  beforeAll(() => {
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
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new JobsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#get', () => {
    let request: nock.Scope;
    const id = '1';

    beforeEach(() => {
      request = nock(API_URL).get(`/jobs/${id}`).reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      jobs.get({ id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/jobs/${id}`).reply(500);

      jobs.get({ id: id }).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = { id: '1' };
      nock(API_URL).get(`/jobs/${id}`).reply(200, data);

      jobs.get({ id: id }).then((jobs) => {
        expect(jobs.data.id).toBe(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/jobs', (done) => {
      jobs.get({ id: id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/jobs/${id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      jobs.get({ id: id }).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  // Error retrieval tests
  describe('#getErrors', () => {
    let request: nock.Scope;
    const id = '1';
    beforeEach(() => {
      request = nock(API_URL).get(`/jobs/${id}/errors`).reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      jobs.getErrors({ id: id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/jobs/${id}/errors`).reply(500);

      jobs.getErrors({ id: id }).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = [{ user: { name: 'john' } }];
      nock(API_URL).get(`/jobs/${id}/errors`).reply(200, data);

      jobs.getErrors({ id: id }).then((jobErrors) => {
        expect(jobErrors.data).toBeInstanceOf(Array);

        const jobErrorsData = jobErrors.data as Array<GetErrors200ResponseOneOfInner>;

        expect(jobErrorsData.length).toBe(data.length);

        expect(jobErrorsData[0].user!.name).toBe(data[0].user.name);

        done();
      });
    });

    it('should perform a GET request to /api/v2/jobs/:id/errors', (done) => {
      jobs.getErrors({ id: id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/jobs/${id}/errors`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      jobs.getErrors({ id: id }).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should not fail when no response returned', async () => {
      nock.cleanAll();

      nock(API_URL).get(`/jobs/${id}/errors`).reply(204);

      await expect(jobs.getErrors({ id: id })).resolves.not.toThrow();
    });
  });

  const usersFilePath = path.join(__dirname, '../data/users.json');

  describe('#importUsers', () => {
    let data: PostUsersImportsData;
    let request: nock.Scope;

    beforeEach(async () => {
      data = {
        users: new Blob([fs.readFileSync(usersFilePath)], { type: 'application/json' }),
        connection_id: 'con_test',
      };
      request = nock(API_URL).post('/jobs/users-imports').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      jobs.importUsers(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should have the payload in response.data', (done) => {
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
          expect(response.data).toMatchObject(payload);
          done();
        })
        .catch((err) => done(err));
    });

    it('should pass request errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/jobs/users-imports').replyWithError('printer on fire');

      jobs.importUsers(data).catch((err: unknown) => {
        // expect(err.message).to.equal('printer on fire');
        // TEMPORARY UNTILL FIXED ERROR HANDLING
        expect((err as FetchError).cause.message).toContain('printer on fire');
        done();
      });
    });

    it('should pass HTTP errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/jobs/users-imports').reply(500);

      jobs.importUsers(data).catch((err) => {
        expect((err as ManagementApiError).statusCode).toBe(500);
        done();
      });
    });

    it('should pass rest-api json error messages to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/jobs/users-imports').reply(428, {
        statusCode: 428,
        error: 'Too Many Requests',
        errorCode: 'too_many_requests',
        message: 'There are 4 active import users jobs',
      });

      jobs.importUsers(data).catch((err) => {
        const responseError = err as ManagementApiError;
        expect(responseError.statusCode).toBe(428);
        expect(responseError.message).toBe('There are 4 active import users jobs');
        done();
      });
    });

    it('should perform a POST request to /api/v2/jobs/users-imports', (done) => {
      jobs.importUsers(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should be a multipart request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/jobs/users-imports')
        .matchHeader('Content-Type', (header) => {
          return header.startsWith('multipart/form-data');
        })
        .reply(200, {});

      jobs.importUsers(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should have four parts: connection_id, users file, upsert and send_completion_email', (done) => {
      nock.cleanAll();
      let boundary: string | null = null;

      const request = nock(API_URL)
        .matchHeader('Content-Type', (header: string) => {
          boundary = `--${header.match(/boundary=([^\n]*)/)?.[1]}`;

          return true;
        })
        .post('/jobs/users-imports', function (this: any, body: any) {
          const parts = extractParts(body, boundary);

          expect(parts.connection_id).toBe(data.connection_id);

          expect(parts.upsert).toBe('false');

          expect(parts.send_completion_email).toBe('true');

          expect(parts.users).toContain('Content-Type: application/json');

          // Validate the content of the users JSON.
          const users = JSON.parse(parts.users.split('\r\n').slice(-1)[0]);

          expect(users.length).toBe(2);
          expect(users[0].email).toBe('jane.doe@contoso.com');

          return true;
        })
        .reply(200, {});
      jobs.importUsers({ ...data, upsert: false, send_completion_email: true }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should set upsert parameter correctly', (done) => {
      nock.cleanAll();
      let boundary: string | null = null;

      const request = nock(API_URL)
        .matchHeader('Content-Type', (header) => {
          boundary = `--${header.match(/boundary=([^\n]*)/)?.[1]}`;

          return true;
        })
        .post('/jobs/users-imports', (body) => {
          const parts = extractParts(body, boundary);

          expect(parts.upsert).toBe('true');

          return true;
        })
        .reply(200, {});

      jobs.importUsers(Object.assign({ upsert: true }, data)).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should set send_completion_email parameter correctly', (done) => {
      nock.cleanAll();
      let boundary: string | null = null;

      const request = nock(API_URL)
        .matchHeader('Content-Type', (header) => {
          boundary = `--${header.match(/boundary=([^\n]*)/)?.[1]}`;

          return true;
        })
        .post('/jobs/users-imports', (body) => {
          const parts = extractParts(body, boundary);

          expect(parts.send_completion_email).toBe('false');

          return true;
        })
        .reply(200, {});

      jobs.importUsers(Object.assign({ send_completion_email: false }, data)).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/jobs/users-imports')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      jobs.importUsers(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#importUsers with JSON data', () => {
    let data: PostUsersImportsData;

    beforeEach(async () => {
      data = {
        users: new Blob([fs.readFileSync(usersFilePath)], { type: 'application/json' }),
        connection_id: 'con_test',
      };
      nock(API_URL).post('/jobs/users-imports').reply(200, {});
    });

    it('should correctly include user JSON from Blob', (done) => {
      nock.cleanAll();
      let boundary: string | null = null;

      const request = nock(API_URL)
        .matchHeader('Content-Type', (header) => {
          boundary = `--${header.match(/boundary=([^\n]*)/)?.[1]}`;

          return true;
        })
        .post('/jobs/users-imports', (body) => {
          const parts = extractParts(body, boundary);

          expect(parts.users).toContain('Content-Type: application/json');

          // Validate the content of the users JSON.
          const users = JSON.parse(parts.users.split('\r\n').slice(-1)[0]);
          expect(users.length).toBe(2);
          expect(users[0].email).toBe('jane.doe@contoso.com');

          return true;
        })
        .reply(200, {});

      jobs.importUsers(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should correctly include user JSON from Blob', async function () {
      nock.cleanAll();
      let boundary: string | null = null;

      const request = nock(API_URL)
        .matchHeader('Content-Type', (header) => {
          boundary = `--${header.match(/boundary=([^\n]*)/)?.[1]}`;

          return true;
        })
        .post('/jobs/users-imports', (body) => {
          const parts = extractParts(body, boundary);

          expect(parts.users).toContain('Content-Type: application/json');

          // Validate the content of the users JSON.
          const users = JSON.parse(parts.users.split('\r\n').slice(-1)[0]);
          expect(users.length).toBe(2);
          expect(users[0].email).toBe('jane.doe@contoso.com');

          return true;
        })
        .reply(200, {});

      await jobs
        .importUsers({
          ...data,
          users: new Blob([fs.readFileSync(usersFilePath)], {
            type: 'application/json',
          }),
        })
        .then(() => {
          expect(request.isDone()).toBe(true);
        });
    });
  });

  describe('#exportUsers', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/jobs/users-exports').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      jobs.exportUsers({ format: 'csv' }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();
      nock(API_URL).post('/jobs/users-exports').reply(500);

      jobs.exportUsers({ format: 'csv' }).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
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
        expect(response.data).toBeInstanceOf(Object);
        expect(response.data.status).toBe('pending');
        done();
      });
    });

    it('should perform a POST request to /api/v2/jobs/users-exports', (done) => {
      jobs.exportUsers({ format: 'csv' }).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();
      const request = nock(API_URL)
        .post('/jobs/users-exports')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      jobs.exportUsers({ format: 'csv' }).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#verifyEmail', () => {
    const data = {
      user_id: 'github|12345',
    };

    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/jobs/verification-email').reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      jobs.verifyEmail(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/jobs/verification-email').reply(500);

      jobs.verifyEmail(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/jobs/verification-email', (done) => {
      jobs.verifyEmail(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).post('/jobs/verification-email', data).reply(200, {});

      jobs.verifyEmail(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/jobs/verification-email')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      jobs.verifyEmail(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
