import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum,
  LogStreamsManager,
  PostLogStreamsRequestOneOf7,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('LogStreamsManager', () => {
  let logStreams: LogStreamsManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    logStreams = client.logStreams;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new LogStreamsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new LogStreamsManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/log-streams').reply(200, []);
    });

    it('should return a promise if no callback is given', function (done) {
      logStreams.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/log-streams').reply(500, {});

      logStreams.getAll().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ id: '123' }];
      nock(API_URL).get('/log-streams').reply(200, data);

      logStreams.getAll().then((logStreams) => {
        expect(logStreams.data).to.be.an.instanceOf(Array);

        expect(logStreams.data.length).to.equal(data.length);

        expect(logStreams.data[0].id).to.equal(data[0].id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/log-streams', function (done) {
      logStreams.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/log-streams')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      logStreams.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#get', () => {
    const params = { id: '5' };
    const data = {
      id: params.id,
      name: 'Test log',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/log-streams/${data.id}`).reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      logStreams.get(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/log-streams/${params.id}`).reply(500, {});

      logStreams.get(params).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/log-streams/${params.id}`).reply(200, data);

      logStreams.get(params).then((log) => {
        expect(log.data.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/log-streams/:id', function (done) {
      logStreams.get(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/log-streams')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      logStreams.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data: PostLogStreamsRequestOneOf7 = {
      name: 'Test log stream',
      sink: {
        mixpanelProjectId: '1',
        mixpanelRegion: GetLogStreams200ResponseInnerOneOf7SinkMixpanelRegionEnum.us,
        mixpanelServiceAccountPassword: '',
        mixpanelServiceAccountUsername: '',
      },
      type: 'mixpanel',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/log-streams').reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      logStreams.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/log-streams').reply(500, {});

      logStreams.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/log-streams', function (done) {
      logStreams.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/log-streams', data as any)
        .reply(200, {});

      logStreams.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/log-streams')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      logStreams.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const data = { id: '5' };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).patch(`/log-streams/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      logStreams.update({ id: '5' }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/log-streams/5', function (done) {
      logStreams.update({ id: '5' }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/log-streams/${data.id}`, { name: 'test' })
        .reply(200, {});

      logStreams.update({ id: '5' }, { name: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/log-streams/${data.id}`).reply(500, {});

      logStreams.update({ id: data.id }, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/log-streams/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', function (done) {
      logStreams.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /log-streams/${id}`, function (done) {
      logStreams.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/log-streams/${id}`).reply(500, {});

      logStreams.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/log-streams/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      logStreams.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
