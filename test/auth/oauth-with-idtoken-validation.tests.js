const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const pem = require('pem');

// Constants.
const DOMAIN = 'tenant.auth0.com';
const CLIENT_ID = 'TEST_CLIENT_ID';
const CLIENT_SECRET = Buffer.from('TEST_CLIENT_SECRET', 'base64');

const OAUthWithIDTokenValidation = require('../../src/auth/OAUthWithIDTokenValidation');
const PARAMS = { params: true };
const DATA = { data: true };

const createCertificate = function (cb) {
  pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
    if (err) {
      throw err;
    }
    pem.getPublicKey(keys.certificate, (e, p) => {
      if (e) {
        throw e;
      }
      cb({ serviceKey: keys.serviceKey, certificate: keys.certificate, publicKey: p.publicKey });
    });
  });
};

describe('OAUthWithIDTokenValidation', () => {
  describe('constructor', () => {
    it('validates `oauth` is required', () => {
      expect(() => {
        new OAUthWithIDTokenValidation();
      }).to.throw('Missing OAuthAuthenticator param');
    });
    it('validates `options` is required', () => {
      expect(() => {
        new OAUthWithIDTokenValidation({});
      }).to.throw('Missing authenticator options');
    });
    it('validates `oauth` is required', () => {
      expect(() => {
        new OAUthWithIDTokenValidation({}, 'asd');
      }).to.throw('The authenticator options must be an object');
    });
  });
  describe('#create', function () {
    this.afterEach(() => {
      if (jwt.verify.restore) {
        jwt.verify.restore();
      }
      if (jwksClient.restore) {
        jwksClient.restore();
      }
    });
    it('Calls `oauth.create` with correct params', (done) => {
      const oauth = {
        create(params, data) {
          expect(params).to.be.equal(PARAMS);
          expect(data).to.be.equal(DATA);
          done();
        },
      };
      const oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {});
      oauthWithValidation.create(PARAMS, DATA);
    });
    it('Does nothing when there is no id_token', (done) => {
      const oauth = {
        create() {
          return new Promise((resolve) => resolve({}));
        },
      };
      const oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {});
      oauthWithValidation.create(PARAMS, DATA, done);
    });
    it('Bypasses validation when options.__bypassIdTokenValidation is true', (done) => {
      const oauth = {
        create() {
          return new Promise((resolve) => resolve({ id_token: 'foobar' }));
        },
      };
      const oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
        __bypassIdTokenValidation: true,
      });
      oauthWithValidation.create(PARAMS, DATA, done);
    });
    it('Calls jwt.verify with token and algs', (done) => {
      const oauth = {
        create() {
          return new Promise((resolve) => resolve({ id_token: 'foobar' }));
        },
      };
      sinon.stub(jwt, 'verify').callsFake((idtoken, getKey, options) => {
        expect(idtoken).to.be.equal('foobar');
        expect(options).to.be.eql({
          audience: CLIENT_ID,
          algorithms: ['HS256', 'RS256'],
          issuer: `https://${DOMAIN}/`,
        });
        done();
      });
      const oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
        clientId: CLIENT_ID,
        domain: DOMAIN,
      });
      oauthWithValidation.create(PARAMS, DATA);
    });
    it('Returns auth result when verify response is successful', (done) => {
      const oauth = {
        create() {
          return new Promise((resolve) => resolve({ id_token: 'foobar' }));
        },
      };
      sinon.stub(jwt, 'verify').callsFake((idtoken, getKey, options, callback) => {
        callback(null, { verification: 'result' });
      });
      const OAUthWithIDTokenValidationProxy = proxyquire(
        '../../src/auth/OAUthWithIDTokenValidation',
        {
          './idToken': { validate: (token) => token },
        }
      );

      const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {});
      oauthWithValidation.create(PARAMS, DATA).then((r) => {
        expect(r).to.be.eql({ id_token: 'foobar' });
        done();
      });
    });

    it('Returns error when verify response is an error', (done) => {
      const oauth = {
        create() {
          return new Promise((resolve) => resolve({ id_token: 'foobar' }));
        },
      };
      sinon.stub(jwt, 'verify').callsFake((idtoken, getKey, options, callback) => {
        callback({ the: 'error' });
      });
      const oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {});
      oauthWithValidation.create(PARAMS, DATA).catch((r) => {
        expect(r).to.be.eql({ the: 'error' });
        done();
      });
    });

    it('Uses `clientSecret` as key when header.alg === HS256 and there is a user secret', (done) => {
      const oauth = {
        create() {
          return new Promise((resolve) => resolve({ id_token: 'foobar' }));
        },
      };
      sinon.stub(jwt, 'verify').callsFake((idtoken, getKey) => {
        getKey({ alg: 'HS256' }, (err, key) => {
          expect(key).to.be.eql(Buffer.from(CLIENT_SECRET, 'base64'));
          done();
        });
      });
      const oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
        clientSecret: CLIENT_SECRET,
      });
      oauthWithValidation.create(PARAMS, DATA);
    });
    it('Returns unvalidated response when header.alg === HS256 and there is no user secret', (done) => {
      const oauth = {
        create() {
          return new Promise((resolve) => resolve({ id_token: 'foobar' }));
        },
      };
      const OAUthWithIDTokenValidationProxy = proxyquire(
        '../../src/auth/OAUthWithIDTokenValidation',
        {
          './idToken': { validate: (token) => token },
        }
      );

      sinon.stub(jwt, 'verify').callsFake((idtoken, getKey, options, callback) => {
        getKey({ alg: 'HS256' }, (err, key) => {
          expect(err.message).to.contain(
            'Validation of `id_token` requires a `clientSecret` when using the HS256 algorithm. To ensure tokens are validated, please switch the signing algorithm to RS256 or provide a `clientSecret` in the constructor.'
          );
          callback(err, key);
        });
      });
      const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {});
      oauthWithValidation.create(PARAMS, DATA, (err, response) => {
        expect(err).to.be.null;
        expect(response).to.be.eql({ id_token: 'foobar' });
        done();
      });
    });

    describe('when header.alg !== HS256', () => {
      it('creates a jwksClient with the correct jwksUri', (done) => {
        const oauth = {
          create: () => new Promise((resolve) => resolve({ id_token: 'foobar' })),
        };

        const jwksClientStub = sinon.spy(() => ({
          getSigningKey(kid, cb) {
            cb(null, { publicKey: 'publicKey' });
          },
        }));
        jwksClientStub.prototype = {};

        const OAUthWithIDTokenValidationProxy = proxyquire(
          '../../src/auth/OAUthWithIDTokenValidation',
          {
            'jwks-rsa': jwksClientStub,
          }
        );

        sinon.stub(jwt, 'verify').callsFake((idtoken, getKey) => {
          getKey({ alg: 'RS256' }, () => {
            expect(jwksClientStub.getCall(0).args[0].jwksUri).to.be.equal(
              'https://tenant.auth0.com/.well-known/jwks.json'
            );
            done();
          });
        });
        const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET,
        });
        oauthWithValidation.create(PARAMS, DATA);
      });

      it('returns the error when available', (done) => {
        const oauth = {
          create() {
            return new Promise((resolve) => resolve({ id_token: 'foobar' }));
          },
        };
        const jwksClientStub = sinon.spy(() => ({
          getSigningKey(kid, cb) {
            cb({ the: 'error' });
          },
        }));
        jwksClientStub.prototype = {};

        const OAUthWithIDTokenValidationProxy = proxyquire(
          '../../src/auth/OAUthWithIDTokenValidation',
          {
            'jwks-rsa': jwksClientStub,
          }
        );

        sinon.stub(jwt, 'verify').callsFake((idtoken, getKey) => {
          getKey({ kid: 'kid', alg: 'RS256' }, (err) => {
            expect(err).to.be.eql({ the: 'error' });
            done();
          });
        });
        const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET,
        });
        oauthWithValidation.create(PARAMS, DATA);
      });

      it('uses the publicKey when available', (done) => {
        const oauth = {
          create() {
            return new Promise((resolve) => resolve({ id_token: 'foobar' }));
          },
        };
        const jwksClientStub = sinon.spy(() => ({
          getSigningKey(kid, cb) {
            expect(kid).to.be.equal('kid');
            cb(null, { publicKey: 'publicKey' });
          },
        }));
        jwksClientStub.prototype = {};
        const OAUthWithIDTokenValidationProxy = proxyquire(
          '../../src/auth/OAUthWithIDTokenValidation',
          {
            'jwks-rsa': jwksClientStub,
          }
        );

        sinon.stub(jwt, 'verify').callsFake((idtoken, getKey) => {
          getKey({ kid: 'kid', alg: 'RS256' }, (err, key) => {
            expect(key).to.be.equal('publicKey');
            done();
          });
        });
        const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET,
        });
        oauthWithValidation.create(PARAMS, DATA);
      });

      it('uses the publicKey when both keys (publicKey and rsaPublicKey) available', (done) => {
        const oauth = {
          create() {
            return new Promise((resolve) => resolve({ id_token: 'foobar' }));
          },
        };
        const jwksClientStub = sinon.spy(() => ({
          getSigningKey(kid, cb) {
            expect(kid).to.be.equal('kid');
            cb(null, { publicKey: 'publicKey', rsaPublicKey: 'rsaPublicKey' });
          },
        }));
        jwksClientStub.prototype = {};
        const OAUthWithIDTokenValidationProxy = proxyquire(
          '../../src/auth/OAUthWithIDTokenValidation',
          {
            'jwks-rsa': jwksClientStub,
          }
        );

        sinon.stub(jwt, 'verify').callsFake((idtoken, getKey) => {
          getKey({ kid: 'kid', alg: 'RS256' }, (err, key) => {
            expect(key).to.be.equal('publicKey');
            done();
          });
        });
        const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET,
        });
        oauthWithValidation.create(PARAMS, DATA);
      });

      it('uses the rsaPublicKey when there is no publicKey available', (done) => {
        const oauth = {
          create() {
            return new Promise((resolve) => resolve({ id_token: 'foobar' }));
          },
        };
        const jwksClientStub = sinon.spy(() => ({
          getSigningKey(kid, cb) {
            expect(kid).to.be.equal('kid');
            cb(null, { rsaPublicKey: 'rsaPublicKey' });
          },
        }));
        jwksClientStub.prototype = {};
        const OAUthWithIDTokenValidationProxy = proxyquire(
          '../../src/auth/OAUthWithIDTokenValidation',
          {
            'jwks-rsa': jwksClientStub,
          }
        );

        sinon.stub(jwt, 'verify').callsFake((idtoken, getKey) => {
          getKey({ kid: 'kid', alg: 'RS256' }, (err, key) => {
            expect(key).to.be.equal('rsaPublicKey');
            done();
          });
        });
        const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
          domain: DOMAIN,
          clientSecret: CLIENT_SECRET,
        });
        oauthWithValidation.create(PARAMS, DATA);
      });
    });

    describe('#integration', () => {
      it('fails with a HS256 id_token and `options.supportedAlgorithms===RS256`', (done) => {
        const oauth = {
          create() {
            return new Promise((resolve) =>
              resolve({
                id_token:
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6ImpvaG5mb28iLCJuYW1lIjoiam9obmZvb0BnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMzhmYTAwMjQyM2JkOGM5NDFjNmVkMDU4OGI2MGZmZWQ_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqby5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0wOS0xMlQyMDo1MjoxMS4zMDZaIiwiZW1haWwiOiJqb2huZm9vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmJydWNrZS5jbHViLyIsInN1YiI6ImF1dGgwfDVhMjA1NGZmNDUxNTc3MTFiZTgxODJmNCIsImF1ZCI6IkVxbjdHTUV3VzhDbmN1S2FhcFRuNWs5VEJ0MzRQdldmIiwiaWF0IjoxNTM2Nzg1NTMxLCJleHAiOjE1MzY4MjE1MzF9.mZGsJyJYyp_mkINcnV0JRJ6QPsTXUE8FrpRTruAIqhE',
              })
            );
          },
        };
        const oauthWithValidation = new OAUthWithIDTokenValidation(oauth, {
          clientSecret: CLIENT_SECRET,
          supportedAlgorithms: ['RS256'],
        });
        oauthWithValidation.create(PARAMS, DATA, (e) => {
          expect(e.message).to.eq('invalid algorithm');
          done();
        });
      });

      it('fails with a RS256 id_token and `options.supportedAlgorithms===HS256`', (done) => {
        createCertificate((c) => {
          const idtoken = jwt.sign({ foo: 'bar' }, c.serviceKey, {
            algorithm: 'RS256',
            issuer: 'https://auth.brucke.club',
            audience: 'foobar',
            expiresIn: '1d',
          });
          const oauth = {
            create() {
              return new Promise((resolve) =>
                resolve({
                  id_token: idtoken,
                })
              );
            },
          };
          const jwksClientStub = sinon.spy(() => ({
            getSigningKey(kid, cb) {
              cb(null, { publicKey: c.publicKey });
            },
          }));
          jwksClientStub.prototype = {};
          const OAUthWithIDTokenValidationProxy = proxyquire(
            '../../src/auth/OAUthWithIDTokenValidation',
            {
              'jwks-rsa': jwksClientStub,
            }
          );

          const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
            clientSecret: CLIENT_SECRET,
            domain: 'auth.brucke.club',
            supportedAlgorithms: ['HS256'],
          });
          oauthWithValidation.create(PARAMS, DATA, (e) => {
            expect(e.message).to.eq('invalid algorithm');
            done();
          });
        });
      });

      it('fails when `token.exp` is expired', (done) => {
        createCertificate((c) => {
          const idtoken = jwt.sign({ foo: 'bar' }, c.serviceKey, {
            algorithm: 'RS256',
            issuer: 'https://auth.brucke.club',
            audience: 'foobar',
            expiresIn: '-1h',
          });
          const oauth = {
            create() {
              return new Promise((resolve) =>
                resolve({
                  id_token: idtoken,
                })
              );
            },
          };
          const jwksClientStub = sinon.spy(() => ({
            getSigningKey(kid, cb) {
              cb(null, { publicKey: c.publicKey });
            },
          }));
          jwksClientStub.prototype = {};
          const OAUthWithIDTokenValidationProxy = proxyquire(
            '../../src/auth/OAUthWithIDTokenValidation',
            {
              'jwks-rsa': jwksClientStub,
            }
          );

          const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
            clientSecret: CLIENT_SECRET,
            domain: 'auth.brucke.club',
            supportedAlgorithms: ['RS256'],
          });
          oauthWithValidation.create(PARAMS, DATA, (e) => {
            expect(e.message).to.eq('jwt expired');
            done();
          });
        });
      });

      describe('when using a valid certificate to generate an invalid id_token', () => {
        it('fails when `token.aud` is invalid', (done) => {
          createCertificate((c) => {
            const idtoken = jwt.sign({ foo: 'bar' }, c.serviceKey, {
              algorithm: 'RS256',
              audience: 'wrong_audience',
              expiresIn: '1h',
            });
            const oauth = {
              create() {
                return new Promise((resolve) =>
                  resolve({
                    id_token: idtoken,
                  })
                );
              },
            };
            const jwksClientStub = sinon.spy(() => ({
              getSigningKey(kid, cb) {
                cb(null, { publicKey: c.publicKey });
              },
            }));
            jwksClientStub.prototype = {};
            const OAUthWithIDTokenValidationProxy = proxyquire(
              '../../src/auth/OAUthWithIDTokenValidation',
              {
                'jwks-rsa': jwksClientStub,
              }
            );

            const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
              clientId: 'foobar',
              clientSecret: CLIENT_SECRET,
              domain: 'brucke.auth0.com',
              supportedAlgorithms: ['RS256'],
            });
            oauthWithValidation.create(PARAMS, DATA, (e) => {
              expect(e.message).to.eq('jwt audience invalid. expected: foobar');
              done();
            });
          });
        });

        it('fails when `token.iss` is invalid', (done) => {
          const TEST_AUDIENCE = 'foobar';
          createCertificate((c) => {
            const idtoken = jwt.sign({ foo: 'bar' }, c.serviceKey, {
              algorithm: 'RS256',
              issuer: 'wrong_issuer',
              audience: TEST_AUDIENCE,
              expiresIn: '1h',
            });
            const oauth = {
              create() {
                return new Promise((resolve) =>
                  resolve({
                    id_token: idtoken,
                  })
                );
              },
            };
            const jwksClientStub = sinon.spy(() => ({
              getSigningKey(kid, cb) {
                cb(null, { publicKey: c.publicKey });
              },
            }));
            jwksClientStub.prototype = {};
            const OAUthWithIDTokenValidationProxy = proxyquire(
              '../../src/auth/OAUthWithIDTokenValidation',
              {
                'jwks-rsa': jwksClientStub,
              }
            );

            const oauthWithValidation = new OAUthWithIDTokenValidationProxy(oauth, {
              clientId: 'foobar',
              clientSecret: CLIENT_SECRET,
              domain: 'brucke.auth0.com',
              supportedAlgorithms: ['RS256'],
            });
            oauthWithValidation.create(PARAMS, DATA, (e) => {
              expect(e.message).to.eq('jwt issuer invalid. expected: https://brucke.auth0.com/');
              done();
            });
          });
        });
      });
    });
  });
});
