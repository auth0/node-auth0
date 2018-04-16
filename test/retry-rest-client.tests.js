var expect = require('chai').expect;
var nock = require('nock');

var Promise = require('bluebird');
var ArgumentError = require('rest-facade').ArgumentError;
var RestClient = require('rest-facade').Client;
var RetryRestClient = require('../src/RetryRestClient');

var API_URL = 'https://tenant.auth0.com';

describe('RetryRestClient', function() {
  before(function() {
    this.restClient = new RestClient(API_URL);
  });

  it('should raise an error when no RestClient is provided', function() {
    expect(RetryRestClient).to.throw(ArgumentError, 'Must provide RestClient');
  });

  it('should raise an error when enabled is not of type boolean', function() {
    var options = { enabled: {} };
    var client = RetryRestClient.bind(null, {}, options);
    expect(client).to.throw(ArgumentError, 'Must provide enabled boolean value');
  });

  it('should raise an error when maxRetries is negative', function() {
    var options = { maxRetries: -1 };
    var client = RetryRestClient.bind(null, {}, options);
    expect(client).to.throw(ArgumentError, 'Must provide maxRetries as a positive number');
  });

  describe('instance', function() {
    var client = new RetryRestClient(new RestClient(API_URL));
    var methods = ['getAll', 'get', 'create', 'update', 'delete'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(client[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  it('should pass data to callback when provided', function(done) {
    nock(API_URL)
      .get('/')
      .reply(200, { success: true });

    var client = new RetryRestClient(this.restClient);
    client.getAll(function(err, data) {
      expect(err).to.null;
      expect(data.success).to.be.true;
      done();
    });
  });

  it('should return promise for successful request when no callback is provided', function(done) {
    nock(API_URL)
      .get('/')
      .reply(200, { success: true });

    var client = new RetryRestClient(this.restClient);
    client.getAll().then(function(data) {
      expect(data.success).to.be.true;
      done();
    });
  });

  it('should pass err to callback when provided', function(done) {
    nock(API_URL)
      .get('/')
      .reply(500);

    var client = new RetryRestClient(this.restClient);
    client.getAll(function(err) {
      expect(err).to.not.null;
      expect(err.statusCode).to.be.equal(500);
      done();
    });
  });

  it('should return promise for failed request when no callback is provided', function(done) {
    nock(API_URL)
      .get('/')
      .reply(500);

    var client = new RetryRestClient(this.restClient);
    client.getAll().catch(function(err) {
      expect(err).to.not.null;
      expect(err.statusCode).to.be.equal(500);
      done();
    });
  });

  it('should retry once when an error is returned', function(done) {
    var self = this;
    var timesCalled = 0;
    var restClientSpy = {
      getAll: function() {
        timesCalled += 1;
        return self.restClient.getAll(arguments);
      }
    };

    nock(API_URL)
      .get('/')
      .reply(
        429,
        { success: false },
        {
          'x-ratelimit-limit': '10',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': '1508253300'
        }
      )
      .get('/')
      .reply(200, { success: true });

    var client = new RetryRestClient(restClientSpy);
    client.getAll().then(function(data) {
      expect(data.success).to.be.true;
      expect(timesCalled).to.be.equal(2);
      done();
    });
  });

  it('should try 4 times when request fails 3 times', function(done) {
    var self = this;
    var timesCalled = 0;
    var restClientSpy = {
      getAll: function() {
        timesCalled += 1;
        return self.restClient.getAll(arguments);
      }
    };

    nock(API_URL)
      .get('/')
      .times(3)
      .reply(
        429,
        { success: false },
        {
          'x-ratelimit-limit': '10',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': '1508253300'
        }
      )
      .get('/')
      .reply(200, { success: true });

    var client = new RetryRestClient(restClientSpy);
    client.getAll().then(function(data) {
      expect(data.success).to.be.true;
      expect(timesCalled).to.be.equal(4);
      done();
    });
  });

  it('should retry 2 times and fail when maxRetries is exceeded with no delay time', function(done) {
    var self = this;
    var timesCalled = 0;
    var restClientSpy = {
      getAll: function() {
        timesCalled += 1;
        return self.restClient.getAll(arguments);
      }
    };

    nock(API_URL)
      .get('/')
      .times(4)
      .reply(
        429,
        { success: false },
        {
          'x-ratelimit-limit': '10',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': (new Date().getTime() - 10) / 1000 // past.
        }
      );

    var client = new RetryRestClient(restClientSpy, { maxRetries: 3 });
    client.getAll().catch(function(err) {
      expect(err).to.not.null;
      expect(timesCalled).to.be.equal(4); // Initial call + 3 retires.
      done();
    });
  });

  it('should retry 2 times and fail when maxRetries is exceeded with delay time', function(done) {
    var self = this;
    var timesCalled = 0;
    var restClientSpy = {
      getAll: function() {
        timesCalled += 1;
        return self.restClient.getAll(arguments);
      }
    };

    nock(API_URL)
      .get('/')
      .reply(
        429,
        { success: false },
        {
          'x-ratelimit-limit': '10',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': (new Date().getTime() + 50) / 1000 // epoch seconds + 50ms
        }
      )
      .get('/')
      .reply(
        429,
        { success: false },
        {
          'x-ratelimit-limit': '10',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': (new Date().getTime() + 100) / 1000 // epoch seconds + 100ms
        }
      );

    var client = new RetryRestClient(restClientSpy, { maxRetries: 1 });
    client.getAll().catch(function(err) {
      expect(err).to.not.null;
      expect(timesCalled).to.be.equal(2); // Initial call + 3 retires.
      done();
    });
  });

  it('should not retry when status code is not 429', function(done) {
    nock(API_URL)
      .get('/')
      .reply(500);

    var client = new RetryRestClient(this.restClient);
    client.getAll().catch(function(err) {
      expect(err).to.not.null;
      expect(err.statusCode).to.be.equal(500);
      done();
    });
  });

  it('should delay the retry using x-ratelimit-reset header value and succeed after retry', function(done) {
    var self = this;
    var calledAt = [];
    var restClientSpy = {
      getAll: function() {
        calledAt.push(new Date().getTime());
        return self.restClient.getAll(arguments);
      }
    };

    nock(API_URL)
      .get('/')
      .reply(
        429,
        { success: false },
        {
          'x-ratelimit-limit': '10',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': (new Date().getTime() + 50) / 1000 // epoch seconds + 50ms
        }
      )
      .get('/')
      .reply(200, { success: true });

    var client = new RetryRestClient(restClientSpy);

    client.getAll().then(function(data) {
      expect(data.success).to.be.true;
      expect(calledAt.length).to.be.equal(2);

      var elapsedTime = calledAt[1] - calledAt[0];
      expect(elapsedTime).to.be.above(49); // Time between the requests should at least be more than 49ms
      done();
    });
  });

  it('should not retry when retry functionality is disabled', function(done) {
    var self = this;
    var timesCalled = 0;
    var restClientSpy = {
      getAll: function() {
        timesCalled += 1;
        return self.restClient.getAll(arguments);
      }
    };

    nock(API_URL)
      .get('/')
      .reply(
        429,
        { success: false },
        {
          'x-ratelimit-limit': '10',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': '1508253300'
        }
      );

    var client = new RetryRestClient(restClientSpy, { enabled: false });
    client.getAll().catch(function(err) {
      expect(err).to.not.null;
      expect(err.statusCode).to.be.equal(429);
      expect(timesCalled).to.be.equal(1);
      done();
    });
  });

  it('should remove callback from arguments object if data is passed', function(done) {
    var self = this;
    var restClientSpy = {
      create: function() {
        expect(arguments.length).to.be.equal(1);
        done();
        return Promise.resolve();
      }
    };

    var client = new RetryRestClient(restClientSpy, { enabled: false });
    client.create({ data: 'foobar' }, function() {});
  });

  it('should remove callback from arguments object if urlParams and data is passed', function(done) {
    var self = this;
    var restClientSpy = {
      create: function() {
        expect(arguments.length).to.be.equal(2);
        done();
        return Promise.resolve();
      }
    };

    var client = new RetryRestClient(restClientSpy, { enabled: false });
    var urlParams = { id: '123' };
    var data = { data: 'foobar' };
    client.create('/:id', data, function() {});
  });

  it('should not remove data object when no callback is passed', function(done) {
    var self = this;
    var restClientSpy = {
      create: function() {
        expect(arguments.length).to.be.equal(1);
        done();
        return Promise.resolve();
      }
    };

    var client = new RetryRestClient(restClientSpy, { enabled: false });
    var data = { data: 'foobar' };
    client.create(data);
  });

  it('should not remove data object when urlParams is passed and no callback is passed', function(done) {
    var self = this;
    var restClientSpy = {
      create: function() {
        expect(arguments.length).to.be.equal(2);
        done();
        return Promise.resolve();
      }
    };

    var client = new RetryRestClient(restClientSpy, { enabled: false });
    var urlParams = { id: '123' };
    var data = { data: 'foobar' };
    client.create('/:id', data);
  });
});
