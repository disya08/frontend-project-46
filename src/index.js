const _ = require('lodash');
const parseFile = require('./parsers.js');
const getFormatter = require('./formatters/index.js');

const isObject = (value) => _.isObject(value) && !Array.isArray(value);

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  return allKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 };
    }
    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 };
    }
    if (isObject(value1) && isObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }
    return {
      key, type: 'changed', value: value1, value2,
    };
  });
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  const formatter = getFormatter(format);
  return formatter(diff);
};

module.exports = genDiff;
