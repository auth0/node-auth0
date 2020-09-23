var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var jwt = require('jsonwebtoken');
var jwksClient = require('jwks-rsa');
var pem = require('pem');

// Constants.
var DOMAIN = 'tenant.auth0.com';
var CLIENT_ID = 'TEST_CLIENT_ID';
var CLIENT_SECRET = Buffer.from('TEST_CLIENT_SECRET', 'base64');

var OAUthWithIDTokenValidation = require('../../src/auth/OAUthWithIDTokenValidation');
var PARAMS = { params: true };
var DATA = { data: true };

var createCertificate = function(cb) {
  pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
    if (err) {
      throw err;
    }
    pem.getPublicKey(keys.certificate, function(e, p) {
      if (e) {
        throw e;
      }
      cb({ serviceKey: keys.serviceKey, certificate: keys.certificate, publicKey: p.publicKey });
    });
  });
};

describe('OAUthWithIDTokenValidation', function() {
  describe('constructor', function() {
    it('validates `oauth` is required', function() {
      expect(function() {
        new OAUthWithIDTokenValidation();
      }).to.throw('Missing OAuthAuthenticator param');
    });
    it('validates `options` is required', function() {
      expect(function() {
        new OAUthWithIDTokenValidation({});
      }).to.throw('Missing authenticator options');
    });
    it('validates `oauth` is required', function() {
      expect(function() {
        new OAUthWithIDTokenValidation({}, 'asd');
      }).to.throw('The authenticator options must be an object');
    });
  });
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
    it('Bypasses validation when options.__bypassIdTokenValidation is true', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({ id_token: 'foobar' }));
        }
      };
      var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
        __bypassIdTokenValidation: true
      });
      oauthWithValidation.create(PARAMS, DATA, done);
    });
    it('Calls jwt.verify with token and algs', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({ id_token: 'foobar' }));
        }
      };
      sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
        expect(idtoken).to.be.equal('foobar');
        expect(options).to.be.eql({
          audience: CLIENT_ID,
          algorithms: ['HS256', 'RS256'],
          issuer: 'https://' + DOMAIN + '/'
        });
        done();
      });
      var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
        clientId: CLIENT_ID,
        domain: DOMAIN
      });
      oauthWithValidation.create(PARAMS, DATA);
    });
    it('Returns auth result when verify response is successful', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({ id_token: 'foobar' }));
        }
      };
      sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
        callback(null, { verification: 'result' });
      });
      OAUthWithIDTokenValidationProxy = proxyquire('../../src/auth/OAUthWithIDTokenValidation', {
        './idToken': { validate: token => token }
      });

      var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {});
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
      sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
        callback({ the: 'error' });
      });
      var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {});
      oauthWithValidation.create(PARAMS, DATA).catch(function(r) {
        expect(r).to.be.eql({ the: 'error' });
        done();
      });
    });
    it('Uses `clientSecret` as key when header.alg === HS256 and there is a user secret', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({ id_token: 'foobar' }));
        }
      };
      sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
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
    it('Returns unvalidated response when header.alg === HS256 and there is no user secret', function(done) {
      var oauth = {
        create: function() {
          return new Promise(res => res({ id_token: 'foobar' }));
        }
      };
      OAUthWithIDTokenValidationProxy = proxyquire('../../src/auth/OAUthWithIDTokenValidation', {
        './idToken': { validate: token => token }
      });

      sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
        getKey({ alg: 'HS256' }, function(err, key) {
          expect(err.message).to.contain(
            'Validation of `id_token` requires a `clientSecret` when using the HS256 algorithm. To ensure tokens are validated, please switch the signing algorithm to RS256 or provide a `clientSecret` in the constructor.'
          );
          callback(err, key);
        });
      });
      var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {});
      oauthWithValidation.create(PARAMS, DATA, function(err, response) {
        expect(err).to.be.null;
        expect(response).to.be.eql({ id_token: 'foobar' });
        done();
      });
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

        sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
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

        sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
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

        sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
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

        sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
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

        sinon.stub(jwt, 'verify').callsFake(function(idtoken, getKey, options, callback) {
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
    describe('#integration', function() {
      it('fails with a HS256 id_token and `options.supportedAlgorithms===RS256`', done => {
        var oauth = {
          create: function() {
            return new Promise(res =>
              res({
                id_token:
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6ImpvaG5mb28iLCJuYW1lIjoiam9obmZvb0BnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMzhmYTAwMjQyM2JkOGM5NDFjNmVkMDU4OGI2MGZmZWQ_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqby5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0wOS0xMlQyMDo1MjoxMS4zMDZaIiwiZW1haWwiOiJqb2huZm9vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmJydWNrZS5jbHViLyIsInN1YiI6ImF1dGgwfDVhMjA1NGZmNDUxNTc3MTFiZTgxODJmNCIsImF1ZCI6IkVxbjdHTUV3VzhDbmN1S2FhcFRuNWs5VEJ0MzRQdldmIiwiaWF0IjoxNTM2Nzg1NTMxLCJleHAiOjE1MzY4MjE1MzF9.mZGsJyJYyp_mkINcnV0JRJ6QPsTXUE8FrpRTruAIqhE'
              })
            );
          }
        };
        var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
          clientSecret: CLIENT_SECRET,
          supportedAlgorithms: ['RS256']
        });
        oauthWithValidation.create(PARAMS, DATA, function(e) {
          expect(e.message).to.eq('invalid algorithm');
          done();
        });
      });
      it('fails with a RS256 id_token and `options.supportedAlgorithms===HS256`', done => {
        createCertificate(function(c) {
          var idtoken = jwt.sign({ foo: 'bar' }, c.serviceKey, {
            algorithm: 'RS256',
            issuer: 'https://auth.brucke.club',
            audience: 'foobar',
            expiresIn: '1d'
          });
          var oauth = {
            create: function() {
              return new Promise(res =>
                res({
                  id_token: idtoken
                })
              );
            }
          };
          var jwksClientStub = sinon.spy(function() {
            return {
              getSigningKey: function(kid, cb) {
                cb(null, { publicKey: c.publicKey });
              }
            };
          });
          OAUthWithIDTokenValidationProxy = proxyquire(
            '../../src/auth/OAUthWithIDTokenValidation',
            {
              'jwks-rsa': jwksClientStub
            }
          );
          var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
            clientSecret: CLIENT_SECRET,
            domain: 'auth.brucke.club',
            supportedAlgorithms: ['HS256']
          });
          oauthWithValidation.create(PARAMS, DATA, function(e, d) {
            expect(e.message).to.eq('invalid algorithm');
            done();
          });
        });
      });
      it('fails when `token.exp` is expired', done => {
        createCertificate(function(c) {
          var idtoken = jwt.sign({ foo: 'bar' }, c.serviceKey, {
            algorithm: 'RS256',
            issuer: 'https://auth.brucke.club',
            audience: 'foobar',
            expiresIn: '-1h'
          });
          var oauth = {
            create: function() {
              return new Promise(res =>
                res({
                  id_token: idtoken
                })
              );
            }
          };
          var jwksClientStub = sinon.spy(function() {
            return {
              getSigningKey: function(kid, cb) {
                cb(null, { publicKey: c.publicKey });
              }
            };
          });
          OAUthWithIDTokenValidationProxy = proxyquire(
            '../../src/auth/OAUthWithIDTokenValidation',
            {
              'jwks-rsa': jwksClientStub
            }
          );
          var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
            clientSecret: CLIENT_SECRET,
            domain: 'auth.brucke.club',
            supportedAlgorithms: ['RS256']
          });
          oauthWithValidation.create(PARAMS, DATA, function(e, d) {
            expect(e.message).to.eq('jwt expired');
            done();
          });
        });
      });
      describe('when using a valid certificate to generate an invalid id_token', function() {
        it('fails when `token.aud` is invalid', done => {
          createCertificate(function(c) {
            var idtoken = jwt.sign({ foo: 'bar' }, c.serviceKey, {
              algorithm: 'RS256',
              audience: 'wrong_audience',
              expiresIn: '1h'
            });
            var oauth = {
              create: function() {
                return new Promise(res =>
                  res({
                    id_token: idtoken
                  })
                );
              }
            };
            var jwksClientStub = sinon.spy(function() {
              return {
                getSigningKey: function(kid, cb) {
                  cb(null, { publicKey: c.publicKey });
                }
              };
            });
            OAUthWithIDTokenValidationProxy = proxyquire(
              '../../src/auth/OAUthWithIDTokenValidation',
              {
                'jwks-rsa': jwksClientStub
              }
            );
            var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
              clientId: 'foobar',
              clientSecret: CLIENT_SECRET,
              domain: 'brucke.auth0.com',
              supportedAlgorithms: ['RS256']
            });
            oauthWithValidation.create(PARAMS, DATA, function(e) {
              expect(e.message).to.eq('jwt audience invalid. expected: foobar');
              done();
            });
          });
        });
        it('fails when `token.iss` is invalid', done => {
          const TEST_AUDIENCE = 'foobar';
          createCertificate(function(c) {
            var idtoken = jwt.sign({ foo: 'bar' }, c.serviceKey, {
              algorithm: 'RS256',
              issuer: 'wrong_issuer',
              audience: TEST_AUDIENCE,
              expiresIn: '1h'
            });
            var oauth = {
              create: function() {
                return new Promise(res =>
                  res({
                    id_token: idtoken
                  })
                );
              }
            };
            var jwksClientStub = sinon.spy(function() {
              return {
                getSigningKey: function(kid, cb) {
                  cb(null, { publicKey: c.publicKey });
                }
              };
            });
            OAUthWithIDTokenValidationProxy = proxyquire(
              '../../src/auth/OAUthWithIDTokenValidation',
              {
                'jwks-rsa': jwksClientStub
              }
            );
            var oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
              clientId: 'foobar',
              clientSecret: CLIENT_SECRET,
              domain: 'brucke.auth0.com',
              supportedAlgorithms: ['RS256']
            });
            oauthWithValidation.create(PARAMS, DATA, function(e) {
              expect(e.message).to.eq('jwt issuer invalid. expected: https://brucke.auth0.com/');
              done();
            });
          });
        });
      });
    });
  });
});
