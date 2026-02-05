const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

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

module.exports = formatStylish;
