const { describe, expect, test } = require('@jest/globals');
const genDiff = require('../src/index.js');

describe('genDiff', () => {
  test('compares flat json files', () => {
    const file1 = '__tests__/__fixtures__/file1.json';
    const file2 = '__tests__/__fixtures__/file2.json';
    const result = genDiff(file1, file2);
    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    expect(result).toBe(expected);
  });
});
