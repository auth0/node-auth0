var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

process.env.WEBTASK_API_TOKEN =
  'eyJhbGciOiJIUzI1NiIsImtpZCI6InVzLTMifQ.eyJqdGkiOiI0OTI4MzVhOGZkMGI0MjQ2YWQwYmMyODYxNjBhMzk0MyIsImlhdCI6MTU1ODQ3MTMzMiwiY2EiOltdLCJkZCI6MSwidGVuIjoibGVzLXRlc3QifQ.KHfAfZKjjhTr51p0T80sMdhzDRZXb04kRMchFN3fqf4';
process.env.WEBTASK_API_URL = 'https://sandbox8-us.it.auth0.com';

var HooksManager = require(SRC_DIR + '/management/HooksManager');
var ArgumentError = require('rest-facade').ArgumentError;

const hook_template = `/**
@param {object} client - information about the client
@param {string} client.name - name of client
@param {string} client.id - client id
@param {string} client.tenant - Auth0 tenant name
@param {object} client.metadata - client metadata
@param {array|undefined} scope - array of strings representing the scope claim or undefined
@param {string} audience - token's audience claim
@param {object} context - additional authorization context
@param {object} context.webtask - webtask context
@param {function} cb - function (error, accessTokenClaims)
*/
module.exports = function(client, scope, audience, context, cb) {
  var access_token = {};
  access_token.scope = scope;

  // Modify scopes or add extra claims
  // access_token['https://example.com/claim'] = 'bar';
  // access_token.scope.push('extra');

  cb(null, access_token);
};
`;

describe('HooksManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.hooks = new HooksManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['get'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.hooks[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(HooksManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = HooksManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = HooksManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.data = {
        triggerId: 'credentials-exchange',
        name: 'cce-hook',
        active: true,
        code: hook_template,
        secrets: {
          'api-key': 'my custom api key'
        },
        dependencies: {
          bcrypt: '3.0.6'
        }
      };

      this.request = nock(API_URL)
        .get('/hooks/' + this.data.name)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { id: this.data.name };

      this.hooks.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.hooks
        .get({ id: this.data.name })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/hooks/:id', function(done) {
      var request = this.request;

      this.hooks.get({ id: this.data.name }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/hooks/' + this.data.name)
        .reply(500);

      this.hooks.get({ id: this.data.name }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/hooks/' + this.data.name)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.hooks.get({ id: this.data.name }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
