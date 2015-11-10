var expect = require('chai').expect;
var nock = require('nock');
var util = require('util');
var constants = require('./constants');

var TOKEN = 'token';

var auth0 = require('..')({ token: TOKEN });

describe('search user', function(){
  describe('search', function(){
    var url = constants.USERS_ROUTE;
    var email = 'test@test.com';

    var data = {
      q: 'email:"' + email + '"',
      search_engine: 'v2'
    };

    var baseNock;
    beforeEach(function(){
      baseNock = nock(constants.BASE_API_URL)
        .matchHeader('authorization', 'Bearer ' + TOKEN)
        .get(url)
        .query(data);
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

      auth0.users.searchUser(data, function(err){
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
        email: 'test@test.com'
      });

      return auth0.users.searchUser(data)
        .then(function(body){
          expect(body.email).to.equal(email);
          localNock.done();
        });
    });
  });
});
