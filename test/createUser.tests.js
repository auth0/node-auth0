var expect = require('chai').expect;
var nock = require('nock');
var util = require('util');
var constants = require('./constants');

var TOKEN = 'token';
var CONNECTION = 'connection';

var auth0 = require('..')({
  token: TOKEN,
  connection: CONNECTION
});

describe('create user', function(){
  describe('create', function(){
    var url = constants.USERS_ROUTE;

    var email = 'test@test.com';
    var password = 'test1234'
    var user_metadata = { color: 'green' }

    var data = {
      email: email,
      password: password,
      user_metadata: user_metadata
    };

    var baseNock;
    beforeEach(function(){
      baseNock = nock(constants.BASE_API_URL)
        .matchHeader('authorization', 'Bearer ' + TOKEN)
        .post(url, data);
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

      auth0.users.createUser(data, function(err){
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
        email: email,
        password: password,
        user_metadata: user_metadata
      });

      return auth0.users.createUser(data)
        .then(function(body){
          expect(body.email).to.equal(email);
          expect(body.password).to.equal(password);
          expect(body.user_metadata).to.contain(user_metadata);
          localNock.done();
        });
    });
  });
});
