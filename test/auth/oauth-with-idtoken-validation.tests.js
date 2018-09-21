var expect = require('chai').expect;
var Promise = require('bluebird');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var jwt = require('jsonwebtoken');
var jwksClient = require('jwks-rsa');
var pem = require('pem');

// Constants.
var DOMAIN = 'tenant.auth0.com';
var CLIENT_ID = 'TEST_CLIENT_ID';
var CLIENT_SECRET = new Buffer('TEST_CLIENT_SECRET', 'base64');

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

describe.only('OAUthWithIDTokenValidation', function() {
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
        var oauth = {
          create: function() {
            return new Promise(res =>
              res({
                id_token:
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FVkJOVU5CT1RneFJrRTVOa1F6UXpjNE9UQkVNRUZGUkRRNU4wUTJRamswUmtRMU1qRkdNUSJ9.eyJuaWNrbmFtZSI6ImpvaG5mb28iLCJuYW1lIjoiam9obmZvb0BnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMzhmYTAwMjQyM2JkOGM5NDFjNmVkMDU4OGI2MGZmZWQ_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqby5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0wOS0xMlQyMDo1NTozMi4xMTlaIiwiZW1haWwiOiJqb2huZm9vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmJydWNrZS5jbHViLyIsInN1YiI6ImF1dGgwfDVhMjA1NGZmNDUxNTc3MTFiZTgxODJmNCIsImF1ZCI6IkVxbjdHTUV3VzhDbmN1S2FhcFRuNWs5VEJ0MzRQdldmIiwiaWF0IjoxNTM2Nzg1NzMyLCJleHAiOjE1MzY4MjE3MzJ9.i8iBJntBiSPRLIJdLmgTwnT_FXamc4ug8al8Ws1X-P7UAxbEaaa3irjqfBnDf50tDAQkHFcwIKiMDIrEHHBEPPEc7MH8dlxDAr80Pr8-T-M_ls8U6KccBGfrsurlJaU6qMVSfUP25kmZm5torI0D81c9rZRWcdpb64EnZCvqpUPWZjap__PoC-G88NRH_28jT_hV-bGYgbjJ3FqL_xTZ2u866bQljt1oJlOf3vvLIL4tW9MYdYxOvh7VZXWji9TirrjCb6cuq-CZ5ZWTSpV_NRC24BMdGx_Mu-4EBUMb8uWiaLBrjJgb_NtOZXY6p6PeJQuX5S2MeD2z_SCXOcwukQ'
              })
            );
          }
        };
        var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
          clientSecret: CLIENT_SECRET,
          domain: 'brucke.auth0.com',
          supportedAlgorithms: ['HS256']
        });
        oauthWithValidation.create(PARAMS, DATA, function(e) {
          expect(e.message).to.eq('invalid algorithm');
          done();
        });
      });
      it('fails when `token.exp` is expired', done => {
        var oauth = {
          create: function() {
            return new Promise(res =>
              res({
                id_token:
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FVkJOVU5CT1RneFJrRTVOa1F6UXpjNE9UQkVNRUZGUkRRNU4wUTJRamswUmtRMU1qRkdNUSJ9.eyJuaWNrbmFtZSI6ImpvaG5mb28iLCJuYW1lIjoiam9obmZvb0BnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMzhmYTAwMjQyM2JkOGM5NDFjNmVkMDU4OGI2MGZmZWQ_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqby5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0wOS0xMlQyMToxNzoyNy41NjVaIiwiZW1haWwiOiJqb2huZm9vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9icnVja2UuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhMjA1NGZmNDUxNTc3MTFiZTgxODJmNCIsImF1ZCI6IkVxbjdHTUV3VzhDbmN1S2FhcFRuNWs5VEJ0MzRQdldmIiwiaWF0IjoxNTM2Nzg3MDQ3LCJleHAiOjE1MzY3ODcwNTJ9.Wn6ie7sXQ7jG94MDumSa2vciKkt5qrDN8LGWw1U9cz8Oh15JxFZOxtPJxWST5t6i8biJ4l7fvjez7KkoibRf9TPXpe0VxE2SsQCy-H2TRlUSnodBg25WRPPKmXvA6tB_CeaZjDplaTV21fnvcRq7kCwl_O91meWS7Qs3rEWvrD_M63LvDPvAReKcNFRg42p_nZS5fnq2CLC6OHUBznkZfMforNJ8YC0GufcrBd2lRaNljF57Z6fHSupfwY9vLIxfp-nx7yYl7H1vjp75f-08h8mOLRgZdpCjG3z8QKCBwsY_5t8dnQfZiUsGhRFx6hsTb6BC35JHkNHSyOw75tfl9A'
              })
            );
          }
        };
        var oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
          clientSecret: CLIENT_SECRET,
          domain: 'auth.brucke.club',
          supportedAlgorithms: ['RS256']
        });
        oauthWithValidation.create(PARAMS, DATA, function(e, d) {
          expect(e.message).to.eq('jwt expired');
          done();
        });
      });
      describe('when using a valid token', function() {
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
          createCertificate(function(c) {
            var idtoken = jwt.sign({ foo: 'bar' }, c.serviceKey, {
              algorithm: 'RS256',
              issuer: 'wrong_issuer',
              audience: 'foobar',
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
