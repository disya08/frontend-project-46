const { describe, expect, test } = require('@jest/globals')
const { readFileSync } = require('fs')
const { join } = require('path')
const genDiff = require('../src/index.js')

const getFixturePath = filename => join(__dirname, '__fixtures__', filename)
const readFixture = filename => readFileSync(getFixturePath(filename), 'utf8')

describe('genDiff', () => {
  test('compares flat json files with stylish format', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const expected = readFixture('expected-flat.txt')
    const result = genDiff(file1, file2, 'stylish')
    const normalizedExpected = expected.replace(/\r\n/g, '\n').trim()
    const normalizedResult = result.trim()
    expect(normalizedResult).toBe(normalizedExpected)
  })

  test('compares nested json files with stylish format', () => {
    const file1 = getFixturePath('nested1.json')
    const file2 = getFixturePath('nested2.json')
    const expected = readFixture('expected-nested.txt')
    const result = genDiff(file1, file2, 'stylish')
    const normalizedExpected = expected.replace(/\r\n/g, '\n').trim()
    const normalizedResult = result.trim()
    expect(normalizedResult).toBe(normalizedExpected)
  })

  test('compares nested json files with plain format', () => {
    const file1 = getFixturePath('nested1.json')
    const file2 = getFixturePath('nested2.json')
    const expected = readFixture('expected-plain.txt')
    const result = genDiff(file1, file2, 'plain')
    const normalizedExpected = expected.replace(/\r\n/g, '\n').trim()
    const normalizedResult = result.trim()
    expect(normalizedResult).toBe(normalizedExpected)
  })

  test('compares nested json files with json format', () => {
    const file1 = getFixturePath('nested1.json')
    const file2 = getFixturePath('nested2.json')
    const result = genDiff(file1, file2, 'json')
    expect(() => JSON.parse(result)).not.toThrow()
    const parsed = JSON.parse(result)
    expect(Array.isArray(parsed)).toBe(true)
    expect(parsed.length).toBeGreaterThan(0)
  })
})

