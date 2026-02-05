const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return 'null';
  }
  return String(value);
};

const buildPath = (path, key) => (path ? `${path}.${key}` : key);

const formatPlain = (diff, path = '') => {
  const lines = diff.map((node) => {
    const currentPath = buildPath(path, node.key);

    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.value)} to ${formatValue(node.value2)}`;
      case 'nested':
        return formatPlain(node.children, currentPath);
      case 'unchanged':
        return '';
      default:
        return '';
    }
  });

  return lines.filter((line) => line !== '').join('\n');
};

module.exports = formatPlain;
