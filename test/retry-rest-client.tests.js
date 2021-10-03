const { expect } = require('chai');
const sinon = require('sinon');
const nock = require('nock');

const { ArgumentError } = require('rest-facade');
const RestClient = require('rest-facade').Client;
const RetryRestClient = require('../src/RetryRestClient');

const API_URL = 'https://tenant.auth0.com';

describe('RetryRestClient', () => {
  before(function () {
    this.restClient = new RestClient(API_URL);
  });

  it('should raise an error when no RestClient is provided', () => {
    expect(() => {
      new RetryRestClient();
    }).to.throw(ArgumentError, 'Must provide RestClient');
  });

  it('should raise an error when enabled is not of type boolean', () => {
    const options = { enabled: {} };
    expect(() => {
      new RetryRestClient({}, options);
    }).to.throw(ArgumentError, 'Must provide enabled boolean value');
  });

  it('should raise an error when maxRetries is negative', () => {
    const options = { maxRetries: -1 };
    expect(() => {
      new RetryRestClient({}, options);
    }).to.throw(ArgumentError, 'Must provide maxRetries as a positive number');
  });

  describe('instance', () => {
    const client = new RetryRestClient(new RestClient(API_URL));
    const methods = ['getAll', 'get', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect(client[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  it('should pass data to callback when provided', function (done) {
    nock(API_URL).get('/').reply(200, { success: true });

    const client = new RetryRestClient(this.restClient);
    client.getAll((err, data) => {
      expect(err).to.null;
      expect(data.success).to.be.true;
      done();
    });
  });

  it('should return promise for successful request when no callback is provided', function (done) {
    nock(API_URL).get('/').reply(200, { success: true });

    const client = new RetryRestClient(this.restClient);
    client.getAll().then((data) => {
      expect(data.success).to.be.true;
      done();
    });
  });

  it('should pass err to callback when provided', function (done) {
    nock(API_URL).get('/').reply(500);

    const client = new RetryRestClient(this.restClient);
    client.getAll((err) => {
      expect(err).to.not.null;
      expect(err.statusCode).to.be.equal(500);
      done();
    });
  });

  it('should return promise for failed request when no callback is provided', function (done) {
    nock(API_URL).get('/').reply(500);

    const client = new RetryRestClient(this.restClient);
    client.getAll().catch((err) => {
      expect(err).to.not.null;
      expect(err.statusCode).to.be.equal(500);
      done();
    });
  });

  it('should retry once when an error is returned', function (done) {
    const self = this;
    let timesCalled = 0;
    const restClientSpy = {
      getAll(...args) {
        timesCalled += 1;
        return self.restClient.getAll(args);
      },
    };

    nock(API_URL).get('/').reply(429, { success: false }).get('/').reply(200, { success: true });

    const client = new RetryRestClient(restClientSpy);
    client.getAll().then((data) => {
      expect(data.success).to.be.true;
      expect(timesCalled).to.be.equal(2);
      done();
    });
  });

  it('should try 4 times when request fails 3 times', function (done) {
    const self = this;
    const clock = sinon.useFakeTimers();
    let timesCalled = 0;
    const restClientSpy = {
      getAll(...args) {
        timesCalled += 1;
        return self.restClient.getAll(...args).finally(() => {
          clock.runAllAsync();
        });
      },
    };

    nock(API_URL)
      .get('/')
      .times(3)
      .reply(429, { success: false })
      .get('/')
      .reply(200, { success: true });

    const client = new RetryRestClient(restClientSpy);
    client.getAll().then((data) => {
      clock.restore();
      expect(data.success).to.be.true;
      expect(timesCalled).to.be.equal(4);
      done();
    });
  });

  it('should retry 2 times and fail when maxRetries is exceeded', function (done) {
    const self = this;
    const clock = sinon.useFakeTimers();
    let timesCalled = 0;
    const restClientSpy = {
      getAll(...args) {
        timesCalled += 1;
        return self.restClient.getAll(...args).finally(() => {
          clock.runAllAsync();
        });
      },
    };

    nock(API_URL).get('/').times(4).reply(429, { success: false });

    const client = new RetryRestClient(restClientSpy, { maxRetries: 3 });
    client.getAll().catch((err) => {
      clock.restore();
      expect(err).to.not.null;
      expect(timesCalled).to.be.equal(4); // Initial call + 3 retires.
      done();
    });
  });

  it('should not retry when status code is not 429', function (done) {
    nock(API_URL).get('/').reply(500);

    const client = new RetryRestClient(this.restClient);
    client.getAll().catch((err) => {
      expect(err).to.not.null;
      expect(err.statusCode).to.be.equal(500);
      done();
    });
  });

  it('should delay the retry using exponential backoff and succeed after retry', function (done) {
    const self = this;
    const clock = sinon.useFakeTimers();
    const backoffs = [];
    let prev = 0;
    const restClientSpy = {
      getAll(...args) {
        const now = new Date().getTime();
        backoffs.push(now - prev);
        prev = now;
        return self.restClient.getAll(...args).finally(() => {
          clock.runAllAsync();
        });
      },
    };

    nock(API_URL)
      .get('/')
      .times(9)
      .reply(429, { success: false })
      .get('/')
      .reply(200, { success: true });

    const client = new RetryRestClient(restClientSpy, { maxRetries: 10 });

    client.getAll().then((data) => {
      clock.restore();
      expect(data.success).to.be.true;
      expect(backoffs.length).to.be.equal(10);

      expect(backoffs.shift()).to.be.equal(0, 'first request should happen immediately');
      for (let i = 0; i < backoffs.length; i++) {
        expect(backoffs[i] / 1000).to.be.within(
          Math.pow(2, i),
          2 * Math.pow(2, i),
          `attempt ${i + 1} in secs`
        );
      }
      done();
    });
  });

  it('should not retry when retry functionality is disabled', function (done) {
    const self = this;
    let timesCalled = 0;
    const restClientSpy = {
      getAll(...args) {
        timesCalled += 1;
        return self.restClient.getAll(...args);
      },
    };

    nock(API_URL).get('/').reply(429, { success: false });

    const client = new RetryRestClient(restClientSpy, { enabled: false });
    client.getAll().catch((err) => {
      expect(err).to.not.null;
      expect(err.statusCode).to.be.equal(429);
      expect(timesCalled).to.be.equal(1);
      done();
    });
  });

  it('should remove callback from arguments object if data is passed', (done) => {
    const restClientSpy = {
      create() {
        expect(arguments.length).to.be.equal(1);
        done();
        return Promise.resolve();
      },
    };

    const client = new RetryRestClient(restClientSpy, { enabled: false });
    client.create({ data: 'foobar' }, () => {});
  });

  it('should remove callback from arguments object if urlParams and data is passed', (done) => {
    const restClientSpy = {
      create() {
        expect(arguments.length).to.be.equal(2);
        done();
        return Promise.resolve();
      },
    };

    const client = new RetryRestClient(restClientSpy, { enabled: false });
    const data = { data: 'foobar' };
    client.create('/:id', data, () => {});
  });

  it('should not remove data object when no callback is passed', (done) => {
    const restClientSpy = {
      create() {
        expect(arguments.length).to.be.equal(1);
        done();
        return Promise.resolve();
      },
    };

    const client = new RetryRestClient(restClientSpy, { enabled: false });
    const data = { data: 'foobar' };
    client.create(data);
  });

  it('should not remove data object when urlParams is passed and no callback is passed', (done) => {
    const restClientSpy = {
      create() {
        expect(arguments.length).to.be.equal(2);
        done();
        return Promise.resolve();
      },
    };

    const client = new RetryRestClient(restClientSpy, { enabled: false });
    const data = { data: 'foobar' };
    client.create('/:id', data);
  });
});
