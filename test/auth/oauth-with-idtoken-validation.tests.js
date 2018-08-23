var expect = require('chai').expect;
var Promise = require('bluebird');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var jwt = require('jsonwebtoken');
var jwksClient = require('jwks-rsa');

// Constants.
var DOMAIN = 'tenant.auth0.com';
var CLIENT_ID = 'TEST_CLIENT_ID';
var CLIENT_SECRET = new Buffer('TEST_CLIENT_SECRET', 'base64');

var OAUthWithIDTokenValidation = require('../../src/auth/OAUthWithIDTokenValidation');
var PARAMS = { params: true };
var DATA = { data: true };

describe('OAUthWithIDTokenValidation2', function() {
  describe('#create', function() {
    this.afterEach(function() {
      if (jwt.verify.restore) {
        jwt.verify.restore();
      }
      if (jwksClient.restore) {
        jwksClient.restore();
      }
    });
    it('Calls `oauth.create` with correct params', function(done) {
      var oauth = {
        create: function(params, data) {
          expect(params).to.be.equal(PARAMS);
          expect(data).to.be.equal(DATA);
          return new Promise(res => res({}));
        }
      };
      var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {});
      oauthWithValidation.create(PARAMS, DATA, done);
    });
    it('Does nothing when there is no id_token', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({}));
        }
      };
      var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {});
      oauthWithValidation.create(PARAMS, DATA, done);
    });
    it('Calls jwt.verify with token and algs', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({ id_token: 'foobar' }));
        }
      };
      sinon.stub(jwt, 'verify', function(idtoken, getKey, options, callback) {
        expect(idtoken).to.be.equal('foobar');
        expect(options).to.be.eql({
          algorithms: ['HS256', 'RS256']
        });
        done();
      });
      var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {});
      oauthWithValidation.create(PARAMS, DATA);
    });
    it('Returns auth result when verify response is successful', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({ id_token: 'foobar' }));
        }
      };
      sinon.stub(jwt, 'verify', function(idtoken, getKey, options, callback) {
        callback(null, { verification: 'result' });
      });
      var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {});
      oauthWithValidation.create(PARAMS, DATA).then(function(r) {
        expect(r).to.be.eql({ id_token: 'foobar' });
        done();
      });
    });
    it('Returns error when verify response is an error', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({ id_token: 'foobar' }));
        }
      };
      sinon.stub(jwt, 'verify', function(idtoken, getKey, options, callback) {
        callback({ the: 'error' });
      });
      var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {});
      oauthWithValidation.create(PARAMS, DATA).catch(function(r) {
        expect(r).to.be.eql({ the: 'error' });
        done();
      });
    });
    it('Calls uses secret as key when header.alg === HS256', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({ id_token: 'foobar' }));
        }
      };
      sinon.stub(jwt, 'verify', function(idtoken, getKey, options, callback) {
        getKey({ alg: 'HS256' }, function(err, key) {
          expect(key).to.be.eql(Buffer.from(CLIENT_SECRET, 'base64'));
          done();
        });
      });
      var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
        clientSecret: CLIENT_SECRET
      });
      oauthWithValidation.create(PARAMS, DATA);
    });
    describe('when header.alg !== HS256', function() {
      it('creates a jwksClient with the correct jwksUri', function(done) {
        var oauth = {
          create: function() {
            return new Promise(res => res({ id_token: 'foobar' }));
          }
        };
        var jwksClientStub = sinon.spy(function() {
          return {
            getSigningKey: function(kid, cb) {
              cb(null, { publicKey: 'publicKey' });
            }
          };
        });
        OAUthWithIDTokenValidationProxy = proxyquire('../../src/auth/OAUthWithIDTokenValidation', {
          'jwks-rsa': jwksClientStub
        });

        sinon.stub(jwt, 'verify', function(idtoken, getKey, options, callback) {
          getKey({ alg: 'RS256' }, function(err, key) {
            expect(jwksClientStub.getCall(0).args[0].jwksUri).to.be.equal(
              'https://tenant.auth0.com/.well-known/jwks.json'
            );
            done();
          });
        });
        var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET
        });
        oauthWithValidation.create(PARAMS, DATA);
      });
      it('returns the error when available', function(done) {
        var oauth = {
          create: function() {
            return new Promise(res => res({ id_token: 'foobar' }));
          }
        };
        var jwksClientStub = sinon.spy(function() {
          return {
            getSigningKey: function(kid, cb) {
              cb({ the: 'error' });
            }
          };
        });
        OAUthWithIDTokenValidationProxy = proxyquire('../../src/auth/OAUthWithIDTokenValidation', {
          'jwks-rsa': jwksClientStub
        });

        sinon.stub(jwt, 'verify', function(idtoken, getKey, options, callback) {
          getKey({ kid: 'kid', alg: 'RS256' }, function(err, key) {
            expect(err).to.be.eql({ the: 'error' });
            done();
          });
        });
        var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET
        });
        oauthWithValidation.create(PARAMS, DATA);
      });
      it('uses the publicKey when available', function(done) {
        var oauth = {
          create: function() {
            return new Promise(res => res({ id_token: 'foobar' }));
          }
        };
        var jwksClientStub = sinon.spy(function() {
          return {
            getSigningKey: function(kid, cb) {
              expect(kid).to.be.equal('kid');
              cb(null, { publicKey: 'publicKey' });
            }
          };
        });
        OAUthWithIDTokenValidationProxy = proxyquire('../../src/auth/OAUthWithIDTokenValidation', {
          'jwks-rsa': jwksClientStub
        });

        sinon.stub(jwt, 'verify', function(idtoken, getKey, options, callback) {
          getKey({ kid: 'kid', alg: 'RS256' }, function(err, key) {
            expect(key).to.be.equal('publicKey');
            done();
          });
        });
        var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET
        });
        oauthWithValidation.create(PARAMS, DATA);
      });
      it('uses the publicKey when both keys (publicKey and rsaPublicKey) available', function(done) {
        var oauth = {
          create: function() {
            return new Promise(res => res({ id_token: 'foobar' }));
          }
        };
        var jwksClientStub = sinon.spy(function() {
          return {
            getSigningKey: function(kid, cb) {
              expect(kid).to.be.equal('kid');
              cb(null, { publicKey: 'publicKey', rsaPublicKey: 'rsaPublicKey' });
            }
          };
        });
        OAUthWithIDTokenValidationProxy = proxyquire('../../src/auth/OAUthWithIDTokenValidation', {
          'jwks-rsa': jwksClientStub
        });

        sinon.stub(jwt, 'verify', function(idtoken, getKey, options, callback) {
          getKey({ kid: 'kid', alg: 'RS256' }, function(err, key) {
            expect(key).to.be.equal('publicKey');
            done();
          });
        });
        var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET
        });
        oauthWithValidation.create(PARAMS, DATA);
      });
      it('uses the rsaPublicKey when there is no publicKey available', function(done) {
        var oauth = {
          create: function() {
            return new Promise(res => res({ id_token: 'foobar' }));
          }
        };
        var jwksClientStub = sinon.spy(function() {
          return {
            getSigningKey: function(kid, cb) {
              expect(kid).to.be.equal('kid');
              cb(null, { rsaPublicKey: 'rsaPublicKey' });
            }
          };
        });
        OAUthWithIDTokenValidationProxy = proxyquire('../../src/auth/OAUthWithIDTokenValidation', {
          'jwks-rsa': jwksClientStub
        });

        sinon.stub(jwt, 'verify', function(idtoken, getKey, options, callback) {
          getKey({ kid: 'kid', alg: 'RS256' }, function(err, key) {
            expect(key).to.be.equal('rsaPublicKey');
            done();
          });
        });
        var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET
        });
        oauthWithValidation.create(PARAMS, DATA);
      });
    });
  });
});
