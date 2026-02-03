const _ = require('lodash');
const parseFile = require('./parsers.js');

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  const diff = allKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 };
    }
    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }
    return {
      key, type: 'changed', value: value1, value2,
    };
  });

  return diff;
};

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'added':
        return `  + ${item.key}: ${item.value}`;
      case 'removed':
        return `  - ${item.key}: ${item.value}`;
      case 'unchanged':
        return `    ${item.key}: ${item.value}`;
      case 'changed':
        return `  - ${item.key}: ${item.value}\n  + ${item.key}: ${item.value2}`;
      default:
        return '';
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  return formatDiff(diff);
};

module.exports = genDiff;
