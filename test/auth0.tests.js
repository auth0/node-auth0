var expect = require('chai').expect;
var auth0 = require('../src');
var Client = require('../src/client');
var User = require('../src/user');


describe('Auth0 module', function () {

    it('should return an instance of Client when the token is valid', function () {
      var options = { token: 'abcdefg' };
      var client = null;

      expect(auth0.bind(null, options)).to.not.fail;

      client = auth0(options);

      expect(client).to.be.an('Object');
      expect(client).to.be.an.instanceOf(Client);
    });

    it('should expose the a Client constructor', function () {
      expect(auth0.Client).to.exist;
      expect(auth0.Client).to.equal(Client);
    });

    it('should expose the User constructor', function () {
      expect(auth0.User).to.exist;
      expect(auth0.User).to.equal(User);
    });
});
