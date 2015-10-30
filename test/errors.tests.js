var expect = require('chai').expect;

var Auth0 = require('..');
var ArgumentError = require('../src/exceptions').ArgumentError;

describe('Errors', function(){
  it('should fail if region is invalid', function(){
    expect(Auth0.bind(null, { token: 'token', region: 'sa' }))
      .to.throw(ArgumentError, 'The region is invalid, valid values are any of: "us","eu"');
  });

  it('should fail if token is not provided', function(){
    expect(Auth0.bind(null, { token: '' }))
      .to.throw(ArgumentError, 'Missing token');
  });

  it('should not allow domain and region', function(){
    expect(Auth0.bind(null, { token: 'token', region: 'sa', domain: 'login.sa.auth0.com' }))
      .to.throw(ArgumentError, 'Cannot provide both region and domain');
  });
});
