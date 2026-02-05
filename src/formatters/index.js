const stylish = require('./stylish.js');
const plain = require('./plain.js');

const formatters = {
  stylish,
  plain,
};

const getFormatter = (format) => {
  const formatter = formatters[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }
  return formatter;
};

module.exports = getFormatter;
