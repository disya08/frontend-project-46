const _ = require('lodash');
const parseFile = require('./parsers.js');

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

const formatValue = (value, depth) => {
  if (!isObject(value)) {
    if (value === null) return 'null';
    if (value === '') return '';
    if (typeof value === 'string') return value;
    return String(value);
  }

  const indentSize = 4;
  const currentIndent = ' '.repeat(depth * indentSize);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);
  const entries = Object.entries(value);

  const lines = entries.map(([key, val]) => {
    const formattedValue = formatValue(val, depth + 1);
    if (formattedValue === '') {
      return `${currentIndent}${key}:`;
    }
    return `${currentIndent}${key}: ${formattedValue}`;
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatStylish = (diff, depth = 1) => {
  const indentSize = 4;
  const indent = ' '.repeat(depth * indentSize - 2);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);

  const lines = diff.map((node) => {
    const { key, type } = node;

    const makeLine = (sign, value) => {
      const formatted = formatValue(value, depth + 1);
      if (formatted === '') {
        return `${indent}${sign} ${key}:`;
      }
      return `${indent}${sign} ${key}: ${formatted}`;
    };

    switch (type) {
      case 'added':
        return makeLine('+', node.value);
      case 'removed':
        return makeLine('-', node.value);
      case 'unchanged':
        return makeLine(' ', node.value);
      case 'changed':
        return [
          makeLine('-', node.value),
          makeLine('+', node.value2),
        ].join('\n');
      case 'nested':
        return `${indent}  ${key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        return '';
    }
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);

  if (format === 'stylish') {
    return formatStylish(diff);
  }

  throw new Error(`Unsupported format: ${format}`);
};

module.exports = genDiff;
