var expect = require('chai').expect;
var nock = require('nock');
var assign = Object.assign || require('object.assign');
var ArgumentError = require('rest-facade').ArgumentError;
var APIError = require('rest-facade').APIError;

var ManagementTokenProvider = require('../../src/management/ManagementTokenProvider');

describe('ManagementTokenProvider', function () {
  var defaultConfig = { clientId: 'clientId', clientSecret: 'clientSecret', 'domain': 'auth0-node-sdk.auth0.com' };

  it('should expose an instance of ManagementTokenProvider', function () {
    expect(new ManagementTokenProvider(defaultConfig))
      .to.exist
      .to.be.an.instanceOf(ManagementTokenProvider);
  });

  it('should raise an error when no options object is provided', function () {
    expect(ManagementTokenProvider)
      .to.throw(ArgumentError, 'Options must be an object');
  });

  it('should raise an error when the domain is not set', function () {
    var provider = ManagementTokenProvider.bind(null, { clientId: 'clientId', clientSecret: 'clientSecret' });

    expect(provider)
      .to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when the domain is not valid', function () {
    var provider = ManagementTokenProvider.bind(null, { clientId: 'clientId', clientSecret: 'clientSecret', 'domain': '' });

    expect(provider)
      .to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when the clientId is not set', function () {
    var provider = ManagementTokenProvider.bind(null, { clientSecret: 'clientSecret', domain: 'domain' });

    expect(provider)
      .to.throw(ArgumentError, 'Must provide a Client Id');
  });

  it('should raise an error when the clientId is not valid', function () {
    var provider = ManagementTokenProvider.bind(null, { clientId: '', clientSecret: 'clientSecret', 'domain': 'domain' });

    expect(provider)
      .to.throw(ArgumentError, 'Must provide a Client Id');
  });

  it('should raise an error when the clientSecret is not set', function () {
    var provider = ManagementTokenProvider.bind(null, { clientId: 'clientId' , domain: 'domain' });

    expect(provider)
      .to.throw(ArgumentError, 'Must provide a Client Secret');
  });

  it('should raise an error when the clientSecret is not valid', function () {
    var provider = ManagementTokenProvider.bind(null, { clientId: 'clientId', clientSecret: '', 'domain': 'domain' });

    expect(provider)
      .to.throw(ArgumentError, 'Must provide a Client Secret');
  });

  it('should raise an error when the useCache is not of type boolean', function () {
    var provider = ManagementTokenProvider.bind(null, { clientId: 'clientId', clientSecret: 'clientSecret', 'domain': 'domain', 'useCache': 'false' });

    expect(provider)
      .to.throw(ArgumentError, 'The useCache must be a boolean');
  });

  it('should set useCache to true when not specified', function () {
      var provider = new ManagementTokenProvider({ clientId: 'clientId', clientSecret: 'clientSecret', 'domain': 'domain' });
      expect(provider.options.useCache).to.be.true;
  });

  it('should set useCache to true when passed as true', function () {
      var provider = new ManagementTokenProvider({ clientId: 'clientId', clientSecret: 'clientSecret', 'domain': 'domain', 'useCache': true });
      expect(provider.options.useCache).to.be.true;
  });

  it('should set useCache to false when passed as false', function () {
      var provider = new ManagementTokenProvider({ clientId: 'clientId', clientSecret: 'clientSecret', 'domain': 'domain', 'useCache': false });
      expect(provider.options.useCache).to.be.false;
  });

  it('should handle network errors correctly', function (done) {
    var config = assign({}, defaultConfig);
    config.domain = 'domain';
    var client = new ManagementTokenProvider(config);

    nock('https://' + config.domain)
      .post('/oauth/token')
      .reply(401);

    client.getAccessToken()
      .catch(function(err){
        expect(err).to.exist
        done();
      });
  }); 

  it('should handle unauthorized errors correctly', function (done) {
    var client = new ManagementTokenProvider(defaultConfig);

    nock('https://' + defaultConfig.domain)
      .post('/oauth/token')
      .reply(401);

    client.getAccessToken()
      .catch(function(err){
        expect(err)
          .to.exist
          .to.be.an.instanceOf(APIError);
        expect(err.statusCode).to.be.equal(401);
        done();
        nock.cleanAll();
      });
  }); 

  it('should return access token', function (done) {
    var config = assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-1.auth0.com'
    var client = new ManagementTokenProvider(config);

    nock('https://' + config.domain)
      .post('/oauth/token')
      .reply(200, {
        access_token: 'token',
        expires_in: 3600
      })

    client.getAccessToken()
      .then(function(access_token){
        expect(access_token).to.exist;
        expect(access_token).to.be.equal('token');
        done();
        nock.cleanAll();
      });
  }); 

  it('should contain correct body payload', function (done) {
    var config = assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-2.auth0.com'
    var client = new ManagementTokenProvider(config);
    
      nock('https://' + config.domain)
      .post('/oauth/token',function(body) {
        
        expect(body.client_id).to.equal('clientId');
        expect(body.client_secret).to.equal('clientSecret');
        expect(body.grant_type).to.equal('client_credentials');
        expect(body.audience).to.equal('https://auth0-node-sdk-2.auth0.com/api/v2/');
        return true;
      })
      .reply(function(uri, requestBody, cb) {
        return cb(null, [200, { access_token: 'token', expires_in: 3600 }]);
      });

    client.getAccessToken()
      .then(function(data){

        done();
        nock.cleanAll();
      });
  });

  it('should return access token from the cache the second call', function (done) {
    var config = assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-3.auth0.com'
    var client = new ManagementTokenProvider(config);

    nock('https://' + config.domain)
      .post('/oauth/token')
      .once()
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      });

    client.getAccessToken()
      .then(function(access_token){
        expect(access_token).to.exist;
        expect(access_token).to.be.equal('access_token');

          client.getAccessToken()
          .then(function(access_token){
            expect(access_token).to.exist;
            expect(access_token).to.be.equal('access_token');
            done();
            nock.cleanAll();
          });
      });
  }); 

  it('should request new access token when cache is expired', function (done) {
    var config = assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-4.auth0.com'
    var client = new ManagementTokenProvider(config);

    nock('https://' + config.domain)
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 1 / 40 // 1sec / 40 = 25ms
      })
      .post('/oauth/token')
      .reply(200, {
        access_token: 'new_access_token',
        expires_in: 3600
      })

    client.getAccessToken()
      .then(function(access_token){
        expect(access_token).to.exist;
        expect(access_token).to.be.equal('access_token');

        setTimeout(function() {
          client.getAccessToken()
            .then(function(access_token){
              expect(access_token).to.exist;
              expect(access_token).to.be.equal('new_access_token');
              done();
              nock.cleanAll();
            });
        }, 40); // 40ms 
      });
  });

  it('should return new access token on the second call when cache is disabled', function (done) {
    var config = assign({ useCache: false }, defaultConfig);
    config.domain = 'auth0-node-sdk-3.auth0.com'
    var client = new ManagementTokenProvider(config);

    nock('https://' + config.domain)
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .post('/oauth/token')
      .reply(200, {
        access_token: 'new_access_token',
        expires_in: 3600
      })

    client.getAccessToken()
      .then(function(access_token){
        expect(access_token).to.exist;
        expect(access_token).to.be.equal('access_token');

          client.getAccessToken()
          .then(function(access_token){
            expect(access_token).to.exist;
            expect(access_token).to.be.equal('new_access_token');
            done();
            nock.cleanAll();
          }).catch(function(err){
            expect.fail();
            done();
            nock.cleanAll();
          });
      });
  });

  it('should pass the correct payload in the body of the oauth/token request', function (done) {
    var config = assign({ scope: 'read:foo read:bar' }, defaultConfig);
    var client = new ManagementTokenProvider(config); 
    
    nock('https://' + config.domain)
      .post('/oauth/token', function(payload){
        expect(payload).to.exist; 
        expect(payload.scope).to.be.equal('read:foo read:bar');
        expect(payload.client_id).to.be.equal('clientId');
        expect(payload.client_secret).to.be.equal('clientSecret');
        expect(payload.grant_type).to.be.equal('client_credentials');
        expect(payload.audience).to.be.equal('https://auth0-node-sdk.auth0.com/api/v2/');
        return true;
      })
      .reply(200);

    client.getAccessToken()
      .then(function(access_token){
        done();
        nock.cleanAll();
      });
  });
});
