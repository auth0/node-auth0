var expect = require('chai').expect;

var Auth0 = require('..');
var ArgumentError = require('../src/errors').ArgumentError;

describe('errors', function(){
  it('should fail if region is invalid', function(){
    expect(Auth0.bind(null, { token: 'token', region: 'sa' }))
      .to.throw(ArgumentError, 'The region is invalid, valid values are any of: "us","eu"');
  });

  it('should fail if token is not provided', function(){
    expect(Auth0.bind(null, { token: '' }))
      .to.throw(ArgumentError, 'Missing token');
  });
});