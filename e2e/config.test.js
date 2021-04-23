/* eslintenv jest */

import getConfig from './config';

describe('E2E Config', () => {
  it('Should throw when an unsupported enviornment is supplied', () => {
    expect(() => {
      getConfig('test');
    }).toThrow();
  });
  it('Should exception message should match the enviornment supplied', () => {
    try {
      getConfig('test');
    } catch (error) {
      expect(error.message).toBe(
        'Unsupported enviornment supplied test please use one of the allowed values.',
      );
    }
  });
  it('Should not throw when an local enviornment is supplied', () => {
    expect(() => {
      getConfig('local');
    }).not.toThrow();
  });
  it('Should not throw when an dev enviornment is supplied', () => {
    expect(() => {
      getConfig('dev');
    }).not.toThrow();
  });
  it('Should not throw when an qa enviornment is supplied', () => {
    expect(() => {
      getConfig('qa');
    }).not.toThrow();
  });

  it('Should not throw when an perf enviornment is supplied', () => {
    expect(() => {
      getConfig('perf');
    }).not.toThrow();
  });
  it('Should not throw when an prod enviornment is supplied', () => {
    expect(() => {
      getConfig('prod');
    }).not.toThrow();
  });
});
