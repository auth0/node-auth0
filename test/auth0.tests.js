var expect = require('chai').expect;

var auth0 = require('../src');
var ManagementClient = require('../src/management');

describe('Auth0 module', function() {
  it('should expose the ManagementClient', function() {
    expect(auth0.ManagementClient).to.equal(ManagementClient);
  });
});
