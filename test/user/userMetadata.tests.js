var expect = require('chai').expect;
var nock = require('nock');
var util = require('util');
var constants = require('./../constants');

var token = 'token';
var auth0 = require('../../src')({ token: token });


describe('User Metadata', function(){

  describe('#updateUserMetadata', function(){
    var baseNock;
    var userId = 'google-oauth%7C1234';
    var url = util.format(constants.USERS_ENDPOINT, userId);
    var userMetadata = {
      hobby: 'surf',
      theme: null
    };
    var requestData = { user_metadata: userMetadata };

    beforeEach(function(){
      baseNock = nock(constants.BASE_API_URL)
        .matchHeader('authorization', 'Bearer ' + token)
        .patch(url, requestData);
    });

    afterEach(function(){
      nock.cleanAll();
    });

    it('should pass error to callback when response code is >= 400', function(done){
      // Mock the /api/v2 endpoint to return an Unauthorized response.
      var localNock = baseNock.reply(401, {
        'statusCode': 401,
        'error': 'Unauthorized',
        'message': 'Invalid token'
      });

      auth0.users.updateUserMetadata(userId, userMetadata, function(err){
        expect(err).to.not.be.undefined;
        expect(err.statusCode).to.equal(401);
        expect(err.error).to.equal('Unauthorized');
        expect(err.message).to.equal('Invalid token');

        localNock.done();
        done();
      });
    });

    /*
    it('should return a promise', function () {
      var promise = auth0.users.updateUserMetadata(userId, userMetadata);

      expect(promise).to.be.a(Promise);
    });
    */

    it('should pass body to callback if response code is 200', function(){
      // Mock the /api/v2 endpoint to return a OK response.
      var localNock = baseNock.reply(200, {
        user_metadata: userMetadata,
        id: userId
      });

      return auth0.users
        .updateUserMetadata(userId, userMetadata)
        .then(function(user){
          expect(user.id).to.equal(userId);
          expect(user.user_metadata.hobby).to.equal('surf');

          localNock.done();
        });
    });
  });
});
