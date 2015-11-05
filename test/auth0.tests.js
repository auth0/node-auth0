var expect = require('chai').expect;
var auth0 = require('../src');
var Auth0 = require('../src/Auth0');


describe('Auth0 module', function () {

    it('should return an instance of Auth0 when the token is valid', function () {
      var options = { token: 'abcdefg' };
      var client = null;

      try {
        client = auth0(options);

        expect(client).to.be.an('Object');
        expect(client).to.be.an.instanceOf(Auth0);
      } catch (err) {
        done(err);
      }
    });
});
