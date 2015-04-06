var expect = require('chai').expect;
var nock = require('nock');
var util = require('util');
var constants = require('./constants');

var TOKEN = 'token';
var auth0 = require('..')(TOKEN);

describe('app metadata', function(){
  describe('update', function(){
    var user_id = 'google-oauth|1234';
    var url = util.format(constants.USER_SUB_ROUTE, user_id);
    var update = {
      roles: ['reader', 'writer'],
      permissions: null
    };

    var body = {
      app_metadata: update
    };

    var baseNock;
    beforeEach(function(){
      baseNock = nock(constants.BASE_API_URL, {
        reqheaders: {
          'Authorization': 'Bearer ' + TOKEN
        }
      })
      .patch(url, body);
    });

    afterEach(function(){
      nock.cleanAll();
    });

    it('should pass error to callback when response code is >= 400', function(done){
      var localNock = baseNock.reply(401, {
        'statusCode': 401,
        'error': 'Unauthorized',
        'message': 'Invalid token'
      });

      auth0.user(user_id).appMetadata.update(update, function(err, body){
        expect(err).to.not.be.undefined;
        expect(body.statusCode).to.equal(401);
        expect(body.error).to.equal('Unauthorized');
        expect(body.message).to.equal('Invalid token');
        localNock.done();
        done();
      });
    });

    it('should pass body to callback if response code is 200', function(done){
      var localNock = baseNock.reply(200, {
        app_metadata: {
          roles: [ 'reader', 'writer' ],
        },
        id: user_id
      });

      auth0.user(user_id).appMetadata.update(update, function(err, body){
        expect(err).to.be.equal(null);
        expect(body.id).to.equal(user_id);
        expect(body.app_metadata.roles).to.have.length(2);
        expect(body.app_metadata.roles[0]).to.equal('reader');
        expect(body.app_metadata.roles[1]).to.equal('writer');
        localNock.done();
        done();
      });
    });
  });
});