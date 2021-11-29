const { expect } = require('chai');

const auth0 = require('../src');
const AuthenticationClient = require('../src/auth');
const ManagementClient = require('../src/management');

describe('Auth0 module', () => {
  it('should expose the AuthenticationClient', () => {
    expect(auth0.AuthenticationClient).to.equal(AuthenticationClient);
  });

  it('should expose the ManagementClient', () => {
    expect(auth0.ManagementClient).to.equal(ManagementClient);
  });
});
