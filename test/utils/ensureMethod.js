var expect = require('chai').expect;


module.exports =  function (obj, name) {
  return function () {
    expect(obj[name])
      .to.exist
      .to.be.an.instanceOf(Function);
  };
};
