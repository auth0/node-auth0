var expect = require('chai').expect;
var utils = require('../src/utils.js');

describe('Utils', function() {
  describe('client info', function() {
    it('should generate default telemetry value', function() {
      var pkgVersion = require('../package.json').version;
      var nodeVersion = process.version.replace('v', '');
      expect(utils.generateClientInfo()).to.deep.equal({
        name: 'node-auth0',
        version: pkgVersion,
        env: { node: nodeVersion }
      });
    });
  });
  describe('maybe decode', () => {
    it('encodes regular user_id', () => {
      const normalId = 'auth0|1234';
      expect(utils.maybeDecode(normalId)).to.be.equal('auth0%7C1234');
    });
    it('encodes a malicious user_id', () => {
      const maliciousId = 'anotherUserId/secret';
      expect(utils.maybeDecode(maliciousId)).to.be.equal('anotherUserId%2Fsecret');
    });
    it('encodes a malicious user_id with a percentage', () => {
      const maliciousId = 'anotherUserId/secret%23';
      expect(utils.maybeDecode(maliciousId)).to.be.equal('anotherUserId%2Fsecret%2523');
    });
    it('does not encode an already encoded user_id', () => {
      const maliciousId = 'auth0%7C1234';
      expect(utils.maybeDecode(maliciousId)).to.be.equal('auth0%7C1234');
    });
  });
});
