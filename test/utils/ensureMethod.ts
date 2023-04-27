import chai from 'chai';

const { expect } = chai;

export function ensureMethod(obj: any, name: string) {
  return function () {
    expect(obj[name]).to.exist.to.be.an.instanceOf(Function);
  };
}
