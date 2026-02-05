const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath).toLowerCase();

  switch (extension) {
    case '.json':
      return JSON.parse(content);
    case '.yaml':
    case '.yml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported format: ${extension}`);
  }
};

module.exports = parseFile;
