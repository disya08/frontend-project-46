const { describe, expect, test } = require('@jest/globals');
const genDiff = require('../src/index.js');

describe('genDiff', () => {
  test('compares flat json files', () => {
    const file1 = 'file1.json';
    const file2 = 'file2.json';
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

  test('compares flat yaml files', () => {
    const file1 = '__tests__/__fixtures__/file1.yaml';
    const file2 = '__tests__/__fixtures__/file2.yaml';
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

  test('compares yml files', () => {
    const file1 = '__tests__/__fixtures__/file1.yml';
    const file2 = '__tests__/__fixtures__/file2.yml';
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
