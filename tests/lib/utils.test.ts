import { resolveValueToPromise } from '../../src/utils.js';

describe('resolveValueToPromise', () => {
  it('should resolve a static string value', async () => {
    const value = 'staticValue';
    const result = await resolveValueToPromise(value);
    expect(result).toBe(value);
  });

  it('should resolve a synchronous function returning a string', async () => {
    const value = 'syncValue';
    const syncFunction = () => value;
    const result = await resolveValueToPromise(syncFunction);
    expect(result).toBe(value);
  });

  it('should resolve an asynchronous function returning a string', async () => {
    const value = 'asyncValue';
    const asyncFunction = async () => value;
    const result = await resolveValueToPromise(asyncFunction);
    expect(result).toBe(value);
  });
});
