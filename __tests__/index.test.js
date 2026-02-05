const { describe, expect, test } = require('@jest/globals');
const { readFileSync } = require('fs');
const { join } = require('path');
const genDiff = require('../src/index.js');

const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf8');

describe('genDiff', () => {
  test('compares flat json files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFixture('expected-flat.txt');
    const result = genDiff(file1, file2);
    const normalizedExpected = expected.replace(/\r\n/g, '\n').trim();
    const normalizedResult = result.trim();
    expect(normalizedResult).toBe(normalizedExpected);
  });

  test('compares nested json files', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');
    const expected = readFixture('expected-nested.txt');
    const result = genDiff(file1, file2);
    const normalizedExpected = expected.replace(/\r\n/g, '\n').trim();
    const normalizedResult = result.trim();
    expect(normalizedResult).toBe(normalizedExpected);
  });

  test('compares nested yaml files', () => {
    const file1 = getFixturePath('nested1.yaml');
    const file2 = getFixturePath('nested2.yaml');
    const expected = readFixture('expected-nested.txt');
    const result = genDiff(file1, file2);
    const normalizedExpected = expected.replace(/\r\n/g, '\n').trim();
    const normalizedResult = result.trim();
    expect(normalizedResult).toBe(normalizedExpected);
  });
});
