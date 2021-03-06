var expect = require('chai').expect;

describe('Exports', () => {
  it('should export ManagementClient', () => {
    var ManagementClient = require('../src');
    expect(ManagementClient).to.be.a('object');
  });

  it('should export AuthenticationClient', () => {
    var AuthenticationClient = require('../src');
    expect(AuthenticationClient).to.be.a('object');
  });

  it('should export OAuthAuthenticator', () => {
    var OAuthAuthenticator = require('../src');
    expect(OAuthAuthenticator).to.be.a('object');
  });

  it('should export DatabaseAuthenticator', () => {
    var DatabaseAuthenticator = require('../src');
    expect(DatabaseAuthenticator).to.be.a('object');
  });

  it('should export PasswordlessAuthenticator', () => {
    var PasswordlessAuthenticator = require('../src');
    expect(PasswordlessAuthenticator).to.be.a('object');
  });

  it('should export TokensManager', () => {
    var TokensManager = require('../src');
    expect(TokensManager).to.be.a('object');
  });

  it('should export UsersManager', () => {
    var UsersManager = require('../src');
    expect(UsersManager).to.be.a('object');
  });
});
