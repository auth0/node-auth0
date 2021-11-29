const { expect } = require('chai');

module.exports = function (obj, name, cls) {
  return function () {
    expect(obj[name]).to.exist.to.be.an.instanceOf(cls);
  };
};
