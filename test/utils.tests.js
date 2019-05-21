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
});
