import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  console.log('File 1:', data1);
  console.log('File 2:', data2);
  
  return 'Comparison result will be here';
};

export default genDiff;