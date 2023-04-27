import chai from 'chai';

const { expect } = chai;

export function ensureProperty(obj: any, name: string, cls: any) {
  return function () {
    expect(obj[name]).to.exist.to.be.an.instanceOf(cls);
  };
}
