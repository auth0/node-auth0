var expect = require('chai').expect;
var nock = require('nock');

var ArgumentError = require('rest-facade').ArgumentError;
var ManagementTokenProvider = require('../src/management/ManagementTokenProvider');
var Auth0RestClient = require('../src/Auth0RestClient');

var API_URL = 'https://tenant.auth0.com';

describe('Auth0RestClient', function() {
  before(function() {
    this.providerMock = {
      getAccessToken: function() {
        return Promise.resolve('access_token');
      }
    };
  });

  it('should raise an error when no resource Url is provided', function() {
    expect(Auth0RestClient).to.throw(ArgumentError, 'Must provide a Resource Url');
  });

  it('should raise an error when resource Url is invalid', function() {
    var client = Auth0RestClient.bind(null, '');
    expect(client).to.throw(ArgumentError, 'The provided Resource Url is invalid');
  });

  it('should raise an error when no options is provided', function() {
    var client = Auth0RestClient.bind(null, '/some-resource');
    expect(client).to.throw(ArgumentError, 'Must provide options');
  });

  describe('`get`', () => {
    it('should encode params.id on `get` requests', function(done) {
      nock(API_URL)
        .get('/some-resource/auth0%7C1234')
        .reply(200, { data: 'value' });

      var options = {
        headers: {}
      };
      var client = new Auth0RestClient(API_URL + '/some-resource/:id', options, this.providerMock);
      client.get({ id: 'auth0|1234' }, function(err, data) {
        expect(data).to.deep.equal({ data: 'value' });
        done();
        nock.cleanAll();
      });
    });
    it('should not encode other params on `get` requests', function(done) {
      nock(API_URL)
        .get('/some-resource/1234?otherEncoded=auth0%7C6789&other=foobar')
        .reply(200, { data: 'value' });

      var options = {
        headers: {}
      };
      var client = new Auth0RestClient(API_URL + '/some-resource/:id', options, this.providerMock);
      client.get({ id: '1234', other: 'foobar', otherEncoded: 'auth0|6789' }, function(err, data) {
        expect(err).to.be.null;
        expect(data).to.deep.equal({ data: 'value' });
        done();
        nock.cleanAll();
      });
    });
    it('should accept only a callback', function(done) {
      nock(API_URL)
        .get('/some-resource')
        .reply(200, { data: 'value' });

      var options = {
        headers: {}
      };
      var client = new Auth0RestClient(API_URL + '/some-resource', options, this.providerMock);
      client.get({}, function(err, data) {
        expect(data).to.deep.equal({ data: 'value' });
        done();
        nock.cleanAll();
      });
    });
    it('should return a promise if no callback is provided', function(done) {
      nock(API_URL)
        .get('/some-resource')
        .reply(200, { data: 'value' });

      var options = {
        headers: {}
      };
      var client = new Auth0RestClient(API_URL + '/some-resource', options, this.providerMock);
      client.get().then(data => {
        expect(data).to.deep.equal({ data: 'value' });
        done();
        nock.cleanAll();
      });
    });
  });

  describe('`patch`', () => {
    it('should encode params.id on `patch` requests', function(done) {
      nock(API_URL)
        .patch('/some-resource/auth0%7C1234%2F5678')
        .reply(200);

      var client = new Auth0RestClient(
        API_URL + '/some-resource/:id',
        { headers: {} },
        this.providerMock
      );
      client.patch({ id: 'auth0|1234/5678' }, { data: 'udpate ' }, function(err, data) {
        expect(err).to.be.null;
        done();
        nock.cleanAll();
      });
    });
  });

  describe('`update`', () => {
    it('should encode params.id on `update` requests', function(done) {
      nock(API_URL)
        .put('/some-resource/auth0%7C1234%2F5678')
        .reply(200);

      var client = new Auth0RestClient(
        API_URL + '/some-resource/:id',
        { headers: {} },
        this.providerMock
      );
      client.update({ id: 'auth0|1234/5678' }, { data: 'udpate ' }, function(err, data) {
        expect(err).to.be.null;
        done();
        nock.cleanAll();
      });
    });
  });

  describe('`delete`', () => {
    it('should encode params.id on `delete` requests', function(done) {
      nock(API_URL)
        .delete('/some-resource/auth0%7C1234%2F5678')
        .reply(200);

      var client = new Auth0RestClient(
        API_URL + '/some-resource/:id',
        { headers: {} },
        this.providerMock
      );
      client.delete({ id: 'auth0|1234/5678' }, function(err, data) {
        expect(err).to.be.null;
        done();
        nock.cleanAll();
      });
    });
  });

  it('should return a promise if no callback is given', function(done) {
    nock(API_URL)
      .get('/some-resource')
      .reply(200, { data: 'value' });

    var options = {
      headers: {}
    };

    var client = new Auth0RestClient(API_URL + '/some-resource', options, this.providerMock);
    client.getAll().then(function(data) {
      expect(data).to.deep.equal({ data: 'value' });
      done();
      nock.cleanAll();
    });
  });

  it('should accept a callback and handle errors', function(done) {
    var providerMock = {
      getAccessToken: function() {
        return Promise.reject(new Error('Some Error'));
      }
    };

    nock(API_URL)
      .get('/some-resource')
      .reply(500);

    var options = {
      headers: {}
    };
    var client = new Auth0RestClient(API_URL + '/some-resource', options, providerMock);
    client.getAll(function(err, data) {
      expect(err).to.not.null;
      expect(err.message).to.be.equal('Some Error');
      done();
      nock.cleanAll();
    });
  });

  it('should set access token as Authorization header in options object', function(done) {
    nock(API_URL)
      .get('/some-resource')
      .reply(200);

    var options = {
      headers: {}
    };

    var client = new Auth0RestClient(API_URL + '/some-resource', options, this.providerMock);
    client.getAll().then(function(data) {
      expect(client.restClient.options.headers['Authorization']).to.be.equal('Bearer access_token');
      done();
      nock.cleanAll();
    });
  });

  it('should sanitize error when access token is in authorization header', function(done) {
    nock(API_URL)
      .get('/some-resource')
      .reply(401);

    var options = {
      headers: {}
    };

    var client = new Auth0RestClient(API_URL + '/some-resource', options, this.providerMock);
    client.getAll().catch(function(err) {
      const originalRequestHeader = err.originalError.response.request._header;
      expect(originalRequestHeader.authorization).to.equal('[REDACTED]');
      done();
      nock.cleanAll();
    });
  });

  it('should catch error when provider.getAccessToken throws an error', function(done) {
    var providerMock = {
      getAccessToken: function() {
        return Promise.reject(new Error('Some Error'));
      }
    };

    var client = new Auth0RestClient('/some-resource', {}, providerMock);
    client.getAll().catch(function(err) {
      expect(err).to.not.null;
      expect(err.message).to.be.equal('Some Error');
      done();
    });
  });
});
