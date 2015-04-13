var expect = require('chai').expect;
var nock = require('nock');
var util = require('util');
var constants = require('./constants');

var TOKEN = 'token';
var auth0 = require('..')({ token: TOKEN });

describe('user metadata', function(){
  describe('update', function(){
    var user_id = 'google-oauth%7C1234';
    var url = util.format(constants.USER_SUB_ROUTE, user_id);
    var update = {
      hobby: 'surf',
      theme: null
    };

    var body = {
      user_metadata: update
    };

    var baseNock;
    beforeEach(function(){
      baseNock = nock(constants.BASE_API_URL)
        .matchHeader('authorization', 'Bearer ' + TOKEN)
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

      auth0.user(user_id).userMetadata.update(update, function(err){
        expect(err).to.not.be.undefined;
        expect(err.statusCode).to.equal(401);
        expect(err.error).to.equal('Unauthorized');
        expect(err.message).to.equal('Invalid token');
        localNock.done();
        done();
      });
    });

    it('should pass body to callback if response code is 200', function(){
      var localNock = baseNock.reply(200, {
        user_metadata: update,
        id: user_id
      });

      return auth0.user(user_id).userMetadata.update(update)
        .then(function(body){
          expect(body.id).to.equal(user_id);
          expect(body.user_metadata.hobby).to.equal('surf');
          localNock.done();
        });
    });
  });
});