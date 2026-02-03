const fs = require('fs');
const path = require('path');

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');

  const extension = path.extname(filepath).toLowerCase();
  if (extension === '.json') {
    return JSON.parse(content);
  }

  throw new Error(`Unsupported format: ${extension}`);
};

module.exports = parseFile;
